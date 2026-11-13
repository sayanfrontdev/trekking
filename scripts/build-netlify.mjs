import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && /\.(?:html|css|js)$/i.test(entry.name)) {
    await cp(path.join(root, entry.name), path.join(output, entry.name));
  } else if (entry.isDirectory() && entry.name === "images") {
    await cp(path.join(root, entry.name), path.join(output, entry.name), { recursive: true });
  }
}
