# Brief 8 — Energy Faces screen (the Polarity Ten-God page)

> Inherits `00-MASTER-CONTEXT.md` (incl. §0 SCOPE — consistency + polish, no
> redesign). One brief = one screen. This screen is **already built and
> function-complete** in the app (`#/app-energy` → `D13FacesScreen`); this brief
> asks for the **bespoke visual elevation** of the existing composition, not a
> new structure. Spec: DOC5 §11 (Energy Faces) · v2.1 audit
> `Documents/Designengineering/READING_V2.1_RECONCILIATION_AUDIT.md` (B5/B7).

## Screen(s) in scope
- Route: `#/app-energy` (reached from the catalogue: tap an energy's dot/READ).
- Reference capture: `screens/17-energy-faces.png` (regen via
  `Elementum_App/design-handoff-capture.mjs` — capture BOTH the two-face Wood
  state and the single-face Earth state).
- Supersedes the old swipe-carousel "energy card" (brief 4 §screens line 11):
  that single-persona-per-element carousel is retired. The per-persona **reading**
  it descends into is reused here unchanged (hero + R/X layers + Seeker gate).

## Job to be done
Reveal that an energy speaks in **one or two voices** (its polarity Ten-God
faces), show which leads, and let the user descend into any one's reading.
Feeling: *recognition with depth* — "this drive has two sides, and here's how
they balance in me."

## Current state & problems (the as-built page to elevate)
A vertical scroll, paper ground, three cards:
1. **Dominant-energy briefing card** (horizontal): element mark in a tinted
   roundel + name + 汉字; a sub-line (`dominant · 33% of your chart`); a
   **catalyst/friction badge** (`↑ catalyst` green / `↓ friction` rust); a
   **yin/yang split bar** — two tints of the element pigment, with % labels
   (`偏财 The Horizon · 26%` | `74% · The Steward 正财`) — shown only when two
   faces are present; a one-line **brief** (the life-domain); a dark pill
   **`READ THE {ELEMENT} ENERGY →`** → the element (substance) reading.
2–3. **The faces** — under an `ITS TWO FACES` / `ITS FACE` label, **1–2 portrait
   cards** side by side: a **character-art slot** (currently the element
   ink-wash + mark — placeholder), persona name (Cormorant), a register line
   (`偏财 · yang · 26%`), a one-line abstract (Cormorant), a `READ →` pill. The
   **lead** face carries a `LEADS` badge + a slightly stronger border. A
   single-face energy renders **one** portrait card in the left column.

Problems to fix (polish, not restructure):
- The card chrome is generic cardstock; bring it to the catalogue's finish.
- The **character-art slots are placeholders** — they need the bespoke
  Inner-Council portraits (see Out of scope — art is a separate deliverable;
  here, design the *slot* treatment: frame, scrim, how the persona name sits).
- The split bar reads a touch utilitarian — make the yin/yang weighting feel
  like ink, not a progress bar, while keeping the % legible (a deliberate
  shareable "score").
- Add the **subtle Yin/Yang marker** on each face card (B7) — a register cue
  distinct from the DM identity Yang/Yin chip.

## The bespoke journey (states — design each as a frame)
- **Two faces** (e.g. Wood → The Steward 74% + The Horizon 26%): dominant card
  with split bar + two portrait cards, lead-marked.
- **Single face** (e.g. Earth → The Alchemist): dominant card, no split bar, one
  portrait card (left column).
- **Ghost / scarce** (presence ≤ ~3%): the dominant card + face read in the
  drained ghost register (grayed art, dashed layers) — the energy is barely
  carried.
- **Element (substance) reading** (the dominant card's CTA): hero band + role
  badges + a substance line + R ("what this energy is") / X ("how it moves in
  you", the cycle relation). Eyebrow `{ELEMENT} · YOUR ENERGY`.
- **Persona reading** (a face card's CTA): hero + persona line ("Wood in you is
  **The Steward** — …") + R/X layers + **Seeker gate** + cycle expander. Eyebrow
  `{ELEMENT} · {PERSONA}` (e.g. `WOOD · THE STEWARD`).
- **Locked + upgrade**: the Seeker gate inside the persona reading (advisor
  accent, lock roundel, Unlock pill) — never in front of the face.

## Layout spec
- Header: faces page = back-chevron + eyebrow `YOUR ENERGIES`, 54px inset.
  Readings = back-chevron + the eyebrows above, 54px inset.
- Keep the painted ground; bring the three cards onto the **shared card/layer
  system** (no one-off chrome). Element **pigment** drives: the roundel tint, the
  split-bar tints, the lead-card border, the persona `READ` pills.
- Portrait face cards: 2-up grid (~160px each) at 380px; single face sits in the
  left column (do not stretch full-width).
- Transitions: descend (push from right) into a reading; ascend (back) to faces;
  faces → catalogue on the top back-chevron — identical easing to brief 4.

## Acceptance criteria (quantifiable)
- [ ] All 6 states designed: two-face · single-face · ghost/scarce · element
      reading · persona reading · gated.
- [ ] Dominant card carries, in order: element mark + name + 汉字 · dominance
      sub-line · catalyst↑/friction↓ badge · (two-face only) yin/yang split bar
      with both % labels · brief · `READ THE {ELEMENT} ENERGY →` pill.
- [ ] Face card carries: character-art slot · persona name · register line
      (`汉字 · yin/yang · %`) · subtle Yin/Yang marker (B7) · abstract · `READ →`;
      the lead face is visibly marked (badge + border).
- [ ] Persona-reading eyebrow = `{ELEMENT} · {PERSONA}`; element-reading eyebrow
      = `{ELEMENT} · YOUR ENERGY`; faces page = `YOUR ENERGIES` — all 54px inset,
      back-chevron.
- [ ] Reuses the shared card/layer + hero + Seeker-gate components (no bespoke
      one-offs); element pigment applied per element across all 5.
- [ ] No italics; no mock status bar; tab bar absent on the stacked readings,
      present on… (n/a — faces page is itself a stacked drill-down: no tab bar).
- [ ] Ink-wash register matches the uploaded reference art (see reference-art/).

## Out of scope
- **The Inner-Council character illustrations themselves** (10 personas × 5
  element recolors = a SEPARATE deliverable; here, placeholder slots + the slot
  *treatment* only). Cross-link: that art set is the B4 deliverable.
- The reading **copy** (the K2 persona corpus is authored separately), the
  dominance/strength **engine math**, and the **宫位 positional** per-pillar
  surface (B6 — its own future screen).
