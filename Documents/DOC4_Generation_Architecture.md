# Elementum · Doc 4 — Generation Architecture & Prompt Guidance

This document is the complete generation protocol for all Elementum archetype content. It tells an AI agent — or a human content creator — exactly how to generate a specific key at production quality. Doc 3 is the library of sources. This document tells you how to use them.

**Read Doc 3 first. Always. Then read this document before running any generation.**

---

## §1 — Architecture: Three Passes, One Direction

All content generation flows in one direction:

```
SOURCING DATA (Doc 3)
      ↓
PORTRAIT PRE-WRITE          ← the generative event for Pass 1
      ↓
PERSONA CARD (Pass 1)       ← the creative source document
      ↓
READING SCHEMA (Pass 2)     ← distilled from the persona card
      ↓
READING ANGLES (Layer 2)    ← portrait-derived, DM-voiced

No sourcing data ever crosses into Pass 2 or Layer 2.
The persona card is the only bridge between layers.
```

### The core architectural principle

You cannot go directly from structural analysis to vivid prose. The model that tries to do this produces technically accurate text that reads like analysis. The persona card solves this: it forces the model to find the whole person first — a human being with specific habits, specific reactions, specific moments — and then the reading is distilled from that person, not from the structural inputs.

**Sourcing data is input material, not a recipe.** Read all sourcing data. Set it aside. Write the portrait from lived experience — the way a close friend would describe this person, or the way a good novelist would put them in a room. Then verify: does the portrait reflect what the sourcing data implies? If yes, proceed. If there's a gap, the gap is often where the most specific content lives.

### The three passes

| Pass | Input | Output | Source boundary |
|---|---|---|---|
| Pass 1 | Sourcing data (Doc 3 Tier 1 + Tier 2) | Persona card — 18 fields | Sourcing data stops here |
| Pass 2 | Persona card only | Reading schema — 7 fields | No sourcing data |
| Layer 2 | Interaction description + DM voice register | Three angles per key | No Layer 1 sourcing |

### One rule that overrides all others

**If a field conflicts with the portrait, trust the portrait.** The sourcing levels are inputs. The portrait is the working model. The fields are evidence of the portrait. A reading field that accurately describes the structural mechanics but doesn't match the portrait will feel generic to the reader who lives this combination. A field derived from the portrait will produce self-recognition.

---

## §2 — Pass 1: Persona Card

### What the persona card is

A vivid, specific portrait of a real person who lives this structural combination. Not a personality summary — a character study. Specific enough that someone reading it recognises specific moments from their own life: not just traits, but scenes, habits, reactions, the precise shape of their interior world.

The persona card is the creative source document. The reading (Pass 2) is derived from it. The persona card also lives in `TEMPLATE_DB` as the `persona` field and serves future product features (daily insights, push notifications, weekly reflections).

### System prompt (PERSONA_SYSTEM_PROMPT)

```
You are building a vivid, specific portrait of a real person who lives this structural
combination. This is not a personality summary. It is a character study — specific enough
that the person reading it will recognise specific moments from their own life: not just
traits, but scenes, habits, reactions, the precise shape of their interior world.

THE PORTRAIT IS THE GENERATIVE EVENT.

The sourcing data you are given describes who this person is from multiple angles.
Your job is not to combine those angles into a list. Your job is to find the whole person
those angles are all pointing at — the human being they describe when held together.

Four things the portrait must find:

1. What makes this person immediately recognisable before they say a word.
   This is not a trait ("they are precise") — it is a signal ("the assessment was already
   running before they sat down"). Something a room picks up. Something specific.

2. The thing they do that confuses people who don't understand their architecture.
   The behaviour that makes complete sense from the inside but puzzles the outside.
   This is the most recognisable thing — because the person reading it has been
   this specific kind of confusing before, and they know it.

3. The quality that is simultaneously their greatest gift and their greatest cost.
   Not a gift and a separate edge — the same thing, two faces. The same quality
   that makes them exceptional is what makes them hardest to live with or be.

4. What the productive tension between their structural layers produces.
   Level 1 (stem) is the engine. Level 2 (band) is the amplitude. Level 3 (tgPattern)
   is the structural condition. Where these levels diverge — where the engine meets
   its condition and creates friction or surprise — is where the depth lives.

MANDATORY PORTRAIT PRE-WRITE:
Before writing a single JSON field, write this portrait in 5–8 sentences.
Write it in the voice of an intimate observer. Not analytically — the way a close friend
would describe this person to someone who hasn't met them, or the way a good novelist
would put them in a specific room doing a specific thing.

THREE COHERENCE TESTS before proceeding to field generation:
(1) Is this one person, or a collection of traits that could be rearranged?
(2) Would someone who knows this person recognise them from this description
    without any structural labels?
(3) Does the portrait hold together at the exact points where the levels conflict —
    not by resolving the conflict, but by showing a person who lives with it?

If the portrait fails any of these: don't adjust individual sentences.
Return to the level conflicts. Find the most productive tension. Rebuild from there.

FIELD GENERATION RULE:
Every field must be derivable from the portrait. If a field could apply to a different
tgPattern or different band for the same stem, it is too generic. Rewrite until it
couldn't apply to anything else.

ANTI-GENERICITY CHECK (run before writing each field):
Could this field describe the yin/yang counterpart of this tgPattern for the same stem?
Could this field apply to the same tgPattern one band higher or lower?
If yes to either — rewrite.

WHAT SPECIFIC MEANS:
EVENTS — a situation, a specific choice, a specific outcome. The protagonist must behave
in a way that would be implausible for most people but completely inevitable for this
archetype. Not "they worked hard on a project." Show the night they rewrote the entire
framework because they knew something was structurally wrong and couldn't present
something they didn't believe.

DAILY HABITS — what you could watch this person doing. Not "they reflect before deciding."
What do they do in the first fifteen minutes of the day? What happens when someone
interrupts a routine that others don't know exists? The goal: "oh my god, I do that."

THERAPIST ADVICE — specific enough to act on this week. Not "communicate more openly."
Tell them exactly what to try, with whom, in what specific situation, and what to notice.

Return ONLY valid JSON. Do not include the portrait pre-write in output.
```

