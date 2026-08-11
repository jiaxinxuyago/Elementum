// ===================================================================
// ELEMENTUM · D13 Part 2 — wire authored readings into the D13 surfaces
// ===================================================================
// Maps the existing authored content into the reading screens:
//   · P4 Day Master card  ← STEM_CARD_DATA, band×pattern-resolved
//     (the "10×3 stem bands" — yourNature / gifts / shadows per band).
//   · P6/P7 energy cards   ← TG_CARD_DATA, by the energy's dominant
//     Ten-God relative to the Day Master (the "dominant ten-god
//     archetypes"). v2.1: each element resolves POLARITY-AWARE — its
//     dominant present face (yang/yin by weight), via the engine's
//     resolveElementFaces → energy.leadGod. (Was hard-locked to the
//     same-polarity register; that bug is retired.)
// Internal Ten-God vocabulary never surfaces; only the persona names do.
// ===================================================================

import { STEM_CARD_DATA, TG_CARD_DATA, TG_PERSONA, resolveArchetype } from '../../content/index.js';

// element generation (sheng) + control (ke) cycles
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };

// Per-persona refinements — the poetic persona-line tail + the Seeker gate
// teaser, in the design voice (the Alchemist + General entries match the
// design exemplars exactly). Keyed by the internal Ten-God; the tails are
// presence-neutral (the ghost register already signals absence) and the
// teasers follow the design's three-part "·" shape. No internal vocabulary.
// Exported for the REA_16 voice audit (registry: code:readingResolve#PERSONA_COPY).
export const PERSONA_COPY = {
  '比肩': { // The Twin
    tail: 'the inner standard you measure by before any other.',
    teaser: 'Where this conviction turns to a closed door · how it shapes your work and bonds · the season it stands alone.',
  },
  '劫财': { // The Rival
    tail: 'the edge that sharpens against equals.',
    teaser: 'Where this drive turns to loss through rivalry · how it shapes your work and bonds · the season it competes.',
  },
  '食神': { // The Artisan
    tail: "ease that makes things, expression that flows before it's forced.",
    teaser: 'Where this ease turns to drift · how it shapes your work and bonds · the season it pours.',
  },
  '伤官': { // The Virtuoso
    tail: 'brilliance that will not be told how.',
    teaser: 'Where this brilliance turns to friction · how it shapes your work and bonds · the season it cuts.',
  },
  '偏财': { // The Horizon
    tail: 'the world read as opportunity, the far thing already within reach.',
    teaser: 'Where this reach turns to overreach · how it shapes your work and bonds · the season it widens.',
  },
  '正财': { // The Steward
    tail: 'value built one honest increment at a time.',
    teaser: 'Where this care turns to holding too tight · how it shapes your work and bonds · the season it gathers.',
  },
  '七杀': { // The General
    tail: "pressure that doesn't grant permission. You don't carry it; you meet it.",
    teaser: 'Where this pressure turns to harshness · how it shapes your work and bonds · the season it tests.',
  },
  '正官': { // The Magistrate
    tail: 'authority that earns its weight by being fair.',
    teaser: 'Where this order turns to rigidity · how it shapes your work and bonds · the season it judges.',
  },
  '偏印': { // The Alchemist
    tail: "nourishment that transmutes. It's the ground your edge is forged on.",
    teaser: 'Where this nourishment turns to over-protection · how it shapes your work and bonds · the season it peaks.',
  },
  '正印': { // The Sage
    tail: 'the quiet support that steadies you before you ask.',
    teaser: 'Where this support turns to dependence · how it shapes your work and bonds · the season it deepens.',
  },
};

// ≤8w face-card abstract per persona — the prologue conclusion line. Sourced
// from REA_02_Concept_Dictionary §2 (the canonical definition lines' payoff
// clause). Placeholder-grade authored copy until the K2 corpus lands.
export const FACE_ABSTRACT = {
  '比肩': 'The standard you hold yourself to',
  '劫财': 'The edge of comparison',
  '食神': 'Giving that feels like being',
  '伤官': 'Brilliance made of what it meets',
  '偏财': 'Opportunity sensed at a distance',
  '正财': 'Value built and kept',
  '七杀': 'The trial that forges',
  '正官': 'The standard that steadies',
  '偏印': 'Insight that transmutes',
  '正印': 'The root that holds',
};

