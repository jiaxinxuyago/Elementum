# REA_07 — Reading Concept Inventory & Ladder — vocabulary law, concept registry, journey ordering

> **Formerly DES_08** — moved to the Reading library in the 2026-07-23 design/reading doc separation; historical citations of "DES_08" refer to this file (registry: DevLog_Docs/README.md).

**D12 Step 1** — Part 1 (§1–§5): inventory + vocabulary law · **Part 2 (§6–§9): the Concept Ladder** · Part 3: Section Charters (pending)
**Serves:** DES_04 §0 (Beta core goal) Axis A — introduce BaZi step by step, without cognitive overload.
**Sources:** `Reading/Database/elementum_profile_database.html` (the Profile Database — canonical behavioral content for stems + Ten Gods) · REA_01 (archetype system) · REA_02 (knowledge pool) · the Manual (now **retired** → `_ARCHIVE_Manual_RETIRED.md`) · the live app (audited 2026-06-10).
>
> **NB (resolved 2026-06-26):** the Source-column "REA_04" tags (which meant the **retired Manual**, not the new **REA_04 = Reading Schema**) have been re-pointed to **"Manual (retired)"** to remove the collision. If a concept needs a *live* canonical source for the content pass, re-point it to REA_02 / DEV_01 then (the Manual is archived at `_ARCHIVE_Manual_RETIRED.md`).
**Status:** DRAFT for owner markup · 2026-06-10

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `REA_08_Reading_V2.1_Reconciliation_Audit.md`).** Deltas: (1) **2-layer model** — Identity card (Day Master) + Ten-God cards (every present energy); no dominant/secondary *layers* (those are derived role badges). (2) **Polarity faces (B5)** — each energy resolves 1–2 Ten-God personas by polarity; the self element's faces (The Twin / The Rival) render as Ten-God cards, **separate from the Identity card**. (3) **NEW positional axis (宫位, B6)** — each Ten God *also* reads by pillar position (日支 = partner, 时柱 = children/legacy); see concept **2.6** below. (4) §2 persona names remain the **canonical source** (already correct). The "non-self" / "other element" qualifiers in 2.2/2.3 and the §10 charters are loosened accordingly.

---

## 1 · The vocabulary law

1. **One concept, one canonical user-facing name.** Every UI surface, reading sentence, share asset, and doc uses the canonical name. A synonym on a user-facing surface is a defect.
2. **Chinese glosses are texture, not vocabulary.** The 汉字 may appear beside the canonical name (ancient-seriousness register) but content must never *require* it.
3. **Internal names never surface.** Engine/schema terms (`tgPattern`, "Seven Killings", "Indirect Seal", `band`) are code/docs only.
4. **[OWNER RULING 2026-06-10] Ten Gods use the mythic-persona register** (The Twin … The Sage — the council, already live in `TG_CARD_DATA`). Because persona names don't self-explain, **every surface that introduces a god MUST carry its structural definition line** (the Profile DB's mechanic phrasing, e.g. The General — "pressure that doesn't grant permission"). Persona name teaches *who*; definition line teaches *how it works*. The Profile DB's own names (The Flow, The Trial, The Root…) are hereby **aliases — do not surface *as persona names*.** *[SCOPED by owner ruling 2026-07-16: this ban applies to the PERSONA-NAME slot only — the words flow/trial/harvest/root are free in other vocabulary slots; e.g. the locked relation noun **Root** (印 family) and keyword **Flow** (食神) are legal.]*
5. **A concept may not be *used* before it is *taught***: no screen presumes a rung the journey hasn't placed (enforced by the Ladder, Part 2).

---

## 2 · Naming registry — fixed names

### Ten stems (consistent everywhere — no change)

