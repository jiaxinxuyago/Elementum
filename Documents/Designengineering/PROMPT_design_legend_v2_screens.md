# Prompt — Elementum Design Legend v2 (Screens & Patterns)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend-v2-screens.html`
**Goal:** Extend the v1 primitives legend with the *assemblies* — form controls, navigation, modals, screen templates, status states — that the v1 brief deliberately scoped out. Together with v1, this becomes the complete design system reference.

The v1 legend (`Design/legend-primitives.html`) is now an authoritative input — v2 must compose from v1 atoms, never invent new primitives.

---

## How to use this prompt

Open the same Claude design canvas project as v1. Attach the inputs in §1, paste §2 (the prompt body) as the message, and reference the canvas HTMLs already in the project at the bottom of the prompt.

---

## §1 — Required inputs (attach all)

**Local files (upload to the conversation):**

1. `D:\Elementum\Elementum_Project\Documents\Designengineering\DOC5_App_Design.md`
   → Read §3.5 (locked primitives), §5 (screen flow + tab nav route map), §6 (Welcome), §7 (Onboarding), §8 (Loading), §9 (Reveal + chart-reveal page), §11 (Energy Map + bottom tab nav subsection at line 1105), §15 (shared components), §21 (upgrade flow / paywall modals), §22 (error states).

2. `D:\Elementum\Elementum_Project\Design\northstar-anchor.html`
   → Visual DNA — every computed style canonical.

3. `D:\Elementum\Elementum_Project\Design\legend-primitives.html` — **NEW**
   → The v1 primitives legend. v2 must compose from this — every component you render, every color you use, every spacing value you pick, traces back to v1 §1–§10. If you need a primitive that's not in v1, stop and flag it in v2's drift log.

**In this canvas project (reference by filename):**

4. `Elementum - Pre-Dashboard Flow.html` — onboarding/welcome/loading flow reference
5. `Reading Pages - V1 Prototype.html` — Energy Map reference
6. `Elementum - Visual Directions v2.html` — Ink & Pigment direction (ambient context only — superseded by anchor where they conflict)

## Authority

When DOC5 + anchor + v1 legend disagree, **the anchor wins.** When v1 legend and DOC5 disagree, **anchor wins.** When canvas references disagree with anchor, **anchor wins.** v2 inherits this hierarchy unchanged.

## Hard constraint — composition only, no invention

v2 must be **assemblies of v1 primitives.** Every:
- color → from v1 §1
- font/size → from v1 §2
- eyebrow → from v1 §3
- radius → from v1 §4
- spacing → from v1 §5
- card surface → from v1 §6
- component → from v1 §7

If you find a screen pattern that needs a new primitive, **flag it as a doc-patch trigger in v2's drift log** — do not invent it. The point of v2 is to prove the v1 vocabulary is sufficient (or surface the gaps explicitly).

## Aesthetic direction (same as v1)

Silk paper / ink / bronze. EB Garamond + Cormorant Garamond + Cinzel + Noto Serif SC. Eyebrows in the §3 locked format. Document layout (no phone frame). Self-contained HTML, fonts via Google Fonts CDN, no build step.

## Output

A single file: `elementum-design-legend-v2-screens.html`

---

## §2 — Legend sections (deliver in this order)

For each section, render at least one **visual sample** + the **token/value annotation** + a **rule citation** (DOC5 §X or v1 legend §Y). Where appropriate, render the component **on a phone-frame mock** (390×844, ratio preserved) so the screen-level rhythm is legible — but the legend itself remains a desktop document.

### §1. Welcome screen hero

The Welcome screen is the user's first impression. Document:
- **Wordmark:** `ELEMENTUM` — Cinzel 22 / weight 500 / `letterSpacing: 10` / `INK` — anchor parity
- **Tagline:** "Your elemental energy, read from the moment you were born." — EB Garamond italic 17 / `INK_SOFT`
- **Primary CTA:** "Discover Yours →" — solid ink pill (v1 §7 CTA, Cinzel 12, ls 4)
- **Secondary affordance:** "Already mapped? Sign in" — cream pill, italic, with `bronzeDark` "Sign in" word
- **Hero composition rules:** wordmark vertically anchored at `bottom: 240`, CTA at `bottom: 80`, no masthead glyph (Reveal mark is withheld per DOC5 §6)
- **Background:** painted PNG (`/assets/backgrounds/bg-reveal-04-mist-veil.png`), full-frame, no parallax

Source: DOC5 §6, `Elementum_App/src/components/onboarding/WelcomeScreen.jsx`, anchor lines 32–51 (welcome stagger animations)

### §2. Onboarding system (7 steps)

