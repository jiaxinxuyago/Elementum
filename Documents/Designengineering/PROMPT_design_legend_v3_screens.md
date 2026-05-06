# Prompt — Elementum Design Legend v3 (Full Screens)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v3-screens.html`
**Goal:** Build full screen designs for the dashboard, redesign the Reveal page around a new IA, and produce extensive modal/panel coverage for reading display patterns. v3 sits on top of v1 (primitives) and v2 (patterns) — composing from their atoms, never inventing new primitives.

The v1 legend (`Design/legend-primitives.html`) and v2 legend (`Design/legend-patterns.html`) are now both authoritative inputs.

---

## §0 — IA shift the user is locking with v3 (load-bearing)

Read this first — it changes the architecture v2 assumed:

1. **Reveal page is now the user's full Energy Map.** The current "You are The Blade" page expands to include the full energy summary (identity + Energy Map block) and ends with a CTA: **"Enter Your Readings"**.
2. **Tab bar no longer has a Map tab.** The five tabs become: `Today · Guidance · Reading · Friends · Profile`. The "Reading" tab replaces "Map".
3. **Reading page is a catalogue.** It's a page of reading cards, each leading to a reading section (Elemental Nature, Dominant Energies, etc.). At the top of the Reading page sits a button that takes the user to the Energy Map — same content as the Reveal page, minus the first-time framing.
4. **"Energy Blueprint" is renamed to "Energy Map"** — eyebrow text and section labels both. The whole Reveal page IS the Energy Map experience.
5. **Day master needs ink-wash icons for all 10 stems** (甲 乙 丙 丁 戊 己 庚 辛 壬 癸). v1 only locks five element-family marks; v3 commissions a 10-icon ink-wash set, one per Heavenly Stem.

This shift overrides DOC5 §11's prior "Energy Map = dashboard tab" framing. v3 is the new canonical IA — note this in §14 drift log so DOC5 gets patched after v3 is approved.

---

## §1 — Required inputs (attach all)

**Local files (upload to the conversation):**

1. `D:\Elementum\Elementum_Project\Documents\Designengineering\DOC5_App_Design.md`
   → Read §3.5 (locked primitives), §5 (screen flow), §6–§14 (every screen the user sees), §15 (shared components), §21 (upgrade flow), §22 (error states). Treat layout/IA as **revisable** under §0 above; treat color, typography, primitives as **locked**.

2. `D:\Elementum\Elementum_Project\Design\northstar-anchor.html`
   → Visual DNA. Every computed style canonical.

3. `D:\Elementum\Elementum_Project\Design\legend-primitives.html` — v1 legend (primitives)
   → Primitives. v3 must compose from these.

