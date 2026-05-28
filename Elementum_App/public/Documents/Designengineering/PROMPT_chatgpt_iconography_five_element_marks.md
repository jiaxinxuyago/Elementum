# Iconography refresh — Five Element marks (3A)

**Audience:** ChatGPT, continuing from the same project (project knowledge already loaded: `DOC_HANDOFF_CONTEXT_TRANSFER.md`, DOC5 §AMENDMENT, tokens.css, icons.svg, `Design/Legends/*.html`, `Design/assets/Library/primitives-library.html`).

**Recommendation:** start a NEW conversation in the SAME ChatGPT project. Drop image reference + this prompt into the first message.

**Required attachment:** `Design/assets/Concept Arts/Five Elements/Five Elements (1).png` — sumi-e ink-wash composition showing all five elemental motifs on a single sheet (enso ring · bamboo stand · river waves · flame tongue · mountain/gate). This is the visual seed; do not literally copy it — extract the iconic essence of each motif.

---

## §0 — What we're refreshing

The current §3A Element Marks in `primitives-library.html` are five geometric stub icons:

| Element | Current shape | Why it's weak |
|---|---|---|
| Metal · 金 | A single arc (8×) | Reads as "horizon" or "smile," not metal/blade |
| Wood · 木 | Vertical line + two diagonals from center | Abstract sapling — recognizable only in context |
| Fire · 火 | Hollow triangle (point up) | Reads as triangle first, fire second |
| Earth · 土 | Rounded square | Could be anything — door, button, frame |
| Water · 水 | Two parallel wavy lines | Cleanest of the five but uninspired |

These are the only icons in the entire system that user-test poorly when shown out of context. We need higher-fidelity, more recognizable marks that carry the ink-wash brand voice into the 24px icon grid — without becoming painterly raster art (those go via DALL-E; this task is **SVG-only**).

**Goal:** ship a set of refined element marks with 3 stylistic variations per element (15 marks total), preserving the canonical IDs `el-metal · el-wood · el-fire · el-earth · el-water` and adding suffixed siblings (e.g. `el-metal-line`, `el-metal-accent`, `el-metal-fill`).

---

## §1 — Reference: what to absorb from `Five Elements (1).png`

The attached composition is your visual law for this task. Look past the painterly rendering and extract the **iconic essence** of each motif:

| Element | Motif in the reference | Iconic essence to keep |
|---|---|---|
| **Metal · 金** | Enso (zen circle) — single brushstroke ring, slightly broken at one point | A ring or arc that *feels closed by gesture*; the unfinished gap is character, not error |
| **Wood · 木** | Bamboo stand — vertical culm with one segmented node and two leaf clusters | Vertical authority + node articulation + asymmetric branching (NOT a symmetric tree) |
| **Fire · 火** | Flame tongue rising from the waves — one tall tongue, one shorter, ink halo behind | A teardrop flame shape, asymmetric, with an inner tongue or pulse line |
| **Earth · 土** | Mountain mass + a stone gate (torii-like rectangle) anchored in the foreground | Layered peaks OR a stable rectangular framing element — earth as *foundation*, not decoration |
| **Water · 水** | River waves flowing through the centre — repeating curve crests | A flowing wave with at least one crest + trough; OR a droplet with a single ripple |

Do NOT include: birds, rocks, splatter, mountains-as-background, sun/moon discs. Those belong to atmospheric depth assets, not the mark set.

---

## §2 — Aesthetic direction

The mark set must read as one family. Think **"ink-wash essence translated to a clean 24px grid"** — the brush memory survives in stroke weight, asymmetry, and a single deliberate gesture per mark.

**Voice priorities (in order):**

1. **Recognizable at 16px first.** If a non-Chinese-reading user can't identify the element at 16px in a tab bar, the mark fails. Test mentally by mentally rendering each at 16/18/24/28.
2. **Brush memory.** Strokes should feel calligraphic — `stroke-linecap: round`, `stroke-linejoin: round`, slight asymmetry (the bamboo leaves are NOT mirror-symmetric; the enso has a single gesture-break; the flame tongue leans).
3. **Ink economy.** Each mark uses ≤4 strokes when possible. The current Metal arc is 1 stroke — that's the floor; the new Metal-accent variant can add one more for the gesture-break dot.
4. **Family coherence.** When the 5 marks sit together on a tab bar, no single mark dominates by ink density. Wood (lots of strokes) and Water (multi-wave) need to be visually quieter than their stroke counts suggest.
5. **Cultural authenticity over geometric purity.** A bamboo culm with a node beats a perfect parallelogram. A flame with inner tongue beats a Platonic triangle.

