// ===================================================================
// ELEMENTUM · Claude Design handoff capture (dev tooling, not shipped)
// ===================================================================
// Drives the running Vite dev server with headless Chromium and saves a
// clean, no-bezel PNG of every major screen at phone width (390px), full
// content height, plus a gallery index.html + manifest.json. These are the
// "copy these screens" reference set uploaded to Claude Design.
//
// Run with the dev server already up on :5173:
//   node design-handoff-capture.mjs
//
// Output → Design/handoff-claude-design/screens/*.png  (+ index.html, manifest.json)
// Seeds the canonical 庚 ("The Blade") chart; sets Advisor tier so gated
// feature pages render unlocked.
// ===================================================================

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173/';
const OUT_ROOT = 'D:/Elementum/Elementum_Project/Design/handoff-claude-design';
const OUT = path.join(OUT_ROOT, 'screens');
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Neutralize the 390×844 phone-frame clipping so the WHOLE scrolling page
// lays out at full height for a clean element screenshot (no bezel).
function expandFn() {
  const all = Array.from(document.querySelectorAll('div'));
  const pf = all.find((d) => d.style && d.style.width === '390px' && d.style.borderRadius === '40px');
  if (!pf) return -1;
  pf.querySelectorAll('[data-cap],[data-cap-grow]').forEach((el) => {
    el.removeAttribute('data-cap'); el.removeAttribute('data-cap-grow');
  });
  pf.setAttribute('data-cap', 'frame');
  pf.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.overflowY === 'auto' || cs.overflowY === 'scroll') el.setAttribute('data-cap', 'scroll');
  });
  pf.querySelectorAll('[data-cap="scroll"]').forEach((sc) => {
    let p = sc.parentElement;
    while (p && p !== pf) { p.setAttribute('data-cap-grow', '1'); p = p.parentElement; }
  });
  let s = document.getElementById('__capcss');
  if (!s) { s = document.createElement('style'); s.id = '__capcss'; document.head.appendChild(s); }
  s.textContent = `
    [data-cap="frame"]{height:auto!important;max-height:none!important;min-height:844px!important;overflow:visible!important;border-radius:0!important;box-shadow:none!important;aspect-ratio:auto!important;}
    [data-cap-grow]{height:auto!important;min-height:844px!important;max-height:none!important;overflow:visible!important;}
    [data-cap="frame"] > div{height:auto!important;min-height:844px!important;overflow:visible!important;}
    [data-cap="scroll"]{position:static!important;inset:auto!important;overflow:visible!important;height:auto!important;max-height:none!important;flex:none!important;}
  `;
  void pf.offsetHeight;
  return pf.offsetHeight;
}
function clearCapFn() {
  const s = document.getElementById('__capcss');
  if (s) s.textContent = '';
  document.querySelectorAll('[data-cap],[data-cap-grow]').forEach((el) => {
    el.removeAttribute('data-cap'); el.removeAttribute('data-cap-grow');
  });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  // Wait for the dev hooks rather than networkidle (the PWA/HMR socket keeps the
  // network busy and stalls networkidle).
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
  async function frameHandle() {
    const h = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll('div')).find((d) => d.style && d.style.width === '390px' && d.style.borderRadius === '40px'));
    return h.asElement();
  }
  async function shoot(name, { expand = true } = {}) {
    try {
      if (expand) await page.evaluate(expandFn); else await page.evaluate(clearCapFn);
      await sleep(300);
      const el = await frameHandle();
      if (!el) { console.log('  !! no frame for', name); return false; }
      await el.screenshot({ path: path.join(OUT, name + '.png') });
      if (expand) await page.evaluate(clearCapFn);
      console.log('  shot', name);
      return true;
    } catch (e) { console.log('  !! failed', name, e.message); return false; }
  }

  const manifest = [];
  async function cap(name, route, label, note, group, opts = {}) {
    if (route) await goto(route);
    if (opts.prep) await opts.prep();
    const ok = await shoot(name, opts);
    manifest.push({ file: `screens/${name}.png`, name, route: route || '(state)', label, note, group, ok });
  }

  // ─── PRE-DASHBOARD ────────────────────────────────────────────
  const G1 = '1 · Onboarding journey';
  await cap('01-welcome', 'welcome', 'Welcome', 'Entry — sets the contemplative ink-wash tone.', G1);
  await cap('02-year', 'step1', 'Onboarding · Year', 'Momentum wheel picker (inertia + snap).', G1);
  await cap('03-month', 'step2', 'Onboarding · Month', 'Wheel picker.', G1);
  await cap('04-day', 'step3', 'Onboarding · Day', 'Wheel picker.', G1);
  await cap('05-hour', 'step4', 'Onboarding · Hour', 'Exact / approximate / unknown branches.', G1);
  await cap('06-hourwindow', 'step4a', 'Onboarding · Hour window', '6-tile 时辰 grid (approximate branch).', G1);
  await cap('07-location', 'step5', 'Onboarding · Location', 'City autocomplete for true solar time.', G1);
  await cap('08-polarity', 'step6', 'Onboarding · Gender', 'Drives luck-pillar direction.', G1);
  await cap('09-energycurrent', 'step6a', 'Onboarding · Energy current', 'Prefer-not-to-specify branch.', G1);
  await cap('10-notify', 'step7', 'Onboarding · Notifications', 'Daily-reading opt-in + toggle.', G1);
  await cap('11-notifytime', 'step7a', 'Onboarding · Notify time', 'Triple wheel time picker.', G1);
  await cap('12-reveal', 'reveal', 'Reveal (identity plate)', 'First-run ceremony; swipe dissolves into the catalogue.', G1);

  // ─── READING TAB + DRILL-DOWNS ────────────────────────────────
  const G2 = '2 · Reading tab (Five Energies)';
  await setTier('advisor');
  await cap('13-catalogue', 'app-reading', 'Reading catalogue', 'Dominance wheel + prescription ribbon + energy shelf.', G2);
  await cap('14-energy-card', 'app-energy', 'Energy reading card', 'Swipe carousel through the five energies (P6/P7).', G2);
  await cap('15-daymaster', 'app-daymaster', 'Day Master card', 'Identity seal + manifesto + claims (P4).', G2);
  await cap('16-pillars', 'app-pillars', 'Pillar Chart (八字)', 'Four-pillars data page (P5).', G2);

  // NOTE: the old reading-detail pages (read-elemental/tengods/forces/chapters/
  // patterns/seasonal) are orphaned in the current build — only the retired
  // ReadingScreen linked them; the D13 catalogue replaced it. Not captured.

  // ─── TODAY TAB + HUB DRILL-DOWNS ──────────────────────────────
  const G4 = '4 · Today tab + time drill-downs';
  await cap('23-today', 'app-today', 'Today hub', 'Day narrative + Do/Avoid + best hours + time cards.', G4);
  await cap('24-day', 'app-day', 'Today · Day', 'Single-day reading.', G4);
  await cap('25-month', 'app-month', 'Today · Month', 'Month energy + calendar.', G4);
  await cap('26-year', 'app-year', 'Today · Year', 'Year energy + 12-bar timeline.', G4);
  await cap('27-decade', 'app-decade', 'Today · Decade', 'Decade (大运) chapter.', G4);

  // ─── GUIDANCE HUB + 5 FEATURES  (lead renovation set) ─────────
  const G5 = '5 · Guidance hub + feature suite';
  await cap('28-guidance', 'app-guidance', 'Guidance hub', 'Featured Elemental Draw + 2×2 feature grid.', G5);
  await cap('29-draw', 'app-draw', 'Feature · Elemental Draw', 'Daily card-draw ritual.', G5);
  await cap('30-manual', 'app-manual', 'Feature · Energy Manual', 'Five life-domain reading.', G5);
  await cap('31-selfreport', 'app-selfreport', 'Feature · Self-Report', 'Calibration questionnaire.', G5);
  await cap('32-consultant', 'app-consultant', 'Feature · AI Consultant', 'Context bar + chat.', G5);
  await cap('33-codex', 'app-codex', 'Feature · BaZi Codex', 'Concept accordion.', G5);

  // ─── COMPATIBILITY JOURNEY ────────────────────────────────────
  const G6 = '6 · Compatibility journey';
  await cap('34-compat-intro', 'app-compat', 'Compatibility · Intro', 'Eyebrow+title header + dual-seal + CTA.', G6);
  await cap('35-compat-input', null, 'Compatibility · Input', 'Other-person entry form.', G6, {
    prep: async () => {
      await clickText('Compare with someone');
      await page.evaluate(() => {
        const set = (ph, v) => { const i = document.querySelector(`input[placeholder*="${ph}"]`); if (i) { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); } };
        set('YYYY', '1990'); set('MM', '6'); set('DD', '15'); set('name', 'Mara');
      });
      await sleep(300);
    },
  });
  await cap('36-compat-result', null, 'Compatibility · Result', '% score + relationship archetype + reading.', G6, {
    prep: () => clickText('Calculate Compatibility'),
  });

  // ─── PROFILE + CHART TOOLS ────────────────────────────────────
  const G7 = '7 · Profile + chart tools';
  await cap('37-profile', 'app-profile', 'Profile', 'Birth data + daily reading + plan.', G7);
  await cap('38-resonance', 'chart-resonance', 'Chart Resonance', 'Recover an unknown birth hour.', G7);

  fs.writeFileSync(path.join(OUT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await browser.close();

  // ─── gallery ──────────────────────────────────────────────────
  const groups = [...new Set(manifest.map((m) => m.group))];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cards = (g) => manifest.filter((m) => m.group === g).map((m) => `
      <figure class="card${m.ok ? '' : ' bad'}">
        <div class="shot"><img loading="lazy" src="${m.file}" alt="${esc(m.label)}"/></div>
        <figcaption><div class="cl">${esc(m.label)}</div><div class="cr"><code>#/${esc(m.route)}</code></div><div class="cn">${esc(m.note)}</div></figcaption>
      </figure>`).join('');
  const sections = groups.map((g) => `<section class="grp"><h2>${esc(g)}</h2><div class="grid">${cards(g)}</div></section>`).join('');
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Elementum · Current Screens — Claude Design handoff</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root{--cream:#F8F6F0;--silk:#F1E9D6;--paperHair:#CDBE9E;--ink:#2B2722;--inkSoft:#4A433B;--inkLight:#857D72;--bronzeDark:#6b5339;}
  *{box-sizing:border-box;}body{margin:0;background:#E4DCC9;color:var(--ink);font-family:"EB Garamond",Georgia,serif;}
  .wrap{max-width:1400px;margin:0 auto;padding:48px 28px 80px;}
  header.top{background:var(--cream);border:1px solid var(--paperHair);border-radius:16px;padding:30px 32px;margin-bottom:26px;}
  .eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--bronzeDark);font-weight:500;margin:0 0 8px;}
  h1{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:38px;margin:0 0 6px;}
  header.top p{font-size:16px;color:var(--inkSoft);margin:8px 0 0;max-width:820px;line-height:1.55;}
  .grp{margin-bottom:34px;}.grp h2{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:24px;border-bottom:1px solid var(--paperHair);padding-bottom:8px;margin:0 0 18px;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;align-items:start;}
  .card{background:var(--cream);border:1px solid var(--paperHair);border-radius:14px;overflow:hidden;}.card.bad{outline:2px solid #c4745a;}
  .shot{background:var(--silk);max-height:620px;overflow:auto;border-bottom:1px solid var(--paperHair);}.shot img{display:block;width:100%;height:auto;}
  figcaption{padding:12px 14px 14px;}.cl{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:600;}
  .cr{margin:3px 0 6px;}.cr code{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:var(--bronzeDark);background:var(--silk);border:1px solid var(--paperHair);border-radius:5px;padding:1px 6px;}
  .cn{font-size:13.5px;color:var(--inkSoft);line-height:1.5;}
</style></head><body><div class="wrap">
<header class="top"><p class="eyebrow">Reference · current build · seeded 庚 "The Blade" · ${new Date().toISOString().slice(0, 10)}</p>
<h1>Elementum — Current Screens</h1>
<p>Clean, no-bezel, full-content captures of every major screen in the running app — the <strong>copy-these-screens</strong> reference for the Claude Design UI/UX pass. The visible phone screen is the top 844px of each; everything below is scrollable content. Pair with <code>00-MASTER-CONTEXT.md</code> and the per-page briefs.</p></header>
${sections}</div></body></html>`;
  fs.writeFileSync(path.join(OUT_ROOT, 'index.html'), html);
  const okN = manifest.filter((m) => m.ok).length;
  console.log(`\nDONE — ${okN}/${manifest.length} captured → ${OUT_ROOT}`);
})();
