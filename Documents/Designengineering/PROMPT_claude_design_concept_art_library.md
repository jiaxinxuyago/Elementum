# Claude Design Brief — Concept Art Library Showcase

**Audience:** Claude design canvas (claude.ai/design). Sandboxed: no web fetch, no filesystem, no raster generation. HTML/CSS/SVG output only. Image references work only against images **you upload to the chat** alongside this brief.

**Single deliverable:** ONE self-contained HTML file — `concept-art-library.html` — that catalogues curated concept-art PNGs in their intended UI contexts. Same visual-showcase model as `component-library.html` (Tier 2): pure preview, NO `<pre><code>` annotations, NO base64 inlines.

**Quota note:** We are at low canvas budget after v7. Brief is intentionally narrow. ONE file, ~25–30 image references, 6 sections. Do not expand scope.

---

## §0 — What you have to work with

You will receive (uploaded to this chat):

1. **`tokens.css`** — canonical CSS variables (paste contents into the file's `:root` block, same way `component-library.html` did)
2. **`component-library.html`** — Tier 2 reference. Copy its doc-header pattern, TOC pattern, section-head pattern, surface taxonomy, italic-v2 rule. **This is your visual benchmark.**
3. **`mood-foundation.html`** — Tier 1 reference for atmospheric depth + brush vocabulary
4. **DOC5 §AMENDMENT block** (in `DOC5_App_Design.md`) — the locked rules
5. **~25–30 curated concept-art PNGs**, organized into folders:
   - `backgrounds/` — 5 element-themed scene paintings (one per Five Elements: Wood, Fire, Earth, Metal, Water)
   - `stems/` — up to 10 stem-archetype thumbnails (one per heavenly stem; some may be missing — render placeholders for those)
   - `mountains/` — 3 mountain scene variants (foreground, midground, vertical)
   - `landscapes/` — 3 panoramic landscapes
   - `plants/` — 4 plant motifs (pine, bamboo, plum, lotus typical)
   - `patterns/` — 3 ink-wash texture overlays
   - `icons/` — 5 element icon glyphs (one per Five Elements, painterly cutout)

Each PNG arrives with a filename like `bg-wood-pine-canopy.png` or `stem-geng-blade.png`. Use those names verbatim as captions; the user has pre-curated.

---

## §1 — Hard rules (carry from DOC5 §AMENDMENT — non-negotiable)

1. **Italic v2 (§AM.10):** ONLY sub-headline (Cormorant 19/500/inkSoft) + microcopy chip (≤11.5 italic). Forbidden everywhere else.
2. **Pigment alpha ladder (§3.5.A):** ONLY `10 / 1A / 40 / CC / 100`.
3. **Border-radius scale (§3.5.B):** ONLY `1, 10, 12, 16, 22, 999`.
4. **Spacing scale (§3.5.C):** ONLY `1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56`.
5. **5 surfaces only:** cream-cardstock · tinted · quiet · elevated · cardstock-active.
6. **4 fonts only:** Cormorant Garamond · EB Garamond · Cinzel · Noto Serif SC.
7. **Tab nav is icons-only** — no text labels under nav icons.
8. **All structural icons via `<svg><use href="#id"/></svg>`** referencing the `<symbol>` defs you inline at the top of the file (copy from `component-library.html`).

### NEW for this brief (lessons from Tier 2 cleanup)

9. **Pure visual showcase.** No `<pre><code>` HTML/CSS annotations. The downstream code agent reads source HTML/CSS directly from the file.
10. **No base64 data URIs.** Every `<img src>` references the uploaded image by its filename. Assume the canvas mounts uploads at the document root, so `<img src="bg-wood-pine-canopy.png">` resolves correctly. The user post-processes references to relative paths after export.
11. **No DALL-E or external image generation.** You're a curator + composer here, not a generator. Only the uploaded PNGs are allowed; if a slot has no upload, render a placeholder (`.placeholder` class with kicker label).

---

## §2 — Required sections

The file mirrors `component-library.html`'s structure: doc-header, TOC, then numbered sections.

### §A1 — Five-element backgrounds gallery
A grid of 5 cells, one per element. Each cell:
- Component-kicker: element name + Chinese hanzi (e.g. `WOOD · 木`)
- Background hero panel rendered at 358×340 (the section-hero archetype size from Tier 2)
- Element-pigment-tinted overlay band at the bottom (50% opacity gradient using the element pigment at `40` alpha)
- Day-stamp eyebrow with placeholder stem (e.g. `甲 · JIA · YANG WOOD` for Wood)
- Sub-headline placeholder (italic Cormorant 19/500): "Where vine meets sky" / "The candle holds steady" / etc.

### §A2 — Stem painted thumbnails gallery
A grid showing all 10 heavenly stems as 200×200 painted thumbnails (mirrors §C4 of `component-library.html`). For uploaded stems, use the painted PNG; for missing stems, render a placeholder cell with the stem hanzi in cream cardstock + microcopy `(awaiting illustration)` italic 11.5.

The 10 stems and their painter-map style anchors (per master doc §2.5) — render the stem name + style hint as kicker:
| # | Stem | Anchor |
|---|---|---|
| 1 | 甲 jiǎ — Yang Wood | pine + bamboo (Wen Tong / Wu Zhen) |
| 2 | 乙 yǐ — Yin Wood | plum / lotus (Bada Shanren) |
| 3 | 丙 bǐng — Yang Fire | sun / blaze (Liang Kai) |
| 4 | 丁 dīng — Yin Fire | candle (Wu Daozi) |
| 5 | 戊 wù — Yang Earth | mountain (Fan Kuan) |
| 6 | 己 jǐ — Yin Earth | tilled field (Ni Zan) |
| 7 | 庚 gēng — Yang Metal | blade ✓ (uploaded) |
| 8 | 辛 xīn — Yin Metal | jewel (Qiu Ying) |
| 9 | 壬 rén — Yang Water | river (Ma Yuan) |
| 10 | 癸 guǐ — Yin Water | mist / dew (Mi Fu / Shi Tao) |

### §A3 — Mountain scenes in 3 UI contexts
Reuse the 3 uploaded mountain PNGs across these UI applications:
1. **Compact strip** (358×96 wide-thin) — mountain scene as ambient background, kicker "Weekly ridge", sub-headline italic
2. **Modal hero band** (358×260) — mountain as full-width painterly band atop a modal sheet, with day-stamp + sub-headline below
3. **Vertical-frame painting** (200×320) — mountain as portrait card art with brush-rule above and below

### §A4 — Landscape panoramas as full-bleed phone backgrounds
A row of 3 phone-frame mocks (390×844 each). Each phone has the landscape as a `position: absolute; inset: 0; opacity: 0.18; filter: blur(0.5px)` underlay, with mock UI chrome on top (status bar + tab bar + a centered card) demonstrating how the landscape sits behind real content.

### §A5 — Plant motif cards
4 cards (each ~280×200 cardstock-active surface). Card content:
- Plant PNG cropped to 88×140 portrait, sitting flush left
- Right side: eyebrow chip with the plant name (e.g. `PINE · 松`), Cormorant 24/600 stem name, EB Garamond 14 body line of poetic interpretation

### §A6 — Pattern wash overlays
3 demonstrations of how pattern PNGs work as low-opacity textures:
1. Pattern at 12% opacity over a cream-cardstock surface (subtle paper grain)
2. Pattern at 25% opacity blended with element pigment 40% (atmospheric tint)
3. Pattern at 8% opacity tiled across a wide hero strip (340×140) under a centered headline

### §A7 — Element icon glyphs in element tiles
A row of 5 element tiles (144×144, mirrors `component-library.html` §C3 element tile archetype). Each tile has:
- Element-pigment tinted background (linear-gradient(135deg, `${pigment}10`, `${pigment}40`))
- The painterly element-icon PNG cropped to 88×88, centered
- Polarity chip in top-right (`Yang` for Wood/Fire/Earth/Metal/Water demo)
- Stem-label below the icon

### §A8 — Drift log
Final section listing:
- Which uploads you actually used (filename list)
- Any uploads you couldn't place (filename list with reason)
- Any new primitives you wished for but didn't invent (potential Tier 5 / Tier 6 input)
- Confirmation that none of §1's hard rules were broken

---

## §3 — Acceptance criteria

The brief is done when:

1. Single self-contained HTML; opens in any browser; fonts via Google Fonts CDN; no build step
2. Doc-header + TOC + 8 sections (§A1–§A8) all render
3. Every uploaded PNG appears in the file at least once; every reference uses the upload's exact filename via `<img src="filename.png">`
4. **Sniff test 1:** `grep -c '<pre><code'` against the saved file → must be 0
5. **Sniff test 2:** `grep -c 'data:image'` against the saved file → must be 0
6. **Sniff test 3:** every `font-style: italic` either applies to `Cormorant Garamond` 19/500 (sub-headline) or `EB Garamond` ≤11.5 (microcopy chip) — anything else is a §AM.10 violation
7. **Sniff test 4:** every `border-radius` value is from `{1, 10, 12, 16, 22, 999}` — no `4`, `6`, `8`, `14`, `18`, `20`
8. Header comment block at top: tier · purpose · composes-from sources
9. §A8 drift log present and honest

---

## §4 — Reference anchors

Read these uploaded files first — they set the visual law:
- `tokens.css` — paste into `<style>` `:root`
- `component-library.html` — copy doc-header, TOC, section-head, surface CSS, button CSS, card CSS, thumb CSS verbatim. Do not re-design these. Compose ON TOP of them.
- `mood-foundation.html` — atmospheric-depth + brush-sample vocabulary
- DOC5 §AMENDMENT — the locked-rules excerpt

---

## §5 — Out of scope

Do NOT do in this file:
- Generate new images (you can't anyway — sandboxed)
- Alter `component-library.html`'s component recipes (those are locked — you compose with them, you don't redesign them)
- Add new buttons, form controls, or chrome elements (Tier 2 owns those)
- Author new typography recipes (the 4-font, italic-v2 rules hold)
- Build phone-frame templates with full screens (that's Tier 3, separate brief)

---

## §6 — Confirm before building

Before producing the file, confirm:
1. You received `tokens.css`, `component-library.html`, `mood-foundation.html`, the DOC5 amendment excerpt, and the curated PNG batch
2. You will reference uploaded images by exact filename (no base64, no rewriting paths)
3. You will run all 4 sniff tests against your output before claiming completion
4. You will list missing uploads in §A8 drift log rather than fabricate placeholder PNGs

After confirmation, ship the single HTML file in one shot. If it must split across messages, split at section boundaries (`</section>` of §A3, `</section>` of §A6) so the pieces stitch cleanly when concatenated.

---

## §7 — Post-export housekeeping (NOT your concern, FYI only)

After you ship: the user runs Claude Code to (a) replace canvas upload URLs with relative paths to `Design/Library/art/`, (b) mirror to `Elementum_App/public/`, (c) run the 4 sniff tests, (d) wire the curated assets into Tier 2 + Tier 3 files. None of that is in your scope — just deliver the showcase.
