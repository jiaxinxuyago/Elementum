# M6: one reader, each act once (owner ruling, 2026-10-17)

You are rewriting the **steps** (the instructions) in THE ADVICE and THE REMEDY for one **core** of Elementum, a BaZi reading app. The owner approved the samples below with: **"M6 approved, apply the fix to all content that shares the issue."**

## The problem
A reader sees five energy pages. Each page ends on THE ADVICE (catalyst pages) or THE REMEDY (friction pages), so one core has ten advice texts. The final audit found the same few acts everywhere. Sleep, night or bed is in 22 of 50 texts: a Wood- or Water-core reader can be told to sleep on it on all five pages. Earth-core readers are told to sit in every cell. Some steps repeat word for word across cells ("Eat lunch sitting down", "Ask someone older how they did it").

## The rule
- **Across your core's ten texts, each act family appears at most once.** The families are sleep, eat, sit, read, deadline, elder, above, child, write, walk, call and money (see `acts.mjs` for the words each one catches). The gate counts them. Most of your steps should fall in **no** family: fresh, concrete acts.
- **Each step draws on its element.** Catalyst advice grows the energy of that page (`catalyst_acts_draw_on`). The remedy's steps come from the element it tells the reader to seek (`remedy_acts_draw_on`). Wood starts and grows, Fire shows and warms, Earth keeps and holds, Metal cuts and decides, Water takes in and rests.
- **Each step is true for both personas on that page** (their keywords are in `personas`). It must not repeat a keyword's act or words.
- **No step repeats anywhere in the corpus.** The gate checks other cores' outputs as they land.

## Owner-approved samples (the last two sentences of a remedy)
- Earth core, Water friction, seek Earth. Today: "Sleep before you say yes to anything new. Eat one meal a day sitting down, with nothing open." After: "Finish one thing you started before you open anything new. Keep one evening a week at home with nothing planned." (Earth keeps.)
- Wood core, Earth friction, seek Wood. Today: "Eat a real meal before any decision about money. Sleep on every yes before you give it." After: "Start each week with one thing that is only for you. Say no to one request before you say yes to the next." (Wood starts.)

## What you may change
- **Only the act sentences** (`acts` in the worklist). `fixed` holds the diagnosis line and, in a remedy, the "Seek X…" line, the image and the "Let it …" line. These were just approved under M2 and stay word for word. The text is assembled as fixed + your acts.
- Keep an existing act if it already fits its element, its family is still free in your core, and it is not word for word elsewhere. Otherwise replace it.

## House limits (the gate checks them)
- 2 to 4 act sentences. The whole text is 30 to 60 words and 3 to 7 sentences.
- Each act is one imperative sentence, concrete and doable this week or this month. At most two commas per sentence. No dash, semicolon or colon.
- No "room", no "verdict", and no "X, so Y" frame (the owner rejected that frame today).
- Don't assume the reader has a child, a partner, a boss or a home of their own.
- No four-word run shared with another text in the same pair cell (definitions, mechanism, carry). The voice audit enforces this as "phrase law".
- Plain B1 to B2 English, everyday words, British spelling, no italics.

## Files
- Input: `worklist-<core>.json`, `acts.mjs`.
- Output: `out-<core>.json`:
  `[{ "pair_cell": "土_水", "advise_catalyst": { "acts": ["…", "…"] }, "advise_friction": { "acts": ["…", "…"] } }, …]`, one entry per pair cell, with acts for both texts (repeat the current ones where you keep them).
- Check with `node gate.mjs out-<core>.json` until it reports 0 failures. The gate writes `out-<core>.assembled.json` so you can read each full text. Read every one through once as the reader would.
- Use scratch file names that include your core. Don't edit any other file, and don't run git, wrangler or any deploy.

When done, reply with the family counts for your core and five before/after examples.
