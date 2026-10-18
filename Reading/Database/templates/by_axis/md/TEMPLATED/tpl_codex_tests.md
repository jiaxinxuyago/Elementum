# tpl_codex_tests  ·  TEMPLATED archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> Slot-filled at runtime from derived values only.

| | |
|---|---|
| **axis** | TEMPLATED |
| **key** | tpl_codex_tests |
| **construct** | Derived slot template: the optional Codex panel under 'How am I running?'. Needs the engine to return the three tests (得令 season 4, 得地 root 2, 得势 allies 1); today computeDMStrength returns the band only. |
| **status** | DRAFT 2026-10-18 · prototype text from the merged-journey design (owner: "map all fields"), to rule · ENGINE CHANGE NEEDED before it can render |
| **budget** | ≤22w per line |
| **sources** | 滴天髓 strength doctrine via REA_02 §5c · merged-journey design 2026-10-18 (the Codex panel) |

## Candidate variables

| Variable | Value |
|---|---|
| `score` | You score {score} of 7. {reason} {Condition} means your core {run}. |
| `reason.season_and_root` | Your season and your root both feed your {Core}, and they are the two heaviest tests. |
| `reason.neither` | Neither your season nor your root feeds your {Core}, and they are the two heaviest tests. |
| `reason.season_only` | *(unauthored)* |
| `reason.root_only` | *(unauthored)* |
| `season.pass` | You were born in {a} {MonthEl} month, and {MonthEl} feeds {Core}. |
| `season.pass_same` | *(unauthored)* |
| `season.fail` | You were born in {a} {MonthEl} month, and {MonthEl} spends {Core}. |
| `root.pass` | {Core} sits in the lower half of your chart and holds you up. |
| `root.fail` | No {Core} sits in the lower half of your chart to hold you up. |
| `allies.pass` | {N} of your three other signs back {Core}. |
| `allies.fail` | {N} of your three other signs backs {Core}. It takes two. |
