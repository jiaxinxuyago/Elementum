# ChatGPT brief — Elementum Design Resource Pool

**Audience:** ChatGPT (with rudimentary project knowledge already loaded from `DOC_HANDOFF_CONTEXT_TRANSFER.md` + DOC5 + the design legends).
**Goal:** Build a robust visual resource pool — a "lego-block" component library + page-layout templates + concept art + iconography — that Claude Code can pull from to develop the app without further design-canvas dependency.

**Important framing:** You're not designing screens. You're filling a **library of reusable assets**. Each output is a building block, not a finished feature. Claude Code (a separate tool) will assemble these into actual app screens later.

---

## §0 — Why this exists

We've been using Claude Design (claude.ai/design) to iterate on the design system across 7 versions (v1 → v7). Each version costs canvas-quota. We're now bottlenecked by that quota.

The fix: an **external visual resource pool** — produced by you (ChatGPT) — that we can mine indefinitely without canvas dependency. Once stocked, every future Elementum design or engineering task pulls from this library; no more per-iteration brief cycles.

---

## §1 — Output formats (these are the only acceptable formats)

| Asset type | Format | Saved to |
|---|---|---|
| Component library (text blocks, cards, buttons) | Self-contained HTML with embedded CSS + SVG | `Design/Library/component-library-*.html` |
| Page layout templates | Self-contained HTML | `Design/Library/template-*.html` |
| Mood boards (typography, color, brush dynamics studies) | Self-contained HTML | `Design/Library/mood-*.html` |
| Iconography (5 elements, 10 stems, force roles, UI chrome) | SVG with `<symbol>` defs | `Design/Library/icons-*.svg` |
| Concept art (backgrounds, thumbnail textures, atmospheric paintings) | PNG, ≥1200px wide | `Design/Library/art/<name>.png` |
| Decorative elements (corner stamps, dividers, patterns) | SVG (preferred) or PNG | `Design/Library/decorations/<name>.{svg,png}` |

**Hard rules on file format:**
- No proprietary formats (no `.fig`, `.psd`, `.ai`)
- HTML must be self-contained (fonts via Google Fonts CDN, no build step)
- SVG must use `currentColor` for stroke/fill where possible (so Claude Code can recolor via parent CSS)
- PNG concept art must be at least 1200px wide for downstream use
- Every file has a header comment naming its tier, purpose, and the source legend it composes from (e.g. `<!-- Tier 1 · Color palette mood board · composes from tokens.css §1 -->`)

---

## §2 — Authority hierarchy (don't break these)

The locked rules from DOC5 §AMENDMENT carry forward without exception. Most important:

**Color (DOC5 §3.5.A pigment alpha ladder):** only `${pigment}10` (~6%), `${pigment}1A` (~10%), `${pigment}40` (~25%), `${pigment}CC` (~80%), `${pigment}` (100%). No invented intermediate alphas.

**Italic (DOC5 §AM.10):** only sub-headline (Cormorant 19/500/inkSoft) + microcopy chip (≤11.5 italic). Forbidden everywhere else — including descriptive paragraphs, eyebrows, archetype titles, body copy.

**Border-radius scale (DOC5 §3.5.B):** only `1, 10, 12, 16, 22, 999`. Nothing else.

**Spacing scale (DOC5 §3.5.C):** only `1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56`. Nothing else.

**Card surfaces (DOC5 §3.5.D + §AM.6, §AM.7):** 5 surfaces only: cream-cardstock · tinted (element-themed) · quiet · elevated (modals/tab bar) · cardstock-active (gold rim, Today decade).

**Typography:** 4 fonts only — Cormorant Garamond · EB Garamond · Cinzel · Noto Serif SC. No new fonts.

**IA (DOC5 §AM.1):** Reveal → Reading-catalogue → Energy Map. NOT a flat dashboard.

**Tab nav (DOC5 §AM.2):** icons-only, no text labels.

If you find yourself wanting to invent a new primitive, **flag it as a doc-patch trigger in the file's drift log** — don't add silently.

---

## §2.5 — Chinese ink-wash reference database (use these as visual anchors)

The aesthetic is grounded in classical Chinese ink-wash painting (sumi-e influence, 山水 landscape tradition). Use these references for compositional and brush-dynamic study — **not literal trace**. The system's palette is monochrome ink + restrained element pigment; the references inform brush vocabulary, atmospheric depth, asymmetric composition, and negative-space treatment.

### Local references (already curated — read these first)

`Design/reference/InkWash/FromClaude/` — 6 public-domain paintings, ~38 MB total:

