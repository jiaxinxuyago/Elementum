# Elementum — Context Transfer Handoff

**Purpose:** Drop-in context document for any new tool / session / collaborator (Claude, ChatGPT, Cursor, human designer / engineer). Read this first to get oriented in ~3 minutes.

**Last updated:** 2026-05-06 · after legend-v7-ink-wash sync + GitHub push (5 commits).

---

## §1 — What Elementum is

A personal-energy reading product built on the BaZi (八字 / Four Pillars) tradition. Users provide birth data → the app calculates their chart → presents a layered reading experience grounded in Chinese metaphysics, presented in a silk-paper / ink-wash / bronze aesthetic. React + Vite app at `Elementum_App/`.

Reference user (canonical example throughout the system): **庚 Yang Metal · The Blade · "Precision before intention."**

---

## §2 — Repository structure (top-level)

```
Elementum_Project/
├── Design/                              ← canonical design artefacts (~101 MB)
│   ├── Legends/                         ← 8 canonical HTML files (the design system)
│   │   ├── northstar-anchor.html        ← V1 prototype DNA · authoritative for visuals
│   │   ├── legend-primitives.html       ← v1 · color / type / radii / spacing / surfaces
│   │   ├── legend-patterns.html         ← v2 · welcome / onboarding / loading / tab nav / modals
│   │   ├── legend-screens.html          ← v3 · Today / Energy Map / Guidance / Friends / Profile
│   │   ├── legend-screens-amendment.html ← IA reframe (Reveal → Reading-catalogue → Energy Map)
│   │   ├── legend-v4-polish.html        ← v4 · refined DM ink-wash icons + Reveal rhythm
│   │   ├── legend-v6-card-archetypes.html ← v6 · element/pillar tile + section hero
│   │   └── legend-v7-ink-wash.html      ← v7 · ink-wash polish using uploaded painting refs
│   ├── tokens.css                       ← canonical CSS variables (mirror in Elementum_App/src/styles/tokens.js)
│   ├── icons.svg                        ← canonical icon library (33 <symbol> defs)
│   ├── manifest.md                      ← component → app-file bridge with token + icon refs
│   ├── assets/                          ← painted backgrounds (16 PNGs) + ink references
│   ├── reference/                       ← visual references
│   │   ├── AppPages/                    ← The Pattern + Nebula screenshots (10 PNGs)
│   │   ├── CardReference/               ← Apps + Games card-design references
│   │   ├── InkWash/FromClaude/          ← 6 public-domain ink-wash paintings (38 MB)
│   │   └── Five Element Icons/
│   ├── exports/reveal-and-energymap/    ← original V1 prototype seed bundle
│   └── source/                          ← extracted JS chunks from earliest canvas export
│
├── Documents/Designengineering/         ← all design + engineering specs
│   ├── DOC1_Calculation_Engine.md       ← BaZi calculator
│   ├── DOC2_Archetype_System.md         ← stem identity content
│   ├── DOC3_Knowledge_Pool.md           ← classical sources
│   ├── DOC4_Generation_Architecture.md  ← content generation
│   ├── DOC5_App_Design.md               ← VISUAL + IA SPEC (with §AMENDMENT block)
│   ├── DOC6_Manual.md
│   ├── DOC7_Content_Generation_Guide.md
│   ├── DOC8_Code_Architecture_and_Migration.md
│   ├── DOC9_Archetype_Fields.md         ← schema field workflow
│   ├── DOC_HANDOFF_ClaudeCode.md        ← prior handoff context
│   ├── DOC_HANDOFF_CONTEXT_TRANSFER.md  ← this file
│   └── PROMPT_design_legend_v[1–7]*.md  ← 8 design canvas iteration briefs
│
├── Elementum_App/                       ← React + Vite app (the runtime)
│   ├── src/
│   │   ├── App.jsx                      ← flow state machine
│   │   ├── components/
│   │   │   ├── onboarding/              ← WelcomeScreen, OnboardingShell, OnboardingSteps
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── RevealScreen.jsx
│   │   │   ├── shared/
│   │   │   │   ├── EnergyBlueprint.jsx  ← uses ElementMark from icons/
│   │   │   │   ├── IdentityRibbon.jsx
│   │   │   │   └── icons/               ← Icon component using <use href> pattern
│   │   │   │       ├── Icon.jsx         ← generic + ICON_IDS + ElementMark/DayMasterMark/TabIcon/ReadingMark wrappers
│   │   │   │       └── index.js
│   │   │   └── dev/DevBar.jsx
│   │   ├── content/                     ← archetypeSchema.js + archetypeSource.js
│   │   ├── engine/calculator.js
│   │   ├── store/chartContext.jsx
│   │   └── styles/
│   │       ├── tokens.js                ← canonical mirror of Design/tokens.css (camelCase)
│   │       └── tokens.jsx               ← legacy SCREAMING_SNAKE re-exports + React primitives
│   └── public/                          ← Vite-served static files
│       ├── assets/                      ← painted backgrounds (mirrored)
│       ├── icons.svg                    ← mirrored from Design/icons.svg
│       ├── tokens.css                   ← mirrored from Design/tokens.css
│       ├── legend-*.html                ← all 8 legend HTMLs mirrored for preview
│       └── northstar-anchor.html        ← mirrored
│
├── Reference/                           ← legacy reference (Elementum_Engine.jsx etc.)
└── Data/                                ← reference HTML database (design-time only)
```

