# Handoff: Reveal → Reading Journey (Elementum · Reading tab)
**Round 2 — updated 2026-07-23.** Adds the locked **Shareable Identity Card (Tiles)**, the **footer note chips + glossary sheet**, and the **energy-tile redesign**. Round-2 sources of truth: `catalogue-answer-first/share-flow.html` (live) + breakdowns 03–07 on `p6-breakdown-boards.html`.
**Round 3 — polish pass, same date:** four flagged changes (dock re-seated · gallery-seal ring underlay · SEEK/SKIP sentence rows · card tile headers) — see `README-round3.md`; where round 3 conflicts with anything below, round 3 wins.

## Overview
The complete first-run journey for the Reading tab: **the Naming** (day-master reveal ceremony) → **the Dissolve** (seal travels into the dominance wheel) → **the Reading Catalogue** (identity-first scroll: hero → wheel + Folio diagnosis → catalyst/friction columns → five energy pills → seal dock + footer word chips) → **Day Master reading** and **five Element reading** screens → routes into the existing full reading pages. One archetype (Gēng · The Blade) is fully built; every component binds to template fields so all ten day masters render from data.

## About the Design Files
The files in this bundle are **design references created in HTML** — clickable prototypes showing intended look and behavior, not production code. The task is to **recreate them in the Elementum app codebase** (its existing React environment, component patterns, and `engine/energyRoles.js`) — pixel-verbatim.

