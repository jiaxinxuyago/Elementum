// ===================================================================
// ELEMENTUM · DomainsViews — THE DOMAINS, read domain first (DOM-1)
// ===================================================================
// Owner rulings 2026-10-17 (Q1–Q15 A, T0–T10 A):
//   DomainsHub    YOUR DOMAINS, the fourth beat of Your Reading: the
//                 claim, the teaching beat (the ten "characters" in four
//                 gates), the life line with "you · {age}", eight tiles
//   DomainPage    one domain: How you are (free) → What has already
//                 happened → What is coming (Seeker) → the seats that
//                 rule it (defline free, reading Seeker)
//   DomainTiles   the energy page's THE DOMAINS card: the domains this
//                 energy's seats rule, opening the same pages
//   LifeLine      the four gates as four stretches of life
// The composition (which beats, which labels) is domainsResolve.js;
// these views only lay it out. No italic (house law).
// ===================================================================

import { GATE_SPAN } from '../reading/domainsResolve.js';
import { TG_DEFLINE } from '../../content/index.js';

const GATES = ['year', 'month', 'day', 'hour'];
const GATE_NAME = { year: 'Year Gate', month: 'Month Gate', day: 'Day Gate', hour: 'Hour Gate' };
const KEY = ['childhood', 'working prime', 'home years', 'late life'];
const NUM = ['no', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
const STEP_HEAD = { Wealth: 'With money', Family: 'With your family', Career: 'At work', Social: 'With friends', Health: 'With your body', Love: 'In love', Mind: 'In your thinking', Growth: 'As you grow' };
const list = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const agePos = (a) => (a < 16 ? (a / 16) * 25 : a < 35 ? 25 + ((a - 16) / 19) * 25 : a < 48 ? 50 + ((a - 35) / 13) * 25 : 75 + Math.min(1, (a - 48) / 30) * 25);
const gateNow = (a) => (a < 16 ? 0 : a < 35 ? 1 : a < 48 ? 2 : 3);

export function LifeLine({ age, positions, lit = null, hourUnknown = false }) {
  const cur = gateNow(age);
  return (
    <div className="dl-ll" aria-label={`Your four gates, with you at ${age}`}>
      <div className="dl-grid">
        {GATES.map((g, i) => {
          const closed = hourUnknown && g === 'hour';
          return (
            <div key={g} className={`dl-col${closed ? ' closed' : i > cur ? ' future' : ''}`}>
              <span className="dl-gate">{GATE_NAME[g]}</span>
              <span className="dl-age">{GATE_SPAN[g]}</span>
              {closed ? (
                <><span className="dl-empty">closed</span><span className="dl-empty">no birth hour</span></>
              ) : ['stem', 'branch'].map((k) => {
                if (g === 'day' && k === 'stem') return <span key={k} className="dl-empty">you</span>;
                const s = positions.find((p) => p.gateKey === g && p.kind === k);
                if (!s) return <span key={k} className="dl-empty">·</span>;
                const on = !lit || lit.has(s.id);
                return (
                  <span key={k} className={`dl-seat${on ? ' on' : ''}`}>
                    <span className="dl-k">{k === 'stem' ? 'at' : 'inside'}</span>
                    <span className="dl-dot" style={{ background: `var(--${s.el}Deep, var(--inkLight))` }} />{s.persona.replace(/^The /, '')}
                  </span>
                );
              })}
            </div>
          );
        })}
        <div className="dl-mark" style={{ left: `${agePos(age)}%` }}><span>you · {age}</span></div>
      </div>
      <div className="dl-key">{KEY.map((k) => <span key={k}>{k}</span>)}</div>
    </div>
  );
}

// the hub's claim and sub line, from the page weights
function hubClaim(dm) {
  const ps = dm.pages; const max = ps[0]?.seats.length || 0;
  const tops = ps.filter((p) => p.seats.length === max && max > 1).map((p) => p.domain);
  const singles = ps.filter((p) => p.seats.length === 1).map((p) => p.domain);
  const empty = ps.filter((p) => !p.seats.length).map((p) => p.domain);
  const claim = tops.length >= 2 ? `${list(tops.slice(0, 2))} carry the most weight in your life.` : tops.length ? `${tops[0]} carries the most weight in your life.` : 'Your life is spread evenly across its domains.';
  const parts = [];
  if (tops.length) parts.push(`${NUM[max] || max} seats rule ${tops.length > 1 ? 'each of them' : 'it'}.`);
  if (singles.length) parts.push(`${list(singles)} ${singles.length > 1 ? 'hang on one seat apiece' : 'hangs on one seat'}.`);
  if (empty.length) parts.push(`${list(empty)} ${empty.length > 1 ? 'have' : 'has'} no ruler you can see yet.`);
  return { claim, sub: parts.join(' ') };
}

export function DomainsHub({ dm, positions, onOpen, onDiscoverHour, Use, DOM }) {
  const { claim, sub } = hubClaim(dm);
  return (
    <div className="dl-hub">
      <p className="dl-claim">{claim}</p>
      {sub && <p className="body2 dl-sub">{sub}</p>}
      <p className="body2 dl-teach">Your chart has four gates, and each gate is a stretch of your life. Every gate holds two seats, one in plain view and one inside, and one of the ten characters sits in each seat. A character rules the parts of your life its seat touches, and the gate says when it takes over.</p>
      <LifeLine age={dm.age} positions={positions} hourUnknown={dm.hourUnknown} />
      <p className="body2 dl-legend">The lit part of the line is behind you. The shaded part is still to come.</p>
      {dm.hourUnknown && (
        <button type="button" className="dl-closed" onClick={onDiscoverHour}>Your Hour Gate is closed. Without your birth hour your late chapter cannot be read. Add your birth hour <Use id="ico-chev-r" /></button>
      )}
      <div className="dl-tiles">
        {dm.pages.map((p) => (
          <button type="button" key={p.domain} className={`dl-tile${p.empty ? ' ghost' : ''}`} onClick={() => onOpen(p.domain)}>
            <span className="dl-tilehead"><Use id={DOM[p.domain]} className="dl-tileic" /><span className="dl-tn">{p.domain}</span></span>
            <span className="dl-tc">{p.count}</span>
            {p.headline && <span className="dl-th">{p.headline}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// THE DOMAINS card on an energy page: the domains this energy's seats rule
export function DomainTiles({ dm, el, elName, onOpen, Use, DOM }) {
  const mine = dm.pages.map((p) => ({ p, k: p.seats.filter((s) => s.el === el).length })).filter((x) => x.k);
  if (!mine.length) return <span className="el-teasep" style={{ marginTop: 0 }}>{elName} holds no seat in your pillars. It reaches you through the hidden stems, felt more than placed.</span>;
  const seats = new Set(mine.flatMap((x) => x.p.seats.filter((s) => s.el === el).map((s) => s.id))).size;
  return (
    <>
      <span className="body2 dl-sub" style={{ display: 'block' }}>{seats === 1 ? 'One' : NUM[seats] || seats} of your seats {seats === 1 ? 'holds' : 'hold'} {elName}. {seats === 1 ? 'It rules' : 'They rule'} {mine.length === 1 ? 'one part' : `${(NUM[mine.length] || String(mine.length)).toLowerCase()} parts`} of your life.</span>
      <span className="dl-tiles">
        {mine.map(({ p, k }) => (
          <span role="button" tabIndex={0} key={p.domain} className="dl-tile hl" onClick={(e) => { e.stopPropagation(); onOpen(p.domain); }} onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onOpen(p.domain); } }}>
            <span className="dl-tilehead"><Use id={DOM[p.domain]} className="dl-tileic" /><span className="dl-tn">{p.domain}</span></span>
            <span className="dl-tc">{k} {elName} seat{k > 1 ? 's' : ''}{p.seats.length > k ? ` · of ${p.seats.length}` : ''}</span>
            {p.headline && <span className="dl-th">{p.headline}</span>}
          </span>
        ))}
      </span>
    </>
  );
}

function Beats({ beats }) {
  let last = null;
  return beats.map((b, i) => {
    const same = b.label === last; last = b.label;
    if (b.kind === 'gap') return <div key={i} className="dl-gap"><span className="dl-when now">{b.label}</span>{b.lead} {b.text}</div>;
    const deco = b.kind === 'window' || b.kind === 'decade';
    return (
      <div key={i} className={`dl-beat${deco ? ' dec' : ''}${b.now ? ' now' : ''}${b.kind === 'window' ? ` win ${b.pole}` : ''}`}>
        {!same && <span className="dl-when">{b.label}</span>}
        {b.lead && <p className="dl-lead">{b.lead}</p>}
        <p className="dl-text">{b.text}</p>
        {b.seat && <span className="dl-who">{b.seat}</span>}
      </div>
    );
  });
}

export function DomainPage({ page, dm, positions, tier, onUpgrade, onDiscoverHour, Use, DOM }) {
  if (!page) return null;
  const locked = tier === 'free';
  const lit = new Set(page.seats.map((s) => s.id));
  return (
    <div className="dl-page">
      <div className="cardstock dl-headcard">
        <span className="laylab"><Use id={DOM[page.domain]} className="dl-headic" />The Domains · {page.domain}</span>
        {page.headline && <h2 className="dl-title">{page.headline}</h2>}
        <p className="body2 dl-sub">{page.empty ? `None of your known seats rules ${page.domain}, so your decades read it instead.` : `${page.count.replace(/ · .*/, '')} rule ${page.domain} in your chart: ${list([...new Set(page.seats.map((s) => GATE_NAME[s.gateKey]))])}.`}</p>
        <LifeLine age={dm.age} positions={positions} lit={lit} hourUnknown={dm.hourUnknown} />
      </div>

      <div className="dl-step">
        <span className="dl-stepey">How you are</span>
        <span className="dl-stephd">{STEP_HEAD[page.domain]}</span>
        {page.how && <p className="dl-text">{page.how}</p>}
        {page.pattern && <p className="dl-text">{page.pattern.text}</p>}
      </div>

      {locked ? (
        <div className="cardstock dl-lock">
          <span className="laylab">What has already happened · What is coming</span>
          <p className="body2" style={{ margin: '0 0 8px' }}>Your {page.domain} reading goes on through your past and your next decades: {page.past.length + page.future.length} more readings, dated by your gates and your decades.</p>
          <button type="button" className="el-domsheet-cta" onClick={() => onUpgrade('The Domains')}>Open with Seeker</button>
        </div>
      ) : (
        <>
          {page.past.length > 0 && <div className="dl-step"><span className="dl-stepey">What has already happened</span><Beats beats={page.past} /></div>}
          <div className="dl-step"><span className="dl-stepey">What is coming</span><Beats beats={page.future} />
            {page.notes.map((n) => (/birth hour/.test(n)
              ? <button type="button" key={n} className="dl-closed" onClick={onDiscoverHour}>{n} <Use id="ico-chev-r" /></button>
              : <p key={n} className="body2 dl-note">{n}</p>))}
          </div>
        </>
      )}

      {page.seats.length > 0 && (
        <div className="cardstock dl-seats">
          <span className="laylab">The seats that rule {page.domain}</span>
          {page.seats.map((s) => (
            <div key={s.id} className="dl-seatcard">
              <span className="dl-st">{s.term}<span className="dl-zh">{s.termZh}</span></span>
              <span className="dl-meta">{GATE_SPAN[s.gateKey]} · {s.kind === 'stem' ? 'in plain view' : 'inside'} · {s.domains.join(', ')}</span>
              <p className="body2 dl-defl">{s.defline}</p>
              {!locked && <p className="body2 dl-read">{s.reading}</p>}
              {TG_DEFLINE[s.god] && <p className="body2 dl-about"><b>About {s.persona.replace(/^The /, 'the ')}.</b> {TG_DEFLINE[s.god]}.</p>}
            </div>
          ))}
          {locked && <p className="body2 el-domlock" style={{ margin: '8px 0 0' }}>Each seat's full reading opens with Seeker.</p>}
        </div>
      )}
    </div>
  );
}
