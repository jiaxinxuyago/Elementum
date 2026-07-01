// ===================================================================
// ELEMENTUM · DecadePage  (hub → destination, Today tab drill-down)
// ===================================================================
// Wireframe: Today Hub · Decade / Life Chapter (Direction 2).
// Hero (with stem-branch hanzi watermark) + Ten-Year Arc (dot · line ·
// NOW · line · dot) + What This Chapter Governs prose + Three Phases.
// ===================================================================

import { useChart } from '../../store/chartContext.jsx';
import { Icon } from '../shared/icons';
import { SceneHero } from './VisualTile.jsx';
import { elementArt } from '../../styles/backgrounds.js';
import { ink, inkSoft, inkLight, bronzeDark, paperHair, cardstockBg, pigments } from '../../styles/tokens';

const GOVERNS = {
  Metal: 'A decade that asks for refinement — strip what doesn\'t serve, sharpen what does. Reputation built on accuracy compounds now.',
  Wood:  'A decade of growth — reaching wider, building scaffolding for what comes next. Generative; resist closing things off too early.',
  Fire:  'A decade that asks you to be forged and made visible. Reputation, output, and exposure compound now.',
  Earth: 'A decade of consolidation — building roots, gathering what scattered. Slow returns; lasting structures.',
  Water: 'A decade of depth — listening, studying, sinking below the surface noise. Wisdom accrues quietly.',
};

const PHASE_LABEL = {
  Metal: ['Early — heat lifting', 'Mid — the cut', 'Late — temper & set'],
  Wood:  ['Early — first reaches', 'Mid — full leaf', 'Late — set wood'],
  Fire:  ['Early — heat rising', 'Mid — the forge', 'Late — temper & set'],
  Earth: ['Early — laying ground', 'Mid — full harvest', 'Late — store & rest'],
  Water: ['Early — sounding depth', 'Mid — full pool', 'Late — clear surface'],
};

export default function DecadePage({ onBack }) {
  const { chart } = useChart();
  const decade = (chart?.luckPillars || []).find((p) => p.isCurrent);

  if (!decade) return <ScaffoldEmpty onBack={onBack} />;

  const el = decade.element;
  const dmEl = chart?.dayMaster?.element || 'Metal';
  const now = new Date().getFullYear();
  const nowAge = decade.startAge + (now - decade.startYear);
  const stemBranch = `${decade.stem}${decade.branch}`;
  const span = decade.endYear - decade.startYear;
  const progress = Math.max(0, Math.min(1, (now - decade.startYear) / Math.max(1, span)));

  const phases = PHASE_LABEL[el] || PHASE_LABEL.Metal;
  const phaseRows = [
    {
      yrs: `${String(decade.startYear).slice(2)}–${String(decade.startYear + 3).slice(2)}`,
      label: phases[0], isNow: progress < 0.34,
    },
    {
      yrs: `${String(decade.startYear + 4).slice(2)}–${String(decade.startYear + 6).slice(2)}`,
      label: phases[1], isNow: progress >= 0.34 && progress < 0.67,
    },
    {
      yrs: `${String(decade.startYear + 7).slice(2)}–${String(decade.endYear).slice(2)}`,
      label: phases[2], isNow: progress >= 0.67,
    },
  ];

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Life Chapter" onBack={onBack} />

      {/* Hero with hanzi watermark top-right */}
      <div style={{ marginTop: 6, position: 'relative' }}>
        <SceneHero
          pigment={el}
          artSrc={elementArt(el)}
          eyebrow={`Life Chapter · ${decade.startYear}–${decade.endYear}`}
          title={`The ${el} Decade`}
          subtitle="A ten-year season beneath every day."
          height={170}
          radius={16}
        />
        <span aria-hidden="true" style={{
          position: 'absolute', top: 14, right: 16, zIndex: 2,
          fontFamily: "'Noto Serif SC', serif", fontSize: 32, lineHeight: 1,
          color: 'rgba(248,246,240,0.55)',
        }}>{stemBranch}</span>
      </div>

      {/* The Ten-Year Arc — you-are-here */}
      <SectionCard label="The Ten-Year Arc" style={{ marginTop: 10 }}>
        <Arc progress={progress} pig={pigments[el.toLowerCase()]} />
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 2px',
        }}>
          <Mark year={decade.startYear} age={decade.startAge} />
          <Mark year={now} age={nowAge} now />
          <Mark year={decade.endYear} age={decade.endAge} right />
        </div>
      </SectionCard>

      {/* What This Chapter Governs */}
      <SectionCard label="What This Chapter Governs" style={{ marginTop: 10 }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14.5, lineHeight: 1.55, color: ink, margin: 0,
        }}>
          {el} over {dmEl}: {GOVERNS[el] || GOVERNS.Metal}
        </p>
      </SectionCard>

      {/* Three Phases */}
      <SectionCard label="Three Phases" style={{ marginTop: 10 }}>
        {phaseRows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            padding: '8px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${paperHair}`,
          }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 14, fontWeight: 600, color: r.isNow ? ink : inkSoft,
              minWidth: 56,
            }}>{r.yrs}</span>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 13, color: r.isNow ? ink : inkSoft, lineHeight: 1.4,
              fontWeight: r.isNow ? 600 : 400,
            }}>{r.label}{r.isNow ? '  · now' : ''}</span>
          </div>
        ))}
      </SectionCard>
    </main>
  );
}

// ───── pieces ──────────────────────────────────────────────────────
function Arc({ progress, pig }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
      <span aria-hidden="true" style={{
        width: 9, height: 9, borderRadius: 999,
        border: `1.5px solid ${pig.deep}`, background: 'transparent', flexShrink: 0,
      }} />
      <span style={{
        flex: progress, height: 1.5, background: pig.deep, opacity: 0.7,
        minWidth: 8,
      }} />
      <span aria-hidden="true" style={{
        width: 16, height: 16, borderRadius: 999,
        background: pig.deep, boxShadow: `0 0 0 2px rgba(248,246,240,1), 0 0 0 3.5px ${pig.deep}`,
        flexShrink: 0,
      }} />
      <span style={{
        flex: 1 - progress, height: 1.5, background: pig.base, opacity: 0.4,
        minWidth: 8,
      }} />
      <span aria-hidden="true" style={{
        width: 9, height: 9, borderRadius: 999,
        border: `1.5px solid ${pig.base}`, background: 'transparent', flexShrink: 0, opacity: 0.6,
      }} />
    </div>
  );
}

function Mark({ year, age, now, right }) {
  return (
    <div style={{ textAlign: right ? 'right' : 'left', width: '33%' }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase',
        color: now ? ink : inkLight, fontWeight: now ? 600 : 500,
      }}>
        {now ? `Now · ${age}` : `${year} · ${age}`}
      </div>
    </div>
  );
}

function SectionCard({ label, children, style }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 12, padding: 12, ...(style || {}),
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: bronzeDark, fontWeight: 500, marginBottom: 10,
      }}>{label}</div>
      {children}
    </section>
  );
}

function BackBar({ label, onBack }) {
  return (
    <button type="button" onClick={onBack}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        padding: '4px 0 4px', display: 'inline-flex', alignItems: 'center', gap: 6,
        cursor: 'pointer', color: inkLight,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      }}>
      <Icon id="ico-chev-l" size={14} color={inkLight} />
      {label}
    </button>
  );
}

function ScaffoldEmpty({ onBack }) {
  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Life Chapter" onBack={onBack} />
      <div style={{
        marginTop: 60, textAlign: 'center', color: inkLight,
        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18,
      }}>Seed a chart to see your life chapter.</div>
    </main>
  );
}
