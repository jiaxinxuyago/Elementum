# Prompt — Elementum Design Legend (v1)

**Audience:** Claude design canvas (claude.ai/design)
**Deliverable:** A single self-contained HTML file titled `elementum-design-legend.html`
**Goal:** Convert the existing visual DNA + locked rules into a one-page legend that any future designer or engineer can use as the canonical reference.

---

## How to use this prompt

Open a new project in the Claude design canvas. Attach the four input files listed in §1, paste §2 (the prompt body) as the message, and reference the three sibling HTMLs at the bottom of the prompt — they're already in the same project so the canvas can read them directly.

---

## §1 — Required inputs (attach all four)

1. **`DOC5_App_Design.md`** — the locked app design spec, especially §2 (color), §3 (typography), and the new §3.5 (component primitives). Treat as authoritative for *rules*.
2. **`northstar-anchor.html`** — self-contained extract of the V1 Reveal + Energy Map prototype. Treat as authoritative for *visual DNA* (every computed style is canonical).
3. **`Elementum - Pre-Dashboard Flow.html`** — onboarding mockup (canvas reference).
4. **`Reading Pages - V1 Prototype.html`** — Energy Map / reading pages (canvas reference).
5. **`Elementum - Visual Directions v2.html`** — Ink & Pigment visual direction (canvas reference).

When `DOC5` and `northstar-anchor.html` disagree on a value, the anchor wins. When the three canvas HTMLs disagree with the anchor, the anchor still wins — they are ambient inspiration, not law.

---

## §2 — The prompt (paste this into the canvas)

> You are designing the **Elementum Design Legend** — a single-page HTML reference document that captures the app's locked visual system. Think of it as the design equivalent of an API reference: every primitive, every token, every rule made visible and inspectable on one page.
>
> **Inputs:** I have attached four files. Read them in this order:
> 1. `DOC5_App_Design.md` — read §2, §3, and §3.5 in full. These define the *rules*.
> 2. `northstar-anchor.html` — open the rendered page and inspect computed styles. This defines the *truth*.
> 3. The three reference HTMLs (`Elementum - Pre-Dashboard Flow`, `Reading Pages - V1 Prototype`, `Elementum - Visual Directions v2`) — use these as ambient context for the aesthetic, *not* as new sources of rules.
>
> **Constraint — no invention:** Every color, font, size, spacing value, and radius in the legend must be traceable to one of the four inputs. If you find yourself wanting a value that isn't in any input, stop and flag it as an open question at the bottom of the legend rather than inventing it.
>
> **Aesthetic direction:** The legend itself should feel like it belongs to the same family as the app — silk paper, ink, bronze accents, EB Garamond + Cormorant + Cinzel. But it is a *document*, not a screen — desktop-width, single column, no phone frame. Generous whitespace. Each section labeled with the §3 eyebrow primitive (10px / EB Garamond / 2.5px ls / 500 / element-color@80% / uppercase).
>
> **Output:** A single self-contained HTML file (`elementum-design-legend.html`) that opens and renders without a build step. Use a CDN for fonts (Google Fonts). No external CSS files. No images other than what's already in `/assets/` (use `<img>` references the same way the anchor does).

### Legend sections (in this order)

For each section, include three things:
- **The visual** (rendered swatch, sample, or component)
- **The token / value** (e.g. `borderRadius: 16`, `${T.fire}40`)
- **The rule / use** (one sentence, sourced from DOC5 or anchor)

#### 1. Color palette
- Paper & ink swatches (cream, silk, parchment, vellum, ink, inkSoft, inkLight, inkMist)
- Bronze ramp (bronzeLight → bronze → bronzeDark → walnut → gold)
- Five element pigments × four-step alpha ladder (`${color}10`, `${color}1A`, `${color}40`, full)
- Each pigment's `*Deep` companion
- Reserved accents: `seal #A04030`, `dmBorder #584A3E`, `borderFocus #8b7355`
- Annotate which surfaces use which alpha (per §3.5.A)

#### 2. Type specimen
- Every font × weight × size combination actually used (per §3 type scale)
- Show the four families side-by-side: Cormorant Garamond, EB Garamond, Cinzel, Noto Serif SC
- Include the locked headline pair: "The Blade" (Cormorant 38/400) + "Precision before intention" (Cormorant italic 19/500)

#### 3. Eyebrow library
- The §3 locked eyebrow rendered for each element color (Wood, Fire, Earth, Metal, Water at 80% alpha)
- The bronze eyebrow variant (`bronzeDark`)
- Wrong examples: too bold, wrong tracking, mixed-case (visibly marked ✗)

#### 4. Border-radius scale
- Six swatches: 1px, 10px, 12px, 16px, 22px, 999px (per §3.5.B)
- Each labeled with its canonical use
- Visually mark out-of-scale radii (4, 6, 8, 14, 18, 20, 28) as forbidden

