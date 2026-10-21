// ===================================================================
// ELEMENTUM · V5 reading state (DES_15 R3/R4): what this device has read,
// where the reader stopped, and whether Your reading has been seen (so later
// visits open on Today). Per device, in localStorage; no reading content.
// ===================================================================
export const RK = 'elm.v5.read';
export const LK = 'elm.v5.last';
export const MK = 'elm.v5.mode';
export const SEEN = 'elm.v5.seenReading';
export const rj = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') ?? d; } catch { return d; } };
export const wj = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage off */ } };

export const readMap = () => rj(RK, {});
export const markRead = (id) => { const r = readMap(); if (!r[id]) { r[id] = Date.now(); wj(RK, r); window.dispatchEvent(new Event('v5-read')); } };
export const getLast = () => rj(LK, null);
export const setLast = (o) => wj(LK, { ...o, at: Date.now() });
export const markSeenReading = () => { try { localStorage.setItem(SEEN, '1'); } catch { /* storage off */ } };
export const hasSeenReading = () => { try { return localStorage.getItem(SEEN) === '1'; } catch { return false; } };

// The sections the hub counts (R4). Titles are the sections' own names.
export const V5_SECTIONS = {
  run: { title: 'How am I running?', route: 'section:run' },
  energies: { title: 'Your five energies', route: 'app-reading' },
  domains: { title: 'Your domains', route: 'section:domains' },
  chapters: { title: 'Your life chapters', route: 'section:chapters' },
  stars: { title: 'Your stars', route: 'section:stars' },
  blueprint: { title: 'Your energy blueprint', route: 'section:blueprint' },
};
