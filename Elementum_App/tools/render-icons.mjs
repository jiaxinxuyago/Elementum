// Render the PWA / iOS app icons: the 庚 StemSeal on a silk-paper ground.
// Sizes: 192 + 512 (manifest "any"), 512 maskable (seal shrunk into the
// 80% safe zone), 180 apple-touch-icon.
// Run: node tools/render-icons.mjs   (from Elementum_App/)
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'icons');
fs.mkdirSync(OUT, { recursive: true });

// Inline as a data URI — setContent pages (about:blank) can't load file:// subresources.
const SEAL = 'data:image/png;base64,' +
  fs.readFileSync(path.join(ROOT, 'public', 'concept-arts', 'stems', 'geng.png'), 'base64');

// Silk gradient mirrors SilkPaper (src/styles/tokens.jsx).
const html = (size, sealScale) => `<!doctype html><html><body style="margin:0">
  <div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;
              background:linear-gradient(135deg,#F4ECD9 0%,#EFE5CC 55%,#E8DCBD 100%)">
    <img src="${SEAL}" style="width:${Math.round(size * sealScale)}px;height:auto" />
  </div></body></html>`;

const JOBS = [
  { out: 'icon-192.png',          size: 192, sealScale: 0.78 },
  { out: 'icon-512.png',          size: 512, sealScale: 0.78 },
  { out: 'icon-512-maskable.png', size: 512, sealScale: 0.62 }, // 80% safe zone
  { out: 'apple-touch-icon.png',  size: 180, sealScale: 0.78 },
];

const browser = await chromium.launch();
for (const j of JOBS) {
  const page = await browser.newPage({ viewport: { width: j.size, height: j.size } });
  await page.setContent(html(j.size, j.sealScale), { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, j.out) });
  console.log('  icon', j.out);
  await page.close();
}
await browser.close();
console.log(`DONE — ${JOBS.length} icons → ${OUT}`);
