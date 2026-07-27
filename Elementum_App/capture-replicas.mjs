// ===================================================================
// ELEMENTUM · App-replica capture (dev tooling, not shipped)
// ===================================================================
// Drives the running Vite dev server with headless Chromium and saves a
// FULL-PAGE PNG of every route/state, then writes a gallery index.html.
//
// Run with the dev server already up on :5173:
//   node capture-replicas.mjs
//
// Output → Design/app-replicas/{screens/*.png,index.html}
// Seeds the canonical 庚 ("The Blade") chart so every screen has data.
// ===================================================================

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173/';
const OUT_ROOT = path.resolve(import.meta.dirname, '../Design/app-replicas');
const OUT = path.join(OUT_ROOT, 'screens');
fs.mkdirSync(OUT, { recursive: true });

// ── injected: neutralize the 390×844 phone-frame clipping so the whole
//    scrolling page lays out at full height for an element screenshot ──
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
  const nav = pf.querySelector('nav[aria-label="Primary navigation"]');
  if (nav) nav.setAttribute('data-cap', 'nav');
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
    [data-cap="scroll"]{position:static!important;inset:auto!important;overflow:visible!important;height:auto!important;max-height:none!important;flex:none!important;padding-bottom:0!important;}
    [data-cap="nav"]{position:static!important;}
  `;
  void pf.offsetHeight;
  return pf.offsetHeight;
}

// restore the frame to its natural 390×844 (for modal/overlay captures)
function clearCapFn() {
  const s = document.getElementById('__capcss');
  if (s) s.textContent = '';
  document.querySelectorAll('[data-cap],[data-cap-grow]').forEach((el) => {
    el.removeAttribute('data-cap'); el.removeAttribute('data-cap-grow');
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof window.__seedData === 'function' && typeof window.__goto === 'function');
  await page.evaluate(() => window.__seedData('geng'));
  await sleep(400);
  await page.evaluate(() => document.fonts && document.fonts.ready);

  async function goto(route) {
    await page.evaluate((r) => window.__goto(r), route);
    await sleep(550);
  }
  async function setTier(t) {
    const price = t === 'seeker' ? '$9.99/mo' : t === 'advisor' ? '$19.99/mo' : '$0';
    // Route to a neutral screen first so the DevBar tier button is the only
    // element carrying the price string (avoids matching modal/profile prices).
    await page.evaluate(() => window.__goto('welcome'));
    await sleep(250);
    await page.evaluate((p) => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) => (b.textContent || '').includes(p));
      if (btn) btn.click();
    }, price);
    await sleep(250);
  }
  async function clickText(txt) {
    await page.evaluate((t) => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find((b) => b.textContent.replace(/\s+/g, ' ').trim().includes(t));
      if (btn) btn.click();
    }, txt);
    await sleep(450);
  }
  async function clickTab(name) {
    await page.evaluate((n) => {
      const b = Array.from(document.querySelectorAll('[role="tab"]'))
        .find((x) => x.textContent.trim().toLowerCase() === n);
      if (b) b.click();
    }, name);
    await sleep(450);
  }
  async function frameHandle() {
    const h = await page.evaluateHandle(() =>
      Array.from(document.querySelectorAll('div'))
        .find((d) => d.style && d.style.width === '390px' && d.style.borderRadius === '40px'));
    return h.asElement();
  }
  async function shoot(name, { expand = true } = {}) {
    try {
      if (expand) { await page.evaluate(expandFn); } else { await page.evaluate(clearCapFn); }
      await sleep(250);
      const el = await frameHandle();
      if (!el) { console.log('  !! no frame for', name); return false; }
      await el.screenshot({ path: path.join(OUT, name + '.png') });
      console.log('  shot', name);
      return true;
    } catch (e) {
      console.log('  !! failed', name, e.message);
      return false;
    }
  }

  const manifest = [];
  async function cap(name, route, label, note, group, opts) {
    if (route) await goto(route);
    if (opts && opts.prep) await opts.prep();
    const ok = await shoot(name, opts);
    manifest.push({ file: `screens/${name}.png`, name, route: route || '(state)', label, note, group, ok });
  }

  // ─── ONBOARDING ───────────────────────────────────────────────
  const G1 = 'Pre-dashboard flow';
  await cap('01-welcome', 'welcome', 'Welcome', 'First screen — sets the contemplative tone.', G1);
  await cap('02-step1-year', 'step1', 'Onboarding · Year', 'Birth-year entry.', G1);
  await cap('03-step2-month', 'step2', 'Onboarding · Month', 'Birth-month entry.', G1);
  await cap('04-step3-day', 'step3', 'Onboarding · Day', 'Birth-day entry.', G1);
  await cap('05-step4-hour', 'step4', 'Onboarding · Hour', 'Birth-hour entry (exact / approximate / unknown).', G1);
  await cap('06-step4a-hourwindow', 'step4a', 'Onboarding · Hour window', 'Approximate-hour branch.', G1);
  await cap('07-step5-location', 'step5', 'Onboarding · Location', 'Birth location for true solar time.', G1);
  await cap('08-step6-polarity', 'step6', 'Onboarding · Polarity', 'Gender/polarity for luck-pillar direction.', G1);
  await cap('09-step6a-energycurrent', 'step6a', 'Onboarding · Energy current', 'Prefer-not-to-specify branch.', G1);
  await cap('10-step7-notify', 'step7', 'Onboarding · Notifications', 'Daily-reading opt-in.', G1);
  await cap('11-step7a-notifytime', 'step7a', 'Onboarding · Notify time', 'Delivery-time branch.', G1);
  await cap('12-loading', 'loading', 'Loading', 'Chart-calculation ceremony (auto-advances).', G1);
  await cap('13-reveal', 'reveal', 'Reveal', 'First-run identity reveal with enter-dashboard CTA.', G1);

  // ─── READING TAB + DETAILS (Seeker) ───────────────────────────
  const G2 = 'Reading (center tab) + detail pages';
  await setTier('seeker');
  await cap('14-reading-catalogue-seeker', 'app-reading', 'Reading catalogue · Seeker', 'Day-master hero + 6 reading tiles (Daily Reading unlocked).', G2);
  await cap('15-energy-map', 'app-energymap', 'Energy Map', 'Full energy summary — identity + blueprint.', G2);
  await cap('16-read-elemental', 'read-elemental', 'Detail · Elemental Nature', 'Reading-detail template (hero + section cards + prev/next).', G2);
  await cap('17-read-daymaster', 'read-daymaster', 'Detail · Day Master', 'Day-master identity long-form.', G2);
  await cap('18-read-tengods', 'read-tengods', 'Detail · Ten Gods', 'Adds weighted role-ring + pillar grid.', G2);
  await cap('19-read-forces', 'read-forces', 'Detail · Forces in Motion', 'Adds ↑Catalyst / ↓Resistance pair.', G2);
  await cap('20-read-chapters', 'read-chapters', 'Detail · Life Chapters', 'Adds horizontal decade timeline.', G2);
  await cap('21-read-patterns', 'read-patterns', 'Detail · Pillar Patterns', 'Adds 合冲刑害 pattern badges.', G2);
  await cap('22-read-seasonal', 'read-seasonal', 'Detail · Seasonal Calibration', 'Conditional missing-element prescription.', G2);
  await cap('23-read-locked', 'read-locked', 'Detail · Locked', 'Generic locked-section state.', G2);
  await cap('24-chart-reveal-rawchart', 'chart-reveal', 'Raw Chart (Four Pillars)', 'Literal 4-pillar grid, day pillar highlighted.', G2);
  await setTier('free');
  await cap('25-reading-catalogue-free', 'app-reading', 'Reading catalogue · Free', 'Daily Reading tile locked (Seeker chip).', G2);

  // ─── TODAY (Seeker) — 3 in-screen states ──────────────────────
  const G3 = 'Today tab';
  await setTier('seeker');
  await cap('26-today-today', 'app-today', 'Today · TODAY', 'Decade card + daily narrative + Do/Avoid + Best Hours + Catalyst.', G3);
  await cap('27-today-month', 'app-today', 'Today · MONTH', '7-col element-dot calendar + flow windows.', G3, { prep: () => clickTab('month') });
  await cap('28-today-year', 'app-today', 'Today · YEAR', 'Year-energy card + strategic paragraph + 12-bar timeline.', G3, { prep: () => clickTab('year') });

  // ─── GUIDANCE hub + 5 subs ────────────────────────────────────
  const G4 = 'Guidance hub + sub-screens';
  await setTier('free');
  await cap('29-guidance-free', 'app-guidance', 'Guidance hub · Free', 'Locked cards show Unlock CTAs.', G4);
  await setTier('advisor');
  await cap('30-guidance-advisor', 'app-guidance', 'Guidance hub · Advisor', 'All feature cards unlocked.', G4);
  await cap('31-codex', 'app-codex', 'Guidance · BaZi Codex', 'Accordion entries: definition / explanation / your chart.', G4);
  await cap('32-draw', 'app-draw', 'Guidance · Elemental Draw', 'Fanned deck → draw → flip-reveal ritual.', G4);
  await cap('33-manual', 'app-manual', 'Guidance · Energy Manual', 'Setup → 5 domain tabs → 3 sections each.', G4);
  await cap('34-selfreport', 'app-selfreport', 'Guidance · Self-Report', 'Calibration: single/multi-select + textarea.', G4);
  await cap('35-consultant', 'app-consultant', 'Guidance · AI Consultant', 'Context bar + chat history + input.', G4);

  // ─── COMPATIBILITY (intro / input / result ×2) ────────────────
  const G5 = 'Friends / Compatibility';
  await setTier('seeker');
  await cap('36-compat-intro', 'app-compat', 'Compatibility · Intro', 'Dual-seal + "Compare with someone".', G5);
  await cap('37-compat-input', null, 'Compatibility · Input', 'Manual entry form for the other person.', G5, {
    prep: async () => {
      await clickText('Compare with someone');
      await page.evaluate(() => {
        const set = (ph, v) => { const i = document.querySelector(`input[placeholder="${ph}"]`); if (i) { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); } };
        set('YYYY', '1990'); set('MM', '6'); set('DD', '15');
        const n = document.querySelector('input[placeholder*="name"]'); if (n) { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(n, 'Mara'); n.dispatchEvent(new Event('input', { bubbles: true })); }
      });
      await sleep(300);
    },
  });
  await cap('38-compat-result-seeker', null, 'Compatibility · Result (Seeker)', '% score + full reading + share card.', G5, {
    prep: () => clickText('Calculate Compatibility'),
  });
  await setTier('free');
  await cap('39-compat-result-free', 'app-compat', 'Compatibility · Result (Free)', 'Teaser + upgrade gate.', G5, {
    prep: async () => {
      await clickText('Compare with someone');
      await page.evaluate(() => {
        const set = (ph, v) => { const i = document.querySelector(`input[placeholder="${ph}"]`); if (i) { const s = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; s.call(i, v); i.dispatchEvent(new Event('input', { bubbles: true })); } };
        set('YYYY', '1990'); set('MM', '6'); set('DD', '15');
      });
      await sleep(250);
      await clickText('Calculate Compatibility');
    },
  });

  // ─── PROFILE ──────────────────────────────────────────────────
  const G6 = 'Profile + chart tools';
  await setTier('seeker');
  await cap('40-profile', 'app-profile', 'Profile', 'Birth data + notifications + account (minimal by design).', G6);
  await cap('41-resonance-intro', 'chart-resonance', 'Chart Resonance · Intro', 'Recover an unknown birth hour by resonance.', G6);
  await cap('42-resonance-result', null, 'Chart Resonance · Result', 'Discovered 时辰 + confidence + apply CTA.', G6, {
    prep: async () => {
      await clickText('Begin');
      await clickText('Before the world wakes');
      await clickText('I watch and read it first');
      await clickText('Steadiness');
    },
  });

  // ─── UPGRADE MODAL (overlay, natural size) ────────────────────
  const G7 = 'Cross-cutting';
  await setTier('free');
  await cap('43-upgrade-modal', 'app-guidance', 'Upgrade modal (§21)', 'Tier comparison opened from a locked card.', G7, {
    expand: false,
    prep: async () => { await clickText('Unlock with Seeker'); await sleep(500); },
  });

  fs.writeFileSync(path.join(OUT_ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await browser.close();

  // ─── build index.html gallery ─────────────────────────────────
  const groups = [...new Set(manifest.map((m) => m.group))];
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cards = (g) => manifest.filter((m) => m.group === g).map((m) => `
      <figure class="card${m.ok ? '' : ' bad'}">
        <div class="shot"><img loading="lazy" src="${m.file}" alt="${esc(m.label)}"/></div>
        <figcaption>
          <div class="cl">${esc(m.label)}</div>
          <div class="cr"><code>${esc(m.route)}</code></div>
          <div class="cn">${esc(m.note)}</div>
        </figcaption>
      </figure>`).join('');
  const sections = groups.map((g) => `
    <section class="grp">
      <h2>${esc(g)}</h2>
      <div class="grid">${cards(g)}</div>
    </section>`).join('');

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Elementum · App Replicas — current build</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=EB+Garamond:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root{--cream:#F8F6F0;--silk:#F1E9D6;--paperHair:#CDBE9E;--ink:#2B2722;--inkSoft:#4A433B;--inkLight:#857D72;--bronzeDark:#6b5339;--gold:#D4AF37;}
  *{box-sizing:border-box;} body{margin:0;background:#E4DCC9;color:var(--ink);font-family:"EB Garamond",Georgia,serif;}
  .wrap{max-width:1400px;margin:0 auto;padding:48px 28px 80px;}
  header.top{background:var(--cream);border:1px solid var(--paperHair);border-radius:16px;padding:30px 32px;margin-bottom:26px;}
  .eyebrow{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--bronzeDark);font-weight:500;margin:0 0 8px;}
  h1{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:38px;margin:0 0 6px;}
  header.top p{font-size:16px;color:var(--inkSoft);margin:8px 0 0;max-width:780px;line-height:1.55;}
  .grp{margin-bottom:34px;}
  .grp h2{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:24px;color:var(--ink);border-bottom:1px solid var(--paperHair);padding-bottom:8px;margin:0 0 18px;}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:22px;align-items:start;}
  .card{background:var(--cream);border:1px solid var(--paperHair);border-radius:14px;overflow:hidden;box-shadow:0 1px 0 rgba(43,39,34,.04);}
  .card.bad{outline:2px solid #c4745a;}
  .shot{background:var(--silk);max-height:560px;overflow:auto;border-bottom:1px solid var(--paperHair);}
  .shot img{display:block;width:100%;height:auto;}
  figcaption{padding:12px 14px 14px;}
  .cl{font-family:"Cormorant Garamond",serif;font-size:18px;font-weight:600;color:var(--ink);}
  .cr{margin:3px 0 6px;} .cr code{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:var(--bronzeDark);background:var(--silk);border:1px solid var(--paperHair);border-radius:5px;padding:1px 6px;}
  .cn{font-size:13.5px;color:var(--inkSoft);line-height:1.5;}
</style></head><body><div class="wrap">
<header class="top">
  <p class="eyebrow">Reference · current build · seeded 庚 "The Blade", live data</p>
  <h1>Elementum — App Replicas</h1>
  <p>Full-page screenshots of every screen in the running app, captured ${new Date().toISOString().slice(0, 10)}. Each card scrolls if the page is taller than the frame. These are the <strong>current</strong> layouts — the starting point for layout iteration, paired with the Design Status &amp; Direction handoff.</p>
</header>
${sections}
</div></body></html>`;
  fs.writeFileSync(path.join(OUT_ROOT, 'index.html'), html);
  const okN = manifest.filter((m) => m.ok).length;
  console.log(`\nDONE — ${okN}/${manifest.length} captured. Output: ${OUT_ROOT}`);
})();
