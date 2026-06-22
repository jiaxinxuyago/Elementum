# Brief 1 (LEAD) — Guidance hub + 5-feature suite

> Inherits `00-MASTER-CONTEXT.md` — **scope = consistency + polish only (§0), not a
> redesign.** The five Guidance features drifted apart most; bring them into one
> consistent family (shared shell + complete states) while keeping each feature's
> existing layout, content, and flow.

## Screens in scope
- Hub: `#/app-guidance` — `screens/28-guidance.png`
- Elemental Draw: `#/app-draw` — `screens/29-draw.png` (Free)
- Energy Manual: `#/app-manual` — `screens/30-manual.png` (Seeker)
- Self-Report: `#/app-selfreport` — `screens/31-selfreport.png` (Seeker)
- AI Consultant: `#/app-consultant` — `screens/32-consultant.png` (Advisor)
- BaZi Codex: `#/app-codex` — `screens/33-codex.png` (Free)

## Job to be done
Guidance is the "do something with my reading" tab. The hub should make the five
tools feel like one curated set; each tool should have a deliberate, distinct
arc that pays off — not five differently-styled forms.

## Current state & problems
- The **hub** is solid (featured Elemental Draw card + 2×2 grid) — keep its
  structure; tighten it as the template for grid/feature cards everywhere.
- The **five feature pages were built at different times** and don't share a
  consistent header rhythm, section system, or state design. They're the main
  inconsistency in the app.
- States are uneven: some features show only a happy path (no empty/loading/locked).

## Unify first — the shared "feature page" frame
Align all five onto the SAME (existing) feature-page shell; only the body differs:
- Header: back-chevron + eyebrow `GUIDANCE · 引 路` + feature title (Cormorant),
  54px inset. (Sub-pages keep the tab bar — they're tab children, not the deep
  page-stack.)
- A one-line **purpose** sub-header under the title.
- Body uses the shared **section-card** + **list-row** components.
- A consistent **locked state**: hero lock glyph + tier chip + one-sentence value
  prop + "Unlock with Seeker/Advisor" → upgrade modal.

## Per-feature bespoke journeys (states)

### A. Elemental Draw (Free) — a daily ritual
- **Entry:** a fanned/face-down deck themed to today's elemental current.
- **Action:** tap to draw → card flips (reveal animation) to a single question/
  prompt drawn from the day's energy.
- **Result:** the drawn card with a short reflection; "drawn today" lock until
  tomorrow (show the already-drawn state).
- Element pigment = today's day element.

### B. Energy Manual (Seeker) — a living 5-domain document
- **Entry/Setup:** brief intro of the five life domains.
- **Action:** 5 domain tabs (Career, Relationships, Health, Wealth, Self — confirm
  labels). Each domain = 3 stacked section-cards.
- **States:** locked (Free), loading, and the full document. A "last updated /
  updates as decades turn" note.

### C. Self-Report (Seeker) — calibration that tunes readings
- A short questionnaire: single-select, multi-select, and a free-text item.
- **States:** intro (why it helps) → questions (progress) → saved confirmation.
- Make it feel like calibration, not a survey — one question per view or a tight
  grouped form, with progress.

### D. AI Consultant (Advisor) — chat grounded in the chart
- **Context bar** at top (the user's Day Master / key energies, so answers feel
  personal). Chat history + composer.
- **States:** empty (suggested starter questions as chips), thinking, answered,
  locked (Free/Seeker → Advisor gate). ⚠️ The current capture
  (`32-consultant.png`) looks sparse — design the empty + active states fully.

### E. BaZi Codex (Free) — the concept reference
- Accordion entries; each: **definition → plain explanation → "in your chart"**.
- Searchable / grouped (Stems, Branches, Ten Gods, Patterns). Calm, encyclopedic.

## Acceptance criteria (quantifiable)
- [ ] All 5 feature pages share ONE header pattern + ONE section-card/list-row
      system (visually a family; diff only in body + pigment).
- [ ] Each of the 5 features designs **entry + action + result/locked** (≥3 states
      each); AI Consultant additionally shows **empty (with starter chips)** and
      **thinking**.
- [ ] The hub's featured card + 2×2 grid is preserved and becomes the canonical
      feature-tile component.
- [ ] Locked state is identical in structure across features (lock glyph + tier
      chip + value line + unlock CTA), tier color correct (Seeker bronze / Advisor `#7a5e9a`).
- [ ] Header eyebrow+title at 54px inset; no italics; icons-only tab bar present
      (these are tab children); no mock status bar.
- [ ] Element pigment used only where it maps to a real chart element.

## Out of scope
- Final painted card/hero art (placeholders fine), AI answer content, engine logic.
