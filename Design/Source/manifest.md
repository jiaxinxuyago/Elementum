# Elementum · Design System Manifest

Rewritten 2026-07-29 (design-folder cleanup Phase 4). The previous manifest
indexed the retired May-2026 legend stack; git history keeps it. This file is
the top-level map of the Design tree — the per-file authority lives inside
each Library file.

**HARD RULE (owner, 2026-07-28):** every design HTML tracks what the app
currently renders. Build from a live-usage inventory, stamp the audit date;
updating the affected Library file is part of any UI change's definition of
done.

**Carried forward from the old manifest (still open):** the v2.1 reconciliation
component list (2026-06-24, `Reading/Documents/_ARCHIVE_Reading_V2.1_Reconciliation_Audit.md`)
— `FacesScreen` (shipped as ReadingFacesScreen), `PersonaCard` presence-frame
variants, ruling-domain atom, `PositionalCard` (宫位 × 十神) — track build
status in DES_13.

## The six roots

| Root | Holds | Authority |
|---|---|---|
| `Documents/` | DES_04 App Design (+ §AMENDMENT locked rules) · DES_13 Audit Backlog · DES_14 Asset Map · DOMINANCE_WHEEL_RULES.md · HANDOFF_PART1.md (engine specs) | written design law |
| `Library/` | the north star — see below | visual design authority |
| `Assets/` | Backgrounds/ (24 plates + Concepts + originals backup) · Concept Arts/ · Moodboards/ (art) · Components/{DominanceWheel, TenStems, Thumbnails, cat, generic-icons, icons, iconography} · AppIcon.png | art reference database |
| `Wireframes/` | the d13 set (word budgets cited as LAW by the Reading docs) | historical spec, still cited |
| `Source/` | tokens.css (canonical CSS variables) · icons.svg (canonical icon sprite) · this manifest | code-facing sources |
| `Archive/` | superseded iterations + pre-JourneyCatalogue handoff bundles — README-indexed | history, NEVER authority |

## The Library (north star)

| File | Scope | Method |
|---|---|---|
| `Library_Primitives.html` | color, type, geometry, surfaces, motion + live-app reality panels | hand-authored vs tokens.css, audited vs the running app |
| `Library_Iconography.html` | every icon/glyph/seal/mark the app renders (3 sprites, painted art, CJK) | live-code census, art embedded |
| `Library_Components.html` | every recurring component, in the frozen-registry language (C1–C7, energy pills, floating windows) | live-code specs + rendered demos |
| `Library_Backgrounds.html` | screen→ground authority table (mirrored by src/styles/backgrounds.js) + all 24 plates + opacity law | live-code authority, plates embedded |
| `Library_Screens/` | per-surface capture galleries (Reading_Journey.html first) | Playwright captures of the running app (tools/capture-reading-screens.mjs) |
| `Library_ThumbnailCards.html` (+ folder) | the thumbnail-card art pool (155 paintings) | reference gallery |
| `Elementum Design Handoff_JourneyCatalogue/` | THE benchmark — the frozen component registry and locked reading-journey design | owner-locked handoff |

## Source files

- `tokens.css` — canonical CSS-variable set. Mirrors: `src/styles/tokens.js`/
  `tokens.jsx`, `public/tokens.css`. Edit here first; drift = doc-patch trigger.
  (Reality note: never loaded at runtime — spec, not delivery.)
- `icons.svg` — canonical sprite (34 symbols). Runtime consumer: `Icon.jsx` via
  `/icons.svg#id` (public mirror). Census + the two other live sprites:
  `Library_Iconography.html` §0.

## Maintenance

- Re-capture screens: `node tools/capture-reading-screens.mjs --app Elementum_App`
- Re-embed a library file's images: `node tools/embed-html-images.mjs <file> --root Elementum_App/public`
- Dev preview of the Library: mirrored at `Elementum_App/public/Library/` (dev-only; vite prunes it from dist)
