// ===================================================================
// ELEMENTUM · journeyData — view-model for the Reveal → Catalogue journey
// ===================================================================
// Implements the design handoff's template contract
// (Design/Library/Elementum Design Handoff_JourneyCatalogue/template-data.json)
// against the live engine + the REA_02 locked vocabulary (v1.6):
//   · §4  keywords (v3 final)          · §5b relation nouns
//   · §5c condition/approach + panels  · §4b pole nouns + role verbs
//   · §6b journey rulings (keyword = representation; top-3 chips)
// The engine owns every number (buildEnergyChart / energyRoles); this file
// only translates engine output into locked display vocabulary. Per REA_02
// §6b item 6, element hook/tag/mean lines are element-generic interim copy
// pending the 50-cell authoring pass.
// ===================================================================

import { getEnergyBand, relationOf } from '../../engine/index.js';
import { TG_PERSONA, TG_DEFLINE, selfCardFor } from '../../content/index.js';
import { FEEDS, TAMES } from '../../content/cycles.js';
import { K2_CELLS, K2_FUNCTIONS, GOD_DOMAINS, GOD_FN } from '../../content/k2.js';
import { PAIR_CELLS } from '../../content/pairs.js';
import { FACE_CARD, ENERGY_TILE } from '../../content/reading/index.js';

// ── element basics ─────────────────────────────────────────────────
export const EL_NAME = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };
export const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };

// ── REA_02 locked vocabulary ───────────────────────────────────────
// §5b relation nouns (LOCKED 2026-07-16)
// RETIRED from all live surfaces (owner 2026-09-02, REA_02 §5b): the five
// FUNCTION nouns replace these as the elemental-relation vocabulary.
// Preserved as Codex ore only — nothing may render them.
export const RELATION_NOUN = { self: 'Core', resource: 'Root', wealth: 'Drive', output: 'Voice', officer: 'Duty' };
// The family → §5f function noun map — THE live vocabulary (bijection).
export const FAMILY_FN = { self: 'Body', resource: 'Mind', output: 'Expression', wealth: 'Action', officer: 'Order' };

// §5b-ii shadow nouns (LOCKED 2026-08-14) — the same force in excess. The
// relation noun is the CATALYST-form vocabulary; FRICTION advice surfaces
// speak through the shadow twin instead ("Earth is your Cage"), so the
// anatomy is never the thing the reading tells you to skip.
// RETIRED with §5b-ii (owner 2026-09-02): friction surfaces speak plain
// excess language in the function-noun register. Codex ore only.
export const SHADOW_NOUN = { self: 'Bubble', resource: 'Cage', wealth: 'Grind', output: 'Echo', officer: 'Weight' };

// (the SEAT_TEASE consequence clauses were retired by curation v6, owner
// 2026-08-19 — every teaser is now ONE quoted corpus line; see
// tpl_section_teasers for the live patterns)

// §4 keywords — v3 FINAL (adopted 2026-07-16)
export const KEYWORD = {
  '比肩': 'Independence', '劫财': 'Rivalry',
  '食神': 'Flow', '伤官': 'Brilliance',
  '偏财': 'Reach', '正财': 'Caution',
  '七杀': 'Force', '正官': 'Order',
  '偏印': 'Insight', '正印': 'Care',
};

// §4b pole nouns (v3-revised register)
export const POLE_CATALYST = {
  '比肩': 'Self-trust', '劫财': 'Daring', '食神': 'Grace', '伤官': 'Spark',
  '偏财': 'Momentum', '正财': 'Security', '七杀': 'Command', '正官': 'Integrity',
  '偏印': 'Vision', '正印': 'Wisdom',
};
export const POLE_FRICTION = {
  '比肩': 'Isolation', '劫财': 'Drain', '食神': 'Coasting', '伤官': 'Pushback',
  '偏财': 'Scatter', '正财': 'Hoarding', '七杀': 'Harshness', '正官': 'Rigidity',
  '偏印': 'Distance', '正印': 'Comfort',
};

// §5c strength terms + remedy verbs (LOCKED 2026-07-16)
export const CONDITION = { concentrated: 'Overfueled', balanced: 'Balanced', open: 'Underfueled' };
export const APPROACH = { concentrated: 'Channel', balanced: null, open: 'Refill' };