Document the assembly that runs the onboarding flow:

- **Step counter:** "Step 3 of 7" — EB Garamond 14 / `inkLight` / italic
- **Progress indicator:** dot row + active fill (current step in `bronze`, completed in `bronzeLight`, upcoming in `paperHair`)
- **Step title:** Cormorant 32 / 500 / `ink` — DOC5 §3 type scale
- **Step prompt:** EB Garamond italic 16 / `inkSoft`
- **Form input states:** default / focus (`borderFocus #8b7355`) / filled / error (`seal #A04030`)
- **Form input types:**
  - Text input (single-line)
  - Date input (year/month/day, three-column or native picker)
  - Time input (hour/minute, with the **three-mode toggle**: Exact / Window / Unknown — DOC5 §7)
  - Location input (autocomplete typeahead, with city/region selection chip)
  - Single-select chips (gender)
  - Multi-line textarea (if applicable)
- **Helper text:** EB Garamond italic 12.5 / `inkSoft` below input
- **Inline validation message:** italic 11.5 / `seal` for errors, `woodDeep` for confirmations
- **Skip / back nav:** "← Back" at top-left (EB Garamond 13, `inkLight`); "Skip for now →" at bottom (italic 12.5, `inkLight`, dashed underline)
- **Continue CTA:** disabled until valid; uses v1 §7 CTA pill in disabled state (opacity 0.4, no shadow)

Show **one full sample step** rendered at phone-frame size (e.g. Step 4: Birth Time with the Exact/Window/Unknown toggle).

Source: DOC5 §7, `Elementum_App/src/components/onboarding/OnboardingShell.jsx`

### §3. Loading screen visual spec

Document the static visual anatomy (animation timings live in DOC5 §4):

- **Five element marks** in a row (Wood / Fire / Earth / Metal / Water in their pigments) — Noto Serif SC 18, the pulse animation cycles each in turn
- **"Calculating your chart…"** — Cormorant italic 22 / `INK` / ls 0.4
- **Sub-line:** "Five pillars gather. Eight characters align. / Your signature takes form." — EB Garamond italic 13.5 / `INK_LIGHT` / line-height 1.65
- **Five element dots** (10px, radius 999) — fill L→R with element colors as the calculation progresses
- **Spinner rule:** 40×1px gradient line (`linear-gradient(90deg, transparent, INK_LIGHT, transparent)`) at opacity 0.5
- **Background:** same `bg-reveal-04-mist-veil.png` as Welcome (continuity)

Show one rendered frame.

Source: DOC5 §8, `Elementum_App/src/components/LoadingScreen.jsx`

### §4. Bottom tab navigation

Document the dashboard chrome:

- **Container:** `position: fixed`, `bottom: 0`, `width: 100%`, `background: rgba(253,253,252,0.85)`, `backdrop-filter: blur(12px)`, `border-top: 1px solid #EAE5DF`, `padding-bottom: env(safe-area-inset-bottom)`, `padding-top: 8px`, `padding-horizontal: 16px`
- **Five tabs** in a row: Today / Guidance / **Energy Map (center, with seal indicator)** / Friends / Profile
- **Each tab button:** `width: 64px`, column flex, gap 4, padding `8px 0`
- **Tab states:**
  - Default: icon + label in `inkLight`
  - Active: icon + label in `ink`, with the seal indicator dot beneath (active only on Energy Map center tab? confirm in canvas reference)
  - Pressed: subtle scale 0.96
- **Icons:** Lucide — Calendar, BookOpen, BarChart2 (or the seal SVG), Users, User. Stroke 1.7
- **Labels:** EB Garamond 11 / 500 / ls 2 / uppercase
- **Bar height:** 76px (per DOC5 §11 schematic in v1 legend §11)
- **First-appearance moment:** the tab bar materialises only on `/dashboard/*` — Welcome / Onboarding / Loading / Reveal / Chart-Reveal render without it (DOC5 §5)

Show the bar in three states: cold (Today active) / warm (Energy Map active with seal) / pressed.

Source: DOC5 §5 (route map), §11 (visual spec at line 1105)

### §5. Modal taxonomy

Three modal patterns:

- **Bottom sheet** (Friends compatibility result, etc.) — slides up from bottom, covers ~80% screen, `borderRadius: 22px 22px 0 0` on top corners (use v1 §4 radius), `backdrop: rgba(0,0,0,0.4)`, drag handle (40×4 rounded pill in `paperHair` at top)
- **Full-page modal** (Chart-Reveal at `/chart-reveal`) — pushes as full page, status bar visible, "← Back" at top-left, no overlay
- **Upgrade modal / paywall sheet** (DOC5 §21) — covers ~85% screen, slides up, `×` in top-right, two-tier card layout (Seeker vs Advisor), context header reminding what was being accessed

