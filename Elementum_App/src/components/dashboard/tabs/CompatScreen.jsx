// ===================================================================
// ELEMENTUM · CompatScreen  ("Your Circle" — Compatibility, screens-v2)
// ===================================================================
// Two surfaces on the `app-compat` tab:
//   intro  — the ceremonial compat-hero invitation ("Who completes your
//            chart?") + the 3-step rite preview + "Begin the joining".
//   result — element comparison + relationship archetype; Free shows a
//            teaser + upgrade, Seeker+ shows % + full reading + share card.
//
// The "their birth" collection lives in the full-frame friend flow
// (CompatFriendSteps, top-level routes — no tab bar). App drives that flow
// and the compatibility calc, then hands the finished `result` back here.
// ===================================================================

import React from 'react';
import { useChart } from '../../../store/chartContext.jsx';
import { useUpgrade } from '../UpgradeModal.jsx';
import { ElementMark, Icon } from '../../shared/icons';
import { MoodboardArt } from '../VisualTile.jsx';
import StemSeal, { stemSealSrc } from '../../shared/StemSeal.jsx';
import { stemArt, elementArt } from '../../../styles/backgrounds.js';
import {
  ink, inkSoft, inkLight, bronzeDark, gold, silk, cream,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../../styles/tokens';

const ELEMENT_TO_PIGMENT = { Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water' };

export default function CompatScreen({ onStartCompare, onCompareAgain }) {
  const { tier, compatResult, setCompatResult } = useChart();
  const { openUpgrade } = useUpgrade();
  const isSeeker = tier !== 'free';
  const result = compatResult;
  const startFresh = (go) => { setCompatResult(null); go && go(); };

  // ── INTRO ─ ceremonial compat-hero invitation ──────────────────
  if (!result) {
    return (
      <main style={{ minHeight: '100%', background: silk, padding: '54px 22px 24px' }}>
        {/* Full-bleed pavilion hero */}
        <div style={{ position: 'relative', margin: '-54px -22px 0', height: 330, overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/art/compat-hero.png")', backgroundSize: 'cover', backgroundPosition: '50% 32%' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, rgba(28,24,19,0.34), rgba(28,24,19,0))', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: '62%', background: 'linear-gradient(to top, rgb(241,233,214) 4%, rgba(241,233,214,0.72) 32%, rgba(241,233,214,0) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 20, zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
              <span style={{ width: 18, height: 1, background: 'rgb(160,64,48)' }} />
              <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: '2.6px', textTransform: 'uppercase', color: 'rgb(107,83,57)', fontWeight: 600 }}>Your Circle</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 33, fontWeight: 500, lineHeight: 1.04, color: 'rgb(43,39,34)', margin: 0 }}>Who completes<br />your chart?</h1>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 0 0' }}>
          <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14, lineHeight: 1.58, color: 'rgb(74,67,59)', margin: 0 }}>
            In the old rite of <span style={{ fontStyle: 'italic' }}>hé hūn</span>, two birth charts are laid side by side — to see where their energies nourish, where they clash, and whether the bond is written in the pillars.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 13px' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(205,190,158,0.7)' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(133,125,114)' }}>The rite, in three</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(205,190,158,0.7)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RiteRow glyph="我" title="Your eight characters" sub="The chart you already carry, ready to be matched." />
            <RiteRow glyph="彼" title="Their birth, offered" sub="Name the date, hour, and place of the one you wonder about." />
            <RiteRow glyph="缘" title="The reading of two" sub="Receive how your elements answer each other — and the verdict." />
          </div>

          <button type="button" onClick={() => startFresh(onStartCompare)} style={{
            appearance: 'none', width: '100%', marginTop: 18, height: 52, border: 'none', borderRadius: 999,
            background: 'rgb(43,39,34)', color: 'rgb(241,233,214)', fontFamily: "'Cinzel', serif",
            fontSize: 12, letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11,
            boxShadow: 'rgba(40,30,20,0.22) 0px 8px 20px',
          }}>
            Begin the joining <span style={{ fontSize: 15 }}>⟶</span>
          </button>
          <div style={{ textAlign: 'center', marginTop: 13, marginBottom: 6, fontFamily: "'EB Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 12.5, color: 'rgb(133,125,114)' }}>
            A two-minute rite · your chart stays private
          </div>
        </div>
      </main>
    );
  }

  // ── RESULT ─ bridging medallion at the seam ────────────────────
  const r = result;
  const userPigKey = ELEMENT_TO_PIGMENT[r.user.element] || 'metal';
  const otherPigKey = ELEMENT_TO_PIGMENT[r.other.element] || 'metal';
  const medallionPig = pigments[userPigKey].deep;
  return (
    <main style={{ minHeight: '100%', padding: '54px 22px 24px' }}>
      <div style={{ position: 'relative', display: 'flex', gap: 10, marginBottom: 56 }}>
        <PersonCell label="You" stem={r.user.stem} element={r.user.element} sub={r.user.label} archetype={r.user.archetype} pigKey={userPigKey} />
        <PersonCell label={r.name} stem={r.other.stem} element={r.other.element} sub={r.other.label} archetype={r.other.archetype} pigKey={otherPigKey} />
        <ScoreMedallion score={r.score} pigColor={medallionPig} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 4 }}>
          {r.user.element} meets {r.other.element}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 29, fontWeight: 400, color: ink, lineHeight: 1.05 }}>"{r.archetype}"</div>
        {r.headline && <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, color: inkSoft, marginTop: 6 }}>{r.headline}</div>}
      </div>

      {isSeeker ? (
        <>
          <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65, color: inkSoft, margin: 0 }}>{r.reading}</p>
          </section>
          <div style={{ background: ink, borderRadius: 16, padding: '20px', textAlign: 'center', marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 12, color: silk }}>
              <ElementMark element={userPigKey} size={28} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: 'rgba(248,246,240,0.5)' }}>×</span>
              <ElementMark element={otherPigKey} size={28} />
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, color: silk, lineHeight: 1.25 }}>
              We're {r.score}% compatible —<br />{r.user.element} meets {r.other.element}
            </div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(248,246,240,0.4)', marginTop: 10 }}>Elementum</div>
          </div>
        </>
      ) : (
        <>
          <section style={{ background: cardstockBg, border: `1px solid ${paperHair}`, borderRadius: 16, padding: '16px 18px', marginBottom: 14 }}>
            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65, color: inkSoft, margin: 0 }}>{r.teaser}</p>
          </section>
          <button type="button" onClick={() => openUpgrade('the full relationship reading')} style={{
            width: '100%', padding: '14px', borderRadius: 999, border: `1px solid ${withAlpha(gold, '40')}`,
            background: withAlpha(gold, '10'), color: bronzeDark, cursor: 'pointer',
            fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icon id="ico-lock" size={14} color={bronzeDark} /> Unlock the full reading with Seeker
          </button>
        </>
      )}

      <button type="button" onClick={() => startFresh(onCompareAgain)} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, margin: '16px auto 0',
        appearance: 'none', background: 'transparent', border: 'none',
        color: inkLight, cursor: 'pointer', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      }}>Compare someone else <Icon id="ico-arrow-r" size={15} color={inkLight} /></button>
    </main>
  );
}

