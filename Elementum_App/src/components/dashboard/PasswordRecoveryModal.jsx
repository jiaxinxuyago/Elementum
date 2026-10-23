// ===================================================================
// ELEMENTUM · PasswordRecoveryModal — set a new password
// ===================================================================
// Opens when the reader returns from a password-reset email: Supabase signs
// them in with a recovery session and fires PASSWORD_RECOVERY (authContext).
// Same bottom-sheet look as AuthModal; one field, then done.
// ===================================================================
import { useState } from 'react';
import { useAuth } from '../../store/authContext.jsx';
import { ink, inkSoft, bronzeDark, cream } from '../../styles/tokens';

const inputStyle = {
  width: '100%', padding: '12px 14px', marginBottom: 10, borderRadius: 10,
  border: '1px solid #D8CFBE', background: '#FFFFFF',
  fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, color: '#2B2722',
  boxSizing: 'border-box',
};

export default function PasswordRecoveryModal() {
  const { recovery, endRecovery, updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [done, setDone] = useState(false);

  if (!recovery) return null;

  const submit = async (e) => {
    e.preventDefault();
    setErr(null); setBusy(true);
    const { error } = await updatePassword(password);
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setDone(true);
  };
  const close = () => { setDone(false); setPassword(''); endRecovery(); };

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 220, display: 'flex', alignItems: 'flex-end' }}>
      <div role="dialog" aria-modal="true" aria-label="Set a new password"
        style={{ position: 'relative', width: '100%', background: cream, borderRadius: '24px 24px 0 0', padding: '28px 22px 34px', boxShadow: '0 -8px 40px rgba(0,0,0,0.12)' }}>
        <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: bronzeDark, fontWeight: 500, marginBottom: 6, marginTop: 4 }}>
          Reset password
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 400, lineHeight: 1.15, color: ink, margin: '0 0 6px' }}>
          {done ? 'Password updated' : 'Choose a new password'}
        </h2>
        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: 13.5, color: inkSoft, lineHeight: 1.5, margin: '0 0 18px' }}>
          {done ? 'You’re signed in. Use the new password next time.' : 'At least 6 characters.'}
        </p>
        {done ? (
          <button type="button" onClick={close}
            style={{ width: '100%', padding: '13px 0', borderRadius: 999, border: 'none', background: bronzeDark, color: '#F8F6F0', fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' }}>
            Continue
          </button>
        ) : (
          <form onSubmit={submit}>
            <input type="password" required minLength={6} placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" style={inputStyle} />
            {err && <div style={{ color: '#B0452F', fontFamily: "'EB Garamond', Georgia, serif", fontSize: 12.5, margin: '2px 2px 10px' }}>{err}</div>}
            <button type="submit" disabled={busy}
              style={{ width: '100%', padding: '13px 0', borderRadius: 999, border: 'none', background: bronzeDark, color: '#F8F6F0', fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', cursor: busy ? 'default' : 'pointer', opacity: busy ? 0.7 : 1 }}>
              {busy ? 'One moment…' : 'Save new password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
