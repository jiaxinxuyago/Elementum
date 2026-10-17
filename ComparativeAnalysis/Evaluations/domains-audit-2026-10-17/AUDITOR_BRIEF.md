# Auditor brief · THE DOMAINS · 2026-10-17

You are an independent auditor of Elementum's domain pages. Elementum is a BaZi / Five Elements personality app in English. Its readers are 18 to 35, mostly women, therapy-literate. They screenshot lines that name them and drop apps that flatter them. You read. You never edit the content.

## What a domain page is

Each of eight life domains (Wealth, Family, Career, Social, Mind, Growth, Health, Love) gets a page per chart. The app composes it from the seats that rule that domain (one of ten characters in one of four gates):
- **Year Gate:** birth to 15.
- **Month Gate:** 16 to 34.
- **Day Gate:** 35 to 47, the self and the partner.
- **Hour Gate:** 48 on, the people after you.

The page also draws on the ten-year decades whose character rules the domain. It climbs three steps, and the owner wants the reader to feel a different thing at each one:
1. **How you are:** "Hmm, it really knows me." The behaviour pattern, present tense.
2. **What has already happened:** "Wow, how did it know that? It is accurate!" Definite past patterns tied to an age span.
3. **What is coming:** "Wow, is that really going to happen to me?" The trajectory, with ages and decades, and the strongest or heaviest window.

Last come the seat cards: each seat's defline and reading.

## The owner's laws for this surface (do not flag what they allow)
- Definite claims about the reader's past patterns are the point here: the usual "no biography" rule is lifted on these pages. A single dated event, a place or a named person is still not allowed.
- A Day Gate seat may name "a partner". An Hour Gate seat names "the people after you" with a range (children, younger relatives, someone you train).
- Hard news is allowed when tied to a gate or a decade, and the beat names what carries the reader through. Never illness, death, divorce or sums of money.
- No advice anywhere on the page.
- Ages and years appear only in the labels the engine prints.
- Each seat's text is shared by every chart holding that seat. A line that leans on a different seat the reader may not have is a finding.

## Read first
1. `ComparativeAnalysis/Handoffs/2026-10-17-domains/03_RULINGS.md` (the rulings and how a page is composed).
2. `ComparativeAnalysis/Prompts/out/handoff/2026-10-17-domains-template/template.json`. These are the owner-approved golden pages: the bar.
3. `Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md` (The Pattern excerpts, the north star).
4. `Operations/Business/BIZ_04_Friction_Framing_Research.md` (plain cost, owned cause, open door).

Then your pages. Each section carries its station key in brackets, for example `[POSITION qisha_month_branch · domain_climb.Health.lived]` or `[GOD qisha · decade_lines.Career.heavy.ahead]`. Quote the key in every finding.

## Judge, page by page, as a demanding editor and as the reader
- **C1 · The climb.** Does step 1 land as recognition, step 2 as "how did it know", and step 3 as a credible, specific future? Is any step flat, generic or Barnum, so true of anyone?
- **C2 · Coherence.** Do the beats read as one life story in time order, without contradicting each other (one seat says careful, the next says reckless, with no tension named)? Does the decade line fit its helping or heavy pole?
- **C3 · Accuracy to the chart logic.** Does each line fit its character, its gate's era, and stem (in plain view) versus branch (inside)? Does any line lean on another seat?
- **C4 · Definiteness and safety.** Is it definite without fatalism, and does it break the safety law?
- **C5 · Voice.**
  - The reader is the subject.
  - Plain B1 to B2 English, British spelling.
  - No advice, no imagery, no aphorisms.
  - No repeated phrase or opener across the page.
  - The last sentence of each unit is the one the reader keeps.
- **B · Overall:** 1 to 5, against the golden template (5 = as good as or better than it).

## Output

Write one markdown file (path given in your task) with:
1. **Scores.** One row per page: page id · C1 · C2 · C3 · C4 · C5 · B · one-line verdict.
2. **Findings.** One row per finding: id · severity (MAJOR / MINOR / TWEAK) · criterion · page id(s) · station key · the quoted words · what is wrong in one plain sentence · the fix.
   - **TWEAK:** the fix is the exact full replacement text for that unit, inside its budget. The budgets:
     - headline: 3 to 12 words;
     - recognition: 30 to 65 words, 2 to 3 sentences;
     - lived and ahead: 2 sentences, 22 to 50 / 20 to 55 words;
     - decade: 18 to 45 words;
     - gap: 1 sentence, 14 to 32 words;
     - reading: 55 to 85 words, 3 to 4 sentences;
     - defline: 10 to 25 words.
   - **MINOR:** a proposed full rewrite.
   - **MAJOR:** a proposed rule, with counts and examples.
3. **Systemic patterns** (3 to 6), each with a count and two examples.
4. **The three best lines and the three weakest**, quoted, with one line each on why.

Do not edit any file but your report. Do not commit. Final message: the counts by severity, the mean B, and your report's path.
