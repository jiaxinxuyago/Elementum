# DOC7 — Content Generation Guide

**Version:** 1.0 · April 2026  
**Purpose:** Prompt templates and quality standards for authoring Elementum content fields.  
Written against the live schema in `archetypeSource.js` — field names and data shapes are exact.

---

## What needs to be written

| Field | Location | Status | Count |
|---|---|---|---|
| `identity.elementIntro.punch` + `.expand` | `archetypeSource.js` → `identity` | 庚 complete; 甲乙丙丁戊己辛壬癸 **[TODO]** | 9 pairs remaining |
| `outputs[].phrase` + `.desc` | `TG_CARD_DATA[tg]` | **[TODO] all 10** | 30 phrases, 30 descs |
| `frictions[].phrase` + `.desc` | `TG_CARD_DATA[tg]` | **[TODO] all 10** | 30 phrases, 30 descs |
| `text.{band}`, `text.{pattern}`, `text.{compound}` | `STEM_CARD_DATA[stem].blocks[]` | 庚 complete; 甲乙丙丁戊己辛壬癸 default-only | ~100 variants across 9 stems |

Everything else in `TG_CARD_DATA` — `rulingRealm`, `chips`, `gifts`, `shadows`, `hiddenDynamic`, `domainSignatures`, `sixRelations`, `liunianSignatures` — is already authored.

---

## Part 1 — TG outputs and frictions

### What they are

`outputs` and `frictions` are the mechanical production layer of a Ten God card. They answer:

- **outputs:** *When this force is well-placed and adequately resourced, it reliably generates ___.*
- **frictions:** *When this force operates without adequate support, it reliably generates ___.*

They are **not** personality traits, virtues, or flaws. They are structural outputs of a force — like describing what a gear does, not what the person is like. This distinction is load-bearing. The user reads these as: "the force in my chart has this effect on my life."

### The contract

**outputs** — mechanical production framing:
- Phrase: named phenomenon. What the force generates, named evocatively. ~3–6 words.
- Desc: one sentence. Starts from mechanism: "This force produces..." or "When well-placed, [TG] generates..." Do not begin with "You."

**frictions** — structural misalignment framing:
- Phrase: named structural pattern. ~3–6 words.
- Desc: one sentence. "When this force operates without [adequate X], it produces Y." Do not moralize. Do not use "you tend to" or "you struggle with."

Three of each. They should cover distinct territory — no overlapping mechanisms across the three. The full set of outputs + frictions together should give a complete functional picture of the force.

### Voice calibration

Reference the `hiddenDynamic` and `domainSignatures.text` fields for the correct register. Key properties:
- Describes mechanism, not person
- Precise without being clinical
- The shadow content does not apologize for the force
- No hedging phrases ("can sometimes," "may tend to")
- Short, final sentences — each ends somewhere

**What "mechanical framing" sounds like — reference from `七杀` career domain:**
> *"Exceptional in roles requiring genuine pressure-tolerance and leadership under adversity — emergency work, high-stakes entrepreneurship, competitive performance, crisis management. The authority that comes from demonstrated survival is recognized differently from institutional authority."*

That is the register. Not "people with 七杀 tend to be good under pressure." The force produces a specific outcome; describe the outcome.

**What output phrases sound like — reference the `rulingRealm.phrase` fields:**
- `比肩`: "Inner Validation — the ego's private standard"
- `七杀`: "Survival Instinct / Trauma / Resilience — forged, not developed"
- `正官`: "Social Armor / Good Student Complex — character shaped by chosen structure"

Outputs and frictions phrases should be of similar specificity — evocative and named, not generic.

### Prompt template — TG outputs + frictions

