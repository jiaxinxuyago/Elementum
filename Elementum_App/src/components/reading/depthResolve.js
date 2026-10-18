// ===================================================================
// ELEMENTUM · depthResolve — the in-depth sections' page models (round 8)
// ===================================================================
// Owner rulings 2026-10-17/18 (A–G, R1–R5, P1–P6, W1–W15 all A; build
// B1–B4): the Domains reading By position, Life Chapters (the gates with
// their decades, and the years of the current decade), Stars and the
// Energy Blueprint, composed from the in-depth engine (engine/depth) and
// the units written so far (content/depth.js). Every unit is keyed by its
// station key; a unit not yet written is filled with a plain draft line
// built from the chart and flagged `draft` (B3), so every page reads end
// to end on any chart while the batch is written. Pure: the same models
// feed the screens, the audit kit and the review pages.
// ===================================================================

import { DEPTH_UNITS } from '../../content/depth.js';
import { TG_PERSONA } from '../../content/index.js';
import { TG_PATTERNS } from '../../content/tgPatterns.js';
import { GATES } from '../../content/positions.js';
import { readerAge, decadePole, RULING, GATE_ORDER, GATE_START, GATE_SPAN, DEC_MIN, DEC_MAX } from './domainsResolve.js';
import { structureOf, branchBonds, godProfile, flowYears, starsOf, arrivingStars, seasonOf, STRUCTURE_NAME } from '../../engine/depth/index.js';
import { relationOf } from '../../engine/index.js';

const GOD_ID = { 比肩: 'bijian', 劫财: 'jiecai', 食神: 'shishen', 伤官: 'shangguan', 偏财: 'piancai', 正财: 'zhengcai', 七杀: 'qisha', 正官: 'zhengguan', 偏印: 'pianyin', 正印: 'zhengyin' };
const STEM_EL = { 甲: 'Wood', 乙: 'Wood', 丙: 'Fire', 丁: 'Fire', 戊: 'Earth', 己: 'Earth', 庚: 'Metal', 辛: 'Metal', 壬: 'Water', 癸: 'Water' };
const PINYIN = { 甲: 'jia', 乙: 'yi', 丙: 'bing', 丁: 'ding', 戊: 'wu', 己: 'ji', 庚: 'geng', 辛: 'xin', 壬: 'ren', 癸: 'gui', 子: 'zi', 丑: 'chou', 寅: 'yin', 卯: 'mao', 辰: 'chen', 巳: 'si', 午: 'wu', 未: 'wei', 申: 'shen', 酉: 'you', 戌: 'xu', 亥: 'hai' };
export const CHAPTER = { year: 'Early Chapter', month: 'Rising Chapter', day: 'Home Chapter', hour: 'Late Chapter' };
const GATE_END = { year: 15, month: 34, day: 47, hour: 120 };
const NUMW = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const persona = (g) => (TG_PERSONA[g] || g || '').replace(/^The /, '');
const an = (w) => (/^[AEIOU]/.test(w) ? 'an' : 'a');
const pl = (n, one, many) => (n === 1 ? one : many);

