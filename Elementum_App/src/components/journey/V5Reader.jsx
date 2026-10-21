// ===================================================================
// ELEMENTUM · V5 card reader + Continue reading (DES_15 R2, R3, R7)
// Light on purpose: the Almanac pages import it without the journey views.
// ===================================================================
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { readMap, markRead, getLast, setLast, V5_SECTIONS, rj, wj, MK } from './v5State.js';
import './v5.css';

export const minutesOf = (chars) => Math.max(1, Math.round(chars / 5.6 / 265));

export function useReadMap() {
  const [r, setR] = useState(readMap);
  useEffect(() => { const f = () => setR(readMap()); window.addEventListener('v5-read', f); return () => window.removeEventListener('v5-read', f); }, []);
  return r;
}

// ── the card reader ────────────────────────────────────────────────
export function LeafReader({ id, title, units, pinned = '', labels = '.dp-stepey, .al-l', minChars = 1400, next = null, route = null, track = true, Use, children }) {
  const bodyRef = useRef(null);
  const [n, setN] = useState(0);
  const [chars, setChars] = useState(0);
  const [mode, setModeS] = useState(() => (rj(MK, {})[id] || 'cards'));
  const [idx, setIdx] = useState(() => { const l = track ? getLast() : null; return l && l.id === id ? Math.max(0, l.idx || 0) : 0; });
  const setMode = (v) => { setModeS(v); const m = rj(MK, {}); m[id] = v; wj(MK, m); };
  const unitEls = useCallback(() => (bodyRef.current ? [...bodyRef.current.querySelectorAll(units)] : []), [units]);
  const on = n > 1 && chars >= minChars;
  const cards = on && mode === 'cards';
  const cur = Math.min(idx, Math.max(0, n - 1));

  // hide everything but the active unit (and its ancestors, pinned rows and
  // the label directly above it); nested units inside the active one hide too
  const measure = useCallback(() => {
    const root = bodyRef.current; if (!root) return;
    const k = unitEls().length; setN((v) => (v === k ? v : k));
    const c = root.textContent.length; setChars((v) => (Math.abs(c - v) > 40 ? c : v));
  }, [unitEls]);
  const apply = useCallback(() => {
    const root = bodyRef.current; if (!root) return;
    root.querySelectorAll('[data-lf-off]').forEach((e) => e.removeAttribute('data-lf-off'));
    const us = unitEls();
    if (!cards || !us.length) return;
    const active = us[Math.min(cur, us.length - 1)];
    let p = active;
    while (p && p !== root) {
      const par = p.parentElement; if (!par) break;
      for (const s of par.children) {
        if (s === p || (pinned && s.matches(pinned))) continue;
        if (labels && s.matches(labels) && s.nextElementSibling === p) continue;
        s.setAttribute('data-lf-off', '');
      }
      p = par;
    }
    us.forEach((u) => { if (u !== active && active.contains(u)) u.setAttribute('data-lf-off', ''); });
  }, [unitEls, cards, cur, pinned, labels]);

  useLayoutEffect(() => { apply(); });
  useEffect(() => {
    const root = bodyRef.current; if (!root) return undefined;
    const raf = requestAnimationFrame(() => measure());
    const mo = new MutationObserver(() => { measure(); apply(); });
    mo.observe(root, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(raf); mo.disconnect(); };
  }, [apply, measure]);

  const sw = () => bodyRef.current?.closest('.scrollwrap') || document.scrollingElement;
  const go = (d) => {
    const to = Math.max(0, Math.min(n - 1, cur + d));
    if (to === cur) return;
    setIdx(to);
    if (track) { setLast({ id, idx: to, n, title, route }); if (to === n - 1) markRead(id); }
    const s = sw(); if (s) s.scrollTop = 0;
  };
  const onTap = (e) => {
    if (!cards) return;
    if (e.target.closest('button, a, input, select, textarea, summary, label, [role="button"], .lf-bar, .lf-foot')) return;
    const r = bodyRef.current.getBoundingClientRect();
    go((e.clientX - r.left) < r.width / 3 ? -1 : 1);
  };
  // one-page mode: read when the end is reached
  useEffect(() => {
    if (!on || cards) return undefined;
    const s = sw(); if (!s) return undefined;
    const f = () => { if (track && s.scrollTop + s.clientHeight >= s.scrollHeight - 80 && bodyRef.current?.closest('.jscreen')?.classList.contains('active') !== false) markRead(id); };
    s.addEventListener('scroll', f, { passive: true });
    return () => s.removeEventListener('scroll', f);
  });

  const min = minutesOf(chars);
  return (
    <div className={`lf${cards ? ' lf-cards' : ''}`} data-leaf={id}>
      {on ? (
        <div className="lf-bar">
          {cards ? <div className="lf-prog" aria-hidden="true">{Array.from({ length: n }, (_, i) => <i key={i} className={i <= cur ? 'on' : ''} />)}</div> : null}
          <div className="lf-meta">
            <span>{cards ? `${cur + 1} of ${n} · ${min} min` : `${min} min`}</span>
            <button type="button" className="lf-mode" onClick={() => { setMode(cards ? 'page' : 'cards'); const s = sw(); if (s) s.scrollTop = 0; }}>{cards ? 'Read it all as one page' : 'Read as cards'}</button>
          </div>
        </div>
      ) : null}
      <div className="lf-body" ref={bodyRef} onClick={onTap}>{children}</div>
      {cards ? (
        <div className="lf-foot">
          <button type="button" className="lf-nav" disabled={cur === 0} onClick={() => go(-1)} aria-label="Previous card">{Use ? <Use id="ico-chev-l" /> : '‹'}</button>
          <span className="lf-hint">{cur === n - 1 ? 'The end of this section' : 'Tap to go on'}</span>
          <button type="button" className="lf-nav dark" disabled={cur === n - 1} onClick={() => go(1)} aria-label="Next card">{Use ? <Use id="ico-arrow-r" /> : '›'}</button>
        </div>
      ) : null}
      {next && (!cards || cur === n - 1 || !on) ? (
        <button type="button" className="lf-next" onClick={next.onGo}>
          {next.art ? <span className="lf-nart" style={{ backgroundImage: `url('${next.art}')` }} /> : null}
          <span className="lf-ntx"><span className="lf-ney">Next · {next.label}</span><b>{next.title}</b></span>
          <span className="readcirc sm">{Use ? <Use id="ico-arrow-r" /> : '›'}</span>
        </button>
      ) : null}
    </div>
  );
}


