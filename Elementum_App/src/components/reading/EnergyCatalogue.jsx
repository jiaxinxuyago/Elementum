// ===================================================================
// ELEMENTUM · EnergyCatalogue  (D13 P3·B — static catalogue)
// ===================================================================
// The at-rest Reading-tab surface: dominance wheel (with the central
// stem seal) + swapping prescription ribbon + energy shelf, on the
// energy-map ground, with the bottom tab bar. Fills the app frame (no
// drawn phone bezel). The first-run ceremony (RevealDissolve) resolves
// onto this exact composition. Tab bar is icons-only, no seal-dot (AM.2).
// ===================================================================

import DominanceWheel from './DominanceWheel.jsx';
import EnergyShelf from './EnergyShelf.jsx';
import DayMasterCta from './DayMasterCta.jsx';

export default function EnergyCatalogue({ energies, dayMaster, glyph, archetype, selected, onSelect, onRead, onSeal, tilde }) {
  return (
    <div className="reading-fill">
      <img className="ground-img bg-energy" src="/backgrounds/bg-energymap-01-top-band.png" alt="" />
      <div className="pagetint" style={{ background: 'radial-gradient(140% 80% at 50% -10%, rgba(139,163,184,0.10), transparent 60%)' }} />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="eyebrow-row">
          <span className="eyebrow">YOUR ENERGIES</span>
          {/* PILLAR CHART link removed — its destination is a Handoff-2 screen;
              the entry point will be reintroduced with that batch. */}
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
        {/* "Read your Day Master" CTA — the central seal's reading, made an
            explicit affordance (screens-v2 §5E). Tapping it (or the seal)
            descends into the Day Master card (P4). Shared with the reveal
            ceremony's final frame (DayMasterCta) so the handoff is seamless. */}
        <DayMasterCta dayMaster={dayMaster} glyph={glyph} archetype={archetype} onSeal={onSeal} />
        <div className="shelf-hint">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-arrow-r" /></svg></span>
          Each dot is an energy — tap to open its reading
        </div>
        <EnergyShelf energies={energies} selected={selected} onSelect={onSelect} onRead={onRead} />
      </div>
      {/* the persistent tab bar is the app-level static ReadingTabBar, not drawn
          here — keeps it identical + fixed across every dashboard surface. */}
    </div>
  );
}
