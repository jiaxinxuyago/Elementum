# Elementum · Reading Catalogue & Identity Card Redesign
## Design Handoff — Answer-First Catalogue Exploration

**Status:** active exploration · current candidate **P-02** (`p2-consolidated.html`)
**Branch:** `claude/cloud-github-edits-1s7h92` · repo `jiaxinxuyago/Elementum`
**Reference chart used throughout:** 庚 Yang Metal · The Blade · concentrated ·
Metal 40 / Earth 30 / Wood 20 / Water 10 / **Fire 0 (missing)** — chosen because it
is the hardest honest case: the dominant element is the friction, and the missing
element is the major catalyst.

Every file here is a **self-contained HTML mockup** (all art base64-inlined).
Double-click to open in any browser — no server, no install. Files marked
*clickable* are working prototypes: taps navigate, modals open, content swaps.

---

## 1 · Purpose

**The user-test finding that started this work:** users landing on the Reading
tab did not know where to start reading, and did not know who they are (Day
Master + energy dominance). The most-asked question, verbatim:

> "So what energy is good for me? I need to know the energy I need."

The shipped catalogue answers a different question — *"what are you made of"*
(a presence-ranked wheel + shelf). This exploration redesigns the catalogue and
the identity card so the surface answers, in order:

1. **Who am I?** — Day Master + core energy, with strong keywords
2. **Which energy is good / bad for me?** — Catalyst vs Friction, phrased
   plainly as **"the energy you need / the energy you don't"**
3. **What do these energies mean, and what do they say about me?** —
   representation, personality, strengths, flaws
4. **What's the deeper message?** — descent into the full readings

## 2 · Locked decisions (do not relitigate)

