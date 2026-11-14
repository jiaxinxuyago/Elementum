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
  // owner S1 A (2026-10-21): a Twin or Rival never names the structure (子平真诠 论建禄月劫 · 论杂气)
  yuejie: [{ year: 1988, month: 2, day: 10, hour: 12, location: 'Beijing', gender: 'female' }, false],
  passed: [{ year: 1985, month: 2, day: 9, hour: 12, location: 'Beijing', gender: 'female' }, false],
  store: [{ year: 1986, month: 1, day: 15, hour: 12, location: 'Beijing', gender: 'female' }, false],
};
const EXPECT = {
  golden: {
    structure: '正财格 strained 比劫 officer', bonds: '六合 亥寅 year-day | 六合 辰酉 month-hour', absent: '正官 正印',
    stars: '文昌@year 红鸾@month 羊刃@hour 劫煞@year 亡神@day 孤辰@day', void: '午未',
    decadeStars: '2023:天乙贵人 2033:桃花', season: '甲:rooted 丁:absent',
    years: '2026:七杀:半合@day 2028:偏印:六冲@day 2030:比肩:六冲@month',
  },
  B: { structure: '七杀格 strained 官杀混杂 output', bonds: '自刑 酉酉 month-day | 六冲 酉卯 month-hour | 六冲 酉卯 day-hour', absent: '劫财 伤官 正财 偏印 正印', season: '癸:absent 壬:absent' }, // R4 A: born before 秋分, 丙 waits (八月乙木 秋分后用丙) and 上半月无癸 brings 壬
  C: { structure: '正官格 formed', bonds: '六合 申巳 year-month | 刑 申巳 year-month', absent: '正财 七杀', stars: '天喜@day 劫煞@month 亡神@year 空亡@month', season: '壬:shown 癸:hidden' }, // R4 A: 甲 is the cure only when 戊 shows (四月辛金)
  yuejie: { structure: '月劫格 formed' }, // 乙 in 寅: the month's main stem 甲 is the Rival
  passed: { structure: '正官格 strained 七杀 output' }, // 己 in 寅: the 戊 on show is the Rival, so the main stem 甲 decides
  store: { structure: '建禄格 formed' }, // 己 in 丑: only the Twin 己 shows, so the main stem reads as 建禄
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
// owner R1 A (2026-11-14): the dev-site state rules, one golden case per rule (子平真诠 论用神成败救应 and the chapters on each 格)
const V2 = [
  [{year: 1996, month: 7, day: 9, hour: 13, location: 'Beijing', gender: 'female'}, '偏印格 strained starved wealth'], // 丙子 乙未 丁未 丁未 · moderate · 枭神夺食
  [{year: 1984, month: 7, day: 9, hour: 4, location: 'Beijing', gender: 'female'}, '正财格 formed cured'], // 甲子 辛未 甲辰 丙寅 · weak · 财格佩印 / 比劫帮身
  [{year: 1983, month: 4, day: 8, hour: 1, location: 'Beijing', gender: 'male'}, '正官格 formed cured'], // 癸亥 丙辰 丙寅 己丑 · weak · 官逢伤而透印以解之
  [{year: 1991, month: 10, day: 26, hour: 5, location: 'Beijing', gender: 'female'}, '食神格 formed cured'], // 辛未 戊戌 己巳 丁卯 · extremely_strong · 食逢枭而就杀以成格
  [{year: 1983, month: 1, day: 1, hour: 7, location: 'Beijing', gender: 'male'}, '偏财格 broken peers officer'], // 壬戌 癸丑 己丑 戊辰 · strong · 财轻比重
  [{year: 1986, month: 2, day: 15, hour: 1, location: 'Beijing', gender: 'female'}, '七杀格 formed cured'], // 丙寅 庚寅 庚寅 丁丑 · weak · 去官留杀 / 官杀化印
  [{year: 1993, month: 10, day: 1, hour: 23, location: 'Beijing', gender: 'male'}, '正财格 strained heavywealth seal'], // 癸酉 辛酉 丙辰 戊子 · extremely_weak · 财多身弱
  [{year: 1977, month: 12, day: 19, hour: 19, location: 'Beijing', gender: 'female'}, '伤官格 formed cured'], // 丁巳 壬子 庚戌 丙戌 · weak · 金水伤官要见官
  [{year: 1983, month: 3, day: 22, hour: 7, location: 'Beijing', gender: 'male'}, '七杀格 strained heavy seal'], // 癸亥 乙卯 己酉 戊辰 · weak · 杀重身轻，以印化杀
  [{ year: 2000, month: 10, day: 4, hour: 18, location: 'Beijing', gender: 'female' }, '七杀格 strained mixed output'], // 庚辰 乙酉 乙未 乙酉 · moderate · 官杀混杂, no output and no seal seated
  [{ year: 1979, month: 9, day: 6, hour: 21, location: 'Beijing', gender: 'female' }, '七杀格 formed cured'], // 己未 壬申 丙子 己亥 · weak · 去官留杀: the Virtuoso (己) clears the Magistrate
  [{year: 1988, month: 10, day: 9, hour: 12, location: 'Beijing', gender: 'female'}, '伤官格 broken magistrate seal'], // 戊辰 壬戌 丁酉 丙午 · weak · 伤官见官
  [{year: 2001, month: 9, day: 28, hour: 10, location: 'Beijing', gender: 'male'}, '正官格 broken virtuoso seal'], // 辛巳 丁酉 甲午 己巳 · extremely_weak · 官逢伤克
  [{year: 2002, month: 2, day: 18, hour: 5, location: 'Beijing', gender: 'female'}, '正印格 strained excess wealth'], // 壬午 壬寅 丁巳 癸卯 · extremely_strong · 印重身强，透财以抑太过
  [{year: 1979, month: 10, day: 14, hour: 13, location: 'Beijing', gender: 'female'}, '正官格 strained heavy seal'], // 己未 甲戌 甲寅 辛未 · weak · 官重身轻，用印
  [{year: 1986, month: 9, day: 22, hour: 9, location: 'Beijing', gender: 'female'}, '食神格 broken alchemist wealth'], // 丙寅 丁酉 己巳 己巳 · moderate · 食神逢枭
  [{ year: 2003, month: 11, day: 6, hour: 14, location: 'Beijing', gender: 'female' }, '月劫格 strained unchecked output'], // 癸未 癸亥 癸未 己未 · extremely_strong · 透煞而无制 (the General on a stem, no output)
  [{ year: 1990, month: 8, day: 24, hour: 3, location: 'Beijing', gender: 'male' }, '月劫格 formed none'], // 庚午 甲申 辛酉 庚寅 · the General only inside a branch, wealth on a stem: 透财
  [{year: 1973, month: 6, day: 21, hour: 0, location: 'Beijing', gender: 'male'}, '月刃格 strained idle officer'], // 癸丑 戊午 戊子 壬子 · strong · 刃无官杀
  [{year: 1993, month: 8, day: 26, hour: 15, location: 'Beijing', gender: 'male'}, '伤官格 strained drained seal'], // 癸酉 庚申 己卯 壬申 · weak · 伤官泄身太过
  [{year: 1980, month: 3, day: 24, hour: 3, location: 'Beijing', gender: 'female'}, '正印格 strained money officer'], // 庚申 己卯 丙申 庚寅 · moderate · 印轻逢财
  [{year: 1989, month: 4, day: 8, hour: 7, location: 'Beijing', gender: 'female'}, '建禄格 strained idle officer'], // 己巳 戊辰 戊戌 丙辰 · extremely_strong · 无财官
];
for (const [birth, want] of V2) {
  const ch = calculateBaziChart(birth); const st = structureOf(ch, { strength: ch.dayMaster.strength, rules: 'v2' });
  eq('v2 ' + birth.year + '-' + birth.month + '-' + birth.day, 'state', [st.zh, st.status, st.breakerId, st.rescue].filter(Boolean).join(' '), want);
}
if (fails) { console.log(`\n${fails} mismatch(es).`); process.exit(1); }
console.log('PASS: the in-depth layer matches the round-8 golden values, the S1 structure cases and the R1 state rules.');
