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
            descends into the Day Master card (P4). */}
        <button
          type="button"
          onClick={onSeal}
          aria-label="Read your Day Master"
          style={{
            appearance: 'none', display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            textAlign: 'left', cursor: 'pointer', margin: '2px 0 8px', padding: '10px 14px',
            border: '1px solid rgba(106,132,154,0.42)', borderRadius: 14,
            background: 'linear-gradient(180deg, rgba(139,163,184,0.14) 0%, rgba(139,163,184,0.05) 100%)',
            boxShadow: '0 4px 14px rgba(60,46,28,0.09)',
          }}
        >
          <span style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(106,132,154,0.45)', background: 'rgb(244,237,223)' }}>
            <img
              src={`/concept-arts/stems/${dayMaster}.png`}
              alt=""
              width="44" height="44"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: 17, lineHeight: 1.1, color: 'rgb(43,39,34)' }}>
              Read your Day Master
            </span>
            <span style={{ display: 'block', fontFamily: "'EB Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 12, color: 'rgb(106,132,154)', marginTop: 1 }}>
              {glyph} {archetype} · your core reading
            </span>
          </span>
          <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'rgb(43,39,34)', color: '#fff' }}>
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15 }}><use href="#ico-arrow-r" /></svg>
          </span>
        </button>
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
