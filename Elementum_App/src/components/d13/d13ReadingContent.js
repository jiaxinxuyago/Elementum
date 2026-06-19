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

// ── P6/P7 · energy reading cards ──────────────────────────────────
// Keyed by element (the card reads "{Element} in you …"). persona + tail
// build the persona line; r = "what it says about you · R", x = "what to
// do / borrow · X", gate = the locked Seeker layer. Earth + Fire match the
// design exemplars; metal/wood/water are templated filler. Hero art is the
// thumbnail-library wash variant.
export const ENERGY_CONTENT = {
  earth: {
    persona: 'The Alchemist',
    tail: "nourishment that transmutes. It's the ground your edge is forged on.",
    r: 'You steady people without meaning to. When plans wobble, yours is the version everyone quietly adopts.',
    x: 'Build on it deliberately: routines, places, people that ground you sharpen you. Lean here when Fire-seasons burn.',
    gate: { label: 'Seeker — the full Alchemist reading', body: 'Where this nourishment turns to over-protection · how it shapes your work and bonds · the season it peaks.' },
    art: '/concept-arts/library/t_earth_2_w.png',
  },
  fire: {
    persona: 'The General',
    tail: "pressure that doesn't grant permission. You don't carry it; you meet it.",
    r: 'Urgency is never your idea — it arrives from outside, and it costs you more than it costs others.',
    x: "You can't store Fire, but you can visit it: deadlines chosen on purpose, heat in small doses, one bold hour — not a bold life.",
    gate: { label: 'Seeker — the cultivation practice', body: 'The season-by-season practice for a chart that runs cold — when to borrow heat, when to let it pass.' },
    art: '/concept-arts/library/t_fire_1_w.png',
  },
  metal: {
    persona: 'The Arbiter',
    tail: 'judgment that cuts clean. It is the edge the rest of you is organized around.',
    r: 'You name the thing others circle. People trust your read because you do not soften it to be liked.',
    x: 'Spend it where a clear line helps and hold it where warmth matters more — precision lands best when chosen, not constant.',
    gate: { label: 'Seeker — the full Arbiter reading', body: 'Where clarity turns to coldness · how it shapes your work and bonds · the season it sharpens.' },
    art: '/concept-arts/library/t_metal_1_w.png',
  },
  wood: {
    persona: 'The Cultivator',
    tail: 'growth that reaches. It is how you turn pressure into a direction.',
    r: 'You build toward something even at rest. Given a constraint, you find the one way through and grow along it.',
    x: 'Point it at a long arc, not a quick win — your strength compounds when it is planted, not when it is spent.',
    gate: { label: 'Seeker — the full Cultivator reading', body: 'Where ambition turns to overreach · how it shapes your work and bonds · the season it flowers.' },
    art: '/concept-arts/library/t_wood_1_w.png',
  },
  water: {
    persona: 'The Strategist',
    tail: 'depth that moves unseen. It is the patience underneath your decisiveness.',
    r: 'You read the current before the wave. You reach what you want around obstacles, not through them.',
    x: 'Trust the slow route when the fast one is loud — your advantage is seeing two moves ahead, not moving first.',
    gate: { label: 'Seeker — the full Strategist reading', body: 'Where depth turns to withholding · how it shapes your work and bonds · the season it runs deep.' },
    art: '/concept-arts/library/t_water_1_w.png',
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
