// ===================================================================
// ELEMENTUM · TodayScreen — Readings Hub (mosaic)
// ===================================================================
// Direction 2 / Hub from Claude Design's consolidated wireframes.
//
// The Today tab is no longer a daily-utility screen. It is now the
// "Readings Hub": a mosaic of nested time periods that all open into
// their own drill-down pages.
//
//   1. Header — "Your Readings / Across time"
//   2. Featured DAY tile (218) — painterly day-element art + the day's
//      phrase + open-today's-reading cue. Tap → app-day.
//   3. Themed pair (158, 2-col) — Month + Year tiles. Tap → app-month
//      / app-year.
//   4. Wide DECADE tile (150) — current 大运 with hanzi watermark.
//      Tap → app-decade.
//
// All the daily-utility content (Do/Avoid/Best Hours/Catalyst) now
// lives on the Day drill-down page (DayPage.jsx).
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { getDailyGuidance } from '../../../content/dailyGuidance.js';
import { elementArt, stemArt, tileArt, heroArt, dedupeArt } from '../../../styles/backgrounds.js';
import { MoodboardArt } from '../VisualTile.jsx';
import { Icon, ElementMark } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, silk,
  pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const WD_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// Short element-keyed phrases — the timeless cue for each tile.
const TODAY_PHRASE = {
  Metal: 'A day to cut clean',
  Wood:  'A day to grow',
  Fire:  'A day to express',
  Earth: 'A day to ground',
  Water: 'A day to flow',
};
const MONTH_PHRASE = {
  Metal: 'Refine',  Wood: 'Initiate', Fire: 'Show',
  Earth: 'Consolidate', Water: 'Reflect',
};
const YEAR_PHRASE = {
  Metal: 'Sharpen', Wood: 'Expand', Fire: 'Be seen',
  Earth: 'Build',   Water: 'Listen',
};

