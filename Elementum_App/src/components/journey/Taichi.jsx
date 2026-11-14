// The taichi symbol (owner 2026-11-13, approved 2026-11-14): one SVG, two states.
const YIN = { 乙: 1, 丁: 1, 己: 1, 辛: 1, 癸: 1 };

// The taichi symbol (owner 2026-11-13): wherever a page says Yin or Yang it
// sits beside the word with the reader's own side marked: the light half for a
// Yang stem, the dark half for a Yin stem. The other half stays as a faint wash.
export function Taichi({ stem, size = 16, className = '' }) {
  const yin = !!YIN[stem];
  return (
    <svg className={`taichi ${yin ? 'yin' : 'yang'} ${className}`} width={size} height={size} viewBox="0 0 40 40" role="img" aria-label={yin ? 'Yin, the dark half' : 'Yang, the light half'}>
      <circle cx="20" cy="20" r="18" fill="#faf6ee" fillOpacity={yin ? 0.35 : 1} />
      <path d="M20 2a18 18 0 0 1 0 36a9 9 0 0 1 0-18a9 9 0 0 0 0-18z" fill="#2b2722" fillOpacity={yin ? 1 : 0.22} />
      <circle cx="20" cy="11" r="2.6" fill="#2b2722" fillOpacity={yin ? 0.22 : 1} />
      <circle cx="20" cy="29" r="2.6" fill="#faf6ee" fillOpacity={yin ? 1 : 0.5} />
      <circle cx="20" cy="20" r="18" fill="none" stroke="#2b2722" strokeWidth="1.6" strokeOpacity=".85" />
      {yin
        ? <path d="M20 2a18 18 0 0 1 0 36" fill="none" stroke="#8a6a3f" strokeWidth="2.6" strokeLinecap="round" />
        : <path d="M20 38a18 18 0 0 1 0-36" fill="none" stroke="#8a6a3f" strokeWidth="2.6" strokeLinecap="round" />}
    </svg>
  );
}

// Running text that says Yin or Yang: the symbol sits before the word (owner 2026-11-13).
export function WithTaichi({ text, stem, size = 14 }) {
  const parts = String(text || '').split(/\b(Yin|Yang|YIN|YANG)\b/);
  if (parts.length < 2) return text || null;
  return <>{parts.map((x, i) => (i % 2 ? <span key={i} className="tai-word"><Taichi stem={stem} size={size} />{x}</span> : x))}</>;
}
