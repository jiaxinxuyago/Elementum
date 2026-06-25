# Brief 4 — Reading tab (Five Energies catalogue + drill-downs)

> Inherits `00-MASTER-CONTEXT.md`. This is the product's signature surface — the
> art direction is the most finished here; align for consistency + journey
> clarity only — polish, not a reinvention. (Scope = §0: no redesign.)

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `Documents/Designengineering/READING_V2.1_RECONCILIATION_AUDIT.md`).** This brief now adds a **FACES prologue** between the element (catalogue) and its text reading: tapping an element opens **1–2 persona character-cards by calculation** (dominant-led; second face only if its polarity is genuinely present — no manufactured latent cards), each carrying the dominant-energy abstract + punchline + keywords + **ruling-domain** line. The reading is **persona-scoped** and reads at a depth set by its **presence frame**. Persona art = the 10 Inner-Council characters recolored per element. Add acceptance criteria for the Faces prologue + ruling-domain line. **Yin/Yang correction:** keep the DM *identity* Yang/Yin chip (permitted stem register); face cards carry a **subtle Yin/Yang marker** (B7). The Faces prologue is fully specced as the **Energy Faces screen** (DOC5 §11). **Positional axis (宫位, B6)** — a *separate* per-pillar surface — is out of scope for this catalogue brief but cross-linked.

## Screens in scope
- Catalogue: `#/app-reading` — `screens/13-catalogue.png`
- Energy card (swipe ×5): `#/app-energy` — `screens/14-energy-card.png`
- Day Master card: `#/app-daymaster` — `screens/15-daymaster.png`
- Pillar Chart (八字): `#/app-pillars` — `screens/16-pillars.png`

## Job to be done
Present the user's Five Energies as a beautiful, legible map and let them descend
into any energy's reading, the Day Master identity, and the raw chart.

## Current state & problems
- Catalogue = dominance wheel (center seal) + prescription ribbon + accordion
  energy shelf. Energy card = swipe carousel. Day Master = identity seal + claims.
  Pillars = four-pillar data grid. These are strong but were authored separately —
  align their header rhythm, card system, and the descent/ascent transitions.
- Confirm the descent paths are obvious: tap dot → energy card; tap center seal →
  Day Master → "Birth Chart" → Pillars → (unknown hour) → Resonance.

## The journey (states)
- **Catalogue:** wheel + ribbon + shelf; an open spine shows its "READ" CTA.
- **Energy card:** horizontal carousel through 5 energies (presence order); each:
  scene-hero + %, role badges, persona line, R + X layers, Seeker gate; **ghost
  register** for scarce/absent energies. Show normal + ghost + gated states.
- **Day Master:** identity seal + manifesto + claims + "Birth Chart" CTA.
- **Pillar Chart:** four-pillar grid; "discover hour" path when hour unknown.

## Layout spec
- Header: catalogue uses eyebrow `YOUR ENERGIES`; drill-downs use back-chevron +
  eyebrow (e.g. `YOUR ENERGIES · DAY MASTER`), 54px inset.
- Keep the painted grounds; ensure the card/layer system matches the global one.
- Define the **descend (push from right) / ascend (back)** transition consistently.

## Acceptance criteria (quantifiable)
- [ ] Catalogue + energy-card (normal + ghost + gated) + Day Master + Pillars designed.
- [ ] Drill-down headers use back-chevron + eyebrow at 54px inset; catalogue uses `YOUR ENERGIES`.
- [ ] Energy-card carousel shows the 5-dot progress + role badges + R/X layers + gate consistently.
- [ ] Descent/ascent transition specified and identical across the four screens.
- [ ] No italics; tab bar present on catalogue, absent on stacked drill-downs; no mock status bar.

## Out of scope
- The dominance-wheel math, final stem-seal art, reading copy.
