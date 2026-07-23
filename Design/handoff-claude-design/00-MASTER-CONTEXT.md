# Elementum — Master Context for Claude Design

**Purpose of this document.** Load this ONCE at the start of every Claude Design
session. It tells you what Elementum is, the exact design language, the
information architecture, the current state of each screen, and the global
consistency rules every per-page brief inherits. Then run ONE focused per-page
brief at a time (see `/briefs`).

> **⚠ v2.1 RECONCILIATION (2026-06-24 · see `Documents/Reading/REA_08_Reading_V2.1_Reconciliation_Audit.md`).** IA-map update: the reading drills **element → FACES prologue → persona reading** (Faces = a prologue inside the reading, 1–2 persona cards by calculation, each with abstract + punchline + keywords + **ruling domain**). The reading is **persona-scoped**, read at a **presence-frame** depth. Insert a Faces route between `app-reading`/`app-energy` and the persona reading; add the ruling-domain line to the IA map. **Positional axis (宫位, B6):** also add a *separate* per-pillar reading surface (年/月/日支-夫妻宫/时 × Ten God) to the IA map, reusing persona content framed by palace.

> **How Claude Design consumes this:** the canvas is sandboxed — no web fetch,
> no filesystem, no raster painting. You cannot open the live app. You work from
> the **uploaded PNGs** in `/screens` (the current screens, "copy these") plus
> the **uploaded ink-wash reference images** (for art direction), and you output
> **HTML mockups**. Keep each deliverable bounded (one screen / one journey) with
> the quantifiable acceptance criteria each brief lists.

---

## 0. SCOPE — consistency + polish ONLY (this is NOT a redesign)

**This engagement aligns inconsistent screens and refines craft. It does NOT
redesign anything.** The app's layouts, structure, content, components,
navigation, and IA are settled — keep them. Your job is to make screens that have
drifted apart obey the *existing* patterns, and to tighten finish (spacing,
hierarchy, alignment, type rhythm, state coverage). Nothing more.

**IN scope**
- Bring outlier screens into line with the established patterns in §2 / §4-KEEP / §5
  (header, card system, spacing scale, eyebrow+title, tier/lock treatment).
- Polish: tighten spacing/hierarchy/alignment, fix visual inconsistencies, unify
  the *already-existing* shared components so every screen reads as one family.
- Fill genuinely MISSING states (empty / loading / locked) using the existing
  visual language — not new inventions.

**OUT of scope — do NOT**
- Introduce new layouts, new IA/navigation, new component systems, or re-flow a
  screen that already works. Preserve each screen's existing structure + content.
- Rename/remove/add features, rewrite copy beyond labels, or invent new concepts.
- Reinvent the visual language — palette/type/motifs in §2 are fixed.

**Rule of thumb:** if a change would make a screen **unrecognizable** from its
`/screens` capture, it's out of scope. Same bones — better consistency and finish.

---

## 1. What Elementum is

A contemplative BaZi (Chinese astrology / Four Pillars) reading app delivered as
an installable PWA. From a birth date/time/place it computes the user's
**Five Energies** (Wood, Fire, Earth, Metal, Water) and **Day Master**, then
presents personalized readings. The brand voice is calm, literary, and precise —
**not** mystical-kitsch. Think a quiet museum placard, not a fortune-teller's
tent.

**The product surfaces (5 tabs):**
- **Today** — the day/month/year/decade temporal readings.
- **Guidance** — a hub of 5 features (Elemental Draw, Energy Manual, Self-Report,
  AI Consultant, BaZi Codex).
- **Reading** (center) — the Five-Energies catalogue (dominance wheel + shelf),
  drilling into per-energy cards, the Day Master card, and the 八字 Pillar Chart.
- **Compatibility ("Friends")** — compare two people's energies.
- **Profile** — birth data, notifications, plan.

**Tiers:** Free → Seeker → Advisor. Locked features show a tier chip + an upgrade
gate. (Mockups should show both locked and unlocked states where relevant.)

---

## 2. Design language (canonical — do not drift)

The authoritative tokens live in `tokens.css` (also in `/screens` references).
Key values:

**Palette (silk/ink/bronze + 5 element pigments)**
- Paper: `--cream #F8F6F0`, `--silk #F1E9D6`, `--silkDeep #ECE2C9`, `--paperHair #CDBE9E`
- Ink: `--ink #2B2722`, `--inkSoft #4A433B`, `--inkLight #857D72`, `--inkMist #B8AFA1`
- Bronze/accent: `--bronze #8b7355`, `--bronzeDark #6B5339`, `--gold #D4AF37`
- Advisor accent (premium): `#7a5e9a`
- Element pigments (each has base + deep):
  - Wood `#7A9E6E`/`#587A4D` · Fire `#C4745A`/`#9E5540` · Earth `#B89A6A`/`#927750`
  - Metal `#8BA3B8`/`#6A849A` · Water `#5A7FA8`/`#3E5F85`
- Seal red `#A04030`

**Type**
- Body: **EB Garamond** (400/500)
- Display / titles: **Cormorant Garamond** (400/500/600)
- Architectural caps / ceremony: **Cinzel**
- Data / numerals / codes: **JetBrains Mono**
- Chinese glyphs: **Noto Serif SC / TC**, brush accents **Ma Shan Zheng**
- **NO ITALICS anywhere** (locked rule DES_04 §AM.10). Use weight/letterspacing for emphasis.

**Texture & motifs**
- Ink-wash (shuǐmò) painterly backgrounds, low-opacity, behind a quiet cream
  center zone. Use the **uploaded reference images** for the brush/landscape feel
  — do not invent flat vector "mystical" art.
