# BRIEF · Your Almanac, the polish round (owner AM1–AM4 A, AN1 A, 2026-11-14)

You are a sealed writer for Elementum's **Your Almanac** (the Today tab). The section was audited (`../REPORT.md`, `../audit/*.md`); the owner ruled four rules. You rewrite one worklist under them. Read this brief, then the original writers' brief `/home/user/Elementum/ComparativeAnalysis/Prompts/out/handoff/2026-10-21-almanac-template/BRIEF.md` (what the Almanac is, the gates, the functions, the budgets and the voice laws, all still in force), then your `worklist-N.json`. Each item carries the unit's current text (`now`) and the auditors' findings on it, with their proposals: use them where they are right, but every unit must meet the rules below. Write `out-N.json` here; run `node gate.mjs out-N.json` until it passes. Touch nothing else.

## The four rules (owner, 2026-11-14)

**AM1 · Say what the reader meets and what it costs, never how it ends.** A landing line, an echo and an energy line describe the period: what arrives, where, and what it asks of the reader. They never settle it in the reader's favour or predict the outcome. No "you adjust faster than the people around you", no "you settle it by evening", no "trust returns by the month's end", no "you pass the test", no "you choose well". A hard bond (clash, punish, harm, repeat) names its cost plainly. Advice still belongs only in favours pairs.
- Before: "A plan at home changes at short notice, with a partner or the people you live with. You adjust faster than the people around you."
- After (shape, not a model text): "A plan at home changes at short notice, with a partner or the people you live with. The day asks you to give up the version you had settled on."

**AM2 · "Short of", never a rank.** A shared line cannot know which energy a reader needs most. Never "most", "shortest", "least", "lacks most", "the energy you need most". Say "an energy your chart runs short of", "one your chart wants".

**AM3 · The direction, never the amount.** A released energy is not always plentiful in the chart; the reader's condition makes it unwanted. Never "too much of", "already has plenty", "in excess", "full of", "crowded with", "overuse". Say "more than your chart can use", "an energy your chart does better without", "one that weighs on you".

**AM4 · No ", and you" joint; no "you feel".** Vary how sentences join: a full stop, "while", "as", "though", a clause that opens on the place or the time. Never ", and you"; never "you feel". The reader still appears in the last sentence (the gate checks "you" or "your"). Across one worklist no two units may share the same second-sentence opener.

## The pages these lines sit on

A Day page shows, in order: the headline; the energy line; the ground line (fixed, written separately); the engine clause ("The day's Wood strikes the Metal in your Hour Gate, the seat of the people after you."); the landing line; sometimes the echo; favours pairs. So an energy line and a landing line meet on every page: neither should open the same way as the other, and the landing line never repeats the engine clause.

## Budgets (unchanged)

energy 16–32 words, two sentences, opens "{el} brings <Function>, …" (Body: "{el} brings more Body, …"); land 16–38 words, two sentences; echo one sentence, 10–25 words, true for every kind that triggers it (clash, punish, harm or repeat) so it names no single kind; mark, pillar, star 12–30 words; void 12–30; favours "Lean|over", each phrase at most five words; head.energy 2–6 words starting "{el}"; head.land 2–7 words, lower case; push 4–14 words ending "Read your day." (or month, year).

## Output

`out-N.json`: `{ "units": [ { "kind": "<as in the worklist>", "key": "<exactly as in the worklist>", "text": "…" } ] }`, every key of your worklist, in order. Final message: the gate's last line and how many units changed.
