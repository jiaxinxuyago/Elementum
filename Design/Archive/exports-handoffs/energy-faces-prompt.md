# Energy Faces screen — Claude Design prompt

**Pairs with `energy-faces-current.html`** (same folder) — that file is a faithful,
self-contained render of the screen *as it exists today*; this prompt is the brief
for elevating it. Upload BOTH to the claude.ai/design session, plus the ink-wash
style references. The canvas is sandboxed (no repo/web access), so everything it
needs is inlined below and in the HTML.

Repo source of truth: `Design/handoff-claude-design/briefs/brief-energy-faces.md`
(Brief 8). Scope = bespoke visual elevation of an already-built, function-complete
screen — not a redesign of its structure.

---

## Paste into claude.ai/design

```
Elementum — Energy Faces screen (bespoke UI/UX pass)

Design a polished mobile screen (390px wide) for a contemplative Chinese-
astrology reading app. AESTHETIC: ink-wash (水墨) on warm paper — cream/silk
backgrounds (#F8F6F0 / #F1E9D6), serif type (Cormorant Garamond for display,
EB Garamond for body), NO italics ever, soft painted mountain grounds, calm
generous spacing. Five element pigments: Metal #8BA3B8 (slate-blue), Wood
#7A9E6E (green), Fire #C4745A (coral), Earth #B89A6A (tan), Water #5A7FA8
(blue). Dark-pill CTAs (#2B2722 bg, cream text, uppercase letterspaced).
Headers: back-chevron + small uppercase letterspaced eyebrow at 54px top
inset. No phone bezel, no mock status bar, no bottom tab bar on these screens.

PURPOSE: an energy in someone's chart speaks in one or two "voices" (polarity
Ten-God personas). This screen reveals those faces, shows which leads, and
lets the user tap into each one's reading. The attached HTML shows the current
build; match its structure and content, lift its finish.

DESIGN THESE 6 STATES AS FRAMES:
1. TWO FACES (hero — Wood/green): top = a horizontal "dominant energy"
   briefing card: element mark in a tinted roundel + "Wood 木"; sub "dominant ·
   33% of your chart"; badge "↑ catalyst" (green); a yin/yang split bar (two
   tints of the element pigment) labeled "偏财 The Horizon · 26%" | "74% · The
   Steward 正财"; brief "Your wealth & desire — value built and kept"; dark
   pill "READ THE WOOD ENERGY →". Below: label "ITS TWO FACES", then two
   portrait character cards side by side. Each: a tall character-art slot
   (PLACEHOLDER — frame + soft scrim; portrait added later), persona name
   (Cormorant, e.g. "The Steward"), register line "正财 · yin · 74%", one-line
   abstract "Value built and kept", small dark "READ →" pill, a subtle yin/yang
   register mark. The leading face gets a "LEADS" badge + a stronger
   element-tinted border.
2. SINGLE FACE (Earth/tan): same dominant card minus the split bar; label "ITS
   FACE"; one portrait card in the LEFT column (not stretched full-width).
3. GHOST/SCARCE: an energy barely present (≤3%) — same layout, drained register
   (grayed art, muted ink).
4. ELEMENT (substance) READING — from the dominant card's CTA: scene-hero band
   (element art + "WOOD · 33% OF YOUR CHART" + "Wood in you") + role badges + a
   short "what this energy is" (R) layer and "how it moves in you" (X) layer.
   Eyebrow "WOOD · YOUR ENERGY".
5. PERSONA READING — from a face card: scene-hero + persona line "Wood in you is
   The Steward — …" + R/X reading layers + a locked "Seeker" upgrade strip
   (advisor-purple accent, lock icon, "Unlock" pill) + a quiet "Why Wood meets
   Metal — the cycle" expander. Eyebrow "WOOD · THE STEWARD".
6. LOCKED = the Seeker strip lives INSIDE the persona reading, never in front of
   the face.

ACCEPTANCE:
- All 6 states designed.
- Dominant card order: element mark + name + 汉字 · dominance sub · catalyst↑/
  friction↓ badge · (two-face only) yin/yang split bar with both %s · brief ·
  element-read CTA.
- Face card: art slot · persona name · register (汉字 · yin/yang · %) · subtle
  yin/yang mark · abstract · READ; lead face marked.
- Element pigment drives the roundel tint, split-bar tints, lead-card border,
  and READ pills — applied per element across all five.
- Eyebrows: persona read "ELEMENT · PERSONA"; element read "ELEMENT · YOUR
  ENERGY"; faces page "YOUR ENERGIES" — all back-chevron, 54px inset.
- No italics, no mock status bar, no tab bar on these stacked screens.

OUT OF SCOPE: the actual character illustrations (design the SLOT + its
treatment only — portraits are a separate set); reading copy; engine math.

Match the register of the attached reference images (current screen HTML +
ink-wash style refs).
```

---

## What to attach to the session
1. `energy-faces-current.html` — the current build (this folder).
2. The ink-wash style references in `Design/handoff-claude-design/reference-art/`.
3. Optionally `00-MASTER-CONTEXT.md` for the global design system.

## Canonical content (the 庚 "The Blade" reference chart)
- Wood (财, catalyst, 33%): two faces — **The Steward** (正财/yin, 74%, leads) +
  **The Horizon** (偏财/yang, 26%).
- Earth (印, friction, 33%): one face — **The Alchemist** (偏印/yang).
- Persona definition lines (mandatory on first appearance): Steward = "methodical,
  directed acquisition — value built and kept"; Horizon = "wide-ranging engagement
  — opportunity sensed at a distance"; Alchemist = "unconventional nourishment —
  insight that transmutes".