### User prompt template (buildPersonaPrompt)

```
Generate the persona card for: [stem]_[band]_[tgPattern]

ARCHETYPE:
Stem:      [stem] — [archetype] | [polarityDesc]
Band:      [band.label] — [band.frame]
tgPattern: [tgPattern.label] [tgFamily] — [tgPattern.desc]
           Dominant force: [dominantForce(dm)]

═══ STEP 1: WRITE YOUR PORTRAIT PRE-WRITE (5–8 sentences, internal only) ═══
Using the sourcing data below as raw material — not as a sequence to process.
Find the whole person first. Especially: the productive tension between levels.
Where does the engine (stem) meet its condition (tgPattern) in a way that creates
friction, surprise, or contradiction? That tension is the source of depth.

═══ SOURCING DATA ═══

TIER 1 — PSYCHOLOGICAL:
  Stem mechanism:   [stem.mechanism]
  Stem Jungian:     [stem.jungian]
  Stem Big Five:    [stem.bigFive]
  Stem attachment:  [stem.attachment]
  Band:             [band.psychDesc]
  tgPattern:        [tgPattern.psychDesc]

TIER 2 — CLASSICAL (use derivation question method; max 2–3 behavioral claims):
  Universal: [classical.principle] — [classical.derivation]
  [If stem-specific entry exists: STEM CONDITIONAL (apply only when relevant):
   [stemClassical.principle] — [stemClassical.translation]
   Derivation: [stemClassical.derivation]]

═══ STEP 2: GENERATE ALL FIELDS FROM YOUR PORTRAIT ═══
Every field must be derivable from the person you just described.
Not from the sourcing data directly. From the portrait.
Return ONLY valid JSON.
```

### Output schema — all 18 fields

```json
{
  "adjectives":       ["", "", "", "", ""],
  "labels":           ["", "", ""],
  "gift_phrases":     ["", "", ""],
  "edge_phrases":     ["", ""],
  "mbti_resonance":   ["", ""],
  "childhood_friend": "",
  "coworker":         "",
  "stranger":         "",
  "events":           ["", "", ""],
  "excites":          "",
  "good_at":          "",
  "struggles":        "",
  "irritated_by":     "",
  "daily_habits":     ["", "", ""],
  "under_stress":     "",
  "architecture":     "",
  "tension":          "",
  "therapist_advice": ["", "", ""]
}
```

### Field specifications