// The life-domain an energy governs for you, by its lead Ten-God family
// (DM-relative — 财/印/官杀/食伤/比劫). Drives the dominant-energy card's brief.
const DOMAIN_BY_GOD = {
  '比肩': 'your own register — the standard you measure others by',
  '劫财': 'your own register — the edge you sharpen against equals',
  '食神': 'what flows out of you — expression that feels like being',
  '伤官': 'what flows out of you — brilliance that will not be told how',
  '偏财': 'your wealth & desire — the world read as opportunity',
  '正财': 'your wealth & desire — value built and kept',
  '七杀': 'the pressure that shapes you — the trial you answer to',
  '正官': 'the order that steadies you, the standard you keep',
  '偏印': 'your support & nourishment — the ground your edge is forged on',
  '正印': 'your support & nourishment — the root that holds you',
};
export function energyDomain(leadGod) { return DOMAIN_BY_GOD[leadGod] || ''; }

// hero art per element (thumbnail-library wash variant)
export const ENERGY_ART = {
  metal: '/concept-arts/library/t_metal_1_w.png',
  wood: '/concept-arts/library/t_wood_1_w.png',
  fire: '/concept-arts/library/t_fire_1_w.png',
  earth: '/concept-arts/library/t_earth_2_w.png',
  water: '/concept-arts/library/t_water_1_w.png',
};

// ⚠ DEPRECATED (v2.1) — polarity-BLIND fallback only. Hard-codes the
// same-polarity (偏) register, so it can never reach the 正 half of the Ten
// Gods. The reading now resolves the polarity-correct god via the engine
// (`resolveElementFaces` → `energy.leadGod`); this remains only as a safety
// fallback when leadGod is absent. Do not build new code on it.
export function tenGodForEnergy(dmEl, el) {
  const d = (dmEl || '').toLowerCase();
  const e = (el || '').toLowerCase();
  if (e === d) return '比肩';          // self / companion → The Twin
  if (GEN[e] === d) return '偏印';     // resource (feeds DM) → The Alchemist
  if (GEN[d] === e) return '食神';     // output (DM feeds it) → The Artisan
  if (CTL[d] === e) return '偏财';     // wealth (DM controls it) → The Horizon
  if (CTL[e] === d) return '七杀';     // officer (controls DM) → The General
  return '比肩';
}

// P4 — claims 2–3 from the band-resolved authored reading (gift + shadow).
// Claim 1 (the inscription) is added by the screen. The nature paragraph on
// P4 renders the LOCKED baseline directly (2026-08-05 wiring); band-resolved
// yourNature returns here when R4 re-authors the variants under REA_16.
export function resolveDayMasterReading(stem, chart) {
  const baseline = STEM_CARD_DATA[stem];
  if (!baseline) return null;
  const a = resolveArchetype(stem, baseline, chart);
  const gift = (a.gifts && a.gifts[0] && a.gifts[0].desc) || '';
  const shadow = (a.shadows && a.shadows[0] && a.shadows[0].desc) || '';
  return { claims: [gift, shadow].filter(Boolean) };
}

// P6/P7 — energy reading from the dominant Ten-God archetype card.
export function resolveEnergyReading(dmEl, el, leadGod) {
  // v2.1: prefer the polarity-aware `leadGod` resolved in buildEnergyChart
  // (engine resolveElementFaces). Fall back to the legacy polarity-blind
  // lookup only if it's somehow missing.
  const zh = leadGod || tenGodForEnergy(dmEl, el);
  const tg = TG_CARD_DATA[zh];
  const persona = TG_PERSONA[zh] || (tg && tg.name) || '';
  if (!tg) return { persona, tail: '', r: '', x: '', gate: { label: `Seeker — the full reading`, body: '' } };
  const copy = PERSONA_COPY[zh] || {};
  // refined poetic tail; fall back to the ruling-realm phrase if unmapped
  const realm = (tg.rulingRealm && tg.rulingRealm.phrase) || '';
  const tail = copy.tail || realm.split(' — ')[0].toLowerCase();
  const out = tg.outputs || [];
  return {
    persona,
    tail,
    r: (out[0] && out[0].desc) || (tg.rulingRealm && tg.rulingRealm.desc) || '',
    x: (out[1] && out[1].desc) || (out[0] && out[0].desc) || '',
    gate: {
      // drop the persona's leading article so it reads "the full Alchemist reading"
      label: `Seeker — the full ${persona.replace(/^The /, '')} reading`,
      // a TEASE of what's behind the paywall — never the full PRO body (which
      // carries internal Ten-God vocabulary that must not surface).
      body: copy.teaser || 'Where this energy turns to its shadow · how it shapes your work and bonds · the season it peaks.',
    },
  };
}