4. `D:\Elementum\Elementum_Project\Design\legend-patterns.html` — v2 legend (patterns)
   → Patterns. v3 builds on these (especially the modal taxonomy in v2 §5 — extend it, don't replace it).

5. `D:\Elementum\Elementum_Project\Design\assets\backgrounds\` — 16 painted background PNGs
   → Four families: `bg-energymap-*` (4) · `bg-onboarding-*` (4) · `bg-reading-*` (4) · `bg-reveal-*` (4). v3 must bake real backgrounds into screen mockups, not synthetic SVG ridges. The `bg-reading-*` family is currently unused and likely belongs to the new Reading page or to long-form reading containers.

6. `D:\Elementum\Elementum_Project\Design\reference\AppPages\` — 10 reference screenshots from The Pattern and Nebula
   → Filenames identify the source app (`Nebula (1).png` … `(5).png` and `The Pattern (1).png`, `The Pattern_01 (1).png` … `(3).png`). You still need to inspect each image to identify which screen of that app it shows. Use these for **layout / information architecture / navigation patterns ONLY**. See §3 below for the full constraint.

**In this canvas project (reference by filename):**

7. `Elementum - Pre-Dashboard Flow.html` — onboarding/welcome reference
8. `Reading Pages - V1 Prototype.html` — current Reveal/Energy Map content
9. `Reading Pages - Variations.html` — earlier reading variations
10. `Elementum - Visual Directions v2.html` — Ink & Pigment direction (ambient, superseded where it conflicts with anchor)

## §2 — Authority

Order of precedence when inputs disagree:
**anchor > v1 legend > v2 legend > DOC5 > §0 IA shift (revises DOC5 §11 only) > canvas references > reference apps**

The reference apps (The Pattern, Nebula) are at the bottom — they inform layout/IA only.

## §3 — Hard constraints (read carefully)

**Primitives — composition only, no invention:**
- color → v1 §1
- font / size / weight → v1 §2
- eyebrow → v1 §3
- radius → v1 §4
- spacing → v1 §5
- card surface → v1 §6 (plus v2 §14's proposed "elevated" variant if you need modal/blurred chrome)
- component atom → v1 §7 + v2 §6/§7

If a screen pattern needs a primitive not in v1+v2, **flag it in v3 §14 drift log** — never invent.

**Layout — has more latitude:**
DOC5 §10–§14 specs the dashboard screens textually but is silent on visual hierarchy. v3 has freedom to compose layouts from v1+v2 atoms, informed by the reference apps' IA. New layouts that require new primitives still trigger drift-log entries.

**Reference apps — layout / IA / navigation only:**
You can study The Pattern and Nebula for:
- ✅ How they organize a catalogue of cards
- ✅ How they transition list ↔ detail
- ✅ Where they place nav, headers, CTAs
- ✅ How they stack information density
- ✅ How they handle long-form reading content

You **must NOT** absorb:
- ❌ Their colors / palette
- ❌ Their typography choices
- ❌ Their iconography style
- ❌ Their button shapes / surface treatments / shadows / radii

Visual identity stays locked to silk / ink / bronze / EB Garamond / Cormorant / Cinzel + v1 + v2.

**Backgrounds — real PNGs, not synthetic:**
Every screen mockup must use a real PNG from `Design/assets/backgrounds/`. No synthetic SVG ridges, no flat silk fills as a substitute. v3 is also a creative-director pass — for every screen pick the background and add a one-line caption explaining why.

Pre-assigned backgrounds (do not change without justification):
- Welcome / Loading: `bg-reveal-04-mist-veil.png`
- Onboarding 1: `bg-onboarding-01-corner-stamp.png`
- Onboarding 2–7: `bg-onboarding-04-quiet-paper.png`

Open for v3 to assign:
- Reveal (redesigned): revisit — could stay `bg-reveal-04-mist-veil.png` or switch to one of `bg-reveal-01/02/03`
- Today / Guidance / Reading / Friends / Profile / Chart-Reveal: agent picks per screen
- Reading-modal containers (sheet / full-page / inline): consider `bg-reading-*` family

## §4 — Aesthetic direction

Same as v1/v2: silk paper, ink, bronze. Cormorant for display, EB Garamond for body, Cinzel for tracked-caps CTAs/labels, Noto Serif SC for hanzi. Eyebrows in the v1 §3 locked format (10px / EB Garamond / 2.5px ls / weight 500 / element-color@80% / uppercase).

The v3 doc itself is desktop-width, single column, no phone frame. Phone-frame mocks (390 × 844) appear inside the doc only when illustrating a screen.

## §5 — Output format

Single file: `elementum-design-legend-v3-screens.html`

Self-contained HTML, fonts via Google Fonts CDN, no build step, opens in any browser. Background PNGs referenced via relative path — the doc lives at `Design/legend-screens.html` and references `assets/backgrounds/...`.

**Structure:** top-level table of contents → each section wrapped in a `<details>` collapsible block (open by default). The reader can collapse sections they're not currently inspecting. Use `<details><summary>` with the v1 §3 eyebrow style for the section header.

---

## §6 — Sections to deliver (in this order)

For each section: **visual sample** (phone-frame mock at 390×844 where it's a screen) + **token / value annotations** + **rule citations** (DOC5 §X / v1 §Y / v2 §Z) + **background caption** (which PNG, why) where applicable.

### §1. Reveal page (redesigned per §0)

Single phone-frame mock, scrollable, top-to-bottom:

1. **Identity card** (existing) — uses one of the **10 day-master ink-wash icons** for the user's day master stem. Show three example renders with three different stems (e.g., 庚 Yang Metal / 乙 Yin Wood / 丙 Yang Fire) so the variety reads at a glance.
2. **Energy Map block** — eyebrow: "ENERGY MAP" (renamed from "Energy Blueprint"). Contains:
   - **Day-master condition + composition** — the existing blueprint with element bars (v1 §7 BlueprintRow). Composition row labels: Wood / Fire / Earth / Metal / Water with counts.
   - **Primary dominant** — large card, icon + name only, no body copy. Use v1 §6 tinted surface with the dominant element's pigment.
   - **Secondary dominant** — same card pattern, secondary element's pigment.
   - **Catalysts** — 1 to 2 cards (always at least 1; usually 2). Same icon + name pattern, smaller than dominant. Use v1 §6 tinted surface.
   - **Resistance** — 1 to 2 cards (always at least 1; usually 2). Same pattern.
3. **CTA: "Enter Your Readings"** — v1 §7 CTA pill (ink fill, silk text, Cinzel 12 / ls 4 / radius 999).

Background: revisit. Caption with rationale.

### §2. Reading page (NEW — catalogue)

Phone-frame mock. Top → bottom:

- **Page header** (v2 §13 pattern): `READINGS` eyebrow on the left, italic action on the right. The right action takes the user to **Energy Map** — text: "Energy Map →" with dashed underline (v1 §9 affordance).
- **Status bar** (44px) at the very top.
- **Catalogue body** — a scrollable list of reading cards. At minimum show:
  - **Elemental Nature** (base energy) — the foundational reading
  - **Dominant Energies** — primary / secondary expanded
  - **Forces in motion** (or whatever DOC5 §11 names them) — Catalysts + Resistance expanded
  - **Life Chapters** — placeholder for future chapter readings
  - One **locked** card to demonstrate the locked state from v2 §9 (e.g., "Daily Readings — Seeker")

Each card carries: small element/force icon (v1 §7 element marks at 22) · Cormorant 18 title · italic 14 description · subtle chevron `›` on the right. Use v1 §6 cardstock surface.

Reference apps for catalogue layout: The Pattern's "Today" cards and Nebula's catalogue/feed views are good IA references — study the card density, the typography hierarchy within each card, the spacing rhythm. Apply our visual identity, not theirs.

Background: pick from `bg-reading-*` family. Caption with rationale.

### §3. Energy Map (destination page from Reading)

Same content as §1's Reveal page but **without the first-time framing**. The page header reads `‹ Reading` on the left, and the CTA at the bottom is removed (or replaced with a quieter action — propose).

### §4. Today screen

DOC5 §10 specifies the content textually; v3 fills in the visuals.

Phone-frame mock. Likely sections (compose from v1+v2 atoms, study The Pattern's Today screen for IA inspiration):
- Page header: `TODAY` + date in italic on right
- Daily energy snippet — the inline-expansion modal pattern from v3 §10 below
- Today's reflection card (Cormorant 24 title + body in EB Garamond 16)
- A compact preview of one or two readings that updated today
- Quick action chips (e.g., "Draw an element" → Elemental Draw feature)

Background: agent picks. Caption.

### §5. Guidance screen

DOC5 §12 — premium feature hub.

Phone-frame mock. Structure (from DOC5 §12):
- Page header: `GUIDANCE`
- Vertical stack of feature cards — Energy Manual / AI Consultant / Daily Readings / Compatibility Studies / Elemental Draw
- Free users see all cards with **lock-state strips** (v2 §9). Tapping a locked card opens the **upgrade modal** (v2 §5C, also the `Pattern C` upgrade sheet).

Background: agent picks. Caption.

### §6. Friends screen

DOC5 §13 — compatibility studies.

Phone-frame mock. Structure:
- Page header: `FRIENDS`
- Friend list (v1 §6 cardstock cards with stem seal + name + compatibility score)
- "+ Add a friend" affordance (could be a tertiary button per v2 §6, or a dashed-border card)
- Show one friend whose card is tapped → triggers **bottom-sheet modal** (v2 §5A) with their compatibility result (use v2 §5's existing Mei × Geng example as model)

Background: agent picks. Caption.

### §7. Profile screen

DOC5 §14.

Phone-frame mock. Structure:
- Page header: `PROFILE` + "Edit" pencil action on right (v2 §13 third variant)
- Identity ribbon (v1 §7) — personal mark
- Birth data summary (date / hour / location / gender) in a quiet-secondary card (v1 §6)
- Tier status: ◆ Free / ◆ Seeker / ✦ Advisor — small badge
- Settings rows: Notifications / Privacy / Sign out (v2 §6 list patterns)
- Toggle examples here use the **44 × 26 / knob 22** geometry (v2 §14 drift item 2)

Background: agent picks. Caption.

### §8. Chart-Reveal page

DOC5 §9 sub-page (full-page modal from v2 §5B), accessed via the "Birth chart →" dashed link on Reveal/Energy Map.

Phone-frame mock following v2 §8: 4-pillar 八字 layout (Year / Month / Day / Hour columns), Day pillar highlighted with `dmBorder` + `vellum` background, hour pillar with "approximate" tag if window/unknown.

Background: agent picks (likely a `bg-reading-*` for quiet content density).

### §9. Tab bar v2 (5 tabs, Reading replaces Map)

Three states like v2 §4, but updated tabs:
- **Cold:** Today active
- **Warm:** Reading active (Reading is the new center tab — does it carry the seal indicator like Map did? Propose.)
- **Pressed:** any tab in the 0.96 scale state

Token spec same as v2 §4.

### §10. Reading container patterns (extends v2 §5 modal taxonomy)

Three patterns for reading display, picked by the type of reading:

- **Pattern α — Bottom sheet (short readings):** v2 §5A surface, with reading content. ~70–80% screen height, drag-down to dismiss. Show one example with a daily snippet inside.
- **Pattern β — Full-page push (long readings):** v2 §5B surface, with `‹ Reading` back. Continuous scroll from header to footer. Show one example with the Elemental Nature reading filling the page.
- **Pattern γ — Inline expansion (daily snippets on Today):** the card on Today expands in place. Show before / after states.

For each: container surface, dismiss affordance, transition note (cite v2 §5 / DOC5 §4).

### §11. Long reading layout: continuous scroll vs collapsible

Two variants of the **same** long reading (e.g., Elemental Nature) so the user can compare:

- **Variant A — Continuous scroll (default):** the whole reading flows top-to-bottom, sub-sections marked by eyebrows + Cormorant 24 sub-headlines. No collapse controls.
- **Variant B — Collapsible:** same content broken into `<details>`-style accordion sections. Each sub-section header carries a `›` chevron that rotates 90° when expanded. First sub-section open by default.

Show both side-by-side at phone-frame size. Annotate which works better for which reading length.

### §12. Day-master ink-wash icon set (NEW — 10 icons)

Commission a 10-icon set, one per Heavenly Stem:

| Stem | Reading | Element / polarity | Suggested motif (you may revise) |
|---|---|---|---|
| 甲 | jiǎ | Yang Wood | Standing tree / pillar |
| 乙 | yǐ | Yin Wood | Vine / soft growth |
| 丙 | bǐng | Yang Fire | Sun / blazing flame |
| 丁 | dīng | Yin Fire | Candle / lantern |
| 戊 | wù | Yang Earth | Mountain / boulder |
| 己 | jǐ | Yin Earth | Tilled field / valley |
| 庚 | gēng | Yang Metal | Blade / axe |
| 辛 | xīn | Yin Metal | Jewel / refined metal |
| 壬 | rén | Yang Water | River / ocean |
| 癸 | guǐ | Yin Water | Mist / dew / rain |

**Style:** ink-wash (sumi-e influence), monochrome ink (`--ink #2B2722`), 1.7px stroke, ~22–32 viewBox to fit identity card. Each icon ships at sizes 18 / 22 / 32 / 84 (the stem-seal sizes from v1 §7).

Render all 10 in a 5×2 grid. Annotate each with: stem character, pinyin, element/polarity, the motif chosen, the SVG path summary.

### §13. Reading card catalogue patterns

The cards on the Reading page (§2) — show the variants:
- **Standard reading card** — locked surface (v1 §6 cardstock), title + description + chevron, on-screen primary
- **Featured reading card** — slightly larger, with element-tinted surface (v1 §6 tinted), maybe a small element glyph
- **Daily card** — narrow band, italic-leaning copy, designed for the inline-expansion pattern (§10γ)
- **Locked card** — v2 §9 lock-strip pattern with tier badge (`◆ Seeker` / `✦ Advisor`)
- **Empty/no-data card** — italic copy, faded element glyph, no chevron

For each: surface, padding, type pairing recipe (cite v2 §12).

### §14. Drift log v3

Surface anything where v3 had to deviate, where layout invention was needed, where new primitives might be required, or where v1+v2 inputs are silent. Specifically check:

- **§0 IA shift** — note that this revises DOC5 §11 (and possibly §5). Recommend a DOC5 patch after v3 lock.
- **10 day-master ink-wash icons** — these are new visual content (not new primitives, but a new asset family). Note the production task: each icon needs to be hand-crafted; the SVG paths in §12 are placeholders subject to refinement.
- **Reading container Pattern γ (inline expansion)** — does this need a new motion primitive (height transition)? Cite DOC5 §4 if covered, propose if not.
- **Tab "seal indicator"** — was on Map (center) in v2. Now Reading is center. Does Reading get the seal? Or does the seal disappear? Propose with rationale.
- **"Enter Your Readings" CTA** — language change from prior "Enter the Dashboard" / "Enter the Energy Map". Make sure copy is consistent everywhere it appears.
- **Friends Co-Compatibility composition** — DOC5 §13 doesn't fully spec the visual; document what you composed and what's open.
- **Background assignments** — any screen where you considered multiple PNGs and chose one, list the alternatives so we can revisit in v4 if needed.

Each drift item: state the gap, the proposed resolution, and which doc must be patched.

---

## §7 — Acceptance criteria

v3 is done when:

1. All 13 design sections + §14 drift log are rendered in a single self-contained HTML file with `<details>` collapsibles per section.
2. Every primitive used traces to v1 + v2. No new colors, no new fonts, no new alphas, no new spacing values invented.
3. Every screen mock uses a real PNG from `Design/assets/backgrounds/` with a one-line caption explaining the choice.
4. The Reveal page is redesigned per §0 IA shift — identity card with day-master ink-wash icon, Energy Map block (Blueprint + Primary + Secondary + Catalysts + Resistance icon-only cards), CTA "Enter Your Readings".
5. Tab bar shows the new 5-tab arrangement (Today / Guidance / **Reading** / Friends / Profile).
6. The 10 day-master ink-wash icons are rendered in a 5×2 grid with full annotations.
7. Reading container patterns α / β / γ all rendered with examples, plus the continuous-scroll vs collapsible comparison for long readings.
8. §14 drift log surfaces at minimum the IA shift, the icon production task, the seal-indicator question, and the inline-expansion motion question.
9. Document layout (no phone frame around the doc itself) but phone-frame mocks (390 × 844) for screen samples.

---

## §8 — What v3 deliberately does NOT include

- **New animations** beyond what's already in DOC5 §4. Animation specs out of scope.
- **Copy beyond canonical samples** in DOC5. Don't write new readings — placeholder copy is fine.
- **Tier marketing visuals** (paywall hero illustrations, video stills).
- **Hand-finished day-master ink-wash icons** — v3 ships placeholder SVGs based on the §12 motif table; final icons commissioned separately.
- **Reading content writing** — only the layout / container / display patterns are in scope.
- **A v1 / v2 patch** — drift items are surfaced for later, not patched in v3.

---

## §9 — After delivery

1. Rendered eyeball review (you and me).
2. Accept the §14 drift items into a v1/v2 patch list (especially the IA shift in DOC5 §11).
3. Audit the live app code against v3 — punch list of new components needed (TabBar with Reading center · ReadingPage shell · ReadingCardCatalogue · DayMasterIconSet · BlueprintCard rename · DominantEnergyCard · CatalystResistanceCard · ReadingSheetModal · ReadingFullPagePush · InlineExpansionCard).
4. Plan the implementation tier (Tier A drift fixes vs Tier B foundational vs Tier C broader refactor — same framing as the v2 implementation map).
5. Optional v4: full reading copy + hand-finished day-master icons + animation specs.
