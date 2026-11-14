// ===================================================================
// ELEMENTUM · chartDepth — the in-depth layer (owner rulings 2026-10-17, E1–E5, C4)
// ===================================================================
// Pure functions over an engine chart (calculateBaziChart). Nothing here
// changes a verified engine output: it reads pillars and luck pillars and
// derives the layers the Energy Blueprint and Life Chapters need.
//   structureOf      格局 by the 子平真诠 rule: the month branch's revealed
//                    stem decides (main, then middle, then residual); 建禄
//                    and 月刃 when the month branch is the Day Master's own
//                    prosperity or blade, 月劫 when its main stem is the
//                    Rival; a Twin or Rival on show never names it (S1 A).
//                    Plus formed / strained / broken.
//   branchBonds      六合 · 三合 (full and half) · 六冲 · 刑 · 六害 between
//                    the chart's branches, read by the gates they join.
//   godProfile       the ten gods by seat and by hidden weight: which are
//                    seated, which only hide, which are absent.
//   flowYears        each year of a decade: its stem's god, the seats of the
//                    same god it touches, its branch's bonds with the gates.
// ===================================================================

import { getTenGod, HIDDEN_STEMS } from '../calculator.js';

const HS = '甲乙丙丁戊己庚辛壬癸'.split('');
const EB = '子丑寅卯辰巳午未申酉戌亥'.split('');
export const GATE_OF = { year: 'Year Gate', month: 'Month Gate', day: 'Day Gate', hour: 'Hour Gate' };
const GATES = ['year', 'month', 'day', 'hour'];
const god = (dm, s) => getTenGod(dm, s)?.zh || null;

