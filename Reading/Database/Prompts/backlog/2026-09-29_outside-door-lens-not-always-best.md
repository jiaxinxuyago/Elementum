# Backlog 5 — the outside-door lens is not always the best lens

**Raised:** 2026-09-29, owner note at Q52 of the blind read (Fire page, outside door, The General 七杀, "Crisis-ready").
**Status:** RULED 2026-09-29 (owner, by questionnaire): OPTION 1. The outside door stays the third lens, but the passage opens on the reader's own act in the moment and lands on what others see or pay in its last sentence. Scope: the ledger's outside door only (the fn_reading card's outside register and the door rotation rule; the Day Master pools and the pair fields untouched). No patch was drafted before the ruling; the apply pass drafts and applies it.

## What the owner said

Picked A as best of the three, then: "an outside door starting with what people can react to you is not better than describing how the user can actually react to crisis themselves. Outside door is not the best lens here."

## What the rule says today

The ledger's third row is the outside door: the trait as others meet it. The field card (`fields/ELEMENT_GOD/fn_reading.md`, outside register) asks the writer to open from the other side of the table, so all three candidates opened with "People can use...", "Others can turn to you...", "There is a particular quiet that falls when...".

## The question for the owner

For a God whose trait is a reaction under pressure (七杀 the General, and likely 伤官 the Virtuoso and 偏印 the Owl), the reader wants to see themselves act, not be watched acting. Options:

1. Keep the outside door as the fixed third lens, but let the writer open from the reader's own reaction and land on the effect on others in the last sentence.
2. Make the third row's lens a choice per God: outside (how others meet it) or in-action (how the reader meets a moment), chosen on the God card.
3. Leave the lens as is and treat Q52 as a one-off.

Option 1 keeps the ledger's shape and the door's purpose while fixing the opening. Recommended.

## Where the change would land

- `Reading/Database/Prompts/fields/ELEMENT_GOD/fn_reading.md` (outside register wording)
- `Reading/Database/Prompts/02_RULES_REGISTER.md` (door rotation rule)
- `Reading/Documents/REA_16_The_Voice.md` §2c (outside register row) and §6 (ruling log)
- harness: `validate.mjs` outside-door opener note (already non-blocking)

## Draft patch (drafted in the apply pass, 2026-09-29, and applied in the same pass)
_Drafted 2026-09-29 by the apply pass on the owner's ruling (option 1). Every "before" is the file text as it stood after the doors item (`2026-09-29_scene-door-imagery-not-staging.md`) and the ruled-domains item (`2026-09-29_examples-from-ruled-domains-not-work.md`) were applied, quoted verbatim, and every "after" is the exact replacement. The register carries no separate door rotation row: the rotation is stated on the 06 caps line and in the REA_16 §2c row, and the doors' register row is D3, so the ruling lands there. The rule: the third row stays the outside door, but the passage opens on the reader's own act in the moment ("When the plan breaks, you …") and lands on what others see or pay in its last sentence. The outside exemplar is written new to the ruling (the station's 火_七杀 file is a candidates file, so no shipping line is quoted); it counts 49 words and passes the stamp, banned-word and hedge gates._

### Part 1a · fn_reading card, Construct (the outside sentence)

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> Outside opens on how others see it and what it costs or pays ("People mistake your pace for being behind, right up until…") and names the trait behind the view.

After:
> Outside opens on the reader's own act in the moment ("When the plan breaks, you …"), names the trait behind the act, and lands in its last sentence on what others see or pay ("People mistake your pace for being behind, right up until…"). The outside view is the landing, never the opening (owner 2026-09-29, Q52).

### Part 1b · fn_reading card, Reasoning chain

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> for each door, open on that door's angle, state the trait as a conclusion

After:
> for each door, open on that door's angle (the outside door on the reader's own act in the moment, its last sentence on what others see or pay), state the trait as a conclusion

### Part 1c · fn_reading card, Style

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> and the outside door hears it from the people in that domain, not from colleagues by default.

After:
> and the outside door's last sentence hears it from the people in that domain, not from colleagues by default.

