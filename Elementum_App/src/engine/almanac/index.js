// ===================================================================
// ELEMENTUM · almanac — the event signature engine (Your Almanac, EVT-1)
// ===================================================================
// Owner rulings 2026-10-20/21 (round 1 N1–F1, round 2 E1–E7, round 3
// G1–G9, all A except D1 B; record ComparativeAnalysis/Handoffs/
// 2026-10-19-event-signature/03_RULINGS.md). Pure functions over an engine
// chart: what each day, solar month and year carries, read energy first.
//   periodOf(kind, date)        the day, the 节 month or the 立春 year that
//                               holds a local date, with its pillar
//   almanacContext(chart, o)    the reader's side: roles → grow (+1) or
//                               release (−1) per element, functions, gates
//   readPeriod(ctx, period, o)  energies, mix, lift, landings, star days,
//                               markers, the ruled lead, loudness, rarity,
//                               the eight domain weights
//   leadsFor(ctx, from, n)      n days in a row with the freshness rule
//   pushSchedule(ctx, from, n)  the codes the phone posts (P1 A, P2 A)
// The landings reuse branchBonds({extra}); star days reuse arrivingStars and
// voidOf; the year content is read from Life Chapters by the views.
// ===================================================================

import { HS, EB, STEM_ELEM, BRANCH_ELEM, HIDDEN_STEMS, getTenGod } from '../calculator.js';
import { dayPillar } from '../temporal.js';
import { buildEnergyChart } from '../buildEnergyChart.js';
import { branchBonds } from '../depth/chartDepth.js';
import { arrivingStars } from '../depth/stars.js';
import { termInstant, TERM_NAMES } from './solarTerms.js';

export const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
export const DOMAINS = ['Career', 'Wealth', 'Love', 'Family', 'Social', 'Health', 'Mind', 'Growth'];
export const GATE_KEYS = ['year', 'month', 'day', 'hour'];
// the gate's part of life, and the domain a landing there weighs (G7 A: the Hour Gate is Family)
export const GATE_LIFE = { year: 'your first home', month: 'your work', day: 'your home and partner', hour: 'the people after you' };
export const GATE_DOMAIN = { year: 'Family', month: 'Career', day: 'Love', hour: 'Family' };
// the god's three ruling domains (REA_02 §5e) — mirrors domainsResolve RULING
export const RULING = { 比肩: ['Family', 'Growth', 'Social'], 劫财: ['Wealth', 'Social', 'Career'], 食神: ['Health', 'Family', 'Career'], 伤官: ['Mind', 'Career', 'Social'], 偏财: ['Wealth', 'Family', 'Social'], 正财: ['Wealth', 'Family', 'Career'], 七杀: ['Career', 'Health', 'Growth'], 正官: ['Family', 'Social', 'Career'], 偏印: ['Mind', 'Growth', 'Career'], 正印: ['Family', 'Mind', 'Health'] };
export const GOD_ID = { 比肩: 'bijian', 劫财: 'jiecai', 食神: 'shishen', 伤官: 'shangguan', 偏财: 'piancai', 正财: 'zhengcai', 七杀: 'qisha', 正官: 'zhengguan', 偏印: 'pianyin', 正印: 'zhengyin' };
const FN_OF_FAMILY = { self: 'Body', seal: 'Mind', output: 'Expression', wealth: 'Action', officer: 'Order' };
const YANG_OF = { Wood: '甲', Fire: '丙', Earth: '戊', Metal: '庚', Water: '壬' };

