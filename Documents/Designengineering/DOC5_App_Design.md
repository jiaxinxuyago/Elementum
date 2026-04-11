# Elementum · Doc 5 — App Design Document

This document is the primary reference for all UI and interaction design work in Elementum. It is the contract between the design vision, the frontend implementation, and the data contracts defined in Doc 2. Designers use it to understand intent. Engineers use it to understand what to build and what data powers each component.

**Reading order:** Read Doc 2 §2 and §6–8 before this document. Doc 5 describes how to render the data; Doc 2 describes what the data is.

---

## CATALOGUE

```
§1  Design Philosophy & Voice
§2  Visual Identity System
§3  Typography
§4  Motion System
§5  Screen Flow Architecture
§6  Pre-Dashboard: Welcome
§7  Pre-Dashboard: Onboarding
§8  Pre-Dashboard: Loading
§9  Pre-Dashboard: Reveal
§10 Dashboard: Today
§11 Dashboard: My Chart (Reading Layer)
§12 Dashboard: Guidance (AI + Codex)
§13 Dashboard: Connect (Friends)
§14 Dashboard: Me (Profile)
§15 Shared Component Library
§16 Accessibility & Performance
§17 Data Contract Summary
```

---

## §1 — Design Philosophy & Voice

### The core tension we design around

Elementum holds two things in tension that most apps choose between: **ancient seriousness** and **daily accessibility**. A user should feel they are engaging with something real and deep — not a horoscope — while also opening the app in the seven minutes before a meeting and getting immediate, actionable signal.

Everything in the design serves this tension. The typography is warm serif, not clinical sans. The color system is aged paper, not sterile white. But the information hierarchy is ruthlessly functional — the most useful thing is always the first thing you see.

### Three design principles

**1. The reading is a recognition event, not an information delivery.**
Every piece of content should feel like the user is being seen, not told. This applies to copy, layout, and animation — the app should feel like it already knows you before you finish reading the sentence.

**2. Chinese as art, English as information.**
Chinese characters appear as visual glyphs — they create atmosphere and signal authenticity without requiring the user to read them. All information-carrying text is in English. The rule: a Western user who has never studied Chinese should feel the presence of the source culture without being confused by it.

**3. Depth on demand.**
The default state of every screen shows you the most personally relevant content immediately. Additional depth is available by scrolling or tapping — never gated behind multiple steps. The identity card is a single scroll. The daily guidance is the first thing you see. The full reading is one tap away from the bottom nav.

---

## §2 — Visual Identity System

### Color palette (LOCKED)

**Foundation:**

| Role | Name | Hex | Use |
|---|---|---|---|
| Background | Cream | `#F8F6F0` | Primary screen background |
| Background elevated | Parchment | `#EAE5DF` | Cards, elevated surfaces |
| Background deep | Vellum | `#DDD8CC` | Header sections, day master pillar |
| Primary text | Warm black | `#2C2825` | All primary content |
| Secondary text | Faded ink | `#5C554D` | Body paragraphs, descriptions |
| Tertiary text | Muted ink | `#6f6b66` | Labels, timestamps, secondary UI |
| Emphasis text | Deep ink | `#1a1815` | Hero moments only |

**Accent system:**

| Role | Name | Hex | Use |
|---|---|---|---|
| Accent light | Light bronze | `#9d8468` | Section labels, secondary CTAs |
| Accent mid | Bronze | `#8b7355` | Active states, progress, highlights |
| Accent dark | Deep bronze | `#6b5339` | Primary CTA background |
| Accent deepest | Walnut | `#5a4430` | Hover states, pressed CTAs |
| Gold highlight | Gold | `#D4AF37` | Navigation active indicator, special moments |

**Element colors (LOCKED — from Doc 2 §2):**

| Element | Display | Hex | Deep variant | Deep hex |
|---|---|---|---|---|
| Metal | 金 | `#8ba3b8` | — | `#6a849a` |
| Wood | 木 | `#7a9e6e` | — | `#587a4d` |
| Fire | 火 | `#c4745a` | — | `#9e5540` |
| Earth | 土 | `#b89a6a` | — | `#927750` |
| Water | 水 | `#5a7fa8` | — | `#3e5f85` |

**Borders and surfaces:**

| Role | Hex | Notes |
|---|---|---|
| Border standard | `#D5CDBD` | Card borders, dividers |
| Border light | `#E5DFD1` | Subtle separators |
| Border focus | `#8b7355` | Input focus ring |
| Day Master border | `#584A3E` | The pillar highlight — never used elsewhere |

### Why this palette works

The paper and bronze palette is not decorative — it is functional. The warmth of `#F8F6F0` against black text reads as an aged document without any actual texture required. The bronze accent system provides a single-hue hierarchy (light → dark) that guides the eye without introducing hue conflicts. The element colors are desaturated enough to work as data colors on the warm background without reading as garish.

Do not introduce new colors without updating this section. Every new color decision creates a token maintenance cost.

---

## §3 — Typography

### Font stack

| Role | Font | Fallback | Weight | Use |
|---|---|---|---|---|
| Hero titles | Cormorant Garamond | Georgia, serif | 400–600 | Archetype name, large titles (38px+) |
| Body serif | EB Garamond | Georgia, serif | 400–500 | All reading content, body paragraphs |
| Labels/UI | EB Garamond | Georgia, serif | 500 | Section labels (uppercase, tracked) |
| Chinese glyphs | Noto Serif SC | serif | 400–600 | Stem characters, pillar characters |
| Chinese brush headers | Ma Shan Zheng | cursive | 400 | Screen titles (八字排盘, 元素), used sparingly |
| Architectural labels | Cinzel | serif | 500 | Pillar type labels (YEAR, MONTH, etc.) |

**Load order:** EB Garamond and Cormorant Garamond are the critical fonts — preload these. Ma Shan Zheng is decorative — load async, font-display: swap.

### Type scale