---

## §3 — Canonical sources of truth

| Concern | Source of truth | Notes |
|---|---|---|
| Visual primitives (color, type, surfaces) | `Design/Legends/legend-primitives.html` (v1) | Authoritative since 2026-05-04 |
| Italic usage rule | **DOC5 §AM.10** (supersedes §3.5.E) | Sub-headline + microcopy ONLY |
| CSS variables | `Design/tokens.css` → mirrors to `tokens.js` + `public/tokens.css` | Edit canonical first |
| Icon library | `Design/icons.svg` → mirrors to `public/icons.svg` | 33 `<symbol>` defs |
| IA / screen flow | DOC5 §5 + **§AMENDMENT §AM.1** | IA: Reveal → Reading-catalogue → Energy Map |
| Tab nav | DOC5 §AM.2 | **Icons-only**, no labels |
| Card archetypes | `Design/Legends/legend-v6-card-archetypes.html` | Element/Pillar tile + Section hero |
| Ink-wash treatment | `Design/Legends/legend-v7-ink-wash.html` + uploaded reference paintings | v7 used Fan Kuan + Ma Yuan + Bada Shanren + Shi Tao as study material |
| Component → app file bridge | `Design/manifest.md` | Single audit doc |
| Archetype data | `Elementum_App/src/content/archetypeSchema.js` (truth) → `archetypeSource.js` (data) | DOC9 is the companion |
| App tokens (JS) | `Elementum_App/src/styles/tokens.js` (camelCase) | tokens.jsx re-exports as SCREAMING_SNAKE |

---

## §4 — Design legend version history

v1 → v7 + amendment, in evolution order. Each builds on prior versions; later versions don't replace earlier ones unless explicitly marked superseded.

| Version | File | Scope | Status |
|---|---|---|---|
| **v1** | `legend-primitives.html` | Color · type · eyebrow · radius scale · spacing · surfaces · italic gallery · component primitives · anti-patterns · drift log v1 | Sealed, italic gallery updated 2026-05-06 to v2 rule |
| **v2** | `legend-patterns.html` | Welcome · onboarding · loading · bottom tab nav · modal taxonomy (3) · form controls · status & feedback · chart-reveal · empty/lock · DM highlight · iconography · type pairings · page header · drift log v2 | Sealed; loading screen updated 2026-05-06 with 5-element icons + glyph ribbon |
| **v3** | `legend-screens.html` | IA shift (5-tab dashboard) · Today · Energy Map · Guidance · Friends · Profile · DetailShell · Calendar · backgrounds · tier-locks · modal v3 ext · nav map · drift log v3 | Sealed; tab nav now icons-only per amendment |
| **Amendment** | `legend-screens-amendment.html` | IA REFRAME (overrides v3 §0): Reveal → Reading-catalogue → Energy Map · Reveal redesign · Reading catalogue · 10 day-master placeholder icons · reading containers α/β/γ · scroll vs collapsible · 5 reading card variants · drift log (DA.1–DA.11) | Sealed; canonical IA |
| **v4** | `legend-v4-polish.html` | Polish: 10 day-master ink-wash icons (layered strokes) · 7 reading-section icons refined · Reveal rhythm tuned · γ inline-expansion motion · tab-bar fade-in · drift log v4 | Sealed; DM symbols are reused by v6/v7 as foreground subjects |
| **v5** | (failed to build) | Reading catalogue with enriched cards | Failed at 30% quota; superseded by v6 |
| **v6** | `legend-v6-card-archetypes.html` | 2 card archetypes (Element/Pillar tile · Section hero) · halftone duotone register · modal-from-card · tab-strip-inside-card · drift log v6 | Sealed; reused by v7 as baseline |
| **v7** | `legend-v7-ink-wash.html` | Ink-wash polish · 4 archetypes (element tile · section hero · modal hero · compact strip) using 6 uploaded reference paintings · drift log v7 | Sealed; the most current visual fidelity benchmark |