For each modal:
- Container surface, border, shadow
- Backdrop alpha
- Dismiss affordances (drag handle, ×, back chevron)
- Entrance/exit (animation values from DOC5 §4 — note them, don't animate)

Source: DOC5 §9 (chart-reveal), §21 (upgrade flow)

### §6. Form control library

Beyond the CTA pill (v1 §7):

- **Buttons:**
  - Primary CTA pill (v1 §7) — already locked
  - Secondary CTA: cream-cardstock surface, ink text, Cinzel 12 / ls 4 / uppercase, radius 999, `paperHair` border
  - Tertiary text button: italic EB Garamond 13 / `bronzeDark`, underline on hover (dashed for affordance per v1 §9)
  - Ghost button: transparent, `inkLight` text, no border
- **Text input:** `paperHair` 1px border, radius 12, padding `12px 14px`, EB Garamond 16 / `ink` value, italic 12.5 / `inkLight` placeholder
- **Text input states:** default / focus (`borderFocus`, 2px) / filled (no change from default) / error (`seal` border + helper text in seal italic)
- **Toggle switch:** 44×26 pill, `paperHair` border off-state, `bronze` fill on-state, knob 22×22 white with `0 1px 3px rgba(0,0,0,0.15)` shadow
- **Radio (selected list):** dot in 18×18 circle, ink fill on select
- **Checkbox:** 18×18 square radius 4 (out of v1 scale — flag in drift log if used; consider radius 1 alt)
- **Segmented control:** the Exact / Window / Unknown style — 1-row pill group, active segment in `ink` bg / `silk` text, inactive in `paperHair` bg / `inkSoft` text, radius 999

Source: DOC5 §7 form patterns; canvas references for visual nuance

### §7. Status & feedback patterns

- **Toast (transient):** bottom-anchored pill, 56px from bottom (above tab bar), cream-cardstock + `paperHair`, EB Garamond 13 / italic / `inkSoft`, slide-up entrance, 3s auto-dismiss
- **Inline error:** italic 11.5 / `seal`, with small alert glyph, sits below the input
- **Inline success:** italic 11.5 / `woodDeep`, with check glyph
- **Banner (persistent):** full-width strip in `parchment` bg + `paperHair` border, EB Garamond 13.5, optional × dismiss
- **Empty state:** italic copy in `inkLight` + the relevant element glyph in `inkMist` at low opacity (e.g. "No chapters yet" with the 水 glyph faded)

Source: DOC5 §22 (error states)

### §8. Day pillar / chart-reveal page

The full 八字 chart visualization (route `/chart-reveal`):

- **4 pillars × 2 characters layout** — Year / Month / Day / Hour columns
- **Each pillar:** stem character (Noto Serif SC 32) above branch character (32) with the pillar label (Cinzel 11 / ls 4 / `bronzeDark`) on top
- **Day-master highlight:** the Day pillar gets `dmBorder #584A3E` 1px solid border + `vellum` background — this is the only place dmBorder appears (per v1 §9)
- **Hour-pillar special case:** if user gave window or unknown hour, the Hour pillar is rendered in `paperHair` border + `inkLight` text + an italic "approximate" tag below
- **10 stems table** (optional secondary panel): all 10 天干 with their elements, the user's stems highlighted

Show one full chart.

Source: DOC5 §9 chart-reveal subsection

### §9. Empty / lock state library

Beyond the lock-strip from v1 §7:

- **Locked feature card:** v1 quiet-secondary surface + lock icon + "Unlock with Seeker" italic copy + a tier badge (the `◆ Seeker` chip — 9.5px / ls 1.8 / uppercase / `bronzeDark`)
- **Blurred preview card:** content visible but `filter: blur(4px)` + a "Preview only" overlay strip
- **Continue link:** "Continue where you left off →" — EB Garamond 14 / `inkLight` / italic, dashed underline (v1 §9 affordance)
- **No-data row:** italic copy in `inkLight` centered + a faded element glyph above

Source: DOC5 §11 (locked state pattern), §21 (upgrade contexts)

### §10. Day-master highlight in situ

Render the `dmBorder` token applied to a Day pillar specifically — show what it actually looks like with stem + branch + label. The token swatch in v1 §9 doesn't show this; v2 fills that gap.

### §11. Iconography system

Catalogue every icon used across the app:

- **Element marks** (already in v1 §7): Metal / Wood / Fire / Earth / Water — the inline SVG symbols
- **Force role icons** (Primary / Secondary / Catalyst / Resistance) — small caps glyph or geometric mark, 18×18, stroke 1.7
- **Tab icons** (Lucide): Calendar, BookOpen, BarChart2, Users, User
- **Affordance icons:** chevron right `›`, chevron left `‹`, arrow right `→`, arrow up `↑`, arrow down `↓`, dismiss `×`, lock, info `ⓘ`, alert `⚠`, check `✓`
- **Stroke convention:** all icons 1.7px stroke, `currentColor`, round line caps & joins
- **Sizes used:** 14, 16, 18, 22 (per v1 spacing scale subset)

Render a 6×N grid of all icons with their token name underneath.

### §12. Type pairing recipes

Show the **stacked compositions** that recur across the app — primitives composed:

- **Eyebrow → Title → Body → Caption** (e.g. card content)
- **Eyebrow → Force → Sentence** (force row stacked vertically)
- **Wordmark → Tagline → CTA** (Welcome hero)
- **Eyebrow → Big number → Italic descriptor** (data card — e.g. "50% — Concentrated")
- **Section title → Description → Card grid** (Energy Map sections)

For each recipe: render once with sample content, annotate the spacing between rows, cite the source page.

### §13. App chrome / page header

Document the dashboard page header pattern (used across Today / Energy Map / Guidance / Friends / Profile):

- **"‹ ENERGY MAP" pattern** — chevron + tracked-caps eyebrow, EB Garamond 11 / 500 / ls 2.5 / uppercase
- **Right-side action:** italic EB Garamond 13 / `inkLight` / dashed underline (e.g. "Birth chart →")
- **Header height:** 56 from top (clears 44px status bar + 12 gap)
- **Status bar:** 44px translucent strip at top, `INK` tint icons, time/battery/signal stylized

Show three header variants: Energy Map (with chart link), Today (with date), Profile (with edit pencil).

Source: `EnergyMapMockup.jsx` header pattern, DOC5 §11

### §14. Drift log v2

Surface anything where the inputs (DOC5 + anchor + v1 legend + canvas references) disagree, are silent, or where v2 would need a new primitive.

Specifically check:
- **Form input radius:** v1 §4 doesn't include a "form input" radius slot — does the app use 12 (allowed) consistently? Confirm.
- **Toggle switch geometry:** is the 44×26 pill a new primitive or composed from v1 §4 (radius 999)?
- **Modal entry shadow:** does the v1 surface taxonomy (§6) cover modal elevations? If not, propose adding an "elevated" surface variant in a doc patch.
- **Drag handle on bottom sheets:** the 40×4 rounded pill — is this a new primitive or just a v1 §6 cardstock at 4px height?
- **Tab bar translucent surface** (`rgba(253,253,252,0.85)` + 12px blur): this is a *fourth* card surface. v1 §6 only locks three. Either add it to v1 (doc patch) or document v2 as the canonical home for it.

For each: state the current rule, the proposed resolution, and which doc must be patched.

---

## §3 — Acceptance criteria

v2 is done when:

1. All 14 sections rendered with visuals + values + citations.
2. Every primitive used traces to v1 legend §X — no new colors, no new fonts, no new alphas, no new spacing values invented.
3. Single self-contained HTML file, no build step, fonts via CDN.
4. Aesthetic matches v1 legend exactly (silk/ink/bronze, locked typography, locked eyebrows).
5. §14 drift log surfaces the four primitive gaps listed above (or explains why each composes from v1).
6. Phone-frame mocks (where used) are 390×844 with v1 §11 page rhythm — Reveal/Energy Map references for spacing scale.

---

## §4 — What v2 deliberately does NOT include

- The Today / Guidance / Friends / Profile **screen layouts** as full-screen mocks — those become v3 (per-screen prototypes).
- New animations beyond what's already in DOC5 §4 — animation specs out of scope for the legend.
- Copy beyond the canonical sample copy already in DOC5.
- Premium tier marketing visuals (hero illustrations, video-frame stills).
- Onboarding micro-interactions beyond the input states (tap-to-dismiss keyboard, etc.).

---

## §5 — Sequencing after v2

1. Audit the live app code (`Elementum_App/src/`) against v1 + v2 → punch list of drift.
2. Patch `tokens.jsx` per v1 §12 drift log + v2 §14 drift log.
3. Lock both legends as `Design/legend-primitives.html` (v1) + `Design/legend-patterns.html` (v2). Cross-reference from DOC5 §3.5.
4. Plan v3 — full screen prototypes for Today / Guidance / Friends / Profile / Chart-Reveal — composing strictly from v1 + v2.
