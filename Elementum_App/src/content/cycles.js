// ===================================================================
// ELEMENTUM · cycles — the 生/克 cycle vocabulary (REA_02 §5d, LOCKED)
// ===================================================================
// The cognition floor (owner 2026-08-14): the two cycles among the five
// energies, as data. Law verbs are uniform so equations template
// ("Fire feeds Earth" · "Water tames Fire"); each edge carries its
// image line (first-surfacing mnemonic, myth-decoder cadence).
// Consumers (upcoming, design directions ruled 2026-08-14): the wheel's
// cycle arrows, element-screen seat derivations, the seek/skip team
// sentence, the Codex cycles chapter.
// ===================================================================

// 生 — the generating ring (each element feeds the next).
export const FEEDS = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };

// 克 — the taming chords (the pentagram).
export const TAMES = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };

// Law verbs (REA_02 §5d — uniform equation grammar).
export const LAW_VERB = { feeds: 'feeds', tames: 'tames' };

// Image lines per edge, keyed `${a}>${b}`.
export const CYCLE_LINE = {
  'wood>fire': 'dry branches make the flame',
  'fire>earth': 'ash becomes soil',
  'earth>metal': 'ore grows in the mountain',
  'metal>water': 'dew beads on the cold blade',
  'water>wood': 'rain raises the forest',
  'wood>earth': 'roots hold the hillside',
  'earth>water': 'banks give the river its path',
  'water>fire': 'rain ends the blaze',
  'fire>metal': 'the forge softens the blade',
  'metal>wood': 'the knife prunes the branch',
};

// 生助 vs 克泄耗 relative to the day master (REA_02 §5d team nouns).
// Inflow = Root (feeds you) + Core (stands with you);
// Outflow = Voice (you feed) + Drive (you tame) + Duty (tames you).
export const TEAM_NOUN = { inflow: 'Inflow', outflow: 'Outflow' };
export const FAMILY_TEAM = { resource: 'inflow', self: 'inflow', output: 'outflow', wealth: 'outflow', officer: 'outflow' };
