// ===================================================================
// ELEMENTUM · TodayScreen (DOC5 §10)
// ===================================================================
// The daily-utility habit screen. Layout (top → bottom):
//   1. Decade indicator — full-width gold-rim card (§AM.7 cardstock-active)
//   2. TODAY / MONTH / YEAR tab switcher
//   3. TODAY tab (built fully):
//      · Date + today's element/stem hero
//      · Personalized daily guidance narrative (dailyGuidance.js)
//      · DO THIS / AVOID lists
//      · BEST HOURS windows
//      · YOUR CATALYST TODAY
//   4. MONTH / YEAR tabs — scaffolded placeholders (calendar grid +
//      recharts timeline need engine/temporal.js, which doesn't exist yet)
// ===================================================================

import React, { useState } from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { getDailyGuidance } from '../../../content/dailyGuidance.js';
import { monthGrid, flowWindows, yearEnergy, energyContext } from '../../../engine/temporal.js';
import { ElementMark, Icon } from '../../shared/icons';
import { SceneHero } from '../VisualTile.jsx';
import { elementArt } from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold,
  paperHair, cardstockBg, quietBg, quietBorder,
  pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = {
  Metal: 'metal', Wood: 'wood', Fire: 'fire',
  Earth: 'earth', Water: 'water',
};

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

const TABS = ['today', 'month', 'year'];