// ── the selection rule (round 1, S1 A, S2 A) ──────────────────────
const BOND_KIND = { 六合: 'bind', 六冲: 'clash', 刑: 'punish', 六害: 'harm', 半合: 'frame', 三合: 'frame', 自刑: 'repeat' };
// [base score, domain weight, sign]: hard bonds test (−), binds and frames open (+)
export const KIND = { clash: [60, 3, -1], punish: [55, 3, -1], harm: [35, 2, -1], bind: [40, 2, 1], frame: [30, 1, 1], repeat: [20, 1, -1] };
// day star signs (E5 A: folded into domains, no names on the page)
export const STAR_DAY = { tianyi: ['Social', 45], kongwang: [null, 40], taohua: ['Love', 32], yima: ['Growth', 32], tiande: ['Health', 30], yuede: ['Health', 30], wenchang: ['Mind', 25], hongluan: ['Love', 25] };
const MARK_SCORE = { year: 100, month: 80, birthday: 100, gate: 100, decade: 100 };
export const RARITY = {
  day: { clash: 'every 12 days', punish: 'every 12 days', harm: 'every 12 days', bind: 'every 12 days', frame: 'every 12 days', repeat: 'every 12 days', star: 'every 12 days', void: '2 days in 12', return: '6 days a year', turned: '6 days a year', mark: 'once a year', quiet: '' },
  month: { clash: 'once a year', punish: 'once a year', harm: 'once a year', bind: 'once a year', frame: 'once a year', repeat: 'once a year', void: 'once a year', quiet: '' },
  year: { clash: 'once in 12 years', punish: 'once in 12 years', harm: 'once in 12 years', bind: 'once in 12 years', frame: 'once in 12 years', repeat: 'once in 12 years', void: 'once in 12 years', quiet: '' },
};
const STEM_CLASH = { 甲: '庚', 乙: '辛', 丙: '壬', 丁: '癸', 庚: '甲', 辛: '乙', 壬: '丙', 癸: '丁' };
const BRANCH_CLASH = { 子: '午', 午: '子', 丑: '未', 未: '丑', 寅: '申', 申: '寅', 卯: '酉', 酉: '卯', 辰: '戌', 戌: '辰', 巳: '亥', 亥: '巳' };

// ── dates ─────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, '0');
/** A local calendar date as YYYY-MM-DD. */
export const isoDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const localDay = (ms) => isoDay(new Date(ms));
const atNoon = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d, 12); };
const addDays = (iso, n) => { const t = atNoon(iso); t.setDate(t.getDate() + n); return isoDay(t); };

/** The 节 that opens each solar month around a year: [{ idx, name, day (local), at (ms) }], in order. */
function termsAround(year) {
  const out = [];
  for (const y of [year - 1, year, year + 1]) for (let i = 0; i < 12; i++) { const at = termInstant(y, i); if (at != null) out.push({ idx: i, name: TERM_NAMES[i], at, day: localDay(at), year: y }); }
  return out.sort((a, b) => a.at - b.at);
}
const stemOfYear = (y) => HS[(((y - 4) % 10) + 10) % 10];
const branchOfYear = (y) => EB[(((y - 4) % 12) + 12) % 12];

/**
 * The period holding a local date. A term's whole local day belongs to the
 * month it opens (the day the month turns), and 立春 opens the year.
 * @returns { kind, start, end, stem, branch, term?, baziYear? }
 */
export function periodOf(kind, date) {
  const day = typeof date === 'string' ? date : isoDay(date);
  if (kind === 'day') { const p = dayPillar(atNoon(day)); return { kind, start: day, end: day, stem: p.stem, branch: p.branch }; }
  const y = Number(day.slice(0, 4)); const terms = termsAround(y);
  if (kind === 'month') {
    let k = 0; for (let i = 0; i < terms.length; i++) if (terms[i].day <= day) k = i;
    const t = terms[k]; const next = terms[k + 1];
    const lichun = terms.filter((x) => x.idx === 1 && x.day <= day).pop();
    const by = lichun ? lichun.year : y - 1; const ysi = HS.indexOf(stemOfYear(by));
    const offset = (t.idx + 11) % 12; // from the 寅 month
    const stem = HS[(((ysi % 5) * 2 + 2) % 10 + offset) % 10]; const branch = EB[(t.idx + 1) % 12];
    return { kind, start: t.day, end: next ? addDays(next.day, -1) : null, stem, branch, term: t.name, baziYear: by };
  }
  const lc = terms.filter((x) => x.idx === 1);
  const cur = lc.filter((x) => x.day <= day).pop(); const nxt = lc.find((x) => x.day > day);
  return { kind: 'year', start: cur.day, end: addDays(nxt.day, -1), stem: stemOfYear(cur.year), branch: branchOfYear(cur.year), baziYear: cur.year };
}

