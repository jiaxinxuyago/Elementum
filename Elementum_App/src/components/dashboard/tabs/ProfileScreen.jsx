// ===================================================================
// ELEMENTUM · ProfileScreen (DOC5 §14)
// ===================================================================
// Intentionally minimal — "the chart is the profile". Cards:
//   · Profile data    — birth inputs used to generate the chart
//   · Notifications    — status + delivery time + toggle
//   · Account          — tier badge + manage subscription + sign out
//   · Debug (dev only) — reset & start over (confirm first)
//
// No avatar / username / social handle (DOC5 §14 design principle).
// ===================================================================

import React from 'react';
import {
  useChart, TIER_LABELS, TIER_PRICES,
} from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { Icon } from '../../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, advisor,
  paperHair, borderLight, cardstockBg, parchment,
  withAlpha,
} from '../../../styles/tokens';

const IS_DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ProfileScreen() {
  const { birthData, chart, tier, setTier, updateBirthData, resetFlow } = useChart();
  const { openUpgrade } = useUpgrade();

  const locName = birthData?.location && typeof birthData.location === 'object'
    ? birthData.location.name
    : birthData?.location || 'Beijing (default)';
  // Location is "confirmed" only when geocoded to a numeric longitude
  // (DOC5 §22 geocoding soft-fallback).
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

  // True Solar Time — shown only when longitude shifts it off local clock
  // time (TST = local − (lon−120)/15 h). DOC5 §14.
  const lon = chart?.meta?.longitude;
  let tstStr = null;
  if (!birthData?.hourUnknown && birthData?.hour != null && typeof lon === 'number' && Math.abs(lon - 120) > 0.5) {
    const tst = (((birthData.hour - (lon - 120) / 15) % 24) + 24) % 24;
    const h = Math.floor(tst);
    const m = Math.round((tst - h) * 60);
    tstStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  const notifyOn = birthData?.notifyOn ?? false;
  const notifyTime = birthData?.notifyHour != null
    ? `${birthData.notifyHour}:${String(birthData.notifyMinute ?? 0).padStart(2, '0')} ${birthData.notifyMeridiem || 'AM'}`
    : '—';

  const handleReset = () => {
    if (window.confirm('This will clear all your data. Continue?')) {
      resetFlow?.();
      if (typeof window !== 'undefined') window.location.hash = '#/welcome';
    }
  };

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      <header style={{ marginBottom: 22 }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
          color: bronzeDark, fontWeight: 500,
        }}>
          Profile · 个 人
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 38, fontWeight: 400, lineHeight: 1.1,
          color: ink, margin: '6px 0 0',
        }}>
          Me
        </h1>
      </header>

      {/* Profile data card */}
      <Card>
        <CardEyebrow>Birth Data</CardEyebrow>
        <DataRow label="Birth Date" value={dateStr} />
        <DataRow label="Birth Time" value={timeStr} />
        {tstStr && <DataRow label="True Solar Time" value={tstStr} />}
        <DataRow label="Location" value={locName} />
        <DataRow label="Energy Current" value={energyCurrent} last />
        {/* §22 completion prompts — non-blocking, non-alarming. */}
        {birthData?.hourUnknown && (
          <PromptCard
            text="Your birth chart is a three-pillar reading."
            cta="Discover your birth hour →"
            onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/chart-resonance'; }}
          />
        )}
        {!birthData?.hourUnknown && birthData?.hourWindow && (
          <PromptCard
            text="Your birth chart uses an approximate hour."
            cta="Add your exact time for a more precise reading →"
            onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/step4'; }}
          />
        )}
        {locationNotConfirmed && (
          <PromptCard
            text="Birth location not confirmed — using standard solar time."
            cta="Update location →"
            onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/step5'; }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <LinkRow label="View your birth chart" onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/chart-reveal'; }} />
          <LinkRow label="Edit birth data" onClick={() => { if (typeof window !== 'undefined') window.location.hash = '#/step1'; }} />
        </div>
      </Card>

      {/* Notification settings card */}
      <Card>
        <CardEyebrow>Notifications</CardEyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, color: ink }}>
              Daily reading
            </div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: inkLight, marginTop: 2 }}>
              {notifyOn ? `Delivered at ${notifyTime}` : 'Off'}
            </div>
          </div>
          <Toggle on={notifyOn} onToggle={() => updateBirthData({ notifyOn: !notifyOn })} />
        </div>
      </Card>

      {/* Account card */}
      <Card>
        <CardEyebrow>Account</CardEyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14 }}>
          <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, color: ink }}>
            Current plan
          </span>
          <TierPill tier={tier} />
        </div>
        <LinkRow
          label={tier === 'advisor' ? 'Manage subscription' : 'Upgrade your plan'}
          onClick={() => openUpgrade('your full reading')}
        />
        <button
          type="button"
          onClick={() => { /* sign-out is a no-op until auth lands */ }}
          style={{
            width: '100%',
            marginTop: 14,
            padding: 14,
            borderRadius: 12,
            border: 'none',
            background: '#8C857B',
            color: '#FFFFFF',
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </Card>

      {/* Debug card — dev only */}
      {IS_DEV && (
        <section style={{
          background: '#F8EFE8',
          border: `1px dashed ${paperHair}`,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
            color: inkLight, fontWeight: 500, marginBottom: 12,
          }}>
            Dev Tools
          </div>
          <button
            type="button"
            onClick={handleReset}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: 'none',
              background: '#8C857B',
              color: '#FFFFFF',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Reset &amp; Start Over
          </button>
        </section>
      )}
    </main>
  );
}