// §5c definition lines (mandatory on first surfacing)
export const DEFLINE = {
  Overfueled: 'More fuel comes in than your core burns — the surplus wants somewhere to go. Built into your chart, not today’s mood.',
  Balanced: 'Intake and burn hold each other — the condition the other two work toward.',
  Underfueled: 'Your core burns more than it takes in — the right intake is what your chart asks for. Built in, not a mood.',
  Channel: 'Give your extra force a place to go — aim it, don’t store it. The two lists below are where it goes.',
  Refill: 'Take in what feeds you — intake isn’t a crutch, it’s your engine. The two lists below are where it comes from.',
};

// ── Round 2 (2026-07-23) ───────────────────────────────────────────
// Family one-liners (locked wording). Retired from the dot card by the
// minimal-card ruling (owner 2026-09-01); preserved here as Codex ore
// for the family-relations chapter.
export const FAMILY_LINE = {
  self: 'This energy is you — your identity and your footing among equals.',
  resource: 'What feeds and backs you — the support and learning you run on.',
  wealth: 'What you reach for and hold — your reward, ambition, and desire.',
  output: 'What you put out — your expression, talent, and voice.',
  officer: 'What tests and shapes you — the pressure and duty you answer to.',
};

// §4b adjective chips (v3 register), role-conditioned: catalyst-pole for
// catalyst-side elements, friction-pole for friction-side (incl. core excess).
export const ADJ_CATALYST = {
  '比肩': ['Self-reliant', 'Steady', 'Unshakeable'], '劫财': ['Bold', 'Fired-up', 'Fearless'],
  '食神': ['Effortless', 'Warm', 'Generous'], '伤官': ['Dazzling', 'Unruly', 'Rule-breaking'],
  '偏财': ['Resourceful', 'Venturing', 'Magnetic'], '正财': ['Reliable', 'Compounding', 'Loyal'],
  '七杀': ['Decisive', 'Cool-headed', 'Battle-ready'], '正官': ['Principled', 'Trusted', 'Fair'],
  '偏印': ['Intuitive', 'Penetrating', 'Inventive'], '正印': ['Patient', 'Sheltering', 'Recharging'],
};
export const ADJ_FRICTION = {
  '比肩': ['Walled-off', 'Solitary', 'Immovable'], '劫财': ['Combative', 'Envious', 'Reckless'],
  '食神': ['Coasting', 'Indulgent', 'Unchallenged'], '伤官': ['Rebellious', 'Over-exposed', 'Biting'],
  '偏财': ['Restless', 'Overextended', 'Ungrounded'], '正财': ['Clenched', 'Risk-averse', 'Unyielding'],
  '七杀': ['Punishing', 'Domineering', 'Burned-out'], '正官': ['Conforming', 'Over-dutiful', 'Unbending'],
  '偏印': ['Aloof', 'Overthinking', 'Shut-off'], '正印': ['Passive', 'Over-protected', 'Inert'],
};

// Glossary sheet definitions (A2 — locked W map, verbatim; cond varies by chart)
const W_CORE = 'The energy you were cast with — your day master, the fixed center every other energy is read against. It doesn’t change; it’s the you the whole chart orbits.';
const W_CAT = 'The energy your chart runs short on. Feed it and the whole system moves easier — these are the energies to seek.';
const W_FRIC = 'The energy already carrying weight. Add more and it jams the works — these are the energies to ease off.';
// Condition glossary body = the §5c definition (DEFLINE) + its remedy clause,
// composed from the canonical sources so no line is restated: Channel/Refill
// from APPR_LINE, the balanced verdict from FOLD_VERDICT.
function condGlossaryBody(cond) {
  const remedy = cond === 'Overfueled'
    ? `So ${APPR_LINE.Channel.verb.toLowerCase()} it: ${APPR_LINE.Channel.tail}`
    : cond === 'Underfueled'
      ? `So ${APPR_LINE.Refill.verb.toLowerCase()} it: ${APPR_LINE.Refill.tail}`
      : `Nothing to force; ${FOLD_VERDICT.Balanced}`;
  return `${DEFLINE[cond]} ${remedy}`;
}
export function buildGlossary(model) {
  return {
    core: { label: 'Core', tint: 't-core', pill: 'core', icon: null, body: W_CORE },
    cond: { label: model.condition, tint: 't-cond', pill: 'cond', icon: 'cond', body: condGlossaryBody(model.condition) },
    cat: { label: 'Catalyst', tint: 't-cat', pill: 'cat', icon: 'ar-up', body: W_CAT },
    fric: { label: 'Friction', tint: 't-fric', pill: 'fric', icon: 'ar-down', body: W_FRIC },
  };
}

