# Prompt — Elementum Design Legend v6 (Card Archetypes · Painterly Scenes)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v6-card-archetypes.html`
**Goal:** Realize the **two card archetypes** + **modal-from-card pattern** + **second visual register** that you (the design agent) already identified after reviewing the CardReference materials. v5 failed to build because scope was too broad. v6 is **tighter, building on your own analysis**, not re-deriving it.

**Quota note:** the user has ~22% Claude Design budget left. **This is tighter than v5 was**, and v5 still failed. Do NOT exceed scope. Anything that overshoots the deliverables in §3 below — defer to v7.

---

## §0 — Your design observations are correct (accepted as the foundation)

You filed these design conclusions after reviewing the CardReference materials. They are now the **canonical foundation for v6** — don't re-derive, just realize:

> 1. **Two distinct card archetypes:** "Element/Pillar tile" (square, gradient-bg, art floats big, label bottom-left) for selector grids; "Section hero" (full-width painterly scene, headline overlay, pill CTA) for daily readings.
> 2. **Halftone duotone photography is a viable second visual register** alongside ink-wash — useful for Explore-grid items where bespoke ink illustrations are overkill.
> 3. **Modal-from-card pattern:** tapped card's gradient becomes the modal hero — for v6's Day Master detail sheets.
> 4. **Tab strips live inside section cards, not at screen level** — for the Today/Tomorrow/Weekly toggling on each daily reading.
> 5. **Painterly landscapes with the symbol embedded in scene** (moon over city + trees, cranes over mountains) — much stronger than icon-on-flat-color. The element scenes (甲 = tree on hill, 壬 = waves) need this **full landscape treatment, not centered-icon treatment**.

These five points map 1:1 to the v6 deliverables in §3 below. Don't expand scope to include patterns not in this list.

---

## §1 — Required inputs

**Local files (upload + verify):**

1. `Documents/Designengineering/DOC5_App_Design.md` — verify §AMENDMENT block present (grep `§AM.10`); halt if absent
2. `Design/northstar-anchor.html`
3. `Design/legend-primitives.html` — v1 (italic-v2 rule)
4. `Design/legend-patterns.html` — v2
5. `Design/legend-screens.html` — v3
6. `Design/legend-screens-amendment.html` — IA reframe
7. `Design/legend-v4-polish.html` — **§V1 has the 10 layered-stroke DM symbols. v6 reuses these as the "subject" embedded in each tile's painterly scene. Do not redesign the symbols.**
8. `Design/tokens.css`
9. `Design/icons.svg`
10. `Design/manifest.md`

**Asset folders (upload all):**

11. `Design/assets/backgrounds/` — 16 painted PNGs
12. `Design/reference/AppPages/` — 10 The Pattern + Nebula screenshots
13. `Design/reference/CardReference/Apps/` — **14 mystical-app card screenshots** (Sanctuary / Mooonly / etc.) — drag every PNG into the canvas chat directly
14. `Design/reference/CardReference/Games/` — 6 Ghost of Tsushima images

If any of (13) or (14) are missing from the canvas, **halt and ask the user to upload them** before starting §V4 (halftone duotone register depends on the Apps screenshots showing photographic-painterly composition).

---

## §1.5 — Ink-wash reference pool (study before drafting §V1)

The canvas can't fetch images live, but you have strong style memory from training. Use these collections and painter references as anchors when composing each tile's painterly scene. **Do not literal-trace** any specific work — produce SVG approximations in the system's monochrome ink + element-pigment palette. The references are for *style memory and motif retrieval*, not pixel reproduction.

### Public-domain ink-wash collections

| Collection | URL | Best for |
|---|---|---|
| Smithsonian Open Access | `si.edu/openaccess` | Asian Art (Freer/Sackler) — CC0 high-res |
| The Met Open Access | `metmuseum.org/art/collection/search` | Asian Art department, filter "Public Domain" |
| National Palace Museum Taipei | `theme.npm.edu.tw/opendata/` | Canonical Chinese paintings, open data API |
| Cleveland Museum of Art Open Access | `clevelandart.org/open-access` | Strong Asian ink collection |
| Wikimedia Commons | `commons.wikimedia.org/wiki/Category:Chinese_ink_wash_paintings` | Cross-period anthology |
| Public Domain Review | `publicdomainreview.org` | Curated essays + Asian art collections |

### Painter / work map per stem motif

The motifs in §V1 (甲 tree on hill, 乙 vine over rocks, etc.) align to specific painter traditions. Reach for these as style anchors per tile:

