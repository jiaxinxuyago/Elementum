// ===================================================================
// ELEMENTUM · D13 Part 2 — 八字 pillar view-model (P5)
// ===================================================================
// Turns the engine chart into the four-pillar grid the design renders:
// each pillar carries its stem + branch (with element class for the icon
// + tint) and the branch's hidden stems (藏干) — canonical BaZi data, not
// chart-specific. The Hour pillar reports an unset state until birth time
// is captured.
// ===================================================================

const STEM_EL = {
  '甲': 'wood', '乙': 'wood', '丙': 'fire', '丁': 'fire', '戊': 'earth',
  '己': 'earth', '庚': 'metal', '辛': 'metal', '壬': 'water', '癸': 'water',
};
const BRANCH_EL = {
  '寅': 'wood', '卯': 'wood', '巳': 'fire', '午': 'fire',
  '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '申': 'metal', '酉': 'metal', '子': 'water', '亥': 'water',
};
// 藏干 — the stems concealed in each Earthly Branch (principal → residual).
const HIDDEN_STEMS = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
};

export const stemEl = (s) => STEM_EL[s] || null;
export const branchEl = (b) => BRANCH_EL[b] || null;
export const hiddenStems = (b) => (HIDDEN_STEMS[b] || []).map((s) => ({ stem: s, el: STEM_EL[s] || null }));

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
