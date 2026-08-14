// ===================================================================
// ELEMENTUM · resolveVariant — archetype generation layer (REA_05 §9)
// ===================================================================
// Selects the band × tgPattern-specific reading for a chart, instead of
// always falling back to the generic `default`. Two surfaces:
//
//   1. blocks[].text  — variant object keyed {default | band | pattern |
//      band_pattern}. Fallback order (REA_05 §9):
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

import { getEnergyBand } from '../engine/index.js';
import { STEM_VARIANTS as VARIANTS } from './stemVariants.js';

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

// Select a chart's ×3 from a band-tagged pool (REA_16 §3 selection law):
// items tagged with this band first, then all-tagged items in pool order.
// An item is all-tagged when `bands` is the literal 'all' in EITHER spelling the
// schema's `string[] | 'all'` type allows — the bare string `bands: 'all'` or an
// array containing it (`['all']`, or a mixed array) — or when `bands` is missing,
// so legacy untagged ×3 arrays pass through intact.
const isAllTagged = (bands) => (Array.isArray(bands) ? bands.includes('all') : true);

export function selectPoolByBand(pool, band) {
  if (!Array.isArray(pool)) return [];
  const tagged = pool.filter(
    (it) => Array.isArray(it.bands) && it.bands.includes(band) && !it.bands.includes('all'),
  );
  const alls = pool.filter((it) => isAllTagged(it.bands));
  return [...tagged, ...alls].slice(0, 3);
}

// Merge the pre-generated archetypeKey variant (yourNature / gifts / shadows)
// over the stem baseline. Returns a baseline-shaped object, variant-enriched.
// gifts/shadows come back band-selected ×3 (winning pool → selectPoolByBand).
export function resolveArchetype(stem, baseline, chart) {
  if (!baseline) return baseline;
  // Variant lookup with a fallback chain (Group C) so a stem can ship concise
  // band/pattern variants instead of all 15 compounds:
  //   `${stem}_${band}_${pattern}` -> `${stem}_${band}` -> `${stem}_${pattern}` -> baseline
  // 庚's 15 full-compound keys still match on the first try (no regression).
  const band = getEnergyBand(chart?.dayMaster?.strength || 'moderate');
  const pattern = chart?.tgPattern || 'pure';
  let v = {};
  for (const k of [`${stem}_${band}_${pattern}`, `${stem}_${band}`, `${stem}_${pattern}`]) {
    if (VARIANTS[k]) { v = VARIANTS[k]; break; }
  }
  return {
    ...baseline,
    yourNature: { ...(baseline.yourNature || {}), ...(v.yourNature || {}) },
    gifts: selectPoolByBand((v.gifts && v.gifts.length) ? v.gifts : baseline.gifts, band),
    shadows: selectPoolByBand((v.shadows && v.shadows.length) ? v.shadows : baseline.shadows, band),
  };
}