// Draft vocabulary (B3): a plain noun phrase per character, used only in
// the draft lines that stand in for units not yet written.
const GLOSS = { 比肩: 'self-reliance', 劫财: 'appetite for a contest', 食神: 'ease and appetite', 伤官: 'sharp voice', 偏财: 'range and side doors', 正财: 'careful keeping', 七杀: 'pressure that forges', 正官: 'rules and duty', 偏印: 'strange knowledge', 正印: 'shelter and learning' };
const STAR_GLOSS = {
  tianyi: 'Help from people with standing.', wenchang: 'Words and study come easily.', tiande: 'Trouble passes you more lightly than most.',
  yuede: 'Effort turns trouble into gain.', lu: 'A livelihood you make yourself.', jinyu: 'Comfort and a gentle manner.',
  jiangxing: 'People follow your lead.', hongluan: 'Attraction and romance run high.', tianxi: 'Celebrations gather around you.',
  huagai: 'A solitary mind drawn to art and depth.', yima: 'Movement, travel and change of place.', taohua: 'Charm that draws people in.',
  yangren: 'A hard, protective will.', jiesha: 'Loss from outside that teaches you to guard.', wangshen: 'A part of you kept out of sight.',
  guchen: 'A need for time alone inside closeness.', guasu: 'Long stretches of your own company.', kongwang: 'What sits here arrives late or light.',
  kuigang: 'A fierce, decisive mind.',
};
const STAR_NAME = { kongwang: ['the Void', '空亡', 'test'] };
const GATE_LIFE = { year: 'the family you came from', month: 'your work', day: 'your home and partnership', hour: 'the people after you' };
const BOND_KEY = { 六合: 'bind', 六冲: 'clash', 刑: 'punish', 六害: 'harm', 半合: 'frame', 三合: 'frame', 自刑: 'selfpunish' };
const BOND_LABEL = { bind: 'Binds with', clash: 'Clashes with', punish: 'Punishes', harm: 'Harms', frame: 'Joins', selfpunish: 'Repeats' };
const BOND_PRI = { 六冲: 5, 刑: 4, 六害: 3, 六合: 2, 半合: 2, 三合: 2, 自刑: 1 };
// the classical spelling order of a branch pair (寅亥合, 卯酉冲), whatever order the gates gave
const CANON = '子丑 寅亥 卯戌 辰酉 巳申 午未 子午 丑未 寅申 卯酉 辰戌 巳亥 子未 丑午 寅巳 卯辰 申亥 酉戌 丑戌 戌未 子卯 子辰 申辰 寅午 午戌 寅戌 亥卯 卯未 亥未 巳酉 酉丑 巳丑'.split(' ');
const canon = (br) => (br.length === 2 && !CANON.includes(br) && CANON.includes(br[1] + br[0]) ? br[1] + br[0] : br);
const GATE_RANK = { month: 4, day: 3, hour: 2, year: 1 };
const FAMILY_NOUN = { wealth: 'what you earn', resource: 'what you think', self: 'your own strength', output: 'what you make', officer: 'what you answer to' };
const SEASON_PHRASE = { 寅: 'early spring', 卯: 'mid-spring', 辰: 'late spring', 巳: 'early summer', 午: 'midsummer', 未: 'late summer', 申: 'early autumn', 酉: 'mid-autumn', 戌: 'late autumn', 亥: 'early winter', 子: 'midwinter', 丑: 'late winter' };
const STRUCT_ID = { 正官: 'zhengguan_ge', 七杀: 'qisha_ge', 正财: 'zhengcai_ge', 偏财: 'piancai_ge', 正印: 'zhengyin_ge', 偏印: 'pianyin_ge', 食神: 'shishen_ge', 伤官: 'shangguan_ge', 建禄: 'jianlu_ge', 月刃: 'yueren_ge' };
const STRUCT_GOD = { 建禄: '比肩', 月刃: '劫财' };
const FAMILY_OF = { 比肩: 'self', 劫财: 'self', 食神: 'output', 伤官: 'output', 偏财: 'wealth', 正财: 'wealth', 七杀: 'officer', 正官: 'officer', 偏印: 'seal', 正印: 'seal', 建禄: 'self', 月刃: 'self' };

/** A unit by station key: the written text, or the draft line standing in for it. */
const unit = (key, draft) => (DEPTH_UNITS[key] ? { key, text: DEPTH_UNITS[key], draft: false } : { key, text: draft, draft: true });

/** Where the reader stands in a gate: lived, now or coming. */
export function gateTense(g, age) {
  if (age < GATE_START[g]) return 'coming';
  return age <= GATE_END[g] ? 'now' : 'lived';
}
const gateOfAge = (a) => (a < 16 ? 'year' : a < 35 ? 'month' : a < 48 ? 'day' : 'hour');
const lc = (s) => String(s || '').toLowerCase();

function context(chart, opts) {
  const who = readerAge(chart, opts.year) || { age: 30, birthYear: null, nowYear: new Date().getFullYear() };
  const luck = (chart?.luckPillars || []).map((l) => {
    const el = lc(l.element);
    return { god: l.stemTenGod?.zh, el, stem: l.stem, branch: l.branch, startAge: l.startAge, endAge: l.endAge ?? l.startAge + 9, startYear: l.startYear, endYear: l.endYear ?? l.startYear + 9, pole: decadePole(el, opts.roles, opts.condition) };
  });
  const cur = luck.find((l) => l.startAge <= who.age && who.age <= l.endAge) || null;
  return { ...who, luck, cur, hourUnknown: !!opts.hourUnknown };
}
const decTense = (l, age) => (l.endAge < age ? 'lived' : l.startAge <= age ? 'now' : 'coming');
const decLabel = (l) => `${an(persona(l.god)).replace(/^a/, 'A')} ${persona(l.god)} decade · ${l.startYear} to ${l.endYear}`;
function strongestBond(bonds) {
  return bonds.map((b) => ({ ...b, g: b.gates.find((x) => GATE_ORDER.includes(x)) }))
    .filter((b) => b.g)
    .sort((a, c) => (BOND_PRI[c.type] - BOND_PRI[a.type]) || (GATE_RANK[c.g] - GATE_RANK[a.g]))[0] || null;
}

