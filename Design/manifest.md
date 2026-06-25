# Elementum · Design → Implementation Manifest

The bridge between design legend (`Design/legend-*.html`) and React app (`Elementum_App/src/components/`). For every component, this file lists:

- **Source** — which legend section is canonical
- **App file** — the JSX/component file in the app (existing or planned)
- **Tokens** — which `tokens.css` variables it consumes
- **Icons** — which `icons.svg#id`s it renders
- **States** — variants the component must support
- **Status** — `BUILT` / `PARTIAL` / `PLANNED` / `MOCKUP-ONLY`

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `Documents/Designengineering/READING_V2.1_RECONCILIATION_AUDIT.md`).** New/changed components to add: **`FacesScreen`** (the reading prologue — 1–2 persona index cards by math), **`PersonaCard`** (with presence-frame variants: dominant/present/scarce/absent), a **ruling-domain** line atom, and **persona art = 10 Inner-Council character concepts recolored per element**. Reading cards are re-keyed **element → persona**. *Energy-level* polarity is the two faces — but the DM *identity* Yang/Yin chip **stays** and face cards carry a **subtle Yin/Yang marker** (B7, not a "retire"). Add a **`PositionalCard`** (宫位 × 十神 per-pillar, B6). The Energy Faces screen is specced in DOC5 §11.
- **Notes** — open questions, drift items, polish needs

Rule: when a legend section is sealed, the row here is the **single source of truth** for engineering. If app code drifts from the manifest, fix the app. If the manifest drifts from the legend, fix the manifest. The legend never updates silently.

---

## §1 — Screen-level components

