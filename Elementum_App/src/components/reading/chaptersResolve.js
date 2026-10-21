// ===================================================================
// ELEMENTUM · chaptersResolve — Life Chapters, energy first
// ===================================================================
// Owner direction 2026-10-21 ("keep the energy as the subject for each life
// chapter … then dive into each domain's, energy manual's advise") and
// rulings L1–L10, R1–R4 all A (record: ComparativeAnalysis/Handoffs/
// 2026-10-19-life-chapters-content/03_RULINGS.md). Each chapter is the
// energy its gate carries, read in Your Almanac's words and measures
// (engine/almanac): the energy and its function, grow or release, the lift,
// the ground underneath, where it lands (the eight-domain board, then the
// gate's domain and the two weightiest), working with it (the chapter the
// reader is in), its decades as energies, and the years from this one on.
// Units come from content/depthChaptersEnergy.js (the station's tpl_chapters),
// then content/almanac.js (the shared ground lines); a unit not yet written
// gets a plain draft line flagged `draft` (B3).
// ===================================================================

import { ENERGY_CHAPTER_UNITS as CHAPTER_UNITS } from '../../content/depthChaptersEnergy.js';
import { ALMANAC_UNITS } from '../../content/almanac.js';
import { IS_DEV_TOOLS } from '../../devtools.js';
import { STEM_ELEM, HIDDEN_STEMS, getTenGod } from '../../engine/calculator.js';
import { flowYears, arrivingStars } from '../../engine/depth/index.js';
import { almanacContext, energyMix, liftOf, groundRelation, energyState, DOMAINS, RULING, GATE_DOMAIN } from '../../engine/almanac/index.js';
import { readerAge, GATE_ORDER, GATE_START, GATE_SPAN, DEC_MIN, DEC_MAX } from './domainsResolve.js';

/** The energy-first page: on the dev site until its corpus is landed and checked, then live. */
export const CHAPTERS_ENERGY = IS_DEV_TOOLS;

const CHAPTER = { year: 'Early Chapter', month: 'Rising Chapter', day: 'Home Chapter', hour: 'Late Chapter' };
const GATE_NAME = { year: 'Year Gate', month: 'Month Gate', day: 'Day Gate', hour: 'Hour Gate' };
const FN_OF_FAMILY = { self: 'Body', seal: 'Mind', output: 'Expression', wealth: 'Action', officer: 'Order' };
const FN_WORD = { Body: 'your own energy', Mind: 'thinking and support', Expression: 'your voice and what you make', Action: 'reach and resources', Order: 'structure and pressure' };
const LIFT_WORD = ['Weighs on you', 'Leans against you', 'Even', 'Leans with you', 'Lifts you'];
const BOND_KIND = { 六合: 'bind', 六冲: 'clash', 刑: 'punish', 六害: 'harm', 半合: 'frame', 三合: 'frame', 自刑: 'repeat' };
const BOND_PRI = { 六冲: 5, 刑: 4, 六害: 3, 六合: 2, 半合: 2, 三合: 2, 自刑: 1 };
const GATE_RANK = { month: 4, day: 3, hour: 2, year: 1 };
const LAND_VERB = { clash: 'Strikes', punish: 'Grinds against', harm: 'Wears at', bind: 'Ties into', frame: 'Joins', repeat: 'Repeats' };
const gateOfAge = (a) => (a < 16 ? 'year' : a < 35 ? 'month' : a < 48 ? 'day' : 'hour');
const an = (w) => (/^[AEIOU]/.test(w) ? 'an' : 'a');

/** A unit by key: the written text with the elements filled in, or the draft line standing in for it. */
function unit(key, draft, fill = {}) {
  const raw = CHAPTER_UNITS[key] ?? ALMANAC_UNITS[key];
  const put = (t) => String(t).replace(/\{el\}/g, fill.el || '').replace(/\{e\}/g, fill.el || '').replace(/\{g\}/g, fill.g || '');
  return raw != null ? { key, text: put(raw), draft: false } : { key, text: put(draft), draft: true };
}
const pair = (key, draft) => { const u = unit(key, draft); const [lean, over] = u.text.split('|'); return { ...u, lean, over }; };

