// ===================================================================
// ELEMENTUM · Canonical Ten-God user-facing names
// ===================================================================
// Registry: Reading/Documents/REA_03_Concept_Dictionary.md §2
// (D12a ruling — mythic-persona register). The engine's literal
// translations ("Seven Killings", "Rob Wealth", …) are INTERNAL ONLY
// and must never render. Import from here wherever a Ten God is named
// outside TG_CARD_DATA (which already carries these names).
// 2026-06-30 (FACES handoff — reading/IMPLEMENTATION_README §4): renamed 4 of 10 to
// the new register — 比肩 The Twin (was Mirror), 食神 The Artisan (was Muse),
// 伤官 The Virtuoso (was Edge), 正官 The Magistrate (was Arbiter).
// ===================================================================

export const TG_PERSONA = {
  '比肩': 'The Twin',
  '劫财': 'The Rival',
  '食神': 'The Artisan',
  '伤官': 'The Virtuoso',
  '偏财': 'The Horizon',
  '正财': 'The Steward',
  '七杀': 'The General',
  '正官': 'The Magistrate',
  '偏印': 'The Alchemist',
  '正印': 'The Sage',
};

export const tgPersona = (zh) => TG_PERSONA[zh] || '';