// §5c collapsed-tile verdict set (approach-implying, LOCKED)
export const FOLD_VERDICT = {
  Overfueled: 'channel the surplus.',
  Balanced: 'keep the mix.',
  Underfueled: 'refill the tank.',
};

// Inscription clause 2/3 tails (§5c copy templates)
export const COND_TAIL = {
  Overfueled: 'more comes in than it burns.',
  Balanced: 'intake and burn hold each other.',
  Underfueled: 'it burns more than it takes in.',
};
export const APPR_LINE = {
  Channel: { verb: 'Channel', tail: 'aim the surplus, don’t add to it.' },
  Refill: { verb: 'Refill', tail: 'take in what feeds you.' },
};

// ── wheel seating (DOMINANCE_WHEEL_RULES §2 AMENDMENT, owner 2026-07-16) ──
// Slot centers in the 320×292 container; sizes by presence rank.
const SLOT = {
  top: [156.4, 25.8], right: [271.9, 109.7], left: [40.9, 109.7],
  lowerLeft: [85.0, 245.4], lowerRight: [227.8, 245.4],
};
const SIZES = [59, 53, 48, 42, 37];
// clockwise seat order from the top (for the dot-ink intro)
const CW_FROM_TOP = ['top', 'right', 'lowerRight', 'lowerLeft', 'left'];

function seatElements(elements, coreEl, condition) {
  // returns { el → slotName }
  const byPresence = [...elements].sort((a, b) => b.presence - a.presence);
  const seats = {};
  if (condition === 'Underfueled') {
    // dominance order, counter-clockwise from the top; core sits by rank
    const ccw = ['top', 'left', 'lowerLeft', 'lowerRight', 'right'];
    byPresence.forEach((e, i) => { seats[e.el] = ccw[i]; });
  } else {
    // Overfueled / Balanced: the Core crowns the wheel; the remaining four
    // order high → low counter-clockwise starting from the Core's right.
    seats[coreEl] = 'top';
    const rest = byPresence.filter((e) => e.el !== coreEl);
    const order = ['right', 'left', 'lowerLeft', 'lowerRight'];
    rest.forEach((e, i) => { seats[e.el] = order[i]; });
  }
  return seats;
}

