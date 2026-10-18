import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pageMetadata, SITE_URL } from "../src/data/pageMetadata.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const routes = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8")).rewrites;
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">");

for (const [path, expected] of Object.entries(pageMetadata)) {
  test(`${path}: crawlers receive page-specific metadata without JavaScript`, async () => {
    const destination = path === "/" ? "/index.html" : routes.find((route) => route.source === path)?.destination;
    assert.ok(destination, "Vercel must route to this page's own HTML");
    const html = await readFile(resolve(root, "dist", destination.slice(1)), "utf8");
    const meta = (key) => {
      const matches = [...html.matchAll(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`, "g"))];
      assert.equal(matches.length, 1, `${key} must occur exactly once`);
      return decode(matches[0][1]);
    };
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), expected.title);
    assert.equal(meta("og:title"), expected.title);
    assert.equal(meta("og:description"), expected.description);
    assert.equal(meta("description"), expected.description);
    assert.equal(meta("og:url"), `${SITE_URL}${path}`);
    assert.equal(meta("og:image"), `${SITE_URL}${expected.image}`);
    assert.equal(meta("twitter:image"), meta("og:image"));
    assert.equal(meta("twitter:title"), expected.title);
    assert.equal(meta("twitter:description"), expected.description);
    assert.equal(meta("twitter:card"), "summary_large_image");
    assert.equal(meta("og:image:width"), "1200");
    assert.equal(meta("og:image:height"), "630");
    assert.ok(meta("og:image:alt"));
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${SITE_URL}${path}"`));
    assert.ok(!html.includes("muhammadamas.netlify.app"));
    assert.match(html, /<script[^>]*type="module"[^>]*src="\/assets\/[^" ]+\.js"/);
  });
}

// Read the actual JPEG frame header, rather than trusting the declared tags.
for (const image of new Set(Object.values(pageMetadata).map((page) => page.image))) {
  test(`${image}: preview is a real 1200 × 630 JPEG`, async () => {
    const buffer = await readFile(resolve(root, "dist", image.slice(1)));
    assert.equal(buffer.readUInt16BE(0), 0xffd8);
    let offset = 2;
    while (offset < buffer.length) {
      assert.equal(buffer[offset], 0xff);
      const marker = buffer[offset + 1];
      if ([0xc0, 0xc1, 0xc2].includes(marker)) {
        assert.equal(buffer.readUInt16BE(offset + 5), 630);
        assert.equal(buffer.readUInt16BE(offset + 7), 1200);
        assert.ok(buffer.length < 1_000_000, "Preview should be small enough to fetch quickly");
        return;
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
    assert.fail("JPEG frame header not found");
  });
}
