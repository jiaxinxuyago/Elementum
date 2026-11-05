// ===================================================================
// ELEMENTUM · the ink painting slots (owner 2026-10-27 → 11-05)
// ===================================================================
// One place for every painted slot on the Day Master page and the five-energy
// journey: the file each slot reads, a hook that falls back when a file is not
// painted yet, and the dev-only marker that shows where art is still owed.
// The style law, the prompts and the iteration log behind these files live in
// Design/Library/Design_Pass_2026-10/Ink_Painting_System.md.
//
//   D1–D3 + stage   /concept-arts/stems/dm/{py}-d{1,2,3}.png · {py}-stage.png
//   scroll strips   /concept-arts/pairs/strip_{core}_{el}.png   (Day Master card 4)
//   pair, 3:2       /concept-arts/pairs/pair_{core}_{el}.png    (energy page relation box)
//   energy hero     /concept-arts/energy/hero_{el}_{yang|yin}.png (energy page name band, energy sheet)
// ===================================================================
import { useEffect, useState } from 'react';
import { IS_DEV_TOOLS } from '../../devtools.js';

const STEM_PY = { 甲: 'jia', 乙: 'yi', 丙: 'bing', 丁: 'ding', 戊: 'wu', 己: 'ji', 庚: 'geng', 辛: 'xin', 壬: 'ren', 癸: 'gui' };
const STEM_ELK = { 甲: 'wood', 乙: 'wood', 丙: 'fire', 丁: 'fire', 戊: 'earth', 己: 'earth', 庚: 'metal', 辛: 'metal', 壬: 'water', 癸: 'water' };
const YANG = { 甲: 1, 丙: 1, 戊: 1, 庚: 1, 壬: 1 };

export const dmArt = (stem, n) => `/concept-arts/stems/dm/${STEM_PY[stem]}-d${n}.png`;
export const dmStage = (stem) => `/concept-arts/stems/dm/${STEM_PY[stem]}-stage.png`;
export const stripArt = (stem, el) => `/concept-arts/pairs/strip_${STEM_ELK[stem]}_${el}.png`;
export const energyHero = (el, stem) => (el ? `/concept-arts/energy/hero_${el}_${stem && !YANG[stem] ? 'yin' : 'yang'}.png` : null);

// The painted file when it exists, the fallback until it does. Starts on the
// fallback so a missing painting never flashes an empty band.
export function useArtSrc(src, fallback) {
  const [ok, setOk] = useState({});
  useEffect(() => {
    if (!src || ok[src] !== undefined) return undefined;
    let live = true;
    const im = new Image();
    im.onload = () => { if (live) setOk((o) => ({ ...o, [src]: true })); };
    im.onerror = () => { if (live) setOk((o) => ({ ...o, [src]: false })); };
    im.src = src;
    return () => { live = false; };
  }, [src, ok]);
  return { src: src && ok[src] ? src : fallback, painted: !!(src && ok[src]) };
}

// Dev only: a quiet marker naming the file a slot is waiting for.
export function ArtTodo({ path, className = '' }) {
  if (!IS_DEV_TOOLS || !path) return null;
  return <span className={`art-todo ${className}`} title={path}>art to come · {path.split('/').pop()}</span>;
}
