#!/usr/bin/env node
// ===================================================================
// capture-reading-screens.mjs — pixel-verbatim captures of the core
// reading journey for Library_Screens/ (design-library hard rule:
// design HTMLs track what the app currently renders).
//
// Usage:
//   node tools/capture-reading-screens.mjs --app <Elementum_App dir with node_modules> \
//        [--base http://localhost:5173/] [--out <shots dir>]
//
// Rides the same rails as qa-route-sweep.mjs: window.__seedData /
// window.__goto dev hooks, geng preset, canonical 390×844, reduced
// motion so ceremonies land on their settled frames.
// ===================================================================
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i !== -1 ? process.argv[i + 1] : dflt;
};
const APP = arg('--app');
if (!APP) { console.error('--app <Elementum_App dir> is required (playwright resolution)'); process.exit(2); }
const BASE = arg('--base', 'http://localhost:5173/');
const OUT = path.resolve(arg('--out', 'Design/Library/Library_Screens/_shots'));

const require = createRequire(path.join(path.resolve(APP), 'tools', 'x.mjs'));
const { chromium } = require('playwright');

fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Each capture: route + optional in-page actions before the shot.
// Actions are best-effort — a missing selector logs + skips, never aborts.
const CAPTURES = [
  { id: '01-reveal', route: 'reveal', note: 'The Reveal — settled ceremony frame' },
  { id: '02-catalogue-top', route: 'app-reading', note: 'C1 identity hero + C2 wheel' },
  { id: '03-catalogue-folio', route: 'app-reading', scrollTo: '.insc', note: 'C3 Folio + C4 catalyst|friction' },
  { id: '04-catalogue-towers', route: 'app-reading', scrollTo: '.shelf', note: 'C5 towers + C6 dock + C7 wordsnote' },
  { id: '05-pill-open', route: 'app-reading', scrollTo: '.shelf', click: '.shelf .spine', settle: 700, note: 'Energy pill expanded' },
  { id: '06-folio-open', route: 'app-reading', scrollTo: '.insc', click: '.insc .ins-fold', settle: 900, note: 'Folio unfolded' },
  { id: '07-share-float', route: 'app-reading', click: '.sharebtn', settle: 700, note: 'FLOAT 1 · identity card + share rail' },
  { id: '08-glossary-float', route: 'app-reading', scrollTo: '.wordsnote', click: '.wn-chips .role-pill', settle: 700, note: 'FLOAT 2 · glossary pop-up' },
  { id: '09-daymaster-journey', route: 'app-reading', click: '.idhero .readcirc', settle: 900, note: 'Journey day-master screen' },
  { id: '10-element-journey', route: 'app-reading', scrollTo: '.shelf', click: '.shelf .spine', settle: 700, click2: '.spine.open .sp-read', settle2: 900, note: 'Journey element screen' },
  { id: '11-energymap', route: 'app-energymap', note: 'D13 energy map — wheel + shelf (.reading)' },
  { id: '12-energymap-open', route: 'app-energymap', click: '.shelf .spine', settle: 700, note: 'D13 shelf spine open (retired parts still live)' },
  { id: '13-faces', route: 'app-energy', note: 'FACES prologue — briefing + face shelf' },
  { id: '14-face-open', route: 'app-energy', click: '.face-shelf .gal-card', settle: 700, note: 'Face column expanded' },
  { id: '15-daymaster-d13', route: 'app-daymaster', note: 'D13 day-master card' },
  { id: '16-pillars', route: 'app-pillars', note: 'D13 four-pillar chart (八字)' },
];

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => typeof window.__seedData === 'function' && typeof window.__goto === 'function',
    null, { timeout: 20000 },
  );
  await page.evaluate(() => window.__seedData('geng'));
  await sleep(600);

  const results = [];
  for (const cap of CAPTURES) {
    try {
      await page.evaluate((r) => window.__goto(r), cap.route);
      await sleep(900);
      if (cap.scrollTo) {
        const ok = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          el.scrollIntoView({ block: 'center' });
          return true;
        }, cap.scrollTo);
        if (!ok) console.warn(`  [${cap.id}] scrollTo miss: ${cap.scrollTo}`);
        await sleep(500);
      }
      for (const [clickKey, settleKey] of [['click', 'settle'], ['click2', 'settle2']]) {
        if (!cap[clickKey]) continue;
        const clicked = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          el.click();
          return true;
        }, cap[clickKey]);
        if (!clicked) console.warn(`  [${cap.id}] click miss: ${cap[clickKey]}`);
        await sleep(cap[settleKey] || 700);
      }
      const file = path.join(OUT, `${cap.id}.png`);
      await page.screenshot({ path: file });
      results.push({ id: cap.id, note: cap.note, ok: true });
      console.log(`✓ ${cap.id}`);
    } catch (e) {
      results.push({ id: cap.id, note: cap.note, ok: false, error: String(e).slice(0, 200) });
      console.error(`✗ ${cap.id}: ${String(e).slice(0, 200)}`);
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(results, null, 2));
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} captured → ${OUT}`);
  process.exit(failed ? 1 : 0);
};
run();
