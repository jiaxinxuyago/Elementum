// ===================================================================
// ELEMENTUM · RawChartPage — Variant A (4 pillars + Resonance entry)
// ===================================================================
// Direction 2 / Raw Chart from Claude Design's consolidated wireframes.
//
//   · Back link "‹ Profile"
//   · "BIRTH CHART · 八字排盘 / Your four pillars" header
//   · 4-pillar grid (Year · Month · Day · Hour). Each pillar shows:
//     column label · Ten God · stem hanzi · element + polarity ·
//     divider · branch hanzi · element. Day pillar is the Self pillar
//     (cardstock fill + soft border). Hour shown ~unconfirmed when
//     the chart was generated without an exact hour.
//   · 天干 / 地支 legend
//   · Resonance entry card (shown when hour is unconfirmed) →
//     navigates to chart-resonance for the 2-minute hour-discovery flow.
// ===================================================================

import React from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { Icon } from '../shared/icons';
import { tgPersona } from '../../content/tgNames.js';
import {
  ink, inkSoft, inkLight, bronzeDark, silk,
  paperHair, cardstockBg, pigments,
} from '../../styles/tokens';

const STEM_INFO = {
  '甲': { element: 'Wood',  polarity: 'Yang' },
  '乙': { element: 'Wood',  polarity: 'Yin'  },
  '丙': { element: 'Fire',  polarity: 'Yang' },
  '丁': { element: 'Fire',  polarity: 'Yin'  },
  '戊': { element: 'Earth', polarity: 'Yang' },
  '己': { element: 'Earth', polarity: 'Yin'  },
  '庚': { element: 'Metal', polarity: 'Yang' },
  '辛': { element: 'Metal', polarity: 'Yin'  },
  '壬': { element: 'Water', polarity: 'Yang' },
  '癸': { element: 'Water', polarity: 'Yin'  },
};
const BRANCH_ELEMENT = {
  '寅': 'Wood',  '卯': 'Wood',
  '巳': 'Fire',  '午': 'Fire',
  '辰': 'Earth', '戌': 'Earth', '丑': 'Earth', '未': 'Earth',
  '申': 'Metal', '酉': 'Metal',
  '子': 'Water', '亥': 'Water',
};
const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water',
};

// Fallback when the engine didn't tag the pillar — canonical persona
// names only (READING_CONCEPT_INVENTORY §2; engine translations banned).
function tenGodLabel(stem, dmStem, isDay) {
  if (isDay) return 'Self';
  if (!stem || !dmStem) return '';
  if (stem === dmStem) return 'The Mirror';
  const dmInfo = STEM_INFO[dmStem];
  const stInfo = STEM_INFO[stem];
  if (!dmInfo || !stInfo) return '';
  if (stInfo.element === dmInfo.element) return 'The Rival';
  return '—';
}

export default function RawChartPage({ onBack }) {
  const { chart, birthData } = useChart();
  const dmStem = chart?.dayMaster?.stem || '庚';
  const hourUnconfirmed = !!(birthData?.hourUnknown || birthData?.hourWindow);

  const pillars = useFourPillars(chart, dmStem);

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px', background: silk }}>
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        style={{
          appearance: 'none', background: 'transparent', border: 'none',
          padding: '4px 0', cursor: 'pointer', color: inkLight,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 13,
        }}
      >
        <Icon id="ico-chev-l" size={14} color={inkLight} /> Profile
      </button>

      {/* Header */}
      <header style={{ marginTop: 10, marginBottom: 14 }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>Birth Chart · 八字排盘</span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 30, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '4px 0 0',
        }}>Your four pillars</h1>
      </header>

      {/* 4-pillar grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 8,
      }}>
        {pillars.map((p) => (
          <Pillar
            key={p.col}
            colLabel={p.col}
            isSelf={p.isSelf}
            tg={p.tg}
            stem={p.stem}
            stemElement={p.stemElement}
            stemPolarity={p.stemPolarity}
            branch={p.branch}
            branchElement={p.branchElement}
            unconfirmed={p.col === 'Hour' && hourUnconfirmed}
          />
        ))}
      </div>

      {/* 天干 / 地支 legend */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 10, padding: '0 4px',
      }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 11, color: inkLight,
        }}>
          <b style={{
            fontFamily: "'Noto Serif SC', serif", color: ink, fontWeight: 500,
          }}>天干</b> — Heavenly Stems (upper)
        </span>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 3, padding: '0 4px',
      }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 11, color: inkLight,
        }}>
          <b style={{
            fontFamily: "'Noto Serif SC', serif", color: ink, fontWeight: 500,
          }}>地支</b> — Earthly Branches (lower)
        </span>
      </div>

      {/* Resonance entry — shown when hour is unconfirmed */}
      {hourUnconfirmed && (
        <section style={{
          background: cardstockBg, border: `1px solid ${paperHair}`,
          borderRadius: 16, padding: 16, marginTop: 18,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: bronzeDark, fontWeight: 500,
          }}>Chart Resonance · 时辰感应</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 21, fontWeight: 500, color: ink,
            margin: '6px 0 8px', lineHeight: 1.15,
          }}>Discover your birth hour</div>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 13, lineHeight: 1.55, color: inkSoft, margin: 0,
          }}>
            Your hour is unconfirmed. Recover it by resonance — a few honest
            answers narrow twelve 时辰 to one. About two minutes.
          </p>
          <button
            type="button"
            onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/chart-resonance'; }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', height: 56, marginTop: 14,
              border: 'none', borderRadius: 14,
              background: ink, color: silk, cursor: 'pointer',
              fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, letterSpacing: 0.4,
            }}
          >
            Begin <span style={{ fontSize: 16 }}>→</span>
          </button>
        </section>
      )}

      <div style={{
        textAlign: 'center', marginTop: 18,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: inkLight, fontWeight: 500,
      }}>
        Tap any pillar to read what it governs
      </div>
    </main>
  );
}

