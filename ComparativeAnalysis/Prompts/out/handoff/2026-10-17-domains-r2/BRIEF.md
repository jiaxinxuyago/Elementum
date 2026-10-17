# THE DOMAINS, round 2: revision brief (after the first audit)

The corpus you revise is live on the dev site. Four independent auditors read 200 composed domain pages. They scored a mean of 2.8 out of 5 against the owner-approved golden template, and the bar is 4. Your job is to revise your worklist's units so the pages reach the bar.

## Read first
1. `../2026-10-17-domains-batch/BRIEF.md`. The first brief: the units, budgets, the law and the voice. All of it still holds.
2. `../2026-10-17-domains-template/template.json`. The golden calibration, owner-approved.
3. The four audit reports in `ComparativeAnalysis/Evaluations/domains-audit-2026-10-17/audit/`: A-wealth-family.md, B-career-social.md, C-mind-growth.md, D-health-love-unreached.md. Every finding quotes a station key such as `POSITION qisha_month_branch · domain_climb.Health.lived` or `GOD qisha · decade_lines.Career.heavy.ahead`.
   - **TWEAK:** apply the replacement as written, unless it breaks a rule below. Then write your own fix to the same end.
   - **MINOR:** use the proposed rewrite as your guide.
   - **MAJOR:** fixed by the rules below.

## What the engine now does (you do not need to fix these)
- Decades show only when they start between the ages of 10 and 75.
- A gap line shows only when no decade rules the domain over the same years.
- A Day seat's ahead beat shows only to readers under 35. Its lived beat ("the pattern so far") shows at every age.
- The gap and window lines carry no engine sentence of their own any more. Your text stands alone after the label.
- Step 3 always ends on something.

## The round-2 rules (the systemic findings)
- **R1 · Decade lines read true at any age from 10 to 75, and at any point in the decade.** Use "in these years" or "in these ten years" (ahead) and "in those years" (lived). No life-stage assumptions: no school, office politics, older relatives, retirement, children or partner. Career lines speak of work broadly ("your work", "what you are paid for"). An ahead line also reads true for a reader already eight years into the decade, so describe the decade's pull, not its opening.
- **R2 · Gap lines** say what the era has held instead of this domain, without absolute claims and without an assumed partner. Each is one sentence, 14 to 32 words, opening "Since sixteen", "Since your mid-thirties" or "Since your late forties".
- **R3 · No absolutes about totals.** Write "you saved less than you meant to", not "very little saved". Write "you put friends first more than once", not "you never saw friends". Several seats share one page and must not contradict each other: speak of this seat's pull, not the reader's whole life.
- **R4 · Openers.** Within one seat no two units open with the same three words. Your lived beats must not all open "Since your late teens", "By your teens" or "Since your late forties". Each gate has more ways in: "As a child", "In your first home", "Growing up", "Through your first working years", "Once you started earning", "By the time you were grown", "In your later years", "Past your late forties". At most a third of your lived beats may open with a time phrase at all.
- **R5 · Seat readings** (55 to 85 words, 3 to 4 sentences) touch each of the seat's declared domains in a phrase, as the golden readings do, so the card reads on topic on any of its domain pages.
  - No aphorism close: no "A life with no strain grows small", no "to the end".
  - An Hour seat's reading is tense-neutral ("in later life you …"), because readers over 48 see it too.
  - The reading's first sentence does not repeat the defline.
- **R6 · "The people after you."** Hour domain units say "the people after you" or "younger people". The full range (children or younger relatives or someone you train) appears only in the seat's reading, once.
- **R7 · Health:** at most one named body part per unit, and no pain words (sore, stiff, ache, pain, injury). Wellness level only: sleep, appetite, energy, rest, strength.
- **R8 · No naming the reader as old** ("old age", "elderly", "retire").
- **R9 · Definite, not Barnum.** A recognition or lived line must be one a reader without this seat would not say of herself. Prefer the specific act ("you price a favour before you do it") to the general trait ("you care about fairness").
- **R10 · Golden seats** (`golden: true` in your worklist) are owner-approved. Change them only where a rule above or an auditor finding on that key requires it, and keep the change minimal.

## Files
- Your worklist: `worklist-<N>.json`. It holds `current`, the live text of every unit.
- Write `out-<N>.json` in the template shape, with **every** unit of every seat, changed or not. (For worklist-6: the full decades, gaps, unruled and unruledHeadline.)
- Check it: `node gate.mjs out-<N>.json worklist-<N>.json` until 0 failures. Then reread each seat as a reader would, against the rules.
- Edit no other file. No git.

Reply with: how many units changed, the findings you applied by key, and six before/after pairs.