// ── the reader's side ─────────────────────────────────────────────
/**
 * @param chart  the engine chart
 * @param opts   { hourUnknown, birthDate 'YYYY-MM-DD', today }
 */
export function almanacContext(chart, opts = {}) {
  const dm = chart.pillars.day.stem; const ec = buildEnergyChart(chart);
  const condition = { concentrated: 'Overfueled', balanced: 'Balanced', open: 'Underfueled' }[ec.band] || 'Balanced';
  const sign = {}; const presence = {}; const fn = {};
  for (const e of ec.energies) {
    const El = e.el[0].toUpperCase() + e.el.slice(1); presence[El] = e.presence; const r = e.roles || [];
    // grow (+1) or release (−1), as the Energy Map's arrows
    let s = 0;
    if (r.includes('core')) s = r.includes('friction') ? -1 : r.includes('catalyst') ? 1 : condition === 'Overfueled' ? -1 : condition === 'Underfueled' ? 1 : 0;
    else if (r.includes('friction')) s = -1; else if (r.includes('catalyst')) s = 1; else if (r.includes('ally')) s = 0.5;
    sign[El] = s;
    fn[El] = FN_OF_FAMILY[getTenGod(dm, YANG_OF[El])?.family] || 'Body';
  }
  const lp = chart.luckPillars?.[0]; const birthYear = lp ? lp.startYear - lp.startAge : null;
  const birthDate = opts.birthDate || chart.meta?.birthDate || null;
  const gates = Object.fromEntries(GATE_KEYS.filter((g) => !(opts.hourUnknown && g === 'hour')).map((g) => [g, { branch: chart.pillars[g].branch, el: BRANCH_ELEM[chart.pillars[g].branch] }]));
  return { chart, dm, condition, sign, presence, fn, gates, hourUnknown: !!opts.hourUnknown, birthYear, birthDate, luck: chart.luckPillars || [] };
}
const ageOn = (ctx, day) => {
  if (!ctx.birthDate) return ctx.birthYear == null ? null : Number(day.slice(0, 4)) - ctx.birthYear;
  const by = Number(ctx.birthDate.slice(0, 4)); const md = ctx.birthDate.slice(5);
  return Number(day.slice(0, 4)) - by - (day.slice(5) < md ? 1 : 0);
};
export const liveGateAt = (age) => (age == null ? 'month' : age < 16 ? 'year' : age < 35 ? 'month' : age < 48 ? 'day' : 'hour');

// ── what a period carries ─────────────────────────────────────────
/** stem half, branch half split by its hidden stems' weights */
export function energyMix(stem, branch) {
  const m = Object.fromEntries(ELEMENTS.map((e) => [e, 0])); m[STEM_ELEM[stem]] += 0.5;
  const hs = HIDDEN_STEMS[branch] || []; const tot = hs.reduce((a, h) => a + h.w, 0) || 1;
  for (const h of hs) m[STEM_ELEM[h.s]] += (0.5 * h.w) / tot;
  return m;
}
/** −1 (weighs) … +1 (lifts): the mix weighed by the reader's grow and release energies; step 0–4 for the meter */
export function liftOf(ctx, mix) {
  const v = Math.round(ELEMENTS.reduce((a, e) => a + (ctx.sign[e] || 0) * mix[e], 0) * 100) / 100;
  return { value: v, step: Math.max(0, Math.min(4, Math.round((v + 1) * 2))) };
}
// the ground's relation to the period's energy (E1 A)
const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTRL = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };
export function groundRelation(stemEl, groundEl) {
  if (stemEl === groundEl) return 'matches';
  if (GEN[groundEl] === stemEl) return 'feeds';
  if (GEN[stemEl] === groundEl) return 'drains';
  if (CTRL[stemEl] === groundEl) return 'presses';
  return 'resists';
}
/** The state an energy is in for this chart (the energy line's key, E6 A). */
export function energyState(ctx, el) {
  const s = ctx.sign[el] || 0; const p = ctx.presence[el] ?? 0;
  if (el === STEM_ELEM[ctx.dm]) return s > 0 ? 'core_under' : s < 0 ? 'core_over' : 'core_even';
  if (s > 0) return p <= 10 ? 'need' : 'grow';
  if (s < 0) return 'heavy';
  return 'even';
}

