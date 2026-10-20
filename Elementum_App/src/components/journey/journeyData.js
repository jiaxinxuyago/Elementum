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

import { getEnergyBand, relationOf, STEM_YIN, volumeOf } from '../../engine/index.js';
import { TG_PERSONA, TG_DEFLINE } from '../../content/index.js';
import { FEEDS, TAMES } from '../../content/cycles.js';
import { K2_CELLS, K2_FUNCTIONS, GOD_DOMAINS, GOD_FN, GOD_RULING_DOMAINS } from '../../content/k2.js';
import { STEM_WHO, RUN_LINES, PAIR_HEAD, PAIR_STORY, NOW_LINE, PRESENCE_LINE, RX_RIBBON, RELATION_LABELS, CODEX_TESTS } from '../../content/mergedReading.js';
import { PAIR_CELLS } from '../../content/pairs.js';
import { FACE_CARD, ENERGY_TILE } from '../../content/reading/index.js';
import { functionMetrics } from '../../engine/functionMetrics.js';

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
// THE BLEND WITHOUT A CLASH (owner M4, 2026-10-17): the two personas of one
// energy are written as opposites, so a blended page must never set a keyword
// beside its opposite ("Moves early" beside "Sleeps on it"). The minority
// persona's keyword that opposes a lead keyword is skipped (see pickBlendRows). Each pair below is
// two keywords that can meet on one page (same element, same pole).
export const BLEND_CLASHES = [
  ['Sets own pace', 'Loves a race'], ['Does it alone', 'Shares the risk'],
  ['Never says no', 'Talks back'], ['Too soft', 'Pushes back'], ['Comfort first', 'Picks fights'],
  ['Quick to start', 'Patient builder'], ['Generous', 'Saves first'],
  ['Chases the new', 'Stays too long'], ['Spends freely', 'Counts everything'],
  ['Starts fast', 'Keeps it going'], ['Gives easily', 'Saves first'],
  ['Chases the new', 'Plays it safe'], ['Chases the new', 'Holds back'], ['Spends it fast', 'Counts everything'], ['Spends it fast', 'Holds back'],
  ['Takes the chance', 'Saves first'], ['Chases every chance', 'Hard to move'], ['Chases every chance', 'Keeps everything'],
  ['Starts fast', 'Finishes things'], ['Open-handed', 'Saves first'],
  ['Always moving on', 'Holds on tight'], ['Always moving on', 'Avoids change'], ['Spends it all', 'Holds on tight'],
  ['Pushes too hard', 'Needs permission'],
  ['Decides alone', 'All in together'], ['Even pace', 'Loves a race'], ['Even pace', 'Jumps in first'],
  ['Moves early', 'Sleeps on it'], ['Shares freely', 'Saves first'],
  ['Leaves too soon', 'Waits too long'], ['Spends it fast', 'Counts every cost'], ['Spends it fast', 'Holds it back'], ['Leaves too soon', 'Holds it back'],
  // round 2 (owner R2-2): pairs the auditors found on blended pages
  ['Coasts along', 'Goes too far'], ['Far-sighted', 'Loyal'], ['Sets own pace', 'Goes first'],
  ['Spends it all', 'Plays it safe'], ['Always moving on', 'Plays it safe'], ['Unforced', 'Quick-witted'],
  ['Reads between lines', 'Knows what works'], ['Sets own bar', 'Better with rivals'], ['Carries own weight', 'All in together'],
  // round 3: pairs found on pages the round-2 picker brought together
  ['Shares the win', 'Saves first'], ['Takes the chance', 'Saves first'], ['Drifts', 'Overdoes it'], ['Half-finished', 'Hard to move'],
  // round 4 (W4-02)
  ['Never asks', 'Spends shared money'],
];
const CLASH = new Set(BLEND_CLASHES.flatMap(([a, b]) => [`${a}|${b}`, `${b}|${a}`]));
export const clashes = (a, b) => CLASH.has(`${a}|${b}`);
// Round 2 (owner R2-2, 2026-10-17): the picker searches every combination of the
// two personas' keywords (lead 2 of 3 × minority n of 3, lowest ranks first) and
// takes the first with no clash, so a 2+2 page shows two and two whenever a clean
// set exists (the six pages where none does show a clean 2+1: owner 1A, 2026-10-17).
export function pickBlendRows(lead, minor, nMinor, leadGod, minorGod) {
  const pairs = (k, n) => (n === 1 ? [[0], [1], [2]] : [[0, 1], [0, 2], [1, 2]]).filter((c) => c.every((i) => i < k));
  const combos = [];
  for (const a of pairs(lead.length, 2)) for (const b of pairs(minor.length, nMinor)) combos.push({ a, b, rank: [...a, ...b].reduce((x, y) => x + y, 0) });
  combos.sort((x, y) => x.rank - y.rank);
  for (const { a, b } of combos) {
    const rows = [...a.map((i) => ({ ...lead[i], god: leadGod })), ...b.map((i) => ({ ...minor[i], god: minorGod }))];
    if (!rows.some((x, i) => rows.some((y, j) => j > i && clashes(x.word, y.word)))) return rows;
  }
  // No clean 2+2 (six friction Horizon+Steward pages, whose keywords are exact
  // opposites): fall to the clean 2+1, which keeps both personas; else the lead alone.
  if (nMinor === 2) return pickBlendRows(lead, minor, 1, leadGod, minorGod);
  return lead.map((row) => ({ ...row, god: leadGod }));
}

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

