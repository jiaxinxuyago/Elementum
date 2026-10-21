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
// Owner 2026-10-21 (L1 A, confirmed): Your Almanac stays on the dev site until
// its batch lands and the owner has read the pages again.
export const ALMANAC_LIVE = false;
// Your Almanac's personal reminders (P4 A): the app posts its schedule only
// when this is on. Turn on after the owner applies migration 0004 and deploys
// the push worker with ALMANAC_PUSH = '1' (steps: ComparativeAnalysis/Handoffs/
// 2026-10-19-event-signature/P4_STEPS.md).
export const ALMANAC_PUSH = false;
