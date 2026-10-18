// ===================================================================
// ELEMENTUM · domainsResolve — THE DOMAINS, read domain first (DOM-1)
// ===================================================================
// Owner rulings 2026-10-17 (Q1–Q15 A): a chart-wide page per canonical
// domain, gathered from every seat that rules it (resolvePositions), read
// in three steps:
//   1 How you are            the lead seat's recognition (+ the classical
//                            pair line when one fires on this domain)
//   2 What has already       the seats whose gate the reader has lived, the
//     happened               last decade that ruled the domain, the gap
//                            line when the gate they live in holds no seat
//   3 What is coming         the Day and Hour seats still ahead, the
//                            coming decades (luck pillars) that rule it,
//                            the strongest or heaviest window where a
//                            decade's character matches a seat's
// Ages come from the gates (Year to 15, Month 16–34, Day 35–47, Hour 48
// on); calendar years from the decades. Authored text carries neither:
// the labels built here do (Q8). Pure: content is passed in, so the same
// function feeds the app, the audit kit and the review pages.
// ===================================================================

import { SLOT_RANK, CHAPTERS, GATES, DOMAIN_TAXONOMY } from '../../content/positions.js';
import { TG_PERSONA } from '../../content/tgNames.js';
import { TG_PATTERNS } from '../../content/tgPatterns.js';

export const DEC_MIN = 10; export const DEC_MAX = 75;
export const GATE_ORDER = ['year', 'month', 'day', 'hour'];
export const GATE_START = { year: 0, month: 16, day: 35, hour: 48 };
export const GATE_SPAN = { year: 'birth to 15', month: '16 to 34', day: '35 to 47', hour: '48 on' };
// the god's three ruling domains (REA_02 §5e, owner 2026-10-15) — mirrors k2.js GOD_RULING_DOMAINS
export const RULING = { 比肩: ['Family', 'Growth', 'Social'], 劫财: ['Wealth', 'Social', 'Career'], 食神: ['Health', 'Family', 'Career'], 伤官: ['Mind', 'Career', 'Social'], 偏财: ['Wealth', 'Family', 'Social'], 正财: ['Wealth', 'Family', 'Career'], 七杀: ['Career', 'Health', 'Growth'], 正官: ['Family', 'Social', 'Career'], 偏印: ['Mind', 'Growth', 'Career'], 正印: ['Family', 'Mind', 'Health'] };
// the domains an Hour Gate seat can rule (both hour slots, all ten gods) — the closed-hour note shows only on these
const HOUR_DOMAINS = new Set(['Family', 'Growth', 'Health', 'Mind', 'Wealth', 'Career', 'Social']);
const OWN = { Wealth: 'your money', Family: 'your family', Career: 'your work', Social: 'your friendships', Mind: 'your mind', Growth: 'your growth', Health: 'your body', Love: 'your love life' };

const gateIdx = (age) => (age < 16 ? 0 : age < 35 ? 1 : age < 48 ? 2 : 3);
const persona = (god) => TG_PERSONA[god] || god;
const bare = (p) => p.replace(/^The /, '');
const GOD_ID = { 比肩: 'bijian', 劫财: 'jiecai', 食神: 'shishen', 伤官: 'shangguan', 偏财: 'piancai', 正财: 'zhengcai', 七杀: 'qisha', 正官: 'zhengguan', 偏印: 'pianyin', 正印: 'zhengyin' };
const an = (w) => `${/^[AEIOU]/.test(w) ? 'An' : 'A'} ${w}`;

// the reader's age this year and their birth year, from the engine's luck pillars
export function readerAge(chart, year) {
  const lp = chart?.luckPillars?.[0];
  const nowYear = year ?? chart?.currentFlowYear?.year ?? new Date().getFullYear();
  if (!lp) return null;
  const birthYear = lp.startYear - lp.startAge;
  return { age: nowYear - birthYear, birthYear, nowYear };
}

// a decade's pole for this chart: helping when its element is a catalyst
// (or the core of an Underfueled chart), heavy otherwise
export function decadePole(el, roles, condition) {
  const r = roles?.[el];
  if (r === 'catalyst') return 'helping';
  if (r === 'core') return condition === 'Underfueled' ? 'helping' : 'heavy';
  return r === 'friction' ? 'heavy' : 'helping';
}

/**
 * @param chart      the engine chart (pillars, luckPillars, currentFlowYear)
 * @param positions  resolvePositions(chart, hourUnknown)
 * @param content    { seats, decades, gaps, patterns, unruled } (station shape)
 * @param opts       { hourUnknown, roles: {wood:'catalyst'|...}, condition, year }
 */