```
You are writing content for Elementum, a Bazi personality reading app. You are writing the `outputs` and `frictions` fields for the Ten God [TG_NAME].

CONTEXT — what you need to understand about this Ten God:

Ruling realm: [rulingRealm.phrase]
Realm description: [rulingRealm.desc]
Chips: [chips array]

Gifts (already authored — DO NOT REUSE these):
[gifts array, one per line]

Shadows (already authored — DO NOT REUSE these):
[shadows array, one per line]

Hidden dynamic (already authored — sets the interior register):
[hiddenDynamic]

Classical principle: [relevant classical line from the TG's domainSignatures or a well-known text about this TG]

---

FIELD DEFINITIONS:

outputs[] — 3 items, each with phrase + desc.
- phrase: Named evocative phrase (3–6 words). Names what the force generates when well-placed.
- desc: One sentence. Mechanical framing: "This force produces X" or "When adequate resources exist, [TG] generates Y." Do not begin with "You."
- Cover: what the force produces at peak function. Three distinct mechanisms — not variations on the same thing.

frictions[] — 3 items, each with phrase + desc.
- phrase: Named evocative phrase (3–6 words). Names a structural pattern when the force is misaligned or under-resourced.
- desc: One sentence. "When this force operates without [X], it produces Y." Do not moralize. Do not use "you struggle with."
- Cover: three distinct failure modes of the force — not personality flaws, structural tensions.

QUALITY CRITERIA:
- No overlap with gifts/shadows already authored
- No overlap between the three outputs (or three frictions)
- Phrase and desc are consistent — the desc describes what the phrase names
- No hedging language ("can sometimes," "may tend to")
- Does not describe the person — describes the force and its outputs
- Frictions are about structural misalignment, not character flaws

OUTPUT FORMAT — return exactly this JSON, nothing else:
{
  "outputs": [
    { "phrase": "...", "desc": "..." },
    { "phrase": "...", "desc": "..." },
    { "phrase": "...", "desc": "..." }
  ],
  "frictions": [
    { "phrase": "...", "desc": "..." },
    { "phrase": "...", "desc": "..." },
    { "phrase": "...", "desc": "..." }
  ]
}
```

### Worked example — 比肩

Applying the prompt above to 比肩 to illustrate expected output quality:

```json
{
  "outputs": [
    {
      "phrase": "Conviction That Doesn't Borrow",
      "desc": "This force produces positions formed entirely from internal evidence — not calibrated to what the room accepts, not hedged for social tolerance."
    },
    {
      "phrase": "Consistency Across Contexts",
      "desc": "The same values, the same standard, the same core — in every context, regardless of who is watching or what is expected."
    },
    {
      "phrase": "Trust That Holds Under Pressure",
      "desc": "When genuine access has been earned, 比肩 produces a quality of reliability that does not degrade under difficulty — it was never conditional on conditions."
    }
  ],
  "frictions": [
    {
      "phrase": "The Closed Loop",
      "desc": "When this force operates without genuine peers to introduce external reference points, the self-referencing standard validates itself — wrong conclusions persist because the error-correction mechanism requires a lateral input that isn't available."
    },
    {
      "phrase": "Resource Competition With Equals",
      "desc": "When operating in environments with others of similar nature, 比肩 produces structural contention — the same territory, the same resources, the same direction of force, no natural differentiation."
    },
    {
      "phrase": "Completeness as Barrier",
      "desc": "When this force is dominant without adequate expression channels, the self-sufficiency that is the output becomes the thing that prevents others from entering — the completeness closes the door it didn't mean to."
    }
  ]
}
```

### Batch generation note

All 10 TGs can be generated in a single prompt with slight modification — list all 10 TG contexts sequentially and ask for outputs/frictions for each. Verify: no phrase is reused across TGs; each phrase names something specific to that TG's mechanism.

---

## Part 2 — STEM variant block text

### What the blocks system does

Each stem has 11 blocks (narrative units). Each block has a `text.default` — the baseline for all 15 band×pattern configurations. The 庚 stem has authored variant text for specific configurations; the other 9 stems are default-only.

Variants are authored when the default text would meaningfully differ based on:
- **Band** (`concentrated` / `balanced` / `open`): how strongly the element is present in the chart
- **Pattern** (`pure` / `rooted` / `flowing` / `forging` / `tested`): which Ten God configuration is dominant
- **Compound** (`band_pattern`, e.g. `concentrated_tested`): when both matter simultaneously

Not every block needs every variant. Variants are only worth writing when the mechanism genuinely shifts — not when the default text is approximately correct with minor adjustments.

### Band meanings (as authoring context)

| Band | Meaning | Authoring implication |
|---|---|---|
| `concentrated` | Element is strong — 3+ stems in chart, or a strong daymaster | The native quality intensifies, sometimes to excess. The gift operates at higher amplitude; the cost also operates at higher amplitude. |
| `balanced` | Element is moderate — 1–2 stems, daymaster moderate | The default text. Neither excess nor deficit. The quality is available without being overwhelming. |
| `open` | Element is weak or absent | The quality must be actively sought, is less available, or arrives in its absence form. The person can recognize what's missing. |

