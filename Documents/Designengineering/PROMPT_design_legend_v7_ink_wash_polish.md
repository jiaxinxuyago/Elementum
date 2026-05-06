# Prompt — Elementum Design Legend v7 (Ink-Wash Polish · 4 Archetypes)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v7-ink-wash.html`
**Goal:** Re-render the card system with **actual Chinese ink-wash style fidelity**, using uploaded reference paintings as visual anchors. v6 failed because the agent had no visual memory to draw from — only textual knowledge of the tradition. v7 fixes that by attaching real public-domain ink-wash paintings as study material.

**Quota note:** ~11% Claude Design budget left. **Smaller than v5 (30%) and v6 (22%).** Scope is intentionally minimal: 4 archetypes, properly polished, no expansion. If you find yourself running over, cut §V4 (compact strip) first, then §V3 (modal hero) — keep the §V1 element tile + §V2 section hero at all costs.

---

## §0 — Why v7 exists (the structural fix)

Across v5 and v6 the brief asked you to render in "Chinese ink-wash style" by referencing painters by name (Fan Kuan, Ma Yuan, Mi Fu, etc.). You handled this honestly: in v6 you produced layered SVG strokes that *evoke* ink-wash but don't *replicate* what those painters actually did — because you have textual training memory of the painters, not visual memory of their paintings.

v7's fix: **the user has uploaded actual ink-wash reference paintings to this conversation**. Use them.

Your task is to study these uploaded images as visual anchors — observe the brush dynamics, atmospheric layering, asymmetry, ink-bleed, mist treatment, negative space — and reproduce those *qualities* in SVG. Not literal trace. **Composition study, then SVG approximation in the system's monochrome ink + element-pigment palette.**

---

## §1 — Required inputs

**Local files (upload + verify):**

1. `Documents/Designengineering/DOC5_App_Design.md` — verify §AMENDMENT block present
2. `Design/legend-screens-amendment.html` — IA reframe baseline
3. `Design/legend-v4-polish.html` — **§V1 has 10 layered-stroke DM symbols. v7 reuses these as the foreground subject in each polished card.**
4. `Design/legend-v6-card-archetypes.html` — what v7 is replacing (DO NOT carry forward — use only as a delta reference for what NOT to ship)
5. `Design/tokens.css`
6. `Design/icons.svg`

**Painted backgrounds:**

7. `Design/assets/backgrounds/` — 16 PNGs

**🔥 NEW REQUIREMENT — Reference paintings (upload all 6):**

8–13. **Six public-domain Chinese ink-wash paintings**, downloaded from Wikimedia Commons. They live at `Design/reference/InkWash/FromClaude/`. The user will upload all 6 alongside the brief. Use these as **visual study material**, not as raster assets — study composition, brush dynamics, atmospheric layering, then reproduce qualities in SVG.

   | Filename | Painter / work | Best for |
   |---|---|---|
   | `01-fan-kuan-travelers.jpg` (6.8 MB · 2809×5633) | **Fan Kuan** — *Travelers Among Mountains and Streams* (Northern Song) | **MOUNTAIN / EARTH** reference — atmospheric layered ridges, massive central peak. PRIMARY for §V1 tile (rocky pass behind blade) + §V3 modal hero (grand mountain composition) |
   | `02-ma-yuan-spring-path.jpg` (798 KB · 1759×1110) | **Ma Yuan** — *Walking on a Mountain Path in Spring* (Song) | Atmospheric small-scene composition; figure-and-mountain balance |
   | `03-ma-yuan-dancing-singing.jpg` (1 MB · 729×1280) | **Ma Yuan** — *Dancing and Singing (Peasants Returning from Work)* (Song) | Figure-in-landscape composition with negative space |
   | `04-ma-yuan-angler-wintry-lake.jpg` (27 MB · 5906×3159) | **Ma Yuan** — *Angler on a Wintry Lake* (1195) | **WATER / ATMOSPHERIC** reference — wide horizontal composition, fog over lake, single figure. PRIMARY for §V2 section hero |
   | `05-bada-shanren-two-birds.jpg` (1 MB · 1576×1825) | **Bada Shanren / Zhu Da** — *Two Birds* (Sen-oku Hakuko Kan, Kyoto) | **ASYMMETRIC EXPRESSIVE** reference — eccentric line, isolated subject, void as content. Use for brush dynamics study (DM symbol layering) |
   | `06-shitao-master-planting-pines.jpg` (1.7 MB · 1513×1667) | **Shi Tao** — *Master Shi Planting Pines* (1674) | Figural in landscape; pine + brush vocabulary reference. Use for atmospheric texture study |

