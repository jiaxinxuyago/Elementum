# Elementum · REA_11 — Identity Vocabulary

> **Formerly DES_12** — moved to the Reading library in the 2026-07-23 design/reading doc separation; historical citations of "DES_12" (and the pre-rename "DES_12_Identity_Compound_Vocabulary") refer to this file (registry: Operations/README.md).

> **Status: OWNER-LOCKED vocabulary (2026-07-02) · design record for the identity-card / Five Energies redesign.**
> Branch: `feat/identity-card-design`. Companion to REA_01 §3 (the 50-key taxonomy) — this doc records the
> plain-English *meaning layer* decisions made 2026-07-01 → 2026-07-02 and the reasoning chain behind them.
> ⚠ REA_01 amendment pending: the "Shareable code / MBTI resonance" future fields in REA_01 §2 are being realized
> by this work; REA_01 itself is LOCKED and untouched until the owner folds this in.

---

## §1 — Problem statement (owner brief, 2026-07-01)

The dominance wheel shows five elements + percentages, but a Western user's perception of what these
mean is ~zero. Goal: make the identity as first-glance graspable and viral as MBTI — "when people talk
about the day master and five elements, people know what they represent from the first glance just as
the four letters mean in MBTI." The meaning must be rooted in Ten-God theory (e.g. 印 = support and
nourishment, but dominant 偏印 means something else), in non-jargon straightforward English.

**Owner constraints (locked):**
1. Do NOT change the design of the dominance wheel.
2. Do NOT compromise the reading catalogue.

**Owner architecture (2026-07-02):** an advanced MBTI represented in the energy wheel — instead of four
letters (INTJ), a **core A with five relations: A‑12345**. Each digit = one element's dominance + its
ten-god relation, in plain English (e.g. "your Earth is 33% with 偏印 dominant — what does 土偏印 represent?").

---

## §2 — The two-system clash, and its resolution: COMPOUND, don't pick