| Size | Use | Line height |
|---|---|---|
| 40px | Chinese brush title headers | 1.2 |
| 38px | Archetype name (Cormorant) | 1.1 |
| 32px | Screen section titles | 1.3 |
| 24px | Card headers, sub-titles | 1.4 |
| 18px | Section headings | 1.5 |
| 16px | Body text, reading paragraphs | 1.8 |
| 15px | Secondary body, card descriptions | 1.7 |
| 14px | Labels, section eyebrows | 1.5 |
| 13px | Helper text, counts, timestamps | 1.5 |
| 11px | Navigation labels, micro-labels | 1.4 |
| 10px | Tracking labels (widest letter-spacing) | 1.4 |

### Label convention

Section labels are always: uppercase · EB Garamond · 10–11px · letter-spacing 2–3px · tertiary color.

Example: `"YOUR ELEMENTAL NATURE"` — this is the standard eyebrow format.

---

## §4 — Motion System

### Guiding principle

Motion communicates hierarchy and personality — it is never decorative. The reveal sequence at onboarding communicates depth (the chart came from something real). The tab transitions communicate spatial structure. Loading states communicate that calculation is happening.

All motion respects `prefers-reduced-motion`. Every animated element must have a static fallback.

### Easing curves

| Name | CSS | Use |
|---|---|---|
| Ease out | `[0.22, 1, 0.36, 1]` | Most screen entrances, content reveals |
| Spring | `{ type: spring, stiffness: 300, damping: 25 }` | Navigation indicator, identity seal bounce |
| Ease in-out | `ease-in-out` | Progress bars, element composition bars |
| Linear | `linear` | Canvas particle animations |

### Standard animations

**Screen entrance (all content):**
```
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
duration: 0.6–0.8s
easing: [0.22, 1, 0.36, 1]
```

**Staggered children (card lists, element bars):**
```
delay: i * 0.08–0.12s per item
base delay: 0.2s after parent
```

**Scroll-triggered reveals (Reveal screen sections):**
```
whileInView: { opacity: 1, y: 0 }
viewport: { once: true, margin: "-80px" }
```

**Element composition bars:**
```
initial: { width: 0 }
whileInView: { width: targetWidth }
duration: 0.8s, delay: 0.2 + (i * 0.1)
easing: easeOut
```

**Tab switching:**
```
Fade current: 150ms
Fade in next: 150ms (starts at 100ms)
Layout animation: spring for the active indicator
```

**Primary CTA button:**
```
hover: { scale: 1.02, y: -1 }
tap: { scale: 0.98 }
boxShadow: subtle → +4px on hover
duration: 200ms
```

**Identity seal (archetype icon at reveal):**
```
initial: { scale: 0.5, rotate: -5 }
whileInView: { scale: 1, rotate: 0 }
type: spring, bounce: 0.5
```

---

## §5 — Screen Flow Architecture

### Route map

```
/                   → WelcomeScreen
/onboarding         → OnboardingScreen
/loading            → LoadingScreen
/reveal             → RevealScreen
/dashboard          → AppLayout wrapper
  /dashboard/       → TodayScreen     (default)
  /dashboard/chart  → MyChartScreen
  /dashboard/guide  → GuidanceScreen
  /dashboard/connect→ ConnectScreen
  /dashboard/me     → MeScreen
```

### Navigation logic

**Pre-dashboard screens** have no bottom nav. They form a one-way funnel: Welcome → Onboarding → Loading → Reveal → Dashboard.

**Returning users** (chart in localStorage): Welcome auto-redirects to `/dashboard`. No onboarding required.

**Dashboard navigation** is always available via bottom nav with 5 tabs. The default landing on first entry is `/dashboard/chart` (My Chart), not Today — because the identity reveal is fresh and the user wants to go deeper on who they are. After first session, the default changes to `/dashboard/` (Today).

### Bottom navigation

```
[ TODAY ] [ GUIDE ] [ MY CHART ] [ CONNECT ] [ ME ]
    📅       📖        ◉ (logo)      👥        👤
```

| Tab | Path | Icon | Default first visit? |
|---|---|---|---|
| TODAY | `/dashboard/` | Calendar | After day 1 |
| GUIDE | `/dashboard/guide` | Book open | — |
| MY CHART | `/dashboard/chart` | Element seal | Day 1 (post-reveal) |
| CONNECT | `/dashboard/connect` | Users | — |
| ME | `/dashboard/me` | User | — |

**MY CHART is center** — not just because it's the structural anchor of the app, but because it is the reading layer. It is where the engine's content lives: the DayMasterHero identity card, the ElementSpectrum energy blueprint, and the ProfileReading. It is the product.

**Nav active state:** Element color of the user's Day Master on active icon. Gold dot indicator beneath. Nav labels 10px, uppercase, EB Garamond.

---

## §6 — Welcome Screen

**Route:** `/`
**Purpose:** First impression. Immediate identity hook. Minimal friction to start.

### Layout

```
┌─────────────────────────────────────────┐
│                                         │
│         [canvas: ink particles]         │
│                                         │
│         [Enso SVG, animated draw-on]    │
│                                         │
│              元 素                       │
│           ELEMENTUM                     │
│                                         │
│   "Five elements. One signature. Yours." │
│                                         │
│   Everyone carries a unique elemental   │
│   blueprint. We reveal yours.           │
│                                         │
│        [ Discover Yours → ]             │
│                                         │
│   "Already mapped? [Sign in]"           │
│                                         │
└─────────────────────────────────────────┘
```

### Component specs

**Enso SVG:** Animated path draw-on, duration 2s ease-in-out. Stroke color `#8b7355`, strokeWidth 2.5, 70px. Floats with `y: [0, -8, 0]` on 3s repeat cycle.

**Chinese title (元 素):** Ma Shan Zheng, 40px, `#2C2825`. The Chinese characters are the visual center — not translated in UI.

**Latin title (ELEMENTUM):** EB Garamond, 24px, uppercase, letter-spacing 2px, `#5C554D`.

