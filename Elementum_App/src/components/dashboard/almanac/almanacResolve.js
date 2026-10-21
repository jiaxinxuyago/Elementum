// ===================================================================
// ELEMENTUM · almanacResolve — Your Almanac's page models (EVT-1)
// ===================================================================
// The Day, Month and Year pages and the hub tiles, energy first (owner
// 2026-10-20) and drawn (round 3, G1–G9 A): the energies and what they do
// in this reader, the lift, where the period lands, the eight domains with
// what it favours, the rhythm around it. Units come from content/almanac.js;
// a unit not yet written gets a plain draft line flagged `draft` (B3). The
// year's main line and bond are Life Chapters' units, its domain lines the
// Domains section's By-year units (E4 A), read here, never rewritten.
// ===================================================================

import { ALMANAC_UNITS } from '../../../content/almanac.js';
import { DEPTH_UNITS } from '../../../content/depth.js';
import { GATES } from '../../../content/positions.js';
import { buildEnergyChart, HIDDEN_STEMS, STEM_ELEM } from '../../../engine/index.js';
import { seasonOf } from '../../../engine/depth/index.js';
import { decadePole } from '../../reading/domainsResolve.js';
import {
  almanacContext, periodOf, readPeriod, leadsFor, pushSchedule, isoDay,
  DOMAINS, GATE_LIFE, GOD_ID, KIND,
} from '../../../engine/almanac/index.js';

const unit = (key, draft) => (ALMANAC_UNITS[key] ? { key, text: ALMANAC_UNITS[key], draft: false } : { key, text: draft, draft: true });
const depthUnit = (key, draft) => (DEPTH_UNITS[key] ? { key, text: DEPTH_UNITS[key], draft: false } : { key, text: draft, draft: true });
const pairUnit = (key, draft) => { const u = unit(key, draft); const [lean, over] = String(u.text || '').split('|'); return { ...u, lean, over }; };
const lc = (s) => String(s || '').toLowerCase();

const VERB = { clash: 'strikes', punish: 'grinds against', harm: 'wears at', bind: 'ties into', frame: 'joins', repeat: 'repeats' };
const LAND_PHRASE = { clash: 'is shaken', punish: 'grinds', harm: 'wears thin', bind: 'draws closer', frame: 'gathers strength', repeat: 'echoes itself' };
const SIGN_WORD = (s) => (s > 0 ? 'grow' : s < 0 ? 'release' : 'even');
const LIFT_WORD = ['Weighs on you', 'Leans against you', 'Even', 'Leans with you', 'Lifts you'];
const GROUND = { matches: 'more {g}, and it does not let up', feeds: '{g}, which feeds the {e}', drains: '{g}, which the {e} feeds in turn', presses: '{g}, which the {e} holds down', resists: '{g}, which pushes back against the {e}' };
const MARK_HEAD = { month: 'A new month opens', year: 'A new year opens', birthday: 'Your birthday', gate: 'A new gate opens', decade: 'A new decade begins' };
const BOND_KEY_DEPTH = { bind: 'bind', clash: 'clash', punish: 'punish', harm: 'harm', frame: 'frame', repeat: 'selfpunish' };

function rolesOf(chart) {
  const ec = buildEnergyChart(chart); const out = {};
  for (const e of ec.energies) { const r = e.roles || []; out[e.el] = r.includes('core') ? 'core' : r.includes('friction') ? 'friction' : r.includes('catalyst') ? 'catalyst' : r.includes('ally') ? 'ally' : 'catalyst'; }
  return { roles: out, presence: Object.fromEntries(ec.energies.map((e) => [e.el[0].toUpperCase() + e.el.slice(1), e.presence])) };
}