// ── drafts (B3) ─────────────────────────────────────────────────────
function draftChapter(p, part, tense) {
  const P = persona(p.god); const gl = GLOSS[p.god]; const ch = CHAPTER[p.gateKey];
  if (part === 'day') return { lived: `Your Home Chapter belonged to the ${P} inside your Day Gate, and its ${gl} shaped the life you shared with a partner.`, now: `Your Home Chapter belongs to the ${P} inside your Day Gate, and its ${gl} shapes the life you share with a partner.`, coming: `Your Home Chapter will belong to the ${P} inside your Day Gate, and its ${gl} will shape the life you share from your mid-thirties.` }[tense];
  if (part === 'at') return { lived: `Your ${ch} ran on the ${P}'s ${gl}, set in plain view at your ${p.gate}.`, now: `Your ${ch} runs on the ${P}'s ${gl}, set in plain view at your ${p.gate}.`, coming: `Your ${ch} will run on the ${P}'s ${gl}, set in plain view at your ${p.gate}.` }[tense];
  return { lived: `Inside it ran the ${P}'s ${gl}.`, now: `Inside it runs the ${P}'s ${gl}.`, coming: `Inside it, the ${P}'s ${gl} will run under the surface.` }[tense];
}
function draftDecade(l, tense) {
  const P = persona(l.god); const gl = GLOSS[l.god]; const good = l.pole === 'helping';
  if (tense === 'now') return `This is ${an(P)} ${P} decade. Its ${gl} ${good ? 'works for you' : 'weighs on you'} through these ten years.`;
  return tense === 'lived' ? `${an(P).replace(/^a/, 'A')} ${P} decade, whose ${gl} ${good ? 'worked for you' : 'weighed on you'}.` : `${an(P).replace(/^a/, 'A')} ${P} decade, whose ${gl} will ${good ? 'work for you' : 'weigh on you'}.`;
}

// ── Life Chapters ───────────────────────────────────────────────────
/** The four chapters with their seats and decades, the decade strip, and the years of the current decade. */
export function resolveChapters(chart, positions, opts = {}) {
  const c = context(chart, opts); const { age, birthYear, nowYear, luck, cur } = c;
  const gateNow = gateOfAge(age);
  const inWindow = luck.filter((l) => l.endAge >= DEC_MIN && l.startAge <= DEC_MAX);
  const chapters = GATE_ORDER.map((g) => {
    const tense = gateTense(g, age);
    const closed = c.hourUnknown && g === 'hour';
    const seats = positions.filter((p) => p.gateKey === g).sort((a, b) => (a.kind === 'stem' ? 0 : 1) - (b.kind === 'stem' ? 0 : 1));
    const parts = closed ? [] : seats.map((p) => {
      const part = g === 'day' ? 'day' : p.kind === 'stem' ? 'at' : 'inside';
      return { seat: p, part, ...unit(`POSITION ${p.id} · chapter.${tense}`, draftChapter(p, part, tense)) };
    });
    const decades = inWindow.filter((l) => gateOfAge(Math.max(l.startAge, 0)) === g).map((l) => {
      const t = decTense(l, age); const id = GOD_ID[l.god];
      return { ...l, persona: persona(l.god), tense: t, label: t === 'now' ? `Now · ${decLabel(l).replace(/^A/, 'a').replace(/^An/, 'an')} · ${l.pole === 'helping' ? 'helping' : 'weighs'}` : `${decLabel(l)} · ${l.pole === 'helping' ? 'helping' : 'weighs'}`,
        ...unit(`GOD ${id} · chapter_decade.${l.pole}.${t}`, draftDecade(l, t)) };
    });
    return {
      key: g, name: `The ${CHAPTER[g]}`, span: GATE_SPAN[g], status: tense, closed,
      fromYear: birthYear == null ? null : birthYear + GATE_START[g],
      seats, parts, decades, domains: [...new Set(seats.flatMap((p) => p.domains || []))],
    };
  });
  const claimDraft = cur ? `You are in your ${CHAPTER[gateNow]}, in ${an(persona(cur.god))} ${persona(cur.god)} decade.` : `You are in your ${CHAPTER[gateNow]}.`;
  const strip = luck.filter((l) => l.startAge <= DEC_MAX).map((l) => ({ startAge: l.startAge, startYear: l.startYear, persona: persona(l.god), pole: l.pole, now: l === cur }));
  // the years of the current decade (Advisor, W4): its character's line plus its strongest bond
  const years = cur ? flowYears(chart, cur.startYear, cur.endYear, { hourUnknown: c.hourUnknown }).map((y) => {
    const el = lc(STEM_EL[y.stem]); const pole = decadePole(el, opts.roles, opts.condition); const id = GOD_ID[y.god];
    const b = strongestBond(y.bonds); const bk = b ? `${BOND_KEY[b.type]}.${b.g}` : null;
    return {
      year: y.year, stem: y.stem, branch: y.branch, persona: persona(y.god), pole,
      status: y.year < nowYear ? 'lived' : y.year === nowYear ? 'now' : 'coming',
      ...unit(`GOD ${id} · year_line.${pole}`, `${an(persona(y.god)).replace(/^a/, 'A')} ${persona(y.god)} year, and it ${pole === 'helping' ? 'helps you' : 'weighs on you'} through its ${GLOSS[y.god]}.`),
      bond: b ? { label: b.type === '自刑' ? `Repeats the ${b.branches[0]} of your ${GATES[b.g]} · 自刑` : `${BOND_LABEL[BOND_KEY[b.type]]} your ${GATES[b.g]} · ${canon(b.branches)}`, ...unit(`TEMPLATED tpl_depth · year_bond.${bk}`, `This year ${BOND_LABEL[BOND_KEY[b.type]].toLowerCase()} your ${GATES[b.g]}, and it stirs ${GATE_LIFE[b.g]}.`) } : null,
    };
  }) : [];
  return { age, birthYear, nowYear, gateNow, claim: { key: 'TEMPLATED tpl_depth · chapters.claim', text: claimDraft, draft: false }, chapters, strip, current: cur ? { ...cur, persona: persona(cur.god) } : null, years };
}

