# Elementum · D13 — Handoff 1 of 2

**The Reveal Journey + Reading Catalogue (P1 → P3)**

This package is the implementation spec for the first slice of the D13 onboarding: the first-run identity reveal, the scroll-driven dissolve into the energy wheel, and the Reading Catalogue with its dominance wheel and five energy tiles. It is a **high-fidelity wireframe**, not production code — build the real screens from this spec; do not ship the wireframe HTML.

---

## 1 · What's in scope

| Screen | Label in file | What it is |
|---|---|---|
| **P1** | `P1 · The Naming` | First-run ceremonial identity card (the user's stem seal + archetype name). Reused as the share card. No tab bar. |
| **P2** | `P2 · The Dissolve` | Scroll-driven, reversible transition: the identity plate dissolves and the camera settles onto the energy wheel. Shown as 3 keyframes **and** a live scrubbable demo. |
| **P3·B** | `P3 · Beat 2 — Reading catalogue` | The canonical destination: the **dominance wheel** (five element dots around the central seal) above a shelf of five **energy tiles**. This is the core screen. |

Also included as reference, not product screens:
- **Wheel geometry explorations** — six seating/styling variants of the wheel.
- **10-stem gallery** — the wheel rendered under each of the ten Heavenly Stems (proves the system generalizes).
- **Two legend sections** — "The energy tile — format & examples" and "Calibration signs — the energy-tile iconography." These document the tile system; port them into a Storybook/design-system page, don't ship them in the app.

Out of scope (Handoff 2): P4 Day Master, P5 八字 Birth Chart, P6/P7 energy readings.

---

## 2 · Files

| File | Role |
|---|---|
| `elementum-d13-part1-reveal-catalogue.html` | Structure + copy for all P1–P3 screens. Edit this. |
| `d13-v5.css` | All styling (shared with Handoff 2). |
| `d13-v5.js` | Wheel rendering, dominance rule, dissolve scrubber, wheel⟷shelf latching. |
| `DOMINANCE_WHEEL_RULES.md` | **Authoritative spec** for disk size + seating. Read it before touching the wheel. |
| `standalone/elementum-d13-part1-reveal-catalogue.html` | Self-contained bundle (all assets inlined) — for preview/import only. Never edit. |

Do **not** read or build from the other `d13-v*.{html,css,js}` files — they are superseded iterations.

---

## 3 · The data contract — the one thing to wire

Everything visible is driven by **one chart object**: five energies, each with a presence percentage and a set of calibration roles. In the wireframe this is hardcoded to the demo subject ("The Blade," a Yang-Metal day master). Production must supply it from the BaZi engine.

```jsonc
{
  "dayMaster": "geng",          // stem id → selects the centre seal (assets/stems/<id>.png) + archetype name
  "archetype": "The Blade",     // ≤3-word display name
  "energies": [
    { "el": "metal", "presence": 42, "roles": ["core", "resistance"] },
    { "el": "earth", "presence": 28, "roles": ["resistance"] },
    { "el": "water", "presence": 16, "roles": ["catalyst"] },
    { "el": "wood",  "presence": 14, "roles": ["catalyst"] },
    { "el": "fire",  "presence": 0,  "roles": ["missing", "catalyst"], "major": "catalyst" }
  ]
}
```

- `presence` (0–100, the five sum to 100) is the **only** input the wheel needs — disk diameter and ring seat are computed from it (see §5).
- `roles` is an array (an energy may hold two, e.g. Core **and** Resistance). Allowed: `core`, `catalyst`, `ally`, `resistance`, `missing`. `major` optionally names the role that gets the emphasis ring.
- `el` ∈ `metal | earth | wood | fire | water` and selects pigment, icon (`#el-<el>` sprite), thumbnail, and dot art.

In `d13-v5.js` the demo lives in `NODES_PRESENCE`; the role/hook/pole/thumbnail copy for the tiles is currently inline in the HTML. **Production: render both the wheel nodes and the shelf tiles from the chart object above** rather than hand-authored markup.

---

## 4 · Screen specs

### P1 · The Naming
- Centered, no tab bar — "the ceremony owns the screen."
- Stem seal (`assets/stems/<dayMaster>.png`, 124px) → archetype name (Cormorant, ≤3 words) → pinyin line (Cinzel) → manifesto (≤30 words total on the plate).
- Ground: two stacked reveal paintings (`bg-reveal-01-distant-peaks` top, `bg-reveal-02-floating-island` bottom) with a feathered fog seam (`.bg-reveal-fog`) hiding the join.

### P2 · The Dissolve
- **Reversible, scroll-driven, zero intentional interaction.** As the user scrolls, the identity plate fades while the wheel ground fades in and the seal glides to the wheel centre.
- Timing map (bound to scroll progress 0→1): plate ground 4–42% · plate text 4–46% · seal glide 8–74% (ease-out) · enso paints in 44–70% · element dots bloom 52–98%, staggered by presence.
- Background crossfade: reveal paintings (opacity → 0) into `bg-energymap-01-top-band` (→ ~0.82) + a faint blue page-tint.
- **End state must equal P3·B exactly** — same wheel scale (0.92), same seal size, same energy-map ground + tint, and it resolves with the reading shelf already visible. The live demo (`#dissolve-scroll`, driven by `initDissolve()`) is the reference; reproduce its end frame as P3's static layout.

### P3·B · Reading Catalogue (canonical)
- **Dominance wheel** (see §5) with the central stem seal; tapping the seal opens P4 (Handoff 2).
- A one-line **prescription ribbon** under the wheel that changes per selected energy.
- **Energy shelf**: five tiles, always all five present (see §6).
- **Wheel ⟷ shelf are latched both ways:** tap a dot → its tile opens and takes the element's pigment cap; tap a tile → its dot scales up with a pigment ring. The shared pigment is the visible tether teaching "dot and tile are the same energy."

---

## 5 · The dominance wheel  → see `DOMINANCE_WHEEL_RULES.md`

One rule governs every wheel in the app; it is codified (not magic numbers) in `d13-v5.js`:

- **Diameter** `d(p) = D_MIN + (D_MAX − D_MIN) · (p / pMax)` — linear in presence, normalized to the chart's largest energy, so the dominant always renders largest and a 0% energy renders at the legibility floor `D_MIN` (present but small), never zero.
- **Seating** (presence mode): dominant at top (12 o'clock), the rest clockwise in descending presence; seats `[−90, −18, 54, 126, 198]°`; ties break by `metal, earth, water, wood, fire`.
- Icon + percentage are a **fixed** size per wheel (they track the wheel's `scale`, never `p`) so small disks stay readable.
- `applyDominanceRules(nodes, mode)` enforces this at boot — feed it the chart and it recomputes every disk. Element dots are PNGs (`assets/art/dotf-<el>.png`); the central seal and brushed enso ring complete the composition.

Constants `D_MIN = 40`, `D_MAX = 64`, `RING_ANGLES`, `EL_ORDER` are the tuning surface — change them in one place.

---

## 6 · The energy tile system

Each energy is a **tile** on the shelf. Collapsed = a thin 32px spine (element mark + % + a presence gauge that mirrors the dot's size on the wheel). Open = the full card. Exactly one open at a time; the shelf is 330px wide, the open tile **182 × 222px** — design to that width.

An open tile carries, top to bottom:
1. **Eyebrow** — `ELEMENT · NN%`.
2. **Calibration glyphs** (top-right corner, up to 2 stacked) — the role(s) this energy plays. Color-coded circular badges: Core (filled disc, ink), Catalyst (↑, sage `--up`), Resistance (↓, cinnabar `--down`), Missing (dashed ring, muted), Ally (linked rings, slate `--ally`). The `major` role gets an emphasis ring.
3. **100% dominance bar** — all five energies in one track; this tile's segment full-strength + highlight ring, others muted, a 0% energy as a dashed sliver. Reads share-of-whole, not isolated number. Sits on the clean silk above the hook (never over the thumbnail).
4. **Role caption** — the glyphs named in words, each tinted to match its corner glyph, so the role reads without guessing (e.g. `● CORE · ↓ RESISTANCE`).
5. **Hook** — one line, ≤8 words; the promise that earns the tap.
6. **Foundation line** — names the energy's nature ("Refinement · the edge").
7. **Read pill** — commits to the full energy reading (→ P6/P7, Handoff 2).
- A **missing/ghost** energy (0%) renders with a grayscale thumbnail + dashed dominance sliver + muted treatment.

Engine taxonomy (ten-gods, combination patterns) **never** surfaces on the tile face — only the conclusion-first hook + the calibration role. The two legend sections in the file document this vocabulary verbatim; mirror them in your component library.

---

## 7 · Assets

Live in `assets/`, referenced by Part 1:
- `bg/` — `bg-reveal-01-distant-peaks`, `bg-reveal-02-floating-island`, `bg-energymap-01-top-band`.
- `stems/` — `geng.png` (demo day master) + the other nine for the gallery.
- `art/` — `dotf-<el>.png` (the **final** wheel dots), `t_<el>_*_s.png` (tile thumbnails). Thumbnails are placeholders pending the final art set — confirm before wiring real paths.

Prune the rest of `art/` (`dot`, `dotb`, `dotc`, `dotn`, `dotr`, `dots1`, `disc`, `wcdisc`, `plate`, `enso-*`, `center-blade` …) — these are superseded iteration files, not referenced by v5.

**Fonts** (Google): Cinzel, Cormorant Garamond, EB Garamond, JetBrains Mono. (Noto Serif TC is only needed in Handoff 2.)

---

## 8 · Acceptance criteria

- [ ] Wheel renders from a chart object via `applyDominanceRules`; changing a presence % reflows disk sizes + seats correctly (verify with a non-"Blade" chart).
- [ ] Dominant energy seats at top and renders at `D_MAX`; a 0% energy renders at `D_MIN`, never absent.
- [ ] Wheel ⟷ shelf latching works both directions; shared pigment is visible.
- [ ] Dissolve is reversible and its end frame is pixel-equivalent to the static P3·B layout.
- [ ] Tiles encode role glyphs (up to 2) + color-matched caption + 100% dominance bar; missing energy shows the ghost treatment.
- [ ] Open tile fits 182 × 222px with no clipping; the dominance bar sits on silk, not over the thumbnail.
- [ ] No CJK characters anywhere in Part 1 (the BaZi chart with characters is Handoff 2 only).

---

## 9 · Open decisions to confirm with design

1. **Final tile art** — thumbnails are placeholders. Need the production thumbnail set per element.
2. **Real data source** — confirm the BaZi engine output maps to the §3 chart object (esp. how roles are derived from ten-gods, and the "major catalyst" rule).
3. **Prescription ribbon copy** — currently demo strings; needs a content source keyed per energy/role.
4. **"RESISTANCE" vs "FRICTION"** wording is currently "Resistance" — confirm final taxonomy term.
5. **Auth/paywall** — the journey assumes the chart is already computed; account/gating model is unspecified here.
