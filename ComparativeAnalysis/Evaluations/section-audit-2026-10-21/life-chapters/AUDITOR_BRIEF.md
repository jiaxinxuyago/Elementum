# Auditor brief: Life Chapters section audit (2026-10-21)

You are an independent auditor of Elementum's **Life Chapters** page. Elementum is a BaZi / Five Elements personality app in English. Its readers are 18 to 35, mostly women and therapy-literate; they screenshot lines that name them and drop apps that flatter them. You read; you never edit the content.

## Read first, in order

1. `ComparativeAnalysis/Evaluations/final-audit-2026-10-17/SOP.md`: the criteria A1–A5, B, C and D1–D6, and the severity classes. Read sections 3 and 4 closely; D2 and D3 are adapted below.
2. `Reading/Database/Prompts/07_REFERENCE_BENCHMARKS.md`: the Pattern excerpts, which are the north star.
3. `Operations/Business/BIZ_04_Friction_Framing_Research.md`: plain cost, owned cause, open door.
4. `Reading/Database/Prompts/04_READING_SYSTEM_PRIMER.md` §1–3.
5. `ComparativeAnalysis/Handoffs/2026-10-19-life-chapters-content/03_RULINGS.md`: what the owner ruled for this page. Do not re-litigate a ruling; judge the text against it.

## What the page is (owner rulings L1–L10, 2026-10-21)

The page reads a life as four chapters, one per gate of the chart:
- **Early:** birth to 15, the first home.
- **Rising:** 16 to 34, work and study.
- **Home:** 35 to 47, home and a partner.
- **Late:** 48 on, "the people after you".

**Energy first.** Each chapter, each ten-year decade and each year opens on the **energy** it carries: an element (Wood, Fire, Earth, Metal, Water) and the **function** that element plays for this reader:
- **Body:** your own energy, peers.
- **Mind:** thinking, support, shelter.
- **Expression:** voice, making, appetite.
- **Action:** reach, money, practical life.
- **Order:** structure, duty, pressure.

The reader's chart either **grows** that energy (it lifts them: a gift) or **releases** it (the chart already has too much: a cost, then what carries them through).

No character names and no Chinese characters appear in the text.

**The order of a chapter:**
1. The energy line.
2. Underneath: the energy of the branch below it.
3. Where it lands: up to three domain lines, each saying what the chapter favours.
4. Working with it: the Energy Manual line, on the chapter the reader is in now only.
5. Its decades. The current decade is read in full, with "favours" pairs.
6. The years, for Advisor readers: this year and the next five, each with where it lands in the chart (a gate).

Texts are keyed by energy, not by chart. `{el}`, the element name, is filled per chart, so one text serves every chart in the same state. A page is one composed reading for one real birth chart, as an Advisor reader sees it.

## The laws in force

- **The prediction law:**
  - definite past patterns tied to a gate's ages;
  - future trajectories with ages;
  - no digits in the text;
  - no may, might, likely or perhaps;
  - hard news only with what carries the reader;
  - never illness, death, divorce, bankruptcy or sums of money.
- **Gender-neutral.** People: "someone in your first home" or an older relative at the Year Gate; "a partner" at the Day Gate; "the people after you" at the Hour Gate.
- **Statements, not instructions.** Advice is allowed here, but only as what a period favours, never as an imperative.
- **The reader is the subject of the last sentence.**
- **Periods and commas only, at most two commas a sentence.** No colon, dash or semicolon. B1–B2 British English.

## Accuracy (A1) carries the most weight

Check that each line is true to its energy, function and direction:
- A release line must not read as a gift; a grow line must not read as a burden.
- Body is the reader's own element.
- A chapter line fits its gate's life area and ages.
- A lived line is in the past; a coming line is in the future.
- An early decade line fits a child.
- A year landing fits its gate and its bond kind:
  - bind: draws closer;
  - clash: a sharp change;
  - punish: scrutiny or grinding friction;
  - harm: something sours quietly;
  - join: people and momentum gather;
  - repeat: old ground.
- No line contradicts another on the same page: the chapter vs its domain lines vs the manual vs the decades vs the years.
- No claim the chart cannot know.

The text uses Your Almanac's locked relation words ("feeds", "draws off", "holds down", "pushes back"). Never "tames".

## Adapted D criteria

- **D1, section roles:** the energy line sets the era; underneath adds the ground; domain lines say what the chapter favours in one domain; the manual says how the energy works for the reader; decades and years are their own periods. No section pre-empts or repeats another.
- **D2, energy truth:** the same function and direction reads as the same force wherever it appears (in a chapter, a decade or a year), and the five functions read as five different forces.
- **D3, pole coherence:** the grow and release versions of one function agree on what the force is and differ only in whether the chart wants it.

## Pages

Pages are in `ComparativeAnalysis/Evaluations/section-audit-2026-10-21/life-chapters/pages/`. Each section carries its station key in brackets, for example `[ENERGY action · chapter.month.grow.now]` or `[TEMPLATED tpl_almanac · land.year.clash.day]`; quote it in every finding. Each page ends with a mechanical compound check.

The same text can recur on many pages, because it is keyed by energy. File a finding once, with its key, and list the pages.

## Output

Write one markdown file (the path is given in your task) with:

1. **Scores.** A table, one row per page: page id (L001…) · A1 · A2 · A3 · A4 · A5 · B · C · D (one combined 1–5 for D1–D6) · a one-line verdict.
2. **Findings.** A table, one row per finding: id (yours, e.g. G1-012) · severity (MAJOR / MINOR / TWEAK) · criterion · page id(s) · station key · the quoted words · what is wrong, in one plain sentence · the fix.
   - **TWEAK:** the fix is the exact replacement text for the whole unit, with `{el}` kept where the unit has it. It must be unambiguous: a grammar slip, a broken idiom, a factual or tense slip, a word clash. It must not change the meaning or register. Keep the unit's opening, its budget and the laws above.
   - **MINOR:** a proposed rewrite of the whole unit.
   - **MAJOR:** a proposed rule or rebuild, with the evidence (how many units or pages, and which).
3. **Systemic patterns.** The 3 to 6 patterns you see across many pages, each with a count and two examples; say for each whether it is MAJOR.
4. **The best and the worst.** The three best lines and the three weakest on your pages, quoted, with one line each on why.

Do not edit any file but your report. Do not commit. Final message: the counts by severity, the mean B score and the path of your report.
