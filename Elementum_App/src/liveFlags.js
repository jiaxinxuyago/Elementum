// ===================================================================
// ELEMENTUM · the live switches (owner 2026-10-21)
// ===================================================================
// "after all content are piped in, we port them into the official link":
// the sections the parallel sessions built on the dev site go live on
// elementum.life. One place for the product switches; the dev-only TOOLING
// (DevBar, window hooks, demo flips) stays on IS_DEV_TOOLS.
//   DEPTH_LIVE    Domains, Life Chapters, Stars and the Energy Blueprint on
//                 Your reading, their pages and doors (the Today decade tile,
//                 the pillar chart, the Guidance Energy Manual → Domains)
//   ALMANAC_LIVE  Your Almanac: the Today hub, Day, Month and Year pages
//   ALMANAC_PUSH  Your Almanac's personal reminders (the schedule the app posts)
// The merge has its own switch (components/journey/mergeFlag.js).
// Units still unwritten keep their draft lines; the "draft" tag shows on the
// dev site only (main.jsx marks the live build).
// ===================================================================
export const DEPTH_LIVE = true;
// Owner 2026-10-21: "Make it live" (after the batch landed: 378 units, every
// Almanac key written). Unwritten lines it reads from other sections are hidden
// on elementum.life.
export const ALMANAC_LIVE = true;
// Your Almanac's personal reminders (P4 A): the app posts its schedule only
// when this is on. Turn on after the owner applies migration 0004 and deploys
// the push worker with ALMANAC_PUSH = '1' (steps: ComparativeAnalysis/Handoffs/
// 2026-10-19-event-signature/P4_STEPS.md).
export const ALMANAC_PUSH = false;
// V5 "The Combination" (owner rulings 2026-10-21, DES_15 R1–R11 A; owner: "Build
// it directly into elementum.life in one shot"): the album hub on Your reading,
// long sections read as cards, the energy pager, the balance on "How am I
// running?", the existing element plate in the energy sheet, Today as home for
// return visits with Continue reading. Turn off to restore the previous layout.
export const V5_LIVE = true;
// The energy reading journey (owner rulings 2026-10-22, DES_15 EJ1 C, EJ2–EJ8 A):
// the sheet trimmed to the cover, the energy page as a ladder (name, relation,
// function, character, what it means now, domains), the relation and the state
// and the character as boxes that open in place, the function and the domains
// as cards that push their pages. Turn off to restore the previous page.
export const EJ_LIVE = true;

// Card 8 and the share card (owner rulings 2026-10-22, DES_15 SC1 A · SC2 A ·
// SC3 A · SC4 C · SC5 A · SC6 A): card 8 is the door alone (where to begin, one
// button); the share card is the first card on the mist veil with the core line and the Release/Grow groups (SC3 revised 2026-10-23, FN1 2026-10-25) and lives on the album,
// opened from the wheel tile. Turn off to restore card 8's two buttons and the
// A1 "tiles" card.
export const SC_LIVE = true;