export const LIB = '/concept-arts/library';
export const SECTION_ART = { domains: `${LIB}/g_hero_3.png`, chapters: `${LIB}/g_hero_8.png`, stars: `${LIB}/t_water_6_w.png`, blueprint: `${LIB}/g_hero_10.png` };

// ── Continue reading (R3 / R7) ─────────────────────────────────────
export function ContinueCard({ onOpen, Use }) {
  const [l] = useState(getLast);
  const read = readMap();
  if (!l || !l.id || read[l.id] || !V5_SECTIONS[l.id]) return null;
  const total = Object.keys(V5_SECTIONS).length; const done = Object.keys(V5_SECTIONS).filter((k) => read[k]).length;
  return (
    <button type="button" className="al-card v5-cont" onClick={() => onOpen?.(V5_SECTIONS[l.id].route)}>
      <span className="v5-book" style={{ backgroundImage: `url('${SECTION_ART[l.id] || SECTION_ART.chapters}')` }} />
      <span className="v5-ctx">
        <span className="v5-cey">Continue reading</span>
        <b>{l.title || V5_SECTIONS[l.id].title}</b>
        <small>Card {Math.min((l.idx || 0) + 1, l.n || 1)} of {l.n || 1} · {done} of {total} sections read</small>
        <span className="v5-cprog"><i style={{ width: `${(((l.idx || 0) + 1) / (l.n || 1)) * 100}%` }} /></span>
      </span>
      <Use id="ico-arrow-r" />
    </button>
  );
}
