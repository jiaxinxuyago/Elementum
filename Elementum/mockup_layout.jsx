import { useState } from "react";

// ── Elementum palette ────────────────────────────────────────────────────────
const EL_C = { Metal:"#8e9ba8", Fire:"#b85c38", Wood:"#5a7a52", Water:"#2c4a6e", Earth:"#9a7b4f" };
const ff = "Georgia,'Times New Roman',serif";
const BG = "#faf7f2";
const BORDER = "#e8e0d5";

// ── Mock chart data ───────────────────────────────────────────────────────────
const chart = {
  dm: { el:"Metal", symbol:"庚", name:"Yang Metal", band:"concentrated", pct:82 },
  elements: [
    { el:"Metal", count:4, present:true,  isDM:true  },
    { el:"Fire",  count:3, present:true,  isDM:false },
    { el:"Earth", count:2, present:true,  isDM:false },
    { el:"Wood",  count:1, present:true,  isDM:false },
    { el:"Water", count:0, present:false, isDM:false },
  ],
  dominants: [
    { el:"Fire",  role:"Seven Killings" },
    { el:"Earth", role:"Direct Resource" },
  ],
  catalyst: [{ el:"Fire", role:"Seven Killings" }],
  resistance: [{ el:"Wood", role:"Direct Officer" }],
  missing: [{ el:"Water" }],
};

// ── Shared tiny components ────────────────────────────────────────────────────
const ElDot = ({ el, size=28 }) => (
  <div style={{
    width:size, height:size, borderRadius:size*0.28,
    background:`${EL_C[el]}18`, border:`1px solid ${EL_C[el]}40`,
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:size*0.42, color:EL_C[el], fontFamily:ff, fontWeight:600, flexShrink:0
  }}>
    {el[0]}
  </div>
);

const Btn = ({ label, color="#8e9ba8", small=false }) => (
  <div style={{
    display:"inline-flex", alignItems:"center", gap:5,
    padding: small ? "5px 10px" : "8px 14px",
    border:`1px solid ${color}45`, borderRadius:20,
    fontSize: small ? 10 : 11, letterSpacing:1.2,
    textTransform:"uppercase", color:color,
    fontFamily:ff, cursor:"pointer", background:`${color}06`,
  }}>
    {label} <span style={{fontSize:small?8:9}}>›</span>
  </div>
);

const SectionLabel = ({ text, color="#999" }) => (
  <div style={{fontSize:9, letterSpacing:2.5, textTransform:"uppercase",
    color:color, fontFamily:ff, marginBottom:10}}>{text}</div>
);

const Divider = () => (
  <div style={{height:"0.5px", background:BORDER, margin:"0"}}/>
);

// ── Energy Blueprint mini-bars ────────────────────────────────────────────────
const BlueprintBars = () => (
  <div>
    {chart.elements.map(({ el, count, present, isDM }) => {
      const c = EL_C[el];
      return (
        <div key={el} style={{display:"flex", alignItems:"center", gap:8, marginBottom:8}}>
          <ElDot el={el} size={22}/>
          <div style={{width:48, fontFamily:ff, fontSize:11,
            color: present ? c : `${c}55`, opacity: present?1:0.5,
            display:"flex", alignItems:"center", gap:3}}>
            {el}{isDM && <span style={{fontSize:8}}>✦</span>}
            {!present && <span style={{fontSize:8, color:"#c0392b", fontStyle:"italic"}}> absent</span>}
          </div>
          <div style={{flex:1, display:"flex", gap:2}}>
            {[...Array(8)].map((_,i)=>(
              <div key={i} style={{
                flex:1, height:7, borderRadius:1.5,
                background: !present
                  ? "transparent"
                  : i<count ? c : "#e4dfd6",
                opacity: !present?1 : i<count?(isDM?0.9:0.6):1,
                border: !present?`1px dashed ${c}45`:"none",
              }}/>
            ))}
          </div>
          <div style={{width:16, textAlign:"right", fontFamily:ff,
            fontSize:11, color: present?c:"#c0392b", fontWeight:isDM?600:400}}>
            {present ? count : "—"}
          </div>
        </div>
      );
    })}
  </div>
);

