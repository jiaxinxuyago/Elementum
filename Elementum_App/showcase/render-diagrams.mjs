// Render each [data-diagram] in diagrams.html to a crisp JPEG in the portfolio's
// src/assets as journey-<id>.jpg.  Run: node showcase/render-diagrams.mjs (from Elementum_App/)
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML = pathToFileURL(path.join(__dirname, 'diagrams.html')).href;
const OUT = 'D:/Elementum/portfolio_site/src/assets';
fs.mkdirSync(OUT, { recursive: true });

const NAME = { d1: 'journey-compass', d2: 'journey-pipeline', d3: 'journey-strength', d4: 'journey-contract',
  d5: 'journey-archetypes', d6: 'journey-cocktail', d7: 'journey-fifty-keys',
  d8: 'journey-lookup', d9: 'journey-tiers', d10: 'journey-voices', d11: 'journey-arc',
  d12: 'journey-pigment', d14: 'journey-foundations' };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1700, height: 1100 }, deviceScaleFactor: 2 });
await page.goto(HTML, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1000);

const ids = await page.evaluate(() => Array.from(document.querySelectorAll('[data-diagram]')).map((d) => d.id));
for (const id of ids) {
  const el = await page.$('#' + id);
  const name = NAME[id] || ('journey-' + id);
  await el.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 90 });
  console.log('  shot', name);
}
await browser.close();
console.log(`\nDONE — ${ids.length} diagrams → ${OUT}`);
