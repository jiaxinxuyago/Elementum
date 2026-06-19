// Dev-only render harness for the D13 DominanceWheel (reachable at
// #/d13preview). Computes the real reference chart and renders the wheel
// in its phone context so it can be visually verified against the
// standalone wireframe. Not a product screen.
import React, { useMemo, useState } from 'react';
import './d13.css';
import D13Sprite from './D13Sprite.jsx';
import DominanceWheel from './DominanceWheel.jsx';
import { calculateBaziChart } from '../../engine/calculator.js';
import { buildEnergyChart } from '../../engine/buildEnergyChart.js';

export default function D13WheelPreview() {
  const ec = useMemo(
    () => buildEnergyChart(calculateBaziChart({ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' })),
    []
  );
  const [sel, setSel] = useState('metal');

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
                className="wheel"
                energies={ec.energies}
                dayMaster={ec.dayMaster}
                scale={1}
                interactive
                selected={sel}
                onSelect={setSel}
              />
              <div className="rx-ribbon">Lean on Earth — it feeds your edge. Watch what Fire costs you.</div>
            </div>
          </div>
          <div className="home-bar" />
        </div>
      </div>
    </div>
  );
}
