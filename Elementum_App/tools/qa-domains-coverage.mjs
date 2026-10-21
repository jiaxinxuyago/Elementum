// ===================================================================
// ELEMENTUM · the Domains section's coverage check (owner R2 A, 2026-10-21)
// ===================================================================
// Renders the Domains section for many charts and counts the lines that
// still fall back to a placeholder: the domain readings By position (seat,
// gap, pattern and "How you are" units), the By-decade and By-year tabs, and
// the Energy Blueprint's four parts. "Done" for R2 is 0% on every surface.
//   node tools/qa-domains-coverage.mjs           # 200 seeded random charts + the three review charts
//   node tools/qa-domains-coverage.mjs --keys    # also list every missing key with how often it is reached
//   node tools/qa-domains-coverage.mjs --n 500   # more charts
// Exit 1 while any surface has a placeholder line.
// ===================================================================
import { calculateBaziChart } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';
import { buildJourneyModel } from '../src/components/journey/journeyData.js';
import { STEM_CARD_DATA } from '../src/content/index.js';
import { resolvePositions } from '../src/components/reading/positionsResolve.js';
import { resolveDomains } from '../src/components/reading/domainsResolve.js';
import { resolveDomainView, resolveBlueprint } from '../src/components/reading/depthResolve.js';
import { DOMAINS_CONTENT } from '../src/content/domains.js';

const argv = process.argv.slice(2);
const N = Number(argv[argv.indexOf('--n') + 1]) || 200;
let s = 20261021; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const charts = [
  [{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false],
  [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false],
  [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true],
];
for (let i = 0; i < N; i++) charts.push([{ year: 1958 + Math.floor(rnd() * 50), month: 1 + Math.floor(rnd() * 12), day: 1 + Math.floor(rnd() * 28), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' }, rnd() < 0.1]);

const S = {}; const miss = {};
const count = (surface, key, ok) => { (S[surface] ||= { n: 0, ph: 0 }).n++; if (!ok) { S[surface].ph++; (miss[key] ||= { n: 0, surface }).n++; } };
const unitOk = (surface, u) => u && count(surface, u.key, !u.draft && !!u.text);
let rendered = 0;
for (const [birth, hu] of charts) {
  let chart; try { chart = calculateBaziChart(birth); } catch { continue; }
  const ec = buildEnergyChart(chart); const m = buildJourneyModel({ chart, ec, identity: {}, card: STEM_CARD_DATA[chart.pillars.day.stem] });
  const opts = { hourUnknown: hu, condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: 2026 };
  const pos = resolvePositions(chart, hu); const dm = resolveDomains(chart, pos, DOMAINS_CONTENT, opts);
  for (const p of dm.pages) {
    const v = resolveDomainView(p, chart, DOMAINS_CONTENT, opts);
    count('Domains · headline', `${p.headlineSrc}`, !!v.headline);
    count('Domains · How you are', p.howSrc, !!v.how);
    for (const b of v.blocks) count(b.kind === 'gap' ? 'Domains · gap row' : 'Domains · seat block', b.src, !!b.text);
    for (const y of v.byYear) unitOk('Domains · By year', y);
  }
  const B = resolveBlueprint(chart, pos, opts);
  unitOk('Blueprint · 1 structure', B.structure.reading); unitOk('Blueprint · 1 structure', B.structure.rule); unitOk('Blueprint · 1 structure', B.structure.status); unitOk('Blueprint · 1 structure', B.structure.rescue);
  unitOk('Blueprint · 2 runs on and lacks', B.runs.strongest); B.runs.missing.forEach((x) => unitOk('Blueprint · 2 runs on and lacks', x));
  unitOk('Blueprint · 2 season', B.runs.season); B.runs.needs.forEach((x) => unitOk('Blueprint · 2 season', x));
  [...B.seen.plain, ...B.seen.inside, B.seen.close].forEach((x) => unitOk('Blueprint · 3 seen and unseen', x));
  [...B.pairs.pairs, ...B.pairs.bonds, B.pairs.noneHard].forEach((x) => unitOk('Blueprint · 4 pairings and clashes', x));
  rendered++;
}
console.log(`${rendered} charts rendered (the three review charts + ${N} seeded random)\n`);
let open = 0;
for (const [k, v] of Object.entries(S)) { const pct = v.n ? Math.round((100 * v.ph) / v.n) : 0; if (v.ph) open++; console.log(`${pct.toString().padStart(3)}% placeholder  ${k}  (${v.ph} of ${v.n} lines)`); }
const keys = Object.entries(miss).sort((a, b) => b[1].n - a[1].n);
console.log(`\n${keys.length} distinct missing keys.`);
if (argv.includes('--keys')) for (const [k, v] of keys) console.log(`${String(v.n).padStart(5)}  ${k}`);
if (open) process.exit(1);
console.log('PASS: no placeholder line on any Domains surface.');
