# Auditor brief · Your Almanac · section audit 2026-10-21

You are an independent auditor of **Your Almanac**, the Today tab of Elementum (a BaZi / Five Elements app; English; readers 18 to 35, mostly women, therapy-literate, who screenshot lines that name them and drop apps that flatter them). You read; you never edit content.

Read first, in order:
1. `ComparativeAnalysis/Evaluations/final-audit-2026-10-17/SOP.md` §3 and §4 (criteria A1–A5, B, C, D, severities).
2. `Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md` (The Pattern excerpts: the north star).
3. `Operations/Business/BIZ_04_Friction_Framing_Research.md`.
4. `Reading/Database/Prompts/04_READING_SYSTEM_PRIMER.md` §1–§3.
5. This brief, then `STATE.md` here, then your pages.

## What the Almanac is (owner rulings, rounds 1–4)

Each Day, Month and Year page reads **energy first**: the period's element and the job it does for this reader (Body = their own element, Mind = what feeds them, Expression = what they give out, Action = what they work on, Order = what works on them), and whether the reader grows it (↑) or releases it (↓). Then the ground underneath (the branch's element), then **where it lands** (an engine clause naming a gate, then a written line), then the domains with **favours pairs** ("A over B"), the only place advice is allowed (ruling D1 B). Headlines are two halves joined by ", and ". A reminder's title is the headline, its body the REMINDER line.

The gates: Year Gate = first home, the family you grew up in; Month Gate = work; Day Gate = home and partner; Hour Gate = the people after you and plans for later. Bond kinds: clash (shaken), punish (grinds, an old friction returns), harm (wears thin), bind (draws closer), frame (gathers strength), repeat (goes over old ground).

Each page's title gives the reader's Day Master, condition (Overfueled, Balanced, Underfueled) and pillars; each section's sub-line gives the element, function, grow/release, state and lift. Use them to check A1.

## A1 accuracy, specifically

- The function is right for the Day Master: for a Metal Day Master, Wood = Action, Fire = Order, Earth = Mind, Water = Expression, Metal = Body (and so on round the cycle: what the Day Master controls is Action, what controls it is Order, what feeds it is Mind, what it feeds is Expression).
- Grow/release fits the condition: an Overfueled reader grows Expression, Action and Order and releases Body and Mind; Underfueled the reverse; the text must not call a released energy welcome or a grown one a burden.
- The ground line's relation is right (Wood feeds Fire, Fire feeds Earth, Earth feeds Metal, Metal feeds Water, Water feeds Wood; Wood shapes Earth, Earth shapes Water, Water shapes Fire, Fire shapes Metal, Metal shapes Wood). The locked relation words are "feeds · shapes"; never "tames".
- The landing line fits its gate and its bond kind, and does not claim more than a twelve-day cycle can know (no named person, no sum, no illness, no fate).
- Cite the classical source where you can (三命通会 for the branch bonds, 子平真诠 for the ten gods, 渊海子平).
- The calculator finding in STATE.md is known; do not re-file it.

## House limits (a replacement must keep them)

- Energy line: 16–32 words, two sentences, opens "{Element} brings <Function>, …".
- Landing line: 16–38 words, two sentences. Echo: one sentence. Star or marker line: 12–30 words.
- Headline half: 2–7 words, lower case after the element. Reminder: one short sentence plus "Read your day." (or month or year).
- Favours pair: two noun phrases of at most five words each.
- At most two commas a sentence; no colon, semicolon or dash; no may, might, likely, perhaps, could; the reader in the last sentence; B1–B2 English, British spelling; no assumed partner, child, parent, boss or job beyond what the gate names (the Day Gate may name a partner).
- Chart invariance: one unit is shared by every chart with the same key, so a fix must hold for all of them.

## Scope

Audit the Almanac's own units: keys starting `ENERGY`, `TEMPLATED tpl_almanac`, `GOD … · favours`, `STAR … · day`, `PUSH`. The Year page's main energy line and landing come from Life Chapters (L9 A) and the "THE YEAR IN …" lines from Domains: read them for context and contradictions, but file findings on them under **For other sections**. The engine clause ("The day's Metal wears at the Earth in your Year Gate…") is code: file a finding if it is inaccurate or reads badly, key it `ENGINE clause`.

## Output

One markdown file (path in your task):
1. **Scores**: one row per page: page id · A1 · A2 · A3 · A4 · A5 · B · C · D · one-line verdict.
2. **Findings**: one row per finding: id · severity (MAJOR / MINOR / TWEAK) · criterion · page id(s) · station key · quoted words · what is wrong · the fix. A TWEAK's fix is the exact replacement for the whole unit, unambiguous (a slip, a broken idiom, a repeated word with an obvious swap, a factual slip) and keeping the meaning; a MINOR's fix is a proposed rewrite of the whole unit; a MAJOR's fix is a rule or rebuild, with the count and examples.
3. **Systemic patterns**: 3–6, each with a count and two examples, MAJOR or not.
4. **For other sections**: findings on Life Chapters or Domains lines.
5. **The best and the worst**: three best lines, three weakest, quoted.

Do not edit any file but your report. Do not commit. Final message: the counts by severity, the mean B, the report's path.
