// ===================================================================
// ELEMENTUM · SelfReportScreen  (DOC5 §12 Card 3 — Self-Report)
// ===================================================================
// Seeker life-context intake that (conceptually) enriches all readings.
// Fields: Life chapter (single) · Key domains (multi) · Open context
// (textarea) · Last updated. Save → "Your readings have been
// recalibrated." Persists in localStorage.
// ===================================================================

import React, { useState } from 'react';
import { Icon } from '../shared/icons';
import { useChart, SELF_REPORT_PRICE } from '../../store/chartContext.jsx';
import { useUpgrade } from './UpgradeModal.jsx';
import HorizonHeader from '../guidance/HorizonHeader.jsx';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, silk,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const KEY = 'elementum_selfreport_v1';
const CHAPTERS = ['Transition', 'Building', 'Thriving', 'Challenging', 'Exploring'];
const DOMAINS = ['Career', 'Relationships', 'Wealth', 'Health', 'Purpose'];

function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }

export default function SelfReportScreen({ onBack }) {
  const { tier, hasSelfReport, purchaseSelfReport } = useChart();
  const { openUpgrade } = useUpgrade();
  const saved = read();
  const [chapter, setChapter] = useState(saved?.chapter || null);
  const [domains, setDomains] = useState(saved?.domains || []);
  const [context, setContext] = useState(saved?.context || '');
  const [savedAt, setSavedAt] = useState(saved?.at || null);
  const [justSaved, setJustSaved] = useState(false);

  const save = () => {
    const at = new Date().toISOString().slice(0, 10);
    try { localStorage.setItem(KEY, JSON.stringify({ chapter, domains, context, at })); } catch {}
    setSavedAt(at);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2600);
  };

  const pig = pigments.metal.deep;

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      <HorizonHeader
        art="/art/fhdr-self.png"
        bgPosition="50% 20%"
        tint="90,127,168"
        ruleColor="rgb(74,108,150)"
        eyebrow="A Quiet Reckoning"
        title="Self-Report"
        subtitle="Tell your readings who you really are"
        onBack={onBack}
      />
      <div style={{ height: 14 }} />
      {!hasSelfReport ? (
        <PurchaseGate tier={tier} onBuy={purchaseSelfReport} onUpgrade={() => openUpgrade('Self-Report')} />
      ) : (
      <>
      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.6, color: inkSoft, margin: '0 0 22px' }}>
        Your Self-Report is active — the more you share, the more precisely your readings and your consultant speak to where you actually are.
      </p>

      {/* Life chapter — single select */}
      <FieldLabel>Where are you in life right now?</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        {CHAPTERS.map((c) => {
          const on = chapter === c;
          return <Pill key={c} on={on} onClick={() => setChapter(on ? null : c)}>{c}</Pill>;
        })}
      </div>

      {/* Key domains — multi select */}
      <FieldLabel>Which domains are most alive for you?</FieldLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        {DOMAINS.map((d) => {
          const on = domains.includes(d);
          return <Pill key={d} on={on} onClick={() => setDomains((p) => on ? p.filter((x) => x !== d) : [...p, d])}>{d}</Pill>;
        })}
      </div>

      {/* Open context */}
      <FieldLabel>Anything else worth knowing? (optional)</FieldLabel>
      <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={3}
        placeholder="A sentence or two about what's actually going on…"
        style={{
          width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12, resize: 'vertical',
          border: `1px solid ${paperHair}`, background: cardstockBg, marginBottom: 18,
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.6, color: ink,
        }} />

      {savedAt && (
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12, color: inkLight, marginBottom: 14 }}>
          Last updated {savedAt}
        </div>
      )}

      <button type="button" onClick={save} style={{
        appearance: 'none', width: '100%', padding: '14px', borderRadius: 12, border: 'none',
        background: bronzeDark, color: silk, cursor: 'pointer',
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.5,
      }}>Update my context</button>

      {justSaved && (
        <div style={{
          marginTop: 14, padding: '12px 16px', borderRadius: 12, textAlign: 'center',
          background: withAlpha(gold, '10'), border: `1px solid ${withAlpha(gold, '40')}`,
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: bronzeDark,
        }}>Saved — your readings and consultant now read from this.</div>
      )}
      </>
      )}
    </main>
  );
}

// One-time purchase gate (DOC5 §19). Shown until the Self-Report add-on is
// owned. Seekers get the $6.99 one-time buy; Free users are routed to upgrade
// first (Self-Report is a Seeker add-on).
function PurchaseGate({ tier, onBuy, onUpgrade }) {
  const isSeeker = tier === 'seeker' || tier === 'advisor';
  const pig = pigments.water.deep;
  const Bullet = ({ children }) => (
    <div style={{
      display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 8,
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, lineHeight: 1.5, color: inkSoft,
    }}>
      <span aria-hidden="true" style={{
        flexShrink: 0, marginTop: 7, width: 4, height: 4, borderRadius: 999, background: pig, opacity: 0.7,
      }} />
      <span>{children}</span>
    </div>
  );
  return (
    <div>
      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.6, color: inkSoft, margin: '0 0 18px' }}>
        A one-time calibration that tunes your readings — and your consultant — to how your energy actually shows up in your life.
      </p>

      {/* What it tunes */}
      <div style={{
        background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 14,
        padding: '16px 18px', marginBottom: 16,
      }}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 12 }}>
          What it tunes
        </div>
        <Bullet>The life chapter you're actually in</Bullet>
        <Bullet>The domains most alive for you right now</Bullet>
        <Bullet>Anything you want your readings to know — in your own words</Bullet>
        <div style={{ marginTop: 6, paddingTop: 12, borderTop: `1px solid ${paperHair}`, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, color: inkLight, lineHeight: 1.5 }}>
          Feeds directly into your AI Consultant and contextualizes your readings.
        </div>
      </div>

      {isSeeker ? (
        <div style={{
          background: withAlpha(pigments.water.base, '10'),
          border: `1px solid ${withAlpha(pigments.water.base, '40')}`,
          borderRadius: 14, padding: '16px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: ink }}>Self-Report</span>
            <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: pig, fontWeight: 600 }}>{SELF_REPORT_PRICE} · one-time</span>
          </div>
          <button type="button" onClick={onBuy} style={{
            appearance: 'none', width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: bronzeDark, color: silk, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.5,
          }}>Add Self-Report — {SELF_REPORT_PRICE}</button>
          <div style={{ marginTop: 10, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5, color: inkLight, textAlign: 'center', lineHeight: 1.5 }}>
            One-time purchase · yours to keep · separate from your Seeker subscription
          </div>
        </div>
      ) : (
        <div style={{
          background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 14, padding: '16px 18px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: inkSoft, lineHeight: 1.55, marginBottom: 12 }}>
            Self-Report is a Seeker add-on. Become a Seeker first, then add it any time.
          </div>
          <button type="button" onClick={onUpgrade} style={{
            appearance: 'none', width: '100%', padding: '13px', borderRadius: 12, border: `1px solid ${withAlpha(gold, '40')}`,
            background: withAlpha(gold, '10'), color: bronzeDark, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, fontWeight: 500, letterSpacing: 0.4,
          }}>Become a Seeker to unlock</button>
        </div>
      )}
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 10 }}>{children}</div>;
}
function Pill({ on, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer', borderRadius: 999, padding: '8px 14px',
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      border: `1px solid ${on ? withAlpha(pigments.metal.base, '40') : paperHair}`,
      background: on ? withAlpha(pigments.metal.base, '10') : 'transparent',
      color: on ? pigments.metal.deep : inkLight,
    }}>{children}</button>
  );
}
