# Brief 6 — Onboarding journey + Reveal

> Inherits `00-MASTER-CONTEXT.md`.

## Screens in scope
- Welcome: `#/welcome` — `screens/01-welcome.png`
- Steps: `#/step1..7` (+ `step4a`, `step6a`, `step7a`) — `screens/02..11`
- Reveal: `#/reveal` — `screens/12-reveal.png`

## Job to be done
Collect birth date/time/place/gender + notify prefs with a calm, ceremonial feel,
then deliver the first-run identity reveal that hands off to the catalogue.

## Current state & problems
- The flow already shares `OnboardingShell` (progress bar, step counter, bronze
  question, poetic subtitle, input slot, Back/Continue). Wheels now have real
  inertia + snap. This is in good shape — polish + consistency only, not a
  rebuild.
- Confirm conditional branches (4a hour-window, 6a energy-current, 7a notify-time)
  read as natural detours, and that the step counter/progress stays coherent.

## The journey (states)
- **Welcome** → 7 primary steps with shared shell; 3 conditional branches.
- Each step: progress bar, "Step N of 7", question, subtitle, input (wheel / grid
  / field / toggle), Back + Continue.
- **Loading** (ceremony, auto-advances) → **Reveal** (identity plate) → swipe
  dissolves into `app-reading`.

## Layout spec
- Keep OnboardingShell as the single template; ensure every step's input sits in
  the same vertical zone with consistent spacing and the same primary-button
  treatment.
- Wheel pickers: centered selection band + fades (already implemented) — match
  exactly across Year/Month/Day/Hour and the 7a triple wheel.
- Reveal: ceremonial plate (seal + archetype + manifesto + inscription) with a
  clear "swipe to continue" affordance.

## Acceptance criteria (quantifiable)
- [ ] All 7 steps + 3 conditional branches + welcome + reveal designed from ONE shell.
- [ ] Progress + "Step N of 7" coherent including on branch screens.
- [ ] Every input type (wheel / tile-grid / city field / toggle / triple-wheel)
      shares spacing + button treatment.
- [ ] Reveal shows the plate + a clear swipe-to-continue affordance.
- [ ] No italics; no tab bar; no mock status bar (real device).

## Out of scope
- Geocoding, chart engine, reading copy, final painted plate art.
