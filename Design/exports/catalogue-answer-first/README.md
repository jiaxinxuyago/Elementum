# Elementum · Answer-First Catalogue (design export · Mockup B-02)

Self-contained design mockup for the redesigned Reading-tab catalogue.
Open `index.html` in any modern browser — no install, no server, no setup.
No external assets: element marks are inlined SVG, the wheel nodes and stem
seal are CSS/typographic approximations of the painted art (see "Fidelity
notes" below).

## Why this redesign

User-test finding: users don't know where to start reading, and don't know
who they are (Day Master + dominance). The most-asked question is
**"what energy is good for me? I need to know the energy I need."**

The current catalogue answers "what are you made of" (presence-ranked wheel
+ shelf). This redesign inverts the reading order to **prescription →
evidence → elaboration**, keeping the vocabulary **Catalyst / Friction**
verbatim (concept-inventory canonical) and framing them plainly as
*"the energy you need"* / *"the energy you don't."*

## What the mockup shows

Two 390×844 phone states of the same surface, plus a design-notes rail and
a Kept / Changed / Open ledger. Reference chart: 庚 Yang Metal · The Blade
· concentrated (M40 · E30 · W20 · A10 · F0 — Fire missing *and* major
catalyst; Metal dominant *and* friction: the hardest honest case).

**Phone A — first viewport, zero taps**
1. Eyebrow: `YOUR READING`
2. **Identity plate, inscribed** (new — replaces boxed cards from B-01):
   name → pinyin line → an inscription band between hairlines (the reveal
   plate's own grammar) carrying the two verdicts:
   - ↑ **Fire** is your catalyst — **the energy you need**
   - ↓ **Earth** is your friction — **the energy you don't**
   Each line taps into that element's reading (`app-energy`); the name taps
   into the Day Master card (`app-daymaster`).
3. **Dominance wheel — geometry preserved** (size ∝ presence, seat = rank,
   per `DOMINANCE_WHEEL_RULES.md`), with a new **valence layer**: ↑/↓ pips
   on every node, lit rings on catalysts, friction a shade quieter, and
   the missing-major-catalyst node rendered dashed-hollow with the
   strongest halo.
4. Hint line: *"Size is how much you carry — ↑ and ↓ are what it does for you."*
5. The catalyst band header crops at the fold to invite the scroll.

**Phone B — scrolled**
The accordion spine shelf becomes **role-grouped row cards**:
`CATALYST — FEED THESE` (Fire ·Major·Missing·, Water, Wood) then
`FRICTION — EASE OFF` (Earth, Metal ·Your core·). Presence survives as
gauge + %; spine cap/pigment DNA carries over; hooks are rewritten from
the catalyst/friction angle.

## Structural decisions

- **DayMasterCta absorbed.** Identity moved above the wheel and became the
  prescription's frame. Its route survives twice: plate name + wheel
  center seal both open the Day Master card. Only one seal remains on the
  surface, so the reveal ceremony's gliding seal keeps a single landing spot.
- **Three doors, one room.** Prescription line, shelf row, and wheel node
  all resolve to the same element reading.
- **Nothing new computed.** All roles come from `engine/energyRoles.js`
  (`core/catalyst/friction/missing/ally`, `major`); the redesign only
  re-surfaces them.

## Surface area for implementation

| Mockup zone | Component(s) |
| --- | --- |
| Identity plate + inscription | new component; absorbs `DayMasterCta.jsx`; copy per stem × band |
| Wheel valence layer | `DominanceWheel.jsx` (+`reading.css`) — pips/halos only; `engine/dominanceWheel.js` untouched |
| Role-grouped shelf | `EnergyShelf.jsx` rework; `ENERGY_TILE` hooks re-angled in `content/reading/surfaceContent.js` |
| Surface assembly | `EnergyCatalogue.jsx`; reveal handoff in `RevealDissolve.jsx` |

## Open questions (carried in the ledger)

- **Balanced band** has no friction set (`energyRoles.js BAND_FAVOR`) —
  the pair needs a gentler register ("lean toward / lean away").
- **Catalyst not missing** — when the major catalyst is present, the
  Missing chip drops; verify the need-line still lands.
- **Word budgets** — all hooks/lines are filler-grade; production copy is
  per stem × band.
- **Reveal handoff** — the ceremony's plate should dissolve *into* this
  header (name + inscription persist while the seal glides to the wheel
  center); needs a motion pass.

## Fidelity notes

- Wheel nodes are CSS ink-wash approximations of the painted dot PNGs
  (`/concept-arts/dots/dotf-*.png`); production keeps the art.
- The stem seal is a typeset 庚 + drawn enso, standing in for
  `/concept-arts/stems/geng.png`.
- Fonts fall back to Georgia (no webfont fetch); production keeps
  EB Garamond / Cormorant Garamond.
- Node diameters/positions are computed from the real rule
  (`D_MIN 40 · D_MAX 64 · seats −90/−18/54/126/198 at scale 0.92`) — safe
  to measure against.

## Provenance

Authored 2026-07-05 from the design-iteration session on the
answer-first catalogue (option B, iteration 2 — prescription integrated
into the identity plate rather than boxed cards).