// THE CONDITION READING (owner 2026-10-18: "the how am I running section
// needs a deeper dive"): one reading per condition, five rows — how it
// works (the balance: Body + Mind add to you, Expression + Action + Order
// spend you), on your chart (filled per chart), what the condition's people
// share (gifts, costs), the scenes, what helps. RULED 2026-10-20 (owner,
// Q1–Q10: no diagram, no gifts/costs heading, three scenes, a Codex link
// on row 2); ships with the merge build, dev build only until then. Station: CONDITION/{overfueled,underfueled,balanced}
// `reading`. The mechanism says "season or roots", never an amount: the
// band comes from the three tests, and on ~1 chart in 5 Body + Mind hold
// under half the amount on an Overfueled chart.
export const CONDITION_READING = {
  Overfueled: {
    status: 'ruled',
    mech: [
      'Two of your five energies add to you. Body is more of your own element, and Mind is the element that feeds it.',
      'In your chart these two have your birth season or your roots behind them. Your core takes in more than a day can spend.',
      'The other three spend you. Expression lets your energy out, Action puts it to work, and Order gives it a shape. They are the outlets your surplus is looking for.',
    ],
    gifts: [
      'You carry a heavy load without asking for help.',
      'You stay steady under pressure, and you recover fast.',
      'You trust your own judgement and act on it.',
    ],
    costs: [
      'You grow restless when nothing asks much of you.',
      'You feel sure you are right, and criticism lands hard.',
      'You hold other people to your own pace and standard.',
    ],
    scenes: [
      ['At work', 'A hard deadline brings you alive. An easy month leaves you rebuilding things that were never broken.'],
      ['At rest', 'A free weekend fills with projects by Saturday noon. Doing nothing feels heavier to you than doing too much.'],
      ['With people', 'A friend asks for advice, and you hand over the whole plan. You find it hard when they take only half of it.'],
    ],
    verb: 'Channel',
    helps: 'Give your extra force a place to go — aim it, don’t store it.',
    grow: 'Expression, Action and Order',
    release: 'Body and Mind',
  },
  Underfueled: {
    status: 'ruled',
    mech: [
      'Three of your five energies spend you. Expression lets your energy out, Action puts it to work, and Order gives it a shape.',
      'In your chart these three have your birth season or your roots behind them. Your core spends more than it takes in.',
      'The other two add to you. Body is more of your own element, and Mind is the element that feeds it. They are the intake your chart is asking for.',
    ],
    gifts: [
      'You read people quickly and adjust to them.',
      'You make a little go a long way.',
      'You work well beside others, and you share credit easily.',
    ],
    costs: [
      'You doubt yourself, even when the work is good.',
      'You start strong and run out before the finish.',
      'You give out more than you take in, and you tire without noticing.',
    ],
    scenes: [
      ['At work', 'You say yes to the extra project. Then you carry it alone in your evenings.'],
      ['At rest', 'A quiet morning with nobody asking for anything feels like a treat. For you it is fuel.'],
      ['With people', 'The right mentor or friend changes everything for you. With their backing you finish what you start.'],
    ],
    verb: 'Refill',
    helps: 'Take in what feeds you — intake isn’t a crutch, it’s your engine.',
    grow: 'Body and Mind',
    release: 'Expression, Action and Order',
  },
  Balanced: {
    status: 'ruled',
    mech: [
      'Body and Mind add to you. Expression, Action and Order spend you.',
      'In your chart neither side has the stronger claim on your season and your roots. Your core takes in about what it spends.',
      'The classics treat this as the condition the other two work toward. None of your energies needs to grow or be released.',
    ],
    gifts: [
      'You fit many settings without losing yourself.',
      'You recover quickly after a hard stretch.',
      'You can push hard or hold back, as the moment asks.',
    ],
    costs: [
      'Nothing pushes you to your limit, and you need your own reasons to go further.',
      'A hard year tips you more than it tips others.',
      'You weigh both sides for a long time before you choose.',
    ],
    scenes: [
      ['At work', 'You can lead a project or support one, and both feel natural.'],
      ['At rest', 'A busy week and a quiet week both suit you, as long as neither runs too long.'],
      ['With people', 'Friends bring you their problems, because you take neither side too fast.'],
    ],
    verb: 'Keep',
    helps: 'Intake and burn hold each other; protect the equilibrium.',
    grow: null,
    release: null,
  },
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
  '七杀': ['Punishing', 'Bossy', 'Burned-out'], '正官': ['Conforming', 'Over-dutiful', 'Unbending'],
  '偏印': ['Aloof', 'Overthinking', 'Shut-off'], '正印': ['Passive', 'Over-protected', 'Inert'],
};

// Glossary sheet definitions (A2 — locked W map, verbatim; cond varies by chart)
const W_CORE = 'The energy you were cast with — your day master, the fixed center every other energy is read against. It doesn’t change; it’s the you the whole chart orbits.';
// One role pair, one action pair (owner 2026-10-18, REA_02 §5c): Catalyst / Friction
// name the role, Grow / Release name the act (Keep on a Balanced chart).
const W_CAT = 'The energy your chart runs short on. Feed it and the whole system moves easier — these are the energies to grow.';
const W_FRIC = 'The energy already carrying weight. Add more and it jams the works — these are the energies to release.';
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

