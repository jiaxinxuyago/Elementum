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
// `doors` is the ordered list of doors the chart opens for this pool (the
// manual's SEEK order for gifts, EASE order for shadows), each `{ door,
// volume }` (a bare function key is accepted too). One chip per door, so the
// count follows the chart: two or three (owner R3, 2026-09-16). The face
// chosen through a door depends on the energy's volume (owner R1/R2): the
// pool's `echo` face (item[0] of the door, cut from the pair definition) by
// default; on a doubled door the second item is the `wide` face for gifts
// (an abundant catalyst) or the `excess` face for shadows (an abundant or
// dominant friction). With no doors at all (a Balanced chart) the pool's
// first ×3 show.
const BIG = new Set(['abundant', 'dominant']);
export function selectPoolByDoor(pool, doors, kind = 'gifts') {
  if (!Array.isArray(pool)) return [];
  const list = (Array.isArray(doors) ? doors : []).filter(Boolean)
    .map((d) => (typeof d === 'string' ? { door: d } : d));
  if (!list.length) return pool.slice(0, 3);
  const used = new Set();
  const out = [];
  const bigFace = kind === 'shadows' ? 'excess' : 'wide';
  for (const d of list) {
    if (out.length >= 3) break;
    const atDoor = pool.filter((x) => x.door === d.door);
    const cands = atDoor.filter((x) => !used.has(x));
    if (!cands.length) continue;
    // face: the station's tag, else by position (item[0] echo, item[1] the big face)
    const faceOf = (x) => x.face || (atDoor.indexOf(x) === 0 ? 'echo' : bigFace);
    let pick = null;
    if (BIG.has(d.volume)) pick = cands.find((x) => faceOf(x) === bigFace) || null;
    if (!pick) pick = cands.find((x) => faceOf(x) === 'echo') || cands[0];
    used.add(pick); out.push(pick);
  }
  // Floor of two (owner R3): when only one door is open (a dominant core
  // with every other unwanted energy absent), the open door's other face
  // fills the second slot.
  if (out.length === 1) {
    const other = pool.find((x) => x.door === list[0]?.door && !used.has(x)) || pool.find((x) => !used.has(x));
    if (other) out.push(other);
  }
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
    gifts: selectPoolByDoor((v.gifts && v.gifts.length) ? v.gifts : baseline.gifts, doors.gifts, 'gifts'),
    shadows: selectPoolByDoor((v.shadows && v.shadows.length) ? v.shadows : baseline.shadows, doors.shadows, 'shadows'),
  };
}

// The core element screen's band mirror (BAND-C, owner slot ruling 2026-08-14;
// REA_03 §self_card). Band-grain only — the slot was ruled as a band statement,
// so unlike yourNature there is no stem baseline underneath it: an unauthored
// band means no card, and the screen simply omits it.
export function selfCardFor(stem, band) {
  return VARIANTS[`${stem}_${band}`]?.selfCard ?? null;
}
