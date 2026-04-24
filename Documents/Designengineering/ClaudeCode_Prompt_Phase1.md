# Claude Code Prompt — Elementum Phase 1 Build

> Paste this into a new Claude Code session opened in the `Elementum_Project` folder.

---

I'm building a React app called Elementum — a BaZi (Chinese astrology) personal energy reading app. The design phase is complete. Your job is to build the app as a Vite + React project.

**Before writing any code, read these files in full:**

1. `Documents/Designengineering/DOC_HANDOFF_ClaudeCode.md` — the full brief. Start here.
2. `Documents/Designengineering/DOC5_App_Design.md` — the screen-by-screen UI spec (primary reference).
3. `Documents/Designengineering/DOC8_Code_Architecture_and_Migration.md` — the target folder structure and build instructions.
4. `Design/source/design_tokens.js` — the complete Ink & Pigment design system: exact colors, SVG primitives (SilkPaper, DistantRidge, ElementSign), and component patterns.
5. `Design/source/screen_welcome.js` — the Welcome screen, fully implemented.

**Your first and only task right now is Milestone 1:**

1. Scaffold the Vite project at `Elementum_Project/elementum-app/` using the folder structure in DOC8.
2. Create `src/styles/tokens.js` — copy all palette constants and SVG primitive components verbatim from `Design/source/design_tokens.js`. This is the design system foundation. Every component will import from here.
3. Build `src/components/onboarding/WelcomeScreen.jsx` from `Design/source/screen_welcome.js`. Adapt the JSX for Vite module imports, but keep all visual code — colors, SVG components, animations, typography — identical to the source file. The tagline is: *"Your elemental energy, read from the moment you were born."*
4. Wire `WelcomeScreen` as the default route in `App.jsx` so it renders at `/`.
5. Run `npm run dev` and confirm the following render correctly in the browser:
   - SilkPaper silk texture background
   - DistantRidge ink horizon behind the hero zone
   - 元 素 Chinese title + ELEMENTUM Latin title in correct typography
   - Tagline in EB Garamond italic, `#5C554D`
   - Bronze CTA button at `#6b5339`
   - Enso SVG draw-on animation on load

**Do not build anything beyond Milestone 1 until the Welcome screen is visually confirmed.**

Once the Welcome screen is running, show me `npm run dev` output and a description of what renders. I will sign off visually before you continue to the onboarding steps.

The full build sequence after Milestone 1 is in `DOC_HANDOFF_ClaudeCode.md` §"Build order".
