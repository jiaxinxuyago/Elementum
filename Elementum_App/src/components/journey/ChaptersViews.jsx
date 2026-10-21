// ===================================================================
// ELEMENTUM · ChaptersViews — Life Chapters, energy first
// ===================================================================
// Owner direction 2026-10-21 and rulings L1–L10, R1–R4 all A (record:
// ComparativeAnalysis/Handoffs/2026-10-19-life-chapters-content/
// 03_RULINGS.md). Every chapter opens on the energy it carries, drawn in
// Your Almanac's language (L10 A): the element mark with its grow or
// release arrow, the lift meter, the eight-domain board. Then the words:
// the energy, underneath, where it lands, working with it (the chapter the
// reader is in), the decades, and the years (Advisor).
// Tiers (R3 A): free sees the claim, the life line, the strip, each
// chapter's energy, lift and domain board, and the decade labels; Seeker
// the chapter and decade readings; Advisor the years.
// The model is chaptersResolve.js; ChaptersPage (DepthViews.jsx) hands over
// when the model is the energy one, passing its shared U, Lock and LifeLine.
// ===================================================================

import './chapters.css';

const DOMI = { Wealth: 'dom-wealth', Health: 'dom-health', Career: 'dom-career', Love: 'dom-love', Family: 'dom-family', Social: 'dom-social', Mind: 'dom-mind', Growth: 'dom-growth' };
const FNI = { Body: 'fn-body', Mind: 'fn-mind', Expression: 'fn-expression', Action: 'fn-action', Order: 'fn-order' };
const LIFT_COL = ['#9e5540', '#c08a6f', '#cdbe9e', '#8fa982', '#587a4d'];
const isSeeker = (t) => t === 'seeker' || t === 'advisor';
const an = (w) => (/^[AEIOU]/.test(w) ? 'an' : 'a');

function El({ el, dir, size = 'm', Use }) {
  return (
    <span className={`lc-el lc-${size}`} style={{ '--c': `var(--${el.toLowerCase()}Deep)` }} aria-label={el}>
      <Use id={`el-${el.toLowerCase()}`} />
      {dir ? <span className={`lc-dir ${dir}`}><Use id={dir === 'grow' ? 'ar-up' : 'ar-down'} /></span> : null}
    </span>
  );
}
function Lift({ lift, label = true }) {
  const s = lift.step;
  return (
    <span className="lc-lift">
      <span className="lc-meter" role="img" aria-label={lift.word}>{LIFT_COL.map((c, i) => <i key={i} className={i === s ? 'on' : ''} style={{ background: (s >= 2 ? i >= 2 && i <= s : i >= s && i <= 2) ? c : undefined }} />)}</span>
      {label ? <span className="lc-liftw">{lift.word}</span> : null}
    </span>
  );
}
function Board({ board, picks, onOpenDomain, Use }) {
  return (
    <div className="lc-board">
      {board.map(({ domain, w }) => (
        <button type="button" key={domain} className={`lc-dom${w ? '' : ' off'}${picks.includes(domain) ? ' pick' : ''}`} onClick={() => onOpenDomain(domain)}>
          <span className="lc-ring"><Use id={DOMI[domain]} /></span>
          <span className="lc-dn">{domain}</span>
          <span className="lc-pips">{[1, 2, 3, 4].map((i) => <i key={i} className={w >= i ? 'on' : ''} />)}</span>
        </button>
      ))}
    </div>
  );
}
const Sec = ({ children }) => <span className="lc-sec">{children}</span>;

function YearCard({ y, U, Use, onOpenStars }) {
  return (
    <div className={`lc-year${y.status === 'now' ? ' now' : ''}`}>
      {y.newDecade ? <span className="lc-newdec">A new decade begins · {y.newDecade}</span> : null}
      <div className="lc-yh"><El el={y.el} dir={y.dir} size="s" Use={Use} /><b>{y.year}, {an(y.el)} {y.el} year</b><small>{y.status === 'now' ? 'now · ' : ''}{y.fn}</small><Lift lift={y.lift} label={false} /></div>
      <U u={y} />
      {y.land ? <><span className="lc-land">{y.land.label}</span><U u={y.land} /></> : null}
      {y.stars.length ? <div className="lc-stars">{y.stars.map((s) => <button type="button" key={s.id} className="dp-star come" onClick={onOpenStars}>{s.en}</button>)}</div> : null}
    </div>
  );
}

