# 04 · THE READING SYSTEM PRIMER (for a writer who has never seen Elementum)

_Prompt file (data). Read this first. It explains what the product is, who reads it, what a reading is made of, and how the chart decides what a reader sees. Compiled 2026-09-23 from REA_01 (the archetype system), REA_02 §5c–§5h (the vocabulary and the laws), REA_03 (the variables), REA_16 §1–§2 (the voice) and the 2026-09-17 evaluator brief. The four source books sit in the repository at `Reading/Documents/REA_01_Archetype_System.md`, `REA_02_Concept_Dictionary.md`, `REA_04_Knowledge_Pool.md`, `REA_16_The_Voice.md`; this primer governs where they and it disagree for a generation run, and is corrected afterwards._

## 1. What the product is

Elementum is a BaZi (八字, "four pillars") reading app in English. A person enters their birth date, hour and place. The app casts the chart, measures how much of each of the five energies (Wood, Fire, Earth, Metal, Water) the person carries and in what relation to their own core, and reads them a personality and life-calibration profile built from classical Chinese metaphysics and rendered in a plain, modern, non-conversational voice.

The reading is not written per person by a model at runtime. It is assembled from **templates**: pieces of text authored once per archetype cell, reviewed hard, stored in a database (the station), and selected by the chart. You are writing template text. The chart you are given says which cells and states are shown, so that every line you write is one a real reader will see.

## 2. Who reads it

- Core audience: 18 to 35, the Co-Star / The Pattern / CHANI generation. Therapy-literate, irony-fluent, sincerity-hungry, allergic to horoscope filler and to machine-sounding prose. They screenshot lines that name them and drop apps that flatter them.
- Reading level: grade 6 to 7. On the energy pages (definitions, advice, chips, the three-door ledger, the dot-card line) the vocabulary is CEFR B1–B2: the words of sitcoms, workplace small talk and text messages. Write for the lowest end of that band: an intermediate English reader must understand every line instantly, without translating. Accuracy outranks simplification, so a precise everyday word beats a vague one, and a plain word beats a precise rare one.
- Three readers every line must survive: the **Screenshot Curator** (would post it as self-description), the **Depth Migrant** (wants a real system underneath and would trust the one that wrote this), the **Heritage-Curious** (grew up with the tradition and would not wince).
- Post-Barnum law: a named cost beats a named virtue. A line must be something the reader could recognise as true or false about their own week.

## 3. The voice, in one paragraph

"The engraving that reads you": an artifact older than its reader that somehow knows them. Never conversational: not the cool older sister, not the therapist, not the guide. Mythic frame, mechanism precision, cost courage, in formal dress. Carved lines and portraits speak to the reader (You). The ledger speaks of the energy or the sign (The Blade is…, Earth is your Mind). The full law is `00_MASTER_PROMPT.md`; every rule is numbered in `02_RULES_REGISTER.md`.

## 4. The ten natures (the Day Master)

The day of birth gives the person one of ten stems, five elements in yin and yang. Each is a **nature** with a locked name and a protected spine verb:

| Stem | Nature | Element | Spine |
|---|---|---|---|
| 甲 | The Oak | Yang Wood | rises |
| 乙 | The Vine | Yin Wood | routes |
| 丙 | The Sun | Yang Fire | radiates |
| 丁 | The Candle | Yin Fire | concentrates |
| 戊 | The Mountain | Yang Earth | holds |
| 己 | The Field | Yin Earth | receives and grows |
| 庚 | The Blade | Yang Metal | cuts |
| 辛 | The Jewel | Yin Metal | refines |
| 壬 | The Ocean | Yang Water | ranges |
| 癸 | The Rain | Yin Water | permeates |

Each nature owns one cost dimension and one arena of imagery (the Angle Map in `00_MASTER_PROMPT.md`). The Blade's cost is isolation through honesty; its arena is edge, cut, blade, steel, forge, whetstone, the clean line. A line about the Blade draws its pictures from that arena and no other nature's.

## 5. The five functions (the vocabulary the energy pages use)

Every energy on a chart is read as one of five **functions** of the reader's system, fixed by its relation to the core's own element. These replace the classical ten-god family names on every surface the reader sees.

| Function | Classical family | Relation to the core | What it means for the reader |
|---|---|---|---|
| **Body** | 比劫 (self, peers) | the core's own element | stamina, will, self-hold; the strength the whole chart stands on |
| **Mind** | 印 (resource) | the element that feeds the core | learning and absorption; where the world soaks in |
| **Expression** | 食伤 (output) | the element the core feeds | the gate where inner work becomes outer fact |
| **Action** | 财 (wealth) | the element the core tames | building and claiming; what you go get and provide |
| **Order** | 官杀 (officer) | the element that tames the core | regulation and accountability; the rules you answer to |

For a Metal core: Body = Metal, Mind = Earth, Expression = Water, Action = Wood, Order = Fire. The two law verbs are **feeds** (生) and **tames** (克); the ten equations with their image lines are in `05_CLASSICAL_SOURCES.md`.

## 6. The ten personas (the faces of an energy)

Under each function, the classical ten gods keep their polarity split. Each god is a **persona** with a locked name and a definition line: The Twin 比肩 · The Rival 劫财 · The Artisan 食神 · The Virtuoso 伤官 · The Horizon 偏财 · The Steward 正财 · The General 七杀 · The Magistrate 正官 · The Alchemist 偏印 · The Sage 正印. An energy on a chart carries one or two present personas (its faces), weighted; the energy page's ledger rows come from the face cells (element × persona). A persona name carries its definition line the first time it appears on a surface.

