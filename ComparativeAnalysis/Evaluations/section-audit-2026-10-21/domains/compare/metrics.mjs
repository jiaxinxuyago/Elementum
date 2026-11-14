// The engine side of the comparison (owner 2026-11-14): 1,000 random charts, the live rules against the dev-site rules.
//   node .../compare/metrics.mjs   → extra.json (rows for COMPARE.html)
import fs from 'node:fs';
import path from 'node:path';
const HERE = path.dirname(new URL(import.meta.url).pathname) + '/';
const A = path.resolve(HERE, '../../../../../Elementum_App/src') + '/';
const { calculateBaziChart, HIDDEN_STEMS, getTenGod } = await import(A + 'engine/calculator.js');
const { buildEnergyChart } = await import(A + 'engine/buildEnergyChart.js');
const { buildJourneyModel } = await import(A + 'components/journey/journeyData.js');
const { STEM_CARD_DATA } = await import(A + 'content/index.js');
const { resolvePositions } = await import(A + 'components/reading/positionsResolve.js');
const { resolveDomains } = await import(A + 'components/reading/domainsResolve.js');
const { resolveDomainView, resolveBlueprint } = await import(A + 'components/reading/depthResolve.js');
const { DOMAINS_CONTENT } = await import(A + 'content/domains.js');
const { structureOf } = await import(A + 'engine/depth/chartDepth.js');
let s = 20261021; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const RG = { officer: ['七杀', '正官'], output: ['食神', '伤官'], seal: ['正印', '偏印'], wealth: ['偏财', '正财'] };
const T = { n: 0, seated1: 0, seated2: 0, res1: 0, res2: 0, pairs1: 0, pairs2: 0, waiting: 0, past: 0, pages: 0, broken1: 0, broken2: 0 };
for (let i = 0; i < 1000; i++) {
  const b = { year: 1958 + Math.floor(rnd() * 50), month: 1 + Math.floor(rnd() * 12), day: 1 + Math.floor(rnd() * 28), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' };
  let c; try { c = calculateBaziChart(b); } catch { continue; } T.n++;
  const dm = c.pillars.day.stem; const seated = new Set();
  for (const g of ['year', 'month', 'day', 'hour']) { if (g !== 'day') seated.add(getTenGod(dm, c.pillars[g].stem)?.zh); seated.add(getTenGod(dm, HIDDEN_STEMS[c.pillars[g].branch][0].s)?.zh); }
  for (const [r, k] of [['v1', '1'], ['v2', '2']]) { const st = structureOf(c, { strength: c.dayMaster.strength, rules: r }); if (st.rescue) { T['res' + k]++; if (RG[st.rescue].some((g) => seated.has(g))) T['seated' + k]++; } if (st.status === 'broken') T['broken' + k]++; }
  const ec = buildEnergyChart(c); const m = buildJourneyModel({ chart: c, ec, identity: {}, card: STEM_CARD_DATA[dm] });
  const base = { condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])), year: 2026, today: '2026-11-14' };
  const pos = resolvePositions(c, false);
  T.pairs1 += resolveBlueprint(c, pos, { ...base, bpRules: false }).pairs.pairs.length; T.pairs2 += resolveBlueprint(c, pos, { ...base, bpRules: true }).pairs.pairs.length;
  for (const p of resolveDomains(c, pos, DOMAINS_CONTENT, { ...base, bpRules: true }).pages) { T.pages++; if (/domain_waiting/.test(p.howSrc)) T.waiting++; const v = resolveDomainView(p, c, DOMAINS_CONTENT, { ...base, bpRules: true }); if (v.blocks.some((x) => /lived_past/.test(x.src))) T.past++; }
}
const rows = [['Rescue lines whose cure already sits in the chart (R1)', `${T.seated1} of ${T.res1}`, `${T.seated2} of ${T.res2}`, T.seated2 < T.seated1],
  ['Broken structures (R1: a cure seated, or a breaker only inside a branch, no longer breaks)', T.broken1, T.broken2, T.broken2 < T.broken1],
  ['Pairing lines per Blueprint page, mean (R2)', (T.pairs1 / T.n).toFixed(1), (T.pairs2 / T.n).toFixed(1), true],
  ['Domain pages whose How you are came from a seat not yet reached (R9)', T.waiting, 0, true],
  ['Domain pages where a reader past the gate reads its beat in the past (R13)', 0, T.past, true]];
fs.writeFileSync(HERE + 'extra.json', JSON.stringify({ rows, note: '1,000 random charts, today 2026-11-14', raw: T }, null, 1) + '\n');
console.log(JSON.stringify(T));