### Pattern meanings (as authoring context)

The pattern = which Ten God type dominates the chart. This tells you what force is directing the stem's energy.

| Pattern | Dominant TG type | Authoring implication |
|---|---|---|
| `pure` | None — no dominant TG | The stem's quality operates without a dominant directive. Unconstrained, seeking a target. More open-ended. |
| `rooted` | Resource stars (印 — 偏印/正印) | The stem is supported and grounded. Energy arrives backed by structure. More deliberate, less urgent. |
| `flowing` | Expression stars (食伤 — 食神/伤官) | The stem's energy channels outward. Creative output, self-expression, what the person makes or produces. |
| `forging` | Wealth stars (财 — 偏财/正财) | The stem's energy directs toward material outcomes. Pragmatic, target-oriented. |
| `tested` | Authority stars (官杀 — 七杀/正官) | The stem operates inside a framework or under external pressure. The quality is tested and shaped by an external standard. |

### What makes a variant worth writing

Write a variant when **the mechanism of the block genuinely changes** for a specific band or pattern — not when the phrasing just needs adjusting.

**Variant is worth writing:**
- `concentrated` variant for "Where you consistently get stuck" — excess element changes the nature of the stuck (e.g. for 庚 concentrated, the assessment runs too hard and closes too fast)
- `tested` variant for "How you experience the world" — the authority configuration meaningfully reframes the first-person lens
- `flowing` variant for "What you're genuinely good at" — expression dominance means the skill set shifts toward output rather than assessment

**Variant is not needed:**
- Minor rephrasing that doesn't change the mechanism
- The block is already abstract enough that band/pattern don't shift its core meaning
- The default text is close enough that a variant would only add 10–15% specificity

庚's approach is the reference: look at blocks where the variant text describes a genuinely different experience from the default, not a rephrased version of it.

### Authoring convention for variants

Variants are written from the DM's interior perspective (second person for the `yourNature` fields, but blocks are third person or second person depending on the label convention used in the live file — check the existing 庚 variants for the person/perspective used in each block and match it).

**From 庚 `concentrated` variant of "How you experience the world":**
> *"You evaluate before you engage. The assessment starts the moment you walk into a room — not as a decision you make but as a process that has already begun before you've chosen to begin it..."*

**From 庚 `tested` variant of the same block:**
> *"The world evaluates back. That's the specific texture when authority energy is dominant: the precision runs as it always does, but now something is running a read on you at the same time..."*

These are clearly different experiences, not stylistic variations.

### Prompt template — STEM block variants

```
You are writing variant text for Elementum's archetype blocks. You are writing variants for the [STEM] stem (archetype: [ARCHETYPE_NAME]).

STEM IDENTITY:
[yourNature.phrase — the named archetype]
[yourNature.desc — interior experience statement]

BLOCK TO VARY:
Label: "[block.label]"
Default text: "[block.text.default]"

This block currently applies to all 15 band×pattern configurations. You are writing [VARIANT_TYPE] variants.

VARIANT TYPE CONTEXT:
[paste the relevant band or pattern meanings from Part 2 above]

TASK:
Write [variant_keys] variant(s) for this block. Each variant should describe a genuinely different experience than the default — not a rephrasing. The mechanism should shift, not just the tone.

QUALITY CRITERIA:
- Same perspective (second/third person) as the default text
- Same approximate length as the default (±20%)
- The variant clearly diverges from default in mechanism, not just phrasing
- No internal contradiction with the stem's identity
- Does not describe what the person should do — describes what they experience

OUTPUT FORMAT — return exactly:
{
  "[variant_key]": "[variant text]",
  "[variant_key_2]": "[variant text]"
}
```

### Which stems to prioritize for variants

Variants matter most for blocks where band or pattern strongly modulates the experience. Based on the 庚 authoring as reference:

- **Most impactful blocks for variants:** "How you experience the world," "Where you consistently get stuck," "What you rarely admit," "What holds you back without looking like it"
- **Lowest value to vary:** "What activates the best version of this" (already highly contextual; default usually holds)
- **Compound variants** (`concentrated_pure`, `concentrated_tested`): only write when both dimensions simultaneously create a meaningfully specific scenario