- Eyebrow labels: 10px, letter-spacing ~2.5px, uppercase, bronze. Often paired
  with a 2-character Chinese gloss, e.g. `GUIDANCE · 引 路`.
- Cards: cream "cardstock" (`rgba(248,241,225,0.92)`), 1px `--paperHair` border,
  12–16px radius, soft shadow `0 8px 18px rgba(60,46,28,.07)`.
- Tab bar: frosted (backdrop-blur), **icons only, no labels** (locked rule §AM.2).

---

## 3. Information architecture & navigation map

Hash routes (`#/<name>`). The 5 tabs + their drill-downs:

```
welcome → step1..7 (+4a/6a/7a) → loading → reveal ──swipe──▶ app-reading
                                                              (catalogue)
Tab bar (persistent, icons-only):
  ┌ Today      app-today ─▶ app-day · app-month · app-year · app-decade
  ┌ Guidance   app-guidance ─▶ app-draw · app-manual · app-selfreport
  │                            · app-consultant · app-codex
  ┌ Reading    app-reading ─▶ app-energy (swipe carousel ×5)
  │                          ─▶ app-daymaster ─▶ app-pillars ─▶ chart-resonance
  ┌ Compat     app-compat  (intro → input → result; Free teaser vs Seeker full)
  └ Profile    app-profile ─▶ chart-resonance · birth chart · edit · upgrade
```

Stacked detail pages (energy card, day master, pillars, resonance) render
**without** the tab bar — they push over it like a page stack with a back
affordance.

---

## 4. Current state — what to KEEP vs what to ALIGN & POLISH

A mobile-QA pass just landed (June 2026). The following are now **correct and
must be preserved** as the consistency baseline:

**KEEP (the consistency baseline):**
- **Header pattern:** every tab landing uses a left-aligned **eyebrow + title**
  at a **54px top inset** (e.g. `GUIDANCE · 引 路` / "Guidance"). Compatibility
  was just brought into this pattern. Detail pages use a **back-chevron + eyebrow**
  row at the same inset.
- **No mock status bar** on device (the OS draws the real one).
- **Scroll:** every page scrolls with native momentum and clears the tab bar; no
  bottom clipping at 360×640 / 375×667 / 390×844.
- **Motion:** wheel pickers and the energy-card carousel use real physics
  (inertia + snap). The reveal→catalogue is a one-way animated swipe.
- **No "white flash"** on navigation (eager core screens, image preload, frosted
  tab bar on a stable layer).

**ALIGN & POLISH (the scope — bring outliers to the baseline, don't redesign):**
1. **Layout-structure consistency** — make every screen reuse the *same existing*
   card system, section rhythm, spacing scale, hero/banner treatment, and
   header pattern, so they read as one family. Align the drifted screens to the
   ones that already follow the pattern; don't re-lay-out the ones that work.
2. **State coverage + journey integrity** — ensure each feature's existing
   entry → action → result states are all present and styled consistently; fill
   any missing empty/loading/locked state in the existing language. Confirm every
   navigation path resolves to a real screen (flag dead links / "Coming soon").
3. **Feature pages specifically** (Guidance suite, Compatibility, Profile) — these
   drifted most and are the priority for the alignment pass. See per-page briefs.

Known thin/placeholder areas to be aware of (don't treat as finished design):
- Pillar Chart pattern copy is templated filler.
- Some art is low-fidelity placeholder (Today/Guidance/Friends/Profile plates) —
  polish the *layout* around it; final painted art lands separately.

---

## 5. Global consistency rules (every per-page brief inherits these)

1. **Header:** left eyebrow (`EN · 中文`, 10px/2.5ls/uppercase/bronze) + Cormorant
   title, 54px top inset. Detail/stacked pages: back-chevron + eyebrow.
2. **Spacing scale:** 4 / 8 / 12 / 16 / 22 (page gutter) / 24 px. Cards 12–16 radius.
3. **One card system:** cream cardstock, `--paperHair` border, soft shadow; a
   single "feature tile", "list row", and "section card" component reused everywhere.
4. **States are mandatory:** every feature defines **empty / loading / result /
   locked(+upgrade)** states. Don't show only the happy path.
5. **Tier gating:** locked = lock glyph in the icon tile + tier chip (Seeker bronze,
   Advisor `#7a5e9a`); the unlock CTA opens the upgrade modal.
6. **Element color = meaning,** never decoration. Use a pigment only when it maps
   to a real element in the user's chart.
7. **Motion vocabulary:** ease `cubic-bezier(0.22,1,0.36,1)`; page-stack pages push
   in from the right over a back affordance; cards/heroes fade+rise on enter.
8. **No italics. Icons-only tab bar. No mock status bar.**
9. **Accessibility:** honor reduced-motion; 44px min tap targets; sr-only labels
   pairing English with decorative Chinese glyphs.

---

## 6. How to run an alignment & polish session (workflow)

1. Upload `current-screens.html` (the EXACT screens to replicate) + the relevant
   `/screens/*.png` (visual reference) + the ink-wash reference images.
2. Paste this `00-MASTER-CONTEXT.md`.
3. Paste ONE per-page brief from `/briefs`.
4. Claude Design returns HTML mockup(s) for that screen/journey meeting the
   brief's acceptance criteria (path counts / sniff tests).
5. Review against the criteria; iterate that one screen before moving on.
6. Approved mockups → handed back to engineering (Claude Code) to implement
   against the live React app, preserving the §4 KEEP baseline.

Keep each deliverable to ~one screen or one journey per session for depth and
consistency.
