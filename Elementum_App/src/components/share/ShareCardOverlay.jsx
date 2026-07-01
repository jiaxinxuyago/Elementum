// ===================================================================
// ELEMENTUM · ShareCardOverlay  (feature #1 — preview + export sheet)
// ===================================================================
// Modal overlay that previews the ShareIdentityCard scaled to fit the
// frame and exposes Share / Save / Copy-link. It is a plain overlay
// (not a FLOW route) so it can open over any screen without touching the
// hash router. The full-size (unscaled) card lives inside the scale
// wrapper and is what cardExport rasterises, so the export is always the
// true 1080×1920 regardless of the on-screen preview scale.
// ===================================================================

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import ShareIdentityCard from './ShareIdentityCard.jsx';
import { downloadCardPng, shareCard, copyText } from '../../lib/cardExport.js';
import { APP_URL } from '../../infra/index.js';

// Logical card dimensions (must match .share-card in share.css).
const CARD_W = 540;
const CARD_H = 960;

export default function ShareCardOverlay({ identity, dayMaster, onClose }) {
  const cardRef = useRef(null);
  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  // Fit the card into the available preview area (no hard-coded scale).
  useLayoutEffect(() => {
    const el = previewRef.current;
    if (!el) return undefined;
    const measure = () => {
      const s = Math.min(el.clientWidth / CARD_W, el.clientHeight / CARD_H);
      setScale(s > 0 ? s : 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const flash = useCallback((msg) => {
    setStatus(msg);
    setTimeout(() => setStatus((s) => (s === msg ? null : s)), 1800);
  }, []);

  const filename = `elementum-${dayMaster}.png`;
  const shareText = `${identity.archetype} — my element on Elementum`;

  const onDownload = async () => {
    setBusy(true);
    const ok = await downloadCardPng(cardRef.current, filename);
    setBusy(false);
    flash(ok ? 'Image saved' : 'Could not save');
  };
  const onShare = async () => {
    setBusy(true);
    const r = await shareCard(cardRef.current, { filename, title: 'Elementum', text: shareText });
    setBusy(false);
    if (r === 'downloaded') flash('Image saved');
    else if (r === 'error') flash('Could not share');
  };
  const onCopy = async () => {
    const ok = await copyText(APP_URL);
    flash(ok ? 'Link copied' : 'Could not copy');
  };

  return (
    <div className="sc-overlay" role="dialog" aria-modal="true">
      <div className="sc-overlay-scrim" onClick={onClose} />
      <div className="sc-overlay-body">
        <button type="button" className="sc-close" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </button>

        <div className="sc-preview" ref={previewRef}>
          <div className="sc-scale" style={{ width: CARD_W * scale, height: CARD_H * scale }}>
            <div className="sc-scale-inner" style={{ transform: `scale(${scale})` }}>
              <ShareIdentityCard ref={cardRef} identity={identity} dayMaster={dayMaster} />
            </div>
          </div>
        </div>

        <div className="sc-actions">
          <button type="button" className="sc-btn primary" disabled={busy} onClick={onShare}>Share</button>
          <button type="button" className="sc-btn" disabled={busy} onClick={onDownload}>Save image</button>
          <button type="button" className="sc-btn" onClick={onCopy}>Copy link</button>
        </div>
        <div className="sc-status" aria-live="polite">{status || ' '}</div>
      </div>
    </div>
  );
}
