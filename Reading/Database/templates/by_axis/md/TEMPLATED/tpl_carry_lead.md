# tpl_carry_lead  ·  TEMPLATED archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> Slot-filled at runtime from derived values only (REA_03 §10 rule 3).

| | |
|---|---|
| **axis** | TEMPLATED |
| **key** | tpl_carry_lead |
| **construct** | Derived slot template (REA_03 §5; REA_02 §5h) |
| **status** | LIVE 2026-09-15 · P4 carry card lead line |
| **budget** | ≤20w |
| **sources** | REA_02 §5h · DES_04 §AM.11 P4 v3 |

## Candidate variables

| Variable | Value |
|---|---|
| `Overfueled` | {Core} runs Overfueled. {nEase} energies feed a core already full. {nSeek} are where the surplus should go. |
| `Underfueled` | {Core} runs Underfueled. {nSeek} energies are what the core is asking for. {nEase} already carry weight. |
| `Balanced` | {Core} runs Balanced. Intake and burn hold each other, so the doors below are open on both sides. |
