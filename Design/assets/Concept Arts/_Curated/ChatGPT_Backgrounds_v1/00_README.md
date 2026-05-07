# Elementum · Background Asset Generation Brief

**To:** ChatGPT (with DALL-E 3 / GPT image-gen capability)
**From:** Claude Code, on behalf of the Elementum design pipeline
**Date:** 2026-05-07
**Goal:** Batch-generate **19 screen backgrounds** for the Elementum app, using the curated reference set in `references/` as visual style anchors.

---

## What's in this package

```
ChatGPT_Backgrounds_v1/
├── 00_README.md             ← (this file) overview + DALL-E prompt template
├── 01_targets.md            ← the 19 specific backgrounds to generate
├── 02_style_anchors.md      ← visual law: palette · italic · composition · painter map
├── reference-board.html     ← preview the 20 references locally before uploading
└── references/              ← 20 curated JPG references (~180 KB avg, 3.6 MB total)
```

The references in `references/` are the **stylistic vocabulary** — Chinese ink-wash mountain landscapes, atmospheric mist, restrained palette. They are NOT the targets. Read `01_targets.md` for what to generate.

---

## How to use this package

1. Open `reference-board.html` in a browser to see all 20 references at a glance + the target list
2. Upload all 20 JPGs in `references/` to a new ChatGPT conversation (or pin them to project knowledge)
3. Paste the contents of `01_targets.md` and `02_style_anchors.md` into the conversation
4. Ask ChatGPT to generate each target background using DALL-E with the prompt template below
5. After each generation, save with the exact filename listed in `01_targets.md`
6. Drop the resulting PNGs into `D:\Elementum\Elementum_Project\Design\Library\art\backgrounds\`

**Suggested batch flow:** generate in groups of 4 (DALL-E 3's parallel limit), pause to evaluate, refine prompt if a batch drifts, continue.

---

## DALL-E 3 prompt template (use this style for every target)

> *"Single sumi-e ink-wash painting on aged silk paper. Subject: **[SUBJECT]**. Composition: **[COMPOSITION]**. Tone: **[TONE]**. Style: minimalist, monochrome black ink with soft grey washes, no color. Asymmetric, generous negative space. Atmospheric perspective with layered ridges fading to mist. Inspired by **[PAINTER ANCHOR]** tradition. Aspect ratio **[RATIO]**. High resolution. No text, no signature, no border, no human figures."*

Fill the four bracketed slots from `01_targets.md` for each target. Examples:

- `bg-reveal-mountain-mist.png` →
  - SUBJECT: a single vertical mountain rising from layered mist
  - COMPOSITION: subject offset 30% right, mist filling left two-thirds
  - TONE: cool grey, restrained, contemplative
  - PAINTER ANCHOR: Fan Kuan (*Travelers Among Mountains and Streams*)
  - RATIO: 9:16 portrait

- `bg-modal-mist-band.png` →
  - SUBJECT: horizontal band of layered mist with faint ridges in distance
  - COMPOSITION: low-contrast, three soft horizontal layers
  - TONE: pale wet ink, atmospheric
  - PAINTER ANCHOR: Mi Fu / Mi Youren mist-dot technique
  - RATIO: 4:3 landscape (tight)

---

## Constraints (must hold across every output)

- **No color.** Monochrome ink + grey washes only. The Elementum app applies element-pigment tints in CSS later; the source painting is neutral.
- **No human figures.** Even small figures change scale-reading. Mountains, water, mist, plants only.
- **No Western perspective.** Atmospheric perspective via opacity layers, not vanishing-point construction.
- **No text, signature, or border.** The Elementum design system handles all chrome.
- **Aspect ratio matches the target's listed ratio.** DALL-E 3 supports 1:1, 16:9, 9:16, 4:3, 3:4 — pick the closest legal ratio listed in `01_targets.md`.
- **High resolution.** Request the largest size DALL-E 3 supports (1792×1024 or 1024×1792). Downstream we resize for production.

---

## Output expectations

Every target produces:
- One PNG file at the listed dimensions/ratio
- High resolution (≥1024 px on the short edge)
- No alpha channel needed (composited over silk paper inside DALL-E output)
- Saved with the exact filename from `01_targets.md` — if a filename has `.png`, save as PNG; ChatGPT's output format may vary, convert if needed

After all 19 are generated, package as a flat folder of PNGs and we'll wire them into the app.