**Tagline:** EB Garamond, 18px italic, `#5C554D`. Use a single, direct hook — not a description. Current "Want to discover..." is a question (weak). Use a statement: *"Five elements. One signature. Yours."*

**Body text:** EB Garamond, 16px, `#6f6b66`, max-width 360px, center aligned.

**Primary CTA:** Background `#6b5339`, text `#F8F6F0`, padding `14px 28px`, border-radius `8px`, EB Garamond 16px weight 500. Shadow: `0 4px 12px rgba(107,83,57,0.2)`. Hover: `#5a4430` + shadow stronger + y −1.

**Ink particle canvas:** 25 particles, bronze/ink colors, alpha 0.05–0.15, slow upward drift. Never competes with content — purely atmospheric.

### Entry sequence

On load: Fade in all content together at 0.8s with `y: 20 → 0`. The Enso draws itself while content fades in. The button appears last (stagger delay 0.4s).

---

## §7 — Onboarding Screen

**Route:** `/onboarding`
**Purpose:** Collect the six birth data points. Must feel like a ritual, not a form.

### Design principle

Each step gets the full screen. One question at a time. The poetic subtitle is the key differentiator from any other input flow — it establishes that this information matters spiritually, not just technically.

The progression bar at the top (3px, `#8b7355` gradient) must animate smoothly — it is the user's only sense of how long this takes.

### Step structure

```
┌─────────────────────────────────────────┐
│ [progress bar 3px at top]               │
│                                         │
│      Step 3 of 6                        │
│                                         │
│    "What day were you born?"            │
│                                         │
│    Your day is your core — the          │
│    essence of who you are at            │
│    the deepest level.                   │
│                                         │
│    [Input / Selector]                   │
│                                         │
│    [← Back]          [Continue →]       │
│                                         │
└─────────────────────────────────────────┘
```

### Input styles per step

| Step | Input type | Notes |
|---|---|---|
| Year | Scroll-pick or select, years 1900–present | Large serif text in selector |
| Month | 12-button grid, month names | Tappable, not a dropdown |
| Day | Scroll-pick 1–31 | Match year/month context |
| Hour | Scroll-pick 0–23 with readable labels ("3:00 AM", "18:00 / 6PM") | Note "skip if unknown" |
| Location | Text input with auto-complete | Used for True Solar Time, show it matters |
| Gender | Two-button pill toggle: Male / Female | Explain it affects Luck Cycle direction |

**Input philosophy:** The selects in V006 feel like browser defaults — mismatched to the aesthetic. Replace with scroll pickers that feel like the kind of selector you'd use in a meditation or wellness app: large type, spring-animated, element-tinted highlight on selected item.

**Poetic subtitles (one per step — the voice of the app):**
1. Year: *"The year you arrived reveals what you carry from those who came before."*
2. Month: *"Your month is the season your soul chose to enter this world."*
3. Day: *"Your day is your core — the essence of who you are at the deepest level."*
4. Hour: *"Your hour reveals how you express your nature outward."*
5. Location: *"We'll calculate your True Solar Time (真太阳时) to place you precisely in the cosmos."*
6. Gender: *"This determines the direction of your decade energy cycles (大运)."*

### Transitions

Each step slides in from the right (x: 20 → 0), previous step slides out to the left (x: 0 → −20). AnimatePresence mode="wait". Duration 350ms.

Back button slides the reverse direction.

Continue button disabled until valid input — visual state: reduced opacity 0.4, cursor not-allowed.

---

## §8 — Loading Screen

**Route:** `/loading`
**Duration:** 2.5–3 seconds (pad if calculation is instant — the wait is intentional)

**Purpose:** Build anticipation. Communicate that something real is being computed.

```
┌─────────────────────────────────────────┐
│                                         │
│    [Floating element icons pulse]       │
│    木  火  土  金  水                    │
│                                         │
│    Calculating your chart...            │
│                                         │
│    [5 element dots: animated fill]      │
│                                         │
│    [one rotating line / subtle spinner] │
│                                         │
└─────────────────────────────────────────┘
```

**Element characters:** 木火土金水 in their respective element colors, 14px Noto Serif SC, animated with staggered pulse: scale 1.0 → 1.15 → 1.0, each 0.25s delay, soft glow pulse.

**Progress dots:** 5 dots, one per element. They fill left to right over 2.5 seconds using their element colors. This communicates that five distinct calculations are happening.

**Transition out:** Fade out entire screen at 0.5s, then push to `/reveal`.

---

## §9 — Reveal Screen

**Route:** `/reveal`
**Purpose:** The product's most important screen. The identity recognition moment.

### Layout — four sections, one continuous scroll

The Reveal screen is intentionally long — each section gets near full viewport height and triggers as the user scrolls. The user is meant to spend 60–90 seconds here, not 10 seconds. This is where the emotional connection forms.

```
SECTION 1 — YOUR CHART (full viewport)
  Eight Characters header in Chinese brush
  The Four Pillars grid
  "Scroll to explore" animated cue

SECTION 2 — WHO YOU ARE (full viewport)
  Archetype seal SVG, spring-animated
  "You are..."
  THE BLADE  (archetype name, 40px Cormorant)
  "Yang Metal · Precision before intention"
  Identity token pill: 庚 · Yang Metal · Blade
  Archetype essence paragraph

SECTION 3 — YOUR ENERGY BLUEPRINT (partial viewport)
  "YOUR ENERGY BLUEPRINT"
  Element composition bars (5, animated fill)
  Missing element callout (if present)

SECTION 4 — YOUR PRESCRIPTION (partial viewport)
  "WHAT BALANCES YOU"
  Catalyst section (What activates you)
  Friction section (What drains you)
  Absent element guidance

SECTION 5 — CTA
  "Enter Dashboard →"
```

### Section 1: The Chart

**Four Pillars grid:**

