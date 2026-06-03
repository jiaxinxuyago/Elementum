/* ============ Elementum rendered screens · shared render helpers ============ */
window.EL = {
  wood:  {name:'Wood', hz:'木', deep:'#587a4d', pig:'#7a9e6e', bd:'rgba(122,158,110,.45)', soft:'rgba(122,158,110,.10)'},
  fire:  {name:'Fire', hz:'火', deep:'#9e5540', pig:'#c4745a', bd:'rgba(196,116,90,.45)', soft:'rgba(196,116,90,.10)'},
  earth: {name:'Earth',hz:'土', deep:'#927750', pig:'#b89a6a', bd:'rgba(184,154,106,.45)', soft:'rgba(184,154,106,.10)'},
  metal: {name:'Metal',hz:'金', deep:'#6a849a', pig:'#8ba3b8', bd:'rgba(139,163,184,.45)', soft:'rgba(139,163,184,.10)'},
  water: {name:'Water',hz:'水', deep:'#3e5f85', pig:'#5a7fa8', bd:'rgba(90,127,168,.45)', soft:'rgba(90,127,168,.10)'},
};
// pigment custom-props applied to a card/hero so --pig etc. cascade
window.pv = function(el){const e=EL[el];return `--pig:${e.pig};--pigDeep:${e.deep};--pigBd:${e.bd};--pigSoft:${e.soft};`;};
window.mark = function(el){return `<span class="seal-mark" style="--pigDeep:${EL[el].deep}"><svg><use href="#el-${el}"/></svg></span>`;};
window.ico  = function(id,cls){return `<span class="ico ${cls||''}"><svg><use href="#${id}"/></svg></span>`;};
window.art  = function(src,el){return `<div class="art" style="${pv(el)}background-image:url('art/${src}.png')"></div>`;};

window.statusbar = function(){
  return `<div class="status"><span>9:41</span><span class="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>`;
};

const TABS=[['today','Today'],['guidance','Guidance'],['reading','Reading'],['compat','Friends'],['profile','Me']];
window.tabbar = function(active){
  return `<nav class="tabbar">${TABS.map(([id])=>
    `<div class="tab${active===id?' active':''}"><span class="ico"><svg><use href="#tab-${id}"/></svg></span><span class="seal-dot"></span></div>`
  ).join('')}</nav>`;
};

// column wrapper: caption + phone
window.col = function(meta, phoneInner){
  return `<div class="col">
    <div class="col-h"><div class="v">${meta.v}</div><div class="n">${meta.n}</div><div class="d">${meta.d}</div></div>
    <div class="phone">${phoneInner}</div>
  </div>`;
};

// page background wash
window.pagebg = function(el, opt){
  opt=opt||{};
  const img = opt.img ? `<div class="img" style="background-image:url('art/${opt.img}.png');opacity:${opt.imgOpacity||0.09}"></div>` : '';
  const tint = `<div class="tint" style="background:${opt.tint||`radial-gradient(140% 80% at 50% -10%, ${EL[el].soft}, transparent 60%)`}"></div>`;
  return `<div class="pagebg">${img}${tint}</div>`;
};

// scene-hero: full-bleed art with scrim + light type
window.sceneHero = function(o){
  const e=EL[o.el];
  return `<div class="hero" style="${pv(o.el)}height:${o.h||200}px;${o.style||''}">
    ${art(o.art,o.el)}
    <div class="scrim"></div><div class="hair"></div>
    ${o.back?`<div class="back">${ico('ico-back')}</div>`:''}
    ${o.hz!==false?`<div class="bighz" style="font-size:${o.hzSize||64}px">${o.hzText||e.hz}</div>`:''}
    <div class="hcontent">
      <div class="reye">${o.markEl!==false?mark(o.el):''} ${o.eyebrow}</div>
      <div class="htitle" style="font-size:${o.tSize||28}px">${o.title}</div>
      ${o.sub?`<div class="hsub">${o.sub}</div>`:''}
    </div>
  </div>`;
};
