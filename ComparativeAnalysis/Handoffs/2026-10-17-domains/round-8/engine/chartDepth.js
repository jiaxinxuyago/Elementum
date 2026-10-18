// ===================================================================
// ELEMENTUM · chartDepth (HANDOFF DRAFT, not in the app) — the in-depth layer (owner rulings 2026-10-17, E1–E5, C4)
// ===================================================================
// Pure functions over an engine chart (calculateBaziChart). Nothing here
// changes a verified engine output: it reads pillars and luck pillars and
// derives the layers the Energy Blueprint and Life Chapters need.
//   structureOf      格局 by the 子平真诠 rule: the month branch's revealed
//                    stem decides (main, then middle, then residual); 建禄
//                    and 月刃 when the month branch is the Day Master's own
//                    prosperity or blade. Plus formed / strained / broken.
//   branchBonds      六合 · 三合 (full and half) · 六冲 · 刑 · 六害 between
//                    the chart's branches, read by the gates they join.
//   godProfile       the ten gods by seat and by hidden weight: which are
//                    seated, which only hide, which are absent.
//   flowYears        each year of a decade: its stem's god, the seats of the
//                    same god it touches, its branch's bonds with the gates.
// ===================================================================

import { getTenGod, HIDDEN_STEMS } from '../../../../../Elementum_App/src/engine/calculator.js';

const HS = '甲乙丙丁戊己庚辛壬癸'.split('');
const EB = '子丑寅卯辰巳午未申酉戌亥'.split('');
export const GATE_OF = { year: 'Year Gate', month: 'Month Gate', day: 'Day Gate', hour: 'Hour Gate' };
const GATES = ['year', 'month', 'day', 'hour'];
const god = (dm, s) => getTenGod(dm, s)?.zh || null;

// the Day Master's prosperity (禄) and blade (刃, yang stems only)
const LU = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const REN = { 甲: '卯', 丙: '午', 戊: '午', 庚: '酉', 壬: '子' };

export const STRUCTURE_NAME = {
  正官: ['正官格', 'Magistrate structure'], 七杀: ['七杀格', 'General structure'], 正财: ['正财格', 'Steward structure'], 偏财: ['偏财格', 'Horizon structure'],
  正印: ['正印格', 'Sage structure'], 偏印: ['偏印格', 'Alchemist structure'], 食神: ['食神格', 'Artisan structure'], 伤官: ['伤官格', 'Virtuoso structure'],
  建禄: ['建禄格', 'Self-made structure'], 月刃: ['月刃格', 'Rival structure'],
};
const FAMILY = { 比肩: 'self', 劫财: 'self', 食神: 'output', 伤官: 'output', 偏财: 'wealth', 正财: 'wealth', 七杀: 'officer', 正官: 'officer', 偏印: 'seal', 正印: 'seal' };

function seatsOf(chart, hourUnknown) {
  const p = chart.pillars; const dm = p.day.stem; const out = [];
  for (const g of GATES) {
    if (hourUnknown && g === 'hour') continue;
    if (g !== 'day') out.push({ gate: g, kind: 'stem', stem: p[g].stem, god: god(dm, p[g].stem) });
    const hs = HIDDEN_STEMS[p[g].branch] || [];
    hs.forEach((h, i) => out.push({ gate: g, kind: i === 0 ? 'branch' : 'hidden', layer: ['main', 'middle', 'residual'][i], stem: h.s, w: h.w, god: god(dm, h.s) }));
  }
  return out;
}

