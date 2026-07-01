// ===================================================================
// ELEMENTUM · Dominance-wheel geometry rule  (D13)
// ===================================================================
// The single rule that governs every Five-Energies wheel: disk SIZE
// encodes how dominant an energy is, disk POSITION encodes its rank.
// Both derive from one input per energy — its presence % (0–100).
// Spec: reading/DOMINANCE_WHEEL_RULES.md. Ported verbatim from reading-v5.js
// so the wheel, the P2 dissolve end-state, and any future surface
// share one implementation.
// ===================================================================

export const D_MIN = 40;          // legibility floor — smallest disk that still holds icon + number
export const D_MAX = 64;          // diameter of the dominant energy
export const RING_ANGLES = [-90, -18, 54, 126, 198]; // seat 0 = top (12 o'clock), then clockwise
export const EL_ORDER = ['metal', 'earth', 'water', 'wood', 'fire']; // tie-break order

// Wheel coordinate frame (base units; a wheel multiplies by its own scale).
export const GEOM = { cx: 170, cy: 160, r: 132 };

// generation cycle (相生): metal → water → wood → fire → earth → metal
export const SHENG = [
  ['metal', 'water'], ['water', 'wood'], ['wood', 'fire'], ['fire', 'earth'], ['earth', 'metal'],
];

// d(p) = D_MIN + (D_MAX − D_MIN) · (p / pMax)  — linear in presence, normalized to the chart's largest.
export function diameterFor(p, pMax) {
  if (!(pMax > 0)) return D_MIN;
  const t = Math.max(0, Math.min(1, p / pMax));
  return Math.round(D_MIN + (D_MAX - D_MIN) * t);
}

// Enforce the rule on a node list: recompute every disk's diameter from its
// presence, and (in presence mode) re-seat largest-at-top, clockwise descending.
// Ties break by EL_ORDER. Mutates + returns the list (matches the reference).
export function applyDominanceRules(nodes, mode) {
  const pMax = nodes.reduce((m, n) => Math.max(m, n.p), 0);
  nodes.forEach((n) => { n.d = diameterFor(n.p, pMax); });
  if (mode === 'presence') {
    nodes.slice()
      .sort((a, b) => (b.p - a.p) || (EL_ORDER.indexOf(a.el) - EL_ORDER.indexOf(b.el)))
      .forEach((n, i) => { n.a = RING_ANGLES[i % RING_ANGLES.length]; });
  }
  return nodes;
}

const rad = (deg) => deg * Math.PI / 180;

// Center-relative pixel position of a node on a wheel of the given geometry.
export function nodePos(geom, n) {
  return { x: geom.cx + geom.r * Math.cos(rad(n.a)), y: geom.cy + geom.r * Math.sin(rad(n.a)) };
}
