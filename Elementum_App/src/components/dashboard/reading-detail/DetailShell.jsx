// ===================================================================
// ELEMENTUM · DetailShell  (Variant A — sticky chapter header)
// ===================================================================
// Shared wrapper for any reading-detail page. Variant A from Claude
// Design's consolidated wireframes:
//
//   · Hero bleeds to the top edge INSIDE the scroll container, so it
//     scrolls away with the rest of the page.
//   · A "sticky chapter header" pins to the top of the scroll once the
//     hero leaves — eyebrow `idx / total` + progress bar + page title.
//   · Optional `verse` + `verseSubtitle` block sits below the sticky bar.
//   · Bottom prev/next pager carries the previous/next page title.
//
// Pages opt in via:
//   <DetailShell hero={{...}} sectionKey="read-elemental" verse="…"
//                verseSubtitle="…" pigment={pig}>
//     <SectionCard …/>
//   </DetailShell>
// ===================================================================

import { Icon } from '../../shared/icons';
import PageBg from '../../shared/PageBg.jsx';
import { SceneHero } from '../VisualTile.jsx';
import { getReadingSections } from './sections.js';
import { useChart } from '../../../store/chartContext.jsx';
import StemSeal from '../../shared/StemSeal.jsx';
import {
  ink, inkSoft, inkLight, bronzeDark, paperHair, silk, cardstockBg,
  withAlpha,
} from '../../../styles/tokens';

