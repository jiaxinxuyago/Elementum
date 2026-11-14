// ===================================================================
// ELEMENTUM · the impact of EXACT_TERMS (owner AM6 A, 2026-11-14)
// ===================================================================
// Before the owner signs off on reading months and years from the exact 节
// table (and the January rule), count how many charts change and how: the
// year pillar, the month pillar, the luck start, the condition (band) and
// the five energy roles. A random sample of births 1940–2010 at random hours,
// plus every day 1950–2030 at noon for the pillar counts.
//   node tools/qa-exact-terms-impact.mjs [sample=20000]
// ===================================================================
import { calculateBaziChart } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
const N = Number(process.argv[2]) || 20000;
let seed = 20261114; const rand = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const rnd = (a, b) => a + Math.floor(rand() * (b - a + 1));   // mulberry32
const c = { charts: 0, year: 0, month: 0, monthJan: 0, luck: 0, band: 0, roles: 0, any: 0 };
const ex = [];
for (let i = 0; i < N; i++) {
  const y = rnd(1940, 2010), m = rnd(1, 12), d = rnd(1, new Date(y, m, 0).getDate()), h = rnd(0, 23);
  const inp = { year: y, month: m, day: d, hour: h, location: 'Beijing', gender: i % 2 ? 'male' : 'female' };
  const a = calculateBaziChart(inp), b = calculateBaziChart({ ...inp, exactTerms: true }); c.charts++;
  const py = a.pillars.year.stem + a.pillars.year.branch !== b.pillars.year.stem + b.pillars.year.branch;
  const pm = a.pillars.month.stem + a.pillars.month.branch !== b.pillars.month.stem + b.pillars.month.branch;
  const lk = a.luckPillars.map((l) => l.startYear + l.stem + l.branch).join() !== b.luckPillars.map((l) => l.startYear + l.stem + l.branch).join();
  const ea = buildEnergyChart(a), eb = buildEnergyChart(b);
  const bd = ea.band !== eb.band; const rl = JSON.stringify(ea.energies.map((e) => [e.el, e.roles])) !== JSON.stringify(eb.energies.map((e) => [e.el, e.roles]));
  if (py) c.year++; if (pm) { c.month++; if (m === 1 && d <= 7) c.monthJan++; } if (lk) c.luck++; if (bd) c.band++; if (rl) c.roles++;
  if (py || pm || lk || bd || rl) { c.any++; if (ex.length < 8 && (py || pm)) ex.push(`${y}-${m}-${d} ${h}:00 ${a.pillars.year.stem}${a.pillars.year.branch} ${a.pillars.month.stem}${a.pillars.month.branch} → ${b.pillars.year.stem}${b.pillars.year.branch} ${b.pillars.month.stem}${b.pillars.month.branch}${bd ? ` · ${ea.band} → ${eb.band}` : ''}`); }
}
const pct = (n) => `${n} (${((100 * n) / c.charts).toFixed(2)}%)`;
console.log(`Sample: ${c.charts} births 1940–2010, random hours, Beijing`);
console.log(`  any change            ${pct(c.any)}`);
console.log(`  year pillar           ${pct(c.year)}`);
console.log(`  month pillar          ${pct(c.month)}   of which 1–7 January: ${c.monthJan}`);
console.log(`  luck pillars (years)  ${pct(c.luck)}`);
console.log(`  condition (band)      ${pct(c.band)}`);
console.log(`  energy roles          ${pct(c.roles)}`);
console.log('Examples:\n  ' + ex.join('\n  '));
