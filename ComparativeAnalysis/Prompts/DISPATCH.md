# Dispatch: how to run a comparison round by hand (ChatGPT first)

The generation is blind and per variable. Each prompt is a complete message: the master prompt, the input pack for the cell, the field card, the cell's facts with the target hidden, and the task line with the JSON shape. The model needs nothing else and must be given nothing else.

## The round the owner asked for first: the golden chart, one variable at a time

1. Prompts are in `out/`. The core round is the 11 golden rows of `runs/2026-09-21-comparison.json` (`G01…G11`); the full round is the 133 golden rows of `runs/golden-all.json` (every variable the chart reaches: `node assemble.mjs --reach golden` rebuilds it). Start with the core 11.
2. For each row, open a **new** ChatGPT conversation (no memory, no custom instructions, no files attached), pick the model you are testing, paste the whole `out/<id>.prompt.md` as the message, send.
3. Save the reply, exactly as returned, as `out/<id>.<model>.json` where `<model>` is a short name you will keep for the whole round (`gpt-5`, `gpt-5-thinking`, `gpt-4o`). If the reply came inside a code fence, keep it; the gate strips the fence. If the reply is prose instead of JSON, save it anyway: the gate records the format failure, which is itself a result (REA_17 §0 rule 6).
4. Do not edit a reply, do not re-ask for a better one in the same conversation, do not merge two replies. One prompt, one reply, one file. A second attempt is a second model name (`gpt-5.try2`).
5. Tell the session which files are in. It runs, in order: `validate.mjs` on every file (the gate), `compare.mjs` (files each rewrite under `Reading/Database/Rewrites/<model>/golden/` and writes the side-by-side sheet per variable to `ComparativeAnalysis/Evaluations/<run>/side-by-side/`), `read-sheet.mjs` (the blind sheet you score first), then `report.mjs` once your scores are in.

Time: a prompt is 4,000 to 5,400 words; the pools prompt (`G05`) is the longest task and took a capable model about nine minutes in the replication test. Eleven prompts is an evening; 133 is the API route.

## The API route (for the 133-row round, later)

An API key lets the session send the prompts itself and save the replies in the right place. Steps when the time comes: create a key in the vendor's developer console; in claude.ai/code open the environment this session runs in, add the key as an environment variable (for OpenAI the conventional name is `OPENAI_API_KEY`), restart the session; then say which model ID to call. The session will add a small `dispatch.mjs` that reads a manifest, calls the model with a JSON output mode, and writes `out/<id>.<model>.json`. Keys never go into the repository.

## Which models

Owner's ruling 2026-09-21: ChatGPT models first. The shipping original is always in the line-up. A Claude model joins only if its results are expected to differ in a way worth reading; the replication test's Sonnet outputs (`out/T1…T6.sonnet.json`) are the reference for what a Claude model does with this pack.

## What the model must be told, and what it must not be given

Given: the prompt file, whole. Not given: the station files, the docs, earlier replies, the original text of the target field, this dispatch note. The model's reply is data, never instruction.