**Forbidden:**
- Western/Material/SF symbol shapes (no anvils for Metal, no leafy trees for Wood, no campfire-with-logs for Fire, no globe for Earth, no faucet for Water).
- Color fills outside `currentColor`. Pigment tint comes from the host context, not the icon.
- Decorative dots, sparkles, or radiating lines that don't carry meaning.

---

## §3 — Hard constraints (binding)

These come from the canonical icon convention in `Design/Legends/icons.svg` and `primitives-library.html §3`. Not negotiable:

1. **`viewBox="0 0 24 24"`** — every symbol.
2. **`stroke="currentColor"`** — never hex, never `var()`. Tint flows from `.icon-cell { color: var(--metalDeep) }`.
3. **`stroke-width="1.7"`** — single weight across the family. (You may use `1.4` for *secondary* accent strokes inside a variant — e.g. the inner tongue of Fire — but the dominant gesture is always 1.7.)
4. **`stroke-linecap="round"` and `stroke-linejoin="round"`** — calligraphic terminals.
5. **`fill="none"`** by default. The exception is the `*-fill` variant (§4 variant C) which uses `fill="currentColor"` on the silhouette only.
6. **No raster, no images, no `<filter>`, no `<pattern>`.** Pure SVG primitives: `<path>`, `<line>`, `<circle>`, `<rect>`, `<polyline>`. No `<text>` (the Noto SC glyph 金木火土水 is separate from the mark).
7. **No external font calls, no `<style>` blocks inside symbols, no `<defs>` inside symbols.** All styling on element attributes, so the `<use href="#...">` consumer pattern works.
8. **Centered inside the 24×24 viewBox** with ≥2px optical margin on every side. Don't bleed to the edge.
9. **IDs follow the pattern `el-<element>-<variant>`:** `el-metal-line · el-metal-accent · el-metal-fill` (and equivalent for wood/fire/earth/water). Drop the `-line` suffix on the canonical default so existing references (`#el-metal` etc.) still resolve — i.e. `el-metal` IS the line variant; the new IDs are `el-metal-accent` and `el-metal-fill`.

If any motif tempts you to break a rule, log it in §8 drift — don't ship the violation.

---

## §4 — Required deliverables: 3 variations × 5 elements

For each element, deliver three marks:

### Variant A · `-line` (canonical refresh)
The line-only refinement of the current mark. Same stroke discipline, but the SHAPE is renewed using the reference motif. This replaces the current geometry in `icons.svg`.

- Metal: enso arc with a *single deliberate gap* (one stroke that nearly closes a circle, leaving a 30° opening at the bottom-right). Replaces the current bare arc.
- Wood: vertical culm with **one** node mark (small horizontal tick at mid-height) + two leaf strokes (asymmetric, one shorter, one curling). Replaces the current Y-fork.
- Fire: teardrop flame outline (closed curve, base wider than peak, slight lean). Replaces the current triangle.
- Earth: three layered peaks (low-mid-low silhouette, like distant mountains) above a horizon line. Replaces the current rounded square.
- Water: droplet + single ripple OR two crested waves (your choice — pick the one that reads cleaner at 16px). Replaces the current two parallel waves.

### Variant B · `-accent` (signature mark)
Variant A + one small accent that adds character without sacrificing legibility. Use this for tab-bar active state and hero placements.

- Metal: line variant + a single `currentColor` dot inside the ring (centered) — *the seal-mark inside the enso*.
- Wood: line variant + a tiny circle at the node (a fruit, a knot, a bud).
- Fire: line variant + an inner tongue (a smaller flame curve inside, stroke-width 1.4).
- Earth: line variant + a sun/moon disc behind the tallest peak (small circle, partially eclipsed by the peak — use `<circle>` masked by overlap, no actual `<mask>` element).
- Water: line variant + a single droplet above the wave/ripple.

### Variant C · `-fill` (badge/chip silhouette)
Filled silhouette version for use on badges, pigment chips, and small (≤18px) contexts where stroke marks get muddy. `fill="currentColor"`, `stroke="none"`.

- Metal: filled disc with a wedge cut out (the enso, sealed).
- Wood: filled bamboo culm + filled leaves (silhouette).
- Fire: filled teardrop flame (the inner tongue becomes a small cutout via even-odd fill rule).
- Earth: filled mountain silhouette (the three peaks become a solid jagged shape).
- Water: filled droplet + small filled ripple (two separate filled paths).

**Total: 15 SVG symbols.**

---

## §5 — Output format

**Visual-showcase mode** (standing instruction from Tier 2): render the SVGs inline as `<svg><use href="#id"/></svg>` consumers in a clean cardstock grid. NO `<pre><code>` blocks, NO base64 inlines. The user must see the marks render at their intended size, not read the markup.

Deliver as a **single self-contained HTML file** named `tier3-iconography-five-elements.html`, structured:

