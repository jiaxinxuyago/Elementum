# REA_09 — Reading-Format Audit — evidence base for the reading-schema redesign

> **Formerly DES_10** — moved to the Reading library in the 2026-07-23 design/reading doc separation (registry: DevLog_Docs/README.md).

Generated 2026-07-24 by `Elementum_App/tools/reading-format-audit.mjs` (read-only).
Source: `STEM_CARD_DATA` (all 10 stems) walked against `ARCHETYPE_SCHEMA`.

Read **OVER/UNDER** rows as "the authored voice disagrees with the budget" — input for setting
the NEW budgets, not as defects to trim.

| Field | Budget (current schema) | Actual words min/med/max | Stems over | Stems under | Notes |
|---|---|---|---|---|---|
| `chips` | len=5 · item≤3w | items: 1/1/4 | 癸 | — | len 5 |
| `identity.elementIntro.expand` | 16–20w | 20/21/22 | 甲 乙 丁 戊 己 辛 癸 | — | — |
| `identity.elementIntro.punch` | 9–12w | 9/13/14 | 甲 丙 丁 戊 己 辛 壬 | — | — |

Total walker violations across 10 stems: **15**

## Full field inventory (current budgets)

| Field | Type | Required | Budget |
|---|---|---|---|
| `blocks` | object[] | ✓ | len 5–11 |
| `chips` | string[] | ✓ | len=5 · item≤3w |
| `gifts` | object[] | ✓ | len=3 |
| `identity.archetypeLabel` | string | ✓ | ≤6w |
| `identity.archetypeName` | string | ✓ | ≤3w |
| `identity.elementIntro.expand` | string | ✓ | 16–20w |
| `identity.elementIntro.punch` | string | ✓ | 9–12w |
| `identity.identityIcon` | ComponentKey | ✓ | — |
| `identity.manifesto` | string | ✓ | ≤14w · split " · " |
| `manual.catalyst` | string | ✓ | — |
| `manual.concentrated` | string | ✓ | — |
| `manual.open` | string | ✓ | — |
| `manual.resistance` | string | ✓ | — |
| `shadows` | object[] | ✓ | len=3 |
| `subtitle` | string | ✓ | split " · " |
| `yourNature.desc` | string | ✓ | ≥2 sent |
| `yourNature.phrase` | string | — | ≤4w |
