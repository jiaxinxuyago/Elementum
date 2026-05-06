# Prompt — Elementum Design Legend v4.1 (Polish, focused)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v4-1-polish.html`
**Goal:** Replace the v4-polish file (which delivered no perceptible visual upgrade — see §0) with a focused, quantifiable polish pass that plays to the canvas's actual strengths.

**v4 was a regression-by-omission.** This v4.1 brief is tighter, more honest about what the canvas can and can't do, and supplies measurable acceptance criteria so the polish is *demonstrably* better — not just claimed-better.

---

## §0 — Why v4.1 exists (read first)

### What v4 actually delivered

I asked v4 for: (1) ink-wash brushwork on 10 day-master icons, (2) refined reading-section + state icons, (3) Reveal page vertical-rhythm polish, (4) γ inline-expansion motion plate, (5) tab-bar fade-in 3-state sequence.

v4 delivered:
- §V1 — "ink-wash" DM icons that are **layered parametric SVG strokes** (admitted in v4 §V7 / DV.1) — visually 5–10% chunkier than the v3-amendment placeholders
- §V2 — Reading-section icons that took the "track (b) refined geometric" off-ramp the brief offered — same line-mark vocabulary, different motifs
- §V3 — micro-rhythm tweaks (28/22/14 tier margins, 0.35 CTA shadow) that are invisible at thumbnail scale
- §V4 / §V5 — motion plates that are useful documentation but small visual delta

### Why nothing visible upgraded

**The canvas cannot paint.** Real ink-wash brushwork requires rasterized PNG/JPG assets (hand-drawn or AI-image-generated) traced into SVG. The canvas is an HTML/SVG tool — it can stack paths to fake depth, but it can't produce literal brush textures. Asking for "ink-wash" was asking the wrong tool.

**v4 was given an outdated DOC5.** Per v4 §V7 / DV.2, the agent's uploaded `DOC5_App_Design.md` lacked the §AMENDMENT block (which I appended on 2026-05-05). It worked without §AM.10 italic rule, §AM.6 elevated surface, §AM.7 cardstock-active variant — it was solving against a stale spec.

**The brief offered a hedge** ("(a) brushwork OR (b) refined illustration") that the agent took as a license to skip the hard part for §V2.

### What v4.1 corrects

- **No more "ink-wash" framing for the canvas's icons.** Canvas-side icons are "v1 vocabulary, evolved" — explicit about staying in line-mark vocabulary, with quantifiable upgrades to make the evolution real (path count, stroke variance, asymmetry, opacity gradients, optical mass).
- **Real ink-wash assets become a parallel commission track** — outside the canvas's scope. v4.1 includes a `/commission/` brief subsection for hand-drawn or AI-image work that gets traced separately.
- **DOC5 §AMENDMENT must be loaded.** Re-upload at the start of v4.1.
- **Acceptance criteria quantifiable.** Not "polished" — "≥4 paths per icon, asymmetric tangent variance, stroke 1.0–2.8 within a single mark, ≥2 icons use opacity gradients."
- **2-second sniff test.** If a casual observer can't tell v3-amendment apart from v4.1 at thumbnail scale, the polish failed. The agent designs FOR that comparison.

---

## §1 — Required inputs (verify before starting)

**Local files (upload — re-verify each):**

1. `D:\Elementum\Elementum_Project\Documents\Designengineering\DOC5_App_Design.md`
   → **Critical: confirm the §AMENDMENT block (§AM.1 through §AM.10) is in the uploaded version.** Check by grepping for "§AM.10" — if absent, the file is stale, ask the user to re-upload before proceeding.

2. `D:\Elementum\Elementum_Project\Design\northstar-anchor.html` — visual DNA
3. `D:\Elementum\Elementum_Project\Design\legend-primitives.html` — v1 (with new §8 italic-v2 rule)
4. `D:\Elementum\Elementum_Project\Design\legend-patterns.html` — v2
5. `D:\Elementum\Elementum_Project\Design\legend-screens.html` — v3 (icons-only tab bar)
6. `D:\Elementum\Elementum_Project\Design\legend-screens-amendment.html` — IA reframe
7. `D:\Elementum\Elementum_Project\Design\tokens.css` — canonical tokens
8. `D:\Elementum\Elementum_Project\Design\icons.svg` — canonical icon library
9. `D:\Elementum\Elementum_Project\Design\manifest.md`

**Local asset folders:**