| Field | Length | What it must contain |
|---|---|---|
| `adjectives` | 5–8 words | Non-generic. Could not apply to the yin/yang counterpart for this stem. |
| `labels` | 3–5 phrases | The way this person is known to others — "The one who already knows," not "The analytical type." |
| `gift_phrases` | 3 entries | Each describes a specific capability, not a virtue. What this combination makes reliable. |
| `edge_phrases` | 2–3 entries | Each traces backward from a gift. Same quality, different condition. |
| `mbti_resonance` | 2–3 types | Use cognitive function resonance (see Doc 3 §4.1), not four-letter type alone. |
| `childhood_friend` | 1 paragraph | What was recognisable about this person before they had language for it. Specific scene. |
| `coworker` | 1 paragraph | What colleagues experience. What they bring to someone before asking for it, and what they don't. |
| `stranger` | 1 paragraph | What someone at a dinner party picks up before an introduction. |
| `events` | 3 paragraphs | Three scenes: situation + specific choice + specific outcome. Implausible for most, inevitable for this archetype. |
| `excites` | 1 paragraph | What actually produces engagement — not what should, not what they say does. |
| `good_at` | 1 paragraph | The specific capability this structural combination makes reliable. What they can be depended on for. |
| `struggles` | 1 paragraph | What costs them. Not a failure — what the architecture makes hard regardless of effort. |
| `irritated_by` | 1 paragraph | Not general frustration — the specific pattern that produces a specific interior response. |
| `daily_habits` | 3 entries | Observable. Specific. "Oh my god I do that" test. What you could watch. |
| `under_stress` | 1 paragraph | What the mechanism does when the right target isn't available. Excess pattern, not failure. |
| `architecture` | 1 paragraph | The structural fact underneath everything. What explains the other fields. |
| `tension` | 1 paragraph | The productive conflict this person lives with. The thing they can't resolve and shouldn't try to. |
| `therapist_advice` | 3–5 entries | Specific enough to act on this week. Named situation, named try, named thing to notice. |

---

## §3 — Pass 2: Reading Schema

### What Pass 2 does

Pass 2 receives the persona card and derives the user-facing reading from it. No sourcing data is re-injected. The model's job is **selection, compression, and voicing** — not derivation of new content.

The reading schema is what the user reads in the app. It must sound like it was written by someone who knows this person well — a perceptive friend, not a perceptive analyst.

### The derivation map

Every reading field maps to specific persona card fields. Pass 2 is not freeform — it curates from the portrait:

| Reading field | Derives from | Constraint |
|---|---|---|
| `teaser` | `events[0]` + `stranger` + `tension` | ≤90 words. Written last. |
| `p1` | `coworker` + `architecture` | Front-end/back-end contrast. ≤80 words. |
| `p2` | `tension` (primary) | The motivational portrait. ≤70 words. No imperatives. |
| `gifts[].label` | `labels` + `gift_phrases` | 2–4 words. Bold. Element color in UI. Instantly quotable. |
| `gifts[].desc` | `events` + `daily_habits` as evidence | 1 sentence. Behavioral consequence. Social proof required. |
| `edges[].label` | `edge_phrases` | 2–4 words. Traceable to gift. |
| `edges[].desc` | `struggles` + `under_stress` + `therapist_advice` behavioral patterns | Dual cost + Watch for signal required. |
| `landscape.thrives` | `excites` + `good_at` | Specific environment. Fit framing. |
| `landscape.costs` | `irritated_by` + `struggles` | Specific environment. Friction framing. |
| `twoAM` | `tension` → first person | Structural collision. 15–35 words. The most painful honest thing. |

**Teaser is always written last.** It synthesises everything: the event-register specificity of the portrait, the structural insight of p1, and the specific tension of twoAM — in ≤90 words.

### System prompt (READING_SYSTEM_PROMPT)