Practical approach: author `concentrated` and `open` band variants for the 4 highest-value blocks per stem first. That gives 72 variants (9 stems × 4 blocks × 2 bands) and covers the majority of meaningful divergence.

---

## Part 3 — Domain signatures (reference)

Already authored for all 10 TGs. Included here for completeness and as a guide if future TGs are added.

### mechanism field

Short evocative phrase naming the TG's territory in this domain. Format: `[TG] → [what this TG does in this domain]`. Examples:
- `七杀 → adversarial pressure tolerance, genuine authority under fire`
- `比肩 → peer dynamics, identity pressure, resource contention with equals`
- `正财 → disciplined acquisition, methodical specific control`

The mechanism is a title, not a sentence. It names the dynamic — the text elaborates it.

### text field

One paragraph, ~80–100 words. Two angles:
1. **What the force produces here** — the positive functional output in this domain
2. **What reveals itself here** — the structural shadow or cost

The two angles do not have to be in separate sentences. They can be woven. But both must be present. The text does not describe the person's character; it describes what the force does in this domain of life.

The register is the same as outputs/frictions — mechanical, not moralistic. "The authority that comes from demonstrated survival is recognized differently from institutional authority" — not "you are good at leadership roles."

---

## Quality standards — what passes

A piece of content passes if it meets all of:
1. **Mechanism, not character** — describes what a force produces, not what the person is like
2. **No hedging** — no "can sometimes," "may tend to," "often"
3. **Specific to the TG/stem/band/pattern** — would not apply equally well to a different configuration
4. **Consistent voice** — same register as the existing authored content (reference `hiddenDynamic`, `domainSignatures.text`)
5. **No overlap** — with already-authored fields in the same TG entry
6. **Phrase ↔ desc alignment** — the desc describes exactly what the phrase names

A piece of content fails if:
- It could be about any Ten God / any stem (not specific enough)
- It moralizes or implies the person should change something
- It begins with "You" (except in blocks that already use second person)
- It uses hedging language
- The phrase names something the desc doesn't describe

---

## §3 — elementIntro: punch + expand (all 10 stems)

### What they are

`identity.elementIntro` is the **"The Element" block** — Layer 0 of the Elemental Nature page. UI eyebrow label: *"THE ELEMENT · [Element]"*. It is the first text the user reads after the identity card. It describes the stem's elemental force as a world-building entity, not a personal reading. There is no "you". The register is game lore / fantasy codex / elemental force description.

Two fields per stem:

- **`punch`** — 9–12 words. Declarative. What this force *is*, grounded in classical Chinese source material. Reads like a codex definition or encyclopaedia entry. Element color, medium weight in UI.
- **`expand`** — 16–20 words. Adjective-rich. The felt vibe or presence of someone carrying this energy — not describing a trait, describing an atmosphere. Em-dash pivot structure preferred. Deep warm body color in UI.

Total: 28–32 words for the pair.

---

### Voice and register — non-negotiable constraints

- **No "you"** in either sentence. Not implied, not as "those who" as a euphemism for the reader. The energy is the subject.
- **Third person elemental force** — write as if describing a force in a fictional universe. Think: Dark Souls item description, fantasy codex entry, classical elemental treatise in English translation.
- **Classical grounding for punch** — every `punch` must be derivable from how classical Chinese texts describe the stem. Reference the element's nature (金木水火土), its polarity (Yin/Yang), its seasonal quality, its classical metaphor (blade, vine, flame, etc.), and its structural role.
- **Adjective-rich for expand** — `expand` should have at least 3 meaningful adjectives or adjective phrases. "Cold without cruelty", "structurally impossible to rush", "sharp without announcement" are the model. Avoid generic adjectives (powerful, strong, intense).
- **No moralising** — do not imply the energy is good or bad, dangerous or safe.
- **No hedging** — no "can sometimes", "tends to", "may".

---

### Sentence structure templates

**punch** — one of these two structures:
1. `"The [Archetype] is [classical definition of the energy]."`
2. `"The [Archetype] is [element quality] — [defining characteristic]."`

Keep the em-dash optional. If using it, the clause after must be ≤5 words and sharper than the clause before. Do not add a third clause.

**expand** — preferred structure:
`"[Adj] without [noun], [adj] without [noun] — [what it does in/to a person]."`