| Stem | Motif | Style anchor (painter / work) | What to evoke |
|---|---|---|---|
| 甲 jiǎ — tree on hill | 文同 / 吴镇 — pine and bamboo paintings (Song / Yuan) | Aged trunk · brush-flick foliage · mass-against-mist |
| 乙 yǐ — vine over rocks | 八大山人 (Bada Shanren) — plum branches, lotus | Eccentric asymmetric line · isolated subject on void |
| 丙 bǐng — sun over horizon | Tang murals · 梁楷 (Liang Kai) — Six Patriarchs | Bold bright-sun mass · radiating rays · dramatic |
| 丁 dīng — lantern in dusk | 吴道子 figural lines · Song interior painting | Soft horizon · faint mist · single light source |
| 戊 wù — mountain w/ cloud band | 范宽 (Fan Kuan) — *Travelers Among Mountains and Streams* (Northern Song) | Massive central peak · atmospheric distance · layered ridges |
| 己 jǐ — tilled fields | 倪瓒 (Ni Zan) — sparse landscapes (Yuan) · Song agricultural scenes | Spaciousness · sparseness · low ridge in distance |
| 庚 gēng — blade against rocky pass | Ming **scholar's-table** paintings (文房四宝) — sword on cloth | Cool greys · controlled lines · jewel-like precision |
| 辛 xīn — jewel on water surface | 仇英 (Qiu Ying) — refined narrative · jade still-lifes | Silver-grey wash · polished surface · delicate detail |
| 壬 rén — waves over rocks | 马远 (Ma Yuan) — *Twelve Views of Water* (Song) | Calligraphic flow lines · pure water studies · 12 distinct wave types in his series |
| 癸 guǐ — mist over peaks | 米芾 / 米友仁 (Mi Fu / Mi Youren) — "Mi-style" mist mountains · 石涛 (Shi Tao) splash-ink | Soft horizontal ink dots · atmospheric layers · wet-on-wet bleed |

### Compositional principles to honour (from the tradition)

- **Asymmetry over symmetry** — the subject sits off-center, balanced by mist or void
- **Atmospheric perspective via opacity** — distant ridges at 0.3 opacity, midground at 0.6, foreground at 1.0
- **Negative space as content** — silk paper / mist is *not* empty; it's the breath of the composition
- **One bold mark, many soft ones** — the v4 §V1 layered-stroke technique (core path 2.2–2.8 + bone-line companion 0.8–1.0 at 0.28 opacity) IS the right vocabulary for this
- **Element-pigment as accent only** — most of the painterly scene stays in `ink` / `inkSoft` / `paperHair` greys; the element pigment appears in the foreground subject (the v4 DM symbol) and as a faint gradient on the tile background

### What NOT to evoke (anti-patterns)

