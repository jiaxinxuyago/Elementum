# M3, narrowed: the misuse of "ahead of" (owner ruling, 2026-10-17)

The owner rejected a wider rewrite of the middle sentences. The rewrite turned every sentence into the same "X, so Y" frame, and the originals read better. The ruling now: **"For M3, only focus on fixing the misuse of 'ahead of'."**

## The misuse
Across the reading content, "ahead of" often stands in for "rather than", which sounds translated to an English reader. Examples:
- "you take the big risk ahead of sure footing"
- "you choose rank ahead of liking your work"
- "your bets are sized to the thrill ahead of the margin"

Its correct sense is time or position: "before", or "in front of".

## The fix
For each "ahead of" in `worklist.json`:
- **Time sense**, where "before" would mean the same, e.g. "you say yes ahead of checking whether you have it to give": swap to **"before"**.
- **Preference sense** (X chosen over Y): swap to the phrase that reads most naturally in that sentence. Prefer **"over"**, **"above"** or **"more than"**. Use "instead of", "rather than" or "sooner than" only where nothing else fits, because the pages already carry many of them. Check the whole text: if it already has a "rather than", don't add a second.
- **Correct use** (a real position or a time with no "before" equivalent): keep "ahead of".

**Only the phrase "ahead of" may change.** Every other character of the text stays as it is: no reordering, no grammar fixes elsewhere, no change to the verb form after it. Where "over" or "before" needs the following word in a different form, pick a replacement that fits the words as they stand. The gate checks this exactly. The allowed replacements are: ahead of (kept), before, over, above, more than, instead of, rather than, in place of, sooner than.

## Files
- Input: `worklist.json`, every station text containing "ahead of", as `{ key, text }`.
- Output: `out.json`, `[{ "key": "<exact key>", "text": "<the full text with the swaps>" }]`, one entry for every worklist key. Return a text unchanged if every use in it is correct.
- Check with `node gate.mjs out.json` until it reports 0 failures. Then read every swapped sentence aloud in your head: it must be idiomatic English.
- Don't edit any other file. Don't run git, wrangler, any deploy, or the applier.

When done, reply with the counts per replacement phrase and ten before/after sentences.