```
┌──────┬──────┬──────┬──────┐
│ YEAR │MONTH │ DAY  │ HOUR │
│      │      │  ↑   │      │
│      │      │ Day  │      │
│  乙  │  庚  │  庚  │  乙  │
│ 天干 │ 天干 │Master│ 天干 │
│──────│──────│──────│──────│
│  亥  │  辰  │  寅  │  酉  │
│ 地支 │ 地支 │ 地支 │ 地支 │
└──────┴──────┴──────┴──────┘
```

Day Pillar treatment: `border: 2.5px solid #584A3E`, background slightly deeper (`#DDD8CC`), vertical padding extended (−my-3 to break grid baseline). All other pillars: `border: 1px solid #D5CDBD`.

Chinese characters: 38px, Times New Roman (for authentic weight), colored by element using `elementColor()`. Sub-labels (天干, 地支): 10px Noto Serif SC, `#968C7C`.

Section entrance: `opacity 0 → 1, y 30 → 0`, duration 0.8s on mount.

### Section 2: Identity

This is the recognition moment. The animation sequence matters:

1. Element seal icon springs in (scale 0.5 → 1, spring bounce 0.5)
2. "You are..." fades in at 0ms delay
3. Archetype name slides up at 200ms delay
4. Subtitle fades at 400ms
5. Identity token pill fades at 600ms
6. Essence paragraph fades at 800ms

**Archetype name:** Cormorant Garamond, 40px, weight 600, color `#5a4430`, letter-spacing 1px, text-shadow `0 2px 4px rgba(139,115,85,0.15)`.

**Identity token pill:** `庚 · Yang Metal · Blade` — element color on `#EAE5DF` background, 13px, rounded-full, inline block. The stem glyph (庚) is slightly larger (14px) in its element color. This is the shareable identity code.

**Element seal:** Use the existing ArchetypeSeal SVG component from the engine (see Doc 2 §2). 72px, element color. Spring animation on entry.

### Section 3: Energy Blueprint

**Composition bars:** 5 rows, sorted highest count first. Each row:
- Element icon (20px, element color)
- Element name (EB Garamond, 15px, `#5C554D`)
- Count fraction (`4/10`, 13px, right-aligned, `#6f6b66`)
- 10-pip bar (each pip is a small rounded rect, not a continuous bar — this makes the count visually discrete)

Pip rendering: Filled pips use element color at 88% opacity for DM element, 58% for others. Absent element: dashed border pips, 35% opacity, "absent" italic label replacing count.

**Missing element callout card:** Background `${elementColor}10`, border `${elementColor}40`, rounded-xl, p-5. Shows element icon, "Your [Element] is missing", and the missing element paragraph from the engine.

### Section 4: What Balances You

This section is the **product differentiator**. Every chart gets this — not just charts with missing elements.

```
┌─────────────────────────────────────────┐
│  WHAT BALANCES YOU                      │
│                                         │
│  ✦ WHAT ACTIVATES YOU                   │
│  [Catalyst element card]                │
│  [Secondary catalyst card]              │
│                                         │
│  ✦ WHAT DRAINS YOU                      │
│  [Resistance element card]              │
│  [Secondary resistance card]            │
│                                         │
│  ✦ WHAT IS ABSENT                       │
│  [Absent element card, if any]          │
│                                         │
└─────────────────────────────────────────┘
```

Data source: `applyTiaohouToEnergies(ELEMENT_ENERGIES[dm.stem][band], dm.stem, monthBranch)`. This is the same data that powers ElementSpectrum in the dashboard — showing it here on first reveal is critical.

This section is currently missing from the V006 Reveal screen. Add it.

---

## §10 — Today Screen

**Route:** `/dashboard/`
**Purpose:** Daily utility. The habit-forming screen. 0 taps to value.

### Layout

```
┌─────────────────────────────────────────┐
│ [Decade indicator — full width card]    │
│  AGE 28–37  ·  The Fire Decade          │
│                                         │
│ [ TODAY ] [ MONTH ] [ YEAR ]            │
│   ─────                                 │
│                                         │
│ TODAY TAB ──────────────────────────    │
│                                         │
│ [Date: Wednesday, April 8]              │
│ [Today's element icon + glow]           │
│   METAL DAY                             │
│   丙  ·  Fire Stem                      │
│   [2-line daily message, personalized]  │
│                                         │
│ ─── DO THIS ─────────────────────────── │
│ ○ Bold action — Fire supports it        │
│ ○ Speak up in that conversation         │
│ ○ Initiate, don't wait                  │
│                                         │
│ ─── AVOID ───────────────────────────── │
│ △ Contracts — energy too volatile       │
│ △ Long-term commitments                 │
│ △ Passive waiting                       │
│                                         │
│ ─── BEST HOURS ──────────────────────── │
│ 🌅 7–9 AM  · Planning window           │
│ ☀  11–1 PM · Peak Fire — act boldly    │
│ 🌙 9–11 PM · Wind down, integrate      │
│                                         │
│ ─── YOUR CATALYST TODAY ─────────────── │
│ [Short reading from ELEMENT_ENERGIES    │
│  about how today's element interacts    │
│  with your DM]                          │
│                                         │
└─────────────────────────────────────────┘
```

### Decade indicator

Full-width card, `border: 1px solid #D4AF37`, background `white/60 backdrop-blur-md`, rounded-2xl, p-5.

Shows: `AGE X–Y` (10px uppercase), `The [Element] Decade` (20px EB Garamond serif).

Element icon from `elementIcons` map. The decade element is from `cycles.find(c => c.isCurrent)`.

### Tabs

`[ TODAY ] [ MONTH ] [ YEAR ]` — EB Garamond, 10px, uppercase, letter-spacing 0.15em. Active tab: white pill bg with spring animation (`layoutId="activeTab"`). Inactive: `#8C857B`. Full width, flex, inside a rounded `bg-[#EAE5DF]/50` container.

### Daily guidance card

The guidance message must be **personalized** to the user's DM. Not generic. The format:
- Today's element in the user's element color
- The Chinese stem character of the day
- 2–3 sentence narrative that references how today's energy interacts with YOUR element

