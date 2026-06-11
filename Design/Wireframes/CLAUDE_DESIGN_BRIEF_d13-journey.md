# Claude Design Brief — Elementum · D13 Five Energies Journey · FINAL WIREFRAME

**Session goal:** ONE deliverable. Brief discipline per Elementum canvas workflow: single artifact, quantifiable acceptance, explicit out-of-scope.

---

## What Elementum is (60 seconds of context)

A BaZi (八字 Four Pillars) personal-energy reading app. Visual world: ink-wash painting on silk paper — silk `#F1E9D6`, ink `#2B2722`, bronze `#6B5339`, five element pigments (metal `#4A7090` · wood `#3D6B31` · fire `#8A3D25` · earth `#7A5C30` · water `#2A4E7A`). Type: Cormorant Garamond (display), EB Garamond (body), Cinzel (architectural caps), Noto Serif SC + Ma Shan Zheng (汉字). **Italics are banned app-wide — zero contexts.**

We have redesigned the app's core surface — the journey from first reveal to the reading catalogue — and locked its architecture. Your job is to turn our structural wireframe into the **final presentation-grade wireframe**.

## The design principles you must embody (non-negotiable)

1. **Reading first, system second.** Every concept appears attached to a personal conclusion; mechanism lives one tap beneath the claim, never in front of it. A concept name without a claim is a defect. No screen face may carry a category label — faces carry conclusions.
2. **Payoff latency.** A personal "that's me" claim is on screen in the FIRST viewport, zero taps.
3. **The seal is the continuity object.** The user is named by their seal on the identity plate; that same seal glides to become the center of the five-element wheel. One unbroken identity.
4. **Ceremony vs reference.** The identity plate (Beat 1) is a visual ceremony (≤30 words total, share-card-ready). The Day Master card is the textual reference. They must FEEL different.
5. **Banished vocabulary** (must not appear anywhere): "Dominant Energies", "Forces in Motion", "Ten Gods", "Seven Killings", "Luck Cycle", "Seasonal Calibration". Ten God persona names (The Mirror, The Muse, The General, The Alchemist…) always carry their structural definition fragment.

## The locked architecture (do NOT redesign — refine)

Seven panels, exactly as specced in the uploaded `d13-five-energies-journey.html` (v5 — read it fully first; all draft copy, word budgets, and rules are inside):

- **P1 · The Naming** — full-bleed identity plate: painted-scene placeholder, stamped seal, archetype name, manifesto, bilingual inscription (4–6 汉字 + one English line), foundry mark 「CAST FROM …」(hour-unknown variant: 時未定).
- **P2 · The dissolve** — 3 scroll keyframes: painting→silk, text exits, seal shrinks + glides to wheel center, ring draws, nodes bloom.
- **P3 · The wheel = the Reading tab** — DM seal at center; five element nodes sized ∝ presence %; catalyst ↑ badge, friction ↓ badge, absent element as dashed ghost; prescription ribbon (≤14w); hour-unknown chip; five-card deck with conclusion lines (≤8w each).
- **P4 · Day Master card** — seal, name, manifesto, 3 claims (10–16w), mechanism block, expander, Codex link. Free, no gate.
- **P5 · Pillar Chart** — four-pillar grid (persona-named tags), Patterns section (conclusion-led), energy-map viz section placeholder.
- **P6 · Energy card, catalyst variant (Earth)** — conclusion → R layer → X layer → Seeker gate → cycle expander → Codex.
- **P7 · Energy card, ghost variant (Fire, absent+friction)** — same order; ghosted ink register that performs scarcity.

## Your single deliverable

**One self-contained HTML file: `elementum-d13-journey-wireframe-final.html`** — the seven panels at presentation fidelity:

- Phone frames at true 390×844 proportion, laid out as a left-to-right journey with flow arrows.
- Real type stack (Google Fonts), real tokens, NO raster images — art areas are elegantly labeled vector/CSS placeholders (ink-wash gradient suggestion is welcome; no painting).
- All draft copy from the uploaded spec VERBATIM, each slot respecting its word-budget chip.
- Motion annotated where the spec annotates it (stamp, glide, bloom timings).
- Wheel geometry refined: this is your one open design surface — node placement, 生-ring arrow treatment, spoke question, center-seal emphasis. Make the wheel beautiful as STRUCTURE (still no raster).
- An annotation rail per panel (the spec's ◆ notes, tightened).

## Acceptance criteria (we sniff-test against these)

1. All 7 panels present and labeled P1–P7; dissolve shows exactly 3 keyframes.
2. `grep -i italic` on your file returns ZERO style usages (no `font-style: italic`, no `<em>/<i>`).
3. Plate total ≤30 words; every text slot within its budget (budgets are chips in the uploaded spec).
4. Zero banished vocabulary anywhere (list above).
5. The seal appears in P1, all 3 P2 keyframes, and P3's center — same object, three scales.
6. Wheel: node diameter visibly ∝ percentage; ghost node dashed; ↑/↓ badges present; hour-unknown "~" variant shown or annotated.
7. Gates render INSIDE P6/P7 after two free layers — never on a card face.
8. Persona names ("The Alchemist", "The General") each appear WITH their definition fragment.

## Out of scope — do NOT

- No painted/rendered art, no image generation (that is the NEXT session, with uploaded reference paintings).
- No new screens (no Calendar tab, no onboarding, no compat) and no IA changes — architecture is locked by owner decisions D13a–c.
- No copy rewriting — draft copy is owner-approved direction; use verbatim.
- No new colors/typefaces — tokens above are canonical.
- No interactive JS beyond what presentation needs (static is fine).

## Files uploaded with this brief

1. `d13-five-energies-journey.html` — the v5 structural spec (your source of truth)
2. `geng-seal.png` — the 庚 stem seal (the continuity object; reference only, render as placeholder)
3. `portrait-sample.png` — one ink-wash portrait painting (the plate's eventual art register; reference only)
4. `bg-plate-sample.png` — a silk plate background (surface register; reference only)
