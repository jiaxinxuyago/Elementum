// Render check for the Domains + Blueprint audit: every preset chart on the deployed site, Advisor tier.
//   node ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/qa/render.mjs [https://dev.elementum.life/]
import { createRequire } from 'node:module';
const { chromium } = createRequire('/home/user/Elementum/Elementum_App/package.json')('playwright');
const URL = process.argv[2] || 'https://dev.elementum.life/';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const rows = [];
for (const stem of ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui']) {
  const p = await (await b.newContext({ viewport: { width: 430, height: 932 } })).newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'networkidle' }); await p.waitForFunction(() => typeof window.__seedData === 'function', null, { timeout: 60000 });
  await p.evaluate((s) => window.__seedData(s), stem); await p.evaluate(() => window.__setTier('advisor'));
  await p.evaluate(() => window.__goto('app-reading')); await p.waitForTimeout(2500);
  const r = await p.evaluate(() => {
    const out = {};
    for (const el of document.querySelectorAll('.jscreen[data-screen]')) {
      const n = el.dataset.screen; const t = el.textContent || '';
      out[n] = `${t.length}c ${el.querySelectorAll('.dp-draft').length}d${/undefined|NaN|\{[a-z_]+\}/.test(t) ? ' BAD' : ''}`;
    }
    return out;
  });
  rows.push({ stem, ...r, errors: errs.length }); await p.close();
}
console.table(rows); await b.close();