- ❌ Western landscape painting (no horizon-line + perspective vanishing point construction — that's not the tradition)
- ❌ Photorealism (no shading, no rendered texture — brush vocabulary is graphic, not painterly-illusionistic)
- ❌ Centered-subject-on-flat-color (your own observation #5 — the explicit anti-pattern v6 fixes)
- ❌ Bright saturated colors (palette stays restrained — element pigments at no more than 40% alpha in the scene)
- ❌ Cute / cartoon / kawaii motifs (the brush vocabulary is contemplative-literati, not playful)

---

## §2 — Hard constraints

1. **Compose from `tokens.css` + `icons.svg` + v4-polish DM symbols only.** No new primitive colors, fonts, radii, spacing values.
2. **Reuse v4 §V1 layered-stroke DM symbols** as the centerpiece of each §V1 tile's painterly scene. Don't redesign or re-render them — drop them in.
3. **Painterly landscape scenes are SVG** (canvas can't paint raster). Use the v4 layered-stroke vocabulary at landscape scale: layered horizon ridges, stacked mist bands, brush-mark trees, ink-wash rocks. Each tile's scene = backdrop layers + foreground subject (the DM symbol).
4. **Italic restricted to sub-headline + microcopy** per DOC5 §AM.10. No descriptive paragraphs in italic. Verify §AM.10 in uploaded DOC5.
5. **Tab nav stays icons-only** wherever it appears.
6. **Reuse painted PNGs** from `assets/backgrounds/` for any background imagery — don't synthesize alt silk paper.

---

## §3 — Scope (5 deliverables, exactly)

### §V1 — Element/Pillar tile archetype · 10 stem tiles

A 5×2 grid of **10 day-master stem tiles**. This is the headline deliverable.

Per tile spec:
- **Size:** 144×144 (compact tile, fits 5-across at 390-wide phone with 22px outer padding and 10px gap)
- **Background:** vertical gradient using the stem's element pigment alpha ladder — top `${pigment}10` → bottom `${pigment}40` (DOC5 §3.5.A)
- **Painterly scene:** behind/around the symbol — element-themed landscape composed of 5–8 SVG paths (ridge silhouettes, brush-stroke trees, mist bands, water curves, etc.)
  - 甲 jiǎ Yang Wood — **standing tree on hill** (DM tree symbol foreground; ridge-silhouette backdrop)
  - 乙 yǐ Yin Wood — **vine over rocks** (DM vine; clustered rock silhouettes)
  - 丙 bǐng Yang Fire — **sun over horizon** (DM sun rising over distant mountains)
  - 丁 dīng Yin Fire — **lantern in dusk garden** (DM candle; soft horizon, faint mist)
  - 戊 wù Yang Earth — **mountain peak with cloud band** (DM mountain symbol with mist)
  - 己 jǐ Yin Earth — **tilled fields with distant hills** (DM field grid + low ridge)
  - 庚 gēng Yang Metal — **blade against rocky pass** (DM blade symbol with sharp ridges)
  - 辛 xīn Yin Metal — **jewel on water surface** (DM jewel + still-water ripples)
  - 壬 rén Yang Water — **waves over rocks** (DM water symbol scaled big + foreground rocks)
  - 癸 guǐ Yin Water — **mist over distant peaks** (Mi-style mist dots + faint distant ridges)
- **Symbol placement:** the v4-polish DM symbol sits in the upper 60% of the tile, scaled to ~64–72% of the tile width — *embedded in* the scene, not floating on void
- **Label:** bottom-left, layered:
  - Stem hanzi · Noto Serif SC 22 · stem's `*Deep` color (e.g. `metalDeep` for 庚)
  - Pinyin in EB Garamond 9.5 caps · ls 2 · `inkLight`
- **Optical mass:** scene fills 70–85% of tile area (no centered-on-void placement — that's the anti-pattern v6 explicitly fixes)
- **Yang/Yin chip** top-right corner: 18px tall pill, 8px h-padding, EB Garamond 9px caps · `cardstock-bg` background

### §V2 — Section hero archetype · 1 Daily Reading card

A single full-width Daily Reading hero card, demonstrating the second archetype.

- **Size:** 358×340
- **Painterly scene:** full-bleed across card. Today's stem in landscape (e.g., for `Yang Metal day` → blade silhouette against dawn-mountain pass + faint sun). 12+ SVG paths layered, mood-aligned to today's element
- **Internal tab strip:** at top of card, `Today / Tomorrow / Weekly` — 3 pill tabs · `cardstock-bg` inactive, `ink` background + `silk` text active. Cinzel 11 / ls 3
- **Headline overlay:** Cormorant 26 / 600 / `inkSoft`-on-painted-bg, lower-third
- **Sub-headline:** Cormorant italic 17 / 500 / `inkSoft` (allowed under §AM.10 — sub-headline)
- **Pill CTA:** "Read full →" — bronze pill, bottom-right, 12px padding
- **Day-stamp eyebrow:** top-left of card, e.g. "庚 GENG · 2026.05.06" in EB Garamond 10 / 2.5 ls / uppercase / `${dayStem}Deep` at 80% alpha

### §V3 — Modal-from-card demo · 2 frames

Side-by-side at 280px each:

- **Frame A:** the §V1 tile grid showing one tile (`庚 GENG`) at pressed state (scale 0.96, slight darken)
- **Frame B:** the modal opened — full-screen sheet, hero band uses 庚 tile's gradient + painterly scene scaled up to 358×280 at top of modal. Below: scrollable detail content placeholders (eyebrow + Cormorant 24 title + 2 paragraph stubs + "View reading →" pill)

Annotation between frames: "Tile gradient becomes modal hero — continuous identity from selector to detail." 

Note: this is a STATIC 2-frame mock, not animated. Animation specs reference DOC5 §AM.4 + v4 §V4.

### §V4 — Halftone duotone register · 4 explore-grid items

A compact demonstration of the second visual register — for Explore-grid items where bespoke ink-wash is overkill.

Layout: 2×2 grid of explore tiles, each 168×128.
- **Style:** halftone duotone — render via SVG with a `<feColorMatrix>` desaturation + duotone gradient overlay. Two colors per tile: ink + element pigment.
- **Subjects (text labels — agent picks composition):**
  1. "Lunar phases · this week" — duotone moon over silhouette
  2. "Annual forecast · 2026" — duotone calendar / decade ribbon
  3. "Compatibility studies" — duotone two-figure silhouette
  4. "Element draws · weekly" — duotone deck of cards arrangement

These are deliberately less ornate than ink-wash tiles — quick visual signals, not contemplative compositions. **This section's purpose is to show when NOT to use ink-wash, not to compete with it.**

### §V5 — Drift log v6

Honest catalog of:
- Any new primitive tokens introduced (should be zero; if any, propose via `tokens.css` patch)
- Any new motifs not covered by the existing v4 DM symbol set (likely the painterly-scene backdrops; document as new asset family if so)
- Any halftone duotone primitives not previously in the system (gradient duotone + halftone pattern — likely new; flag for v1 §3.5.D doc patch as `surface-halftone`)

---

## §4 — Out of scope (deferred to v7)

Cut to preserve quota:

- ❌ **5-element tiles separately** beyond the 10 stem tiles (they were a v5 redundancy — the stem tiles already cover element identity)
- ❌ **Reading catalogue with multiple card variants** (defer; the `card archetypes` of §V1 + §V2 are the foundation v7 will expand into a full catalogue)
- ❌ **Today / Guidance / Friends / Profile full screens** (defer)
- ❌ **Card transition animations** (covered in DOC5 §AM.4 + v4 §V4 references — don't re-render)
- ❌ **Mosaic catalogue layout** (was v5 §V3 — defer)
- ❌ **Per-element halftone duotone variants** (the 4 generic explore items in §V4 are sufficient demo)

If you find yourself wanting to add anything from this list — stop and put it in §V5 drift log as a v7 candidate instead.

---

## §5 — Acceptance criteria (quantifiable)

v6 ships when:

1. **§V1 grid renders all 10 stem tiles**, each with its specific painterly motif from the table above. **Path count audit:** each tile's scene must have ≥6 painterly-backdrop paths *plus* the v4 DM symbol embedded (so total ≥10 paths per tile).
2. **§V2 hero card renders** with internal tab strip (3 pills), painterly full-bleed scene (≥12 paths), title overlay, italic sub-headline (Cormorant 17/500 — sub-headline allowed), pill CTA, day-stamp eyebrow. Total card ≥18 paths.
3. **§V3 demo shows BOTH frames**: tile pressed-state + modal opened, with the gradient continuity visibly preserved.
4. **§V4 4 halftone duotone explore items render** in a 2×2 grid at compact size, each clearly differentiated from ink-wash treatment.
5. **§V5 drift log** lists any new primitive use honestly. If `halftone duotone` introduces new tokens, flag them.
6. **DOC5 §AM.10 confirmed present** — note in §V0.
7. **Italic compliance**: every italic traces to sub-headline (Cormorant 19 or 17/500) OR microcopy chip (≤11.5). No descriptive paragraphs in italic.
8. **Sniff test**: side-by-side at 600px wide, v6 §V1 tile grid vs `legend-screens-amendment.html` §A2 catalogue cards — **the difference must read in ≤2 seconds** as "v6 has painterly landscapes, amendment is plain rectangles". If not distinguishable at thumbnail, fail.

---

## §6 — Output

Single file: `elementum-design-legend-v6-card-archetypes.html`

Self-contained HTML, fonts via Google Fonts CDN, no build step. TOC + each section in `<details>` open by default.

Sections:
- §V0 — Recap of agent's design observations (the §0 of this brief, quoted) + DOC5 §AM.10 confirmation
- §V1 — 10 day-master stem tiles · Element/Pillar archetype
- §V2 — Daily Reading hero · Section hero archetype + internal tab strip
- §V3 — Modal-from-card demo · 2 frames
- §V4 — Halftone duotone register · 4 explore tiles
- §V5 — Drift log v6

---

## §7 — Sequencing after delivery

1. User + Claude Code render v6 in preview, run sniff test
2. If passes: v6's two archetypes become canonical → `Design/manifest.md` gets new entries for `Tile.element` and `Hero.section`; `tokens.css` adds `surface-halftone` if §V4 introduced one
3. v7 (next quota cycle) expands archetypes into:
   - Reading catalogue with mosaic layout reusing both archetypes
   - Today / Guidance / Compatibility full screens
   - Per-element customizations of the tile archetype
   - Reading-content destination pages (the modal's full content)

Save the heroic work for v7 with fresh quota. v6 just **proves the archetypes**.
