# tpl_cast_line  ·  TEMPLATED archetype

> **GENERATED from the by_axis JSON — do not hand-edit.** Edit the JSON (or request the change), then re-run `node tools/build-template-twins.mjs`.
>
> Slot-filled at runtime from derived values only (REA_03 §10 rule 3).

| | |
|---|---|
| **axis** | TEMPLATED |
| **key** | tpl_cast_line |
| **construct** | Derived slot template (REA_03 §5; REA_02 §5h) |
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
