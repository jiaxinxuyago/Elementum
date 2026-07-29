/* ============ Screens 7–12 ============ */
(function(){

/* ---------- 7 · READING DETAIL (scrolling) ---------- */
function rcard(eyebrow, html){return `<div class="cardstock" style="${pv('metal')}padding:15px 16px;margin-top:13px"><span class="eyebrow metal" style="display:block;margin-bottom:9px">${eyebrow}</span>${html}</div>`;}
const s7 = col(
  {v:'Reading tab · drill-down', n:'Reading detail', plate:'quiet-paper', d:'The Blade reading. Full-bleed metal hero (the sword painting) crowned by the painterly 庚 enso seal; sticky chapter header + progress; the one scrolling reading.'},
  statusbar() + `<div class="scr">
    ${plate('quiet-paper','metal')}
    <div class="scrollwrap" data-init-top="0">
      <div class="hero" style="${pv('metal')}height:300px;border-radius:0;border:none;box-shadow:none">
        <div class="art" style="background-image:url('art/metal-geng.png');background-position:center 32%"></div>
        <div class="scrim"></div><div class="hair"></div>
        <div class="back">${ico('ico-back')}</div>
        <div class="bighz" style="font-size:66px">金</div>
        <span class="stemseal ring seal-medal" style="left:18px;bottom:96px;width:78px;height:78px"><img src="art/stems/geng.png" alt=""/></span>
        <div class="hcontent" style="bottom:20px">
          <div class="reye">${mark('metal')} Day Master · 日主</div>
          <div class="htitle" style="font-size:34px">The Blade</div>
          <div class="hsub">庚 · Gēng · Yang Metal</div></div>
      </div>
      <div class="stick"><span class="hz" style="font-size:15px;color:var(--metalDeep)">庚</span>
        <span class="serif" style="font-weight:600;font-size:13px;flex-shrink:0">The Blade</span>
        <div class="bar"><i></i></div><span class="ct">2 / 6</span></div>
      <div style="padding:0 16px 20px">
        <div style="text-align:center;margin:20px 0 14px">
          <div class="verse" style="font-size:21px">Precision before intention</div>
          <div class="body sm italic" style="margin-top:5px">An edge is never given — it is forged.</div></div>
        ${rcard('The Element', `<p class="body serif" style="font-size:14px"><b style="color:var(--ink)">The Blade is the ancient cutting force of Metal.</b> Sharp without announcement, cold without cruelty — it carries in a person the stillness of something that has already decided.</p>`)}
        <div class="chips" style="margin-top:13px"><span class="chip">Evaluative</span><span class="chip">Uncompromising</span><span class="chip">Precision-first</span><span class="chip">Self-sufficient</span><span class="chip">Justice-oriented</span></div>
        ${rcard('How you experience the world', `<p class="body serif" style="font-size:14px">You evaluate before you engage. The assessment starts the moment you walk into a room — not as a decision you make but as a process already begun.</p>`)}
        ${rcard('What you’re genuinely good at', `<p class="body serif" style="font-size:14px">Cutting to what’s actually true, quickly, without sentimentality — not because you don’t care, but because accuracy is a form of care for you.</p>`)}
        ${rcard('Gifts', `
          <div class="row" style="align-items:flex-start;gap:11px"><span style="width:7px;height:7px;border-radius:999px;background:var(--metalDeep);margin-top:6px;flex-shrink:0"></span>
            <div><div class="serif" style="font-weight:600;font-size:15px">The Structural Read</div><p class="body sm" style="margin-top:3px">The read finishes before you’ve decided to begin it.</p></div></div>
          <div class="row" style="align-items:flex-start;gap:11px;margin-top:11px"><span style="width:7px;height:7px;border-radius:999px;background:var(--metalDeep);margin-top:6px;flex-shrink:0"></span>
            <div><div class="serif" style="font-weight:600;font-size:15px">The Core Beneath the Edge</div><p class="body sm" style="margin-top:3px">What reads as edge covers a depth of care few earn access to.</p></div></div>`)}
        ${rcard('Shadows', `
          <div class="row" style="align-items:flex-start;gap:11px"><span style="width:7px;height:7px;border-radius:999px;background:var(--inkMist);margin-top:6px;flex-shrink:0"></span>
            <div><div class="serif" style="font-weight:600;font-size:15px">Finished Too Early</div><p class="body sm" style="margin-top:3px">You call things complete before they’ve fully arrived.</p></div></div>`)}
        <div style="margin:18px 0"><span class="text-tertiary">◦ View your birth chart →</span></div>
        <div class="pager"><div class="pg"><span class="pl">‹ Previous</span><span class="serif" style="font-weight:600;font-size:13px">—</span></div>
          <div class="ct">1 / 6</div>
          <div class="pg" style="text-align:right"><span class="pl">Next ›</span><span class="serif" style="font-weight:600;font-size:13px">Elemental…</span></div></div>
      </div>
    </div>
  </div>`
);

/* ---------- 8 · ENERGY MAP (scrolling reveal → chart) ---------- */
const wnodes=[
  {el:'wood', n:3, l:'50%', t:'20px', s:54},
  {el:'fire', n:1, l:'214px', t:'98px', s:34},
  {el:'earth',n:2, l:'182px', t:'210px', s:42},
  {el:'metal',n:4, l:'68px', t:'210px', s:64, hi:true},
  {el:'water',n:1, l:'36px', t:'98px', s:34},
];
const s8 = col(
  {v:'Profile tab · Energy Map', n:'Energy Map', plate:'center-glow', d:'Ceremonial reveal on the center-glow plate: the painterly 庚 enso seal is the figure on the stage. Scroll reveals the composition wheel + Enter.'},
  statusbar() + `<div class="scr">
    ${plate('center-glow','metal')}
    <div class="scrollwrap" data-init-top="0">
      <div class="scback">${ico('ico-back')}</div>
      <div class="reveal">
        <div class="eyebrow" style="letter-spacing:4px">You are…</div>
        <span class="stemseal ring" style="width:176px;height:176px;margin:14px 0 4px"><img src="art/stems/geng.png" alt=""/></span>
        <div class="title" style="font-size:50px;font-weight:500;margin-top:6px">The Blade</div>
        <div style="width:120px;height:1px;background:var(--inkMist);opacity:.6;margin:14px 0 12px"></div>
        <div class="serif italic" style="font-size:16px;color:var(--inkSoft)">Precision before intention</div>
        <div class="chips3">
          <div class="chip3"><span class="gl"><span class="mark" style="color:var(--metalDeep);width:27px;height:27px"><svg viewBox="0 0 24 24"><use href="#el-metal"/></svg></span></span><span class="eyebrow">Metal</span></div>
          <div class="chip3"><span class="gl"><span class="hz" style="font-size:27px;color:var(--metalDeep)">庚</span></span><span class="eyebrow">Geng</span></div>
          <div class="chip3"><span class="gl"><span style="width:22px;height:22px;border-radius:999px;border:1.5px solid var(--inkLight);background:linear-gradient(90deg,var(--inkLight) 50%,transparent 50%)"></span></span><span class="eyebrow">Yang</span></div>
        </div>
        <p class="body serif" style="font-size:13.5px;max-width:300px;text-align:center">Sharp without announcement, cold without cruelty — it carries the stillness of something that has already decided.</p>
        <div class="scrollcue"><span class="eyebrow">Continue</span><span class="ch">⌄</span></div>
      </div>
      <div style="padding:0 16px 26px">
        <div class="cardstock blueprint" style="${pv('metal')}padding:15px 16px">
          <span class="emmark">${mark('metal')}</span>
          <div style="flex:1"><div class="serif" style="font-size:21px;font-weight:600">Metal <span class="pill" style="color:var(--metalDeep);border-color:var(--metal);margin-left:4px">Concentrated</span></div>
            <div class="body sm" style="margin-top:3px">Half your chart — little counterbalance.</div></div>
          <div class="serif" style="font-size:23px;font-weight:600">50%</div></div>
        <div class="cardstock" style="margin-top:13px;padding:14px 16px 6px">
          <div class="row" style="justify-content:space-between"><span class="eyebrow bronze">Composition</span><span class="eyebrow">8 marks</span></div>
          <div class="wheel"><div class="ring"></div>
            ${wnodes.map(w=>`<div class="wnode" style="left:${w.l};top:${w.t};width:${w.s}px;height:${w.s}px;border-color:${EL[w.el].deep};${w.hi?'border-width:2px;background:'+EL[w.el].soft:''}"><b>${w.n}</b><span>${EL[w.el].name}</span></div>`).join('')}
            <div class="wcenter"><div class="eyebrow" style="font-size:8px">total</div><div class="serif" style="font-size:18px;font-weight:600">8</div></div></div></div>
        <div class="enter" style="margin-top:16px">Enter your Energy Map <span style="font-size:14px">→</span></div>
      </div>
    </div>
  </div>`
);

/* ---------- 9 · GUIDANCE HUB ---------- */
function gtile(o){
  return `<div class="gtile" style="${pv(o.el)}">
    <div class="row" style="justify-content:space-between;align-items:flex-start">
      <span class="gi">${o.locked?ico('ico-lock'):mark(o.el)}</span>
      ${o.tier?`<span class="pill" style="${o.tier==='Advisor'?'color:var(--advisor);border-color:var(--advisor)':''}">${o.tier==='Advisor'?'✦':'◆'} ${o.tier}</span>`:''}</div>
    <div><div class="serif" style="font-size:16px;font-weight:600;line-height:1.05">${o.title}</div>
      <p class="body sm" style="margin-top:4px">${o.desc}</p></div>
  </div>`;
}
const s9 = col(
  {v:'Guidance tab', n:'Guidance hub', plate:'quiet-paper', d:'Daily Draw as a Wood stem-tile; four deeper features in a 2×2 grid; an Advisor premium banner from the generic library.'},
  statusbar() + `<div class="scr">
    ${plate('quiet-paper','wood')}
    <div class="pad">
      <div style="padding:8px 0 0"><span class="eyebrow">Guidance · 引路</span>
        <div class="title" style="font-size:30px;margin-top:2px">Guidance</div></div>
      <div class="stemtile water" style="min-height:150px;padding:16px">
        <div class="grad"></div>
        <span class="inkmark" style="width:52px;height:52px">${dm('ren')}</span>
        <div class="lab"><div class="ti" style="font-size:21px">Elemental Draw</div>
          <p class="body" style="margin-top:6px;font-size:12.5px;color:rgba(26,24,21,.78);max-width:230px">A daily question drawn from the day’s elemental current — today’s deck follows your Today tab.</p>
          <button class="btn btn-outline-pill" style="margin-top:11px;background:rgba(248,244,236,.86)">Draw today’s card <span class="arr">→</span></button></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:2px">
        ${gtile({el:'earth',locked:true,tier:'Seeker',title:'Energy Manual',desc:'Five life domains.'})}
        ${gtile({el:'water',locked:true,tier:'Seeker',title:'Self-Report',desc:'Tune your readings.'})}
        ${gtile({el:'metal',title:'BaZi Codex',desc:'The concepts, explained.'})}
        ${gtile({el:'fire',locked:true,tier:'Advisor',title:'AI Consultant',desc:'Ask anything.'})}
      </div>
      <div class="pbanner" style="margin-top:2px">
        <div class="pimg" style="background-image:url('art/g_banner_2.png')"></div>
        <div class="pscrim"></div>
        <div class="pc"><span class="pey">Elementum · Advisor</span><h3>Meet your advisor</h3><span class="pcta">Begin →</span></div>
      </div>
    </div>
    ${tabbar('guidance')}
  </div>`
);

/* ---------- 10 · COMPATIBILITY RESULT ---------- */
function cpcard(o){
  return `<div class="cpcard" style="${pv(o.el)}"><div class="cpart" style="background-image:url('art/${o.art}.png')"></div><div class="cpscrim"></div>
    <span class="eyebrow" style="position:relative;z-index:1">${o.who}</span>
    <span class="cpseal"><img src="art/stems/${o.stem}.png" alt=""/></span>
    <div style="position:relative;z-index:1"><div class="hz" style="font-size:24px;color:var(--ink)">${o.hz}</div>
      <div class="serif" style="font-size:15px;font-weight:600;margin-top:2px">${o.name}</div>
      <div class="eyebrow" style="margin-top:3px">${o.pol}</div></div></div>`;
}
const s10 = col(
  {v:'Compat tab · result', n:'Compatibility result', plate:'center-glow', d:'Versus split on the center-glow plate — two painterly stem seals (庚 / 辛) over metal portrait art, the score medallion bridging them at the seam.'},
  statusbar() + `<div class="scr">
    ${plate('center-glow','metal')}
    <div class="pad tight" style="padding-top:6px">
      <div class="row" style="color:var(--inkLight);padding-top:2px">${ico('ico-back','chev')}<span class="serif" style="font-size:15px">Friends</span></div>
      <div class="cpair">
        ${cpcard({el:'metal',who:'You',hz:'庚',name:'The Blade',pol:'Yang Metal',stem:'geng',art:'t_metal_1_p'})}
        ${cpcard({el:'metal',who:'Mara',hz:'辛',name:'The Jewel',pol:'Yin Metal',stem:'xin',art:'t_metal_3_p'})}
        <div class="cmedal"><div class="hole"><div class="serif" style="font-size:25px;font-weight:600;color:var(--ink)">70<span style="font-size:11px;color:var(--inkLight)">%</span></div></div></div>
      </div>
      <div style="text-align:center;margin:38px 0 0">
        <div class="eyebrow" style="letter-spacing:2.5px">Metal meets Metal</div>
        <div class="title" style="font-size:29px;margin-top:3px">“The Mirror”</div>
        <div class="serif italic" style="font-size:16px;color:var(--inkLight);margin-top:6px">Kindred but Exacting</div></div>
      <div class="cardstock" style="${pv('metal')}padding:16px">
        <p class="body serif" style="font-size:13.5px;line-height:1.55">Two blades in one room. You recognise each other instantly — the same precision, the same refusal to pretend. The risk is that neither yields first; the gift is a bond where nothing needs to be explained.</p></div>
      <div class="cshare">
        <div class="row" style="gap:14px;color:#cfcabf">${mark('metal')}<span style="font-size:11px">×</span>${mark('metal')}</div>
        <div class="sti">We’re 70% compatible —<br>Metal meets Metal</div>
        <div class="brand">ELEMENTUM</div></div>
      <div style="text-align:center;padding-top:4px"><span class="text-tertiary">Compare someone else →</span></div>
    </div>
    ${tabbar('compat')}
  </div>`
);

/* ---------- 11 · PROFILE ---------- */
function kvCell(l,v){return `<div><span class="eyebrow">${l}</span><div class="serif" style="font-size:15px;margin-top:3px">${v}</div></div>`;}
const s11 = col(
  {v:'Profile tab', n:'Profile (Me)', plate:'corner-stamp', d:'Birth-data grid, notifications + account, sign out. The quietest screen — the corner-stamp plate gives just a touch of register.'},
  statusbar() + `<div class="scr">
    ${plate('corner-stamp','metal')}
    <div class="pad">
      <div style="padding:8px 0 0"><span class="eyebrow">Profile · 个人</span>
        <div class="title" style="font-size:30px;margin-top:2px">Me</div></div>
      <div class="cardstock" style="padding:18px 16px">
        <span class="eyebrow bronze" style="display:block;margin-bottom:12px">Birth Data</span>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px 12px">
          ${kvCell('Birth date','1995 / 04 / 29')}${kvCell('Birth time','18:00 (Local)')}
          ${kvCell('True solar','18:14')}${kvCell('Location','Beijing')}
          <div style="grid-column:1 / -1">${kvCell('Energy current','Forward / Yang')}</div>
        </div>
        <div class="quiet" style="margin-top:14px;padding:11px 13px"><p class="body sm">Location not confirmed — standard solar time. <span style="color:var(--ink)">Update →</span></p></div>
        <div class="row" style="gap:18px;margin-top:13px"><span class="text-tertiary">View birth chart →</span><span class="text-tertiary">Edit →</span></div>
      </div>
      <div class="cardstock" style="padding:0">
        <div class="row" style="gap:12px;padding:16px;border-bottom:1px solid var(--borderLight)">
          <div style="flex:1"><div class="serif" style="font-size:15px;font-weight:600">Daily reading</div><span class="eyebrow" style="margin-top:3px">Delivered at 8:00 AM</span></div>
          <div class="toggle"></div></div>
        <div class="row" style="gap:12px;padding:16px">
          <div style="flex:1"><div class="serif" style="font-size:15px;font-weight:600">Current plan</div></div>
          <span class="pill">◆ Seeker · $9.99/mo</span>${ico('ico-chev-r','chev')}</div></div>
      <button class="btn btn-outline-pill" style="width:100%">Sign Out</button>
      <div style="text-align:center;margin-top:4px"><span class="eyebrow">Dev · Reset &amp; Start Over</span></div>
    </div>
    ${tabbar('profile')}
  </div>`
);

/* ---------- 12 · RAW CHART + RESONANCE ---------- */
function pillar(o){
  return `<div class="pillar${o.self?' self':''}"><div class="pcol">${o.col}</div>
    <div class="tg"${o.dim?' style="font-style:italic;color:var(--inkMist)"':''}>${o.tg}</div>
    <div class="st" style="color:${o.stemColor};${o.dim?'opacity:.4':''}">${o.stem}</div>
    <div class="el" style="color:${o.stemColor}">${o.sel}</div>
    <div class="dv"></div>
    <div class="st" style="color:${o.branchColor};${o.dim?'opacity:.4':''}">${o.branch}</div>
    <div class="el" style="color:${o.branchColor}">${o.bel}</div></div>`;
}
const s12 = col(
  {v:'Profile → drill-down', n:'Raw Chart + Resonance', plate:'side-margins', d:'Four pillars (Day = Self, Hour unconfirmed) framed by the side-margins plate, legend, and the Resonance entry. No tab bar.'},
  statusbar() + `<div class="scr">
    ${plate('side-margins','metal')}
    <div class="pad tight">
      <div class="row" style="color:var(--inkLight);padding-top:2px">${ico('ico-back','chev')}<span class="serif" style="font-size:15px">Profile</span></div>
      <div><span class="eyebrow">Birth Chart · 八字排盘</span><div class="title" style="font-size:30px;margin-top:3px">Your four pillars</div></div>
      <div class="pillars" style="margin-top:4px">
        ${pillar({col:'Year',tg:'Direct Wealth',stem:'乙',sel:'Wood · Yin',stemColor:'var(--woodDeep)',branch:'亥',bel:'Water',branchColor:'var(--waterDeep)'})}
        ${pillar({col:'Month',tg:'Parallel Self',stem:'庚',sel:'Metal · Yang',stemColor:'var(--metalDeep)',branch:'辰',bel:'Earth',branchColor:'var(--earthDeep)'})}
        ${pillar({col:'Day',self:true,tg:'Self',stem:'庚',sel:'Metal · Yang',stemColor:'var(--metalDeep)',branch:'寅',bel:'Wood',branchColor:'var(--woodDeep)'})}
        ${pillar({col:'Hour',dim:true,tg:'~ unconfirmed',stem:'乙',sel:'Wood · Yin',stemColor:'var(--woodDeep)',branch:'酉',bel:'Metal',branchColor:'var(--metalDeep)'})}
      </div>
      <div class="row" style="justify-content:space-between;padding:2px 2px 0"><span class="body sm"><b class="hz" style="color:var(--ink)">天干</b> — Heavenly Stems</span></div>
      <div class="row" style="justify-content:space-between;padding:0 2px"><span class="body sm"><b class="hz" style="color:var(--ink)">地支</b> — Earthly Branches</span></div>
      <div class="cardstock" style="${pv('water')}padding:16px;margin-top:8px">
        <span class="eyebrow water">Chart Resonance · 时辰感应</span>
        <div class="serif" style="font-size:21px;font-weight:600;margin:6px 0 8px">Discover your birth hour</div>
        <p class="body serif" style="font-size:13px;line-height:1.55">Your hour is unconfirmed. Recover it by resonance — a few honest answers narrow twelve 时辰 to one. About two minutes.</p>
        <button class="btn pill-cta" style="width:100%;margin-top:14px">Begin <span class="arr">→</span></button></div>
      <div style="text-align:center;padding-top:8px"><span class="eyebrow">Tap any pillar to read what it governs</span></div>
    </div>
  </div>`
);

window.SCREENS_B = [band('07–12','Reading detail · Energy Map · Guidance · Friends · Profile · Chart','ceremonial enso seals · premium banner · pillar chart'), s7,s8,s9,s10,s11,s12];
})();