| File | Painter / work | Best use |
|---|---|---|
| `01-fan-kuan-travelers.jpg` (6.8 MB · 2809×5633) | **Fan Kuan** — *Travelers Among Mountains and Streams* (Northern Song) | **MOUNTAIN / EARTH** — atmospheric layered ridges, massive central peak. Primary reference for Earth/mountain motifs. |
| `02-ma-yuan-spring-path.jpg` (798 KB · 1759×1110) | **Ma Yuan** — *Walking on a Mountain Path in Spring* (Song) | Atmospheric small-scene composition; figure-and-mountain balance |
| `03-ma-yuan-dancing-singing.jpg` (1 MB · 729×1280) | **Ma Yuan** — *Dancing and Singing — Peasants Returning from Work* (Song) | Figure-in-landscape with negative space |
| `04-ma-yuan-angler-wintry-lake.jpg` (27 MB · 5906×3159) | **Ma Yuan** — *Angler on a Wintry Lake* (1195) | **WATER / ATMOSPHERIC** — wide horizontal composition, fog over lake. Primary reference for water/mist motifs. |
| `05-bada-shanren-two-birds.jpg` (1 MB · 1576×1825) | **Bada Shanren / Zhu Da** — *Two Birds* (Sen-oku Hakuko Kan, Kyoto) | **ASYMMETRIC EXPRESSIVE** — eccentric line, isolated subject, void as content. Brush dynamics study. |
| `06-shitao-master-planting-pines.jpg` (1.7 MB · 1513×1667) | **Shi Tao** — *Master Shi Planting Pines* (1674) | Figural in landscape; pine + atmospheric brush vocabulary |

### Public-domain collections (browse for additional refs as needed)

You have web browsing — use it. These collections are CC0 / public-domain Chinese ink-wash paintings:

| Source | URL | Best for |
|---|---|---|
| Smithsonian Open Access (Freer/Sackler) | `si.edu/openaccess` (filter Asian Art, Chinese, ink) | High-res Song/Yuan/Ming landscapes |
| The Met Open Access | `metmuseum.org/art/collection/search` (filter Public Domain + Asian Art) | Bada Shanren, Ni Zan, Qiu Ying works at full resolution |
| National Palace Museum Taipei | `theme.npm.edu.tw/opendata/` | Canonical Chinese paintings — Fan Kuan, Ma Yuan, etc. |
| Cleveland Museum of Art Open Access | `clevelandart.org/open-access` | Strong Asian ink collection |
| Wikimedia Commons | `commons.wikimedia.org/wiki/Category:Chinese_ink_wash_paintings` | Cross-period anthology with high-res scans |
| Public Domain Review | `publicdomainreview.org` | Curated essays + Asian art collections |

**When you need a specific motif (e.g. Tier 4 concept art for a 丁 candle scene), search these sources for genuine examples first, then design the SVG/PNG approximation.**

### Painter / motif map per element + day-master stem

The 10 day-master stems pair to specific painter traditions. Reach for these as style anchors for any scene featuring the listed motif:

| Stem | Motif | Style anchor (painter / work) | What to evoke |
|---|---|---|---|
| 甲 jiǎ — Yang Wood | standing tree / pillar | **文同 / 吴镇** — pine and bamboo paintings (Song/Yuan) | Aged trunk · brush-flick foliage · mass-against-mist |
| 乙 yǐ — Yin Wood | vine / soft growth | **八大山人** (Bada Shanren) — plum branches, lotus | Eccentric asymmetric line · isolated subject on void |
| 丙 bǐng — Yang Fire | sun / blazing flame | Tang murals · **梁楷** (Liang Kai) — Six Patriarchs | Bold sun mass · radiating rays · dramatic |
| 丁 dīng — Yin Fire | candle / lantern | **吴道子** figural lines · Song interior painting | Soft horizon · faint mist · single light source |
| 戊 wù — Yang Earth | mountain / boulder | **范宽** (Fan Kuan) — *Travelers Among Mountains and Streams* | Massive central peak · atmospheric distance · layered ridges |
| 己 jǐ — Yin Earth | tilled field / valley | **倪瓒** (Ni Zan) — sparse landscapes (Yuan) | Spaciousness · sparseness · low ridge in distance |
| 庚 gēng — Yang Metal | blade / axe | Ming **scholar's-table** paintings (文房四宝) | Cool greys · controlled lines · jewel-like precision |
| 辛 xīn — Yin Metal | jewel / refined metal | **仇英** (Qiu Ying) — refined narrative · jade still-lifes | Silver-grey wash · polished surface · delicate detail |
| 壬 rén — Yang Water | river / ocean | **马远** (Ma Yuan) — *Twelve Views of Water* (Song) | Calligraphic flow lines · pure water studies (12 wave types) |
| 癸 guǐ — Yin Water | mist / dew / rain | **米芾 / 米友仁** (Mi Fu / Mi Youren) — Mi-style mist mountains · **石涛** (Shi Tao) splash-ink | Soft horizontal ink dots · atmospheric layers · wet-on-wet bleed |

