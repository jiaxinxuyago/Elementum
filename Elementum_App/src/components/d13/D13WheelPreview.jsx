// Dev-only render harness for the D13 reveal journey (reachable at
// #/d13preview): the P2 dissolve, which contains P1 (the identity plate
// start frame) and resolves to P3 (the catalogue end frame). Scroll
// inside the phone to scrub the transition. Computes the real reference
// chart. Not a product screen.
import React, { useMemo, useState } from 'react';
import './d13.css';
import D13Sprite from './D13Sprite.jsx';
import RevealDissolve from './RevealDissolve.jsx';
import { calculateBaziChart } from '../../engine/calculator.js';
import { buildEnergyChart } from '../../engine/buildEnergyChart.js';

const BLADE_IDENTITY = {
  archetype: 'The Blade',
  pinyin: 'GĒNG · YANG METAL',
  manifesto: 'Precision before intention',
  inscription: 'You say what others soften — and pay, quietly, for being the one who did.',
  cast: 'CAST FROM 1995 · 4 · 29 · YǑU HOUR 17–19',
};

export default function D13WheelPreview() {
  const ec = useMemo(
    () => buildEnergyChart(calculateBaziChart({ year: 1995, month: 4, day: 29, hour: 18, location: 'Beijing', gender: 'male' })),
    []
  );
  const [sel, setSel] = useState(ec.energies[0].el);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1815', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
      <D13Sprite />
      <div className="d13" style={{ position: 'relative', width: 390, height: 844, borderRadius: 40, overflow: 'hidden', background: 'var(--frame)', boxShadow: '0 30px 60px rgba(40,30,20,0.45)' }}>
        <RevealDissolve
          identity={BLADE_IDENTITY}
          energies={ec.energies}
          dayMaster={ec.dayMaster}
          selected={sel}
          onSelect={setSel}
        />
      </div>
    </div>
  );
}