const mainHidden = (b) => (HIDDEN_STEMS[b] || []).slice().sort((x, y) => y.w - x.w)[0]?.s;
/** What a stem over a branch carries for this reader: energy, function, grow/release, lift, the ground, the domain weights. */
function readEnergy(ctx, stem, branch, gate) {
  const top = stem || mainHidden(branch); const under = mainHidden(branch);
  const el = STEM_ELEM[top]; const god = getTenGod(ctx.dm, top)?.zh; const ugod = getTenGod(ctx.dm, under)?.zh;
  const dir = (e) => ((ctx.sign[e] ?? 0) < 0 ? 'release' : 'grow'); // a rare even energy reads with grow
  const w = Object.fromEntries(DOMAINS.map((d) => [d, 0]));
  for (const d of RULING[god] || []) w[d] += 2;
  if (stem) for (const d of RULING[ugod] || []) w[d] += 1;
  if (gate) w[GATE_DOMAIN[gate]] += 1;
  const gEl = STEM_ELEM[under];
  return {
    el, fn: FN_OF_FAMILY[getTenGod(ctx.dm, top)?.family] || 'Body', dir: dir(el), state: energyState(ctx, el),
    lift: (() => { const l = liftOf(ctx, energyMix(top, branch)); return { ...l, word: LIFT_WORD[l.step] }; })(),
    ground: stem ? { el: gEl, fn: FN_OF_FAMILY[getTenGod(ctx.dm, under)?.family] || 'Body', dir: dir(gEl), rel: groundRelation(el, gEl) } : null,
    weights: w,
  };
}
const ranked = (w) => DOMAINS.filter((d) => w[d] > 0).sort((a, b) => w[b] - w[a] || DOMAINS.indexOf(a) - DOMAINS.indexOf(b));

// ── draft lines (B3) ───────────────────────────────────────────────
const dChapter = (name, e, t) => `Your ${name} ${t === 'lived' ? 'carried' : 'carries'} {el}, the energy of ${e.fn}, and your chart ${e.dir === 'grow' ? (t === 'lived' ? 'welcomed' : 'welcomes') : (t === 'lived' ? 'had' : 'has')} ${e.dir === 'grow' ? 'it' : 'more of it than it needs'}.`;
const dGround = (t) => (t === 'lived' ? 'Under it ran {g}, and you felt the two together.' : 'Under it runs {g}, and you feel the two together.');
const dDomain = (d, e) => `In ${d}, this chapter favours what ${e.fn} brings, and you ${e.dir === 'grow' ? 'take it up' : 'spend it well'}.`;
const dDecade = (e, t) => (t === 'lived' || t === 'early' ? `These years brought {el}, ${e.dir === 'grow' ? 'and they worked for you' : 'and they weighed on you'}.` : `This decade brings {el}, ${e.dir === 'grow' ? 'and it works for you' : 'and it weighs on you'}.`);

/**
 * Life Chapters, energy first.
 * @returns { energy:true, age, birthYear, nowYear, gateNow, claim, current, strip, chapters, years, lived }
 */
