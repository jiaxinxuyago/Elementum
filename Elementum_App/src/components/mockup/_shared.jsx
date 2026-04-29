// ===================================================================
// ELEMENTUM · Mockup-only shared constants
//
// IdentityRibbon, StemSeal, SegmentedBar, and buildDm have been
// promoted to ../shared/IdentityRibbon.jsx so production code
// (RevealScreen) can import them without crossing into mockup
// territory. This file re-exports them for callers that imported
// from here historically, plus carries mockup-only color tokens.
// ===================================================================

export { IdentityRibbon, StemSeal, SegmentedBar, LockIcon, buildDm } from '../shared/IdentityRibbon.jsx';

export const PAGE_BG = '#EFE5CC';
export const CARD_BG = '#EBE5D6';
export const CARD_BORDER = '#DCD3C0';
export const TAG_GREY = '#8C8273';
export const TITLE_INK = '#2C2825';
