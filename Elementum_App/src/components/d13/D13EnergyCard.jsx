// ===================================================================
// ELEMENTUM · D13EnergyCard  (P6 / P7 — one energy reading)
// ===================================================================
// One energy's full reading: scene-hero band + %, role badges, persona
// line, the free R + X layers, then the Seeker gate (advisor accent). The
// ghost register (absent / scarce energy) drains the art and dashes the
// layers — same anatomy, the gate never moves to the face. Presentational;
// the screen owns the swipe index + gate state.
// ===================================================================

import React from 'react';

const CAP = { metal: 'Metal', earth: 'Earth', water: 'Water', wood: 'Wood', fire: 'Fire' };

export default function D13EnergyCard({
  el, presence, art, badges, persona, tail, r, x, gate,
  ghost, idx, total, xLabel, expander, showGate, onBack, onUnlock,
}) {
  const Element = CAP[el] || el;
  const tint = ghost ? undefined : { background: `color-mix(in srgb, var(--${el}) 6%, transparent)`, borderColor: `color-mix(in srgb, var(--${el}) 25%, transparent)` };
  const tintLabel = ghost ? undefined : { color: `var(--${el}Deep)` };
  const dots = Array.from({ length: total }, (_, i) => (i <= idx ? '●' : '○')).join(' ');

  return (
    <div className="d13-fill">
      <img className="ground-img" src="/assets/backgrounds/bg-energymap-02-corner-quartet.png" alt="" style={{ opacity: 0.92 }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className={`screen-pad${ghost ? ' ghosted-card' : ''}`}>
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES · {idx + 1} OF {total}</span>
        </div>

        <div className={`hero${ghost ? ' ghost' : ''}`}>
          <img className="hart" src={art} alt="" />
          <div className="scrim" />
          <div className="hc">
            <div className="reye"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>{Element.toUpperCase()} · {presence}% OF YOUR CHART</div>
            <div className="htitle">{Element} in you</div>
          </div>
        </div>

        <div className="role-badges">
          {badges.map((b, i) => <span key={i} className={`rb${b.c ? ' ' + b.c : ''}`}>{b.t}</span>)}
        </div>

        <div className="persona-line">{Element} in you is <b>{persona}</b> — {tail}</div>

        <div className="layer">
          <div className="layer-label">What it says about you · R</div>
          <p>{r}</p>
        </div>
        <div className="layer" style={tint}>
          <div className="layer-label" style={tintLabel}>{xLabel}</div>
          <p>{x}</p>
        </div>

        {showGate && (
          <div className="gate-strip">
            <span className="glock"><span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-lock" /></svg></span></span>
            <div>
              <div className="layer-label">{gate.label}</div>
              <p>{gate.body}</p>
              <span className="unlock" onClick={onUnlock}>Unlock <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span></span>
            </div>
          </div>
        )}

        <div className="expander">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-r" /></svg></span>
          {expander}
        </div>
        <div className="codex-link">Deeper in the Codex →</div>
        <div className="swipe-dots">{dots}</div>
      </div>
    </div>
  );
}
