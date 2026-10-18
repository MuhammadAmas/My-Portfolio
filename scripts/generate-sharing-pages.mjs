import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pageMetadata, getPageMetadata, getMetadataTags } from "../src/data/pageMetadata.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const template = await readFile(resolve(dist, "index.html"), "utf8");
const marker = /<!-- page-metadata:start -->[\s\S]*?<!-- page-metadata:end -->/;
if (!marker.test(template)) throw new Error("Missing metadata markers in index.html");

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const path of Object.keys(pageMetadata)) {
  const meta = getPageMetadata(path);
  await access(resolve(dist, pageMetadata[path].image.slice(1)));
  const head = [
    "<!-- page-metadata:start -->",
    `<title>${escape(meta.title)}</title>`,
    `<link rel="canonical" href="${escape(meta.url)}" />`,
    ...getMetadataTags(meta).map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escape(value)}" />`),
    "<!-- page-metadata:end -->",
  ].join("\n    ");
  const output = resolve(dist, path.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, template.replace(marker, () => head));
}

console.log(`Generated sharing metadata for ${Object.keys(pageMetadata).length} pages.`);