// ── the model ──────────────────────────────────────────────────────
// chart: engine chart · ec: buildEnergyChart(chart) · identity: buildIdentity(...)
// card: STEM_CARD_DATA[stem]
export function buildJourneyModel({ chart, ec, identity, card }) {
  const coreEl = coreElOf(ec);
  const band = getEnergyBand(chart.dayMaster.strength);
  const condition = CONDITION[band] || 'Balanced';
  const approach = APPROACH[band] || null;

  // The ENERGY_TILE hooks are authored FOR THE BLADE ("What your blade is
  // for", "Your core — precision before intention") — on any other day master
  // they mislead (REA_02 §6b item 6). Gate them to 庚 until the 50-cell /
  // DM-neutral authoring pass lands; other charts fall back to glance labels.
  const isBlade = ec.dayMaster === 'geng';

  const rankSorted = [...ec.energies].sort((a, b) => b.presence - a.presence);
  const rankOf = {}; rankSorted.forEach((e, i) => { rankOf[e.el] = i; });

  // per-element records
  const els = ec.energies.map((e) => {
    const roles = e.roles || [];
    const isCore = e.el === coreEl;
    const missing = roles.includes('missing');
    const major = e.major === 'catalyst' || (roles.includes('catalyst') && missing);
    // display role: core > friction > catalyst > ally(→catalyst)
    let role = 'catalyst';
    if (isCore) role = 'core';
    else if (roles.includes('friction')) role = 'friction';
    else if (roles.includes('catalyst')) role = 'catalyst';
    else if (roles.includes('ally')) role = 'ally';
    const coreExcess = isCore && roles.includes('friction');
    const coreCatalyst = isCore && roles.includes('catalyst');

    // Ten-god family of an element relative to the day master is the engine's
    // relationOf (energyRoles.js) — reused here, not reimplemented.
    const family = relationOf(EL_NAME[e.el], EL_NAME[coreEl]);
    const god = e.leadGod;
    const keyword = KEYWORD[god] || '';
    const tile = ENERGY_TILE[e.el] || {};
    return {
      el: e.el, name: EL_NAME[e.el], hz: EL_HZ[e.el],
      presence: e.presence, rank: rankOf[e.el], size: SIZES[rankOf[e.el]],
      role, isCore, missing, major, coreExcess, coreCatalyst,
      family, god, keyword,
      persona: TG_PERSONA[god] || '',
      catalystPole: POLE_CATALYST[god] || '', frictionPole: POLE_FRICTION[god] || '',
      faceKw: (FACE_CARD[god]?.kw || []).join(' · ').toLowerCase(),
      teaser: FACE_CARD[god]?.teaser || '',
      hook: isBlade ? (tile.hook || '') : '', tag: tile.pol || '',
      facesRaw: e.faces || [],   // v2.1 polarity faces [{god, weight, polarity}], dominant-led
    };
  });
  const byEl = {}; els.forEach((r) => { byEl[r.el] = r; });

  // verdict line per element (§4b: connector + pole noun + role verb)
  const catalysts = els.filter((r) => (r.role === 'catalyst' || r.role === 'ally') && !r.isCore)
    .sort((a, b) => (b.major - a.major) || (b.presence - a.presence));
  const presentCats = catalysts.filter((c) => !c.missing).sort((a, b) => b.presence - a.presence);
  els.forEach((r) => {
    if (r.isCore) {
      r.verdict = condition === 'Overfueled'
        ? { connector: 'curdling into', pole: r.frictionPole, verb: 'channel it' }
        : condition === 'Underfueled'
          ? { connector: 'reaching for', pole: r.catalystPole, verb: 'refill it' }
          : { connector: 'holding', pole: r.catalystPole, verb: 'trust it' };
    } else if (r.role === 'friction') {
      r.verdict = { connector: 'curdling into', pole: r.frictionPole, verb: 'loosen it' };
    } else {
      const verb = r.missing ? 'borrow it'
        : (presentCats[0] && presentCats[0].el === r.el) ? 'feed it' : 'keep it close';
      r.verdict = { connector: 'rising toward', pole: r.catalystPole, verb };
    }
  });

  // Round 2 (A3): per-element diagnosis — ROLE-DRIVEN mapping, owner-ratified
  // 2026-07-23 (REA_02 §5c extension): friction-side → Overfueled·Channel;
  // catalyst-side (incl. missing) → Underfueled·Refill; balanced charts →
  // Balanced. Plus the pill definition/family lines and role-conditioned
  // §4b adjective chips.
  els.forEach((r) => {
    const frictionSide = r.role === 'friction' || r.coreExcess;
    const catalystSide = !frictionSide && (r.role === 'catalyst' || r.role === 'ally' || r.missing || r.coreCatalyst);
    if (condition === 'Balanced') r.dx = { condition: 'Balanced', remedy: null };
    else if (frictionSide) r.dx = { condition: 'Overfueled', remedy: 'Channel' };
    else if (catalystSide) r.dx = { condition: 'Underfueled', remedy: 'Refill' };
    else r.dx = { condition: 'Balanced', remedy: null };
    // Element-flavored chips (owner pass 2026-09-01): the ELEMENT_GOD cell's
    // adj_chips speak the god trait in the element's texture; the god-grain
    // §4b tables remain the fallback until the ×45 batch lands.
    const pole = frictionSide ? 'friction' : 'catalyst';
    const cellAdj = (g) => K2_CELLS[`${r.hz}_${g}`]?.adj?.[pole];
    r.adj = cellAdj(r.god) || (frictionSide ? ADJ_FRICTION[r.god] : ADJ_CATALYST[r.god]) || [];
    r.adjPole = frictionSide ? 'fric' : 'cat';
    // v2.1 polarity faces, persona-enriched (owner merge-and-retire ruling
    // 2026-08-19: the element screen absorbs the faces page's polarity split).
    // Ghost elements have no present face — the leadGod fallback keeps one.
    const rawFaces = r.facesRaw.length ? r.facesRaw : [{ god: r.god, weight: 1, polarity: null }];
    const sumW = rawFaces.reduce((s, f) => s + (f.weight || 0), 0) || 1;
    r.faces = rawFaces.map((f) => ({
      god: f.god, polarity: f.polarity,
      share: Math.round(((f.weight || 0) / sumW) * 100),
      persona: TG_PERSONA[f.god] || '',
      keyword: KEYWORD[f.god] || '',
      adj: cellAdj(f.god) || (frictionSide ? ADJ_FRICTION[f.god] : ADJ_CATALYST[f.god]) || [],
      teaser: FACE_CARD[f.god]?.teaser || '',
    }));
    r.chips = [];
    if (r.isCore) r.chips.push({ k: 'core', label: 'Core' });
    if (r.role === 'friction' || r.coreExcess) r.chips.push({ k: 'fric', label: 'Friction' });
    if ((r.role === 'catalyst' || r.role === 'ally' || r.coreCatalyst) && !r.isCore) r.chips.push({ k: 'cat', label: 'Catalyst', major: r.major });
    if (r.isCore && r.coreCatalyst) r.chips.push({ k: 'cat', label: 'Catalyst', major: false });
  });

  // SEEK / SKIP panels (§5c LOCKED headers; Balanced collapses both)
  const seek = catalysts.concat(els.filter((r) => r.coreCatalyst));
  const skip = els.filter((r) => r.coreExcess)
    .concat(els.filter((r) => r.role === 'friction' && !r.isCore).sort((a, b) => b.presence - a.presence));

  // wheel seating + clockwise intro order
  const seats = seatElements(els, coreEl, condition);
  els.forEach((r) => {
    const [cx, cy] = SLOT[seats[r.el]];
    r.seat = { left: +(cx - r.size / 2).toFixed(1), top: +(cy - r.size / 2).toFixed(1) };
  });
  const introOrder = CW_FROM_TOP.map((slot) => els.find((r) => seats[r.el] === slot)?.el).filter(Boolean);

  // identity hero — chips are the AUTHORED stem_keywords (owner 2026-08-05:
  // one identity, same three words on reveal, catalogue hero, and share
  // surfaces; the old derived top-3 god-keyword chips are retired).
  const manifesto = fullManifesto(card);
  const cast = identity.cast;

  const core = byEl[coreEl];
  return {
    stemId: ec.dayMaster, stem: ec.stem,
    archetype: identity.archetype, pinyin: identity.pinyin,
    manifesto, maniThesis: identity.manifesto, maniEdge: identity.manifestoEdge,
    inscription: identity.inscription, stemKeywords: identity.keywords, cast,
    condition, approach, band,
    foldVerdict: FOLD_VERDICT[condition],
    condTail: COND_TAIL[condition],
    apprLine: approach ? APPR_LINE[approach] : null,
    defline: DEFLINE,
    core, els, byEl, seek, skip, introOrder,
    balanced: condition === 'Balanced',
  };
}

