# Round 3 · F3-01: no friction page of only losses (owner rule of 2026-10-16, now applied to the page as it is shown)

**The owner's ruling (2026-10-16):** "No shown page of only losses." At least one shown friction passage closes on the **want underneath** or a **permission**. That close sits on a drive or a cost-to-you slot, so the cost-to-others closes keep the cost.

**What changed:** a single-persona friction page now shows three passages: ledger[0].drive, ledger[1].cost_self and ledger[2].cost_others (the `shown` list in each cell). The round-3 audit found pages where all three close on a loss.

For each of the 50 cells in `worklist.json`:
- If the drive close or the cost_self close is already a want or a permission, write `{ "cell", "decision": "already", "which": "drive" | "cost_self" }`.
  - **Want examples:** "You were only ever chasing the feeling of being awake."; "you meant to keep out the hurt and never the people near you".
  - **Permission examples:** "You are allowed to owe someone a piece of the load."; "it is yours to give"; "You need no one's permission to stop being the student."
- Otherwise rewrite **only the last sentence** of one of them (whichever reads better as a want or a permission), and keep the first two sentences: `{ "cell", "decision": "rewrite", "which": "drive" | "cost_self", "kind": "want" | "permission", "close": "<the new last sentence>" }`.

## Rules
- **Want:** the reader's own need under the habit, owned, with no charge. **Permission:** a release ("You are allowed to …", "… is enough", "… is yours to …").
- **Never** a capacity close ("you can/could"), an instruction, or "X, so Y". No "room", "verdict", "ahead of" or "sooner than". At most one reminder phrase (remember, keep in mind, notice…) among the three shown closes.
- **Length:** the passage stays 30 to 45 words. Plain B1 to B2 English, British spelling. Stay true to the persona: the Sage is drawn to shelter.
- Don't repeat a word the passage's first two sentences already use, unless there is no plain alternative.

## Files
- Output: `out.json`, one entry per cell.
- Check with `node gate.mjs out.json` until it reports 0 failures, then read each rewritten passage whole.
- Edit nothing else. No git, no deploy.

Reply with the counts (already / rewritten by kind) and six before/after closes.
