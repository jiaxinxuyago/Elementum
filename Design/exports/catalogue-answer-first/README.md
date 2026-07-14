# Elementum · Reading Catalogue & Identity Card Redesign
## Design Handoff — Answer-First Catalogue Exploration

**Status:** active exploration · current candidate **P-01** (`p1-consolidated.html`)
**Branch:** `claude/cloud-github-edits-1s7h92` · repo `jiaxinxuyago/Elementum`
**Reference chart used throughout:** 庚 Yang Metal · The Blade · concentrated ·
Metal 40 / Earth 30 / Wood 20 / Water 10 / **Fire 0 (missing)** — chosen because it
is the hardest honest case: the dominant element is the friction, and the missing
element is the major catalyst.

Every file here is a **self-contained HTML mockup** (all art base64-inlined).
Double-click to open in any browser — no server, no install. Files marked
*clickable* are working prototypes: taps navigate, modals open, content swaps.

---

## 1 · Purpose

**The user-test finding that started this work:** users landing on the Reading
tab did not know where to start reading, and did not know who they are (Day
Master + energy dominance). The most-asked question, verbatim:

> "So what energy is good for me? I need to know the energy I need."

The shipped catalogue answers a different question — *"what are you made of"*
(a presence-ranked wheel + shelf). This exploration redesigns the catalogue and
the identity card so the surface answers, in order:

1. **Who am I?** — Day Master + core energy, with strong keywords
2. **Which energy is good / bad for me?** — Catalyst vs Friction, phrased
   plainly as **"the energy you need / the energy you don't"**
3. **What do these energies mean, and what do they say about me?** —
   representation, personality, strengths, flaws
4. **What's the deeper message?** — descent into the full readings

## 2 · Locked decisions (do not relitigate)

