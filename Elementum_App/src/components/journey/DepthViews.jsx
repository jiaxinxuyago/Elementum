// ===================================================================
// ELEMENTUM · DepthViews — the in-depth sections (owner rulings 2026-10-17/18)
// ===================================================================
// The four sections below the dominance wheel on Your Reading, and their
// pages, drawn from the round-6/7 mockups (R1–R5, P1–P6 A): YOUR DOMAINS
// (eight domains, each read By position), YOUR LIFE CHAPTERS (the gates
// with their decades, and the years of the current decade), YOUR STARS,
// then "Going deeper" and YOUR ENERGY BLUEPRINT. The page models come from
// depthResolve.js; a unit not yet written renders its draft line with a
// "draft" tag (owner B3). Shown on the dev site only (B1).
// Tiers (F1–F3): free sees each section's hook, Seeker the readings, the
// chapters, decades and decade stars, Advisor the Blueprint, the years and
// the domain angles By decade and By year.
// ===================================================================

import { useState } from 'react';
import './depth.css';

const GATE_NAME = { year: 'Early', month: 'Rising', day: 'Home', hour: 'Late' };
const GATE_AGES = { year: 'birth–15', month: '16–34', day: '35–47', hour: '48 on' };
const GATE_ORDER = ['year', 'month', 'day', 'hour'];
const NUMW = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const isSeeker = (t) => t === 'seeker' || t === 'advisor';

/** A unit's text, with the dev tag when it is still a draft (B3). */
export function U({ u, as: Tag = 'p', className = 'elpos-domread dp-text' }) {
  if (!u?.text) return null;
  return <Tag className={className}>{u.text}{u.draft ? <span className="dp-draft">draft</span> : null}</Tag>;
}

function Lock({ tier = 'Seeker', what, onUpgrade }) {
  return (
    <div className="dp-lock">
      <p className="body2 el-domlock" style={{ margin: 0 }}>{what}</p>
      <button type="button" className="el-domsheet-cta" onClick={() => onUpgrade?.(tier === 'Advisor' ? 'Advisor' : 'Seeker')}>Open with {tier}</button>
    </div>
  );
}

/** The four gates as a life line, the reader's age marked; `lit` dims the seats not listed. */
export function LifeLine({ positions, age, lit = null, hourUnknown = false, large = false }) {
  const gi = age < 16 ? 0 : age < 35 ? 1 : age < 48 ? 2 : 3;
  const bounds = [[0, 16], [16, 35], [35, 48], [48, 80]][gi];
  const frac = Math.max(0, Math.min(1, (age - bounds[0]) / (bounds[1] - bounds[0])));
  return (
    <div className={`dp-life${large ? ' dp-life-lg' : ''}`}>
      {GATE_ORDER.map((g, i) => (
        <span key={g} className={`dp-gate${i === gi ? ' cur' : i > gi ? ' fut' : ''}`}>
          <span className="dp-gname">{GATE_NAME[g]}</span>
          <span className="dp-gseats">
            {g === 'hour' && hourUnknown ? <span className="dp-gclosed">closed</span>
              : positions.filter((p) => p.gateKey === g).sort((a, b) => (a.kind === 'stem' ? 0 : 1) - (b.kind === 'stem' ? 0 : 1)).map((p) => (
                <span key={p.id} title={p.term} className={`node n-${p.el} dp-mini${lit && !lit.includes(p.id) ? ' dim' : ''}`} />
              ))}
          </span>
          <span className="dp-gage">{GATE_AGES[g]}</span>
        </span>
      ))}
      <span className="dp-you" style={{ left: `${(gi + frac) * 25}%` }}><span>you · {age}</span></span>
    </div>
  );
}