export function resolveDomains(chart, positions, content, opts = {}) {
  const { hourUnknown = false, roles = {}, condition = null } = opts;
  const who = readerAge(chart, opts.year) || { age: 30, birthYear: null, nowYear: null };
  const { age, birthYear } = who;
  const cur = gateIdx(age);
  const yearAt = (a) => (birthYear == null ? null : birthYear + a);
  const S = content?.seats || {}; const D = content?.decades || {};
  const unit = (p, d) => S[p.id]?.domains?.[d] || null;
  const present = new Set(positions.map((p) => p.god));
  const luck = (chart?.luckPillars || []).map((l) => ({ god: l.stemTenGod?.zh, el: String(l.element || '').toLowerCase(), startAge: l.startAge, endAge: l.endAge ?? l.startAge + 9, startYear: l.startYear, endYear: l.endYear ?? l.startYear + 9 }));

  const pages = DOMAIN_TAXONOMY.map((d) => {
    const seats = positions.filter((p) => (p.domains || []).includes(d))
      .sort((a, b) => GATE_ORDER.indexOf(a.gateKey) - GATE_ORDER.indexOf(b.gateKey) || (a.kind === 'stem' ? 0 : 1) - (b.kind === 'stem' ? 0 : 1));
    // the lead: the highest-ranked seat whose gate has opened (the Day Gate, the self, is always open)
    const opened = seats.filter((p) => p.gateKey === 'day' || GATE_START[p.gateKey] <= age);
    const lead = [...(opened.length ? opened : seats)].sort((a, b) => SLOT_RANK[a.slot] - SLOT_RANK[b.slot])[0] || null;
    const leadU = lead ? unit(lead, d) : null;

    // step 1
    let pattern = null;
    for (const tp of TG_PATTERNS) {
      if (!(tp.targets || []).includes(d)) continue;
      const [a, b] = tp.gods;
      if (!a.some((g) => present.has(g)) || !b.some((g) => present.has(g))) continue;
      const fused = ['year', 'month', 'hour'].some((gk) => { const at = positions.filter((x) => x.gateKey === gk); return at.some((x) => a.includes(x.god)) && at.some((x) => b.includes(x.god)); });
      const pc = content?.patterns?.[tp.key];
      const body = pc?.readings?.[d] || pc?.reading;
      if (body) pattern = { key: tp.key, src: `TG_PATTERN ${tp.key} · domain_lines.${d}${fused && pc.fused_line ? ' + fused_line' : ''}`, text: fused && pc.fused_line ? `${body} ${pc.fused_line}` : body };
      break;
    }
    const how = lead ? (leadU?.recognition || null) : (content?.unruled?.[d] || null);
    const howSrc = lead ? `POSITION ${lead.id} · domain_climb.${d}.recognition` : `TEMPLATED tpl_domains · domain_unruled.${d}`;

    // decades that rule this domain
    const ruling = luck.filter((l) => RULING[l.god]?.includes(d)).map((l) => ({ ...l, pole: decadePole(l.el, roles, condition) }));
    // decades read only inside the life window their lines are written for (audit round 1, M3)
    const lastPast = ruling.filter((l) => l.endAge < age && l.startAge >= DEC_MIN).slice(-1)[0] || null;
    const nowDec = ruling.find((l) => l.startAge <= age && age <= l.endAge) || null;
    const coming = ruling.filter((l) => l.startAge > age && l.startAge <= DEC_MAX).slice(0, 2);
    const decText = (l, tense) => D[l.god]?.[d]?.[l.pole]?.[tense] || null;
    const seatGods = new Set(seats.map((p) => p.god));

    // step 2
    const past = [];
    for (const p of seats) {
      const u = unit(p, d); const gi = GATE_ORDER.indexOf(p.gateKey);
      const show = p.gateKey === 'day' ? true : gi <= cur && !(p.gateKey === 'hour' && age < 48);
      if (!show || !u?.lived) continue;
      const label = p.gateKey === 'day' ? 'Your Day Gate · the pattern so far'
        : `${CHAPTERS[p.gateKey]} · ${gi === cur ? `${p.gateKey === 'year' ? 'birth' : GATE_START[p.gateKey]} to now` : GATE_SPAN[p.gateKey]}`;
      past.push({ kind: 'seat', src: `POSITION ${p.id} · domain_climb.${d}.lived`, order: p.gateKey === 'day' ? Math.min(age, 35) : GATE_START[p.gateKey], label, text: u.lived, seat: p.term });
    }
    if (lastPast && decText(lastPast, 'lived')) past.push({ kind: 'decade', src: `GOD ${GOD_ID[lastPast.god]} · decade_lines.${d}.${lastPast.pole}.lived`, order: lastPast.startAge, label: `${an(bare(persona(lastPast.god)))} decade · ${lastPast.startYear} to ${lastPast.endYear}`, text: decText(lastPast, 'lived') });
    const curGate = GATE_ORDER[cur];
    const decInGate = ruling.some((l) => l.startAge <= age && l.endAge >= GATE_START[curGate]);
    if (cur > 0 && seats.length && !decInGate && !seats.some((p) => p.gateKey === curGate) && !(curGate === 'hour' && hourUnknown)) {
      const g = content?.gaps?.[d]?.[curGate];
      if (g) past.push({ kind: 'gap', src: `TEMPLATED tpl_domains · domain_gaps.${d}.${curGate}`, order: GATE_START[curGate], label: `${CHAPTERS[curGate]} · ${GATE_START[curGate]} to now · no ${d} seat`, text: g });
    }
    past.sort((a, b) => a.order - b.order);

    // step 3
    const future = [];
    if (nowDec && decText(nowDec, 'ahead')) future.push({ kind: 'decade', now: true, src: `GOD ${GOD_ID[nowDec.god]} · decade_lines.${d}.${nowDec.pole}.ahead`, order: age, label: `Now · ${an(bare(persona(nowDec.god))).replace(/^A/, 'a')} decade · ${nowDec.startYear} to ${nowDec.endYear}`, text: decText(nowDec, 'ahead') });
    for (const p of seats) {
      const u = unit(p, d); if (!u?.ahead) continue;
      if (p.gateKey === 'day' && age < 35) future.push({ kind: 'seat', src: `POSITION ${p.id} · domain_climb.${d}.ahead`, order: 35, label: `${CHAPTERS.day} · from 35 · ${yearAt(35) ?? ''}`.replace(/ · $/, ''), text: u.ahead, seat: p.term });
      if (p.gateKey === 'hour' && age < 48) future.push({ kind: 'seat', src: `POSITION ${p.id} · domain_climb.${d}.ahead`, order: 48, label: `${CHAPTERS.hour} · from 48 · ${yearAt(48) ?? ''}`.replace(/ · $/, ''), text: u.ahead, seat: p.term });
    }
    let windowShown = false;
    for (const l of coming) {
      const t = decText(l, 'ahead'); if (!t) continue;
      const match = seatGods.has(l.god) ? [...seats].reverse().find((p) => p.god === l.god) : null;
      if (match && !windowShown) {
        windowShown = true;
        future.push({ kind: 'window', src: `GOD ${GOD_ID[l.god]} · decade_lines.${d}.${l.pole}.ahead`, pole: l.pole, order: l.startAge + 0.5, label: `Your ${l.pole === 'helping' ? 'strongest' : 'heaviest'} window · ${l.startYear} to ${l.endYear}`,
          lead: `The ${bare(persona(l.god))} rules this decade and your ${GATES[match.gateKey]} both.`, text: t });
      } else future.push({ kind: 'decade', src: `GOD ${GOD_ID[l.god]} · decade_lines.${d}.${l.pole}.ahead`, order: l.startAge + 0.5, label: `${an(bare(persona(l.god)))} decade · ${l.startYear} to ${l.endYear}`, text: t });
    }
    future.sort((a, b) => a.order - b.order);
    const laterSeat = seats.some((p) => (p.gateKey === 'day' && age < 48) || (p.gateKey === 'hour' && age < 48));
    const notes = [];
    if (!laterSeat && seats.length && age < 48 && !(hourUnknown && HOUR_DOMAINS.has(d))) notes.push(`Your later gates hold no ${d} seat, so your decades set its course from here.`);
    if (d === 'Love') notes.push(age < 35 ? 'Love has no decade of its own. It is read from your Day Gate alone.' : 'Love has no decade of its own. The pattern your Day Gate set is the one your love life keeps.');
    else if (!future.length && !notes.length && seats.length) notes.push(age >= 48 ? `Your four gates have all opened, so ${OWN[d]} moves with your decades from here.` : `Your later gates hold no ${d} seat, so your decades set its course from here.`);
    if (hourUnknown && HOUR_DOMAINS.has(d)) notes.push(seats.length ? 'Your Hour Gate is closed. Add your birth hour to read your late chapter.' : `Your Hour Gate may hold a ${d} seat. Add your birth hour to read your late chapter.`);

    const gates = [...new Set(seats.map((p) => GATES[p.gateKey].replace(' Gate', '')))];
    return {
      domain: d, seats, lead, empty: !seats.length,
      headline: leadU?.headline || (seats.length ? null : content?.unruledHeadline?.[d] || null),
      count: seats.length ? `${seats.length} seat${seats.length > 1 ? 's' : ''} · ${gates.join(', ')}` : 'No seat · read from your decades',
      how, howSrc, headlineSrc: lead ? `POSITION ${lead.id} · domain_climb.${d}.headline` : `TEMPLATED tpl_domains · domain_unruled_headline.${d}`, pattern, past, future, notes,
    };
  });
  pages.sort((a, b) => b.seats.length - a.seats.length);
  return { age, birthYear, gateNow: GATE_ORDER[cur], hourUnknown, pages };
}
