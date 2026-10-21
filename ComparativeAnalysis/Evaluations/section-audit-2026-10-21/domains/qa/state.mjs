// The Domains + Blueprint section audit: mechanical accuracy checks for STATE.md (2026-10-21).
//   node ComparativeAnalysis/Evaluations/section-audit-2026-10-21/domains/qa/state.mjs [--n 3000]
import { calculateBaziChart } from '../../../../../Elementum_App/src/engine/calculator.js';
import { buildEnergyChart } from '../../../../../Elementum_App/src/engine/buildEnergyChart.js';
import { buildJourneyModel } from '../../../../../Elementum_App/src/components/journey/journeyData.js';
import { STEM_CARD_DATA } from '../../../../../Elementum_App/src/content/index.js';
import { resolvePositions } from '../../../../../Elementum_App/src/components/reading/positionsResolve.js';
import { resolveBlueprint } from '../../../../../Elementum_App/src/components/reading/depthResolve.js';
import { structureOf } from '../../../../../Elementum_App/src/engine/depth/chartDepth.js';
import { HIDDEN_STEMS, getTenGod } from '../../../../../Elementum_App/src/engine/calculator.js';
import { TG_PATTERNS } from '../../../../../Elementum_App/src/content/tgPatterns.js';

const argv = process.argv.slice(2); const N = Number(argv[argv.indexOf('--n') + 1]) || 3000;
let s = 20261021; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const RG = { officer: ['七杀', '正官'], output: ['食神', '伤官'], seal: ['正印', '偏印'], wealth: ['偏财', '正财'] };
const T = { charts: 0, key: {}, how: {}, status: {}, rescue: 0, rescueSeated: 0, rescueSeatedEx: null, rescueOld: 0, rescueOldEx: null, when: {} };
for (let i = 0; i < N; i++) {
  const birth = { year: 1958 + Math.floor(rnd() * 50), month: 1 + Math.floor(rnd() * 12), day: 1 + Math.floor(rnd() * 28), hour: Math.floor(rnd() * 24), location: 'Beijing', gender: rnd() < 0.5 ? 'male' : 'female' };
  let c; try { c = calculateBaziChart(birth); } catch { continue; }
  T.charts++;
  const st = structureOf(c, { strength: c.dayMaster?.strength });
  T.key[st.zh] = (T.key[st.zh] || 0) + 1; T.how[st.why.how] = (T.how[st.why.how] || 0) + 1; T.status[st.status] = (T.status[st.status] || 0) + 1;
  if (!st.rescue) continue; T.rescue++;
  // is the rescuing god already seated (a stem on show or a branch's main stem)?
  const dm = c.pillars.day.stem; const seated = new Set();
  for (const g of ['year', 'month', 'day', 'hour']) { if (g !== 'day') seated.add(getTenGod(dm, c.pillars[g].stem)?.zh); seated.add(getTenGod(dm, HIDDEN_STEMS[c.pillars[g].branch][0].s)?.zh); }
  if (RG[st.rescue].some((g) => seated.has(g))) { T.rescueSeated++; T.rescueSeatedEx ||= `${JSON.stringify(birth)} ${Object.values(c.pillars).map((p) => p.stem + p.branch).join(' ')} ${st.zh} ${st.status} ${st.breaker} → rescue ${st.rescue}`; }
  if (st.rescueDecades.some((d) => d.startAge > 75)) { T.rescueOld++; T.rescueOldEx ||= `${JSON.stringify(birth)} ${st.zh} rescue ${st.rescue} decades ${st.rescueDecades.map((d) => `${d.startYear} (age ${d.startAge})`).join(', ')}`; }
  const ec = buildEnergyChart(c); const m = buildJourneyModel({ chart: c, ec, identity: {}, card: STEM_CARD_DATA[dm] });
  const B = resolveBlueprint(c, resolvePositions(c, false), { condition: m.condition, roles: Object.fromEntries(Object.entries(m.byEl).map(([k, v]) => [k, v.role])) });
  const w = B.structure.rescue?.text?.match(/in your decades ([a-z ]+)\./)?.[1] || (B.structure.rescue?.text?.includes('behind you') ? '(lived)' : B.structure.rescue?.text?.includes('no decade') ? '(none)' : '?');
  T.when[w] = (T.when[w] || 0) + 1;
}
console.log(JSON.stringify(T, null, 1));
console.log('pairing labels with "tames":', TG_PATTERNS.filter((t) => /\btames\b/i.test(t.en)).map((t) => `${t.zh} ${t.en}`));
