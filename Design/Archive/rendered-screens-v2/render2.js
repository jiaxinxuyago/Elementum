/* ============ Elementum Rendered Screens v2 · shared render helpers ============ */
window.EL = {
  wood:  {name:'Wood', hz:'木', deep:'#587a4d', pig:'#7a9e6e', bd:'rgba(122,158,110,.45)', soft:'rgba(122,158,110,.10)'},
  fire:  {name:'Fire', hz:'火', deep:'#9e5540', pig:'#c4745a', bd:'rgba(196,116,90,.45)', soft:'rgba(196,116,90,.10)'},
  earth: {name:'Earth',hz:'土', deep:'#927750', pig:'#b89a6a', bd:'rgba(184,154,106,.45)', soft:'rgba(184,154,106,.10)'},
  metal: {name:'Metal',hz:'金', deep:'#6a849a', pig:'#8ba3b8', bd:'rgba(139,163,184,.45)', soft:'rgba(139,163,184,.10)'},
  water: {name:'Water',hz:'水', deep:'#3e5f85', pig:'#5a7fa8', bd:'rgba(90,127,168,.45)', soft:'rgba(90,127,168,.10)'},
};
// stem → element + hanzi (day-master)
window.STEM = {
  jia:{el:'wood',hz:'甲'}, yi:{el:'wood',hz:'乙'},
  bing:{el:'fire',hz:'丙'}, ding:{el:'fire',hz:'丁'},
  wu:{el:'earth',hz:'戊'}, ji:{el:'earth',hz:'己'},
  geng:{el:'metal',hz:'庚'}, xin:{el:'metal',hz:'辛'},
  ren:{el:'water',hz:'壬'}, gui:{el:'water',hz:'癸'},
};
// pigment custom-props so --pig etc. cascade onto a card/hero
window.pv = function(el){const e=EL[el];return `--pig:${e.pig};--pigDeep:${e.deep};--pigBd:${e.bd};--pigSoft:${e.soft};`;};
// geometric element MARK (wayfinding)
window.mark = function(el){return `<span class="mark" style="color:${EL[el].deep}"><svg viewBox="0 0 24 24"><use href="#el-${el}"/></svg></span>`;};
// refined day-master GLYPH (dm-*) — tints from host
window.dm = function(stem){return `<span class="mark"><svg viewBox="0 0 24 24"><use href="#dm-${stem}"/></svg></span>`;};
// painterly ceremonial enso SEAL (raster, transparent) — the "one subject"
window.seal = function(stem,cls){return `<span class="stemseal ${cls||''}"><img src="art/stems/${stem}.png" alt=""/></span>`;};
window.ico  = function(id,cls){return `<span class="ico ${cls||''}"><svg viewBox="0 0 24 24"><use href="#${id}"/></svg></span>`;};
window.timg = function(src){return `<div class="timg" style="background-image:url('art/${src}.png')"></div>`;};

window.statusbar = function(){
  return `<div class="status"><span>9:41</span><span class="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>`;
};

const TABS=[['today','Today'],['guidance','Guidance'],['reading','Reading'],['compat','Friends'],['profile','Me']];
window.tabbar = function(active){
  return `<nav class="tabbar">${TABS.map(([id])=>
    `<div class="tab${active===id?' active':''}"><span class="ico"><svg viewBox="0 0 24 24"><use href="#tab-${id}"/></svg></span><span class="seal-dot"></span></div>`
  ).join('')}</nav>`;
};

// v7 plate substrate — composed silk (z0). optional faint element tint over it.
window.plate = function(name, tintEl){
  const tint = tintEl ? `<div class="eltint" style="background:radial-gradient(150% 80% at 50% -8%, ${EL[tintEl].soft}, transparent 55%)"></div>` : '';
  return `<div class="plate plate--${name}"></div>${tint}`;
};

// column wrapper: caption (with plate label) + phone
window.col = function(meta, phoneInner){
  const pl = meta.plate ? `<span class="pl">.plate--${meta.plate}</span>` : '';
  return `<div class="col">
    <div class="col-h"><div class="v">${meta.v}</div><div class="n">${meta.n}${pl}</div><div class="d">${meta.d}</div></div>
    <div class="phone">${phoneInner}</div>
  </div>`;
};

// band header inside the deck
window.band = function(n, title, desc){
  return `<div class="band"><div class="band-h"><span class="bn">${n}</span><h2>${title}</h2><span class="bd">${desc}</span></div></div>`;
};

// painterly full-bleed hero: themed landscape art + scrim + light type (+ optional enso seal medallion)
window.painterlyHero = function(o){
  const e = EL[o.el];
  const medal = o.seal
    ? `<span class="stemseal ${o.sealRing?'ring':''} seal-medal" style="${o.sealStyle||'left:16px;bottom:14px;width:64px;height:64px'}"><img src="art/stems/${o.seal}.png" alt=""/></span>`
    : '';
  return `<div class="hero" style="${pv(o.el)}height:${o.h||200}px;${o.style||''}">
    <div class="art" style="background-image:url('art/${o.art}.png')${o.artPos?';background-position:'+o.artPos:''}"></div>
    <div class="scrim"></div><div class="hair"></div>
    ${o.back?`<div class="back">${ico('ico-back')}</div>`:''}
    ${o.hz!==false?`<div class="bighz" style="font-size:${o.hzSize||64}px">${o.hzText||e.hz}</div>`:''}
    ${medal}
    <div class="hcontent"${o.seal&&o.sealStyle&&o.sealStyle.indexOf('left')>-1?' style="left:92px"':''}>
      <div class="reye">${o.markEl!==false?mark(o.el):''} ${o.eyebrow}</div>
      <div class="htitle" style="font-size:${o.tSize||28}px">${o.title}</div>
      ${o.sub?`<div class="hsub">${o.sub}</div>`:''}
    </div>
  </div>`;
};
