// ─────────────────────────────────────────────────────────────────────────────
// CONTENT · reading-surface copy barrel
// ─────────────────────────────────────────────────────────────────────────────
// Generated text/config for the reading screens (distinct from the per-archetype
// templates in the content root). Pure data — no engine/UI dependencies. Lives
// in the content chunk so copy edits never touch the UI chunk. Reading
// components import from here (`@/content/reading`).
// ─────────────────────────────────────────────────────────────────────────────

export { ENERGY_TILE, RIBBON_INTRO, ROLE_CFG, EL_DEEP } from './surfaceContent.js';

export {
  FACE_CARD,
  FAMILY_BRIEF,
  FAMILY_CLAUSE,
  FAMILY_ELEMENT,
  PERSONA_READING,
  PERSONA_DOMAINS,
} from './facesContent.js';

export { DM_READING, ENERGY_CONTENT, DM_READING_FALLBACK } from './readingContent.js';
