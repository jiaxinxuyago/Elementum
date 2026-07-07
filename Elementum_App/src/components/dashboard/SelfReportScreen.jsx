// ===================================================================
// ELEMENTUM · SelfReportScreen  (DOC5 §12 Card 3 — Self-Report)
// ===================================================================
// Seeker life-context intake that (conceptually) enriches all readings.
// Fields: Life chapter (single) · Key domains (multi) · Open context
// (textarea) · Last updated. Save → "Your readings have been
// recalibrated." Persists in localStorage.
// ===================================================================

import { useEffect, useState } from 'react';

import { useChart } from '../../store/chartContext.jsx';
import { useAuth } from '../../store/authContext.jsx';
import { SELF_REPORT_PRICE, PAYMENT } from '../../infra/index.js';
import { composeSelfReport } from '../../content/index.js';
import { useUpgrade } from './UpgradeModal.jsx';
import AuthModal, { PURCHASE_INTENT_KEY } from './AuthModal.jsx';
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
  const { tier, hasSelfReport, chart } = useChart();
  const { user } = useAuth();
  const { openUpgrade } = useUpgrade();
  const [authOpen, setAuthOpen] = useState(false);
  const saved = read();

  // Real purchase (DOC10 §4.2): account required so the payment carries the
  // buyer's id — the webhook then writes has_self_report server-side.
  const goToStripe = (u) => {
    if (typeof window === 'undefined' || !PAYMENT.selfReportCheckout) return;
    const url = new URL(PAYMENT.selfReportCheckout);
    if (u?.id) url.searchParams.set('client_reference_id', u.id);
    if (u?.email) url.searchParams.set('prefilled_email', u.email);
    window.location.href = url.toString();
  };
  const buySelfReport = () => (user ? goToStripe(user) : setAuthOpen(true));

  // Google OAuth return trip mid-purchase (intent stored by AuthModal): resume
  // straight to checkout. Cleared BEFORE navigating so the post-payment
  // ?selfreport=ok return can never bounce back to Stripe.
  useEffect(() => {
    if (!user || hasSelfReport || typeof window === 'undefined') return;
    let intent = null;
    try {
      intent = sessionStorage.getItem(PURCHASE_INTENT_KEY);
      if (intent === 'selfreport') sessionStorage.removeItem(PURCHASE_INTENT_KEY);
    } catch { /* storage unavailable — nothing to resume */ }
    if (intent === 'selfreport') goToStripe(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const [chapter, setChapter] = useState(saved?.chapter || null);
  const [domains, setDomains] = useState(saved?.domains || []);
  const [context, setContext] = useState(saved?.context || '');
  const [savedAt, setSavedAt] = useState(saved?.at || null);
  // 'form' | 'report' — saving DRAWS the report (the paid deliverable, DOC5
  // §12 Card 3 v1: composed on-device, no LLM); "Edit" returns to the form.
  const [view, setView] = useState('form');

  const save = () => {
    const at = new Date().toISOString().slice(0, 10);
    try { localStorage.setItem(KEY, JSON.stringify({ chapter, domains, context, at })); } catch { /* storage unavailable — ignore */ }
    setSavedAt(at);
    setView('report');
  };

  const report = view === 'report'
    ? composeSelfReport(chart, { chapter, domains, context, at: savedAt })
    : null;

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
        <PurchaseGate tier={tier} onBuy={buySelfReport} onUpgrade={() => openUpgrade('Self-Report')} />
      ) : view === 'report' && report ? (
        <ReportDoc report={report} onEdit={() => setView('form')} />
      ) : (
      <>
      <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.6, color: inkSoft, margin: '0 0 22px' }}>
        Tell your report where you actually are — it is drawn from your chart <em style={{ fontStyle: 'normal' }}>and</em> your answers, and redrawn every time you update them.
      </p>

      {savedAt && (
        <button type="button" onClick={() => setView('report')} style={{
          appearance: 'none', background: 'transparent', border: 'none', padding: 0,
          marginBottom: 20, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: bronzeDark,
        }}>View your report →</button>
      )}

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
      }}>{savedAt ? 'Redraw my report' : 'Draw my report'}</button>
      </>
      )}

      {/* Purchase-gated account sheet — buyer continues to Stripe on success. */}
      <AuthModal
        open={authOpen}
        purchase
        intent="selfreport"
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => goToStripe(u)}
      />
    </main>
  );
}