| 干 | Canonical | | 干 | Canonical |
|---|---|---|---|---|
| 甲 | The Oak (Yang Wood) | | 己 | The Field (Yin Earth) |
| 乙 | The Vine (Yin Wood) | | 庚 | The Blade (Yang Metal) |
| 丙 | The Sun (Yang Fire) | | 辛 | The Jewel (Yin Metal) |
| 丁 | The Candle (Yin Fire) | | 壬 | The Ocean (Yang Water) |
| 戊 | The Mountain (Yang Earth) | | 癸 | The Rain (Yin Water) |

### Ten Gods (persona canonical + mandatory definition line)

| 神 | Canonical | Definition line (mandatory on first appearance) | Aliases (never surface) |
|---|---|---|---|
| 比肩 | **The Twin** | Same nature, same register — the standard you hold yourself to | Parallel Self |
| 劫财 | **The Rival** | Same nature, different register — the edge of comparison | Rob Wealth |
| 食神 | **The Artisan** | Output that flows from you — giving that feels like being | The Flow · Food God |
| 伤官 | **The Virtuoso** | Cross-current output — brilliance made of what it meets | Hurt Officer |
| 偏财 | **The Horizon** | Wide-ranging engagement — opportunity sensed at a distance | The Field (god) · Indirect Wealth |
| 正财 | **The Steward** | Methodical, directed acquisition — value built and kept | The Harvest · Direct Wealth |
| 七杀 | **The General** | Pressure that doesn't grant permission — the trial that forges | The Trial · Seven Killings |
| 正官 | **The Magistrate** | Framework-mediated pressure — the standard that legitimizes | The Standard · Direct Officer |
| 偏印 | **The Alchemist** | Unconventional nourishment — insight that transmutes | The Well · Indirect Seal |
| 正印 | **The Sage** | Nourishment that deepens without redirecting — the root that holds | The Root · Direct Seal |

> Resolved collision: the persona register frees "The Field" to mean only the 己 stem (偏财 = The Horizon).
> ⚠ Source gap: the Profile DB body is missing the 正印 card (TOC lists it; card absent). Backfill before content reconstruction.

### Other fixed terms

| Concept | Canonical user-facing term | Banished synonyms |
|---|---|---|
| 五行 qualities | **the five elements** | phases, agents |
| 阴/阳 | **Yin / Yang** (register: "two registers of each element") | polarity (internal ok) |
| 八字 chart | **your chart** (the Four Pillars) | natal chart, BaZi chart (marketing ok, reading no) |
| 日主 | **Day Master** | element-of-self (definition line ok), DM (internal) |
| Layer-2 concept | **Dominant Energies** (already the row name) | Ten Gods (docs ok; user-facing only as 十神 gloss), Layer 2 |
| 用神/忌神 framing | **Catalyst / Friction** | lifts/wears (tagline ok), favorable/unfavorable |
| 大运 | **Life Chapters** (ten-year chapters) | Luck Cycles, Luck Pillars, decades |
| 流年/流日 | **the year's / today's energy** | annual pillar, liunian (internal) |
| 调候 | **Seasonal Calibration** | climate adjustment |
| 合冲刑害 | **Pillar Patterns** | combinations/clashes (definition lines ok) |
| concentrated/balanced/open | **energy band** values (keep) | bands renamed elsewhere |