The "without" construction creates tension and prevents the adjectives from becoming generic praise. The em-dash pivot shifts from describing the force to describing its effect on whoever carries it.

Acceptable variations:
- `"[Adj], [adj], and [adj] — [what it does in a person]."`
- `"[Adj] and [adj] by nature, [what it does in a person]."`

---

### Classical source reference per stem

Use these classical characterisations as the grounding material for `punch`. Do not quote them directly — translate their essence into English.

| Stem | Element | Classical character | Key classical quality |
|---|---|---|---|
| 甲 | Yang Wood | 木之阳 · the rising force | Non-negotiable upward drive; spring's first break through frozen ground; growth before there is permission |
| 乙 | Yin Wood | 木之阴 · the adaptive vine | Lateral, persistent, finds the gap; survives by flexibility not force; the creeping strength that outlasts |
| 丙 | Yang Fire | 火之阳 · the open blaze | Radiating, revealing, unable to be contained; everything in its field becomes visible; warmth without preference |
| 丁 | Yin Fire | 火之阴 · the directed flame | Purposeful heat; the forge, the candle; transformation requiring proximity and intent |
| 戊 | Yang Earth | 土之阳 · the mountain | Immovable, load-bearing, the axis around which things organise; receives without moving |
| 己 | Yin Earth | 土之阴 · the soil | Fertile, absorbing, patient; transformation happens internally; nourishes what grows within it |
| 庚 | Yang Metal | 金之阳 · the blade / axe | Cuts, defines, restructures; the 肃杀 (austere cutting) force of autumn; clarifies by force |
| 辛 | Yin Metal | 金之阴 · the jewel / refined edge | Precision over power; the polished surface that reveals flaws; refinement as an act of discernment |
| 壬 | Yang Water | 水之阳 · the deep current | Vast, accumulating, moving beneath the surface; carries everything without being seen to carry it |
| 癸 | Yin Water | 水之阴 · the condensed drop | Concentrated, clarifying; the dew point; what distils from abundance into the essential |

---

### Quality gate

A pair passes if:
1. `punch` is 9–12 words and reads like a codex definition — one complete thought, no filler
2. `expand` is 16–20 words with at least 3 adjective phrases, no "you", no hedging
3. The two sentences are doing different jobs — `punch` defines, `expand` evokes
4. A reader unfamiliar with Chinese astrology can understand what kind of force this is from `expand` alone
5. The pair does not duplicate language from the stem's `manifesto`, `yourNature.desc`, or `energy.what`

A pair fails if:
- Either sentence begins with "You" or implies the reader directly
- `punch` uses more than one em-dash clause
- `expand` has fewer than 3 meaningful adjectives
- The two sentences feel like one idea split in two rather than two distinct registers
- The tone is self-help, psychological, or therapeutic rather than world-building

---

### Approved reference — 庚

```
punch:  "The Blade is the ancient cutting force of Metal."
expand: "Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided."
```

Word counts: punch 9 · expand 19 · total 28.
Adjective phrases in expand: "sharp without announcement", "cold without cruelty", "the stillness of something that has already decided" (3).
Classical grounding: 金之阳, 肃杀之气 (the austere cutting force of autumn Metal).

---

### Generation prompt template

Use this prompt per stem. Replace `[STEM]`, `[ARCHETYPE_NAME]`, `[ELEMENT]`, `[POLARITY]`, `[CLASSICAL_CHARACTER]`, and `[CLASSICAL_QUALITY]` with the values from the table above.

```
You are writing world-building text for a fantasy / game universe called Elementum. 
The universe is built on the classical Chinese Five Elements and Ten Heavenly Stems.

You are writing the elemental intro block for [STEM] ([ARCHETYPE_NAME]) — [ELEMENT] [POLARITY].
Classical character: [CLASSICAL_CHARACTER]. Key quality: [CLASSICAL_QUALITY].

Write exactly two sentences. No more, no less.

SENTENCE 1 (punch) — 9 to 12 words:
- Starts with "The [ARCHETYPE_NAME] is..."
- Declares what this elemental force IS, grounded in its classical Chinese character
- Codex register — like an encyclopaedia entry or game lore definition
- No em-dash unless the clause after is ≤5 words and sharper than the clause before
- No "you"

SENTENCE 2 (expand) — 16 to 20 words:
- Describes the felt vibe or atmospheric quality of someone who carries this energy
- Must contain at least 3 adjective phrases
- Preferred structure: "[Adj] without [noun], [adj] without [noun] — [what it does in a person]."
- No "you" — the energy is the subject, not the reader
- No hedging (no "can sometimes", "tends to", "may")

REGISTER: game lore / fantasy codex / elemental force description. Not self-help. Not therapy. Not personality psychology.

REFERENCE (庚, approved):
punch:  "The Blade is the ancient cutting force of Metal."
expand: "Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided."

Now write the pair for [STEM] ([ARCHETYPE_NAME]).
Output format — two labelled lines only:
punch: "..."
expand: "..."
```

