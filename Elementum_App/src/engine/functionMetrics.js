// ===================================================================
// ELEMENTUM · THE FUNCTION METRICS · the derivation (owner 2026-10-14; REA_19)
// ===================================================================
// Three bars per energy page, computed from the chart, never authored:
//   bar 1 and bar 2 · the two gods of the function's family · the level from
//     that god's share of the chart (the energy's presence × the god's face
//     share, 0 to 100) on the ruled steps; a god with no face on the chart
//     reads level 1 (shown, not hidden: a missing god is a fact of the chart)
//   bar 3 · the style bar · the level from the energy's volume, or for the
//     core from its band; two plain ends, no better end
// No gloss line (owner 2026-10-15: static bars; the level glosses retired in
// the station). The words come from the station's FUNCTION_METRICS axis (transcribed
// in src/content/metrics.js), read by pole (catalyst · friction) and level
// band (low 1 to 2 · mid 3 · high 4 to 5); the style bar reads by its end.
// Pure: takes the journey model's energy row and returns plain data.
// ===================================================================
import { FUNCTION_METRICS, FUNCTION_METRIC_SCALE as SCALE } from '../content/metrics.js';
import { GOD_FN, K2_FUNCTIONS } from '../content/k2.js';

const FN_NAME = Object.fromEntries(K2_FUNCTIONS.map((f) => [f.key, f.label]));

/** The level (1 to 5) of a god's share of the chart on the ruled steps. */
export function traitLevel(share) {
  const s = Math.max(0, Number(share) || 0);
  const [s1, s2, s3, s4] = SCALE.trait_share_steps;
  if (s <= s1) return 1;
  if (s <= s2) return 2;
  if (s <= s3) return 3;
  if (s <= s4) return 4;
  return 5;
}

/** The style bar's level: the energy's volume, or the core's band. */
export function styleLevel(r, band) {
  if (r.isCore) {
    if (r.coreExcess) return SCALE.style_core_band.OverfueledExcess;
    return SCALE.style_core_band[band] ?? SCALE.style_core_band.Balanced;
  }
  return SCALE.style_volume[r.volume] ?? 3;
}

export const bandOf = (level) => (level <= 2 ? 'low' : level === 3 ? 'mid' : 'high');

/**
 * functionMetrics(r, band): r is a journey-model energy row (el, presence,
 * isCore, coreExcess, role, volume, faces [{god, share}]); band is the core's
 * reading band. Returns { function, pole, bars: [{key, label, kind, level,
 * band, god?, persona?, share?, ends?}] } or null when the function
 * is unknown.
 */
export function functionMetrics(r, band) {
  if (!r) return null;
  const fnKey = GOD_FN[r.god];
  const fnName = FN_NAME[fnKey];
  const spec = fnName && FUNCTION_METRICS[fnName];
  if (!spec) return null;
  const pole = (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst';
  const faceShare = (god) => { const f = (r.faces || []).find((x) => x.god === god); return f ? f.share : 0; };
  const bars = spec.bars.map((b) => {
    if (b.style) {
      const level = styleLevel(r, band);
      const key = bandOf(level);
      return { key: b.key, label: b.label, kind: 'style', ends: b.ends, level, band: key };
    }
    const share = Math.round((Number(r.presence) || 0) * faceShare(b.god) / 100);
    const level = traitLevel(share);
    const key = bandOf(level);
    return { key: b.key, label: b.label, kind: 'trait', god: b.god, persona: b.persona, share, level, band: key };
  });
  return { function: fnKey, functionLabel: fnName, pole, bars };
}
