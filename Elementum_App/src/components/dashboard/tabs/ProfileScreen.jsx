// ===================================================================
// ELEMENTUM · ProfileScreen — Variant C (2-col data grid + merged card)
// ===================================================================
// Direction 2 / Profile from Claude Design's consolidated wireframes.
//
//   1. Birth Data CARD — eyebrow + 2-col grid (Birth date · Birth time ·
//      True solar · Location · Energy current full-width). Below: a
//      single notice strip if anything is incomplete, then two inline
//      plinks (View birth chart →  Edit →).
//   2. Prefs + Account CARD — single card with two rows separated by a
//      border: Daily reading + toggle, then Current plan + tier pill.
//   3. Sign Out — standalone full-width button.
//   4. Dev · Reset & Start Over — small muted link (dev only).
//
// "The chart is the profile" — intentionally minimal.
// ===================================================================

import {
  useChart, TIER_LABELS, TIER_PRICES,
} from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, advisor,
  paperHair, cardstockBg, withAlpha,
} from '../../../styles/tokens';

const IS_DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

export default function ProfileScreen() {
  const { birthData, chart, tier, updateBirthData, resetFlow } = useChart();
  const { openUpgrade } = useUpgrade();

  // ── Resolved display values ────────────────────────────────────
  const locName = birthData?.location && typeof birthData.location === 'object'
    ? birthData.location.name
    : birthData?.location || 'Beijing';
  const locationNotConfirmed = !(birthData?.location
    && typeof birthData.location === 'object'
    && typeof birthData.location.longitude === 'number');

  const dateStr = birthData?.year
    ? `${birthData.year} / ${String(birthData.month).padStart(2, '0')} / ${String(birthData.day).padStart(2, '0')}`
    : '—';
  const timeStr = birthData?.hourUnknown
    ? 'Unknown'
    : birthData?.hour != null ? `${String(birthData.hour).padStart(2, '0')}:00 (Local)` : '—';
  const energyCurrent = chart?.dayMaster?.polarity === 'yin' ? 'Inward / Yin' : 'Forward / Yang';

  // True Solar Time — only when longitude shifts it.
  const lon = chart?.meta?.longitude;
  let tstStr = null;
  if (!birthData?.hourUnknown && birthData?.hour != null
      && typeof lon === 'number' && Math.abs(lon - 120) > 0.5) {
    const tst = (((birthData.hour - (lon - 120) / 15) % 24) + 24) % 24;
    const h = Math.floor(tst);
    const m = Math.round((tst - h) * 60);
    tstStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  const notifyOn = birthData?.notifyOn ?? false;
  const notifyTime = birthData?.notifyHour != null
    ? `${birthData.notifyHour}:${String(birthData.notifyMinute ?? 0).padStart(2, '0')} ${birthData.notifyMeridiem || 'AM'}`
    : '—';

  const goHash = (h) => () => { if (typeof window !== 'undefined') window.location.hash = `#/${h}`; };

  const handleReset = () => {
    if (window.confirm('This will clear all your data. Continue?')) {
      resetFlow?.();
      if (typeof window !== 'undefined') window.location.hash = '#/welcome';
    }
  };

  return (
    <main style={{ minHeight: '100%', padding: '54px 18px 24px' }}>
      <header style={{ marginBottom: 14, padding: '0 2px' }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          Your Profile
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 30, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '4px 0 0',
        }}>
          Account &amp; Settings
        </h1>
      </header>

      {/* ── Birth Data card — 2-col grid ─────────────────────────── */}
      <Card>
        <CardEyebrow>Birth Data</CardEyebrow>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '14px 14px',
          marginBottom: 4,
        }}>
          <GridCell label="Birth date" value={dateStr} />
          <GridCell label="Birth time" value={timeStr} />
          {tstStr && <GridCell label="True solar" value={tstStr} />}
          <GridCell label="Location" value={locName} />
          <GridCell label="Energy current" value={energyCurrent} fullWidth />
        </div>

        {/* §22 completion notices — quiet, inline */}
        {birthData?.hourUnknown && (
          <Notice
            text="Your chart uses a three-pillar reading."
            cta="Discover your birth hour →"
            onClick={goHash('chart-resonance')}
          />
        )}
        {!birthData?.hourUnknown && birthData?.hourWindow && (
          <Notice
            text="Your chart uses an approximate hour."
            cta="Add your exact time →"
            onClick={goHash('step4')}
          />
        )}
        {locationNotConfirmed && (
          <Notice
            text="Location not confirmed — using standard solar time."
            cta="Update →"
            onClick={goHash('step5')}
          />
        )}

        {/* Inline plinks */}
        <div style={{
          display: 'flex', gap: 18, marginTop: 14, flexWrap: 'wrap',
        }}>
          <Plink label="View birth chart" onClick={goHash('chart-reveal')} />
          <Plink label="Edit" onClick={goHash('step1')} />
        </div>
      </Card>

      {/* ── Prefs + Account merged card ──────────────────────────── */}
      <Card>
        {/* Row 1 — Daily reading + toggle */}
        <Row borderBottom>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 16, color: ink, fontWeight: 500,
            }}>Daily reading</div>
            <div style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
              color: inkLight, fontWeight: 500, marginTop: 3,
            }}>
              {notifyOn ? `Delivered at ${notifyTime}` : 'Off'}
            </div>
          </div>
          <Toggle on={notifyOn} onToggle={() => updateBirthData({ notifyOn: !notifyOn })} />
        </Row>
        {/* Row 2 — Current plan + tier pill */}
        <Row onClick={() => openUpgrade('your full reading')}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 16, color: ink, fontWeight: 500,
            }}>Current plan</div>
          </div>
          <TierPill tier={tier} />
          <Icon id="ico-chev-r" size={14} color={inkLight} />
        </Row>
      </Card>

      {/* ── Sign Out — standalone full-width button ──────────────── */}
      <button
        type="button"
        onClick={() => { /* sign-out is a no-op until auth lands */ }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 48, marginTop: 12,
          background: cardstockBg, border: `1px solid ${paperHair}`,
          borderRadius: 12,
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, color: ink,
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>

      {/* ── Dev link — small, muted, bottom of page ──────────────── */}
      {IS_DEV && (
        <button
          type="button"
          onClick={handleReset}
          style={{
            display: 'block', margin: '20px auto 0',
            appearance: 'none', background: 'transparent', border: 'none',
            cursor: 'pointer', padding: '6px 8px',
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: inkLight, fontWeight: 500,
          }}
        >
          Dev · Reset &amp; Start Over
        </button>
      )}
    </main>
  );
}

