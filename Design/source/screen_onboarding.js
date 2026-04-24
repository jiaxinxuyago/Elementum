// ===================================================================
// ONBOARDING · Steps 1–7
// All 7 steps share <OnboardingShell>. Each step only owns its input zone.
// Copy and behavior per DOC5 §7.
// ===================================================================

// -----------------------------------------------------------
// Scroll picker wheel — used for Year / Month / Day / Hour
// Visual: highlighted center row, ghosted neighbors above/below.
// -----------------------------------------------------------
function ScrollPicker({ values, selectedIndex, onChange, formatter = v => v, elementSign }) {
  const ROW_H = 48;
  const VISIBLE = 5; // 2 above + center + 2 below
  const center = Math.floor(VISIBLE / 2);
  const containerH = ROW_H * VISIBLE;

  // Build a windowed view around selectedIndex, padding with nulls if near edges
  const rows = [];
  for (let i = -center; i <= center; i++) {
    const idx = selectedIndex + i;
    rows.push({
      val: idx >= 0 && idx < values.length ? values[idx] : null,
      offset: i,
      realIdx: idx,
    });
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 260,
      margin: '0 auto',
    }}>
      {/* element echo to left */}
      {elementSign && (
        <div style={{
          position: 'absolute', left: -4, top: '50%', transform: 'translateY(-50%)',
          opacity: 0.35,
        }}>
          <ElementSign element={elementSign.element} size={18} color={elementSign.color || INK_LIGHT}/>
        </div>
      )}

      {/* picker body */}
      <div style={{
        height: containerH,
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}>
        {/* top/bottom fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: ROW_H * 1.4,
          background: `linear-gradient(180deg, ${SILK} 0%, rgba(241,233,214,0) 100%)`,
          pointerEvents: 'none', zIndex: 4,
        }}/>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: ROW_H * 1.4,
          background: `linear-gradient(0deg, ${SILK} 0%, rgba(241,233,214,0) 100%)`,
          pointerEvents: 'none', zIndex: 4,
        }}/>

        {/* center highlight — hairline rules above and below center row */}
        <div style={{
          position: 'absolute', top: ROW_H * center, left: 0, right: 0, height: ROW_H,
          background: 'rgba(139,115,85,0.06)',
          borderTop: `1px solid rgba(139,115,85,0.28)`,
          borderBottom: `1px solid rgba(139,115,85,0.28)`,
          zIndex: 1,
        }}/>

        {/* rows */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {rows.map((r, i) => {
            const isCenter = r.offset === 0;
            const distance = Math.abs(r.offset);
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.22;
            const fontSize = isCenter ? 32 : 20;
            const color = isCenter ? INK : INK_LIGHT;
            return (
              <div key={i} style={{
                height: ROW_H,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: isCenter ? 500 : 400,
                fontSize,
                letterSpacing: 0.5,
                color,
                opacity,
                transition: 'all 250ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}>
                {r.val !== null ? formatter(r.val) : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* caret arrows */}
      <button
        onClick={() => onChange(Math.max(0, selectedIndex - 1))}
        style={{
          position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
          background: 'transparent', border: 0, cursor: 'pointer',
          color: INK_LIGHT, fontSize: 16, padding: 4,
        }}>▲</button>
      <button
        onClick={() => onChange(Math.min(values.length - 1, selectedIndex + 1))}
        style={{
          position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
          background: 'transparent', border: 0, cursor: 'pointer',
          color: INK_LIGHT, fontSize: 16, padding: 4,
        }}>▼</button>
    </div>
  );
}

// -----------------------------------------------------------
// STEP 1 — YEAR
// -----------------------------------------------------------
function Step1_Year({ onBack, onContinue }) {
  const years = useMemo(() => {
    const arr = [];
    const now = new Date().getFullYear();
    for (let y = now; y >= 1900; y--) arr.push(y);
    return arr;
  }, []);
  // Reference user: Yang Metal stem · we'll pick 1991 as default (a 庚 year near spec era)
  const [sel, setSel] = useState(years.indexOf(1991));

  return (
    <OnboardingShell
      step={1}
      question="When were you born?"
      subtitle={<>“The year you arrived reveals what you carry<br/>from those who came before.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={years}
          selectedIndex={sel}
          onChange={setSel}
          elementSign={{ element: 'earth', color: PIG_EARTH }}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 2 — MONTH
// -----------------------------------------------------------
function Step2_Month({ onBack, onContinue }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const [sel, setSel] = useState(7); // August

  return (
    <OnboardingShell
      step={2}
      question="Which month?"
      subtitle={<>“Your month is the season your soul<br/>chose to enter this world.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={months}
          selectedIndex={sel}
          onChange={setSel}
          elementSign={{ element: 'wood', color: PIG_WOOD }}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 3 — DAY
// -----------------------------------------------------------
function Step3_Day({ onBack, onContinue }) {
  const days = useMemo(() => {
    const arr = [];
    for (let d = 1; d <= 31; d++) arr.push(d);
    return arr;
  }, []);
  const [sel, setSel] = useState(14); // 15th

  return (
    <OnboardingShell
      step={3}
      question="What day?"
      subtitle={<>“Your day is your core — the essence<br/>of who you are at the deepest level.”</>}
      canContinue={sel >= 0}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '12px 0' }}>
        <ScrollPicker
          values={days}
          selectedIndex={sel}
          onChange={setSel}
          formatter={v => v < 10 ? `0${v}` : `${v}`}
          elementSign={{ element: 'metal', color: PIG_METAL }}
        />
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 4 — BIRTH TIME (Level 1 default — 24-hour scroll picker)
// Links below indicate Level 2 (approximate window) and Level 3 (unknown)
// -----------------------------------------------------------
function Step4_Hour({ onBack, onContinue }) {
  const hours = useMemo(() => {
    const arr = [];
    for (let h = 0; h <= 23; h++) arr.push(h);
    return arr;
  }, []);
  const [sel, setSel] = useState(9);
  const fmt = v => `${v < 10 ? '0' : ''}${v}:00`;

  return (
    <OnboardingShell
      step={4}
      question="What time?"
      subtitle={<>“Your hour reveals how you express<br/>your nature outward.”</>}
      canContinue={true}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '4px 0 0' }}>
        <ScrollPicker
          values={hours}
          selectedIndex={sel}
          onChange={setSel}
          formatter={fmt}
          elementSign={{ element: 'water', color: PIG_WATER }}
        />
        <div style={{
          marginTop: 10, textAlign: 'center',
          fontFamily: "'EB Garamond', serif", fontSize: 13,
          fontStyle: 'italic', color: INK_LIGHT, lineHeight: 1.55,
          padding: '0 24px',
        }}>
          24-hour format, local time.<br/>
          Even an approximate time improves accuracy.
        </div>

        {/* Level 2 + Level 3 links */}
        <div style={{
          marginTop: 22, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 10,
        }}>
          <a href="#" onClick={e => e.preventDefault()} style={{
            fontFamily: "'EB Garamond', serif", fontSize: 14,
            color: BRONZE_MID, textDecoration: 'underline',
            textUnderlineOffset: 3, textDecorationThickness: '1px',
            cursor: 'pointer',
          }}>I only know the general time →</a>
          <a href="#" onClick={e => e.preventDefault()} style={{
            fontFamily: "'EB Garamond', serif", fontSize: 13,
            color: INK_LIGHT, textDecoration: 'underline',
            textUnderlineOffset: 3, textDecorationThickness: '1px',
            cursor: 'pointer',
          }}>I have no idea →</a>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 5 — LOCATION
// Text input + explanatory callout card
// -----------------------------------------------------------
function Step5_Location({ onBack, onContinue }) {
  const [val, setVal] = useState('New York, USA');

  return (
    <OnboardingShell
      step={5}
      question="Where were you born?"
      subtitle={<>“We’ll calculate your True Solar Time<br/>(真太阳时) to place you precisely.”</>}
      canContinue={val.trim().length > 0}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '0 4px' }}>
        <div style={{ position: 'relative' }}>
          <input
            value={val}
            onChange={e => setVal(e.target.value)}
            placeholder="City, Country (e.g., New York, USA)"
            style={{
              width: '100%',
              padding: '16px 18px',
              background: 'rgba(248,241,225,0.85)',
              border: `1px solid ${PAPER_HAIR}`,
              borderRadius: 12,
              fontFamily: "'EB Garamond', serif",
              fontSize: 17,
              color: INK,
              outline: 'none',
              boxSizing: 'border-box',
            }}/>
          {/* subtle location mark */}
          <div style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            color: INK_LIGHT, fontSize: 18, pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 20 20" width="18" height="18">
              <path d="M10 3 C 6.5 3 4 5.5 4 9 C 4 13 10 18 10 18 C 10 18 16 13 16 9 C 16 5.5 13.5 3 10 3 Z"
                stroke={INK_LIGHT} strokeWidth="1.2" fill="none"/>
              <circle cx="10" cy="9" r="2" stroke={INK_LIGHT} strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
        </div>

        <div style={{
          marginTop: 18,
          padding: '16px 18px',
          background: 'rgba(139,115,85,0.06)',
          border: `1px solid rgba(139,115,85,0.25)`,
          borderRadius: 12,
        }}>
          <div style={{
            fontFamily: "'EB Garamond', serif", fontSize: 11,
            letterSpacing: 2.5, textTransform: 'uppercase',
            color: BRONZE_MID, fontWeight: 600, marginBottom: 6,
          }}>Why location matters</div>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontSize: 13.5,
            color: INK_SOFT, lineHeight: 1.6, margin: 0,
          }}>
            Traditional BaZi uses Beijing solar time. We convert your local time to
            True Solar Time (真太阳时) for accuracy. If location is unavailable,
            Beijing is used as default.
          </p>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 6 — SEX / ENERGY CURRENT
// Showing the "Prefer not to say" selected + expanded state
// -----------------------------------------------------------
function Step6_Polarity({ onBack, onContinue }) {
  // Locked into the expanded state per the brief
  const [selected] = useState('prefer-not');
  const [current, setCurrent] = useState('yang');

  const btn = (id, label, fontSize = 17) => {
    const isActive = selected === id;
    return (
      <div style={{
        width: '100%',
        padding: '14px 18px',
        borderRadius: 10,
        border: isActive ? `1px solid ${BRONZE_MID}` : `1px solid #d9d3c8`,
        background: isActive ? 'rgba(139,115,85,0.12)' : 'rgba(232,227,216,0.7)',
        fontFamily: "'EB Garamond', serif",
        fontSize,
        fontWeight: isActive ? 500 : 400,
        color: id === 'prefer-not' ? INK_SOFT : INK,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 250ms ease',
      }}>{label}</div>
    );
  };

  const curBtn = (id, title, subtitle) => {
    const isActive = current === id;
    return (
      <button onClick={() => setCurrent(id)} style={{
        flex: 1,
        padding: '12px 14px',
        borderRadius: 8,
        border: isActive ? `1px solid ${BRONZE_MID}` : `1px solid #d9d3c8`,
        background: isActive ? 'rgba(139,115,85,0.15)' : 'rgba(232,227,216,0.7)',
        fontFamily: "'EB Garamond', serif",
        color: INK,
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 250ms ease',
      }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 11, color: INK_LIGHT, marginTop: 2, letterSpacing: 0.5 }}>{subtitle}</div>
      </button>
    );
  };

  return (
    <OnboardingShell
      step={6}
      question="What is your sex?"
      subtitle={<>“This determines the direction of<br/>your Decade Luck Cycles (大运).”</>}
      canContinue={current !== null}
      onBack={onBack}
      onContinue={onContinue}
    >
      <div style={{ padding: '0 2px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {btn('male', 'Male')}
        {btn('female', 'Female')}
        {btn('prefer-not', 'Prefer not to say / other', 15)}

        {/* Expanded panel */}
        <div style={{
          marginTop: 4,
          padding: 16,
          borderRadius: 10,
          border: `1px dashed ${BRONZE_MID}`,
          background: 'rgba(139,115,85,0.06)',
        }}>
          <div style={{
            fontFamily: "'EB Garamond', serif", fontSize: 13.5,
            color: INK_SOFT, marginBottom: 12, lineHeight: 1.5,
            fontStyle: 'italic',
          }}>Which energy current moves through you?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {curBtn('yang', 'Forward / Yang', '↑ Outward')}
            {curBtn('yin', 'Inward / Yin', '↓ Receptive')}
          </div>
          <div style={{
            marginTop: 10, textAlign: 'center',
            fontFamily: "'EB Garamond', serif", fontSize: 13,
            color: INK_LIGHT, cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}>I’m not sure →</div>
        </div>
      </div>
    </OnboardingShell>
  );
}

// -----------------------------------------------------------
// STEP 7 — NOTIFICATIONS
// -----------------------------------------------------------
function Step7_Notify({ onBack, onContinue }) {
  const [on, setOn] = useState(true);

  return (
    <OnboardingShell
      step={7}
      question="Stay in tune with your energy?"
      subtitle={<>“We’ll send you a morning reading each day.<br/>Your energy doesn’t wait for you to remember to check.”</>}
      canContinue={true}
      onBack={onBack}
      onContinue={onContinue}
      continueLabel="Reveal My Nature"
      finalStep={true}
    >
      <div style={{ padding: '0 2px' }}>
        {/* Bell icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <svg viewBox="0 0 32 32" width="36" height="36">
            <path d="M16 4 C 11 4 8 8 8 14 L 8 18 L 5 22 L 27 22 L 24 18 L 24 14 C 24 8 21 4 16 4 Z"
              stroke={BRONZE_MID} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
            <path d="M13 24 Q 16 28 19 24"
              stroke={BRONZE_MID} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Body copy (supplementary — subtitle already carries the promise) */}
        <p style={{
          fontFamily: "'EB Garamond', serif", fontSize: 14,
          color: INK_SOFT, textAlign: 'center', margin: '0 0 22px',
          lineHeight: 1.6, padding: '0 10px',
        }}>
          Personalized to your archetype and the day’s energy.
        </p>

        {/* Toggle card */}
        <div style={{
          padding: '16px 18px',
          background: 'rgba(248,241,225,0.92)',
          border: `1px solid ${PAPER_HAIR}`,
          borderRadius: 14,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 14,
          }}>
            <div>
              <div style={{
                fontFamily: "'EB Garamond', serif", fontSize: 15,
                color: INK, fontWeight: 500,
              }}>Morning reading</div>
              <div style={{
                fontFamily: "'EB Garamond', serif", fontSize: 13,
                color: INK_LIGHT, marginTop: 2,
              }}>Delivered at 8:00 AM</div>
            </div>
            {/* iOS toggle */}
            <div onClick={() => setOn(!on)} style={{
              width: 48, height: 28, borderRadius: 999,
              background: on ? BRONZE_DARK : '#cfc7b3',
              position: 'relative', cursor: 'pointer',
              transition: 'background 200ms ease',
            }}>
              <div style={{
                position: 'absolute', top: 2,
                left: on ? 22 : 2,
                width: 24, height: 24, borderRadius: 999,
                background: SILK,
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                transition: 'left 200ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}/>
            </div>
          </div>
          <div style={{
            marginTop: 12, paddingTop: 12,
            borderTop: `1px solid ${SILK_FOLD}`,
            fontFamily: "'EB Garamond', serif", fontSize: 13,
            color: INK_LIGHT, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 10 }}>▼</span> Change time
          </div>
        </div>

        <div style={{
          marginTop: 16, textAlign: 'center',
          fontFamily: "'EB Garamond', serif", fontSize: 13,
          color: INK_LIGHT, fontStyle: 'italic',
        }}>
          <span style={{
            textDecoration: 'underline', textUnderlineOffset: 3,
            cursor: 'pointer', fontStyle: 'normal',
          }}>Skip for now</span>
        </div>
      </div>
    </OnboardingShell>
  );
}

Object.assign(window, {
  Step1_Year, Step2_Month, Step3_Day, Step4_Hour,
  Step5_Location, Step6_Polarity, Step7_Notify,
});
