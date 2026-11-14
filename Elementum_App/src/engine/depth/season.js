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
import { branchBonds } from './chartDepth.js';
import { periodOf } from '../almanac/index.js';

const GATES = ['year', 'month', 'day', 'hour'];

function stateOf(chart, stem, hourUnknown) {
  const p = chart.pillars;
  const gates = GATES.filter((g) => !(hourUnknown && g === 'hour'));
  if (gates.some((g) => g !== 'day' && p[g].stem === stem)) return 'shown';
  if (gates.some((g) => (HIDDEN_STEMS[p[g].branch] || [])[0]?.s === stem)) return 'rooted';
  if (gates.some((g) => (HIDDEN_STEMS[p[g].branch] || []).slice(1).some((h) => h.s === stem))) return 'hidden';
  return 'absent';
}

// R4 A (2026-11-14): one coded condition from the 穷通宝鉴 text (research/qiongtong-conditions.json). The Day Master
// itself never counts as a stem on show or absent; 'optional' (酌用) is never a need.
function holds(code, chart, hourUnknown) {
  const [k, v] = code.split(':');
  const els = chart.elements || {}; const share = (e) => els[e]?.score || 0;
  switch (k) {
    case 'el_strong': return share(v) >= 0.3 || Object.keys(els).sort((a, b) => share(b) - share(a))[0] === v; // X旺, X多
    case 'el_weak': return share(v) <= 0.1;
    case 'dm_strong': return /strong/.test(chart.dayMaster?.strength || '');
    case 'dm_weak': return /weak/.test(chart.dayMaster?.strength || '');
    case 'frame': return branchBonds(chart, { hourUnknown }).some((b) => (b.type === '三合' || b.type === '半合') && String(b.en).includes(v));
    case 'shown': return stateOf(chart, v, hourUnknown) === 'shown';
    case 'absent': return stateOf(chart, v, hourUnknown) === 'absent';
    case 'half': {
      const day = chart.meta?.birthDate; const p = day ? periodOf('month', day) : null; if (!p?.end) return false;
      const t = (d) => new Date(`${d}T12:00:00`).getTime(); const first = t(day) < (t(p.start) + t(p.end)) / 2;
      return v === 'first' ? first : !first;
    }
    default: return false; // 'optional' and anything uncoded
  }
}
const met = (g, chart, hourUnknown) => !!g && g.when.every((c) => holds(c, chart, hourUnknown));

/** The season the Day Master was born into, what it asks for, and what the chart holds of it. */
export function seasonOf(chart, { hourUnknown = false } = {}) {
  const dm = chart.pillars.day.stem; const mb = chart.pillars.month.branch;
  const cell = SEASON_TABLE[dm]?.[mb]; if (!cell) return null;
  const gate = cell.gate || {};
  // a gated stem is asked for only when its condition holds; a conditional stem joins as support when it does
  const keep = (s) => !gate[s] || met(gate[s], chart, hourUnknown);
  const extra = Object.entries(gate).filter(([s, g]) => g.rank === 'conditional' && !cell.primary.includes(s) && !cell.secondary.includes(s) && met(g, chart, hourUnknown)).map(([s]) => s);
  const need = (stems, rank) => stems.map((s) => ({ stem: s, rank, god: getTenGod(dm, s)?.zh, state: stateOf(chart, s, hourUnknown), ...(gate[s] ? { when: gate[s].when } : {}) }));
  const asks = [...need(cell.primary.filter(keep), 'primary'), ...need([...cell.secondary.filter(keep), ...extra], 'secondary')];
  const asked = new Set(asks.map((a) => a.stem));
  return {
    dm, month: mb, monthName: cell.month,
    asks,
    // a condition met overrides the cell's avoid list (R4 research note)
    avoid: need(cell.avoid.filter((s) => !asked.has(s)), 'avoid'),
    conditional: cell.conditional.map((c) => ({ ...c, god: getTenGod(dm, c.stem)?.zh })),
  };
}
