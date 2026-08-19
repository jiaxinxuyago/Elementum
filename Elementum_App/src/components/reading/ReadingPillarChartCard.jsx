// ===================================================================
// ELEMENTUM · ReadingPillarChartCard  (P5 — the 八字 Four-Pillars chart)
// ===================================================================
// Reached from the Day Master's "Birth Chart" pill. The supplementary
// data page: four pillars (hero, icon-led — element mark leads, the
// character beside it), a Patterns conclusion, the energy-map composition
// folded in as a section, and the hour-unset chip → hour discovery.
// CJK glyphs are intended here (the character chart Part 1 deferred).
// ===================================================================

// A named position row (REA_02 §5e) — the INDEX form: term + 汉字 + the
// declared domains. The full readings live on each energy's reading page
// (owner 2026-08-19), so nothing unfolds here.
function PositionRow({ pos }) {
  return (
    <div className="pos-row">
      <div className="pos-head">
        <span className="pos-gatezh">{pos.slotZh}</span>
        <span className="pos-term">{pos.term}<span className="pos-zh">{pos.termZh}</span></span>
        <span className="pos-doms idx">{pos.domains.map((d) => <span key={d} className="pos-dom">{d}</span>)}</span>
      </div>
    </div>
  );
}

function Pillar({ col }) {
  return (
    <div className={`bz-col${col.self ? ' self' : ''}${col.unset ? ' unset' : ''}`}>
      <div className="bz-cap">{col.cap}</div>
      {col.unset ? (
        <>
          <div className="bz-char"><span className="bz-glyph">？</span></div>
          <div className="bz-div" />
          <div className="bz-char"><span className="bz-glyph">？</span></div>
          <div className="bz-hidden"><div className="bz-hlabel">藏干</div><div className="bz-hmuted">—</div></div>
        </>
      ) : (
        <>
          <div className={`bz-char e-${col.stemEl}`}>
            <svg className="bz-ico" viewBox="0 0 24 24"><use href={`#el-${col.stemEl}`} /></svg>
            <span className="bz-glyph">{col.stem}</span>
          </div>
          <div className="bz-div" />
          <div className={`bz-char e-${col.branchEl}`}>
            <svg className="bz-ico" viewBox="0 0 24 24"><use href={`#el-${col.branchEl}`} /></svg>
            <span className="bz-glyph">{col.branch}</span>
          </div>
          <div className="bz-hidden">
            <div className="bz-hlabel">藏干</div>
            {col.hidden.map((h, i) => (
              <div key={i} className={`bz-hrow e-${h.el}`}>
                <svg className="bz-hico" viewBox="0 0 24 24"><use href={`#el-${h.el}`} /></svg>
                <span className="bz-hc">{h.stem}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ReadingPillarChartCard({ pillars, energies, positions = [], patterns, hourUnknown, onBack, onDiscoverHour }) {
  return (
    <div className="reading-fill">
      <img className="ground-img" src="/backgrounds/bg-reading-01-side-margins.png" alt="" />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES · PILLAR CHART</span>
        </div>

        <div className="bazi-head"><div className="bz-en">Four Pillars · Eight Characters</div></div>
        <div className="bazi-chart">
          {pillars.map((col) => <Pillar key={col.key} col={col} />)}
        </div>
        <div style={{ textAlign: 'center', margin: '7px 0 12px', fontSize: 11, lineHeight: 1.5, color: 'var(--inkLight)', fontFamily: "'EB Garamond', serif" }}>
          Each of the eight characters pairs with its element. The day stem is your Day Master; the Hour pillar completes once your birth time is set.
        </div>

        {positions.length > 0 && (
          <div className="layer">
            <div className="layer-label">Your positions · who sits in each seat</div>
            <p className="pos-intro">Each seat of your chart is held by an energy, and each pairing has a name. Read each one in full on its energy&rsquo;s page.</p>
            <div className="pos-list">
              {positions.map((pos) => <PositionRow key={pos.id} pos={pos} />)}
            </div>
          </div>
        )}

        <div className="layer">
          <div className="layer-label">Patterns · where the chart argues with itself</div>
          <p>{patterns}</p>
        </div>

        <div className="layer">
          <div className="layer-label">Energy map · the whole of you, at once</div>
          <div style={{ display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden', margin: '9px 0 7px', border: '1px solid var(--borderLight)' }}>
            {energies.map((e) => <div key={e.el} style={{ width: `${e.presence}%`, background: `var(--${e.el})` }} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {energies.map((e) => (
              <div key={e.el} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 9, color: 'var(--inkSoft)', fontFamily: "'JetBrains Mono', Consolas, monospace" }}>
                <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, color: `var(--${e.el}Deep)` }}><use href={`#el-${e.el}`} /></svg>{e.presence}%
              </div>
            ))}
          </div>
        </div>

        {hourUnknown && (
          <div className="hour-chip">Cast without your hour — close, not exact. <span className="go" style={{ cursor: 'pointer' }} onClick={onDiscoverHour}>Discover it →</span></div>
        )}
        <div className="codex-link" style={{ marginTop: 10 }}>What&apos;s a pillar? → Codex</div>
      </div>
    </div>
  );
}
