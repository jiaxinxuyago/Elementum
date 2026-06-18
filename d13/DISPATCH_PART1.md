# Dispatch · Elementum D13 — Handoff 1 (Reveal Journey + Reading Catalogue)

> Paste everything below the line into Claude Code. It assumes this project's
> `d13/` folder is available to the agent (via the connected repo / synced folder).
> The live-preview URL is a convenience for *seeing* the target; the **source of
> truth is the files in `d13/`** — build from those, not from the bundle.

---

## Task

Implement **Part 1 of the Elementum D13 onboarding** — the first-run identity
reveal (P1), the scroll-driven dissolve into the energy wheel (P2), and the
Reading Catalogue with its dominance wheel + five energy tiles (P3·B) — as real
product screens in our app stack.

This is a **high-fidelity wireframe handoff**, not code to ship verbatim. Build
the actual components from the spec; do not paste the wireframe HTML into the app.

## Read first (in this order)

1. **`d13/HANDOFF_PART1.md`** — the full implementation spec: scope, the data
   contract, per-screen specs, the tile system, assets, and acceptance criteria.
   *Start here and treat it as authoritative.*
2. **`d13/DOMINANCE_WHEEL_RULES.md`** — the authoritative rule for disk size +
   seating on the wheel. Read before touching any wheel code.
3. **`d13/elementum-d13-part1-reveal-catalogue.html`** — the wireframe structure
   + copy. Edit/reference this one only.
4. **`d13/d13-v5.css`** and **`d13/d13-v5.js`** — styling + behavior
   (wheel render, dominance rule, dissolve scrubber, wheel⟷shelf latching).

Ignore the other `d13-v*.{html,css,js}` and `elementum-d13-…v2..v6` files —
they are superseded iterations. The `standalone/` bundle is preview-only; never
build from it.

## Live preview (regenerable, expires)

A self-contained render of the target is temporarily available at the URL in
`CONNECTOR_LINK.txt` (expires ~10 min after generation, fetch-capped). It is
**only for visual reference** — if it's dead, ask me to regenerate, or open
`d13/standalone/elementum-d13-part1-reveal-catalogue.html` locally. All real
content lives in the project files above.

## The one thing that matters most — the data contract

Everything visible is driven by a single chart object (five energies, each with
a `presence` % and `roles[]`). It is hardcoded to the demo subject ("The Blade,"
a Yang-Metal day master) in the wireframe. **Render both the wheel nodes and the
shelf tiles from that object** (spec in HANDOFF_PART1.md §3), not from
hand-authored markup. Wire it to the BaZi engine's output.

## Definition of done

Implement against the acceptance checklist in **HANDOFF_PART1.md §8**, in
particular:
- Wheel reflows correctly from a *non-demo* chart via `applyDominanceRules`
  (dominant seats top at `D_MAX`; a 0% energy renders at `D_MIN`, never absent).
- Dissolve is reversible and its end frame is pixel-equivalent to the static
  P3·B layout.
- Tiles encode up to 2 role glyphs + color-matched caption + the 100% dominance
  bar; the missing energy shows the ghost treatment; open tile fits 182×222 with
  no clipping.
- No CJK anywhere in Part 1 (the character BaZi chart is Handoff 2).

## Confirm with me before finalizing

The open decisions in **HANDOFF_PART1.md §9** — final tile art, the real data
mapping (how `roles`/`major` derive from ten-gods), prescription-ribbon copy
source, "Resistance" vs "Friction" wording, and the auth/paywall model. Flag
these rather than guessing.