// ── Stars ───────────────────────────────────────────────────────────
function starMeta(id, natalRow) {
  if (STAR_NAME[id]) { const [en, zh, kind] = STAR_NAME[id]; return { en, zh, kind }; }
  return { en: natalRow.en, zh: natalRow.zh, kind: natalRow.kind };
}
const tensePhrase = (g, tense, birthYear) => (tense === 'coming' ? ` from ${birthYear == null ? 'later' : birthYear + GATE_START[g]}` : '');
/** The stars that help, the stars that test, and the stars arriving with the decades (Seeker) and years (Advisor). */
export function resolveStars(chart, opts = {}) {
  const c = context(chart, opts); const { age, birthYear, nowYear, luck, cur } = c;
  const natal = starsOf(chart, { hourUnknown: c.hourUnknown });
  const byId = new Map();
  for (const s of natal) { if (!byId.has(s.id)) byId.set(s.id, { id: s.id, ...starMeta(s.id, s), gates: [] }); byId.get(s.id).gates.push(s.gate); }
  const card = (s) => ({
    ...s,
    where: s.gates.map((g) => `${GATES[g]} · ${CHAPTER[g]}${gateTense(g, age) === 'now' ? ' · now' : ''}${gateTense(g, age) === 'coming' ? ` · from ${birthYear == null ? '' : birthYear + GATE_START[g]}` : ''}`).join(' · '),
    line: unit(`STAR ${s.id} · line`, STAR_GLOSS[s.id]),
    readings: s.gates.map((g) => { const t = gateTense(g, age); return { gate: g, tense: t, ...unit(`STAR ${s.id} · reading.${g}.${t}`, `The ${s.en.replace(/^the /, '')} sits in your ${GATES[g]}, in your ${CHAPTER[g]}${tensePhrase(g, t, birthYear)}. ${STAR_GLOSS[s.id]}`) }; }),
  });
  const cards = [...byId.values()].map(card);
  const help = cards.filter((s) => s.kind === 'help'); const test = cards.filter((s) => s.kind !== 'help');
  // arriving: the current decade and the next (Seeker), each year left in the current decade (Advisor)
  const next = cur ? luck[luck.indexOf(cur) + 1] : luck.find((l) => l.startAge > age);
  const arriving = [];
  for (const l of [cur, next].filter(Boolean)) {
    const t = l === cur ? 'now' : 'coming';
    for (const s of arrivingStars(chart, l).filter((x) => !x.natal)) {
      const m = starMeta(s.id, s);
      arriving.push({ id: s.id, ...m, decade: { ...l, persona: persona(l.god) }, where: `Arrives with your ${persona(l.god)} decade, ${l.startYear} to ${l.endYear}`, line: unit(`STAR ${s.id} · line.arriving`, `The ${m.en.replace(/^the /, '')} arrives with this decade.`),
        reading: unit(`STAR ${s.id} · arriving.decade.${t}`, `The ${m.en.replace(/^the /, '')} arrives with this decade. ${STAR_GLOSS[s.id]}`) });
    }
  }
  const yearStars = [];
  if (cur) for (let y = nowYear; y <= cur.endYear; y++) {
    const HS = '甲乙丙丁戊己庚辛壬癸'; const EB = '子丑寅卯辰巳午未申酉戌亥';
    const p = { stem: HS[(((y - 4) % 10) + 10) % 10], branch: EB[(((y - 4) % 12) + 12) % 12] };
    for (const s of arrivingStars(chart, p).filter((x) => !x.natal)) {
      const m = starMeta(s.id, s);
      yearStars.push({ id: s.id, year: y, ...m, reading: unit(`STAR ${s.id} · arriving.year`, `The ${m.en.replace(/^the /, '')} arrives ${y === nowYear ? 'this year' : 'that year'}. ${STAR_GLOSS[s.id]}`) });
    }
  }
  const helper = arriving.some((s) => s.kind === 'help');
  const n = cards.length;
  const claim = `${NUMW[n] || n} old ${pl(n, 'star sits', 'stars sit')} in your chart${helper ? ', and a helper is arriving' : ''}.`;
  return { age, claim: { key: 'TEMPLATED tpl_depth · stars.claim', text: claim, draft: false }, help, test, arriving, yearStars, count: n };
}

