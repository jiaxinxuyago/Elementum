// ===================================================================
// ELEMENTUM · Canonical Ten-God user-facing names
// ===================================================================
// Registry: Reading/Documents/REA_02_Concept_Dictionary.md §2
// (D12a ruling — mythic-persona register). The engine's literal
// translations ("Seven Killings", "Rob Wealth", …) are INTERNAL ONLY
// and must never render. Import from here wherever a Ten God is named
// outside TG_CARD_DATA (which already carries these names).
// 2026-06-30 (FACES handoff — reading/IMPLEMENTATION_README §4): renamed 4 of 10 to
// the new register — 比肩 The Twin (was Mirror), 食神 The Artisan (was Muse),
// 伤官 The Virtuoso (was Edge), 正官 The Magistrate (was Arbiter).
// ===================================================================

// REA_02 §2 mandatory definition lines (V-class carved vocabulary; the em
// dash is the seal lines' structural dash, exempt from the prose purge).
// Surfaced on first god appearance — the Ruling Domains teaser + detail.
export const TG_DEFLINE = {
  '比肩': 'Same nature, same register — the standard you hold yourself to',
  '劫财': 'Same nature, different register — the edge of comparison',
  '食神': 'Output that flows from you — giving that feels like being',
  '伤官': 'Cross-current output — brilliance made of what it meets',
  '偏财': 'Wide-ranging engagement — opportunity sensed at a distance',
  '正财': 'Methodical, directed acquisition — value built and kept',
  '七杀': "Pressure that doesn't grant permission — the trial that forges",
  '正官': 'Framework-mediated pressure — the standard that steadies',
  '偏印': 'Unconventional nourishment — insight that transmutes',
  '正印': 'Nourishment that deepens without redirecting — the root that holds',
};

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
