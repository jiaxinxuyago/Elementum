// ===================================================================
// ELEMENTUM · journeyData — view-model for the Reveal → Catalogue journey
// ===================================================================
// Implements the design handoff's template contract
// (Design/exports/design_handoff_reveal_reading_journey/template-data.json)
// against the live engine + the DES_12 locked vocabulary (v1.6):
//   · §4  keywords (v3 final)          · §5b relation nouns
//   · §5c condition/approach + panels  · §4b pole nouns + role verbs
//   · §6b journey rulings (keyword = representation; top-3 chips)
// The engine owns every number (buildEnergyChart / energyRoles); this file
// only translates engine output into locked display vocabulary. Per DES_12
// §6b item 6, element hook/tag/mean lines are element-generic interim copy
// pending the 50-cell authoring pass.
// ===================================================================

import { getEnergyBand } from '../../engine/index.js';
import { TG_PERSONA } from '../../content/index.js';
import { FACE_CARD, ENERGY_TILE } from '../../content/reading/index.js';

// ── element basics ─────────────────────────────────────────────────
export const EL_LIST = ['metal', 'earth', 'wood', 'water', 'fire'];
export const EL_NAME = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };
export const EL_HZ = { metal: '金', earth: '土', wood: '木', water: '水', fire: '火' };
const EL_CAP = { metal: 'Metal', earth: 'Earth', wood: 'Wood', water: 'Water', fire: 'Fire' };

const GEN = { Wood: 'Fire', Fire: 'Earth', Earth: 'Metal', Metal: 'Water', Water: 'Wood' };
const CTL = { Wood: 'Earth', Fire: 'Metal', Earth: 'Water', Metal: 'Wood', Water: 'Fire' };

// Ten-god family of element X relative to the day-master element D.
export function familyOf(X, D) {
  if (X === D) return 'self';
  if (GEN[X] === D) return 'resource';
  if (GEN[D] === X) return 'output';
  if (CTL[D] === X) return 'wealth';
  if (CTL[X] === D) return 'officer';
  return 'self';
}