function markersOn(ctx, day) {
  const out = []; const y = Number(day.slice(0, 4));
  for (const t of termsAround(y)) if (t.day === day) out.push({ kind: 'mark', mark: t.idx === 1 ? 'year' : 'month', term: t.name });
  if (ctx.birthDate && ctx.birthDate.slice(5) === day.slice(5)) {
    const age = ageOn(ctx, day);
    if ([16, 35, 48].includes(age)) out.push({ kind: 'mark', mark: 'gate', age });
    else out.push({ kind: 'mark', mark: 'birthday', age });
    if (ctx.luck.some((l) => l.startYear === y)) out.push({ kind: 'mark', mark: 'decade', age });
  }
  return out;
}

/**
 * Read one period for this reader.
 * @param period  from periodOf
 * @param opts    { recent: [lead keys of the last six days] (days only), asOf: the reader's date for the age (months, years) }
 */
export function readPeriod(ctx, period, opts = {}) {
  const { stem, branch, kind } = period; const day = period.start;
  const el = STEM_ELEM[stem]; const gel = BRANCH_ELEM[branch];
  const god = getTenGod(ctx.dm, stem)?.zh; const mix = energyMix(stem, branch); const lift = liftOf(ctx, mix);
  const age = ageOn(ctx, opts.asOf && kind !== 'day' ? opts.asOf : day); const live = liveGateAt(age);
  const gw = (g) => (g === live ? 1.3 : g === 'day' ? 1.2 : 1);
  // landings
  const bonds = branchBonds(ctx.chart, { hourUnknown: ctx.hourUnknown, extra: { label: 'now', branch } })
    .map((b) => ({ kind: BOND_KIND[b.type], type: b.type, gate: b.gates.find((g) => g !== 'now'), branches: b.branches }))
    .filter((b) => b.gate && GATE_KEYS.includes(b.gate));
  // the echo: a day hits, hard, the gate the month already hits hard
  let monthHard = new Set();
  if (kind === 'day') { const mp = periodOf('month', day); monthHard = new Set(branchBonds(ctx.chart, { hourUnknown: ctx.hourUnknown, extra: { label: 'now', branch: mp.branch } }).filter((b) => KIND[BOND_KIND[b.type]][2] < 0).flatMap((b) => b.gates)); }
  const sigs = bonds.map((b) => { const echo = kind === 'day' && KIND[b.kind][2] < 0 && monthHard.has(b.gate); return { key: `${b.kind}.${b.gate}`, ...b, echo, score: KIND[b.kind][0] * gw(b.gate) + (echo ? 15 : 0) }; });
  const stars = kind === 'year' ? [] : arrivingStars(ctx.chart, { stem, branch }).map((s) => s.id);
  if (kind === 'day') for (const id of stars) if (STAR_DAY[id]) sigs.push(id === 'kongwang' ? { key: 'void', kind: 'void', score: STAR_DAY[id][1] } : { key: `star.${id}`, kind: 'star', star: id, domain: STAR_DAY[id][0], score: STAR_DAY[id][1] });
  if (kind === 'day') {
    const nd = ctx.chart.pillars.day;
    if (stem === nd.stem && branch === nd.branch) sigs.push({ key: 'return', kind: 'return', score: 90 });
    if (STEM_CLASH[stem] === nd.stem && BRANCH_CLASH[branch] === nd.branch) sigs.push({ key: 'turned', kind: 'turned', score: 92 });
    for (const m of markersOn(ctx, day)) sigs.push({ key: `mark.${m.mark}`, ...m, score: MARK_SCORE[m.mark] });
  }
  // freshness (S2 A): a signature that topped any of the last six days scores half; markers always lead.
  // "Topped" is read before freshness, so a day's lead never depends on where a list of days starts.
  const rawTop = sigs.length ? sigs.reduce((a, b) => (b.score > a.score ? b : a)) : null;
  const recent = new Set(opts.recent || []);
  for (const s of sigs) { s.raw = s.score; if (s.kind !== 'mark' && recent.has(s.key)) s.score /= 2; }
  sigs.sort((a, b) => b.score - a.score);
  const top = sigs[0];
  const lead = top && top.score >= 30 ? top : { key: `quiet.${god}`, kind: 'quiet', score: 10 };
  const loud = lead.score >= 90 ? 5 : lead.score >= 70 ? 4 : lead.score >= 50 ? 3 : lead.score >= 35 ? 2 : 1;
  const rarity = (RARITY[kind] || RARITY.day)[lead.kind] || '';
  // the eight domains (G3 A): the energy's ruling domains ±2, the landings by kind, star days +1
  const pole = (ctx.sign[el] || 0) >= 0 ? 1 : -1; const doms = Object.fromEntries(DOMAINS.map((d) => [d, { v: 0, s: 0, why: [] }]));
  for (const d of RULING[god] || []) { doms[d].v += 2; doms[d].s += 2 * pole; doms[d].why.push('energy'); }
  for (const b of bonds) { const d = GATE_DOMAIN[b.gate]; const [, w, sg] = KIND[b.kind]; doms[d].v += w; doms[d].s += w * sg; doms[d].why.push(`land.${b.kind}.${b.gate}`); }
  for (const id of stars) { const d = STAR_DAY[id]?.[0]; if (d) { doms[d].v += 1; doms[d].s += 1; doms[d].why.push(`star.${id}`); } }
  const isVoid = stars.includes('kongwang') && kind === 'day';
  for (const d of DOMAINS) { const r = doms[d]; r.lvl = isVoid ? Math.min(1, r.v ? 1 : 0) : r.v >= 4 ? 3 : r.v >= 2 ? 2 : r.v >= 1 ? 1 : 0; r.dir = r.lvl === 0 ? 'quiet' : r.s > 0 ? 'open' : r.s < 0 ? 'tested' : 'mixed'; }
  return {
    period, kind, stem, branch, god, pole, rawTop: rawTop && rawTop.raw >= 30 ? rawTop.key : null,
    energy: { el, gel, fn: ctx.fn[el], fnGround: ctx.fn[gel], sign: ctx.sign[el] || 0, signGround: ctx.sign[gel] || 0, state: energyState(ctx, el), ground: groundRelation(el, gel) },
    mix, lift, bonds, stars, isVoid, sigs, lead, loud, rarity, live, age, domains: doms,
  };
}

