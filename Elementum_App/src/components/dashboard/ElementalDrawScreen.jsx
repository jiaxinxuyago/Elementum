// ===================================================================
// ELEMENTUM · ElementalDrawScreen  (DOC5 §12 Card 1 — Elemental Draw)
// ===================================================================
// Daily question ritual. The deck is keyed to the day's element (same
// element governing the Today tab). Free draws today's deck; Seeker/
// Advisor may switch decks via the element pills.
//
// Flow: fanned face-down deck → "Draw today's card" → two cards slide
// out → tap one → 3D flip reveal (question + reflection) → the other
// fades → "come back tomorrow".
// ===================================================================

import React, { useMemo, useState } from 'react';
import { useChart } from '../../store/chartContext.jsx';
import { Icon } from '../shared/icons';
import {
  ink, inkSoft, inkLight, bronzeDark, silk,
  paperHair, cardstockBg, pigments, withAlpha,
} from '../../styles/tokens';

const ELEMENT_TO_PIGMENT = { Metal: 'metal', Wood: 'wood', Fire: 'fire', Earth: 'earth', Water: 'water' };
const ELEMENT_HANZI = { Metal: '金', Wood: '木', Fire: '火', Earth: '土', Water: '水' };
const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

// Deck name + question pool per element (DOC5 deck-name mapping).
const DECKS = {
  Wood:  { name: 'Growth & Vision', questions: [
    { q: 'What are you ready to begin that you have only been imagining?', a: 'Wood days favour the first move. The thing you keep picturing is asking to be started, not perfected. Begin it small and visible today — momentum is the only proof Wood respects.' },
    { q: 'Where is your reach exceeding your roots?', a: 'Growth without grounding spreads thin. Name the one commitment you have outgrown, and let it close so the rest can deepen.' },
  ] },
  Fire:  { name: 'Passion & Purpose', questions: [
    { q: 'What would you do today if you were not waiting for permission?', a: 'Fire reveals before it warms. The thing you would do unpermitted is usually the truest thing — bring a little of it into the light today.' },
    { q: 'Where does your light expose what others would rather leave hidden?', a: 'Your clarity is not cruelty, but it lands hot. Today, aim the flame at a problem, not a person.' },
  ] },
  Earth: { name: 'Stability & Wealth', questions: [
    { q: 'What foundation are you building whose top you cannot yet see?', a: 'Earth rewards the unglamorous middle. Trust the layer you are laying now even though no one is applauding it — that is where durable things are made.' },
    { q: 'Where are you holding steady when you might be holding on too long?', a: 'Stability becomes stuckness quietly. Ask whether the thing you are protecting still serves you, or only feels safe.' },
  ] },
  Metal: { name: 'Clarity & Career', questions: [
    { q: 'What decision have you already made but not admitted yet?', a: 'Metal cuts cleanly once you stop arguing with the verdict. You know. Say it today, at least to yourself — the relief is in the naming.' },
    { q: 'Where is your precision a gift, and where is it a wall?', a: 'The same edge that makes your work exact can keep people out. Notice where the standard is protecting quality, and where it is protecting you from being reached.' },
  ] },
  Water: { name: 'Depth & Relationships', questions: [
    { q: 'What are you feeling that you have not let yourself name?', a: 'Water knows before the mind admits it. The feeling you are stepping around is information — let it surface without needing to solve it today.' },
    { q: 'Where would yielding carry you further than pushing?', a: 'Water wins by flowing around, not through. Find the one place today where softening is the stronger move.' },
  ] },
};

// Deterministic 2-question draw for the day (stable within a calendar day).
function dailyPair(deck, seed) {
  const qs = DECKS[deck].questions;
  const i = seed % qs.length;
  const j = (i + 1) % qs.length;
  return i === j ? [qs[i]] : [qs[i], qs[j]];
}