#### 5. Spacing scale
- Ruler-style visualization of all allowed values (1, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 22, 26, 28, 36, 44, 56)
- Group by Micro / Small / Medium / Large / XL (per §3.5.C)
- Show a few common composed examples: card padding (`18px 18px 16px`), section rhythm (`marginBottom: 26`)

#### 6. Card surface taxonomy
- The three surfaces from §3.5.D rendered side-by-side with sample content in each:
  - **Cream-cardstock:** `rgba(248,241,225,0.92)` + `1px solid #CDBE9E`
  - **Tinted (per element):** `${pigment}10` + `1px solid ${pigment}40` — show all five element variants
  - **Quiet secondary:** `#EBE5D6` + `1px solid #DCD3C0`
- Annotate when to use which

#### 7. Component primitives (visual library)
Render each in two states (default + locked/inactive where applicable), with the source line from the anchor in a code comment:
- Stem seal (84×84, radius 16, cream-cardstock, hanzi glyph)
- Segmented bar (8 cells, radius 1, gap 3, height 8)
- Identity ribbon header (stem seal + italic element + chip + saturation %)
- BlueprintRow (icon | italic name | segmented bar | count)
- Force row (36×36 tinted icon + Cormorant 16 archetype name)
- Lock icon + lock strip (`#EBE5D6` quiet card variant)
- Pair card (tinted surface, two columns)
- CTA pill (ink bg, silk text, radius 999, Cinzel tracked caps)
- Secondary microcopy chip (cream pill, italic, dashed underline option)

#### 8. Italic usage gallery
- All five italic contexts from §3.5.E rendered in situ
- Mark the forbidden contexts (eyebrows, archetype titles, CTAs) with explicit ✗ examples

#### 9. Border palette
- The five border tokens from §3.5.F as 1px hairlines on cream
- Element-tinted borders (`${pigment}40`) for all five elements
- Dashed-border interaction style on the "Birth chart →" example

#### 10. Anti-patterns
A side-by-side ✓ / ✗ section showing common drifts:
- Off-ladder alpha (`${fire}25` ✗ vs `${fire}1A` ✓)
- Out-of-scale radius (`borderRadius: 8` ✗ vs `borderRadius: 12` ✓)
- Off-scale spacing (`gap: 30` ✗ vs `gap: 28` ✓)
- Bold archetype title ("**The Blade**" 600 ✗ vs "The Blade" 400 ✓)
- Italic CTA ("*Discover Yours*" ✗ vs "Discover Yours" ✓)

#### 11. Page templates (schematic)
Two annotated wireframes (no decorative content — boxes + labels only):
- **Reveal page** — top mountain band (fixed) → identity ribbon → archetype title block → blueprint card → composition rows → bottom islands band (fixed) → CTA
- **Energy Map page** — top band → header eyebrow + birth chart link → blueprint card → forces section → pair card → secondary cards → bottom band → tab bar

Each schematic should label the spacing rhythm used between sections (e.g. "marginBottom: 26").

#### 12. Open questions / drift log
List anything where the four inputs disagree or are silent. Examples to look for:
- Anchor uses opaque `paperHair #CDBE9E` for borders; current app `tokens.jsx` defines `BORDER_LIGHT` as `rgba(139,115,85,0.18)` — which is canonical?
- Spacing values not in the §3.5.C list but found in the canvas references — flag them.
- Components in the canvas references that aren't covered in §3.5 — flag them.

---

## §3 — Acceptance criteria

The legend is done when:

1. Every section above is rendered with at least one visual, one value, and one rule citation.
2. The legend opens as a single HTML file with no build step. Loads fonts from a CDN.
3. The aesthetic matches the app — silk/ink/bronze, EB Garamond + Cormorant + Cinzel, eyebrows in the §3 locked format.
4. Every primitive value (color, radius, spacing, font weight) is traceable to either DOC5 §2/§3/§3.5 or a specific line in `northstar-anchor.html`.
5. Section 12 (Drift log) lists at least the known divergence between the anchor and the current `tokens.jsx`.

---

## §4 — What this prompt deliberately does NOT ask for

- No new components
- No new screens
- No new color palette
- No reinterpretation of the aesthetic
- No animation specs (those live in §4 of DOC5 and are out of scope for the legend)
- No copywriting

If the canvas suggests any of the above, push back and ask it to revise.

---

## §5 — After the legend is delivered

Once the legend HTML is approved, we use it to:
1. Audit the live app code (`Elementum_App/src/`) for drift — components, tokens, spacing values that don't conform.
2. Patch `tokens.jsx` so app tokens match the anchor (the §3.5 application note flags this).
3. Lock the legend itself as `Design/legend-primitives.html` — a permanent reference checked into the repo alongside `northstar-anchor.html`.
4. Use the legend as the visual brief for any future screen (the legend defines what's *available*; new screens compose from the legend, never invent outside it).
