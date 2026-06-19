// ===================================================================
// ELEMENTUM · RevealDissolve  (D13 P2 — The Dissolve)
// ===================================================================
// The scroll-driven, reversible transition from the identity plate (P1)
// to the energy wheel + catalogue (P3). The seal is the continuity
// object — it shrinks and glides to become the wheel center while the
// plate dissolves to silk, the ensō ground fades in, the nodes bloom,
// and the reading shelf settles. Faithful port of initDissolve in
// d13-v5.js — the same timing curves bound to scroll position. The end
// frame equals the static P3 catalogue exactly. Honors reduced-motion.
// ===================================================================

import React, { useEffect, useRef } from 'react';
import DominanceWheel from './DominanceWheel.jsx';
import EnergyShelf from './EnergyShelf.jsx';
import { RIBBON_INTRO } from './d13Content.js';

const clamp = (x) => Math.max(0, Math.min(1, x));
const win = (p, a, b) => clamp((p - a) / (b - a));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;
// seal travel: plate spot → wheel center (stage coords)
// S0.y sits the seal below the eyebrow with the design's ~48px breathing gap
// (P1 seal-ph margin-top:48px); only affects the plate frame, not the glide end.
const S0 = { x: 127, y: 120, s: 120 };
const S1 = { x: 53, y: 89, s: 276 };

