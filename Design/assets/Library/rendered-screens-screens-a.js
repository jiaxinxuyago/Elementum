/* ============ Screens 1–6 ============ */
(function(){

function tile(o){
  return `<div class="tile" style="${pv(o.el)}${o.style||''}">
    <div class="frame" style="height:${o.frameH||120}px">
      ${art(o.art,o.el)}<div class="fade"></div>
      <div class="tmk">${mark(o.el)}</div>
      <div class="twz" style="font-size:${o.hzSize||24}px">${EL[o.el].hz}</div>
    </div>
    <div class="foot">
      ${o.eyebrow?`<span class="eyebrow pig">${o.eyebrow}</span>`:''}
      <div class="ti" style="font-size:${o.tiSize||18}px">${o.title}</div>
      ${o.sub?`<div class="body sm italic">${o.sub}</div>`:''}
      ${o.extra||''}
    </div>
  </div>`;
}
function backRow(label){
  return `<div class="row" style="padding:6px 0 0;color:var(--inkLight)">${ico('ico-back','chev')}<span class="eyebrow">${label}</span></div>`;
}

/* ---------- 1 · READING CATALOGUE ---------- */
const s1 = col(
  {v:'Reading tab · center', n:'Reading Catalogue', d:'Day-master identity hero over a tiered tile pyramid — featured nature, themed pair, compact pair.'},
  statusbar() + `<div class="scr">
    ${pagebg('metal')}
    <div class="hero" style="${pv('metal')}height:250px;border-radius:0;border:none;box-shadow:none;flex-shrink:0;">
      ${art('metal-geng','metal')}
      <div class="scrim" style="background:linear-gradient(to top,rgba(20,17,13,.66),rgba(20,17,13,.14) 56%,transparent 78%),radial-gradient(58% 48% at 50% 44%,rgba(20,17,13,.30),transparent)"></div>
      <div style="position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;">
        <div style="width:86px;height:86px;border-radius:18px;background:rgba(248,244,236,.14);border:1px solid rgba(248,244,236,.4);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px)">
          <span class="hz" style="font-size:40px;color:#f3ecdd">庚</span></div>
        <div><div class="reye" style="justify-content:center;color:#e7d7b6">Your Day Master</div>
        <div class="htitle" style="font-size:33px;color:#f6f1e6;margin-top:4px">The Blade</div>
        <div class="hsub" style="color:#dccfb6">庚 · Yang Metal</div></div>
      </div>
    </div>
    <div class="pad tight" style="padding-top:13px">
      <div class="row" style="justify-content:space-between;align-items:baseline">
        <span class="eyebrow">Readings</span>
        <span class="text-tertiary">Energy Map →</span>
      </div>
      ${tile({el:'metal',art:'metal-blade',frameH:96,eyebrow:'Base Energy · Primary',title:'Elemental Nature',tiSize:21,sub:'The forged edge — precise, exacting.'})}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
        ${tile({el:'earth',art:'composite',frameH:108,eyebrow:'Primary · Secondary',title:'Dominant<br>Energies',tiSize:17})}
        ${tile({el:'fire',art:'fire-bing',frameH:108,eyebrow:'Catalyst · Resistance',title:'Forces in<br>Motion',tiSize:17})}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
        ${tile({el:'wood',art:'landscape',frameH:74,eyebrow:'Your Decades',title:'Life Chapters',tiSize:15,hzSize:18})}
        ${tile({el:'water',art:'enso',frameH:74,eyebrow:'Four Pillars',title:'Pillar Patterns',tiSize:15,hzSize:18})}
      </div>
    </div>
    ${tabbar('reading')}
  </div>`
);

/* ---------- 2 · TODAY HUB (mosaic) ---------- */
const s2 = col(
  {v:'Today tab · landing', n:'Readings Hub', d:'Nested time made visible — Day featured, Month + Year pair, Decade wide.'},
  statusbar() + `<div class="scr">
    ${pagebg('water',{img:'landscape',imgOpacity:0.07})}
    <div class="pad">
      <div style="padding:8px 0 0"><span class="eyebrow">Your Readings</span>
        <div class="title" style="font-size:25px;margin-top:2px">Across time</div></div>
      ${tile({el:'water',art:'water-ren',frameH:142,eyebrow:'Today · Thu May 28 · Water Day',title:'A day to express',tiSize:24,
        extra:`<div class="row" style="justify-content:space-between;margin-top:3px"><span class="body sm italic">壬 · open today’s reading</span>${ico('ico-chev-r','chev')}</div>`})}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
        ${tile({el:'wood',art:'wood-jia',frameH:96,eyebrow:'This Month',title:'Consolidate',tiSize:19,sub:'May · Wood Month'})}
        ${tile({el:'fire',art:'fire-bing',frameH:96,eyebrow:'This Year',title:'Be seen',tiSize:19,sub:'2026 · 丙午'})}
      </div>
      ${tile({el:'fire',art:'fire-ding',frameH:104,eyebrow:'Life Chapter · Yr 3 / 10',title:'The Fire Decade',tiSize:22,hzSize:26,sub:'2023–2032 · the season beneath it all',
        extra:`<span class="twz" style="display:none"></span>`})}
    </div>
    ${tabbar('today')}
  </div>`
);

/* ---------- 3 · DAY PAGE ---------- */
const s3 = col(
  {v:'Hub → destination', n:'Day page', d:'Day energy, chapter context, catalyst, Do / Avoid, best hours.'},
  statusbar() + `<div class="scr">
    ${pagebg('water')}
    <div class="pad tight">
      ${backRow('Readings · Day')}
      ${sceneHero({el:'water',art:'water-ren',h:158,eyebrow:'Thursday, May 28 · Water Day',title:'A day to express',sub:'壬 · Water Stem · Food God',tSize:27,hzText:'壬',hzSize:54})}
      <div class="cardstock" style="${pv('water')}display:flex;align-items:center;gap:10px;padding:13px 15px">
        <span class="eyebrow" style="flex-shrink:0">Within</span>
        <span class="serif" style="font-weight:600;font-size:14px;flex:1">The Fire Decade</span>${ico('ico-chev-r','chev')}</div>
      <div class="cardstock" style="${pv('fire')}display:flex;gap:12px;align-items:center;padding:13px 15px">
        <span class="emmark" style="border-color:var(--fireDeep);color:var(--fireDeep)">${mark('fire')}</span>
        <div style="flex:1"><span class="eyebrow fire">Your Catalyst</span>
          <p class="body" style="margin-top:3px">Fire lifts your Metal — seek fire energy today.</p></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;align-items:start">
        <div class="cardstock" style="${pv('water')}padding:14px 15px"><span class="eyebrow bronze">Do This</span>
          <div class="glist" style="margin-top:10px">
            <div class="gitem"><span class="bx"></span>Ship waiting work</div>
            <div class="gitem"><span class="bx"></span>Say the rehearsed line</div>
            <div class="gitem"><span class="bx"></span>Let craft lead</div></div></div>
        <div class="cardstock" style="padding:14px 15px"><span class="eyebrow bronze">Avoid</span>
          <div class="glist" style="margin-top:10px">
            <div class="gitem"><span class="wt">!</span>Over-polishing</div>
            <div class="gitem"><span class="wt">!</span>Withholding</div>
            <div class="gitem"><span class="wt">!</span>Critique over making</div></div></div>
      </div>
      <div class="cardstock" style="padding:14px 15px"><span class="eyebrow bronze">Best Hours</span>
        <div style="display:flex;justify-content:space-between;margin-top:10px;text-align:center">
          <div><div class="serif" style="font-weight:600;font-size:15px">5–7a</div><div class="body sm">Plan</div></div>
          <div><div class="serif" style="font-weight:600;font-size:15px">9–11p</div><div class="body sm">Peak flow</div></div>
          <div><div class="serif" style="font-weight:600;font-size:15px">11–1a</div><div class="body sm">Rest</div></div></div></div>
    </div>
    ${tabbar('today')}
  </div>`
);

/* ---------- 4 · MONTH PAGE ---------- */
const s4 = col(
  {v:'Hub → destination', n:'Month page', d:'Month hero, four-week arc, key dates, lean-into / avoid.'},
  statusbar() + `<div class="scr">
    ${pagebg('wood')}
    <div class="pad tight">
      ${backRow('Readings · Month')}
      ${sceneHero({el:'wood',art:'wood-jia',h:158,eyebrow:'May 2026 · Wood Month',title:'A month to consolidate',sub:'癸巳 · feeds your Metal',tSize:27,hzText:'木',hzSize:54})}
      <div class="cardstock" style="${pv('wood')}padding:14px 15px"><span class="eyebrow wood">The Month’s Arc · 4 weeks</span>
        <div class="bars" style="margin-top:11px;${pv('wood')}">
          <div class="b" style="height:45%"></div><div class="b on" style="height:82%"></div>
          <div class="b" style="height:60%"></div><div class="b" style="height:35%"></div></div>
        <div class="barlab"><span>W1 build</span><span>W2 peak</span><span>W3 refine</span><span>W4 rest</span></div></div>
      <div class="cardstock" style="padding:8px 15px 10px"><span class="eyebrow bronze" style="display:block;margin:6px 0 2px">Key Dates</span>
        <div class="kv"><span class="k">May 12</span><span class="vv now">Favorable — launch &amp; commit</span></div>
        <div class="kv"><span class="k">May 23</span><span class="vv">Caution — defer decisions</span></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;align-items:start">
        <div class="cardstock" style="${pv('wood')}padding:14px 15px"><span class="eyebrow bronze">Lean Into</span>
          <div class="glist" style="margin-top:10px">
            <div class="gitem"><span class="bx"></span>Finishing, not starting</div>
            <div class="gitem"><span class="bx"></span>Consolidating gains</div></div></div>
        <div class="cardstock" style="padding:14px 15px"><span class="eyebrow bronze">Avoid</span>
          <div class="glist" style="margin-top:10px">
            <div class="gitem"><span class="wt">!</span>New commitments</div>
            <div class="gitem"><span class="wt">!</span>Scattering focus</div></div></div>
      </div>
    </div>
    ${tabbar('today')}
  </div>`
);

/* ---------- 5 · YEAR PAGE ---------- */
const ebars=[['fire',80],['earth',55],['metal',40],['water',25],['wood',60]];
const s5 = col(
  {v:'Hub → destination', n:'Year page', d:'Year hero, four quarters, element balance, the year’s counsel.'},
  statusbar() + `<div class="scr">
    ${pagebg('fire')}
    <div class="pad tight">
      ${backRow('Readings · Year')}
      ${sceneHero({el:'fire',art:'fire-bing',h:158,eyebrow:'2026 · 丙午 Fire Horse',title:'A year to be seen',sub:'Fire amplifies your Metal',tSize:27,hzText:'火',hzSize:54})}
      <div class="cardstock" style="${pv('fire')}padding:14px 15px"><span class="eyebrow fire">Four Quarters</span>
        <div class="bars" style="margin-top:11px;${pv('fire')}">
          <div class="b on" style="height:70%"></div><div class="b" style="height:50%"></div>
          <div class="b on" style="height:88%"></div><div class="b" style="height:40%"></div></div>
        <div class="barlab"><span>Q1 ignite</span><span>Q2 steady</span><span>Q3 harvest</span><span>Q4 close</span></div></div>
      <div class="cardstock" style="padding:14px 15px"><span class="eyebrow bronze">Element Balance · this year</span>
        <div class="ebal" style="margin-top:11px">
          ${ebars.map(([el,h])=>`<div class="e"><div class="bar"><i style="height:${h}%;background:${EL[el].pig}"></i></div><span class="lab">${EL[el].name}</span></div>`).join('')}
        </div></div>
      <div class="cardstock" style="${pv('fire')}padding:14px 15px"><span class="eyebrow fire">The Year’s Counsel</span>
        <p class="body serif" style="margin-top:8px;font-size:14px;line-height:1.55">Visibility favors you — let work be seen. Guard against burning bright too early.</p></div>
    </div>
    ${tabbar('today')}
  </div>`
);

/* ---------- 6 · DECADE PAGE ---------- */
const s6 = col(
  {v:'Hub → destination', n:'Decade page · life chapter', d:'Chapter hero, ten-year arc, what it governs, three phases.'},
  statusbar() + `<div class="scr">
    ${pagebg('fire')}
    <div class="pad tight">
      ${backRow('Readings · Life Chapter')}
      ${sceneHero({el:'fire',art:'fire-ding',h:168,eyebrow:'Life Chapter · 2023–2032',title:'The Fire Decade',sub:'A ten-year season beneath every day.',tSize:29,hzText:'丁丑',hzSize:30})}
      <div class="cardstock" style="${pv('fire')}padding:14px 15px"><span class="eyebrow bronze">The Ten-Year Arc</span>
        <div class="arc" style="${pv('fire')}margin-top:12px"><span class="dot"></span><div class="ln"></div><span class="now"></span><div class="ln dim"></div><span class="dot"></span></div>
        <div class="row" style="justify-content:space-between;margin-top:7px">
          <span class="eyebrow">2023 · 28</span><span class="eyebrow pig" style="--pigDeep:var(--fireDeep)">Now · 31</span><span class="eyebrow">2032 · 37</span></div></div>
      <div class="cardstock" style="padding:14px 15px"><span class="eyebrow bronze">What This Chapter Governs</span>
        <p class="body serif" style="margin-top:8px;font-size:14px;line-height:1.55">Fire over Metal: a decade that asks you to be forged and made visible. Reputation, output and exposure compound now.</p></div>
      <div class="cardstock" style="padding:8px 15px 10px"><span class="eyebrow bronze" style="display:block;margin:6px 0 2px">Three Phases</span>
        <div class="kv"><span class="k">23–26</span><span class="vv">Early — heat rising</span></div>
        <div class="kv"><span class="k">27–29</span><span class="vv now">Now — the forge</span></div>
        <div class="kv"><span class="k">30–32</span><span class="vv">Late — temper &amp; set</span></div></div>
    </div>
    ${tabbar('today')}
  </div>`
);

window.SCREENS_A = [s1,s2,s3,s4,s5,s6];
})();
