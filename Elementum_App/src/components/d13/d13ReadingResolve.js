// ===================================================================
// ELEMENTUM · D13 Part 2 — wire authored readings into the D13 surfaces
// ===================================================================
// Maps the existing authored content into the reading screens:
//   · P4 Day Master card  ← STEM_CARD_DATA, band×pattern-resolved
//     (the "10×3 stem bands" — yourNature / gifts / shadows per band).
//   · P6/P7 energy cards   ← TG_CARD_DATA, by the energy's dominant
//     Ten-God relative to the Day Master (the "dominant ten-god
//     archetypes"). Each element resolves to its same-polarity god, so
//     the five energies map to {比肩 偏印 食神 偏财 七杀} = Mirror /
//     Alchemist / Muse / Horizon / General — matching the design.
// Internal Ten-God vocabulary never surfaces; only the persona names do.
// ===================================================================

import { STEM_CARD_DATA } from '../../content/archetypeSource.js';
import { TG_CARD_DATA } from '../../content/archetypeSource.js';
import { TG_PERSONA } from '../../content/tgNames.js';
import { resolveArchetype } from '../../content/resolveVariant.js';

// element generation (sheng) + control (ke) cycles
const GEN = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
const CTL = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };

// hero art per element (thumbnail-library wash variant)
export const ENERGY_ART = {
  metal: '/concept-arts/library/t_metal_1_w.png',
  wood: '/concept-arts/library/t_wood_1_w.png',
  fire: '/concept-arts/library/t_fire_1_w.png',
  earth: '/concept-arts/library/t_earth_2_w.png',
  water: '/concept-arts/library/t_water_1_w.png',
};

// energy element → its dominant Ten-God (same-polarity convention) relative
// to the Day Master element. Returns the internal 中文 key into TG_CARD_DATA.
export function tenGodForEnergy(dmEl, el) {
  const d = (dmEl || '').toLowerCase();
  const e = (el || '').toLowerCase();
  if (e === d) return '比肩';          // self / companion → The Mirror
  if (GEN[e] === d) return '偏印';     // resource (feeds DM) → The Alchemist
  if (GEN[d] === e) return '食神';     // output (DM feeds it) → The Muse
  if (CTL[d] === e) return '偏财';     // wealth (DM controls it) → The Horizon
  if (CTL[e] === d) return '七杀';     // officer (controls DM) → The General
  return '比肩';
}

// P4 — band-resolved Day Master reading. claim 1 (the inscription) is added
// by the screen; here we return the authored gift + shadow as claims 2–3 and
// the band-characteristic nature as the edge layer.
export function resolveDayMasterReading(stem, chart) {
  const baseline = STEM_CARD_DATA[stem];
  if (!baseline) return null;
  const a = resolveArchetype(stem, baseline, chart);
  const gift = (a.gifts && a.gifts[0] && a.gifts[0].desc) || '';
  const shadow = (a.shadows && a.shadows[0] && a.shadows[0].desc) || '';
  const nature = (a.yourNature && a.yourNature.desc) || '';
  return { claims: [gift, shadow].filter(Boolean), edge: nature };
}

// P6/P7 — energy reading from the dominant Ten-God archetype card.
export function resolveEnergyReading(dmEl, el) {
  const zh = tenGodForEnergy(dmEl, el);
  const tg = TG_CARD_DATA[zh];
  const persona = TG_PERSONA[zh] || (tg && tg.name) || '';
  if (!tg) return { persona, tail: '', r: '', x: '', gate: { label: `Seeker — the full reading`, body: '' } };
  const realm = (tg.rulingRealm && tg.rulingRealm.phrase) || '';
  // strip the trailing gloss after the em dash for a clean persona-line tail
  const tail = realm.split(' — ')[0].toLowerCase();
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
      body: 'Where this energy turns to its shadow · how it shapes your work and bonds · the season it peaks.',
    },
  };
}
