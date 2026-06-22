# Brief 2 — Compatibility ("Friends") journey

> Inherits `00-MASTER-CONTEXT.md` — scope = consistency + polish only (§0), not a redesign.

## Screens in scope
- Intro: `#/app-compat` — `screens/34-compat-intro.png`
- Input: (state) — `screens/35-compat-input.png`
- Result: (state) — `screens/36-compat-result.png`

## Job to be done
Let someone compare their energy with a friend/family/partner and get a
relationship reading that's delightful to receive and to share.

## Current state & problems
- Three phases exist (intro → input → result) and the header was just unified to
  the eyebrow+title pattern (`COMPATIBILITY · 合 盘` / "Friends"). Keep that.
- The three phases were styled somewhat independently; tighten into one coherent
  arc with shared components. The result phase carries a lot (versus pair, score
  medallion, archetype, reading, share card, Free teaser vs Seeker full) — give
  it a clear vertical rhythm.

## The bespoke journey (states)
- **Intro (empty):** eyebrow+title header; centered dual-seal hero (the user's
  seal + an empty dashed slot) + "Compare with someone" CTA + tier line.
- **Input:** other-person form (name, birth date Y/M/D, optional hour, energy
  current). Calm, grouped; clear primary "Calculate Compatibility".
- **Loading:** a brief computing state (two seals drawing toward each other).
- **Result:**
  - Versus pair (two PersonCells) with a **score medallion bridging the seam**.
  - Relationship archetype line (`X meets Y` eyebrow + "Archetype" title + headline).
  - **Seeker:** full reading section-card + a **share card** (dark, shareable).
  - **Free:** teaser section-card + upgrade gate ("Unlock the full reading").
  - "Compare someone else →" reset.
- **Edge:** no chart yet (pre-onboarding) — graceful prompt, no crash.

## Layout spec
- Reuse the shared section-card; PersonCell becomes a documented component.
- Score medallion: conic ring, element-pigment fill, cream center, % numeral
  (JetBrains Mono numerals).
- Share card: ink background, two element marks, "We're N% compatible — X meets Y",
  small Elementum wordmark. Should look intentional as a social asset.

## Acceptance criteria (quantifiable)
- [ ] Intro/Input/Result + Loading + Free-vs-Seeker result variants all designed (≥5 frames).
- [ ] Header = `COMPATIBILITY · 合 盘` eyebrow + "Friends" title, 54px inset.
- [ ] Result shows, in order: versus pair + score medallion → archetype block →
      (reading | teaser) → (share card | upgrade gate) → reset link.
- [ ] Reuses shared section-card + the documented PersonCell + medallion.
- [ ] No italics; icons-only tab bar present; no mock status bar.

## Out of scope
- Compatibility engine output text, final painted PersonCell art.
