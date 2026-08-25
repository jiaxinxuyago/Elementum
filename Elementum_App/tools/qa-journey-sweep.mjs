// ===================================================================
// ELEMENTUM · Automated user-journey QA (dev tooling, not shipped)
// ===================================================================
// Drives the app the way a REAL first-run user does — no route
// teleporting on the golden path. Two scenarios at the canonical
// 390×844 viewport (chromium):
//
//   A · FIRST-RUN ONBOARDING (fresh context, empty localStorage,
//       geolocation/notification permissions denied):
//       welcome → Discover Yours → year/month/day momentum wheels
//       (real pointer drags + wheel-tick corrections) → exact-hour
//       branch 18:00 → location autocomplete ("Beijing" typed, the
//       suggestion picked; the Open-Meteo call is route-mocked so the
//       journey is hermetic) → gender male → notifications DECLINED
//       ("Skip for now" — no push subscription ever fires) → loading
//       → reveal. Asserts the persisted chart (elementum_chart_v1)
//       carries the golden 庚 pillars 乙亥/庚辰/庚寅/乙酉 — proving
//       wheel input → engine → persistence end-to-end — and that the
//       reveal renders a non-empty identity plate.
//
//   B · READING JOURNEYS (independent: seeded via window.__seedData
//       ('geng') + __setTier('advisor') dev hooks, then interaction-
//       driven, against the July 2026 JourneyStage (P6 journey)):
//       reveal swipe-up (the Naming ceremony's .rvl-overlay) → the
//       catalogue; wheel-node tap → compass cue → pill unfolds →
//       element panel → "Full reading" → app-energy faces page; all
//       five energies cycled that way (spine tap → Read → Full
//       reading); Day Master panel → full DM reading → Birth Chart
//       pillar glyphs; all 5 tab-bar taps; Today-hub
//       day/month/year/decade drill-downs.
//
// What empirically drives the physics UI (found by probing):
//   · ScrollPicker (framer-motion drag strip, ROW_H 44): a pointer
//     drag that ends AT REST (small incremental moves, ~150ms pause
//     before pointer-up) moves exactly N rows and snaps — no fling.
//     The native wheel handler steps ±1 row per tick (|deltaY|≥30,
//     90ms lock), used as a deterministic corrector. The centered
//     value is read via elementFromPoint at the listbox center.
//   · JourneyStage reveal (.rvl-overlay): a pointer drag UP sets the
//     dissolve progress ((dy−6)/360); releasing past 0.3 finishes the
//     ceremony (seal descends into the wheel), and onDone routes to
//     app-reading ~3.5s later. Tapping .rvl-swipe finishes too.
//
// Output → tools/qa-output/journey/latest/ (report.json + failure
// screenshots in shots/). Exit 0 = every step passed, 1 = failures.
//
// Run with the dev server already up (default :5173):
//   node tools/qa-journey-sweep.mjs
//   QA_BASE=http://localhost:4173/ node tools/qa-journey-sweep.mjs
// ===================================================================

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.QA_BASE || 'http://localhost:5173/';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(HERE, 'qa-output', 'journey', 'latest');
const SHOTS = path.join(OUT_ROOT, 'shots');

const VIEWPORT = { width: 390, height: 844 };
const ROW_H = 44;               // ScrollPicker row height (OnboardingShell.jsx)
const MAX_ROWS_PER_DRAG = 6;    // keeps every gesture inside the frame
const SETTLE_POLL_MS = 120;     // wheel-snap settle poll interval
const HASH_TIMEOUT = 15000;     // route waits (loading dwell is ~2.5s + bloom)

// Golden 庚 reference — 1995-04-29 · 18:00 · Beijing · male (DEV_01).
const GOLDEN = {
  year: { stem: '乙', branch: '亥' },
  month: { stem: '庚', branch: '辰' },
  day: { stem: '庚', branch: '寅' },
  hour: { stem: '乙', branch: '酉' },
};
const CHART_KEY = 'elementum_chart_v1';
const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Step recorder ────────────────────────────────────────────────────────────
const results = [];
let shotSeq = 0;

