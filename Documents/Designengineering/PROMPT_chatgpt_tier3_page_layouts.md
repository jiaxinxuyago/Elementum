# Tier 3 — Page Layout Templates

**Prerequisite:** Tier 2 (`component-library.html`) is shipped, cleaned, and approved. The lego-block vocabulary is set. Tier 3 stops cataloguing and starts **composing** — every template is a phone-frame screen built from Tier 2 blocks plus Tier 1 painterly assets, with no new primitives.

**Audience:** ChatGPT, continuing in the same project. Project knowledge already loaded: `DOC_HANDOFF_CONTEXT_TRANSFER.md`, DOC5 §AMENDMENT, `tokens.css`, `manifest.md`, all `Design/Legends/*.html`, master plan `PROMPT_chatgpt_design_resource_pool.md`, and the cleaned Tier 1+2 outputs (`mood-foundation.html`, `component-library.html`).

**Recommendation:** open this in a NEW conversation in the SAME ChatGPT project. Lean thread, fresh attention to the composition task.

---

## §0 — What Tier 3 is

Seven self-contained HTML files. Each renders **one full app screen** inside a 390×844 phone frame, composed exclusively from blocks already in Tier 2's library + painterly assets already on disk from Tier 1.

This tier proves the lego library is sufficient. If a template needs something Tier 2 doesn't provide, that's a Tier 2 gap → log it in §T8 drift, don't invent on the fly.

**Deliverables:** 7 HTML files saved to `Design/assets/Templates/`:

| # | File | Purpose | Composes from |
|---|---|---|---|
| 1 | `template-reading-catalogue-mosaic.html` | Reading catalogue · 2-col mosaic · hero + grid | section hero · element tile · compact strip · locked card |
| 2 | `template-reading-catalogue-vertical-stack.html` | Reading catalogue · single-column vertical rhythm | section hero · daily snippet · compact strip · featured card |
| 3 | `template-today-daily.html` | Today screen · decade pillar + daily snippet + do/avoid lanes | daily snippet · stem painted thumbnail · two-line manifesto · status row · segmented control |
| 4 | `template-detail-page-long-form.html` | Long reading detail · sub-headlines + quote blocks + brush rules | hero pair · section header · card content stack · quote block · two-line manifesto |
| 5 | `template-modal-hero.html` | Full-bleed modal · painterly hero + scrollable body | modal hero card · day-stamp eyebrow · sub-headline · tier badge · primary button |
| 6 | `template-compatibility-pair.html` | Friends V2 dual-stem layout | element tile (×2 mirrored) · section header · data callout · microcopy chips · brush rule |
| 7 | `template-onboarding-step.html` | Single onboarding step · input + helper text + advance CTA | hero pair · text input (focus state) · microcopy chip · primary button · status row |

Total: ~400–800 lines per file (smaller than Tier 2; templates are compositions, not catalogues).

---

## §1 — Hard rules (binding — same as Tier 2 with two new clauses)

### Carried forward from Tier 2

1. **Italic v2 (DOC5 §AM.10):** ONLY sub-headline (Cormorant 19/500/inkSoft) + microcopy chip (≤11.5 italic). Forbidden everywhere else.
2. **Pigment alpha ladder (§3.5.A):** ONLY `10 / 1A / 40 / CC / 100`.
3. **Border-radius scale (§3.5.B):** ONLY `1, 10, 12, 16, 22, 999`.
4. **Spacing scale (§3.5.C):** ONLY `1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56`.
5. **5 surfaces only:** cream-cardstock · tinted · quiet · elevated · cardstock-active.
6. **4 fonts only:** Cormorant Garamond · EB Garamond · Cinzel · Noto Serif SC.
7. **Tab nav is icons-only (§AM.2)** — no text labels under nav icons.
8. **IA (§AM.1):** Reveal → Reading-catalogue → Energy Map. Templates 1, 2, 3, 4 sit inside the Reading-catalogue branch.
9. **All icons via `<svg><use href="../../icons.svg#id"/></svg>`** — never inline new icon paths.

### NEW for Tier 3 (lessons from Tier 2 cleanup)

10. **No `<pre><code>` blocks. No code annotations. No HTML/CSS shown alongside the live preview.** This is a pure visual showcase. The downstream code agent reads source HTML/CSS directly from the file.
11. **No base64 data URIs anywhere.** All images use relative paths. Painted backgrounds, stem thumbnails, brush samples, atmospheric depth — every `<img src>` is a relative path to a sibling/ancestor folder. If you generate new PNGs in this turn, save them to a folder and reference by path; do NOT inline them.

