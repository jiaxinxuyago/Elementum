# Style Anchors — visual law for every generation

These constraints carry from the Elementum design system (DES_04 §AMENDMENT) and the master ChatGPT design brief. **Every background must honour all of them.**

---

## §1 — Palette

The Elementum app paints in a restrained palette. The source paintings are **monochrome ink + grey washes** — element-pigment color is added in CSS later via tinted overlays.

**Base ink range (in painted output):**
- Deepest ink: `#2B2722` (rare — only foreground accent, e.g. a single calligraphic stroke)
- Mid ink: `#4A433B` (primary brush vocabulary)
- Soft ink: `#857D72` (mid-distance ridges)
- Mist ink: `#B8AFA1` (faint distant ridges)
- Silk paper: `#F8F6F0` (the ground)

**Element pigments** (applied in CSS, NOT in painting):
- Wood: `#7A9E6E` (sage green)
- Fire: `#C4745A` (terracotta)
- Earth: `#B89A6A` (warm bronze)
- Metal: `#8BA3B8` (slate blue-grey)
- Water: `#5A7FA8` (cool blue-grey)

**Forbidden in painted output:**
- Saturated colors of any kind
- Bright whites (`#FFFFFF`) — paper is always silk-cream
- Pure blacks (`#000000`) — deepest ink stays at `#2B2722`
- Gradients beyond atmospheric perspective (no UI-style gradients)
- Western linear-perspective construction (no horizon-line + vanishing-point)

---

## §2 — Composition principles (honour all 5)

1. **Asymmetry over symmetry** — subject sits off-center, balanced by mist or void. The only target where mirror-symmetry is allowed is `bg-pair-twin-peaks` (Compatibility pair) where the UI requires a central axis.
2. **Atmospheric perspective via opacity** — distant ridges at 0.2–0.3 opacity, midground 0.5–0.7, foreground 1.0. Never use blur/depth-of-field.
3. **Negative space as content** — silk paper is *not* empty; it's the breath of the composition. Any background should reserve at least 30% of canvas as breathing space.
4. **One bold mark, many soft ones** — calligraphic vocabulary: a single dark mark gets companion supporting strokes at lower opacity. Avoid uniformly-rendered subjects.
5. **No human figures, no text, no signature, no border** — the Elementum design system handles all chrome.

---

## §3 — Painter / motif map (anchor each target to a tradition)

The 10 day-master stems pair to specific painter traditions. When a target is element-themed (e.g. metal modal, water reveal), reach for the corresponding painter as a style anchor:

| Stem | Element | Motif | Painter anchor | What to evoke |
|---|---|---|---|---|
| 甲 jiǎ — Yang Wood | Wood | standing tree / pillar | **Wen Tong / Wu Zhen** — pine + bamboo | Aged trunk · brush-flick foliage · mass-against-mist |
| 乙 yǐ — Yin Wood | Wood | vine / soft growth | **Bada Shanren** — plum branches, lotus | Eccentric asymmetric line · isolated subject on void |
| 丙 bǐng — Yang Fire | Fire | sun / blaze | **Liang Kai** — Six Patriarchs (dramatic dark forms) | Bold dark mass against pale field |
| 丁 dīng — Yin Fire | Fire | candle / lantern | **Wu Daozi** figural / Song interior painting | Soft horizon · faint mist · single light source |
| 戊 wù — Yang Earth | Earth | mountain / boulder | **Fan Kuan** — *Travelers Among Mountains and Streams* | Massive central peak · atmospheric distance · layered ridges |
| 己 jǐ — Yin Earth | Earth | tilled field / valley | **Ni Zan** — sparse landscapes (Yuan) | Spaciousness · sparseness · low ridge in distance |
| 庚 gēng — Yang Metal | Metal | blade / axe | Ming **scholar's-table** painting tradition | Cool greys · controlled lines · jewel-like precision |
| 辛 xīn — Yin Metal | Metal | jewel / refined metal | **Qiu Ying** — refined narrative · jade still-life | Silver-grey wash · polished surface · delicate detail |
| 壬 rén — Yang Water | Water | river / ocean | **Ma Yuan** — *Twelve Views of Water* | Calligraphic flow lines · pure water studies (12 wave types) |
| 癸 guǐ — Yin Water | Water | mist / dew / rain | **Mi Fu / Mi Youren** Mi-style mist · **Shi Tao** splash-ink | Soft horizontal ink dots · atmospheric layers · wet-on-wet bleed |

---

## §4 — Anti-patterns (reject these the moment they appear)

1. ❌ **Western perspective** — no vanishing-point construction, no horizon ruler, no diminishing one-point depth
2. ❌ **Photorealism** — no rendered texture, no shading-as-illumination, no surface-finish detail
3. ❌ **Centered-subject-on-flat-color** — the v6 design-canvas failure pattern that v7 fixed; subject must be embedded in atmospheric field
4. ❌ **Bright saturated colors** — palette stays restrained; even warm/cool tones are achieved via ink temperature
5. ❌ **Cute / cartoon / kawaii motifs** — tone is contemplative-literati; if it could fit on a child's stationery, it's wrong
6. ❌ **Decorative borders or ornament frames** — the painting fills the canvas edge-to-edge
7. ❌ **Visible signature, calligraphy text, or red seal** — the app applies its own seal (`#A04030` chop mark) elsewhere; source painting has none

---

## §5 — Quality sniff tests (run on each generated background)

For every output, before saving:

1. **Negative space test** — is at least 30% of the canvas silk-paper / mist? If too dense, regenerate.
2. **Asymmetry test** — does the subject sit off-center? If symmetric (except `bg-pair-twin-peaks`), regenerate.
3. **Color test** — open in any image viewer, check the histogram. If saturated channels appear, regenerate with stronger "monochrome" / "no color" reinforcement.
4. **Scale test** — at viewing size, does the painting feel like *atmospheric ground* or like *a focal subject*? Backgrounds that compete with foreground UI need to recede; if too prominent, request DALL-E to add more mist/space and dial down the dominant subject.
5. **Border test** — no painted frame, no signature block, no captions baked in.

If any test fails, regenerate before moving to the next target. Better to ship 19 strong than 19 mixed.

---

## §6 — Cascade for production

After ChatGPT delivers PNGs:

1. Save flat to `Design/Library/art/backgrounds/<filename>.png`
2. Optimize: resize to 2× display size (e.g. 9:16 portrait → 780×1690 for 390×844 retina), convert to WebP @ 85% quality, save alongside the PNG
3. Mirror to `Elementum_App/public/art/backgrounds/`
4. Wire into Tier 3 templates (`template-*.html`) replacing placeholder paths
5. Update `Design/manifest.md` with new asset entries

This cascade is post-generation Claude Code work — not in ChatGPT's scope.
