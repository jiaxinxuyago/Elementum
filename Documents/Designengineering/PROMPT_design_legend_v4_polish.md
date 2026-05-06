# Prompt — Elementum Design Legend v4 (Polish)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v4-polish.html`
**Goal:** Polish-only pass. v3 + the v3 amendment have already locked the IA, screen taxonomy, modal patterns, and asset library structure. v4 finalizes the visual fidelity items that v3 missed and the placeholders the amendment had to ship.

**Do NOT redo v3.** v3's strong sections (Today, Guidance, Friends, Profile, DetailShell, Calendar) carry over unchanged. v4 adds polish + replaces placeholders + finalizes the icon library — nothing more.

---

## §0 — Why this version exists (read first)

A code-side amendment (`Design/legend-screens-amendment.html`, authored 2026-05-05) had to be produced because v3 deviated from the brief. To prevent the same divergence in v4, here's the full chain:

### v3's deviations from its original brief

The v3 brief asked for **13 sections**, including:
1. Standalone Reveal page redesign
2. New Reading catalogue page
3. Energy Map as a destination from Reading
4. 10 day-master ink-wash icons (5×2 grid)
5. Reading container patterns α/β/γ (sheet / full-page / inline)
6. Continuous-scroll vs collapsible reading variants
7. Reading card catalogue patterns
8. "Enter Your Readings" CTA
9. Tab bar with `Reading` replacing `Map`

**v3 delivered ~6 of 13.** It collapsed Reveal into Energy Map, retired the catalogue pattern, and never produced the 10 day-master icons or the reading container patterns. The amendment restores the missing IA + content.

### What the amendment added (you must respect)

The amendment (`Design/legend-screens-amendment.html`) is now canonical for:
- **§A0** IA stance — Reveal → Reading-catalogue → reading detail (overrides v3 §0)
- **§A1** Reveal page redesigned (identity + full energy summary + CTA)
- **§A2** Reading catalogue (new screen, replaces "Map" tab)
- **§A3** 10 day-master line-mark placeholders (PLACEHOLDER — needs your brushwork)
- **§A4** Reading containers α/β/γ
- **§A5** Continuous-scroll vs collapsible variants
- **§A6** 5 reading card variants (standard / featured / daily / locked / empty)
- **§A7** Drift log (DA.1 – DA.10)
- **§A8** Fidelity ratings + polish list

**Authority order when inputs disagree:**
`anchor > v1 legend > v2 legend > v3 amendment > v3 legend > DOC5 > canvas refs`

### What's locked in DOC5

The user has appended `## §AMENDMENT — v3 IA Reframe + v3 Amendment Polish Patches` to DOC5 covering:
- §AM.1 IA reframe (catalogue restored)
- §AM.2 Tab nav icons-only
- §AM.3 Cormorant title weight at hero vs mini scale
- §AM.4 Card-expand motion primitive (`max-height` 90→340 / 220ms ease-out)
- §AM.5 Dashed-border rule extension (placeholders allowed)
- §AM.6 Elevated surface variant (sheet + blurred chrome)
- §AM.7 Cardstock-active surface variant (gold rim — Today decade card)
- §AM.8 Reading-section icon library (new asset family)
- §AM.9 Open commission queue (DM ink-wash + reading-section glyphs)

Read those before you start.

---

## §1 — Required inputs

**Local files (upload to the canvas):**

1. `D:\Elementum\Elementum_Project\Documents\Designengineering\DOC5_App_Design.md` — read the new §AMENDMENT section in full
2. `D:\Elementum\Elementum_Project\Design\northstar-anchor.html` — visual DNA
3. `D:\Elementum\Elementum_Project\Design\legend-primitives.html` — v1 (color, type, primitives)
4. `D:\Elementum\Elementum_Project\Design\legend-patterns.html` — v2 (welcome, onboarding, modals, forms)
5. `D:\Elementum\Elementum_Project\Design\legend-screens.html` — v3 (Today, Guidance, Friends, Profile, DetailShell, Calendar — DO NOT REDO)
6. `D:\Elementum\Elementum_Project\Design\legend-screens-amendment.html` — IA reframe + missing-piece coverage
7. `D:\Elementum\Elementum_Project\Design\tokens.css` — canonical CSS variables (mirror in `tokens.js`)
8. `D:\Elementum\Elementum_Project\Design\icons.svg` — canonical icon library (33 `<symbol>` defs); v4 OUTPUTS new versions of the placeholder symbols
9. `D:\Elementum\Elementum_Project\Design\manifest.md` — component → app-file bridge

