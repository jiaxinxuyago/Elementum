// ===================================================================
// ELEMENTUM · Automated route-sweep QA (dev tooling, not shipped)
// ===================================================================
// Visits every screen the app registers (window.__screens — single-
// sourced from App.jsx FLOW, never a copied list) at the three QA
// viewports from the June 2026 clipping QA (iPhone SE / small Android /
// canonical 390×844) and records, per route × viewport:
//
//   · console errors + warnings, uncaught page errors
//   · failed network requests (4xx/5xx + hard failures; aborts ignored)
//   · horizontal clip suspects — content cut off at the frame edge that
//     is NOT inside an intentional horizontal scroller / carousel track
//   · vertical clip suspects — content below the fold with no scrollable
//     ancestor to reach it (the class of bug fixed by .screen-pad)
//   · blank-screen detection (no text / no nodes) + broken images
//   · a viewport screenshot of every route
//
// Output → tools/qa-output/route-sweep/latest/  (report.json + shots/)
// The directory is gitignored and overwritten on every run.
//
// Run with the dev server already up (default :5173):
//   node tools/qa-route-sweep.mjs
//   QA_BASE=http://localhost:4173/ node tools/qa-route-sweep.mjs   # vite preview
//
// This script only REPORTS. Triage — separating real regressions from
// known noise — belongs to the qa-sweep agent (.claude/agents/qa-sweep.md).
// ===================================================================

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.QA_BASE || 'http://localhost:5173/';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(HERE, 'qa-output', 'route-sweep', 'latest');
const SHOTS = path.join(OUT_ROOT, 'shots');

// The three sizes from the June 2026 interaction QA. All ≤520px wide, so
// global.css renders the app full-bleed (no desktop phone-frame chrome).
const VIEWPORTS = [
  { name: 'se', width: 375, height: 667 },
  { name: 'android', width: 360, height: 800 },
  { name: 'canonical', width: 390, height: 844 },
];

// Screens that are meaningless to sweep: d13preview is a bare dev harness.
const EXCLUDE = new Set(['d13preview']);

const SEED_PRESET = 'geng'; // canonical 庚 "The Blade" chart
const SETTLE_MS = 900;      // post-navigation settle (reduced motion is on)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── In-page audit ────────────────────────────────────────────────────────────
// Runs inside the browser; returns plain JSON. Flags content clipped by the
// app frame that no scroller can reach, skipping intentional overflow
// (horizontal carousels / transformed track elements / invisible nodes).
function auditFn() {
  const frame = document.querySelector('.el-frame');
  if (!frame) return { fatal: 'no .el-frame found' };
  const fr = frame.getBoundingClientRect();
  const TOL = 3;
  const MAX = 12;

  const shortSel = (el) => {
    const part = (e) => {
      const cls = typeof e.className === 'string' && e.className.trim()
        ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
      return e.tagName.toLowerCase() + cls;
    };
    const parts = [];
    let cur = el;
    while (cur && cur !== frame && parts.length < 3) { parts.unshift(part(cur)); cur = cur.parentElement; }
    return parts.join(' > ');
  };

  const visible = (el, r) => {
    if (r.width < 2 || r.height < 2) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return false;
    // Computed opacity does NOT inherit — an opacity-0 wrapper (e.g. the
    // pre-dissolve .ds-after stage on reveal) hides children whose own
    // opacity is 1, so walk the chain up to the frame.
    for (let p = el; p && p !== frame; p = p.parentElement) {
      if (parseFloat(getComputedStyle(p).opacity) <= 0.05) return false;
    }
    return true;
  };

  // True when a horizontal scroller or a translated carousel track sits
  // between el and the frame — offscreen slides are intentional there.
  const inHScroller = (el) => {
    let p = el.parentElement;
    while (p && p !== frame) {
      const cs = getComputedStyle(p);
      if (/(auto|scroll)/.test(cs.overflowX)) return true;
      if (cs.transform !== 'none' && p.scrollWidth > p.clientWidth + TOL) return true;
      p = p.parentElement;
    }
    return false;
  };
  const inVScroller = (el) => {
    let p = el.parentElement;
    while (p && p !== frame) {
      const cs = getComputedStyle(p);
      if (/(auto|scroll)/.test(cs.overflowY)) return true;
      p = p.parentElement;
    }
    return false;
  };

  const hClip = [];
  const vClip = [];
  const brokenImages = [];
  let hClipTruncated = false;
  for (const el of frame.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (!visible(el, r)) continue;
    if (el.tagName === 'IMG' && el.complete && el.naturalWidth === 0) {
      brokenImages.push({ src: (el.currentSrc || el.src || '').slice(0, 120), sel: shortSel(el) });
    }
    // Only leaf-ish content counts — a tall wrapper div is not itself a clip.
    const isContent = el.children.length === 0 || el.tagName === 'IMG' || el.tagName === 'svg';
    if (!isContent) continue;
    // Decorative bleed (empty, non-interactive layers like .bg-reveal-fog
    // that deliberately overhang the frame edges) is not a clip.
    const decorative = !(el.textContent || '').trim() && getComputedStyle(el).pointerEvents === 'none';
    if ((r.right > fr.right + TOL || r.left < fr.left - TOL) && !inHScroller(el) && !decorative) {
      if (hClip.length < MAX) hClip.push({ sel: shortSel(el), left: Math.round(r.left - fr.left), right: Math.round(r.right - fr.right), text: (el.textContent || '').trim().slice(0, 60) });
      else hClipTruncated = true;
    }
    if (r.bottom > fr.bottom + TOL && !inVScroller(el)) {
      if (vClip.length < MAX) vClip.push({ sel: shortSel(el), below: Math.round(r.bottom - fr.bottom), text: (el.textContent || '').trim().slice(0, 60) });
    }
  }

  return {
    hClip,
    hClipTruncated,
    vClip,
    brokenImages,
    textLength: (frame.innerText || '').trim().length,
    nodeCount: frame.querySelectorAll('*').length,
  };
}

