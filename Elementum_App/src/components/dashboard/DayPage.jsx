// ===================================================================
// ELEMENTUM · DayPage  (hub → destination, Today tab drill-down)
// ===================================================================
// Wireframe: Today Hub · Day (Direction 2). Hero + Within (link →
// decade) + Catalyst row + Do/Avoid 2-col grid + Best Hours 3-col grid.
// Daily-utility content that used to sit on the Today tab now lives
// here, reachable by tapping the featured Day tile on the hub.
// ===================================================================

import React from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { getDailyGuidance } from '../../content/dailyGuidance.js';
import { tgPersona } from '../../content/tgNames.js';
import { Icon, ElementMark } from '../shared/icons';
import { SceneHero } from './VisualTile.jsx';
import { elementArt } from '../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export default function DayPage({ onBack, onOpen }) {
  const { chart } = useChart();
  const guidance = getDailyGuidance(chart);
  const now = new Date();
  const dateLabel = `${WEEKDAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  const dmElement = chart?.dayMaster?.element || 'Metal';
  const decade = (chart?.luckPillars || []).find((p) => p.isCurrent);

  if (!guidance) return <ScaffoldEmpty onBack={onBack} />;

  const dayEl = guidance.todayElement;
  const pigKey = ELEMENT_TO_PIGMENT[dayEl] || 'metal';
  const pig = pigments[pigKey].deep;
  const catalyst = chart?.catalyst;
  const catKey = catalyst ? ELEMENT_TO_PIGMENT[catalyst] : null;

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Day" onBack={onBack} />

      <div style={{ marginTop: 6 }}>
        <SceneHero
          pigment={dayEl}
          artSrc={elementArt(dayEl)}
          eyebrow={`${dateLabel} · ${dayEl} Day`}
          title={guidance.label}
          subtitle={`${guidance.todayStem} · ${dayEl} Stem · ${tgPersona(guidance.todayStemTenGod?.zh) || ''}`}
          height={168}
          radius={16}
        />
      </div>

      {/* Within: this day sits inside the current life chapter */}
      {decade && (
        <button
          type="button"
          onClick={() => onOpen?.('app-decade')}
          aria-label={`Within The ${decade.element} Decade — open Life Chapter`}
          style={{
            appearance: 'none', display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', marginTop: 10, padding: '12px 14px',
            background: cardstockBg, border: `1px solid ${paperHair}`,
            borderRadius: 12, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <span style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: bronzeDark, fontWeight: 500,
          }}>Within</span>
          <span style={{
            flex: 1,
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 14, color: ink,
          }}>The {decade.element} Decade</span>
          <Icon id="ico-chev-r" size={14} color={inkLight} />
        </button>
      )}

      {/* Catalyst row */}
      {catalyst && catKey && (
        <section style={{
          background: cardstockBg, border: `1px solid ${paperHair}`,
          borderRadius: 12, padding: 12, marginTop: 10,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div aria-hidden="true" style={{
            width: 38, height: 38, borderRadius: 10,
            background: withAlpha(pigments[catKey].base, '1A'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: pigments[catKey].deep, flexShrink: 0,
          }}>
            <ElementMark element={catKey} size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
              color: bronzeDark, fontWeight: 500, marginBottom: 2,
            }}>Your Catalyst</div>
            <p style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 13.5, lineHeight: 1.5, color: inkSoft, margin: 0,
            }}>
              {catalyst} lifts your {dmElement}
              {dayEl === catalyst
                ? ' — and the day carries it directly.'
                : ` — seek ${catalyst.toLowerCase()} energy today.`}
            </p>
          </div>
        </section>
      )}

      {/* Do / Avoid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
        <ListCard label="Do This" items={guidance.doThis} kind="do" color={pig} />
        <ListCard label="Avoid"   items={guidance.avoid}   kind="warn" color={bronzeDark} />
      </div>

      {/* Best Hours — 3-col compact grid */}
      <section style={{
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 12, marginTop: 10, padding: '12px',
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
          color: withAlpha(pig, 'CC'), fontWeight: 500, marginBottom: 10,
        }}>Best Hours</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {(guidance.bestHours || []).slice(0,3).map(([win, desc], i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 13, fontWeight: 600, color: ink,
              }}>{win}</div>
              <div style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: 11, color: inkLight, lineHeight: 1.35,
              }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ListCard({ label, items, kind, color }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 12, padding: 12, minHeight: 150,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: withAlpha(color, 'CC'), fontWeight: 500, marginBottom: 10,
      }}>{label}</div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {(items || []).map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Marker kind={kind} color={color} />
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 13, lineHeight: 1.4, color: inkSoft,
            }}>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Marker({ kind, color }) {
  if (kind === 'warn') {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
        <path d="M8 2 L15 14 L1 14 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="8" y1="6.5" x2="8" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="11.6" r="0.7" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style={{ marginTop: 2, flexShrink: 0 }}>
      <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function BackBar({ label, onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        padding: '4px 0 4px', display: 'inline-flex', alignItems: 'center', gap: 6,
        cursor: 'pointer', color: inkLight,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      }}
    >
      <Icon id="ico-chev-l" size={14} color={inkLight} />
      {label}
    </button>
  );
}

function ScaffoldEmpty({ onBack }) {
  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <BackBar label="Readings · Day" onBack={onBack} />
      <div style={{ marginTop: 60, textAlign: 'center', color: inkLight,
        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18 }}>
        Seed a chart to see today's reading.
      </div>
    </main>
  );
}
