// ===================================================================
// ELEMENTUM · stars — 神煞, owner rulings D1–D6 (2026-10-17)
// ===================================================================
// The symbolic stars by their common bases (D2): the day stem for the stem
// stars, the year branch and the day branch for the group stars, the year
// branch for the Phoenix and Lonely pairs, the month branch for the Virtue
// stars, the day pillar's ten-day cycle for the Void. A star sits in a gate
// when its target is that gate's stem or branch. The list and every table are
// the sourced set in research/shensha-rules.json (19 stars: 三命通会,
// 五行精纪, 渊海子平, 神峰通考, 协纪辨方书); kind is the page group (P4):
// help, or test with the friction framing (D1).
// starsOf(chart)                 → the natal stars, by gate
// arrivingStars(chart, pillar)   → the stars a decade or a year brings (D3)
// Each rule names its base and its classical source key; school
// disagreements are kept as alternates (owner I1: follow every text, note
// where they disagree), never silently merged.
// ===================================================================

const GROUP = { 申: 'water', 子: 'water', 辰: 'water', 寅: 'fire', 午: 'fire', 戌: 'fire', 亥: 'wood', 卯: 'wood', 未: 'wood', 巳: 'metal', 酉: 'metal', 丑: 'metal' };
const byGroup = (t) => (b) => t[GROUP[b]];
const SEASON_OF = { 亥: 'wint', 子: 'wint', 丑: 'wint', 寅: 'spr', 卯: 'spr', 辰: 'spr', 巳: 'sum', 午: 'sum', 未: 'sum', 申: 'aut', 酉: 'aut', 戌: 'aut' };

// kind: help | test | mixed. on: 'stem' | 'branch' (what the target is matched against).
// base: dayStem | yearBranch | dayBranch | monthBranch | (several: each base is tried).
export const STARS = [
  { id: 'tianyi', zh: '天乙贵人', en: 'Nobleman', kind: 'help', on: 'branch', base: ['dayStem'], yearBase: true,
    map: { 甲: '丑未', 戊: '丑未', 庚: '丑未', 乙: '子申', 己: '子申', 丙: '亥酉', 丁: '亥酉', 辛: '寅午', 壬: '卯巳', 癸: '卯巳' },
    alt: { note: 'one verse gives 庚辛 to 寅午 (甲戊兼牛羊, 庚辛逢马虎)', map: { 庚: '寅午' } } },
  { id: 'wenchang', zh: '文昌', en: 'Scholar’s Star', kind: 'help', on: 'branch', base: ['dayStem'], yearBase: true,
    map: { 甲: '巳', 乙: '午', 丙: '申', 丁: '酉', 戊: '申', 己: '酉', 庚: '亥', 辛: '子', 壬: '寅', 癸: '卯' } },
  { id: 'tiande', zh: '天德贵人', en: 'Heavenly Virtue', kind: 'help', on: 'any', base: ['monthBranch'],
    map: { 寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲', 申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚' } },
  { id: 'yuede', zh: '月德贵人', en: 'Moon Virtue', kind: 'help', on: 'stem', base: ['monthBranch'],
    fn: byGroup({ fire: '丙', water: '壬', wood: '甲', metal: '庚' }) },
  { id: 'lu', zh: '禄神', en: 'Prosperity Star', kind: 'help', on: 'branch', base: ['dayStem'],
    map: { 甲: '寅', 乙: '卯', 丙: '巳', 丁: '午', 戊: '巳', 己: '午', 庚: '申', 辛: '酉', 壬: '亥', 癸: '子' } },
  { id: 'jinyu', zh: '金舆', en: 'Golden Carriage', kind: 'help', on: 'branch', base: ['dayStem'],
    map: { 甲: '辰', 乙: '巳', 丙: '未', 丁: '申', 戊: '未', 己: '申', 庚: '戌', 辛: '亥', 壬: '丑', 癸: '寅' } },
  { id: 'jiangxing', zh: '将星', en: 'Commander Star', kind: 'help', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '子', fire: '午', wood: '卯', metal: '酉' }) },
  { id: 'hongluan', zh: '红鸾', en: 'Red Phoenix', kind: 'help', on: 'branch', base: ['yearBranch'],
    map: { 子: '卯', 丑: '寅', 寅: '丑', 卯: '子', 辰: '亥', 巳: '戌', 午: '酉', 未: '申', 申: '未', 酉: '午', 戌: '巳', 亥: '辰' } },
  { id: 'tianxi', zh: '天喜', en: 'Heavenly Joy', kind: 'help', on: 'branch', base: ['yearBranch'],
    map: { 子: '酉', 丑: '申', 寅: '未', 卯: '午', 辰: '巳', 巳: '辰', 午: '卯', 未: '寅', 申: '丑', 酉: '子', 戌: '亥', 亥: '戌' } },
  { id: 'huagai', zh: '华盖', en: 'Canopy Star', kind: 'help', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '辰', fire: '戌', wood: '未', metal: '丑' }) },
  { id: 'yima', zh: '驿马', en: 'Travelling Horse', kind: 'help', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '寅', fire: '申', wood: '巳', metal: '亥' }) },
  { id: 'taohua', zh: '桃花', en: 'Peach Blossom', kind: 'help', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '酉', fire: '卯', wood: '子', metal: '午' }) },
  { id: 'yangren', zh: '羊刃', en: 'Ram’s Edge', kind: 'test', on: 'branch', base: ['dayStem'],
    map: { 甲: '卯', 丙: '午', 戊: '午', 庚: '酉', 壬: '子' },
    alt: { note: 'yin stems: one school gives 乙辰 丁未 己未 辛戌 癸丑, another 乙寅 丁巳 己巳 辛申 癸亥, the mainstream gives none', map: { 乙: '辰', 丁: '未', 己: '未', 辛: '戌', 癸: '丑' } } },
  { id: 'jiesha', zh: '劫煞', en: 'Robbery Star', kind: 'test', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '巳', fire: '亥', wood: '申', metal: '寅' }) },
  { id: 'wangshen', zh: '亡神', en: 'Lost Spirit', kind: 'test', on: 'branch', base: ['yearBranch', 'dayBranch'],
    fn: byGroup({ water: '亥', fire: '巳', wood: '寅', metal: '申' }) },
  { id: 'guchen', zh: '孤辰', en: 'Lonely Star', kind: 'test', on: 'branch', base: ['yearBranch'],
    fn: (b) => ({ wint: '寅', spr: '巳', sum: '申', aut: '亥' })[SEASON_OF[b]] },
  { id: 'guasu', zh: '寡宿', en: 'Solitary Star', kind: 'test', on: 'branch', base: ['yearBranch'],
    fn: (b) => ({ wint: '戌', spr: '丑', sum: '辰', aut: '未' })[SEASON_OF[b]] },
];
// stars read off the day pillar itself
export const DAY_PILLAR_STARS = [
  { id: 'kuigang', zh: '魁罡', en: 'Dipper Star', kind: 'test', days: ['庚辰', '庚戌', '壬辰', '戊戌'] },
];