export default function DetailShell({
  onBack,
  eyebrow,                 // text-mode eyebrow, e.g. "ELEMENTAL NATURE · 元素之性"
  title,                   // text-mode title
  pigment,                 // optional — tints the eyebrow / hero veil / progress
  hero,                    // optional { element, artSrc, eyebrow, title, subtitle, height } → hero mode
  sealStem,                // optional — crowns the hero with the ink-wash stem seal (v2)
  verse,                   // optional centered verse line
  verseSubtitle,           // optional italic subtitle below the verse
  sectionKey,              // optional FLOW route key → enables prev/next + sticky progress
  background = silk,
  bg,                      // optional { src, opacity, gradient } painted background
  children,
}) {
  const { chart } = useChart();
  const eyebrowColor = pigment ? withAlpha(pigment, 'CC') : bronzeDark;
  const heroMode = !!hero;

  // Reading-sequence position — drives the sticky progress + bottom pager.
  const sections = sectionKey ? getReadingSections(chart) : [];
  const idx = sectionKey ? sections.findIndex((s) => s.key === sectionKey) : -1;
  const total = sections.length;
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx >= 0 && idx < sections.length - 1 ? sections[idx + 1] : null;
  const goSection = (key) => () => { if (typeof window !== 'undefined') window.location.hash = `#/${key}`; };

  const pageTitle = hero?.title || title || '';
  const progressPct = idx >= 0 ? ((idx + 1) / Math.max(1, total)) * 100 : 0;

  return (
    <div style={{
      // Definite, bounded height + overflow:hidden so the absolutely-
      // positioned scroll container below actually scrolls within the
      // 844 phone frame (mirrors DashboardShell). Using minHeight here
      // let the whole stack grow past the frame and clip the bottom.
      position: 'relative', height: '100%',
      background, overflow: 'hidden',
    }}>
      {/* Painted background layer (behind body content) */}
      {bg && <PageBg src={bg.src} opacity={bg.opacity} gradient={bg.gradient} />}

      {/* Back button — floats top-left, sits above hero + sticky bar. */}
      <button
        type="button"
        aria-label="Back"
        onClick={onBack}
        style={{
          position: 'absolute',
          top: heroMode ? 52 : 56, left: 16,
          width: 36, height: 36,
          borderRadius: 999,
          background: heroMode ? 'rgba(248,246,240,0.85)' : 'transparent',
          backdropFilter: heroMode ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: heroMode ? 'blur(8px)' : 'none',
          border: 'none', color: inkSoft, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 20,
          boxShadow: heroMode ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        <Icon id="ico-back" size={heroMode ? 20 : 22} />
      </button>

      {/* Scroll container — absolutely fills the frame so it's bounded and
          scrolls; owns the hero, sticky bar, and body. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch',
      }}>
        {/* Hero — bleeds to top, scrolls away with the page. In v2 the
            day-master reading wears the ceremonial ink-wash stem seal,
            crowning the painting above the title. */}
        {heroMode && (
          <div style={{ position: 'relative' }}>
            <SceneHero
              element={hero.element || pigment}
              pigment={hero.element || pigment}
              artSrc={hero.artSrc}
              eyebrow={hero.eyebrow}
              title={hero.title}
              subtitle={hero.subtitle}
              height={hero.height || 248}
              radius={0}
              contentBottom={18}
            />
            {sealStem && (
              <StemSeal
                stem={sealStem}
                size={84}
                style={{
                  position: 'absolute', left: 16, bottom: 92, zIndex: 4,
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.28))',
                }}
              />
            )}
          </div>
        )}

        {/* Text-mode header — only in non-hero pages */}
        {!heroMode && (
          <header style={{
            padding: '56px 22px 12px',
            marginLeft: 36,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
              color: eyebrowColor, fontWeight: 500,
            }}>{eyebrow}</span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 32, fontWeight: 400, lineHeight: 1.15, color: ink, margin: 0,
            }}>{title}</h1>
          </header>
        )}

        {/* Sticky chapter header — pins to top once the hero leaves. */}
        {idx >= 0 && (
          <div style={{
            position: 'sticky', top: 0, zIndex: 5,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 18px',
            background: 'rgba(241, 233, 214, 0.94)',
            borderBottom: `1px solid ${paperHair}`,
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase',
              color: inkLight, fontWeight: 500, minWidth: 30,
            }}>{idx + 1} / {total}</span>
            <div aria-hidden="true" style={{
              flex: 1, height: 4, borderRadius: 999,
              background: paperHair, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${progressPct}%`,
                background: pigment ? withAlpha(pigment, 'CC') : bronzeDark,
                borderRadius: 999,
                transition: 'width 200ms ease',
              }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 13, color: ink, fontWeight: 500,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              maxWidth: 140,
            }}>{pageTitle}</span>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '6px 22px 24px' }}>
          {/* Optional verse + verseSubtitle */}
          {(verse || verseSubtitle) && (
            <div style={{ textAlign: 'center', margin: '18px 0 16px' }}>
              {verse && (
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22, color: ink, lineHeight: 1.2,
                }}>{verse}</div>
              )}
              {verseSubtitle && (
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 13, color: inkLight, marginTop: 6,
                }}>{verseSubtitle}</div>
              )}
            </div>
          )}

          {/* Page content */}
          {children}

          {/* Prev/next pager — names the destination page */}
          {idx >= 0 && (
            <nav aria-label="Reading sequence" style={{
              display: 'flex', alignItems: 'stretch', gap: 10, margin: '20px 0 8px',
            }}>
              <SeqButton dir="prev" section={prev} onClick={prev ? goSection(prev.key) : undefined} />
              <div style={{
                flexShrink: 0, alignSelf: 'center',
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5,
                letterSpacing: 0.5, color: inkLight, padding: '0 4px',
              }}>{idx + 1} of {total}</div>
              <SeqButton dir="next" section={next} onClick={next ? goSection(next.key) : undefined} />
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

// Prev/next pager button. Disabled (dimmed) at the ends.
function SeqButton({ dir, section, onClick }) {
  const isNext = dir === 'next';
  const enabled = !!section;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={enabled ? `${isNext ? 'Next' : 'Previous'}: ${section.tag}` : undefined}
      style={{
        flex: 1, minWidth: 0,
        appearance: 'none', cursor: enabled ? 'pointer' : 'default',
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 12, padding: '10px 12px',
        opacity: enabled ? 1 : 0.4,
        display: 'flex', alignItems: 'center', gap: 8,
        justifyContent: isNext ? 'flex-end' : 'flex-start',
        textAlign: isNext ? 'right' : 'left',
      }}
    >
      {!isNext && <Icon id="ico-chev-l" size={15} color={bronzeDark} />}
      <span style={{ minWidth: 0 }}>
        <span style={{
          display: 'block', fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: inkLight,
        }}>{isNext ? 'Next' : 'Previous'}</span>
        <span style={{
          display: 'block', fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 15, fontWeight: 500, color: ink, lineHeight: 1.15,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{section ? section.tag : '—'}</span>
      </span>
      {isNext && <Icon id="ico-chev-r" size={15} color={bronzeDark} />}
    </button>
  );
}