// ── the parts of a reading ────────────────────────────────────────
function headline(r) {
  const e = r.energy; const s = SIGN_WORD(e.sign);
  const a0 = unit(`TEMPLATED tpl_almanac · head.energy.${lc(e.fn)}.${s}`, `{el} ${s === 'grow' ? 'lifts' : s === 'release' ? 'weighs on' : 'steadies'} you`);
  const a = { ...a0, text: a0.text.replace(/\{el\}/g, e.el) };
  const L = r.lead; let b = null;
  if (L.gate) b = unit(`TEMPLATED tpl_almanac · head.land.${L.kind}.${L.gate}`, `your ${GATES[L.gate]} ${LAND_PHRASE[L.kind]}`);
  else if (L.kind === 'mark') b = unit(`TEMPLATED tpl_almanac · head.mark.${L.mark}`, lc(MARK_HEAD[L.mark]));
  else if (L.kind === 'return' || L.kind === 'turned') b = unit(`TEMPLATED tpl_almanac · head.${L.kind}`, L.kind === 'return' ? 'your own day returns' : 'your day turns over');
  else if (L.kind === 'void') b = unit('TEMPLATED tpl_almanac · head.void', 'the day runs light');
  else if (L.kind === 'star') b = unit(`TEMPLATED tpl_almanac · head.star.${L.star}`, `${lc(L.domain)} opens`);
  return { text: b ? `${a.text}, and ${b.text}` : a.text, draft: a.draft || !!b?.draft, keys: [a.key, b?.key].filter(Boolean) };
}
function energyLine(r, hor) {
  const e = r.energy; const v = hor === 'day' ? `.${Math.floor(Math.round(atNoon(r.period.start) / 86400000) / 10) % 2 ? 'b' : 'a'}` : ''; // V1 A: two day variants, alternating each time the same stem returns
  const draft = `${e.fn}, an energy you ${e.sign > 0 ? 'grow' : e.sign < 0 ? 'release' : 'hold even'}. ${{ need: 'Your chart is short of it, and this brings it.', grow: 'Your chart holds it already, and more of it helps.', heavy: 'Your chart already holds too much of it.', core_over: 'It is your own element, and you already run over.', core_under: 'It is your own element, and it refills you.', core_even: 'It is your own element.', even: 'It neither lifts nor weighs on you.' }[e.state]}`;
  // keyed by the energy's function, so the text holds for every chart in that state; {el} is filled here
  const u = unit(`ENERGY ${lc(e.fn)} · ${hor}.${e.state}${v}`, draft);
  return { ...u, text: u.text.replace(/\{el\}/g, e.el) };
}
function groundLine(r) {
  const e = r.energy; const u = unit(`TEMPLATED tpl_almanac · ground.${e.ground}`, `Under it runs ${GROUND[e.ground]}.`);
  return { ...u, text: u.text.replace(/\{g\}/g, e.gel).replace(/\{e\}/g, e.el) };
}
function landing(ctx, r, hor) {
  const L = r.lead; const who = { day: "The day's", month: "The month's", year: "The year's" }[hor];
  if (L.gate) {
    const seat = ctx.gates[L.gate];
    const clause = `${who} ${r.energy.gel} ${VERB[L.kind]} the ${seat.el} in your ${GATES[L.gate]}, the seat of ${GATE_LIFE[L.gate]}.`;
    const body = hor === 'year'
      ? depthUnit(`TEMPLATED tpl_depth · year_bond.${BOND_KEY_DEPTH[L.kind]}.${L.gate}`, `This year ${GATE_LIFE[L.gate]} ${LAND_PHRASE[L.kind]}.`)
      : unit(`TEMPLATED tpl_almanac · land.${hor}.${L.kind}.${L.gate}`, null);
    const echo = L.echo ? unit(`TEMPLATED tpl_almanac · echo.${L.gate}`, 'The month presses on the same gate, and today it comes to a head.') : null;
    return { clause, body, echo };
  }
  if (L.kind === 'mark') return { clause: null, body: unit(`TEMPLATED tpl_almanac · mark.${L.mark}`, `${MARK_HEAD[L.mark]} today${L.term ? `, with ${L.term}` : ''}.`) };
  if (L.kind === 'return' || L.kind === 'turned') return { clause: null, body: unit(`TEMPLATED tpl_almanac · pillar.${L.kind}`, L.kind === 'return' ? 'Today repeats the day you were born on.' : 'Today is your own day turned over, its stem striking yours and its branch clashing your Day Gate.') };
  if (L.kind === 'void') return { clause: null, body: unit('TEMPLATED tpl_almanac · land.void', 'The day falls in your Void, and what starts today arrives late or light.') };
  if (L.kind === 'star') return { clause: null, body: unit(`STAR ${L.star} · day`, `The day opens your ${lc(L.domain)}.`) };
  return { clause: null, body: unit('TEMPLATED tpl_almanac · land.quiet', 'Nothing touches your gates, and the time is yours to spend.') };
}
function domainBoard(r, hor, yearGod) {
  const pole = r.pole > 0 ? 'helping' : 'heavy';
  return DOMAINS.map((d) => {
    const x = r.domains[d]; const row = { domain: d, lvl: x.lvl, dir: x.dir, why: x.why };
    if (x.lvl < 2) return row;
    if (hor === 'year') {
      if (x.why.includes('energy')) row.line = depthUnit(`GOD ${GOD_ID[yearGod]} · year_domain.${d}`, `The year touches your ${lc(d)}.`);
      return row;
    }
    if (x.why.includes('energy')) row.fav = pairUnit(`GOD ${GOD_ID[r.god]} · favours.${hor}.${d}.${pole}`, null);
    else { const land = x.why.find((w) => w.startsWith('land.')); if (land) { const [, k, g] = land.split('.'); row.fav = pairUnit(`TEMPLATED tpl_almanac · favours_land.${k}.${g}`, null); } }
    return row;
  });
}
function seasonSlots(chart, r, hourUnknown) {
  const s = seasonOf(chart, { hourUnknown }); if (!s) return null;
  const hidden = (HIDDEN_STEMS[r.branch] || []).map((h) => h.s);
  return s.asks.filter((a) => a.rank === 'primary').map((a) => ({ stem: a.stem, el: STEM_ELEM[a.stem], state: r.stem === a.stem ? 'met' : hidden.includes(a.stem) ? 'trace' : 'none' }));
}
function common(ctx, r, hor, presence) {
  const add = Object.fromEntries(Object.entries(r.mix).map(([k, v]) => [k, Math.round(v * 20)]));
  return {
    kind: hor, period: r.period, stem: r.stem, branch: r.branch, energy: r.energy, mix: r.mix,
    lift: { ...r.lift, word: LIFT_WORD[r.lift.step] }, loud: r.loud, rarity: r.rarity, lead: r.lead, bonds: r.bonds, isVoid: r.isVoid,
    head: headline(r), line: energyLine(r, hor), ground: groundLine(r), landing: landing(ctx, r, hor),
    chartToday: { presence, add, sign: ctx.sign }, gates: ctx.gates, live: r.live, age: r.age,
  };
}
const ribbonItem = (r, lab) => ({ date: r.period.start, el: r.energy.el, lift: r.lift.value, loud: r.loud, sign: r.lead.kind, lab });
const WD = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const atNoon = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d, 12); };