## Dispatch prompt (paste into Claude Code)
> Implement the Reading-tab journey from `design_handoff_reveal_reading_journey/`. TWO sources of truth: `catalogue-answer-first/p6-journey.html` for the Naming ceremony + Dissolve, and `catalogue-answer-first/share-flow.html` (the current build) for everything on and after the catalogue — its LIVE phone (`#phoneP`) is the spec for the identity hero, wheel, Folio, prescription columns, the REDESIGNED energy pills, the FOOTER WORD CHIPS + GLOSSARY SHEET, and the LOCKED Tiles IDENTITY CARD with its share rail. Where the two files differ, share-flow.html wins. Read, in order: (1) this README top to bottom — especially "Round 2 delta & action items"; (2) `template-data.json` — the data contract; every text, %, icon, and verdict binds to a field there, in three classes: VOCABULARY constants (locked words — never synonymize), ARCHETYPE fields (per-stem, 10 variants — nulls come from DES_12's persona table, never invent), USER_CHART fields (computed by `engine/energyRoles.js` only). (3) `catalogue-answer-first/p6-breakdown-boards.html` — static anatomy boards: every component's fields, states, and exact class recipes (breakdowns 04 = identity card, 05 = footer chips + glossary sheet, 06 = full icon legend, 07 = wheel law). (4) `README-design-history.md` — locked decisions; do not relitigate them. Rules that override instinct: Chinese glyphs are decorative only; chop-red `#A04030` at most once per screen; no italics; black circle-arrow = the one read/navigate affordance; wheel placement law and cast-line law as specified in `template-data.json`; the Naming plays first-run only (persist a completion flag on the user, not localStorage); reduced-motion shows every animation's settled state. Wire the three `data-route` buttons to the existing reading pages (see Routes). Do not add content, sections, or vocabulary not present in these files.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, motion timing, and interaction states are final (one exception: §7 face vocabulary, flagged in `template-data.json`, awaits owner sign-off). Recreate pixel-verbatim with the app's libraries.

---

## ROUND 2 DELTA & ACTION ITEMS (implement these against share-flow.html)

### A1 · The Shareable Identity Card — LOCKED: the Tiles design
One card everywhere (floating window in-app AND the rendered share/export image). Extends/replaces `ShareCardOverlay.jsx` + `ShareIdentityCard.jsx`.
- **Anatomy (top → bottom, breakdown 04):** mono eyebrow `ELEMENTUM · YOUR IDENTITY` → the **locked dominance wheel at 0.68 scale** (day-master painting in the center, live user dots + pips) → archetype name (Cormorant 29/500, walnut) → manifesto (regular weight — no italics) → 3 keyword chips → **core line** (element mark + "Metal *is your Core*" + `OVERFUELED` pill, on a core-element-tinted plate) → **Catalyst | Friction twin tiles**: per energy a relation noun + vertical dominance bar + % (Fire renders an empty bar at 0%).
- **Dimensions:** 300×544 preview; export render target **540×960** (9:16). Archetype-only — **no personal name** (owner call, max shareability). No QR on the locked card (the QR + @elementum.life hook from the earlier `identity-card.html` exploration was dropped from the locked Tiles design).
- **Entry points (all present in share-flow):** the round share button at the hero's top-right · the wheel center seal · the float's "Read the full Day Master →" navigates to the daymaster screen.
- **Share rail beneath the card:** Instagram → **Story composer hand-off** (the prototype mocks IG's composer; production = OS share / IG Stories intent with the rendered PNG) · TikTok · X · Save image (clean 540×960 render, no chrome) · Copy link (per-user card URL). Prototype flashes are stubs — wire to the app share sheet.
- **Variants:** Wheel and Blueprint card layouts are RETIRED but kept dormant in the prototype for rollback (`window.__cardInner`). Ship Tiles only.
- **Data binding:** wheel dots/pips + bars + core line + condition pill = USER_CHART; name/manifesto/keywords/painting = ARCHETYPE; all labels = VOCABULARY.

### A2 · Footer note chips + glossary sheet (NEW components)
The catalogue now ends on a taught-words footer; each chip opens a glossary modal.
- **WordsNote** (`.wordsnote`): eyebrow `THE WORDS ON THIS PAGE · TAP ONE` + the four vocabulary chips exactly as they render in the reading above — `Core` (ink) · `Overfueled` (bronze, vessel icon) · `↑ Catalyst` (green) · `↓ Friction` (red). Sits at the scroll end of the catalogue (margin-top:auto — it closes the page).
- **GlossarySheet** (`#wordpopP` / `.wp-sheet`, breakdown 05): centered modal, 300px, radius 20, scrim rgba(43,39,34,0.44), spring-in 320ms. Anatomy: role-tinted hero band (tint map: `t-core` ink-gray · `t-cond` bronze · `t-cat` green · `t-fric` red) with the word's icon as a rotated watermark (−9°, 15%) + close ×; eyebrow `IN YOUR READING`; the tapped chip at 1.16 scale; the **locked plain-language definition** (copy verbatim from the prototype's `W` map — grade-6/7, never paraphrase); **Codex row** ("Deeper in the Codex — the full reading of this word").
- **Codex route:** destination surface is NOT in this scope — the row and the Folio's ?-circle both point at the same future `codex/:word` route; stub with the app's standard not-yet toast.
- **Seal dock: KEPT (owner call 2026-07-23).** The sticky five-energy seal dock stays alongside the footer chips — dock above the tab bar (with the dock↔pill hand-off loop), footer word chips at the scroll end beneath the towers. An earlier share-flow draft hid the dock; the current file restores it.

### A3 · Energy reading tiles — REDESIGNED (breakdown 03 + `p6-breakdown-tiles.html`)
Replaces the previous keyword/verdict/flavor card. `EnergyShelf.jsx` successor.
- **Collapsed spine (towers):** element **name** (Metal…) → relation noun (Core / Root / Drive / Voice / Duty) → element mark → dominance fill (height = p/pMax·84%) → mono % → outlined unfold chevron. Closed shelf reads as the relation string at a glance.
- **Expanded card, locked field order:** 1 element sign + name eyebrow (`METAL`, Fire adds `· Missing` in friction red) → 2 five-segment dominance bar (own element solid + white inset; hatched ghost sliver for missing) + % → 3 **definition line** "Metal is Your Core" (Cormorant 17/600) → 4 one-line explanation ("This energy is you — your identity and your footing among equals.") → 5 **diagnosis line** "Your Metal is **Overfueled** — **Channel** it." → 6 role chips (filled pills: `Core` / `↑ Catalyst` / `↓ Friction`; Metal carries Core + Friction; Fire's Catalyst chip carries the major ring) → 7 three keyword-adjective chips, pole-tinted (§4b adjectives, e.g. Walled-off · Solitary · Immovable) → 8 black read circle → element reading.
- **Removed from the old design:** the corner role ring (`.sp-rg`), the `sp-hook` glance label, the pole-noun verdict ("curdling into Isolation…"), and the flavor line. Do not port them.
- **⚙ Engine action item:** the diagnosis line is now **per element**, not core-only — `energyRoles.js` must expose a per-element condition + remedy pair (demo mapping: over-present → Overfueled·Channel; catalysts/thin → Underfueled·Refill; Balanced → Balanced·keep). Verify the mapping with the owner before generalizing beyond the reference chart.
- The five `art/boards/pill-open-*.png` captures are **stale (previous design)** — the live frames in `p6-breakdown-tiles.html` are current.

### Also updated this round (don't miss)
- **Wheel:** no visual change (still locked) — but the full written law now lives on **breakdown 07** (geometry rule, seating law, pip rules, seal behavior, intro motion) and in the journey sheet's expanded wheel-anatomy ledger. Implement against it.
- **Full iconography legend (breakdown 06):** every mark incl. the round-2 additions — share/save/copy-link/close glyphs, Instagram/TikTok/X platform chips, Codex glyph, ?-circle, taught-word chips, dock seal. Reuse one SVG symbol set.
- **Element thumbnail boards** (`art/boards/thumb-*.png`, breakdown 03 tail): the painted art direction (5 concepts × 3 ratios per element) that tile/reading art iterates on — reference only, not UI.
- **Sheet nav switcher** (`.omnav`) on the three HTML sheets is **design-doc chrome only** — do NOT implement in the app.
- Cast-line timezone engine flag (birthTz + abbr) from round 1 still stands.

---

## Scope — the journey, mapped
1. **The Naming** (`data-screen="reveal"`) — blank plate → ink-dissolve of the stem painting (1.3s, wash ghost first) → seal chip stamps → GĒNG · YANG METAL → arch name → manifesto (≤30 words) → cast line → "Swipe up". Tap skips to settled; second tap continues. First-run only.
2. **The Dissolve** — swipe/drag (springs back under 30%): the day-master image itself descends into the wheel's center slot (one continuous object — the wheel's center art stays hidden until touchdown), the five dots fade in Core-first then clockwise, page settles at the catalogue top.
3. **The Catalogue** (`data-screen="catalogue"`) — beats ink in on scroll: identity hero (chop) → YOUR FIVE ENERGIES wheel + Folio diagnosis tile → SEEK THESE / SKIP THESE columns → five energy pills (towers, redesigned per A3) → **footer word chips (A2)** → seal dock (sticky). Every element mention is a door: wheel dots, column rows, pill read circles all open that element's reading.
4. **Readings** — `data-screen="daymaster"` (hero, WHO YOU ARE, catalyst/friction cards, CTA) and `data-screen="element"` (template filled per element from ELD). The identity-card float's "Read the full Day Master →" navigates to the daymaster screen.
5. **Exits** — three `data-route` buttons (below) + the Codex stub (A2).

## Routes & integration points
- `reading/energy/:element` — element screen "Full reading" → the app's EXISTING per-energy reading pages. Design reference included: `reference/elementum-d13-part2-readings.html`.
- `reading/daymaster` — day-master screen CTA → the existing Day Master reading page.
- `codex/:word` — glossary sheet Codex row + Folio ?-circle (surface not in scope; stub).
- Tab bar: only the Reading tab is in scope; other tabs toast in the prototype.
- Identity card share/save/copy are stubbed flashes — wire to the app's share sheet (A1).

## The archetype template (all ten day masters)
Every component is data-bound; nothing is hard-coded to Gēng except the demo. Field classes, per `template-data.json`:
- **VOCABULARY** (app constants): relation nouns Core/Root/Drive/Voice/Duty; keywords Independence/Insight/Caution/Flow/Force; condition verdicts Overfueled/Balanced/Underfueled; approaches Channel/Refill; panel headers; role labels; the four glossary definitions (A2).
- **ARCHETYPE** (per stem): pinyin, polarity, element, arch name, manifesto, 3 keyword chips, WHO YOU ARE paragraph, stem painting (`art/stems/proc/`). The ten-stem wheel gallery in the journey sheet demonstrates the wheel across all ten.
- **USER_CHART** (engine): percents, roles, major/missing flags, per-element condition + remedy (A3 flag), cast line. The demo is the Gēng reference chart (M40 E30 W20 A10 F0).
Component → field binding is drawn on the anatomy boards (`p6-breakdown-boards.html`, breakdowns 01–07).

## Interactions & behavior (spec lives in the prototypes + boards)
Ceremony timing (≈2.6s cascade), beat ink-ins (IntersectionObserver, threshold 0.12), pill accordion (one open; refold on scroll-up; arrival beckon pulse 1100ms), ink-stroke row cue, Folio fold, glossary sheet open/close (A2 timings), identity-card float + IG composer hand-off, toasts for out-of-scope taps. All animations have reduced-motion settled states. Persist first-run completion server-side.

## State management
`screen` (reveal | catalogue | daymaster | element), `openElement`, `openWord` (glossary sheet), `cardOpen`, `firstRunDone` (user flag), `chart` (engine payload per `user_chart_fields.schema`). No design-side calculation — `engine/energyRoles.js` owns roles, condition, approach.

## Design tokens
Defined verbatim in `:root` / `.phone` of `share-flow.html` — copy from there (paper/ink/bronze families, five element pigments + deeps, `--up #4a7a52`, `--down #a85c48`, `--seal #A04030`). Type: Cormorant Garamond (display), EB Garamond (serif body), Cinzel (eyebrows), JetBrains Mono (data). No italics anywhere.

## Assets
- `art/stems/proc/*.png` — ten official stem paintings (paper-normalized; production origin: assets/TenStems + concept-arts).
- `art/bg/bg-reveal-01-distant-peaks.png`, `bg-reveal-02-floating-island.png` (Naming ground), `bg-energymap-01-top-band.png` (catalogue ground) — placement CSS copied pixel-verbatim from the current app reference.
- `catalogue-answer-first/assets/geng-seal.png` — day-master seal chip; element wash plates + seal ring are base64-inlined in the HTML.
- `art/boards/pill-open-*.png` — ⚠ stale (previous tile design); use the live frames in `p6-breakdown-tiles.html`.
- `art/boards/thumb-*.png` — element thumbnail art-direction sheets (reference).
- Icon system: inline SVG `<symbol>` defs in each HTML file (elements, roles, pips, chevrons, tabs, share rail, codex, platform glyphs).

## Files
- `catalogue-answer-first/share-flow.html` — **THE round-2 prototype** (live phone: catalogue with redesigned tiles, footer chips + glossary sheet, locked Tiles identity card + share rail + IG composer mock; sheet: ten-stem gallery, expanded wheel ledger, full legend, card-variant switcher).
- `catalogue-answer-first/p6-journey.html` — round-1 prototype; still the spec for the Naming ceremony + Dissolve.
- `catalogue-answer-first/p6-breakdown-boards.html` — static anatomy boards 01–07 + PNG/thumbnail galleries. `p6-breakdown-tiles.html` — all five redesigned pills, live HTML, both states.
- `catalogue-answer-first/README-design-history.md` — locked decisions + full iteration history (incl. the P7 round-2 entry).
- `template-data.json` — the data contract (this is the file to implement against).
- `reference/elementum-d13-part2-readings.html` — the existing full reading pages the routes land on.