**The clash (found 2026-07-01 by content audit):** two conflicting persona systems were live —
- *Element-essence* (`content/reading/readingContent.js` `ENERGY_CONTENT`): DM-blind, one fixed persona
  per element (metal→"The Magistrate", earth→"The Alchemist", fire→"The General", wood→"The Cultivator",
  water→"The Strategist"; Cultivator/Strategist aren't in the canonical registry; stale "Arbiter" gate line).
- *Ten-god faces* (v2.1, `TG_PERSONA`/`FACE_CARD` via `resolveElementFaces`): DM-relative, polarity-aware.
  Same Metal = "The Twin" on the faces page and "The Magistrate" on the element Read card → contradiction
  fatal to the MBTI-clarity promise.

**Resolution (owner, 2026-07-02): both systems compound — neither wins.** Per REA_01 §3, the meaning unit
is the 50-key `[element]_[tenGod]` compound: the **element is the substance/flavor**, the **ten-god is
the relation to the core**. `ENERGY_CONTENT` (element-only) and `FACE_CARD` (god-only) were both
half-implementations of REA_01's compound; they merge into the 50 cells rather than fight over the slot.
The Day Master is the core noun; the five elements are its relations. **A‑12345 = REA_01's Layer 1
(core, `stem_band_pattern`) + Layer 2 (the five `element_tenGod` relations).**

---

## §3 — The three-layer identity architecture (owner, 2026-07-02)

| Layer | What it shows | Ambiguity | Surface |
|---|---|---|---|
| **1 · Whole picture** | Day Master (self) + five-element dominance wheel — the energy condition as a gestalt | **Singular** — one node per element | The wheel (UNCHANGED) |
| **2 · Diagnosis** | Per energy: what it does to the self — its ten-god *function* + catalyst/friction *role*; and what's inside: the yin/yang faces with presence/dominance | Function singular; **faces split 1–2** | Per-energy card (yin/yang weight bar) |
| **3 · Meaning** | The verdict/keyword — what the ten-god in that energy means | **Two opposite keywords** possible (the 正/偏 faces) | Keyword chips + per-cell reading |

**Load-bearing insight:** for a fixed Day Master, element→family is SINGULAR (for a Metal DM, Earth is
always Resource 印 — no ambiguity at the element level). Only the *character* splits (up to 2 faces by
polarity), and that split lives at Layers 2–3, **never on the wheel**. The engine already returns it
(`resolveElementFaces` → `faces[{god,weight,polarity}]`, `leadGod`, `absentGod`).

**Answer to "does the wheel need redesign?" — No.** The two-god split is a keyword problem, not a wheel
problem. Optional at most: a singular role tint (catalyst/friction) per node — an addition, not a redesign.

**Build order (dictated by the architecture):** L3 keywords → L2 diagnosis card → L1 wheel (unchanged).

---

## §4 — LOCKED: the ten face keywords (Layer 3 vocabulary)

One sharp trait-noun per ten-god face. The two faces of each family are deliberate **opposites** — the
yin/yang split made legible. Owner-locked 2026-07-02 after wordsmithing (Ease→Fluency, Reach→Enterprise
[Venture rejected: act-noun, drifts into Rival's risk territory], Substance→Prudence [not a person-trait]).

| Family | Face | 汉字 | Charge | **Keyword** (v3 ADOPTED 2026-07-16) |
|---|---|---|---|---|
| Self 比劫 | The Twin | 比肩 | steady | **Independence** |
| | The Rival | 劫财 | fierce | **Rivalry** |
| Output 食伤 | The Artisan | 食神 | gentle | **Flow** *(was Fluency)* |
| | The Virtuoso | 伤官 | fierce | **Brilliance** |
| Wealth 财 | The Horizon | 偏财 | dynamic | **Reach** *(was Enterprise)* |
| | The Steward | 正财 | gentle | **Caution** *(was Prudence)* |
| Authority 官杀 | The General | 七杀 | fierce | **Force** |
| | The Magistrate | 正官 | gentle | **Order** |
| Resource 印 | The Alchemist | 偏印 | fierce | **Insight** |
| | The Sage | 正印 | gentle | **Care** *(was Nurture)* |

> **v3 ADOPTED (owner ruling 2026-07-16, journey-handoff integration):** the §4c register proposals
> are now the locked keywords — Flow, Reach, Caution, Care live; Fluency/Enterprise/Prudence/Nurture
> retired to prose palette. §4c's status changes from PROPOSAL to ADOPTED.

**Pair oppositions:** Independence↔Rivalry (standing alone vs measuring against others) ·
Fluency↔Brilliance (effortless vs dazzling-and-forced) · Enterprise↔Prudence (venturing to seize vs
managing to keep) · Force↔Order (raw power vs legitimate structure) · Insight↔Nurture (self-made knowing
vs received support).

**Valence model:** each face's charge (gentle/fierce/steady/dynamic) and gift↔shadow spectrum are
INTRINSIC and fixed (Layer 3). Where a person sits on the spectrum is tipped by the chart **role**
(catalyst/friction/needed/missing — Layer 2, computed per chart; role ≠ %). A 33% force can be friction;
a 5% force can be the needed 用神. Never conflate charge with chart benefit; frame verdicts as direction
("you run heavy on ground, light on fire"), never judgment.

Gift/shadow poles per face (draft register, to refine during 50-cell authoring):
- 比肩 Independence: + trusts own read, finishes without rescue · − isolates, walls others out
- 劫财 Rivalry: + bold, rises against a worthy equal · − comparison-driven, burns resources
- 食神 Fluency: + fluent, warm, generous talent · − complacent, indulgent, coasts
- 伤官 Brilliance: + dazzling originality, breaks stale rules · − rebels for its own sake, over-exposes
- 偏财 Enterprise: + sees openings, resourceful, generous · − scattered, over-extends, holds nothing long
- 正财 Prudence: + builds slowly, loyal, compounds · − clings, hoards, "enough" never comes
- 七杀 Force: + decisive, brave under fire, forged sharp · − self-punishing, domineering, burnout
- 正官 Order: + integrity, responsibility, trusted · − rigid, over-conforms, keeps rules past their reason
- 偏印 Insight: + intuition, unorthodox mastery, transmutes · − detached, overthinks, starves enjoyment
- 正印 Nurture: + protective, patient, held and holding · − dependency, over-protection, inertia

---

## §4b — Per-god MASTER LIST (v2 · pole nouns + adjectives DRAFT 2026-07-14)

Everything orbiting each ten-god. Persona + identity lines are canonical (REA_07 §2); keyword + charge
locked (§4); relation nouns iterating (§5b). **NEW axis (v2): pole nouns** — each keyword's intrinsic
spectrum gets a named catalyst pole and friction pole (1 noun + 3 adjectives each). Rationale: pole
nouns are Layer-3 INTRINSIC vocabulary (naming the spectrum's ends, fixed per god), NOT per-chart slot
renaming — slot stability preserved; the chart role only picks which pole lights up. Grammar:
*"[Keyword], fueled, becomes [Catalyst noun]; overloaded, it curdles into [Friction noun]."*
The pole noun is the diagnosis-layer headline; the 3 adjectives are its supporting chips (v2
de-duplicated each chip set against its own pole noun). Italic English god names are the classical
translations — internal/docs-only per REA_07 law #3, listed for completeness.

| Family → rel. noun (§5b) | God | Persona | Keyword · charge | Catalyst ⬆ noun — adjectives | Friction ⬇ noun — adjectives |
|---|---|---|---|---|---|
| Self 比劫 → **Core** | 比肩 *Parallel Self* | The Twin | Independence · steady | **Conviction** — Self-reliant · Steady · Unshakeable | **Isolation** — Walled-off · Solitary · Immovable |
| | 劫财 *Rob Wealth* | The Rival | Rivalry · fierce | **Daring** — Bold · Galvanized · Fearless | **Depletion** — Combative · Envious · Reckless |
| Output 食伤 → **Voice** | 食神 *Food God* | The Artisan | Fluency · gentle | **Grace** — Effortless · Warm · Generous | **Complacency** — Coasting · Indulgent · Unchallenged |
| | 伤官 *Hurt Officer* | The Virtuoso | Brilliance · fierce | **Originality** — Dazzling · Unruly · Rule-breaking | **Defiance** — Contrarian · Over-exposed · Biting |
| Wealth 财 → **Drive**/Harvest⚠ | 偏财 *Indirect Wealth* | The Horizon | Enterprise · dynamic | **Momentum** — Resourceful · Venturing · Magnetic | **Scatter** — Restless · Overextended · Ungrounded |
| | 正财 *Direct Wealth* | The Steward | Prudence · gentle | **Security** — Reliable · Compounding · Loyal | **Hoarding** — Clenched · Risk-averse · Unyielding |
| Authority 官杀 → **Duty**/Trial⚠ | 七杀 *Seven Killings* | The General | Force · fierce | **Command** — Decisive · Unflinching · Battle-ready | **Severity** — Punishing · Domineering · Burned-out |
| | 正官 *Direct Officer* | The Magistrate | Order · gentle | **Integrity** — Principled · Trusted · Fair | **Rigidity** — Conforming · Over-dutiful · Unbending |
| Resource 印 → **Root**⚠ | 偏印 *Indirect Seal* | The Alchemist | Insight · fierce | **Vision** — Intuitive · Penetrating · Inventive | **Detachment** — Aloof · Overthinking · Self-denying |
| | 正印 *Direct Seal* | The Sage | Nurture · gentle | **Wisdom** — Patient · Sheltering · Replenishing | **Dependence** — Passive · Over-protected · Inert |

(Identity/definition lines omitted from the table for width — canonical in REA_07 §2, one per god,
mandatory on first surfacing.)

⚠ = relation-noun candidate is a REA_07 law-#4 banned alias (The Root · The Trial · **The Harvest** —
the 正财 alias caught 2026-07-14, joining Root/Trial in the scoping decision). Resolve at §5b lock:
scope law #4 to persona-name slots, or choose non-alias nouns.

**Pole-noun design rules (v2):**
- **Arc test:** each row reads "keyword, well-fed → catalyst noun; overgrown → friction noun" — the
  friction noun must be the SAME trait overgrown, never an unrelated vice (Integrity→Rigidity ✓).
- **Tonal guardrail:** friction nouns are directions, not diagnoses — overgrowth words (Severity,
  Dependence), never clinical/moralizing ones (Tyranny, Miserliness). Softer alternate on file:
  Hoarding→Clinging.
- **Owner-flagged shaky three (2026-07-14):** Daring (劫财 ⬆), Wisdom (正印 ⬆ — overlaps the Sage
  persona; alt Steadiness), Scatter (偏财 ⬇ — alt Overreach). Iterate before lock.
- **NOT added (owner probe, decided against 2026-07-14):** valence-conditioned RELATION nouns (would
  break slot stability — 5×3=15 nouns, kills comparability) and yin/yang god-GROUP nouns (pattern-layer
  concept; ladder rule — don't name before the journey needs it). Test for any future vocabulary:
  slots and fillings get nouns; verdicts get badges/chips — except pole nouns, which name intrinsic
  spectrum ends and therefore qualify as fillings.

**Read a row end-to-end:** a user whose Earth is 偏印-led sees persona The Alchemist, learns it by the
identity line, gets Insight as the one-word trait; the chart ROLE picks the pole — catalyst → "Vision"
(Intuitive · Penetrating · Inventive), friction → "Detachment" (Aloof · Overthinking · Self-denying).
Same god, opposite verdict — the §4 valence model made concrete.

---

## §4c — Register calibration & simplified vocabulary (v3 PROPOSAL · 2026-07-15)

> Research-backed simplification pass (owner request 2026-07-15: "high-school-graduate vocabulary,
> lowest comprehension threshold"). Sources: internal doc audit (no demographic persona existed; no
> reading-level target existed — both filled here) + market research on Co-Star, The Pattern, CHANI,
> Sanctuary, Nebula, 16Personalities (demographics via Pew 2024/25, Time, Statista; register via copy
> samples; readability via NN/g + CDC plain-language). Full agent reports in session 2026-07-15.
> **Status: ADOPTED 2026-07-16 (owner ruling, journey-handoff integration) — the v3 keyword changes
> are folded into the §4 locked table; modifiers were separately retired from labels (§5 directive).**

### Audience profile (fills the gap — no persona doc existed)
Woman or LGBTQ+ person, **20–35** (center ~25–30), some college, mobile-first, MBTI-fluent,
astrology-curious-but-ironic; uses these apps for identity material + emotional self-reflection, not
belief (Pew: ~1% decide by astrology). This cohort drives 70–78% of astrology-app subscription
revenue and matches BIZ_02's funnel (MBTI/astrology/Human-Design Reddit · TikTok/IG Reels).
Consistent with the existing functional definition ("Western, Chinese-illiterate, BaZi-naive", DES_04).

### Reading-level target (NEW — nothing internal contradicts it)
- **Body copy: Flesch-Kincaid grade 6–7** (NN/g consumer standard grade 6–8 + mobile comprehension
  penalty → low end). No winning app in this market writes above grade 9.
- **Label vocabulary: words a 12-year-old knows, ideally 1–2 syllables.**
- Occasional poetic one-liners allowed as seasoning (Co-Star pattern), never the base register.
- REA_05's locked voice (game-lore declarative, no hedging, not-self-help) is COMPATIBLE: plain ≠ soft.
  Simple words + blunt sentences IS the Co-Star trick.

### Register ruling (two-tier, confirmed from three directions)
**Names stay elevated · meaning-words go plain.** Personas (The Twin…The Sage) and stem archetypes
are the market-winning "The [Noun]" convention (16P The Architect, Enneagram The Reformer, tarot) —
UNCHANGED. Working vocabulary (keywords, pole nouns, chips) drops to concrete/physical-metaphor
register ("Turbulent" not "Neuroticism"). Anti-pattern: CliftonStrengths' latinate nouns (Ideation,
Intellection) — corporate-assessment register, non-viral. Convergent precedents: our own law
("Chinese as art, English as information"), Cece's two-register split (REA_08 "copyable pattern"),
16P's mythic types + plain traits. Bonus: Five-Element language is natively concrete (wood, fire,
root, forge) — physical-metaphor words are MORE on-brand than virtue-nouns.

### v3 word changes (⚠ = requires re-opening a LOCKED table)
| Axis | Current | → v3 | Note |
|---|---|---|---|
| ⚠ §4 keyword 食神 | Fluency | **Flow** | THE Gen-Z word; Water-clash re-tested, reads fine |
| ⚠ §4 keyword 偏财 | Enterprise | **Reach** | corporate → concrete-physical; no clash with relation noun Drive |
| ⚠ §4 keyword 正财 | Prudence | **Caution** | research's own exemplar; alt Keeping |
| ⚠ §4 keyword 正印 | Nurture | **Care** | 1 syllable; alt Nurture |
| ⚠ §5 modifier Fire | Ardent | **Fiery** | literary → literal; completes the literal set (Sharp/Grounded/Deep); alt Blazing |
| §5 modifier Wood | Vital | Vital (flagged) | Growing still misreads as quantity; no better literal found |
| §4b pole 比肩⬆ | Conviction | **Self-trust** | |
| §4b pole 劫财⬇ | Depletion | **Drain** | 1 syl, physical |
| §4b pole 食神⬇ | Complacency | **Coasting** | driving metaphor |
| §4b pole 伤官⬆ | Originality | **Spark** | concrete, 1 syl |
| §4b pole 伤官⬇ | Defiance | **Pushback** | modern, plain |
| §4b pole 七杀⬇ | Severity | **Harshness** | |
| §4b pole 偏印⬇ | Detachment | **Distance** | spatial, everyday |
| §4b pole 正印⬇ | Dependence | **Comfort** | lands the "comfort-zone" concept every reader owns; honest, non-judgy |
| §4b chips | Galvanized · Replenishing · Contrarian · Unflinching · Self-denying | **Fired-up · Recharging · Rebellious · Cool-headed · Shut-off** | |

Unchanged (already plain): Independence · Rivalry · Brilliance · Force · Order · Insight · all 5
relation nouns (Core/Voice/Drive/Duty-or-Trial/Root) · role verbs & connectors (feed it / loosen it /
borrow it / trust it / keep it close) · Isolation · Daring · Grace · Momentum · Scatter · Security ·
Hoarding · Command · Integrity · Rigidity (alt Stubbornness) · Vision · Wisdom.

**Pending owner rulings to adopt v3:** (1) re-open §4 lock for the 4 keyword changes + §5 for
Ardent→Fiery; (2) any overrules on the pole-noun picks; (3) the §5b forks (Drive/Harvest, Duty/Trial)
and law-#4 alias scoping remain open as before — register research does not affect them.

---

## §5 — element modifiers (RETIRED FROM GLANCE LABELS — owner directive 2026-07-15)

> **⚠ DIRECTIVE 2026-07-15 (owner): do NOT compound the element modifier with the ten-god keyword on
> user-facing labels.** No more "Grounded Care" / "Vital Care" — the second word adds a layer of
> complexity and confuses the user. The glance label is ONE punchy keyword noun.
> **Why this costs nothing:** the element is already on the tile/wheel node (element name, %, pigment,
> icon) — the modifier double-encoded it ("EARTH · 33% — *Grounded* Insight" says Earth twice).
> **Consequences:** the `[modifier]+[keyword]` 50-glance-label formula below is RETIRED; the glance
> vocabulary is the 10 keywords alone. The 50 `element_tenGod` cells (REA_01 §3) remain the CONTENT
> unit — element flavor lives inside each cell's deep reading as prose, not in the label. The five
> modifiers below are kept as authoring palette for that prose (and possible future non-label uses);
> they are no longer vocabulary-law surface units, so the §4c Ardent→Fiery proposal becomes moot for
> labels. Grammar everywhere becomes **`[Keyword] — your [Relation]`** (e.g. Earth 33% → "Insight —
> your Root"; reference Blade: Independence—Core · Caution—Drive · Insight—Root · Flow—Voice ·
> Force—Duty, v3 keywords).

Historical record (locked 2026-07-02, superseded for labels 2026-07-15): one trait-adjective per
element; `[modifier] + [keyword]` yielded every 50-cell glance-label by formula. (Wood: **Vital**
chosen over Growing — gerund reads as quantity, not flavor.)

| Element | **Modifier** | Rationale |
|---|---|---|
| Metal 金 | **Sharp** | the edge — clear, precise, cutting |
| Wood 木 | **Vital** | alive, reaching — combines cleanly (Vital Force, Vital Prudence) |
| Fire 火 | **Ardent** | drive + radiance — passionate, not merely warm |
| Earth 土 | **Grounded** | the centre — steady, holding |
| Water 水 | **Deep** | the descent — depth, quiet adaptability |

~~**The 50 glance-labels (formula-derived).**~~ **RETIRED 2026-07-15 per the directive above** — labels
are the 10 keywords alone; the 50 cells stay as content keys only. (Historical formula: {Sharp, Vital,
Ardent, Grounded, Deep} × the 10 keywords, each cell's valid DM implied per REA_01 §3's 50-key table.)

**Reference reading of a compound (土偏印, the worked example):** 印 = the force that backs and feeds
you; 偏 = the indirect face — self-generated, intuitive, unorthodox support (The Alchemist; classically
can "steal the food" 梟印奪食); 土 = stable, grounding, patient. Compound: *a self-made, grounded,
intuitive footing — you hold yourself up.* Role flips the verdict: at `needed` = "a precious inner
footing — lean in"; at `friction` 33% on a strong self = "over-grounded; the comfort that stalls the
blade" (the reference Blade's actual case, REA_01 §3 reference chart).

---

## §5c — LOCKED: Day-Master strength terms + remedy verbs (owner-locked 2026-07-15)

> Fourth vocabulary axis: the user-facing terms for 身强/中和/身弱 (DM strength) and the remedy
> direction 克泄耗/生助. Research-backed (internal audit + market/translation landscape, session
> 2026-07-15; agent reports on file). Owner constraints honored: strength = **typical adjectives**,
> remedy = **strong verbs**, no morphological echo between the sets (Charged/Recharge rejected as
> repetitive → Fuel).

### The locked set (re-locked 2026-07-16 — symptomatic fuel frame)

| Concept | 汉字 | **LOCKED term** | Definition line (mandatory on first surfacing) |
|---|---|---|---|
| DM strength: strong | 身强 | **Overfueled** | More fuel comes in than your core burns — the surplus wants somewhere to go. Built into your chart, not today's mood. |
| DM strength: balanced | 中和 | **Balanced** | Intake and burn hold each other — the condition the other two work toward. |
| DM strength: weak | 身弱 | **Underfueled** | Your core burns more than it takes in — the right intake is what your chart asks for. Built in, not a mood. |
| Remedy for Overfueled | 克泄耗 | **Channel** (verb) | Give your extra force a place to go — aim it, don't add to it. |
| Remedy for Underfueled | 生助 | **Refill** (verb) | Take in what feeds you — intake isn't a crutch, it's your engine. |

Copy templates: *"Your core runs **Overfueled** — more comes in than it burns. So **Channel** it —
aim the surplus, don't add to it."* / *"Your core runs **Underfueled** — it burns more than it takes
in. So **Refill** it — take in what feeds you."* / Balanced: *"Your core runs **Balanced** — intake
and burn hold each other; protect the equilibrium, avoid extremes."* (DEV_01 §3.9.)
Identity suffix (the "-A/-T" unit): **"The Blade · Overfueled"** — appears on identity header, share
card, compat compare.

**Collapsed-tile verdict set (LOCKED 2026-07-16 — approach-implying, not condition-explaining):**
the one-liner after the state badge on the collapsed core-energy tile. Verb+object, three words,
reusing ONLY canonical verbs/copy (tile pre-teaches the exact word the expanded syllogism uses —
tile → syllogism → panels form one unbroken chain: channel → Channel it → SEEK/SKIP):
- *"It runs **OVERFUELED** — channel the surplus."*
- *"It runs **BALANCED** — keep the mix."*
- *"It runs **UNDERFUELED** — refill the tank."*
(Rejected at decision: condition-explaining tails — "a built-in surplus / appetite", "more in than
out" — owner ruling: the collapsed line implies the APPROACH; the expanded state explains the
condition. Also rejected: paraphrase commands ("aim it, don't add") — synonym drift vs locked verbs;
need-voiced ("it wants an outlet") — desire, not directive.)

### Decision record
- **2026-07-16 RE-LOCK — the symptomatic requirement (owner critique):** the first locked set
  (Charged/Balanced/Receptive + Channel/Fuel, 2026-07-15) named the STATE but not the PROBLEM —
  "Receptive" describes an orientation, not the under-supplied condition, so the logic chain
  ("…therefore you need Fire") asked the user to take the middle step on faith. Ruling: the strength
  words must be SYMPTOMATIC in neutral adjectives, so the diagnosis→remedy chain self-connects.
- **Winner: Overfueled / Balanced / Underfueled + Channel / Refill** (owner pick 2026-07-16):
  perfect morphological mirror; supply-only reading (no burden misread); most explicit symptom words
  of all candidates; verb-coupled (Underfueled→Refill self-evident). Verb swap Fuel→**Refill** was
  REQUIRED by the pick: "Underfueled→Fuel it" repeats the root — the same label↔verb echo rule that
  killed Charged/Recharge. Conscious trade-offs accepted by owner: 3–4-syllable compound labels
  (overrides the §4c 1–2-syllable guideline) and machine register on an ink-wash brand.
- **Runner-up on file: Full / Balanced / Hungry + Channel / Fuel** (Claude's recommendation) —
  grade-1 words, everyday satiety mirror, "stay hungry" cultural pre-load, kept the locked verb;
  lost to the winner's explicitness + mirror perfection. Keep as prose palette ("a full cup",
  "hungry chart" texture allowed in deep readings).
- **Axis symmetry:** Overfueled ↔ Underfueled = same axis, mirrored prefixes (passes the
  "Assertive/Turbulent" test from the market research); Channel ↔ Refill = aim it out vs take it in
  (both transitive resource verbs).
- **Channel over Release (debated 2026-07-15):** Release is the simpler word but the WRONG idea — it
  frames the surplus as waste to vent; 克泄耗 means giving the surplus a productive target (the forge).
  Channel is the asset framing, the best-attested consumer phrasing in live BaZi sources ("channel that
  excess energy into achievement"), meme-fluent for the 20-35 audience ("channel your inner ___"), and
  mirrors Fuel. **Release survives as supporting copy inside friction/letting-go readings only** —
  never as the remedy name. Caveat logged: "channeling" (mediumship sense) — the transitive form with
  an object is unambiguous; definition line handles it.
- **Rejected (full history):** Overpowering (negative valence, mis-states mechanic — 身强 =
  over-supplied, not domineering; also the DES_04:988 chip spec that contained it was never
  implemented — retire that spec line). Neutral (reads "meh"; doctrine says balanced is the prize →
  Balanced). Recharge (morphological echo with Charged). Strong/Weak as surface terms (industry
  standard but a documented liability — the industry itself writes apology articles; ~80% of charts
  are weak-DM). **Charged/Receptive** (superseded 2026-07-16 — state words, not symptomatic; the
  logic chain didn't self-connect). **Overloaded** (everyday burden reading "too many demands" is
  the 身弱 condition — mechanically INVERTED on gloss-less surfaces like the share-card suffix).
  **Underpowered** (names a deficiency of the self, drifts back to judgment). **Hungry/Full**
  (runner-up, see above). **Low** ("feeling low" mood collision). **Starved** (too dire).
- **Vessel-frame runner-up on file:** Full / Balanced / Open + Pour / Fill — tightest mirrors, most
  ink-wash-native; lost to Combo A on owner preference + verb strength. Keep as prose palette (the
  "full cup" image in DEV_01 §3.9 remains great deep-reading texture).

### Panel-header doctrine (LOCKED 2026-07-16 v2 — universal pair: SEEK / SKIP)

**LOCKED headers, state-invariant:**

| Panel | Header | Blade example |
|---|---|---|
| Catalyst ↑ | **SEEK THESE** | Fire 0% your Duty · Wood 20% your Drive · Water 10% your Voice |
| Friction ↓ | **SKIP THESE** | Metal 40% your Core · Earth 30% your Root |
| Balanced chart | one line replaces both panels: *"Balanced — nothing to force; keep the mix."* | — |

Keep on Overfueled charts: micro-line under the catalyst panel — *"You need most what you hold
least."* Role badges (↑ CATALYST / ↓ FRICTION) stay as taxonomy tags.

**Why universal (the load-bearing insight, owner ruling 2026-07-16):** the panel DIRECTIVE is
state-invariant even though the mechanism isn't — catalyst helps an Overfueled chart as an *outlet*
and an Underfueled chart as *intake*, but the user-action is identical: get more of this element,
add less of that one. The state explains WHY (that's the syllogism's job — Channel/Refill stay the
§5c chart-level remedy verbs); the panels say WHICH. Two layers, two questions — lexical repetition
between them is not required. This supersedes the v1 state-adaptive headers (CHANNEL INTO THESE /
DON'T ADD THESE / REFILL FROM THESE / EASE OFF THESE), which required the user to already understand
their state before the panels made sense, and quadrupled the string count.

**Candidates ranked at decision (history):** Seek/Skip (owner pick — punchiest, 1-syllable,
alliterative, instantly directional) › Dial up/Dial down (Claude's rec — dial metaphor, arrow-
coherent) › Lean on/Go easy on (warmest) › Bring in more/Don't add more (most literal, clunky) ›
You need/Don't need (v0 — "don't need your Core" landmine) › You have plenty (v1 interim).

**Core-row guardrail (carries over):** friction copy always reads "strength overgrown," never
rejection — "SKIP" means *pass on adding more, for now*, not *drop what you are*. The friction
rows keep their relation-noun subtitles ("your Core", "your Root") precisely so the list reads as
"already yours" rather than "not for you"; if testing shows the Core row still stings, the approved
mitigation is a one-line footnote on the friction panel: *"Already strong in you — no need to add."*

### Footnote doctrine (owner 2026-07-17 — jargon chips → float → Codex)

The space below the five tiles is the **footnote register**: a dotted-rule footer ("THE WORDS ON THIS
PAGE · TAP ONE") carrying the page's taught-term chips — the user's condition (Overfueled/Balanced/
Underfueled), Catalyst, Friction. Tapping a chip (or any in-context occurrence: the Folio's condition
pill, the SEEK/SKIP header pills) floats a definition card (the prototype's vdfloat chrome): term title
→ its LOCKED definition line → a personalized "For you: …" line (the chart's actual element lists) →
**"Deeper in the Codex →"** which routes to the existing Codex page (app-codex). The Folio's ?-circle
routes straight to the Codex (P-09i). Role definition lines shipped with this surface (owner wordsmith
pending): *Catalyst — "The energy your chart asks for — more of it moves you. Seek it on purpose:
places, work, people, seasons that carry it."* · *Friction — "Your own strength overgrown — more of it
costs you. Nothing to fix; just stop adding what you already hold."*

### Reconciliation & required fixes
- **Internal band keys untouched:** `concentrated/balanced/open` remain the code/content keys (150-key
  system); Charged/Balanced/Receptive are DISPLAY terms — same key-vs-label split as personas. REA_07
  registry row "energy band" needs updating on lock-registration (canonical user terms = these three).
- **⚠ LIVE VOCAB VIOLATION to fix:** `CodexScreen.jsx:46-52` surfaces the RAW engine string
  ("Yours is 庚 — Yang Metal, strong." — can even show "extremely weak"). Replace with the locked
  display terms + definition lines.
- **Role-verb proximity noted:** per-element role verb draft "feed it" (catalyst) vs chart-level
  "fuel" — different surfaces, close semantics; if too close once assembled, shift the role verb to
  "lean on it".
- 克-specific nuance (pressure to push against, vs 泄 drain / 耗 spend) lives in deep readings only —
  one verb at the surface, three mechanisms underneath.

---

## §5b — LOCKED: the five relation nouns (owner ruling 2026-07-16)

> **LOCKED 2026-07-16 (journey-handoff integration ruling): Core (Self 比劫) · Voice (Output 食伤) ·
> Drive (Wealth 财) · Duty (Authority 官杀) · Root (Resource 印).** Forks resolved: Drive over
> Harvest, Duty over Trial. **REA_07 law #4 is scoped to PERSONA-NAME slots only** (owner ruling,
> same date) — "The Root / The Trial / The Harvest" remain banned as persona names, but Root (and
> the words trial/harvest) are free in other slots; the relation noun Root is legal. Draft record
> below kept for history.

## §5b-history — DRAFT record (superseded by the lock above)

> Third vocabulary axis, opened 2026-07-14. The relation noun names what each element IS TO the Day
> Master — the family/function slot. Completes the glance grammar — since the 2026-07-15 directive
> (§5), two beats: **`[keyword] — your [relation]`** (e.g. Earth 33% → "Insight — your Root").
> Replaces the app's two-word family labels ("your support & nourishment") for first-glance surfaces.
> Note: the Profile-DB already carries non-surfacing one-word aliases (Flow / Trial / Root) — REA_01
> v2.1 note — so the codebase gestured at this list without locking it.

| Family | What it is to you | Draft noun | Alternates | Status |
|---|---|---|---|---|
| Self 比劫 | the element that *is* you — identity, peers | **Core** | Self, Kin | proposed |
| Output 食伤 | what you generate — expression, talent | **Voice** | Craft (Flow & Spark now claimed by v3 §4c: keyword 食神 + pole 伤官⬆) | proposed (strongest) |
| Wealth 财 | what you pursue & hold — reward, desire | **Drive** | Pursuit, Harvest, Prize | OPEN FORK: Drive vs Harvest |
| Authority 官杀 | what tests & structures you — pressure, duty | **Duty** | Trial, Test, Charge | OPEN FORK: Duty vs Trial |
| Resource 印 | what feeds & backs you — support, learning | **Root** | Ground, Anchor, Source | proposed |

**Iteration notes (2026-07-14):**
- **Core over Self** — "Self" collides with the Day-Master concept itself; the family is the self's
  *element* (incl. peers/rivalry). "Your Core" stays distinct.
- **Root over Ground — clash caught:** "Ground" collides with the locked Earth modifier **Grounded**;
  when Earth is the Resource (the reference Blade's case) it would read "Grounded Insight — your
  Ground". Root avoids it and echoes classical 印 imagery.
- **Drive vs Harvest** — Drive = the most natural English for how 财 *feels* (ambition, pursuit) but
  names the motion, not the object held; Harvest = truer to "everything worth having and keeping",
  on-brand organic register, less instant. Genuinely torn — owner to pick.
- **Duty vs Trial** — the noun must hold BOTH faces: Duty leans 正官 (gentle, warmer on a card);
  Trial leans 七杀 (fierce, more honest to 官杀 pressure; already the Profile-DB alias).
- Full-sentence test (reference Blade): *Sharp Independence — your Core · Vital Prudence — your Drive ·
  Grounded Insight — your Root · Deep Fluency — your Voice · Ardent Force — your Trial.*

---

## §6 — Worked compounds (A‑12345 examples)

**庚 The Blade (reference chart, REA_01 §3):** Metal 23% 金比肩 **Sharp Independence** (self) · Wood 33%
木正财 **Vital Prudence** (drive, catalyst) · Earth 33% 土偏印 **Grounded Insight** (ground, friction) ·
Water 6% 水食神 **Deep Fluency** (voice) · Fire 5% 火七杀 **Ardent Force** (forge, needed 用神).

Illustrative (faces/percentages notional): **甲 Oak** — Vital Independence · Grounded Prudence · Deep
Nurture · Sharp Order · Ardent Fluency. **丙 Sun** — Ardent Independence · Grounded Fluency · Sharp
Enterprise · Vital Nurture · Deep Force. **戊 Mountain** — Grounded Independence · Deep Prudence · Sharp
Brilliance · Ardent Nurture · Vital Force. **壬 Ocean** — Deep Independence · Vital Brilliance · Ardent
Enterprise · Sharp Insight · Grounded Order.

**Why the compound is the unit — the "Sharp" rotation:** the same Metal reads Sharp Independence (Blade,
self) · Sharp Order (Oak, pressure) · Sharp Enterprise (Sun, drive) · Sharp Brilliance (Mountain, voice)
· Sharp Insight (Ocean, support). Element alone could never say this; element × ten-god is the engine of
the whole system.

---

## §6b — Journey-handoff integration rulings (owner · 2026-07-16)

Rulings made while reviewing `design_handoff_reveal_reading_journey/` (the Reveal → Catalogue → 
Reading implementation bundle; source of truth `catalogue-answer-first/p6-journey.html`):

1. **The handoff's §7 "face representation" lexicon is REJECTED** (Selfhood/Craft/Challenge/
   Discipline/Intuition/Wisdom…, incl. a "Drive" collision with the relation noun). The
   representation word IS the §4 keyword: element screens render "The General · FORCE",
   "The Twin · INDEPENDENCE", etc. One lexicon everywhere.
2. **Identity-hero keyword chips = the top-3 keyword code** — the chart's three loudest elements'
   lead-face keywords, dominance-ordered (Blade: INDEPENDENCE · INSIGHT · CAUTION). The handoff's
   Precision · Standard · Edge placeholders are retired; chips are system-derived for all ten stems
   (nothing to author).
3. **Vocabulary locks closed** (see §4 v3-adopted note + §5b lock): everything the handoff ships
   is now legal vocabulary.
4. **Wheel seating law (condition-dependent)** — recorded canonically in
   `Design/exports/DOMINANCE_WHEEL_RULES.md` §2 AMENDMENT: Overfueled/Balanced → Core crowns the
   wheel, others CCW high→low; Underfueled → dominance order CCW (interpretation note flagged there).
5. **Build-level normalizations** (no ruling needed, recorded for the implementer): corrupted
   verdLab strings normalize to the SEEK/SKIP register; first-run flag = localStorage for guests +
   profile flag when signed in; element "Full reading" routes to the existing energy reading screens,
   DM CTA to the existing Day Master page; app tab bar replaces the prototype's; ELD keyword chips
   reconcile to §4b (role-conditioned, v3) at build.
6. **Templatization gap (the one content-work item):** element-screen title/tag/verdict strings are
   Blade-demo-tuned. Verdict lines become role+presence template formulas (~a dozen strings); hook/tag
   lines need DM-neutral rewrites or per-cell authoring (the §7 50-cell item). Until then, non-Blade
   charts render structure + engine data correctly but reuse element-generic hooks.

---

## §6c — Round-2 handoff rulings (owner · 2026-07-23)

Rulings during the round-2 implementation (`share-flow.html` bundle — Tiles identity card, wordsnote +
glossary sheet, redesigned pills):

1. **Per-element condition/remedy RATIFIED (role-driven) — §5c vocabulary EXTENDED to elements:**
   every energy now carries its own diagnosis line ("Your Metal is **Overfueled** — **Channel** it."):
   friction-side elements (incl. core excess) → Overfueled·Channel; catalyst-side (incl. missing) →
   Underfueled·Refill; Balanced charts → Balanced·keep the mix. The chart-level condition and the
   element-level conditions coexist (an Underfueled chart's friction element still reads Overfueled —
   the element itself is the chart's overloaded one).
2. **Seal dock KEPT** (owner override of share-flow, which hides it) — the wordsnote shares the scroll
   end with the dock via the round-1 overlap arrangement.
3. **The Tiles identity card is THE card** (locked, share-flow): eyebrow → mini dominance wheel
   (painting center, live dots/pips) → archetype → manifesto → top-3 keyword chips (§6b ruling carries
   over; the prototype's Precision/Standard/Edge remain placeholders) → core line + condition pill →
   Catalyst|Friction twin tiles with vertical bars. No personal name. Supersedes the round-1 silk card
   within the journey (the silk card remains on the legacy Day-Master route). Share rail: IG/TikTok/X →
   OS share sheet with the rendered PNG; Save; Copy link (per-user URL pending backend — APP_URL interim).
4. **Glossary W-lines shipped verbatim** (share-flow locked copy): Core / Catalyst / Friction one-liners
   + condition line per chart state (Overfueled verbatim; Underfueled/Balanced derived from the §5c
   definition pattern). Pill family one-liners (FAMILY_LINE) shipped verbatim from share-flow.
   Codex rows route to the existing Codex page pending the future codex/:word surface (better than the
   README's stub-toast; retarget when the route exists).
5. **Removed from pills per A3:** corner role ring, glance-label hook, pole-noun verdict line, flavor
   line. The §4b pole nouns remain locked vocabulary (glossary/deep-reading use); the §4b adjective
   chips now render role-conditioned on every pill.

## §7 — Open decisions & pending work

| Item | Status |
|---|---|
| **Implement the journey handoff** (reveal→catalogue→element screens per §6b rulings) | IN PROGRESS 2026-07-16 |
| **Element-screen verdict formulas + DM-neutral hooks** (§6b item 6) | NEXT content work |
| **Fix CodexScreen.jsx:46-52** — raw `dm.strength` string surfaces to users; replace with §5c locked terms | REQUIRED (found 2026-07-15) |
| **Register locked vocabulary in REA_07** — keywords v3, relation nouns, §5c terms; law-#4 scoping edit | REQUIRED now (locks closed) |
| ~~Relation nouns (§5b)~~ | ✔ LOCKED 2026-07-16 |
| Deeper per-cell readings (translate REA_01 §3's 50 semi-jargon "structural interactions" to plain English, role-aware) | NEXT — not started |
| Layer-2 diagnosis card design (function + role + yin/yang face bar) | after 50 cells |
| Surface valence framing (collapse 5 engine roles → 3 readable states: fuels / balanced / overloads-or-lacking?) | proposed, not locked |
| Code ordering (function-ordered code vs dominance-ordered reading — two views) | proposed, not locked |
| Speakable headline ("Core + defining relation", e.g. "a Blade, Alchemist-heavy") | proposed, not locked |
| Legacy `ENERGY_CONTENT` merge/retire into the 50 cells | required by §2, not implemented |
| Remaining archetype worked examples (乙 Vine · 丁 Candle · 己 Field · 辛 Jewel · 癸 Rain) | not drafted |
| REA_01 §2 amendment (Shareable code / MBTI resonance realized by this system) | owner to fold in |

**Do-not-break:** `DominanceWheel` consumes only `{el,presence,roles,major}` — the compound layer never
touches it. `EnergyShelf` catalogue anatomy (hook/pol/role) is the user-facing contract; the compound
enriches tiles, never replaces the catalogue.

---

## Document Metadata

| | |
|---|---|
| **Document** | Identity Vocabulary — the compound identity system + locked term registry |
| **Version** | 1.6 · 2026-07-16 (§4 v3 ADOPTED · §5b LOCKED · §6b journey-handoff rulings · law-#4 scoped) |
| **Status** | §4 keywords LOCKED (v3 final) · §5 modifiers RETIRED from labels · §5b relation nouns LOCKED · §5c strength+remedy LOCKED · §4b pole nouns/chips drafted · §6b journey rulings recorded · §7 items open |
| **Audience** | Owner, engineers, content generation |
| **Purpose** | Record of the compound (core + five relations) identity decisions: the two-system clash resolution, the three-layer architecture, the locked 10 face keywords + 5 element modifiers, and the 50-cell glance-label formula |
| **Companion to** | REA_01 §3 (50-key taxonomy) · REA_08_Reading_V2.1_Reconciliation_Audit.md · REA_04 |
