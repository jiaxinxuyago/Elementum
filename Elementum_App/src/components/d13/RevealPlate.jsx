// ===================================================================
// ELEMENTUM · RevealPlate  (D13 P1 — The Naming)
// ===================================================================
// The first-run ceremonial identity plate: stem seal → archetype name →
// pinyin line → manifesto → one inscription → foundry mark, on the paired
// reveal-painting ground. No tab bar — the ceremony owns the screen.
// Share-card-ready. Props-driven so it renders for any day master.
// Faithful port of the wireframe P1 markup. No CJK in Part 1.
// ===================================================================

import React from 'react';

export default function RevealPlate({
  dayMaster,          // stem id → /concept-arts/stems/<id>.png
  archetype,          // "The Blade"
  pinyin,             // "GENG · YANG METAL"
  manifesto,          // "Precision before intention"
  inscription,        // one line, English
  cast,               // "CAST FROM 1995 · 4 · 29 · YOU HOUR 17-19"  (or HOUR UNSET)
}) {
  return (
    <div className="phone">
      <div className="notch" />
      <div className="screen">
        <div className="plate-blank" />
        <img className="bg-reveal-top" src="/backgrounds/bg-reveal-01-distant-peaks.png" alt="" />
        <img className="bg-reveal-bot" src="/backgrounds/bg-reveal-02-floating-island.png" alt="" />
        <div className="bg-reveal-fog" />
        <div className="status"><span>9:41</span><span className="dots">●●● &nbsp;⌃ &nbsp;▮</span></div>
        <div className="plate-col">
          <span className="eyebrow" style={{ textAlign: 'center', color: 'var(--inkSoft)' }}>YOUR ELEMENTUM IDENTITY</span>
          <div className="seal-stamp" style={{ marginTop: 40 }}>
            <img className="seal-img" src={`/concept-arts/stems/${dayMaster}.png`} alt={archetype} width="124" height="124" />
          </div>
          <div className="arch-name" style={{ fontSize: 36, marginTop: 14 }}>{archetype}</div>
          <div className="pinyin" style={{ marginTop: 6 }}>{pinyin}</div>
          <div className="manifesto" style={{ fontSize: 17, marginTop: 12 }}>{manifesto}</div>
          <div className="inscription"><div className="en">{inscription}</div></div>
          <div className="foundry" style={{ marginTop: 'auto' }}>
            <div className="cast">{cast}</div>
            <div className="mark-line">— ELEMENTUM —</div>
          </div>
          <div className="ring-peek" />
        </div>
      </div>
      <div className="home-bar" />
    </div>
  );
}
