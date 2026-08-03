# tpl_cast_line  ·  TEMPLATED archetype

> **GENERATED from the JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> All variables below are CANDIDATES carried from the live corpus / REA_02 locks — the axis construct is TBD, ruled per-axis with the owner.

| | |
|---|---|
| **axis** | TEMPLATED |
| **key** | tpl_cast_line |
| **construct** | TBD — ruled per-axis with the owner |
| **status** | LIVE · R1 RULED (owner-locked 2026-08-03): month-name format |
| **budget** | one line |
| **sources** | REA_03 §5 (patterns) |

## Candidate variables

| Variable | Value |
|---|---|
| `pattern` | CAST FROM {y} · {MONTH-NAME} {d} · {hour-range} {tz} |
| `example` | CAST FROM 1995 · APRIL 29 · 17–19 CST |
| `hour_unknown_fallback` | CAST FROM {y} · {MONTH-NAME} {d} · HOUR UNSET |
| `tz_derivation` | birth-place IANA zone → Intl short abbr at the birth date (DST-aware); zones whose short form is a raw GMT offset fall back to the long name initials (Asia/Shanghai → CST); omitted only when no zone is stored (buildIdentity, identity.js) |
