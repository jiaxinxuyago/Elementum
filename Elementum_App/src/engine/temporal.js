// ===================================================================
// ELEMENTUM · engine/temporal.js
// ===================================================================
// Temporal energy projection for the Today screen's MONTH and YEAR tabs
// (DOC5 §10). Pure computation — no content strings, no LLM.
//
// "All energy scores — daily, monthly, annual — are computed by
//  engine/temporal.js. The scoring function weights each periodic
//  element positively for elements matching the user's catalysts and
//  negatively for elements matching resistances." (DOC5 §10)
//
// Day-stem math replicates calculator.js exactly: anchor 1900-01-01,
// dayStem = HS[daysElapsed % 10]. We reuse the calculator's exported
// constants so the two never drift.
// ===================================================================

import { HS, EB, STEM_ELEM, BRANCH_ELEM } from './calculator.js';

const ANCHOR = new Date(1900, 0, 1);
const DAY_MS = 86400000;

// Five-element generating cycle: GEN[x] = the element x produces.
const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
// Inverse: GENERATOR_OF[x] = the element that produces x (its "resource").
const GENERATOR_OF = { Fire: 'Wood', Earth: 'Fire', Metal: 'Earth', Water: 'Metal', Wood: 'Water' };

// Calendar-month → dominant branch element via the BaZi solar calendar
// (months anchored on the seasonal branches). Index 0 = January.
//   Jan 丑 Earth · Feb 寅 Wood · Mar 卯 Wood · Apr 辰 Earth · May 巳 Fire
//   Jun 午 Fire · Jul 未 Earth · Aug 申 Metal · Sep 酉 Metal · Oct 戌 Earth
//   Nov 亥 Water · Dec 子 Water
const MONTH_BRANCH = ['丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子'];

// ───────────────────────────────────────────────────────────────────
// Day stem/branch + elements for any date (matches calculator.js:370–372).
// ───────────────────────────────────────────────────────────────────
export function dayPillar(date) {
  const days = Math.floor((date - ANCHOR) / DAY_MS);
  const stem = HS[((days % 10) + 10) % 10];
  const branch = EB[(((days + 10) % 12) + 12) % 12];
  return {
    stem, branch,
    stemElement: STEM_ELEM[stem],
    branchElement: BRANCH_ELEM[branch],
  };
}

// ───────────────────────────────────────────────────────────────────
// Derive the user's catalyst + resistance elements from the chart.
//   catalyst   — the helpful element (chart.catalyst, computed upstream).
//   resistance — heuristic: a strong Day Master is over-fed by its
//     resource element, so resource = resistance; a weak Day Master is
//     drained by its output element, so output = resistance.
// (Deterministic + defensible for the timeline coloring; not a full
//  classical favorable/unfavorable analysis.)
// ───────────────────────────────────────────────────────────────────
export function energyContext(chart) {
  const dmEl = chart?.dayMaster?.element || 'Metal';
  const strength = chart?.dayMaster?.strength || 'balanced';
  const isStrong = /strong/.test(strength) && !/weak/.test(strength);
  const catalyst = chart?.catalyst || null;
  const resistance = isStrong ? GENERATOR_OF[dmEl] : GEN[dmEl];
  return { catalyst, resistance, dmElement: dmEl };
}

// Score an element 0–100 relative to catalyst (+) and resistance (−).
export function elementScore(element, ctx) {
  let s = 50;
  if (ctx.catalyst && element === ctx.catalyst) s += 34;
  if (ctx.resistance && element === ctx.resistance) s -= 28;
  // The Day Master's own element reads as steady-but-neutral.
  if (element === ctx.dmElement && element !== ctx.catalyst) s += 6;
  return Math.max(10, Math.min(96, s));
}

export function flowLevel(score) {
  if (score >= 68) return 'high';
  if (score <= 34) return 'low';
  return 'neutral';
}

// ───────────────────────────────────────────────────────────────────
// Month calendar grid. Returns { weeks } where weeks is an array of
// 7-slot rows (null = leading/trailing pad), each cell:
//   { day, date, element, score, level, isToday }
// Week starts Monday (DOC5 §10 calendar header is Mon–Sun).
// ───────────────────────────────────────────────────────────────────
export function monthGrid(year, monthIdx, chart) {
  const ctx = energyContext(chart);
  const first = new Date(year, monthIdx, 1);
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  // JS getDay(): 0=Sun..6=Sat. Convert to Mon=0..Sun=6.
  const lead = (first.getDay() + 6) % 7;
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === monthIdx;

  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIdx, d);
    const { stemElement } = dayPillar(date);
    const score = elementScore(stemElement, ctx);
    cells.push({
      day: d, date, element: stemElement, score, level: flowLevel(score),
      isToday: isCurrentMonth && today.getDate() === d,
    });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return { weeks, ctx };
}

// ───────────────────────────────────────────────────────────────────
// Flow windows for the current month — contiguous runs of high / low days,
// summarised as date ranges (DOC5 §10 "High Flow / Clash Windows card").
// ───────────────────────────────────────────────────────────────────
export function flowWindows(year, monthIdx, chart) {
  const ctx = energyContext(chart);
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const runs = { high: [], low: [] };
  let cur = null;
  for (let d = 1; d <= daysInMonth; d++) {
    const { stemElement } = dayPillar(new Date(year, monthIdx, d));
    const lvl = flowLevel(elementScore(stemElement, ctx));
    if (lvl === 'high' || lvl === 'low') {
      if (cur && cur.level === lvl) cur.end = d;
      else { cur && runs[cur.level].push(cur); cur = { level: lvl, start: d, end: d }; }
    } else if (cur) { runs[cur.level].push(cur); cur = null; }
  }
  if (cur) runs[cur.level].push(cur);
  // Keep the 3 longest high runs + 2 longest low runs.
  const byLen = (a, b) => (b.end - b.start) - (a.end - a.start);
  return {
    high: runs.high.sort(byLen).slice(0, 3),
    low: runs.low.sort(byLen).slice(0, 2),
  };
}

// ───────────────────────────────────────────────────────────────────
// Year energy series — 12 months scored by their solar-month branch
// element (DOC5 §10 Year timeline). Returns array of
//   { monthIdx, label, element, score, level }
// ───────────────────────────────────────────────────────────────────
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function yearEnergy(chart) {
  const ctx = energyContext(chart);
  return MONTH_LABELS.map((label, i) => {
    const branch = MONTH_BRANCH[i];
    const element = BRANCH_ELEM[branch];
    const score = elementScore(element, ctx);
    return { monthIdx: i, label, element, score, level: flowLevel(score) };
  });
}
