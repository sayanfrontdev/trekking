import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imageDirectory = path.join(root, "images");
const migrationPath = path.join(root, "migrations", "0004_seed_site_assets.sql");
const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4"
};
const chunkBytes = 24_000;
const statements = [];

for (const name of (await readdir(imageDirectory)).sort()) {
  const extension = path.extname(name).toLowerCase();
  const mimeType = mimeTypes[extension];
  if (!mimeType) continue;
  const bytes = await readFile(path.join(imageDirectory, name));
  for (let offset = 0; offset < bytes.length; offset += chunkBytes) {
    const chunkIndex = Math.floor(offset / chunkBytes);
    const hex = bytes.subarray(offset, Math.min(offset + chunkBytes, bytes.length)).toString("hex");
    statements.push(
      `INSERT INTO site_assets (asset_key, chunk_index, mime_type, data, size_bytes, updated_at) VALUES ('${name.replaceAll("'", "''")}', ${chunkIndex}, '${mimeType}', X'${hex}', ${bytes.length}, datetime('now')) ON CONFLICT(asset_key, chunk_index) DO UPDATE SET mime_type = excluded.mime_type, data = excluded.data, size_bytes = excluded.size_bytes, updated_at = excluded.updated_at;`
    );
  }
}

await writeFile(migrationPath, `${statements.join("\n")}\n`, "utf8");
console.log(`Wrote ${migrationPath} with ${statements.length} chunk statements for the project media files.`);
