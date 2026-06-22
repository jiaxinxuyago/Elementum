# Brief 5 — Today tab + time drill-downs

> Inherits `00-MASTER-CONTEXT.md` — scope = consistency + polish only (§0), not a redesign.

## Screens in scope
- Today hub: `#/app-today` — `screens/23-today.png`
- Day: `#/app-day` — `screens/24-day.png`
- Month: `#/app-month` — `screens/25-month.png`
- Year: `#/app-year` — `screens/26-year.png`
- Decade: `#/app-decade` — `screens/27-decade.png`

## Job to be done
Answer "what's the energy right now, and across time?" — a daily hub that invites
zooming out to month / year / decade (大运).

## Current state & problems
- The hub carries the day narrative (Do/Avoid, best hours, catalyst) plus entry
  cards to the time scales. The four drill-downs vary in layout — unify them into
  one "temporal reading" template that only swaps the scale + visualization.
- Confirm each time card on the hub routes to its designed page.

## The journey (states)
- **Hub (Today):** date + element-of-day eyebrow; day narrative; Do / Avoid;
  best hours; catalyst; a row of time cards (Month / Year / Decade) as entries.
- **Day / Month / Year / Decade:** one shared template — header (back-chevron +
  eyebrow `ACROSS TIME · <SCALE>`), a scale-specific hero/visualization
  (day: narrative; month: 7-col element-dot calendar + flow windows; year:
  12-bar timeline; decade: 大运 chapter band), then section-cards.

## Layout spec
- One temporal-reading template; the only differences are the eyebrow scale label
  and the hero visualization. Same section-card rhythm below.
- Element-dot calendar + bar timelines use element pigments meaningfully.

## Acceptance criteria (quantifiable)
- [ ] Hub + all 4 drill-downs designed from ONE shared template (diff = scale + viz only).
- [ ] Each drill-down header: back-chevron + `ACROSS TIME · DAY|MONTH|YEAR|DECADE`, 54px inset.
- [ ] Hub's time cards each route to a designed destination (no dead ends).
- [ ] Calendar/timeline use element pigments by meaning, not decoration.
- [ ] No italics; tab bar present on hub, absent on stacked drill-downs; no mock status bar.

## Out of scope
- Temporal engine output, final art.
