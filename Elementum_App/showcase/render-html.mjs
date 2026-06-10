// Screenshot curated design-iteration HTML files (from the unzipped Claude-design
// export) into the portfolio's src/assets as journey-*.jpg, for the design-evolution
// chapters.  Run: node showcase/render-html.mjs  (from Elementum_App/)
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const BASE = 'D:/Elementum/Elementum_Project/Reference/Elementum_unzip';
const OUT = 'D:/Elementum/portfolio_site/src/assets';
fs.mkdirSync(OUT, { recursive: true });

// w/h = viewport; y = scroll offset before capturing the viewport
const JOBS = [
  { f: 'Elementum - Logo Explorations v4.html',                 out: 'journey-logos',            w: 1440, h: 900 },
  { f: 'Elementum - Visual Directions v2.html',                 out: 'journey-directions',       w: 1440, h: 900 },
  { f: 'prototypes/Minimal Card Directions.html',               out: 'journey-card-directions',  w: 1440, h: 900 },
  { f: 'elementum-design-legend.html',                          out: 'journey-legend-primitives',w: 1440, h: 900 },
  { f: 'elementum-design-legend-v2-screens.html',               out: 'journey-legend-v2',        w: 1440, h: 900 },
  { f: 'elementum-design-legend-v3-screens.html',               out: 'journey-legend-v3',        w: 1440, h: 900 },
  { f: 'wireframes/Today - IA Directions.html',                 out: 'journey-wireframe-ia',     w: 1440, h: 900 },
  { f: 'wireframes/Reading Catalogue - Wireframes.html',        out: 'journey-wireframe-reading',w: 1440, h: 900 },
  { f: 'wireframes/Reading Catalogue - Final.html',             out: 'journey-reading-final',    w: 1440, h: 900 },
  { f: 'v4/elementum-design-legend-v4-polish.html',             out: 'journey-legend-v4',        w: 1440, h: 900 },
  { f: 'elementum-design-legend-v6.html',                       out: 'journey-legend-v6',        w: 1440, h: 900 },
  { f: 'v7/elementum-design-legend-v7.html',                    out: 'journey-legend-v7',        w: 1440, h: 900 },
  { f: 'rendered-screens/Elementum - Rendered Screens.html',    out: 'journey-rendered',         w: 1440, h: 900 },
  { f: 'moodboard/Thumbnail Card Moodboard.html',               out: 'journey-moodboard',        w: 1440, h: 900 },
];

const browser = await chromium.launch();
for (const j of JOBS) {
  const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 2 });
  const url = pathToFileURL(path.join(BASE, j.f)).href;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
    await page.waitForTimeout(1400);
    if (j.y) await page.evaluate((y) => window.scrollTo(0, y), j.y);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, j.out + '.jpg'), type: 'jpeg', quality: 86 });
    console.log('  shot', j.out, '  <-', j.f);
  } catch (e) {
    console.log('  !! FAILED', j.out, e.message);
  }
  await page.close();
}
await browser.close();
console.log(`\nDONE — ${JOBS.length} attempted → ${OUT}`);
