// ===================================================================
// ELEMENTUM · Canonical Ten-God user-facing names
// ===================================================================
// Registry: Documents/Designengineering/READING_CONCEPT_INVENTORY.md §2
// (D12a ruling — mythic-persona register). The engine's literal
// translations ("Seven Killings", "Rob Wealth", …) are INTERNAL ONLY
// and must never render. Import from here wherever a Ten God is named
// outside TG_CARD_DATA (which already carries these names).
// ===================================================================

export const TG_PERSONA = {
  '比肩': 'The Mirror',
  '劫财': 'The Rival',
  '食神': 'The Muse',
  '伤官': 'The Edge',
  '偏财': 'The Horizon',
  '正财': 'The Steward',
  '七杀': 'The General',
  '正官': 'The Arbiter',
  '偏印': 'The Alchemist',
  '正印': 'The Sage',
};

export const tgPersona = (zh) => TG_PERSONA[zh] || '';
