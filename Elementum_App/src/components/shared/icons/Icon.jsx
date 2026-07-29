// ===================================================================
// ELEMENTUM · Icon (single-source <use href> pattern)
// ===================================================================
// Generic SVG icon component that resolves IDs from the canonical
// shared library at /icons.svg (mirrors Design/Source/icons.svg).
//
// Usage:
//   <Icon id="el-metal" size={22} color={metalDeep} />
//   <Icon id="tab-reading" size={22} />
//   <Icon id="dm-geng" size={84} color={metalDeep} />
//
// Why <use href> instead of inline <svg>:
//   · Single source of truth — paths live in Design/Source/icons.svg only
//   · No transcription drift between legend HTMLs and React components
//   · Browser caches /icons.svg once; multiple <use>s share one fetch
//   · CSS `color` propagates to icon strokes via `currentColor`
//   · Size changes don't require re-rendering paths
//
// API:
//   id      — icon ID matching a <symbol id="…"> in /icons.svg.
//             See ICON_IDS export below for the typed-friendly list.
//   size    — width + height in px (default 24)
//   color   — sets `currentColor` for the icon. Pass any token from
//             tokens.js (e.g. metalDeep, ink, bronzeDark)
//   className, style, ...rest — forwarded to the <svg> root
//
// CONVENTION: every <symbol> in icons.svg is 24×24 viewBox and uses
// currentColor — but two visual families coexist (see icons.svg header):
//   · LINE family       — stroke=currentColor, fill=none, sw 1.7 default.
//   · SILHOUETTE family — fill=currentColor, no stroke. (el-* Set E3 +
//                          v7 ink-wash dm-* Yang stems.)
// Both honour the host `color` prop transparently.
// ===================================================================

export default function Icon({
  id,
  size = 24,
  color,
  className,
  style,
  ariaLabel,
  ...rest
}) {
  const inlineStyle = {
    width: size,
    height: size,
    display: 'block',
    flexShrink: 0,
    ...(color ? { color } : null),
    ...style,
  };
  return (
    <svg
      className={className}
      style={inlineStyle}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      focusable="false"
      {...rest}
    >
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}

// ===================================================================
// ICON_IDS — the canonical list of valid icon IDs.
// Mirrors the <symbol id="…"> entries in Design/Source/icons.svg.
// Use as the source-of-truth when you need to validate or enumerate
// available icons (e.g. for a story / catalogue / dev panel).
// ===================================================================
export const ICON_IDS = Object.freeze({
  // Five elements — Set E3 sealed silhouettes (production)
  elements: ['el-metal', 'el-wood', 'el-fire', 'el-earth', 'el-water'],
  // Ten Heavenly Stems (day-master):
  //   Yang (jia, bing, wu, geng, ren) — v7 ink-wash silhouettes, sealed.
  //   Yin  (yi, ding, ji, xin, gui)   — v4 line placeholders pending brushwork.
  dayMasters: ['dm-jia', 'dm-yi', 'dm-bing', 'dm-ding', 'dm-wu',
               'dm-ji',  'dm-geng', 'dm-xin', 'dm-ren', 'dm-gui'],
  // Bottom tab nav (DES_04 §AM.2 — icons-only, Reading in centre)
  tabs: ['tab-today', 'tab-guidance', 'tab-reading', 'tab-compat', 'tab-profile'],
  // Reading-section catalogue — PLACEHOLDER per amendment §A6
  readings: ['read-elemental', 'read-dominant', 'read-forces',
             'read-chapters', 'read-pillars'],
  // Utility / chrome
  utility: ['ico-lock', 'ico-chev-r', 'ico-chev-l', 'ico-back',
            'ico-arrow-r', 'ico-dismiss', 'ico-sunrise', 'ico-empty',
            'ico-edit'],
});

// Flat list for `id in VALID_IDS` style guards
export const VALID_IDS = new Set([
  ...ICON_IDS.elements,
  ...ICON_IDS.dayMasters,
  ...ICON_IDS.tabs,
  ...ICON_IDS.readings,
  ...ICON_IDS.utility,
]);

// ===================================================================
// Convenience wrappers — type-friendly, self-documenting,
// optional. Plain `<Icon id="…">` is perfectly acceptable.
// ===================================================================

/**
 * ElementMark — render one of the five element marks.
 *   <ElementMark element="metal" size={22} color={metalDeep} />
 */
export function ElementMark({ element, ...rest }) {
  return <Icon id={`el-${element}`} {...rest} />;
}

/**
 * DayMasterMark — render one of the ten Heavenly Stem icons.
 *   <DayMasterMark stem="geng" size={84} color={metalDeep} />
 *
 * Yang stems (jia, bing, wu, geng, ren) render v7 ink-wash silhouettes.
 * Yin stems (yi, ding, ji, xin, gui) still render v4 line placeholders
 * until the ChatGPT brushwork dispatch returns — they will swap in-place
 * via the icons.svg edit (consumers auto-update).
 */
export function DayMasterMark({ stem, ...rest }) {
  return <Icon id={`dm-${stem}`} {...rest} />;
}

/**
 * TabIcon — render one of the five bottom-tab nav icons.
 *   <TabIcon tab="reading" size={22} />
 */
export function TabIcon({ tab, ...rest }) {
  return <Icon id={`tab-${tab}`} {...rest} />;
}

/**
 * ReadingMark — render one of the five reading-section icons.
 *   <ReadingMark section="elemental" size={20} color={metalDeep} />
 *
 * NOTE: these are placeholders (amendment §A6 / DA.9). Domain-specific
 * brushwork or refined illustration to be commissioned.
 */
export function ReadingMark({ section, ...rest }) {
  return <Icon id={`read-${section}`} {...rest} />;
}