// ───────────────────────────────────────────────────────────────────
// ReportDoc — the composed personal report, rendered as a keepable
// document (DOC5 §12 Card 3 v1). Pure presentation of composeSelfReport().
// ───────────────────────────────────────────────────────────────────
function ReportDoc({ report, onEdit }) {
  const [thesis, edge] = (report.manifesto || '').split(' · ');
  return (
    <article style={{
      background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16,
      padding: '26px 22px 24px',
    }}>
      {/* Document head */}
      <div style={{ textAlign: 'center', paddingBottom: 18, borderBottom: `1px solid ${paperHair}`, marginBottom: 6 }}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500 }}>
          Your Self-Report
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, color: ink, margin: '8px 0 2px' }}>
          {report.archetypeLabel}
        </div>
        {thesis && (
          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: inkSoft }}>
            {thesis}{edge ? ` — ${edge}` : ''}
          </div>
        )}
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11, color: inkLight, marginTop: 8 }}>
          Drawn {report.date}
        </div>
      </div>

      {report.sections.map((s) => (
        <section key={s.key} style={{ padding: '18px 0 4px', borderBottom: `1px solid ${withAlpha(gold, '30')}` }}>
          <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500 }}>
            {s.eyebrow}
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 500, color: ink, margin: '5px 0 8px' }}>
            {s.title}
          </h3>
          {s.quote && (
            <blockquote style={{
              margin: '0 0 10px', padding: '10px 14px', borderLeft: `2px solid ${withAlpha(gold, '60')}`,
              background: withAlpha(gold, '08'), borderRadius: '0 10px 10px 0',
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15.5, color: inkSoft, lineHeight: 1.55,
            }}>
              “{s.quote}”
            </blockquote>
          )}
          {(s.body || []).map((p, i) => (
            <p key={i} style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65, color: inkSoft, margin: '0 0 12px' }}>
              {p}
            </p>
          ))}
          {(s.items || []).map((it) => (
            <div key={it.name} style={{ margin: '0 0 12px' }}>
              <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: pigments.water.deep, fontWeight: 600, marginBottom: 3 }}>
                {it.name}
              </div>
              <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65, color: inkSoft, margin: 0 }}>
                {it.text}
              </p>
            </div>
          ))}
        </section>
      ))}

      <button type="button" onClick={onEdit} style={{
        appearance: 'none', display: 'block', margin: '18px auto 0', background: 'transparent',
        border: 'none', cursor: 'pointer',
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: bronzeDark,
      }}>Edit my answers →</button>
    </article>
  );
}

// Bulleted feature line. Module-scope so it isn't re-created on every render
// (react-hooks/static-components). Uses the fixed water pigment.
function Bullet({ children }) {
  return (
    <div style={{
      display: 'flex', gap: 9, alignItems: 'flex-start', marginBottom: 8,
      fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, lineHeight: 1.5, color: inkSoft,
    }}>
      <span aria-hidden="true" style={{
        flexShrink: 0, marginTop: 7, width: 4, height: 4, borderRadius: 999, background: pigments.water.deep, opacity: 0.7,
      }} />
      <span>{children}</span>
    </div>
  );
}

// One-time purchase gate (DOC5 §19). Shown until the Self-Report add-on is
// owned. Seekers get the $6.99 one-time buy; Free users are routed to upgrade
// first (Self-Report is a Seeker add-on).
function PurchaseGate({ tier, onBuy, onUpgrade }) {
  const isSeeker = tier === 'seeker' || tier === 'advisor';
  const pig = pigments.water.deep;
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
