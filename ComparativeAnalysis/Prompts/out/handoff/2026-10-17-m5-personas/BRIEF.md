# M5: each persona one person, each keyword one persona (owner ruling, 2026-10-17)

The owner rejected a first M5 that recast the Sage as a protector: **"The original reads more like The Sage, as the sage is the one who looks for shelters, or having shelters come to them. Shelter others is an outer behavior but the inclination is more like it also attracts shelters. The original wins."** They then approved a narrower fix after reading samples: **"M5 approved, apply the fix across all content."**

## The ten personas (stay true to these on every element and both poles)
Twin (self-reliant, keeps its own pace), Rival (races, bets, shares the risk), Artisan (makes and gives with ease, enjoys), Virtuoso (speaks up, performs, original), Horizon (sees openings, starts fast, spreads, gives in bursts), Steward (saves, keeps, finishes, plays safe, loyal), General (takes charge, clear under pressure, hard on itself, never off duty), Magistrate (keeps its word, by the book, earns its place, waits for permission), Alchemist (self-taught, tests, thinks alone, hard to reach), **Sage (drawn to shelter or shelter comes to it; it learns where it feels held. Sheltering others is its outer act and is rooted in that want)**.

## Your work (worklist.json)
1. **Renames (11).** A keyword word that two personas share stays with the persona it belongs to (see `why`). The borrowing persona gets a new keyword word and three new passages (drive, cost_self, cost_others) that fit it.
   - Where `approved_word` or `approved_drive` is given, use it exactly.
   - The new word must not be any keyword in `all_keyword_words`.
   - Write 1 to 4 words in sentence case, in the voice of the existing keywords ("Holds the yes", "Waits to be told", "Unhurried").
   - Keep the keyword's side: a catalyst keyword names a gift, a friction keyword names an overrun.
2. **Texts (2).** Rewrite only what `why` describes.

## Shape of a passage (the house)
- **Length and form:** three sentences, 30 to 45 words. At most two commas per sentence. No dash, semicolon or colon.
- **Sentence one:** opens on the behaviour in the reader's life.
- **Sentence two:** gives the reader's own need as its cause.
- **Sentence three:** the close.
- **Catalyst closes (owner M1):** the gift at work, its price stated flat, or the want under it. Never an instruction, a conditional fix or a lever.
- **Friction closes (BIZ_04 "plain cost, owned cause, open door"):** a flat cost, the want underneath, or a permission. Never "you can/could". The cost to others carries no charge (no implied deceit, no victim).
- **No "X, so Y" frame** (owner, today), anywhere in new text. Vary the joints.
- **Vocabulary:** no "room" or "verdict", no chart arithmetic, no Chinese. Use plain B1 to B2 English with British spelling.
- **No echo:** don't repeat the cell's other keyword words (`cell_keywords`) or their acts.

## Files
- Output: `out.json` = `{ "renames": [{ "cell", "pole", "i", "word", "angles": { "drive", "cost_self", "cost_others" } }], "texts": [{ "key", "text" }] }`.
- Check with `node gate.mjs out.json` until it reports 0 failures. Then read each passage against its persona and the cell's other keywords.
- Edit no other file. Run no git, wrangler or deploy.

Reply with each rename (old → new word, with the drive) and the two texts.