### Part 1d · fn_reading card, Checks

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> each door opens on its own angle (trait: the claim, scene: a picture, outside: other people)

After:
> each door opens on its own angle (trait: the claim, scene: a picture, outside: the reader's own act in the moment, landing on what others see or pay in its last sentence)

### Part 1e · fn_reading card, a second exemplar (the outside door re-cut)

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> so it passes the source test and the size test as it stands.

After:
> so it passes the source test and the size test as it stands.
> - Exemplar (火_七杀 · Crisis-ready · outside, written 2026-09-29 to the Q52 ruling, not station text): "When the plan breaks, you go quiet and start giving orders, and the orders are short. Pressure clears your head where it burns most people's out. Others learn to look at you first when something fails, and they pay for it in the decisions they stop making for themselves." It opens on the reader's own act, states the trait in its second sentence, and lands on what others see and pay in its last.

### Part 1f · fn_reading card, Sources

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> at a size the reader can own) and the B7 and B8 rulings 2026-09-20.

After:
> at a size the reader can own; Q52: the outside door opens on the reader's own act and lands on what others see or pay) and the B7 and B8 rulings 2026-09-20.

### Part 1g · fn_reading card, Iteration log

File: `Reading/Database/Prompts/fields/ELEMENT_GOD/ELEMENT_GOD.fn_reading.md`

Before:
> | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

After:
> | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |
> | 2026-09-29 | The outside door stays the third door in the rotation, but the passage opens on the reader's own act in the moment and lands on what others see or pay in its last sentence (construct, chain, style, checks, a second exemplar) | owner 2026-09-29, at Q52 of the blind read, option 1 (REA_16 §2c outside register, §6) |

### Part 2 · 02_RULES_REGISTER.md, row D3 (the doors row; the register carries no separate door rotation row, the rotation is stated in the 06 caps line and the §2c row)

File: `Reading/Database/Prompts/02_RULES_REGISTER.md`

Before:
> Cut anything the trait does not need. | the 2026-09-17 pack, re-cut by the owner 2026-09-29 at Q33 and Q34

After:
> Cut anything the trait does not need. The outside door (owner 2026-09-29, Q52, option 1): it stays the third door of the rotation (trait · scene · outside), but the passage opens on the reader's own act in the moment ("When the plan breaks, you …") and lands on what others see or pay in its last sentence | the 2026-09-17 pack, re-cut by the owner 2026-09-29 at Q33 and Q34

### Part 2b · 02_RULES_REGISTER.md, Iteration log

File: `Reading/Database/Prompts/02_RULES_REGISTER.md`

Before:
> | 2026-09-29 | E6: examples from the ruled domains and ordinary life, at a size the reader can recognise as their own, the size-test harness note | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |

After:
> | 2026-09-29 | E6: examples from the ruled domains and ordinary life, at a size the reader can recognise as their own, the size-test harness note | owner 2026-09-29, at Q25 of the blind read (REA_16 §6) |
> | 2026-09-29 | D3: the outside door opens on the reader's own act and lands on what others see or pay in its last sentence | owner 2026-09-29, at Q52 of the blind read, option 1 (REA_16 §6) |

### Part 3 · 06_CAPS_BY_PAGE.md, the door passage line

File: `Reading/Database/Prompts/06_CAPS_BY_PAGE.md`

Before:
> outside: other people) and states the trait as a conclusion

After:
> outside: opens on the reader's own act and lands on what others see or pay) and states the trait as a conclusion

### Part 4 · handoff.mjs, the outside door note

File: `ComparativeAnalysis/Prompts/handoff.mjs`

Before:
> outside: 'opens on how others see it and what it costs or pays, and names the trait behind the view'

After:
> outside: 'opens on the reader\'s own act in the moment ("When the plan breaks, you …"), names the trait behind the act, and lands in its last sentence on what others see or pay'

### Part 5a · lib.mjs, the task line

File: `ComparativeAnalysis/Prompts/lib.mjs`

Before:
> outside opens on how others see it and what it costs or pays.

After:
> outside opens on the reader's own act in the moment and lands in its last sentence on what others see or pay.

