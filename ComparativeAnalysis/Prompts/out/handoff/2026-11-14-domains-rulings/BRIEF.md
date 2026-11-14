# Sealed-writer brief: the Domains + Blueprint rulings round (owner 2026-11-14)

You are rewriting units of two Elementum reading sections. Elementum is a BaZi personality app in English for readers aged 18 to 35, mostly women and therapy-literate, benchmarked against The Pattern. The two sections are the **Domains** (eight life-domain pages) and the **Energy Blueprint** (the deep decoding of the chart).

A section audit found what is wrong, and the owner ruled every fix "A". Your job is to write each unit in your worklist once, so that it meets every rule below at the same time.

Work only in this folder:
- `BRIEF.md`: this file.
- `verbs.json`: each character's own words and reserved words (R15).
- `worklist-<id>.json`: your units.
- `gate.mjs`: the gate.

Write `out-<id>.json` as `{ "units": [ { "key", "kind", "page", "family", "text" } ] }`, with one entry per worklist unit and its key, kind, page and family copied exactly. Run `node gate.mjs out-<id>.json` and fix every finding until it prints PASS. Do not edit any other file and do not commit.

## Each worklist unit

| Field | Meaning |
|---|---|
| `key` | The station address. The middle part names the character and the gate; for example `POSITION zhengguan_day_branch · domain_climb.Family.lived` is the Magistrate inside the Day Gate, Family, the lived beat. |
| `kind` | Sets the word and sentence budget (table below). |
| `current` | The text now. It is empty for a `new` unit. |
| `approved: true` | The owner approved this exact text earlier. Keep its substance and its best images, and change only what the rules require. |
| `notes` | Audit findings on this unit: an issue and a proposed fix or rewrite. Use them. A MINOR's proposed rewrite is a strong starting point, but your text must still pass every rule. |
| `base_lived` | On a `lived_past` unit, the present-tense lived beat it is the past version of. |
| `family_note` | On a new structure state note, the old family-level note, if one existed. |

**Keep or rewrite.** Keep a unit word for word only when it already meets every rule, no note touches it, and the R16 close budget allows it. Otherwise rewrite it. The gate fails a unit that breaks any rule, whether or not you changed it.

## The characters (always "the Twin", "the Rival" …)

| Character | 汉字 | Stands for |
|---|---|---|
| Twin | 比肩 | self-reliance, equals |
| Rival | 劫财 | competition, sharing what you have, money that moves through friends |
| Artisan | 食神 | ease, appetite, making things, food and rest |
| Virtuoso | 伤官 | a sharp voice, talent that rebels |
| Horizon | 偏财 | range, side doors, windfalls, openings far from home |
| Steward | 正财 | careful keeping, earned value, steady money |
| General | 七杀 | pressure that forges, hard tests, a fight with real stakes |
| Magistrate | 正官 | rules, duty, a role, a word kept in public |
| Alchemist | 偏印 | strange knowledge, private study, an unusual mind |
| Sage | 正印 | shelter, learning, being looked after and looking after |

## The gates, chapters and ages

- **Year Gate (Early Chapter):** birth to 15; the first home and family of origin.
- **Month Gate (Rising Chapter):** 16 to 34; work, study, parents and siblings.
- **Day Gate (Home Chapter):** 35 to 47; the self, a partner and the home. It is always open, because it is the self.
- **Hour Gate (Late Chapter):** 48 on; "the people after you" (children, younger relatives or someone you train) and later life.

A character "at" a gate sits on its stem, in plain view. A character "inside" a gate sits in its branch, out of sight.

## The house laws (the gate checks all of them)

- **Voice:**
  - second person;
  - present tense, except that lived beats use the past or present perfect and past versions the simple past;
  - the reader is the subject of the last sentence.
- **Punctuation:**
  - periods and commas only, at most two commas in a sentence;
  - no dash, semicolon or colon;
  - no digits;
  - no Chinese in the text;
  - no italic.
- **No hedges:** may, might, perhaps, probably, likely, should, often, sometimes, usually, tends to.
- **No advice:** no imperative and no counsel. Describe what happens and what the reader does.
- **Banned words:**
  - delve, tapestry, testament, pivotal, crucial, intricate, robust, seamless, foster, underscore, showcase, leverage, vibrant, nestled, profound, realm, unlock, elevate, resonate, navigate, landscape, journey;
  - trauma, trigger, boundaries, attachment style, regulate, nervous system;
  - destiny, fate, karma, cosmic, universe, palace, pillar, ten gods, BaZi, day master, luck, lucky;
  - room, verdict, "ahead of", ", so".
