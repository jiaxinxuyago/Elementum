/* ============ Screens 1–6 ============ */
(function(){

/* themed Inkstone tile — landscape art frame + paper footer */
function tile(o){
  return `<div class="tile" style="${pv(o.el)}${o.style||''}">
    <div class="frame" style="height:${o.frameH||120}px">
      ${timg(o.art)}<div class="fade"></div>
      <div class="tmk">${mark(o.el)}</div>
      <div class="twz" style="font-size:${o.hzSize||24}px">${EL[o.el].hz}</div>
    </div>
    <div class="foot">
      ${o.eyebrow?`<span class="eyebrow pig" style="color:${EL[o.el].deep}">${o.eyebrow}</span>`:''}
      <div class="ti" style="font-size:${o.tiSize||18}px">${o.title}</div>
      ${o.sub?`<div class="body sm italic">${o.sub}</div>`:''}
      ${o.extra||''}
    </div>
  </div>`;
}
function backRow(label){
  return `<div class="row" style="padding:6px 0 0;color:var(--inkLight)">${ico('ico-back','chev')}<span class="eyebrow">${label}</span></div>`;
}

/* ---------- 1 · READING CATALOGUE (bleed list) ---------- */
function rgbaHex(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;}
function elBadge(el,st){
  const e=EL[el];const cls=st==='primary'?'primary':(st==='secondary'?'sec':'');
  const dir=st==='up'?'<span class="dir">↑</span>':(st==='down'?'<span class="dir">↓</span>':'');
  const eb=st==='primary'?e.deep:'rgba(244,236,217,.94)';
  return `<span class="ebadge ${cls}" style="--efg:${e.deep};--ebd:${e.bd};--eb:${eb}"><span class="mark"><svg viewBox="0 0 24 24"><use href="#el-${el}"/></svg></span>${dir}</span>`;
}
function elSeals(list){if(!list)return '';return `<div class="echips">${list.map(([el,st])=>elBadge(el,st)).join('')}</div>`;}
function flag(el,nm,role){
  const e=EL[el];
  return `<span class="flag" style="background:${rgbaHex(e.pig,.08)};border-color:${rgbaHex(e.pig,.4)};color:${e.deep}"><span class="mark" style="color:${e.deep}"><svg viewBox="0 0 24 24"><use href="#el-${el}"/></svg></span><span class="fl">${nm}</span><span class="fr">${role}</span></span>`;
}
function identityCard(){
  const DIST=[['metal',3],['earth',2],['water',2],['fire',1]];
  const seg=DIST.map(([el,n])=>`<i style="flex:${n};background:${EL[el].pig}"></i>`).join('');
  const flags=[['metal','Metal','Primary'],['earth','Earth','2nd'],['water','Water','↑'],['fire','Fire','↓']].map(f=>flag(...f)).join('');
  return `<div class="idmini"><div class="dmrule"></div>
    <div class="in"><div class="top">
      <div class="seal">${seal('geng','ring')}</div>
      <div><div class="ey">Your Day Master · 庚 Yang Metal</div><h3>The Blade</h3><p class="mani">Precision before intention.</p></div></div>
      <div class="strip"><div class="mini-seg">${seg}</div></div>
      <div class="flags">${flags}</div></div></div>`;
}
const CAT=[
  {img:'cat-nature',ti:'Elemental Nature',d:'Your five-element composition.',els:[['metal','primary']]},
  {img:'cat-dominant',ti:'Dominant Energies',d:'Primary &amp; secondary forces.',els:[['metal','primary'],['earth','secondary']]},
  {img:'cat-forces',ti:'Forces in Motion',d:'What lifts you, what wears you.',els:[['water','up'],['fire','down']]},
  {img:'cat-chapters',ti:'Life Chapters',d:'Your ten-year journey.'},
  {img:'cat-daily',ti:'Daily Reading',d:'Today’s alignment.',lock:true},
  {img:'cat-pillars',ti:'Pillar Patterns',d:'The four pillars of your chart.',lock:true},
];
function brow(c){
  const right=c.lock
    ? `<span class="block">${ico('ico-lock')}</span>`
    : `<span class="bchev">${ico('ico-chev-r')}</span>`;
  const tier=c.lock?`<span class="ltier">◆ Seeker</span>`:'';
  return `<div class="brow ${c.lock?'locked':''}">
    <div class="bart"><img src="art/${c.img}.png" alt=""/><div class="fade"></div></div>
    <div class="bx"><div class="ti">${c.ti}${tier}</div><div class="d">${c.d}</div>${elSeals(c.els)}</div>${right}</div>`;
}
const s1 = col(
  {v:'Reading tab · center', n:'Reading Catalogue', plate:'rice-paper', d:'Bleed structure on the rice-paper plate. Day-master card now wears the painterly 庚 enso seal; ink-wash motifs dissolve in from the right; element seals on clean paper.'},
  statusbar() + `<div class="scr">
    ${plate('rice-paper','metal')}
    <div class="pghead"><span class="ht">Readings</span><span class="ha">Energy Map →</span></div>
    <div class="scrollwrap">
      <div class="pad tight" style="padding-top:14px">
        ${identityCard()}
        <span class="sec-eyebrow">Readings</span>
        <div class="bcol">${CAT.map(brow).join('')}</div>
      </div>
    </div>
    ${tabbar('reading')}
  </div>`
);

/* ---------- 2 · TODAY HUB (themed landscape tiles) ---------- */
const s2 = col(
  {v:'Today tab · landing', n:'Readings Hub', plate:'quiet-paper', d:'Nested time made visible on the quiet-paper plate — Day featured, Month + Year paired, Decade wide. Each tile carries its own element’s shuǐmò landscape, element-correct.'},
  statusbar() + `<div class="scr">
    ${plate('quiet-paper')}
    <div class="pad">
      <div style="padding:8px 0 0"><span class="eyebrow">Your Readings</span>
        <div class="title" style="font-size:25px;margin-top:2px">Across time</div></div>
      ${tile({el:'water',art:'t_water_5_w',frameH:142,eyebrow:'Today · Thu May 28 · Water Day',title:'A day to express',tiSize:24,
        extra:`<div class="row" style="justify-content:space-between;margin-top:3px"><span class="body sm italic">壬 · open today’s reading</span>${ico('ico-chev-r','chev')}</div>`})}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px">
        ${tile({el:'wood',art:'t_wood_1_w',frameH:96,eyebrow:'This Month',title:'Consolidate',tiSize:19,sub:'May · Wood Month'})}
        ${tile({el:'fire',art:'t_fire_1_w',frameH:96,eyebrow:'This Year',title:'Be seen',tiSize:19,sub:'2026 · 丙午'})}
      </div>
      ${tile({el:'fire',art:'t_fire_3_w',frameH:104,eyebrow:'Life Chapter · Yr 3 / 10',title:'The Fire Decade',tiSize:22,hzSize:26,sub:'2023–2032 · the season beneath it all'})}
    </div>
    ${tabbar('today')}
  </div>`
);

/* ---------- 3 · DAY PAGE ---------- */
const s3 = col(
  {v:'Hub → destination', n:'Day page', plate:'corner-quartet', d:'Painterly Water hero (themed tile carries the paint, breath-plate beneath); chapter context, catalyst, Do / Avoid, best hours.'},
  statusbar() + `<div class="scr">
    ${plate('corner-quartet','water')}
    <div class="pad tight">
      ${backRow('Readings · Day')}
      ${painterlyHero({el:'water',art:'t_water_5_w',h:158,eyebrow:'Thursday, May 28 · Water Day',title:'A day to express',sub:'壬 · Water Stem · Food God',tSize:27,hzText:'壬',hzSize:54})}
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
  {v:'Hub → destination', n:'Month page', plate:'corner-quartet', d:'Wood hero (misted forest tile), four-week arc, key dates, lean-into / avoid.'},
  statusbar() + `<div class="scr">
    ${plate('corner-quartet','wood')}
    <div class="pad tight">
      ${backRow('Readings · Month')}
      ${painterlyHero({el:'wood',art:'t_wood_1_w',h:158,eyebrow:'May 2026 · Wood Month',title:'A month to consolidate',sub:'癸巳 · feeds your Metal',tSize:27,hzText:'木',hzSize:54})}
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
  {v:'Hub → destination', n:'Year page', plate:'corner-quartet', d:'Fire hero (scholar under the red sun), four quarters, element balance, the year’s counsel.'},
  statusbar() + `<div class="scr">
    ${plate('corner-quartet','fire')}
    <div class="pad tight">
      ${backRow('Readings · Year')}
      ${painterlyHero({el:'fire',art:'t_fire_1_w',h:158,eyebrow:'2026 · 丙午 Fire Horse',title:'A year to be seen',sub:'Fire amplifies your Metal',tSize:27,hzText:'火',hzSize:54})}
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
  {v:'Hub → destination', n:'Decade page · life chapter', plate:'split-horizon', d:'Chapter hero (lantern town at dusk) on the split-horizon plate, ten-year arc, what it governs, three phases.'},
  statusbar() + `<div class="scr">
    ${plate('split-horizon','fire')}
    <div class="pad tight">
      ${backRow('Readings · Life Chapter')}
      ${painterlyHero({el:'fire',art:'t_fire_3_w',h:168,eyebrow:'Life Chapter · 2023–2032',title:'The Fire Decade',sub:'A ten-year season beneath every day.',tSize:29,hzText:'丁丑',hzSize:30})}
      <div class="cardstock" style="${pv('fire')}padding:14px 15px"><span class="eyebrow bronze">The Ten-Year Arc</span>
        <div class="arc" style="${pv('fire')}margin-top:12px"><span class="dot"></span><div class="ln"></div><span class="now"></span><div class="ln dim"></div><span class="dot"></span></div>
        <div class="row" style="justify-content:space-between;margin-top:7px">
          <span class="eyebrow">2023 · 28</span><span class="eyebrow pig" style="color:var(--fireDeep)">Now · 31</span><span class="eyebrow">2032 · 37</span></div></div>
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

window.SCREENS_A = [band('01–06','Catalogue · Today · Time destinations','bleed list · themed landscape tiles · painterly heroes'), s1,s2,s3,s4,s5,s6];
})();