### Five compositional principles (honour these in every scene)

1. **Asymmetry over symmetry** — subject sits off-center, balanced by mist or void
2. **Atmospheric perspective via opacity** — distant ridges at 0.2–0.3 opacity, midground 0.5–0.7, foreground 1.0
3. **Negative space as content** — silk paper / mist is *not* empty; it's the breath of the composition
4. **One bold mark, many soft ones** — v4 §V1 layered-stroke technique (core path 2.2–2.8 + bone-line companion 0.8–1.0 at 0.28 opacity) is the right vocabulary at icon scale; scale it up for hero scenes
5. **Element-pigment as accent only** — most of any scene stays in `ink` / `inkSoft` / `paperHair` greys; element pigment appears in foreground subject (≤25% alpha in scene fills, full pigment only in solid glyph marks)

### Five anti-patterns to avoid

1. ❌ Western linear perspective (no horizon-line + vanishing-point construction — that's not the tradition)
2. ❌ Photorealism (no shading, no rendered texture — brush vocabulary is graphic, not painterly-illusionistic)
3. ❌ Centered-subject-on-flat-color (the v6 failure pattern that v7 fixed)
4. ❌ Bright saturated colors (palette stays restrained — element pigments at no more than 40% alpha in scenes)
5. ❌ Cute / cartoon / kawaii motifs (tone is contemplative-literati)

### What ChatGPT can do that Claude design couldn't

You have **web browsing**. Claude design didn't. Use it:

- **Look up specific works** by title/painter to study composition before drafting an SVG
- **Pull thumbnails** from Wikimedia / Smithsonian to study brush dynamics for Tier 4 concept-art prompts (DALL-E 3 then generates the painting)
- **Verify motif details** (e.g. "what does Mi Fu's mist-dot technique actually look like?" — fetch + study before rendering)
- **Find under-represented motifs** (Yin Fire candle scenes are rare in our local refs — search and add references as you go)

Document any new references you fetch in the file's drift log so we can curate them into `Design/reference/InkWash/FromChatGPT/` after the session.

---

## §3 — Tier breakdown (work in this order)

Don't build the whole library at once. Work tier-by-tier so each output is reviewable before the next starts.

### Tier 1 — Foundation mood board (START HERE)
Single HTML file. Visual exploration of the design DNA — no components yet. Sections:
- Color palette swatches with alpha ladder demonstrated per pigment
- Font specimens (4 fonts × 3 weights × 4 sizes)
- Surface taxonomy (5 cards rendered side-by-side)
- Brush dynamics study (10 ink-wash stroke samples — building from the v4 §V1 layered-stroke vocabulary)
- Atmospheric depth examples (3-layer / 5-layer ridge compositions at hero scale)
- One paragraph of "voice samples" showing tone (sub-headline, microcopy, body, eyebrow)

**Deliverable: `Design/Library/mood-foundation.html`** — call it the "design DNA" board. ~1500–2000 lines.

### Tier 2 — Lego component library
Single HTML file. Every reusable text/visual building block, rendered in default + 1–2 state variants. Sections:
- **Text blocks**: 8–12 typography compositions (eyebrow + title + body recipes; headline + sub-headline pairs; quote blocks; data callouts)
- **Buttons**: 5 variants × 3 states (default · hover · disabled). Primary (ink pill) · Secondary (cream pill) · Tertiary (italic dashed-link) · Ghost · CTA-with-shadow
- **Cards**: at least 8 card sizes/styles (using v6/v7 archetypes as base): Element tile, Section hero, Modal hero, Compact strip, Locked card, Featured card, Daily snippet, Empty placeholder
- **Thumbnails**: 6–8 thumbnail patterns (square, wide, tall, with overlay, with gradient, with element-pigment tint)
- **Form controls**: Text input (4 states), Toggle, Radio group, Segmented control, Search bar
- **Chrome elements**: Eyebrow chip, Status badge, Tag pill, Lock chip, Tier badge

**Deliverable: `Design/Library/component-library.html`** — your "Lego box."

### Tier 3 — Page layout templates
Multiple HTML files (one per template). Demonstrate compositions for different purposes:
- `template-reading-catalogue-mosaic.html` — hero + 2-col grid (uses v6 + v7 cards)
- `template-reading-catalogue-vertical-stack.html` — single-column stack with rhythm
- `template-today-daily.html` — Today screen with decade pillar + daily snippet + do/avoid lanes
- `template-detail-page-long-form.html` — long reading with sub-headlines + quotes
- `template-modal-hero.html` — full-bleed modal with painterly hero + scrollable body
- `template-compatibility-pair.html` — dual-stem layout (Friends V2)
- `template-onboarding-step.html` — single onboarding step with input + helper text

Each file ~400–800 lines. Each starts with a comment block explaining: which legend it descends from, what data it expects, what variants it supports.

### Tier 4 — Concept art (raster / DALL-E)
PNG outputs from DALL-E 3 (or GPT image gen). Generate:
- 8 background paintings (silk-paper + ink-wash compositions varying in mood: morning/dusk/night, mountain/water/mist, sparse/dense)
- 10 day-master object illustrations (one per stem — tree, vine, sun, candle, mountain, field, blade, jewel, river, mist) at painterly fidelity that exceeds what SVG can produce
- 4 atmospheric texture overlays (faint silk grain, ink-bleed splash, mist banding, paper fold)
- 6 thumbnail-scale icons (force role, decorative element, Bagua diagram, etc.)

**DALL-E 3 prompt template (use this style for every painting):**
> *"Single sumi-e ink-wash painting on aged silk paper. Subject: [subject]. Style: minimalist, monochrome black ink with soft grey washes, no color. Composition: asymmetric, generous negative space. Atmospheric perspective with layered ridges fading to mist. Inspired by Fan Kuan / Ma Yuan / Bada Shanren tradition. Aspect ratio 16:9 (or 1:1 for icons). High resolution. No text, no signature, no border."*

**Deliverable: `Design/Library/art/<descriptive-name>.png`** for each.

### Tier 5 — Iconography expansion
SVG file with `<symbol>` defs to extend the existing `Design/icons.svg` library:
- Force role icons (Primary, Secondary, Catalyst, Resistance) — 4 new symbols
- Achievement / state icons (8 new — checkmark variants, alert, info, badge, star, rosette, scroll, compass)
- BaZi infographic components (5-element pentagram diagram, 12 zodiac glyphs, 64 hexagram swatches, decade-pillar timeline marks)
- Decorative dividers (3 styles: brush stroke, dotted, double-line with center ornament)

**Deliverable: `Design/Library/icons-expansion.svg`** ready to merge into the canonical `icons.svg`.

---

## §4 — Tier 1 spec (start here — proof of workflow)

Build **only Tier 1** in your first response. Don't move to Tier 2 until I've reviewed and approved Tier 1.

**File: `Design/Library/mood-foundation.html`**

Required sections (all in a single self-contained HTML):

### §M1 — Color palette + alpha ladder
- Paper / silk / ink swatches (8 colors, with hex values inline)
- Bronze ramp (5 colors)
- 5 element pigments × 5 alpha steps each (10/1A/40/CC/100) = 25 swatches in a structured grid
- 3 reserved accents (seal, dmBorder, gold) called out separately

### §M2 — Typography specimens
- Cormorant Garamond — 6 sizes × 3 weights (regular 400, medium 500, semibold 600) × 1 italic 500 sample
- EB Garamond — 4 sizes × 3 weights + italic 11.5 microcopy sample
- Cinzel — 3 sizes × tracked-caps display
- Noto Serif SC — 3 sizes × hanzi display (use 元素 / 庚 / 五行)
- One block showing the locked headline pair: "The Blade" + "Precision before intention"

### §M3 — Surface taxonomy
- 5 cards rendered in a row, each with eyebrow + title + body content
- Surface 1: cream-cardstock
- Surface 2: tinted (use Metal pigment as example)
- Surface 3: quiet
- Surface 4: elevated (with shadow + blurred chrome demonstrated)
- Surface 5: cardstock-active (gold rim)

### §M4 — Brush dynamics study (THE CRITICAL SECTION)
This is what separates Tier 1 from being just a token reference. Render 10 SVG ink-wash stroke samples demonstrating the system's painterly vocabulary:
- Single bold brush stroke (wet outer + dry inner, layered)
- Brush stroke with end-of-stroke ink pool
- Dry-brush trailing strokes
- Splash ink dot cluster
- Mist band (Mi Fu style)
- Layered ridge silhouettes (3 ridges, opacity 1.0/0.5/0.2)
- Asymmetric branch (Bada Shanren energy)
- Calligraphic line with weight variance
- Wash gradient (light → dark left-to-right)
- Negative-space composition (single mark + breath)

Each sample is a small SVG, 200×200, with the path SVG visible alongside as a code annotation so future tier components can reuse the technique.

### §M5 — Atmospheric depth examples
- 3-layer ridge composition rendered at 600×400 (foreground 1.0 / midground 0.6 / distance 0.3)
- 5-layer ridge composition rendered at 600×400 (foreground 1.0 / mid-near 0.7 / mid-far 0.4 / distance-near 0.25 / distance-far 0.15)

### §M6 — Voice samples
4 short text blocks demonstrating tone:
- Sub-headline (Cormorant italic 19): one example
- Body (EB Garamond regular 14): one paragraph
- Eyebrow (EB Garamond 10 caps tracked): one
- Microcopy chip (EB Garamond italic 11.5): three examples

### §M7 — Drift log (Tier 1)
One section listing any new visual primitives you introduced beyond what's in `tokens.css` + `icons.svg`. Should ideally be EMPTY for Tier 1 — that proves the foundation composes correctly.

---

## §5 — Acceptance criteria for Tier 1

Tier 1 is done when:
1. Single HTML file opens in any browser, fonts load via Google Fonts CDN, no build step needed
2. All 7 sections render with their listed content
3. §M4 brush dynamics — at least 10 SVG samples, each with visible code annotation
4. §M5 atmospheric depth — both 3-layer and 5-layer compositions render with visible opacity differences
5. Header comment block at top of HTML naming tier + purpose + composed-from sources
6. Drift log present (even if empty)
7. Total file ≥1200 lines (any less and you're under-delivering)

After review, I'll either approve and unlock Tier 2, or send refinement notes.

---

## §6 — Aesthetic constraints (don't drift)

You've already read the design legends and DOC5 §AMENDMENT. Reaffirming the non-negotiables:

1. **Palette stays restrained.** Element pigments at no more than 40% alpha in any composition. Most of any scene is in `ink/inkSoft/paperHair` greys. No bright saturated colors. No gradients beyond the locked surface treatments.
2. **No Western perspective construction.** Asymmetry, atmospheric perspective via opacity, negative space as content — that's the Chinese ink-wash tradition.
3. **No photorealism.** Brush vocabulary is graphic, not painterly-illusionistic.
4. **No cute / cartoon / kawaii motifs.** Tone is contemplative-literati.
5. **No invented primitives.** If a layout needs something not in the system, flag it — don't add silently.

---

## §7 — Process

For each tier:
1. You ship the HTML / SVG / PNG file(s)
2. I render in browser + give feedback
3. You revise (if needed)
4. I approve → unlock next tier
5. Repeat through Tier 5

For Tier 4 (concept art), the workflow is different:
- You generate one painting via DALL-E with the prompt template
- I download the PNG and save to `Design/Library/art/`
- You generate the next one
- After 4 paintings, we evaluate the batch's coherence before continuing

**Repository convention**: I'll commit each tier's file(s) under `Design/Library/` once approved. The folder structure becomes:

```
Design/Library/
├── mood-foundation.html              ← Tier 1
├── component-library.html            ← Tier 2
├── template-*.html                   ← Tier 3 (multiple files)
├── icons-expansion.svg               ← Tier 5
└── art/                              ← Tier 4
    ├── bg-painting-01-morning-mountain.png
    ├── bg-painting-02-dusk-mist.png
    ├── stem-jia-tree.png
    └── ...
```

This sits alongside the existing `Design/Legends/` and complements it — `Legends/` is the design system spec; `Library/` is the asset pool to mine.

---

## §8 — Confirm before proceeding

Before building Tier 1, confirm:
1. You understand the difference between this resource pool task vs the legend-design task you read about (legends were spec; library is reusable assets)
2. You have access to `tokens.css`, `icons.svg`, and at least `legend-primitives.html` + `legend-v7-ink-wash.html` (the most current visual reference)
3. You can render SVG ink-wash stroke samples in HTML output (test by describing what one would look like — if you can't, we need to discuss workarounds)
4. You agree the locked rules in §2 are binding

After confirmation, build Tier 1 in your next response. Don't build Tier 2 until I review.
