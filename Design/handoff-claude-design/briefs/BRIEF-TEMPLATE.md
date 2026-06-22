# Brief template (copy for each new screen/journey)

> Inherits everything in `00-MASTER-CONTEXT.md` — incl. §0 SCOPE (consistency +
> polish only, no redesign). Keep one brief = one screen or one journey. Quantify
> acceptance so output is checkable, not vibes.

## Screen(s) in scope
- Route(s): `#/...`
- Reference capture(s): `screens/NN-name.png`

## Job to be done
One sentence: what the user is here to accomplish, and the feeling we want.

## Current state & problems
- What exists today (from the capture).
- Specific inconsistencies / gaps vs the consistency baseline (§4/§5 of master).

## The bespoke journey (states)
Define each state as a distinct frame:
- **Entry** — how the user arrives, the first impression.
- **Empty** — before any data/action.
- **Loading** — while computing/fetching.
- **Action** — the core interaction (form, draw, swipe, chat…).
- **Result** — the payoff.
- **Locked + upgrade** — if tier-gated.
- **Error / edge** — no chart, no match, network fail.

## Layout spec
- Header (eyebrow + title, 54px inset) — exact copy.
- Section order + the reused components (feature tile / list row / section card).
- Spacing, hierarchy, where element pigment appears (and why).
- Transitions in/out.

## Acceptance criteria (quantifiable)
- [ ] Header matches the global pattern (eyebrow `EN · 中文` + Cormorant title, 54px inset).
- [ ] All N states are designed (list them).
- [ ] Reuses the shared card system (no bespoke one-off card chrome).
- [ ] No italics; icons-only nav; no mock status bar.
- [ ] <screen-specific checks, e.g. "exactly 5 domain tabs", "result shows % medallion + archetype + reading + share">.

## Out of scope
- Final painted art (placeholders OK), copywriting beyond labels, engine logic.
