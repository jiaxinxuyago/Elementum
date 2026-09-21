# 00 · Read first: what Elementum is and how a reading is built

_Elementum reading templates · review pack · context for external evaluators._

## 1. What the product is

Elementum is a BaZi (八字, "four pillars") reading app in English. A person enters their birth date, hour and place. The app casts the chart, works out which of the five energies (Wood, Fire, Earth, Metal, Water) the person carries and in what amounts, and reads them a personality and life-calibration profile built from classical Chinese metaphysics and rendered in a plain, modern, non-conversational voice.

The reading is not written per person by a model at runtime. It is assembled from **templates** authored once and reviewed hard. This pack contains those templates. Your job is to evaluate the templates, not to cast charts.

## 2. Who reads it (the audience the language must fit)

- Core: 18 to 35, female-skewing, the Co-Star / The Pattern / CHANI generation. Therapy-literate, irony-fluent but sincerity-hungry, allergic to horoscope filler and to machine-sounding prose. They screenshot lines as self-description.
- Three personas the house tests every line against: the **Screenshot Curator** (would post it as self-description), the **Depth Migrant** (wants a real system underneath, will read long-form if the entry line earns trust), the **Heritage-Curious** (knows 八字 exists, distrusts Westernized flattening, must never wince).
- **Vocabulary zone (a house rule):** everyday conversational English, roughly CEFR B1–B2, reading level grade 6–7. The vocabulary of sitcoms, workplace small talk and text messages. An intermediate ESL reader should understand a line instantly without translating. The formal, report-card, LinkedIn register is banned as a voice (diligent, exemplary, meticulous). A friend's word lands where an evaluator's word creates distance (Bossy, not Domineering). Accuracy always outranks simplification.

## 3. The voice (a house rule)

"The engraving that reads you." An artifact older than its reader that somehow knows them. Never conversational: not the cool older sister, not the therapist, not the guide. Mythic frame, mechanism precision, cost courage, in formal dress.

Hard bans in all reading prose: em-dashes, semicolons, hedging (often / sometimes / may), flattery without a cost, slang, doom or fate claims, therapy jargon, courtroom or institutional words (verdict, legitimate, institutional), the AI cluster (delve, tapestry, testament, pivotal, robust, seamless, foster, underscore, leverage, boasts, vibrant), "not X but Y" mirrors, reflex triads.

Post-Barnum law: a named cost beats a named virtue. Paired, checkable costs win credibility. A line must be something the reader could recognise as true or false about their own week.

## 4. The five functions (the vocabulary the templates use)

Every energy on a chart is read as one of five **functions** of the reader's system, determined by its relation to the day master's own element. These replace the classical ten-god family names on every surface the reader sees.

| Function | Classical family | Relation to the core | What it means for the reader |
|---|---|---|---|
| **Body** | 比劫 (self, peers) | the core's own element | stamina, will, self-hold; the strength the whole chart stands on |
| **Mind** | 印 (resource) | the element that feeds the core | learning and absorption; where the world soaks in |
| **Expression** | 食伤 (output) | the element the core feeds | the gate where inner work becomes outer fact |
| **Action** | 财 (wealth) | the element the core controls | building and claiming; what you go get and provide |
| **Order** | 官杀 (officer) | the element that controls the core | regulation and accountability; the rules you answer to |

So for a Metal day master: Body = Metal, Mind = Earth, Expression = Water, Action = Wood, Order = Fire. For a Wood day master: Body = Wood, Mind = Water, Expression = Fire, Action = Earth, Order = Metal. And so on around the cycle.

The ten gods keep their polarity split (正/偏) only at the deeper "ten-god" layer (file 03), where each god has a persona name (比肩 The Twin, 七杀 The General, and so on).

## 5. How the chart decides what a reader sees (the reasoning chain)

