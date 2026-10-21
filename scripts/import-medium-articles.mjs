import { readFile, writeFile, mkdir, stat, rename, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const FEED_URL = "https://medium.com/feed/@muhammadamas";
const TIME_ZONE = "Asia/Karachi";
const MAX_IMAGE_WIDTH = 1400;
const COFFEE_URL = "https://www.buymeacoffee.com/muhammadamas";
const COFFEE_IMAGE = "/articles/shared/buy-me-a-coffee.png";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const articlesDir = resolve(root, "src/data/articles");
const indexPath = resolve(articlesDir, "index.js");

const hasSips = (() => {
  try {
    execFileSync("sips", ["--help"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
})();

const decodeEntities = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");

const field = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : "";
};

const parseMediumUrl = (url) => {
  const path = new URL(url).pathname.split("/").filter(Boolean).pop();
  const match = path.match(/^(.*)-([0-9a-f]{8,16})$/);
  if (!match) throw new Error(`Unrecognized Medium URL: ${url}`);
  return { slug: match[1], id: match[2] };
};

const toLocalDate = (rfc822) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(rfc822),
  );

const plainText = (html) =>
  decodeEntities(html.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const estimateReadTime = (html) => {
  const words = plainText(html).split(" ").length;
  const images = (html.match(/<img/g) || []).length;
  return `${Math.max(1, Math.ceil(words / 265 + images / 5))} min read`;
};

const firstParagraph = (html) => {
  const match = html.match(/<p>([\s\S]*?)<\/p>/);
  const text = match ? plainText(match[1]) : "";
  return text.length > 160 ? `${text.slice(0, 157).replace(/\s+\S*$/, "")}…` : text;
};

async function loadFeed(source) {
  if (source) return readFile(resolve(source), "utf8");
  const response = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0 (portfolio article import)" } });
  if (!response.ok) throw new Error(`Medium feed returned ${response.status}`);
  return response.text();
}

async function loadExisting() {
  if (existsSync(indexPath)) {
    const { articles } = await import(`${pathToFileURL(indexPath).href}?t=${Date.now()}`);
    return articles;
  }
  return [];
}

async function saveImage(url, slug, index) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image ${url} returned ${response.status}`);
  const type = response.headers.get("content-type") || "";
  const ext = type.includes("png") ? ".png" : type.includes("gif") ? ".gif" : type.includes("webp") ? ".webp" : ".jpg";
  const dir = resolve(root, "public/articles", slug);
  await mkdir(dir, { recursive: true });
  let file = resolve(dir, `${index}${ext}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));

  if (hasSips && ext === ".gif") {
    const still = resolve(dir, `${index}.still.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", file, "--out", still], { stdio: "ignore" });
  }

  if (hasSips && ext !== ".gif") {
    const width = Number(execFileSync("sips", ["-g", "pixelWidth", file]).toString().match(/pixelWidth: (\d+)/)[1]);
    if (width > MAX_IMAGE_WIDTH) execFileSync("sips", ["--resampleWidth", String(MAX_IMAGE_WIDTH), file], { stdio: "ignore" });
    const hasAlpha = /hasAlpha: yes/.test(execFileSync("sips", ["-g", "hasAlpha", file]).toString());
    if (ext === ".png" && !hasAlpha) {
      const jpeg = resolve(dir, `${index}.jpg`);
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", file, "--out", jpeg], { stdio: "ignore" });
      if ((await stat(jpeg)).size < (await stat(file)).size) {
        await rm(file);
        file = jpeg;
      } else {
        await rm(jpeg);
      }
    }
  }
  return `/articles/${slug}/${index}${extname(file)}`;
}

const COFFEE_FIGURE = new RegExp(
  [
    String.raw`<figure>\s*<a [^>]*href="[^"]*buymeacoffee\.com[^"]*"[^>]*>\s*<img[^>]*>\s*</a>\s*</figure>`,
    String.raw`<figure>\s*<img[^>]*>\s*</figure>(?=\s*<p>(?:(?!</p>)[\s\S])*buymeacoffee\.com)`,
  ].join("|"),
  "g",
);

async function useSharedCoffeeImage(html) {
  const coffee = html.match(COFFEE_FIGURE);
  if (!coffee) return html;
  const shared = resolve(root, "public", COFFEE_IMAGE.slice(1));
  if (!existsSync(shared)) {
    const source = coffee[0].match(/<img[^>]*src="([^"]+)"/)[1];
    const response = await fetch(source);
    if (!response.ok) throw new Error(`Image ${source} returned ${response.status}`);
    await mkdir(dirname(shared), { recursive: true });
    await writeFile(shared, Buffer.from(await response.arrayBuffer()));
  }
  return html.replace(
    COFFEE_FIGURE,
    `<figure><a href="${COFFEE_URL}"><img alt="Buy me a coffee" src="${COFFEE_IMAGE}" /></a></figure>`,
  );
}

async function importArticle(item, existing) {
  const { slug, id } = parseMediumUrl(field(item, "link"));
  const raw = field(item, "content:encoded");
  const tags = [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) => m[1]);

  let html = await useSharedCoffeeImage(
    raw.replace(/<img[^>]*src="https:\/\/medium\.com\/_\/stat[^"]*"[^>]*>/g, ""),
  );
  await rm(resolve(root, "public/articles", slug), { recursive: true, force: true });
  const images = [
    ...new Set([...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]).filter((src) => src !== COFFEE_IMAGE)),
  ];
  const localImages = [];
  for (const [index, url] of images.entries()) {
    const local = await saveImage(url, slug, index + 1);
    localImages.push(local.endsWith(".gif") && hasSips ? local.replace(/\.gif$/, ".still.jpg") : local);
    html = html.replaceAll(`src="${url}"`, `src="${local}"`);
  }

  await writeFile(
    resolve(articlesDir, `${slug}.js`),
    `export default ${JSON.stringify(html)};\n`,
  );

  return {
    slug,
    id,
    title: existing?.title || decodeEntities(field(item, "title")).replace(/\.$/, ""),
    description: existing?.description || firstParagraph(html),
    date: toLocalDate(field(item, "pubDate")),
    readTime: existing?.readTime || estimateReadTime(html),
    tags,
    cover: existing?.cover || localImages[0] || null,
    mediumUrl: `https://muhammadamas.medium.com/${slug}-${id}`,
  };
}

async function updateVercelRoutes(articles) {
  const path = resolve(root, "vercel.json");
  const config = JSON.parse(await readFile(path, "utf8"));
  const others = config.rewrites.filter((route) => !route.source.startsWith("/publications/"));
  const at = others.findIndex((route) => route.source === "/publications");
  const routes = articles.map(({ slug }) => ({
    source: `/publications/${slug}`,
    destination: `/publications/${slug}/index.html`,
  }));
  others.splice(at, 0, ...routes);
  const lines = others.map((route) => `    ${JSON.stringify(route).replaceAll('":', '": ').replaceAll('","', '", "').replace(/^\{/, "{ ").replace(/\}$/, " }")}`);
  const { rewrites, ...rest } = config;
  const head = JSON.stringify(rest, null, 2).replace(/\n}$/, "");
  await writeFile(path, `${head},\n  "rewrites": [\n${lines.join(",\n")}\n  ]\n}\n`);
}

const feed = await loadFeed(process.argv[2]);
const items = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
if (!items.length) throw new Error("No articles found in the feed");

await mkdir(articlesDir, { recursive: true });
const existing = await loadExisting();
const byId = new Map(existing.map((article) => [article.id, article]));

for (const item of items) {
  const article = await importArticle(item, byId.get(parseMediumUrl(field(item, "link")).id));
  console.log(`${byId.has(article.id) ? "Updated" : "Added  "} ${article.date}  ${article.title}`);
  byId.set(article.id, { ...byId.get(article.id), ...article });
}

const articles = [...byId.values()]
  .filter((article) => existsSync(resolve(articlesDir, `${article.slug}.js`)))
  .sort((a, b) => b.date.localeCompare(a.date));

const tmp = `${indexPath}.tmp`;
await writeFile(
  tmp,
  `export const articles = ${JSON.stringify(articles, null, 2)};\n\nexport const getArticle = (slug) => articles.find((article) => article.slug === slug);\n`,
);
await rename(tmp, indexPath);
await updateVercelRoutes(articles);

console.log(`\n${articles.length} articles in src/data/articles/index.js`);