/**
 * @param chart  the engine chart
 * @param opts   { kind: 'day'|'month'|'year'|'hub', date (Date or ISO), hourUnknown, birthDate }
 */
export function resolveAlmanac(chart, opts = {}) {
  const day = typeof opts.date === 'string' ? opts.date : isoDay(opts.date || new Date());
  const ctx = almanacContext(chart, { hourUnknown: opts.hourUnknown, birthDate: opts.birthDate });
  const { roles, presence } = rolesOf(chart);
  const kind = opts.kind || 'day';
  if (kind === 'day' || kind === 'hub') {
    // the week (G9 A), with the freshness rule run in order
    const t = atNoon(day); t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); const monday = isoDay(t);
    const week = leadsFor(ctx, monday, 7); const r = week.find((x) => x.period.start === day);
    const m = { ...common(ctx, r, 'day', presence), domains: domainBoard(r, 'day'), week: week.map((x) => ribbonItem(x, WD[atNoon(x.period.start).getDay()])) };
    m.ahead = leadsFor(ctx, day, 36).slice(1).filter((x) => x.loud >= 4).slice(0, 6).map((x) => ({ date: x.period.start, el: x.energy.el, sign: x.lead.kind, head: headline(x) }));
    if (kind === 'hub') {
      const mo = readPeriod(ctx, periodOf('month', day), { asOf: day }); const yr = readPeriod(ctx, periodOf('year', day), { asOf: day });
      const cur = ctx.luck.find((l) => l.startYear <= Number(day.slice(0, 4)) && Number(day.slice(0, 4)) <= (l.endYear ?? l.startYear + 9));
      m.hub = {
        month: { el: mo.energy.el, head: headline(mo), lift: mo.lift, loud: mo.loud, period: mo.period },
        year: { el: yr.energy.el, head: headline(yr), lift: yr.lift, loud: yr.loud, period: yr.period },
        decade: cur ? { el: STEM_ELEM[cur.stem], startYear: cur.startYear, endYear: cur.endYear ?? cur.startYear + 9, yearOf: Number(day.slice(0, 4)) - cur.startYear + 1 } : null,
      };
    }
    return m;
  }
  if (kind === 'month') {
    const p = periodOf('month', day); const r = readPeriod(ctx, p, { asOf: day });
    const n = Math.round((atNoon(p.end) - atNoon(p.start)) / 86400000) + 1;
    const days = leadsFor(ctx, p.start, n);
    return { ...common(ctx, r, 'month', presence), domains: domainBoard(r, 'month'), season: seasonSlots(chart, r, opts.hourUnknown),
      days: days.map((x) => { const n = atNoon(x.period.start).getDate(); return ribbonItem(x, n === 1 || n % 5 === 0 ? String(n) : ''); }), today: day,
      marked: days.filter((x) => x.loud >= 4).map((x) => ({ date: x.period.start, el: x.energy.el, sign: x.lead.kind, head: headline(x) })) };
  }
  // the year: Life Chapters' line, the Domains section's By-year lines
  const p = periodOf('year', day); const r = readPeriod(ctx, p, { asOf: day });
  const pole = decadePole(lc(r.energy.el), roles, ctx.condition);
  const months = []; let d = p.start;
  for (let i = 0; i < 12 && d <= p.end; i++) { const mp = periodOf('month', d); const mr = readPeriod(ctx, mp); const s = seasonSlots(chart, mr, opts.hourUnknown);
    months.push({ ...ribbonItem(mr, atNoon(mp.start).toLocaleString('en-GB', { month: 'short' }).slice(0, 1)), asks: !!s?.some((x) => x.state === 'met'), now: mp.start <= day && day <= mp.end });
    d = (() => { const t = atNoon(mp.end); t.setDate(t.getDate() + 1); return isoDay(t); })(); }
  const cur = ctx.luck.find((l) => l.startYear <= p.baziYear && p.baziYear <= (l.endYear ?? l.startYear + 9));
  const ahead = [];
  const nextYear = readPeriod(ctx, periodOf('year', (() => { const t = atNoon(p.end); t.setDate(t.getDate() + 1); return isoDay(t); })()));
  ahead.push({ when: nextYear.period.start, el: nextYear.energy.el, text: `${/^[AEIOU]/.test(nextYear.energy.el) ? 'An' : 'A'} ${nextYear.energy.el} year begins` });
  for (const g of [['day', 35], ['hour', 48]]) if (ctx.birthYear && r.age < g[1]) ahead.push({ when: String(ctx.birthYear + g[1]), gate: g[0], text: `Your ${GATES[g[0]]} opens, at ${g[1]}` });
  const nextDec = ctx.luck.find((l) => l.startYear > p.baziYear); if (nextDec) ahead.push({ when: String(nextDec.startYear), el: STEM_ELEM[nextDec.stem], text: `A new decade, at ${nextDec.startAge}` });
  return { ...common(ctx, r, 'year', presence), domains: domainBoard(r, 'year', r.god), season: seasonSlots(chart, r, opts.hourUnknown), months,
    chapters: depthUnit(`GOD ${GOD_ID[r.god]} · year_line.${pole}`, `This year ${pole === 'helping' ? 'works for you' : 'weighs on you'}.`),
    decade: cur ? { el: STEM_ELEM[cur.stem], yearOf: p.baziYear - cur.startYear + 1, startYear: cur.startYear } : null, ahead: ahead.sort((a, b) => (a.when < b.when ? -1 : 1)).slice(0, 3) };
}

/** The codes the phone posts with its subscription (P1 A). */
export function almanacPushCodes(chart, opts = {}) {
  const ctx = almanacContext(chart, { hourUnknown: opts.hourUnknown, birthDate: opts.birthDate });
  return pushSchedule(ctx, opts.date || new Date(), 35);
}

export { KIND as ALMANAC_KIND };
