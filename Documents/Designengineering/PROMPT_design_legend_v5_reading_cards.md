# Prompt — Elementum Design Legend v5 (Reading Cards · Visual Richness)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v5-reading-cards.html`
**Goal:** Replace the visually monotonous reading-card pattern with a richly composed card system. The reading catalogue is currently a stack of identical cardstock rectangles with tiny line-mark icons — flat, low signal, indistinguishable at a glance. v5 elevates the catalogue to a varied, painterly, ink-wash-rich composition where each card *tells you what it is* before you read the title.

**Quota note:** the user has ~30% Claude Design budget left. **Do not attempt the full universe** of "every reading × every element × every screen". v5 is **one focused screen + a compact card-system reference + two alt layouts**. Anything bigger goes to v6.

---

## §0 — The diagnosis (read first)

Current state (`legend-screens-amendment.html` §A2 + `legend-v4-polish.html` §V5):
- 5 reading cards, all the same plain `cardstock-bg` rectangle
- 36×36 monochrome icon left, Cormorant 17 title middle, italic 12.5 description, chev right
- Featured card differs only by a faint element-pigment tint behind the icon
- No visual differentiation between cards; no thematic depth; no painterly continuity with the silk/ink/bronze identity established elsewhere in the app

What the user said (verbatim):
> "the reading cards on the page looks monotonous in color, lack of visual style, convey rough and vague visual language about its reading content, and looks empty to fit into the whole theme of our app design."

What the user wants:
- Each card carries thematic visual content (ink-wash imagery, textures, decorative elements) telling its story
- Variety in size, style, composition within a single screen
- A compositional system that works across catalogue / daily / guidance / compatibility screens

---

## §1 — Required inputs (verify before starting)

**Local files (upload):**

1. `D:\Elementum\Elementum_Project\Documents\Designengineering\DOC5_App_Design.md`
   → Verify §AMENDMENT block present (grep `§AM.10`). Halt if absent.

2. `D:\Elementum\Elementum_Project\Design\northstar-anchor.html`
3. `D:\Elementum\Elementum_Project\Design\legend-primitives.html`
4. `D:\Elementum\Elementum_Project\Design\legend-patterns.html`
5. `D:\Elementum\Elementum_Project\Design\legend-screens.html`
6. `D:\Elementum\Elementum_Project\Design\legend-screens-amendment.html` — **§A2 catalogue is the baseline you're replacing**
7. `D:\Elementum\Elementum_Project\Design\legend-v4-polish.html` — v4's enriched DM ink-wash icons (§V1) are the visual benchmark for card imagery
8. `D:\Elementum\Elementum_Project\Design\tokens.css`
9. `D:\Elementum\Elementum_Project\Design\icons.svg`
10. `D:\Elementum\Elementum_Project\Design\manifest.md`

**Asset folders:**

