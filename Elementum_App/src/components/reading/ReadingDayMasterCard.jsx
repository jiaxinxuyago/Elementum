// ===================================================================
// ELEMENTUM · ReadingDayMasterCard  (P4 — the Day Master reference card)
// ===================================================================
// Reached from the catalogue hero arrow. The reference (not the
// ceremony): seal + archetype + manifesto, the motivated "Birth Chart"
// route into the 八字 chart, the Day Master overview (ledger register),
// a cardstock claims list (claim 1 = the identity inscription), and the
// Your Nature portrait. Fills the app frame; the global tab bar sits
// over it. No gate here — identity is the free hook.
// ===================================================================

export default function ReadingDayMasterCard({ dayMaster, archetype, manifesto, claims, overview, nature, onBack, onBirthChart, onShare }) {
  return (
    <div className="reading-fill">
      <img className="ground-img" src="/backgrounds/bg-reading-03-watermark-low.png" alt="" />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES · DAY MASTER</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 18 }}>
          <img className="seal-img" src={`/concept-arts/stems/${dayMaster}.png`} alt="" width="86" height="86" style={{ opacity: 0.92 }} />
          <div className="arch-name" style={{ fontSize: 30, marginTop: 8 }}>{archetype}</div>
          <div className="manifesto" style={{ fontSize: 15.5, marginTop: 2 }}>{manifesto}</div>
          <button type="button" className="birth-chart-btn" onClick={onBirthChart}>
            <svg className="bc-ico" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round"><path d="M5 8 V17 M10 5 V17 M14 10 V17 M19 7 V17" /></g></svg>
            <span>Birth Chart</span>
            <svg className="bc-arr" viewBox="0 0 24 24" aria-hidden="true"><use href="#ico-arrow-r" /></svg>
          </button>
          {onShare ? (
            <button type="button" className="share-card-btn" onClick={onShare}>
              <svg className="sc-ico" viewBox="0 0 24 24" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 V15" /><path d="M8 7 L12 3 L16 7" />
                  <path d="M6 12 H5 V20 H19 V12 H18" />
                </g>
              </svg>
              <span>Share your card</span>
            </button>
          ) : null}
        </div>

        {overview ? (
          <div className="layer" style={{ marginTop: 18 }}>
            <div className="layer-label">Day Master overview</div>
            <p>{overview}</p>
          </div>
        ) : null}

        <div className="claims-card" style={{ marginTop: 12 }}>
          {claims.map((c, i) => <div className="claim" key={i}>{c}</div>)}
        </div>

        {nature ? (
          <div className="layer" style={{ marginTop: 12 }}>
            <div className="layer-label">Your nature</div>
            <p>{nature}</p>
          </div>
        ) : null}

        <div className="expander">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-r" /></svg></span>
          What&apos;s a Day Master — and why the day?
        </div>
        <div className="codex-link">Deeper in the Codex →</div>
      </div>
    </div>
  );
}
