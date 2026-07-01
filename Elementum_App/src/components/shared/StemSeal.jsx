// ===================================================================
// ELEMENTUM · StemSeal  (Rendered Screens v2 · ink-wash ceremonial seal)
// ===================================================================
// The painterly enso stem seal — one transparent ink-wash PNG per
// Heavenly Stem (庚 = blade-in-enso, etc.), element-pigmented. Reserved
// for ceremonial "one-subject" moments: the identity-card day-master,
// the Reveal / Energy Map hero, the reading-detail hero crown, and the
// compatibility portraits (Iconography doc · Tier 2).
//
// The enso ring is baked into each PNG, so this is just a sized <img>.
// Accepts a stem as hanzi (庚) or pinyin (geng).
// ===================================================================

const STEM_TO_PINYIN = {
  '甲': 'jia',  '乙': 'yi',
  '丙': 'bing', '丁': 'ding',
  '戊': 'wu',   '己': 'ji',
  '庚': 'geng', '辛': 'xin',
  '壬': 'ren',  '癸': 'gui',
};

const VALID = new Set(Object.values(STEM_TO_PINYIN));

// Resolve a stem (hanzi or pinyin) → /concept-arts/stems/<pinyin>.png, or null.
export function stemSealSrc(stem) {
  if (!stem) return null;
  const py = STEM_TO_PINYIN[stem] || (VALID.has(stem) ? stem : null);
  return py ? `/concept-arts/stems/${py}.png` : null;
}

export default function StemSeal({ stem, size = 88, style, className }) {
  const src = stemSealSrc(stem);
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      style={{
        width: size, height: size,
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
    />
  );
}