// ── small building blocks ─────────────────────────────────────────
// §22 non-blocking completion prompt — quiet gold card + soft CTA.
function PromptCard({ text, cta, onClick }) {
  return (
    <div style={{
      margin: '0 0 12px', padding: '12px 14px', borderRadius: 10,
      background: withAlpha(gold, '10'), border: `1px solid ${withAlpha(gold, '40')}`,
    }}>
      <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: inkSoft, lineHeight: 1.5, marginBottom: 6 }}>{text}</div>
      <button type="button" onClick={onClick} style={{
        appearance: 'none', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: bronzeDark, letterSpacing: 0.3,
      }}>{cta}</button>
    </div>
  );
}

function Card({ children }) {
  return (
    <section style={{
      background: cardstockBg,
      border: `1px solid ${paperHair}`,
      borderRadius: 16,
      padding: '18px',
      marginBottom: 16,
    }}>
      {children}
    </section>
  );
}

function CardEyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'EB Garamond', Georgia, serif",
      fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
      color: bronzeDark, fontWeight: 500, marginBottom: 14,
    }}>
      {children}
    </div>
  );
}

function DataRow({ label, value, last }) {
  return (
    <div style={{
      paddingBottom: 16,
      marginBottom: last ? 0 : 16,
      borderBottom: last ? 'none' : `1px solid ${borderLight}`,
    }}>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
        color: inkLight, fontWeight: 500, marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 18, color: ink,
      }}>
        {value}
      </div>
    </div>
  );
}

function LinkRow({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        appearance: 'none',
        background: 'transparent',
        border: 'none',
        padding: '4px 0',
        color: bronzeDark,
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: 14,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
      }}
    >
      {label}
      <Icon id="ico-arrow-r" size={13} color={bronzeDark} />
    </button>
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
        width: 46, height: 28, borderRadius: 999,
        border: 'none',
        background: on ? bronzeDark : '#CFC7B7',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 180ms ease',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3, left: on ? 21 : 3,
        width: 22, height: 22, borderRadius: 999,
        background: '#FFFFFF',
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
      fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
      color, fontWeight: 500,
      padding: '4px 12px', borderRadius: 999,
      border: `1px solid ${withAlpha(isAdvisor ? advisor : gold, '40')}`,
      background: withAlpha(isAdvisor ? advisor : gold, '10'),
    }}>
      <span aria-hidden="true">{mark}</span>
      {TIER_LABELS[tier]} · {TIER_PRICES[tier]}
    </span>
  );
}