11. `D:\Elementum\Elementum_Project\Design\assets\backgrounds\` — 16 painted PNGs (use `bg-reading-*` variants for card decoration)
12. `D:\Elementum\Elementum_Project\Design\reference\AppPages\` — 10 The Pattern + Nebula screenshots (overall app layout reference)
13. `D:\Elementum\Elementum_Project\Design\reference\CardReference\Apps\` — **14 screenshots of mystical-app card stacks** (Sanctuary, Mooonly, etc.). Study how each card has its own illustrated thumbnail and varied size within the screen.
14. `D:\Elementum\Elementum_Project\Design\reference\CardReference\Games\` — **6 Ghost of Tsushima menu screenshots**. Study the ink-wash + bold-color-accent + photographic-painterly composition language.

---

## §2 — Curated ink-wash reference pool (use these motifs and aesthetic anchors)

Use these as inspiration for card imagery. The agent does NOT need to fetch these images live; instead, study the *style* and reproduce it via SVG paths, layered painterly fills, gradient ink-bleeds, and subtle textures within the canvas's SVG/CSS toolset.

### Public-domain ink-wash collections (browse before designing)

- **Smithsonian Open Access** → `si.edu/openaccess` — search "Chinese ink", "Japanese ink wash"; CC0 high-res
- **The Met Open Access** → `metmuseum.org/art/collection/search` — Asian Art department; CC0
- **National Palace Museum Taipei** → `theme.npm.edu.tw/opendata/` — open imagery API + bulk archive
- **Cleveland Museum of Art Open Access** → `clevelandart.org/open-access`
- **Wikimedia Commons** → `commons.wikimedia.org/wiki/Category:Chinese_ink_wash_paintings`
- **Public Domain Review** → `publicdomainreview.org` — Asian art collections

### Painters and works to study per element / motif

| Element | Subject | Reference painter / work | Visual feel |
|---|---|---|---|
| 木 Wood | bamboo | **郑板桥** (Zheng Banqiao, Qing) — bamboo paintings | Spare, calligraphic, leaves as flicks of brush |
| 木 Wood | pine | **文同** (Wen Tong, Song) — pine and bamboo | Aged wood texture, dark trunk + lighter needles |
| 木 Wood | plum / vine | **八大山人** (Bada Shanren, Qing) — plum branches, lotus | Eccentric lines, asymmetric, isolated subject on void |
| 火 Fire | sun / phoenix | Tang dynasty palace murals; **梁楷** (Liang Kai) — Six Patriarchs | Bold strokes, dramatic mass |
| 火 Fire | lantern / candle | Less common — use Song-dynasty **interior painting** + **吴道子** (Wu Daozi) figural lines |
| 土 Earth | mountain | **范宽** (Fan Kuan) — *Travelers Among Mountains and Streams* (Northern Song) | Massive central peak, atmospheric distance, layered ridges |
| 土 Earth | mountain | **黄宾虹** (Huang Binhong) — late landscape | Dense, dark-on-dark, accumulated layers |
| 土 Earth | minimalism | **倪瓒** (Ni Zan, Yuan) — sparse trees, empty river | Spaciousness, sparseness, solitude |
| 金 Metal | blade / sword | Ming-dynasty **scholar's-table paintings** (文房) — sword on cloth | Cool greys, controlled lines, jewel-like precision |
| 金 Metal | jade / bell | **仇英** (Qiu Ying) — refined narrative; 文房四宝 still-lifes | Silver-grey wash, polished surfaces |
| 水 Water | river / waves | **马远** (Ma Yuan) — *Twelve Views of Water* (Song) — 12 different water types | Pure water studies, calligraphic flow lines |
| 水 Water | mist | **米芾 / 米友仁** (Mi Fu / Mi Youren) — "Mi-style" mist mountains | Soft horizontal ink dots, atmospheric layers |
| 水 Water | dew / rain | **石涛** (Shi Tao, Qing) — splash-ink landscapes | Wet-on-wet bleed, expressive marks |

### 10-stem motif map (locked from amendment §A3 — re-confirmed here)

| Stem | Yang/Yin | Element | Motif | Painter to study |
|---|---|---|---|---|
| 甲 jiǎ | Yang | Wood | Standing tree / pillar | Wen Tong, Wu Zhen |
| 乙 yǐ | Yin | Wood | Vine / soft growth | Bada Shanren, Zheng Banqiao |
| 丙 bǐng | Yang | Fire | Sun / blazing flame | Tang murals, Liang Kai |
| 丁 dīng | Yin | Fire | Candle / lantern | Wu Daozi line work |
| 戊 wù | Yang | Earth | Mountain / boulder | Fan Kuan, Huang Binhong |
| 己 jǐ | Yin | Earth | Tilled field / valley | Ni Zan, agricultural Song scenes |
| 庚 gēng | Yang | Metal | Blade / axe | Scholar's-table 文房 paintings |
| 辛 xīn | Yin | Metal | Jewel / refined metal | Qiu Ying still-lifes |
| 壬 rén | Yang | Water | River / ocean | Ma Yuan *Twelve Views of Water* |
| 癸 guǐ | Yin | Water | Mist / dew / rain | Mi Fu mist mountains, Shi Tao splash |

---

## §3 — Scope (tight, quota-aware)

**v5 delivers exactly these things — no more:**

### A. One enriched **Reading Catalogue** screen (§V1)
The §A2 catalogue redesigned with 5 visually-rich, differently-composed cards. Phone-frame mock at 390×844, painted background (`bg-reading-*` family), cards as below.

### B. **5 enriched reading-section cards** (§V2)
One card per reading section. Each card is **a small painted scene** that tells the section's story. Each card uses **a different size + composition** so the catalogue reads as varied and rhythmic.

| Card | Section | Element-theme | Composition treatment | Size |
|---|---|---|---|---|
| 1 | **Elemental Nature** | All 5 (the user's chart-distribution) | **Hero card** — full-bleed silk with a wu-xing pentagram landscape: 5 element-marks arranged in productive cycle, with ink-wash mountain / water / tree / sun / metal motifs encircling. Title overlaid bottom-left. Cormorant 22. | **Hero · 358×220** |
| 2 | **Dominant Energies** | User's primary element (use Metal `庚` for the example) | **Element-themed card** — element-pigment tint as base, 88×88 day-master ink-wash seal centered-right, "Primary · The Blade" eyebrow + Cormorant 18 title left, italic 11.5 microcopy below | **Standard · 358×118** |
| 3 | **Forces in Motion** | Catalyst + Resistance pairing | **Split card** — vertically halved: top half tinted Catalyst-element (Wood ↑), bottom half tinted Resistance-element (Fire ↓). Two arrow-marks, stems facing each other. Title centered straddles the divide. | **Standard · 358×140** |
| 4 | **Life Chapters** | Earth (time / decade) | **Timeline card** — horizontal decade strip across the card: 8 vertical decade ticks, the active decade highlighted with `cardstock-active` gold rim (DOC5 §AM.7). Title above strip, italic age-range label below. Subtle ink-wash mountain horizon as backdrop. | **Wide · 358×160** |
| 5 | **Pillar Patterns** | Mixed (4 pillars · 8 characters) | **Compact card** — 八字 grid micro-rendered (4 vertical columns × 2 stems each) in element pigments. Day-pillar gets `dmBorder` highlight. Title right of grid. Locked or unlocked state visible. | **Compact · 358×96** |

Each card includes:
- A clear **content scene** (ink-wash imagery, not just an icon)
- Element pigment used at allowed alpha (`10` / `1A` / `40` per DOC5 §3.5.A — no off-ladder values)
- Rich texture via layered SVG paths or painterly background overlays
- Title typography composed *with* the imagery (not stacked above it)
- Locked-state variant for cards 4 + 5 (lock chip + ◆ Seeker tier badge)

### C. **2 alternate layout variants** (§V3 + §V4)

**§V3 — Mosaic catalogue layout**
The same 5 cards, rearranged into a mosaic: hero (Elemental Nature) full-width on top, then 2-column grid of the four standard/compact cards beneath. Demonstrates that the card system supports varied screen compositions.

**§V4 — Daily snippet hero**
A single Daily Reading hero card in a Today-screen context — 358×280, full ink-wash daily-stem imagery (e.g. 庚 over Yang Wood = blade meeting standing tree), title overlay, "Read full →" pill. Shows the card system at hero-card scale.

### D. **Card system reference** (§V5)

Compact reference table cataloguing:
- **5 card sizes** (hero · standard · wide · compact · strip) with dimensions
- **5 composition types** (full-bleed scene · split-tinted · timeline · grid-overlay · element-themed seal)
- **5 decoration techniques** (painterly bg overlay · layered ink-wash motif · element pigment tint · dmBorder accent · gold rim active)
- **3 state variants** (default · locked · empty/scheduled)

This becomes the source-of-truth catalogue for v6 to expand into Today / Guidance / Compatibility screens.

### E. **Drift log v5** (§V6)
Honest report of any visual primitives introduced beyond v1+v2+amendment+v4. Most card decoration techniques should compose from existing tokens (`tokens.css` colors, `icons.svg` ink-wash motifs from v4 §V1, painted PNG backgrounds) — but if a new technique is needed (e.g. radial gradient inside a card), flag it with proposed token name.

---

## §4 — Hard constraints

1. **No new primitive colors / fonts / radii / spacing values.** Compose from `tokens.css` only.
2. **All ink-wash imagery must be SVG-rendered** (no raster image generation expected — canvas can't paint). Use the v4 §V1 day-master icon vocabulary (layered core stroke + supporting bone-line + opacity gradients) at LARGER scale to fill a card. v4 demonstrated this technique works at 88×88; v5 scales it to 220×140 for hero card scenes.
3. **All italic text must be sub-headline (Cormorant 19/500/inkSoft) OR microcopy (≤11.5 EB Garamond italic).** No descriptive paragraphs in italic. (DOC5 §AM.10 — verify §AM.10 present in uploaded DOC5 before starting.)
4. **Tab nav stays icons-only** if any tab bar appears.
5. **Reuse painted backgrounds** from `assets/backgrounds/` — don't synthesize alternative silk paper.
6. **Reuse ink-wash icon vocabulary** from `icons.svg` `dm-*` and `read-*` (v4-promoted versions) for any motif element you need.

---

## §5 — Out of scope (deferred to v6)

To preserve quota:
- ❌ Card sets for **all five elements separately** (deferred — v5 ships ONE example per card, not 5 variants per card)
- ❌ **Today / Guidance / Compatibility full screen layouts** (v5 ships ONE Today daily-snippet card sample only, not the full screens)
- ❌ **Full reading-content pages** (the destinations the cards link to) — v5 is catalogue + entry only
- ❌ **Animation specs for card transitions** (out of scope; carry forward v4 §V4 + §V5 specs)
- ❌ **All 10 stem object cards** (the v4 day-master ink-wash seal already covers the per-stem visual identity at icon scale)

If you have spare space inside the v5 file, use it for the §V6 drift log — *not* for adding scope.

---

## §6 — Acceptance criteria

v5 is done when:

1. **5 reading cards rendered**, each with a distinct composition treatment from §3.B above
2. **Mosaic alt-layout rendered** in §V3
3. **Daily hero rendered** in §V4
4. **Card system reference** complete in §V5 (all 5×3 cells filled)
5. **Drift log** in §V6 honestly catalogues any new primitive use
6. **Visual richness sniff test**: place v5's catalogue side-by-side with `legend-screens-amendment.html` §A2 catalogue at 600px wide. The difference must be obvious in ≤2 seconds — v5 must read as visually richer, not just rearranged
7. **Italic compliance** (DOC5 §AM.10): no descriptive paragraphs, no eyebrows, no archetype titles in italic
8. **Path count audit per card scene**: hero card ≥15 paths in its imagery (proves real ink-wash composition, not flat illustration); standard cards ≥8 paths

---

## §7 — Output

Single file: `elementum-design-legend-v5-reading-cards.html`

Self-contained HTML, fonts via Google Fonts CDN, no build step. TOC + each section in `<details>` open by default.

Sections:
- §V0 — Why v5 exists (recap monotonous-cards diagnosis, design intent)
- §V1 — Reading catalogue with 5 enriched cards (the headline deliverable)
- §V2 — Per-card breakdown: motif, composition, token annotations
- §V3 — Mosaic alt-layout
- §V4 — Daily snippet hero
- §V5 — Card system reference (5 sizes × 5 comp types × 3 states matrix)
- §V6 — Drift log

---

## §8 — Sequencing after delivery

1. User + Claude Code render v5 in preview, run sniff test
2. If passes: drop card composition templates into `Design/manifest.md` as a new card system entry
3. v6 (later, with fresh quota) expands to: per-element card sets · Today / Guidance / Compatibility full screens · reading-content destinations