async function step(page, scenario, name, fn) {
  const entry = { scenario, name, ok: false, ms: 0 };
  const t0 = Date.now();
  try {
    const detail = await fn();
    entry.ok = true;
    if (detail !== undefined) entry.detail = detail;
  } catch (e) {
    entry.error = String(e && e.message ? e.message : e).slice(0, 400);
    try {
      const shot = path.join(SHOTS, `${String(++shotSeq).padStart(2, '0')}--${scenario}--${name.replace(/[^a-z0-9-]+/gi, '_')}.png`);
      await page.screenshot({ path: shot });
      entry.screenshot = path.relative(OUT_ROOT, shot).replace(/\\/g, '/');
    } catch { /* page may be gone — the error above is the finding */ }
  }
  entry.ms = Date.now() - t0;
  results.push(entry);
  console.log(`  [${scenario}] ${entry.ok ? 'ok  ' : 'FAIL'} ${name} (${entry.ms}ms)${entry.error ? ' — ' + entry.error : ''}`);
  return entry.ok;
}

// ── Deterministic waits ──────────────────────────────────────────────────────
const currentHash = (page) => page.evaluate(() => window.location.hash.replace(/^#\//, ''));

async function waitForHash(page, route, timeout = HASH_TIMEOUT) {
  await page.waitForFunction(
    (r) => window.location.hash.replace(/^#\//, '') === r,
    route,
    { timeout },
  );
}

// ── ScrollPicker drivers (empirical — see banner) ────────────────────────────
// The value currently latched in the selection band: topmost element at the
// listbox center is the PickerRow (fades/band are pointer-events:none).
async function wheelCentered(page) {
  return page.evaluate(() => {
    const lb = document.querySelector('[role="listbox"]');
    if (!lb) return null;
    const r = lb.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return el ? (el.textContent || '').trim() : null;
  });
}

// Wait until the strip is at rest: two consecutive identical centered reads.
async function wheelSettle(page, timeout = 3000) {
  const t0 = Date.now();
  let prev = null;
  while (Date.now() - t0 < timeout) {
    const cur = await wheelCentered(page);
    if (cur !== null && cur === prev) return cur;
    prev = cur;
    await sleep(SETTLE_POLL_MS);
  }
  return prev;
}

// One at-rest drag of `rows` rows (positive = advance to higher index, i.e.
// strip moves UP). Small incremental moves + a pause before release so the
// inertia fling is ~zero and modifyTarget snaps to exactly the nearest row.
async function wheelDrag(page, rows) {
  const box = await (await page.waitForSelector('[role="listbox"]', { timeout: 8000 })).boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const dy = -rows * ROW_H;
  const moves = Math.max(6, Math.min(14, Math.abs(rows) * 2));
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= moves; i++) {
    await page.mouse.move(cx, cy + (dy * i) / moves, { steps: 2 });
    await sleep(15);
  }
  await sleep(160); // kill velocity — release at rest
  await page.mouse.up();
  await wheelSettle(page);
}

// One deterministic ±1 row corrector tick (native wheel handler: |Δ|≥30,
// 90ms lock). dir +1 = next (higher index), −1 = previous.
async function wheelTick(page, dir) {
  const box = await (await page.waitForSelector('[role="listbox"]')).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, dir > 0 ? 40 : -40);
  await sleep(140);
}

// Drive the single on-screen ScrollPicker to `target` (formatted string).
// `values` = the wheel's formatted value list in index order — used only to
// compute how many rows away the target is; every movement is a real gesture.
async function setWheel(page, values, target) {
  const targetIdx = values.indexOf(target);
  if (targetIdx < 0) throw new Error(`target "${target}" not in wheel values`);
  for (let attempt = 0; attempt < 12; attempt++) {
    const cur = await wheelSettle(page);
    if (cur === target) return cur;
    const curIdx = values.indexOf(cur);
    if (curIdx < 0) throw new Error(`unrecognized centered value "${cur}"`);
    const delta = targetIdx - curIdx;
    if (Math.abs(delta) > 2) {
      await wheelDrag(page, Math.max(-MAX_ROWS_PER_DRAG, Math.min(MAX_ROWS_PER_DRAG, delta)));
    } else {
      await wheelTick(page, delta > 0 ? 1 : -1); // 1–2 rows out — tick precisely
      await wheelSettle(page);
    }
  }
  const finalVal = await wheelCentered(page);
  if (finalVal !== target) throw new Error(`wheel stuck at "${finalVal}", wanted "${target}"`);
  return finalVal;
}

async function clickContinue(page, label = 'Continue') {
  await page.click(`button:has-text("${label}")`, { timeout: 8000 });
}

// ── Scenario A · first-run onboarding ────────────────────────────────────────
async function scenarioA(browser) {
  console.log('\nSCENARIO A · first-run onboarding (fresh profile, real gestures)');
  // Fresh context = empty storage; no permissions granted → geolocation and
  // notification requests are DENIED (Playwright default for ungranted).
  const context = await browser.newContext({ viewport: VIEWPORT });
  // Hermetic location step: the Open-Meteo geocoding call is mocked so the
  // autocomplete interaction is real but never depends on the live API.
  await context.route('**/geocoding-api.open-meteo.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({
        results: [
          { id: 1816670, name: 'Beijing', admin1: 'Beijing', country: 'China', country_code: 'CN', latitude: 39.9075, longitude: 116.3972, timezone: 'Asia/Shanghai', population: 18960744 },
          { id: 2038349, name: 'Beipiao', admin1: 'Liaoning', country: 'China', country_code: 'CN', latitude: 41.79, longitude: 120.77, timezone: 'Asia/Shanghai', population: 194301 },
        ],
      }),
    }),
  );
  const page = await context.newPage();
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e).slice(0, 200)));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrs.push(m.text().slice(0, 200)); });

  const yearNow = new Date().getFullYear();
  const YEARS = []; for (let y = yearNow; y >= 1900; y--) YEARS.push(String(y));
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = []; for (let d = 1; d <= 31; d++) DAYS.push(d < 10 ? `0${d}` : String(d));
  const HOURS = []; for (let h = 0; h <= 23; h++) HOURS.push(`${h < 10 ? '0' : ''}${h}:00`);

  let alive = true;
  const run = async (name, fn) => { if (alive) alive = await step(page, 'A', name, fn); };

  await run('welcome → Discover Yours', async () => {
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.clear()); // belt & braces on a fresh profile
    await page.click('button:has-text("Discover Yours")', { timeout: 10000 });
    await waitForHash(page, 'step1');
  });

  await run('step1 · year wheel → 1995', async () => {
    const v = await setWheel(page, YEARS, '1995');
    await clickContinue(page);
    await waitForHash(page, 'step2');
    return `wheel latched "${v}"`;
  });

  await run('step2 · month wheel → April', async () => {
    const v = await setWheel(page, MONTHS, 'April');
    await clickContinue(page);
    await waitForHash(page, 'step3');
    return `wheel latched "${v}"`;
  });

  await run('step3 · day wheel → 29', async () => {
    const v = await setWheel(page, DAYS, '29');
    await clickContinue(page);
    await waitForHash(page, 'step4');
    return `wheel latched "${v}"`;
  });

  await run('step4 · EXACT hour wheel → 18:00', async () => {
    const v = await setWheel(page, HOURS, '18:00');
    await clickContinue(page); // the exact branch — no approximate/unknown links
    await waitForHash(page, 'step5');
    return `wheel latched "${v}"`;
  });

  await run('step5 · type Beijing, pick suggestion', async () => {
    const input = page.locator('input[placeholder*="Start typing a city"]');
    await input.fill('Beijing');
    // debounce 300ms → mocked geocoding → dropdown; pick the Beijing row
    await page.click('div:has(> div:text-is("Beijing")):has-text("China")', { timeout: 8000 });
    const val = await input.inputValue();
    if (!/^Beijing,/.test(val)) throw new Error(`suggestion not picked — input "${val}"`);
    await clickContinue(page);
    await waitForHash(page, 'step6');
    return `picked "${val}"`;
  });

  await run('step6 · gender male', async () => {
    await page.getByText('Male', { exact: true }).click({ timeout: 8000 });
    await clickContinue(page);
    await waitForHash(page, 'step7');
  });

  await run('step7 · decline notifications (Skip for now)', async () => {
    // "Skip for now" sets notifyOn:false and NEVER calls enablePush.
    await page.getByText('Skip for now', { exact: true }).click({ timeout: 8000 });
    await waitForHash(page, 'loading', 8000);
  });

  await run('loading → reveal (identity plate renders)', async () => {
    await waitForHash(page, 'reveal', 20000); // ~2.5s ceremonial dwell + bloom
    await page.waitForFunction(() => {
      const n = document.querySelector('.rvl-name');
      return n && (n.textContent || '').trim().length > 0;
    }, { timeout: 10000 });
    const archetype = await page.evaluate(() => document.querySelector('.rvl-name').textContent.trim());
    return `archetype "${archetype}"`;
  });

  await run('persisted chart = golden 庚 pillars', async () => {
    const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || 'null'), CHART_KEY);
    if (!stored || !stored.chart || !stored.chart.pillars) throw new Error(`${CHART_KEY} missing or malformed`);
    const p = stored.chart.pillars;
    const got = ['year', 'month', 'day', 'hour'].map((k) => `${p[k]?.stem || '?'}${p[k]?.branch || '?'}`).join(' / ');
    for (const k of ['year', 'month', 'day', 'hour']) {
      if (p[k]?.stem !== GOLDEN[k].stem || p[k]?.branch !== GOLDEN[k].branch) {
        throw new Error(`pillars ${got} ≠ golden 乙亥 / 庚辰 / 庚寅 / 乙酉`);
      }
    }
    return `pillars ${got}`;
  });

  if (consoleErrs.length) {
    results.push({ scenario: 'A', name: 'console/page errors (informational)', ok: true, detail: consoleErrs.slice(0, 10) });
  }
  await context.close();
}