const HS = '甲乙丙丁戊己庚辛壬癸'; const EB = '子丑寅卯辰巳午未申酉戌亥';
/** The Void (空亡): the two branches the day pillar's ten-day cycle leaves empty. */
export function voidOf(pillar) { const s = HS.indexOf(pillar.stem), b = EB.indexOf(pillar.branch); return [EB[(b - s + 10 + 12) % 12], EB[(b - s + 11 + 12) % 12]]; }
const GATES = ['year', 'month', 'day', 'hour'];
function baseValue(p, base) {
  return { dayStem: p.day.stem, yearStem: p.year.stem, yearBranch: p.year.branch, dayBranch: p.day.branch, monthBranch: p.month.branch }[base];
}
function targetsOf(star, value, { alt = false } = {}) {
  const t = star.fn ? star.fn(value) : (alt && star.alt?.map?.[value]) || star.map?.[value];
  return t ? [...t] : [];
}
// a base never lights its own seat (the year branch does not make itself its own Peach Blossom)
const seatOf = (base) => ({ yearBranch: ['year', 'branch'], dayBranch: ['day', 'branch'], monthBranch: ['month', 'branch'] })[base];

/** The natal stars: [{ id, zh, en, kind, gate, part, base }], one row per star per gate. */
export function starsOf(chart, { hourUnknown = false, alt = false, yearStem = false } = {}) {
  const p = chart.pillars; const out = []; const seen = new Set();
  for (const star of STARS) for (const base of [...star.base, ...(yearStem && star.yearBase ? ['yearStem'] : [])]) {
    const targets = targetsOf(star, baseValue(p, base), { alt }); const self = seatOf(base);
    for (const g of GATES) {
      if (hourUnknown && g === 'hour') continue;
      for (const part of ['stem', 'branch']) {
        if (g === 'day' && part === 'stem') continue;
        if (star.on !== 'any' && star.on !== part) continue;
        if (self && self[0] === g && self[1] === part) continue;
        if (!targets.includes(p[g][part])) continue;
        const k = `${star.id}:${g}`; if (seen.has(k)) continue; seen.add(k);
        out.push({ id: star.id, zh: star.zh, en: star.en, kind: star.kind, gate: g, part, base });
      }
    }
  }
  for (const s of DAY_PILLAR_STARS) if (s.days.includes(p.day.stem + p.day.branch)) out.push({ id: s.id, zh: s.zh, en: s.en, kind: s.kind, gate: 'day', part: 'pillar', base: 'dayPillar' });
  const vd = voidOf(p.day);
  for (const g of ['year', 'month', 'hour']) if (!(hourUnknown && g === 'hour') && vd.includes(p[g].branch)) out.push({ id: 'kongwang', zh: '空亡', en: 'the Void', kind: 'test', gate: g, part: 'branch', base: 'dayPillar' });
  return out;
}

/** The stars a passing pillar brings ({ stem, branch } of a decade or a year), not already natal in the chart. */
export function arrivingStars(chart, pillar, { alt = false, yearStem = false } = {}) {
  const p = chart.pillars; const out = []; const natal = new Set(starsOf(chart, { alt, yearStem }).map((s) => s.id));
  if (voidOf(p.day).includes(pillar.branch)) out.push({ id: 'kongwang', zh: '空亡', en: 'the Void', kind: 'test', base: 'dayPillar', natal: natal.has('kongwang') });
  for (const star of STARS) {
    const hit = [...star.base, ...(yearStem && star.yearBase ? ['yearStem'] : [])].find((base) => { const t = targetsOf(star, baseValue(p, base), { alt }); return (star.on !== 'stem' && t.includes(pillar.branch)) || (star.on !== 'branch' && t.includes(pillar.stem)); });
    if (hit) out.push({ id: star.id, zh: star.zh, en: star.en, kind: star.kind, base: hit, natal: natal.has(star.id) });
  }
  return out;
}