| Decision | Detail |
| --- | --- |
| **Vocabulary** | `Catalyst` / `Friction`, verbatim. Plain framing "the energy you need / the energy you don't". Never surface 用神/忌神, "useful god", internal relation names (self/resource/output/wealth/officer), or banned terms ("Dominant Energies", "Forces in Motion", "Ten Gods", "Seven Killings", "Luck Cycle", "Seasonal Calibration"). |
| **Reading flow** | Identity first (Day Master + core, keywords), then prescription (need / don't), then depth. Equal cognitive load between identity and prescription — "a patient who doesn't know their symptoms can't trust the cure." |
| **Dominance wheel** | LOCKED. Size ∝ presence (D_MIN 40 → D_MAX 64), seats by rank (dominant at 12 o'clock, clockwise descending), ink-dot node art, 庚 enso seal ring at center. H's ↑/↓ valence pips + the seal-red catalyst thread are approved overlays ON the wheel — the wheel itself is never restyled. Engine source: `Elementum_App/src/engine/dominanceWheel.js` + `Design/exports/DOMINANCE_WHEEL_RULES.md`. |
| **Day master seal ring** | LOCKED design element (`concept-arts/stems/geng.png` family). The continuity object across plate → wheel center → identity card. |
| **Aesthetic** | The Library system, no new visual vocabulary. Sources of truth: `Design/assets/Library/primitives-library.html` (tokens, type, iconography, surfaces) and `Design/assets/Library/Elementum Screen Gallery_CurrentScreens.html` (screen aesthetics). Hanging-scroll art direction was explored and SET ASIDE by owner. |
| **No italics as display** | v2 rule: italic restricted to sub-headlines + microcopy only. |
| **Chop-red** | `--seal #A04030` maximum once per screen (the catalyst thread is that one use). |

## 3 · The four locked components

Everything from `journey.html` onward composes these four. Preserve them in any
future iteration:

- **C1 · The Four Lines** — the reading summary. Four verdicts of equal weight:
  *You are (The Blade) · Your core (Metal, concentrated) · You need (Fire) ·
  You ease (Earth)*. One card, never four separate cards (owner direction).
  Three approved text treatments exist (Couplet / Ledger / Cascade — see P-01);
  Couplet is studio-recommended, owner pick pending.
- **C2 · The Dominance Wheel** — the signature visual. Locked geometry + art;
  carries ↑/↓ pips per node and the seal-red thread from center seal to the
  major catalyst node. Nodes, seal, and (in list contexts) rows are all live
  navigation — "three doors, one room."
- **C3 · The Shareable Identity Card** — one design everywhere (owner call:
  "full card everywhere"): seal · mono eyebrow (`YOUR DAY MASTER · 庚 YANG
  METAL`) · archetype name in **walnut** · Cinzel pinyin · manifesto (always
  kept) · five-element distribution strip (dashed ghost segment for missing
  elements) · Core / ↑ Catalyst / ↓ Friction chips · keyword chips · Cinzel
  foundry mark. Opens as a **floating window** from a page-head pill, the wheel
  seal, or the "You are" line; carries Share / Save image / Copy link (mirrors
  the built `ShareCardOverlay` + `ShareIdentityCard`, 540×960 export).
- **C4 · The Energy Tiles** — five painted tiles/cards, prescription-ordered
  (feed first: Fire · Water · Wood, then ease: Earth · Metal), each descending
  to that element's detailed reading page (hero + verdict + meaning +
  "what it says about you").

## 4 · Design language quick reference

Extracted verbatim from the two Library sources (full ledger rendered inside
`p1-consolidated.html`):

| Role | Spec | Source |
| --- | --- | --- |
| Archetype display | Cormorant Garamond 38/400/ls0.5 · **walnut `#5a4430`** | primitives `.headline-pair .blade` |
| Card/hero names | Cormorant Garamond 22–26 / **500** | gallery `.fd-name`, `.htitle` |
| Manifesto | Cormorant Garamond *italic* 19/500 (scaled in-card) | primitives `.tagline` |
| Eyebrow (locked DOC5 §3) | EB Garamond 10/500/ls2.5 uppercase | primitives `.eyebrow` |
| Kicker keys ("YOU ARE") | Cinzel 10/400/ls2 uppercase | primitives `.kicker` |
| Pinyin | Cinzel 11/ls3 | gallery `.d13 .pinyin` |
| Foundry mark | Cinzel 10.5/ls2 + 8.5/ls3.5 | gallery `.foundry` |
| Body | EB Garamond 13.5 / 1.55 | both |
| Data / % | JetBrains Mono (700 nodes; 500/ls1 labels) | gallery `.node .pc` |
| CJK | Noto Serif TC/SC | both |
| CTA | Cinzel 12/ls4 on bronzeDark pill | primitives `.btn.pill-cta` |

Pigments, alpha ladder (10/1A/40/CC/100), spacing + radius scales, and the
3-surface taxonomy (cardstock / tinted×5 / quiet): see `primitives-library.html`.
Element pigments: metal `#8BA3B8/#6A849A` · wood `#7A9E6E/#587A4D` · fire
`#C4745A/#9E5540` · earth `#B89A6A/#927750` · water `#5A7FA8/#3E5F85` ·
up `#4a7a52` · down `#a85c48`.

**Copy is production copy, verbatim, wherever it exists.** Headlines ("The
forge you borrow, never own."), poetic tags ("Radiance · the rising heat"),
experiential meaning lines ("the room is different before you speak"), the
manifesto, the three claims, FACE_CARD keywords + teasers, foundry mark.
Sources: `Elementum_App/src/content/reading/*.js`, DOC2/DOC3.
**Core keywords (Precision · Standard · Edge) are PLACEHOLDERS** pending the
owner's finessing pass.

## 5 · Iteration history (oldest → newest)

Each file is a complete, openable snapshot of its stage. Read in this order to
understand why the current design looks the way it does.

### `index.html` — B-02 · "The Answer-First Catalogue" *(origin)*
Prescription promoted from a buried ribbon to the surface's opening statement,
inscribed into the identity plate (not boxed cards). Established: catalyst/
friction as first-viewport content, wheel valence layer (pips), "size is how
much you carry" hint. CSS-approximated art (pre-production-assets).
**Learned:** the inscribed-plate idea carried forward; the pure
prescription-first order later proved too prescriptive (see F–H).

### `variants.html` — C · D · E · three navigations *(clickable: E)*
First production-asset build (ink dots, 庚 seal, element paintings, painted
grounds, catalyst/friction brush arrows). Three leads: **C Two Gates**
(verdict-led painted doors), **D Scroll of Meaning** (meaning-led scripture
bands), **E Compass** (interactive wheel + readout). Introduced the
face-representation second layer (§7). **Owner:** leaned E, then C — but
diagnosed the whole batch as "prescription without symptoms."

### `variants-2.html` — F · G · H · the equal-load pivot *(clickable: F)*
Identity restored to equal weight; flow becomes *who you are + core first,
then prescription*. **F Anchored Compass** (E + first-class identity card),
**G Three Gates** (identity gate first), **H The Placard** (four equal lines +
twin cards). **Owner: picked H** — "prescriptive, self-explanatory,
hierarchically informative" — but demanded a real art direction on top of it.

### `hanging-scroll.html` — H-ART · the ink-wash colophon *(SET ASIDE)*
H recomposed as a hanging-scroll painting (colophon inscriptions, chop-seal 用
thread, mist vision of the missing element). Owner rejected the direction:
too far from the app's established aesthetic. **Kept for the record** — the
three-composition exploration and its rationale are documented inside.

### `h-library.html` — K · L · H in the house style *(clickable, scrollable)*
The corrective: H's exact hierarchy re-clothed in the **rendered-screens-v2
Library aesthetic** (plates, idmini card, painterly heroes, cardstock, bleed
rows). **K Rice-Paper Bleed** (catalogue-native, unfold-in-place rows) and
**L Painterly Destination** (blade-painting hero, "Your Catalyst" cardstock).
The idmini identity card from K is the card the owner later locked (screenshot
approval). First build with headless-browser screenshot verification.

### `journey.html` — J-01 · the full journey *(clickable prototype)*
The four components named and locked; built as one navigable phone:
Catalogue → Day Master page → share sheet (mirroring the built
`ShareCardOverlay`) → element reading pages ×5 (verdict / meaning / says-about-
you with FACE_CARD teasers verbatim). Journey map on the sheet syncs with and
drives the phone. This file defines the **target IA**.

### `layouts.html` — M · N · O · layout variations *(clickable)*
Same components, three arrangements, primitives-unified. **M Cleared Desk**
(identity leaves the scroll → floating card window; stones grid; tile
carousel), **N Anchor Wheel** (wheel-first), **O The Ledger** (four lines as a
poster placard). Studio call: M's structure + O's placard.

### `p1-consolidated.html` — **P-01 · CURRENT CANDIDATE** *(clickable)*
The consolidation: M's structure · the rich identity card (owner's screenshot)
as ONE design in-app and in-export · the four lines as ONE card with **three
switchable layouts** (Couplet 對聯 / Ledger / Cascade — live switcher on the
sheet, owner pick pending) · full font audit applied and documented.

## 6 · Implementation mapping (for the build agent)

| Mockup element | Production component |
| --- | --- |
| Catalogue surface | `Elementum_App/src/components/reading/EnergyCatalogue.jsx` |
| Wheel + pips/thread overlay | `DominanceWheel.jsx` (overlay only; `engine/dominanceWheel.js` untouched) |
| Four-lines card | new component; data from `buildEnergyChart.js` + `energyRoles.js` |
| Identity card / floating share | `ShareCardOverlay.jsx` + `ShareIdentityCard.jsx` (extend with chart + chips), entry pill in catalogue header |
| Energy tiles | `EnergyShelf.jsx` successor; art keys from `content/reading/surfaceContent.js` `ENERGY_TILE` |
| Element reading pages | `ReadingFacesScreen.jsx` (verdict/meaning/says layers) |
| Day Master page | `ReadingDayMasterScreen.jsx` (L's blade hero + claims + prescription pair) |
| Roles/verdicts | ALL computed by `engine/energyRoles.js` — nothing new is calculated |

## 7 · The second layer — face representations (NEEDS OWNER SIGN-OFF)

Each Ten-God face carries a one-word representation (owner-confirmed example:
**The Horizon = Enterprise**). The other nine are DERIVED from locked FACE_CARD
keywords and must be confirmed or replaced with the owner's original list:

| Face | Representation | Keywords (locked) |
| --- | --- | --- |
| 比肩 The Twin | Selfhood | independent, resolute, self-made |
| 劫财 The Rival | Drive | driven, competitive, bold |
| 食神 The Artisan | Craft | fluent, generous, easeful |
| 伤官 The Virtuoso | Brilliance | brilliant, unruly, daring |
| 正财 The Steward | Security | steady, accruing, enduring |
| 偏财 The Horizon | **Enterprise** (confirmed) | expansive, sensing, distant |
| 七杀 The General | Challenge | forging, relentless, decisive |
| 正官 The Magistrate | Discipline | principled, measured, ordered |
| 偏印 The Alchemist | Intuition | intuitive, unorthodox, transmuting |
| 正印 The Sage | Wisdom | grounding, nurturing, patient |

Renders as the "Says about you: **The General** · CHALLENGE — forging,
relentless, decisive" line on element readings and (future) the Day Master card.

## 8 · Open questions

1. **Four-lines layout pick** — Couplet vs Ledger vs Cascade (P-01 switcher).
2. **Representation lexicon sign-off** — §7.
3. **Core keywords** — Precision · Standard · Edge are placeholders.
4. **Balanced band register** — `energyRoles.js` gives balanced charts no
   friction set; the need/don't pair requires gentler copy ("lean toward /
   lean away") for that band.
5. **Catalyst-not-missing case** — when the major catalyst is present in the
   chart, the MISSING chip drops; verify the need-line still lands.
6. **Navigate-to-depth vs unfold-in-place** — J-01/P-01's page descents vs K's
   accordion rows; user-test question.
7. **Reveal handoff** — the onboarding ceremony should land on this catalogue;
   the plate-dissolve beat ("You are The Blade. What you need is Fire.") is
   proposed, unmocked.

## 9 · Asset & method notes

- Painted assets inlined from production: `Elementum_App/public/concept-arts/`
  (dots, stems, library tiles), `public/backgrounds/` (plates), Library
  `rendered-screens-v2/art/` (blade painting `metal-geng.png`, forces arrows
  `cat-forces.png`). Tiles/plates are downscaled JPEG-on-silk (~20–50 KB each);
  dots and the seal keep PNG alpha.
- Google Fonts are linked in each file's head; offline they fall back to
  Georgia — open online once for true typography.
- Every clickable build since K/L was **verified with headless-Chromium
  screenshots** (all screens + interaction states) before delivery. Keep that
  bar: don't hand off unrendered HTML.
- The wheel node coordinates in the mockups are the real rule at scale 0.92:
  diameters 59/53/48/42/37, seats −90°/−18°/54°/126°/198°, container 320×292.

## 10 · Provenance

Built July 2026 in the "Identity Card Re-design · Catalyst vs Friction
Direction" working session, from the owner's user-test findings, on branch
`claude/cloud-github-edits-1s7h92`. Companion design docs:
`Documents/Designengineering/DOC1–DOC10`, `READING_CONCEPT_INVENTORY.md`,
`Design/Wireframes/CLAUDE_DESIGN_BRIEF_d13-journey.md`,
`Design/handoff-claude-design/00-MASTER-CONTEXT.md`.