// ── Energy Blueprint ────────────────────────────────────────────────
const NUM_LOWER = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
const shareWords = (x) => (x >= 0.72 ? 'three quarters' : x >= 0.6 ? 'two thirds' : x >= 0.5 ? 'more than half' : 'nearly half');
const BREAKER = { 比劫: 'equals beside it', 官杀混杂: 'the Magistrate and the General mixing', 伤官: 'the Virtuoso', 七杀: 'the General', 偏印: 'the Alchemist', 正官: 'the Magistrate', 财: 'money pressing on it', '食神 starved': 'thinking that starves making', 'uncontrolled pressure': 'pressure nothing holds in check', 'nothing to use the strength on': 'strength with no outlet' };
// what protects a structure, then how the decades bring it ({when}: now, next, later), have brought it, or never do
const RESCUE = {
  officer: ['Outside pressure protects it, a boss or a rule or a deadline', 'and you meet that pressure in your decades {when}'],
  output: ['What you make protects it, work you finish and show', 'and you find the room to make it in your decades {when}'],
  seal: ['Support protects it, a teacher or a backer or a home base', 'and you find that support in your decades {when}'],
  wealth: ['Money protects it, a steady income or a shared venture', 'and you meet it in your decades {when}'],
};
const rescueText = (fam, when) => `${RESCUE[fam][0]}, ${when === null ? 'and no decade of yours brings it' : when === 'already lived' ? 'and the decades that brought it are behind you' : RESCUE[fam][1].replace('{when}', when)}.`;
/** The four parts: the structure, what the chart runs on and lacks (with the season), seen and unseen, pairings and clashes. */
export function resolveBlueprint(chart, positions, opts = {}) {
  const c = context(chart, opts); const { age, luck, cur } = c; const hu = c.hourUnknown;
  const dm = chart.pillars.day.stem; const dmEl = STEM_EL[dm];
  // 1 · the structure
  const s = structureOf(chart, { strength: chart.dayMaster?.strength, hourUnknown: hu, luck: chart.luckPillars });
  const sGod = STRUCT_GOD[s.key] || s.key; const P = persona(sGod);
  const reading = unit(`STRUCTURE ${STRUCT_ID[s.key]} · reading`, `Your chart is built around the ${P}, and its ${GLOSS[sGod]} organises the rest of your reading.`);
  const w = s.why; const holder = persona(w.holder);
  const ruleText = w.how === 'lu' ? 'Your strongest seat holds your own element at full strength, and you answer first to what you make of yourself.'
    : w.how === 'ren' ? 'Your strongest seat holds your own element at its sharpest, and you answer first to your own will.'
      : w.how === 'none' ? `Nothing hidden in your strongest seat shows on your stems. The ${P} who holds it is the organising force of your life, and you answer to it first.`
        : w.how === 'main' ? `The ${P} who holds your strongest seat also shows on ${NUM_LOWER[w.shown] || w.shown} of your stems, and you answer to it before anything else in your chart.`
          : `The ${w.element} hidden in your strongest seat shows on ${NUM_LOWER[w.shown] || w.shown} of your stems. That makes the ${P} the organising force of your life, and you answer to it more than to the ${holder} who holds the seat.`;
  const statusLabel = { formed: 'Formed.', strained: 'Formed, under strain.', broken: 'Broken.' }[s.status];
  const breakers = s.breaker === '比劫' ? [...new Set(positions.filter((p) => p.god === '比肩' || p.god === '劫财').map((p) => persona(p.god)))] : [];
  const fam = FAMILY_OF[s.key];
  const statusText = s.status === 'formed' ? 'Nothing in your chart pulls against it, and you can lean on it without a second thought.'
    : fam === 'wealth' && s.breaker === '比劫' && breakers.length ? `The ${breakers.join(' and the ')} ${pl(breakers.length, 'stands', 'stand')} close to your ${P}${positions.filter((p) => p.god === sGod).length > 1 ? 's' : ''}, and you keep losing a share of what you earn to equals.`
      : s.status === 'broken' ? `It is broken by ${BREAKER[s.breaker] || s.breaker}, and you carry the strain of it until something in your decades repairs it.`
        : `It holds, and ${BREAKER[s.breaker] || s.breaker} keeps pulling at it, and you feel that pull most in the years that feed it.`;
  const statusKey = `STRUCTURE ${fam} · status.${s.status}.${s.breaker === '比劫' ? 'peers' : (s.breaker || 'none')}`;
  const rel = (l) => (l === cur ? 'now' : cur && l.startYear === (luck[luck.indexOf(cur) + 1] || {}).startYear ? 'next' : l.endAge < age ? 'already lived' : 'later');
  const rescueDecs = s.rescueDecades.map((r) => luck.find((l) => l.startYear === r.startYear)).filter(Boolean);
  const when = [...new Set(rescueDecs.map(rel))].join(' and ');
  const rescue = s.rescue ? {
    label: rescueDecs.length ? `what protects it · ${rescueDecs.map((l) => `${persona(l.god)} decade ${l.startYear} to ${l.endYear}`).join(' · ')}` : 'what protects it',
    key: `TEMPLATED tpl_depth · rescue.${s.rescue}`, draft: !(s.rescue === 'officer' && rescueDecs.length && when !== 'already lived'),
    text: rescueText(s.rescue, rescueDecs.length ? when : null),
  } : null;
  // 2 · strongest, missing, the season
  const els = Object.entries(chart.elements || {}).map(([e, v]) => [e, v.score || 0]).sort((a, b) => b[1] - a[1]);
  const [e1, e2] = els; const noun = (e) => FAMILY_NOUN[relationOf(e, dmEl)] || 'your own strength';
  const strongest = e1[1] >= 0.5
    ? { key: 'TEMPLATED tpl_depth · strongest.one', draft: true, text: `${e1[0]} alone carries ${shareWords(e1[1])} of your chart, and you live mostly through ${noun(e1[0])}.` }
    : { key: 'TEMPLATED tpl_depth · strongest.two', draft: false, text: `${e1[0]} and ${e2[0]} carry ${shareWords(e1[1] + e2[1])} of your chart, and you live mostly through ${noun(e1[0])} and ${noun(e2[0])}.` };
  const profile = godProfile(chart, { hourUnknown: hu });
  const season = seasonOf(chart, { hourUnknown: hu });
  const seasonGods = new Set((season?.asks || []).map((a) => a.god));
  const missing = profile.filter((g) => g.state === 'absent').map((g) => {
    const decs = luck.filter((l) => l.god === g.god && l.startAge <= DEC_MAX);
    const nowOrNext = decs.find((l) => l.endAge >= age);
    const tag = [`no ${persona(g.god)}`, seasonGods.has(g.god) ? 'your season asks for it too' : null,
      nowOrNext ? `it arrives with your decade ${nowOrNext.startYear} to ${nowOrNext.endYear}` : decs.length ? `your ${persona(g.god)} decade ${decs[decs.length - 1].startYear} to ${decs[decs.length - 1].endYear} is lived` : 'no decade of yours brings it'].filter(Boolean).join(' · ');
    return { god: g.god, label: tag, ...unit(`GOD ${GOD_ID[g.god]} · missing`, `No ${persona(g.god)} sits in your chart, and its ${GLOSS[g.god]} reaches you only from outside.`) };
  });
  const seasonReading = season ? unit(`SEASON ${PINYIN[dm]}.${PINYIN[season.month]} · reading`, `You were born in ${SEASON_PHRASE[season.month]}, and your season asks for ${season.asks.filter((a) => a.rank === 'primary').map((a) => STEM_EL[a.stem]).filter((x, i, arr) => arr.indexOf(x) === i).join(' first and ')}${season.asks.filter((a) => a.rank === 'primary').length > 1 ? ' second' : ''}.`) : null;
  const STATE_WORD = { shown: 'on show', rooted: 'inside a branch, not on show', hidden: 'hidden deep' };
  const needs = (season?.asks || []).filter((a) => a.state !== 'absent').map((a, i) => ({
    label: `${a.rank === 'primary' ? (i === 0 ? 'first need' : 'second need') : 'support'} · ${a.stem}, the ${persona(a.god)} · ${STATE_WORD[a.state]}`,
    ...unit(`GOD ${GOD_ID[a.god]} · season_need.${a.state}`, `The ${persona(a.god)} your season asks for ${{ shown: 'shows plainly', rooted: 'sits inside a branch', hidden: 'hides deep' }[a.state]} in your chart.`),
  }));
  const seasonCell = season ? { name: `${season.monthName}${dm}`, asks: season.asks.map((a) => a.stem).join(''), absentNeeds: season.asks.filter((a) => a.state === 'absent').map((a) => persona(a.god)) } : null;
  // 3 · seen and unseen
  const plainGods = []; const insideGods = [];
  for (const p of positions) (p.kind === 'stem' ? plainGods : insideGods).push(p.god);
  const tally = (arr) => [...new Set(arr)].map((g) => ({ god: g, n: arr.filter((x) => x === g).length }));
  const plain = tally(plainGods).map(({ god, n }) => ({ label: `the ${persona(god)}${n > 1 ? `, ${n === 2 ? 'twice' : `${NUM_LOWER[n]} times`}` : ''}`, ...unit(`GOD ${GOD_ID[god]} · seen.plain`, `You come across with the ${persona(god)}'s ${GLOSS[god]}.`) }));
  const inside = tally(insideGods).map(({ god }) => ({ label: `the ${persona(god)}`, ...unit(`GOD ${GOD_ID[god]} · seen.inside`, `Inside, you carry the ${persona(god)}'s ${GLOSS[god]}.`) }));
  const seenClose = unit('TEMPLATED tpl_depth · seen.close', 'Only the people you live with meet the second list.');
  // 4 · pairings and clashes: the god pairings the seats carry (one per seat, TG_PATTERNS order), then the branch bonds
  const present = new Set(positions.map((p) => p.god)); const taken = new Set(); const pairs = [];
  for (const tp of TG_PATTERNS) {
    const [a, b] = tp.gods; if (!a.some((g) => present.has(g)) || !b.some((g) => present.has(g))) continue;
    const carriers = positions.filter((p) => !taken.has(p.id) && (a.includes(p.god) || b.includes(p.god)));
    if (!carriers.length) continue; carriers.forEach((p) => taken.add(p.id));
    pairs.push({ label: `${tp.en} · ${tp.zh}`, ...unit(`TG_PATTERN ${tp.key} · blueprint_line`, `${tp.en} runs through your chart, and you feel it in more than one part of your life.`) });
  }
  const bonds = branchBonds(chart, { hourUnknown: hu }).map((b) => {
    const gs = b.gates.filter((g) => GATE_ORDER.includes(g)).sort((x, y) => GATE_ORDER.indexOf(x) - GATE_ORDER.indexOf(y));
    const k = BOND_KEY[b.type];
    const label = b.type === '自刑' ? `${GATES[gs[0]].replace(' Gate', '')} and ${GATES[gs[gs.length - 1]].replace(' Gate', '')} share ${b.branches[0]} · 自刑` : `${GATES[gs[gs.length - 1]].replace(' Gate', '')} ${BOND_LABEL[k].toLowerCase()} ${GATES[gs[0]].replace(' Gate', '')} · ${canon(b.branches)}${b.type === '六合' ? '合' : b.type === '六冲' ? '冲' : b.type === '六害' ? '害' : b.type === '刑' || b.type === '自刑' ? '刑' : ''}`;
    return { type: b.type, label: label.charAt(0).toUpperCase() + label.slice(1), ...unit(`TEMPLATED tpl_depth · bond.${k}.${gs.join('_')}`, `Your ${GATES[gs[gs.length - 1]]} ${BOND_LABEL[k].toLowerCase()} your ${GATES[gs[0]]}, and ${GATE_LIFE[gs[gs.length - 1]]} and ${GATE_LIFE[gs[0]]} move together.`) };
  });
  const hard = bonds.some((b) => ['六冲', '刑', '六害', '自刑'].includes(b.type));
  const noneHard = hard ? null : unit('TEMPLATED tpl_depth · bond.none_hard', 'No clashes, punishments or harms sit between your gates, and you argue with yourself less than most people do.');
  const [zh, en] = STRUCTURE_NAME[s.key] || [s.key, s.key];
  return {
    title: `${an(en).replace(/^a/, 'A')} ${en} · ${zh}`, zh, en,
    structure: { reading, rule: { key: `TEMPLATED tpl_depth · structure_rule.${w.how}`, text: ruleText, draft: w.how !== 'middle' }, statusLabel, status: { key: statusKey, text: statusText, draft: !(fam === 'wealth' && s.breaker === '比劫') }, rescue },
    runs: { strongest, missing, season: seasonReading, needs, seasonCell },
    seen: { plain, inside, close: seenClose },
    pairs: { pairs, bonds, noneHard },
  };
}