| Component | Source | App file | Tokens | Icons | States | Status | Notes |
|---|---|---|---|---|---|---|---|
| **WelcomeScreen** | `legend-patterns.html` §1 | `components/onboarding/WelcomeScreen.jsx` | `--silk` `--ink` `--silkDeep` `--bronzeDark` `--paperHair` | `bg-reveal-04-mist-veil` (PNG) | first-load · returning-user redirect | BUILT | Bg drift item DA·welcome-pill alpha noted in v2 §14 — recommend simplifying to locked cardstock 0.92 |
| **OnboardingShell** | `legend-patterns.html` §2 | `components/onboarding/OnboardingShell.jsx` | full `tokens.css` | none | step-1 through step-7 · partial-progress resume | BUILT | Toggle off-state `#cfc7b3` should swap to `--paperHair` (v2 §14 DA.6) |
| **OnboardingSteps** | `legend-patterns.html` §2 (per-step composition) | `components/onboarding/OnboardingSteps.jsx` | as above | none | per-step state machine | BUILT | Form-control extraction pending (Tier C of v2 implementation map) |
| **LoadingScreen** | `legend-patterns.html` §3 | `components/LoadingScreen.jsx` | `--ink` `--inkLight` element pigments | `el-metal` `el-wood` `el-fire` `el-earth` `el-water` (pulse animation) | calculating · success-handoff to Reveal | BUILT | Bg `bg-reveal-04-mist-veil` |
| **RevealScreen** | `legend-screens-amendment.html` §A1 | `components/RevealScreen.jsx` | full `tokens.css` | `el-*` (composition rows) · `dm-*` for user's day-master · `read-elemental` `read-dominant` (NOT used here — only on Reading page) | first-time view (with "Enter Your Readings" CTA) | PARTIAL | Existing component pre-dates §A1 redesign — needs refactor to amendment's spec. Ink-wash DM icon still placeholder (DA.2). |
| **ReadingScreen** | `legend-screens-amendment.html` §A2 | `components/dashboard/ReadingScreen.jsx` (PLANNED) | `--cardstock-bg` `--paperHair` `--quiet-bg` `--quiet-border` | `read-elemental` `read-dominant` `read-forces` `read-chapters` `read-pillars` `ico-lock` `ico-chev-r` | tab-active · cards-loaded · cards-locked · empty-decade-zero | PLANNED | Bg `bg-reading-04-rice-paper`. New screen — replaces "Map" tab. |
| **EnergyMapScreen** | `legend-screens-amendment.html` §A3 (uses §A1 layout, no first-time framing) | `components/dashboard/EnergyMapScreen.jsx` (PLANNED) | full `tokens.css` | as RevealScreen | from-reading-link · standalone | PLANNED | Composes `<EnergyMapBlock>` shared with RevealScreen via footer-mode prop (DA.4) |
| **TodayScreen** | `legend-screens.html` §2 | `components/dashboard/TodayScreen.jsx` (PLANNED) | full `tokens.css` `--gold` (decade rim) | `tab-today` `read-chapters` (decade card) `ico-sunrise` (daily) | morning · afternoon · evening · weekend variants | PLANNED | Bg `bg-onboarding-04-quiet-paper`. Decade-card gold rim is DA.1 — proposes `cardstock-active` token in v1 §3.5 |
| **GuidanceScreen** | `legend-screens.html` §4 | `components/dashboard/GuidanceScreen.jsx` (PLANNED) | full `tokens.css` `--advisor` (Advisor tier) | `tab-guidance` `ico-lock` (per locked card) | free-tier · seeker · advisor | PLANNED | Bg `bg-reveal-04-mist-veil`. 5 cards (Daily Reading + 4 tier-locked). Section-veil gradient is DA.2 in v3 drift. |
| **FriendsScreen** | `legend-screens.html` §5 | `components/dashboard/FriendsScreen.jsx` (PLANNED) | element pigments + `--seal` for connection braid | `tab-compat` element marks for two stems · `el-*` for axes | V1 coming-soon · V2 result-sheet | PLANNED | Bg `bg-energymap-02-corner-quartet` (V1) / `bg-energymap-03-center-glow` (V2) |
| **ProfileScreen** | `legend-screens.html` §6 | `components/dashboard/ProfileScreen.jsx` (PLANNED) | `--cardstock-bg` `--paperHair` `--gold` (Advisor) `--bronzeDark` (Seeker) | `tab-profile` `ico-edit` `ico-lock` | free · seeker · advisor · dev-fixtures-toggle | PLANNED | Bg `bg-onboarding-01-corner-stamp`. Includes birth-data correction launchpoint (modal E). |
| **ChartRevealPage** | `legend-screens.html` §7 (DetailShell pattern) | `components/ChartRevealPage.jsx` (PLANNED — replaces existing `BirthChartRawPage`) | `--vellum` (DM pillar bg) `--dmBorder` | none (Noto Serif SC stem/branch glyphs only) | full-data · approximate-hour · partial-data | PLANNED | Bg `bg-reading-01-side-margins`. Day pillar gets `dmBorder` 1px ring — only place this token appears app-wide. |

---

## §2 — Shared components (atoms)

