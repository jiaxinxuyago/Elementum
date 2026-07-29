# Background opacity ladder — by page type

The opacity each background is composited at depends on how much **negative space** the page leaves and how **picture-rich** the page should feel. More negative space → bg fills more visual weight → higher opacity.

## Current ladder (v2.2 — 2026-05-07)

| Page type | Opacity (source) | Effective | Rationale | Files |
|---|---|---|---|---|
| **Welcome** | **0.40** | 0.40 | First impression; upper-portion-filled mountain peak fills negative space above the ELEMENTUM headline | `bg-reveal-04-mist-veil` |
| **Loading** | **0.40** | 0.40 | Top peaks + bottom water frame the "Your Archetype" title in calmer middle band | `bg-reveal-03-stacked-horizons` |
| **Reveal screen** | **0.50 / 0.65** | 0.50 / 0.39 | Two anchored panels (top peaks band + bottom islands band); reveal-02 has CSS opacity 0.6 + multiply blend, source bumped to compensate | `bg-reveal-01-distant-peaks`, `bg-reveal-02-floating-island` |
| **Onboarding (all 7 steps)** | **0.28** | 0.28 | Sequence reads as one coherent ceremony; visible mist mountains organically fill negative space behind forms | `bg-onboarding-04-quiet-paper` (used for all steps) |
| **Reading detail** (future, not yet generated) | **0.30–0.40** | TBD | Long-form text + breath space; needs visible composition without competing | TBD |
| **Reading catalogue** | **0.10–0.14** | 0.10–0.14 | Cards fill most of page; bg recedes hard | `bg-reading-01..04` |
| **Energy Map** | **0.13–0.15** | 0.13–0.15 | Diagram overlay must dominate; bg supports without competing | `bg-energymap-01..04` |

## Per-file actual opacity (v2.2)

```
# Welcome / Loading / Reveal — picture-rich, page-purpose-aligned
bg-reveal-04-mist-veil.png          0.40  (Welcome, upper-fill, c01 vertical peak top crop)
bg-reveal-03-stacked-horizons.png   0.40  (Loading, top+bottom-fill, c04 boat with peaks)
bg-reveal-01-distant-peaks.png      0.50  (Reveal top band, c20 mountain w/ light)
bg-reveal-02-floating-island.png    0.65  (Reveal bottom band, c02 foggy village; CSS×0.6 = 0.39 effective)

# Onboarding — all 7 steps share one bg for ceremonial coherence
bg-onboarding-04-quiet-paper.png    0.28  (c30 atmospheric mist with distant peaks)

# Onboarding alternate slots (currently unused by code, kept as future-proofing)
bg-onboarding-01-corner-stamp.png   0.32  (c20 mountain w/ light, right-corner subject)
bg-onboarding-02-edge-band.png      0.30  (c08 pine bough horizontal top-edge band)
bg-onboarding-03-bottom-anchor.png  0.30  (c19 solitary boat on water, bottom anchor)

# Reading catalogue — quietest, cards fill most of page
bg-reading-01-side-margins.png      0.12
bg-reading-02-chapter-mark.png      0.12
bg-reading-03-watermark-low.png     0.10
bg-reading-04-rice-paper.png        0.10

# Energy Map — abstract atmospheric for diagram overlay
bg-energymap-01-top-band.png        0.15
bg-energymap-02-corner-quartet.png  0.13
bg-energymap-03-center-glow.png     0.13
bg-energymap-04-split-horizon.png   0.14
```

## Source mapping (v2.2)

| Slot | Source concept | Composition use |
|---|---|---|
| `bg-reveal-04-mist-veil` (Welcome) | c01 vertical peak | Top-crop; mountain dominates upper third → fills negative space above ELEMENTUM |
| `bg-reveal-03-stacked-horizons` (Loading) | c04 boat with peaks | Center-crop; peaks visible top, boat visible bottom, mist middle → frames Your Archetype title |
| `bg-reveal-01-distant-peaks` (Reveal top) | c20 mountain w/ light | Picture-rich asymmetric mountain |
| `bg-reveal-02-floating-island` (Reveal bottom) | c02 foggy village | Matches "floating island" semantic |
| `bg-onboarding-04-quiet-paper` (all onboarding) | c30 atmospheric mist | Calm misty mountains, never competes with form |
| `bg-onboarding-01-corner-stamp` (unused) | c20 mountain w/ light | Right-corner subject |
| `bg-onboarding-02-edge-band` (unused) | c08 pine bough horizontal | Top-edge band |
| `bg-onboarding-03-bottom-anchor` (unused) | c19 boat | Bottom anchor |

## Code routing (v2.2)

| Component | File reference(s) |
|---|---|
| `WelcomeScreen.jsx` | `bg-reveal-04-mist-veil.png` |
| `LoadingScreen.jsx` | `bg-reveal-03-stacked-horizons.png` (was `bg-reveal-04` in v2.1) |
| `RevealScreen.jsx` | `bg-reveal-01-distant-peaks.png` + `bg-reveal-02-floating-island.png` (with CSS opacity 0.6 + multiply blend on -02) |
| `OnboardingShell.jsx` | `bg-onboarding-04-quiet-paper.png` (single bg for all steps; was conditional in v2.1) |
| `EnergyMapMockup.jsx` | `bg-energymap-01-top-band.png` |

## Rules of thumb when generating future variants

1. **Pick source composition that matches the slot semantic.** `corner-stamp` wants a corner-weighted painting, `edge-band` a horizontal band, `bottom-anchor` weight at bottom, etc. Crop mode aligns: `right`/`top`/`bottom`/`center`.
2. **Set opacity by page negative-space ratio.**
   - < 30% NS (reading catalogue): 0.10–0.14
   - 30–50% NS (energymap, onboarding): 0.13–0.30
   - 50%+ NS (welcome, loading, reveal, future reading detail): 0.30–0.50+
3. **If component applies CSS opacity / mixBlendMode, compensate at source.** E.g. RevealScreen's `bg-reveal-02` has CSS `opacity: 0.6 + mixBlendMode: multiply`, so source needs ~1.7× the desired effective opacity (0.65 source → 0.39 effective).
4. **Keep cream-silk gradient base constant.** Top `#F2E8CF` → bottom `#E2D8B9`. This anchors all bgs to the same paper warmth so they read as a coherent system across pages.
5. **Always 32bpp ARGB PNG at 390×844.** Format must match for production.

## Future work flagged

- **Reading detail page** (when implemented): use opacity 0.30–0.40 since the page has the most negative space (long-form text + breath rhythm + sub-headlines). Source pick: probably c17 (layered mountains central) or c30 (atmospheric mist) for non-competing composition.
- **Onboarding alternate slots** (`bg-onboarding-01/02/03`): currently unused by code. Kept in `Design/assets/backgrounds/` for future per-step variation if desired.