// ─── building blocks ──────────────────────────────────────────────

function Card({ children }) {
  return (
    <section style={{
      background: cardstockBg, border: `1px solid ${paperHair}`,
      borderRadius: 16, padding: '18px 16px 16px',
      marginBottom: 12,
    }}>
      {children}
    </section>
  );
}

function CardEyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'EB Garamond', Georgia, serif",
      fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
      color: bronzeDark, fontWeight: 500, marginBottom: 14,
    }}>{children}</div>
  );
}

function GridCell({ label, value, fullWidth }) {
  return (
    <div style={fullWidth ? { gridColumn: '1 / -1' } : undefined}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 9.5, letterSpacing: 1.6, textTransform: 'uppercase',
        color: inkLight, fontWeight: 500,
      }}>{label}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 15, color: ink, marginTop: 4, fontWeight: 500,
      }}>{value}</div>
    </div>
  );
}

function Notice({ text, cta, onClick }) {
  return (
    <div style={{
      marginTop: 12, padding: '10px 12px',
      background: withAlpha(gold, '10'),
      border: `1px solid ${withAlpha(gold, '40')}`,
      borderRadius: 10,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 12.5, color: inkSoft, lineHeight: 1.45,
      }}>{text}</div>
      {cta && (
        <button type="button" onClick={onClick} style={{
          appearance: 'none', background: 'transparent', border: 'none',
          padding: 0, marginTop: 4, cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 12.5, color: bronzeDark, letterSpacing: 0.3,
        }}>{cta}</button>
      )}
    </div>
  );
}

function Plink({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        padding: '2px 0', cursor: 'pointer',
        color: bronzeDark, fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 13, letterSpacing: 0.2,
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}
    >
      {label} <Icon id="ico-arrow-r" size={12} color={bronzeDark} />
    </button>
  );
}

function Row({ children, borderBottom, onClick }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      style={{
        appearance: 'none', background: 'transparent', border: 'none',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 0',
        borderBottom: borderBottom ? `1px solid ${paperHair}` : 'none',
        width: '100%', cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
      }}
    >
      {children}
    </Tag>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      style={{
        width: 42, height: 24, borderRadius: 999,
        border: 'none',
        background: on ? bronzeDark : '#CFC7B7',
        position: 'relative', cursor: 'pointer',
        transition: 'background 180ms ease',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 2, left: on ? 20 : 2,
        width: 20, height: 20, borderRadius: 999, background: '#FFFFFF',
        transition: 'left 180ms cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function TierPill({ tier }) {
  const isAdvisor = tier === 'advisor';
  const isSeeker = tier === 'seeker';
  const color = isAdvisor ? advisor : isSeeker ? bronzeDark : inkLight;
  const mark = isAdvisor ? '✦' : isSeeker ? '◆' : '◦';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: "'EB Garamond', Georgia, serif",
      fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase',
      color, fontWeight: 500,
      padding: '4px 11px', borderRadius: 999,
      border: `1px solid ${withAlpha(isAdvisor ? advisor : gold, '40')}`,
      background: withAlpha(isAdvisor ? advisor : gold, '10'),
      whiteSpace: 'nowrap',
    }}>
      <span aria-hidden="true">{mark}</span>
      {TIER_LABELS[tier]} · {TIER_PRICES[tier]}
    </span>
  );
}
