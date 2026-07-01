// ===================================================================
// ELEMENTUM · D13 P1–P3 tile + ribbon content  (FILLER)
// ===================================================================
// Per owner decision, this copy is placeholder until the UI fixes the
// word budgets; production text (per stem × band — 30 templates) lands
// after. Element pole lines are intrinsic per element; hooks/ribbon use
// the reference demo's copy as filler. Thumbnails are the wireframe's
// chosen variants (in public/concept-arts/library/).
// ===================================================================

export const ENERGY_TILE = {
  metal: { hook: 'Your core — precision before intention.', pol: 'Refinement · the edge', art: 't_metal_1_s' },
  earth: { hook: 'The ground that feeds your edge.', pol: 'Stability · the centre', art: 't_earth_2_s' },
  water: { hook: 'Where your edge learns to flow.', pol: 'Flow · the descent', art: 't_water_5_s' },
  wood:  { hook: 'What your blade is for.', pol: 'Growth · the upward push', art: 't_wood_1_s' },
  fire:  { hook: 'The forge you borrow, never own.', pol: 'Radiance · the rising heat', art: 't_fire_1_s' },
};

// Prescription ribbon — swaps to the selected energy.
export const RIBBON_INTRO = {
  metal: 'Metal rules clarity and judgment — your dominant force, the edge that cuts to what is true.',
  earth: 'Earth rules stability and care — your strongest ally, the ground that steadies and feeds you.',
  water: 'Water rules depth and adaptability — the wisdom that flows around what it cannot move.',
  wood:  'Wood rules growth and vision — the upward push toward what your strength is for.',
  fire:  'Fire rules drive and urgency — scarce in you, a heat you visit rather than hold.',
};

// role → display config. "friction" DISPLAYS as "Friction" (concept-inventory
// canonical); the k-res / rl-res classes are the internal alias.
export const ROLE_CFG = {
  core:     { cls: 'k-core', rl: 'rl-core', label: 'Core' },
  catalyst: { cls: 'k-cat',  rl: 'rl-cat',  label: 'Catalyst' },
  friction: { cls: 'k-res',  rl: 'rl-res',  label: 'Friction' },
  missing:  { cls: 'k-miss', rl: 'rl-miss', label: 'Missing' },
  ally:     { cls: 'k-ally', rl: 'rl-ally', label: 'Ally' },
};

// CSS var name for each element's deep pigment (dominance-bar segments).
export const EL_DEEP = { metal: '--metalDeep', earth: '--earthDeep', water: '--waterDeep', wood: '--woodDeep', fire: '--fireDeep' };