// ── Sweep ────────────────────────────────────────────────────────────────────
(async () => {
  fs.rmSync(OUT_ROOT, { recursive: true, force: true });
  fs.mkdirSync(SHOTS, { recursive: true });

  const browser = await chromium.launch();
  const results = [];
  let routes = null;

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Rolling buffers — reset before each route so findings attribute cleanly.
    let consoleMsgs = [];
    let pageErrors = [];
    let failedReqs = [];
    page.on('console', (m) => {
      const t = m.type();
      if (t === 'error' || t === 'warning') consoleMsgs.push({ type: t, text: m.text().slice(0, 300) });
    });
    page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 300)));
    page.on('requestfailed', (req) => {
      const err = req.failure()?.errorText || '';
      if (err.includes('ERR_ABORTED')) return; // cancelled prefetches — not failures
      failedReqs.push({ url: req.url().slice(0, 160), error: err });
    });
    page.on('response', (res) => {
      if (res.status() >= 400) failedReqs.push({ url: res.url().slice(0, 160), error: `HTTP ${res.status()}` });
    });

    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => typeof window.__seedData === 'function' && typeof window.__goto === 'function' && Array.isArray(window.__screens),
      { timeout: 20000 },
    );
    await page.evaluate((p) => window.__seedData(p), SEED_PRESET);
    await page.evaluate((t) => window.__setTier && window.__setTier(t), 'advisor');
    await sleep(400);
    await page.evaluate(() => document.fonts && document.fonts.ready);

    if (!routes) {
      routes = (await page.evaluate(() => window.__screens)).filter((r) => !EXCLUDE.has(r));
      console.log(`routes (${routes.length}):`, routes.join(' '));
    }

    for (const route of routes) {
      consoleMsgs = []; pageErrors = []; failedReqs = [];
      const entry = { route, viewport: vp.name };
      try {
        await page.evaluate((r) => window.__goto(r), route);
        await sleep(SETTLE_MS);
        entry.finalHash = await page.evaluate(() => window.location.hash.replace(/^#\//, ''));
        if (entry.finalHash !== route) entry.redirected = true; // e.g. loading → reveal
        const audit = await page.evaluate(auditFn);
        Object.assign(entry, audit);
        entry.blank = !audit.fatal && audit.textLength === 0 && audit.nodeCount < 5;
        const shot = path.join(SHOTS, `${vp.name}--${route}.png`);
        await page.screenshot({ path: shot });
        entry.screenshot = path.relative(OUT_ROOT, shot).replace(/\\/g, '/');
      } catch (e) {
        entry.sweepError = String(e).slice(0, 300);
      }
      entry.consoleMsgs = consoleMsgs.slice(0, 10);
      entry.pageErrors = pageErrors.slice(0, 10);
      entry.failedRequests = failedReqs.slice(0, 10);
      results.push(entry);
      const flags = [
        entry.sweepError && 'SWEEP-ERR',
        entry.fatal && 'NO-FRAME',
        entry.blank && 'BLANK',
        pageErrors.length && `pageerr:${pageErrors.length}`,
        consoleMsgs.length && `console:${consoleMsgs.length}`,
        failedReqs.length && `net:${failedReqs.length}`,
        entry.hClip?.length && `hclip:${entry.hClip.length}`,
        entry.vClip?.length && `vclip:${entry.vClip.length}`,
        entry.brokenImages?.length && `img:${entry.brokenImages.length}`,
      ].filter(Boolean).join(' ');
      console.log(`  [${vp.name}] ${route} ${flags || 'ok'}`);
    }
    await page.close();
  }
  await browser.close();

  const count = (k) => results.filter((r) => r[k]?.length || r[k] === true).length;
  const summary = {
    base: BASE,
    seed: SEED_PRESET,
    generatedAt: new Date().toISOString(),
    routes: routes.length,
    viewports: VIEWPORTS.map((v) => v.name),
    cells: results.length,
    flagged: {
      sweepError: count('sweepError'),
      fatal: count('fatal'),
      blank: count('blank'),
      pageErrors: count('pageErrors'),
      consoleMsgs: count('consoleMsgs'),
      failedRequests: count('failedRequests'),
      hClip: count('hClip'),
      vClip: count('vClip'),
      brokenImages: count('brokenImages'),
    },
  };
  fs.writeFileSync(path.join(OUT_ROOT, 'report.json'), JSON.stringify({ summary, results }, null, 2));
  console.log('\nSUMMARY', JSON.stringify(summary.flagged));
  console.log(`report → ${path.join(OUT_ROOT, 'report.json')}`);
})();
