// ===================================================================
// ELEMENTUM · Independent Tier-A cross-check (dev tooling, not shipped)
// ===================================================================
// A SECOND implementation of the Four-Pillars arithmetic, deliberately
// sharing no code with src/engine/: classic sexagenary formulas with the
// day cycle anchored on the owner-verified golden day (1995-04-29 =
// 庚寅). Used to verify Tier A for NEW qa-cases before blessing them —
// an engine bug and this script would have to agree by coincidence.
//
//   node tools/qa-pillar-crosscheck.mjs      # diff engine vs independent
//
// Scope: pillars + stem ten-gods + 六合/冲 patterns. Month pillars use
// approximate solar-term dates — every non-boundary case must sit ≥4
// days from a term; deliberate boundary cases pick the CLEAR side.
// Tier B (strength/dominance) is out of scope (consensus, not math).
// ===================================================================
import { calculateBaziChart } from '../src/engine/calculator.js';
import { CASES } from './qa-cases.mjs';

const STEMS = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ELEM = { 甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水' };
const GEN = { 木:'火', 火:'土', 土:'金', 金:'水', 水:'木' };   // generates
const CTRL = { 木:'土', 土:'水', 水:'火', 火:'金', 金:'木' }; // controls
const YANG = new Set(['甲','丙','戊','庚','壬']);

const jdn = (y, m, d) => { const a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3; return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045; };
const ANCHOR = { jdn: jdn(1995, 4, 29), sexIdx: 26 }; // 庚寅 (owner-verified golden)
const sex = (i) => STEMS[((i % 10) + 10) % 10] + BRANCHES[((i % 12) + 12) % 12];

// Approximate solar-term month starts (day-of-month, ±1d真值): month branch
// 寅 begins at 立春 ~Feb 4 … 丑 at 小寒 ~Jan 6. Cases must respect margins.
const TERM_DAY = { 2: 4, 3: 6, 4: 5, 5: 6, 6: 6, 7: 7, 8: 8, 9: 8, 10: 8, 11: 7, 12: 7, 1: 6 };
function monthBranchIdx(y, m, d) { // returns 0=寅 … 11=丑 plus effective bazi year
  let mm = m, before = d < TERM_DAY[m];
  if (before) mm = m === 1 ? 12 : m - 1;
  // branch: Feb(post-立春)=寅 … Jan(post-小寒)=丑
  const seq = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 1: 11 };
  const baziYear = (mm === 12 && m === 1) || mm === 1 || (m === 1) || (m === 2 && before) ? y - 1 : y;
  return { idx: seq[mm], baziYear: (m < 2 || (m === 2 && before)) ? y - 1 : y };
}

function independent(c) {
  const lon = c.longitude ?? 120; // China standard meridian default
  // Solar-time-corrected hour (mean offset; DST-free China assumption).
  const solarMin = c.hour * 60 + (c.minute || 0) + (lon - 120) * 4;
  let dayShift = 0, hm = solarMin;
  if (hm < 0) { hm += 1440; dayShift = -1; } else if (hm >= 1440) { hm -= 1440; dayShift = 1; }
  const hIdx = Math.floor(((hm / 60) + 1) / 2) % 12;
  // Late-Zi (23:00+): hour branch is 子 of the NEXT day column per the
  // engine's documented convention — verified against the golden anchor.
  const lateZi = hm >= 23 * 60;
  const dayIdx = ANCHOR.sexIdx + (jdn(c.year, c.month, c.day) - ANCHOR.jdn) + dayShift + (lateZi ? 1 : 0);
  const day = sex(dayIdx);
  const { idx: mIdx, baziYear } = monthBranchIdx(c.year, c.month, c.day);
  const yStemIdx = (baziYear - 4) % 10, yBranchIdx = (baziYear - 4) % 12;
  const year = STEMS[(yStemIdx + 10) % 10] + BRANCHES[(yBranchIdx + 12) % 12];
  // Five tigers: month stem start from year stem (甲己→丙, 乙庚→戊, 丙辛→庚, 丁壬→壬, 戊癸→甲)
  const tigerStart = [2, 4, 6, 8, 0][((yStemIdx % 5) + 5) % 5];
  const month = STEMS[(tigerStart + mIdx) % 10] + BRANCHES[(mIdx + 2) % 12];
  // Five rats: hour stem start from day stem (same pair table, 子 column)
  const dStemIdx = ((dayIdx % 10) + 10) % 10;
  const ratStart = [0, 2, 4, 6, 8][dStemIdx % 5];
  const hour = STEMS[(ratStart + hIdx) % 10] + BRANCHES[hIdx];
  // Stem ten-gods vs day master
  const dm = day[0];
  const god = (s) => {
    const e = ELEM[s], de = ELEM[dm], same = YANG.has(s) === YANG.has(dm);
    if (e === de) return same ? '比肩' : '劫财';
    if (GEN[de] === e) return same ? '食神' : '伤官';
    if (CTRL[de] === e) return same ? '偏财' : '正财';
    if (CTRL[e] === de) return same ? '七杀' : '正官';
    return same ? '偏印' : '正印';
  };
  // 六合 / 冲 present among the four branches
  const LIUHE = [['子','丑'],['寅','亥'],['卯','戌'],['辰','酉'],['巳','申'],['午','未']];
  const CHONG = [['子','午'],['丑','未'],['寅','申'],['卯','酉'],['辰','戌'],['巳','亥']];
  const br = [year[1], month[1], day[1], hour[1]];
  const pat = [];
  for (const [a, b] of LIUHE) if (br.includes(a) && br.includes(b)) pat.push(`六合(${a}${b})`);
  for (const [a, b] of CHONG) if (br.includes(a) && br.includes(b)) pat.push(`冲(${a}${b})`);
  return { pillars: [year, month, day, hour], gods: [god(year[0]), god(month[0]), god(hour[0])], pat };
}

let fails = 0;
for (const c of CASES) {
  const ind = independent(c);
  const ch = calculateBaziChart(c);
  const P = ch.pillars;
  const eng = {
    pillars: [P.year, P.month, P.day, P.hour].map((p) => `${p.stem}${p.branch}`),
    gods: [ch.tenGods.yearStem?.zh, ch.tenGods.monthStem?.zh, ch.tenGods.hourStem?.zh],
  };
  const pOk = JSON.stringify(ind.pillars) === JSON.stringify(eng.pillars);
  const gOk = JSON.stringify(ind.gods) === JSON.stringify(eng.gods);
  console.log(`${pOk && gOk ? '✓' : '✗'} ${c.label}`);
  console.log(`   independent: ${ind.pillars.join(' ')} · gods ${ind.gods.join('/')}${ind.pat.length ? ' · ' + ind.pat.join(' ') : ''}`);
  if (!pOk || !gOk) { fails += 1; console.log(`   ENGINE:      ${eng.pillars.join(' ')} · gods ${eng.gods.join('/')}`); }
}
console.log(fails ? `\n✗ ${fails} case(s) DISAGREE — do not bless; investigate per DEV_04_Engine_Accuracy_QA.md` : '\n✓ engine agrees with the independent derivation on all cases');
process.exitCode = fails ? 1 : 0;