// ── carry poles (valence × volume, owner 2026-09-16) ───────────────
// The eight states an ELEMENT_PAIR `carry` cell can speak: the two pole
// turns plus the six volume states (owner 2026-09-16; `wide` added by owner
// D4 and the B10 fix, 2026-09-20). Order is the manual's and load-bearing.
const CARRY_POLES = ['catalyst', 'friction', 'wide', 'missing', 'spared', 'thin', 'excess', 'unrooted'];

// The yin sibling's carry lines merged over the yang ones, pole by pole:
// the 25 pair cells wear the yang archetype's noun and `carry_yin` holds the
// yin sibling's sparse overrides (owner 2026-09-16). Returns `pair.carry`
// unchanged when there is no yin sibling to merge, and null with no pair.
// Extracted because the pole list and this merge were hand-written twice —
// the energy page and the carry card (code review 2026-09-30, BUG-20260921-3).
export function mergeCarry(pair, yinStem) {
  if (!pair) return null;
  if (!(yinStem && pair.carry_yin)) return pair.carry;
  return Object.fromEntries(CARRY_POLES
    .filter((k) => pair.carry?.[k] || pair.carry_yin?.[k])
    .map((k) => [k, { ...(pair.carry?.[k] || {}), ...(pair.carry_yin?.[k] || {}) }]));
}

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
  // The reading band comes from the energy chart (resolveBand: the strength
  // band behind the Balanced guard, owner R5 2026-09-16); the raw strength
  // band stays the fallback for callers that hand in a bare chart.
  const band = ec.band || getEnergyBand(chart.dayMaster.strength);
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
    // Volume (owner R2): absent · thin · present · abundant · dominant. The
    // reading picks its sentence from valence × volume, never valence alone.
    const volume = e.volume || volumeOf(e.presence);
    const excess = !!e.excess;   // valence flipped by the excess override (owner R1)

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
      volume, excess,
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
    // THE WEIGHTED LEDGER (owner rulings ×4, 2026-09-03): the function
    // ledger carries the element's FULL polarity composition, dominance-
    // weighted — lead face ≥60%: 2 lead rows + 1 minority row · balanced
    // (<60%): 2+2 · single face: 3. Rank convention: authored chip order =
    // significance order, so top-N selection is deterministic. Card chips =
    // the ledger's words (rung identity — 4 chips on balanced elements).
    // Rows carry their source god as metadata only (the render is unlabeled
    // — ten-god vocabulary is first taught in THE DOMAINS); an unbatched
    // minority cell falls back to the lead's 3 rows.
    // THE THREE ANGLES OF ONE TENSION (owner 2026-10-01, superseding THE
    // THREE DOORS of 2026-09-03 as the organising idea): each keyword
    // carries three angles of one tension in the station (drive /
    // cost_self / cost_others: the drive, its cost to the reader, its cost
    // to others; the keys renamed from trait / scene / outside at Q1 of the
    // v0.7 questionnaire, backlog/2026-10-01_angles-key-rename.md); the
    // assembled ledger picks the angle by position rotation so no two
    // adjacent rows carry the same angle first, and any keyword reads well
    // at any blend position.
    const ANGLE_ORDER = ['drive', 'cost_self', 'cost_others'];
    const cellReading = (g) => K2_CELLS[`${r.hz}_${g}`]?.fnReading?.[pole] || null;
    const leadRd = cellReading(r.god);
    r.fnRows = null;
    if (leadRd) {
      const minor = r.faces.length > 1 ? r.faces[1] : null;
      const minorRd = minor ? cellReading(minor.god) : null;
      let picked;
      if (minorRd) {
        const nMinor = r.faces[0].share < 60 ? 2 : 1;
        picked = pickBlendRows(leadRd.ledger, minorRd.ledger, nMinor, r.god, minor.god);
      } else {
        picked = leadRd.ledger.map((row) => ({ ...row, god: null }));
      }
      // An angle-less row degrades OUT rather than crashing the model build
      // (content null-safety, C1): the station checker compares fields, it
      // does not assert the angles shape, so an unbatched cell must never be
      // able to take the whole reading screen down.
      const rows = picked
        .map((row, i) => ({ word: row.word, god: row.god, text: row.angles?.[ANGLE_ORDER[i % 3]] || '' }))
        .filter((row) => row.text);
      r.fnRows = rows.length ? rows : null;
      if (r.fnRows) r.adj = r.fnRows.map((row) => row.word);
    }
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
    inscription: identity.inscription, cast,
    // THE STEM-LITERACY LINE (owner 2026-09-10): the identity surfaces teach
    // WHAT the day master is — sign · polarity · element — instead of the
    // retired adjective keywords (labels lost to portraits everywhere else;
    // identity.keywords stays in the content library as Codex ore).
    stemLit: `${ec.stem} · ${STEM_YIN[ec.stem] === 0 ? 'YANG' : 'YIN'} ${core.name.toUpperCase()}`,
    condition, approach, band,
    foldVerdict: FOLD_VERDICT[condition],
    condTail: COND_TAIL[condition],
    apprLine: approach ? APPR_LINE[approach] : null,
    defline: DEFLINE,
    core, els, byEl, seek, skip, introOrder,
    balanced: condition === 'Balanced',
  };
}