| Component | Source | App file | Tokens | Icons | States | Status | Notes |
|---|---|---|---|---|---|---|---|
| **BottomTabNav** | `legend-screens.html` §4 + amendment §A2 (icons-only) | `components/shared/BottomTabNav.jsx` (PLANNED) | `--tabbar-bg` `--borderLight` `--ink` `--inkLight` `--seal` (active dot) | `tab-today` `tab-guidance` `tab-reading` `tab-compat` `tab-profile` | cold · warm (active) · pressed · seal-dot variant | PLANNED | **Icons-only, no labels** (DA.10 amendment). Only on `/dashboard/*`. Fade-in 400ms after content settles. |
| **PageHeader** | `legend-patterns.html` §13 + `legend-screens.html` §3 use | `components/shared/PageHeader.jsx` (PLANNED) | `--ink` `--inkLight` `--paperHair` `--bronzeDark` | `ico-chev-l` (back) `ico-edit` (Profile variant) | with-back · with-action · with-date · with-edit | PLANNED | EB Garamond 14 / 3.4 ls / uppercase. Right action italic 13 / `--bronzeDark` / dashed underline. |
| **IdentityRibbon** | `legend-primitives.html` §7 | `components/shared/IdentityRibbon.jsx` | `--ink` `--paperHair` element pigments | `dm-*` (user's stem) | with-pct · without-pct · zero-count-greyed | BUILT | Composition rows use `el-*` icons + 8-cell `seg-bar`. |
| **EnergyBlueprint** | `legend-primitives.html` §7 | `components/shared/EnergyBlueprint.jsx` | element pigments + `--borderLight` | `el-metal` `el-wood` `el-fire` `el-earth` `el-water` | full-counts · zero-element · all-active | BUILT | 8-cell segmented bar. Gap 3px, height 7px, radius 1. |
| **StemSeal** | `legend-primitives.html` §7 | `components/shared/StemSeal.jsx` (PLANNED — currently inline) | `--cardstock-bg` `--paperHair` element pigments | `dm-*` (the user's stem) | size 84 · size 44 · size 32 | PARTIAL | Currently inline in IdentityRibbon. Extract for reuse on Reveal hero (84) + ribbon (44). |
| **SegmentedBar** | `legend-primitives.html` §7 | `components/shared/SegmentedBar.jsx` (PLANNED) | element pigments `--borderLight` | none | counts 0–8 (each cell on/off) | PLANNED | Reused in IdentityRibbon, EnergyBlueprint, possibly Friends V2 four-axis read. |
| **ForceRow** | `legend-screens.html` §3 | `components/shared/ForceRow.jsx` (PLANNED) | element pigments at `1A` tint + `Deep` text | `el-*` (force's element) | primary · secondary · output · all-10 list | PLANNED | 36×36 tinted icon. "See all 10" routes to DetailShell (§7). |
| **PairCard** | `legend-screens.html` §3 + amendment §A1 | `components/shared/PairCard.jsx` (PLANNED) | element pigments `${pigment}10` + `${pigment}40` border | `el-*` for pair element | catalyst · resistance · paired (both) | PLANNED | Tinted-element surface (v1 §3.5.A). Arrow ↑/↓ in Cinzel weight. |
| **DominantCard** | `legend-screens-amendment.html` §A1 | `components/shared/DominantCard.jsx` (PLANNED) | element pigments tinted | `el-*` (the dominant element) | primary · secondary · icon-only (no description) | PLANNED | Large tinted card. **Icon + name only, NO body copy** (per amendment §A1). |
| **LockStrip** | `legend-patterns.html` §9 | `components/shared/LockStrip.jsx` (PLANNED) | `--quiet-bg` `--quiet-border` `--inkLight` | `ico-lock` | seeker · advisor · pressed | PLANNED | Italic 11.5 inkLight. Diamond ◆ Seeker / star ✦ Advisor markers. |
| **ReadingCard** | `legend-screens-amendment.html` §A6 | `components/shared/ReadingCard.jsx` (PLANNED) | `--cardstock-bg` `--quiet-bg` element-tint surfaces | `read-*` per section · `ico-lock` | standard · featured (tinted) · daily (compact) · locked · empty | PLANNED | 5 variants. Featured pigment should be data-driven (user's primary). |

---

## §3 — Buttons + form controls (DOC5 §7 + amendment Tier C)

| Component | Source | App file | Tokens | Icons | States | Status | Notes |
|---|---|---|---|---|---|---|---|
| **Button** | `legend-patterns.html` §6 | `components/shared/Button.jsx` (PLANNED) | `--ink` `--silk` `--cream` `--bronzeDark` `--paperHair` | `ico-arrow-r` (CTAs) | primary (ink pill) · secondary (cardstock pill) · tertiary (italic dashed) · ghost (transparent) · disabled | PLANNED | Cinzel 11 / 3.6 ls for primary. Tertiary italic 13 / `--bronzeDark` with dashed underline. |
| **TextInput** | `legend-patterns.html` §6 | `components/shared/TextInput.jsx` (PLANNED) | `--paperHair` (default border) `--borderFocus` `--seal` (error) | none | default · focus · filled · error | PLANNED | Radius 12. Pad 12×14. EB Garamond 16 value, italic 12.5 placeholder. |
| **Toggle** | `legend-patterns.html` §6 + v2 §14 DA.5 | `components/shared/Toggle.jsx` (PLANNED) | `--paperHair` (off) `--bronze` (on) | none | off · on · disabled | PLANNED | **Two sizes** (DA.5 resolution): 48×26 / knob 24 for primary opt-ins (onboarding) and 44×26 / knob 22 for inline list rows (settings). |
| **SegmentedControl** | `legend-patterns.html` §6 + `legend-screens.html` §2 (Today/Tomorrow/This week) | `components/shared/SegmentedControl.jsx` (PLANNED) | `--ink` (active) `--paperHair` (inactive) `--silk` (text) | none | 2-segment · 3-segment · disabled | PLANNED | Pill group. Cinzel labels. Today screen uses 3-mode variant. |
| **RadioGroup** | `legend-patterns.html` §6 | `components/shared/RadioGroup.jsx` (PLANNED) | `--ink` `--paperHair` | none | unselected · selected · disabled | PLANNED | 18×18 circle, ink dot on select. |
| **Checkbox** | `legend-patterns.html` §6 | `components/shared/Checkbox.jsx` (PLANNED) | `--ink` `--paperHair` | `ico-check` (currently missing — PLACEHOLDER) | unchecked · checked · indeterminate · disabled | PLANNED | Radius 4 (off-scale, flagged in v2 §14 DA.4 — propose radius 1 alt). |

---

## §4 — Modals + sheets (v2 §5 + v3 §11 + amendment §A4)

| Component | Source | App file | Tokens | Icons | States | Status | Notes |
|---|---|---|---|---|---|---|---|
| **ConfirmSheet** (Type A) | `legend-patterns.html` §5A | `components/shared/ConfirmSheet.jsx` (PLANNED) | `--silk` `--paperHair` `--shadow-sheet` | `ico-dismiss` | open · closing | PLANNED | 280–320 height. Drag-down. Backdrop `rgba(0,0,0,0.4)`. |
| **FullPagePush** (Type B) | `legend-patterns.html` §5B + amendment §A4β | `components/shared/FullPagePush.jsx` (PLANNED) | silk gradient | `ico-chev-l` | from-reading · from-friends · from-profile | PLANNED | 100% height. Used for chart-reveal, long readings. |
| **UpgradeSheet** (Type C) | `legend-patterns.html` §5C | `components/shared/UpgradeSheet.jsx` (PLANNED) | `--cream` `--gold` (Seeker) `--advisor` (Advisor) `--shadow-sheet` | `ico-dismiss` | seeker-only · advisor-only · both-tiers | PLANNED | 85% height. Two tier cards (Seeker + Advisor). Context header. |
| **FriendInvite** (Type D) | `legend-screens.html` §11 | `components/shared/FriendInviteSheet.jsx` (PLANNED) | `--cream` `--paperHair` `--bronzeDark` | `ico-dismiss` | open · copied | PLANNED | 60% height. Monospace link row + COPY action. Single bronze pill CTA. |
| **BirthDataCorrection** (Type E) | `legend-screens.html` §11 | `components/shared/BirthDataCorrectionModal.jsx` (PLANNED) | onboarding form tokens | `ico-chev-l` | editing · saving · confirmed | PLANNED | Reuses onboarding wheel/stack/text-input primitives. Seal-tinted refresh-warning callout. |
| **ReadingSheet** (Type α — short reading) | `legend-screens-amendment.html` §A4α | `components/shared/ReadingSheet.jsx` (PLANNED) | `--silk` `--paperHair` `--shadow-sheet` | `ico-dismiss` `ico-arrow-r` (Read full) | day-snippet · single-card | PLANNED | Companion to ConfirmSheet (Type A). Daily reading expanded. |
| **InlineExpansionCard** (Type γ — Today daily) | `legend-screens-amendment.html` §A4γ | `components/shared/InlineExpansionCard.jsx` (PLANNED) | `--cardstock-bg` `--paperHair` | `ico-chev-r` (rotates 0→135°) | collapsed · expanded · transitioning | PLANNED | `max-height` transition 90→340 / 220ms / ease-out. **New motion primitive** flagged in DA.5. |

---

## §5 — Status + feedback (v2 §7 + amendment NOT-yet)

| Component | Source | App file | Tokens | Icons | States | Status | Notes |
|---|---|---|---|---|---|---|---|
| **Toast** | `legend-patterns.html` §7 | `components/shared/Toast.jsx` (PLANNED) | `--cardstock-bg` `--paperHair` `--inkSoft` | none | info · success · error | PLANNED | Bottom-anchored 56 from bottom (above tab bar). 3s auto-dismiss. |
| **Banner** | `legend-patterns.html` §7 | `components/shared/Banner.jsx` (PLANNED) | `--parchment` `--paperHair` | `ico-dismiss` (optional) | persistent · dismissable | PLANNED | Full-width strip. EB Garamond 13.5. |
| **InlineError** | `legend-patterns.html` §7 | `components/shared/InlineError.jsx` (PLANNED) | `--seal` | `ico-alert` (currently missing — PLACEHOLDER) | shown · hidden | PLANNED | Italic 11.5. Sits below input. |
| **InlineSuccess** | `legend-patterns.html` §7 | `components/shared/InlineSuccess.jsx` (PLANNED) | `--woodDeep` | `ico-check` (currently missing — PLACEHOLDER) | shown · hidden | PLANNED | Italic 11.5 / `--woodDeep`. |
| **EmptyState** | amendment §A6 (Empty card) | `components/shared/EmptyState.jsx` (PLANNED) | `--paperHair` (dashed) `--inkLight` `--inkMist` | `ico-empty` (vessel-not-yet) | scheduled · permanent · loading | PLANNED | Italic copy + faded glyph. v1 §3.5.F dashed-border rule update needed (DA.7). |

---

## §6 — Open primitive gaps

> **2026-05-06 update — italic usage v2 cascade:** v1 §3.5.E originally allowed italic across 5 contexts. The new locked rule (DOC5 §AM.10 + `legend-primitives.html` §8 v2) restricts italic to **two**: sub-headline + microcopy. Element-name labels, composition row names, and descriptive paragraphs revert to regular. **Resolved:** DOC5 §3.5.E annotated superseded · `legend-screens-amendment.html` CSS classes patched (`.ribbon .elname`, `.read-card .body .d`, `.read-card.daily .body .t`, `.dm-icon-cell .meta-l`, `.inline-card .pre`) · `EnergyBlueprint.jsx` BlueprintRow + empty-state · `IdentityRibbon.jsx` element-name + saturation paragraph. **Open (deferred to v4 polish):** `legend-patterns.html` and `legend-screens.html` still contain pre-v2 italic uses — flagged in v4 brief.

These need addressing in v1 / v2 doc patches before the manifest is fully stable:

1. **`cardstock-active` surface** (DA.1 in v3 drift) — for Today's decade card with gold rim. Propose adding to `tokens.css` + v1 §3.5.D.
2. **`section-veil` gradient pattern** (DA.2 in v3 drift) — vertical gradient fading 65% of a list to silk. Propose adding to v2 §9.
3. **5-dot polarity ladder** (DA.3 in v3 drift) — week-ribbon dots at fresh hues. Propose adding to v1 §2.
4. **`elevated` surface variant** (v2 §14 DA.3) — 4th card surface for modals + tab-bar blurred chrome. Propose adding to v1 §3.5.D.
5. **Notification toggle off-state** (v2 §14 DA.6) — `#cfc7b3` to swap to `--paperHair` in app code.
6. **Toggle geometry** (v2 §14 DA.5) — standardise on 48×28 / knob 24 (primary) and 44×26 / knob 22 (settings).
7. **DM ink-wash icons** (DA.2 amendment) — 10 brushed assets to commission.
8. **Reading-section icons** (DA.9 amendment) — refinement of placeholder geometric set.
9. **Tab nav icons-only** (DA.10 amendment) — patch v2 §4 + v3 §4 to remove labels.

---

## §7 — File map at a glance

```
Design/
├── tokens.css                       ← canonical CSS variables
├── icons.svg                        ← canonical icon library (33 symbols)
├── manifest.md                      ← THIS FILE (component → app mapping)
├── Legends/                         ← canonical legend HTMLs (in version order)
│   ├── northstar-anchor.html        ← V1 prototype DNA
│   ├── legend-primitives.html       ← v1 (color · type · primitives · italic gallery v2)
│   ├── legend-patterns.html         ← v2 (welcome · onboarding · loading · tab nav · modals · forms · status · page header)
│   ├── legend-screens.html          ← v3 (Today · Energy Map · Guidance · Friends · Profile · DetailShell · Calendar · Backgrounds · Tier-locks · Modal taxonomy · Nav map · ICONS-ONLY tab bar)
│   ├── legend-screens-amendment.html ← IA reframe (Reveal → Reading-catalogue → Energy Map · 10 DM placeholder icons · Reading containers α/β/γ · 5 reading card variants · drift log DA.1–DA.11)
│   ├── legend-v4-polish.html        ← v4 (refined DM ink-wash icons · 7 reading-section icons · Reveal rhythm · γ inline-expansion motion · tab-bar fade-in)
│   ├── legend-v6-card-archetypes.html ← v6 (element/pillar tile · section hero · halftone duotone register · modal-from-card · tab-strip-inside-card)
│   └── legend-v7-ink-wash.html      ← v7 (ink-wash polish using uploaded ref paintings · 4 archetypes: tile, section hero, modal hero, compact strip)
├── assets/                          ← painted backgrounds (16 PNGs) + ink references
├── reference/                       ← visual references
│   ├── AppPages/                    ← Pattern + Nebula screenshots (10 PNGs)
│   ├── CardReference/               ← Apps + Games card-design references
│   ├── InkWash/FromClaude/          ← 6 public-domain Chinese ink-wash paintings (38 MB · Fan Kuan, Ma Yuan ×3, Bada Shanren, Shi Tao)
│   └── Five Element Icons/
└── exports/reveal-and-energymap/    ← original V1 prototype seed bundle

Elementum_App/src/components/
├── onboarding/
│   ├── WelcomeScreen.jsx          ← BUILT
│   ├── OnboardingShell.jsx        ← BUILT
│   └── OnboardingSteps.jsx        ← BUILT
├── LoadingScreen.jsx              ← BUILT
├── RevealScreen.jsx               ← PARTIAL (pre-amendment)
├── shared/
│   ├── EnergyBlueprint.jsx        ← BUILT
│   ├── IdentityRibbon.jsx         ← BUILT
│   └── … (all PLANNED — see §2 above)
├── dashboard/                     ← (entire folder PLANNED)
└── mockup/                        ← scratch space, not shipped
```

---

## §8 — When to update this file

- After a legend section seals → add/update its row(s) here
- After a component lands in the app → flip `PLANNED` → `BUILT`
- After a drift item resolves → strike or move to the resolved log
- Before any "implement section X" task → re-read the relevant rows so token + icon refs are accurate up front

This file is the audit target. If it's wrong, the whole pipeline is wrong.
