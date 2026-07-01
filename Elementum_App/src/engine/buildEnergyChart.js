// ===================================================================
// ELEMENTUM · buildEnergyChart  (D13 §3 data contract)
// ===================================================================
// Assembles the single object that drives the dominance wheel + energy
// tiles, from a calculated BaZi chart. Everything visible on P1–P3 is
// rendered from this — never from hand-authored markup.
//   → { dayMaster, stem, band, energies: [{ el, presence, roles, major? }] }
// energies are sorted presence-descending (tie-break metal→earth→water→
// wood→fire) to match the shelf order; the wheel re-seats via
// applyDominanceRules. Spec: reading/HANDOFF_PART1.md §3.
// ===================================================================

import { getEnergyBand, resolveElementFaces } from './calculator.js';
import { classifyEnergyRoles } from './energyRoles.js';
import { EL_ORDER } from './dominanceWheel.js';

const STEM_ID = {
  '甲': 'jia', '乙': 'yi', '丙': 'bing', '丁': 'ding', '戊': 'wu',
  '己': 'ji', '庚': 'geng', '辛': 'xin', '壬': 'ren', '癸': 'gui',
};
const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };

// Round five presence values to integers that still sum to exactly 100
// (largest-remainder), so the dominance bar reads as a true share-of-whole.
function roundTo100(frac) {
  const keys = Object.keys(frac);
  const scaled = keys.map((k) => ({ k, v: frac[k] * 100 }));
  const floored = scaled.map((s) => ({ k: s.k, base: Math.floor(s.v), rem: s.v - Math.floor(s.v) }));
  let deficit = 100 - floored.reduce((s, f) => s + f.base, 0);
  floored.sort((a, b) => b.rem - a.rem);
  for (let i = 0; i < floored.length && deficit > 0; i++, deficit--) floored[i].base += 1;
  const out = {};
  floored.forEach((f) => { out[f.k] = f.base; });
  return out;
}

export function buildEnergyChart(chart) {
  const dmEl = chart.dayMaster.element;
  const band = getEnergyBand(chart.dayMaster.strength);

  // presence % from composition scores (0–1 fraction → integer %, sum 100)
  const frac = {};
  let sum = 0;
  for (const lc of EL_ORDER) {
    const s = chart.elements?.[CAP[lc]]?.score ?? 0;
    frac[lc] = s; sum += s;
  }
  if (sum > 0) for (const lc of EL_ORDER) frac[lc] /= sum;
  const presencePct = sum > 0 ? roundTo100(frac) : Object.fromEntries(EL_ORDER.map((lc) => [lc, 0]));

  // classifier works in capitalized element names
  const presenceCap = Object.fromEntries(EL_ORDER.map((lc) => [CAP[lc], presencePct[lc]]));
  const roleMap = classifyEnergyRoles({ dmEl, band, presence: presenceCap });

  const energies = EL_ORDER
    .map((lc) => {
      const El = CAP[lc];
      const rec = roleMap[El];
      // v2.1 — polarity-aware faces (the 1–2 Ten-God personas present for this
      // element, dominant-led) + a polarity-correct leadGod for the reading.
      const faceInfo = resolveElementFaces(El, chart.dayMaster.stem, chart.pillars);
      return {
        el: lc,
        presence: presencePct[lc],
        roles: rec.roles,
        faces: faceInfo.presentFaces,   // [{ god, weight, polarity }]
        leadGod: faceInfo.leadGod,      // dominant present face (DM-polarity fallback for ghost)
        absentGod: faceInfo.absentGod,  // the absent polarity's god, when exactly one is present
        ...(rec.major ? { major: rec.major } : {}),
      };
    })
    .sort((a, b) => (b.presence - a.presence) || (EL_ORDER.indexOf(a.el) - EL_ORDER.indexOf(b.el)));

  return {
    dayMaster: STEM_ID[chart.dayMaster.stem] || 'geng',
    stem: chart.dayMaster.stem,
    band,
    energies,
  };
}
