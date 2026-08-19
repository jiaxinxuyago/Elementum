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
import { TG_PERSONA, selfCardFor } from '../../content/index.js';
import { FACE_CARD, ENERGY_TILE } from '../../content/reading/index.js';

// ── element basics ─────────────────────────────────────────────────
export const EL_NAME = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };
export const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };

// ── REA_02 locked vocabulary ───────────────────────────────────────
// §5b relation nouns (LOCKED 2026-07-16)
export const RELATION_NOUN = { self: 'Core', resource: 'Root', wealth: 'Drive', output: 'Voice', officer: 'Duty' };

// §5b-ii shadow nouns (LOCKED 2026-08-14) — the same force in excess. The
// relation noun is the CATALYST-form vocabulary; FRICTION advice surfaces
// speak through the shadow twin instead ("Earth is your Cage"), so the
// anatomy is never the thing the reading tells you to skip.
export const SHADOW_NOUN = { self: 'Bubble', resource: 'Cage', wealth: 'Grind', output: 'Echo', officer: 'Weight' };

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
// Family one-liners for the pill definition block (locked, share-flow verbatim)
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

// ── wheel seating (CYCLE SEATING, owner 2026-08-19 — supersedes the
// dominance seating of 2026-07-16): seats are FIXED BY FAMILY so the wheel
// IS the generating cycle. Core crowns the top, then clockwise each seat
// feeds the next: Core → Voice → Drive → Duty → Root → Core (比生食 ·
// 食生财 · 财生官 · 官生印 · 印生比). The five 克 relations are exactly the
// pentagram chords. Dominance stays readable via node size + presence %.
// Same layout for every chart — the seat map becomes learnable anatomy.
const SLOT = {
  top: [156.4, 25.8], right: [271.9, 109.7], left: [40.9, 109.7],
  lowerLeft: [85.0, 245.4], lowerRight: [227.8, 245.4],
};
const SIZES = [59, 53, 48, 42, 37];
// clockwise seat order from the top (for the dot-ink intro)
const CW_FROM_TOP = ['top', 'right', 'lowerRight', 'lowerLeft', 'left'];
const FAMILY_SEAT = { self: 'top', output: 'right', wealth: 'lowerRight', officer: 'lowerLeft', resource: 'left' };

function seatElements(elements) {
  // returns { el → slotName } — fixed by ten-god family (cycle order)
  const seats = {};
  elements.forEach((e) => { seats[e.el] = FAMILY_SEAT[e.family]; });
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
    const relation = RELATION_NOUN[family];
    const shadow = SHADOW_NOUN[family];
    const god = e.leadGod;
    const keyword = KEYWORD[god] || '';
    const tile = ENERGY_TILE[e.el] || {};
    return {
      el: e.el, name: EL_NAME[e.el], hz: EL_HZ[e.el],
      presence: e.presence, rank: rankOf[e.el], size: SIZES[rankOf[e.el]],
      role, isCore, missing, major, coreExcess, coreCatalyst,
      family, relation, shadow, god, keyword,
      persona: TG_PERSONA[god] || '',
      catalystPole: POLE_CATALYST[god] || '', frictionPole: POLE_FRICTION[god] || '',
      faceKw: (FACE_CARD[god]?.kw || []).join(' · ').toLowerCase(),
      teaser: FACE_CARD[god]?.teaser || '',
      hook: isBlade ? (tile.hook || '') : '', tag: tile.pol || '',
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
    r.title = `${r.name} is Your ${r.relation}`;
    r.familyLine = FAMILY_LINE[r.family] || '';
    const frictionSide = r.role === 'friction' || r.coreExcess;
    const catalystSide = !frictionSide && (r.role === 'catalyst' || r.role === 'ally' || r.missing || r.coreCatalyst);
    if (condition === 'Balanced') r.dx = { condition: 'Balanced', remedy: null };
    else if (frictionSide) r.dx = { condition: 'Overfueled', remedy: 'Channel' };
    else if (catalystSide) r.dx = { condition: 'Underfueled', remedy: 'Refill' };
    else r.dx = { condition: 'Balanced', remedy: null };
    r.adj = (frictionSide ? ADJ_FRICTION[r.god] : ADJ_CATALYST[r.god]) || [];
    r.adjPole = frictionSide ? 'fric' : 'cat';
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
  const seats = seatElements(els);
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
// verdLab/verdict normalized to the SEEK/SKIP register; mean/hook/tag are
// element-generic interim lines pending the 50-cell pass (§6b item 6).
const MEAN = {
  fire: 'The room is different before you speak. Warmth as climate, light that changes what it touches.',
  water: 'Reads before being told. Knows before the question is complete.',
  wood: 'Building before knowing what it will become. Growth as architecture.',
  earth: 'Load-bearing without announcement. The ground others build on.',
  metal: 'The conclusion arrives before the conversation. The standard runs first.',
};

export function buildElementScreen(model, el) {
  const r = model.byEl[el];
  if (!r) return null;
  const others = model.seek.filter((c) => c.el !== el && !c.missing).map((c) => c.name);
  let roleTx; let roleKind;
  if (r.isCore) { roleTx = 'YOUR CORE'; roleKind = 'who'; }
  else if (r.role === 'friction') { roleTx = 'FRICTION'; roleKind = 'down'; }
  else { roleTx = 'CATALYST'; roleKind = 'up'; }

  const reye = `${r.name.toUpperCase()} · ${r.presence}%${r.missing ? ' · MISSING' : r.isCore ? ' · YOUR CORE' : ''}`;

  let verdLab; let verdict;
  if (r.isCore) {
    verdLab = r.coreExcess ? 'YOUR CORE — ALSO YOUR EXCESS' : 'YOUR CORE';
    verdict = r.coreExcess
      ? `${model.condition}. Your Core is running as your ${r.shadow} right now. Honor it, don’t feed it further.`
      : model.condition === 'Underfueled'
        ? `${model.condition} — it burns more than it takes in; refill it.`
        : `Balanced — nothing to force; ${FOLD_VERDICT.Balanced}`;
  } else if (r.role === 'friction') {
    verdLab = 'YOUR FRICTION — SKIP THIS';
    verdict = `Your ${r.relation} is running as your ${r.shadow} right now. Already rich in you, and more of it weighs the core. Stop adding.`;
  } else {
    verdLab = 'YOUR CATALYST — SEEK THIS';
    verdict = r.missing
      ? `Cast with none — borrow it daily${others.length ? ` · with ${others.join(' & ')}` : ''}.`
      : r.presence <= 12 ? 'Thin in you — worth feeding.' : 'Give it more to shape.';
  }

  // BAND-C self_card (owner slot ruling 2026-08-14): the core element's
  // screen carries the band mirror — how YOUR core is running. Other
  // elements' screens don't (selfCard stays null there).
  const selfCard = r.isCore ? selfCardFor(model.stem, model.band) : null;

  return {
    el, name: r.name.toUpperCase(), hz: r.hz, cls: `a-${el}`,
    pig: `var(--${el})`, deep: `var(--${el}Deep)`,
    reye, roleTx, roleKind,
    title: r.hook || `${r.keyword} — your ${r.relation}`, tag: r.tag,
    verdLab, verdict, mean: MEAN[el] || '',
    face: `${r.persona} · ${r.keyword.toUpperCase()}`,
    kw: r.faceKw, teaser: r.teaser,
    selfCard,
  };
}

