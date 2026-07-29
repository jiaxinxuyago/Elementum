# Dominance Wheel — Disk Size & Seating Rule

The single rule that governs every Five-Energies wheel in the app (the canonical
P3 reading catalogue, the P2 dissolve end-state, the hour-unknown variant, and
the ten-stem gallery). It is implemented in `d13-v5.js` — that code is the source
of truth; this document explains it.

Each energy has exactly **one input**: its **presence percentage `p`** (0–100,
the share of the chart it occupies). Everything visual — how big its disk is and
where it sits on the ring — is derived from `p`. You should never hand-set a
diameter or an angle; edit `p` and let the rule do the rest.

---

## 1. Diameter — how big is each disk?

```
d(p) = D_MIN + (D_MAX − D_MIN) · (p / pMax)
```

Measured in **base units** (the wheel then multiplies by its own `scale`).

| Symbol  | Meaning                                                                 | Value |
|---------|-------------------------------------------------------------------------|-------|
| `D_MIN` | Legibility floor — smallest disk that still holds the icon + number     | `40`  |
| `D_MAX` | Diameter of the **dominant** energy                                     | `64`  |
| `pMax`  | The largest presence in **this** chart (the Day Master / dominant energy) | runtime |

**Why these choices**

- **Linear in presence.** The diameter grows in proportion to `p`, so the size
  gap between energies reads as their dominance gap. (We deliberately use linear
  *diameter* rather than area-true scaling: it gives a more obvious, readable
  spread, which is what the wheel is for — ranking at a glance, not exact
  area-estimation.)
- **`pMax`, not a fixed 100.** The dominant energy always renders at `D_MAX` on
  every chart, whatever its absolute %. A chart where the top energy is 42% and
  one where it is 70% both crown their leader at full size; the rule encodes
  *relative* dominance within the reading.
- **Floor at `D_MIN`.** A 0% / absent energy (e.g. a missing element) renders at
  exactly `D_MIN` — present but hollow — never zero. Below `D_MIN` the icon and
  number stop being legible.
- **Content size is fixed per wheel.** The element icon and the percentage scale
  only with the wheel's `scale`, **never** with `p`. A small disk carries the
  same readable mark and number as the largest — size differences live in the
  disk, not the label.

**Worked example** (demo chart, `pMax = 42`):

| Energy | `p`  | `d = 40 + 24·(p/42)` | rounded |
|--------|------|----------------------|---------|
| Metal  | 42%  | 64.0                 | **64**  |
| Earth  | 28%  | 56.0                 | **56**  |
| Water  | 16%  | 49.1                 | **49**  |
| Wood   | 14%  | 48.0                 | **48**  |
| Fire   | 0%   | 40.0                 | **40**  |

---

## 2. Seating — where does each disk sit on the ring?

Five seats, 72° apart, **seat 0 at the top** (12 o'clock) then **clockwise**:

```
RING_ANGLES = [ −90°, −18°, 54°, 126°, 198° ]
                 top   ↘    ↘    ↙    ↖
```

### Presence mode (the canonical chart)

- The **most dominant** energy sits at the **top** (−90°). The top of the ring
  is the eye's entry point, so the strongest energy crowns the wheel.
- The remaining energies follow **clockwise in descending presence** — reading
  around the ring from the top tells you the full ranking.
- **Ties** break by fixed element order: `metal → earth → water → wood → fire`.

So with the demo chart: Metal (top) → Earth → Water → Wood → Fire, clockwise.

### ⚠ AMENDMENT (owner ruling 2026-07-16 · journey-handoff integration) — condition-dependent seating

Seating now depends on the chart's §5c condition (REA_13):

| Condition | Seating law |
|---|---|
| **Overfueled** or **Balanced** | The **Core element always crowns the wheel** (top, −90°); the remaining four order **high → low counter-clockwise** starting from the slot at the Core's right (handoff `template-data.json` wheel_placement_law). |
| **Underfueled** | **Dominance order, counter-clockwise**: the most dominant element at top, remaining elements CCW in descending presence (the mirror of the old clockwise rule). The core sits wherever its presence ranks. |

Interpretation note: the owner's ruling verbatim — "if the day master is overfueled/balanced, the
core must stay on top; if it is underfueled, make the dominance order counterclockwise." The
Underfueled row above reads that as presence-led seating (core NOT pinned to top) in CCW direction —
if the core should stay top for Underfueled charts too, only the direction differs; correct this row.
The old always-clockwise presence mode below is RETIRED for the catalogue wheel (kept for reference).
Disk-size, geometry, art, and tie-break rules are unchanged. Implementation: `engine/dominanceWheel.js`
`applyDominanceRules()` gains the condition parameter.

### Presence mode (RETIRED for the catalogue — pre-2026-07-16 rule, kept for reference)

### Cycle mode (alternative seating)

Seats are fixed to the **generation cycle** (相生): `metal → water → wood → fire
→ earth`. Disk **size still encodes presence**; only the positions change. Use
this when the elemental relationships matter more than the ranking.

---

## 3. How to re-key a chart for a real person

1. Set each energy's `p` (presence %) in `NODES_PRESENCE` (and `NODES_CYCLE` if
   used). The five values need not sum to exactly 100 — the rule normalises to
   `pMax`.
2. Do **not** edit `d` or `a` — `applyDominanceRules()` recomputes both at boot.
3. The dominant energy automatically takes `D_MAX` and the top seat; a 0% energy
   automatically takes `D_MIN`.

## 4. Tuning the look (rare)

- Want a more/less dramatic size spread? Change `D_MAX` (bigger = more dramatic).
- Disks crowding the ring edge or the center seal? Adjust `D_MAX` or the orbit
  radius `GEOM.r`, not individual disks.
- Keep `D_MIN ≥ 40` base units, or the icon + number stop fitting.

_Implementation: `D_MIN`, `D_MAX`, `RING_ANGLES`, `diameterFor()`, and
`applyDominanceRules()` in `d13-v5.js`._