Example for 庚 (Metal) DM on a Fire day: *"Fire days press on Metal — the precision meets its furnace. Use that pressure today: it's not friction, it's the forge. What you've been evaluating comes into sharpest focus under this energy."*

This voice comes from the `getDailyGuidance(chart, todayElement)` function. The function must know the user's DM to personalize.

### DO THIS / AVOID sections

Rendered as card with simple list. DO items: checkbox-style left icon (`border-2 border-[#D5CDBD]`, rounded square). AVOID items: triangle warning icon left. Both use `#5C554D` body text, EB Garamond 15px, 1.7 line height.

### Month tab

Calendar grid showing each day colored by its element. High-flow days (element harmonizes with DM) get a soft glow. Clash days get a subtle X overlay. Tap a day → slide-in panel showing that day's guidance.

### Year tab

Seasonal overview. Four sections: Spring / Summer / Autumn / Winter. Each shows the dominant element energy for that quarter and a 2–3 sentence strategic note for this user's DM.

---

## §11 — My Chart Screen (Reading Layer)

**Route:** `/dashboard/chart`
**Purpose:** The deepest identity content. DayMasterHero + ElementSpectrum + ProfileReading in one scrollable experience.

This is the **center tab** and the heart of the product. It is also where the engine's full content lives — the teaser, p1, p2, gifts, edges, landscape, twoAM, and the 50-key dominant energy readings.

### Layout — three sequential deliverables

```
DELIVERABLE 1: WHO YOU ARE (DayMasterHero)
  Archetype seal (72px, element color)
  Identity token pill
  Archetype name (38px Cormorant)
  Manifesto (14px italic)

  ─── divider ───

DELIVERABLE 2: YOUR ENERGY BLUEPRINT (ElementSpectrum)
  "YOUR ELEMENTAL NATURE"
  [Element icon] [band mode label] [approach]
  Trait paragraph (3–4 sentences)
  Approach line
  ─── divider ───
  "DOMINANT ENERGY" or "WHAT SHAPES YOU MOST"
  [1–3 dominant energy cards]
  ─── divider ───
  "WHAT ACTIVATES YOU"
  [Catalyst cards]
  ─── divider ───
  "WHAT CREATES FRICTION"
  [Resistance cards]
  ─── divider ───
  "WHAT IS ABSENT" (if present)
  [Absent element cards]
  ─── divider ───
  "WHO YOU ARE"
  [Teaser text, italic 16px]

  ─── divider ───

DELIVERABLE 3: YOUR READING (ProfileReading)
  [Energy ring 48px]  [strength label]
  ─── 2 AM THOUGHT ───
  "Formed. Capable. Still waiting..."
  ┌─────────────────────────────────────┐
  │ ★ CORE GIFTS                        │
  │ Decisive Clarity · [desc]           │
  │ Productive Force · [desc]           │
  │ Honest Directness · [desc]          │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │ 〰 GROWING EDGE                      │
  │ Combative Certainty · [desc]        │
  │ Closed to Shaping · [desc]          │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │ ↗ YOUR LANDSCAPE                    │
  │ thrives · [text]                    │
  │ costs · [text]                      │
  └─────────────────────────────────────┘

  [Four Pillars grid — reference]

  [Birth coordinates: date · time · location]
```

### Deliverable 1: DayMasterHero

Centered, element-tinted gradient background (`${elementColor}08` over `#F8F6F0`). Full-width card feel without a hard border.

**Archetype seal:** 72px ArchetypeSeal SVG, element color, with a very soft element-colored glow (`box-shadow: 0 0 32px ${elementColor}20`).

**Identity token pill:** `庚 · Yang Metal · Blade` — rounded-full, bg `${elementColor}15`, text element color, 13px EB Garamond, padding `4px 14px`. The stem glyph slightly larger.

**Archetype name:** Cormorant Garamond, 38px, weight 600, `#5a4430`.

**Manifesto:** EB Garamond, 14px italic, `#5C554D`, max-width 320px, center.

See Doc 2 §6 for complete field spec and what not to show here.

### Deliverable 2: ElementSpectrum

**Your Elemental Nature card:**

```
┌──────────────────────────────────────────┐
│  YOUR ELEMENTAL NATURE (10px uppercase)  │
│                                          │
│  [Element icon 24px]  Overpowering       │
│                       Self-generating    │
│                       Channel & Release  │
│                                          │
│  "The evaluation runs before you decide  │
│   to evaluate — it starts the moment     │
│   you walk in..."                        │
│  ─────────────────────────────           │
│  Channel & Release — "This energy needs  │
│   outlets: expression, challenge,        │
│   friction."                             │
└──────────────────────────────────────────┘
```

Band mode labels and approach lines from `STRENGTH_META`. Trait paragraph from `ELEMENTAL_NATURE[stem][band]`.

**Dominant energy cards (CalloutCard component):**

Each dominant element card shows:
- Element icon (28px) + element name
- Score display (count of 10 pips — rendered as filled/unfilled pip dots)
- The Ten God ruling force (resolved via `getDominantTenGod()`)
- Keywords (3–4 chips, element color background at 15%, text)
- Three angles in expandable accordion: HOW THIS TELLS ABOUT ME · HOW THIS WORKS WITH ME · WHAT THIS REVEALS

The three angles are the key content from the 50-key Layer 2 taxonomy (`READING_ANGLES`). This is the deepest reading content the app has and it lives here, not behind a paywall.

**Section label by band:**
- concentrated / balanced: "Dominant energy"
- open: "What shapes you most"

**Dominant element section intro (3 lines under section label):**
- concentrated: *"The element that runs most strongly through your chart — the lens through which everything else is filtered."*
- open: *"The dominant force in your chart shapes the conditions under which your core nature comes through fully."*

**Catalyst/Friction callout cards:**

Solid-border cards. Element icon + element name + 2 keywords + insight line + guidance line.

Catalyst guidance: *"This element activates and directs your energy."*
Friction guidance: *"This element deepens what you already have in excess."*