/** 格局 by the 子平真诠 revealed-stem rule, with a formed / strained / broken read. */
export function structureOf(chart, { hourUnknown = false, strength = null, luck = chart.luckPillars || [] } = {}) {
  const p = chart.pillars; const dm = p.day.stem; const mb = p.month.branch;
  const stems = GATES.filter((g) => g !== 'day' && !(hourUnknown && g === 'hour')).map((g) => p[g].stem);
  const hidden = HIDDEN_STEMS[mb] || [];
  let key; let rule;
  if (LU[dm] === mb) { key = '建禄'; rule = 'the month branch is your own prosperity seat (建禄)'; }
  else if (REN[dm] === mb) { key = '月刃'; rule = 'the month branch is your own blade seat (月刃)'; }
  else {
    const layer = hidden.findIndex((h) => stems.includes(h.s));
    const pick = layer >= 0 ? hidden[layer] : hidden[0];
    key = god(dm, pick.s);
    rule = layer >= 0 ? `the ${['main', 'middle', 'residual'][layer]} stem hidden in the month branch (${pick.s}) shows on a stem` : `no hidden stem of the month branch shows, so its main stem (${pick.s}) decides`;
  }
  // formed / strained / broken (子平真诠: 财官印食 used directly, 杀伤枭刃 used in reverse)
  const seated = new Set(seatsOf(chart, hourUnknown).filter((s) => s.kind !== 'hidden').map((s) => s.god));
  const has = (...gs) => gs.some((g) => seated.has(g));
  const strong = strength ? /strong/.test(strength) : null;
  let status = 'formed'; let breaker = null; let rescue = null;
  const fam = FAMILY[key] || (key === '建禄' || key === '月刃' ? 'self' : null);
  if (fam === 'wealth') {
    if (has('比肩', '劫财')) { breaker = '比劫'; rescue = has('七杀', '正官') ? null : 'officer'; status = rescue ? 'strained' : 'formed'; if (!has('七杀', '正官') && !has('食神', '伤官')) status = 'broken'; }
    if (strong === false) status = status === 'formed' ? 'strained' : status;
  } else if (key === '正官') {
    if (has('伤官') && !has('正印', '偏印')) { status = 'broken'; breaker = '伤官'; rescue = 'seal'; }
    else if (has('七杀')) { status = 'strained'; breaker = '七杀'; rescue = 'output'; }
  } else if (fam === 'seal') {
    if (has('偏财', '正财') && !has('七杀', '正官')) { status = 'strained'; breaker = '财'; rescue = 'officer'; }
    if (key === '偏印' && has('食神') && !has('偏财', '正财')) { status = 'strained'; breaker = '食神 starved'; rescue = 'wealth'; }
  } else if (key === '食神') {
    if (has('偏印') && !has('偏财', '正财')) { status = 'broken'; breaker = '偏印'; rescue = 'wealth'; }
  } else if (key === '伤官') {
    if (has('正官') && !has('正印', '偏印')) { status = 'broken'; breaker = '正官'; rescue = 'seal'; }
  } else if (key === '七杀') {
    if (!has('食神', '伤官') && !has('正印', '偏印')) { status = strong === false ? 'broken' : 'strained'; breaker = 'uncontrolled pressure'; rescue = 'output'; }
  } else if (fam === 'self') {
    if (!has('七杀', '正官', '食神', '伤官', '偏财', '正财')) { status = 'strained'; breaker = 'nothing to use the strength on'; rescue = 'officer'; }
  }
  // does a coming decade bring the rescue?
  const RESCUE_GODS = { officer: ['七杀', '正官'], output: ['食神', '伤官'], seal: ['正印', '偏印'], wealth: ['偏财', '正财'] };
  const rescueDecades = rescue ? luck.filter((l) => RESCUE_GODS[rescue]?.includes(l.stemTenGod?.zh)).map((l) => ({ god: l.stemTenGod.zh, startAge: l.startAge, startYear: l.startYear, endYear: l.endYear })) : [];
  const [zh, en] = STRUCTURE_NAME[key] || [key, key];
  return { key, zh, en, rule, status, breaker, rescue, rescueDecades };
}

