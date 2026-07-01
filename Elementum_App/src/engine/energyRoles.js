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

import { CATALYST_MAP } from './calculator.js';

const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTL = { Wood: 'Earth', Earth: 'Water', Water: 'Fire', Fire: 'Metal', Metal: 'Wood' };

// Relation of element X to the Day Master element D (internal names).
function relationOf(X, D) {
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

    if (band === 'balanced') {
      if (pair.includes(X) && X !== dmEl) set.add('catalyst');
      else if ((rel === 'resource' || rel === 'self') && X !== dmEl) set.add('ally');
    } else {
      if (favor.catalyst.includes(rel)) set.add('catalyst');
      if (favor.friction.includes(rel)) set.add('friction');
    }

    const roles = ROLE_ORDER.filter((r) => set.has(r));
    const rec = { roles };
    if (X === majorEl && set.has('catalyst')) rec.major = 'catalyst';
    out[X] = rec;
  }
  return out;
}