### Part 5b · lib.mjs, the outside-door note (non-blocking)

File: `ComparativeAnalysis/Prompts/lib.mjs`

Before:
> note('outside door opens from other people (heuristic; the read decides)', /^(People|Friends|Others|Colleagues|Everyone|Nobody|The people|Those|Guests|Your (friends|family|partner|colleagues|team|coworkers|kids|boss)|Anyone|Strangers|The (team|table|family|office|crowd|group)|Whoever|Someone|A (friend|colleague|partner|coworker))\b/.test(o.doors?.outside || ''));

After:
> { const od = String(o.doors?.outside || ''); const sents = od.split(/(?<=[.!?])\s+/); note('outside door opens on the reader\'s own act (the first sentence carries "you"; heuristic, the read decides)', /\byour?\b/i.test(sents[0] || '')); note('outside door lands on what others see or pay (the last sentence names other people; heuristic, the read decides)', /\b(people|others|friends?|family|partner|colleagues?|team|kids|children|parents?|someone|anyone|everyone|nobody|strangers|guests|they|them|their|the (table|office|crowd|group|house))\b/i.test(sents[sents.length - 1] || '')); }

### Part 6 · REA_16 §2c, the fn_reading row (the outside register)

File: `Reading/Documents/REA_16_The_Voice.md`

Before:
> Every door of the 2026-09-29 round is provisional under this ruling, and the next round's doors are written to it before they are compared. |

After:
> Every door of the 2026-09-29 round is provisional under this ruling, and the next round's doors are written to it before they are compared. **THE OUTSIDE DOOR (owner 2026-09-29, Q52 of the blind read, option 1):** the third door stays the outside door in the rotation, but the passage opens on the reader's own act in the moment ("When the plan breaks, you …") and lands on what others see or pay in its last sentence. A door that opens on what people can react to is not better than one that shows the reader reacting, so the outside view is the landing, never the opening. The Day Master pools and the pair fields are untouched. |

### Part 7 · REA_16 §6 log row

File: `Reading/Documents/REA_16_The_Voice.md`

Before:
> Record: Reading/Database/Prompts/backlog/2026-09-29_examples-from-ruled-domains-not-work.md. |

After:
> Record: Reading/Database/Prompts/backlog/2026-09-29_examples-from-ruled-domains-not-work.md. |
> | 2026-09-29 | **THE OUTSIDE DOOR OPENS ON THE READER'S OWN ACT (owner, at Q52 of the blind read, option 1).** On the Fire page's outside door (the General, Crisis-ready) all three candidates opened from the other side of the table ("People can use…", "Others can turn to you…"), and the owner picked one with the note that a door starting with what people can react to is not better than one describing how the reader reacts to crisis themselves. Ruled: the third row stays the outside door (the rotation trait · scene · outside holds), but the passage opens on the reader's own act in the moment ("When the plan breaks, you …") and lands on what others see or pay in its last sentence. Scope: the ledger's outside door only; the Day Master pools and the pair fields are untouched. Re-cut: the fn_reading card (the outside register in construct, chain, style and checks, a second exemplar), register D3, the 06 caps line, the handoff door note, the lib.mjs task line and the outside-door heuristic (now two notes: the first sentence carries "you", the last names other people), the §2c outside register. Applied on top of the doors ruling of the same day. Record: Reading/Database/Prompts/backlog/2026-09-29_outside-door-lens-not-always-best.md. |

### What the patch does not touch

- The rotation (trait → scene → outside) and the 35–55 word range.
- The Day Master pools and the pair fields (option 1's scope is the ledger's outside door only).
- The station's outside doors: every door of this round is provisional under the doors ruling and is re-run in the next round.

## Action items

- [x] Draft the patch (before/after per file) in this file.
- [x] Apply: the fn_reading card's outside register (construct, chain, style, checks, a second exemplar), register D3, the 06 caps line, the handoff door note, the lib.mjs task line and heuristic, REA_16 §2c and §6.
- [ ] Re-run the golden set's outside doors under the new construct in the next round and compare against this round's.