| Decision | Detail |
| --- | --- |
| **Vocabulary** | `Catalyst` / `Friction`, verbatim. Plain framing "the energy you need / the energy you don't". Never surface 用神/忌神, "useful god", internal relation names (self/resource/output/wealth/officer), or banned terms ("Dominant Energies", "Forces in Motion", "Ten Gods", "Seven Killings", "Luck Cycle", "Seasonal Calibration"). |
| **Reading flow** | Identity first (Day Master + core, keywords), then prescription (need / don't), then depth. Equal cognitive load between identity and prescription — "a patient who doesn't know their symptoms can't trust the cure." |
| **Dominance wheel** | LOCKED. Size ∝ presence (D_MIN 40 → D_MAX 64), seats by rank (dominant at 12 o'clock, clockwise descending), ink-dot node art, 庚 enso seal ring at center. H's ↑/↓ valence pips + the seal-red catalyst thread are approved overlays ON the wheel — the wheel itself is never restyled. Engine source: `Elementum_App/src/engine/dominanceWheel.js` + `Design/exports/DOMINANCE_WHEEL_RULES.md`. |
| **Day master seal ring** | LOCKED design element (`concept-arts/stems/geng.png` family). The continuity object across plate → wheel center → identity card. |
| **Aesthetic** | The Library system, no new visual vocabulary. Sources of truth: `Design/assets/Library/primitives-library.html` (tokens, type, iconography, surfaces) and `Design/assets/Library/Elementum Screen Gallery_CurrentScreens.html` (screen aesthetics). Hanging-scroll art direction was explored and SET ASIDE by owner. |
| **No italics as display** | v2 rule: italic restricted to sub-headlines + microcopy only. |
| **Chop-red** | `--seal #A04030` maximum once per screen (the catalyst thread is that one use). |

## 3 · The four locked components

Everything from `journey.html` onward composes these four. Preserve them in any
future iteration:

- **C1 · The Four Lines** — the reading summary. Four verdicts of equal weight:
  *You are (The Blade) · Your core (Metal, concentrated) · You need (Fire) ·
  You ease (Earth)*. One card, never four separate cards (owner direction).
  Three approved text treatments exist (Couplet / Ledger / Cascade — see P-01);
  Couplet is studio-recommended, owner pick pending.
- **C2 · The Dominance Wheel** — the signature visual. Locked geometry + art;
  carries ↑/↓ pips per node and the seal-red thread from center seal to the
  major catalyst node. Nodes, seal, and (in list contexts) rows are all live
  navigation — "three doors, one room."
- **C3 · The Shareable Identity Card** — one design everywhere (owner call:
  "full card everywhere"): seal · mono eyebrow (`YOUR DAY MASTER · 庚 YANG
  METAL`) · archetype name in **walnut** · Cinzel pinyin · manifesto (always
  kept) · five-element distribution strip (dashed ghost segment for missing
  elements) · Core / ↑ Catalyst / ↓ Friction chips · keyword chips · Cinzel
  foundry mark. Opens as a **floating window** from a page-head pill, the wheel
  seal, or the "You are" line; carries Share / Save image / Copy link (mirrors
  the built `ShareCardOverlay` + `ShareIdentityCard`, 540×960 export).
- **C4 · The Energy Tiles** — five painted tiles/cards, prescription-ordered
  (feed first: Fire · Water · Wood, then ease: Earth · Metal), each descending
  to that element's detailed reading page (hero + verdict + meaning +
  "what it says about you").

## 4 · Design language quick reference

Extracted verbatim from the two Library sources (full ledger rendered inside
`p1-consolidated.html`):

| Role | Spec | Source |
| --- | --- | --- |
| Archetype display | Cormorant Garamond 38/400/ls0.5 · **walnut `#5a4430`** | primitives `.headline-pair .blade` |
| Card/hero names | Cormorant Garamond 22–26 / **500** | gallery `.fd-name`, `.htitle` |
| Manifesto | Cormorant Garamond *italic* 19/500 (scaled in-card) | primitives `.tagline` |
| Eyebrow (locked DOC5 §3) | EB Garamond 10/500/ls2.5 uppercase | primitives `.eyebrow` |
| Kicker keys ("YOU ARE") | Cinzel 10/400/ls2 uppercase | primitives `.kicker` |
| Pinyin | Cinzel 11/ls3 | gallery `.d13 .pinyin` |
| Foundry mark | Cinzel 10.5/ls2 + 8.5/ls3.5 | gallery `.foundry` |
| Body | EB Garamond 13.5 / 1.55 | both |
| Data / % | JetBrains Mono (700 nodes; 500/ls1 labels) | gallery `.node .pc` |
| CJK | Noto Serif TC/SC | both |
| CTA | Cinzel 12/ls4 on bronzeDark pill | primitives `.btn.pill-cta` |

Pigments, alpha ladder (10/1A/40/CC/100), spacing + radius scales, and the
3-surface taxonomy (cardstock / tinted×5 / quiet): see `primitives-library.html`.
Element pigments: metal `#8BA3B8/#6A849A` · wood `#7A9E6E/#587A4D` · fire
`#C4745A/#9E5540` · earth `#B89A6A/#927750` · water `#5A7FA8/#3E5F85` ·
up `#4a7a52` · down `#a85c48`.

**Copy is production copy, verbatim, wherever it exists.** Headlines ("The
forge you borrow, never own."), poetic tags ("Radiance · the rising heat"),
experiential meaning lines ("the room is different before you speak"), the
manifesto, the three claims, FACE_CARD keywords + teasers, foundry mark.
Sources: `Elementum_App/src/content/reading/*.js`, DOC2/DOC3.
**Core keywords (Precision · Standard · Edge) are PLACEHOLDERS** pending the
owner's finessing pass.

## 5 · Iteration history (oldest → newest)

Each file is a complete, openable snapshot of its stage. Read in this order to
understand why the current design looks the way it does.

### `index.html` — B-02 · "The Answer-First Catalogue" *(origin)*
Prescription promoted from a buried ribbon to the surface's opening statement,
inscribed into the identity plate (not boxed cards). Established: catalyst/
friction as first-viewport content, wheel valence layer (pips), "size is how
much you carry" hint. CSS-approximated art (pre-production-assets).
**Learned:** the inscribed-plate idea carried forward; the pure
prescription-first order later proved too prescriptive (see F–H).

### `variants.html` — C · D · E · three navigations *(clickable: E)*
First production-asset build (ink dots, 庚 seal, element paintings, painted
grounds, catalyst/friction brush arrows). Three leads: **C Two Gates**
(verdict-led painted doors), **D Scroll of Meaning** (meaning-led scripture
bands), **E Compass** (interactive wheel + readout). Introduced the
face-representation second layer (§7). **Owner:** leaned E, then C — but
diagnosed the whole batch as "prescription without symptoms."

### `variants-2.html` — F · G · H · the equal-load pivot *(clickable: F)*
Identity restored to equal weight; flow becomes *who you are + core first,
then prescription*. **F Anchored Compass** (E + first-class identity card),
**G Three Gates** (identity gate first), **H The Placard** (four equal lines +
twin cards). **Owner: picked H** — "prescriptive, self-explanatory,
hierarchically informative" — but demanded a real art direction on top of it.

### `hanging-scroll.html` — H-ART · the ink-wash colophon *(SET ASIDE)*
H recomposed as a hanging-scroll painting (colophon inscriptions, chop-seal 用
thread, mist vision of the missing element). Owner rejected the direction:
too far from the app's established aesthetic. **Kept for the record** — the
three-composition exploration and its rationale are documented inside.

### `h-library.html` — K · L · H in the house style *(clickable, scrollable)*
The corrective: H's exact hierarchy re-clothed in the **rendered-screens-v2
Library aesthetic** (plates, idmini card, painterly heroes, cardstock, bleed
rows). **K Rice-Paper Bleed** (catalogue-native, unfold-in-place rows) and
**L Painterly Destination** (blade-painting hero, "Your Catalyst" cardstock).
The idmini identity card from K is the card the owner later locked (screenshot
approval). First build with headless-browser screenshot verification.

### `journey.html` — J-01 · the full journey *(clickable prototype)*
The four components named and locked; built as one navigable phone:
Catalogue → Day Master page → share sheet (mirroring the built
`ShareCardOverlay`) → element reading pages ×5 (verdict / meaning / says-about-
you with FACE_CARD teasers verbatim). Journey map on the sheet syncs with and
drives the phone. This file defines the **target IA**.

### `layouts.html` — M · N · O · layout variations *(clickable)*
Same components, three arrangements, primitives-unified. **M Cleared Desk**
(identity leaves the scroll → floating card window; stones grid; tile
carousel), **N Anchor Wheel** (wheel-first), **O The Ledger** (four lines as a
poster placard). Studio call: M's structure + O's placard.

### `p1-consolidated.html` — P-01 · consolidated candidate *(clickable)*
The consolidation: M's structure · the rich identity card (owner's screenshot)
as ONE design in-app and in-export · the four lines as ONE card with **three
switchable layouts** (Couplet 對聯 / Ledger / Cascade — live switcher on the
sheet, owner pick pending) · full font audit applied and documented.

### `p2-consolidated.html` — **P-02 · CURRENT CANDIDATE** *(clickable)*
Iterates P-01 against open questions 1, 4, 5 (2 / 3 / 6 / 7 untouched, pending
owner). Locked elements untouched: dominance wheel + 庚 seal ring, ↑/↓ pips,
the single seal-red catalyst thread, the rich identity card, the energy tiles.
- **Four-lines switcher polished, all three kept** (owner directive: build all
  three, then pick). The **Couplet** was rebuilt from two independent flex
  columns into a true 2-row × 3-col grid with a continuous hairline spine, so
  *You are ↔ You need* and *Your core ↔ You ease* now share a baseline and the
  ↑/↓ pips sit centered on the spine — "symmetry is the meaning" now holds
  literally. Ledger and Cascade left as-is (already production-clean).
- **Balanced-band register specified** (Q4). New documented component state:
  when `energyRoles.js` returns a balanced chart, *You need / You ease* soften
  to **Lean toward / Lean away**, pips render **dashed**, and verbs turn
  advisory ("a little more would steady you" / "already ample — no need to
  press") rather than corrective.
- **Catalyst-present-not-missing state specified** (Q5). When the major
  catalyst is already in the chart, the **MISSING** chip drops and the % shows
  real presence; the need-line still lands on the ↑ MAJOR marker + "the energy
  you need" framing (e.g. `FIRE · 15% · ↑ CATALYST` — "present but thin — feed
  it further"). A solid ↑ pip distinguishes a real catalyst from a dashed lean.
- The two new states are documented in the sheet's spec column (right of the
  phone), not wired as a live chart-state toggle on the phone — scope held to
  the catalogue / identity card / element-reading surfaces per owner. A live
  toggle can be added on request.
- Verified with headless screenshots across all three four-lines layouts, both
  new state cards, the Fire element reading, and the identity-card overlay.

**P-02a (in-session revisions):** owner selected the **Ledger** as the four-lines
layout ("shows who you are most explicitly"). Ledger is now the default; it
gained an element-icon chip + a per-line presence bar and **all CJK was removed
from the four-lines card**, replaced by the element-mark iconography (Couplet /
Cascade also de-CJK'd with small inline marks, kept in the switcher for now).
The catalogue header was changed to the current-screens **"YOUR READING"**
eyebrow (the "Readings" title + share pill retired; identity card still opens
from the wheel seal and the "You are" line).

### `p3-catalogue.html` — **P-03 · CURRENT CANDIDATE** *(clickable)* · page re-graphed
The four lines are un-boxed and the page re-composed as a graphic designer would:
- **"You are" promoted to a hero above the wheel** (read first). Two switchable
  treatments — **The Chop** (owner pick: manifesto-forward, seal-red rule, seal
  as a stamp) and **The Banner** (slim band). Carries the official 庚 day-master
  seal (`assets/geng-seal.png`, the ceremonial ink-wash icon), walnut archetype,
  manifesto, Precision/Standard/Edge keywords, a Core chip, and the **unified
  black-circle read button → the Day Master page**.
- **Core / Need / Ease became prescription chip-rows below the wheel**: element-
  icon chip + name + a **filled ↑ Catalyst (green) / ↓ Friction (red) / Core
  (ink)** word-pill + a **plain-language verdict line** explaining why the energy
  is needed or not (the human gloss on catalyst/friction).
- **No italic** anywhere (manifesto set regular Cormorant); catalyst/friction
  chips follow the D13 `.fd-role` filled-pill spec.
- A **Day Master reading screen** was added (seal hero + who-you-are + need/ease
  prescription) as the read-arrow destination, mirroring the current-screens
  Day Master page.
- Five energy tiles kept below for browse-all. Locked wheel + 庚 seal + pips +
  seal-red thread untouched.
- **Five energies:** carousel replaced with the **current-screens expandable
  dominance pills** (spine shelf ported from `d13-v5.css`) — collapsed pills show
  the element mark + presence gauge + vertical %, one open at a time (Metal, the
  dominant/core, open by default), each opening to art + eyebrow + hook + role
  glyph + the unified black-circle read button. Fire renders ghosted with the
  major-catalyst ring. Companion board `identity-hero-variants.html` holds all
  five hero explorations.
- **Wheel — faithful replication done (from source, not pixels).** Source of
  truth located: `Design/exports/DOMINANCE_WHEEL_RULES.md` + `d13-v5.js` (the
  live implementation). Audit result: geometry already canonical — disk rule
  d(p)=40+24·(p/pMax) at scale 0.92 → ⌀59/53/48/42/37, presence seating
  (dominant top, clockwise descending), fixed icon+% content size, 276px enso
  seal. Deviations fixed: plate bleed inset −22%, hover 1.05, transition 140ms;
  **Metal's wrong ↓ friction pip corrected to a Core glyph** (matches shelf +
  prescription rows); **↑/↓ role pips moved to sit centered below each ink-dot**
  (Jason's request). Red catalyst thread + ghost thread kept (locked overlays).
- **Wheel — full restore to the reference (owner inline comments, P-03c).**
  Removed ALL non-canonical overlays the exploration had accrued: the
  catalyst/friction halo circles around ink-dots, the seal-red relationship
  thread to the Day Master seal (and its ghost twin), and Fire's dashed
  hollow contour — Fire is now a plain ink dot like the others. The wheel is
  now verbatim: enso seal + five watercolor ink-dots (icon + %) only, plus the
  ↑/↓ role pips below each dot (Jason's requested addition — flag if these
  should go too).
- **Wheel + tiles — pixel-verbatim pass against the reference of record**
  (`Elementum -The Reveal Journey and Reading Catalogue.html` = D13 wireframe
  v5; canonical P3 screen). Wheel: container 320×300, center seal 276px at
  (18.4, 9.2), Metal node top −3.7, non-canonical dashed ghost thread removed
  (red catalyst thread kept — locked overlay), role pips below dots kept
  (approved addition). Tiles: decision on the owner's question — **yes, the
  reference cards carry dominance bars**; ported verbatim into every expanded
  pill: the five-segment **sp-track** stacked bar (current element full pigment
  + white inset, others 40% mix, missing Fire a hatched ghost sliver), labeled
  **role chips** (Core / ↑ Catalyst / ↓ Friction / Missing), **pole line**
  ("Refinement · the edge"), and the open-latch **notch**. Collapsed gauge fills
  normalized to p/pMax·84 per the reference. Black-circle read button kept per
  the unified-read-button rule (overrides the reference's pill-style read).

### P-06b — shelf as sole index, two-level affordance (owner call)
Owner ruled the reading index and the persistent read circles double-served
the catalogue; the index is removed and the shelf is the sole depth entry.
Per owner: **no pill expanded by default**; collapsed pills carry an
**outlined unfold chevron** (secondary affordance — previews) instead of a
read arrow; the **filled black arrow circle** lives only inside the unfolded
pill (primary — navigates). Hint copy teaches the two steps. Design note on
file: if first-time comprehension dips, re-opening the Core pill by default
is a one-line revert.

### P-09 — The Inscription (approved pitch: wheel-borne diagnosis)
Research round (DES_12 §3/§5c/§4c + DES_08 law + market sources on the
strong/weak mislabel trap). Pitch approved: boxes retired — Core/Condition/
Approach are properties OF the wheel (L1 gestalt), so they render as the
painting's inscription 畫題: three inked clauses beneath the wheel, sentence
grammar only (no Condition/Approach labels — ladder rule), each tap unfolding
its §5c locked definition line, one at a time. "Your core is Metal — the
Blade's own element" (tap pulses seal + Metal node — transient, wheel design
untouched) · "It runs Charged — more feeds it than it spends" · "So Channel
it — aim the surplus, don't add to it ↓" (points into the prescription).
Lines ink in staggered as the beat enters. Hero reset to pure identity (seal,
name, manifesto, keywords, read, share — owner delegated, chosen to avoid
duplicating the core fact). Three placement variants switchable: **The
Caption** (beneath, default) · **The Orbit** (verdict arcs the lower rim) ·
**The Colophon** (vertical margin marks, right shoulder; taps lift the slip).
Eliminated: %, bar, vessel/gate glyphs on this surface, tile band, labels.

### P-08 — icon tile band (Icon Stack locked, horizontal)
Owner locked the **Icon Stack** over Ledger Fold / Twin Panel / Paper Slip and
asked for the three concepts as horizontal tiles. New **icon language** on
file: conditions as a vessel's fill (Charged = full + radiating ticks ·
Balanced = level line · Receptive = dashed open + low pool); approaches as
flow (Channel = arrow through a gate · Fuel = arrow feeding a core). The band:
Core · Condition · Approach left→right, one anatomy per tile — seal-chip icon,
label, value, spectrum strip (dominance bar / 3 vessel states / 2 flow states,
current inked, others ghosted), unfold chevron. Three switchable expansion
mechanics: **The Apron** (shared drawer beneath, caret to the open tile),
**The Paper Slip** (floating slip per concept), **The Accordion** (tile widens,
others tuck to slim seals — echoes the energy shelf). Old constructions
retired.

### P-07 — the reveal arc (owner flow restructure)
Reading flow re-sequenced as a step-by-step reveal: (1) **consolidated You Are
card** — seal, name, manifesto, keyword chips, read circle, plus the Core
inside the hero: Metal 40% row + one-line verdict **Condition: Charged ·
Approach: Channel** (chevron expands the two plain-language explanations;
Fire teaser cut — no element named before the blueprint); (2) standalone Core
tile removed from the diagnosis beat; (3) wheel introduced by **YOUR FIVE
ENERGIES** eyebrow as the Energy Blueprint; (4) prescription captions reduced
to relation nouns only (your Duty / Drive / Voice / Root / Core); Metal keeps
its Don't Need row (data completeness, owner call). Bridges re-copied for the
arc ("What does your energy look like?"). Identity-card entry points: wheel
seal + round share button on the hero. Earlier interactions unchanged
(dot → panel stroke → pill expand; tile → pill; pill accordion).

### P-06 — reading index + spine read circles (feedback 3, A+B combo)
Owner locked the **Columns** prescription layout (Catalyst left · Friction
right) as default. Depth-entry flow fixed with the approved A+B combo, bare
icon circles, Core → Catalyst → Friction order:
- **A · Role-led reading index** above the shelf ("READ YOUR ENERGIES · START
  WHERE IT MATTERS"): three full-width rows — YOUR CORE · Metal 40% / THE
  ENERGY YOU NEED · Fire 0% / THE ENERGY YOU EASE · Earth 30% — each with the
  element chip, role eyebrow, and a black read circle straight into the reading.
- **B · Persistent read circles on collapsed pills**: every spine carries a
  small black circle at its base (tap = read directly; tapping the pill body
  still previews); shelf hint now says so. Expanded pill keeps its circle.
Blooms extend behind index rows.

### P-05b — boxed Core + condition/approach lines + identity-card button
Owner feedback: (1) **shareable identity card button** added to the hero foot
(share glyph + "Identity card", opens the floating share card via data-float);
(2) Core section **boxed into one tile**; the 3 adjective chips removed
(repetitive against the Day-Master tile chips) and replaced with two labeled
descriptor lines — **Energy condition · Charged** (locked §5c definition) and
**Approach · Channel** (why/how + "Fire is where it lands"); the core row
returns to strict glance grammar (**Independence — your Core**), Channel chip
retired from the row (lives in the Approach line). Feedback (3) — reading-
affordance redesign for the five-energy shelf — pending owner direction (see
proposals in session).

### P-05 — Wash Bloom locked + Metal-in-Friction data fix + Columns variant
Owner locked **Wash Bloom** (polish: chop-red hero breath dropped, uniform
subtle blooms, blooms behind every prescription row incl. Core; wheel underwash
stays neutral bronze). **Data fix (owner):** for a Charged chart the self-
element is itself friction — **Metal 40% joins the You Don't group, ordered
above Earth 30%**, as a full row tagged **"Your Core"** (register verdict line:
"Independence — don't feed a full core"). Applied in both layouts. New
switchable **Columns** variant: Catalyst left / Friction right as two parallel
boxed paper tiles (owner: boxes read better for the parallel pair), compact
two-line rows, blooms behind rows; stacked Register stays the default. Compass
journey cues rows in either layout.

### P-04 — LOCKED COMBO + art-fidelity variants
Owner locked: **The Chop** hero · **The Register** prescription · **The
Compass** journey. All other variant switchers removed from the aside (their
inert DOM remains, unreachable, for cheap rollback). New round: three
**art-fidelity treatments** on the locked base, switchable beside the phone:
- **1 · The Silk Thread** (default) — a hairline thread down the page spine,
  silk-fading rules, double-rule under the hero; ornament by line, not fill.
- **2 · The Wash Bloom** — element pigment blooms behind each register line,
  a warm wash gathers under the wheel, faint chop-red breath behind the
  manifesto.
- **3 · The Painted Plates** — the seal chips become miniature painted plates
  (the journey watercolor art in rounded tiles), echoing the energy shelf.
Wheel untouched in all three (washes sit behind it, never on it).

### P-03h — journey flows + balanced diagnosis (owner feedback round)
Three feedbacks addressed:
1. **Balance/consistency:** the Core section dropped its large card and now
   shares the exact register grammar of You Need / You Don't — same eyebrow,
   same row (chip · name · % · glance), keeping per owner spec: verdict
   (**Charged**), **Channel** chip, 3 personality keywords (Self-reliant ·
   Steady · Unshakeable, §4b 比肩 catalyst-pole v3 chips), and the 5-segment
   condition track.
2. **Font law:** section headers were JetBrains Mono (a violation — mono is
   data-only); now the locked DES_04 §3 eyebrow (EB Garamond 10/500/ls 2.5,
   pigment @80%).
3. **Journey (the big one):** page beats wrapped as Who you are → What runs
   you → What you need → Read each energy, with a **journey switcher**:
   **1 · The Ink Scroll** (default) — beats ink in on scroll (reduced-motion
   safe), a question bridge under each section hands off attention ("What
   energy runs you?" ↓); **2 · The Dealt Reading** — hard-gated ceremony:
   hero alone + one Cinzel pill deals each next beat; **3 · The Compass** —
   wheel as hub: first tap on a node lights + scrolls to its prescription
   line, second tap opens the reading.
Also: Scroll Band treatment retired (Register + Ink Wash kept, both switchable).
**Iteration suggestions:** pick a flow (or Ink Scroll default + Compass always-on
as overlay); decide if Dealt gating is first-visit-only (needs a account-state
flag); extend the journey into the element pages (entry transition + "next
energy" chaining) as the following round.

### P-03g — un-boxed prescription, three new treatments (owner feedback on P-03f)
Feedback absorbed: (1) circular medallions retired — standard element icons in
the shelf's rounded seal chips, or plain brush icons; no circles anywhere;
(2) every energy is ONE aligned line (grid: chip · name · % · glance label);
(3) boxes/cards removed — the section prints on the rice paper like the wheel.
Three treatments in the switcher: **1 · The Register** (seal chips, hairline
group rules), **2 · The Ink Wash** (plain ink icons, each element's watercolor
bleeding softly behind its line via radial mask), **3 · The Scroll Band** (one
horizontal band, brush icons over faint washes, fading hairline divider —
closest to the wheel's language). Old Paper Boxes / Art Panels / Altar panes
replaced.

### P-03f — three prescription treatments (switcher beside the phone)
Same simplified content in three presentations, owner to pick:
**1 · Paper Boxes** (P-03e baseline) — two parallel cardstock boxes, medallion
rows. **2 · Art Panels** — full-bleed watercolor element panels, text floats on
a silk fade. **3 · The Altar** — un-boxed medallion strip printed on the rice
paper, hairline dividing need from don't. Switch via data-rxopt radiogroup;
stamp/content otherwise unchanged.

### P-03e — simplification pass (owner: "simplicity in content, enrichment in art")
You Need / You Don't became **two parallel boxes**: the Catalyst / Friction
role pill names the family ONCE per box header; each element is one row —
**watercolor element medallion** (the journey art, ghosted for missing Fire) +
name + % + one glance label (**[Keyword] — your [Relation]**). Removed per-row:
adjective chips, pole nouns, role verbs, mini bars, repeated role pills, read
circles (whole row taps through). Core tile unchanged.

### P-03d — prescriptive verdict tiles (DES_12/DES_08 vocabulary integration)
The three chip-rows below the wheel became **three stacked verdict tiles**
(Core → You Need → You Don't), diagnosis-first, per the owner dispatch:
- **Your Core (Metal 40%):** verdict **Charged** (§5c OWNER-LOCKED display term;
  the earlier "Overpowering" pick is superseded — DES_12 records it as REJECTED)
  + its mandatory definition line, five-segment dominance track, glance chip
  **"Independence — your Core"**, and the locked remedy verb **Channel** with its
  definition line ("…Fire is where it lands"). Receptive charts swap in
  Receptive + **Fuel**; Balanced reads Balanced (protect the equilibrium).
- **You Need (↑ Catalyst ×3):** all catalysts shown — Fire 0% ↑ MAJOR, Wood 20%,
  Water 10% — each with element sign, %, mini presence bar, glance label
  ([Keyword] — your [Relation]: Force—Duty · Caution—Drive · Flow—Voice, v3
  keywords), §4b catalyst pole noun + 3 v3 adjectives (Command: Decisive ·
  Cool-headed · Battle-ready / Security / Grace), and the role verb chip
  (Borrow it / Feed it).
- **You Don't (↓ Friction):** Earth 30% — Insight—your Root, friction pole
  **Distance** (Aloof · Overthinking · Shut-off), verb **Loosen it**.
- Vocabulary law held: no engine terms, no banned aliases, CJK decorative only,
  personas not surfaced on tiles (no definition-line burden), grade-6/7 copy.
- Open forks inherited from §5b (Drive vs Harvest · Duty vs Trial) — tiles use
  Drive/Duty per the §5 directive example; swap on lock.

### P-09d — the meaning layer in the pills (DES_12 integration)
Teammate dispatch executed against the two source-of-truth docs (DES_12 Identity
Vocabulary · DES_08 Concept Inventory — no invented words):
- **Collapsed spines** carry the face keyword under the relation noun; the
  closed shelf reads as the A-12345 string: CORE Independence · ROOT Insight ·
  DRIVE Caution · VOICE Flow · DUTY Force (v3 registers: Caution/Flow per §4c;
  lead gods 比肩·偏印·正财·食神·七杀 for the 庚 reference chart).
- **Expanded cards** follow §4b anatomy: glance label "[Keyword] — your
  [Relation]" · verdict "[connector] [pole noun] · [role verb]" (catalysts
  "rising toward Security/Grace/Command · feed it / keep it close / borrow it";
  frictions "curdling into Isolation/Distance · channel it / loosen it" — pole
  nouns v3: Distance; channel/fuel per §5c) · legacy hook demoted to italic
  flavor microcopy · black read circle unchanged.
- Personas (The Twin … The General) stay on the reading pages per the
  three-layer rule; tiles show the lead face only (engine: leadGod → keyword).

### P-09f — §5c re-lock applied + two-line fold diagnosis
DES_12 §5c was RE-LOCKED 2026-07-16: Overfueled / Balanced / Underfueled +
Channel / Refill (supersedes Charged/Receptive/Fuel). Applied across the sheet:
inscription clause ("It runs Overfueled — more comes in than it burns"), its
unfold definition (locked def text: "More fuel comes in than your core burns —
the surplus wants somewhere to go. Built into your chart, not today's mood."),
line 3 tail per the template ("aim the surplus, don't add to it"), orbit arc.
The Folio's folded face is now the owner-requested two-line conclusive
diagnosis: "Your Core Energy is Metal / It runs Overfueled — more comes in
than it burns."
**Flagged, not applied (ask owner):** §5c re-lock also specifies verb-derived
prescription panel headers for an Overfueled chart — CHANNEL INTO THESE /
DON'T ADD THESE (and the identity suffix "The Blade · Overfueled" on the
identity header). Both would replace the current YOU NEED · CATALYST /
DON'T NEED · FRICTION headers — awaiting owner call.

### P-09h — prescription panel headers re-worded (owner)
YOU NEED · CATALYST / DON'T NEED · FRICTION → **SEEK THESE · CATALYST /
SKIP THESE · FRICTION** (owner pick 2026-07-16; supersedes the flagged
CHANNEL INTO THESE / DON'T ADD THESE candidates from the §5c re-lock).

### P-09i — Folio sealed; ? → Codex
The Folio tile is no longer expandable: the three-clause paragraph and its
unfold definitions are removed from the folio carriage (the Caption carriage
keeps them). The chevron is replaced by a ?-circle that leads to the Codex
page (deeper knowledge feature — surface not in this mock; the button is the
affordance only). Fold face stays the two-line conclusive diagnosis with the
OVERFUELED chip.

### P-10 — catalogue doors (affordance fix; owner-picked A/B/C as variants)
Problem: readings were the last beat, reachable only via scroll → expand pill →
find read circle. Principle: every element mention is a door; one door always
on screen. Three switchable variants (owner to pick):
- **A · Spine Rail** (default) — sticky top rail of five vial-chips (element
  mark + keyword, dominance as pigment fill inside the chip; Fire dashed ghost
  at 0%); 1 tap → reading, from any scroll depth.
- **B · Tap = Read** — collapsed pills and prescription rows open readings
  directly (guided-expand intermediate skipped); the expanded preview survives
  behind the pill chevron only. Reading pages already open on their verdict
  card, so no content was lost.
- **C · Seal Dock** — same five chips pinned at the phone's bottom edge
  (sticky), a second tab bar: function pinned, narrative scrolls behind.
Doors reuse the existing element-reading navigation; wheel/Compass unchanged.

### P4-01 — `p4-grand.html` — THE GRAND COMPARISON (new file; p3 kept as archive)
Owner consolidation: two finalist versions, switchable —
- **V1 · The Towers + The Seal Dock** (default): vertical shelf; dock chips
  carry the §5b relation nouns (Core · Root · Drive · Voice · Duty) with
  dominance as pigment fill. NEW hand-off motion: an IntersectionObserver
  watches the shelf against the dock's band — when the towers emerge above the
  dock, the chips lift (staggered 40ms) and the dock dissolves into the pills
  (reduced-motion safe); scrolling back re-summons it.
- **V2 · The Rows + Tap = Read**: horizontal pills, tap opens the reading
  directly; expand-preview behind the chevron only; no dock — rows are the index.
Retired from competition (markup removed): the Register and Ink Wash
prescription panes (Columns locked), the Caption carriage (Folio locked), the
Spine Rail, and all four per-component switchers.

### P4-02 — V1 (Towers + Seal Dock) wins · the dock↔pill state loop
Owner picked V1. New interaction contract, one shared boundary (the dock band):
- **Select from the dock or a wheel dot** → glide to the shelf and unfold that
  pill (same expandPill transition + beckon for both entries; dock chips now
  intercept in capture phase like the dots — no direct-to-reading jump in V1).
- **Scroll up above the tiles** → any open pill refolds (height/flex transition)
  and the dock re-summons — symmetric with dock-merge, so every re-entry
  starts folded and the unfold transition can replay. V2 (rows + tap=read)
  unchanged as the comparison foil.

### P5 — ink-wash PNG pass (withdrawn)
An ink-wash beautification pass (PNG brush rules / mist horizon / calligraphic
wave from assets/Moodboards/brush-samples) was built as p5a/p5b variants and
REJECTED by the owner on review — direction withdrawn, files removed.
p4-grand.html (untouched throughout) remains the current candidate. Processed
brush assets kept in art/ink/proc/ in case the direction returns.

### P6 — the journey: Reveal → Dissolve → Catalogue → Reading
Locked to The Towers + The Seal Dock (Rows retired in this file). New
`p6-journey.html` (p4 preserved) builds D13 Part-1's P1/P2 onto the locked
catalogue, per owner answers:
- **The Naming (reveal)**: TenStems official Gēng painting, painted in stroke
  by stroke (5 masked brush wipes, alternating direction, ~2.5s, wash
  under-drawing first), then the seal stamps (320ms), then Cinzel pinyin →
  name → manifesto (production copy verbatim) → CAST foundry line. Tap =
  skip; reduced motion = finished plate. Ceremony owns the screen — no tab UI.
- **The Dissolve**: drag (scroll-linked, reversible, springs back) or tap the
  hint. The reveal seal detaches as a ghost and travels to the wheel's axis;
  the catalogue beneath is pre-centered on the wheel; on landing the center
  seal pulses and the five dots ink in one by one — Core first, then
  clockwise (Metal → Earth → Wood → Water → Fire), each with a wash bloom —
  then the page breathes back to the top (identity-first preserved).
- **Reading**: read circles / dock seals / wheel dots land in the existing
  element reading screens — the journey completes end-to-end.
- **Sheet spec sections**: ten-stem wheel gallery (locked wheel verbatim, stem
  sign swapped in the seal; Gēng carries the real seal art, other nine are
  typographic stand-ins pending foundry renders), tile closed→open anatomy
  note, and the full iconography legend (elements, roles + MISSING, condition,
  approach, balanced-band lean pips, affordances).
- Flag: the reference handoff predates the vocabulary law and says
  "Resistance" — this build keeps the locked **Friction** register.

### P6.1 — reveal fixes after owner review
Owner review found: reveal not visible, wheel dots missing, wrong background.
Root causes + fixes:
- **Ceremony played at page load** (before the viewer scrolled to the phone) —
  now gated on visibility (IntersectionObserver adds .play at 35% in view).
- **Masked-wipe strokes were fragile** (CSS mask animation stuck → invisible
  painting) — replaced with interpolated clip-path inset wipes; same
  stroke-by-stroke choreography, no masks, degrades safely.
- **Reloads stranded a dotless wheel** (wpre with no intro) — the Naming is
  now truly first-run-only: completion persists (localStorage), returning
  visits land straight on the catalogue with dots visible; a "Replay the
  first-run ceremony" control on the sheet clears the memory.
- **Background** now the official reveal scene (bg-reveal-01-distant-peaks
  from assets/backgrounds), per the reference P1 painted-scene slot.
- Tap once mid-ceremony = skip to the finished plate; tap again = continue.

### P6.2 — benchmark fidelity pass against the reference
Scanned the reference (Reveal Journey + Reading Catalogue v5) region by
region in-browser and matched:
- **Round wash medallions** — all ten stem PNGs re-processed (paper
  normalized to white per-channel, circular smoothstep vignette 40→50%
  radius) so every painting melts into any ground with no plate edges;
  reveal + gallery now use art/stems/proc/*.
- **Reveal plate composition** per reference P1: painting medallion → The
  Blade → GĒNG · YANG METAL (bronze Cinzel) → "Precision before intention"
  kicker → hairline → poetic line ("You say what others soften — and pay,
  quietly, for being the one who did." — reference production copy) → CAST
  foundry line → dashed ring-peek arc at the foot (KF-1 "ring peek").
- Stroke wipes, dissolve, dot intro unchanged.

### P6.3 — motion register per owner (ink, not effects)
- Reveal: stroke wipes replaced by the reference's soft **ink dissolve** — the
  day master image fades in from a wet blur (2.1s), wash ghost first, seal
  stamp unchanged.
- Dissolve: the ghost is now the **day master image itself**, descending from
  the plate to the wheel's center (no chop badge, no shadow ring); the seal
  pulse ring on landing removed.
- Dot intro: pure brush fades — opacity + slight wet-blur per dot, Core first
  then clockwise; no scale pops, no shadow ripples, no rings.

### P6.4 — motion pass 2
- Reveal dissolve tightened to 1.3s (cascade retimed; ceremony ≈2.6s total).
- The day master is now ONE continuous object: the catalogue wheel's center
  art stays hidden (wpre) while the reveal's image descends; on landing the
  ghost is removed and the wheel art appears in the same frame at the same
  rect — no double image, no crossfade.

### P6.5 — backgrounds matched to the reference, pixel-verbatim
Parsed the reference bundle's manifest + template; fingerprint-matched its
embedded grounds against assets/backgrounds (distance 0, same 390×844):
- Naming screen = plate-blank gradient + **bg-reveal-01-distant-peaks** (top
  50%, masked to bottom) + **bg-reveal-02-floating-island** (bottom 50%,
  multiply 0.72, masked to top) + the CSS fog band (blur 20) — rules verbatim.
- Reading Catalogue ground = **bg-energymap-01-top-band** at 0.82 + the cool
  radial pagetint, replacing the rice-paper plate.
- Day-master / element reading screens keep current grounds (reference part 2
  owns those).

## 6 · Implementation mapping (for the build agent)

| Mockup element | Production component |
| --- | --- |
| Catalogue surface | `Elementum_App/src/components/reading/EnergyCatalogue.jsx` |
| Wheel + pips/thread overlay | `DominanceWheel.jsx` (overlay only; `engine/dominanceWheel.js` untouched) |
| Four-lines card | new component; data from `buildEnergyChart.js` + `energyRoles.js` |
| Identity card / floating share | `ShareCardOverlay.jsx` + `ShareIdentityCard.jsx` (extend with chart + chips), entry pill in catalogue header |
| Energy tiles | `EnergyShelf.jsx` successor; art keys from `content/reading/surfaceContent.js` `ENERGY_TILE` |
| Element reading pages | `ReadingFacesScreen.jsx` (verdict/meaning/says layers) |
| Day Master page | `ReadingDayMasterScreen.jsx` (L's blade hero + claims + prescription pair) |
| Roles/verdicts | ALL computed by `engine/energyRoles.js` — nothing new is calculated |

## 7 · The second layer — face representations (NEEDS OWNER SIGN-OFF)

Each Ten-God face carries a one-word representation (owner-confirmed example:
**The Horizon = Enterprise**). The other nine are DERIVED from locked FACE_CARD
keywords and must be confirmed or replaced with the owner's original list:

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

Renders as the "Says about you: **The General** · CHALLENGE — forging,
relentless, decisive" line on element readings and (future) the Day Master card.

## 8 · Open questions

1. **Four-lines layout pick** — Couplet vs Ledger vs Cascade (P-01 switcher).
2. **Representation lexicon sign-off** — §7.
3. **Core keywords** — Precision · Standard · Edge are placeholders.
4. **Balanced band register** — `energyRoles.js` gives balanced charts no
   friction set; the need/don't pair requires gentler copy ("lean toward /
   lean away") for that band.
5. **Catalyst-not-missing case** — when the major catalyst is present in the
   chart, the MISSING chip drops; verify the need-line still lands.
6. **Navigate-to-depth vs unfold-in-place** — J-01/P-01's page descents vs K's
   accordion rows; user-test question.
7. **Reveal handoff** — the onboarding ceremony should land on this catalogue;
   the plate-dissolve beat ("You are The Blade. What you need is Fire.") is
   proposed, unmocked.

## 9 · Asset & method notes

- Painted assets inlined from production: `Elementum_App/public/concept-arts/`
  (dots, stems, library tiles), `public/backgrounds/` (plates), Library
  `rendered-screens-v2/art/` (blade painting `metal-geng.png`, forces arrows
  `cat-forces.png`). Tiles/plates are downscaled JPEG-on-silk (~20–50 KB each);
  dots and the seal keep PNG alpha.
- Google Fonts are linked in each file's head; offline they fall back to
  Georgia — open online once for true typography.
- Every clickable build since K/L was **verified with headless-Chromium
  screenshots** (all screens + interaction states) before delivery. Keep that
  bar: don't hand off unrendered HTML.
- The wheel node coordinates in the mockups are the real rule at scale 0.92:
  diameters 59/53/48/42/37, seats −90°/−18°/54°/126°/198°, container 320×292.

## 10 · Provenance

Built July 2026 in the "Identity Card Re-design · Catalyst vs Friction
Direction" working session, from the owner's user-test findings, on branch
`claude/cloud-github-edits-1s7h92`. Companion design docs:
`Documents/Designengineering/DOC1–DOC10`, `READING_CONCEPT_INVENTORY.md`,
`Design/Wireframes/CLAUDE_DESIGN_BRIEF_d13-journey.md`,
`Design/handoff-claude-design/00-MASTER-CONTEXT.md`.


### P6.6 — handoff breakdown boards (in-file, live-cloned)
For the Claude Code implementation handoff + art-iteration passes, the sheet
now ends with three static boards, each CLONED FROM THE LIVE BUILD at load
(comment anchors + om-ids stripped, shells inert) so they can never drift:
- **Breakdown 01 · The Naming** — reveal frozen at its finished frame; 12
  numbered badges (grounds, fog, painting, seal, name line, stem line, kicker,
  manifesto, cast line, swipe affordance).
- **Breakdown 02 · The Catalogue, full scroll** — the whole page flat, every
  beat inked, dock un-stickied to its natural spot; C1–C6 + chrome badged.
- **Breakdown 03 · The Energy Tile** — closed + open anatomy with every
  text/data field numbered and its locked value in the rail (rank noun,
  keyword, %, role, hook, verdict, flavor, read circle), then MOTION STATES
  frozen per animated box with exact class recipes: Folio folded /
  .folio-open / definition open; pill arrival (.spine.open.beckon, 1100ms)
  + scroll-up refold; row ink-stroke cue (.ik-row.cue, settles 0.6);
  seal-dock chip anatomy (.ca-fill height = %).
The boards are BAKED into static markup (no runtime cloning — the page got too
heavy for live clone-building); only a light badge-placement script runs at
load. Duplicate ids were eliminated: id-scoped CSS was converted to
[data-css~="…"] attribute scoping, live elements carry both id and data-css,
baked clones carry data-css only.
- **Breakdown boards** (p6-breakdown-boards.html) — ALL breakdown boards
  (reveal anatomy · full-scroll catalogue · tile fields, states & the
  five-image actual-width gallery) now live on this static companion; the
  journey file keeps only a link card. The five expanded-tile PNGs
  (art/boards/pill-open-*.png, 2× captures at true 394px shell width) are
  embedded there and reusable for image-gen/handoff directly.
- **Breakdown 03b · All five pills, live HTML** (p6-breakdown-tiles.html) — each element
  expanded beside its four collapsed peers, both states across the set. Split
  to a companion sheet (linked from the main file) — live markup with all <use> glyphs inlined (capture-safe). Frames render
  at the exact in-app width (394px shell · 356px shelf).
Flavor line (.sp-flavor) de-italicized per the no-italics text rule (build,
boards, and companion all updated).
### Engine flag — birth-city timezone on the cast line (P6)
The cast line now renders the timezone abbreviation after the hour range: `CAST FROM 1995 · APRIL 29 · 17–19 CST`. The abbr must come from the birth city entered at onboarding (city → IANA zone → abbreviation at birth date, DST-aware). **Engine addition required:** the chart payload currently carries no timezone field — persist `birthTz` (IANA id) + derived `birthTzAbbr` at cast time and expose both to the identity surfaces (reveal ceremony + shareable identity card). Demo uses CST (China Standard Time) as fixture. Hand-off note for Claude Code.

### Wheel placement law (P6)
When rendering any user's dominance wheel: the **Core element always occupies the top slot**; the remaining four elements are placed **counter-clockwise starting from the slot to the Core's right, ordered high → low dominance** (ties break by the productive-cycle order from the Core). Dot size still scales with %; slot geometry is fixed (locked wheel verbatim). Demo chart now renders: top Metal 40 · right Earth 30 · left Wood 20 · lower-left Water 10 · lower-right Fire 0. The dot-ink intro plays Core first, then clockwise around the ring.
