# Round 4: the last MINOR pass (owner rulings, 2026-10-17)

The round-2 audit and the owner's rulings. The owner approved R2-3 and R2-4, and wants **"the audit and fixes until there is ZERO major items and only a few minor items left"**. Round-1 practice for Minor fixes stands: "Approve all other fixes besides the four system-level items", with **A3 restatement not approved ("A3 original wins")**.

Your worklist holds persona-cell fields (keyword passages, persona definition tails, edges), each with its `findings`:
- **R2-3:** the chart's quantity of an element is given as the cause ("You carry more Wood than stamina to match", "Little Water comes in", "Metal piles up in you"). Change only that sentence so it names the reader's own want or fear. The comparative middle sentence frame stays: the owner settled it.
- **R2-4:** a partner, child, boss, promotion or household is assumed. Swap only those words for neutral ones (the finding lists them). Words like "partner in a bet" or "raise the stakes" are not assumptions: keep them and give a `no_change_reason`.
- **R2 MINOR findings:** fix only the flagged sentence or phrase. Use the auditor's note as a guide, not as text to paste. On a finding mixed with A3, fix only the non-A3 part.

## Settled by the owner (never change these)
- **Restatement stays.** Never cut or reword a sentence only because it repeats another.
- **The comparative middle sentence stays.**
- **The Sage is drawn to shelter, or shelter comes to it.** Sheltering others is its outer act.
- **Gift closes may end on other people** ("Old friends still call you first.").
- **No "X, so Y"** in anything you write.

## House rules (the gate checks them)
- At most two sentences change, and the sentence count stays the same.
- Passages are 30 to 45 words. A persona definition tail plus its head stays within 30 to 50 words.
- No dash, semicolon or colon. At most two commas per sentence. No "room" or "verdict". No new "ahead of" or "sooner than".
- **Catalyst closes:** the gift, the price or the want. Never an instruction or a fix.
- **Friction closes:** a plain cost, the want or a permission. Never "you can/could". No charge on the cost to others.
- Plain B1 to B2 English, British spelling (practise as a verb).

## Files
- Output: `out-<a|b>.json`, `[{ "key", "text", "no_change_reason"? }]`, one entry per worklist key.
- Check with `node gate.mjs out-<a|b>.json` until it reports 0 failures, then read every changed text once through.
- Edit no other file. No git, no deploy.

Reply with counts (changed, unchanged with reason, by finding type) and six before/after sentences.

## Round 3 notes
- This round's worklist holds the round-4 MINOR findings (ids "R4 …"). It covers keyword passages and persona tails, and also shared pair fields: remedies, shared and balanced definitions. Fix only what each finding flags.
- **Remedies (`function.advise_friction`):** the "Seek X, the … energy." sentence never changes. The image and "Let it …" lines change only if the finding names them. An act you change still draws on the element sought, and must not repeat an act the same reader meets on another page (the finding names it when that is the issue).
- **Balanced definitions (`function.definition_balanced`):** change only the tail (from "In balance, …"). It claims a pace or a balance, never a trait that a persona's keywords deny.
- **A shared definition's first two sentences** (the head) never change. They are shared with other pages.
- **New since round 2, settled by the owner:** a friction page carries a want or a permission close on its drive or cost_self passage. Don't turn such a close back into a loss.
