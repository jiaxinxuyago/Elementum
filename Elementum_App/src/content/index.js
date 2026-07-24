// ─────────────────────────────────────────────────────────────────────────────
// CONTENT · public API barrel
// ─────────────────────────────────────────────────────────────────────────────
// Generated archetype text/content + the resolver that maps a chart to it.
// Depends on `@/engine` (for band resolution) and `@/contract` (schema) only.
// UI consumers import from here (`@/content`); never deep-import a source file.
//
// Curated (not `export *`) on purpose: STEM_CARD_DATA (component-facing card
// data) is exported here from archetypeSource.js. The internal band×pattern
// variant lookup lives in stemVariants.js as STEM_VARIANTS (kept private to
// resolveVariant) — deliberately a distinct name to avoid overloading.
// ─────────────────────────────────────────────────────────────────────────────

// Archetype card data
export {
  STEM_CARD_DATA,
  TG_CARD_DATA,
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

// Self-Report — the composed personal report (DES_04 §12 Card 3, v1 no-LLM)
export { composeSelfReport } from './selfReportContent.js';

// Schema coverage / QA utilities
export { walkSchema, coverageSummary, coverageFor } from './archetypeCoverage.js';
