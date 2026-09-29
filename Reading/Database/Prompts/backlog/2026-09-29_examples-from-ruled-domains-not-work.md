# Backlog · examples drawn from the persona's ruled domains, rhetoric kept in proportion (owner feedback, 2026-09-29, at Q25 of the blind read)

**Status: OWNER RULING RECORDED, prompt change pending.** Cards affected: `fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md` (all three doors), `fields/STEM/STEM.gifts.md` (desc), `fields/ELEMENT_PAIR/ELEMENT_PAIR.function.advise_catalyst.md` (the small actions), the master prompt's "what you are given" paragraph.

## The takeaway, as the owner put it

On the Wood page's outside door (The Horizon), the shipping line "You keep three ventures alive across two cities" exaggerates. Rhetoric is welcome in the doors, but in proportion: a picture should be a size the reader can recognise as their own, never a boast on their behalf. And the examples across the pages lean on work: projects, notes, notebooks, calendars, drafts, checklists, meetings. Widen the example selection to the persona's **ruled domains** (the three domain words each persona owns: the Horizon's Opportunity, Ventures, Father; the Steward's Wealth, Savings, Steady love; the Alchemist's Learning, Intuition, Solitude; the General's Pressure, Command, Crisis; the Artisan's Expression, Enjoyment, Children; the Twin's Peers, Independence, Self-reliance; the Rival's Rivalry, Shared stakes, Boldness; the Virtuoso's Talent, Performance, Defiance), so the example is related to what that persona is about and tangible to think about.

## What it changes

- Rhetoric in proportion: figures of speech and pictures are encouraged, but a claim about the reader's life stays at a size most readers of that chart could own (one venture, one city; a page a day). Exaggeration reads as flattery or as someone else's life, and fails the Screenshot Curator.
- Example selection: the doors, the pool descs and the advice's small actions draw their examples from the persona's ruled domains and from ordinary life (home, money, friends, family, the body, food, rest), not from work by default. Work stays available where the persona's domain is work (Career on a seat, the Steward's Wealth) and otherwise steps back.
- This sits beside the scene-door item (illustrate, don't stage): together they say what a picture is for (illustration), how big it may be (owned by the reader), and where it comes from (the persona's domains and ordinary life).

## Evidence in the round

Across the three versions the examples cluster on work objects: "the shared document still carries only your edits", "the shared checklist has a new step", "the meeting is stalled over a rough plan on the screen", "you open the same practice file", "your notes get longer and your reading list fills up". The owner's picks so far favour lines that speak from the domain (Compounding: "Fifty a month since college. A page a day, a call every Friday" is Savings and Steady love in pictures; Never reconsiders: "The person who grew, the plan that improved, the second chance that was earned" is Peers and Independence).

## Action items

- [ ] Add to the fn_reading card, the pool desc guidance and the advice card: examples from the persona's ruled domains and ordinary life; work is one domain among eight, not the default; pictures at a size the reader can own; rhetoric in proportion.
- [ ] Add the persona's three domain words to the harness spec note for every ledger row (they are in the cell facts already; the spec should name them as the example source).
- [ ] Consider a register row under E (imagery and angle): "examples come from the persona's ruled domains and ordinary life, at a size the reader can own".
- [ ] Re-cut the flagged line (木_偏财 catalyst outside door, "three ventures across two cities") in the next round and rule it with the others.

## Draft patch (not applied)

_Drafted 2026-09-29 by the backlog drafter. Nothing below is applied. Each numbered part is one approval: say the number and "yes", or the number and a correction. Every "before" is the current text quoted verbatim, every "after" is the exact replacement. This item shares three files with the scene-door draft (`2026-09-29_scene-door-imagery-not-staging.md`, its Draft patch): the fn_reading card, the master prompt and the handoff spec line. Every anchor below is chosen on a fragment that draft does not change, so the two patches apply in either order, where an anchor sits next to that draft's edit, the note says so._

**Two facts checked before drafting.** (1) The persona's three domain words already reach the ELEMENT_GOD prompt: `lib.mjs` line 71 writes "Ruled domains: {the three words}" into the GOD facts of every ELEMENT_GOD cell. The spec sheet (handoff.mjs) does not name them as the example source, which is Part 7. (2) The ELEMENT_PAIR pack does not carry any persona's domain words (`01_INPUT_PACK.md` §2.3 and `pairCellFacts` in `lib.mjs` line 92 hand over the pair's law, direction, function noun and fields only). The advice is family-level (one advice serves both siblings), so its example source is the family's two personas, six words, and Part 8 adds them to the pack. The ten personas' words, from the station `GOD/*.json`: the Twin Peers, Independence, Self-reliance · the Rival Rivalry, Shared stakes, Boldness · the Artisan Expression, Enjoyment, Children · the Virtuoso Talent, Performance, Defiance · the Horizon Opportunity, Ventures, Father · the Steward Wealth, Savings, Steady love · the General Pressure, Command, Crisis · the Magistrate Career, Status, Order · the Alchemist Learning, Intuition, Solitude · the Sage Knowledge, Shelter, Nurture. The backlog text lists eight, the Magistrate and the Sage complete the ten, and Career is the one domain word that is work by name.

### Part 1 · `fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md` (all three doors)

**1a · Construct, appended at the end of the bullet.** Anchor: the bullet's last clause. (The scene-door draft's 1b rewrites this clause, if that draft is applied first, the anchor is its after text ending "…not a story the reader is asked to have lived." and the new sentences follow it.)

