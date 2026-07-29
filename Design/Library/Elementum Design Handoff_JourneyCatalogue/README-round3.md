# Round 3 addendum — polish pass on the round-2 build (2026-07-23)
Companion to `README.md` (read that first — it carries the full spec and the round-2 delta). This file flags ONLY what changed in round 3. Source of truth for all items: `catalogue-answer-first/share-flow.html` (live) + the updated boards. All four items are owner-reviewed and final.

## R3-1 · Seal dock: restored and re-seated (catalogue scroll end)
- The dock is **kept** (`data-ca="dock"` — an earlier draft hid it). Sticky above the tab bar; dock↔pill hand-off loop unchanged (dissolves into the towers when they rise past it; re-summons on scroll-up, which also refolds any open pill).
- **Order at the scroll end (changed):** towers → shelf hint → **footer word chips** (12px beat gap, directly under the hint) → the dock's layout slot last, doubling as end-of-page clearance. Catalogue bottom padding reduced 72 → 18px.
- Implementation note: a sticky dock keeps its layout slot even while dissolved — do NOT re-introduce spacer padding between the hint and the word chips.

## R3-2 · Ten-stem gallery seals: ring underlay
- The processed stem medallions' ensō rings taper to near-white and read as broken circles at gallery scale. Each gallery seal now carries a **soft ink underlay ring** behind the painting: inset 5.5%, 9px stroke, rgba(88,92,80,0.30), blur 5px (`.gmini .ms::before`).
- Applies to the ten-stem GALLERY minis only — the live wheel, reveal plate, and identity card use the art untouched. Longer-term fix (optional): re-process `art/stems/proc/*.png` with a stronger ring pass and drop the underlay.

## R3-3 · SEEK THESE / SKIP THESE rows: sentence phrasing (matches the tiles)
- Each energy row now reads as one line — **Fire** *is your* **Duty** — matching the tiles' definition-line grammar. Replaces the old `Fire 0% / your Duty` two-line construction.
- Spec: element name (Cormorant 14.5/600, element pigment deep) · "is your" connector (EB Garamond 9.5, inkLight) · relation noun (Cormorant 14.5/600, ink) · % beneath (mono 8.5, inkLight). Element chip unchanged.
- **Alignment law:** the phrase sits on a fixed column grid (`38px | max-content | 1fr`, 4px gaps) so every "is your" and every relation noun shares the same x-axis within a column. Verified zero overflow at 394px shell width — keep the grid, don't switch to natural flow.

## R3-4 · Identity card twin tiles: Seek / Skip headers with role chips
- Tile headers are now **SEEK** / **SKIP** labels (EB Garamond 10/600, letterspacing 2, catalyst-green / friction-red) with the filled role chip right-aligned on the same line: `↑ Catalyst` (green) / `↓ Friction` (red) — the arrow lives INSIDE the chip, per the chip grammar everywhere else; never a bare leading arrow.
- Header row is space-between, nowrap; chip = `.sc-pill` at 7.5px with an 8px arrow.
- Board reference: breakdown 04 on `p6-breakdown-boards.html` (updated).

## Files touched this round (already synced into this bundle)
- `catalogue-answer-first/share-flow.html` — all four items, live.
- `catalogue-answer-first/p6-breakdown-boards.html` — breakdown 02 (row phrasing) + breakdown 04 (card headers).

## Dispatch prompt (paste into Claude Code)
> Round-3 polish on the Elementum Reading-tab implementation, from `design_handoff_reveal_reading_journey/`. Read `README-round3.md` for the four flagged changes, then verify each against the live spec in `catalogue-answer-first/share-flow.html`: (1) keep the seal dock (`data-ca="dock"`) with the footer word chips seated directly under the shelf hint and the dock slot last — no spacer gap; (2) add the soft ink underlay ring to ten-stem GALLERY seals only; (3) re-render the SEEK THESE / SKIP THESE rows as the aligned sentence "Element *is your* Relation" on the fixed 38px|max-content|1fr grid with the % beneath; (4) identity-card tile headers = SEEK/SKIP eyebrow labels + filled ↑Catalyst/↓Friction chips (arrow inside the chip). Everything else from the round-2 README stands unchanged — same data contract (`template-data.json`), same locked vocabulary, no italics, black circle-arrow as the only read affordance. If any of these four conflicts with what's already built, this round wins.