/** n days from a local date with the freshness rule applied in order (the lookback starts six days earlier). */
export function leadsFor(ctx, from, n) {
  const start = typeof from === 'string' ? from : isoDay(from); const out = []; const recent = [];
  for (let i = -6; i < n; i++) {
    const day = addDays(start, i); const r = readPeriod(ctx, periodOf('day', day), { recent: recent.slice(-6) });
    recent.push(r.rawTop); if (i >= 0) out.push(r);
  }
  return out;
}

/**
 * The reminders (P1 A, P2 A, P3 A): every marker and pillar day, plus the two
 * strongest days of each Monday-to-Sunday week that score 65 or more.
 * @returns [{ date, code, loud }], code = the lead key prefixed by its energy, e.g. 'Fire:clash.hour'
 */
export function pushSchedule(ctx, from, n = 35) {
  const days = leadsFor(ctx, from, n); const weeks = new Map();
  for (const r of days) { const t = atNoon(r.period.start); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); const k = isoDay(t); if (!weeks.has(k)) weeks.set(k, []); weeks.get(k).push(r); }
  const out = [];
  for (const rs of weeks.values()) {
    const must = rs.filter((r) => ['mark', 'return', 'turned'].includes(r.lead.kind));
    const rest = rs.filter((r) => !must.includes(r) && r.lead.score >= 65).sort((a, b) => b.lead.score - a.lead.score);
    for (const r of [...must, ...rest].slice(0, Math.max(must.length, 2))) out.push({ date: r.period.start, code: `${r.energy.el}:${r.lead.key}`, loud: r.loud });
  }
  return out.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export { GOD_ID as ALMANAC_GOD_ID };