export function EnergyChaptersPage({ L, positions, hourUnknown, tier, onUpgrade, onOpenDomain, onDiscoverHour, onOpenStars, Use, U, Lock, LifeLine }) {
  const seeker = isSeeker(tier); const adv = tier === 'advisor';
  const nowYear = L.years[0];
  return (
    <>
      <div className="cardstock dp-head"><span className="laylab"><Use id="tab-today" className="dp-labic" />YOUR LIFE CHAPTERS</span>
        <span className="serifline el-teasetitle dp-title">{L.claim.text}</span>
        <p className="body2" style={{ margin: '0 0 2px' }}>Your chart has four gates, and each one is a stretch of your life. Each carries an energy, and so does every ten-year decade inside it. Whether your chart grows that energy or releases it sets the tone of those years.</p>
        <LifeLine positions={positions} age={L.age} hourUnknown={hourUnknown} large />
        <div className="lc-strip">{L.strip.map((s) => <span key={s.startAge} className={`lc-dc s${s.step}${s.now ? ' now' : ''}`}><El el={s.el} size="xs" Use={Use} /><b>{s.startAge}</b>{s.el}</span>)}</div>
        <p className="body2 el-domlock" style={{ margin: '4px 0 0' }}>Each decade is an energy. Green ones lift your chart, rust ones weigh on it.</p></div>
      {L.chapters.map((c) => (
        <div key={c.key} className={`cardstock dp-chap lc-chap${c.status === 'now' ? ' cur' : c.status === 'coming' ? ' fut' : ''}`}>
          <div className="dp-chh"><span className="dp-cn">{c.name}</span><span className={`dp-cs${c.status === 'now' ? ' now' : ''}`}>{c.span} · {c.status === 'coming' ? `from ${c.fromYear ?? ''}` : c.status}</span></div>
          {c.closed ? (
            <div className="dp-gaprow">Your Hour Gate is closed. Add your birth hour to read your Late Chapter. <button type="button" className="dp-inline" onClick={onDiscoverHour}>Add your hour ›</button></div>
          ) : (<>
            <div className="lc-ehead">
              <El el={c.energy.el} dir={c.energy.dir} size="l" Use={Use} />
              <div className="lc-eh">
                <span className="lc-en">{c.energy.el}{c.energy.ground ? <small> over {c.energy.ground.el}</small> : null}</span>
                <span className="lc-ef"><Use id={FNI[c.energy.fn]} />{c.energy.fn} · {L.fnWord[c.energy.fn]} · you {c.energy.dir} it</span>
              </div>
            </div>
            <Lift lift={c.energy.lift} />
            {seeker ? <>
              <Sec>The energy</Sec><U u={c.energyU} />
              {c.groundU ? <><Sec>Underneath · {c.energy.ground.el}, {c.energy.ground.fn}</Sec><U u={c.groundU} /></> : null}
            </> : <p className="dp-locked">This chapter’s reading opens with Seeker.</p>}
            <Sec>Where it lands</Sec>
            <Board board={c.board} picks={c.lines.map((x) => x.domain)} onOpenDomain={onOpenDomain} Use={Use} />
            {seeker && c.lines.map((x) => (
              <div key={x.domain} className="lc-line"><span className="lc-ring sm"><Use id={DOMI[x.domain]} /></span><U u={x} /></div>
            ))}
            {seeker && c.manual ? <>
              <Sec>Working with it</Sec><U u={c.manual} />
              {c.manual.seek.length ? <div className="lc-seek"><span className="role-pill cat"><Use id="ar-up" />Seek</span>{c.manual.seek.map((s) => <span key={s.el} className="lc-seekel"><El el={s.el} size="s" Use={Use} />{s.el}, {s.fn}</span>)}{c.manual.brings ? <span className="lc-brings">{c.manual.brings}</span> : null}</div> : null}
            </> : null}
          </>)}
          {c.decades.map((d) => (
            <div key={d.startYear} className={`dp-dec lc-dec${d.tense === 'now' ? ' now' : ''}`}>
              <div className="lc-dh"><El el={d.el} dir={d.dir} size="s" Use={Use} /><span className="dp-when">{d.label} · {d.fn}</span><Lift lift={d.lift} label={false} /></div>
              {seeker ? <U u={d} /> : null}
              {d.tense === 'now' && seeker && d.ground ? <><Sec>Underneath · {d.groundEl}</Sec><U u={d.ground} /></> : null}
              {d.tense === 'now' && seeker && d.favours?.length ? <>
                <Sec>This decade favours</Sec>
                <div className="lc-favs">{d.favours.map((f) => <div key={f.domain} className="lc-fav"><span className="lc-ring sm"><Use id={DOMI[f.domain]} /></span><b>{f.lean}</b><em>over</em><span>{f.over}</span>{f.draft ? <span className="dp-draft">draft</span> : null}</div>)}</div>
              </> : null}
              {d.tense === 'now' && (
                <>
                  <div className="lc-lived">{L.lived.map((y) => <span key={y.year} className={`lc-yc s${y.step}`}><El el={y.el} size="xs" Use={Use} />{y.year}</span>)}</div>
                  {adv ? <div className="lc-years">{L.years.map((y) => <YearCard key={y.year} y={y} U={U} Use={Use} onOpenStars={onOpenStars} />)}</div>
                    : nowYear ? <Lock tier="Advisor" what={`${nowYear.year}, ${an(nowYear.el)} ${nowYear.el} year: what it brings you, and each year to ${L.years[L.years.length - 1].year}.`} onUpgrade={onUpgrade} /> : null}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
      {!seeker && <Lock what="Your chapter and decade readings open with Seeker." onUpgrade={onUpgrade} />}
    </>
  );
}
