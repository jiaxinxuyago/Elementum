// Downscale/re-encode large source images to web-friendly JPEGs in the portfolio assets.
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const OUT = 'D:/Elementum/portfolio_site/src/assets';
const JOBS = [
  { src: 'D:/Elementum/Elementum_Project/Design/reference/InkWash/FromClaude/01-fan-kuan-travelers.jpg', out: 'journey-fankuan.jpg', w: 1200 },
];

const browser = await chromium.launch();
for (const j of JOBS) {
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  const url = pathToFileURL(j.src).href;
  await page.setContent(`<style>*{margin:0}img{display:block;width:${j.w}px;height:auto}</style><img src="${url}">`);
  await page.waitForFunction(() => { const i = document.querySelector('img'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 30000 });
  await page.waitForTimeout(300);
  const img = await page.$('img');
  await img.screenshot({ path: path.join(OUT, j.out), type: 'jpeg', quality: 84 });
  console.log('  optimized', j.out);
  await page.close();
}
await browser.close();
console.log('DONE');