**What Is Absent cards:** Dashed border. Each missing element gets one card with the absence-as-formative-force framing. *"Its absence has shaped you as actively as what's present."*

**WHO YOU ARE teaser:** The final line of the ElementSpectrum section, italic 16px. From `buildDayMasterProfile(chart).whoYouAreTeaser`. This is the bridge into the reading.

### Deliverable 3: ProfileReading

**Energy ring:** 48px SVG ring, element color, partially filled to strength percentage. DM stem character centered inside.

| strength | Ring % | Label | Sublabel |
|---|---|---|---|
| extremely_strong | 92% | Extremely Strong | Dominant — pure and concentrated |
| strong | 72% | Dominant | Well-supported and self-directed |
| moderate | 50% | Balanced | Flexible — works across many conditions |
| weak | 30% | Receptive | Needs the right conditions |
| extremely_weak | 12% | Yielding | Highly context-dependent |

**2 AM Thought card:**

Dashed border (`1px dashed ${elementColor}50`), rounded-xl, `${elementColor}08` background. First-person italic text, EB Garamond 16px. The most quietly powerful content in the reading.

Example: *"Formed. Capable. Still waiting for the thing that finally deserves it."*

**Core Gifts section:**

Header: `★ CORE GIFTS` in element color. 3 items, each:
- Label: 2–4 words, bold, element color, 15px
- Desc: 1 sentence behavioral, `#5C554D`, 15px

**Growing Edge section:**

Header: `〰 GROWING EDGE`. 2 items, same structure.

**Your Landscape:**

Header: `↗ YOUR LANDSCAPE`. Two rows:
- "Where you operate at full capacity" + thrives text
- "Where this consistently costs you" + costs text

Not a flaw framing — a fit framing. Color: element color for the section header, `#5C554D` for content.

---

## §12 — Guidance Screen (AI + Codex)

**Route:** `/dashboard/guide`
**Purpose:** Depth layer — AI-powered questions and BaZi education.

### Layout

```
READINGS (header)

─── AI ASSISTANT ──────────────────────────

[Bot icon in lavender circle]
AI Readings

"Ask questions about your [Archetype] chart
and get personalized guidance."

Free: 3 questions/month
[2/3 remaining]

[ Ask AI Assistant → ]

─── BAZI CODEX ────────────────────────────

[Book icon in earth circle]
BaZi Codex

Learn the fundamentals.

CORE CONCEPTS
  What is BaZi?
  The Day Master
  Five Elements
  Luck Cycles
  ──────────────
  [Browse Full Codex →]

─── UPGRADE ───────────────────────────────

[Diamond icon]
Unlimited Access

Unlimited AI questions, advanced Codex,
expert Q&A sessions.

$9.99/month

[ Upgrade to Pro → ]
```

### AI modal

When "Ask AI Assistant" is tapped: slide-up sheet. Contains:
- "Ask anything about your chart" — 16px italic, `#5C554D`
- Text input area, auto-focus, EB Garamond, rounded-xl
- Recent question chips (last 3 questions as tappable suggestions)
- Submit button

Response renders in the sheet with a streaming text effect. The response references the user's actual chart: "As a Yang Metal at concentrated energy..." This requires the AI to receive the Canonical JSON and respond in the established voice.

**Question counter:** Rendered as a small indicator under the CTA. `2/3 remaining` in tertiary color. When 0/3: gray the button, show "Monthly limit reached · Upgrade for unlimited".

### Codex entry design

Accordion-style list. Each entry:
- Entry name (EB Garamond 16px, `#2C2825`)
- Expand → Definition (1–2 sentences) + Explanation (2–3 paragraphs) + Your Chart Reference (how this applies to them)

Pro entries marked with `◆` icon and soft blur if user is on free tier.

---

## §13 — Connect Screen (Friends)

**Route:** `/dashboard/connect`
**Purpose:** Social viral loop. Compatibility calculation.

### Layout (V1 — launch state)

```
CONNECT (header)

─── COMPARE YOUR ENERGY ──────────────────

Compare your elemental blueprint with
friends, partners, or family.

[Input form: Name, Birth Date, Birth Time, Location]

[ Calculate Compatibility → ]

─── RECENT ────────────────────────────────

[Empty state: "Your comparisons will appear here"]

─── INVITE ────────────────────────────────

"Know someone who should know their element?"

[ Share Elementum → ]
```

### Compatibility result

When calculated: slide up results panel.

**Score display:**
- Large number (72px, Cormorant Garamond)
- "% Compatible" label
- Short headline: "Harmonious and Creative" or "Challenging but Growth-Focused"

**Element comparison grid:**

```
YOU              THEM
庚 Yang Metal    丁 Yin Fire
The Blade        The Candle
```

**Relationship insight:** 3–4 sentence paragraph generated from element relationship logic. Fire-Metal is the forge relationship — productive tension with a specific character.

**Share card:** Shows both archetypes side by side. "We're 74% compatible — Metal meets Fire 🔥" with attribution watermark and invite link.

### Viral trigger

After first comparison: "See how compatible you are with one more friend? Compare unlimited charts with Pro."

---

## §14 — Me Screen (Profile)

**Route:** `/dashboard/me`
**Purpose:** Account, birth data, settings. Minimal.

### Layout

```
ME (header)

─── YOUR BIRTH DATA ───────────────────────

Born: March 15, 1990
Time: 14:00 (2:00 PM)
Location: New York City
Gender: Male

[Edit birth data →]

─── SUBSCRIPTION ──────────────────────────

Free · 3 AI questions/month

[Upgrade to Pro →]

─── SETTINGS ──────────────────────────────

Notifications · On
App Theme · Default
Export Chart as PDF →

─── ACCOUNT ───────────────────────────────

Sign Out
This will clear all saved data.

[Sign Out]
```

The profile screen should feel minimal and functional. No narrative. No reading content here.

