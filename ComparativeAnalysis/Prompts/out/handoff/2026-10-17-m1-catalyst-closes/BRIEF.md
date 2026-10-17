# M1: catalyst passage closes (owner ruling, 2026-10-17)

You are rewriting the **last sentence** of the catalyst keyword passages for one energy of Elementum, a BaZi reading app. The owner approved this rule after reading the samples below: **"M1 approve, apply the fix across all content that has the issue."**

## What a catalyst page is
A catalyst page tells the reader that an energy runs thin in their chart and that the persona's traits are worth growing. Its verdict line reads **"Grow it."** Below the verdict sit keyword chips. Each chip opens one passage of three sentences (drive, cost to self, or cost to others). After the keywords comes THE ADVICE, which gives the reader four or five steps to take.

## The problem
Most catalyst passages end on an instruction ("Keep giving first, because…", "Ask one person…"), a conditional fix ("If you X, you Y"), or a lever ("…and one look is cheap", "…and asking one person along changes that"). That does THE ADVICE's job a section early. It often tells the reader to do *less* of the trait the verdict says to grow, and three or four instructions per page read as a lecture.

## The rule
A catalyst passage closes on one of three kinds:
- **gift**: what the trait does or gives, now, for the reader or for the people around them.
- **price**: what it costs, stated flat. It is the honest price of a gift, never a reason to stop. On cost to others, there is no charge: no implied deceit, no victim, no predicted outcome, and acts rather than character.
- **want**: the reader's own need underneath, owned.

It never closes on an instruction, a conditional ("If/When/Once/Until… you"), a lever ("one X changes that", "costs you nothing", "is cheap", "the more… the more"), a permission ("you are free/allowed to"), or a capacity line ("you can/could").

By angle:
- **drive** closes on a gift or a want.
- **cost_self** closes on a price or a want.
- **cost_others** names what the trait costs or gives the people around the reader. At least two of a cell's three cost_others closes carry the cost.

## Owner-approved samples (live text, last sentence only)
- Artisan, "Giving", drive. "Keep giving first, because you were never giving to earn your place." → "You were never giving to earn your place." (want)
- Virtuoso, "Speaks up", drive. "Keep speaking up, since you are usually the only one who will." → "You are usually the only one in the room who will." (gift)
- Twin, "Self-made", cost_self. "Ask for a hand early, or everything self-made costs you rest you never take." → "Everything you make alone is paid for in hours nobody sees." (price)

## What you may change
- **Only the last sentence.** `keep_as_is` (the first two sentences) is fixed. Do not touch it, even where you see a flaw there; a later pass (M3) handles the middle sentences.
- If the current close already lands as a gift, price or want and passes the gate, keep it (`"decision": "keep"`). Otherwise rewrite it.
- If a passage has `audit_notes` about its close, the new close should fix them. Notes about sentences 1–2 are out of scope.

## House limits (the gate checks all of these)
- The close is one sentence ending in a full stop. The reader ("you"/"your") is in it.
- The whole passage (keep_as_is + close) is 30 to 45 words and 2 to 3 sentences, with at most two commas per sentence.
- No dash, semicolon or colon. No "you can/could/may/might". No reminder phrases (remember, keep in mind, notice, forget, hold on to…).
- No comparison joint in the close ("rather than", "instead of", "ahead of", "in place of", "sooner than"). The middle sentences already carry one.
- No sleep, bed or rest as the cost ("the rest of" is fine). The advice already overuses it.
- No dosed act ("one evening a week").
- Plain B1 to B2 English, everyday words, British spelling (favour, practise as a verb). No italics, no Chinese characters, no astrology terms. Do not repeat a content word already used in the passage's first two sentences unless there is no plain alternative.

## Variety (compound readability)
A reader sees about four passages of one cell on a page, and the two cells of one energy (`pair_function`) sit together in a chart.
- Within a cell's nine closes, no two open with the same three words (the gate checks this).
- No more than five of the nine start with "You".
- Use at least two of the three kinds per keyword row.
- Use the frame "You pay for X in Y" at most twice per cell.
- Don't echo THE ADVICE (`pair_advise_catalyst`). The close states, and the advice prescribes.
- Stay true to the persona. Each cell gives the persona name. The persona is the same person on every element, and the Sage is the one who shelters others.

## Your files
- Input: `worklist-<energy>.json` in this folder. For each cell it gives the persona, the pair definition and advice, the friction keyword words (for contrast), and the nine catalyst passages, each with key, angle, `keep_as_is`, `close` (current) and word count.
- Output: `out-<energy>.json` in this folder, an array with one entry for **every** passage key:
  `{ "key": "<exact key>", "decision": "keep" | "rewrite", "close": "<new last sentence, only for rewrite>", "kind": "gift" | "price" | "want" }`
- Check with `node gate.mjs out-<energy>.json` from this folder. Iterate until it prints 0 failures.
- Don't edit any other file. Don't run git, wrangler, any deploy, or `apply-fixes.mjs` without `--dry`. The main session lands the work.

When the gate passes, reply with: the count of keeps and rewrites, the count by kind, and five before/after pairs you think best show the rule.