10. `D:\Elementum\Elementum_Project\Design\assets\backgrounds\` — 16 painted PNGs
11. `D:\Elementum\Elementum_Project\Design\reference\AppPages\` — 10 The Pattern + Nebula screenshots (layout/IA only)

**v4 file (for delta reference):**

12. `D:\Elementum\Elementum_Project\Design\legend-v4-polish.html` — the regressed v4. **Read v4 §V7 drift log** (DV.1 admits parametric-stroke shortcut; DV.2 admits stale DOC5). Use as a "what NOT to do" reference.

---

## §2 — Hard constraints

### Canvas can't paint — accept this and don't fake it
- ❌ No "wet outer stroke + bone inner stroke + supporting marks" (DV.1's parametric trick) presented as ink-wash. v4 already shipped this; calling it "polish" is a regression.
- ❌ No claims of "brushwork" or "ink-wash" on canvas-produced SVGs. Canvas-icons are line-mark vocabulary.
- ✅ Real ink-wash icons are commissioned externally (see §6 below) and traced into SVG separately.

### Hard "no invention" still applies
- No new colors, fonts, radii, or spacing values. Compose from `tokens.css` + `icons.svg` only.
- New `<symbol>` ids that don't exist in `icons.svg` are commission proposals — don't put them in the canonical file. Stage them under `id="…-v41"` for review.

### v3-amendment is still canonical for IA
- Reveal → Reading-catalogue → Energy Map.
- Tab bar icons-only (DOC5 §AM.10 / DA.10).
- "Energy Map" eyebrow renames "Energy Blueprint" (§AM.1).
- Italic restricted to sub-headline + microcopy only (§AM.10).

---

## §3 — Polish items (quantifiable)

### Priority 1 — Day-master 10 icons · "v1 vocabulary, evolved"

Drop the "ink-wash" framing. These are **line-mark icons with measurable visual fidelity gains** vs the v3-amendment placeholders. v4.1 must hit ALL of these per icon:

| Criterion | v3-amendment | v4.1 minimum |
|---|---|---|
| Path elements | 1–5 (mostly 3) | **≥6** per icon |
| Bounding box use | ~50% of 24×24 | **65–82%** of 24×24 (more presence) |
| Stroke width range within single icon | flat 1.7 | **1.0 → 2.8** (taper / weight variance) |
| Asymmetric / organic curves | mostly symmetric geometry | **≥2 asymmetric tangents per curve-based icon** |
| Opacity / texture | flat | **≥4 of 10 icons use opacity gradient or stroke-opacity stops** for ink-bleed feel |
| Supporting marks (drips, sparkles, dew, snow) | none | **1–2 supporting marks per Yin stem** (8 icons total: 乙 vine drip, 丁 candle drip, 己 field furrow ends, 辛 jewel facet sparkle, 癸 mist scatter dots; Yang stems get cleaner mass) |

**Motif map locked** (do not re-litigate):

| Stem | pinyin | Element / polarity | Motif |
|---|---|---|---|
| 甲 | jiǎ | Yang Wood | Standing tree / pillar |
| 乙 | yǐ | Yin Wood | Vine / soft growth |
| 丙 | bǐng | Yang Fire | Sun / blazing flame |
| 丁 | dīng | Yin Fire | Candle / lantern |
| 戊 | wù | Yang Earth | Mountain / boulder |
| 己 | jǐ | Yin Earth | Tilled field / valley |
| 庚 | gēng | Yang Metal | Blade / axe |
| 辛 | xīn | Yin Metal | Jewel / refined metal |
| 壬 | rén | Yang Water | River / ocean |
| 癸 | guǐ | Yin Water | Mist / dew / rain |

**Output:** each icon as a `<symbol id="dm-{stem}-v41">` ready to drop into `Design/icons.svg`. Render the 5×2 grid at FOUR scales (24, 32, 48, 84) so legibility at every size is provable. Annotate each cell with: stem hanzi, pinyin, element/polarity, **path count**, and a **side-by-side miniature** of the v3-amendment version for direct comparison.

### Priority 1.5 — Reading-section icons · same fidelity ladder

Apply the SAME quantifiable criteria to the 5 reading-section icons + 2 utility (sunrise, empty). Don't re-debate motifs — keep what v4 §V2 chose (flower for elemental, tether for dominant, decade-ruler for chapters, vessel for empty). Just push them through the path-count / stroke-variance / opacity-gradient checklist.

### Priority 2 — Reveal page · stop calling rhythm "polish"

The amendment's Reveal mock is at the structural ceiling for canvas-produced layout. v4.1 should NOT re-render the entire Reveal page (no value-add). Instead:

- **One annotated callout** showing the rhythm tier system (28/22/14) as a measurement diagram only — like a typographer's leading specimen, not a phone-frame mock.
- **Side-by-side BEFORE / AFTER thumbnails** at 200px wide so the rhythm change is *visible* via thumbnail comparison. If reviewer can't see the difference at 200px, document this honestly in §V7 instead of pretending it's a fidelity gain.

### Priority 3 — γ inline-expansion · keep it, but add real animation

v4's motion plate is fine but static. v4.1 adds:
- **Live looping CSS animation** in the doc — `max-height` 90→340 over 220ms, looping every 4s with 1s settle-time at each end
- **Frame-by-frame screenshot strip** at 0% / 25% / 50% / 75% / 100% so the print-version reader sees the timeline
- **Companion chev-rotation** included in the loop

### Priority 3.5 — Tab-bar fade-in · keep v4's 3-state sequence

Already adequate in v4. Carry forward unchanged. Confirm icons-only (no labels).

### Priority 4 — Featured-card pigment data binding · text-only note

Keep v4's text note. No change.

---

## §4 — Sniff test (acceptance criteria)

v4.1 is **not done** until ALL of the following hold:

1. **Thumbnail comparison test:** Place the v3-amendment day-master grid (`Design/legend-screens-amendment.html` §A3) and v4.1's grid side-by-side at 600px wide. A reviewer who has never seen either should be able to tell them apart in **2 seconds or less** without zooming. If not, fail.
2. **Path count audit:** every `<symbol id="dm-*-v41">` body must have `≥6 path elements`. Count in v4.1's drift log.
3. **Stroke variance audit:** at least 7 of 10 icons must have stroke-width values spanning ≥1.5px range (e.g. 1.0 + 2.5 in same icon). List in drift log.
4. **Opacity-gradient audit:** at least 4 of 10 icons must use `<stop>` opacity stops or per-path `stroke-opacity` ≤0.6 for atmospheric depth. List in drift log.
5. **DOC5 §AMENDMENT confirmed:** the agent must grep DOC5 for `§AM.10` and confirm presence in §V0. If absent, halt and ask user.
6. **Italic compliance:** every italic in the file must trace to either sub-headline (Cormorant 19/500 italic) or microcopy chip (≤11.5 italic). Lint and report.
7. **Drift log v4.1 lists every quantifiable miss honestly** — no "resolved" badges on items that didn't hit the criteria.

---

## §5 — What v4.1 deliberately does NOT include

- **No Reveal page re-render.** Page-template fidelity is at the ceiling.
- **No catalogue page polish.** The amendment's §A2 is canonical.
- **No new motion specs** beyond the γ loop and tab fade.
- **No copywriting.**
- **No claims of brushwork on canvas-produced SVGs.** That's the §6 commission track.

---

## §6 — Commission track (parallel — outside the canvas)

The 10 day-master ink-wash icons need actual brush dynamics that the canvas can't produce. v4.1 documents the commission brief inline so a follow-up workflow can fulfill it:

**Production path:**
1. **AI-image generation** (Midjourney / DALL-E / similar) with a unified prompt: *"single sumi-e ink-wash glyph of a [motif], minimalist, on rice paper, single bold brush stroke + 1–2 supporting splashes, pure black ink no color, centered on cream background, --ar 1:1 --style raw"*
2. **Vector tracing** (Adobe Illustrator Image Trace / Vector Magic / SVG Storm) — preserve organic edges, don't smooth aggressively
3. **Normalisation** to 24×24 viewBox, `currentColor` strokes/fills, max 12 path elements per icon
4. **Drop-in:** replace each `<symbol id="dm-{stem}">` body in `Design/icons.svg`

v4.1 outputs: a one-page commission brief (motif × prompt × delivery format) and a placeholder grid showing where the assets will land (using v4.1's evolved line-marks until commissioned).

---

## §7 — Output

Single file: `elementum-design-legend-v4-1-polish.html`

Self-contained HTML. Fonts via Google Fonts CDN. Top-level TOC, each section in `<details>` open by default.

Sections:
- §V0 — Why v4.1 exists (recap of v4's regressions, with explicit "what we're NOT doing" list)
- §V1 — Day-master 10 icons · v1 vocabulary evolved (4-scale grid + path-count audit + side-by-side vs v3-amendment)
- §V2 — Reading-section + state icons · same fidelity ladder
- §V3 — Reveal rhythm tier · annotated diagram only (NO phone-frame re-render)
- §V4 — γ inline-expansion · live animation loop + 5-frame strip
- §V5 — Tab-bar fade-in · carried from v4
- §V6 — Final polish notes · engineering hints (carried from v4)
- §V7 — Drift log v4.1 · audit of all quantifiable acceptance criteria, plus any honest misses
- §V8 — **Commission brief** (new) · the parallel track for true ink-wash assets

---

## §8 — Sequencing after delivery

1. User + Claude Code run the sniff test (thumbnail comparison) — pass/fail
2. If pass: drop new `<symbol id="…-v41">` bodies into `Design/icons.svg` (strip the suffix on paste)
3. If fail: iterate the specific criteria that missed
4. Commission §V8's external work asynchronously when budget permits — the v4.1 line-marks ship in the meantime