After generation, verify word counts and run the quality gate before committing to `archetypeSource.js`.
Now write the pair for [STEM] ([ARCHETYPE_NAME]).
Output format — two labelled lines only:
punch: "..."
expand: "..."
```

After generation, verify word counts and run the quality gate before committing to `archetypeSource.js`.

---

## §4 — yourNature.desc: Archetype Variants (all 10 stems × 15 configs)

### What it is

`yourNature.desc` is the first personalised statement in the reading — the opening of the Archetype Variants layer. It is the text that appears under **"YOUR NATURE"** on the Elemental Nature page, immediately after the world-building "The Element" block.

It varies by `STEM_Band_tgPattern` — 15 configurations per stem, 150 total. The baseline version (balanced_pure) is hand-authored per stem. All 150 variants are generated via Pipeline A1 using this guidance as the system prompt.

**Field location:** `yourNature.desc` in `archetypeSource.js` (baseline) and `STEM_CARD_DATA[stem_band_tgPattern].yourNature.desc` (generated variants)
**Tier:** FREE — always shown, no paywall gate
**Length:** 2–3 sentences · 30–45 words total

---

### The governing principle

This statement is not describing what kind of person you are. It is **defining** something the person already knows about themselves but has never heard articulated this precisely. The target reaction is: *"Wow, this is me."*

Emotional resonance comes first. Bazi system accuracy is the foundation — but the reader experience is the product.

---

### Language guidance

**Define, do not describe.** A description tells you what something looks like. A definition tells you what something *is*. The statement should feel like it names an essential truth, not paints a picture.

**Provoking adjectives and short sharp phrases over descriptive prose.** Words and phrases that make the reader sit up — not because they're clever, but because they're exact. "Involuntarily exact." "The most alone in it." "They never quite stop feeling assessed." These land harder than full sentences explaining the same thing.

**No hedging, ever.** No "tends to", "may", "often finds themselves", "can sometimes". The statement speaks with the authority of a system that has been calculating this for centuries. It is declarative.

**Second person, present tense.** "You are." "Precision arrives." Not "people with this pattern" or "those who carry this energy."

---

### Universal structure

**Always lead with the person, never the trait in the abstract.**

`"The most [X] person in any [context], [paradox / cost embedded in the same breath]. [How the element/trait operates] — [what people experience] [what they don't find or what's missing]."`

The person comes first. The trait is introduced as something the reader already *is* — a social fact, a lived position — not as an abstract property being explained. The paradox follows immediately in the same sentence: the gift and the cost arrive together, not sequentially. Sentence 2 shows the mechanism through its effect on other people.

**What this structure prevents:**
- Starting with the trait in the abstract ("The precision is involuntary") instead of the person ("The fastest read in any room")
- Explaining a quality instead of depicting someone who carries it
- Separating gift and cost into different sentences where one subordinates the other

**S1 — Person first, paradox immediate.**
`"The most [X] person in any room, [the cost or paradox folded in]."`
The person is identified by their defining position in a room or relationship. The cost arrives in the same sentence, not as a correction but as part of the same truth. Both halves of the paradox are stated at full weight.

**S2 — Mechanism through people.**
Show how the trait operates by what people experience and what they don't find. The mechanism is implied through effect, not explained directly. The gap between what people get and what they can't reach is where the cost lives.

**The test:** Would a different stem feel wrong in this slot? Good. Does the cost feel like an afterthought? Rewrite. Does S1 feel complete without S2? Rewrite — they must do different jobs.

---

### Band dimension — how it shifts the statement

The band is the most significant variable. Each band produces a meaningfully different person, not a variation of the same person.

**Concentrated** — the native quality runs at maximum intensity, often ahead of the person's intention. It precedes them. The trait is amplified to the point where it can overwhelm. S1 should convey that the quality *precedes* the person — it is operating before they have chosen to engage. The cost is usually excess.

**Balanced** — the quality and its expression are in genuine conversation. The element works cleanly. S1 names the trait as something accessible and functional. The gift and cost are both present but neither is extreme.

**Open** — the quality is real but not the lead force. Something else is driving. S1 should convey a particular clarity — the native force is present but not overwhelming — alongside the particular absence when the element isn't fully available.

---

### tgPattern dimension — how it modifies the statement

tgPattern shifts the *channel* through which the nature expresses. It modifies the trait, not replaces it.

| Pattern | What it adds to the statement |
|---|---|
| `pure` | Unfiltered, undirected. The trait in its most essential form — no dominant Ten God shaping where it goes. Freer, less anchored. |
| `rooted` | Backed and weighted. Resource energy behind the trait — things built are more durable, assessments land heavier. |
| `flowing` | Expressive, outward. The trait finds channels easily. A productive, generative quality to how the nature operates. |
| `forging` | Under pressure. The nature is being tested and shaped. Operates sharpest when stakes are real; without friction, turns inward. |
| `tested` | Within or against structure. An external standard runs alongside the internal one. The trait is partly defined by what it meets. |

---

### Quality gate

A `yourNature.desc` passes if:
1. The trait is named first and is immediately recognisable — not a generic adjective
2. S1 defines, S2 does not repeat S1 in different words
3. Gift and cost carry equal syntactic weight — no subordinate clause demotes either
4. No hedging language anywhere
5. A reader who has never heard of Bazi would still feel seen by it
6. It would feel *wrong* for a different stem or a different band — it is specific to this configuration

A `yourNature.desc` fails if:
- It describes rather than defines
- The cost is an afterthought ("but sometimes...")
- It could apply to multiple stems
- It uses descriptive prose where a sharp phrase would do
- It starts with "You are" followed by an adjective list

---

### Approved reference — 庚_balanced_pure

```
"The most honest person in any room, often the most alone in it. Precision arrives before warmth does — people lean on the edge and rarely find what's behind it."
```

Word count: 32. Band: balanced — trait accessible, both sides present but neither extreme. tgPattern: pure — the precision runs in its essential form, no dominant Ten God directing it. S1 identifies the person by their position in a room and folds the cost into the same sentence. S2 shows the mechanism through what people experience and what they don't find.

---

### Generation prompt template

```
You are writing the `yourNature.desc` field for Elementum — a Bazi-based personality reading app.