// ── the catalogue beats ──────────────────────────────────────────────
export function DepthBeats({ d, positions, hourUnknown, Use, DOM, onOpen }) {
  const { dm, chapters: L, stars: S, blueprint: B } = d;
  const top = dm.pages.filter((p) => p.seats.length).slice(0, 2);
  const tie = top.length === 2 && top[0].seats.length === top[1].seats.length;
  const pips = (p) => p.seats.map((s) => s.el);
  return (
    <>
      <div className="beat dp-beat" data-beat="4">
        <span className="sec-eyebrow">YOUR DOMAINS</span>
        <div className="cardstock manual-tile dp-tile" role="button" tabIndex={0} onClick={() => onOpen('domains')} onKeyDown={(e) => { if (e.key === 'Enter') onOpen('domains'); }}>
          <div className="idg-line dp-line"><Use id={DOM[top[0]?.domain] || 'dom-career'} className="idg-el" />
            <span className="idg-t">{tie ? <><b>{top[0].domain}</b> and <b>{top[1].domain}</b> carry the most weight in your life</> : <><b>{top[0]?.domain}</b> carries the most weight in your life</>}</span>
            <Use id="ico-chev-r" className="dp-go" /></div>
          <div className="dp-doms">
            {dm.pages.map((p) => (
              <span key={p.domain} role="button" tabIndex={0} className={`dp-dom${top.includes(p) ? ' heavy' : ''}`}
                onClick={(e) => { e.stopPropagation(); onOpen('domain', p.domain); }} onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onOpen('domain', p.domain); } }}>
                <span className="dp-domring"><Use id={DOM[p.domain]} /></span>
                <span className="dp-domname">{p.domain}</span>
                <span className="dp-pips">{pips(p).map((e, i) => <i key={i} style={{ background: `var(--${e}Deep)` }} />)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="beat dp-beat" data-beat="5">
        <span className="sec-eyebrow">YOUR LIFE CHAPTERS</span>
        <div className="cardstock manual-tile dp-tile" role="button" tabIndex={0} onClick={() => onOpen('chapters')} onKeyDown={(e) => { if (e.key === 'Enter') onOpen('chapters'); }}>
          <div className="idg-line dp-line"><Use id="tab-today" className="idg-el" />
            <span className="idg-t">You are in your <b>{L.chapters.find((c) => c.key === L.gateNow)?.name.replace(/^The /, '')}</b>{L.current ? <> · {/^[AEIOU]/.test(L.current.persona) ? 'an' : 'a'} <b>{L.current.persona}</b> decade</> : null}</span>
            <Use id="ico-chev-r" className="dp-go" /></div>
          <LifeLine positions={positions} age={L.age} hourUnknown={hourUnknown} />
        </div>
      </div>
      <div className="beat dp-beat" data-beat="6">
        <span className="sec-eyebrow">YOUR STARS</span>
        <div className="cardstock manual-tile dp-tile" role="button" tabIndex={0} onClick={() => onOpen('stars')} onKeyDown={(e) => { if (e.key === 'Enter') onOpen('stars'); }}>
          <div className="idg-line dp-line"><Use id="ico-spark" className="idg-el" /><span className="idg-t">{S.claim.text.replace(/\.$/, '')}</span><Use id="ico-chev-r" className="dp-go" /></div>
          <div className="dp-stars">
            {S.help.map((s) => <span key={s.id} className="dp-star gift">{s.en}</span>)}
            {S.test.map((s) => <span key={s.id} className="dp-star test">{s.en}</span>)}
            {S.arriving.slice(0, 2).map((s) => <span key={s.id + s.decade.startYear} className="dp-star come">{s.en} · {s.decade.startYear}–{s.decade.endYear}</span>)}
          </div>
        </div>
      </div>
      <div className="dp-deeper"><span>Going deeper</span></div>
      <div className="beat dp-beat" data-beat="7">
        <span className="sec-eyebrow">YOUR ENERGY BLUEPRINT</span>
        <div className="cardstock manual-tile dp-tile dp-deep" role="button" tabIndex={0} onClick={() => onOpen('blueprint')} onKeyDown={(e) => { if (e.key === 'Enter') onOpen('blueprint'); }}>
          <div className="idg-line dp-line"><Use id="ico-lock" className="idg-el" /><span className="idg-t">{B.title.replace(/ · .*/, '').replace(/^An? /, (a) => a)}<span className="dp-zh"> · {B.zh}</span> <span className="role-pill core dp-adv">Advisor</span></span><Use id="ico-chev-r" className="dp-go" /></div>
          <p className="dp-parts">Your structure · What it runs on and lacks · Seen and unseen · Pairings and clashes</p>
        </div>
      </div>
    </>
  );
}

// ── Domains ──────────────────────────────────────────────────────────
export function DomainsHubPage({ dm, Use, DOM, onOpen }) {
  const top = dm.pages.filter((p) => p.seats.length).slice(0, 2);
  return (
    <>
      <div className="cardstock dp-head"><span className="laylab">YOUR DOMAINS</span><span className="serifline el-teasetitle dp-title">Eight parts of your life, and who rules them</span>
        <p className="body2" style={{ margin: 0 }}>One of ten characters sits in each seat of your chart, and each character rules certain parts of your life. Where several seats rule the same domain, that domain carries more weight for you.</p></div>
      <div className="dp-domgrid">
        {dm.pages.map((p) => (
          <button type="button" key={p.domain} className={`cardstock dp-domcard${top.includes(p) ? ' heavy' : ''}`} onClick={() => onOpen(p.domain)}>
            <span className="dp-dom"><span className="dp-domring"><Use id={DOM[p.domain]} /></span><span className="dp-domname">{p.domain}</span>
              <span className="dp-pips">{p.seats.map((s, i) => <i key={i} style={{ background: `var(--${s.el}Deep)` }} />)}</span></span>
            <span className="dp-domh">{p.headline || p.count}</span>
          </button>
        ))}
      </div>
      <p className="body2 el-domlock" style={{ textAlign: 'center' }}>Every headline and each domain’s first reading are free.</p>
    </>
  );
}

export function DomainReadingPage({ v, positions, age, hourUnknown, tier, onUpgrade, onChapters, Use, DOM }) {
  const [tab, setTab] = useState(0);
  const seeker = isSeeker(tier); const adv = tier === 'advisor';
  const seatBlocks = v.blocks.filter((b) => b.kind === 'seat');
  return (
    <>
      <div className="cardstock dp-head"><span className="laylab"><Use id={DOM[v.domain]} className="dp-labic" />THE DOMAINS · {v.domain.toUpperCase()}</span>
        {v.headline && <span className="serifline el-teasetitle dp-title">{v.headline}</span>}
        <p className="body2" style={{ margin: '0 0 2px' }}>{v.intro}</p>
        <LifeLine positions={positions} age={age} lit={v.lit} hourUnknown={hourUnknown} large /></div>
      <div className="dp-tabs" role="tablist">
        {['By position', 'By decade', 'By year'].map((t, i) => (
          <button type="button" role="tab" aria-selected={tab === i} key={t} className={`dp-tab${tab === i ? ' on' : ''}${i > 0 ? ' adv' : ''}`} onClick={() => setTab(i)}>{t}{i > 0 ? ' · Advisor' : ''}</button>
        ))}
      </div>
      {tab === 0 && (<>
        <div className="dp-step"><span className="dp-stepey">How you are</span>
          {v.how ? <p className="elpos-domread dp-text">{v.how}</p> : null}
          {v.pattern ? <p className="elpos-domread dp-text">{v.pattern.text}</p> : null}</div>
        {seatBlocks.length > 0 && <span className="dp-stepey dp-stephead">The {seatBlocks.length === 1 ? 'seat that rules' : `${NUMW[seatBlocks.length].toLowerCase()} seats that rule`} your {v.domain}</span>}
        {v.blocks.length > 0 && (
          <div className="cardstock dp-seats">
            {v.blocks.map((b, i) => (b.kind === 'gap'
              ? <div key={`g${i}`} className="dp-gaprow"><b>{b.label}</b> {seeker ? b.text : 'Opens with Seeker.'}</div>
              : (
                <div key={b.seat.id} className="dp-seat">
                  <span className="dp-seatname">{b.name}</span><span className="dp-seatmeta">{b.meta}</span>
                  {seeker ? (b.text ? <p className="elpos-domread dp-text">{b.text}</p> : null) : <p className="dp-locked">This seat’s {v.domain} reading opens with Seeker.</p>}
                </div>
              )))}
            {!seeker && <Lock what={`Your ${v.domain} seats, what they have already done and what they bring next, open with Seeker.`} onUpgrade={onUpgrade} />}
          </div>
        )}
        {v.notes?.map((t) => <p key={t} className="body2 el-domlock dp-note">{t}</p>)}
        <button type="button" className="dp-go2" onClick={onChapters}>See your {v.domain} across your Life Chapters ›</button>
      </>)}
      {tab === 1 && (adv ? (
        <div className="cardstock dp-seats">
          {v.byDecade.length ? v.byDecade.map((x) => <div key={x.label} className="dp-seat"><span className="dp-seatmeta">{x.label}</span><p className="elpos-domread dp-text">{x.text}</p></div>)
            : <p className="body2" style={{ margin: 0 }}>No decade in your reading window rules your {v.domain}.</p>}
        </div>
      ) : <div className="cardstock dp-seats"><Lock tier="Advisor" what={`Your ${v.domain} decade by decade opens with Advisor.`} onUpgrade={onUpgrade} /></div>)}
      {tab === 2 && (adv ? (
        <div className="cardstock dp-seats">
          {v.byYear.length ? v.byYear.map((x) => <div key={x.label} className="dp-seat"><span className="dp-seatmeta">{x.label}</span><U u={x} /></div>)
            : <p className="body2" style={{ margin: 0 }}>No year left in this decade touches your {v.domain} directly.</p>}
        </div>
      ) : <div className="cardstock dp-seats"><Lock tier="Advisor" what={`Your ${v.domain} year by year opens with Advisor.`} onUpgrade={onUpgrade} /></div>)}
    </>
  );
}

// ── Life Chapters ────────────────────────────────────────────────────
export function ChaptersPage({ L, positions, hourUnknown, tier, onUpgrade, onOpenDomain, onDiscoverHour, Use }) {
  const seeker = isSeeker(tier); const adv = tier === 'advisor';
  const upcoming = L.years.filter((y) => y.status !== 'lived');
  const now = L.years.find((y) => y.status === 'now');
  return (
    <>
      <div className="cardstock dp-head"><span className="laylab"><Use id="tab-today" className="dp-labic" />YOUR LIFE CHAPTERS</span>
        <span className="serifline el-teasetitle dp-title">{L.claim.text}</span>
        <p className="body2" style={{ margin: '0 0 2px' }}>Your chart has four gates, and each one is a stretch of your life. Every gate holds two seats, one in plain view and one inside, and the characters in them set the tone of those years. Your decades run inside the chapters, ten years each.</p>
        <LifeLine positions={positions} age={L.age} hourUnknown={hourUnknown} large />
        <div className="dp-strip">{L.strip.map((s) => <span key={s.startAge} className={`dp-dc ${s.pole === 'helping' ? 'hp' : 'hv'}${s.now ? ' now' : ''}`}><b>{s.startAge}</b>{s.persona}</span>)}</div>
        <p className="body2 el-domlock" style={{ margin: '4px 0 0' }}>Green decades help your chart. Grey ones weigh on it.</p></div>
      {L.chapters.map((c) => (
        <div key={c.key} className={`cardstock dp-chap${c.status === 'now' ? ' cur' : c.status === 'coming' ? ' fut' : ''}`}>
          <div className="dp-chh"><span className="dp-cn">{c.name}</span><span className={`dp-cs${c.status === 'now' ? ' now' : ''}`}>{c.span.replace(/^birth to/, 'birth to')} · {c.status === 'coming' ? `from ${c.fromYear ?? ''}` : c.status}</span></div>
          {c.closed ? (
            <div className="dp-gaprow">Your Hour Gate is closed. Add your birth hour to read your Late Chapter. <button type="button" className="dp-inline" onClick={onDiscoverHour}>Add your hour ›</button></div>
          ) : (<>
            <span className="dp-cseat">{c.seats.map((p) => `${p.persona} ${p.kind === 'stem' ? 'at' : 'inside'}`).join(' · ').replace(/(^|· )The /g, '$1the ').replace(/^the/, 'The')}</span>
            <span className="dp-chips">{c.domains.map((dn) => <button type="button" key={dn} className="dp-chip" onClick={() => onOpenDomain(dn)}>{dn}</button>)}</span>
            {seeker ? c.parts.map((p) => <U key={p.seat.id} u={p} />) : <p className="dp-locked">This chapter’s reading opens with Seeker.</p>}
          </>)}
          {c.decades.map((dc) => (
            <div key={dc.startYear} className={`dp-dec${dc.tense === 'now' ? ' now' : ''}`}>
              <span className="dp-when">{dc.label}</span>
              {seeker ? <U u={dc} /> : null}
              {dc.tense === 'now' && (
                <>
                  <div className="dp-years">{L.years.map((y) => <span key={y.year} className={`dp-yr${y.status === 'now' ? ' now' : ''}${y.status === 'lived' ? ' past' : ''}`}>{y.year} {y.persona}</span>)}</div>
                  {adv ? (
                    <div className="dp-yearlist">
                      {upcoming.map((y) => (
                        <div key={y.year} className={`dp-yearcard${y.status === 'now' ? ' now' : ''}`}>
                          <span className="dp-yh">{y.year}, {/^[AEIOU]/.test(y.persona) ? 'an' : 'a'} {y.persona} year<small>{y.status === 'now' ? 'now · ' : ''}{y.pole === 'helping' ? 'helping' : 'weighs'}</small></span>
                          <U u={y} />
                          {y.bond && <><span className="dp-bondlab">{y.bond.label}</span><U u={y.bond} /></>}
                        </div>
                      ))}
                    </div>
                  ) : <Lock tier="Advisor" what={now ? `${now.year}, ${/^[AEIOU]/.test(now.persona) ? 'an' : 'a'} ${now.persona} year: what this year brings you, and each year to ${L.years[L.years.length - 1].year}.` : 'Each year of this decade opens with Advisor.'} onUpgrade={onUpgrade} />}
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

// ── Stars ────────────────────────────────────────────────────────────
function StarCard({ s, kind, seeker }) {
  return (
    <div className={`cardstock dp-starcard ${kind}`}>
      <span className={`dp-star ${kind === 'help' ? 'gift' : kind}`} style={{ alignSelf: 'flex-start' }}>{s.en}</span><span className="dp-zh">{s.zh}</span>
      <span className="dp-seatmeta">{s.where}</span>
      <U u={s.line} className="dp-one" />
      {seeker ? (s.readings || [s.reading]).map((r, i) => <U key={i} u={r} />) : <p className="dp-locked">Its full reading opens with Seeker.</p>}
    </div>
  );
}
export function StarsPage({ S, tier, onUpgrade, Use }) {
  const seeker = isSeeker(tier); const adv = tier === 'advisor';
  const years = [...new Set(S.yearStars.map((s) => s.year))];
  return (
    <>
      <div className="cardstock dp-head"><span className="laylab"><Use id="ico-spark" className="dp-labic" />YOUR STARS</span><span className="serifline el-teasetitle dp-title">{S.claim.text}</span>
        <p className="body2" style={{ margin: 0 }}>The symbolic stars are an older, lighter layer of the reading. Each one colours the gate it sits in, and none of them overrides the characters in your seats.</p></div>
      {S.help.length > 0 && <><span className="dp-stepey dp-stephead">Stars that help</span>{S.help.map((s) => <StarCard key={s.id} s={s} kind="help" seeker={seeker} />)}</>}
      {S.test.length > 0 && <><span className="dp-stepey dp-stephead">Stars that test</span>{S.test.map((s) => <StarCard key={s.id} s={s} kind="test" seeker={seeker} />)}</>}
      {(S.arriving.length > 0 || years.length > 0) && <span className="dp-stepey dp-stephead">Stars arriving with your time</span>}
      {seeker ? S.arriving.map((s) => <StarCard key={s.id + s.decade.startYear} s={s} kind="come" seeker />) : S.arriving.map((s) => (
        <div key={s.id + s.decade.startYear} className="cardstock dp-starcard come"><span className="dp-star come" style={{ alignSelf: 'flex-start' }}>{s.en}</span><span className="dp-zh">{s.zh}</span><span className="dp-seatmeta">{s.where}</span><p className="dp-locked">The stars your decades bring open with Seeker.</p></div>
      ))}
      {years.length > 0 && (adv ? (
        <div className="cardstock dp-seats">
          {years.map((y) => (
            <div key={y} className="dp-seat"><span className="dp-seatname">{y}</span>
              {S.yearStars.filter((s) => s.year === y).map((s) => <div key={s.id}><span className="dp-seatmeta">{s.en} · {s.zh}</span><U u={s.reading} /></div>)}</div>
          ))}
        </div>
      ) : <div className="cardstock dp-seats"><Lock tier="Advisor" what={`The stars your years bring, from ${years[0]} to ${years[years.length - 1]}, open with Advisor.`} onUpgrade={onUpgrade} /></div>)}
      {!seeker && <Lock what="Every star’s reading, and the stars your decades bring, open with Seeker." onUpgrade={onUpgrade} />}
    </>
  );
}

// ── Energy Blueprint ─────────────────────────────────────────────────
const Lab = ({ children }) => <b className="el-funclab">{children}</b>;
const Meta = ({ children }) => <span className="dp-seatmeta">{children}</span>;
export function BlueprintPage({ B, tier, onUpgrade, seek, ease, Use }) {
  const head = (
    <div className="cardstock dp-head dp-deep"><span className="laylab">{tier !== 'advisor' && <Use id="ico-lock" className="dp-labic" />}YOUR ENERGY BLUEPRINT</span><span className="serifline el-teasetitle dp-title">{B.title}</span>
      <p className="body2" style={{ margin: 0 }}>The decoding of your chart: why the rest of your reading comes out the way it does.</p></div>
  );
  if (tier !== 'advisor') return (
    <>
      {head}
      {['Your structure', 'What your chart runs on and lacks', 'Seen and unseen', 'Pairings and clashes'].map((t) => <div key={t} className="cardstock dp-lockrow"><Use id="ico-lock" className="dp-labic" />{t}</div>)}
      <Lock tier="Advisor" what="The four parts of your Blueprint open with Advisor." onUpgrade={onUpgrade} />
    </>
  );
  const { structure: s, runs: r, seen, pairs } = B;
  return (
    <>
      {head}
      <div className="cardstock dp-bp"><span className="dp-stepey">1 · Your structure</span>
        <U u={s.reading} />
        <Meta>why · the revealed-stem rule</Meta><U u={s.rule} />
        <p className="elpos-domread dp-text"><Lab>{s.statusLabel}</Lab> {s.status.text}{s.status.draft ? <span className="dp-draft">draft</span> : null}</p>
        {s.rescue && <><Meta>{s.rescue.label}</Meta><U u={s.rescue} /></>}
      </div>
      <div className="cardstock dp-bp"><span className="dp-stepey">2 · What your chart runs on and lacks</span>
        <p className="elpos-domread dp-text"><Lab>Strongest.</Lab> {r.strongest.text}{r.strongest.draft ? <span className="dp-draft">draft</span> : null}</p>
        {r.missing.length > 0 && <p className="elpos-domread dp-text" style={{ marginBottom: 0 }}><Lab>Missing.</Lab></p>}
        {r.missing.map((x) => <div key={x.god}><Meta>{x.label}</Meta><U u={x} /></div>)}
        {r.season && <><p className="elpos-domread dp-text" style={{ marginBottom: 0 }}><Lab>Your season · 调候.</Lab></p><Meta>{r.seasonCell.name} · 穷通宝鉴</Meta><U u={r.season} /></>}
        {r.needs.map((x) => <div key={x.key}><Meta>{x.label}</Meta><U u={x} /></div>)}
        <div className="dp-seekease">
          <span className="role-pill cat"><Use id="ar-up" />Seek</span>{seek.map((e) => <span key={e} className={`node n-${e} dp-mini`} />)}
          <span className="role-pill fric" style={{ marginLeft: 10 }}><Use id="ar-down" />Ease</span>{ease.map((e) => <span key={e} className={`node n-${e} dp-mini`} />)}
        </div>
      </div>
      <div className="cardstock dp-bp"><span className="dp-stepey">3 · Seen and unseen</span>
        <p className="elpos-domread dp-text" style={{ marginBottom: 0 }}><Lab>In plain view.</Lab></p>
        {seen.plain.map((x) => <div key={x.key}><Meta>{x.label}</Meta><U u={x} /></div>)}
        <p className="elpos-domread dp-text" style={{ marginBottom: 0 }}><Lab>Inside.</Lab></p>
        {seen.inside.map((x) => <div key={x.key}><Meta>{x.label}</Meta><U u={x} /></div>)}
        <U u={seen.close} />
      </div>
      <div className="cardstock dp-bp"><span className="dp-stepey">4 · Pairings and clashes</span>
        {pairs.pairs.map((x) => <div key={x.key}><Meta>{x.label}</Meta><U u={x} /></div>)}
        {pairs.bonds.map((x, i) => <div key={x.key + i}><Meta>{x.label}</Meta><U u={x} /></div>)}
        {pairs.noneHard && <U u={pairs.noneHard} className="body2 el-domlock dp-note" />}
      </div>
    </>
  );
}
