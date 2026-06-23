// ===================================================================
// ELEMENTUM · Export every screen to ONE self-contained HTML showcase
// ===================================================================
// Drives the running dev server, captures the REAL rendered DOM of every
// major screen (the phone-frame's outerHTML, inline styles intact), bundles
// the app's CSS (d13.css + global.css + base + fonts), and writes a single
// gallery file Claude Design can use to replicate the exact screens.
//
// Run with the dev server up on :5173:
//   node export-screens-html.mjs
// Output → Design/handoff-claude-design/current-screens.html
//
// Asset URLs (/backgrounds, /assets, /concept-arts, /icons) are rewritten to
// the live origin so images load when the file is opened in a real browser.
// Each frame is corrected to the on-DEVICE look (mock status bar hidden, D13
// header inset 54px) so the showcase matches the shipped app, not the
// desktop-frame illusion.
// ===================================================================

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173/';
const LIVE = 'https://elementum.jiaxinxuyago.workers.dev';
const APP = 'D:/Elementum/Elementum_Project/Elementum_App';
const OUT = 'D:/Elementum/Elementum_Project/Design/handoff-claude-design/current-screens.html';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const read = (p) => { try { return fs.readFileSync(path.join(APP, p), 'utf8'); } catch { return ''; } };

// Rewrite root-relative asset URLs → live origin (so images resolve in a browser).
function liveAssets(s) {
  return s.replace(/(url\(['"]?|src=['"]|href=['"]|&quot;)\/(backgrounds|assets|concept-arts|icons|fonts)\//g,
    `$1${LIVE}/$2/`);
}

(async () => {
  const browser = await chromium.launch();
  // Wide viewport → app renders in desktop-frame mode (the framed 390×844 we want
  // to showcase); the gallery CSS below corrects it to the on-device appearance.
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.__seedData === 'function' && typeof window.__goto === 'function', { timeout: 20000 });
  await page.evaluate(() => window.__seedData('geng'));
  await sleep(500);
  await page.evaluate(() => document.fonts && document.fonts.ready);

  async function goto(route) { await page.evaluate((r) => window.__goto(r), route); await sleep(600); }
  async function setTier(t) { await page.evaluate((tt) => window.__setTier && window.__setTier(tt), t); await sleep(200); }
  async function clickText(txt) {
    await page.evaluate((t) => {
      const el = Array.from(document.querySelectorAll('button, a, [role="button"], div'))
        .find((b) => (b.textContent || '').replace(/\s+/g, ' ').trim() === t)
        || Array.from(document.querySelectorAll('button, a, [role="button"]'))
        .find((b) => (b.textContent || '').replace(/\s+/g, ' ').includes(t));
      if (el) el.click();
    }, txt);
    await sleep(500);
  }
  async function grabFrame() {
    return page.evaluate(() => {
      const f = Array.from(document.querySelectorAll('div')).find((d) => d.style && d.style.width === '390px' && d.style.borderRadius === '40px');
      return f ? f.outerHTML : null;
    });
  }

  const items = [];
  async function cap(name, route, label, group, opts = {}) {
    if (route) await goto(route);
    if (opts.prep) await opts.prep();
    const html = await grabFrame();
    if (html) { items.push({ name, label, group, html: liveAssets(html) }); console.log('  grabbed', name); }
    else console.log('  !! no frame for', name);
  }

  const G1 = '1 · Onboarding journey';
  await cap('welcome', 'welcome', 'Welcome', G1);
  await cap('year', 'step1', 'Onboarding · Year', G1);
  await cap('month', 'step2', 'Onboarding · Month', G1);
  await cap('day', 'step3', 'Onboarding · Day', G1);
  await cap('hour', 'step4', 'Onboarding · Hour', G1);
  await cap('hourwindow', 'step4a', 'Onboarding · Hour window', G1);
  await cap('location', 'step5', 'Onboarding · Location', G1);
  await cap('polarity', 'step6', 'Onboarding · Gender', G1);
  await cap('energycurrent', 'step6a', 'Onboarding · Energy current', G1);
  await cap('notify', 'step7', 'Onboarding · Notifications', G1);
  await cap('notifytime', 'step7a', 'Onboarding · Notify time', G1);
  await cap('reveal', 'reveal', 'Reveal (identity plate)', G1);

  const G2 = '2 · Reading tab (Five Energies)';
  await setTier('advisor');
  await cap('catalogue', 'app-reading', 'Reading catalogue', G2);
  await cap('energy-card', 'app-energy', 'Energy reading card', G2);
  await cap('daymaster', 'app-daymaster', 'Day Master card', G2);
  await cap('pillars', 'app-pillars', 'Pillar Chart (八字)', G2);

  const G3 = '3 · Today tab + time drill-downs';
  await cap('today', 'app-today', 'Today hub', G3);
  await cap('day-page', 'app-day', 'Today · Day', G3);
  await cap('month-page', 'app-month', 'Today · Month', G3);
  await cap('year-page', 'app-year', 'Today · Year', G3);
  await cap('decade-page', 'app-decade', 'Today · Decade', G3);

  const G4 = '4 · Guidance hub + feature suite';
  await cap('guidance', 'app-guidance', 'Guidance hub', G4);
  await cap('draw', 'app-draw', 'Feature · Elemental Draw', G4);
  await cap('manual', 'app-manual', 'Feature · Energy Manual', G4);
  await cap('selfreport', 'app-selfreport', 'Feature · Self-Report', G4);
  await cap('consultant', 'app-consultant', 'Feature · AI Consultant', G4);
  await cap('codex', 'app-codex', 'Feature · BaZi Codex', G4);

  const G5 = '5 · Compatibility journey';
  await cap('compat-intro', 'app-compat', 'Compatibility · Intro', G5);
  await cap('compat-input', null, 'Compatibility · Input', G5, {
    prep: async () => {
      await clickText('Compare with someone');
      await page.evaluate(() => {
        const set = (ph, v) => { const i = document.querySelector(`input[placeholder*="${ph}"]`); if (i) { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); } };
        set('YYYY', '1990'); set('MM', '6'); set('DD', '15'); set('name', 'Mara');
      });
      await sleep(300);
    },
  });
  await cap('compat-result', null, 'Compatibility · Result', G5, { prep: () => clickText('Calculate Compatibility') });

  const G6 = '6 · Profile + chart tools';
  await cap('profile', 'app-profile', 'Profile', G6);
  await cap('resonance', 'chart-resonance', 'Chart Resonance', G6);

  await browser.close();

  // ── assemble the single showcase file ─────────────────────────
  const d13css = liveAssets(read('src/components/d13/d13.css'));
  const globalcss = liveAssets(read('src/styles/global.css'));
  const tokens = liveAssets(read('public/tokens.css'));
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const groups = [...new Set(items.map((i) => i.group))];

  const frames = (g) => items.filter((i) => i.group === g).map((i) => `
    <figure class="item">
      <figcaption>${esc(i.label)} &nbsp;·&nbsp; <code>${esc(i.name)}</code></figcaption>
      <div class="device">${i.html}</div>
    </figure>`).join('');
  const sections = groups.map((g) => `<section class="grp"><h2>${esc(g)}</h2><div class="row">${frames(g)}</div></section>`).join('');

  const doc = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Elementum · Current Screens (exact HTML) — for Claude Design</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600&family=EB+Garamond:wght@400;500&family=JetBrains+Mono:wght@400;500;700&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;500;600&family=Noto+Serif+TC:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
/* ===== bundled app CSS (verbatim) ===== */
${tokens}
${globalcss}
${d13css}
/* ===== app base (from index.html) ===== */
*,*::before,*::after{box-sizing:border-box;}
button{font-family:inherit;}
/* ===== gallery chrome ===== */
:root{--paper:#E4DCC9;--cream:#F8F6F0;--paperHair:#CDBE9E;--ink:#2B2722;--inkSoft:#4A433B;--bronzeDark:#6b5339;}
html,body{margin:0;}
body{background:var(--paper);color:var(--ink);font-family:"EB Garamond",Georgia,serif;padding:40px 28px 80px;}
.head{background:var(--cream);border:1px solid var(--paperHair);border-radius:16px;padding:28px 30px;margin:0 auto 30px;max-width:1320px;}
.head .eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--bronzeDark);font-weight:500;margin:0 0 8px;}
.head h1{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:36px;margin:0 0 8px;}
.head p{font-size:15px;color:var(--inkSoft);line-height:1.55;max-width:900px;margin:6px 0 0;}
.wrap{max-width:1320px;margin:0 auto;}
.grp{margin:0 0 40px;}
.grp h2{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:24px;border-bottom:1px solid var(--paperHair);padding-bottom:8px;margin:0 0 22px;}
.row{display:flex;flex-wrap:wrap;gap:40px 34px;align-items:flex-start;}
.item{margin:0;}
.item figcaption{font-size:13px;color:var(--inkSoft);margin:0 0 10px;}
.item figcaption code{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;color:var(--bronzeDark);background:var(--cream);border:1px solid var(--paperHair);border-radius:5px;padding:1px 6px;}
/* the captured phone frame sits in a shadowed device shell at exact 390×844 */
.device{width:390px;height:844px;position:relative;border-radius:40px;overflow:hidden;box-shadow:0 24px 60px rgba(40,30,20,.28);}
.device > .el-frame{box-shadow:none!important;}
/* correct the captured desktop-mode DOM to the on-DEVICE look (QA baseline):
   hide the mock status bars; D13 header inset = 54px (mobile rule isn't active
   at this gallery width). Dashboard mains already carry inline 54px. */
.device .el-statusbar,.device .d13 .status{display:none!important;}
.device .d13 .screen-pad{padding-top:54px!important;}
</style></head>
<body>
<div class="head">
  <p class="eyebrow">Exact current screens · rendered HTML · seeded 庚 "The Blade" · ${new Date().toISOString().slice(0, 10)}</p>
  <h1>Elementum — Current Screens (exact HTML)</h1>
  <p>The <strong>real rendered markup</strong> of every major screen, with the app's actual inline styles + bundled CSS (d13.css / global.css / tokens) — so the structure, spacing, type and color are exact and directly replicable. Each device is the shipped 390×844 frame, corrected to the on-device look (no mock status bar, 54px header inset). Painted background art loads from the live site (${LIVE}); if images don't appear (e.g. offline / sandboxed), the layout still reproduces precisely. Scope for Claude Design: <strong>consistency + polish only — replicate exactly, then refine. No redesign.</strong></p>
</div>
<div class="wrap">${sections}</div>
</body></html>`;

  fs.writeFileSync(OUT, doc);
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`\nDONE — ${items.length} screens → ${OUT} (${kb} KB)`);
})();
