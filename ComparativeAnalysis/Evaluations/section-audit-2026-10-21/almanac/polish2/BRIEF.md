# BRIEF · Your Almanac, polish round two (owner AP1–AP5 A, 2026-11-14)

You are a sealed writer for Elementum's **Your Almanac** (the Today tab). Read, in order:
1. The original writers' brief `/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-21-almanac-template/BRIEF.md`. It explains what the Almanac is, plus the gates, functions, budgets and voice laws, all still in force.
2. `../polish/BRIEF.md`, the round-one rules AM1–AM4, still in force. Its "pages these lines sit on" section shows how the lines meet on a page.
3. This brief.
4. Your `worklist-N.json` here.

Each item has the unit's current text (`now`) and the re-auditors' findings, with their proposed fixes. Use a proposal where it is right, but every unit must meet the rules below. Write `out-N.json` here and run `node gate.mjs out-N.json` until it passes. Touch nothing else and run no git.

## The five rules (owner, 2026-11-14)

**AP1 · The energy line ends on a full verb; only the landing asks.**
- The energy line's second sentence has a finite main verb and ends on it or its object. Never a trailing participle clause such as ", asking you to…", ", leaving you…", ", boxing you in by noon" or ", making you…".
- An energy line, an echo and a headline never use "ask", "asks" or "asking". The landing (and a star, void, pillar or marker line, which stand in the landing's place) may use "ask" at most once.
- The reader is still in the last sentence, as "you" or "your".
- Before: "Useful work turns up today, asking you to pick the tasks worth your effort."
- After (shape only): "Useful work turns up today, and you choose which tasks get your effort."
  - That sentence still breaks AM4 (", and you"). Write it as "Useful work turns up today. You choose which tasks get your effort."

**AP2 · No one cost formula.**
- A landing's second sentence never opens on a gerund ("Defending it takes…", "Clearing it costs…", "Giving it up costs…").
- Vary the shape across the set. It can be:
  - a plain subject ("The evening you set aside goes to it.");
  - a time or place opener ("By evening…", "At home…");
  - "You" as subject ("You lose the evening you had set aside.");
  - a short consequence ("That costs you an evening.").
- In one worklist, no more than three landings may share a second-sentence shape, and no two may share their first two words.
- A hard bond (clash, punish, harm, repeat) names its cost plainly.

**AP3 · Say what the energy adds, never what the reader already has.**
- A shared line cannot know what a chart holds. Never "an energy you already hold", "a discipline you already keep", "a talent you have shown before", "work you already do well", or any "already".
- Grow lines say what the energy adds or strengthens: "more of an energy that serves your chart", "a support your chart welcomes".

**AP4 · The soft lines meet AM1 too.**
- The grow, need and even energy lines, and the bind and frame landings and headlines, say what arrives and what it asks or costs. They never settle the outcome.
- Banned closes include "a calmer house", "the weeks look after you", "ease returns", "holds firm", "goes faster", "comes together easily", "others start to count on you" and "trouble passes you lightly". A star line names what the day brings and a cost or a condition.

**AP5 · Back-to-back months read differently.**
- Stems pair yang then yin, so a month often shares its element and function with the month before.
- Each `ENERGY <fn> · month.<state>` gets a yin-month variant, `….b`, in worklist 2.
- The variant says the same thing as its base in new wording:
  - a different second-sentence opener;
  - no shared phrase of three words or more beyond the required opener "{el} brings X this month" / "for a whole month";
  - its own image.
- Rewrite each base too, so the pair is written together.

## Also in force

- Every finding in your worklist, where it is right. Where a proposal itself breaks a rule above, fix the unit your way and add `"note"` saying why.
- **No word twice on one page.** "reach" is spent by the Action headline ("widens your reach"), so don't use reach or reaches in a ground or energy line. Avoid the headline's verb in the line under it. Headline halves are in `TEMPLATED tpl_almanac · head.*`, which you can read in the station `/home/user/Elementum/Reading/Database/templates/by_axis/json/TEMPLATED/tpl_almanac.json` (read only).
- **Budgets and bans** as in the gate. Energy is 16–32 words in two sentences and opens "{el} brings <Function>, …" (Body: "{el} brings more Body, …"). Month lines open "{el} brings X this month" or "{el} brings X for a whole month". Year lines open "{el} brings X for a whole year".
- **Unchanged units:** if a unit has no finding and breaks no rule, return its text unchanged.

## Output

`out-N.json`: `{ "units": [ { "kind": "…", "key": "<exactly as in the worklist>", "text": "…" } ] }`, with every key of your worklist, in order (worklist 2 includes the new `.b` keys). The final message gives the gate's last line, how many units changed, and any notes.