export function resolveEnergyChapters(chart, positions, opts = {}) {
  const who = readerAge(chart, opts.year) || { age: 30, birthYear: null, nowYear: new Date().getFullYear() };
  const { age, birthYear, nowYear } = who;
  const ctx = almanacContext(chart, { hourUnknown: !!opts.hourUnknown });
  const gateNow = gateOfAge(age);
  const luck = (chart?.luckPillars || []).map((l) => ({ stem: l.stem, branch: l.branch, startAge: l.startAge, endAge: l.endAge ?? l.startAge + 9, startYear: l.startYear, endYear: l.endYear ?? l.startYear + 9, ...readEnergy(ctx, l.stem, l.branch, null) }));
  const cur = luck.find((l) => l.startAge <= age && age <= l.endAge) || null;
  const decTense = (l) => (l.endAge < age ? 'lived' : l.startAge <= age ? 'now' : 'coming');
  const used = new Set(); const variants = {};
  // the Energy Map's seek: the energies the chart grows, scarcest first; the decade that brings the first
  const seekEls = Object.entries(ctx.sign).filter(([, s]) => s > 0).sort((a, b) => (ctx.presence[a[0]] ?? 0) - (ctx.presence[b[0]] ?? 0)).map(([e]) => e);

  const chapters = GATE_ORDER.map((g) => {
    const t = age < GATE_START[g] ? 'coming' : gateOfAge(age) === g ? 'now' : 'lived';
    const closed = ctx.hourUnknown && g === 'hour';
    const p = chart.pillars[g];
    const base = { key: g, name: `The ${CHAPTER[g]}`, short: CHAPTER[g], span: GATE_SPAN[g], status: t, closed, fromYear: birthYear == null ? null : birthYear + GATE_START[g], seats: positions.filter((x) => x.gateKey === g) };
    // decades by start age; the current one sits in the chapter the reader is in (R2 A)
    const decs = luck.filter((l) => l.endAge >= DEC_MIN && l.startAge <= DEC_MAX && (l === cur ? g === gateNow : gateOfAge(Math.max(l.startAge, 0)) === g)).map((l) => {
      const dt = decTense(l); const early = dt === 'lived' && g === 'year';
      const k0 = `ENERGY ${l.fn.toLowerCase()} · decade.${l.dir}.${early ? 'early' : dt}`;
      let key = k0;
      if (dt !== 'now') { variants[k0] = (variants[k0] || 0) + 1; key = `${k0}.${variants[k0] === 1 ? 'a' : 'b'}`; }
      const d = { el: l.el, fn: l.fn, dir: l.dir, lift: l.lift, startAge: l.startAge, startYear: l.startYear, endYear: l.endYear, tense: dt,
        label: `${dt === 'now' ? 'Now · ' : ''}${an(l.el).replace(/^a/, dt === 'now' ? 'a' : 'A')} ${l.el} decade · ${l.startYear} to ${l.endYear}`,
        ...unit(key, dDecade(l, early ? 'early' : dt), { el: l.el, g: l.ground?.el }) };
      if (dt === 'now') {
        d.groundEl = l.ground?.el;
        d.ground = l.ground ? unit(`TEMPLATED tpl_almanac · ground.${l.ground.rel}`, dGround('now'), { el: l.el, g: l.ground.el }) : null;
        d.favours = ranked(l.weights).slice(0, 3).map((dm) => ({ domain: dm, ...pair(`ENERGY ${l.fn.toLowerCase()} · favours.decade.${dm}.${l.dir}`, `What ${l.fn} brings|the rest`) }));
      }
      return d;
    });
    if (closed) return { ...base, decades: decs };
    const e = readEnergy(ctx, g === 'day' ? null : p.stem, p.branch, g);
    const fill = { el: e.el, g: e.ground?.el };
    const out = { ...base, energy: e, decades: decs,
      energyU: unit(`ENERGY ${e.fn.toLowerCase()} · chapter.${g}.${e.dir}.${t}`, dChapter(CHAPTER[g], e, t), fill),
      groundU: e.ground ? unit(t === 'lived' ? `TEMPLATED tpl_chapters · ground.${e.ground.rel}.lived` : `TEMPLATED tpl_almanac · ground.${e.ground.rel}`, dGround(t), fill) : null,
      board: DOMAINS.map((d) => ({ domain: d, w: e.weights[d] })),
      lines: [], manual: null };
    if (t !== 'lived') {
      const gd = GATE_DOMAIN[g]; const fk = (d) => `ENERGY ${e.fn.toLowerCase()} · chapter_domain.${d}.${e.dir}`;
      const pick = [gd, ...ranked(e.weights).filter((d) => d !== gd)].filter((d) => !used.has(fk(d))).slice(0, 3);
      pick.forEach((d) => used.add(fk(d)));
      out.lines = pick.map((d) => ({ domain: d, ...unit(fk(d), dDomain(d, e), fill) }));
    }
    if (t === 'now') {
      const first = seekEls[0];
      const brings = first ? luck.find((l) => l.el === first && decTense(l) !== 'lived') : null;
      out.manual = { ...unit(`ENERGY ${e.fn.toLowerCase()} · chapter_manual.${e.dir}`, `This chapter works for you when its ${e.fn} is put to use, and you feel the difference.`, fill),
        seek: seekEls.slice(0, 2).map((el) => ({ el, fn: ctx.fn[el] })),
        brings: first ? (brings ? (decTense(brings) === 'now' ? `${first} is in the decade you are in now` : `${first} arrives with your decade from ${brings.startYear}`) : `No decade of yours brings ${first}`) : null };
    }
    return out;
  });

  // the years: this year and the next five, across the decade's end (R1 A); lived years of the decade as chips
  const nextDec = cur ? luck.find((l) => l.startYear === cur.endYear + 1) : null;
  let prevKey = null;
  const years = flowYears(chart, nowYear, nowYear + 5, { hourUnknown: ctx.hourUnknown }).map((y) => {
    const e = readEnergy(ctx, y.stem, y.branch, null);
    // years come in pairs of one element: the second of a pair reads the .b line
    const yk = `ENERGY ${e.fn.toLowerCase()} · year.${e.state}`; const ykey = yk === prevKey ? `${yk}.b` : yk; prevKey = yk;
    const b = y.bonds.map((x) => ({ ...x, g: x.gates.find((gg) => GATE_ORDER.includes(gg)) })).filter((x) => x.g)
      .sort((a, c) => (BOND_PRI[c.type] - BOND_PRI[a.type]) || (GATE_RANK[c.g] - GATE_RANK[a.g]))[0] || null;
    const kind = b ? BOND_KIND[b.type] : null;
    return {
      year: y.year, el: e.el, fn: e.fn, dir: e.dir, state: e.state, lift: e.lift, status: y.year === nowYear ? 'now' : 'coming',
      newDecade: nextDec && y.year === nextDec.startYear ? nextDec.el : null,
      ...unit(ykey, `{el} brings ${e.fn} for a whole year, and you feel it ${e.dir === 'grow' ? 'lift you' : 'weigh on you'}.`, { el: e.el }),
      land: b ? { kind, gate: b.g, label: `${LAND_VERB[kind]} your ${GATE_NAME[b.g]}`, ...unit(`TEMPLATED tpl_almanac · land.year.${kind}.${b.g}`, `This year reaches your ${GATE_NAME[b.g]}, and you feel it there.`) } : null,
      stars: arrivingStars(chart, { stem: y.stem, branch: y.branch }).filter((s) => !s.natal && s.en).map((s) => ({ id: s.id, en: s.en })),
    };
  });
  const lived = cur ? Array.from({ length: Math.max(0, nowYear - cur.startYear) }, (_, i) => { const yr = cur.startYear + i; const HS = '甲乙丙丁戊己庚辛壬癸'; const EB = '子丑寅卯辰巳午未申酉戌亥'; const st = HS[(((yr - 4) % 10) + 10) % 10]; return { year: yr, el: STEM_ELEM[st], step: liftOf(ctx, energyMix(st, EB[(((yr - 4) % 12) + 12) % 12])).step }; }) : [];

  const chNow = chapters.find((c) => c.key === gateNow);
  const claim = `You are in your ${CHAPTER[gateNow]}${chNow?.energy ? `, carrying ${chNow.energy.el}` : ''}${cur ? `, in ${an(cur.el)} ${cur.el} decade` : ''}.`;
  return {
    energy: true, age, birthYear, nowYear, gateNow,
    claim: { key: 'TEMPLATED tpl_chapters · claim', text: claim, draft: false },
    // the catalogue beat reads `current.persona` as the decade's name
    current: cur ? { el: cur.el, persona: cur.el, startYear: cur.startYear, endYear: cur.endYear } : null,
    strip: luck.filter((l) => l.startAge <= DEC_MAX).map((l) => ({ startAge: l.startAge, startYear: l.startYear, el: l.el, persona: l.el, step: l.lift.step, pole: l.lift.step >= 2 ? 'helping' : 'heavy', now: l === cur })),
    chapters, years, lived, fnWord: FN_WORD,
  };
}
