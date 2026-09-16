// ===================================================================
// ELEMENTUM · Favorable-element role classifier  (D13, internal)
// ===================================================================
// Turns a chart into each energy's calibration roles for the dominance
// wheel + energy tiles. Spec + proof: reading/D13_ROLE_CLASSIFIER.md.
//
// INTERNAL VOCABULARY — NEVER SURFACED. The relation names
// (self/resource/output/wealth/officer) and the 用神/忌神 rule are
// computation scaffolding only. The UI exposes solely the *roles*
// (core/catalyst/friction/missing/ally) as glyphs, and — deeper, in
// P6/P7 — the personas + official Ten-God names. No engine taxonomy
// ever reaches a user-facing string.
// ===================================================================

import { CATALYST_MAP, getEnergyBand } from './calculator.js';

// ── VALENCE × VOLUME (owner rulings 2026-09-16, REA_02 §5h) ─────────────
// A role is valence (wanted / unwanted, from the band) AND volume (how much
// of the energy the chart holds). Tiers ruled from the presence distribution
// over 30 years of charts: absent ≤0.5 · thin ≤10 · present · abundant ≥20 ·
// dominant ≥40 (percent of composition).
export const VOLUME = { absent: 0.5, thin: 10, abundant: 20, dominant: 40 };
export function volumeOf(presence) {
  const p = Number(presence) || 0;
  if (p <= VOLUME.absent) return 'absent';
  if (p <= VOLUME.thin) return 'thin';
  if (p >= VOLUME.dominant) return 'dominant';
  if (p >= VOLUME.abundant) return 'abundant';
  return 'present';
}

// The band the reading runs on. The strength band is the base; Balanced is
// kept only behind a guard (owner R5): moderate strength AND no non-core
// energy abundant. A moderate chart with an abundant energy falls to the
// nearest band: an abundant feeder or peer (resource / self) props the body
// → concentrated; an abundant drainer or controller → open.
export function resolveBand({ strength, dmEl, presence }) {
  const base = getEnergyBand(strength);
  if (base !== 'balanced') return base;
  let top = null;
  for (const [X, p] of Object.entries(presence || {})) {
    if (X === dmEl) continue;
    if ((p ?? 0) >= VOLUME.abundant && (!top || p > top.p)) top = { X, p };
  }
  if (!top) return 'balanced';
  const rel = relationOf(top.X, dmEl);
  return (rel === 'resource' || rel === 'self') ? 'concentrated' : 'open';
}

const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTL = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };

// Relation of element X to the Day Master element D (internal names).
// Exported for reuse by UI vocabulary layers (journeyData) so the family
// classification lives in exactly one place — capitalized element keys.
export function relationOf(X, D) {
  if (X === D) return 'self';
  if (GEN[X] === D) return 'resource';  // X generates D
  if (GEN[D] === X) return 'output';     // D generates X
  if (CTL[D] === X) return 'wealth';     // D controls X
  if (CTL[X] === D) return 'officer';    // X controls D
  return 'self';
}

// Favorable / unfavorable relation sets per band (用神 strong/weak logic).
const BAND_FAVOR = {
  concentrated: { catalyst: ['output', 'wealth', 'officer'], friction: ['self', 'resource'] },
  open:         { catalyst: ['resource', 'self'], friction: ['output', 'wealth', 'officer'] },
  // balanced: provisional gentle default — catalyst = the CATALYST_MAP pair,
  // no friction, supportive non-catalysts → ally. (Owner sign-off pending.)
  balanced:     { catalyst: [], friction: [] },
};

const MISSING_EPS = 0.5; // presence at/under this (%) reads as Missing

// roles ordering in the output array — matches the wireframe demo
// (e.g. metal → [core, friction]; fire → [missing, catalyst]).
const ROLE_ORDER = ['core', 'missing', 'catalyst', 'friction', 'ally'];

/**
 * classifyEnergyRoles({ dmEl, band, presence })
 *   dmEl     — Day Master element, capitalized ('Metal' …)
 *   band     — 'concentrated' | 'balanced' | 'open'
 *   presence — { Metal: 42, Earth: 28, … } in % (0–100)
 * → { Metal: { roles:[…], major?:'catalyst' }, … }  (capitalized keys)
 */
export function classifyEnergyRoles({ dmEl, band, presence }) {
  const els = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
  const favor = BAND_FAVOR[band] || BAND_FAVOR.balanced;

  // major catalyst = primary favorable from CATALYST_MAP (skip if it is the DM itself)
  const pair = (CATALYST_MAP[dmEl] && CATALYST_MAP[dmEl][band]) || [];
  const majorEl = pair[0] === dmEl ? pair[1] : pair[0];

  const out = {};
  for (const X of els) {
    const rel = relationOf(X, dmEl);
    const set = new Set();

    if (X === dmEl) set.add('core');
    if ((presence?.[X] ?? 0) <= MISSING_EPS) set.add('missing');
    const volume = volumeOf(presence?.[X] ?? 0);

    if (band === 'balanced') {
      if (pair.includes(X) && X !== dmEl) set.add('catalyst');
      else if ((rel === 'resource' || rel === 'self') && X !== dmEl) set.add('ally');
    } else {
      if (favor.catalyst.includes(rel)) set.add('catalyst');
      if (favor.friction.includes(rel)) set.add('friction');
    }
    // The excess override (owner R1, 渊海子平 太过): a non-core energy at the
    // dominant tier is unwanted whatever the band says — too much Earth
    // buries Metal, too much Metal muddies Water. Valence flips; the
    // reading speaks it through the pair's excess line.
    let excess = false;
    if (X !== dmEl && volume === 'dominant') {
      set.delete('catalyst'); set.delete('ally'); set.add('friction'); excess = true;
    }

    const roles = ROLE_ORDER.filter((r) => set.has(r));
    const rec = { roles, volume };
    if (excess) rec.excess = true;
    if (X === majorEl && set.has('catalyst')) rec.major = 'catalyst';
    out[X] = rec;
  }
  return out;
}