---

## §5 — Locked rules (DOC5 §3.5 + §AMENDMENT)

These rules MUST be followed in any new design or code. Violations are doc-patch triggers.

### Color (DOC5 §2 + §3.5.A pigment alpha ladder)
- 5 element pigments with `*Deep` companions: `metal #8ba3b8`/`#6a849a`, `wood #7a9e6e`/`#587a4d`, `fire #c4745a`/`#9e5540`, `earth #b89a6a`/`#927750`, `water #5a7fa8`/`#3e5f85`
- Pigment alpha ladder — **only** these alphas allowed:
  - `${pigment}10` (~6%) — soft fill (card bg)
  - `${pigment}1A` (~10%) — tint fill (icon bg)
  - `${pigment}40` (~25%) — border / chip outline
  - `${pigment}CC` (~80%) — eyebrow text
  - `${pigment}` (100%) — glyph / heading on tint
  - **Forbidden:** any other alpha (`25`, `55`, `80`, etc.) — use `withAlpha()` helper from `tokens.js` for dev-time guard
- `seal #A04030` reserved — max once per screen (chop mark)
- `dmBorder #584A3E` reserved — day-master pillar highlight only

### Typography (DOC5 §3 + §AM.3)
- 4 fonts: Cormorant Garamond (display) · EB Garamond (body + label) · Cinzel (CTA caps) · Noto Serif SC (hanzi)
- Eyebrow standard: EB Garamond 10 / 2.5 ls / weight 500 / uppercase / element-color@80%
- "The Blade" archetype title: Cormorant 38 / weight 400 — never bold at hero scale
- §AM.3: Cormorant title weight = 400 at hero (≥30px), 500–600 at mini (≤24px)

### Italic (DOC5 §AM.10 — SUPERSEDES §3.5.E)
- **Allowed (only 2 contexts):**
  - Sub-headline: Cormorant italic 19 / 500 / inkSoft (e.g. "Precision before intention")
  - Microcopy chip: EB Garamond italic ≤11.5 / inkSoft or inkLight
- **Forbidden:** element-name labels · composition row names · descriptive paragraphs · archetype titles · eyebrows · CTAs · body reading copy · numerics · status text

### Border-radius (DOC5 §3.5.B)
- Allowed: `1px · 10 · 12 · 16 · 22 · 999`. Nothing else (forbidden: 4, 6, 8, 14, 18, 20, 28).

### Spacing (DOC5 §3.5.C)
- Allowed: `1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56`. Anything else is forbidden.

### Card surfaces (DOC5 §3.5.D + §AM.6, §AM.7)
- 5 surface types:
  - Cream-cardstock — `rgba(248,241,225,0.92)` + `paperHair` border
  - Tinted (element-themed) — `${pigment}10` + `${pigment}40` border
  - Quiet — `#EBE5D6` + `#DCD3C0` border
  - **Elevated** (§AM.6) — for modals + tab bar (blurred chrome / elevated sheet)
  - **Cardstock-active** (§AM.7) — gold rim for Today decade card

### Tab nav (DOC5 §AM.2)
- **Icons-only** — no text labels. 5 tabs: Today · Guidance · Reading · Compat · Profile.
- Reading is center, carries seal-dot indicator on active.

### IA (DOC5 §AM.1 — supersedes §11)
- Reveal page = identity card + full energy summary + "Enter Your Readings" CTA · is the first-time view of the Energy Map
- Reading tab → catalogue page → drill-down
- Energy Map = destination from Reading's top action (same content as Reveal, no first-time CTA)
- "Energy Map" eyebrow renames the formerly-titled "Energy Blueprint"

---

## §6 — Open work / what's next

### Pending engineering tasks
1. **Promote v7 ink-wash icons** into `Design/icons.svg` (replace `dm-*` placeholders). Drop-in target — every legend + app component auto-updates.
2. **Wire BottomTabNav component** (planned per `manifest.md` §2). Token-locked from legend-screens.html §4 + amendment §A2.
3. **Build Reading catalogue page** (planned per `manifest.md` §1). Card archetypes from legend-v6 + legend-v7 are the templates.
4. **Patch `tokens.jsx` BORDER_LIGHT/STD if any further drift** vs `tokens.css` (currently aligned).
5. **Audit remaining italic uses** in `legend-patterns.html` and `legend-screens.html` for §AM.10 compliance — currently flagged as deferred.

