#!/usr/bin/env node
// Record an animated page (3D Qubi, hero/banner mockups) as a GIF for a Slides deck.
//
// Usage:
//   node record-gif.mjs <url> <out.gif> [--seconds 7] [--fps 12] [--width 1440] [--height 810] [--scale 0.667] [--wait 0]
//
//   url      the page to record; serve the proposal repo locally first (node v3/tools/serve.js 8090),
//            then e.g. http://localhost:8090/v3/content/mockup/hero-d2.html
//   --width/--height  the page's own design size (the mockups are 1440×810)
//   --scale  output size relative to the page (0.667 → 960×540, small enough for a slide)
//   --wait   ms to wait after load before the first frame (fonts, three.js models)
//
// Needs: npm install playwright gifenc pngjs   (or set PLAYWRIGHT_MODULE to an installed playwright's index.mjs)
// On Windows with Chrome installed and no Playwright browsers, set CHROME_PATH to chrome.exe.
// Offline or behind a proxy that blocks cdn.jsdelivr.net: set THREE_DIR to a local node_modules/three folder
// (npm install three@0.160.0) and the page's three.js imports are served from it.
import { writeFileSync } from 'node:fs';
import gifenc from 'gifenc';
import pngjs from 'pngjs';
const { GIFEncoder, quantize, applyPalette } = gifenc;
const { PNG } = pngjs;

const [url, out, ...rest] = process.argv.slice(2);
if (!url || !out) {
  console.error('Usage: node record-gif.mjs <url> <out.gif> [--seconds 7] [--fps 12] [--width 1440] [--height 810] [--scale 0.667] [--wait 0]');
  process.exit(1);
}
const opt = { seconds: 7, fps: 12, width: 1440, height: 810, scale: 0.667, wait: 0 };
for (let i = 0; i < rest.length; i += 2) {
  const key = rest[i].replace(/^--/, '');
  if (!(key in opt)) { console.error(`Unknown option --${key}`); process.exit(1); }
  opt[key] = Number(rest[i + 1]);
}

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: opt.width, height: opt.height }, deviceScaleFactor: opt.scale });
if (process.env.THREE_DIR) {
  const { readFileSync } = await import('node:fs');
  const { join } = await import('node:path');
  await page.route(/https:\/\/cdn\.jsdelivr\.net\/npm\/three@[^/]+\/(.*)/, (route, req) => {
    const rel = new URL(req.url()).pathname.replace(/^\/npm\/three@[^/]+\//, '');
    route.fulfill({ body: readFileSync(join(process.env.THREE_DIR, rel)), contentType: 'text/javascript' });
  });
}
// load the page but keep the animation from running until we start capturing
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(opt.wait);

const frames = Math.round(opt.seconds * opt.fps);
const delay = Math.round(1000 / opt.fps);
const gif = GIFEncoder();
const start = Date.now();
for (let n = 0; n < frames; n++) {
  const png = PNG.sync.read(await page.screenshot({ type: 'png' }));
  const palette = quantize(png.data, 256);
  gif.writeFrame(applyPalette(png.data, palette), png.width, png.height, { palette, delay });
  // keep the capture on the wall clock so the GIF plays at real speed
  const next = start + (n + 1) * delay;
  const wait = next - Date.now();
  if (wait > 0) await page.waitForTimeout(wait);
}
gif.finish();
writeFileSync(out, gif.bytes());
await browser.close();
console.log(`${out}: ${frames} frames, ${(gif.bytes().length / 1024 / 1024).toFixed(1)} MB`);
