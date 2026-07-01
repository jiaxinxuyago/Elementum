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
  ghost, idx, total, xLabel, expander, showGate, onBack, onUnlock, eyebrow,
  reyeText, heroTitle, lede, pull, domains,
}) {
  const Element = CAP[el] || el;
  const dots = Array.from({ length: total }, (_, i) => (i <= idx ? '●' : '○')).join(' ');

  return (
    <div className="d13-fill">
      <img className="ground-img" src="/assets/backgrounds/bg-energymap-02-corner-quartet.png" alt="" style={{ opacity: 0.92 }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className={`screen-pad dk-${el}${ghost ? ' ghosted-card' : ''}`}>
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">{eyebrow || `YOUR ENERGIES · ${idx + 1} OF ${total}`}</span>
        </div>

        <div className={`hero${ghost ? ' ghost' : ''}`}>
          <img className="hart" src={art} alt="" />
          <div className="scrim" />
          <svg className="mk" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>
          <div className="hc">
            <div className="reye"><svg className="elmark" viewBox="0 0 24 24"><use href={`#el-${el}`} /></svg>{reyeText || `${Element.toUpperCase()} · ${presence}% OF YOUR CHART`}</div>
            <div className="htitle">{heroTitle || `${Element} in you`}</div>
          </div>
        </div>

        <div className="role-badges">
          {badges.map((b, i) => <span key={i} className={`rb${b.c ? ' ' + b.c : ''}`}>{b.t}</span>)}
        </div>

        {lede
          ? <p className="read-lede">{lede.pre}<b>{lede.persona}</b>{lede.post}</p>
          : <div className="persona-line">{Element} in you is <b>{persona}</b> — {tail}</div>}

        <div className="layer">
          <div className="layer-label">What it says about you · R</div>
          {(Array.isArray(r) ? r : [r]).filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
          {pull && <span className="pull">{pull}</span>}
        </div>
        <div className={`layer${ghost ? '' : ' tinted'}`}>
          <div className="layer-label">{xLabel}</div>
          <p>{x}</p>
        </div>

        {domains && domains.list && domains.list.length > 0 && (
          <>
            <div className="sec-head">
              <span className="t">Where it lives in your life</span>
              <span className="k">{domains.list.length} domains</span>
            </div>
            <div className="sec-sub">{domains.sub}</div>
            <div className="dd-list">
              {domains.list.map((d) => (
                <div
                  key={d.name}
                  className={`dd-card dk-${el}${d.locked ? ' locked' : ''}`}
                  style={d.locked ? { cursor: 'pointer' } : undefined}
                  onClick={d.locked ? onUnlock : undefined}
                >
                  <span className="dd-ic"><svg viewBox="0 0 24 24"><use href={`#${d.icon}`} /></svg></span>
                  <span><span className="dd-name">{d.name}</span><span className="dd-tease">{d.tease}</span></span>
                  <span className="dd-go"><svg viewBox="0 0 24 24"><use href={d.locked ? '#ico-lock' : '#ico-arrow-r'} /></svg></span>
                </div>
              ))}
            </div>
          </>
        )}

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
        {total > 1 && <div className="swipe-dots">{dots}</div>}
      </div>
    </div>
  );
}