Before:
> (the sentence itself says what the example proves).

After:
> (the sentence itself says what the example proves). All three doors draw their examples from the persona's ruled domains (the three domain words in the cell facts) and from ordinary life (home, money, friends, family, the body, food, rest). Work is one domain among eight, not the default, and stays where a domain word is work (Career, Wealth, Ventures). Rhetoric in proportion: figures of speech are welcome, but a claim about the reader's life stays at a size most readers of that chart could own (one venture, one city, a page a day), never a boast made on their behalf.

**1b · Reasoning chain, one step inserted.** Anchor: the fragment before the scene step (the scene-door draft changes the step after it, not this one).

Before:
> (a feature, a tendency, a habit, named as such) →

After:
> (a feature, a tendency, a habit, named as such) → pick the pictures from the persona's ruled domains or from ordinary life, work only where a domain word is work, and at a size the reader can own →

**1c · Style, appended at the end of the bullet.** Anchor: the bullet's last clause, which the scene-door draft keeps.

Before:
> never a safety-critical procedure as proof of character.

After:
> never a safety-critical procedure as proof of character. The example is the persona's: the Horizon's picture is an opening, a venture or a father, the Steward's is savings or a steady love, the Alchemist's is learning or a quiet room, the General's is pressure or a crisis, and the outside door hears it from the people in that domain, not from colleagues by default. The size test: if the sentence would make most readers of this chart say "that is not my life", the picture is too big.

