// ===================================================================
// SCREEN 1 — WELCOME (DOC5 §6, Ink & Pigment v2)
// Ported verbatim from Design/flow/welcome.jsx in the v2 bundle.
// Aged silk ground with two keyed ink-wash layers (distant ridges above,
// island cluster below). No central glyph or masthead — the Reveal mark
// is withheld until §9. ELEMENTUM wordmark IS the identity mark here.
// ===================================================================

import React from 'react';
import {
  INK,
  INK_SOFT,
  SILK,
  BRONZE_DARK,
  SilkPaper,
  WelcomeInkScene,
  StatusBar,
} from '../../styles/tokens.jsx';

export default function WelcomeScreen({ onContinue }) {
  return (
    <div
      style={{
        background: SILK,
        color: INK,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Staggered entrance animations — wordmark fades up first,
          italic tagline next, then CTA + secondary pill */}
      <style>{`
        @keyframes welcomeFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .welcome-wordmark {
          opacity: 0;
          animation: welcomeFadeUp 800ms cubic-bezier(0.22, 1, 0.36, 1) 400ms forwards;
        }
        .welcome-tagline {
          opacity: 0;
          animation: welcomeFadeUp 800ms cubic-bezier(0.22, 1, 0.36, 1) 800ms forwards;
        }
        .welcome-cta {
          opacity: 0;
          animation: welcomeFadeUp 800ms cubic-bezier(0.22, 1, 0.36, 1) 1200ms forwards;
        }
      `}</style>

      <SilkPaper />
      <WelcomeInkScene />
      <StatusBar tint={INK} />

      {/* No masthead mark — silk, mountains, and the wordmark speak.
          The Reveal glyph is withheld until §9. */}

      {/* Wordmark + tagline — ELEMENTUM sets the mark, single italic line below */}
      <div
        className="welcome-wordmark"
        style={{
          position: 'absolute',
          bottom: 240,
          left: 0,
          right: 0,
          zIndex: 6,
          padding: '0 34px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 10,
            color: INK,
            marginLeft: 10, /* optical centering for tracked caps */
            marginBottom: 22,
          }}
        >
          ELEMENTUM
        </div>
        <p
          className="welcome-tagline"
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 17,
            fontStyle: 'italic',
            color: INK_SOFT,
            lineHeight: 1.55,
            margin: '0 auto',
            maxWidth: 300,
            letterSpacing: 0.1,
          }}
        >
          Your elemental energy,<br />read from the moment you were born.
        </p>
      </div>

      {/* CTA — solid ink pill, tracked Cinzel caps */}
      <div
        className="welcome-cta"
        style={{
          position: 'absolute',
          bottom: 80,
          left: 28,
          right: 28,
          zIndex: 6,
        }}
      >
        <button
          onClick={onContinue}
          style={{
            width: '100%',
            padding: '16px 22px',
            background: INK,
            color: SILK,
            border: 0,
            borderRadius: 999,
            fontFamily: 'Cinzel, serif',
            fontSize: 12,
            letterSpacing: 4,
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'transform 200ms ease, box-shadow 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Discover Yours
          <span
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: 18,
              letterSpacing: 0,
            }}
          >
            →
          </span>
        </button>

        {/* "Already mapped?" — elevated ivory pill with bronze "Sign in" */}
        <div
          style={{
            marginTop: 18,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              background: 'rgba(245,239,224,0.72)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: '1px solid rgba(139,115,85,0.18)',
              borderRadius: 999,
              fontFamily: "'EB Garamond', serif",
              fontSize: 13,
              color: INK,
              fontStyle: 'italic',
              boxShadow: '0 2px 10px rgba(60,40,20,0.08)',
              cursor: 'pointer',
            }}
          >
            Already mapped?
            <span
              style={{
                color: BRONZE_DARK,
                fontStyle: 'normal',
                fontWeight: 500,
                letterSpacing: 0.3,
              }}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