- **The past law (Q9):** past beats are definite patterns tied to an age span. Never a single dated event, a place or a named person.
- **People (Q10):**
  - "a partner" at the Day Gate, never "your partner";
  - "the people after you" at the Hour Gate;
  - gender-neutral: no he, she, husband, wife, brother, sister, mother, father, son, daughter (say sibling, parent, child, relative);
  - parents and siblings belong to the Month Gate; "an older relative" or "someone in your first home" to the Year Gate.
- **Hard news (Q11):**
  - only when tied to a decade or a gate, and with what carries the reader through;
  - never illness, death, divorce, bankruptcy, accidents or sums of money;
  - no pain words (pain, hurt, sore, ache);
  - at most one body part.
- **Chart invariance:** a unit names no character except its own. Templated units and season readings name none.
- **Budgets** (words, then sentences):

| Kind | Words | Sentences |
|---|---|---|
| headline | 3–12 | 1 |
| recognition | 30–65 | 2–3 |
| lived, lived_past | 22–50 | 2 |
| ahead | 20–55 | 2 |
| decade | 18–45 | 1–2 |
| year_domain | 14–30 | 1 |
| gap | 14–32 | 1 |
| unruled (also the waiting lines) | 20–45 | 1–2 |
| pattern | 14–32 | 1 |
| fused | 10–24 | 1 |
| structure | 22–50 | 2–3 |
| status | 12–36 | 1–2 |
| missing | 22–45 | 2 |
| season_need | 14–32 | 1 |
| seen | 9–22 | 1 |
| seen_close | 6–16 | 1 |
| bond, bond_none | 12–30 | 1 |
| pattern_bp | 14–32 | 1 |

## The rulings (what is new)

### R10. Each unit of a seat does its own job

- The headline makes the claim, in the present tense; never a past-tense story.
- How you are (`recognition`) says how the force works in the reader **now**.
- The lived beat says what that gate's **years built**: a pattern of those years with its result, not the same behaviour restated.
- The ahead beat says what comes **from the gate's age**.

A seat's units in one domain share a `page`, and the gate fails any five-word run they share. Most failing pages tell one scene twice ("you say yes before you read the terms", then "by saying yes before you had read the terms"). Give each unit its own scene.

### R13. Past versions

`lived_past` is new for Month and Day seats. A reader past the gate (over 34 for the Month Gate, over 47 for the Day Gate) reads it in place of the lived beat:
- simple past, tied to the gate's years ("From sixteen to your mid-thirties …", "Through your Rising Chapter …", "In your late thirties and forties …");
- never "since", "so far", "still" or "you have";
- the same pattern as `base_lived`, told as finished.

The `lived` beat stays for readers inside the gate.

### R14. No hedged single events

Never write "at least once", "more than once", "at least one" or "more than one". Turn each into a definite pattern of the span: "In those years a shared venture ended a friendship, and …" is still one event, so write "Your friendships of those years ran through shared ventures, and …".

### R15. The ten read as ten

At the Day and Hour Gates the gate's life area was writing the beat and the character only coloured it. Four characters shared one Love beat, five showed care "by arranging, not words" at the Hour Gate, and the Horizon and the Rival told the same Wealth story.

Make the **character** drive each beat. `verbs.json` gives each character:
- **`own`** words: a Day or Hour seat beat must use at least one of its own character's;
- **`reserved`** words: no other character's unit may use them. For example, only the Magistrate keeps "promises" and "your word", only the Steward keeps "savings" and "accounts", and only the Artisan has "comfort" and meals.

When two characters share a gate and a domain in your worklist, read their units side by side and make the difference plain.

### R16. One sentence shape no longer carries every page

- **The close budget.** At most one in eight units of one `family` (12%) may close on ", and you …", because a page shows up to six units of a family and the ruling allows one such close per family per page. Close the rest on a "You …" sentence, on "Your …", or on a short clause before "you" ("By your forties you …"). Vary the shape; the reader is still the subject of the last sentence.
- **Decade lines** never restate their period ("these years", "those years", "this decade"), because the label already gives it. Lived decade lines are in the past and coming ones in the future.
- **Frame families** (missing, need, seen): no opening shared by more than two units. "nobody inside it", "your season asks for" and "you come across as" may each appear in at most three units.

