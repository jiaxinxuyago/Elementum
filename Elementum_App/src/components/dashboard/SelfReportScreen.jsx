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
import {
  ink, inkSoft, inkLight, bronzeDark, gold, silk,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const KEY = 'elementum_selfreport_v1';
const CHAPTERS = ['Transition', 'Building', 'Thriving', 'Challenging', 'Exploring'];
const DOMAINS = ['Career', 'Relationships', 'Wealth', 'Health', 'Purpose'];

function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; } }

export default function SelfReportScreen({ onBack }) {
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
      <button type="button" onClick={onBack} style={{
        appearance: 'none', background: 'transparent', border: 'none', color: inkLight, cursor: 'pointer',
        padding: 0, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      }}><Icon id="ico-chev-l" size={15} color={inkLight} /> Guidance</button>

      <header style={{ marginBottom: 8 }}>
        <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500 }}>Self-Report · 自 述</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 34, fontWeight: 400, lineHeight: 1.1, color: ink, margin: '6px 0 0' }}>Your life context</h1>
      </header>
      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.6, color: inkSoft, margin: '0 0 22px' }}>
        The more you share, the more precisely your readings speak to where you actually are.
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
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontStyle: 'italic', color: bronzeDark,
        }}>Your readings have been recalibrated.</div>
      )}
    </main>
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
