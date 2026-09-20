// ===================================================================
// ELEMENTUM · ReadingDayMasterCard  (P4 — the Day Master reference card)
// ===================================================================
// Reached from the catalogue hero arrow. The quintessence page (REA_02 §5h,
// owner 2026-09-15): seal + archetype + manifesto, the "Birth Chart" route
// into the 八字 chart, The Sign, Your nature, the Gifts & Shadows panel with
// a door mark per trait, the pool note, and the carry card that puts all
// five energies in the manual's EASE / SEEK rows. Fills the app frame; the
// global tab bar sits over it. No gate here — identity is the free hook.
// Vocabulary firewall: no ten-god name on this page; function nouns only.
// ===================================================================


// The door mark carries the energy's volume as well as its arrow (owner R2,
// 2026-09-16): absent (unrooted for the core) · thin · wide · excess.
const VOL_LABEL = { absent: 'absent', thin: 'thin', abundant: 'wide', dominant: 'excess' };
function DoorMark({ mark }) {
  if (!mark) return null;
  const role = mark.role || 'none';
  const vol = mark.volume === 'absent' && mark.isCore ? 'unrooted' : VOL_LABEL[mark.volume] || '';
  return (
    <span className={`dm-door ${mark.el} ${role}${vol ? ' v-' + vol : ''}`} aria-label={`${mark.name}${vol ? ', ' + vol : ''}, ${role === 'seek' ? 'seek' : role === 'ease' ? 'ease' : 'balanced'}`}>
      <i />
      <span>{mark.name}{vol ? <em> · {vol}</em> : null}</span>
    </span>
  );
}

function CarryRow({ row }) {
  if (!row) return null;
  const role = row.kind === 'seek' ? 'Seek' : 'Ease';
  return (
    <div className={`dm-row ${row.kind}`}>
      <div className="dm-dots">
        {row.energies.map((e) => <span key={e.el} className={`dm-dot ${e.el}`}>{e.hz}</span>)}
      </div>
      <div className="dm-rowbody">
        <div className="dm-rl">
          <span className={`dm-role ${row.kind}`}>{role}</span>
          {row.energies.map((e) => (
            <span key={e.el}>{e.name} · {e.isCore ? 'you' : e.fn} · {e.presence}</span>
          ))}
        </div>
        {row.sentence ? <p className="dm-eff">{row.sentence}</p> : null}
        {row.remedy ? <p className="dm-rem">{row.remedy}</p> : null}
        {row.touch?.length ? (
          <div className="dm-touch">{row.touch.map((t) => <span key={t}>{t}</span>)}</div>
        ) : null}
      </div>
    </div>
  );
}

export default function ReadingDayMasterCard({ dayMaster, archetype, manifesto, overview, nature, gifts, shadows, band, balanced, carry, onBack, onBirthChart, onShare }) {
  // The causal frame (owner 2026-09-10) under the door rule (2026-09-15):
  // gifts show through the energies the chart asks you to seek, shadows
  // through the energies already carrying weight. A Balanced chart opens no
  // doors, so the bridges fall back to the band form.
  const shadowState = band === 'concentrated' ? 'RUNNING OVER' : band === 'open' ? 'RUNNING THIN' : 'OFF BALANCE';
  // Bridges in the capability register (owner R5-of-the-report, 2026-09-16):
  // the material's reach, not a claim about the chart; the carry card below
  // keeps the chart claims.
  const giftBridge = balanced ? 'These light up when your core runs balanced.' : `What ${archetype} can do where your chart asks for more.`;
  const shadowBridge = balanced ? 'These swell when the balance slips.' : `Where ${archetype} overgrows when an energy carries weight.`;
  // The pool note ("Five of the Blade's fourteen…") was retired by the owner
  // on 2026-09-20: the bridges frame the chips, the count needs no apology.
  // An empty side (no open door) renders nothing, header included.
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
            <div className="layer-label">The Sign</div>
            <p>{overview}</p>
          </div>
        ) : null}

        {nature ? (
          <div className="layer" style={{ marginTop: 12 }}>
            <div className="layer-label">Your nature</div>
            <p>{nature}</p>
          </div>
        ) : null}

        {(gifts?.length || shadows?.length) ? (
          <div className="claims-card" style={{ marginTop: 12 }}>
            {gifts?.length ? (
              <>
                <div className="layer-label gs-right" style={{ padding: '2px 0 2px' }}>{archetype.toUpperCase()}, RUNNING RIGHT</div>
                <div className="gs-bridge">{giftBridge}</div>
              </>
            ) : null}
            {(gifts || []).map((g) => (
              <div className="claim dm-claim" key={g.phrase}>
                <span><b>{g.phrase}.</b> {g.desc}</span>
                <DoorMark mark={g.mark} />
              </div>
            ))}
            {shadows?.length ? (
              <>
                <div className="layer-label gs-over" style={{ padding: '10px 0 2px' }}>{archetype.toUpperCase()}, {shadowState}</div>
                <div className="gs-bridge">{shadowBridge}</div>
              </>
            ) : null}
            {(shadows || []).map((s) => (
              <div className="claim dm-claim" key={s.phrase}>
                <span><b>{s.phrase}.</b> {s.desc}</span>
                <DoorMark mark={s.mark} />
              </div>
            ))}
          </div>
        ) : null}

        {carry ? (
          <div className="layer dm-carry" style={{ marginTop: 12 }}>
            <div className="layer-label">How your chart carries {archetype}</div>
            <p className="dm-lead">{carry.lead}</p>
            <div className="dm-track" aria-label="Your five energies by presence">
              {carry.track.map((t) => <b key={t.el} className={t.el} style={{ width: `${Math.max(t.presence, 2)}%` }} />)}
            </div>
            <div className="dm-tracklab">
              {carry.track.map((t) => (
                <span key={t.el} style={{ width: `${Math.max(t.presence, 2)}%` }}>
                  <em>{t.presence}</em>
                  {t.presence >= 12 ? <>{t.name}{t.mark ? <i className={t.mark}>{t.mark === 'seek' ? '▲' : '▼'}</i> : null}</> : null}
                </span>
              ))}
            </div>
            {carry.ease || carry.seek ? (
              <div className="dm-rows">
                <CarryRow row={carry.ease} />
                <CarryRow row={carry.seek} />
              </div>
            ) : null}
            <button type="button" className="dm-handoff" onClick={onBack}>
              <span>Your <b>manual</b> holds the full seek and ease rows.</span>
              <svg className="bc-arr" viewBox="0 0 24 24" aria-hidden="true"><use href="#ico-arrow-r" /></svg>
            </button>
          </div>
        ) : null}

        <div className="expander">
          <span className="uico"><svg viewBox="0 0 24 24"><use href="#ico-chev-r" /></svg></span>
          What&apos;s a Day Master, and why the day?
        </div>
        <div className="codex-link">Deeper in the Codex →</div>
      </div>
    </div>
  );
}