export default function TodayScreen({ onOpen }) {
  const { chart } = useChart();
  const guidance = getDailyGuidance(chart);
  const now = new Date();

  const dmElement = chart?.dayMaster?.element || 'Metal';

  // Day tile data
  const dayElement = guidance?.todayElement || dmElement;
  const dayStem    = guidance?.todayStem || '';
  const dayPhrase  = guidance?.label || TODAY_PHRASE[dayElement] || 'Today';

  // Month tile data
  const monthIdx   = now.getMonth();
  const monthLabel = MONTHS[monthIdx];
  const fm         = chart?.currentFlowMonth;
  const monthElement = fm?.stemElement || dmElement;
  const monthStemBr  = fm?.stem ? `${fm.stem}${fm.branch || ''}` : null;

  // Year tile data
  const year       = now.getFullYear();
  const fy         = chart?.currentFlowYear;
  const yearElement = fy?.stemElement || dmElement;
  const yearStemBr  = fy?.stem ? `${fy.stem}${fy.branch || ''}` : null;

  // Decade tile data
  const decade = (chart?.luckPillars || []).find((p) => p.isCurrent);
  const decadeElement = decade?.element || dmElement;
  const decadeYr = decade
    ? Math.min(10, Math.max(1, (year - decade.startYear) + 1))
    : null;

  const dateLabel = `${WD_SHORT[now.getDay()]} ${MONTHS[monthIdx].slice(0,3)} ${now.getDate()}`;

  // ── Design rule: no two thumbnails on this page share the same painting.
  // Day/Month/Year all use themed catalogue tiles; if two periods land on
  // the same element (e.g. Fire day + Fire year), the dedupe bumps the
  // later one to the next motif variant. Decade keeps its generic hero.
  const arts = React.useMemo(() => dedupeArt([
    { key: 'day',    kind: 'tile', element: dayElement,   stem: dayStem,   n: 1 },
    { key: 'month',  kind: 'tile', element: monthElement, stem: fm?.stem,  n: 1 },
    { key: 'year',   kind: 'tile', element: yearElement,  stem: fy?.stem,  n: 1 },
    { key: 'decade', kind: 'hero', n: 3 },
  ]), [dayElement, dayStem, monthElement, fm?.stem, yearElement, fy?.stem]);

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <header style={{ marginBottom: 14, padding: '0 2px' }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>Your Readings</span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 26, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '2px 0 0',
        }}>Across time</h1>
      </header>

      {/* Featured Day — themed catalogue tile (day's element + stem variant) */}
      <HubTile
        height={228}
        pigment={ELEMENT_TO_PIGMENT[dayElement]}
        artSrc={arts.day}
        meta={`Today · ${dateLabel} · ${dayElement} Day`}
        title={dayPhrase}
        chev
        chevSub={dayStem ? `${dayStem} · open today's reading` : "open today's reading"}
        onClick={() => onOpen?.('app-day')}
      />

      {/* Month + Year pair — themed catalogue tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <HubTile
          height={176}
          pigment={ELEMENT_TO_PIGMENT[monthElement]}
          artSrc={arts.month}
          meta="This Month"
          title={MONTH_PHRASE[monthElement] || 'Steady'}
          sub={monthStemBr ? `${monthLabel} · ${monthStemBr}` : `${monthLabel} · ${monthElement} Month`}
          onClick={() => onOpen?.('app-month')}
        />
        <HubTile
          height={176}
          pigment={ELEMENT_TO_PIGMENT[yearElement]}
          artSrc={arts.year}
          meta="This Year"
          title={YEAR_PHRASE[yearElement] || 'Steady'}
          sub={yearStemBr ? `${year} · ${yearStemBr}` : `${year} · ${yearElement} Year`}
          onClick={() => onOpen?.('app-year')}
        />
      </div>

      {/* Wide Decade — generic scene-hero band (per library map) */}
      {decade && (
        <div style={{ marginTop: 10 }}>
          <HubTile
            height={166}
            pigment={ELEMENT_TO_PIGMENT[decadeElement]}
            artSrc={arts.decade}
            meta={`Life Chapter · Yr ${decadeYr} / 10`}
            title={`The ${decadeElement} Decade`}
            sub={`${decade.startYear}–${decade.endYear} · the season beneath it all`}
            hanzi={`${decade.stem}${decade.branch}`}
            onClick={() => onOpen?.('app-decade')}
          />
        </div>
      )}
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────
// HubTile — Inkstone footer recipe (rendered-screens spec). Art frame
// at top with seal mark badge + hanzi watermark fade-to-silk, paper
// footer below carrying eyebrow + title + optional sub. The featured
// Day tile additionally renders a footer chev row ("壬 · open today's
// reading →") via `chev + chevSub`.
// ───────────────────────────────────────────────────────────────────
function HubTile({ height, pigment, artSrc, meta, title, sub, chev, chevSub, hanzi, onClick }) {
  const [pressed, setPressed] = React.useState(false);
  const pigKey = pigment || 'metal';
  const pig = pigments[pigKey];

  // Frame / footer split — keep the title block legible at every size.
  const footerH = chev ? 86 : (sub ? 60 : 52);
  const frameH = Math.max(48, height - footerH);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        appearance: 'none', position: 'relative', display: 'flex', flexDirection: 'column',
        width: '100%', height,
        border: `1px solid ${withAlpha(pig.base, '40')}`,
        borderRadius: 16, overflow: 'hidden', padding: 0, cursor: 'pointer',
        background: silk,
        textAlign: 'left',
        transform: pressed ? 'scale(0.99)' : 'none',
        transition: 'transform 140ms cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 1px 0 rgba(43,39,34,.04), 0 8px 20px rgba(60,46,28,.07)',
      }}
    >
      {/* Art frame (top) — fades to silk paper at the bottom */}
      <div style={{ position: 'relative', height: frameH, overflow: 'hidden' }}>
        {artSrc && (
          <MoodboardArt
            src={artSrc}
            pigBase={pig.base}
            footerFade={true}
            footerColor={silk}
          />
        )}
        {/* Top-left round mark badge (paper chip with element seal SVG) */}
        <span aria-hidden="true" style={{
          position: 'absolute', top: 10, left: 10, zIndex: 3,
          width: 28, height: 28, borderRadius: 999,
          background: 'rgba(248,244,236,0.8)',
          border: `1px solid ${withAlpha(pig.base, '40')}`,
          color: pig.deep,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}>
          <ElementMark element={pigKey} size={16} />
        </span>
        {/* Top-right hanzi watermark — overrides default with explicit hanzi prop */}
        {hanzi && (
          <span aria-hidden="true" style={{
            position: 'absolute', top: 8, right: 12, zIndex: 3,
            fontFamily: "'Noto Serif SC', serif", fontWeight: 500,
            fontSize: hanzi.length > 1 ? 22 : 26,
            color: pig.deep, opacity: 0.5, lineHeight: 1,
          }}>{hanzi}</span>
        )}
      </div>

      {/* Paper footer */}
      <div style={{
        flex: 1, padding: '9px 13px 11px',
        display: 'flex', flexDirection: 'column', gap: 2,
        justifyContent: 'center',
      }}>
        {meta && (
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: pig.deep, fontWeight: 600,
          }}>{meta}</span>
        )}
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 19, fontWeight: 600, lineHeight: 1.04,
          color: ink, marginTop: 2,
        }}>{title}</div>
        {sub && !chev && (
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 12.5, lineHeight: 1.4,
            color: inkLight, marginTop: 2,
          }}>{sub}</div>
        )}
        {chev && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 6,
          }}>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 12.5, color: inkLight,
            }}>{chevSub || sub}</span>
            <Icon id="ico-chev-r" size={14} color={inkLight} />
          </div>
        )}
      </div>
    </button>
  );
}
