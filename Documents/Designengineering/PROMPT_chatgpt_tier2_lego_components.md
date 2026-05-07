# Tier 2 — Lego Component Library

**Prerequisite:** Tier 1 (`mood-foundation.html`) is shipped and approved. The brush vocabulary, palette, and surface taxonomy are now visual law. Tier 2 stops exploring and starts cataloguing reusable building blocks.

**Audience:** ChatGPT, continuing from the same project (project knowledge already loaded: `DOC_HANDOFF_CONTEXT_TRANSFER.md`, DOC5 §AMENDMENT, tokens.css, icons.svg, all `Design/Legends/*.html`, master plan `PROMPT_chatgpt_design_resource_pool.md`).

**Recommendation:** open this in a NEW conversation in the SAME ChatGPT project. The project memory carries the constraints; a fresh thread keeps Tier 2's context from drowning in Tier 1's iteration noise.

---

## §0 — What Tier 2 is

A single, self-contained HTML file that catalogs every reusable text/visual building block in the system, each rendered in a default state plus 1–2 state variants.

This is the "Lego box." Claude Code or any future tool snaps these blocks into screens (Tier 3 is the first such use). Anything that appears as a recurring element in DOC5 / the legends / `manifest.md` lands here.

**Deliverable:** `Design/Library/component-library.html` — ≥2000 lines.

---

## §1 — Hard rules (binding)

These come straight from DOC5 §AMENDMENT and are NOT negotiable in Tier 2:

1. **Italic v2 (§AM.10):** ONLY sub-headline (Cormorant 19/500/inkSoft) + microcopy chip (≤11.5 italic). No italic eyebrows, body, archetype titles, or descriptive paragraphs.
2. **Pigment alpha ladder (§3.5.A):** ONLY `10 / 1A / 40 / CC / 100`. Any other alpha = drift-log entry.
3. **Border-radius scale (§3.5.B):** ONLY `1, 10, 12, 16, 22, 999`.
4. **Spacing scale (§3.5.C):** ONLY `1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56`.
5. **5 surfaces only (§3.5.D / §AM.6, §AM.7):** cream-cardstock · tinted · quiet · elevated · cardstock-active. Do not invent a sixth.
6. **4 fonts only:** Cormorant Garamond · EB Garamond · Cinzel · Noto Serif SC.
7. **Tab nav is icons-only (§AM.2).** No text labels under nav icons.
8. **IA (§AM.1):** Reveal → Reading-catalogue → Energy Map (informs which components belong; no flat-dashboard widgets).
9. **All icons must use `<svg><use href="/icons.svg#id"/></svg>` pattern** referencing the canonical icon library. Don't inline new icon paths — if you need a new icon, log it in §C7 drift and we add it in Tier 5.

If any block tempts you to break a rule, log the temptation in §C7 — don't ship the violation.

---

## §2 — Required sections

Each section renders every variant side-by-side with a small caption strip naming the component, its DOC5 reference (if any), and intended use. Section headings are EB Garamond 10/caps/tracked (`var(--ink-soft)`); the components themselves render at intended scale, NOT scaled-down.

### §C1 — Text blocks (8–12 compositions)

Typography building blocks — the recipes that legends compose into screens.

Required:
1. **Eyebrow + Title + Body** (the canonical card-content recipe — see legend-primitives.html)
2. **Headline + Sub-headline pair** (Cinzel 24 caps + Cormorant italic 19/500 — proves the §AM.10 italic location)
3. **Quote block** (Cormorant 22 regular, optical kerning, with attribution at EB Garamond 11 italic)
4. **Data callout** (number at Cinzel 36, label at EB Garamond 10 caps)
5. **Two-column reading flow** (EB Garamond 14 body, 1.5 line-height, 36px column gap)
6. **Long-form paragraph with embedded sub-heading** (sub-heading mid-flow, no italic on body)
7. **List with custom bullet** (use a small SVG mark from icons.svg; left rail bullet column)
8. **Stem-name + element label** (Noto Serif SC large hanzi + EB Garamond romanization beneath)
9. **Eyebrow chip + Title + microcopy chip** (shows the only legal italic pair: sub-headline OR microcopy)
10. **Empty-state text block** (sub-headline italic explanation + cream-cardstock surface)

Stretch (if quota allows): tabular numerals demo, drop-cap opener, oblique pull-quote.

### §C2 — Buttons (5 variants × 3 states = 15)

Each in default · hover · disabled. Hover = small shadow lift + 2% darker fill; disabled = 40% opacity, no shadow.

| Variant | Description | Reference |
|---|---|---|
| Primary (ink pill) | `bg: ink`, `color: paper`, radius 999, padding 12/22 | DOC5 §3.5.E.4 |
| Secondary (cream pill) | `bg: cream-cardstock`, `color: ink`, hairline border `ink-soft 40%` | legend-primitives §B2 |
| Tertiary (italic dashed-link) | inline italic Cormorant 14, dashed underline at 0.5 offset | DOC5 §AM.10 (sub-headline italic legal here) |
| Ghost | transparent fill, `color: ink-soft`, label EB Garamond 12 caps tracked | new — log in §C7 |
| CTA-with-shadow | radius 22, drop shadow `0 6 16 ink/12%`, gold outline at 1px (cardstock-active styling) | DOC5 §AM.7 |

Show each button at button height = 44 (the only legal touch target in the spacing scale).

### §C3 — Cards (≥8 archetypes)

Use v6/v7 archetypes as base. Each card renders at its intended size from the legend.

