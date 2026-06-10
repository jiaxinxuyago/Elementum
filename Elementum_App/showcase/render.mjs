// Render each .frame in framer.html to a crisp 1600x900 PNG (×2 DPR) and
// drop the results straight into the portfolio's src/assets folder.
// Run:  node showcase/render.mjs    (from Elementum_App/)
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML = pathToFileURL(path.join(__dirname, 'framer.html')).href;
const OUT = 'D:/Elementum/portfolio_site/src/assets';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
await page.goto(HTML, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200); // let webfonts + background images settle

const ids = await page.evaluate(() => window.__FRAME_IDS);
for (const id of ids) {
  const el = await page.$('#' + id);
  if (!el) { console.log('  !! missing', id); continue; }
  await el.screenshot({ path: path.join(OUT, id + '.jpg'), type: 'jpeg', quality: 86 });
  console.log('  shot', id);
}
await browser.close();
console.log(`\nDONE — ${ids.length} frames → ${OUT}`);