// ── Rite preview row (intro) ───────────────────────────────────────
function RiteRow({ glyph, title, sub }) {
  return (
    <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
      <div style={{ position: 'relative', flexShrink: 0, width: 34, height: 34, borderRadius: 999, border: '1px solid rgba(107,83,57,0.35)', background: 'rgba(248,244,236,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 16, color: 'rgb(107,83,57)', lineHeight: 1 }}>{glyph}</span>
      </div>
      <div style={{ flex: 1, paddingTop: 1 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 600, color: 'rgb(43,39,34)', lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, lineHeight: 1.45, color: 'rgb(133,125,114)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

// ── Score medallion — conic donut bridging the two person cards ────
function ScoreMedallion({ score, pigColor }) {
  return (
    <div aria-label={`${score}% compatible`} style={{
      position: 'absolute', left: '50%', bottom: -32, transform: 'translateX(-50%)', zIndex: 4,
      width: 80, height: 80, borderRadius: 999,
      background: `conic-gradient(${pigColor} 0 ${score * 3.6}deg, ${paperHair} ${score * 3.6}deg 360deg)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(40,30,20,0.18)',
    }}>
      <div style={{ width: 64, height: 64, borderRadius: 999, background: cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 500, color: ink, lineHeight: 1 }}>
          {score}<span style={{ fontSize: 11, fontFamily: "'EB Garamond', Georgia, serif", color: inkLight, marginLeft: 1 }}>%</span>
        </span>
      </div>
    </div>
  );
}

// ── Person card ────────────────────────────────────────────────────
function PersonCell({ label, stem, element, sub, archetype, pigKey }) {
  const pig = pigments[pigKey];
  const artUrl = stemArt(stem) || elementArt(element);
  return (
    <div style={{
      position: 'relative', flex: 1, overflow: 'hidden', borderRadius: 16,
      border: `1px solid ${withAlpha(pig.base, '40')}`, background: cardstockBg,
      padding: '16px 10px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
      textAlign: 'center', boxShadow: '0 1px 0 rgba(43,39,34,.04), 0 8px 20px rgba(60,46,28,.07)',
    }}>
      {artUrl && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
          <MoodboardArt src={artUrl} pigBase={pig.base} />
        </div>
      )}
      <span style={{ position: 'relative', zIndex: 1, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: inkLight, fontWeight: 500 }}>{label}</span>
      {stemSealSrc(stem) ? (
        <StemSeal stem={stem} size={64} style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 3px 8px rgba(40,30,20,0.2))' }} />
      ) : (
        <span style={{ position: 'relative', zIndex: 1, width: 48, height: 48, borderRadius: 12, background: 'rgba(248,244,236,0.75)', border: `1px solid ${withAlpha(pig.base, '40')}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pig.deep }}>
          <ElementMark element={pigKey} size={24} />
        </span>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 24, color: ink, lineHeight: 1, fontWeight: 500 }}>{stem}</div>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 600, color: ink, marginTop: 2 }}>{archetype}</div>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: inkLight, fontWeight: 500, marginTop: 3 }}>{sub || `${element}`}</div>
      </div>
    </div>
  );
}
