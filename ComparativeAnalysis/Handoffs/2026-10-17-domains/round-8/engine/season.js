// ===================================================================
// ELEMENTUM · season (HANDOFF DRAFT, not in the app) — 调候 by 穷通宝鉴, owner E3 (2026-10-17)
// ===================================================================
// seasonOf(chart) reads the Day Master's cell for its birth month from the
// sourced table (research/qiongtong-tiaohou.json: the Wikisource text, checked
// against 古文岛, 徐乐吾's 造化元钥评注 and the common summary table). Each
// stem the season asks for is read against the chart:
//   shown   on a year, month or hour stem (透)
//   rooted  the main stem of a branch
//   hidden  a middle or residual stem only
//   absent  nowhere
// The text's conditional stems (a fire frame, a stem on show) are returned
// with their condition, never folded into the main list.
// ===================================================================

import { getTenGod, HIDDEN_STEMS } from '../../../../../Elementum_App/src/engine/calculator.js';
import fs from 'node:fs';

const TABLE = JSON.parse(fs.readFileSync(new URL('../../research/qiongtong-tiaohou.json', import.meta.url), 'utf8')).table;
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
  const cell = TABLE[dm]?.[mb]; if (!cell) return null;
  const need = (stems, rank) => stems.map((s) => ({ stem: s, rank, god: getTenGod(dm, s)?.zh, state: stateOf(chart, s, hourUnknown) }));
  return {
    dm, month: mb, monthName: cell.month,
    asks: [...need(cell.primary, 'primary'), ...need(cell.secondary || [], 'secondary')],
    avoid: need(cell.avoid || [], 'avoid'),
    conditional: (cell.conditional || []).map((c) => ({ ...c, god: getTenGod(dm, c.stem)?.zh })),
    quote: cell.quote, disagreement: cell.disagreement || null, summaryTable: cell.summary_table || null,
  };
}