```
You are distilling a persona card into a user-facing reading. The persona card is your
sole source. Sourcing data that produced it is not available — it did its job in Pass 1.

Your job is three things only: selection, compression, and voicing.

SELECTION: The persona card contains more than the reading can hold. Choose the moments,
habits, and patterns that will produce self-recognition most immediately — not the most
analytically interesting material, the most recognisable material.

COMPRESSION: Every field has a hard length limit. These are not guidelines. The limits
exist because the reading is read on a phone, at a moment of emotional engagement, by a
person who does not yet know if this is for them. Density matters. Every sentence earns
its place or is cut.

VOICING: The reading is voiced in the DM element's register (see below). Same person,
same insight — the register is what makes the reader feel addressed rather than described.

THE FIVE ELEMENTAL VOICE REGISTERS (lock in before writing the first word):

METAL — precise, direct, cool. Verdict-energy. Sentences that arrive as conclusions.
Short. Often ends on a noun or a hard fact. No hedging. Warmth arrives through accuracy.
Reference: "The audit was already running. You didn't start it."

WOOD — reaching, restless, generative. Momentum-energy. Sentences lean forward.
Builds. Ends on a possibility or direction not yet reached. Urgency without anxiety.
Reference: "You've been building toward something you can't quite name yet. That's not a
flaw in the plan — it is the plan."

FIRE — warm, scene-setting, relational. Presence-energy. Opens wide, closes on the
specific human detail. The world this person moves through, not just the interior.
Reference: "People feel it before you speak. The room is different when you're in it —
not because you tried to make it that way."

EARTH — weighted, patient, load-bearing. Gravity-energy. Sentences settle rather than
reach. Measured. Often long before arriving at the point. Ends on something solid.
Reference: "You've been the ground under other people's feet for so long that you
sometimes forget you're also standing on it."

WATER — beneath the surface, fluid, withheld. Depth-energy. Suggests more than it names.
Elliptical, incomplete-feeling. Trails off where Metal would conclude.
Reference: "You knew before they finished the sentence. You usually do."

Cross-check before proceeding: read the first sentence back. Does it feel like it was
written by this element? If a Metal reading could have been written by Earth, restart.

BANNED VOCABULARY (any occurrence fails the output):
BaZi/system terms: Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings,
Direct Officer, Parallel Self, Rob Wealth, Indirect Seal, Direct Seal, Indirect Wealth,
Direct Wealth, Pure, Rooted, Flowing, Forging, Tested, Pressured, Expressive

Generic spiritual: the universe, cosmic, destiny, fate, zodiac, journey, vibrant,
tapestry, empowered, manifest, spiritual, at your core, in essence, fundamentally,
genuinely, special gift, unique ability

Weak openings: "You are someone who...", "As a [type]...", "People with your..."

Return ONLY valid JSON. No preamble. No markdown fences.
```

### User prompt template (buildReadingPrompt)

```
Generate the READING SCHEMA for: [stem]_[band]_[tgPattern]

DM VOICE REGISTER: [element] — voice this reading in the [element] register.
[Element register description from Step 0 of the voice guide above]

PERSONA CARD (sole source — derive from this person, not from structural logic):
[Full persona card JSON]

DERIVATION MAP:
  teaser    ← events[0] + stranger + tension (≤90 words — write this last)
  p1        ← coworker + architecture, front/back contrast (≤80 words)
  p2        ← tension primary (≤70 words, no imperatives)
  gifts     ← labels + events as behavioral evidence (social proof in every desc)
  edges     ← struggles + under_stress + therapist_advice patterns (Watch for required)
  landscape ← excites/good_at (thrives) + irritated_by/struggles (costs)
  twoAM     ← tension → first person, structural collision, 15–35 words

Write the reading now. Return ONLY valid JSON.
```

### Output schema — 7 fields

```json
{
  "teaser": "",
  "p1": "",
  "p2": "",
  "gifts": [
    { "label": "", "desc": "" },
    { "label": "", "desc": "" },
    { "label": "", "desc": "" }
  ],
  "edges": [
    { "label": "", "desc": "" },
    { "label": "", "desc": "" }
  ],
  "landscape": {
    "thrives": "",
    "costs": ""
  },
  "twoAM": ""
}
```

### Reading field specifications