**1d · Checks.** Anchor: "no banned register" (the scene-door draft's 1e also inserts after this word, both insertions chain, in either order).

Before:
> no banned register.

After:
> no banned register, the example source (the persona's domain words or ordinary life, the read decides), the size test (a claim most readers of the chart could own, the read decides).

**1e · Exemplar note.** Append after the exemplar (and after the scene-door draft's note if applied):

> The exemplar's pictures (browser tabs, saved courses, a notebook of plans) are the Alchemist's Learning, so it passes the source test and the size test as it stands.

**1f · Iteration log.** Append the row:

> | 2026-09-29 | Examples from the persona's ruled domains and ordinary life on all three doors, work no longer the default, rhetoric in proportion (pictures at a size the reader can own) | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

### Part 2 · `fields/STEM/STEM.gifts.md` (the desc)

The STEM axis has no persona, so the source here is ordinary life through the item's door, and the size test.

**2a · Reasoning chain, step (2).**

Before:
> as something recognisable in a week of the reader's life, same mechanism, different noun,

After:
> as something recognisable in a week of the reader's life, drawn from ordinary life (home, money, friends, family, the body, food, rest) as readily as from work, and at a size the reader can own, same mechanism, different noun,

**2b · Style.**

Before:
> the desc may show the picture, the phrase stays plain.

After:
> the desc may show the picture, at a size the reader can own and from ordinary life more than from work, the phrase stays plain.

**2c · Checks.**

Before:
> the item read beside its source shows the same mechanism.

After:
> the item read beside its source shows the same mechanism, and the desc's picture passes the size test (most readers of the stem could say it is their own) and does not default to work.

**2d · Iteration log.** Append the row:

> | 2026-09-29 | desc pictures from ordinary life as readily as from work, at a size the reader can own | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

### Part 3 · `fields/ELEMENT_PAIR/ELEMENT_PAIR.function.advise_catalyst.md` (the small actions)

Anchor: the small-actions fragment, which is present in the current line and unchanged inside the energy-prescription draft's 1b after text, so the two patches apply in either order.

**3a · Reasoning chain.**

Before:
> small actions with objects and cadences (once a month, one notebook, a decision date)

After:
> small actions with objects and cadences (once a month, one dinner, one call, a decision date), drawn from the family's two personas' ruled domains (the six words in the cell facts) and from ordinary life, work only where a domain word is work

**3b · Style, appended at the end of the bullet.** Anchor: the current last clause. (The energy-prescription draft's 1c rewrites this bullet with commas in place of the semicolons and appends its own sentences, if applied first, the anchor is "never a guarantee." and this sentence follows the beat sentences.)

Before:
> never a guarantee.

After:
> never a guarantee. The actions are the persona's and the reader's: a dinner, a call, a bill, a walk, a bedtime, a parent, a child, a friend, before a document, a meeting or a checklist, and each stays at a size the reader can own.

**3c · Checks.**

Before:
> rep-block against definition and turn.

After:
> rep-block against definition and turn, the example source (the family's domain words or ordinary life, the read decides), no action bigger than the reader can own.

**3d · Exemplar note.** Append after the exemplar (whichever version is live):

> The exemplar's objects (a reading list, a research topic, a course) are the 印 family's Learning and Knowledge, so it passes the source test as it stands.

**3e · Iteration log.** Append the row:

> | 2026-09-29 | Small actions from the family's ruled domains and ordinary life, work no longer the default, at a size the reader can own | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

### Part 4 · `00_MASTER_PROMPT.md`, the "What you are given, and what you may not invent" paragraph

Anchor: the predictive-beat sentence, which the scene-door draft does not touch (it rewrites the sentence before this one).

Before:
> Where a field carries a predictive beat, it is exactly one, tendency-framed, tied to an era, a relation or a domain, never a date.

After:
> Examples and pictures come from the persona's ruled domains (the three domain words in the pack, six for a pair cell) and from ordinary life: home, money, friends, family, the body, food, rest. Work is one domain among eight, not the default. Rhetoric in proportion: a figure of speech is welcome, and a claim about the reader's life stays at a size most readers of that chart could own, one venture, one city, a page a day, never a boast made on their behalf. Where a field carries a predictive beat, it is exactly one, tendency-framed, tied to an era, a relation or a domain, never a date.

**4b · Iteration log.** Append the row:

> | 2026-09-29 | Examples from the persona's ruled domains and ordinary life, work not the default, rhetoric in proportion | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

### Part 5 · `02_RULES_REGISTER.md`, a new row under E

Append after E5:

> | E6 | Examples and pictures come from the persona's ruled domains (the three domain words, six for a pair cell) and from ordinary life (home, money, friends, family, the body, food, rest), at a size most readers of that chart could own. Work is one domain among eight, not the default, and stays where a domain word is work. Rhetoric in proportion: a figure of speech is welcome, a boast on the reader's behalf is not | owner 2026-09-29, at Q25 of the blind read ("three ventures across two cities") · the GOD `domains` field (REA_02 §5e, the domain taxonomy) | read (the spec sheet and the cell facts name the domain words) | RULED 2026-09-29 |

Iteration log row to append:

> | 2026-09-29 | E6: examples from the ruled domains and ordinary life, at a size the reader can own | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

### Part 6 · REA_16 §6 log row

Insert in date order, after the scene-door row of the same date:

> | 2026-09-29 | **EXAMPLES FROM THE PERSONA'S RULED DOMAINS, RHETORIC IN PROPORTION (owner, at Q25 of the blind read).** The Wood page's outside door (the Horizon, Wide-branching) said "You keep three ventures alive across two cities", a picture bigger than most readers of the chart could own, and across the round the examples clustered on work objects (shared documents, checklists, meetings, practice files, reading lists). Ruled: examples come from the persona's ruled domains (the three domain words each persona owns, in the cell facts since the GOD pack) and from ordinary life (home, money, friends, family, the body, food, rest), work one domain among eight and not the default, and every picture stays at a size the reader can recognise as their own, rhetoric welcome in proportion, never a boast made on their behalf. Beside the scene-door ruling of the same day the two say what a picture is for (illustration), how big it may be (owned by the reader) and where it comes from (the domains and ordinary life). Re-cut: the fn_reading card on all three doors, the STEM.gifts desc guidance, the advice card's small actions, the master prompt's "what you are given" paragraph, register E6, the handoff spec line for ledger rows (the domain words named as the example source), the pair pack (the family's six domain words handed over). The flagged 木_偏财 row (its scene door says "three businesses in two cities" too) is re-cut in the next round and ruled with the others. Record: Reading/Database/Prompts/backlog/2026-09-29_examples-from-ruled-domains-not-work.md. |

### Part 7 · Harness spec note, `ComparativeAnalysis/Prompts/handoff.mjs` line 57, the ledger-row spec

The line (quoted whole, the `spec({...})` object for `fields[`ledger[${i}]`]`, `spec` is the identity function at line 30, so a new key passes straight to the sheet):

Before:
> `fields[`ledger[${i}]`] = { spec: spec({ card: 'ELEMENT_GOD.fn_reading', cell: egKey, persona: `${godc.persona_name} (${r.god})`, pole, row: idx, door: r.door, word: { min: 1, max: 3, notes: 'the chip: the persona\'s classical portrait textured by the element, high-school vocabulary, reads as a ' + (pole === 'catalyst' ? 'gift' : 'cost') + ' alone, distinct from the other rows and from the sibling cell\'s chips' }, text: { min: 35, max: 55, door: r.door, notes: { trait: 'opens on the trait claim: what this word IS for the person', scene: 'opens inside a representative situation with ordinary objects and a clock time; the example is used, not displayed', outside: 'opens from how others see it and what it costs or pays' }[r.door] } }), value: { word: red(r.word), text: red(led[idx].doors[r.door]) } }; });`

After (two additions: a `domains` key after `persona`, and an `examples` note inside `text`, the scene note is left as the scene-door draft's Part 6 rewrites it, so the two patches apply in either order):
> `fields[`ledger[${i}]`] = { spec: spec({ card: 'ELEMENT_GOD.fn_reading', cell: egKey, persona: `${godc.persona_name} (${r.god})`, domains: godc.domains, pole, row: idx, door: r.door, word: { min: 1, max: 3, notes: 'the chip: the persona\'s classical portrait textured by the element, high-school vocabulary, reads as a ' + (pole === 'catalyst' ? 'gift' : 'cost') + ' alone, distinct from the other rows and from the sibling cell\'s chips' }, text: { min: 35, max: 55, door: r.door, examples: 'from the persona\'s ruled domains (' + godc.domains.join(', ') + ') and ordinary life (home, money, friends, family, the body, food, rest), work only where a domain word is work, at a size most readers of the chart could own', notes: { trait: 'opens on the trait claim: what this word IS for the person', scene: 'opens inside a representative situation with ordinary objects and a clock time; the example is used, not displayed', outside: 'opens from how others see it and what it costs or pays' }[r.door] } }), value: { word: red(r.word), text: red(led[idx].doors[r.door]) } }; });`

The lib.mjs task line for the ledger row (line 181) needs no change for this item: the GOD facts already print "Ruled domains: …" (line 71), and the card carries the rule from Part 1.

### Part 8 · Companion: the family's domain words reach the pair prompt (needed by Part 3)

**8a · `01_INPUT_PACK.md` §2.3, appended to the first paragraph.** Anchor: the function-noun clause.

Before:
> the function noun the energy is for this core (feeder → Mind · fed → Expression · tamed → Action · tamer → Order · self → Body)

After:
> the function noun the energy is for this core (feeder → Mind · fed → Expression · tamed → Action · tamer → Order · self → Body) · the family's two personas and their six ruled domain words (Body: the Twin and the Rival · Mind: the Alchemist and the Sage · Expression: the Artisan and the Virtuoso · Action: the Horizon and the Steward · Order: the General and the Magistrate), the example source for the advice's small actions (owner 2026-09-29)

**8b · `lib.mjs` `pairCellFacts` (line 92 onward).** Add one line after the `## CELL FACTS` line so the six words print. Proposed line, to insert after `const lines = [...]` at line 94:

> `const FAMILY_GODS = { Body: ['bijian', 'jiecai'], Mind: ['pianyin', 'zhengyin'], Expression: ['shishen', 'shangguan'], Action: ['piancai', 'zhengcai'], Order: ['qisha', 'zhengguan'] }; const fam = FAMILY_GODS[fnOf(c, e)] || []; if (fam.length) lines.push(`- Family personas and ruled domains (the example source for the small actions): ${fam.map((g) => { const gd = J(`GOD/${g}.json`); return `${gd.persona_name}: ${gd.domains.join(', ')}`; }).join(' · ')}`);`

`fnOf(c, e)` is the function noun the pack already derives for the cell (the patch names whichever helper `pairLaw` uses for it). Not gated: the read decides the source.

### What the patch does not touch

- The claimed-memory, biography and guarantee rules (D2) stand as they are: the size test is a fourth reader question, not a new ban list.
- The Angle Map (E1, E2) stands: the arena is the nature's, the example is the persona's, and a picture obeys both.
- The station's lines are not re-cut here: the flagged 木_偏财 catalyst row 0 (outside: "People who chase one goal at a time find your calendar hard to explain. You keep three ventures alive across two cities, and somehow the overlaps feed each other instead of colliding. Spreading is simply how opportunity finds enough doors to knock on." and its scene door's "On paper it is three businesses in two cities.") goes to the next round.

### Approval sheet

| Part | File | One word |
|---|---|---|
| 1a–1f | fn_reading card | |
| 2a–2d | STEM.gifts card | |
| 3a–3e | advise card | |
| 4, 4b | master prompt | |
| 5 | register E6 and log | |
| 6 | REA_16 §6 log row | |
| 7 | handoff.mjs ledger spec line | |
| 8a–8b | companion: pair pack and pairCellFacts | |
