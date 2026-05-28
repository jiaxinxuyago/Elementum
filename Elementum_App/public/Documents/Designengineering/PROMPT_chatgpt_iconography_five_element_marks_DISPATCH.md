# Brief — Refresh the five-element marks for Elementum's icon set

I need 15 SVG icons (5 elements × 3 stylistic variants each) that replace the current geometric stubs in our system. The current marks read as generic shapes ("smile" instead of metal, "triangle" instead of fire) and fail user-recognition at 16px. The replacements must carry our ink-wash brand voice into a clean 24px icon grid — without becoming raster art.

The attached image — a sumi-e composition showing enso · bamboo · river waves · flame tongue · mountain/gate — is the visual seed. Don't copy it literally. Extract the iconic essence of each motif and translate that to stroke-based SVG.

---

## 1 · Iconic essence per element (use this, not your own associations)

| Element | Motif | What to keep |
|---|---|---|
| Metal · 金 | Enso (zen ring) | A ring closed by a single gesture, with one small gesture-break |
| Wood · 木 | Bamboo culm | Vertical authority + node articulation + asymmetric branching (not a tree) |
| Fire · 火 | Rising flame tongue | Asymmetric teardrop, slight lean, optional inner tongue |
| Earth · 土 | Layered peaks + foundation gate | Three-peak silhouette OR stable rectangular framing — earth as *foundation* |
| Water · 水 | Flowing wave / droplet | Wave with one crest + trough, OR droplet + single ripple |

Forbidden: anvils for Metal, leafy trees for Wood, campfires for Fire, globes for Earth, faucets for Water, or any other Western/Material-design analogue. Also forbidden: birds, splatter, sun/moon discs (atmospheric assets, not mark vocabulary).

---

## 2 · Voice priorities (in order)

1. **16px recognition first.** If a non-Chinese-reading user can't identify the element at 16px in a tab bar, the mark fails. Mentally render every candidate at 16 / 18 / 24 / 28.
2. **Brush memory.** Round caps and joins. Slight asymmetry (off-center leaves, leaning flames, broken enso).
3. **Ink economy.** ≤4 strokes per mark when possible.
4. **Family coherence.** The 5 marks of any variant row must look like a SET when placed side-by-side. No single mark dominates by ink density.
5. **Cultural authenticity over geometric purity.** A bamboo culm with a node beats a perfect parallelogram. A flame with inner tongue beats a Platonic triangle.

---

## 3 · Hard constraints (binding)

1. `viewBox="0 0 24 24"` on every symbol
2. `stroke="currentColor"` — no hex, no `var()`. Tint flows from CSS on the host
3. `stroke-width="1.7"` dominant; `1.4` only for secondary inner-accent strokes (e.g. inner flame tongue)
4. `stroke-linecap="round"` and `stroke-linejoin="round"`
5. `fill="none"` by default; `fill="currentColor"` only on the `*-fill` variant
6. Pure SVG primitives only: `<path>`, `<line>`, `<circle>`, `<rect>`, `<polyline>`. No `<text>`, `<filter>`, `<pattern>`, `<mask>`, `<image>`, or `<style>` inside symbols
7. ≥2px optical margin from every viewBox edge
8. IDs follow `el-<element>-<variant>` pattern. Canonical default keeps the bare ID (`el-metal` = the line variant), with siblings `el-metal-accent` and `el-metal-fill`. Same for wood / fire / earth / water.

---

## 4 · Deliverables — 15 symbols

### Variant A · `-line` (canonical refresh — replaces current geometry)

- **Metal:** enso arc with a single ~30° gap at bottom-right
- **Wood:** vertical culm + one mid-height node tick + two asymmetric leaf strokes (one shorter, one curling)
- **Fire:** asymmetric teardrop flame outline, base wider than peak, slight lean
- **Earth:** three layered peaks (low-mid-low) above a horizon line
- **Water:** droplet + single ripple, OR two crested waves — pick whichever reads cleaner at 16px

### Variant B · `-accent` (signature — for tab-bar active state, hero placements)

Variant A plus one small accent that adds character without sacrificing legibility:

- **Metal:** centered dot inside the ring (seal-mark inside the enso)
- **Wood:** tiny circle at the node (a fruit, a bud)
- **Fire:** inner tongue — smaller flame curve inside, stroke 1.4
- **Earth:** small sun/moon disc behind the tallest peak, partially eclipsed by overlap
- **Water:** single droplet above the wave/ripple

### Variant C · `-fill` (silhouette — for badges, chips, ≤18px contexts)

`fill="currentColor"`, `stroke="none"`. Trace the silhouette of Variant B and convert to a solid shape:

- **Metal:** filled disc with a wedge cut out
- **Wood:** filled bamboo culm + filled leaves
- **Fire:** filled teardrop flame, optional cutout for inner tongue (even-odd fill rule)
- **Earth:** solid jagged peaks silhouette
- **Water:** filled droplet + small filled ripple as two paths

---

## 5 · Output format

Deliver a single self-contained HTML file: **`tier3-iconography-five-elements.html`**. Visual-showcase mode — render the SVGs live as `<svg><use href="#id"/></svg>` consumers. No `<pre><code>` dumps, no base64 inlines. I need to see the marks render at intended size.

Structure:

```
<!doctype html>
<head>
  Google Fonts link: EB Garamond + Cinzel + Noto Serif SC
  Inline <style> with these tokens:
    --ink:#2B2722; --paperHair:#CDBE9E; --cardstock-bg:rgba(248,241,225,0.92);
    --metal:#8ba3b8; --metalDeep:#6a849a;
    --wood:#7a9e6e;  --woodDeep:#587a4d;
    --fire:#c4745a;  --fireDeep:#9e5540;
    --earth:#b89a6a; --earthDeep:#927750;
    --water:#5a7fa8; --waterDeep:#3e5f85;
</head>
<body>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      [15 <symbol> defs, grouped by element with comment dividers]
    </defs>
  </svg>

  <main>
    <header>"Five Element Marks · v2 candidate set" + reference citation</header>

    <section class="mark-grid">
      Row 1 (Variant A · line):   Metal · Wood · Fire · Earth · Water
      Row 2 (Variant B · accent): Metal · Wood · Fire · Earth · Water
      Row 3 (Variant C · fill):   Metal · Wood · Fire · Earth · Water
      Each cell: cardstock surface, paperHair 1px border, 12px radius, 14px padding,
      centered <svg> at 28×28, name + variant label beneath.
      Cell color tinted to element's Deep pigment so marks render in element hue.
    </section>

    <section class="scale-test">
      Each of the 15 marks rendered at 16 / 18 / 24 / 28 / 36 px.
    </section>

    <section class="tabbar-sim">
      Faux bottom tab bar showing the 5 marks from Variant A AND Variant B side-by-side,
      so we can compare which reads better in actual nav context.
    </section>

    <section id="drift">
      [drift log — see §7]
    </section>
  </main>
</body>
```

---

## 6 · Acceptance criteria

A mark passes only if ALL are true:

- Recognizable at 16px without context
- Stroke 1.7 dominant + optional 1.4 accent (any `stroke-width="2"` is an automatic fail)
- The 5 marks of any single variant row look like a SET — no dominators, no faders
- Wood and Water (highest stroke counts) feel quieter than their counts suggest
- Asymmetry is present somewhere — feels drawn, not geometric
- `currentColor` only inside SVG; pigment tinting happens in CSS on the host

---

## 7 · Drift log (required section at bottom of deliverable)

`<section id="drift">` with a plain-text bullet list of any of:
- A motif that resisted reduction to 1.7-stroke and the compromise made
- A rule from §3 you bent and why
- A bonus mark you wanted to add (propose; don't ship)
- Open questions

Each item ≤2 sentences. No markup, no decoration.

---

## 8 · Working order suggestion

1. Sketch all 5 line variants together first — pin family coherence before refining any one
2. Render at 16px as soon as line variants exist — re-sketch anything that fails
3. Build accent variants by adding to line, not redrawing
4. Build fill variants by tracing accent silhouettes, not redrawing
5. Final check is the tab-bar simulation — if a variant grids well but tab-bars badly, the tab bar wins

End of brief.