export default function RevealDissolve({ identity, energies, dayMaster, selected, onSelect, onRead, onTab, onSeal, tilde }) {
  const scroller = useRef(null), paint = useRef(null), textTop = useRef(null), textBottom = useRef(null);
  const peek = useRef(null), seal = useRef(null), eyebrow = useRef(null), after = useRef(null);
  const tabbar = useRef(null), hint = useRef(null), bgRevealTop = useRef(null), bgRevealBot = useRef(null);
  const bgFog = useRef(null), bgEnergy = useRef(null), pagetint = useRef(null), dsWheel = useRef(null);

  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setOp = (ref, v) => { if (ref.current) ref.current.style.opacity = String(v); };

    const apply = () => {
      const max = sc.scrollHeight - sc.clientHeight;
      const p = reduce ? (sc.scrollTop > 0 ? 1 : 0) : (max > 0 ? sc.scrollTop / max : 0);

      const bgOut = win(p, 0.06, 0.44);
      setOp(bgRevealTop, 1 - bgOut);
      setOp(bgRevealBot, 0.6 * (1 - bgOut));
      setOp(bgFog, 1 - bgOut);
      setOp(bgEnergy, 0.82 * win(p, 0.40, 0.72));
      setOp(pagetint, win(p, 0.40, 0.72));
      setOp(paint, 1 - win(p, 0.04, 0.42));

      const t1 = win(p, 0.04, 0.34);
      if (textTop.current) { textTop.current.style.opacity = String(1 - t1); textTop.current.style.transform = `translateY(${(-64 * easeOut(t1)).toFixed(1)}px)`; }
      const t2 = win(p, 0.12, 0.46);
      if (textBottom.current) { textBottom.current.style.opacity = String(1 - t2); textBottom.current.style.transform = `translateY(${(-44 * easeOut(t2)).toFixed(1)}px)`; }
      setOp(peek, 1 - win(p, 0.02, 0.18));

      const ts = easeOut(win(p, 0.08, 0.74));
      if (seal.current) {
        const s = lerp(S0.s, S1.s, ts);
        seal.current.style.transform = `translate(${lerp(S0.x, S1.x, ts).toFixed(1)}px,${lerp(S0.y, S1.y, ts).toFixed(1)}px)`;
        seal.current.style.width = `${s.toFixed(1)}px`;
        seal.current.style.height = `${s.toFixed(1)}px`;
      }
      if (dsWheel.current) {
        dsWheel.current.querySelectorAll('.node').forEach((nd, i) => {
          const t = win(p, 0.52 + i * 0.085, 0.64 + i * 0.085);
          nd.style.opacity = String(t);
          nd.style.transform = `scale(${lerp(0.55, 1, easeOut(t)).toFixed(3)})`;
        });
      }
      if (after.current) {
        const ta = win(p, 0.82, 0.98);
        after.current.style.opacity = String(ta);
        after.current.style.transform = `translateY(${(18 * (1 - easeOut(ta))).toFixed(1)}px)`;
      }
      setOp(eyebrow, win(p, 0.84, 0.98));
      setOp(tabbar, win(p, 0.86, 0.99));
      if (hint.current) {
        hint.current.textContent = p > 0.92 ? 'scroll ⇡ — fully reversible' : 'scroll ⇣ inside the phone';
        hint.current.style.opacity = (p > 0.04 && p < 0.92) ? '0' : '1';
      }
    };

    sc.addEventListener('scroll', apply, { passive: true });
    apply();
    return () => sc.removeEventListener('scroll', apply);
  }, []);

  const tab = (id, active) => (
    <button type="button" className={`tab${active ? ' active' : ''}`} onClick={() => onTab && onTab(id)}>
      <span className="tico"><svg viewBox="0 0 24 24"><use href={`#tab-${id}`} /></svg></span>
    </button>
  );

  return (
    <div className="d13-fill live-phone">
      <div ref={scroller} className="dissolve-scroll">
          <div className="dissolve-track">
            <div className="dissolve-stage">
              <img ref={bgRevealTop} className="bg-reveal-top" src="/backgrounds/bg-reveal-01-distant-peaks.png" alt="" />
              <img ref={bgRevealBot} className="bg-reveal-bot" src="/backgrounds/bg-reveal-02-floating-island.png" alt="" />
              <div ref={bgFog} className="bg-reveal-fog" />
              <img ref={bgEnergy} className="ground-img bg-energy" src="/backgrounds/bg-energymap-01-top-band.png" alt="" style={{ opacity: 0 }} />
              <div ref={pagetint} className="pagetint" style={{ background: 'radial-gradient(140% 80% at 50% -10%, rgba(139,163,184,0.10), transparent 60%)', opacity: 0 }} />
              <div ref={paint}><div className="plate-blank" /></div>
              <div className="status" style={{ position: 'absolute', left: 0, right: 0, top: 0, zIndex: 40 }}><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>

              <div ref={textTop} className="ds-plate-text" style={{ position: 'absolute', left: 24, right: 24, top: 84, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="eyebrow" style={{ color: 'var(--inkSoft)' }}>YOUR ELEMENT</span>
                <div style={{ height: 150 }} />
                <div className="arch-name" style={{ fontSize: 36, marginTop: 14 }}>{identity.archetype}</div>
                <div className="pinyin" style={{ marginTop: 6 }}>{identity.pinyin}</div>
                <div className="manifesto" style={{ fontSize: 17, marginTop: 12 }}>{identity.manifesto}</div>
                <div className="inscription"><div className="en">{identity.inscription}</div></div>
              </div>
              <div ref={textBottom} className="ds-plate-text" style={{ position: 'absolute', left: 24, right: 24, bottom: 54 }}>
                <div className="foundry" style={{ marginTop: 0 }}><div className="cast">{identity.cast}</div><div className="mark-line">— ELEMENTUM —</div></div>
              </div>
              <div ref={peek} style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 36, zIndex: 12 }}><div className="ring-peek" style={{ marginTop: 0 }} /></div>

              <div ref={eyebrow} className="eyebrow-row" style={{ position: 'absolute', left: 22, right: 22, top: 64, opacity: 0, zIndex: 12 }}><span className="eyebrow">YOUR ENERGIES</span></div>
              <div ref={dsWheel} className="ds-wheel-wrap" style={{ left: 35, top: 80, width: 320, height: 300 }}>
                <DominanceWheel
                  className=""
                  style={{ position: 'absolute', inset: 0 }}
                  energies={energies}
                  dayMaster={dayMaster}
                  scale={0.92}
                  tilde={tilde}
                  seal={false}
                  centerName={identity.archetype}
                />
              </div>
              <div ref={seal} className="ds-seal" style={onSeal ? { cursor: 'pointer' } : null} onClick={onSeal}><img src={`/concept-arts/stems/${dayMaster}.png`} alt="" /></div>

              <div ref={after} className="ds-after" style={{ opacity: 0 }}>
                <div className="rx-ribbon" style={{ margin: '0 0 8px' }}>{RIBBON_INTRO[selected]}</div>
                <div className="shelf-hint">
                  <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
                  Each dot is an energy — tap to open its reading
                </div>
                <EnergyShelf energies={energies} selected={selected} onSelect={onSelect} onRead={onRead} />
              </div>
              <nav ref={tabbar} className="tabbar" style={{ opacity: 0 }}>
                {tab('today')}{tab('guidance')}{tab('reading', true)}{tab('compat')}{tab('profile')}
              </nav>
              <div ref={hint} className="scroll-hint">scroll ⇣ inside the phone</div>
            </div>
          </div>
        </div>
    </div>
  );
}