// ── Scenario B · reading journeys (seeded) ───────────────────────────────────
async function scenarioB(browser) {
  console.log('\nSCENARIO B · reading journeys (seeded 庚 chart, advisor tier)');
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e).slice(0, 200)));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrs.push(m.text().slice(0, 200)); });

  // Seed like qa-route-sweep does; __goto('reveal') is SETUP only — every
  // step below moves by real interaction.
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => typeof window.__seedData === 'function' && typeof window.__goto === 'function',
    { timeout: 20000 },
  );
  await page.evaluate(() => window.__seedData('geng'));
  await page.evaluate(() => window.__setTier && window.__setTier('advisor'));
  await page.evaluate(() => window.__goto('reveal'));
  await page.waitForSelector('.scrollwrap', { timeout: 10000 });

  // If a step strands us off the catalogue, recover through the real tab bar
  // when it's on screen; only fall back to the dev hook as a last resort.
  // The hash stays app-reading on the in-stage element sub-screen, so also
  // back out of it (its .backrow) before asserting the catalogue.
  const toCatalogue = async () => {
    if ((await currentHash(page)) !== 'app-reading') {
      const tab = page.locator('.reading-tabhost .tab[aria-label="reading"]');
      if (await tab.count()) await tab.click();
      else await page.evaluate(() => window.__goto('app-reading')); // recovery-only teleport
      await waitForHash(page, 'app-reading');
    }
    const back = page.locator('.jscreen[data-screen="element"].active .backrow');
    if (await back.count()) await back.click();
    await page.waitForSelector('.jscreen[data-screen="catalogue"].active .wheel .node', { timeout: 8000 });
  };

  // Real-interaction "open energy" (adapted 2026-08-19, merge-and-retire):
  // the wheel dot opens the dot card — THE single entry — and its "Open the
  // full reading" CTA lands on the in-stage element screen, which IS the full
  // depth home now (the app-energy faces page is retired; hash stays
  // app-reading throughout). Returns the persona bridge line for assertions.
  // The element screen's stable anchor is the mechanism equation line
  // (.el-mecheq — "Metal feeds Water" / "Metal is your Core"), which always
  // names the element (EP restructure 2026-08-19).
  const openEnergyFor = async (el) => {
    await toCatalogue();
    await page.click(`.wheel .node[data-el="${el}"]`);
    await page.waitForSelector('.wp-sheet.wp-dotcard .wp-codex', { timeout: 5000 });
    await page.click('.wp-sheet.wp-dotcard .wp-codex');
    await page.waitForFunction(() => {
      const f = document.querySelector('.jscreen[data-screen="element"].active .el-mecheq');
      return f && (f.textContent || '').trim().length > 0;
    }, { timeout: 8000 });
    return page.evaluate(() => document.querySelector('.jscreen[data-screen="element"].active .el-mecheq').textContent.trim());
  };

  await step(page, 'B', '1 · reveal swipe-up → dissolve → catalogue', async () => {
    const sc = await page.waitForSelector('.scrollwrap', { timeout: 8000 });
    const box = await sc.boundingBox();
    const cx = box.x + box.width / 2;
    // swipe UP from lower third — any >6px pointer move plays the dissolve
    await page.mouse.move(cx, box.y + box.height * 0.7);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(cx, box.y + box.height * 0.7 - (200 * i) / 8, { steps: 2 });
      await sleep(15);
    }
    await page.mouse.up();
    await waitForHash(page, 'app-reading', 10000); // 1.2s ceremony → handoff
    const nodes = await page.locator('.wheel .node').count();
    if (nodes !== 5) throw new Error(`catalogue wheel has ${nodes} nodes, expected 5`);
    return 'dissolve played → catalogue (5 wheel nodes)';
  });

  await step(page, 'B', '2 · tap wheel node → dot card → element reading', async () => {
    await toCatalogue();
    const el = await page.evaluate(() => document.querySelector('.wheel .node')?.dataset.el);
    if (!el) throw new Error('no wheel node found');
    const face = await openEnergyFor(el);
    const expected = CAP[el] || el;
    if (!face.includes(expected)) throw new Error(`element screen shows "${face}" for node "${el}"`);
    return `node "${el}" → dot card → "${face}"`;
  });

  await step(page, 'B', '3 · cycle all 5 energies (active energy changes)', async () => {
    // NOTE (adapted 2026-08-19, merge-and-retire): the app-energy faces page
    // is retired — the per-energy journey is wheel dot → dot card → in-stage
    // element screen; openEnergyFor's toCatalogue backs out via .backrow.
    await toCatalogue();
    const els = await page.evaluate(() =>
      [...document.querySelectorAll('.wheel .node')].map((n) => n.dataset.el));
    if (els.length !== 5) throw new Error(`wheel has ${els.length} nodes, expected 5`);
    const seen = [];
    for (const el of els) {
      const face = await openEnergyFor(el);
      const expected = CAP[el] || el;
      if (!face.includes(expected)) throw new Error(`element screen for "${el}" shows "${face}"`);
      if (seen.includes(face)) throw new Error(`active energy did not change — "${face}" repeated`);
      seen.push(face);
    }
    return `cycled: ${seen.join(' → ')}`;
  });

  await step(page, 'B', '4 · Day Master hero arrow → full Day Master page → Pillar Chart glyphs', async () => {
    await toCatalogue();
    // NOTE (adapted): the in-stage Day Master card this step used to hop
    // through no longer exists — 092d8a5 wired the hero "Read your Day Master"
    // arrow STRAIGHT to the app Day Master page (app-daymaster), leaving the
    // JourneyStage screen='daymaster' sub-screen unreachable. One hop now.
    await page.click('button[aria-label="Read your Day Master"]');
    await waitForHash(page, 'app-daymaster');
    await page.click('button.birth-chart-btn');
    await waitForHash(page, 'app-pillars');
    await page.waitForSelector('.bazi-chart .bz-glyph', { timeout: 8000 });
    const glyphs = await page.evaluate(() =>
      [...document.querySelectorAll('.bazi-chart .bz-glyph')].map((g) => g.textContent.trim()).join(''));
    if (glyphs.length !== 8 || glyphs.includes('？')) throw new Error(`pillar glyphs "${glyphs}" — expected 8 set characters`);
    const golden = `${GOLDEN.year.stem}${GOLDEN.year.branch}${GOLDEN.month.stem}${GOLDEN.month.branch}${GOLDEN.day.stem}${GOLDEN.day.branch}${GOLDEN.hour.stem}${GOLDEN.hour.branch}`;
    if (glyphs !== golden) throw new Error(`pillar glyphs "${glyphs}" ≠ golden "${golden}"`);
    return `glyphs ${glyphs}`;
  });

  await step(page, 'B', '5 · tab bar routes all 5 tabs', async () => {
    const visited = [];
    for (const tab of ['today', 'guidance', 'reading', 'compat', 'profile']) {
      await page.click(`.reading-tabhost .tab[aria-label="${tab}"]`);
      await waitForHash(page, `app-${tab}`);
      visited.push(`app-${tab}`);
    }
    return visited.join(' ');
  });

  await step(page, 'B', '6 · Today hub drill-downs (day/month/year/decade)', async () => {
    const drills = [
      { label: 'Today ·', route: 'app-day' },
      { label: 'This Month', route: 'app-month' },
      { label: 'This Year', route: 'app-year' },
      { label: 'Life Chapter', route: 'app-decade' },
    ];
    const opened = [];
    for (const { label, route } of drills) {
      await page.click('.reading-tabhost .tab[aria-label="today"]');
      await waitForHash(page, 'app-today');
      await page.click(`button:has-text("${label}")`, { timeout: 8000 });
      await waitForHash(page, route);
      await page.waitForFunction(() => {
        const f = document.querySelector('.el-frame');
        return f && (f.innerText || '').trim().length > 80; // page mounted with real content
      }, { timeout: 10000 });
      opened.push(route);
    }
    return opened.join(' ');
  });

  if (consoleErrs.length) {
    results.push({ scenario: 'B', name: 'console/page errors (informational)', ok: true, detail: consoleErrs.slice(0, 10) });
  }
  await context.close();
}

