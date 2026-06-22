# Brief 3 — Profile + chart tools

> Inherits `00-MASTER-CONTEXT.md` — scope = consistency + polish only (§0), not a redesign.

## Screens in scope
- Profile: `#/app-profile` — `screens/37-profile.png`
- Chart Resonance: `#/chart-resonance` — `screens/38-resonance.png`
- (Also referenced from Profile: birth chart view, edit birth data, plan/upgrade.)

## Job to be done
A calm "your account & your chart facts" home: confirm birth data, manage the
daily reading, see/upgrade the plan, and reach chart tools — minimal by design,
but consistent with the rest of the app.

## Current state & problems
- Header is correct (`PROFILE · 个 人` / "Me"). Birth-data card, daily-reading
  toggle, current-plan row exist and read well.
- Make the section system here the **canonical settings/data pattern** (labeled
  data grid, toggle row, plan row, link rows) and ensure sub-flows
  (birth chart, edit, resonance, upgrade) are reachable and designed — confirm no
  dead links.
- `chart-resonance` (`38-resonance.png`) looks sparse — design its full arc.

## The bespoke journey (states)
- **Profile (default):** birth-data card (date · time · true-solar · location ·
  energy current) with "location not confirmed" note when applicable; "View birth
  chart →" + "Edit →"; daily-reading toggle row; current-plan row → upgrade.
- **Edit birth data:** the onboarding inputs reused inline (consistent wheels/fields).
- **Chart Resonance** (recover an unknown birth hour): intro (why) → a few
  resonance questions → discovered 时辰 + confidence + "apply" CTA.
- **Plan/upgrade:** the tier comparison (shared upgrade modal).
- **Edge:** no chart yet — prompt to complete onboarding.

## Layout spec
- Labeled data grid: 10px bronze uppercase labels + value (Cormorant/EB).
- Toggle row + divider; plan row with a tier chip.
- Resonance: one question per view with progress; warm, low-pressure.

## Acceptance criteria (quantifiable)
- [ ] Profile default + Edit + Resonance(intro→questions→result) + Plan/upgrade designed (≥5 frames).
- [ ] Header = `PROFILE · 个 人` + "Me", 54px inset.
- [ ] Settings/data uses ONE pattern (data grid + toggle row + link/plan rows) reused.
- [ ] Every Profile link resolves to a designed destination (no dead ends).
- [ ] No italics; icons-only tab bar present; no mock status bar.

## Out of scope
- Real auth/billing screens, engine logic.