const LIUHE = [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']];
const CHONG = [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']];
const HAI = [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']];
const XING = [['寅', '巳'], ['巳', '申'], ['寅', '申'], ['丑', '戌'], ['戌', '未'], ['丑', '未'], ['子', '卯']];
const SELF_XING = ['辰', '午', '酉', '亥'];
const SANHE = [['申', '子', '辰', 'Water'], ['亥', '卯', '未', 'Wood'], ['寅', '午', '戌', 'Fire'], ['巳', '酉', '丑', 'Metal']];
const pairIn = (list, a, b) => list.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

/** The bonds between branches, read by the gates they join. extra = { label, branch } adds a passing year or decade. */
export function branchBonds(chart, { hourUnknown = false, extra = null } = {}) {
  const p = chart.pillars;
  const nodes = GATES.filter((g) => !(hourUnknown && g === 'hour')).map((g) => ({ gate: g, branch: p[g].branch }));
  if (extra) nodes.push({ gate: extra.label, branch: extra.branch, passing: true });
  const out = [];
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], b = nodes[j]; if (extra && !a.passing && !b.passing) continue;
    const at = [a.gate, b.gate]; const br = a.branch + b.branch;
    if (pairIn(LIUHE, a.branch, b.branch)) out.push({ type: '六合', en: 'bind', gates: at, branches: br });
    if (pairIn(CHONG, a.branch, b.branch)) out.push({ type: '六冲', en: 'clash', gates: at, branches: br });
    if (pairIn(HAI, a.branch, b.branch)) out.push({ type: '六害', en: 'harm', gates: at, branches: br });
    if (pairIn(XING, a.branch, b.branch)) out.push({ type: '刑', en: 'punishment', gates: at, branches: br });
    if (a.branch === b.branch && SELF_XING.includes(a.branch)) out.push({ type: '自刑', en: 'self-punishment', gates: at, branches: br });
  }
  for (const [x, mid, y, el] of SANHE) {
    const hit = nodes.filter((n) => [x, mid, y].includes(n.branch));
    const kinds = new Set(hit.map((n) => n.branch));
    if (extra && !hit.some((n) => n.passing)) continue;
    if (kinds.size === 3) out.push({ type: '三合', en: `full ${el} frame`, gates: hit.map((n) => n.gate), branches: x + mid + y });
    else if (kinds.size === 2 && kinds.has(mid)) out.push({ type: '半合', en: `half ${el} frame`, gates: hit.map((n) => n.gate), branches: [...kinds].join('') });
  }
  return out;
}

/** The ten gods: seated (a stem or a branch's main stem), hidden only, or absent. */
export function godProfile(chart, { hourUnknown = false } = {}) {
  const seats = seatsOf(chart, hourUnknown); const gods = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];
  return gods.map((g) => {
    const seated = seats.filter((s) => s.god === g && s.kind !== 'hidden');
    const hidden = seats.filter((s) => s.god === g && s.kind === 'hidden');
    const weight = seated.reduce((a, s) => a + (s.kind === 'stem' ? 1 : s.w), 0) + hidden.reduce((a, s) => a + s.w, 0);
    return { god: g, seated: seated.map((s) => `${s.gate}-${s.kind}`), hidden: hidden.map((s) => `${s.gate}-${s.layer}`), weight: Math.round(weight * 100) / 100, state: seated.length ? 'seated' : hidden.length ? 'hidden' : 'absent' };
  }).sort((a, b) => b.weight - a.weight);
}

/** Each year of a decade (or any span): its stem god, the seats of that god, its branch's bonds with the gates. */
export function flowYears(chart, from, to, { hourUnknown = false } = {}) {
  const dm = chart.pillars.day.stem; const seats = seatsOf(chart, hourUnknown).filter((s) => s.kind !== 'hidden');
  const years = [];
  for (let y = from; y <= to; y++) {
    const stem = HS[(((y - 4) % 10) + 10) % 10]; const branch = EB[(((y - 4) % 12) + 12) % 12];
    const g = god(dm, stem); const bg = god(dm, (HIDDEN_STEMS[branch] || [])[0]?.s);
    years.push({ year: y, stem, branch, god: g, branchGod: bg, touches: seats.filter((s) => s.god === g || s.god === bg).map((s) => `${s.gate}-${s.kind}`), bonds: branchBonds(chart, { hourUnknown, extra: { label: `year ${y}`, branch } }) });
  }
  return years;
}
