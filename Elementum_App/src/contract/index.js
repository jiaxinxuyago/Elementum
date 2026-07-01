// ─────────────────────────────────────────────────────────────────────────────
// CONTRACT · public API barrel
// ─────────────────────────────────────────────────────────────────────────────
// The neutral schema both the content chunk and dev tooling agree on. It has
// NO dependencies on engine, content, or UI — it is the shared vocabulary that
// defines archetype fields, tiers, bands, patterns, elements, and UI surfaces.
// Import the schema from here (`@/contract`), never deep-import the source file.
// ─────────────────────────────────────────────────────────────────────────────

export {
  SCHEMA_VERSION,
  TIERS,
  BANDS,
  PATTERNS,
  ELEMENTS,
  VARY_DIMENSIONS,
  VARY_CARDINALITY,
  VARY_LIBRARY,
  VARY_COMPOUND_EXAMPLES,
  SHAPES,
  ARCHETYPE_SCHEMA,
  ASSET_CONVENTIONS,
  UI_SURFACES,
  cardinalityOf,
} from './archetypeSchema.js';
