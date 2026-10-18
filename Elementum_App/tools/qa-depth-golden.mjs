// ===================================================================
// ELEMENTUM · the in-depth layer's golden check (owner P6 A, round 8)
// ===================================================================
// Asserts the structure, bonds, characters present, years, stars and season
// on the three review charts against the values the owner read on the
// round-8 page (https://claude.ai/artifact/J5JMZEioCtMy3x7dadZkVN).
//   node tools/qa-depth-golden.mjs        # exit 1 on any mismatch
// ===================================================================
import { calculateBaziChart } from '../src/engine/calculator.js';
import { structureOf, branchBonds, godProfile, flowYears, starsOf, arrivingStars, voidOf, seasonOf } from '../src/engine/depth/index.js';

const CHARTS = {
  golden: [{ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' }, false],
  B: [{ year: 1990, month: 9, day: 17, hour: 5, location: 'Beijing', gender: 'male' }, false],
  C: [{ year: 1992, month: 5, day: 25, hour: 12, location: 'Beijing', gender: 'female' }, true],
};
const EXPECT = {
  golden: {
    structure: '正财格 strained 比劫 officer', bonds: '六合 亥寅 year-day | 六合 辰酉 month-hour', absent: '正官 正印',
    stars: '文昌@year 红鸾@month 羊刃@hour 劫煞@year 亡神@day 孤辰@day', void: '午未',
    decadeStars: '2023:天乙贵人 2033:桃花', season: '甲:rooted 丁:absent',
    years: '2026:七杀:半合@day 2028:偏印:六冲@day 2030:比肩:六冲@month',
  },
  B: { structure: '七杀格 strained 官杀混杂 output', bonds: '自刑 酉酉 month-day | 六冲 酉卯 month-hour | 六冲 酉卯 day-hour', absent: '劫财 伤官 正财 偏印 正印', season: '癸:absent 丙:absent' },
  C: { structure: '正官格 formed', bonds: '六合 申巳 year-month | 刑 申巳 year-month', absent: '正财 七杀', stars: '天喜@day 劫煞@month 亡神@year 空亡@month', season: '壬:shown 甲:absent 癸:hidden' },
};
const PRI = { 六冲: 5, 刑: 4, 六害: 3, 六合: 2, 半合: 2, 三合: 2, 自刑: 1 };
const RANK = { month: 4, day: 3, hour: 2, year: 1 };
let fails = 0;
const eq = (k, what, got, want) => { if (want === undefined) return; if (got !== want) { fails++; console.log(`✗ ${k} ${what}\n    got  ${got}\n    want ${want}`); } };
for (const [k, [birth, hu]] of Object.entries(CHARTS)) {
  const ch = calculateBaziChart(birth); const e = EXPECT[k];
  const s = structureOf(ch, { strength: ch.dayMaster.strength, hourUnknown: hu });
  eq(k, 'structure', [s.zh, s.status, s.breaker, s.rescue].filter(Boolean).join(' '), e.structure);
  eq(k, 'bonds', branchBonds(ch, { hourUnknown: hu }).map((b) => `${b.type} ${b.branches} ${b.gates.join('-')}`).join(' | '), e.bonds);
  eq(k, 'absent', godProfile(ch, { hourUnknown: hu }).filter((g) => g.state === 'absent').map((g) => g.god).join(' '), e.absent);
  eq(k, 'stars', starsOf(ch, { hourUnknown: hu }).map((x) => `${x.zh}@${x.gate}`).join(' '), e.stars);
  eq(k, 'void', voidOf(ch.pillars.day).join(''), e.void);
  eq(k, 'decadeStars', ch.luckPillars.filter((l) => l.startYear >= 2023 && l.startYear <= 2033).map((l) => `${l.startYear}:${arrivingStars(ch, l).filter((x) => !x.natal).map((x) => x.zh).join(',')}`).join(' '), e.decadeStars);
  const se = seasonOf(ch, { hourUnknown: hu }); eq(k, 'season', se.asks.map((a) => `${a.stem}:${a.state}`).join(' '), e.season);
  if (e.years) {
    const ys = flowYears(ch, 2026, 2032, { hourUnknown: hu }).filter((y) => [2026, 2028, 2030].includes(y.year)).map((y) => {
      const b = y.bonds.map((x) => ({ ...x, g: x.gates.find((g) => !String(g).startsWith('year ')) })).sort((a, c) => (PRI[c.type] - PRI[a.type]) || (RANK[c.g] - RANK[a.g]))[0];
      return `${y.year}:${y.god}:${b ? `${b.type}@${b.g}` : '-'}`; });
    eq(k, 'years', ys.join(' '), e.years);
  }
}
if (fails) { console.log(`\n${fails} mismatch(es).`); process.exit(1); }
console.log('PASS: the in-depth layer matches the round-8 golden values on all three charts.');
