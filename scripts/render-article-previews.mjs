import { writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { articles } from "../src/data/articles/index.js";

const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ACCENT = "#fbbf24";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/social/articles");
const renderAll = process.argv.includes("--all");

const escape = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const titleSize = (title) => (title.length > 64 ? 44 : title.length > 44 ? 50 : 58);

const card = (article) => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; background: #0a0a0a; }
  body { font-family: Inter, -apple-system, system-ui, sans-serif; color: #fff; position: relative; }
  .eyebrow { position: absolute; left: 64px; top: 56px; font-size: 15px; font-weight: 600; letter-spacing: .08em; color: #a3a3a3; }
  .bar { position: absolute; left: 64px; top: 111px; width: 58px; height: 5px; background: ${ACCENT}; }
  .title { position: absolute; left: 64px; top: 156px; width: 500px; font-size: ${titleSize(article.title)}px; line-height: 1.12; font-weight: 700; letter-spacing: -0.02em;
           display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
  .meta { position: absolute; left: 64px; top: 464px; font-size: 17px; font-weight: 500; color: ${ACCENT}; }
  .frame { position: absolute; left: 613px; top: 148px; width: 544px; height: 364px; border-radius: 24px; background: #1c1c1c; padding: 14px; }
  .frame img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; display: block; }
  .rule { position: absolute; left: 64px; right: 64px; top: 548px; height: 1px; background: #2e2e2e; }
  .name { position: absolute; left: 64px; top: 576px; font-size: 18px; font-weight: 700; }
  .site { position: absolute; left: 814px; top: 576px; font-size: 18px; color: #a3a3a3; }
</style></head>
<body>
  <p class="eyebrow">ARTICLE</p>
  <div class="bar"></div>
  <h1 class="title">${escape(article.title)}</h1>
  <p class="meta">${formatDate(article.date)} · ${escape(article.readTime)}</p>
  ${article.cover ? `<div class="frame"><img src="${pathToFileURL(resolve(root, "public", article.cover.slice(1))).href}" alt=""></div>` : ""}
  <div class="rule"></div>
  <p class="name">Muhammad Amas</p>
  <p class="site">muhammadamas.vercel.app</p>
</body></html>`;

if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}. Set CHROME_PATH.`);
await mkdir(outDir, { recursive: true });
const work = await mkdtemp(join(tmpdir(), "article-previews-"));

let rendered = 0;
for (const article of articles) {
  const output = resolve(outDir, `${article.slug}.jpg`);
  if (existsSync(output) && !renderAll) continue;

  const html = join(work, `${article.slug}.html`);
  const png = join(work, `${article.slug}.png`);
  await writeFile(html, card(article));
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=5000",
      "--allow-file-access-from-files",
      `--screenshot=${png}`,
      pathToFileURL(html).href,
    ],
    { stdio: "ignore" },
  );
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "85", png, "--out", output], { stdio: "ignore" });
  console.log(`Rendered ${article.slug}.jpg`);
  rendered++;
}

await rm(work, { recursive: true, force: true });
console.log(rendered ? `\n${rendered} preview(s) in public/social/articles/` : "All previews are up to date.");