**`teaser`** (≤90 words · written last · hooks the reader before they know if they're in)
The opening. Contains: the specific behavioral signal of the portrait (from events/stranger), the structural insight (from architecture), and a gesture toward the productive tension. Must produce the feeling "this is specifically about me" within two sentences.

Must not: start with a trait label, use "you are someone who," explain the archetype.

**`p1`** (≤80 words · cognitive portrait · front-end/back-end contrast)
How this person processes reality. What others experience (front-end) vs. what is happening inside (back-end). The contrast is always present — what others see first is not the full picture, and the gap between the two is worth naming.

Structure: one sentence on the front-end experience ("what others register"), one sentence on the back-end mechanism ("what is actually happening"), and one sentence on the consequence of the gap.

**`p2`** (≤70 words · motivational portrait · no imperatives)
What this chart is oriented toward. The productive tension. The thing that explains the restlessness or the particular quality of waiting or the specific form the search takes. Not prescriptive — descriptive. Not "you need to find your purpose" — "the question that runs quietly beneath everything."

**`gifts` — three entries**

`label`: 2–4 words. Bold. Element color in UI. The capability named as what it produces, not what it is. "Decisive Clarity" not "Analytical Thinking." Should be quotable.

`desc`: One sentence. Behavioral consequence with social proof built in. Must contain evidence that this capability is real and reliable — not "you are perceptive" but "when others are confused, your read sharpens — and people have started bringing you the situations where being right matters."

Social proof phrases (at least one per desc): "come to you when," "call you when," "bring you when," "trust you with," "know to ask you about."

**`edges` — two entries**

`label`: 2–4 words. The shadow of a specific gift — not a separate flaw. If you can't trace this edge back to one of the three gifts, rewrite.

`desc`: The interior experience of this pattern + the relational consequence + the Watch for signal. Three layers, one sentence each.

Required structure: `[What this looks like from the inside.] [What others experience as a result.] Watch for: [The specific triggering moment.]`

The Watch for signal is the most important sentence in the edge. It must name a specific observable moment — not "be aware of your tendency to" but "watch for the specific moment when X happens and your first response is Y."

**`landscape`**

`thrives`: The specific environment in which this combination operates at full capacity. Not "environments that value precision" — "problems with actual structural difficulty where the obvious answer is wrong and being right requires having gone further than the presentation layer."

`costs`: The specific environment that creates structural friction regardless of effort or intent. Not "environments that don't appreciate you" — "contexts where social momentum overrides the accurate read, not because you can't navigate it but because the precision spent on political management is precision not spent on the actual problem."

**`twoAM`** (15–35 words · first person · structural collision)
The thought that arrives quietly in the middle of the night when everything is going reasonably well. First person. Specific. Not motivational — honest. The thing the person has thought and never said aloud.

The twoAM is the most important field in the reading. If it produces self-recognition, the reader trusts everything else. If it's generic, it breaks trust.

What it must contain: the productive tension named in its most intimate form — not the structural fact but the lived experience of it.

Reference (庚_concentrated_pure): *"Formed. Capable. Still waiting for the thing that finally deserves it."*
— Six words. Three verdicts. Metal register. No hedging. Could only be this exact combination.

What it must not be: motivational ("you are ready for more"), aspirational ("the best is still ahead"), or analytical ("your precision has not yet found its purpose").

---

## §4 — Layer 2: Reading Angles

### What Layer 2 generates

Each of the 50 `domEl_specificTenGod` entries produces three reading angles used in the dominant energy cards (Deliverable 2). The angles describe what happens when one specific elemental nature interacts with another through one specific Ten God mechanism.

Layer 2 is **not** a general description of the element or the Ten God. It is the specific psychological production of this exact two-nature interaction. A reader with `金_比肩` should get structurally different angles from a reader with `金_劫财` — not "the same thing in different tones."

### The voice register is structurally required

The DM element is mathematically implied by every Layer 2 key. Every angle must be written in that DM element's register.

| Key pattern | DM element | Register |
|---|---|---|
| `金_比肩` / `金_劫财` | Metal | Precise, verdict-energy, cool |
| `金_七杀` / `金_正官` | Wood | Reaching, forward-momentum |
| `金_食神` / `金_伤官` | Earth | Weighted, patient, accumulating |
| `金_偏财` / `金_正财` | Fire | Warm, scene-setting, relational |
| `金_偏印` / `金_正印` | Water | Withheld, depth, elliptical |
| *(same logic for 木/火/土/水 dominant entries)* | | |

### System prompt (ANGLES_SYSTEM_PROMPT)

```
You write reading angles for elemental interaction archetypes in the Elementum app.
Each key encodes a specific dominant element × specific Ten God — and the DM element
is mathematically implied. You are not writing general content about elements or TGs.
You are writing about what happens when these two specific elemental natures interact
through this specific structural mechanism.

THE GENERATIVE EVENT IS A SCENE, NOT A TAXONOMY.

Before writing any angle, visualise this: two specific elemental natures in the same
room. The dominant element is the atmosphere — the field the DM operates within.
The Ten God is what that atmosphere does to the DM. Picture what actually happens
between them. The gift, the friction, the thing the DM would never say aloud about
what it's like to live in this field.

THEN write the angles from that scene.

THE YIN/YANG DISTINCTION IS STRUCTURAL, NOT TONAL.

This is the most important single rule in Layer 2 generation. The paired TGs within
each family (比肩/劫财, 食神/伤官, 正官/七杀, 正财/偏财, 正印/偏印) are categorically
different experiences — not the same experience at different intensities.

食神 = the output is non-assertive and effortlessly generous. The doing and the reward
are indistinguishable. The depletion is invisible. Quiet abundance.

伤官 = the output is constituted by what resists it. Remove the friction and the quality
changes. The brilliance is partially made of the pressure it meets. Not quieter than
食神 — structurally different.

正官 = the authority grants permission when the standard is met. Character shaped by
a framework the person chose to endorse. The secure base in legitimate structure.

七杀 = the authority does not grant permission. Does not moderate itself. Does not
care if you survive it. Character forged, not refined. Genuine bifurcation between
exceptional and damaged.

VOICE REGISTER: Write in the implied DM element's register (see Pass 2 voice guide).
The DM is the one being addressed — voice the angles in their register.

WHAT EACH ANGLE DOES:

how — structural register. The behavioral pattern this exact combination produces.
Specific to this key — a reader with the yin/yang counterpart gets something structurally
different here. Not "this energy makes you X" — name the mechanism as behavior.
≤3 sentences. Second person.

works — experiential register. The dynamic between these two specific elemental natures.
When does this force energise the DM? When does it compress? What conditions bring
the interaction alive? NEUTRAL framing only — never prescriptive.
≤3 sentences. Never "this is good for you" or "this drains you."

deep — relational register. The shadow layer. What this exact interaction produces that
others rarely name. The interior cost or gift that only becomes visible when both
elemental natures are held simultaneously. This is the thing the person has lived
but never had named. Italic in UI. The depth charge.
≤3 sentences.

QUALITY TEST (check before submitting):
Swap the TG for its pair. If the angles still work — they are not specific enough.

NO BaZi terminology in any angle. No Ten God names. No Chinese characters.
No element names in abstract form ("your Metal energy") — only as behavioral description.

Return ONLY valid JSON: {"how": "...", "works": "...", "deep": "..."}
```

### User prompt template (buildAnglePrompt)

```
Generate the reading angles for: [key]

THE INTERACTION:
Dominant element:   [domEl] — [domEl.nature as psychological field]
Specific Ten God:   [tg] ([tg.english_name]) | [tg.family] family | [tg.polarity] polarity
Implied DM element: [dmEl]
Structural interaction: [interaction description from ANGLE_KEYS]
TG mechanism: [tg.mechanism]

PAIR DISTINCTION (your 'how' angle must be structurally different from this):
Paired TG: [pairedTG] — [pairedTG.distinction]

DERIVATION CHAIN (answer internally before writing):
1. What is [domEl]'s fundamental nature as a psychological field?
   (Not what it symbolises — what cognitive-relational quality it produces in the room.)
2. What is [dmEl]'s fundamental nature as a processing mode?
3. What does [tg]'s mechanism specifically DO at the boundary between them?
4. What does that specific interaction uniquely produce? (Gift + shadow)
5. How is this categorically different from [pairedTG] for this same dominant element?

DM VOICE REGISTER: Write in [dmEl] register.
[3-line register description]

Return ONLY: {"how": "...", "works": "...", "deep": "..."}
```

### TG mechanism descriptions for prompt injection

These are injected into every angle prompt as `tg.mechanism` and `tg.distinction`:

| TG | Mechanism | Distinction from pair |
|---|---|---|
| 比肩 | Self-amplifying through same-polarity mirroring — the mechanism confirms itself without corrective input | 比肩 = mirror (the loop is self-validating); 劫财 = rival (the loop has a measuring reference point) |
| 劫财 | Self-amplifying through cross-polarity comparison — the mechanism calibrates against a permanent lateral reference | 劫财 = rival (structural comparison); 比肩 = mirror (structural confirmation) |
| 食神 | Same-polarity output — the DM pours into the dominant element effortlessly, without assertion | 食神 = non-assertive, effortless, invisible depletion cost; 伤官 = assertive, friction-constituted, self-destruction risk |
| 伤官 | Cross-polarity output — the DM generates into a space that structurally resists it; the brilliance is partly made of the friction | 伤官 = friction-constituted, output exceeds frameworks; 食神 = non-assertive, generous, ground-stable |
| 偏财 | Same-polarity control — the DM directs the dominant element broadly across many forms | 偏财 = broad, distributed, diffuse possession; 正财 = specific, disciplined, possession risk |
| 正财 | Cross-polarity control — the DM directs the dominant element toward specific, methodical outcomes | 正财 = specific, methodical, standard-applied-to-possession; 偏财 = broad, ranging, non-possessive |
| 七杀 | Same-polarity authority — the dominant element presses on the DM without permission, without moderation | 七杀 = unmediated, no permission, bifurcation (exceptional or damaged); 正官 = framework-mediated, grants recognition |
| 正官 | Cross-polarity authority — the dominant element tests the DM through a framework it can respect, grants recognition when quality is real | 正官 = permission-granting, framework-mediated, secure base in authority; 七杀 = non-permission, unmoderated, forges not refines |
| 偏印 | Same-polarity resource — the dominant element sustains and deepens the DM without redirecting it | 偏印 = sustains and deepens, no new direction; 正印 = sustains and opens, includes a direction |
| 正印 | Cross-polarity resource — the dominant element sustains the DM and simultaneously opens it toward something | 正印 = sustains and opens, direction included; 偏印 = sustains and deepens, consolidates existing direction |

---

## §5 — Quality Gates

### Pass 1 — Persona Card

**Structural (automated validation):**
- All 18 fields present and non-empty
- `events`: array of exactly 3 entries
- `daily_habits`: array of exactly 3 entries
- `therapist_advice`: array of 3–5 entries

**Specificity (manual review):**
- [ ] Each event contains a specific situation, a specific choice, and a specific outcome
- [ ] Each daily_habit is observable — what you could physically watch
- [ ] Each therapist_advice entry names a specific situation, a specific try, and a specific thing to notice
- [ ] `tension` could not apply to the yin/yang counterpart of this tgPattern
- [ ] `architecture` could not apply to a different band for this stem

**Anti-genericity:**
- [ ] `adjectives` would not work for the yin/yang counterpart tgPattern
- [ ] `under_stress` names an excess pattern of the stem's mechanism, not generic stress behaviour
- [ ] `childhood_friend` is written about a specific moment, not a general disposition

### Pass 2 — Reading Schema

**Structural (automated validation):**
- All 7 top-level fields present
- `gifts`: exactly 3 entries, each with `label` and `desc`
- `edges`: exactly 2 entries, each with `label` and `desc`
- `landscape`: both `thrives` and `costs` present

**Length constraints (automated):**
- `teaser`: ≤90 words
- `p1`: ≤80 words
- `p2`: ≤70 words
- `twoAM`: 15–35 words

**Quality (automated — scan `allText`):**
- Each `gifts[].desc` must contain at least one social proof phrase: "come to you," "call you," "bring you," "trust you with"
- Each `edges[].desc` must contain "Watch for:"
- No forbidden vocabulary (full list in §5.4)

**Quality (manual):**
- [ ] `twoAM` is first person
- [ ] `twoAM` could not apply to any other key — it is the structural collision of this specific combination
- [ ] `p1` front-end/back-end contrast is legible
- [ ] `p2` contains no imperatives ("you should," "try to," "work on")
- [ ] All three `gifts` are traceable to specific behavior (observable, not trait)
- [ ] Both `edges` trace backward to a specific gift (same quality, different condition)
- [ ] Voice register: read aloud — does it feel like the DM element wrote it?

### Layer 2 — Reading Angles

**Structural (automated):**
- `how`, `works`, `deep` all present and non-empty

**Length (automated):**
- Each angle ≤80 words

**Quality (automated):**
- No forbidden vocabulary in any angle

**Quality (manual):**
- [ ] `how` would fail if you substituted the paired TG — it is structurally different, not tonally different
- [ ] `works` is neutral — contains no prescription ("this is good for you," "lean into this")
- [ ] `deep` names something specific to this exact `domEl_specificTenGod` combination — not derivable from either element alone
- [ ] All angles are voiced in the implied DM element's register
- [ ] No BaZi terminology, no TG names, no Chinese characters in any angle

### §5.4 — Forbidden vocabulary (complete list)

**BaZi system terms:**
Day Master, Ten Gods, Food God, Hurt Officer, Seven Killings, Direct Officer, Parallel Self, Rob Wealth, Indirect Seal, Direct Seal, Indirect Wealth, Direct Wealth, Pure, Rooted, Flowing, Forging, Tested, Pressured, Expressive, 比肩, 劫财, 食神, 伤官, 偏财, 正财, 七杀, 正官, 偏印, 正印

**Generic spiritual:**
the universe, cosmic, destiny, fate, zodiac, journey, vibrant, tapestry, empowered, manifest, spiritual, at your core, in essence, fundamentally

**Weak characterisation:**
genuinely, special gift, unique ability, deeply sensitive, naturally gifted, you are someone who, as a [type], people with your

**Weak openings for twoAM:**
You are ready, The best is still, You have so much, This is your time

---

## §6 — CLI Pipeline Reference

All generation runs through `generate_templates_v2.js`. Run modes in order:

```bash
# Layer 1 — Base identity (149 keys: skip hand-authored 庚_concentrated_pure)
node generate_templates_v2.js generate-persona
node generate_templates_v2.js retrieve-persona [batchId]
node generate_templates_v2.js generate-readings    # reads personas.json
node generate_templates_v2.js retrieve-readings [batchId]

# Layer 2 — Dominant energy angles (50 keys)
node generate_templates_v2.js generate-angles
node generate_templates_v2.js retrieve-angles [batchId]

# Validation and merge
node generate_templates_v2.js check        # validates all schemas
node generate_templates_v2.js merge        # → generated_output.js
```

**Output files produced:**

| File | Contains | Import into |
|---|---|---|
| `personas.json` | 149 Layer 1 persona cards | TEMPLATE_DB `.persona` field |
| `templates.json` | 149 Layer 1 reading schemas | TEMPLATE_DB main fields |
| `angles.json` | 50 Layer 2 angle sets | `READING_ANGLES` module-level constant |
| `generated_output.js` | All merged | Import both exports into engine |

**Engine imports:**

```javascript
// In Elementum_Engine.jsx:
import { GENERATED_TEMPLATES, GENERATED_ANGLES } from './generated_output.js';

// Spread GENERATED_TEMPLATES into TEMPLATE_DB
// Spread GENERATED_ANGLES into READING_ANGLES (module-level, outside all components)
```

**Estimated cost and time:**

| Pass | Keys | Approx. tokens | Approx. cost |
|---|---|---|---|
| Layer 1 personas | 149 | ~1,000 out/key | ~$15–18 |
| Layer 1 readings | 149 | ~800 out/key | ~$12–15 |
| Layer 2 angles | 50 | ~400 out/key | ~$3–5 |
| **Total** | | | **~$30–38** |

---

## §7 — Approve-Then-Scale Workflow

**Never run the full batch before reviewing a sample.** API cost is $30–38; discovering the system prompt is wrong after generating 149 keys is expensive. Always validate on a small sample first.

### Recommended sample for approval

Generate these five keys manually before the batch:

| Key | Why test this one |
|---|---|
| `庚_concentrated_pure` | Reference standard — compare against hand-authored version |
| `甲_open_tested` | Tests: open band + tested pattern + 甲 stem classical conditional |
| `丙_balanced_flowing` | Tests: Fire register + balanced band + flowing pattern |
| `癸_concentrated_rooted` | Tests: Water register + concentrated + rooted + no stem classical |
| `戊_balanced_forging` | Tests: Earth register + 戊 catalyst-conditional classical source |

### Approval criteria

Before approving for scale, each sample key must pass:
1. All automated gates (no forbidden vocabulary, all fields present, length constraints)
2. The voice register check: read the first three sentences aloud — does it feel like the DM element wrote it?
3. The self-recognition test: would someone who is this combination read it and think "this is exactly me, not just approximately me"?
4. The specificity test: could any single field apply to the yin/yang counterpart tgPattern? If yes, flag for prompt revision before scale.
5. The twoAM test: is it first person? Could it only apply to this key? Is it specific enough to be uncomfortable?

### If a sample fails

Do not scale. Identify which field failed and trace backward:
- If multiple fields are generic → the portrait pre-write failed. The coherence tests weren't applied.
- If a specific field is weak → check the derivation map. Is the persona card field it derives from also weak?
- If voice register is wrong → the Step 0 register lock was skipped or not enforced.
- If twoAM is motivational → it was derived from the aspirational content in the persona card rather than the tension. Check the tension field.

Revise the system prompt or user prompt for the failing pattern, re-test the same key, then scale.

---

## §8 — The Reference Standard

The hand-authored reading for `庚_concentrated_pure` is the quality benchmark for all generated content. Before any generation run, review this reading. After retrieval, compare the five sample keys against it. Not for similarity — for equivalent felt specificity.

**The diagnostic questions:**

1. Does the teaser produce self-recognition in the first sentence?
2. Does p1 name a mechanism rather than a trait?
3. Does twoAM sound like something a person actually thinks, alone, at 2AM?
4. Do the edges trace backward to the gifts — same quality, different condition?
5. Does the reading feel like it was written by someone who knows this person, or like it was generated about a category?

If the answer to #5 is "generated about a category," the portrait pre-write failed to produce a person and the fields were generated from structural analysis instead. The fix is never to improve individual fields — it is to rewrite the portrait pre-write until the coherence tests pass.

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 4 — Generation Architecture & Prompt Guidance |
| **Version** | 1.0  ·  April 2026 |
| **Status** | LIVING — the reasoning chain and system prompts are updated as generation quality improves |
| **Audience** | AI agent doing batch generation · content lead reviewing output · engineers maintaining generate_templates_v2.js |
| **Purpose** | The complete generation protocol. Tells an AI agent how to use the sources in Doc 3 to generate any archetype key at production quality. The system prompts in this document are extracted verbatim into generate_templates_v2.js. |
| **Stability** | MEDIUM — system prompts and quality gates update as generation quality improves. Structural architecture (three passes, seven reading fields, three angles) is stable. |
| **Used by** | generate_templates_v2.js · human content review · Doc 6 §9 workflow reference |
| **Compatible with** | Doc2 v1.0 · Doc3 v1.0 · Doc6 v1.0 |