### Pending design work (when canvas quota refreshes)
- v8: scale v7's 4 archetypes to all 10 stems × all sizes (mechanical expansion using established vocabulary)
- Reading catalogue full screen (mosaic with v6/v7 cards)
- Today / Guidance / Friends / Profile full screens
- Reading-content destination pages
- Hand-finished day-master ink-wash brushwork (commission outside the canvas)

### Pending DOC5 patches
- §11 cascade with §AMENDMENT (some sections still reference the pre-amendment IA)
- §AMENDMENT §AM.4 motion primitive could be folded into §4 motion system
- Cross-references between §3.5.E (annotated superseded) and §AM.10 are in place

---

## §7 — Design canvas (Claude design / claude.ai/design) — what we learned

After 7 iteration cycles (v1 → v7), here are the operational lessons:

1. **Canvas can produce SVG, not raster.** Asking for "ink-wash brushwork" without uploaded reference images → generic line-mark output (v5/v6 failure). Solution: upload actual reference paintings, then study composition (v7 success).

2. **Canvas can't fetch URLs.** No `web_fetch`/`web_search` tools. Files must be uploaded into the canvas chat. Local filesystem paths in briefs are labels only.

3. **Quota tightens scope.** v5 30% quota / 5 cards + alt layouts → failed. v6 22% quota / 5 deliverables → built but underwhelming. v7 11% quota / 4 archetypes max → succeeded with reference images. Each iteration should be SMALLER than the prior failed one.

4. **Acceptance criteria must be quantifiable.** "Polished" is meaningless — agent self-audits as "RESOLVED" while shipping tiny improvements. Use: path counts, stroke-width variance ranges, opacity-gradient counts, sniff-test thresholds (≤2-second thumbnail comparison).

5. **Hedge options become off-ramps.** v4 brief offered "(a) brushwork OR (b) refined geometric" — agent took (b). v7 removed the hedge → got brushwork.

6. **Stale uploaded DOC5 = repeat failures.** v6 worked from a DOC5 lacking §AMENDMENT — patched in app-side legend amendment but agent didn't see it. Always grep §AM.10 in canvas's DOC5 before starting.

7. **Reference image upload pattern**: download from Wikimedia Commons / Smithsonian Open Access / Met / NPM Taipei. Save to `Design/reference/InkWash/` or similar. Upload to canvas alongside brief. Agent studies composition (not literal trace), produces SVG approximations.

---

## §8 — How to run the app

```bash
cd Elementum_App
npm install   # if first time
npm run dev   # Vite dev server on http://localhost:5173
```

Once running:
- App at `http://localhost:5173/`
- Legend HTMLs at `http://localhost:5173/legend-primitives.html`, `legend-patterns.html`, etc. (all 8)
- DevBar (left sidebar) — switch tier · jump to screen · seed birth-data presets

DevBar seed presets: 庚 Blade (Yang Metal day master) · 癸 Rain (Yin Water day master).

---

## §9 — Git state

- **Repo:** `github.com/jiaxinxuyago/Elementum.git`
- **Main:** clean, up to date with `origin/main`
- **Recent commits (last 5):**
  - `c9515c2 public/: mirror canonical design system for Vite preview`
  - `386d1c0 App: tokens.js + Icon component + italic v2 compliance`
  - `81d43ff DOC5 §AMENDMENT: IA reframe + italic v2 + 9 polish patches`
  - `39aedf0 Establish canonical design system: Legends, tokens, icons, manifest, prompts`
  - `e2be6a2 Design cleanup: remove legacy PNGs + standalone Pre-Dashboard Flow HTML`

---

## §10 — How to use this document in a new tool

If you're starting a fresh session with **Claude / ChatGPT / Cursor / etc.** to work on Elementum:

1. **Paste this entire file** as your first context-setting message
2. Or attach `DOC5_App_Design.md` + this file together — they're the minimum context to understand any design or engineering task
3. For a specific task, also attach:
   - `Design/manifest.md` if implementing a component
   - `Design/Legends/legend-v7-ink-wash.html` if working on visuals
   - `Design/tokens.css` + `Design/icons.svg` if working with primitives

The canonical sources rarely conflict — when they do, the authority order is:
**northstar-anchor > legend-primitives (v1) > legend-patterns (v2) > legend-screens-amendment > legend-screens (v3) > DOC5 §AMENDMENT > DOC5 base > canvas references**
