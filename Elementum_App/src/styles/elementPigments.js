// ─────────────────────────────────────────────────────────────────────────────
// STYLES · element → pigment key
// ─────────────────────────────────────────────────────────────────────────────
// Canonical map from element name to pigment key (see `pigments` in tokens).
// Accepts BOTH the engine's title-case element names ('Metal') and lowercase
// ('metal') so every call style resolves. Replaces ~11 per-file copies that had
// started to drift (some title-case only, VisualTile had both).
// ─────────────────────────────────────────────────────────────────────────────

export const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
  metal: 'metal', wood: 'wood', fire: 'fire', earth: 'earth', water: 'water',
};