> **✔ REGISTERED (REA_11 compound vocabulary — LOCKED 2026-07-16, canonical here per law #1):**
> - **Face keywords (10, v3 final):** 比肩 **Independence** · 劫财 **Rivalry** · 食神 **Flow** ·
>   伤官 **Brilliance** · 偏财 **Reach** · 正财 **Caution** · 七杀 **Force** · 正官 **Order** ·
>   偏印 **Insight** · 正印 **Care**. The keyword doubles as the face's "representation" word on
>   reading surfaces ("The General · FORCE") — the journey handoff's separate representation
>   lexicon (Selfhood/Craft/Challenge…) is REJECTED (owner 2026-07-16).
> - **Relation nouns (5):** Self→**Core** · Output→**Voice** · Wealth→**Drive** · Authority→**Duty**
>   · Resource→**Root**.
> - **Identity-hero chips:** the top-3 keyword code (three loudest elements' lead-face keywords,
>   dominance-ordered) — never authored, always derived.
> - Element **modifiers** RETIRED from glance labels (2026-07-15 — one punchy keyword per label).
> - Pole nouns + chips: §4b (drafted, v3-revised); full detail in REA_11.
> **LOCKED 2026-07-16 (REA_11 §5c, re-lock): DM-strength display terms 身强/中和/身弱 = Overfueled /
> Balanced / Underfueled; remedy verbs 克泄耗/生助 = Channel / Refill.** (Supersedes the 2026-07-15
> Charged/Receptive+Fuel set — non-symptomatic.) Need-panel headers are UNIVERSAL (state-invariant,
> locked 2026-07-16): **SEEK THESE ↑ CATALYST / SKIP THESE ↓ FRICTION**; Balanced charts collapse
> both panels to one "keep the mix" line. These supersede raw "strong/weak" on every surface (CodexScreen.jsx:46-52 currently
> violates — fix pending); internal band keys concentrated/balanced/open unchanged as code/content keys. On full lock, all names register HERE as
> canonical user-facing vocabulary (law #1); until then REA_11 is the working draft — do not source
> names from anywhere else.
> ⚠ Interaction with law #4: the relation-noun draft proposes **Root** (and possibly **Trial**), which
> law #4 currently bans from surfacing as Profile-DB persona aliases. Locking §5b must either scope
> law #4 to persona-name slots only, or pick non-alias nouns. Owner to resolve.

---

## 3 · The concept inventory

Per concept: **ID · canonical name · definition (civilian one-liner) · prerequisites · canonical content source · where it appears today · teaching status.**
Status legend: ✅ taught (introduced before/where used) · ⚠ used-untaught (surfaces rely on it; nothing explains it) · ◐ partial (defined somewhere, but not at first use).

### Family 0 — Foundations

| ID | Concept | Definition | Needs | Source | Appears today | Status |
|---|---|---|---|---|---|---|
| 0.1 | **The five elements** | Five qualities of energy — Wood, Fire, Earth, Metal, Water — the alphabet everything else is written in. | — | REA_02 §1; Codex | Loading screen glyphs; Reveal blueprint bars; everywhere | ⚠ shown constantly, defined only in Codex (a side library) |
| 0.2 | **Yin / Yang** | Each element comes in two registers — expansive (Yang) and concentrated (Yin). | 0.1 | REA_02 | Onboarding Step 6 asks polarity; archetype labels ("Yang Metal") | ◐ asked before it's explained |
| 0.3 | **Your chart (Four Pillars)** | Your birth moment written as four pairs of characters — year, month, day, hour — the data behind every reading. | — | DEV_01; Manual (retired) | Reveal §1 grid; `chart-reveal` raw page | ✅ closest to properly taught |

### Family 1 — Identity (the Elemental-Nature axis · Layer 1)

| ID | Concept | Definition | Needs | Source | Appears today | Status |
|---|---|---|---|---|---|---|
| 1.1 | **Day Master** | The element-of-self: the day pillar's stem, the lens every other energy is read through. | 0.1, 0.2 | REA_01 §2; Profile DB I | Reveal §2; Identity Card | ◐ named & used instantly, mechanism unexplained |
| 1.2 | **The ten stem archetypes** | The Day Master as a person: Oak, Vine, Sun … Rain — ten signatures of selfhood. | 1.1 | **Profile DB Part One** (canonical); `STEM_CARD_DATA` | Identity Card; Day Master detail | ✅ the app's strongest concept |
| 1.3 | **Elemental composition** | Your personal ratio of the five elements — what you're made of, in proportions. | 0.1, 0.3 | REA_01 §6 | Reveal §3 bars; Elemental Nature detail | ◐ the bars *show* it; nothing says what a proportion *means* |
| 1.4 | **Energy band** | How concentrated your self-element is: concentrated · balanced · open. | 1.3 | REA_01 §7 | archetypeLabel; Elemental Nature detail | ⚠ band words appear with no definition anywhere live |

### Family 2 — Relation (the Dominant-Energy axis · Layer 2)

| ID | Concept | Definition | Needs | Source | Appears today | Status |
|---|---|---|---|---|---|---|
| **2.1** | **Elements act on each other** | Every element feeds one and checks another (生/克) — why another energy can be your fuel or your grindstone. | 0.1 | REA_02 §2; Manual (retired) | **NOWHERE in the journey** (Energy Manual mentions; Codex describes) | **⚠⚠ the load-bearing untaught rung** |
| 2.2 | **The council (Ten Gods)** | Each element — **including your own** — read through its relationship to your Day Master, becomes a figure: Mirror, Rival, Muse … Sage. | 1.1, 2.1, 0.2 | **Profile DB Part Two** (canonical defs); `TG_CARD_DATA` | Ten Gods detail (council); raw-chart per-pillar tags | ◐ rich content, but presumes 2.1; raw chart leaks engine names |
| 2.3 | **Dominant & secondary energy** | Which council figures speak loudest in *your* chart — **every present energy gets a card**; "dominant"/"secondary" are derived role badges (the self element's Mirror/Rival included — B5). | 1.3, 2.2 | REA_01 §3 | Dominant Energies row + detail | ◐ |
| 2.4 | **Catalyst / Friction** | The element that lifts your nature, and the one that grinds it — your chart's prescription. | 2.1, 1.3 | REA_01; Manual (retired) | Reveal §4; Forces in Motion | ⚠ presented as fact; *why* unexplained without 2.1 |
| 2.5 | **The absent element** | A quality your chart barely carries — not a flaw; a place where life asks you to borrow. | 1.3 | Manual (retired) | Reveal §4; Seasonal row trigger | ◐ |
| **2.6** | **Pillar position (宫位)** | The *same* Ten God reads differently by which pillar it sits in — 年 = origins, 月 = career/parents, **日支 = partner (夫妻宫)**, 时 = children/legacy. | 2.2, 0.3 | REA_02 §2.7b | engine computes per-pillar TGs (`chart.tenGods`); reading surface NEW | **NEW (B6)** — first-class positional axis |

### Family 3 — Time

| ID | Concept | Definition | Needs | Source | Appears today | Status |
|---|---|---|---|---|---|---|
| 3.1 | **Life Chapters** | Your timeline in ten-year chapters, each carrying its own element pair. | 0.3 | DEV_01 §9 | Life Chapters detail; Decade page | ◐ |
| 3.2 | **Today's energy** | Each day/year carries an element that interacts with your chart — the basis of daily guidance. | 2.1 | `dailyGuidance.js`; Manual (retired) | Today tab; Day/Month/Year pages | ⚠ presumes 2.1 |
| 3.3 | **Seasonal Calibration** | Charts missing an element get a cultivation practice — borrowing what the season can lend. | 2.5, 1.1 | Manual (retired) | Conditional catalogue row + detail | ◐ conditional = good design already |

### Family 4 — Pattern (advanced)

| ID | Concept | Definition | Needs | Source | Appears today | Status |
|---|---|---|---|---|---|---|
| 4.1 | **Pillar Patterns** | Pillars can harmonize or collide (合/冲) — friction and fusion *inside* the chart. | 0.3, 2.1 | REA_02 | Chart Patterns detail | ⚠ steepest content, least scaffolding |
| 4.2 | **Hour discovery** | Unknown birth hour → the app helps you *recognize* your hour by resonance. | 1.2 | §22 | Chart Resonance flow | ✅ self-contained |

---

## 4 · Current vocabulary violations (fix list)

| # | Violation | Where | Fix |
|---|---|---|---|
| V1 | **CONFIRMED:** engine translations ("Seven Killings", "Hurt Officer"…) render on the raw-chart per-pillar tags — the same energy the reading calls "The General" | `RawChartPage.jsx:277` ← `calculator.js` `en:` names | Map to persona names + 汉字 gloss at render |
| V2 | "Ten Gods" vs "Dominant Energies" vs "the council" used interchangeably | TenGodsDetail copy, docs | Canonical: **Dominant Energies** (concept) / **the council** (collective metaphor, allowed); "Ten Gods" → gloss-only |
| V3 | DevBar stem shorthand "Lamp", "Mtn", "River" | `DevBar.jsx` cycle pad | Dev-only; align labels (Ember, Mountain, Ocean) — low priority |
| V4 | Profile DB god names (Flow/Trial/Root…) contradict the canonical persona set | `Reading/Database/elementum_profile_database.html` | Annotate the DB header: names superseded per this registry; definitions remain canonical |
| V5 | Band values appear with zero live definition (1.4) | archetypeLabel, ElementalNatureDetail | Charter a definition moment (Part 3) |
| V6 | 正印 card missing from Profile DB body | `Reading/Database/elementum_profile_database.html` | Backfill The Sage's profile before content reconstruction |

---

## 5 · Headline findings (inputs to Part 2, the Ladder)

1. **Concept 2.1 (elements act on each other) is the single highest-leverage gap** — five surfaces consume it (2.2, 2.4, 3.2, 3.3, 4.1); zero teach it. One taught moment (likely a 20-second diagram beat at the top of Dominant Energies or Forces in Motion) unlocks half the catalogue's comprehensibility.
2. **Reveal currently carries five first-appearances** (0.3, 1.1, 1.2, 1.3, 2.4) — over any reasonable cognitive budget; the Ladder must decide what Reveal sheds to later moments.
3. **The Codex/Energy Manual hold real teaching content but sit off-path** — the Ladder should weave "micro-codex" moments into first appearances instead of relying on users visiting a library.
4. **Family 1 is in good shape** (the app's identity spine was always its strength); Families 2–3 carry most ⚠ marks — consistent with the §0 charter's emphasis on Dominant Energy as the redesign center.

---

---

# PART 2 — The Concept Ladder (journey ordering)

**Added 2026-06-10.** The inventory (§3) sorted by its prerequisite arrows and assigned to journey moments. Every moment gets three lists: **assumes** (rungs that must already be taught), **teaches** (the ONE new rung this moment owns), and **previews** (rungs it may *show* as a teaser without explaining — curiosity is allowed; reliance is not).

> **⚠ INVERSION AMENDMENT (2026-06-10 · D13).** Field evidence (first BaZi-literate tester: couldn't connect the invented categories to her reading — **payoff latency**) inverts how this ladder is applied. The rungs, prerequisites, and journey order below **stand**, but their role changes: the ladder now governs what the **on-demand explanations** beneath each reading may assume — it no longer gates the readings. **Claims lead; teaching beats become expandable depth under the claim** ("reading before rubric"). Consequences: the L9 cycle moment relocates *inside* the Five Energy Cards as the tap-to-open "how this works" layer; L8–L11 below now describe the internals of the per-element cards (D13 structure — see Part 3); a concept name appearing without an attached personal claim is a defect (DES_04 §0 governing principle).

## 6 · Ladder rules

1. **One new rung per moment.** A screen may teach exactly one concept. Showing ≠ teaching: a preview (an unexplained glimpse that creates pull) is legal; *using* an untaught concept to make a claim is not.
2. **Teach at first need, not in a library.** A rung is taught at the first moment a claim depends on it — via an in-place teaching beat (2–3 sentences + a visual), not by linking out. The Codex remains the *reference* (every teaching beat ends with a quiet "more in the Codex" affordance), never the primary teacher.
3. **Anchor down the ladder.** Every teaching beat names the rung it stands on ("You know your chart holds five energies in a ratio. Here is what the loudest one *does*…").
4. **Locked decisions are constraints, not casualties.** D5 (Balance Prescription stays on Reveal) and §AM.2 (icons-only nav) are respected — the ladder reframes *how* concepts appear, not *whether* locked surfaces exist.

## 7 · The ladder — journey moments in order

| # | Moment | Assumes | **Teaches** | Previews | Delta vs. today |
|---|---|---|---|---|---|
| L1 | **Onboarding steps 1–4** (year/month/day/hour) | — | **0.3 your chart** (drip): each step's poetic subtitle names its pillar — "your year pillar · the world you arrived into" | — | NEW micro-copy per step (4 lines; copy-only change) |
| L2 | **Onboarding step 6/6a** (polarity) | — | **0.2 Yin/Yang** (light): the question explains itself — two registers of the same energy | — | Copy already close; sharpen to definition register |
| L3 | **Loading screen** | — | **0.1 the five elements**: the five glyphs pulse — NAME them ("Wood · Fire · Earth · Metal · Water — weighing your five energies") | 1.3 (the act of "weighing") | NEW one-line caption naming the glyphs |
| L4 | **Reveal §1 — Your Chart** | 0.3 (drip from L1) | **0.3 consolidation**: the four pillars assembled — "the eight characters of your birth" | 2.2 (pillar tags visible, unexplained) | Keep; add one anchor sentence |
| L5 | **Reveal §2 — Who You Are** | 0.1, 0.2 | **1.1 + 1.2 Day Master & your archetype** (the emotional peak — one rung from the user's POV: "this is who you are") | 1.4 (band word appears in archetype label) | Keep; teaching beat = existing manifesto + ONE new mechanism line ("born on a 庚 day — Yang Metal is the lens you live through") |
| L6 | **Reveal §3 — Energy Blueprint** | 0.1 | *previews* **1.3 composition** (bars speak for themselves) | 1.3, 2.5 | Demote from "taught" to preview — full teaching moves to L8. Cuts Reveal's load from 5 rungs to 2 taught + previews |
| L7 | **Reveal §4 — Prescription** (D5: stays) | 1.1 | *previews* **2.4 Catalyst/Friction** as outcome ("Fire lifts you") — **no mechanism claim** | 2.4 | Reframe copy: state the prescription, defer the *why* explicitly — "why Fire? → Forces in Motion" |
| L8 | **Catalogue row 1 → Elemental Nature detail** | 0.1, 1.1 | **1.3 composition + 1.4 band** (one rung: "what you're made of, and how concentrated") | — | Teaching beat at top of detail (the audit's over-budget `elementIntro` likely *becomes* this beat — budget set in Part 3) |
| L9 | **Catalogue row 2 → Dominant Energies detail** | 1.1, 1.3, 0.2 | **2.1 elements act on each other** — THE cycle moment: a 20-second feed/check diagram centered on YOUR element — then **2.2/2.3 the council** lands on top of it | — | **The single biggest redesign item.** New diagram beat (canvas brief) + persona cards (exist) get definition lines |
| L10 | **Catalogue row 3 → Forces in Motion detail** | 2.1, 1.3 | **2.4 Catalyst/Friction mechanism** (pays off L7's deferred "why") | 2.5 | Add the anchor-down line; cycle-reminder chip (compact 2.1 recall) |
| L11 | **Seasonal Calibration** (conditional) | 1.3, 2.5 | **2.5 + 3.3 absence & cultivation** (one rung: "what you don't carry, and how to borrow it") | — | Existing detail close; add anchor line |
| L12 | **Catalogue row → Life Chapters detail** | 0.3 | **3.1 chapters**: the chart becomes a timeline | 2.2 (chapter's "dominant register" persona) | Existing; teaching beat at top |
| L13 | **Today tab / Day page** | 2.1 | **3.2 today's energy**: today carries an element; it meets yours | — | Cycle-reminder chip; subtitle already shows persona post-vocab-fix |
| L14 | **Chart Patterns detail** | 0.3, 2.1 | **4.1 pillar patterns** | — | Steepest rung — gets the heaviest teaching beat (or stays explicitly "advanced-labeled") |
| L15 | **Raw chart / Resonance** | 0.3 | **4.2 hour discovery** | 2.2 | Self-contained today; fine |

## 8 · What the ladder changes (design backlog → Part 3 / canvas briefs)

1. **The L9 cycle moment** — the one genuinely new designed artifact: a personal feed/check diagram (your element at center, fed-by / feeds / checks / checked-by). One canvas brief, one deliverable, per our brief discipline.
2. **Reveal sheds 3 rungs** — §3 and §4 become previews (copy reframes, no layout change; D5 respected). Reveal's taught load drops 5 → 2.
3. **Teaching beats** at the top of 5 details (L8, L10, L11, L12, L14) — a repeatable 2–3 sentence + anchor-line format, specced per-section in Part 3.
4. **Micro-copy drips** — L1 pillar subtitles, L3 loading caption, L5 mechanism line. Pure copy, high leverage.
5. **"More in the Codex" affordance** — a quiet standard component closing every teaching beat (weaves the off-path library into the path).
6. **Cycle-reminder chip** — compact 2.1 recall used at L10/L13 (and anywhere 2.1 is consumed later).

## 9 · Open items for owner markup

- **L5's single mechanism line** — the one sentence that teaches "Day Master = born on a X day." Voice matters most here; I'll draft 3 candidates in Part 3.
- **L9 diagram form** — ring? cross? the canvas brief decides, but if you have an instinct (the TG ring already exists as a viz), it shapes the brief.
- **L14 Chart Patterns** — teach it properly, or label it "advanced" and let it be the one deliberately steep room in the house?

---

# PART 3 — Section Charters (the D13 structure)

**Added 2026-06-10.** Per reading surface: the contract that Part 1's vocabulary, Part 2's ladder (inverted), and the schema v2 all serve. Structure per D13: **Identity · Five Energy Cards · Time · Patterns.** Word budgets derive from `REA_09_Reading_Format_Audit.md` (budgets serve the voice: punch 10–14w, expand 18–24w, conclusion lines ≤14w, chips ≤4w).

**Claim types** (the Resonance Spec, Step 2, will define acceptance tests per type):
- **R — Recognition:** a specific, falsifiable-enough self-description ("that's me").
- **E — Explanation:** why the recognition is true (mechanism — always on-demand).
- **P — Prediction:** how this energy behaves under conditions (pressure, season, chapter, today).
- **X — Prescription:** what to do with it (cultivate, lean on, guard against).

## 10 · Charter table

> **v2.1 note (B5/B6).** Each energy card resolves **1–2 polarity faces** via the FACES prologue; the "non-self" qualifiers below are loosened — the self element's Mirror/Rival also render as Ten-God cards, **separate from the Identity card**. Depth layers now vary by **presence-frame register** (dominant = full · present = shorter · absent = cultivation). **Add a new charter row — Positional reading (宫位 × 十神, B6):** per-pillar cards composing palace frame × the position's Ten-God persona × polarity, with 日支 (partner) and 时柱 (children/legacy) the highest-value reads. See schema v2.1 §1–§4.

| Surface | Concepts (ladder) | Claim lead | Emotional beat | Face format (zero-tap) | Depth layers (in order) |
|---|---|---|---|---|---|
| **Identity Card / Reveal §2** | 1.1+1.2 | **R** ×2–3 | "I am seen" | Archetype name + 汉字 + manifesto + 2–3 recognition claims (punch register) | mechanism line ("born on a 庚 day…") → expandable "what is a Day Master" (E) → Codex |
| **Energy Card · Self** (DM element) | 1.2, 1.4 | **R** | "this is my core" | Element + 汉字 + % + conclusion line ("Metal is your core — precision before intention") | band/saturation reading (R+E) → how concentrated self-energy behaves (P) → cycle layer (E) |
| **Energy Card · Strongest non-self** | 2.2, 2.3 | **R** | "so THAT's what that is" | Element + % + conclusion via its council persona ("Fire in you is The General — pressure that forges") | persona reading: claims from Profile DB Part Two (R) → role badge (strongest) → catalyst/friction status if any (X) → cycle layer (E) |
| **Energy Card · Present** (×2–3) | 2.2 | **R** | "even the quiet parts are me" | Element + % + one conclusion line via its persona | persona reading (shorter) (R) → role badges → cycle layer (E) |
| **Energy Card · Absent/scarce** | 2.5, 3.3 | **R→X** | "what I'm missing has a name" | Element + 0%/low + conclusion ("Fire is scarce — borrowed, never owned") | absence reading (R) → **cultivation practice (former Seasonal Calibration, X)** → cycle layer (E) |
| **Today / Day page** | 3.2 | **P→X** | "today is mine" | Today's element meets your chart: one-line forecast | do/avoid (X) → best hours (P) → persona register of the day (R) → cycle chip (E) |
| **Life Chapters** | 3.1 | **P** | "my life has shape" | Current chapter conclusion first ("These are compounding years") | chapter timeline (P) → per-chapter readings (P+X) → mechanism (E) |
| **Patterns** *(advanced-labeled)* | 4.1 | **E→R** | "that's why it's complicated" | One conclusion ("Your chart argues with itself in one place") | per-pattern readings (R) → mechanism (E) — the one deliberately steep room |
| **Energy Map** | synthesis | — (viz) | "the whole of me, at once" | The composed visualization | links back into the five cards |

## 11 · Charter rules

1. **Card faces carry conclusions, never category labels.** "Primary & secondary forces" is dead copy; "Fire in you is The General — pressure that forges" is the format.
2. **Tier gating follows the revelation sequence** (§19): faces + first recognition claim free; depth layers (full persona reading, prescriptions, cultivation) = Seeker. The gate sits *inside* a card the user already wants open — never in front of the face.
3. **Every depth layer ends with the Codex affordance** (quiet, standard component).
4. **The cycle layer (E) is one shared component** — the personal feed/check diagram (former L9), parameterized by element pair. One canvas brief.
5. **Five-element art** (`t_{el}_{n}_{shape}` library) gives every card its painting — the visual system was already organized this way.

## 12 · What this means for schema v2 (Step 3 preview)

> **v2.1 update (2026-06-24).** The central unit became **K2 `ENERGY_CARD_DATA[element_god]`** (per-**persona**, not per-element) — FACES prologue (face · persona · chips · `rulingDomain`) + presence-frame `registers` (dominant/absent bespoke, present derived) — **plus** the orthogonal **positional axis** (`PALACE_FRAMES × chart.tenGods`, B6). See `REA_04_Reading_Schema.md` (v2.1). The bullets below describe the v2 per-element precursor.

- The per-element card becomes the schema's central unit: `energyCard[element]` with `face.conclusion` (≤14w), `claims[]` (2–3 × punch register), `roleBadges[]`, `depth` blocks per claim type, `cultivation` (absent-element only).
- `elementIntro` punch/expand survive as the Self card's face + first depth block — budgets corrected to the audit's evidence (punch 10–14w, expand 18–24w).
- `keywords`/`chips` alias resolves to `chips` (≤4w each).
- Dominant/secondary/catalyst/friction become **derived role badges**, not content categories — they stop needing their own authored sections.

*Next: owner markup of Parts 1–3 → Step 2 (Resonance Spec: acceptance tests per claim type + the cold-reader protocol with time-to-first-recognition) → Step 3 (schema v2 + freeze) → canvas brief (element card + cycle layer).*