export default function TodayScreen() {
  const { chart } = useChart();
  const [tab, setTab] = useState('today');

  const dmElement = chart?.dayMaster?.element || 'Metal';
  const dmPigKey = ELEMENT_TO_PIGMENT[dmElement] || 'metal';
  const dmPig = pigments[dmPigKey].deep;

  const decade = (chart?.luckPillars || []).find((p) => p.isCurrent);
  const guidance = getDailyGuidance(chart);

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      {/* ── 1. Decade indicator — gold-rim cardstock-active (§AM.7) ─── */}
      {decade && <DecadeIndicator decade={decade} />}

      {/* ── 2. TODAY / MONTH / YEAR switcher ───────────────────────── */}
      <TabSwitcher tab={tab} onChange={setTab} />

      {/* ── 3/4. Tab content ───────────────────────────────────────── */}
      {tab === 'today' && <TodayTab guidance={guidance} pigKey={dmPigKey} pig={dmPig} chart={chart} />}
      {tab === 'month' && <MonthTab chart={chart} />}
      {tab === 'year' && <YearTab chart={chart} />}
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────
// DecadeIndicator — current 大运 decade, gold-rim card.
// ───────────────────────────────────────────────────────────────────
function DecadeIndicator({ decade }) {
  const pigKey = ELEMENT_TO_PIGMENT[decade.element] || 'metal';
  const pig = pigments[pigKey].deep;
  return (
    <section
      style={{
        background: cardstockBg,
        // §AM.7 cardstock-active — 1px gold rim
        border: `1px solid ${withAlpha(gold, '40')}`,
        boxShadow: `0 0 0 1px ${withAlpha(gold, '10')}`,
        borderRadius: 16,
        padding: '16px 18px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 44, height: 44, borderRadius: 12,
          background: withAlpha(pigments[pigKey].base, '1A'),
          border: `1px solid ${withAlpha(pigments[pigKey].base, '40')}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: pig, flexShrink: 0,
        }}
      >
        <ElementMark element={pigKey} size={26} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500, marginBottom: 3,
        }}>
          Age {decade.startAge}–{decade.endAge} · {decade.startYear}–{decade.endYear}
        </div>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 20, color: ink, lineHeight: 1.2,
        }}>
          The {decade.element} Decade
        </div>
      </div>
      <div style={{
        fontFamily: "'Noto Serif SC', serif",
        fontSize: 22, color: pig, lineHeight: 1, flexShrink: 0,
      }}>
        {decade.stem}{decade.branch}
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────
// TabSwitcher — TODAY / MONTH / YEAR pill row.
// ───────────────────────────────────────────────────────────────────
function TabSwitcher({ tab, onChange }) {
  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        background: 'rgba(234,229,223,0.5)',  // parchment @ ~50% (DOC5 §10)
        borderRadius: 999,
        padding: 4,
        marginBottom: 18,
        gap: 4,
      }}
    >
      {TABS.map((t) => {
        const active = tab === t;
        return (
          <button
            key={t}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t)}
            style={{
              flex: 1,
              appearance: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 0',
              borderRadius: 999,
              background: active ? '#FFFFFF' : 'transparent',
              boxShadow: active ? '0 1px 2px rgba(40,30,20,0.08)' : 'none',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: active ? 600 : 400,
              color: active ? ink : inkLight,
              transition: 'background 180ms ease, color 180ms ease',
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// TodayTab — the daily guidance content.
// ───────────────────────────────────────────────────────────────────
function TodayTab({ guidance, pigKey, pig, chart }) {
  const now = new Date();
  const dateLabel = `${WEEKDAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  if (!guidance) {
    return (
      <ScaffoldTab title="Today" note="Seed a chart to see today's reading." icon="ico-sunrise" />
    );
  }

  const todayPigKey = ELEMENT_TO_PIGMENT[guidance.todayElement] || 'metal';
  const todayPig = pigments[todayPigKey].deep;
  const todayPigBase = pigments[todayPigKey].base;
  const catalyst = chart?.catalyst;
  const catalystPigKey = catalyst ? ELEMENT_TO_PIGMENT[catalyst] : null;

  return (
    <>
      {/* Today's element — scene hero (painterly day-element art) */}
      <SceneHero
        element={guidance.todayElement}
        artSrc={elementArt(guidance.todayElement)}
        eyebrow={`${dateLabel} · ${guidance.todayElement} Day`}
        title={guidance.label}
        subtitle={`${guidance.todayStem} · ${guidance.todayElement} Stem · ${guidance.todayStemTenGod?.en || ''}`}
        height={188}
      />

      {/* Daily narrative — reads below the hero */}
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 15, lineHeight: 1.78, color: ink,
        margin: '16px 2px 16px',
      }}>
        {guidance.narrative}
      </p>

      {/* DO THIS */}
      <ListCard
        eyebrow="DO THIS"
        pig={todayPig}
        items={guidance.doThis}
        marker="check"
      />

      {/* AVOID */}
      <ListCard
        eyebrow="AVOID"
        pig={bronzeDark}
        items={guidance.avoid}
        marker="warn"
      />

      {/* BEST HOURS */}
      <section style={{
        background: cardstockBg,
        border: `1px solid ${paperHair}`,
        borderRadius: 16,
        padding: '18px 18px 14px',
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: withAlpha(todayPig, 'CC'), fontWeight: 500, marginBottom: 12,
        }}>
          Best Hours
        </div>
        {guidance.bestHours.map(([window, desc], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            padding: '8px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${paperHair}`,
          }}>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 13, fontWeight: 600, color: ink,
              minWidth: 76, flexShrink: 0,
            }}>
              {window}
            </span>
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 14, color: inkSoft, lineHeight: 1.4,
            }}>
              {desc}
            </span>
          </div>
        ))}
      </section>

      {/* YOUR CATALYST TODAY */}
      {catalyst && (
        <section style={{
          background: quietBg,
          border: `1px solid ${quietBorder}`,
          borderRadius: 16,
          padding: '18px',
          marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: bronzeDark, fontWeight: 500, marginBottom: 10,
          }}>
            Your Catalyst
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {catalystPigKey && (
              <div aria-hidden="true" style={{
                width: 36, height: 36, borderRadius: 10,
                background: withAlpha(pigments[catalystPigKey].base, '1A'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: pigments[catalystPigKey].deep, flexShrink: 0,
              }}>
                <ElementMark element={catalystPigKey} size={20} />
              </div>
            )}
            <p style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 14, lineHeight: 1.6, color: inkSoft, margin: 0,
            }}>
              {catalyst} lifts your {guidance.dmElement} nature.
              {guidance.todayElement === catalyst
                ? ' Today carries it directly — a rare alignment worth using.'
                : ` Seek ${catalyst.toLowerCase()} energy where you can today; it restores what the day spends.`}
            </p>
          </div>
        </section>
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────────────
// ListCard — DO THIS / AVOID list with marker icons.
// ───────────────────────────────────────────────────────────────────
function ListCard({ eyebrow, pig, items, marker }) {
  return (
    <section style={{
      background: cardstockBg,
      border: `1px solid ${paperHair}`,
      borderRadius: 16,
      padding: '18px 18px 14px',
      marginBottom: 14,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
        color: withAlpha(pig, 'CC'), fontWeight: 500, marginBottom: 12,
      }}>
        {eyebrow}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '7px 0',
          }}>
            <Marker kind={marker} color={pig} />
            <span style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 15, lineHeight: 1.55, color: inkSoft,
            }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// DO = rounded-square checkbox outline; AVOID = triangle warning.