1. **Element tile** (legend-v6 §card-archetypes — element pigment tinted surface, glyph mark + name)
2. **Section hero** (legend-v6 — pillar tile pattern; full-width with painted ridge background)
3. **Modal hero** (legend-patterns §C5 — 16:9 painterly hero crop + scrollable body region)
4. **Compact strip** (legend-screens §dashboard — single-line card with leading icon + title + chevron)
5. **Locked card** (lock chip overlay; cream-cardstock surface dimmed to 70%)
6. **Featured card** (cardstock-active, gold rim, no shadow — Today decade pattern)
7. **Daily snippet** (small portrait card with eyebrow date + 2-line body + microcopy footer)
8. **Empty placeholder** (quiet surface, single italic sub-headline centered, no chrome)

Stretch: compatibility-pair card, archetype roster card.

### §C4 — Thumbnails (6–8)

Mini hero crops for navigation/list affordances.

1. **Square 88×88** with element pigment tint
2. **Wide 240×120** with overlay gradient (paper at top fading to ink/40% at bottom)
3. **Tall 88×140** with mountain ridge silhouette (uses Tier 1 atmospheric-depth crop)
4. **Square with overlay caption** (caption at EB Garamond 10 caps tracked, paper color)
5. **Wide with element-pigment tint** (Metal pigment 1A wash + bone-line border)
6. **Square locked** (lock chip in top-right corner; mute filter at 60%)

Stretch: hexagon hexagram thumbnail, decade-pillar timeline mark thumbnail.

### §C5 — Form controls (5 components)

1. **Text input** — 4 states: empty · focus (gold rim) · filled · error (seal pigment 1A border + EB Garamond 11 italic helper line)
2. **Toggle** — off · on (ink fill) · disabled
3. **Radio group** — 3 options shown, one selected (ink dot in cream ring)
4. **Segmented control** — 3 segments, middle selected (cream-cardstock active over ink-soft track)
5. **Search bar** — placeholder · active · with-results (ico-search icon from icons.svg as leading affordance)

### §C6 — Chrome elements (5 components)

1. **Eyebrow chip** — EB Garamond 10 caps tracked, 6px vertical padding, no border
2. **Status badge** — small pill with element-pigment 40% bg + matching pigment 100% label (Earth, Fire, Water, Wood, Metal versions)
3. **Tag pill** — neutral cream-cardstock with hairline border, EB Garamond 11 regular
4. **Lock chip** — ico-lock from icons.svg + "Locked" microcopy italic 11
5. **Tier badge** — gold rim, Cinzel 10 caps tracked, used on featured-card archetype

### §C7 — Drift log

A list of any new primitive you had to introduce that isn't in tokens.css / icons.svg / legend rules. Ideal state: empty. If non-empty, each entry is:
```
[component name] — needed [primitive] because [reason]; proposed addition to [file].
```

These become Tier 5 input or DOC5 §AMENDMENT patches.

---

## §3 — Acceptance criteria

Tier 2 is approved when:

1. Single self-contained HTML, opens in any browser, no build step
2. Header comment block at top: tier · purpose · composed-from sources (`tokens.css`, `icons.svg`, `legend-primitives.html`, `legend-v6-card-archetypes.html`)
3. All 6 component sections (§C1–§C6) render every required variant
4. Every italic on the page is either Cormorant 19/500 sub-headline OR EB Garamond ≤11.5 microcopy chip — sniff test by running through the file looking for `font-style: italic` and confirming each
5. Every `border-radius` value is from `{1, 10, 12, 16, 22, 999}` — no `8`, `14`, `20`
6. Every spacing value is from the legal scale — no `7`, `9`, `15`
7. Every icon usage references `icons.svg` (no raw inline icon paths)
8. §C7 drift log present (empty is best)
9. Total file ≥2000 lines

After review, I'll either approve and unlock Tier 3 or send refinement notes.

---

## §4 — Reference anchors (read these before starting)

- `Design/assets/Moodboards/mood-foundation.html` — Tier 1 deliverable; the typography rhythm + surface looks shown there are the visual baseline
- `Design/Legends/legend-primitives.html` — v1; canonical color, type, surfaces, primitives
- `Design/Legends/legend-patterns.html` — v2; modals, forms, onboarding patterns
- `Design/Legends/legend-v4-polish.html` — refined DM ink-wash icons (visual treatment for icon contexts)
- `Design/Legends/legend-v6-card-archetypes.html` — element/pillar tile + section hero (card archetype reference)
- `Design/Legends/legend-v7-ink-wash.html` — most current visual fidelity benchmark
- `Documents/Designengineering/DOC5_App_Design.md` §3.5.A–E + §AMENDMENT — locked rules

---

## §5 — Out of scope

Don't build in Tier 2:
- Page-level compositions (those are Tier 3)
- Painted backgrounds / hero images (those are Tier 4 PNG via DALL-E)
- New iconography (that's Tier 5)
- Modals or screens with full content (Tier 3)

If you find yourself drawn into composition work, stop and log it as a Tier 3 prompt note.

---

## §6 — Confirm before building

Before generating the HTML, confirm:
1. You can render at least 2000 lines in one HTML file without truncation
2. You will check every italic against §AM.10 and every radius against the scale
3. You'll keep §C7 drift log honest — no silent invention
4. You'll use `<use href="/icons.svg#id"/>` for icons (assume the file is served at site root)

After confirmation, generate the full Tier 2 file in one shot. If output is too large for one message, split at section boundaries (§C1 stop · §C2 continue) so the file stitches cleanly.
