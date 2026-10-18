// ===================================================================
// ELEMENTUM · ReadingDayMasterCard  (P4 — the Day Master page)
// ===================================================================
// Reached from the catalogue hero arrow. P4 v4, THE DIAGNOSIS (owner
// 2026-10-17, Q1–Q12 A): seal + archetype + manifesto, the "Birth Chart"
// route into the 八字 chart, The Sign, how the core runs (condition, the
// lead line, the five-energy track, the band paragraph), then every energy
// as a recap of its own function page: frictions to release first, then
// catalysts to grow (a Balanced chart: one group, keep the mix). Each row
// opens its energy page. The page adds no keyword of its own: the lines and
// chips are the energy pages' text (journeyData.buildDiagnosisModel).
// No gate here — identity is the free hook.
// Vocabulary firewall: no ten-god name on this page; function nouns only.
// ===================================================================

import { JOURNEY_DEFS } from '../journey/journeyDefs.js';

// The energy pages' glyph set (element, function, domain, arrows), so the
// rows wear the same marks as the pages they open.
const Use = ({ id, className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><use href={`#jny-${id}`} /></svg>
);
const DOM = { Wealth: 'dom-wealth', Career: 'dom-career', Health: 'dom-health', Love: 'dom-love', Family: 'dom-family', Social: 'dom-social', Mind: 'dom-mind', Growth: 'dom-growth' };
const COND_ICON = { Overfueled: 'ic-charged', Underfueled: 'ic-receptive', Balanced: 'ic-balanced' };
const GROUP = {
  friction: { pill: 'fric', icon: 'ar-down', label: 'Friction', title: 'Release these' },
  catalyst: { pill: 'cat', icon: 'ar-up', label: 'Catalyst', title: 'Grow these' },
  balanced: { pill: 'cond', icon: 'ic-balanced', label: 'Balanced', title: 'Keep the mix' },
};

function EnergyRow({ row, first, onOpen }) {
  const open = () => onOpen?.(row.el);
  return (
    <div className={`dx-row ${row.pole} dk-${row.el}`} role="button" tabIndex={0} aria-label={`${row.name} is your ${row.fn}, open its reading`}
      onClick={open} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } }}>
      <div className="dx-head">
        <span className="dx-chip"><Use id={`el-${row.el}`} /></span>
        <span className="dx-title">
          <span className="dx-claim"><b>{row.name}</b> is your <b>{row.fn}</b><Use id={`fn-${row.fnKey}`} className="dx-fnicon" /></span>
          {row.isCore || first ? (
            <span className="dx-tags">
              {row.isCore ? <span className="dx-tag you">Yourself</span> : null}
              {first ? <span className="dx-tag first">Start here</span> : null}
            </span>
          ) : null}
        </span>
        <span className="dx-amt"><b>{row.presence}%</b>{row.vol ? <span>{row.vol}</span> : null}</span>
      </div>
      {row.line ? <p className="dx-line">{row.line}</p> : null}
      {row.chips.length ? (
        <div className="dx-chips">{row.chips.map((c) => <span key={c} className={`dx-kw ${row.pole}`}>{c}</span>)}</div>
      ) : null}
      <div className="dx-foot">
        {row.remedy ? (
          <span className="dx-ptr"><span className="dx-ptrlab">The remedy</span><span className="dx-seek">Seek <span className={`dx-mini dk-${row.remedy.el}`}><Use id={`el-${row.remedy.el}`} /></span>{row.remedy.name}{row.remedy.fn ? `, your ${row.remedy.fn}` : ''}</span></span>
        ) : row.edge?.length ? (
          <span className="dx-ptr"><span className="dx-ptrlab">The edge</span>{row.edge.map((d) => <span key={d} className="dx-dom"><Use id={DOM[d] || 'dom-career'} />{d}</span>)}</span>
        ) : <span className="dx-ptr" />}
        <span className="dx-go"><Use id="ico-arrow-r" /></span>
      </div>
    </div>
  );
}

export default function ReadingDayMasterCard({ dayMaster, archetype, manifesto, overview, nature, dx, onBack, onBirthChart, onShare, onOpenEnergy, onOpenBlueprint }) {
  return (
    <div className="reading-fill">
      <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${JOURNEY_DEFS}</defs></svg>` }} />
      <img className="ground-img" src="/backgrounds/bg-reading-03-watermark-low.png" alt="" />
      <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
      <div className="screen-pad">
        <div className="back-row" style={{ cursor: 'pointer' }} onClick={onBack} role="button" tabIndex={0} aria-label="Back" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onBack?.(); } }}>
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-l" /></svg></span>
          <span className="eyebrow">YOUR ENERGIES · DIAGNOSIS</span>
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

        {onOpenBlueprint ? (
          <button type="button" className="layer depth-door" style={{ marginTop: 18 }} onClick={onOpenBlueprint}>
            <span className="layer-label">Your Energy Blueprint · Advisor</span>
            <span className="depth-door-t">The decoding of your chart: your structure, what it runs on and lacks, seen and unseen, pairings and clashes ›</span>
          </button>
        ) : null}

        {overview ? (
          <div className="layer" style={{ marginTop: 18 }}>
            <div className="layer-label">The Sign</div>
            <p>{overview}</p>
          </div>
        ) : null}

        {dx ? (
          <div className="layer dx-cond" style={{ marginTop: 12 }}>
            <div className="dx-condhead">
              <span className="layer-label" style={{ margin: 0 }}>How {archetype} runs</span>
              <span className={`dx-pill cond`}><Use id={COND_ICON[dx.condition] || 'ic-balanced'} />{dx.condition}</span>
            </div>
            <p className="dx-lead">{dx.lead}</p>
            <div className="dm-track" aria-label="Your five energies by presence">
              {dx.track.map((t) => <b key={t.el} className={t.el} style={{ width: `${Math.max(t.presence, 2)}%` }} />)}
            </div>
            <div className="dm-tracklab">
              {dx.track.map((t) => (
                <span key={t.el} style={{ width: `${Math.max(t.presence, 2)}%` }}>
                  <em>{t.presence}</em>
                  {t.presence >= 12 ? <>{t.name}{t.mark ? <i className={t.mark}>{t.mark === 'seek' ? '▲' : '▼'}</i> : null}</> : null}
                </span>
              ))}
            </div>
            {nature ? <p className="dx-nature">{nature}</p> : null}
          </div>
        ) : null}

        {(dx?.groups || []).map((g) => {
          const G = GROUP[g.kind];
          return (
            <div className="dx-group" key={g.kind}>
              <div className="dx-ghead">
                <span className={`dx-pill ${G.pill}`}><Use id={G.icon} />{G.label}</span>
                <span className="dx-gtitle">{G.title}</span>
              </div>
              {g.rows.map((row) => <EnergyRow key={row.el} row={row} first={dx.first === row.el} onOpen={onOpenEnergy} />)}
            </div>
          );
        })}

        <div className="expander">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-r" /></svg></span>
          What&apos;s a Day Master, and why the day?
        </div>
        <div className="codex-link">Deeper in the Codex →</div>
      </div>
    </div>
  );
}