1. **Strength.** The engine measures the day master's strength from the classical roots (month command, day branch, supporting stems) and bands it: strong → the reading calls the core **Overfueled**; weak → **Underfueled**; moderate and evenly spread → **Balanced** (rare, about one chart in a thousand).
2. **Valence.** From the band, every energy is either a **catalyst** (wanted; "the energy your chart runs short on, feed it") or a **friction** (unwanted; "the energy already carrying weight, ease off it"). Classical 用神 / 忌神: on a strong core the draining functions (Expression, Action, Order) are wanted and the feeding ones (Body, Mind) unwanted; on a weak core the reverse.
3. **Volume.** Every energy also has a quantity tier from its share of the chart: absent (≤0.5%), thin (≤10%), present, abundant (≥20%), dominant (≥40%). Classical 太过 / 不及: a dominant energy is read as a friction whatever the band, because too much of anything turns against the self (土多金埋, 金多水浊, and the rest of the excess sets from 渊海子平).
4. **The manual.** The reader's energy pages and "manual" list the catalysts to SEEK and the frictions to EASE, each with a definition of the function, a short turn (the story of that energy running thin or heavy), and advice.
5. **The Day Master page.** The stem's fourteen gifts and shadows are each tagged with a door (a function). The chart opens doors: **gifts show through the catalysts, shadows through the frictions** (and only through frictions that are actually present, since an absent energy cannot be "overgrown"). One chip per open door, two or three per side.
6. **Faces.** Each door's first item is the **echo** face, cut from the energy page's definition of that function (so the trait and the energy page say the same mechanism). Body and Mind carry a second item: a **wide** face on the gift side (the wanted energy is abundant: the widest door) or an **excess** face on the shadow side (the energy is dominant: too much, the classical excess idiom).
7. **The carry card.** Under the traits, one card puts all five energies in the manual's order with a one-line clause and remedy per energy chosen by valence × volume (wanted-absent "borrow it", unwanted-absent "absent and better so", unwanted-thin "kept small", dominant "too much", core at 0% "unrooted").

**The quintessence law:** the Day Master page says what the material CAN do; the chart says what it DOES. Gifts are capabilities of the archetype, shadows are the same functions overgrown, and the chart only picks which show. Tempo, volume and cures live in the energies, never in the Day Master traits.

**The derivation law:** every gift and shadow names the exact energy-page field it was cut from (`echo_of` in file 01). The claim is that the item and its source describe the same mechanism in different words. You can check that claim line by line.

## 6. A worked example (a real chart)

Yang Metal day master (庚, The Blade), strong core, Overfueled. Earth 33% (Mind, friction, abundant), Wood 33% (Action, catalyst, abundant), Metal 23% (Body, core, friction), Water 6% (Expression, catalyst, thin), Fire 5% (Order, catalyst, thin).

Day Master page shows: gifts **Crisis performer** (Order → Fire), **Trims for growth** (Action → Wood), **No dressed-up answers** (Expression → Water); shadows **Never reconsiders** (Body → Metal, the excess face) and **Plans, never acts** (Mind → Earth, the excess face: the 庚 reading of heavy Earth is 郁滞, stalling, never "buried"; 土多金埋 belongs to 辛). Carry card: "Metal runs Overfueled. Two energies feed a core already full. Three are where the surplus should go." Then the EASE row (Metal, Earth) and the SEEK row (Fire, Wood via the widest-door line, Water).

## 7. Classical and psychological grounding the house claims

- Tier 1 canon: 滴天髓 (with 任铁樵's commentary), 三命通会 (the ten-stem behavioural profiles, 十干体象), 子平真诠 (ten-god and pattern theory), 穷通宝鉴 (climate adjustment), 渊海子平 (the excess and deficiency idiom sets: 生之太过, 泄之太过, 克之不逮, 衰而逢克, 强而得制).
- Corrections already on record from the house's own audit: 土多金埋 applies to 辛 more than 庚 (庚 reads 郁滞 under heavy Earth); 比劫夺财 is a strong-body pattern; 官杀旺 reads as the inner judge only on a weak body (身弱), and as being critical of others on a strong one.
- Psychology the house leans on: the same mechanism at different volume (CAPS if-then signatures, Whole Trait Theory, Fleeson's density distributions); strength overuse (Niemiec; Kaplan and Kaiser; Grant and Schwartz); the Barnum effect literature (specific, checkable, paired-cost statements resist it); Jung's functions and the Cybernetic Big Five for stem profiles; self-determination theory for the output and officer gods.

## 8. What is in the other files

- **01_day_master_templates.md** — the ten stems: carved lines, portraits, and the fourteen gifts and shadows each with door, face, angle and source field.
- **02_five_energy_pair_templates.md** — the 25 core × energy cells: epigraph, story, turns, yin-sibling variants, function definitions and advice, verdict, carry-card lines by state.
- **03_ten_god_element_templates.md** — the ten personas and the 50 element × god cells with overview, chips, domain readings and the keyword ledger.
- **EVALUATION_PROMPT.md** — the evaluation brief and rubric. Paste it as your instruction, attach the files.