// ── DES_12 locked vocabulary ───────────────────────────────────────
// §5b relation nouns (LOCKED 2026-07-16)
export const RELATION_NOUN = { self: 'Core', resource: 'Root', wealth: 'Drive', output: 'Voice', officer: 'Duty' };

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
// card: STEM_CARD_DATA[stem] · birthData: chartContext birthData
export function buildJourneyModel({ chart, ec, identity, card, birthData }) {
  const coreEl = coreElOf(ec);
  const band = getEnergyBand(chart.dayMaster.strength);
  const condition = CONDITION[band] || 'Balanced';
  const approach = APPROACH[band] || null;

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

    const family = familyOf(EL_CAP[e.el], EL_CAP[coreEl]);
    const relation = RELATION_NOUN[family];
    const god = e.leadGod;
    const keyword = KEYWORD[god] || '';
    const tile = ENERGY_TILE[e.el] || {};
    return {
      el: e.el, name: EL_NAME[e.el], hz: EL_HZ[e.el],
      presence: e.presence, rank: rankOf[e.el], size: SIZES[rankOf[e.el]],
      role, isCore, missing, major, coreExcess, coreCatalyst,
      family, relation, god, keyword,
      persona: TG_PERSONA[god] || '',
      catalystPole: POLE_CATALYST[god] || '', frictionPole: POLE_FRICTION[god] || '',
      faceKw: (FACE_CARD[god]?.kw || []).join(' · ').toLowerCase(),
      teaser: FACE_CARD[god]?.teaser || '',
      hook: tile.hook || '', tag: tile.pol || '',
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

  // identity hero
  const manifesto = fullManifesto(card);
  const chips = rankSorted.slice(0, 3).map((e) => byEl[e.el].keyword).filter(Boolean); // §6b: top-3 keyword code
  const cast = castLine(identity, birthData);

  const core = byEl[coreEl];
  return {
    stemId: ec.dayMaster, stem: ec.stem,
    archetype: identity.archetype, pinyin: identity.pinyin,
    manifesto, inscription: identity.inscription, chips, cast,
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

// The hero shows the FULL manifesto (both halves) — identity.manifesto is the
// split first half, so rebuild from the card source (' · ' → ' — ').
function fullManifesto(card) {
  const m = card?.identity?.manifesto || '';
  const parts = m.split(' · ');
  if (parts.length < 2) return m;
  let tail = parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
  tail = tail.replace(/ — /g, '; ');
  return `${parts[0]} — ${tail}`;
}

// Cast line + birth-city timezone abbreviation (handoff engine flag: derive
// the abbr from the stored IANA zone at the birth date, DST-aware via Intl).
function castLine(identity, birthData) {
  let cast = identity?.cast || '';
  const tz = birthData?.location?.timezone;
  if (tz && birthData?.year) {
    try {
      const d = new Date(Date.UTC(birthData.year, (birthData.month || 1) - 1, birthData.day || 1, 12));
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(d);
      const abbr = parts.find((p) => p.type === 'timeZoneName')?.value;
      if (abbr && !/GMT[+-]/.test(abbr)) cast = `${cast} ${abbr}`;
    } catch { /* zone unavailable — cast line stands without the abbr */ }
  }
  return cast;
}

// ── element reading screen data (ELD equivalent, templatized) ──────
// §6b rulings: representation word = the §4 keyword ("The General · FORCE");
// verdLab/verdict normalized to the SEEK/SKIP register; mean/hook/tag are
// element-generic interim lines pending the 50-cell pass (§6b item 6).
const MEAN = {
  fire: 'The room is different before you speak — warmth as climate, light that changes what it touches.',
  water: 'Reads before being told — knows before the question is complete.',
  wood: 'Building before knowing what it will become — growth as architecture.',
  earth: 'Load-bearing without announcement — the ground others build on.',
  metal: 'The verdict arrives before the conversation — evaluative precision, the standard that runs first.',
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
      ? `${model.condition} — honor it, don’t feed it further.`
      : model.condition === 'Underfueled'
        ? `${model.condition} — it burns more than it takes in; refill it.`
        : 'Balanced — nothing to force; keep the mix.';
  } else if (r.role === 'friction') {
    verdLab = 'YOUR FRICTION — SKIP THIS';
    verdict = 'Already rich in you — more of it weighs the core; stop adding.';
  } else {
    verdLab = 'YOUR CATALYST — SEEK THIS';
    verdict = r.missing
      ? `Cast with none — borrow it daily${others.length ? ` · with ${others.join(' & ')}` : ''}.`
      : r.presence <= 12 ? 'Thin in you — worth feeding.' : 'Give it more to shape.';
  }

  return {
    el, name: r.name.toUpperCase(), hz: r.hz, cls: `a-${el}`,
    pig: `var(--${el})`, deep: `var(--${el}Deep)`,
    reye, roleTx, roleKind,
    title: r.hook, tag: r.tag,
    verdLab, verdict, mean: MEAN[el] || '',
    face: `${r.persona} · ${r.keyword.toUpperCase()}`,
    kw: r.faceKw, teaser: r.teaser,
  };
}

// Day-master screen prescription cards (element-generic interim copy)
export function buildDmCards(model) {
  const need = model.seek[0];
  const ease = model.skip.find((r) => !r.isCore) || model.skip[0];
  const cards = [];
  if (need) {
    cards.push({
      kind: 'up',
      lab: `SEEK THIS · ${need.name.toUpperCase()}`,
      body: need.missing
        ? `${need.name} is the energy you don’t carry — the one your chart asks for most. Borrow it daily${model.seek.filter((c) => !c.missing && c.el !== need.el).length ? `, through ${model.seek.filter((c) => !c.missing && c.el !== need.el).map((c) => c.name).join(' and ')}` : ''}.`
        : `${need.name} is the energy your chart asks for — thin in you and worth feeding. Seek it on purpose.`,
    });
  }
  if (ease) {
    cards.push({
      kind: 'down',
      lab: `SKIP THIS · ${ease.name.toUpperCase()}`,
      body: `${ease.name} is already rich in you — more of it weighs the core. Stop adding; let what you have ease.`,
    });
  }
  return cards;
}