// ── Saturation bar ────────────────────────────────────────────────────────────
const SaturationBar = ({ pct, color }) => (
  <div>
    <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
      <span style={{fontFamily:ff, fontSize:11, color:`${color}80`, letterSpacing:0.5}}>Concentrated</span>
      <span style={{fontFamily:ff, fontSize:12, color:color, fontWeight:500}}>{pct}%</span>
    </div>
    <div style={{height:4, background:`${color}18`, borderRadius:2, overflow:"hidden"}}>
      <div style={{height:"100%", width:`${pct}%`, background:color, borderRadius:2}}/>
    </div>
    <div style={{display:"flex", justifyContent:"space-between", marginTop:3}}>
      <span style={{fontSize:8, letterSpacing:1.5, textTransform:"uppercase",
        color:`${color}40`, fontFamily:ff}}>Open</span>
      <span style={{fontSize:8, letterSpacing:1.5, textTransform:"uppercase",
        color:`${color}40`, fontFamily:ff}}>Concentrated</span>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
// VERSION A — Expanded blocks with full content + buttons
// ════════════════════════════════════════════════════════════════════════════════
const VersionA = () => {
  const dmColor = EL_C[chart.dm.el];
  return (
    <div style={{fontFamily:ff}}>

      {/* Block 1 — Day Master + Saturation */}
      <div style={{padding:"20px 16px 18px", background:`${dmColor}06`}}>
        <SectionLabel text="Your Element" color={`${dmColor}80`}/>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:16}}>
          <div style={{
            width:48, height:48, borderRadius:12,
            background:`${dmColor}15`, border:`1.5px solid ${dmColor}35`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:24, color:dmColor, fontFamily:ff, fontWeight:700,
          }}>{chart.dm.symbol}</div>
          <div>
            <div style={{fontSize:16, color:dmColor, fontFamily:ff, fontWeight:600, lineHeight:1.2}}>
              {chart.dm.name}
            </div>
            <div style={{fontSize:11, color:`${dmColor}70`, fontFamily:ff, letterSpacing:0.5}}>
              Day Master · Metal
            </div>
          </div>
        </div>
        <SectionLabel text="Elemental Saturation" color={`${dmColor}60`}/>
        <SaturationBar pct={chart.dm.pct} color={dmColor}/>
        <div style={{marginTop:14, display:"flex", justifyContent:"flex-end"}}>
          <Btn label="Your Nature" color={dmColor}/>
        </div>
      </div>

      <Divider/>

      {/* Block 2 — Energy Blueprint */}
      <div style={{padding:"18px 16px"}}>
        <SectionLabel text="Energy Blueprint" color="#a09585"/>
        <BlueprintBars/>
      </div>

      <Divider/>

      {/* Block 3 — Dominant 1 */}
      <div style={{padding:"18px 16px", background:`${EL_C.Fire}04`}}>
        <SectionLabel text="Dominant Energy" color={`${EL_C.Fire}80`}/>
        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:14}}>
          <ElDot el="Fire" size={36}/>
          <div>
            <div style={{fontSize:14, color:EL_C.Fire, fontFamily:ff, fontWeight:600}}>Fire</div>
            <div style={{fontSize:11, color:`${EL_C.Fire}70`, fontFamily:ff}}>Seven Killings · Primary</div>
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <Btn label="Fire Energy" color={EL_C.Fire}/>
        </div>
      </div>

      <Divider/>

      {/* Block 4 — Dominant 2 */}
      <div style={{padding:"18px 16px", background:`${EL_C.Earth}04`}}>
        <SectionLabel text="Second Dominant" color={`${EL_C.Earth}80`}/>
        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:14}}>
          <ElDot el="Earth" size={36}/>
          <div>
            <div style={{fontSize:14, color:EL_C.Earth, fontFamily:ff, fontWeight:600}}>Earth</div>
            <div style={{fontSize:11, color:`${EL_C.Earth}70`, fontFamily:ff}}>Direct Resource · Secondary</div>
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <Btn label="Earth Energy" color={EL_C.Earth}/>
        </div>
      </div>

      <Divider/>

      {/* Block 5 — Seasonal Calibration (missing) */}
      <div style={{padding:"18px 16px"}}>
        <SectionLabel text="Seasonal Calibration" color="#a09585"/>
        <div style={{display:"flex", alignItems:"center", gap:10,
          padding:"10px 12px", borderRadius:8,
          border:"1px dashed #c0392b30", background:"#c0392b04"}}>
          <div style={{
            width:28, height:28, borderRadius:7, border:"1px dashed #2c4a6e50",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, color:"#2c4a6e70", fontFamily:ff,
          }}>W</div>
          <div>
            <div style={{fontSize:12, color:"#2c4a6e", fontFamily:ff}}>Water absent</div>
            <div style={{fontSize:10, color:"#c0392b80", fontFamily:ff, fontStyle:"italic"}}>
              seasonal calibration applies
            </div>
          </div>
        </div>
      </div>

      <Divider/>

      {/* Block 6 — Catalyst + Resistance */}
      <div style={{padding:"18px 16px"}}>
        <SectionLabel text="Your Energy Dynamics" color="#a09585"/>
        <div style={{display:"flex", gap:10}}>
          <div style={{flex:1, padding:"12px 10px", borderRadius:8,
            border:`1px solid ${EL_C.Fire}20`, background:`${EL_C.Fire}04`}}>
            <div style={{fontSize:8, letterSpacing:2, textTransform:"uppercase",
              color:`${EL_C.Fire}60`, fontFamily:ff, marginBottom:8}}>Catalyst</div>
            <div style={{display:"flex", alignItems:"center", gap:6}}>
              <ElDot el="Fire" size={22}/>
              <div>
                <div style={{fontSize:11, color:EL_C.Fire, fontFamily:ff}}>Fire</div>
                <div style={{fontSize:9, color:`${EL_C.Fire}60`, fontFamily:ff}}>Seven Killings</div>
              </div>
            </div>
          </div>
          <div style={{flex:1, padding:"12px 10px", borderRadius:8,
            border:`1px solid ${EL_C.Wood}20`, background:`${EL_C.Wood}04`}}>
            <div style={{fontSize:8, letterSpacing:2, textTransform:"uppercase",
              color:`${EL_C.Wood}60`, fontFamily:ff, marginBottom:8}}>Resistance</div>
            <div style={{display:"flex", alignItems:"center", gap:6}}>
              <ElDot el="Wood" size={22}/>
              <div>
                <div style={{fontSize:11, color:EL_C.Wood, fontFamily:ff}}>Wood</div>
                <div style={{fontSize:9, color:`${EL_C.Wood}60`, fontFamily:ff}}>Direct Officer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// VERSION B — Collapsed rows, one expanded example
