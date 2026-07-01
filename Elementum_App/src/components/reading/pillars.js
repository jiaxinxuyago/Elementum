// ===================================================================
// ELEMENTUM · D13 Part 2 — 八字 pillar view-model (P5)
// ===================================================================
// Turns the engine chart into the four-pillar grid the design renders:
// each pillar carries its stem + branch (with element class for the icon
// + tint) and the branch's hidden stems (藏干) — canonical BaZi data, not
// chart-specific. The Hour pillar reports an unset state until birth time
// is captured.
// ===================================================================

import { STEM_ELEM, BRANCH_ELEM, HIDDEN_STEMS } from '../../engine/index.js';
import { ELEMENT_TO_PIGMENT } from '../../styles/elementPigments.js';

// Pigment key for a stem / branch, derived from the engine's canonical element
// maps — no local element tables here, so the data lives in exactly one place
// (previously duplicated as lowercase copies that had begun to drift).
export const stemEl = (s) => (STEM_ELEM[s] ? ELEMENT_TO_PIGMENT[STEM_ELEM[s]] : null);
export const branchEl = (b) => (BRANCH_ELEM[b] ? ELEMENT_TO_PIGMENT[BRANCH_ELEM[b]] : null);
// 藏干 — the stems concealed in each Earthly Branch, each with its pigment key.
export const hiddenStems = (b) => (HIDDEN_STEMS[b] || []).map((h) => ({ stem: h.s, el: stemEl(h.s) }));

// → [{ cap, key, self, unset, stem, stemEl, branch, branchEl, hidden:[{stem,el}] }]
export function buildPillars(chart, hourUnknown) {
  const p = (chart && chart.pillars) || {};
  const cols = [
    { cap: 'Year', key: 'year', self: false },
    { cap: 'Month', key: 'month', self: false },
    { cap: 'Day · Self', key: 'day', self: true },
    { cap: 'Hour', key: 'hour', self: false },
  ];
  return cols.map(({ cap, key, self }) => {
    const pi = p[key] || {};
    const stem = pi.stem || null;
    const branch = pi.branch || null;
    const unset = key === 'hour' && (hourUnknown || !stem || !branch);
    return {
      cap, key, self, unset,
      stem, stemEl: stem ? stemEl(stem) : null,
      branch, branchEl: branch ? branchEl(branch) : null,
      hidden: unset ? [] : hiddenStems(branch),
    };
  });
}