This field is the first personalised statement in the reading. It appears under "YOUR NATURE" immediately after a world-building intro. The target reaction from the reader is: "Wow, this is me."

CONFIGURATION: [STEM] ([ARCHETYPE_NAME]) · Band: [BAND] · tgPattern: [TGPATTERN]

STEM CHARACTER: [classical description of the stem's nature — from the archetypeSource reference]
BAND CONTEXT: [concentrated / balanced / open — what this means for how fully and intensely the nature operates]
TGPATTERN CONTEXT: [pure / rooted / flowing / forging / tested — what this adds to the channel of expression]

LANGUAGE RULES:
- Always lead with the person, never the trait in the abstract. "The fastest read in any room" not "The precision is involuntary."
- Depict someone — identify them by their position in a room or relationship, not by their psychological properties.
- Fold the paradox into S1: gift and cost arrive in the same sentence, not sequentially.
- S2 shows the mechanism through what people experience and what they don't find. Effect, not explanation.
- No hedging: no "tends to", "may", "can sometimes", "often finds themselves"
- No "but" that demotes the cost — both truths carry equal weight
- No abstract trait-labelling: never start a sentence with a noun that describes a quality ("The precision...", "The clarity...", "The warmth...")

STRUCTURE:
S1: "The most [X] person in any [context], [paradox / cost in the same breath]."
S2: "[How the trait operates] — [what people experience] [what they don't find or what's missing]."

LENGTH: 2–3 sentences · 30–45 words total

APPROVED REFERENCE (庚_balanced_pure — match this tone and structure exactly):
"The most honest person in any room, often the most alone in it. Precision arrives before warmth does — people lean on the edge and rarely find what's behind it."

Generate one `yourNature.desc` for the configuration above.
Output: the statement only, no explanation.
```

