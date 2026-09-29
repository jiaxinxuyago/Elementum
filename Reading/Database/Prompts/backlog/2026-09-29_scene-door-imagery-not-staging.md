# Backlog · the scene door illustrates, it does not stage (owner feedback, 2026-09-29, during the blind read)

**Status: OWNER RULING RECORDED, prompt change pending.** Card affected: `fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md` (the three doors). Also touches the harness spec note for scene doors and the STEM pool desc guidance.

## The takeaway, as the owner put it

The scene-door passages have been stretching too far into describing one scene with excess detail ("five o'clock on Tuesday", "at eleven at night, you turn back a page"). Those details are unnecessary and the passages end up far-fetched, a scene acted out rather than a point made. The scene door should be **imagery that illustrates the trait**: pictures, plural, that make the line vivid and picturesque, without staging one actual scene for the reader to act out.

## What it changes

- The current law (REA_16 §2c THE THREE DOORS, owner 2026-09-03; the card: "Scene opens inside a real-life example with objects and clock time … the example is USED, not displayed") asked for one representative situation with objects and a clock time. The clock time and the single staged situation are what the owner now names as the fault.
- Proposed card wording: "Scene: the trait shown through pictures. One or more concrete images from the reader's ordinary life (objects, places, small actions) that illustrate the word, used to make the claim vivid, never a single staged event with a time stamp. No clock times. A picture is an illustration of the mechanism, not a story the reader is asked to have lived."
- The harness spec note for scene doors ("opens inside a representative situation with ordinary objects and a clock time") changes with it; the non-blocking "scene carries an object or a clock time" note is retired.
- The same holds for the STEM pool `desc` ("the reader must SEE an image") and for any card that says "clock time" (the master prompt's "a representative scene with ordinary objects and a clock time is welcome").

## Evidence in the round

Blind and benchmarked passes both produced time-stamped single scenes on most scene doors (Earth Brooding "At eleven at night…", Wood Compounding "At eight in the evening…", Fire Daring "At four in the afternoon…"), because the card and the spec note asked for one. The shipping corpus does it too ("It is Thursday night and Tuesday's conversation is still running…"). The owner's picks during the read favour the versions whose scene is a set of pictures ("Fifty a month since college. A page a day, a call every Friday…") over the staged ones.

## Owner's note at Q33 (2026-09-29)

Picking the Metal page's Rigid scene door, the owner added: none of the scene-door versions would pass if they keep describing the scene with exact time and place details ("at nine in the morning" and the like). The pick is the least staged of the three, not an endorsement of the form. Every scene door in this round (all three piles) is therefore provisional under this item, and the next round's scene doors must be written to the new construct before they are compared.

## Action items

- [ ] Re-cut the scene-door construct in the fn_reading card and the master prompt's scene sentence; note the change in REA_16 §2c (THE THREE DOORS row) and §6.
- [ ] Update `handoff.mjs` spec notes and `validate-template.mjs` / `lib.mjs` notes for scene doors.
- [ ] Re-run the scene doors of the golden set under the new construct in the next round; compare against this round's.

## Draft patch (not applied)

_Drafted 2026-09-29 by the backlog drafter. Nothing below is applied. Each numbered part is one approval: say the number and "yes", or the number and a correction. Every "before" is the current text quoted verbatim, every "after" is the exact replacement. The parts cover every file the item touches, checked by search: the phrase "clock time" lives in the fn_reading card (two lines), the master prompt (one sentence), the register (row D3 only), `06_CAPS_BY_PAGE.md` line 32, `05_CLASSICAL_SOURCES.md` line 75, `handoff.mjs` line 57 and `lib.mjs` line 181. `validate-template.mjs`, `validate.mjs` and `render-template.mjs` carry no scene or clock line (0 matches each), so nothing changes there. REA_04 PART 8 does not say "clock time", so the 05 line is the pack's own phrasing and can change without a source conflict._

### Part 1 · `fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

**1a · Construct, the scene sentence.**

Before:
> Scene opens inside a real-life example with objects and clock time ("One book, read twice, with notes in the margins the second time through").

After:
> Scene shows the trait through pictures: one or more concrete images from the reader's ordinary life (objects, places, small actions) that illustrate the word ("One book, read twice, with notes in the margins the second time through"). The pictures make the claim vivid and picturesque. They never stage one event with a time stamp, and no clock time appears. A cadence is a picture ("a page a day, a call every Friday"). An hour on one act is a stage direction ("at eleven at night, you turn back a page").

**1b · Construct, the closing clause.**

Before:
> Every beat is a full sentence with verbs; the example is USED, not displayed (the sentence itself says what the example proves).

After:
> Every beat is a full sentence with verbs. A picture is USED, not displayed (the sentence itself says what the picture proves), and a picture is an illustration of the mechanism, not a story the reader is asked to have lived.

**1c · Reasoning chain.**

Before:
> - Reasoning chain: the chip → what it IS for the person (a feature, a tendency, a habit, named as such) → one scene with objects and a clock time → the turn to the cost or the payoff → write the same content three times from the three doors so any row works at any blend position.

After:
> - Reasoning chain: the chip → what it IS for the person (a feature, a tendency, a habit, named as such) → the pictures that show it (one or more, from ordinary life, objects and small actions, no clock time) → the turn to the cost or the payoff → write the same content three times from the three doors so any row works at any blend position.

**1d · Style.**

Before:
> a scene is a representative situation, never a claimed memory, never another person's private thoughts, never a confirmed prediction, never a safety-critical procedure as proof of character.

After:
> a scene is illustration, never staging: pictures the reader recognises, never one acted-out event, never a clock time or a stated hour as the anchor of an act, never a claimed memory, never another person's private thoughts, never a confirmed prediction, never a safety-critical procedure as proof of character.

**1e · Checks.**

Before:
> - Checks: 35–55w per door, zero dashes, the sibling test, no banned register.

After:
> - Checks: 35–55w per door, zero dashes, the sibling test, no banned register, no clock time in a scene door (a stated hour, "o'clock", am or pm, "at {hour} in the {morning, afternoon, evening}", "at midnight", "at noon", or "it is {day} night" as the anchor of one act). A cadence ("every Friday", "a page a day") is lawful.

**1f · Exemplar note.** Append one sentence after the exemplar line:

Before:
> - Exemplar (土_偏印 · Overprepared · scene): "Seventeen browser tabs, two saved courses, a notebook full of plans. The project they all point at has not moved in a month, but the researching of it has never gone better. One more book, you tell yourself, and the telling sounds exactly like last time."

After:
> - Exemplar (土_偏印 · Overprepared · scene): "Seventeen browser tabs, two saved courses, a notebook full of plans. The project they all point at has not moved in a month, but the researching of it has never gone better. One more book, you tell yourself, and the telling sounds exactly like last time." The exemplar already reads as pictures (three objects, one month, no clock time) and stands as the model under the 2026-09-29 ruling.

**1g · Sources.**

Before:
> - Sources: REA_16 §2c (THE THREE DOORS 2026-09-03, corpus 2026-09-04); the B7 and B8 rulings 2026-09-20.

After:
> - Sources: REA_16 §2c (THE THREE DOORS 2026-09-03, corpus 2026-09-04, amended 2026-09-29, the scene door illustrates, it does not stage) and the B7 and B8 rulings 2026-09-20.

**1h · Iteration log.** Append the row:

> | 2026-09-29 | The scene door re-cut from one staged situation with a clock time to pictures that illustrate the trait, no clock times, a cadence stays lawful, the check added | owner 2026-09-29, during the blind read (REA_16 §2c THE THREE DOORS amendment, §6) |

### Part 2 · `00_MASTER_PROMPT.md`

**2a · The scene sentence (section "What you are given, and what you may not invent").**

Before:
> A representative scene with ordinary objects and a clock time is welcome; a claimed memory is not.

After:
> Pictures from ordinary life (objects, places, small actions) that illustrate a claim are welcome. One staged event with a clock time is not, and a claimed memory is not.

**2b · Iteration log.** Append the row:

> | 2026-09-29 | The scene sentence: pictures that illustrate, not a staged scene with a clock time | owner 2026-09-29, during the blind read (REA_16 §2c, §6) |

### Part 3 · `02_RULES_REGISTER.md`

**3a · Row D3** (the only register row that says "clock time").

Before:
> | D3 | A representative scene with ordinary objects and a clock time is welcome; a claimed memory is not | the 2026-09-17 pack | harness (scene door check); read | explicit |

After:
> | D3 | Pictures from ordinary life (objects, places, small actions) that illustrate a claim are welcome. One staged event with a clock time is not, and a claimed memory is not. A scene door is illustration, not staging: one or more pictures, no clock time, and a cadence ("a call every Friday") is a picture | the 2026-09-17 pack, re-cut by the owner 2026-09-29 (the scene door illustrates, it does not stage) | harness (no clock time in a scene door, heuristic, plus the claimed-memory flag) · read | RULED 2026-09-29 |

**3b · Iteration log.** Append the row:

> | 2026-09-29 | D3 re-cut: the scene door illustrates through pictures and carries no clock time, and the harness scene heuristic reversed (flags a clock time instead of asking for one) | owner 2026-09-29, during the blind read (REA_16 §6) |

### Part 4 · `06_CAPS_BY_PAGE.md` line 32

Before:
> | `ELEMENT_GOD.fn_reading` door passage | the ledger, one door per row (trait · scene · outside, rotating) | 35 | 55 | trait opens on the claim; scene opens inside a situation with objects and a clock time; outside opens from other people |

After:
> | `ELEMENT_GOD.fn_reading` door passage | the ledger, one door per row (trait · scene · outside, rotating) | 35 | 55 | trait opens on the claim · scene shows the trait through pictures from ordinary life, no clock time · outside opens from other people |

### Part 5 · `05_CLASSICAL_SOURCES.md` line 75

Before:
> the anchors (a scene with ordinary objects and a clock time, a paired checkable cost)

After:
> the anchors (pictures from ordinary life that illustrate the claim, a paired checkable cost)

### Part 6 · Harness spec note, `ComparativeAnalysis/Prompts/handoff.mjs` line 57

The line (quoted, the scene entry of the `notes` object inside the `fields[`ledger[${i}]`]` spec):

Before:
> `scene: 'opens inside a representative situation with ordinary objects and a clock time; the example is used, not displayed'`

After:
> `scene: 'shows the trait through pictures from ordinary life (objects, places, small actions), one or more, no clock time. A picture is used, not displayed, and never staged as one event'`

### Part 7 · Harness task line and the non-blocking note, `ComparativeAnalysis/Prompts/lib.mjs` line 181

**7a · The task line** (inside the `ask` template string of `'ELEMENT_GOD.fn_reading.row'`).

Before:
> `Trait opens on the trait claim; scene opens inside a representative situation with objects and a clock time; outside opens from how others see it and what it costs or pays.`

After:
> `Trait opens on the trait claim. Scene shows the trait through pictures from ordinary life (objects, places, small actions), one or more, with no clock time and no single staged event. Outside opens from how others see it and what it costs or pays.`

**7b · The non-blocking note** (the `note(...)` call in the same entry's `validate`). The backlog retires the "carries an object or a clock time" note. Proposed: reverse it, so the heuristic flags a clock time instead of asking for one. Same tier (note, the read decides).

Before (one line, quoted whole):
> `note('scene door carries an object or a clock time (heuristic; the read decides)', /\b(table|kitchen|phone|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|morning|evening|minute|hour|o'clock|dinner|desk|bus|pan|soup|cup|tabs?|notebook|weekend|midnight|noon|\d{1,2}(:\d\d)?\s?(am|pm|a\.m\.|p\.m\.)|(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)( |-)?(thirty|fifteen|forty|o'clock)?)\b/i.test(o.doors?.scene || ''));`

After (one line):
> `note('scene door carries no clock time (heuristic, the read decides)', !/\b(\d{1,2}(:\d\d)?\s?(am|pm|a\.m\.|p\.m\.)|o['’]clock|at (one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)( thirty| fifteen)?( in the (morning|afternoon|evening)| at night)?|at midnight|at noon|(it is|it's|it’s) (Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)( night| morning| evening| afternoon)?)\b/i.test(o.doors?.scene || ''));`

Tested against the round's lines: flags "At eleven at night, you turn back a page", "At four in the afternoon", "At eight in the evening", "five o'clock on Tuesday" and "It is Thursday night and Tuesday's conversation is still running", passes "A page a day, a call every Friday", "Seventeen browser tabs, two saved courses, a notebook full of plans" and "Ten minutes in, you know who they are". If the owner wants it blocking, the same test goes into `F('doors', 'clock time in the scene door')` instead of `note(...)`, say "7b blocking".

**7c · `validate-template.mjs`.** No change: the file carries no scene or clock line (verified, 0 matches).

### Part 8 · `Reading/Documents/REA_16_The_Voice.md` §2c, the `station:ELEMENT_GOD.fn_reading` row

Append this sentence to the end of the row's THE THREE DOORS text (after "Chips ALSO render on the reading page (bare pill row under the title — the scannable summary above the expansion).")

> **AMENDED (owner 2026-09-29, during the blind read): THE SCENE DOOR ILLUSTRATES, IT DOES NOT STAGE.** The scene door is pictures, one or more concrete images from the reader's ordinary life (objects, places, small actions) that make the word vivid, never a single acted-out event with a time stamp. Clock times are out. A cadence ("a page a day, a call every Friday") is a picture, not a stamp. The picture is still USED, not displayed, and it illustrates the mechanism rather than telling the reader a story they are asked to have lived.

### Part 9 · REA_16 §6 log row

Insert in date order (after the 2026-09-21 rows):

> | 2026-09-29 | **THE SCENE DOOR ILLUSTRATES, IT DOES NOT STAGE (owner, during the blind read of the 2026-09-29 round).** The scene-door passages were staging one event with a time stamp ("At eleven at night, you turn back a page", "At eight in the evening", "At four in the afternoon"), because the card, the master prompt and the harness note asked for a clock time. Ruled: the scene door is imagery that illustrates the trait, pictures, plural, from ordinary life, no clock time, never a scene acted out. A cadence stays lawful ("Fifty a month since college. A page a day, a call every Friday"). Re-cut: the fn_reading card (construct, chain, style, checks, exemplar note), the master prompt's scene sentence, register D3, the 05 and 06 lines, the handoff spec note, the lib.mjs task line and its scene heuristic (reversed: it now flags a clock time). The §3 desc law's "2 AM call" example goes with it. The golden set's scene doors re-run under the new construct in the next round and are compared against this round's. Record: Reading/Database/Prompts/backlog/2026-09-29_scene-door-imagery-not-staging.md. |

### Part 10 · Companion, optional: the STEM pool desc ("the reader must SEE an image")

The phrase lives in REA_16 §3 (the v1.3 authoring prompt), not in the STEM.gifts card. The card already says "one concrete image" and "the desc may show the picture, the phrase stays plain", which is the illustration construct, so the card needs one clause at most.

**10a · REA_16 §3, the Desc law line.**

Before:
> - **Desc law:** one or two sentences that stage the phrase in a concrete real-life situation — the reader must SEE an image (the meeting drifting to consensus, the 2 AM call, the door already shut).

After:
> - **Desc law:** one or two sentences that show the phrase through a concrete picture from real life. The reader must SEE an image (the meeting drifting to consensus, the door already shut), never one staged event with a clock time (owner 2026-09-29, the live count is 1–4 sentences, §7 step 3).

**10b · `fields/STEM/STEM.gifts.md`, Style.**

Before:
> the desc may show the picture, the phrase stays plain.

After:
> the desc may show the picture (a picture, never a staged event with a clock time, owner 2026-09-29), the phrase stays plain.

### What the patch does not touch

- The freedom clause's "scene craft" (master prompt, `04_READING_SYSTEM_PRIMER.md` line 91, the handoff's "the scene you build") stays: scene craft is the writer's, the clock time was the fault.
- The claimed-memory flag in `lib.mjs` (`remember when`, `that time you`, `when you were`) stays as is.
- The station's 792 passages are not re-cut by this patch, the action item is the re-run in the next round.

### Approval sheet

| Part | File | One word |
|---|---|---|
| 1a–1h | fn_reading card | |
| 2a–2b | master prompt | |
| 3a–3b | register D3 and log | |
| 4 | 06_CAPS_BY_PAGE | |
| 5 | 05_CLASSICAL_SOURCES | |
| 6 | handoff.mjs spec note | |
| 7a | lib.mjs task line | |
| 7b | lib.mjs scene note (note, or "blocking") | |
| 8 | REA_16 §2c row amendment | |
| 9 | REA_16 §6 log row | |
| 10a–10b | optional: §3 desc law, STEM.gifts style | |