// ════════════════════════════════════════════════════════════════════════════════
const VersionB = () => {
  const [expanded, setExpanded] = useState("dm");
  const dmColor = EL_C[chart.dm.el];

  const CollapsedRow = ({ label, sublabel, el, id, showBtn=true, btnLabel="" }) => {
    const c = EL_C[el];
    const isOpen = expanded === id;
    return (
      <div>
        <div
          onClick={() => setExpanded(isOpen ? null : id)}
          style={{
            display:"flex", alignItems:"center", gap:10,
            padding:"13px 16px", cursor:"pointer",
            background: isOpen ? `${c}06` : "transparent",
            transition:"background 0.2s",
          }}
        >
          <ElDot el={el} size={28}/>
          <div style={{flex:1}}>
            <div style={{fontSize:12, color:isOpen?c:"#5a4f47", fontFamily:ff, fontWeight:isOpen?600:400}}>
              {label}
            </div>
            {sublabel && <div style={{fontSize:10, color:"#a09585", fontFamily:ff}}>{sublabel}</div>}
          </div>
          {showBtn && (
            <div style={{fontSize:9, letterSpacing:1, textTransform:"uppercase",
              color:`${c}70`, fontFamily:ff, display:"flex", alignItems:"center", gap:3}}>
              {isOpen ? "▲" : "▼"}
            </div>
          )}
        </div>

        {/* Expanded content */}
        {isOpen && id === "dm" && (
          <div style={{padding:"0 16px 16px", background:`${c}05`}}>
            <SaturationBar pct={chart.dm.pct} color={c}/>
            <div style={{marginTop:12, display:"flex", justifyContent:"flex-end"}}>
              <Btn label="Your Nature" color={c}/>
            </div>
          </div>
        )}
        {isOpen && id === "blueprint" && (
          <div style={{padding:"0 16px 16px"}}>
            <BlueprintBars/>
          </div>
        )}
        {isOpen && id === "dom1" && (
          <div style={{padding:"0 16px 16px", background:`${EL_C.Fire}04`}}>
            <div style={{fontFamily:ff, fontSize:12, color:`${EL_C.Fire}90`, lineHeight:1.65,
              marginBottom:12, borderLeft:`2px solid ${EL_C.Fire}30`, paddingLeft:10}}>
              Seven Killings — the force that sharpens your edge under pressure.
            </div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
              <Btn label="Fire Energy" color={EL_C.Fire}/>
            </div>
          </div>
        )}
        {isOpen && id === "dom2" && (
          <div style={{padding:"0 16px 16px", background:`${EL_C.Earth}04`}}>
            <div style={{fontFamily:ff, fontSize:12, color:`${EL_C.Earth}90`, lineHeight:1.65,
              marginBottom:12, borderLeft:`2px solid ${EL_C.Earth}30`, paddingLeft:10}}>
              Direct Resource — the grounding force that gives your precision something to stand on.
            </div>
            <div style={{display:"flex", justifyContent:"flex-end"}}>
              <Btn label="Earth Energy" color={EL_C.Earth}/>
            </div>
          </div>
        )}
        {isOpen && id === "dynamics" && (
          <div style={{padding:"0 16px 16px"}}>
            <div style={{display:"flex", gap:10}}>
              <div style={{flex:1, padding:"10px 8px", borderRadius:8,
                border:`1px solid ${EL_C.Fire}20`, background:`${EL_C.Fire}04`}}>
                <div style={{fontSize:8, letterSpacing:2, textTransform:"uppercase",
                  color:`${EL_C.Fire}60`, fontFamily:ff, marginBottom:6}}>Catalyst</div>
                <div style={{display:"flex", alignItems:"center", gap:5}}>
                  <ElDot el="Fire" size={18}/>
                  <span style={{fontSize:10, color:EL_C.Fire, fontFamily:ff}}>Fire</span>
                </div>
              </div>
              <div style={{flex:1, padding:"10px 8px", borderRadius:8,
                border:`1px solid ${EL_C.Wood}20`, background:`${EL_C.Wood}04`}}>
                <div style={{fontSize:8, letterSpacing:2, textTransform:"uppercase",
                  color:`${EL_C.Wood}60`, fontFamily:ff, marginBottom:6}}>Resistance</div>
                <div style={{display:"flex", alignItems:"center", gap:5}}>
                  <ElDot el="Wood" size={18}/>
                  <span style={{fontSize:10, color:EL_C.Wood, fontFamily:ff}}>Wood</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <Divider/>
      </div>
    );
  };

  return (
    <div>
      <CollapsedRow id="dm" el="Metal" label="庚 · Yang Metal" sublabel="Your Day Master · concentrated"/>
      <CollapsedRow id="blueprint" el="Metal" label="Energy Blueprint" sublabel="All five elements · your full chart" showBtn={true}/>
      <CollapsedRow id="dom1" el="Fire" label="Fire" sublabel="Seven Killings · Primary dominant"/>
      <CollapsedRow id="dom2" el="Earth" label="Earth" sublabel="Direct Resource · Secondary dominant"/>
      <div>
        <div style={{display:"flex", alignItems:"center", gap:10, padding:"13px 16px"}}>
          <div style={{
            width:28, height:28, borderRadius:7, border:"1px dashed #2c4a6e45",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, color:"#2c4a6e60", fontFamily:ff,
          }}>W</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12, color:"#2c4a6e", fontFamily:ff}}>Water absent</div>
            <div style={{fontSize:10, color:"#c0392b80", fontFamily:ff, fontStyle:"italic"}}>
              Seasonal Calibration
            </div>
          </div>
        </div>
        <Divider/>
      </div>
      <CollapsedRow id="dynamics" el="Fire" label="Catalyst · Resistance" sublabel="Fire pushes · Wood tests"/>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════════
// Phone frame wrapper
// ════════════════════════════════════════════════════════════════════════════════
const Phone = ({ title, note, children }) => (
  <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    <div style={{
      fontSize:13, fontFamily:ff, color:"#5a4f47", fontWeight:600,
      marginBottom:6, letterSpacing:0.3,
    }}>{title}</div>
    <div style={{
      fontSize:10, fontFamily:ff, color:"#a09585", fontStyle:"italic",
      marginBottom:14, textAlign:"center", maxWidth:200, lineHeight:1.5,
    }}>{note}</div>
    <div style={{
      width:260, height:520, borderRadius:36,
      border:"1.5px solid #d4ccc2",
      boxShadow:"0 8px 32px #0000001a, 0 2px 8px #0000000d",
      overflow:"hidden", background:BG, position:"relative",
    }}>
      {/* Status bar */}
      <div style={{
        height:28, background:BG, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"0 18px",
        borderBottom:"0.5px solid #e8e0d5",
      }}>
        <span style={{fontSize:9, color:"#a09585", fontFamily:ff}}>9:41</span>
        <div style={{width:60, height:6, borderRadius:3, background:"#d4ccc2"}}/>
        <span style={{fontSize:9, color:"#a09585", fontFamily:ff}}>●●●</span>
      </div>
      {/* Scroll area */}
      <div style={{height:492, overflowY:"auto"}}>
        {children}
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════════
// Main export
// ════════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div style={{
      minHeight:"100vh", background:"#f2ede6",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"40px 20px", fontFamily:ff,
    }}>
      <div style={{fontSize:10, letterSpacing:3, textTransform:"uppercase",
        color:"#a09585", marginBottom:8}}>Layout Comparison</div>
      <div style={{fontSize:20, color:"#3a2e26", fontWeight:600,
        marginBottom:4, letterSpacing:0.3}}>Report Page — Two Options</div>
      <div style={{fontSize:12, color:"#a09585", marginBottom:36,
        fontStyle:"italic"}}>Tap rows in Option B to expand</div>

      <div style={{display:"flex", gap:36, flexWrap:"wrap", justifyContent:"center"}}>
        <Phone
          title="Option A"
          note="Expanded blocks — full content visible, scroll through each section"
        >
          <VersionA/>
        </Phone>

        <Phone
          title="Option B"
          note="Collapsed rows — tap any row to expand. Full map visible without scrolling"
        >
          <VersionB/>
        </Phone>
      </div>

      <div style={{
        marginTop:36, maxWidth:520, padding:"16px 20px",
        background:"#fff", borderRadius:12, border:"0.5px solid #e0d8cf",
        fontSize:12, color:"#7a6f65", lineHeight:1.7, fontFamily:ff,
      }}>
        <strong style={{color:"#3a2e26"}}>Key difference:</strong> Option A scrolls through each block fully expanded —
        the user reads everything in sequence. Option B shows the full map immediately (all sections visible at once)
        and expands on demand — less scroll, more control.
      </div>
    </div>
  );
}