## 7. How the chart decides what a reader sees (the reasoning chain)

1. **Strength.** The engine measures the core's strength from the classical roots (month command, day branch, supporting stems) and bands it: strong → **Overfueled**; weak → **Underfueled**; moderate with no dominant outside energy → **Balanced** (about one chart in a thousand).
2. **Valence.** From the band, every energy is a **catalyst** (wanted: "the energy your chart runs short on, feed it") or a **friction** (unwanted: "the energy already carrying weight, ease off it"). Classical 用神 / 忌神: on a strong core the draining functions (Expression, Action, Order) are wanted and the feeding ones (Body, Mind) unwanted; on a weak core the reverse.
3. **Volume.** Every energy also has a quantity tier from its share of the chart: absent (≤0.5%), thin (≤10%), present, abundant (≥20%), dominant (≥40%). Classical 太过 / 不及: a dominant energy is read as a friction whatever the band, through its 渊海子平 excess idiom; the core itself is never flipped.
4. **The energy page** (one per energy, five per reader) says the pair's chemistry (the story), the state line for this chart (the turn when the energy runs thin or heavy, or the carry line when it is absent, abundant, dominant, thin-and-unwanted), the definition of the function at this pole, the three-door ledger (three rows from the energy's faces, each row one door: trait, scene or outside), the advice, and the dot-card line.
5. **The Day Master page** says the sign (the nature as a figure), the person (the nature at this band), the self card, and the chips: the stem's fourteen gifts and shadows are each tagged with a door (a function), and the chart opens doors. **Gifts show through the catalysts, shadows through the frictions**, one chip per open door. Under them the carry card puts all five energies in the manual's order with one clause and one remedy each, chosen by valence × volume.
6. **Faces.** Each door's first pool item is the **echo** face, cut from the energy page's definition of that function, so the chip and the page say the same mechanism. Body and Mind carry a second item: a **wide** gift (the wanted energy is abundant) or an **excess** shadow (the energy is dominant, the classical excess idiom).

**The quintessence law:** the Day Master page says what the material CAN do; the chart says what it DOES. Gifts are capabilities of the nature; shadows are the same functions overgrown; the chart only picks which show. Tempo, volume and cures live in the energies, never in the Day Master traits.

**The derivation law:** every gift and shadow names the exact energy-page field it was cut from (`echo_of`). The chip and its source describe one mechanism in different words, and that claim is checked line by line.

## 8. The worked example: the golden chart

Yang Metal core (庚, The Blade), born 1995-04-29 18:00 Beijing, strong, **Overfueled**. Earth 33% (Mind, friction, abundant), Wood 33% (Action, catalyst, abundant), Metal 23% (Body, the core, reads its own friction turn), Water 6% (Expression, catalyst, thin), Fire 5% (Order, catalyst, thin).

What shows: on the Day Master page, gifts **Crisis performer** (Order → Fire), **Plays the long game** (Action → Wood), **No dressed-up answers** (Expression → Water); shadows **Never reconsiders** (Body → Metal) and **Overprepared** (Mind → Earth, the excess face: the Blade's reading of heavy Earth is 郁滞, stalling, never "buried", which belongs to the Jewel). On the energy pages: Earth speaks its friction turn ("Run heavy, the shelter closes over the blade…"), Wood speaks its wide line ("Wood is already here in plenty, the material the knife is for."), Water and Fire speak their catalyst turns ("Run thin, …"), Metal its own friction turn. The full engine output for this chart, every variable, is `chart/golden.json` in the handoff, and `chart/golden.md` is the readable sheet.

## 9. The two page types you are writing (this round)

- **The Day Master page** (P4): manifesto (reveal plate and share card), the sign paragraph (`dm_overview`), the person paragraph at this band (`STEM_BAND.yourNature_desc`), the self card (face and presence), the shown chips with their descriptions, the carry card lines.
- **The energy page** (×5): the classical epigraph (fixed, a sourced quotation, never rewritten), the story (`mechanism.base`), the state line (a turn or a carry line), the definition, the three ledger rows, the advice, the dot-card line (`cta_verdict`).

Every field's construct, reasoning chain, checks and an exemplar are in its card under `fields/`. Every cap is in `06_CAPS_BY_PAGE.md`.

## 10. What you may not do

Invent a field, a count, a door, a persona, a domain or a number. Fill a gap from your own BaZi knowledge: the facts you are given are the facts. Assert the reader's biography, another person's private thoughts, or a guaranteed outcome. Write a Chinese character, a romanised term, a structural label or a mystical word into output. Use an em-dash, a semicolon or an arrow. Exceed or fall short of a field's word range. Draw a picture from another nature's arena. Reuse a four-word run from any other field of the same cell, or from another stem's line.

## 11. What you are free to do

Everything else. Sentence shapes, figures of speech, storytelling, scene craft, the expressions you reach for, the rhythm you hear: yours, as long as an intermediate English reader gets it on the first pass, the words stay in the zone, and the line would survive the three readers. The craft guidance in the master prompt (a stem's rhythm temperament, the sentence-length range, one ordinary sentence per paragraph) is guidance, not a gate.

## Iteration log

| Date | Change | Ruling |
|---|---|---|
| 2026-09-23 | Born: the 2026-09-17 evaluator brief refreshed (current chips, current pointers, the freedom clause) into the prompt database | owner 2026-09-23 (the handoff readiness check) |