// the Day Master's prosperity (禄) and blade (刃, yang stems only)
const LU = { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' };
const REN = { 甲: '卯', 丙: '午', 戊: '午', 庚: '酉', 壬: '子' };
// the four store branches (杂气 months)
const STORE = ['辰', '戌', '丑', '未'];

export const STRUCTURE_NAME = {
  正官: ['正官格', 'Magistrate structure'], 七杀: ['七杀格', 'General structure'], 正财: ['正财格', 'Steward structure'], 偏财: ['偏财格', 'Horizon structure'],
  正印: ['正印格', 'Sage structure'], 偏印: ['偏印格', 'Alchemist structure'], 食神: ['食神格', 'Artisan structure'], 伤官: ['伤官格', 'Virtuoso structure'],
  建禄: ['建禄格', 'Self-made structure'], 月刃: ['月刃格', 'Rival structure'], 月劫: ['月劫格', 'Rival structure'],
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
export function structureOf(chart, { hourUnknown = false, strength = null, luck = chart.luckPillars || [], rules = 'v1' } = {}) {
  const p = chart.pillars; const dm = p.day.stem; const mb = p.month.branch;
  const stems = GATES.filter((g) => g !== 'day' && !(hourUnknown && g === 'hour')).map((g) => p[g].stem);
  const hidden = HIDDEN_STEMS[mb] || [];
  let key; let rule; let how; let pick = hidden[0];
  const peer = (s) => ['比肩', '劫财'].includes(god(dm, s));
  if (LU[dm] === mb) { key = '建禄'; how = 'lu'; rule = 'the month branch is your own prosperity seat (建禄)'; }
  else if (REN[dm] === mb) { key = '月刃'; how = 'ren'; rule = 'the month branch is your own blade seat (月刃)'; }
  else if (!STORE.includes(mb) && god(dm, hidden[0]?.s) === '劫财') { key = '月劫'; how = 'jie'; rule = 'the month branch\'s main stem is your Rival (月劫)'; }
  else {
    // 子平真诠 论建禄月劫 · 论杂气 (owner S1 A, 2026-10-21): a Twin or Rival on show
    // cannot name the structure; the next stem on show does, else the main stem,
    // read as 建禄 or 月劫 when that main stem is itself the Twin or Rival.
    const layer = hidden.findIndex((h) => stems.includes(h.s) && !peer(h.s));
    const passed = hidden.some((h) => stems.includes(h.s) && peer(h.s));
    pick = layer >= 0 ? hidden[layer] : hidden[0];
    const g = god(dm, pick.s);
    key = layer < 0 && g === '比肩' ? '建禄' : layer < 0 && g === '劫财' ? '月劫' : g;
    how = layer >= 0 ? ['main', 'middle', 'residual'][layer] : key === '建禄' ? 'own' : key === '月劫' ? 'jie' : passed ? 'passed' : 'none';
    rule = layer >= 0 ? `the ${how} stem hidden in the month branch (${pick.s}) shows on a stem`
      : key !== g ? `no other hidden stem of the month branch shows, so its main stem (${pick.s}, your own element) decides`
        : passed ? `only your own element shows from the month branch and cannot name it, so its main stem (${pick.s}) decides`
          : `no hidden stem of the month branch shows, so its main stem (${pick.s}) decides`;
  }
  // the facts the "why" line is composed from
  const why = { how, stem: pick?.s || null, element: pick?.e || null, shown: stems.filter((x) => x === pick?.s).length, holder: god(dm, hidden[0]?.s) };
  // formed / strained / broken (子平真诠: 财官印食 used directly, 杀伤枭刃 used in reverse)
  const seated = new Set(seatsOf(chart, hourUnknown).filter((s) => s.kind !== 'hidden').map((s) => s.god));
  const has = (...gs) => gs.some((g) => seated.has(g));
  const strong = strength ? /strong/.test(strength) : null;
  let status = 'formed'; let breaker = null; let rescue = null;
  const fam = FAMILY[key] || (['建禄', '月刃', '月劫'].includes(key) ? 'self' : null);
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
    else if (has('正官')) { status = 'strained'; breaker = '官杀混杂'; rescue = 'output'; }
  } else if (fam === 'self') {
    if (!has('七杀', '正官', '食神', '伤官', '偏财', '正财')) { status = 'strained'; breaker = 'nothing to use the strength on'; rescue = 'officer'; }
  }
  // the dev-site rules (owner R1 A, 2026-11-14): strength, a cure already seated, the 伤官 exceptions
  let v2 = null;
  if (rules === 'v2') { v2 = stateV2(key, chart, { hourUnknown, strength }); ({ status, breaker, rescue } = v2); }
  // does a coming decade bring the rescue?
  const RESCUE_GODS = { officer: ['七杀', '正官'], output: ['食神', '伤官'], seal: ['正印', '偏印'], wealth: ['偏财', '正财'] };
  const gods = v2?.rescueGods || RESCUE_GODS[rescue];
  const rescueDecades = rescue ? luck.filter((l) => gods?.includes(l.stemTenGod?.zh)).map((l) => ({ god: l.stemTenGod.zh, startAge: l.startAge, startYear: l.startYear, endYear: l.endYear })) : [];
  const [zh, en] = STRUCTURE_NAME[key] || [key, key];
  return { key, zh, en, rule, why, status, breaker, rescue, rescueDecades, ...(v2 ? { breakerId: v2.breakerId, source: v2.source } : {}) };
}

/**
 * The state of a structure by 子平真诠 论用神成败救应 and the chapters on each 格 (owner R1 A, 2026-11-14):
 * what breaks it, what cures it, read with the Day Master's strength and the cure already seated.
 * A breaker that sits only inside a branch strains a structure; only one on a stem (透) breaks it.
 * Returns { status, breakerId, breaker, rescue, rescueGods, source }.
 */
export function stateV2(key, chart, { hourUnknown = false, strength = null } = {}) {
  const seats = seatsOf(chart, hourUnknown).filter((x) => x.kind !== 'hidden');
  const S = new Set(seats.map((x) => x.god)); const T = new Set(seats.filter((x) => x.kind === 'stem').map((x) => x.god));
  const has = (...gs) => gs.some((g) => S.has(g)); const shows = (...gs) => gs.some((g) => T.has(g));
  const strong = /strong/.test(strength || ''); const weak = /weak/.test(strength || '');
  const dm = chart.pillars.day.stem; const mb = chart.pillars.month.branch;
  const OUT = ['食神', '伤官']; const SEAL = ['正印', '偏印']; const WEALTH = ['正财', '偏财']; const OFF = ['七杀', '正官']; const PEER = ['比肩', '劫财'];
  const r = (status, breakerId, rescue = null, rescueGods = null, source = '') => ({ status, breakerId, breaker: breakerId, rescue, rescueGods, source });
  const soften = (x, gods) => (x.status === 'broken' && !shows(...gods) ? { ...x, status: 'strained' } : x);
  switch (key) {
    case '正官':
      if (has('伤官')) return has(...SEAL) ? r('formed', 'cured', null, null, '官逢伤而透印以解之') : soften(r('broken', 'virtuoso', 'seal', SEAL, '官逢伤克'), ['伤官']);
      if (has('七杀')) return has('食神') || (weak && has(...SEAL)) ? r('formed', 'cured', null, null, '杂煞而制煞以清之 / 官杀化印') : r('strained', 'mixed', weak ? 'seal' : 'output', weak ? SEAL : ['食神'], '官杀混杂');
      if (weak && !has(...SEAL)) return r('strained', 'heavy', 'seal', SEAL, '官重身轻，用印');
      return r('formed', 'none', null, null, '官逢财印');
    case '七杀':
      if (has('正官')) return has(...OUT) || (weak && has(...SEAL)) ? r('formed', 'cured', null, null, '去官留杀 (伤官) / 食神制杀 / 官杀化印') : r('strained', 'mixed', weak ? 'seal' : 'output', weak ? SEAL : OUT, '官杀混杂');
      if (!has(...OUT) && !has(...SEAL)) return has(...WEALTH) ? soften(r('broken', 'money', weak ? 'seal' : 'output', weak ? SEAL : ['食神'], '七杀逢财无制'), WEALTH)
        : weak ? r('broken', 'unchecked', 'seal', SEAL, '杀重身轻，无制无化') : r('strained', 'unchecked', 'output', ['食神'], '七杀无制');
      if (weak && !has(...SEAL)) return r('strained', 'heavy', 'seal', SEAL, '杀重身轻，以印化杀');
      if (has('食神') && has('偏印') && !has(...WEALTH)) return r('strained', 'alchemist', 'wealth', WEALTH, '七杀用食制，不要透印');
      return r('formed', 'none', null, null, '七杀逢制 / 杀印相生');
    case '正财': case '偏财':
      if (weak) return has(...SEAL) || has(...PEER) ? r('formed', 'cured', null, null, '财格佩印 / 比劫帮身') : r('strained', 'heavywealth', 'seal', SEAL, '财多身弱');
      if (has(...PEER)) return has(...OFF) || has(...OUT) ? r('formed', 'cured', null, null, '财逢劫而透食以化之，生官以制之') : soften(r(strong ? 'broken' : 'strained', 'peers', 'officer', OFF, '财轻比重'), PEER);
      if (has('七杀')) return has(...OUT) ? r('formed', 'cured', null, null, '财逢杀而食神制杀以生财 / 伤官驾杀') : r('strained', 'general', 'output', OUT, '财透七杀');
      return r('formed', 'none', null, null, '财旺生官 / 财逢食生而身强');
    case '正印': case '偏印':
      if (strong && !has(...WEALTH) && !has(...OUT)) return r('strained', 'excess', 'wealth', WEALTH, '印重身强，透财以抑太过');
      if (!strong && has(...WEALTH)) return has(...PEER) || has(...OFF) ? r('formed', 'cured', null, null, '印逢财而劫财以解之 / 官以化财') : soften(r('strained', 'money', 'officer', OFF, '印轻逢财'), WEALTH);
      if (key === '偏印' && has('食神') && !has(...WEALTH) && !weak) return r('strained', 'starved', 'wealth', WEALTH, '枭神夺食');
      return r('formed', 'none', null, null, '印轻逢杀 / 官印双全 / 身强透食');
    case '食神':
      if (has('偏印') && !has(...WEALTH)) return has('七杀') ? r('formed', 'cured', null, null, '食逢枭而就杀以成格') : weak ? r('formed', 'none', null, null, '身弱，枭印护身') : soften(r('broken', 'alchemist', 'wealth', WEALTH, '食神逢枭'), ['偏印']);
      if (weak && !has(...SEAL) && !has(...PEER)) return r('strained', 'drained', 'seal', SEAL, '食神泄身太过');
      return r('formed', 'none', null, null, '食神生财 / 食带煞而无财');
    case '伤官': {
      if (has('正官')) {
        const jinshui = /[庚辛]/.test(dm) && /[亥子丑]/.test(mb); const shuimu = /[壬癸]/.test(dm) && /[寅卯辰]/.test(mb);
        if (jinshui) return r('formed', 'cured', null, null, '金水伤官要见官');
        if ((shuimu && has(...WEALTH)) || has(...SEAL)) return r('formed', 'cured', null, null, shuimu ? '水木伤官，财官两见' : '伤官佩印');
        return soften(r('broken', 'magistrate', 'seal', SEAL, '伤官见官'), ['正官']);
      }
      if (strong && has(...SEAL) && !has(...WEALTH)) return r('strained', 'excess', 'wealth', WEALTH, '佩印而伤轻身旺');
      if (weak && !has(...SEAL) && !has(...PEER)) return r('strained', 'drained', 'seal', SEAL, '伤官泄身太过');
      return r('formed', 'none', null, null, '伤官生财 / 伤官佩印');
    }
    case '建禄': case '月劫': // 子平真诠 论建禄月劫: the self structures take their use from what shows on a stem (透官 / 透财 / 透煞)
      if (shows('正官')) return r('formed', 'none', null, null, '透官而逢财印');
      if (shows('七杀')) return has(...OUT) ? r('formed', 'none', null, null, '透煞而遇制') : r('strained', 'unchecked', 'output', ['食神'], '透煞而无制');
      if (has(...WEALTH) || has(...OUT) || has(...OFF)) return r('formed', 'none', null, null, '透财而逢食伤 / 官杀在支');
      return r('strained', 'idle', 'officer', OFF, '无财官');
    case '月刃':
      if (has(...OFF)) return r('formed', 'none', null, null, '阳刃用官杀');
      if (has(...WEALTH) && has(...OUT)) return r('formed', 'none', null, null, '阳刃用财，食伤生财');
      return r('strained', 'idle', 'officer', OFF, '刃无官杀');
    default:
      return r('formed', 'none');
  }
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