### R11. Gap lines

A gap line follows the engine's lead "No seat in your <Gate> rules <Domain>." It says what that means without claiming a loss: never less, fewer, lost, missed, gave up, cost or drifted. Tell the reader what carries the domain instead in those years, which is their decades.

### R12. Love ahead beats

These describe the kind of bond the reader makes from 35, and never state a shared home, moving in or living together as fact.

### R9. The waiting lines (TPL, new)

`domain_waiting.<Domain>` reads as How you are when every seat ruling the domain sits in a gate the reader has not reached yet. `domain_waiting_headline.<Domain>` is its headline. Two rules:
- Never say "no seat".
- Say the domain's own character arrives later, and for now each decade sets its course. The chart cannot know which gate.

### R6. Season need lines (BP-2)

A need line says how the chart holds a character the season asks for:
- `shown`: on show in plain view;
- `rooted`: inside a branch as its main stem;
- `hidden`: only deep inside a branch.

It also says what that character's element does for a season that lacks it. It must **not** describe a public or private trait, which is Part 3's job (the seen lines). Name the character only as "the <Character>" of this unit.

### R5. Missing lines with the hour unknown (BP-2, new `missing.open`)

These say the character does not show in the three pillars the chart can read and that the Hour Gate could hold it. They describe how the reader lives without it for now, and must not assert that it is missing for good.

### R7. State notes by structure (BP-1, new)

Each structure has its own note for each state. The label prints "Formed." / "Formed, under strain." / "Broken." separately. A note names the strain, what it costs the reader, and for "formed" what they can lean on, in that structure's own terms:
- an Alchemist structure's note never borrows the Sage's teachers;
- a General structure's note never borrows the Magistrate's title.

Slots you may use in a `status` note: {breakers} {stand} {gods} on the peers notes only, as in the current family notes.

| State | Meaning (子平真诠) |
|---|---|
| formed.none | Nothing pulls against it. |
| formed.cured | Something pulls against it, and the chart already holds the cure: a seal answers the Virtuoso, the Artisan checks the General, the peers carry heavy money, 金水伤官 wants the officer. Say that the chart answers its own strain; the chart cannot know which cure. |
| virtuoso | The Virtuoso argues with the Magistrate (伤官见官). |
| mixed | The Magistrate and the General mix (官杀混杂). |
| heavy | The role or the pressure outweighs the reader's own strength (官重身轻 / 杀重身轻). |
| money | Money feeds the pressure (七杀逢财), or money wears on the seal (印轻逢财). |
| unchecked | Pressure that nothing checks (七杀无制, 透煞无制). |
| alchemist | The Alchemist starves the Artisan, or breaks the Artisan's check on the General (枭神夺食). |
| heavywealth | More money than the reader's strength can hold (财多身弱). |
| peers | Equals take a share of what the reader earns (财轻比重). |
| general | The General rides on the money (财透七杀). |
| excess | More of one force than the reader can use, with no outlet: a heavy seal on a strong self (印重身强), or a Virtuoso structure crowded by the seal (佩印而伤轻身旺). |
| starved | Thinking that starves making (枭神夺食 in an Alchemist structure). |
| drained | More output than the reader's strength can feed (食伤泄身太过). |
| idle | Strength with nothing to use it on (无财官). |

### R3. Bonds (BP-3)

Some bond lines date a change to a gate, for example "you leave home early", "in your late forties" or "the circle you build now". For each such line, add two new units after it in your output:
- `<key>.lived`, in the past, for a reader past that gate;
- `<key>.coming`, in the future, for a reader before it.

Each has kind `bond`, the same page and family, and the same meaning in the right tense. Keep the base unit too, rewritten tense-neutral. Bond lines read as a consequence in the gates' life areas:
- bind: a tie that holds both;
- clash: a change from tension;
- punish: friction that repeats;
- harm: a quiet irritation;
- frame: an alliance;
- selfpunish: the same pattern in two parts of life.

## When you are done

Run the gate until it prints PASS. Final message:
- the counts of units kept, rewritten and new;
- the three changes you are proudest of;
- any unit you could not make pass, with the reason.
