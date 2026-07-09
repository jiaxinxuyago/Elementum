// ===================================================================
// ELEMENTUM · Engine golden-fixture regression check
// ===================================================================
// Recomputes every QA chart (tools/qa-cases.mjs) and diffs the result
// against the committed golden fixture — the last output verified by
// the manual cross-site protocol (DEV_04_Engine_Accuracy_QA.md).
//
//   node tools/qa-engine-regression.mjs            # check (CI/hook mode)
//   node tools/qa-engine-regression.mjs --update   # bless current output
//
// Exit codes:  0 = clean · 1 = Tier B drift (review) · 2 = Tier A REGRESSION
//
// Tier A (must match EXACTLY — protocol says these are ground truth):
//   four pillars · stem Ten Gods · Day Master identity · tgPattern ·
//   合冲刑害 patterns
// Tier B (consensus values — drift means "re-verify", not "wrong"):
//   strength/score/band · catalyst · dominance % · roles/leadGod/faces ·
//   element scores
//
// ONLY run --update after re-running the manual verification protocol
// (or after an intentional, owner-approved engine behavior change).
// ===================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateBaziChart, getEnergyBand } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { CASES } from './qa-cases.mjs';

const GOLDEN = path.join(path.dirname(fileURLToPath(import.meta.url)), 'qa-golden', 'engine-accuracy.json');

// ── Snapshot: everything the accuracy protocol compares, as plain JSON ──────
function snapshot(c) {
  const chart = calculateBaziChart(c);
  const ec = buildEnergyChart(chart);
  const P = chart.pillars;
  const tg = (g) => (g ? `${g.zh}(${g.en})` : null);
  return {
    label: c.label,
    tierA: {
      pillars: [P.year, P.month, P.day, P.hour].map((p) => `${p.stem}${p.branch}`),
      stemTenGods: [tg(chart.tenGods.yearStem), tg(chart.tenGods.monthStem), tg(chart.tenGods.hourStem)],
      dayMaster: `${chart.dayMaster.stem} ${chart.dayMaster.element} ${chart.dayMaster.polarity}`,
      tgPattern: chart.tgPattern ?? null,
      patterns: (chart.patterns || []).map((p) => `${p.zh}(${(p.branches || []).join('')})`),
    },
    tierB: {
      strength: chart.dayMaster.strength,
      strengthScore: chart.dayMaster.strengthScore,
      band: getEnergyBand(chart.dayMaster.strength),
      catalyst: chart.catalyst ?? null,
      energies: ec.energies.map((e) => ({
        el: e.el,
        presence: e.presence,
        score: Number((chart.elements[e.el[0].toUpperCase() + e.el.slice(1)]?.score ?? 0).toFixed(3)),
        roles: e.roles,
        leadGod: e.leadGod ?? null,
        faces: e.faces.map((f) => `${f.god}/${f.polarity}`),
      })),
    },
  };
}

const current = CASES.map(snapshot);

if (process.argv.includes('--update')) {
  fs.mkdirSync(path.dirname(GOLDEN), { recursive: true });
  fs.writeFileSync(GOLDEN, JSON.stringify({ blessedAt: new Date().toISOString(), cases: current }, null, 2));
  console.log(`golden blessed → ${GOLDEN} (${current.length} case${current.length === 1 ? '' : 's'})`);
  console.log('Remember: bless ONLY output verified per DEV_04_Engine_Accuracy_QA.md.');
  process.exit(0);
}

if (!fs.existsSync(GOLDEN)) {
  console.error('No golden fixture found. Verify engine output manually, then run:');
  console.error('  node tools/qa-engine-regression.mjs --update');
  process.exit(2);
}
const golden = JSON.parse(fs.readFileSync(GOLDEN, 'utf8'));

// ── Deep diff → list of "path: golden → current" strings ────────────────────
function diff(a, b, at = '') {
  if (a === b) return [];
  const isObj = (x) => x !== null && typeof x === 'object';
  if (!isObj(a) || !isObj(b)) return [`${at}: ${JSON.stringify(a)} → ${JSON.stringify(b)}`];
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  return keys.flatMap((k) => diff(a[k], b[k], at ? `${at}.${k}` : k));
}

let tierAFail = [];
let tierBDrift = [];
const goldenByLabel = Object.fromEntries(golden.cases.map((c) => [c.label, c]));
for (const cur of current) {
  const gold = goldenByLabel[cur.label];
  if (!gold) { tierBDrift.push(`${cur.label}: new case, not in golden (run --update after verifying)`); continue; }
  tierAFail.push(...diff(gold.tierA, cur.tierA).map((d) => `${cur.label} · ${d}`));
  tierBDrift.push(...diff(gold.tierB, cur.tierB).map((d) => `${cur.label} · ${d}`));
}
for (const gold of golden.cases) {
  if (!current.find((c) => c.label === gold.label)) tierAFail.push(`${gold.label}: case MISSING from qa-cases.mjs`);
}

if (tierAFail.length) {
  console.error(`✗ TIER A REGRESSION (${tierAFail.length}) — pillars/ten-gods/patterns are ground truth and must match exactly:`);
  tierAFail.forEach((d) => console.error('   ' + d));
}
if (tierBDrift.length) {
  console.error(`⚠ Tier B drift (${tierBDrift.length}) — not necessarily wrong; re-verify per DEV_04_Engine_Accuracy_QA.md, then --update:`);
  tierBDrift.forEach((d) => console.error('   ' + d));
}
if (!tierAFail.length && !tierBDrift.length) {
  console.log(`✓ engine output matches golden (${current.length} case${current.length === 1 ? '' : 's'}, blessed ${golden.blessedAt})`);
}
process.exit(tierAFail.length ? 2 : tierBDrift.length ? 1 : 0);
