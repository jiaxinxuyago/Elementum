// ===================================================================
// ELEMENTUM · ErrorBoundary  (DES_04 §22 unrecoverable error)
// ===================================================================
// Catches render/calculation errors so the user never sees a blank
// screen or a raw stack trace. Shows a gentle prompt with a soft path
// back to adjust birth data — pre-filled values are preserved in the
// ChartContext, so re-entry resumes cleanly.
// ===================================================================

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log for debugging; never surface raw codes to the user.
    console.error('[Elementum] recovered from render error:', error, info);
  }

  reset = () => {
    this.setState({ hasError: false });
    if (typeof window !== 'undefined') window.location.hash = '#/step1';
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{
        minHeight: '100%', background: '#F1E9D6', padding: '64px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', gap: 16,
      }}>
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5,
          textTransform: 'uppercase', color: '#6b5339', fontWeight: 500,
        }}>A small adjustment</div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400,
          lineHeight: 1.3, color: '#2B2722', margin: 0, maxWidth: 300,
        }}>
          We couldn't place your birth data precisely — a small adjustment will help.
        </h1>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 14.5, lineHeight: 1.65,
          color: '#4A433B', margin: 0, maxWidth: 300,
        }}>
          Your details are saved. Re-enter them and we'll re-read your chart.
        </p>
        <button type="button" onClick={this.reset} style={{
          marginTop: 8, padding: '13px 26px', borderRadius: 999, border: 'none',
          background: '#6b5339', color: '#F8F6F0', cursor: 'pointer',
          fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, letterSpacing: 0.4,
        }}>
          Adjust birth data →
        </button>
      </div>
    );
  }
}
