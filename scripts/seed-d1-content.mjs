import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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
    } else if (["'", '"', "`"].includes(character)) quote = character;
    else if (["{", "[", "("].includes(character)) stack.push(character);
    else if (["}", "]", ")"].includes(character)) stack.pop();
    else if (character === ";" && stack.length === 0) return source.slice(start, index).trim();
    index += 1;
  }
  throw new Error(`Could not parse the ${name} initializer.`);
}

const source = await readFile(path.join(root, "app.js"), "utf8");
const names = ["profilePortraits", "localPhotos", "trips", "articles", "destinations", "customerReviews", "legalData"];
const declarations = [
  ...names.slice(0, 2).map(name => `const ${name} = ${initializerFor(source, name)};`),
  "let siteAssetUrls = {};",
  "const resolveSiteAsset = source => siteAssetUrls[source] || source;",
  `const photo = ${initializerFor(source, "photo")};`,
  ...names.slice(2).map(name => `const ${name} = ${initializerFor(source, name)};`)
].join("\n");
const content = JSON.parse(runInNewContext(
  `${declarations}\nJSON.stringify({ schemaVersion: 1, profilePortraits, localPhotos, trips, articles, destinations, customerReviews, legalData })`
));
const imageNames = await readdir(path.join(root, "images"));
content.assets = Object.fromEntries(imageNames.map(name => [`images/${name}`, `images/${name}`]));
const json = JSON.stringify(content);
const quoteSql = value => `'${value.replaceAll("'", "''")}'`;
const migration = `INSERT INTO site_content (id, content_json, updated_at) VALUES ('public', ${quoteSql(json)}, datetime('now')) ON CONFLICT(id) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at;\n`;
const output = path.join(root, "migrations", "0002_seed_site_content.sql");
await writeFile(output, migration, "utf8");
console.log(`Wrote ${output} (${content.trips.length} trips, ${content.destinations.length} destinations, ${content.articles.length} articles, ${content.customerReviews.length} reviews).`);