// ── Run ──────────────────────────────────────────────────────────────────────
(async () => {
  fs.rmSync(OUT_ROOT, { recursive: true, force: true });
  fs.mkdirSync(SHOTS, { recursive: true });

  const t0 = Date.now();
  const browser = await chromium.launch();
  try {
    await scenarioA(browser);
    await scenarioB(browser);
  } finally {
    await browser.close();
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    base: BASE,
    generatedAt: new Date().toISOString(),
    viewport: VIEWPORT,
    steps: results.length,
    passed: results.length - failures.length,
    failed: failures.length,
    durationMs: Date.now() - t0,
    driverNotes: [
      'ScrollPicker: at-rest pointer drags (pause before release) move exact rows; wheel ticks (|dY|>=30, >90ms apart) step +/-1 as corrector; centered value read via elementFromPoint.',
      'RevealDissolve: any >6px pointer drag plays the full 1.2s dissolve once, then routes to app-reading.',
      'Energy cycling adapted 2026-08-19 (merge-and-retire): the app-energy faces page is retired; wheel dot → dot card → in-stage element screen is the per-energy journey.',
    ],
  };
  fs.writeFileSync(path.join(OUT_ROOT, 'report.json'), JSON.stringify({ summary, results }, null, 2));
  console.log(`\nSUMMARY ${summary.passed}/${summary.steps} steps passed in ${(summary.durationMs / 1000).toFixed(1)}s${failures.length ? ` — ${failures.length} FAILED` : ''}`);
  console.log(`report → ${path.join(OUT_ROOT, 'report.json')}`);
  process.exit(failures.length ? 1 : 0);
})();
