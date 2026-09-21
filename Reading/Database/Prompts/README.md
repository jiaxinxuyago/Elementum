# Reading/Database/Prompts — the prompts, as data

Prompts are tools, iterated and reused like code and data (owner 2026-09-21). This folder is the single source of every generation prompt; `Reading/Documents/REA_17_Generation_Prompt_Pack.md` is the overview that points here. The harness (`ComparativeAnalysis/Prompts/`) reads these files verbatim; nothing in a prompt lives anywhere else.

| File | What it is |
|---|---|
| `00_MASTER_PROMPT.md` | the one block every generation prompt opens with: voice, audience, what may not be invented, the vocabulary and syntax laws, person by surface, the Angle Map, the repetition and derivation laws, the phrase law, the audit list |
| `01_INPUT_PACK.md` | what is handed over per axis, all from the station or the engine (one calculation model) |
| `02_RULES_REGISTER.md` | every rule, numbered, with its source document and how it is enforced (harness gate, station audit, or the read); the six implied rules surfaced 2026-09-21 |
| `03_COMPARISON_PROTOCOL.md` | how a like-for-like comparison run is fixed, gated, read, filed and reported |
| `fields/<AXIS>/<field>.md` | one card per authored field (36 files): surface, register, person, budget, construct, reasoning chain, style, checks, exemplar, sources, harness key, iteration log |
| `fields/_CARD_FORMAT.md` | the card format |

Assembly rule (REA_16 §3, REA_17 §0): PROMPT = `00_MASTER_PROMPT.md` + the axis pack from `01_INPUT_PACK.md` filled from the station with the target redacted + the field card + the task line the harness writes. `node ComparativeAnalysis/Prompts/assemble.mjs <FIELD> <CELL> --print` shows the assembled prompt for any cell.

Editing rules:
- Edit the prompt file, not REA_17, not the harness. Log the change in the file's iteration log with the ruling it comes from.
- A prompt never invents a rule. Every rule cites the ruling it compiles (REA_01 to REA_06, REA_16, the station cells). Where a prompt and a source document disagree, the source wins and the prompt is corrected.
- The station is the truth for every value. A card describes how a value is made and checked, never the value.