// ── Domains, By position (B4 A) ─────────────────────────────────────
/** A domain page from resolveDomains, re-cut By position: How you are, then each ruling seat in gate order with the gap row, plus the Advisor tabs. */
export function resolveDomainView(page, chart, content, opts = {}) {
  const c = context(chart, opts); const { age, birthYear, nowYear, luck, cur } = c; const d = page.domain;
  const S = content?.seats || {}; const D = content?.decades || {};
  const gateNow = gateOfAge(age);
  const blocks = [];
  for (const p of page.seats) {
    const t = gateTense(p.gateKey, age); const u = S[p.id]?.domains?.[d] || {};
    const useAhead = t === 'coming' && u.ahead;
    const text = useAhead ? u.ahead : u.lived || u.ahead || null;
    const meta = [CHAPTER[p.gateKey], t === 'coming' ? `from ${GATE_START[p.gateKey]}${birthYear == null ? '' : ` · ${birthYear + GATE_START[p.gateKey]}`}` : GATE_SPAN[p.gateKey], p.kind === 'stem' ? 'in plain view' : 'inside', t === 'now' ? 'now' : t].join(' · ');
    blocks.push({ kind: 'seat', gate: p.gateKey, seat: p, name: p.term, meta, text, src: `POSITION ${p.id} · domain_climb.${d}.${useAhead ? 'ahead' : 'lived'}` });
  }
  // the gap row: the reader's own gate holds no seat for this domain
  if (page.seats.length && gateNow !== 'year' && !page.seats.some((p) => p.gateKey === gateNow) && !(gateNow === 'hour' && c.hourUnknown)) {
    const g = content?.gaps?.[d]?.[gateNow];
    if (g) blocks.push({ kind: 'gap', gate: gateNow, label: `${CHAPTER[gateNow]} · ${GATE_START[gateNow]} to now · no ${d} seat.`, text: g, src: `TEMPLATED tpl_domains · domain_gaps.${d}.${gateNow}` });
  }
  blocks.sort((a, b) => GATE_ORDER.indexOf(a.gate) - GATE_ORDER.indexOf(b.gate) || (a.kind === 'gap' ? -1 : 0));
  const per = GATE_ORDER.map((g) => [g, page.seats.filter((p) => p.gateKey === g).length]).filter(([, n]) => n);
  const n = page.seats.length;
  const intro = n ? `${NUMW[n]} ${pl(n, 'seat rules', 'seats rule')} ${d} in your chart. ${per.map(([g, k], i) => `${i === 0 ? NUMW[k] : NUMW[k].toLowerCase()} ${i === 0 ? pl(k, 'sits', 'sit') + ' ' : ''}in your ${CHAPTER[g]}`).join(', ').replace(/, ([^,]*)$/, ' and $1')}.` : `No seat rules ${d} in your chart, and your decades set its course.`;
  // the Advisor tabs: By decade (the decade lines already written) and By year (drafts)
  const byDecade = luck.filter((l) => RULING[l.god]?.includes(d) && l.endAge >= DEC_MIN && l.startAge <= DEC_MAX).map((l) => {
    const t = l.endAge < age ? 'lived' : 'ahead';
    return { label: `${decLabel(l)}${l === cur ? ' · now' : ''}`, text: D[l.god]?.[d]?.[l.pole]?.[t] || null, src: `GOD ${GOD_ID[l.god]} · decade_lines.${d}.${l.pole}.${t}` };
  }).filter((x) => x.text);
  const byYear = cur ? flowYears(chart, Math.max(nowYear, cur.startYear), cur.endYear, { hourUnknown: c.hourUnknown }).filter((y) => RULING[y.god]?.includes(d)).map((y) => ({
    label: `${y.year} · ${an(persona(y.god))} ${persona(y.god)} year`, ...unit(`GOD ${GOD_ID[y.god]} · year_domain.${d}`, `${an(persona(y.god)).replace(/^a/, 'A')} ${persona(y.god)} year touches your ${d.toLowerCase()}, and its ${GLOSS[y.god]} runs through it.`),
  })) : [];
  return { domain: d, headline: page.headline, intro, how: page.how, pattern: page.pattern, blocks, byDecade, byYear, lit: page.seats.map((p) => p.id), empty: page.empty, notes: page.notes };
}
