# Round 2: the shared pair-cell texts (owner rulings, 2026-10-17)

You write for one **core** of Elementum, a BaZi reading app: its five pair cells (one per energy). The owner approved these round-2 fixes and wants **"the audit and fixes until there is ZERO major items and only a few minor items left"**.

## 1 · R2-1: THE ADVICE on a Balanced chart (new field `advise_balanced`, five per core)
A Balanced chart's pages (verdict "Keep the mix.") showed the catalyst advice, which opens by saying the energy runs short. Write `advise_balanced` for each cell.
- **The opening (one sentence, new):** a keep-the-mix diagnosis. It names the balance and what keeps it level. Never a shortage.
- **Then 2 or 3 acts.** They keep the mix, drawn on the energy's element (Wood begins and grows, Fire shows and warms, Earth keeps and tends, Metal cuts and sorts, Water rests and takes in). You may reuse this cell's catalyst acts where they fit.
- **Whole text:** 30 to 60 words.
- **Approved samples (round-2 results page):**
  - 火_火: "Your strength holds while what you put back keeps pace with what you spend." followed by the catalyst's acts.
  - 木_火: "Your light reaches people when it counts, and it stays bright while you keep letting work out." followed by two acts.

## 2 · R2-1: the Balanced definition (`definition_balanced`)
Rewrite its tail (from "In balance, …") only where it claims a trait that one persona's catalyst keywords deny. Owner-approved sample (金_木): "Each venture gets finished and pays its way." becomes "Your hunger and your stamina keep the same pace." The tail claims a pace, not a trait. Check it against **both** personas' catalyst keywords (in `personas`). Otherwise keep the tail as it is.

## 3 · R2-5: each act once per reader, by meaning
A reader sees five pages, so each core has three **reader sets**: weak, strong and Balanced. `sets` in each cell says which advice text belongs to which set. Within a set, each act family **by meaning** appears once. The families are: learn (class, course, skill), finish, tell or share, a fixed weekly or daily slot, plant, cut or drop, choose, attend, give, ask, rest and train (see `acts.mjs`; choose, give and ask may appear twice). The round-1 M6 families (sleep, eat, sit, read and so on) stay at once per core.
- Swap the acts that repeat. Change as few acts as needed. Keep the M6 element rule: catalyst and balanced acts draw on the cell's energy, remedy acts on the element it seeks.
- Approved sample: 火_水 remedy "Start one project of your own this month." becomes "Begin one thing this month that is only yours, and keep it off every list."

## 4 · Notes on the shared texts (R2-4 and the Minor findings)
Fix what each field's `notes` flag. A partner, child, boss, promotion or household gets neutral words. Use the auditor's note as a guide, not as text to paste. **Never change a field with no notes**, apart from the acts in section 3.
- The diagnosis and remedy lines (`fixed`) change only where that field has notes.
- The remedy's "Seek X …" sentence never changes.
- A shared definition tail (catalyst or friction) changes only where it has notes.

## Settled by the owner (never change these)
- Restatement stays.
- The comparative middle frame stays.
- No "X, so Y" in anything new.
- The Sage is drawn to shelter.
- The three system items stay as they are (the Mind bar names, the Virtuoso's domains, the bar labels).

## House rules (the gate checks them)
- Advice is 30 to 60 words, 3 to 7 sentences, 2 to 4 acts. Definitions are 30 to 50 words, 3 to 4 sentences.
- At most two commas per sentence. No dash, semicolon or colon. No "room", "verdict", "ahead of" or "sooner than".
- No act sentence word for word in another cell or core (the gate checks the other cores' outputs as they land).
- Plain B1 to B2 English, British spelling.

## Files
- Input: `worklist-<core>.json`, `acts.mjs`.
- Output: `out-<core>.json`, one entry per cell: `{ "pair_cell", "advise_catalyst": { "text" }, "advise_friction": { "text" }, "advise_balanced": { "text" }, "definition_balanced": { "tail" }, "definition_catalyst"?: { "tail" }, "definition_friction"?: { "tail" } }`. Give the full texts, including unchanged ones.
- Check with `node gate.mjs out-<core>.json` until it reports 0 failures. Re-run it just before you finish, because other cores land meanwhile. Read the five Balanced pages' advice as a Balanced reader would.
- Use scratch file names that include your core. Edit no other file. No git, no deploy.

Reply with: the five balanced advices, the acts you swapped (before → after), and any notes you fixed.
