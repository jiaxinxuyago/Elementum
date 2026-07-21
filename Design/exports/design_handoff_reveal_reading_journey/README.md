# Handoff: Reveal → Reading Journey (Elementum · Reading tab)

## Overview
The complete first-run journey for the Reading tab: **the Naming** (day-master reveal ceremony) → **the Dissolve** (seal travels into the dominance wheel) → **the Reading Catalogue** (identity-first scroll: hero → wheel → diagnosis → catalyst/friction columns → five energy pills → seal dock) → **Day Master reading** and **five Element reading** screens → routes into the existing full reading pages. One archetype (Gēng · The Blade) is fully built; every component binds to template fields so all ten day masters render from data.

## About the Design Files
The files in this bundle are **design references created in HTML** — clickable prototypes showing intended look and behavior, not production code. The task is to **recreate them in the Elementum app codebase** (its existing React environment, component patterns, and `engine/energyRoles.js`) — pixel-verbatim.

## Dispatch prompt (paste into Claude Code)
> Implement the Reading-tab journey from `design_handoff_reveal_reading_journey/`. The source of truth is `catalogue-answer-first/p6-journey.html` — the LIVE phone (`#phoneP`, 394×draggable) is the spec; recreate it pixel-verbatim in our React app using existing app patterns. Read, in order: (1) this README top to bottom; (2) `template-data.json` — the data contract; every text, %, icon, and verdict binds to a field there, in three classes: VOCABULARY constants (locked words — never synonymize), ARCHETYPE fields (per-stem, 10 variants — nulls come from DES_12's persona table, never invent), USER_CHART fields (computed by `engine/energyRoles.js` only). (3) `catalogue-answer-first/p6-breakdown-boards.html` — static anatomy boards: every component's fields, states, and exact class recipes, plus 1:1 PNG captures in `art/boards/`. (4) `README-design-history.md` — locked decisions; do not relitigate them. Rules that override instinct: Chinese glyphs are decorative only; chop-red `#A04030` at most once per screen; no italics; black circle-arrow = the one read/navigate affordance; wheel placement law and cast-line law as specified in `template-data.json`; the Naming plays first-run only (persist a completion flag on the user, not localStorage); reduced-motion shows every animation's settled state. Wire the three `data-route` buttons to the existing reading pages (see Routes). Do not add content, sections, or vocabulary not present in these files.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, motion timing, and interaction states are final (one exception: §7 face vocabulary, flagged in `template-data.json`, awaits owner sign-off). Recreate pixel-verbatim with the app's libraries.

## Scope — the journey, mapped
1. **The Naming** (`data-screen="reveal"`) — blank plate → ink-dissolve of the stem painting (1.3s, wash ghost first) → seal chip stamps → GĒNG · YANG METAL → arch name → manifesto (≤30 words) → cast line → "Swipe up". Tap skips to settled; second tap continues. First-run only.
2. **The Dissolve** — swipe/drag (springs back under 30%): the day-master image itself descends into the wheel's center slot (one continuous object — the wheel's center art stays hidden until touchdown), the five dots fade in Core-first then clockwise, page settles at the catalogue top.
3. **The Catalogue** (`data-screen="catalogue"`) — beats ink in on scroll: identity hero (chop) → YOUR FIVE ENERGIES wheel + Folio diagnosis tile → SEEK THESE / SKIP THESE columns → five energy pills (towers) → seal dock (sticky). Every element mention is a door: wheel dots, column rows, dock seals, pill read circles all open that element's reading.
4. **Readings** — `data-screen="daymaster"` (hero, WHO YOU ARE, catalyst/friction cards, CTA) and `data-screen="element"` (template filled per element from ELD). The identity-card float's "Read the full Day Master →" navigates to the daymaster screen.
5. **Exits** — three `data-route` buttons (below).

## Routes & integration points
- `reading/energy/:element` — element screen "Full reading" → the app's EXISTING per-energy reading pages. Design reference included: `reference/elementum-d13-part2-readings.html`.
- `reading/daymaster` — day-master screen CTA → the existing Day Master reading page.
- Tab bar: only the Reading tab is in scope; other tabs toast in the prototype.
- Identity card share/save/copy are stubbed flashes — wire to the app's share sheet.

## The archetype template (all ten day masters)
Every component is data-bound; nothing is hard-coded to Gēng except the demo. Field classes, per `template-data.json`:
- **VOCABULARY** (app constants): relation nouns Core/Root/Drive/Voice/Duty; keywords Independence/Insight/Caution/Flow/Force; condition verdicts Overfueled/Balanced/Underfueled; approaches Channel/Refill; panel headers; role labels.
- **ARCHETYPE** (per stem): pinyin, polarity, element, arch name, manifesto, 3 keyword chips, WHO YOU ARE paragraph, stem painting (`art/stems/proc/`). The ten-stem wheel gallery in the p6 sheet demonstrates the wheel across all ten.
- **USER_CHART** (engine): percents, roles, major/missing flags, condition, approach, cast line. The demo is the Gēng reference chart (M40 E30 W20 A10 F0).
Component → field binding is drawn on the anatomy boards (`p6-breakdown-boards.html`, breakdowns 01–03).

## Interactions & behavior (spec lives in the prototype + boards)
Ceremony timing (≈2.6s cascade), beat ink-ins (IntersectionObserver, threshold 0.12), pill accordion + dock↔pill loop (select from dock/wheel → glide + unfold; refold on scroll-up), ink-stroke row cue, Folio fold, toasts for out-of-scope taps. All animations have reduced-motion settled states. Persist first-run completion server-side.

## State management
`screen` (reveal | catalogue | daymaster | element), `openElement`, `firstRunDone` (user flag), `chart` (engine payload per `user_chart_fields.schema`). No design-side calculation — `engine/energyRoles.js` owns roles, condition, approach.

## Design tokens
Defined verbatim in `:root` of `p6-journey.html` — copy from there (paper/ink/bronze families, five element pigments + deeps, `--seal #A04030`). Type: Cormorant Garamond (display), EB Garamond (serif body), Cinzel (eyebrows), JetBrains Mono (data). No italics anywhere.

## Assets
- `art/stems/proc/*.png` — ten official stem paintings (paper-normalized; production origin: assets/TenStems + concept-arts).
- `art/bg/bg-reveal-01-distant-peaks.png`, `bg-reveal-02-floating-island.png` (Naming ground), `bg-energymap-01-top-band.png` (catalogue ground) — placement CSS copied pixel-verbatim from the current app reference.
- `catalogue-answer-first/assets/geng-seal.png` — day-master seal chip; element wash plates + seal ring are base64-inlined in the HTML.
- `art/boards/pill-open-*.png` — 1:1 captures of each pill expanded (394px shell).
- Icon system: inline SVG `<symbol>` defs in each HTML file (elements, roles, pips, chevrons, tabs).

## Files
- `catalogue-answer-first/p6-journey.html` — THE prototype (live phone + sheet: journey map, ten-stem gallery, legend, replay button).
- `catalogue-answer-first/p6-breakdown-boards.html` — static anatomy boards + PNG gallery. `p6-breakdown-tiles.html` — live HTML component states.
- `catalogue-answer-first/README-design-history.md` — locked decisions + full iteration history.
- `template-data.json` — the data contract (this is the file to implement against).
- `reference/elementum-d13-part2-readings.html` — the existing full reading pages the routes land on.
