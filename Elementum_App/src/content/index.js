// ─────────────────────────────────────────────────────────────────────────────
// CONTENT · public API barrel
// ─────────────────────────────────────────────────────────────────────────────
// Generated archetype text/content + the resolver that maps a chart to it.
// Depends on `@/engine` (for band resolution) and `@/contract` (schema) only.
// UI consumers import from here (`@/content`); never deep-import a source file.
//
// Curated (not `export *`) on purpose: STEM_CARD_DATA is defined in BOTH
// archetypeSource.js (the component-facing card data, exported here) and the
// internal STEM_CARD_DATA.js variant lookup (kept private to resolveVariant).
// See TODO(rule-4): rename the internal lookup to kill the name overload.
// ─────────────────────────────────────────────────────────────────────────────

// Archetype card data
export {
  STEM_CARD_DATA,
  TG_CARD_DATA,
  CLASSICAL_STEM_ANCHORS,
} from './archetypeSource.js';

// Chart → archetype resolution
export {
  resolveArchetype,
  resolveBlock,
  resolveText,
  variantKeys,
  archetypeKeyFor,
} from './resolveVariant.js';

// Ten-God personas
export { TG_PERSONA, tgPersona } from './tgNames.js';

// Daily guidance
export { getDailyGuidance } from './dailyGuidance.js';

// Schema coverage / QA utilities
export { walkSchema, coverageSummary, coverageFor } from './archetypeCoverage.js';
