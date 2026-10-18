// ===================================================================
// ELEMENTUM · season — 调候 by 穷通宝鉴, owner E3 (2026-10-17), W14 A
// ===================================================================
// seasonOf(chart) reads the Day Master's cell for its birth month from
// SEASON_TABLE (tools/build-season-table.mjs, from the sourced research
// table). Each stem the season asks for is read against the chart:
//   shown   on a year, month or hour stem (透)
//   rooted  the main stem of a branch
//   hidden  a middle or residual stem only
//   absent  nowhere
// The text's conditional stems (a fire frame, a stem on show) are returned
// with their condition, never folded into the main list.
// ===================================================================

import { getTenGod, HIDDEN_STEMS } from '../calculator.js';
import { SEASON_TABLE } from './seasonTable.js';

const GATES = ['year', 'month', 'day', 'hour'];

function stateOf(chart, stem, hourUnknown) {
  const p = chart.pillars;
  const gates = GATES.filter((g) => !(hourUnknown && g === 'hour'));
  if (gates.some((g) => g !== 'day' && p[g].stem === stem)) return 'shown';
  if (gates.some((g) => (HIDDEN_STEMS[p[g].branch] || [])[0]?.s === stem)) return 'rooted';
  if (gates.some((g) => (HIDDEN_STEMS[p[g].branch] || []).slice(1).some((h) => h.s === stem))) return 'hidden';
  return 'absent';
}

/** The season the Day Master was born into, what it asks for, and what the chart holds of it. */
export function seasonOf(chart, { hourUnknown = false } = {}) {
  const dm = chart.pillars.day.stem; const mb = chart.pillars.month.branch;
  const cell = SEASON_TABLE[dm]?.[mb]; if (!cell) return null;
  const need = (stems, rank) => stems.map((s) => ({ stem: s, rank, god: getTenGod(dm, s)?.zh, state: stateOf(chart, s, hourUnknown) }));
  return {
    dm, month: mb, monthName: cell.month,
    asks: [...need(cell.primary, 'primary'), ...need(cell.secondary, 'secondary')],
    avoid: need(cell.avoid, 'avoid'),
    conditional: cell.conditional.map((c) => ({ ...c, god: getTenGod(dm, c.stem)?.zh })),
  };
}
