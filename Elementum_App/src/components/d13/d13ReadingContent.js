// ===================================================================
// ELEMENTUM · D13 Part 2 — reading-page content (TEMPLATED FILLER)
// ===================================================================
// Copy for the reading destinations (P4 Day Master card, P6/P7 energy
// cards). Structure is data-driven from the engine; this prose is
// exemplar/templated filler to be polished later (the 庚 + Earth/Fire
// entries match the design exactly). Keyed by CJK day-master stem and by
// element id. Internal classifier vocabulary is never surfaced here.
// ===================================================================

// ── P4 · Day Master card ──────────────────────────────────────────
// claim 1 is always the identity inscription (rendered from buildIdentity);
// these supply claims 2–3 + the "how your edge is built · R+E" layer.
export const DM_READING = {
  '庚': {
    claims: [
      'Being vague feels worse to you than being wrong.',
      'People come to you when they need the unsoftened truth.',
    ],
    edge: 'Yang Metal tempered by spring wood — strength that grew against resistance, not in its absence.',
  },
  '辛': {
    claims: [
      'You notice the flaw everyone else has agreed to overlook.',
      'Precision is how you show care — even when it reads as cool.',
    ],
    edge: 'Yin Metal refined under pressure — an edge made keen by polishing, not by force.',
  },
  '甲': {
    claims: [
      'You would rather stand alone upright than bend to belong.',
      'People lean on the structure you build without noticing it is yours.',
    ],
    edge: 'Yang Wood grown toward light — a spine that rose by reaching, season over season.',
  },
  '乙': {
    claims: [
      'You bend where others break, and arrive intact.',
      'You find the one opening in a wall and grow through it.',
    ],
    edge: 'Yin Wood that wins by yielding — resilience dressed as softness.',
  },
  '丙': {
    claims: [
      'You give warmth before you are asked, and rarely count the cost.',
      'A room reads its mood from you before you say a word.',
    ],
    edge: 'Yang Fire that gives without dimming — radiance steadied by what it warms.',
  },
  '丁': {
    claims: [
      'You keep a small, exact flame the wind has never found.',
      'You would rather light one person truly than a crowd dimly.',
    ],
    edge: 'Yin Fire kept close — a focused heat that endures by staying contained.',
  },
  '戊': {
    claims: [
      'You become the ground others stand on without being asked.',
      'When plans wobble, yours is the version everyone quietly adopts.',
    ],
    edge: 'Yang Earth that holds its shape — weight that becomes shelter under load.',
  },
  '己': {
    claims: [
      'You make things grow by tending, not by forcing.',
      'People feel steadier after time with you and cannot say why.',
    ],
    edge: 'Yin Earth that nourishes quietly — fertile ground that asks for no credit.',
  },
  '壬': {
    claims: [
      'You see the whole current while others watch the wave.',
      'You move around obstacles rather than through them, and still arrive first.',
    ],
    edge: 'Yang Water that carves by patience — force that wins by not insisting.',
  },
  '癸': {
    claims: [
      'You read the room a beat before it reveals itself.',
      'You reach people through the small, quiet door, not the loud one.',
    ],
    edge: 'Yin Water that finds every opening — perception that travels where pressure cannot.',
  },
};

// generic fallback (should not normally trigger — all 10 stems are covered)
export const DM_READING_FALLBACK = {
  claims: [
    'You carry one quality so consistently that others organize around it.',
    'People come to you for the thing you do without trying.',
    'Your strength was shaped by what it had to push against.',
  ],
  edge: 'An edge forged against resistance — strength that grew in friction, not in ease.',
};
