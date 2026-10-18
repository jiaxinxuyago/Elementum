// LOCAL PROTOTYPE ONLY (round 6 mockup screenshots). Never committed.
import './previewBeats.css';
const DOMS = [['Wealth', 4, ['wood', 'wood', 'wood', 'metal']], ['Family', 4, ['wood', 'water', 'wood', 'metal']], ['Career', 2, ['metal', 'earth']], ['Social', 2, ['metal', 'wood']], ['Mind', 1, ['earth']], ['Growth', 1, ['earth']], ['Health', 1, ['water']], ['Love', 1, ['wood']]];
const GATES = [['Early', 'birth–15', [['Steward', 'wood'], ['Artisan', 'water']]], ['Rising', '16–34', [['Twin', 'metal'], ['Alchemist', 'earth']]], ['Home', '35–47', [['Horizon', 'wood']]], ['Late', '48 on', [['Steward', 'wood'], ['Rival', 'metal']]]];
export default function PreviewBeats({ Use, variant = 'a' }) {
  return (
    <>
      <div className="beat pv-beat" data-beat="4">
        <span className="sec-eyebrow">YOUR DOMAINS</span>
        <div className="cardstock manual-tile pv-tile">
          <div className="idg-line pv-line"><Use id="dom-wealth" className="idg-el" /><span className="idg-t"><b>Wealth</b> and <b>Family</b> carry the most weight in your life</span><Use id="ico-chev-r" className="pv-go" /></div>
          <div className="pv-doms">
            {DOMS.map(([d, n, els]) => (
              <span key={d} className={`pv-dom${n >= 4 ? ' heavy' : ''}`}>
                <span className="pv-domring"><Use id={`dom-${d.toLowerCase()}`} /></span>
                <span className="pv-domname">{d}</span>
                <span className="pv-pips">{els.map((e, i) => <i key={i} style={{ background: `var(--${e}Deep)` }} />)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="beat pv-beat" data-beat="5">
        <span className="sec-eyebrow">YOUR LIFE CHAPTERS</span>
        <div className="cardstock manual-tile pv-tile">
          <div className="idg-line pv-line"><Use id="tab-today" className="idg-el" /><span className="idg-t">You are in your <b>Rising Chapter</b> · a <b>Magistrate</b> decade</span><Use id="ico-chev-r" className="pv-go" /></div>
          <div className="pv-life">
            {GATES.map(([g, age, seats], i) => (
              <span key={g} className={`pv-gate${i === 1 ? ' cur' : i > 1 ? ' fut' : ''}`}>
                <span className="pv-gname">{g}</span>
                <span className="pv-gseats">{seats.map(([p, e]) => <span key={p + e} className={`node n-${e} pv-mini`} title={p} />)}</span>
                <span className="pv-gage">{age}</span>
              </span>
            ))}
            <span className="pv-you" style={{ left: '44%' }}><span>you · 31</span></span>
          </div>
        </div>
      </div>
      <div className="beat pv-beat" data-beat="6">
        <span className="sec-eyebrow">YOUR STARS</span>
        <div className="cardstock manual-tile pv-tile">
          <div className="idg-line pv-line"><Use id="ico-spark" className="idg-el" /><span className="idg-t"><b>Six old stars</b> sit in your chart, and a <b>helper</b> is arriving</span><Use id="ico-chev-r" className="pv-go" /></div>
          <div className="pv-stars">
            <span className="pv-star gift">Scholar's Star</span><span className="pv-star gift">Red Phoenix</span>
            <span className="pv-star test">Lonely Star</span><span className="pv-star test">Ram's Edge</span><span className="pv-star test">Robbery</span><span className="pv-star test">Lost Spirit</span>
            <span className="pv-star come">Nobleman · 2023–2032</span>
          </div>
        </div>
      </div>
      <div className="pv-deeper"><span>Going deeper</span></div>
      <div className="beat pv-beat" data-beat="7">
        <span className="sec-eyebrow">YOUR ENERGY BLUEPRINT</span>
        <div className="cardstock manual-tile pv-tile pv-deep">
          <div className="idg-line pv-line"><Use id="ico-lock" className="idg-el" /><span className="idg-t">A <b>Steward structure</b> · 正财格 <span className="role-pill core pv-adv">Advisor</span></span><Use id="ico-chev-r" className="pv-go" /></div>
          <p className="pv-parts">Your structure · What it runs on and lacks · Seen and unseen · Pairings and clashes</p>
        </div>
      </div>
    </>
  );
}