function Pillar({ colLabel, isSelf, tg, stem, stemElement, stemPolarity, branch, branchElement, unconfirmed }) {
  const stemPig = stemElement && pigments[ELEMENT_TO_PIGMENT[stemElement]];
  const branchPig = branchElement && pigments[ELEMENT_TO_PIGMENT[branchElement]];
  const stemColor = stemPig?.deep || inkLight;
  const branchColor = branchPig?.deep || inkLight;

  return (
    <div style={{
      background: isSelf ? cardstockBg : 'rgba(248,246,240,0.6)',
      border: `${isSelf ? 1.5 : 1}px solid ${isSelf ? '#584A3E' : paperHair}`,
      borderRadius: 12,
      padding: '11px 4px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', gap: 5,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 8.5, letterSpacing: 1.2, textTransform: 'uppercase',
        color: isSelf ? '#584A3E' : inkLight, fontWeight: 600,
      }}>{colLabel}</div>

      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 10, color: inkLight,
        lineHeight: 1.15, minHeight: 22,
        display: 'flex', alignItems: 'center',
      }}>{unconfirmed ? '~ unconfirmed' : (tg || '')}</div>

      <div style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: 30, lineHeight: 1, color: stemColor,
        opacity: unconfirmed ? 0.4 : 1, fontWeight: 500,
      }}>{stem || '—'}</div>

      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 7.5, letterSpacing: 0.6, textTransform: 'uppercase',
        color: inkLight, lineHeight: 1.3, minHeight: 18,
      }}>
        {stemElement ? `${stemElement} · ${stemPolarity}` : ''}
      </div>

      <div style={{ width: '60%', height: 1, background: paperHair, margin: '3px 0' }} />

      <div style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: 26, lineHeight: 1, color: branchColor,
        opacity: unconfirmed ? 0.4 : 1, fontWeight: 500,
      }}>{branch || '—'}</div>

      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 7.5, letterSpacing: 0.6, textTransform: 'uppercase',
        color: inkLight, lineHeight: 1.3, minHeight: 12,
      }}>
        {branchElement || ''}
      </div>
    </div>
  );
}

function useFourPillars(chart, dmStem) {
  return React.useMemo(() => {
    const p = chart?.pillars || {};
    const cols = [
      { col: 'Year',  key: 'year',  isSelf: false },
      { col: 'Month', key: 'month', isSelf: false },
      { col: 'Day',   key: 'day',   isSelf: true  },
      { col: 'Hour',  key: 'hour',  isSelf: false },
    ];
    return cols.map(({ col, key, isSelf }) => {
      const pi = p[key] || {};
      const stem = pi.stem || (isSelf ? dmStem : null);
      const branch = pi.branch || null;
      const stemInfo = stem ? STEM_INFO[stem] : null;
      const branchElement = branch ? BRANCH_ELEMENT[branch] : null;
      return {
        col, isSelf,
        tg: tgPersona(chart?.tenGods?.[`${key}Stem`]?.zh || pi.stemTenGod?.zh) || tenGodLabel(stem, dmStem, isSelf),
        stem,
        stemElement: pi.stemElement || stemInfo?.element || null,
        stemPolarity: stemInfo?.polarity || (pi.stemPolarity ? (pi.stemPolarity === 'yin' ? 'Yin' : 'Yang') : null),
        branch,
        branchElement: pi.branchElement || branchElement,
      };
    });
  }, [chart, dmStem]);
}