function Marker({ kind, color }) {
  if (kind === 'warn') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden="true">
        <path d="M8 2 L15 14 L1 14 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="8" y1="6.5" x2="8" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="8" cy="11.6" r="0.7" fill={color} />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────
// MonthTab — calendar grid + flow-window summary (DOC5 §10 Month tab).
// ───────────────────────────────────────────────────────────────────
const WEEK_HEADER = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function fmtRange(monthIdx, run) {
  const m = MONTHS[monthIdx].slice(0, 3);
  return run.start === run.end ? `${m} ${run.start}` : `${m} ${run.start}–${run.end}`;
}

function MonthTab({ chart }) {
  const now = new Date();
  const year = now.getFullYear();
  const monthIdx = now.getMonth();
  const { weeks } = monthGrid(year, monthIdx, chart);
  const windows = flowWindows(year, monthIdx, chart);

  return (
    <>
      {/* Month label */}
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 24, fontWeight: 500, color: ink, margin: '4px 2px 14px',
      }}>
        {MONTHS[monthIdx]} {year}
      </div>

      {/* Calendar card */}
      <section style={{
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 16, padding: '14px 12px', marginBottom: 14,
      }}>
        {/* Weekday header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 6 }}>
          {WEEK_HEADER.map((d, i) => (
            <div key={i} style={{
              textAlign: 'center', fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 10, letterSpacing: 1, color: inkLight, fontWeight: 500,
            }}>{d}</div>
          ))}
        </div>
        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
            {week.map((cell, ci) => <DayCell key={ci} cell={cell} />)}
          </div>
        ))}
      </section>

      {/* Flow windows */}
      <section style={{
        background: quietBg, border: `1px solid ${quietBorder}`,
        borderRadius: 16, padding: '16px 18px', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
          letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark,
          fontWeight: 500, marginBottom: 12,
        }}>Flow Windows</div>

        <WindowRow color={gold} label="High flow"
          ranges={windows.high.map((r) => fmtRange(monthIdx, r))} empty="No standout high-flow runs this month." />
        <WindowRow color={pigments.fire.deep} label="Challenging"
          ranges={windows.low.map((r) => fmtRange(monthIdx, r))} empty="No notable clash windows this month." last />
      </section>
    </>
  );
}

function DayCell({ cell }) {
  if (!cell) return <div style={{ aspectRatio: '1', minHeight: 38 }} />;
  const pigKey = ELEMENT_TO_PIGMENT[cell.element] || 'metal';
  const dot = pigments[pigKey].deep;
  const high = cell.level === 'high';
  return (
    <div style={{
      aspectRatio: '1', minHeight: 38,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 3, borderRadius: 10,
      background: high ? withAlpha(gold, '10') : 'transparent',
      border: cell.isToday ? `1.5px solid ${ink}` : high ? `1px solid ${withAlpha(gold, '40')}` : '1px solid transparent',
    }}>
      <span style={{
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
        color: cell.isToday ? ink : inkSoft, fontWeight: cell.isToday ? 600 : 400,
      }}>{cell.day}</span>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: dot, opacity: cell.level === 'low' ? 0.45 : 0.9 }} />
    </div>
  );
}

function WindowRow({ color, label, ranges, empty, last }) {
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-start',
      paddingTop: 8, marginTop: 8,
      borderTop: last ? `1px solid ${paperHair}` : 'none',
    }}>
      <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: color, marginTop: 6, flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, fontWeight: 600, color: ink }}>{label}</div>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, color: inkSoft, lineHeight: 1.5 }}>
          {ranges.length ? ranges.join(' · ') : empty}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// YearTab — year energy + strategic guidance + 12-month timeline.
