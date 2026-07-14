# Elementum · Answer-First Catalogue (design export)

Self-contained design mockups for the redesigned Reading-tab catalogue.
Open in any modern browser — no install, no server, no setup.

```
index.html    — Mockup B-02: the approved base direction (prescription
                inscribed into the identity plate; CSS-approximated art)
variants.html — Mockups C · D · E: three polished variants of the locked
                direction, built with PRODUCTION PNG ASSETS inlined
                (ink-wash dots, 庚 seal, element paintings, painted grounds,
                catalyst/friction brush arrows) and production copy verbatim.
                Variant E is live-interactive: tap wheel nodes / chips.
variants-2.html — Mockups F · G · H: the EQUAL-LOAD pivot. C–E led with the
                prescription; these rebalance to two equal chapters —
                identity (Day Master + core, strong keywords) FIRST, then
                prescription (need / don't). F evolves E (ship candidate),
                G evolves C (identity gate first), H states the thesis
                purest (four-line placard + twin Day Master/Prescription
                cards). F is live-interactive. Core keywords (Precision ·
                Standard · Edge) are placeholders pending the finessing pass.
layouts.html  — LAYOUTS M · N · O (CURRENT): the four locked components in
                three arrangements, unified against primitives-library.html
                (walnut archetype names, Cinzel pill-CTA, element eyebrows
                at the 80%-alpha step, italics as microcopy only) and the
                current-screens gallery. All clickable, all scrollable.
                M THE CLEARED DESK: identity leaves the scroll — a head
                pill / the seal / the "You are" stone open the shareable
                card as a FLOATING WINDOW (Share/Save/Copy); four lines as
                a 2x2 stones grid; tiles as a horizontal snap carousel.
                N THE ANCHOR WHEEL: wheel takes the hero slot; four lines
                as dd-card deed rows; identity as a blade bleed-banner;
                catalyst-spanning tile grid. O THE LEDGER: the four lines
                as a poster-scale engraved placard (best four-lines
                treatment); identity as a strip; energies as quiet rows.
                Recommendation: M structure + O placard, N as test control.
journey.html  — PROTOTYPE J-01 (CURRENT): the full reading journey as a
                CLICKABLE prototype — one phone, real navigation. Composes
                the four locked components: C1 the four-line summary,
                C2 the untouched dominance wheel (pips + thread overlay),
                C3 the shareable identity card (idmini -> Day Master page
                -> the built ShareCardOverlay, mirrored), C4 energy tiles
                (catalyst featured wide, all five descend to element
                reading pages with verdict / meaning / what-it-says-about-
                you layers, FACE_CARD teasers verbatim). Journey map on
                the sheet stays in sync with the phone and is itself
                clickable. Screenshot-verified across all screens.
h-library.html — Mockups K · L (CURRENT DIRECTION): H re-clothed in the
                established rendered-screens-v2 Library aesthetic. Same H
                information + hierarchy (identity → four lines → wheel →
                prescription → depth); dominance wheel + 庚 seal ring
                locked/untouched, H's ↑/↓ pips + catalyst thread kept on
                top. K RICE-PAPER BLEED: rice-paper plate, idmini Day
                Master card, kv four-line summary, bleed-list element rows
                that unfold their depth in place (accordion; wheel nodes
                open their row). L PAINTERLY DESTINATION: corner-quartet
                plate, blade-painting hero with 庚 hanzi + ring medallion,
                Library's "Your Catalyst" cardstock pattern + Friction
                twin, Feed/Ease checklists, live tap-the-wheel readout.
                Both scrollable, both fully interactive. Recommendation:
                K as the catalogue; L's hero + rx pair into the Day Master
                card redesign.
hanging-scroll.html — Mockup H-ART (SET ASIDE by owner): H rebuilt as an ink-wash art piece.
                The phone-as-hanging-scroll (立軸) insight: the wheel is the
                painting's subject; H's four summary lines become colophon
                (題跋) inscriptions in the negative space; the red chop seal
                用 stamps the prescription and the thread flows from stamp
                to catalyst; the missing element appears as a vision in the
                mist register. Real brush-sample paper/mist/gesture art +
                production dot/seal/element art. Wheel rule preserved
                exactly (size ∝ presence, seats by rank). Two directions:
                I · The Cover (frontispiece + "Open your catalogue" descent,
                entrance ceremony) and II · The Living Scroll (the catalogue
                embedded — a reading slip rewrites per tapped energy; fully
                interactive). Includes the three-composition exploration
                (colophon scroll CHOSEN vs full-bleed landscape vs enso
                orbit) with rationale. Recommendation: one design, two
                states — Cover at rest, slip on first node-tap.
```

## The locked direction (C·D·E)

**Catalyst and Friction are the core handles** by which the user grasps and
navigates their energy blueprint, phrased plainly as "the energy you need /
the energy you don't." Each variant leads with a different one of the three
questions — and answers all three:

1. **Meaning** — what do these energies mean to me? (representation and
   spirit, via painted art + the locked experiential lines)
2. **Verdict** — which is good/bad for me? (Catalyst vs Friction)
3. **Depth** — the deeper message (the face inside each element, with its
   representation word, strengths, and flaws)

- **C · The Two Gates** (verdict-led) — the catalogue opens as two painted
  doors; the catalyst gate carries the library's only full-color painting,
  friction sits ink-quiet: color itself is the verdict. Wheel demoted to
  evidence below.
- **D · The Scroll of Meaning** (meaning-led) — B-02's inscribed plate, the
  wheel, then five painted scripture bands ordered by prescription
  (catalyst → friction → core → rest), each: experiential meaning line →
  verdict sentence → "says about you" faces line → deeper-message descent.
- **E · The Compass** (navigation-led, interactive) — the wheel as an
  instrument: a seal-red thread (the one permitted chop-red accent) runs
  from the Day Master seal to the catalyst node; a readout card answers
  all three questions for the selected energy. Fits one viewport (the
  locked no-scroll catalogue rule survives).

## The second layer — faces as representations (NEEDS OWNER SIGN-OFF)

Per the earlier identity-card session, each Ten-God face carries a plain
one-word representation (confirmed example: **The Horizon = Enterprise**).
The other nine words below are DERIVED from the locked FACE_CARD keyword
sets (`src/content/reading/facesContent.js`) and must be confirmed or
replaced with the original session's list:

| Face | Representation | Keywords (locked) |
| --- | --- | --- |
| 比肩 The Twin | Selfhood | independent, resolute, self-made |
| 劫财 The Rival | Drive | driven, competitive, bold |
| 食神 The Artisan | Craft | fluent, generous, easeful |
| 伤官 The Virtuoso | Brilliance | brilliant, unruly, daring |
| 正财 The Steward | Security | steady, accruing, enduring |
| 偏财 The Horizon | **Enterprise** (confirmed) | expansive, sensing, distant |
| 七杀 The General | Challenge | forging, relentless, decisive |
| 正官 The Magistrate | Discipline | principled, measured, ordered |
| 偏印 The Alchemist | Intuition | intuitive, unorthodox, transmuting |
| 正印 The Sage | Wisdom | grounding, nurturing, patient |

This lexicon renders identically on the reading catalogue (the "says about
you" line per element) and the Day Master identity card.

---

## Mockup B-02 (`index.html`) — the base direction

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