```
<!doctype html>
<html>
<head>
  — Inline <style> mirroring primitives-library.html's icon-cell grid
  — Tokens: ink, paperHair, cardstock-bg, metal/wood/fire/earth/water + Deep variants
  — Fonts: EB Garamond + Cinzel + Noto Serif SC via Google Fonts link
</head>
<body>

  <!-- Inline sprite at top of body -->
  <svg xmlns="..." width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <!-- 15 symbols here, grouped by element with comment dividers -->
    </defs>
  </svg>

  <main class="page">
    <header>
      Title · "Five Element Marks · v2 candidate set"
      Subtitle · reference cited (Five Elements (1).png)
    </header>

    <!-- Grid: 5 elements × 3 variants = 15 cells, each labelled -->
    <section class="mark-grid">
      Row 1 — Variant A (line):  Metal · Wood · Fire · Earth · Water
      Row 2 — Variant B (accent): same 5
      Row 3 — Variant C (fill):  same 5
    </section>

    <!-- Scale test row -->
    <section class="scale-test">
      Each of the 15 marks rendered at 16 / 18 / 24 / 28 / 36 px
      with the element's Deep pigment as `color`.
    </section>

    <!-- Tab-bar simulation -->
    <section class="tabbar-sim">
      One faux bottom-tab-bar showing the 5 Metal/Wood/Fire/Earth/Water marks
      from Variant A AND from Variant B side-by-side, so we can pick which
      reads better in the actual tab context.
    </section>

    <!-- Drift log §8 -->
  </main>
</body>
</html>
```

The mark-grid cells use the same `.icon-cell` pattern as primitives-library.html §3 (cardstock bg, paperHair border, 12px radius, 14px padding, centered SVG @ 28×28, name + variant label beneath).

Tint each cell's `color` to the element's Deep pigment (`--metalDeep #6a849a` etc.) so the marks render in their canonical element hue, not flat ink.

---

## §6 — Acceptance criteria

A mark passes when ALL of these are true:

1. **16px recognition** — drop it into a 16×16 box and a fresh viewer can still identify the element (test by mentally rendering each one tiny).
2. **Stroke discipline** — only 1.7 dominant stroke + optional 1.4 accent stroke. `<path stroke-width="2">` anywhere is an automatic fail.
3. **Family coherence** — the 5 marks of a single variant row, placed side-by-side, look like a SET. No single mark visually dominates or fades.
4. **Ink economy** — Wood and Water (highest stroke counts) feel visually quieter than their counts suggest. If Wood looks like a thicket, simplify.
5. **Brush memory** — the mark feels drawn, not geometric. Asymmetry is present somewhere (an off-center leaf, a leaning flame, a broken enso).
6. **`currentColor` only** — no hardcoded fills or strokes. The HTML showcase tints via CSS, not via the SVG itself.
7. **Centered with margin** — ≥2px optical breathing room from every viewBox edge.

---

## §7 — Process suggestion

1. **Sketch the line variant of all 5 marks first**, side by side, on the same imaginary 24px grid. Pin them together visually before refining any one. (Family coherence is easier to design than to refactor.)
2. **Render at 16px** as soon as the line variants are drafted. Anything that fails at 16px gets resketched before moving to accent and fill variants.
3. **Build variant B by adding to A**, not by re-drawing. The accent is a *gesture on top of* the line, not a new mark.
4. **Build variant C by tracing the silhouette of B**, then deleting the strokes and converting the closed shape to a fill. This guarantees family resemblance across variants.
5. **Tab-bar sim is the final test** — if a variant looks great in the grid but bad on the simulated tab bar, the tab bar wins (that's the actual use case).

---

## §8 — Drift log

Reserve a `<section id="drift">` at the bottom of the deliverable. Use it to log any of:
- A motif that resisted reduction to the 1.7-stroke grid and what compromise you made
- A rule from §3 you bent and why (e.g. "Earth-fill variant uses even-odd fill rule for the sun-disc cutout — flagging because the spec implied a single filled path")
- An ID you wanted to add beyond the 15-mark deliverable (e.g. `el-metal-script` — a calligraphic 金 hanzi mark) — propose, don't ship
- Open questions for the design lead

Format: bullet list, each item ≤2 sentences. No markup, just plain text.

---

## §9 — What we will do with the output

We will visually compare the 15 candidates against the current 5 in `primitives-library.html §3A`, pick the strongest of each element (likely one variant per element, possibly mixing line and accent depending on context), and merge those 5 into the canonical `Design/Legends/icons.svg` and the inline sprite in both library files. The 2 unpicked variants per element ship into the icon library as siblings (e.g. `#el-metal` becomes the new line mark; `#el-metal-fill` ships for badge use).

The painterly-rendered atmospheric versions (for chart hero scenes, backgrounds, splash) are a separate DALL-E task — out of scope here.

End of brief.
