// QA-F2 diagnostic — how often does the 合 (stem-combination) handling change the
// DM strength band, and does it fire non-adjacently? Counterfactual: actual strength
// (with bonded stems) vs strength with an EMPTY bonded set. Run: node tools/qa-strength-diagnostic.mjs
import { calculateBaziChart, computeDMStrength, getEnergyBand } from '../src/engine/calculator.js';
import { buildEnergyChart } from '../src/engine/buildEnergyChart.js';

const STEM_ELEM = {甲:'Wood',乙:'Wood',丙:'Fire',丁:'Fire',戊:'Earth',己:'Earth',庚:'Metal',辛:'Metal',壬:'Water',癸:'Water'};
const GEN = {Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const BOND_PAIRS = [['甲','己','Earth'],['乙','庚','Metal'],['丙','辛','Water'],['丁','壬','Wood'],['戊','癸','Fire']];

const CASES = [
  {y:1995,m:4,d:29,h:18}, {y:1988,m:8,d:8,h:8},  {y:1990,m:12,d:15,h:14},
  {y:2001,m:6,d:21,h:3},  {y:1979,m:2,d:14,h:22}, {y:1993,m:11,d:3,h:10},
  {y:2010,m:5,d:5,h:16},  {y:1985,m:9,d:9,h:12},  {y:1972,m:7,d:1,h:6},
  {y:2004,m:3,d:18,h:20}, {y:1968,m:10,d:25,h:4}, {y:1999,m:1,d:7,h:13},
];

let flips = 0, withDMbond = 0, nonAdj = 0;
console.log('chart            DM   dom    strength(actual)   strength(no-合)   Δband?  合(DM-supporting)');
for (const c of CASES) {
  const chart = calculateBaziChart({ year:c.y, month:c.m, day:c.d, hour:c.h, location:'Beijing', gender:'male' });
  const P = chart.pillars;
  const dmStem = chart.dayMaster.stem, dmEl = chart.dayMaster.element;
  const ec = buildEnergyChart(chart);
  const actual = chart.dayMaster.strength;
  const noBond = computeDMStrength(P, dmStem, new Set()).strength; // empty bonded set
  const flipped = getEnergyBand(actual) !== getEnergyBand(noBond);
  if (flipped) flips++;
  // detect DM-supporting 合 present + adjacency
  const order = [P.year.stem, P.month.stem, P.day.stem, P.hour.stem];
  const bonds = [];
  for (const [a,b,res] of BOND_PAIRS) {
    if (order.includes(a) && order.includes(b) && (res===dmEl || GEN[res]===dmEl)) {
      withDMbond++;
      const ia = order.indexOf(a), ib = order.indexOf(b);
      const adjacent = order.some((s,i)=> i<3 && ((order[i]===a&&order[i+1]===b)||(order[i]===b&&order[i+1]===a)));
      if (!adjacent) nonAdj++;
      bonds.push(`${a}${b}→${res}${adjacent?'(adj)':'(NON-ADJ⚠)'}`);
    }
  }
  const tag = `${P.year.stem}${P.year.branch}${P.month.stem}${P.month.branch}${P.day.stem}${P.day.branch}${P.hour.stem}${P.hour.branch}`;
  console.log(`${tag}  ${dmStem}${dmEl[0]}  ${ec.energies[0].el.padEnd(5)}  ${actual.padEnd(17)}  ${noBond.padEnd(15)}  ${flipped?'YES ⚠':'no   '}  ${bonds.join(' ')||'—'}`);
}
console.log(`\nSUMMARY: ${CASES.length} charts · ${withDMbond} have a DM-supporting 合 · ${nonAdj} of those fired NON-ADJACENT · ${flips} had their band CHANGED by the 合-handling`);
