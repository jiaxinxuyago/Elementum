// ===================================================================
// ELEMENTUM · ShareIdentityCard  (feature #1 — the shareable card face)
// ===================================================================
// A self-contained 540×960 (→1080×1920 @2x) card that reuses the P1
// identity-plate aesthetic (seal · archetype · pinyin · manifesto ·
// inscription · foundry mark) but paints its OWN silk ground so the
// rasteriser never depends on the layered reveal backgrounds. Consumes
// the same `identity` object the reveal builds (buildIdentity), so the
// copy can never drift from the on-screen plate.
// Ref-forwarded: the overlay hands this node to cardExport.
// ===================================================================

import { forwardRef } from 'react';
import { APP_HOST } from '../../infra/index.js';
import './share.css';

// Elements that map to a design-token pigment (--{el} / --{el}Deep). Anything
// else leaves the card in its neutral silk/ink fallback (no data-el attribute).
const TINT_ELEMENTS = new Set(['metal', 'wood', 'fire', 'earth', 'water']);

const ShareIdentityCard = forwardRef(function ShareIdentityCard({ identity, dayMaster }, ref) {
  const el = (identity.element || '').toLowerCase();
  const tinted = TINT_ELEMENTS.has(el);
  // Resolve the pigment from tokens — no hard-coded hex. Consumed by share.css.
  const tintVars = tinted ? { '--el': `var(--${el})`, '--elDeep': `var(--${el}Deep)` } : undefined;

  return (
    <div className="share-card" ref={ref} data-el={tinted ? el : undefined} style={tintVars}>
      <div className="sc-bg" />
      <div className="sc-vignette" />
      <div className="sc-inner">
        <div className="sc-eyebrow">ELEMENTUM · YOUR ELEMENT</div>
        <div className="sc-seal-wrap">
          <img className="sc-seal" src={`/concept-arts/stems/${dayMaster}.png`} alt="" />
        </div>
        <div className="sc-arch">{identity.archetype}</div>
        <div className="sc-pinyin">{identity.pinyin}</div>
        <div className="sc-manifesto">{identity.manifesto}</div>
        <div className="sc-inscription">{identity.inscription}</div>
        <div className="sc-spacer" />
        <div className="sc-foundry">
          <div className="sc-cast">{identity.cast}</div>
          <div className="sc-mark">— ELEMENTUM —</div>
          <div className="sc-url">{APP_HOST}</div>
        </div>
      </div>
    </div>
  );
});

export default ShareIdentityCard;
