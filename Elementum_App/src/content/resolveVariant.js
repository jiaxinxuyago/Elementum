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

// Select a chart's ×3 from a door-tagged pool (REA_02 §5h selection law).
// `doors` is the ordered list of function keys the chart opens for this pool
// (gifts: the catalyst energies in the manual's SEEK order; shadows: the
// friction energies, core first, in the EASE order). One item per door in
// that order, then the third slot from the FIRST door's second item (the
// heaviest energy of the set), then pool order as the last resort. With no
// doors at all (a Balanced chart hides its rails) the pool's first ×3 show.
export function selectPoolByDoor(pool, doors) {
  if (!Array.isArray(pool)) return [];
  const list = Array.isArray(doors) ? doors.filter(Boolean) : [];
  if (!list.length) return pool.slice(0, 3);
  const used = new Set();
  const out = [];
  const take = (door) => {
    const it = pool.find((x) => x.door === door && !used.has(x));
    if (it) { used.add(it); out.push(it); }
  };
  for (const d of list) { if (out.length >= 3) break; take(d); }
  for (const d of list) { if (out.length >= 3) break; take(d); }
  for (const it of pool) { if (out.length >= 3) break; if (!used.has(it)) { used.add(it); out.push(it); } }
  return out.slice(0, 3);
}

// Merge the pre-generated archetypeKey variant (yourNature / gifts / shadows)
// over the stem baseline. Returns a baseline-shaped object, variant-enriched.
// gifts/shadows come back door-selected ×3 (winning pool → selectPoolByDoor);
// `doors` = { gifts: [...fn keys], shadows: [...fn keys] } from the chart's
// roles (journeyData.poolDoors). Omitted → pool order (the Balanced fallback).
export function resolveArchetype(stem, baseline, chart, doors = {}) {
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
    gifts: selectPoolByDoor((v.gifts && v.gifts.length) ? v.gifts : baseline.gifts, doors.gifts),
    shadows: selectPoolByDoor((v.shadows && v.shadows.length) ? v.shadows : baseline.shadows, doors.shadows),
  };
}

// The core element screen's band mirror (BAND-C, owner slot ruling 2026-08-14;
// REA_03 §self_card). Band-grain only — the slot was ruled as a band statement,
// so unlike yourNature there is no stem baseline underneath it: an unauthored
// band means no card, and the screen simply omits it.
export function selfCardFor(stem, band) {
  return VARIANTS[`${stem}_${band}`]?.selfCard ?? null;
}