// ───────────────────────────────────────────────────────────────────
function YearTab({ chart }) {
  const fy = chart?.currentFlowYear;
  const ctx = energyContext(chart);
  const series = yearEnergy(chart);
  if (!fy) return <ScaffoldTab title="This year" note="Seed a chart to see the year ahead." icon="read-chapters" />;

  const yearEl = fy.stemElement;
  const yearPigKey = ELEMENT_TO_PIGMENT[yearEl] || 'metal';
  const yearPig = pigments[yearPigKey].deep;

  // Strategic guidance — templated by the year element's relation to the DM.
  let strategic;
  if (yearEl === ctx.catalyst)
    strategic = `${fy.year} runs on ${yearEl} — the very energy that lifts your ${ctx.dmElement} nature. A year to push: the current is with you, so commit to the things you have been waiting for permission to begin.`;
  else if (yearEl === ctx.resistance)
    strategic = `${fy.year} runs on ${yearEl}, the energy that tests your ${ctx.dmElement} nature. Not a year to force — a year to refine. Protect your reserves and let the pressure sharpen rather than scatter you.`;
  else
    strategic = `${fy.year} runs on ${yearEl} — neither strongly with nor against your ${ctx.dmElement} nature. A year that rewards steadiness: build quietly, and the foundations you lay now hold.`;

  return (
    <>
      {/* Year energy card */}
      <section style={{
        background: withAlpha(pigments[yearPigKey].base, '10'),
        border: `1px solid ${withAlpha(pigments[yearPigKey].base, '40')}`,
        borderRadius: 16, padding: '18px', marginBottom: 14,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div aria-hidden="true" style={{
          width: 52, height: 52, borderRadius: 12,
          background: withAlpha(pigments[yearPigKey].base, '1A'),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: yearPig, flexShrink: 0,
        }}>
          <ElementMark element={yearPigKey} size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
            letterSpacing: 2.5, textTransform: 'uppercase',
            color: withAlpha(yearPig, 'CC'), fontWeight: 500, marginBottom: 3,
          }}>The {yearEl} Year · {fy.year}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22,
            fontWeight: 500, color: ink, lineHeight: 1.1,
          }}>
            <span style={{ fontFamily: "'Noto Serif SC', serif", color: yearPig, marginRight: 8 }}>
              {fy.stem}{fy.branch}
            </span>
            {fy.stemTenGod?.en}
          </div>
        </div>
      </section>

      {/* Strategic guidance */}
      <section style={{
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 16, padding: '18px', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
          letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark,
          fontWeight: 500, marginBottom: 10,
        }}>Strategic Guidance</div>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15,
          lineHeight: 1.75, color: ink, margin: 0,
        }}>{strategic}</p>
      </section>

      {/* Energy timeline — 12 monthly bars */}
      <section style={{
        background: cardstockBg, border: `1px solid ${paperHair}`,
        borderRadius: 16, padding: '18px 14px 12px', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10,
          letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark,
          fontWeight: 500, marginBottom: 14, padding: '0 4px',
        }}>Energy Through the Year</div>
        <EnergyTimeline series={series} />
      </section>
    </>
  );
}

// Hand-rolled SVG bar chart (no chart lib). Gold = high-flow months,
// muted stone = neutral/low. Y-axis hidden; relative comparison communicates.
function EnergyTimeline({ series }) {
  const W = 322, H = 120, pad = 6;
  const barW = (W - pad * 2) / series.length;
  const max = 100;
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} width="100%" style={{ display: 'block' }} aria-hidden="true">
      {series.map((m, i) => {
        const h = Math.round((m.score / max) * H);
        const x = pad + i * barW;
        const y = H - h;
        const fill = m.level === 'high' ? gold : '#C9C3B8';
        return (
          <g key={i}>
            <rect x={x + 2} y={y} width={barW - 4} height={h} rx={3} fill={fill} opacity={m.level === 'low' ? 0.55 : 0.9} />
            <text x={x + barW / 2} y={H + 12} textAnchor="middle"
              fontFamily="'EB Garamond', serif" fontSize="8.5" fill="#857D72">
              {m.label[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────
// ScaffoldTab — placeholder for MONTH / YEAR tabs (temporal engine TBD).
// ───────────────────────────────────────────────────────────────────
function ScaffoldTab({ title, note, icon }) {
  return (
    <section style={{
      background: 'transparent',
      border: `1px dashed ${paperHair}`,
      borderRadius: 16,
      padding: '36px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      textAlign: 'center',
      marginTop: 4,
    }}>
      <div aria-hidden="true" style={{
        width: 52, height: 52, borderRadius: 22,
        background: 'rgba(139,115,85,0.06)',
        border: `1px dashed ${paperHair}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: inkLight,
      }}>
        <Icon id={icon} size={26} />
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 22, fontWeight: 500, color: ink,
      }}>
        {title}
      </div>
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 14, lineHeight: 1.65, color: inkLight,
        margin: 0, maxWidth: 280,
      }}>
        {note}
      </p>
    </section>
  );
}