**Local asset folders (also attach):**

10. `D:\Elementum\Elementum_Project\Design\assets\backgrounds\` — 16 painted PNGs
11. `D:\Elementum\Elementum_Project\Design\reference\AppPages\` — 10 The Pattern + Nebula screenshots (layout/IA inspiration only — never absorb their visual identity)

---

## §2 — Polish items v4 must address (priority-ordered)

### Priority 1 — Day-master 10 ink-wash icons (DA.2)

Replace the 10 placeholder line-marks in §A3 of the amendment with **hand-drawn or AI-image-generated ink-wash brush assets**, then SVG-traced. Use sumi-e influence — irregular brush dynamics, ink bleed, varying stroke weight. Stay monochrome (`currentColor`), 24×24 viewBox.

Motif map (locked — do not revise):

| Stem | Reading | Element / polarity | Motif |
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

Output format: each icon as a `<symbol id="dm-jia">` etc., ready to drop into `Design/icons.svg`. Render the 5×2 grid in v4 with stem hanzi + pinyin + element/polarity annotations beneath each (matching amendment §A3 layout).

### Priority 1.5 — Reading-section + tab + state icons (DA.9)

Refine the 8-icon set the amendment shipped:
- `read-elemental` (currently wu-xing pentagram)
- `read-dominant` (currently primary-filled + secondary-hollow)
- `read-forces` (currently ↑↓ arrow pair)
- `read-chapters` (currently stem + 3 branches)
- `read-pillars` (currently 4 vertical bars)
- `ico-sunrise` (Daily compact card — currently sun + horizon)
- `ico-empty` (placeholder vessel — currently circle + 3 dots)
- (`tab-reading` already token-locked from v3 §4 — DO NOT change)

Choose either:
(a) Brushwork treatment matching the day-master icons above (consistent ink-wash aesthetic across all reading content), OR
(b) Refined illustration in v1's geometric stroke vocabulary (1.7px stroke, currentColor, more visual character than the current shapes)

Render these in v4 alongside the day-master grid for direct comparison.

### Priority 2 — Reveal page vertical rhythm (amendment §A1 fidelity)

The amendment's Reveal page fits everything at 390×844 but reads tight. Pass on:
- Padding / breathing-room between sections (DM hero → ENERGY MAP eyebrow → identity ribbon → dominant cards → catalyst chips → CTA)
- Margin-collapse between adjacent eyebrows
- Scroll affordance — does the page need a subtle "scroll for more" cue at the fold?
- CTA "Enter Your Readings" pill shadow tuning over the painted `bg-reveal-04-mist-veil` background

Render the polished Reveal at full 390×844 with painted background visible.

### Priority 3 — γ inline-expansion motion plate

§A4γ shows static before/after. Provide either:
(a) An animated loop (looping CSS animation in the v4 HTML demonstrating the transition feel), OR
(b) A third intermediate-state phone frame between collapsed and expanded

Spec: `max-height: 90px → 340px / 220ms / cubic-bezier(0.22, 1, 0.36, 1)` (DOC5 §AM.4). Companion: chev-right rotates 0° → 135°.

### Priority 3.5 — Tab-bar fade-in moment

DOC5 §11 line 1105 says the tab bar fades in 400ms after dashboard content settles. v4 should illustrate this transition explicitly: 3 phone frames showing Reveal (no tabbar) → Reading first-mount (tabbar at opacity 0) → Reading settled (tabbar at opacity 1). Note timing in caption.

### Priority 4 — Featured-card pigment data binding (engineering note)

Document (don't render): `<ReadingCard variant="featured">` should bind its element-tinted surface to the user's primary dominant element. Currently illustrated with Metal in the amendment because the example user is 庚 Yang Metal. Add a brief note in v4 §F (final polish notes) explaining the binding for the engineer who wires this up.

---

## §3 — What v4 must NOT touch

These are sealed and must carry through to v4 unchanged:

- **v3 sections retained**: Today (§2), Guidance (§4), Friends (§5), Profile (§6), DetailShell (§7), Calendar (§8), Background matrix (§9), Tier-locks (§10), Modal taxonomy A/B/C/D/E (§11), Cross-screen nav (§12)
- **Amendment IA**: Reveal → Reading-catalogue → Energy Map (do not retire the catalogue again)
- **Tab nav labels**: stay removed (icons-only per §AM.2)
- **Tab nav SVG paths**: byte-identical to v3 §4 (Today calendar, Guidance leaf-circle, Reading curved-spine book, Compat Venn, Profile silhouette)
- **Element marks** (`el-metal` … `el-water`): unchanged from v1 §7
- **Token primitives** (color, type, radius, spacing, surfaces): no new colors / fonts / radii / spacing values invented. Compose from `tokens.css` / `icons.svg` only

If a polish requires a new primitive, **flag it in v4's drift log — never invent.**

---

## §4 — Output

Single file: `elementum-design-legend-v4-polish.html`

Self-contained HTML, fonts via Google Fonts CDN, no build step. Top-level TOC + each section in `<details>` (open by default). Same aesthetic as v3 / amendment — silk paper, ink, bronze.

Reference shared files (as the amendment now does):
- `<link rel="stylesheet" href="tokens.css"/>` for tokens
- `<svg><use href="icons.svg#id"/></svg>` for any icon already in the library (you'll add new entries below)
- Inline `<symbol id="…">` definitions for the **new or refined** icons v4 produces — at the top of `<body>` in a `<svg style="display:none">` block. Show them in their canonical 5×2 (DM) and 8-cell (reading sections + state) grids, then the same at usage scale within the polished Reveal mockup.

### v4 sections (suggested — adjust as you see fit)

- §V0 — Brief recap (why v4 exists, link to amendment + DOC5 §AMENDMENT)
- §V1 — 10 day-master ink-wash icons (refined, 5×2 grid, full annotations)
- §V2 — Reading-section + state icons (refined 8-icon set)
- §V3 — Reveal page polished (full 390×844 mock with refined DM icon, vertical rhythm tuned)
- §V4 — γ inline-expansion motion plate (animated or 3-state)
- §V5 — Tab-bar fade-in moment (3-state sequence)
- §V6 — Final polish notes (data-binding hints for engineering)
- §V7 — Drift log v4 (anything that surfaced new primitives or required deviations)

---

## §5 — Acceptance criteria

v4 is done when:

1. All 10 day-master icons render at full ink-wash fidelity (or refined geometric — your call but consistent within itself), in their 5×2 grid and inside the polished Reveal hero
2. The 7 reading-section + state icons are refined and rendered in their own grid
3. The polished Reveal mock fits 390×844 with breathing room — no cramming
4. The γ motion plate communicates the transition clearly
5. The tab-bar fade-in sequence is shown
6. Every primitive used traces to v1 + v2 + v3 + amendment + DOC5 §AMENDMENT — nothing new invented
7. Drift log v4 is empty OR every entry has a doc-patch resolution proposed

---

## §6 — What v4 deliberately does NOT include

- **Re-rendering v3's Today / Guidance / Friends / Profile / DetailShell / Calendar** — they're already done
- **Re-rendering the amendment's Reading catalogue / containers / scroll-variants / card variants** — the amendment is canonical
- **Animation specs beyond what's already in DOC5 §4 + §AM.4** — animations not specified are out of scope
- **Real reading copy** — placeholder body text is fine
- **Premium tier marketing visuals** — out of scope
- **Engineering implementation** — v4 is a design artifact, not a code change

---

## §7 — Sequencing after delivery

1. User + Claude Code render v4 in preview, confirm fidelity
2. Drop-in: replace `<symbol id="dm-…">` and `<symbol id="read-…">` bodies in `Design/icons.svg` with v4's refined versions
3. Update `Design/manifest.md` to flag commission tasks as resolved
4. Code-side: amendment §A3 + §A6 auto-update through the shared icon library (no app code change needed beyond the swap)
5. Optional v5: real reading copy, full chart-reveal page (currently at v3 §7 reference only), animation spec extensions