---

## §2 — Phone frame mechanics

Every template renders inside a phone frame to demonstrate scale and chrome.

```
Outer page background: paper-radial-gradient (same as Tier 1/2 body)
Phone frame:
  width: 390px
  height: 844px
  border-radius: 47px (reserved phone-frame value, not in standard scale)
  box-shadow: var(--shadow-phone)
  position: centered horizontally, top: 56px
Status bar (top 44px): time · battery · wifi (use ico-* glyphs from icons.svg if present, else hairline placeholders)
Tab bar (bottom 56px): icons-only — Reveal · Reading · Energy · Friends · Profile (use tab-* glyphs from icons.svg)
Content viewport: 390×744 between status bar and tab bar
```

The phone frame chrome is the **same on every template** — copy-paste the frame markup. Templates differ only in content viewport.

The `.shadow-phone` shadow recipe is in `tokens.css` already (DOC5 §3.5.E inset rim + outer drop). Use it.

---

## §3 — Per-template specs

### Template 1 — `template-reading-catalogue-mosaic.html`

**Purpose:** Show the Reading catalogue in 2-column mosaic mode (the v6 archetype's primary form).

**Viewport composition (top → bottom):**
- Eyebrow chip at top: `READING CATALOGUE` in EB Garamond 10 caps tracked
- Section hero card · 358×340 with painted background (use `atmospheric-depth/atmospheric-5-layer.png`) · Day-stamp eyebrow `庚 · GENG · 2026.05.06` · sub-headline `Precision before intention` · primary button `Begin reading`
- 2-column mosaic grid (gap 16px):
  - Row 1: Element tile (Metal · 庚) · Element tile (Earth · 戊)
  - Row 2: Compact strip (`Weekly ridge`) spanning both cols
  - Row 3: Locked card (`Advisor pattern`) · Element tile (Wood · 甲)
  - Row 4: Featured card (`The inheritance of structure`) spanning both cols
- Bottom margin sp-44 above tab bar

**Variants to show side-by-side:** none — single composition is enough.

**Header comment block (mandatory):**
```html
<!--
  Tier 3 · Reading catalogue · 2-column mosaic
  Composes from: section hero · element tile · compact strip · locked card · featured card · eyebrow chip
  Descends from: legend-v6-card-archetypes.html mosaic pattern · DOC5 §AM.1 IA
  Expects data: { dayMaster, elements[], featuredArchetypes[], lockedArchetypes[] }
  Variants: this template is the "default density" view; vertical-stack is the alternative
-->
```

### Template 2 — `template-reading-catalogue-vertical-stack.html`

**Purpose:** Reading catalogue in vertical-stack mode — slower rhythm, single column, longer reading time.

**Viewport composition:**
- Eyebrow chip: `READING CATALOGUE`
- Section header text-block (`THE CURRENT READING` eyebrow + `The Metal reading` Cormorant 24/600)
- Daily snippet card (358×96, `brush-samples/05-mist-band.png` background) · `A clarifying day` · `There is less to resolve than you think.`
- Compact strip · `Weekly ridge` · uses `brush-samples/06-layered-ridges.png`
- Compact strip · `Stem study — Geng` · uses **`Stem Thumbnail/Geng_TheBlade.png`** as the thumbnail (this is the painted stem thumbnail prototype — featured here to prove the pattern)
- Featured card · `The inheritance of structure` · cardstock-active surface
- Brush-rule divider (1px gradient hairline)
- Reading-row card list: 3 row entries (`Order asks for an edge` · `The edge before the verdict` · `Daily inheritance`) each with chev-r affordance

### Template 3 — `template-today-daily.html`

**Purpose:** The Today screen — focal daily reading + decade-pillar context + do/avoid lanes.

**Viewport composition:**
- Top: Day-stamp eyebrow large (`庚 · GENG · 2026.05.06`)
- Decade pillar card (cardstock-active surface, gold rim, no shadow) · shows current decade with `Cinzel 36` number · sub-headline `The decade of refinement`
- Painted stem block 200×200: use `Stem Thumbnail/Geng_TheBlade.png` centered, with eyebrow chip `TODAY'S STEM` above and sub-headline below `The Blade returns`
- Two-line manifesto block (italic Cormorant 17, centered) · `Where pressure gathers, form appears.\nWhere form appears, choice sharpens.`
- Segmented control (`Today` active · `Tomorrow` · `Weekly`)
- Do/avoid lanes — two-column grid, 16px gap:
  - Left lane: eyebrow `DO` (metal pigment color) + 3 microcopy chips italic (`forge` · `inheritance` · `edge`)
  - Right lane: eyebrow `AVOID` (seal pigment color, used max once per screen — this is the one place) + 3 microcopy chips italic (`override` · `noise` · `haste`)
- Status row at bottom: `Last reading · 2 days ago`

### Template 4 — `template-detail-page-long-form.html`

**Purpose:** A long-form reading detail — what you see when you open one archetype.

**Viewport composition:**
- Top chrome: back chev-l + title `The Blade · Geng` Cinzel 12 caps tracked
- Hero pair text block (`The Blade` Cormorant 38/400 + sub-headline `Precision before intention`)
- Painted stem image: `Stem Thumbnail/Geng_TheBlade.png` rendered at 358×358 (full-bleed within content)
- Section header text block · eyebrow `YOUR ELEMENTAL NATURE` (metal pigment) + `The Metal reading` Cormorant 24/600
- Card content stack · eyebrow `CURRENT FORCE` + headline + body paragraph
- Brush-rule divider
- Quote block · italic Cormorant 17 · `The edge was real before the hand learned its name.`
- Brush-rule divider
- Two more card content stacks for additional sections
- Bottom: tertiary inline link `Continue reading →` (this is the only legal italic-button place — sub-headline italic, dashed underline)

### Template 5 — `template-modal-hero.html`

**Purpose:** A full-bleed modal — used for archetype reveals, premium upsell, deep ceremony moments.

**Viewport composition:**
- Background: dimmed (ink at 50% over the underlying screen)
- Modal sheet: 358×620, radius 22, elevated surface, `shadow-cta-alt`
- Modal close × in top-right (use `ico-dismiss` from icons.svg)
- Painterly hero band at top of modal (358×260, `atmospheric-depth/atmospheric-5-layer.png`)
- Day-stamp eyebrow (`庚 · GENG · DAILY MODAL`)
- Hero pair text block (`Clarify the edge` + sub-headline `A narrower path is not a smaller path.`)
- Body paragraph (EB Garamond 14 regular, 1.55 line-height) — 3–4 sentences
- Tier badge (gold rim · `◆ Seeker`)
- Primary CTA button (full-width 326px, ink pill)
- Tertiary inline-link below CTA · `Maybe later` (italic dashed)

### Template 6 — `template-compatibility-pair.html`

**Purpose:** Friends V2 — dual-stem comparison layout for relationship readings.

**Viewport composition:**
- Top eyebrow chip: `COMPATIBILITY READING`
- Two element tiles, mirrored horizontally with brush-rule between:
  - Left: tile for 庚 Geng (Metal, Yang) · use `Stem Thumbnail/Geng_TheBlade.png` if rendering as painted variant
  - Right: tile for 乙 Yi (Wood, Yin) · placeholder painterly thumbnail (label `Stem Thumbnail/Yi_TheVine.png` even if file doesn't yet exist — this is a Tier 4 future asset; use a styled SVG fallback as visual stand-in and log in §T8 drift)
- Section header · `THE INTERPLAY` eyebrow + `Metal cuts the vine` headline
- Data callout · `2 / 5` Cinzel 36 + label `BENEFICIAL ANGLES` + 1-sentence interpretation
- Microcopy chip group (italic): `tension` · `growth` · `responsibility`
- Brush-rule divider
- Reading-row card list of 3 short interpretive entries

### Template 7 — `template-onboarding-step.html`

**Purpose:** A single onboarding step — input collection within the slow ceremonial cadence.

**Viewport composition:**
- Top: progress dots (3 dots, middle active, hairline ring)
- Hero pair (`When were you born?` Cormorant 38/400 + sub-headline `The hour the world said your name.`)
- Atmospheric placeholder image: `atmospheric-depth/atmospheric-3-layer.png` rendered at 326×140 (sets ceremonial mood)
- Text input in focus state (gold rim · placeholder `Birth time`) — single field, no label noise
- Microcopy chip italic (single): `Approximate is fine — Window mode below`
- Segmented control (`Exact` · `Window` · `Unknown`)
- Status row: `Step 2 of 3`
- Primary button at bottom (`Continue`)

---

## §4 — Acceptance criteria

A template is approved when:

1. Self-contained HTML, opens in any browser, fonts via Google Fonts CDN, no build step
2. **No `<pre><code>` blocks anywhere.** Sniff-test by `grep -c "<pre><code"` — must be 0.
3. **No base64 data URIs anywhere.** Sniff-test by `grep -c "data:image"` — must be 0.
4. Phone-frame chrome (status bar + tab bar) renders identically across all 7 templates
5. Header comment block at top: tier · purpose · composes-from list · descends-from · expected data shape
6. Every italic on the page is sub-headline OR microcopy — sniff by visual scan
7. Every radius is from `{1, 10, 12, 16, 22, 999, 47}` (47 is phone-frame only) — no `8`, `14`, `20`
8. Every spacing value is from the legal scale
9. All icon usages reference `icons.svg` via `<use href>` (no inline paths)
10. All composition uses ONLY blocks present in Tier 2's `component-library.html` — flag any new primitive in §T8

When all 7 templates pass criteria 1–10, Tier 3 is approved and Tier 4 unlocks.

---

## §5 — Reference anchors

Read these before composing:
- `Design/assets/Moodboards/component-library.html` — Tier 2 lego library (THE source of every block)
- `Design/assets/Moodboards/mood-foundation.html` — Tier 1 mood / brush vocabulary
- `Design/assets/Moodboards/Stem Thumbnail/Geng_TheBlade.png` — the prototype stem thumbnail (featured in templates 2, 3, 4, 6)
- `Design/assets/Moodboards/atmospheric-depth/` — 3-layer + 5-layer painted backgrounds
- `Design/assets/Moodboards/brush-samples/` — 10 ink-wash brush PNGs
- `Design/Legends/legend-v6-card-archetypes.html` — mosaic pattern reference
- `Design/Legends/legend-v7-ink-wash.html` — most current visual-fidelity benchmark
- `Design/Legends/legend-screens.html` + `legend-screens-amendment.html` — IA + screen-level patterns
- `Documents/Designengineering/DOC5_App_Design.md` §AMENDMENT — locked rules

---

## §6 — File-relative path convention

Templates live at `Design/assets/Templates/template-*.html`. From there:
- Tier 1 brush samples: `../Moodboards/brush-samples/<file>.png`
- Tier 1 atmospheric depth: `../Moodboards/atmospheric-depth/<file>.png`
- Stem painted thumbnails: `../Moodboards/Stem Thumbnail/<file>.png` (URL-encode the space → `Stem%20Thumbnail`)
- Canonical icons: `../../icons.svg#id` (two levels up to `Design/`)
- Canonical tokens: inline a copy of `tokens.css` :root variables in each file's `<style>` (same pattern Tier 1 + Tier 2 used) — keeps each template self-contained

---

## §7 — Drift log (§T8) format

End each template with a small drift table:
```
<!--
  §T8 · Drift log
  Compositions used: [list block names from Tier 2]
  Tier 1 painterly assets referenced: [list paths]
  Future Tier 4 assets referenced (placeholder OK): [list expected paths]
  New primitives needed (should be empty): [if non-empty, propose Tier 5 or DOC5 patch]
-->
```

If §T8 is non-empty for a template, that template is partial — finish the resource pool before shipping the template, or send the gap back as a Tier 2/4/5 add-on request.

---

## §8 — Out of scope for Tier 3

Don't do in Tier 3:
- New iconography (Tier 5)
- New painted concept art (Tier 4 — but you may *reference* expected paths as placeholders, e.g. `Stem Thumbnail/Yi_TheVine.png` not yet generated)
- Modify Tier 2 components (if a block needs tweaking, log it in §T8 and we update Tier 2 separately)
- Generate new PNGs inside template HTML files (no inline base64)

---

## §9 — Confirm before building

Before generating the first template, confirm:
1. You have read `component-library.html` and can name the 9 cards / 5 buttons / 5 form controls / 6 chrome elements available
2. You will produce templates as **pure visual showcase** — no `<pre><code>` annotations, no base64 inlines
3. You will use the phone-frame chrome consistently across all 7 templates
4. You'll log any gap between what a template needs and what Tier 2 provides in §T8

After confirmation, ship Template 1 first. I'll review and either approve (then you build Templates 2–7 in batch) or send refinement notes.

---

## §10 — Suggested batching

If output budget is tight, ship in this order — each iteration is reviewable independently:

| Iteration | Templates | Why this order |
|---|---|---|
| 1 | T1 (mosaic) + T2 (vertical-stack) | Same content, different rhythm — proves both density modes |
| 2 | T3 (today) + T7 (onboarding) | Two single-purpose screens — proves single-focus composition |
| 3 | T4 (detail) + T5 (modal) | Long-form + ceremony — proves vertical scrolling + modal pattern |
| 4 | T6 (compatibility-pair) | Standalone — only template with horizontal mirroring |

If the entire batch is feasible in one go, ship all 7 at once and I'll review together.