**Future (Phase 2):** MBTI resonance display. Shareable identity card. Achievement timeline (how long they've been a user).

---

## §15 — Shared Component Library

### Card

The primary content container. Used everywhere.

```css
background: white or #FAF8F5
border: 0.5px solid #E5DFD1
border-radius: 16px
padding: 20px
box-shadow: 0 2px 12px rgba(0,0,0,0.04)
```

Animated entrance: `initial: { opacity: 0, y: 12 }`, delay prop for stagger.

### CalloutCard

For dominant energy, catalyst, friction, and absent element cards.

```
Props:
  color         — element hex
  borderStyle   — "solid" | "dashed"
  icon          — element name (for icon lookup)
  sectionLabel  — "Metal · 4"
  name          — "Metal dominant"
  line          — italic insight sentence
  guidance      — plain guidance sentence
  keywords      — string[] (3–4 chips)
  angles        — { how, works, deep } | null
  count         — number | null
  totalCount    — 10 (for pip display)
  tenGod        — string | null
```

Solid border cards: element color at 8% opacity background, element color at 20% opacity border.
Dashed border cards: transparent background, element color at 50% opacity dashed border.

### SectionLabel

10px uppercase, letter-spacing 2px, EB Garamond weight 500, `#6f6b66`. Always above section content with 16px bottom margin.

### StrengthRing

SVG partial circle. Props: `pct` (0–1), `color`, `stem`, `size` (default 48px). Stem character centered, element color. Used in ProfileReading only.

### ElementIcon

Inline SVG per element. Lucide icon wrappers:
- Wood → `TreePine`
- Fire → `Flame`
- Earth → `Mountain`
- Metal → `CircleDot`
- Water → `Droplets`

Props: `el` (element name), `color` (hex), `size` (px), `strokeWidth` (default 1.5).

### PipBar

Alternative to continuous progress bar. Renders N filled/unfilled pips.

```
Props:
  count: number    — filled pips
  total: number    — total pips (10)
  color: string    — element hex
  dmElement: bool  — true = 88% opacity, false = 58%
  absent: bool     — dashed border pips
```

Pip dimensions: 16px × 6px, gap 2px, border-radius 3px.

### ArchetypeSeal

SVG seal per stem (10 seals). Props: `stem`, `color`, `size` (default 72px). Each seal is a geometric composition using 1.5px strokes.

See Doc 2 §2 for each stem's concept:
甲 → branching tree · 乙 → spiral vine · 丙 → radiating sun · 丁 → upward flame · 戊 → layered peak · 己 → cultivation grid · 庚 → bisected hexagon · 辛 → faceted diamond · 壬 → depth rings · 癸 → wave arcs

---

## §16 — Accessibility & Performance

### Accessibility

**Color contrast:** All text must meet WCAG AA (4.5:1 minimum). The primary text `#2C2825` on `#F8F6F0` passes at 12.5:1. Check element colors at small text sizes — several may need a darker variant for <16px use.

**Touch targets:** Minimum 44×44px for all interactive elements. Navigation icons: 48×48px tap area. Checkbox-style list items: 48px minimum height.

**Semantic HTML:** `<h1>` once per screen, proper heading hierarchy, `aria-label` on icon-only buttons, `role="status"` on question counters.

**Reduced motion:** All Framer Motion animations must check `useReducedMotion()`. When true: remove translate animations, keep opacity only. No parallax. No floating animations.

**Screen reader:** All Chinese characters should have `aria-hidden="true"` and accompanying English `aria-label`. Example: `<span aria-hidden>庚</span><span className="sr-only">Geng — Yang Metal</span>`.

### Performance

**Font loading strategy:**
- Preload: EB Garamond 400 and 500 weights (critical rendering path)
- Async: Ma Shan Zheng (decorative, below the fold)
- font-display: swap for all Google Fonts

**Component boundaries:** `READING_ANGLES` and `ELEMENTAL_NATURE` are module-level constants (see engine). Never define large static objects inside component functions — they rebuild on every render.

**Image strategy:** ArchetypeSeal components are inline SVG — no image requests. Element icons are Lucide components — tree-shaken in build.

**Bundle:** Recharts is the heaviest dependency. Load it lazily for the Month tab calendar chart and Year view bar chart. Today screen can render without it.

---

## §17 — Data Contract Summary

What each screen reads from the engine's Canonical JSON or computed state:

| Screen | Reads from engine |
|---|---|
| Reveal | `chart.pillars`, `chart.dayMaster`, `chart.elements`, `chart.dayMasterArchetype`, `ELEMENT_ENERGIES`, `applyTiaohouToEnergies()` |
| Today | `chart.dayMaster`, `getTodayElement()`, `getDailyGuidance(chart, todayEl)`, `cycles.find(c => c.isCurrent)` |
| My Chart / DayMasterHero | `chart.dayMaster`, `chart.archetypeKey`, `ARCHETYPE_MANIFESTO`, `ArchetypeSeal` |
| My Chart / ElementSpectrum | `chart.elements`, `chart.dayMaster`, `ELEMENTAL_NATURE[stem][band]`, `STRENGTH_META`, `ELEMENT_ENERGIES[stem][band]`, `applyTiaohouToEnergies()`, `READING_ANGLES[domEl_tenGod]`, `getDominantTenGod()`, `computeTgPattern()` |
| My Chart / ProfileReading | `buildDayMasterProfile(chart)` → `{strengths, shadows, twoAM, landscape, whoYouAreTeaser}`, `TEMPLATE_DB[archetypeKey]` |
| Guidance | `chart.dayMasterArchetype.name`, question counter from state |
| Connect | `chart.dayMaster`, `chart.elements`, computed compatibility score |
| Me | `chart.meta.birthDate`, `chart.meta.birthHour`, `chart.meta.location`, `chart.meta.gender` |

**The engine feeds everything.** No screen derives its own calculation. If data isn't in the Canonical JSON or a pre-computed lookup, it doesn't appear.

---

## §18 — Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | April 2026 | Initial creation. Drafted from V006 Figma prototype + Product Design Doc v005 + Business Analysis. |

---

## §19 — Pricing Model & Content Tiers

### Tier structure

Elementum exposes **two tiers** to users. Two additional tiers (`ADVISOR`, `ORACLE`) are retained in the engine constants for future expansion but are not surfaced in the current UI.

| Constant | Label | Price | Status |
|---|---|---|---|
| `TIERS.FREE` | Free | $0 | Live — full chart, limited depth |
| `TIERS.SEEKER` | Seeker | $9.99/mo | Live — full depth + self-report access |
| `TIERS.ADVISOR` | Advisor | TBD | Engine-reserved, not exposed |
| `TIERS.ORACLE` | Oracle | TBD | Engine-reserved, not exposed |

One additional monetization unit exists outside the tier system:

| Product | Price | Description |
|---|---|---|
| **Self-Report** | $6.99–9.99 one-time | LLM-generated holistic narrative. Purchases a single report for the user's current chart. Not a subscription. Available at SEEKER tier only (requires Seeker to unlock). |

---

### Content gating map

The gating model applies the **revelation sequence** as a product principle: recognition (free) → explanation and domain (Seeker) → full interior and synthesis (self-report). Each tier must create genuine desire for the next before the paywall appears.

#### Deliverable 1 — DayMasterHero (Identity Card)
| Content | FREE | SEEKER |
|---|---|---|
| Archetype seal + name + manifesto | ✓ | ✓ |
| Energy band + tgPattern chips | ✓ | ✓ |
| Shareable code strip | ✓ | ✓ |

Identity card is fully free. It is the hook. Nothing here is gated.

#### Deliverable 2 — ElementSpectrum (Energy Blueprint)

| Content | FREE | SEEKER |
|---|---|---|
| Energy bars (elemental composition) | ✓ | ✓ |
| Elemental Nature card (band reading) | ✓ | ✓ |
| Catalyst element — name + teaser only | ✓ | ✓ |
| Catalyst element — full behavioral reading | ✗ | ✓ |
| Friction element — name + teaser only | ✓ | ✓ |
| Friction element — full behavioral reading | ✗ | ✓ |
| Absent element cards — teaser only | ✓ | ✓ |
| Dominant energy cards — `hook` + `dynamic` | ✓ | ✓ |
| Dominant energy cards — all 13 compound fields | ✗ | ✓ |
| Secondary energy cards | ✗ | ✓ |
| WHO YOU ARE teaser | ✓ | ✓ |

#### Deliverable 3 — ProfileReading (Full Reading)

| Content | FREE | SEEKER |
|---|---|---|
| ProfileReading ring (strength visualization) | ✓ | ✓ |
| twoAM | teaser line only | full |
| Gifts (3) | labels only | labels + desc |
| Edges (2) | label only | label + desc |
| Landscape (thrives + costs) | ✓ | ✓ |
| p1 + p2 paragraphs | ✗ | ✓ |

#### Self-Report (one-time purchase, SEEKER only)

| Content | Included |
|---|---|
| Synthesized holistic narrative combining all chart layers | ✓ |
| Full compound archetype reading for all dominant + secondary energies | ✓ |
| Catalyst and friction behavioral synthesis | ✓ |
| `your_interior`, `your_tension`, `your_build`, `off_track` fields | ✓ |
| Downloadable PDF format | ✓ |

---

### Paywall design principles

**Day 0 urgency is everything.** Industry data shows 80–90% of conversions occur within the first session. The free experience must create depth hunger immediately — not after days of use.

**The free compound card must be specific enough to feel accurate, incomplete enough to feel incomplete.** `hook` and `dynamic` establish recognition. Cutting before `your_scene` and `your_interior` creates the moment where the user knows there is more and wants it. The paywall appears at exactly that cut point.

**Paywall copy never describes what's locked — it names what the user is already feeling.** Not "unlock your full reading." Something closer to: "You've seen what this energy is. There's a version of this that names what it costs you — and what you're actually building."

**The self-report is positioned as a different product, not more of the same.** It is not "unlock more fields." It is "receive a single piece of writing about you specifically — not a collection of card descriptions, but a synthesized reading." This distinction justifies the one-time purchase alongside the subscription.

---

### Upgrade triggers in the UI

| Trigger moment | Location | Mechanism |
|---|---|---|
| Compound card depth hunger | Deliverable 2, after `dynamic` | Soft blur on remaining fields + upgrade prompt |
| twoAM teaser | Deliverable 3 | First ~10 words visible, rest blurred + "your full reading" CTA |
| Self-report prompt | My Chart screen footer | Card: "Your chart as one reading. Generated once, yours to keep." |
| Catalyst/friction full reading | Deliverable 2 | Locked card with accurate teaser + upgrade |

**`◆` indicator** marks all Seeker-only content at the component level. Free users see the indicator and a soft blur. The indicator is not a lock icon — it is a marker that signals depth, not restriction.

---

### Engine implementation notes

- `TIERS.FREE` and `TIERS.SEEKER` are the two active constants
- `TIERS.ADVISOR` and `TIERS.ORACLE` are defined but not referenced in current UI logic
- The self-report purchase is tracked as a separate boolean flag on the user profile (`hasSelfReport: boolean`) — it is not a tier change
- Seeker access gates are implemented via `userTier >= TIERS.SEEKER` checks
- Self-report access gates check both `userTier >= TIERS.SEEKER && user.hasSelfReport`

---

## Document Metadata

| | |
|---|---|
| **Document** | Doc 5 — App Design Document |
| **Last Updated** | 2026-04-10 |
| **Version** | 1.0  ·  April 2026 |
| **Status** | LIVING — most actively evolving document in the system |
| **Audience** | Designer, frontend engineers |
| **Purpose** | Full UI/UX: component specs, color system, typography, animation, screen flows, interaction design. References Doc 2 for what data is available and in what order. |
| **Stability** | LOW — updates with every design iteration |
| **Used by** | Elementum_Engine.jsx · frontend components · design tools |
| **Compatible with** | Doc2 v1.0 · Doc1 v1.0 · Doc6 v1.0 |