export function coreElOf(ec) {
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
  // A thesis that already ends on its own stop (乙 "Route bends. Destination
  // holds.") takes no second one (owner 2026-10-17: no "holds..").
  return `${parts[0]}${/[.!?]$/.test(parts[0]) ? '' : '.'} ${parts[1]}`;
}

// ── element reading screen data (ELD equivalent, templatized) ──────
// §6b rulings: representation word = the §4 keyword ("The General · FORCE");
// verdLab/verdict normalized to the SEEK/SKIP register; hook/tag remain
// element-generic interim lines (§6b item 6). The interim mean line is
// RETIRED (2026-08-19): the K2 overview owns the slot, corpus ×50.

export function buildElementScreen(model, el) {
  const r = model.byEl[el];
  if (!r) return null;
  // the role-pill kind (who / down / up) — the label itself is rendered by the pill
  const roleKind = r.isCore ? 'who' : r.role === 'friction' ? 'down' : 'up';

  // the dominance number moved off the art to sit with the track (owner 2026-09-01)
  // A core at 0% is 日主无根: unrooted, never missing (owner R6, 2026-09-16).
  const reye = `${r.name.toUpperCase()}${r.missing ? (r.isCore ? ' · YOUR CORE · UNROOTED' : ' · MISSING') : r.isCore ? ' · YOUR CORE' : ''}`;

  // The turn label — heads the mechanism's state turn, in the one role pair and
  // the one action pair (owner 2026-10-18: Catalyst / Friction, Grow / Release).
  const turnLab = r.isCore
    ? (r.coreExcess ? 'YOUR CORE · RELEASE IT' : r.coreCatalyst ? 'YOUR CORE · GROW IT' : 'YOUR CORE')
    : r.role === 'friction' ? 'YOUR FRICTION · RELEASE IT' : 'YOUR CATALYST · GROW IT';

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
  // The yin sibling speaks its own noun on the energy page too (owner
  // 2026-09-17): `mechanism_yin` holds sparse overrides of the story and the
  // two turns; everything else is the shared line.
  const yinStem = STEM_YIN[model.stem] === 1;
  const mechanism = pair ? (yinStem && pair.mechanism_yin ? { ...pair.mechanism, ...pair.mechanism_yin } : pair.mechanism) : null;
  // The turn is picked by valence × volume, like the carry card (owner
  // 2026-09-16): an absent, thin, dominant or unrooted energy speaks its
  // state line (clause + remedy) instead of the pole's turn. A wanted energy
  // that runs abundant or dominant speaks the `wide` line (owner D4 and the
  // B10 fix, 2026-09-20), so the page and the carry card never disagree.
  const carry = mergeCarry(pair, yinStem);
  const stateTurn = (() => {
    if (!carry) return null;
    const v = r.volume || volumeOf(r.presence);
    const line = r.isCore && v === 'absent' ? carry.unrooted
      : r.dx?.condition === 'Underfueled' ? (v === 'absent' ? carry.missing : (!r.isCore && (v === 'abundant' || v === 'dominant')) ? carry.wide : null)
      : r.dx?.condition === 'Overfueled' ? (v === 'absent' ? carry.spared : v === 'thin' ? carry.thin : v === 'dominant' ? carry.excess : null)
      : null;
    return line?.clause ? `${line.clause} ${line.remedy || ''}`.trim() : null;
  })();
  const mech = pair ? {
    ...edge,
    eq: r.isCore ? `${r.name} is your Core` : `${model.byEl[edge.a].name} ${edge.verb} ${model.byEl[edge.b].name}`,
    // the 汉字 classical epigraph (mechanism v2, owner 2026-09-02)
    classic: mechanism.classic || '',
    base: mechanism.base,
    turn: stateTurn || (r.dx?.condition === 'Overfueled' ? mechanism.friction_turn
      : r.dx?.condition === 'Underfueled' ? mechanism.catalyst_turn : null),
    turnLab,
  } : null;

  const fn = pair?.function || null;
  const fnLabel = (K2_FUNCTIONS.find((f) => f.key === fn?.primary) || {}).label || '';
  // (the mech state-turn teaser retired 2026-09-01 — the hero card's second
  // component is the DIAGNOSIS verdict; the turn still renders in the detail)

  return {
    el, name: r.name.toUpperCase(), hz: r.hz, cls: `a-${el}`,
    pig: `var(--${el})`,
    reye, roleKind,
    // tile hook + tag retired from the hero (owner 2026-09-01: the hero card
    // headline is the function CLAIM; ENERGY_TILE hooks become unrendered ore)
    elName: r.name, dx: r.dx,
    mech,
    // Consolidated card title (owner 2026-09-01): the FUNCTION noun, never
    // the seat noun ("Why Wood is your Action") — the seat noun is taught
    // inside the corpus paragraphs, not in titles.
    mechTitle: r.isCore ? 'The energy that is you' : `Why ${r.name} is your ${fnLabel}`,
    // THE FUNCTION (§5f): merged into the mechanism detail (owner 2026-09-01).
    fn,
    fnLabel,
    fnKey: fn?.primary || '',   // the function glyph's id (owner 2026-10-14, step 4: the icons)
    // the pair's cta_verdict — off the cover since cdafa7e (owner 2026-09-04);
    // it renders on the FUNCTION tile and the reading page
    verdict: pair?.cta_verdict || '',
    // THE AXIS HOMING (owner structure ruling 2026-09-03): the reading
    // assembles across two axes — define ¶ and advise ¶ come from the
    // ELEMENT_PAIR (the family defines the FUNCTION, face-agnostic, so a
    // two-faced element needs no anchor), the keyword LEDGER comes from the
    // ELEMENT_GOD cells (the god defines the CHARACTER, dominance-weighted,
    // door-rotated). Both corpora complete 2026-09-04 (harvest ×20 + god
    // batch ×44) — the v3 fallback render is retired. Card teaser = the
    // reading's first sentence.
    ...((() => {
      const pole = (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst';
      // THE DEFINITION BY PERSONA (owner M2, 2026-10-17): the pair's head (its
      // first two sentences: the function, the element) + the lead persona's own
      // tail from its god cell; the 2+2 page (two personas under 60% each) keeps
      // the pair's one shared text, the reader read as one person; a Balanced
      // chart reads the pair's balanced text. A cell without a tail falls back
      // to the shared text.
      const shared = fn ? ((pole === 'friction' ? fn.definition_friction : fn.definition_catalyst) || '') : '';
      const twoFaced = r.faces.length > 1 && r.faces[0].share < 60;
      const tail = twoFaced ? null : K2_CELLS[`${r.hz}_${r.god}`]?.fnReading?.[pole]?.define;
      const head = (t) => (t.match(/[^.!?]+[.!?]+/g) || []).slice(0, 2).map((x) => x.trim()).join(' ');
      const raw = !fn ? ''
        : model.condition === 'Balanced' && fn.definition_balanced ? fn.definition_balanced
        : tail ? `${head(shared)} ${tail}` : shared;
      // display de-dup (owner 2026-09-02): the claim TITLES the section now,
      // so the reading renders with its claim clause stripped — "As a
      // friction, it is intake…" / "Running over, it is…". Corpus untouched.
      const prefix = `${r.name} is your ${fnLabel}, and `;
      const rest = raw.startsWith(prefix) ? raw.slice(prefix.length) : null;
      const stripped = rest ? rest.charAt(0).toUpperCase() + rest.slice(1) : raw;
      // (the derived first-sentence teaser retired 2026-09-04 — the FUNCTION
      // tile's meaning line is the authored cta_verdict, owner ruling)
      return {
        // THE FUNCTION METRICS (owner 2026-10-14, REA_19): three bars computed
        // from the chart (the two gods' shares, the energy's balance), the
        // gloss lines transcribed from the station's FUNCTION_METRICS axis.
        // THE CHARACTER's title line (owner 2026-10-14, Q2 of the eyebrow
        // rulings: pole-specific): the state the chart gives this energy,
        // in the register's own words for it.
        // (function.advise_balanced is stored, not rendered: catalyst and Balanced pages end on THE EDGE, owner 2026-10-17)
        fnReading: fn ? { define: stripped, characterLine: characterLine(r, model.condition), metrics: functionMetrics(r, model.band), ledger: r.fnRows, advise: fn[`advise_${pole}`] || '', remedy: pole === 'friction' ? remedyOf(fn[`advise_${pole}`] || '') : null, edge: pole === 'catalyst' ? edgeOf(r) : null } : null,
      };
    })()),
    // (FACE-SPLIT line + ledger god tags RETIRED the day they shipped —
    // owner 2026-09-03: "too explicit" + "we only introduce the concept of
    // ten-god later on". The weighted blend stays but renders unlabeled;
    // the ten-god vocabulary is first taught in THE DOMAINS, per the
    // revelation ladder, where the minority face keeps its god block.)
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


// ────────────────────────────────────────────────────────────────
// The function an energy runs for this core, and the pieces of its page the
// P4 diagnosis recaps (THE REMEDY's energy, THE EDGE, THE CHARACTER's line).
// ────────────────────────────────────────────────────────────────

// The §5f function an energy runs for this core (the pair cell's primary),
// Family fallback for an unbatched pair.
export function fnKeyFor(m, r) {
  return PAIR_CELLS[`${m.core.hz}_${r.hz}`]?.function?.primary
    || String(FAMILY_FN[r.family] || '').toLowerCase();
}

export function fnLabelFor(m, r) {
  const key = fnKeyFor(m, r);
  return (K2_FUNCTIONS.find((f) => f.key === key) || {}).label || FAMILY_FN[r.family] || '';
}

// THE REMEDY BOX (owner 2026-10-14): a friction advice opens on the energy
// prescription, "Seek Wood, the Action energy." (v0.7.5, the beat first). The
// app splits that first sentence off as the box's title line and reads the
// energy to seek from it, so the box can carry that element's glyph and tint
// and open its page. The station field is untouched; a friction advice that
// does not open on "Seek <Element>," renders as a plain box with no energy.
const EL_KEY = { Metal: 'metal', Earth: 'earth', Wood: 'wood', Water: 'water', Fire: 'fire' };
export function remedyOf(advise) {
  const m = /^(Seek (Metal|Earth|Wood|Water|Fire), (?:your own )?the ([A-Z][a-z]+) energy\.|Seek (Metal|Earth|Wood|Water|Fire), [^.]*\.)\s*/.exec(advise || '');
  if (!m) return null;
  const name = m[2] || m[4]; const fn = m[3] || (/your own ([A-Z][a-z]+) energy/.exec(m[1]) || [])[1] || null;
  return { el: EL_KEY[name], name, fn, beat: m[1], rest: advise.slice(m[0].length) };
}

// THE EDGE (owner 2026-10-15, three calls): on the catalyst pole the page's last
// section is three talents (each tied to a bar), three places across the life
// domains and one action, authored per ELEMENT_GOD cell (`edge` in k2.js once
// adopted). The lead god's cell speaks. Before adoption a dev preview hook
// (`window.__edgePreview[cell]`) lets the owner read a candidate set in the app.
export function edgeOf(r) {
  const god = r.god || r.faces?.[0]?.god; if (!god) return null;
  const cell = `${r.hz}_${god}`;
  const preview = (typeof window !== 'undefined' && window.__edgePreview) ? window.__edgePreview[cell] : null;
  const e = preview || K2_CELLS[cell]?.edge || null;   // a preview, where one is injected, wins over the station for the owner's read
  if (!e) return null;
  // v2 (owner 2026-10-15, the same size and format as THE REMEDY): a claim
  // line, one body of about fifty-five words, one bar, two domain marks.
  // v3 (owner 2026-10-15, the comment on the side-by-side): the manual
  // bulleted by discipline, a lead line, one line per domain, one action.
  // v4, the door (owner 2026-10-15 evening): a claim, a lead, three rows (one per
  // ruling domain in the canonical taxonomy, a phrase each, a tap into THE
  // DOMAINS at that word), the metric's dots in the head. No action row.
  // v6 (owner 2026-10-16): the claim, the lead, the three ruling domains as
  // doors (nothing written beneath them), the metric's dots in the head.
  // v8 (owner 2026-10-16, E1): the head is derived in the screen (the character's
  // verb, the energy, its function); the cell carries the lead, the three ruling
  // domains and the metric. A claim, where an older preview carries one, is ignored.
  if (e.lead && (Array.isArray(e.domains) || Array.isArray(e.items))) { const domains = Array.isArray(e.domains) ? e.domains : e.items.map((i) => i.domain); return { cell, god, lead: e.lead, items: domains.map((d) => ({ domain: d })), metric: e.metric || null, domains }; }
  if (e.claim && e.body) return { cell, claim: e.claim, body: e.body, metric: e.metric || null, domains: Array.isArray(e.domains) ? e.domains : [] };
  if (!Array.isArray(e.talents) || !Array.isArray(e.places)) return null;
  return { cell, talents: e.talents, places: e.places, action: e.action || '' };
}

// THE CHARACTER's title line (owner 2026-10-14, the function page's eyebrows,
// Q2: a pole-specific line). The state word is the one the register already
// uses for it: the core runs over (Overfueled) or short (Underfueled); the
// other energies run by volume, abundant reading heavy on the friction pole
// and full on the catalyst pole.
// THE CHARACTER's opening (owner 2026-10-16, twice: "Running thin / full are
// jargons", then "too long, it reads repetitive against the first paragraph
// ... whether we need to grow this energy or release it ... Use it or seek it
// more?"): the pole as the glossary pill, a two-word verdict that echoes the
// section that follows (the edge says how to USE a catalyst; the remedy sends
// a friction's reader to SEEK another energy, so this one is released), and a
// direction mark (grow / release / keep) the bars' visual language draws.
// Returns { pole, verdict, dir }.
export function characterLine(r, condition) {
  // Two verbs only (owner 2026-10-16): grow and release, the dial's own words,
  // so the verdict, the dial and the last section's kicker say the same thing.
  if (r.isCore) {
    return condition === 'Overfueled' ? { pole: 'cond', verdict: 'Release it.', dir: 'release', verb: 'release' }
      : condition === 'Underfueled' ? { pole: 'cond', verdict: 'Grow it.', dir: 'grow', verb: 'grow' }
        : { pole: 'cond', verdict: 'Keep the mix.', dir: 'keep', verb: 'keep' };
  }
  if (condition === 'Balanced') return { pole: 'cond', verdict: 'Keep the mix.', dir: 'keep', verb: 'keep' };
  const friction = r.role === 'friction' || r.coreExcess;
  if (friction) return { pole: 'friction', verdict: 'Release it.', dir: 'release', verb: 'release' };
  return { pole: 'catalyst', verdict: 'Grow it.', dir: 'grow', verb: 'grow' };
}

// The volumes a friction must reach to be overgrown (owner R3, 2026-09-16).
const PRESENT = new Set(['present', 'abundant', 'dominant']);
const NUM_WORD = ['No', 'One', 'Two', 'Three', 'Four', 'Five'];

// ────────────────────────────────────────────────────────────────
// P4 v4, THE DIAGNOSIS (owner 2026-10-17, the recommended set Q1–Q12 A):
// the Day Master page reads the chart's five energies as a diagnosis and
// adds no keyword of its own. Each row is a recap of that energy's function
// page, built by the same buildElementScreen the page uses:
//   · the line = the page's own definition state (the persona tail; the 2+2
//     page and a Balanced chart read the pair's shared text from sentence 3),
//     its pole opener dropped because the row's pill says it;
//   · the chips = the page's own keyword chips, in the page's order;
//   · the pointer = THE EDGE's three domains (catalyst, Balanced) or THE
//     REMEDY's energy (friction).
// A friction that is absent or thin shows no chips (R3: it cannot be
// overgrown). Order: frictions (cause) then catalysts (cure); a Balanced
// chart is one group by amount. The pool items and the carry rows retire.
// ────────────────────────────────────────────────────────────────
const POLE_OPENER = /^(As a catalyst|As a friction|Running thin|Running over|In balance), /;
const sentencesOf = (t) => (t || '').match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) || [];
// The door mark's volume words (owner R2, 2026-09-16), reused on the rows.
const DX_VOL = { absent: 'absent', thin: 'thin', abundant: 'wide', dominant: 'excess' };

export function buildDiagnosisModel(m) {
  if (!m) return null;
  const rowOf = (r) => {
    const s = buildElementScreen(m, r.el);
    const f = s?.fnReading; const fn = s?.fn;
    const pole = (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst';
    const twoFaced = r.faces.length > 1 && r.faces[0].share < 60;
    const tail = twoFaced ? null : K2_CELLS[`${r.hz}_${r.god}`]?.fnReading?.[pole]?.define;
    const state = !fn ? []
      : m.balanced && fn.definition_balanced ? sentencesOf(fn.definition_balanced).slice(2)
        : tail ? sentencesOf(tail)
          : sentencesOf(pole === 'friction' ? fn.definition_friction : fn.definition_catalyst).slice(2);
    const raw = state.join(' ').replace(POLE_OPENER, '');
    const line = raw.charAt(0).toUpperCase() + raw.slice(1);
    const quiet = !m.balanced && pole === 'friction' && !PRESENT.has(r.volume);
    return {
      el: r.el, name: r.name, hz: r.hz, isCore: r.isCore, presence: r.presence,
      fn: s?.fnLabel || fnLabelFor(m, r), fnKey: s?.fnKey || fnKeyFor(m, r),
      pole: m.balanced ? 'balanced' : pole,
      vol: r.isCore && r.volume === 'absent' ? 'unrooted' : r.isCore ? '' : (DX_VOL[r.volume] || ''),
      line,
      chips: quiet ? [] : (f?.ledger || []).map((x) => x.word),
      edge: f?.edge?.domains || null,
      remedy: f?.remedy ? { el: f.remedy.el, name: f.remedy.name, fn: f.remedy.fn } : null,
    };
  };
  const rows = Object.fromEntries(m.els.map((r) => [r.el, rowOf(r)]));
  const coreName = m.core.name;
  const nEase = m.skip.length; const nSeek = m.seek.length;
  // The lead (tpl_carry_lead): Overfueled and Underfueled as ruled; the
  // Balanced line re-cut (owner Q11 A, 2026-10-17: no "door", no "X, so Y").
  const lead = m.condition === 'Overfueled'
    ? `${coreName} runs Overfueled. ${NUM_WORD[nEase] || nEase} energies feed a core already full. ${NUM_WORD[nSeek] || nSeek} are where the surplus should go.`
    : m.condition === 'Underfueled'
      ? `${coreName} runs Underfueled. ${NUM_WORD[nSeek] || nSeek} energies are what the core is asking for. ${NUM_WORD[nEase] || nEase} already carry weight.`
      : `${coreName} runs Balanced. Your five energies hold each other, and none of them needs to grow or be released.`;
  const track = [...m.els].sort((a, b) => b.presence - a.presence).map((r) => ({
    el: r.el, name: r.name, presence: r.presence,
    mark: m.balanced ? null : m.seek.includes(r) ? 'seek' : m.skip.includes(r) ? 'ease' : null,
  }));
  const groups = m.balanced
    ? [{ kind: 'balanced', rows: [...m.els].sort((a, b) => b.presence - a.presence).map((r) => rows[r.el]) }]
    : [
      { kind: 'friction', rows: m.skip.map((r) => rows[r.el]) },
      { kind: 'catalyst', rows: m.seek.map((r) => rows[r.el]) },
    ].filter((g) => g.rows.length);
  // The first catalyst (the classical 用神, named in app words only, Q8 A).
  const first = m.balanced ? null : m.seek[0]?.el || null;
  // The condition reading (CONDITION_READING): row 2 names this chart's
  // Body (the core) and Mind (the element that feeds it).
  const mind = m.els.find((r) => !r.isCore && r.family === 'resource');
  const run = { body: coreName, mind: mind?.name || null, reading: CONDITION_READING[m.condition] || null };
  return { condition: m.condition, lead, track, groups, first, run };
}

// ── THE MERGED "YOUR READING" (owner 2026-10-18 →; rulings 2026-10-19/20) ──
// One model for the merged page: the first reading's eight cards, the wheel's
// relation labels, the energy sheet, "How am I running?" and its Codex
// panel. Text comes from content/mergedReading.js (the station's merged-
// journey fields); a cell not yet written falls back to a plain line built
// from the chart (heads), or is left out (stories, now lines).
const FAM_REL = { self: 'own', resource: 'feeds', officer: 'tames', output: 'you_feed', wealth: 'you_tame' };
const REL_HEAD_FALLBACK = { own: '{El} strengthens {the archetype}', feeds: '{El} feeds {the archetype}', tames: '{El} shapes {the archetype}', you_feed: '{El} draws from {the archetype}', you_tame: '{El} is shaped by {the archetype}' };
const YIN_STEMS = '乙丁己辛癸';
const fillT = (t, o) => (t ? t.replace(/\{([^}]+)\}/g, (x, k) => (o[k] != null ? o[k] : x)) : null);
const listJoin = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
const NUM_CAP = ['None', 'One', 'Two', 'Three'];

export function buildMergedModel(m, chart) {
  if (!m) return null;
  const yin = YIN_STEMS.includes(m.stem);
  const the = (m.archetype || '').replace(/^The /, 'the ');
  const cond = m.condition; const coreName = m.core.name;
  const rows = Object.fromEntries(m.els.map((r) => {
    const rel = r.isCore ? 'own' : FAM_REL[r.family];
    const key = `${m.core.hz}_${r.hz}`;
    const headT = yin ? null : PAIR_HEAD[key];
    const fnKey = fnKeyFor(m, r);
    const clause = NOW_LINE.fn_clause[cond]?.[fnKey]; const vol = NOW_LINE.volume_clause[r.volume];
    const s = buildElementScreen(m, r.el);
    return [r.el, {
      el: r.el, name: r.name, hz: r.hz, presence: r.presence, isCore: r.isCore, volume: r.volume,
      rel, relLabel: RELATION_LABELS[rel],
      head: fillT(headT || REL_HEAD_FALLBACK[rel], { El: r.name, 'the archetype': the }),
      story: yin ? null : (PAIR_STORY[key] || null),
      now: r.isCore ? NOW_LINE.core[cond] : (clause && vol ? `${clause}, and ${vol}.` : null),
      fn: fnLabelFor(m, r), fnKey,
      teaser: s?.verdict || '',
      pole: m.balanced ? 'balanced' : (r.role === 'friction' || r.coreExcess) ? 'friction' : 'catalyst',
      domains: GOD_RULING_DOMAINS[r.god] || [],
      presenceLine: r.presence > 0.5 ? fillT(PRESENCE_LINE.pattern, { n: r.presence, El: r.name }) : fillT(PRESENCE_LINE.clauses.absent, { El: r.name }),
    }];
  }));
  const order = m.balanced ? [...m.els].sort((a, b) => b.presence - a.presence) : [...m.skip, ...m.seek];
  const first = m.balanced ? null : m.seek[0] || null;
  const run = RUN_LINES[cond] || RUN_LINES.Balanced;
  const rx = m.balanced ? RX_RIBBON.clauses.balanced
    : fillT(RX_RIBBON.pattern, { ease: listJoin(m.skip.map((r) => r.name)), seek: listJoin(m.seek.map((r) => r.name)) });
  const start = first ? fillT(RX_RIBBON.clauses.start, { El: first.name, Function: rows[first.el].fn }) : null;
  // the Codex panel: the three tests (engine strengthTests, 2026-10-20)
  const t = chart?.dayMaster?.strengthTests || null;
  let codex = null;
  if (t) {
    const mEl = t.season.monthEl; const a = /^[AEIOU]/.test(mEl) ? 'an' : 'a';
    const reasonKey = t.season.ok && t.root.ok ? 'season_and_root' : !t.season.ok && !t.root.ok ? 'neither' : t.season.ok ? 'season_only' : 'root_only';
    const reason = fillT(CODEX_TESTS.reason[reasonKey], { Core: coreName }) || '';
    const seasonT = t.season.ok
      ? (mEl === coreName ? (CODEX_TESTS.season.pass_same || 'You were born in {a} {MonthEl} month, your own element.') : CODEX_TESTS.season.pass)
      : CODEX_TESTS.season.fail;
    codex = {
      score: fillT(CODEX_TESTS.score, { score: t.score, reason, Condition: cond, run: run.short.toLowerCase() }).replace(/\s+/g, ' '),
      tests: [
        { key: 'Season', ok: t.season.ok, pts: t.season.ok ? '+4' : '+0', text: fillT(seasonT, { a, MonthEl: mEl, Core: coreName }) },
        { key: 'Root', ok: t.root.ok, pts: t.root.ok ? '+2' : '+0', text: fillT(t.root.ok ? CODEX_TESTS.root.pass : CODEX_TESTS.root.fail, { Core: coreName }) },
        { key: 'Allies', ok: t.allies.ok, pts: t.allies.ok ? '+1' : '+0', text: fillT(t.allies.ok ? CODEX_TESTS.allies.pass : CODEX_TESTS.allies.fail, { N: NUM_CAP[t.allies.n] || String(t.allies.n), Core: coreName }) },
      ],
    };
  }
  const mind = m.els.find((r) => !r.isCore && r.family === 'resource');
  return {
    condition: cond, balanced: m.balanced, rows, order: order.map((r) => r.el), first: first ? first.el : null,
    who: STEM_WHO[m.stem] || m.maniEdge || '',
    runLine: fillT(run.line, { Core: coreName }), runShort: run.short, runHeadline: fillT(run.headline, { Core: coreName }),
    rx, start, codex, score: t ? t.score : null,
    reading: CONDITION_READING[cond] || null, body: coreName, mind: mind ? mind.name : null,
    ease: m.skip.map((r) => r.el), seek: m.seek.map((r) => r.el),
  };
}
