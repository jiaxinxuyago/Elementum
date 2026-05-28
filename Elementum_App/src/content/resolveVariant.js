// ===================================================================
// ELEMENTUM · resolveVariant — archetype generation layer (DOC4 §9)
// ===================================================================
// Selects the band × tgPattern-specific reading for a chart, instead of
// always falling back to the generic `default`. Two surfaces:
//
//   1. blocks[].text  — variant object keyed {default | band | pattern |
//      band_pattern}. Fallback order (DOC4 §9):
//        band_pattern → band → pattern → default
//
//   2. yourNature / gifts / shadows — pre-generated per chart in
//      content/STEM_CARD_DATA.js, keyed by archetypeKey
//      (`${stem}_${band}_${tgPattern}`, e.g. "庚_concentrated_pure").
//      Merged over the stem baseline from archetypeSource.js; absent
//      keys fall back to baseline cleanly.
//
// band = getEnergyBand(chart.dayMaster.strength); pattern = chart.tgPattern.
// ===================================================================

import { getEnergyBand } from '../engine/calculator.js';
import { STEM_CARD_DATA as VARIANTS } from './STEM_CARD_DATA.js';

// Ordered fallback keys for a chart's band × pattern.
export function variantKeys(chart) {
  const band = getEnergyBand(chart?.dayMaster?.strength || 'moderate');
  const pattern = chart?.tgPattern || 'pure';
  return [`${band}_${pattern}`, band, pattern, 'default'];
}

// Resolve a {default | band | pattern | band_pattern} text object → string.
export function resolveText(textObj, chart) {
  if (!textObj) return '';
  for (const k of variantKeys(chart)) {
    if (textObj[k] != null && textObj[k] !== '') return textObj[k];
  }
  return textObj.default || '';
}

// Resolve a block → { label, text, variantKey } (variantKey for debugging/QA).
export function resolveBlock(block, chart) {
  if (!block) return null;
  const key = variantKeys(chart).find((k) => block.text?.[k] != null) || 'default';
  return { label: block.label, text: resolveText(block.text, chart), variantKey: key };
}

// The chart's archetypeKey (engine-computed; recompute defensively if absent).
export function archetypeKeyFor(stem, chart) {
  return chart?.archetypeKey
    || `${stem}_${getEnergyBand(chart?.dayMaster?.strength || 'moderate')}_${chart?.tgPattern || 'pure'}`;
}

// Merge the pre-generated archetypeKey variant (yourNature / gifts / shadows)
// over the stem baseline. Returns a baseline-shaped object, variant-enriched.
export function resolveArchetype(stem, baseline, chart) {
  if (!baseline) return baseline;
  const v = VARIANTS[archetypeKeyFor(stem, chart)] || {};
  return {
    ...baseline,
    yourNature: { ...(baseline.yourNature || {}), ...(v.yourNature || {}) },
    gifts: (v.gifts && v.gifts.length) ? v.gifts : baseline.gifts,
    shadows: (v.shadows && v.shadows.length) ? v.shadows : baseline.shadows,
  };
}
