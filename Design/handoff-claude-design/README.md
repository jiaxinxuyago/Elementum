# Claude Design handoff — Elementum UI/UX consistency + polish pass

> **Scope: consistency alignment + visual polish ONLY — NOT a redesign.** See §0
> of `00-MASTER-CONTEXT.md`. Preserve existing layouts, structure, content, and
> IA; bring drifted screens into line with the established patterns and refine finish.

This folder is the complete package for a Claude Design pass on Elementum's
major screens. Everything Claude Design needs is here (it can't open the live
app — it's sandboxed).

## Contents
- **`00-MASTER-CONTEXT.md`** — load once per session. Project, design language,
  IA, current-state assessment, global consistency rules, workflow.
- **`screens/`** — 38 clean, no-bezel, full-content PNG captures of every major
  screen in the *current* build (the "copy these screens" reference).
- **`index.html`** — open in a browser: a grouped gallery of all 38 screens with
  route + note. Good for a human overview before briefing.
- **`manifest.json`** — machine-readable list of the captures.
- **`briefs/`** — one focused per-page/per-journey brief. Run ONE at a time.
- **`reference-art/`** — (add ink-wash reference images here before uploading;
  see that folder's note). Claude Design can't paint raster, so it needs these.

## How to run a session (the short version)
1. In Claude Design, **upload**: the relevant `screens/*.png` + the
   `reference-art/*` images.
2. **Paste** `00-MASTER-CONTEXT.md`.
3. **Paste** one brief from `briefs/` (start with `brief-guidance-suite.md`).
4. Review the returned HTML mockup against that brief's **Acceptance criteria**.
5. Iterate that one screen, then move to the next brief.

## Suggested order
1. `brief-guidance-suite.md` (the lead — 5 features + hub)
2. `brief-compatibility.md`
3. `brief-profile.md`
4. `brief-reading-tab.md`
5. `brief-today-tab.md`
6. `brief-onboarding.md`

## Regenerating the screens
The captures come from `Elementum_App/design-handoff-capture.mjs`. With the dev
server running (`npm run dev`, port 5173): `node design-handoff-capture.mjs`.
Re-run after any UI change so the reference stays current.
