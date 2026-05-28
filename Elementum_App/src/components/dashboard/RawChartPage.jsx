// ===================================================================
// ELEMENTUM · RawChartPage  (DOC5 §11 Birth Chart Raw Data Page)
// ===================================================================
// The opt-in 四柱 (Four Pillars) grid for users who want the raw chart.
// Intentionally quiet — reached via a dashed "View your birth chart"
// link from the Day Master detail + Profile, not from the catalogue.
//
//   · Columns: YEAR · MONTH · DAY · HOUR (3-pillar when hour unknown)
//   · Each pillar: Ten God label · 天干 stem · 地支 branch, element-colored
//   · Day pillar highlighted with the reserved --dmBorder (DOC5 §3.5.D)
// ===================================================================

import React from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { Icon } from '../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, dmBorder,
  paperHair, cardstockBg, silk, vellum,
  pigments, withAlpha,
} from '../../styles/tokens';

const ELEMENT_TO_PIGMENT = { Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water' };
const elColor = (el) => pigments[ELEMENT_TO_PIGMENT[el]]?.deep || ink;

export default function RawChartPage({ onBack }) {
  const { chart, birthData } = useChart();
  const pillars = chart?.pillars;
  const tenGods = chart?.tenGods || {};
  const hourUnknown = !!birthData?.hourUnknown;
  const hourApprox = !hourUnknown && !!birthData?.hourWindow;

  // Column set — drop HOUR when the birth time is unknown (3-pillar).
  const cols = [
    { key: 'year',  label: 'Year',  tg: tenGods.yearStem },
    { key: 'month', label: 'Month', tg: tenGods.monthStem },
    { key: 'day',   label: 'Day',   tg: { en: 'Day Master' }, isDay: true },
    ...(hourUnknown ? [] : [{ key: 'hour', label: 'Hour', tg: tenGods.hourStem, approx: hourApprox }]),
  ];

  return (
    <div style={{
      position: 'relative', minHeight: '100%', background: silk,
      padding: '54px 0 24px', display: 'flex', flexDirection: 'column',
    }}>
      {/* Back */}
      <button type="button" aria-label="Back" onClick={onBack} style={{
        position: 'absolute', top: 56, left: 16, width: 36, height: 36,
        borderRadius: 999, background: 'transparent', border: 'none',
        color: inkSoft, cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 5,
      }}>
        <Icon id="ico-back" size={22} />
      </button>

      {/* Header */}
      <header style={{ padding: '8px 22px 16px', marginLeft: 36 }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
          letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark,
          fontWeight: 500, marginBottom: 6,
        }}>Birth Chart · 八 字 排 盘</div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30,
          fontWeight: 400, color: ink, margin: 0,
        }}>Your four pillars</h1>
      </header>

      <div style={{ padding: '0 22px', flex: 1, overflowY: 'auto' }}>
        {/* Pillar grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: `repeat(${cols.length}, 1fr)`,
          gap: 8, marginBottom: 16,
        }}>
          {cols.map((c) => {
            const p = pillars?.[c.key];
            if (!p) return null;
            const stemEl = p.stemElement, branchEl = p.branchElement;
            return (
              <div key={c.key} style={{
                background: c.isDay ? vellum : cardstockBg,
                border: c.isDay ? `1.5px solid ${dmBorder}` : `1px solid ${paperHair}`,
                borderRadius: 12, padding: '12px 6px 14px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}>
                {/* Pillar label (Cinzel) */}
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 9.5, letterSpacing: 1.5,
                  textTransform: 'uppercase', color: c.isDay ? dmBorder : inkLight,
                  fontWeight: 500,
                }}>{c.label}{c.approx ? ' ~' : ''}</div>

                {/* Ten God label */}
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5,
                  color: inkLight, textAlign: 'center', minHeight: 12, lineHeight: 1.1,
                }}>
                  {c.isDay ? 'Self' : (c.tg?.en && c.tg.en !== '—' ? c.tg.en : '')}
                </div>

                {/* 天干 stem (glyph decorative — element label below carries meaning) */}
                <div aria-hidden="true" style={{
                  fontFamily: "'Noto Serif SC', serif", fontSize: 34, lineHeight: 1,
                  color: elColor(stemEl),
                }}>{p.stem}</div>
                <span className="sr-only">{c.label} stem: {p.stem}, {stemEl} {p.stemPolarity}</span>
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5,
                  color: inkLight, textTransform: 'uppercase', letterSpacing: 0.5,
                }}>{stemEl} · {p.stemPolarity}</div>

                {/* divider */}
                <div style={{ width: '60%', height: 1, background: paperHair, opacity: 0.6 }} />

                {/* 地支 branch (glyph decorative — element label below carries meaning) */}
                <div aria-hidden="true" style={{
                  fontFamily: "'Noto Serif SC', serif", fontSize: 30, lineHeight: 1,
                  color: elColor(branchEl),
                }}>{p.branch}</div>
                <span className="sr-only">{c.label} branch: {p.branch}, {branchEl}</span>
                <div style={{
                  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9.5,
                  color: inkLight, textTransform: 'uppercase', letterSpacing: 0.5,
                }}>{branchEl}</div>
              </div>
            );
          })}
        </div>

        {/* 天干 / 地支 legend */}
        <div style={{
          display: 'flex', gap: 18, justifyContent: 'center', marginBottom: 16,
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkLight,
        }}>
          <span>天干 — Heavenly Stems (upper)</span>
          <span>地支 — Earthly Branches (lower)</span>
        </div>

        {/* Hour-unknown note */}
        {hourUnknown && (
          <section style={{
            background: 'transparent', border: `1px dashed ${paperHair}`,
            borderRadius: 12, padding: '14px 16px',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5,
            lineHeight: 1.6, color: inkSoft, fontStyle: 'italic',
          }}>
            Your birth hour is unknown, so the chart reads on three pillars.
            The Hour pillar refines your reading — add it any time from your
            profile to see the fourth pillar.
          </section>
        )}
        {hourApprox && (
          <section style={{
            background: cardstockBg, border: `1px solid ${paperHair}`,
            borderRadius: 12, padding: '12px 16px',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
            color: inkSoft,
          }}>
            The Hour pillar (~) is estimated from the time window you gave.
            A precise hour sharpens it.
          </section>
        )}
      </div>
    </div>
  );
}