**Coverage notes:**
- ✅ Mountain / Earth (戊 / 己): Fan Kuan #1 — strong
- ✅ Water / Atmospheric (壬 / 癸): Ma Yuan ×3 (#2, #3, #4) — strong
- ⚠️ Wood (甲 / 乙): Bada Shanren #5 + Shi Tao #6 give asymmetric branch energy and pine vocabulary — moderate (no specific bamboo)
- ⚠️ Metal (庚 / 辛) + Fire (丙 / 丁): no direct reference. Lean on Fan Kuan #1 for atmospheric composition and Bada #5 for asymmetric brush energy. Atmospheric mood transfers across motifs.

If any reference file is missing from the upload, **halt and ask the user to upload them**. Without these images, the v6 failure mode (text-memory-only generic ink-wash) repeats.

---

## §2 — Hard constraints

1. **Compose from `tokens.css` + `icons.svg` + v4-polish DM symbols only.** No new primitive colors, fonts, radii, or spacing values.
2. **Reference paintings are STUDY material**, not assets. Don't trace literally; don't embed as raster `<image>`. Study composition / brush dynamics / atmospheric layering, then reproduce qualities in SVG with the system's palette.
3. **All ink-wash imagery is SVG-rendered.** Use v4 layered-stroke vocabulary at LARGER scale: stacked horizon ridges (3–5 layers, decreasing opacity from 1.0 → 0.25 toward distance), brush-mark trees, ink-bleed via stroke-opacity stops, asymmetric negative space.
4. **Italic restricted to sub-headline + microcopy** (DOC5 §AM.10). No exceptions.
5. **Reuse painted PNGs** from `assets/backgrounds/` for tile backgrounds where appropriate — don't synthesise alternative silk paper.
6. **Element pigment as accent only.** The painterly scene stays ~85% in `ink` / `inkSoft` / `paperHair` greys; element pigment shows up only in the foreground subject (the v4 DM symbol) and at low alpha (≤25%) in the tile gradient.

---

## §3 — Scope (4 archetypes, exactly)

### §V1 — Element tile · 144×144 (highest priority — must ship)

A polished day-master stem tile, demonstrating the Element/Pillar archetype with proper ink-wash treatment.

- Render **one tile**: `庚 GENG · Yang Metal` (the canonical user)
- Square 144×144
- Bottom-left label: 庚 hanzi 22 Noto Serif SC + "GĒNG" pinyin 9.5 EB Garamond caps tracked
- Top-right Yang/Yin chip: 18px tall pill
- **Painterly scene** (the v6 failure point — fix here):
  - Reference images: study `01-fan-kuan-travelers.jpg` (atmospheric layered ridges) + `06-shitao-master-planting-pines.jpg` (brush vocabulary) + `05-bada-shanren-two-birds.jpg` (asymmetric composition energy)
  - Compose: rocky pass at lower-third (3-4 layered ridge silhouettes, opacity 1.0 / 0.6 / 0.35 / 0.2 from foreground to distance — direct reference Fan Kuan's atmospheric perspective), faint mist band at mid-height, blade silhouette (v4 DM symbol) sitting in the upper-third
  - **Asymmetric** — the blade sits left-of-center, mountain mass weighted right
  - **Ink-bleed effect** on edges: use `stroke-opacity` stops 0.3 → 0.9 → 0.4 across each path, or `<filter>` with `feGaussianBlur stdDeviation=0.4` on selected layers
  - **Negative space** — top quarter of tile is silk paper / faint gradient, breath
- Background gradient: vertical, top `metal10` → bottom `metal40`
- Total path count: ≥18 (multi-layer composition)

### §V2 — Section hero · 358×340 (must ship)

A polished Daily Reading hero card.

- Today's stem: 庚 Yang Metal day
- Full-bleed painterly scene as the card's entire art surface
- Reference images: study `04-ma-yuan-angler-wintry-lake.jpg` for the atmospheric horizontal composition (fog + lake + single figure) — PRIMARY ref for this hero · `01-fan-kuan-travelers.jpg` for atmospheric scale · `02-ma-yuan-spring-path.jpg` and `03-ma-yuan-dancing-singing.jpg` for figure-in-landscape balance
- **Compose**: dawn-mountain pass with blade silhouette in mid-distance; layered foreground rocks (3 ridges); central mist valley; distant peaks at 0.2 opacity. Subtle sun arc upper-right.
- Internal tab strip at top: `Today / Tomorrow / Weekly` — 3 pills in `cardstock-bg` with active-state in `ink` background + `silk` text
- Day-stamp eyebrow top-left: "庚 GENG · 2026.05.06" (EB Garamond 10 / 2.5 ls / metalDeep at 80%)
- Headline overlay lower-third: "A clarifying day" (Cormorant 26 / 600 / inkSoft on painterly bg)
- Sub-headline: "Yang Metal over Yang Wood — directness amplified" (Cormorant italic 17 / 500 / inkSoft — sub-headline allowed under §AM.10)
- Pill CTA bottom-right: "Read full →" bronze pill 12px padding
- Total path count: ≥30 (full-bleed scene complexity)

### §V3 — Modal hero · 358×420 (ship if §V1 + §V2 are clean)

A polished modal hero — what appears when user taps a stem tile and drills into the day-master detail.

- The 庚 stem's gradient + painterly scene scales up from §V1 tile to fill the modal hero
- Reference images: study `01-fan-kuan-travelers.jpg` for grand multi-layer ridge composition + `06-shitao-master-planting-pines.jpg` for atmospheric splash texture + `04-ma-yuan-angler-wintry-lake.jpg` for fog/mist valley treatment
- **Compose at hero scale** — reuse §V1's blade-against-rocky-pass composition, but with greater atmospheric depth: 5-layer ridges instead of 4, prominent mist valley, dramatic sky ~30% of vertical space
- Below the painterly hero: lower part of the modal shows minimal placeholder content (eyebrow + Cormorant 24 title + 2 paragraph stubs at EB Garamond 14 — regular, not italic — + "View reading →" pill)
- Upper-right close `×` chip
- Total path count: ≥40 (modal hero is the most ambitious composition)

### §V4 — Compact strip · 358×96 (cut first if running over budget)

A polished compact card — for list-row contexts (locked feature card, list snippet).

- Compose: thin painterly band as backdrop (1-2 ridge layers, low opacity)
- Reference images: study `02-ma-yuan-spring-path.jpg` and `03-ma-yuan-dancing-singing.jpg` for sparse-figure-in-landscape composition (Ni Zan reference unavailable — these substitute the negative-space-as-content quality at small scale)
- Title left-justified: Cormorant 17 / 500
- Description below: EB Garamond 12.5 (regular per §AM.10)
- Right side: chev or lock chip
- Total path count: ≥10 (low complexity by design — strips are quiet)

### §V5 — Drift log v7 (always ship — even if §V4 is cut)

For each archetype shipped, list:
- Which uploaded reference image(s) the agent studied
- One sentence per ref describing what visual quality was extracted (e.g., "From `01-fan-kuan-travelers.jpg` — extracted the layered-ridge atmospheric perspective with opacity gradient front-to-back")
- Path count audit (vs ≥18 / ≥30 / ≥40 / ≥10 acceptance criteria)
- Honest assessment: did studying the reference image actually shift the rendering vs v6's text-only approach? If not, why not?

---

## §4 — Out of scope (deferred to v8 — tightest cut yet)

Cut to preserve quota:

- ❌ All 10 stem tiles (v7 ships ONE: 庚)
- ❌ Per-element variants of any archetype
- ❌ Mosaic / catalogue layouts
- ❌ Halftone duotone register (was v6 §V4)
- ❌ Modal-from-card animation / 2-frame transition
- ❌ Reading catalogue full screen
- ❌ Today / Guidance / Friends / Profile screens

If you want to add any of these — STOP and put it in §V5 drift log as v8 candidate. Do not add to scope.

---

## §5 — Acceptance criteria

v7 ships when ALL of:

1. **§V1 element tile** renders with ≥18 path elements in the painterly scene; references at least 2 of the uploaded paintings (cited in §V5)
2. **§V2 section hero** renders with ≥30 paths, internal tab strip embedded, italic = sub-headline only
3. **§V3 modal hero** renders with ≥40 paths IF shipped
4. **§V4 compact strip** renders with ≥10 paths IF shipped
5. **§V5 drift log** lists every reference image consulted with extracted quality + honest assessment
6. **Visual sniff test**: side-by-side at 600px wide, v7 §V1 vs v6 §V1 — the difference must be **OBVIOUS** in ≤2 seconds. v7 must read as recognizably ink-wash; v6 reads as generic line-mark stylization. If indistinguishable at thumbnail, the reference-study didn't transfer — fail.
7. **DOC5 §AM.10 confirmed present** in uploaded copy
8. **Italic compliance** — sub-headline OR microcopy chip only

---

## §6 — Output

Single file: `elementum-design-legend-v7-ink-wash.html`

Self-contained HTML, fonts via Google Fonts CDN. TOC + each section in `<details>` open by default.

Sections:
- §V0 — Why v7 exists (recap; confirm DOC5 §AM.10; list every uploaded reference image you have access to)
- §V1 — Element tile · 庚 polished
- §V2 — Section hero · Daily Reading polished
- §V3 — Modal hero · 庚 detail (ship if budget allows)
- §V4 — Compact strip (ship if budget allows)
- §V5 — Drift log + reference attribution

---

## §7 — Sequencing after delivery

1. User + Claude Code render v7 in preview, run sniff test
2. If passes: v7's archetypes become canonical templates. The 4 sizes/styles establish the system; v8 (next quota cycle) **mechanically expands** to all 10 stems × all archetypes — no new design discovery needed
3. If fails: the reference-image strategy didn't help — and we abandon SVG-rendered ink-wash, switching to actual rasterized commission (Midjourney → trace → drop in)

v7 is the proof-of-concept. Make it count.
