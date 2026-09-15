# Handoff — 2026-09-15 · Session "P4 quintessence and the door-tagged pools"

Written from a cloud session (claude.ai/code) for cross-machine continuation. Supersedes the
2026-09-11 handoff for workstream state; standing laws there still hold unless amended below.
Head commit at writing: see `git log -1` (this handoff ships in the same commit as the work).

## New standing laws (owner-ruled 2026-09-14/15, REA_02 §5h)

- **The quintessence law:** the Day Master says what the material CAN do; the chart says what it
  DOES. P4 = mechanism claims that hold on every chart of the stem; the energies say tempo, volume
  and channel; cures live ONLY in the manual's SEEK/EASE rows and are echoed on P4.
- **Door-tagged pools ×7 + ×7:** every STEM gift/shadow carries `door` (the §5f function it is
  exercised through). Gifts show through the catalysts, shadows through the frictions (the friction
  face = the function OVERGROWN, §4b law; underuse costs are the carry card's SEEK rows). Band tags
  RETIRED to `__ore`. Five thin-self items retired to ore.
- **All five energies on P4:** the carry card (lead line · five-energy track with the manual's
  arrows · one EASE row + one SEEK row assembled from `ELEMENT_PAIR.carry` micro-lines in the
  manual's order, with the chosen trait chips) replaces the dm-handoff sentence.
- **Abundant catalyst (option 1):** keeps its catalyst role; spoken through `carry.wide` on P4.
- **`read-elemental` RETIRED:** aliased to the journey's core energy page (`JourneyStage openCore`);
  `ElementalNatureDetail.jsx` deleted; its stem-axis blocks stay Codex ore.
- **Audit corrections on record (REA_02 §5h):** 土多金埋 belongs to 辛 (庚 = 郁滞, 阳明遇金); 比劫夺财 is
  a strong-body pattern (TG_PATTERN business); 官杀旺 = the inner judge only on 身弱. The locked 金_土
  friction turn ("comfort begins to bury what it formed") is worth one owner look under the 郁滞
  reading — not changed.

## What shipped this session

- Docs: REA_02 §5h + §5c abundant-catalyst note · REA_16 §2c rows (STEM.gifts/shadows door-tagged,
  STEM.door_note, ELEMENT_PAIR.carry) + §6 log · REA_03 rows (pools, carry, tpl_carry_* ×4) ·
  DES_04 §AM.11 "P4 v3 = quintessence + the carry card".
- Station: STEM ×10 pools rewritten (143 items: 81 carried, 3 tightened, 11 re-phrased, 48 new, 5 to
  ore; old band pools under `__ore.retired_band_pools`) · ELEMENT_PAIR.carry ×25 (+ wide ×20) ·
  TEMPLATED tpl_carry_lead / tpl_carry_row / tpl_pool_bridge / tpl_pool_note; tpl_dm_prescription → ore.
  Twins + pivot regenerated.
- Code: `selectPoolByDoor` (resolveVariant.js) · `poolDoors` / `doorMarkFor` / `buildCarryModel`
  (journeyData.js) · ReadingDayMasterScreen builds the journey model so P4 and the manual share one
  truth · ReadingDayMasterCard v3 (door marks, bridges, pool note, carry card) · reading.css `.dm-*`
  · archetypeSchema TaggedPoolItem `door` · export tool registers the four tpl cells.
- Review pages (owner-ruled surfaces, private artifacts): the P4 mock v3.1 and the ten-stem remap v3
  (audited against 滴天髓/三命通会/渊海子平 + project canon + personality psychology).

## Gates at head

voice-audit clean (46 rows) · station↔code sync clean (240 files) · eslint 0 errors / 57-warning
baseline · build green · journey sweep 18/18.

## Pending / parked

- Owner look at the locked 金_土 friction turn under the 郁滞 reading (see above).
- Balanced charts: P4 falls back to pool order ×3+×3 under the balanced bridges (ruled default);
  no balanced exemplar verified visually yet.
- A third per-element state for abundant catalysts (would touch the manual rows) — later pass.
- ~~Add the 渊海子平 五行生克宜忌 lines to REA_04~~ — DONE 2026-09-15 (REA_04 PART 2, v1.3).
- Design-HTML sync debt (catalogue + element page + P4) still deferred until layout is called settled.
- **DEV / STAGING SITE = https://dev.elementum.life (owner 2026-09-15, STANDARD WORKFLOW):** the
  `dev` branch deploys a VITE_DEVTOOLS=1 build to the `elementum-dev` Worker
  (`.github/workflows/deploy-dev.yml`, `wrangler.jsonc` env.dev, custom domain attached in the
  dashboard, workers.dev URL retired, noindex). It carries the DevBar + the QA hooks. The road for
  every app change, from any machine: gates → push `dev` → test on dev.elementum.life (two reloads)
  → push the SAME commit to `main` → confirm on elementum.life. Doc-only commits go to `main` direct.
  **Officialized (owner, same day): cloud session tests on dev.elementum.life; local session
  tests on localhost (`npm run dev`); the deliverable is ALWAYS elementum.life.** Public-address set
  is closed (INF_01 §10.0): both app workers.dev URLs retired, all five Workers `preview_urls:false`
  (satellites take effect on their next manual deploy or via the dashboard Preview toggle), GitHub
  Pages (jiaxinxuyago.github.io/Elementum, a copy of the raw `main` tree) RETIRED — owner switches
  it off at Settings → Pages → Source: None. Record of truth: INF_01 §10 (+ DEV_03 K5, app README).
  Gate = `src/devtools.js` IS_DEV_TOOLS (vite dev OR the flag); the prod build never sets it. Still
  open: Cloudflare Access in front of dev.elementum.life.
- Cloud-session note: the journey sweep needs `QA_BASE=http://localhost:<port>/` and a symlink from
  playwright's pinned headless-shell path to `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Pointers

- Doc roots unchanged (REA_01–06, REA_16; DES_04 §AMENDMENT; Operations/README.md).
- Station: `Reading/Database/templates/by_axis/json/STEM/*.json` (gifts/shadows with `door`),
  `ELEMENT_PAIR/*.json` (`carry`), `TEMPLATED/tpl_carry_*.json`.
- The remap ledger that produced the pools (per-item door, fate, seed line, audit notes) is the
  "Ten Stems, Remapped" artifact; its data is mirrored in the station cells' `__ore` and the docs.
