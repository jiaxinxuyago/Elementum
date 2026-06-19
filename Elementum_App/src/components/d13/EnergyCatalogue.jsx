// ===================================================================
// ELEMENTUM · EnergyCatalogue  (D13 P3·B — static catalogue)
// ===================================================================
// The at-rest Reading-tab surface: dominance wheel (with the central
// stem seal) + swapping prescription ribbon + energy shelf, on the
// energy-map ground, with the bottom tab bar. Fills the app frame (no
// drawn phone bezel). The first-run ceremony (RevealDissolve) resolves
// onto this exact composition. Tab bar is icons-only, no seal-dot (AM.2).
// ===================================================================

import React from 'react';
import DominanceWheel from './DominanceWheel.jsx';
import EnergyShelf from './EnergyShelf.jsx';
import { RIBBON_INTRO } from './d13Content.js';

export default function EnergyCatalogue({ energies, dayMaster, selected, onSelect, onRead, onSeal, onPillarChart, tilde }) {
  return (
    <div className="d13-fill">
      <img className="ground-img bg-energy" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
      <div className="pagetint" style={{ background: 'radial-gradient(140% 80% at 50% -10%, rgba(139,163,184,0.10), transparent 60%)' }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="eyebrow-row">
          <span className="eyebrow">YOUR ENERGIES</span>
          <span className="link" style={{ cursor: 'pointer' }} onClick={onPillarChart}>
            PILLAR CHART <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
          </span>
        </div>
        <DominanceWheel
          className="mini-wheel"
          style={{ width: 320, height: 300, margin: '4px auto 0' }}
          energies={energies}
          dayMaster={dayMaster}
          scale={0.92}
          tilde={tilde}
          interactive
          selected={selected}
          onSelect={onSelect}
          onSealClick={onSeal}
        />
        <div className="rx-ribbon">{RIBBON_INTRO[selected]}</div>
        <div className="shelf-hint">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
          Each dot is an energy — tap to open its reading
        </div>
        <EnergyShelf energies={energies} selected={selected} onSelect={onSelect} onRead={onRead} />
      </div>
      {/* the persistent tab bar is the app-level static D13TabBar, not drawn
          here — keeps it identical + fixed across every dashboard surface. */}
    </div>
  );
}
