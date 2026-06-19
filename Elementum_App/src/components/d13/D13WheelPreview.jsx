// Dev-only render harness for the D13 P3 Reading Catalogue (reachable at
// #/d13preview): the dominance wheel + prescription ribbon + energy shelf,
// latched by a shared selection. Computes the real reference chart so it
// can be verified against the standalone wireframe. Not a product screen.
import React, { useMemo, useState } from 'react';
import './d13.css';
import D13Sprite from './D13Sprite.jsx';
import DominanceWheel from './DominanceWheel.jsx';
import EnergyShelf from './EnergyShelf.jsx';
import { RIBBON_INTRO } from './d13Content.js';
import { calculateBaziChart } from '../../engine/calculator.js';
import { buildEnergyChart } from '../../engine/buildEnergyChart.js';

export default function D13WheelPreview() {
  const ec = useMemo(
    () => buildEnergyChart(calculateBaziChart({ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' })),
    []
  );
  const [sel, setSel] = useState(ec.energies[0].el);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1815', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <D13Sprite />
      <div className="d13">
        <div className="phone">
          <div className="notch" />
          <div className="screen">
            <img className="ground-img bg-energy" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
            <div className="pagetint" style={{ background: 'radial-gradient(140% 80% at 50% -10%, rgba(139,163,184,0.10), transparent 60%)' }} />
            <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
            <div className="screen-pad">
              <div className="eyebrow-row"><span className="eyebrow">YOUR ENERGIES</span></div>
              <DominanceWheel
                className="mini-wheel"
                style={{ width: 320, height: 300, margin: '4px auto 0' }}
                energies={ec.energies}
                dayMaster={ec.dayMaster}
                scale={0.92}
                interactive
                selected={sel}
                onSelect={setSel}
              />
              <div className="rx-ribbon">{RIBBON_INTRO[sel]}</div>
              <div className="shelf-hint">
                <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
                Each dot is an energy — tap to open its reading
              </div>
              <EnergyShelf energies={ec.energies} selected={sel} onSelect={setSel} />
            </div>
          </div>
          <nav className="tabbar">
            <div className="tab"><span className="tico"><svg viewBox="0 0 24 24"><use href="#tab-today" /></svg></span><span className="seal-dot" /></div>
            <div className="tab"><span className="tico"><svg viewBox="0 0 24 24"><use href="#tab-guidance" /></svg></span><span className="seal-dot" /></div>
            <div className="tab active"><span className="tico"><svg viewBox="0 0 24 24"><use href="#tab-reading" /></svg></span><span className="seal-dot" /></div>
            <div className="tab"><span className="tico"><svg viewBox="0 0 24 24"><use href="#tab-compat" /></svg></span><span className="seal-dot" /></div>
            <div className="tab"><span className="tico"><svg viewBox="0 0 24 24"><use href="#tab-profile" /></svg></span><span className="seal-dot" /></div>
          </nav>
          <div className="home-bar" />
        </div>
      </div>
    </div>
  );
}