function coreElOf(ec) {
  const core = ec.energies.find((e) => (e.roles || []).includes('core'));
  return core ? core.el : ec.energies[0].el;
}

// The hero shows the FULL manifesto (both halves) — identity.manifesto is
// the split first half, so rebuild from the card source. Join law
// (owner re-ruled 2026-08-05, REA_16): the halves join with a period,
// L2 keeps its authored capitalization — no dash anywhere in the corpus.
function fullManifesto(card) {
  const m = card?.identity?.manifesto || '';
  const parts = m.split(' · ');
  if (parts.length < 2) return m;
  return `${parts[0]}. ${parts[1]}`;
}

// ── element reading screen data (ELD equivalent, templatized) ──────
// §6b rulings: representation word = the §4 keyword ("The General · FORCE");
// verdLab/verdict normalized to the SEEK/SKIP register; hook/tag remain
// element-generic interim lines (§6b item 6). The interim mean line is
// RETIRED (2026-08-19): the K2 overview owns the slot, corpus ×50.

export function buildElementScreen(model, el) {
  const r = model.byEl[el];
  if (!r) return null;
  let roleTx; let roleKind;
  if (r.isCore) { roleTx = 'YOUR CORE'; roleKind = 'who'; }
  else if (r.role === 'friction') { roleTx = 'FRICTION'; roleKind = 'down'; }
  else { roleTx = 'CATALYST'; roleKind = 'up'; }

  // the dominance number moved off the art to sit with the track (owner 2026-09-01)
  const reye = `${r.name.toUpperCase()}${r.missing ? ' · MISSING' : r.isCore ? ' · YOUR CORE' : ''}`;

  // The turn label (SEEK/SKIP register) — heads the mechanism's state turn.
  const turnLab = r.isCore
    ? (r.coreExcess ? 'YOUR CORE — ALSO YOUR EXCESS' : r.coreCatalyst ? 'YOUR CORE — FEED IT' : 'YOUR CORE')
    : r.role === 'friction' ? 'YOUR FRICTION — SKIP THIS' : 'YOUR CATALYST — SEEK THIS';

  // BAND-C self_card (owner slot ruling 2026-08-14): the core element's
  // screen carries the band mirror — how YOUR core is running. Other
  // elements' screens don't (selfCard stays null there).
  const selfCard = r.isCore ? selfCardFor(model.stem, model.band) : null;

  // THE MECHANISM (element-page restructure, owner rulings 2026-08-19):
  // the ELEMENT_PAIR cell (DM element × this energy) consolidates the old
  // law card + state verdict + persona bridge. The edge powers the section's
  // capsule graphic; base = the 生/克 reaction; the turn is role-resolved
  // from dx (Overfueled → friction_turn w/ shadow noun · Underfueled →
  // catalyst_turn · Balanced → none).
  const core = model.core.el;
  const coreHz = model.byEl[core].hz;
  const pair = PAIR_CELLS[`${coreHz}_${r.hz}`] || null;
  const edge = r.isCore ? { a: el, b: el, verb: 'core' }
    : FEEDS[r.el] === core ? { a: r.el, b: core, verb: 'feeds' }
    : FEEDS[core] === r.el ? { a: core, b: r.el, verb: 'feeds' }
    : TAMES[r.el] === core ? { a: r.el, b: core, verb: 'tames' }
    : { a: core, b: r.el, verb: 'tames' };
  const mech = pair ? {
    ...edge,
    eq: r.isCore ? `${r.name} is your Core` : `${model.byEl[edge.a].name} ${edge.verb} ${model.byEl[edge.b].name}`,
    base: pair.mechanism.base,
    turn: r.dx?.condition === 'Overfueled' ? pair.mechanism.friction_turn
      : r.dx?.condition === 'Underfueled' ? pair.mechanism.catalyst_turn : null,
    turnLab,
  } : null;

  const fn = pair?.function || null;
  const fnLabel = (K2_FUNCTIONS.find((f) => f.key === fn?.primary) || {}).label || '';
  // (the mech state-turn teaser retired 2026-09-01 — the hero card's second
  // component is the DIAGNOSIS verdict; the turn still renders in the detail)

  return {
    el, name: r.name.toUpperCase(), hz: r.hz, cls: `a-${el}`,
    pig: `var(--${el})`,
    reye, roleTx, roleKind,
    // tile hook + tag retired from the hero (owner 2026-09-01: the hero card
    // headline is the function CLAIM; ENERGY_TILE hooks become unrendered ore)
    selfCard,
    elName: r.name, dx: r.dx,
    mech,
    // Consolidated card title (owner 2026-09-01): the FUNCTION noun, never
    // the seat noun ("Why Wood is your Action") — the seat noun is taught
    // inside the corpus paragraphs, not in titles.
    mechTitle: r.isCore ? 'The energy that is you' : `Why ${r.name} is your ${fnLabel}`,
    // THE FUNCTION (§5f): merged into the mechanism detail (owner 2026-09-01).
    fn,
    fnLabel,
    // v3 definitions (owner re-org 2026-09-02): the role-resolved FULL
    // function reading (3 ¶, \n\n separated) lives on its own detail page;
    // the card shows the DERIVED teaser (the reading's first sentence).
    ...((() => {
      const fnDef = fn ? (((r.role === 'friction' || r.coreExcess) ? fn.definition_friction : fn.definition_catalyst) || fn.body || '') : '';
      const dot = fnDef.indexOf('.');
      return { fnDef, fnTeaser: dot > 0 ? fnDef.slice(0, dot + 1) : fnDef };
    })()),
    // THE DIAGNOSIS (owner 2026-09-01): the logic chain spoken — core state ×
    // chemistry direction → catalyst/friction → directive. Templated derived
    // vocabulary (no authored corpus); the graphic shows the same equation.
    diag: (() => {
      const coreName = model.core.name;
      const cond = model.condition;
      if (r.isCore) {
        return cond === 'Overfueled'
          ? `This is your core itself, and it runs overfueled: more ${r.name} than your chart can spend. The surplus is the friction. Channel it.`
          : cond === 'Underfueled'
            ? `This is your core itself, and it runs underfueled: your ${r.name} spends more than it takes in. Refilling it is the first work of your chart.`
            : `This is your core itself, and it holds its measure. Keep the balance rather than forcing it.`;
      }
      if (cond === 'Balanced') {
        return `Your ${coreName} core runs balanced, so nothing here needs forcing. ${r.name} plays its part in the cycle, and you can let it.`;
      }
      const over = cond === 'Overfueled';
      const shape = edge.verb === 'feeds' ? (edge.a === r.el ? 'feed' : 'drain') : (edge.a === r.el ? 'press' : 'spend');
      return {
        feed: over
          ? `Your ${coreName} core is overfueled, and ${r.name} pours more in. More fuel on a full fire is friction. Ease off ${r.name}.`
          : `Your ${coreName} core is underfueled, and ${r.name} pours fuel in. A hungry core wants exactly this, so ${r.name} is a catalyst. Seek it.`,
        drain: over
          ? `Your ${coreName} core is overfueled, and ${r.name} draws that surplus out. A full core wants spending, so ${r.name} is a catalyst. Seek it.`
          : `Your ${coreName} core is underfueled, and ${r.name} keeps drawing it out. Spending what is already scarce is friction. Ease off ${r.name}.`,
        press: over
          ? `Your ${coreName} core is overfueled, and ${r.name} presses against it. Force with nowhere to go wants exactly that shaping, so ${r.name} is a catalyst. Seek it.`
          : `Your ${coreName} core is underfueled, and ${r.name} presses on it anyway. Pressure on a low flame is friction. Ease off ${r.name}.`,
        spend: over
          ? `Your ${coreName} core is overfueled, and shaping ${r.name} spends the extra force. A full core wants work to do, so ${r.name} is a catalyst. Seek it.`
          : `Your ${coreName} core is underfueled, and shaping ${r.name} costs force it barely has. That spending is friction for now. Ease off ${r.name}.`,
      }[shape];
    })(),
    functionsDef: K2_FUNCTIONS,
    domTitle: 'What it rules in your life',
    // RULING DOMAINS (EP-C): the gods' home — per present face, a sub-block
    // of persona + defline (§2, teaser-first per the curation ruling) +
    // the god's ONE function line (owner 2026-09-01: family bijection) +
    // domains + its seats + Seeker-gated domain readings.
    faces: (r.faces || []).map((f) => ({
      ...f,
      defline: TG_DEFLINE[f.god] || '',
      fnLabel: (K2_FUNCTIONS.find((x) => x.key === GOD_FN[f.god]) || {}).label || '',
      fnLine: K2_CELLS[`${r.hz}_${f.god}`]?.functional || '',
      domains: GOD_DOMAINS[f.god] || [],
      readings: K2_CELLS[`${r.hz}_${f.god}`]?.domain_readings || null,
    })),
  };
}