export default function ElementalDrawScreen({ onBack }) {
  const { chart, tier } = useChart();
  const dayElement = chart?.currentFlowDay?.stemElement || 'Metal';
  const dmElement = chart?.dayMaster?.element || 'Metal';
  const isFree = tier === 'free';

  const [deck, setDeck] = useState(dayElement);
  const [phase, setPhase] = useState('idle'); // idle | drawn | revealed
  const [selected, setSelected] = useState(null);

  const seed = useMemo(() => { const n = new Date(); return n.getDate() + n.getMonth() * 31; }, []);
  const pair = useMemo(() => dailyPair(deck, seed), [deck, seed]);

  const pigKey = ELEMENT_TO_PIGMENT[deck] || 'metal';
  const pig = pigments[pigKey].deep;

  const switchDeck = (el) => { setDeck(el); setPhase('idle'); setSelected(null); };
  const draw = () => { setPhase('drawn'); setSelected(null); };
  const pick = (i) => { setSelected(i); setPhase('revealed'); };

  return (
    <main style={{ minHeight: '100%', padding: '54px 20px 24px' }}>
      <button type="button" onClick={onBack} style={{
        appearance: 'none', background: 'transparent', border: 'none', color: inkLight,
        cursor: 'pointer', padding: 0, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 6,
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13,
      }}>
        <Icon id="ico-chev-l" size={15} color={inkLight} /> Guidance
      </button>

      <header style={{ marginBottom: 18 }}>
        <span style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5,
          textTransform: 'uppercase', color: bronzeDark, fontWeight: 500,
        }}>Elemental Draw · 抽 签</span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 34, fontWeight: 400,
          lineHeight: 1.1, color: ink, margin: '6px 0 0',
        }}>Today's draw</h1>
      </header>

      {/* Featured deck label */}
      <div style={{
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10.5, letterSpacing: 2,
        textTransform: 'uppercase', color: withAlpha(pig, 'CC'), fontWeight: 500,
        textAlign: 'center', marginBottom: 18,
      }}>
        {deck} Day · {DECKS[deck].name} Deck
      </div>

      {/* Seeker deck selector */}
      {!isFree && (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
          {ELEMENTS.map((el) => {
            const active = el === deck; const ek = ELEMENT_TO_PIGMENT[el];
            return (
              <button key={el} type="button" onClick={() => switchDeck(el)} style={{
                appearance: 'none', cursor: 'pointer', borderRadius: 999, padding: '5px 12px',
                fontFamily: "'EB Garamond', Georgia, serif", fontSize: 11.5,
                border: `1px solid ${active ? withAlpha(pigments[ek].base, '40') : paperHair}`,
                background: active ? withAlpha(pigments[ek].base, '10') : 'transparent',
                color: active ? pigments[ek].deep : inkLight,
              }}>{el}</button>
            );
          })}
        </div>
      )}

      {/* Stage */}
      <div style={{ minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        {/* Inline keyframes */}
        <style>{`
          @keyframes drawShimmer { 0%,100% { opacity:.10 } 50% { opacity:.20 } }
          @keyframes drawSlideL { from { transform: translateX(20px); opacity:0 } to { transform: translateX(0); opacity:1 } }
          @keyframes drawSlideR { from { transform: translateX(-20px); opacity:0 } to { transform: translateX(0); opacity:1 } }
        `}</style>

        {phase === 'idle' && (
          <>
            <FannedDeck pig={pig} glyph={ELEMENT_HANZI[deck]} />
            <button type="button" onClick={draw} style={ctaStyle}>Draw today's card</button>
          </>
        )}

        {phase === 'drawn' && (
          <>
            <div style={{ display: 'flex', gap: 16 }}>
              {pair.map((_, i) => (
                <CardBack key={i} pig={pig} glyph={ELEMENT_HANZI[deck]} onClick={() => pick(i)}
                  anim={i === 0 ? 'drawSlideR' : 'drawSlideL'} />
              ))}
            </div>
            <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13, color: inkLight }}>
              Tap the card that calls to you
            </div>
          </>
        )}

        {phase === 'revealed' && selected != null && (
          <RevealedCard pig={pig} card={pair[selected]} />
        )}
      </div>

      {phase === 'revealed' && (
        <div style={{
          textAlign: 'center', marginTop: 8,
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, color: inkLight,
        }}>
          {isFree ? 'Come back tomorrow for your next draw.' : 'Draw again from any deck above.'}
        </div>
      )}
    </main>
  );
}

const ctaStyle = {
  appearance: 'none', cursor: 'pointer', border: 'none', borderRadius: 12,
  background: bronzeDark, color: silk, padding: '12px 24px', width: '100%', maxWidth: 280,
  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.5,
};

function FannedDeck({ pig, glyph }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 96 }}>
      {[-10, 0, 10].map((deg, i) => (
        <div key={i} style={{
          position: 'absolute', left: '50%', top: 0, width: 64, height: 90, marginLeft: -32,
          transform: `rotate(${deg}deg) translateY(${Math.abs(deg) * 0.2}px)`, transformOrigin: 'bottom center',
          borderRadius: 8, background: '#EAE4D5', border: `1px solid ${paperHair}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 24, color: pig, opacity: 0.6 }}>{glyph}</span>
          <div style={{ position: 'absolute', inset: 0, background: pig, animation: 'drawShimmer 4s linear infinite' }} />
        </div>
      ))}
    </div>
  );
}

function CardBack({ pig, glyph, onClick, anim }) {
  return (
    <button type="button" onClick={onClick} style={{
      appearance: 'none', cursor: 'pointer', width: 88, height: 124, borderRadius: 10,
      background: '#EAE4D5', border: `1px solid ${paperHair}`, boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      animation: `${anim} 360ms cubic-bezier(0.22,1,0.36,1) both`,
    }}>
      <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: 30, color: pig, opacity: 0.55 }}>{glyph}</span>
    </button>
  );
}

function RevealedCard({ pig, card }) {
  return (
    <section style={{
      width: '100%', background: cardstockBg, border: `1px solid ${withAlpha(pig, '40')}`,
      borderRadius: 16, padding: '24px 20px', textAlign: 'center',
      animation: 'drawSlideR 420ms cubic-bezier(0.22,1,0.36,1) both',
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 21,
        fontWeight: 500, color: ink, lineHeight: 1.4, margin: '0 0 16px',
      }}>
        “{card.q}”
      </p>
      <div style={{ width: 32, height: 1, background: withAlpha(pig, '40'), margin: '0 auto 16px' }} />
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.75,
        color: inkSoft, margin: 0, textAlign: 'left',
      }}>
        {card.a}
      </p>
    </section>
  );
}
