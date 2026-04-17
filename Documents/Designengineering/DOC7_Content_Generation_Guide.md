# DOC7 — Content Generation Guide

**Version:** 1.0 · April 2026  
**Purpose:** Prompt templates and quality standards for authoring Elementum content fields.  
Written against the live schema in `archetypeSource.js` — field names and data shapes are exact.

---

## What needs to be written

| Field | Location | Status | Count |
|---|---|---|---|
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

Variants are written from the DM's interior perspective (second person for the `psychCore` fields, but blocks are third person or second person depending on the label convention used in the live file — check the existing 庚 variants for the person/perspective used in each block and match it).

**From 庚 `concentrated` variant of "How you experience the world":**
> *"You evaluate before you engage. The assessment starts the moment you walk into a room — not as a decision you make but as a process that has already begun before you've chosen to begin it..."*

**From 庚 `tested` variant of the same block:**
> *"The world evaluates back. That's the specific texture when authority energy is dominant: the precision runs as it always does, but now something is running a read on you at the same time..."*

These are clearly different experiences, not stylistic variations.

### Prompt template — STEM block variants

```
You are writing variant text for Elementum's archetype blocks. You are writing variants for the [STEM] stem (archetype: [ARCHETYPE_NAME]).

STEM IDENTITY:
[psychCore.phrase — the named archetype]
[psychCore.desc — interior experience statement]

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
