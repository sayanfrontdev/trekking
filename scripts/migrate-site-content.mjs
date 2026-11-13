import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { runInNewContext } from "node:vm";
import { applicationDefault, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
try { process.loadEnvFile?.(path.join(root, ".env")); } catch { /* Optional local environment file. */ }

function initializerFor(source, name) {
  const match = new RegExp(`(?:const|let)\\s+${name}\\s*=`).exec(source);
  if (!match) throw new Error(`Could not find ${name} in app.js.`);
  let index = match.index + match[0].length;
  const start = index;
  const stack = [];
  let quote = "";
  let escaped = false;
  while (index < source.length) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
    } else if (["'", '"', "`"] .includes(character)) {
      quote = character;
    } else if (["{", "[", "("].includes(character)) {
      stack.push(character);
    } else if (["}", "]", ")"].includes(character)) {
      stack.pop();
    } else if (character === ";" && stack.length === 0) {
      return source.slice(start, index).trim();
    }
    index += 1;
  }
  throw new Error(`Could not parse the ${name} initializer.`);
}

async function readDefaultContent() {
  const source = await readFile(path.join(root, "app.js"), "utf8");
  const names = ["profilePortraits", "localPhotos", "trips", "articles", "destinations", "customerReviews", "legalData"];
  const declarations = [
    ...names.slice(0, 2).map(name => `const ${name} = ${initializerFor(source, name)};`),
    "let siteAssetUrls = {};",
    "const resolveSiteAsset = source => siteAssetUrls[source] || source;",
    `const photo = ${initializerFor(source, "photo")};`,
    ...names.slice(2).map(name => `const ${name} = ${initializerFor(source, name)};`)
  ].join("\n");
  const result = runInNewContext(`${declarations}\nJSON.stringify({ schemaVersion: 1, profilePortraits, localPhotos, trips, articles, destinations, customerReviews, legalData })`);
  return JSON.parse(result);
}

const mimeTypeByExtension = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4"
};

async function localAssets() {
  const entries = await readdir(path.join(root, "images"), { withFileTypes: true });
  return entries
    .filter(entry => entry.isFile() && mimeTypeByExtension[path.extname(entry.name).toLowerCase()])
    .map(entry => ({ name: entry.name, path: path.join(root, "images", entry.name), mimeType: mimeTypeByExtension[path.extname(entry.name).toLowerCase()] }));
}

async function main() {
  const content = await readDefaultContent();
  const assets = await localAssets();
  const totalBytes = (await Promise.all(assets.map(asset => readFile(asset.path)))).reduce((sum, data) => sum + data.length, 0);

  if (process.argv.includes("--dry-run")) {
    console.log(`Prepared ${content.trips.length} trips, ${content.destinations.length} destinations, ${content.articles.length} articles, ${content.customerReviews.length} reviews, and ${assets.length} media files (${(totalBytes / 1024 / 1024).toFixed(2)} MiB).`);
    return;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || "";
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET || "";
  const contentOnly = process.argv.includes("--content-only");
  if (!projectId) throw new Error("Set FIREBASE_PROJECT_ID before migrating site content.");
  if (!contentOnly && !bucketName) throw new Error("Set FIREBASE_STORAGE_BUCKET to the bucket name shown in Firebase Console > Storage.");
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) : null;
  const firebaseApp = initializeApp({
    projectId,
    storageBucket: bucketName || undefined,
    credential: serviceAccount ? cert(serviceAccount) : applicationDefault()
  }, `site-content-migration-${Date.now()}`);
  const assetUrls = {};
  if (!contentOnly) {
    const bucket = getStorage(firebaseApp).bucket(bucketName);
    const [bucketExists] = await bucket.exists();
    if (!bucketExists) throw new Error(`Storage bucket ${bucketName} was not found. Create it in Firebase Console before running this migration.`);
    for (const asset of assets) {
      const objectPath = `site-assets/${asset.name}`;
      const token = randomUUID();
      const file = bucket.file(objectPath);
      await file.save(await readFile(asset.path), {
        resumable: false,
        metadata: {
          contentType: asset.mimeType,
          cacheControl: "public, max-age=31536000, immutable",
          metadata: { firebaseStorageDownloadTokens: token }
        }
      });
      assetUrls[`images/${asset.name}`] = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(objectPath)}?alt=media&token=${token}`;
      console.log(`Uploaded ${asset.name}`);
    }
  }

  const contentRef = getFirestore(firebaseApp).collection("siteContent").doc("public");
  const existingContent = await contentRef.get();
  const force = process.argv.includes("--force");
  if (contentOnly && existingContent.exists && !force) {
    throw new Error("siteContent/public already exists. Add --force only if you intend to replace it with the bundled defaults.");
  }
  const publishedContent = existingContent.exists && !force
    ? { ...existingContent.data(), assets: assetUrls, updatedAt: new Date().toISOString() }
    : { ...content, assets: assetUrls, updatedAt: new Date().toISOString() };
  await contentRef.set(publishedContent);
  console.log(contentOnly
    ? `Published structured site content to Firestore project ${projectId}; image URLs remain local until Storage is enabled.`
    : `Published site content and media URLs to Firestore project ${projectId}.`);
}

main().catch(error => {
  console.error(error.message || "Site content migration failed.");
  process.exitCode = 1;
});
