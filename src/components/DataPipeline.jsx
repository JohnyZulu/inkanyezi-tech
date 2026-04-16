import { useState, useEffect } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  night: "#0A1628",
  gold:  "#F4B942",
  ivory: "#FAF6EE",
  cream: "#F0E8D5",
  rust:  "#C0451A",
  teal:  "#1A6B5A",
  sand:  "#D4A96A",
};

// ─── Stage data ───────────────────────────────────────────────────────────────
const stages = [
  {
    icon:"📥", label:"Data Capture", num:"01", dark:true,
    eye:"Stage 01 — Data Capture", badge:"Entry Layer",
    title:"Multi-channel lead intake",
    desc:"Leads arrive from web forms, AI chatbot conversations, WhatsApp messages, and direct submissions. Structured and unstructured data are captured and queued for intelligent processing.",
    cv1:"Multi-channel", cv2:"Intake", cv3:"Real-time", cv4:"Raw + Structured",
    tags:[["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]],
  },
  {
    icon:"⚡", label:"Trigger & Events", num:"02", dark:false,
    eye:"Stage 02 — Event Orchestration", badge:"Routing Layer",
    title:"Automated triggers & intelligent routing",
    desc:"Workflow automation fires on time-based schedules or real-time events. Records are validated, normalised, and routed to the correct processing branch without manual steps.",
    cv1:"Event-driven", cv2:"Orchestration", cv3:"Automated", cv4:"Validated Records",
    tags:[["Workflow Auto","gold"],["Event Triggers","rust"],["Data Routing","teal"]],
  },
  {
    icon:"🗄️", label:"Data Storage", num:"03", dark:true,
    eye:"Stage 03 — Storage & CRM", badge:"Memory Layer",
    title:"CRM logging & structured persistence",
    desc:"Validated records write to the CRM and a structured database simultaneously. Each lead receives a unique business reference number as the single source of truth.",
    cv1:"Dual-layer", cv2:"CRM + DB", cv3:"Persistent", cv4:"Indexed Records",
    tags:[["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]],
  },
  {
    icon:"🤖", label:"AI Processing", num:"04", dark:false,
    eye:"Stage 04 — AI Intelligence", badge:"Brain Layer",
    title:"Lead scoring & content generation",
    desc:"AI models score qualification likelihood, classify industry and intent, and generate personalised outreach copy. High-scoring leads trigger priority workflows automatically.",
    cv1:"AI-Powered", cv2:"Intelligence", cv3:"Predictive", cv4:"Scored Leads",
    tags:[["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]],
  },
  {
    icon:"🔁", label:"Automation", num:"05", dark:true,
    eye:"Stage 05 — Workflow Execution", badge:"Action Layer",
    title:"CRM writeback & booking automation",
    desc:"Enriched data writes back to CRM with AI scores and intent tags. Booking confirmations fire automatically for qualified leads. Branded email sequences dispatch without human involvement.",
    cv1:"Fully Auto", cv2:"Execution", cv3:"Zero Manual", cv4:"Dispatched",
    tags:[["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]],
  },
  {
    icon:"📊", label:"Insights & Delivery", num:"06", dark:false,
    eye:"Stage 06 — Delivery & Analytics", badge:"Output Layer",
    title:"Live dashboard, analytics & delivery",
    desc:"Results surface in a live web dashboard and analytics studio — giving real-time visibility over leads, pipeline health, and conversion rates. Clients receive automated confirmations.",
    cv1:"Real-time", cv2:"Delivery", cv3:"Visible", cv4:"Insights + Comms",
    tags:[["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]],
  },
];

// ─── Decorative strips ────────────────────────────────────────────────────────
const mkStrip = (stops) => `repeating-linear-gradient(90deg,${stops})`;
const ndebeleTop = mkStrip(`${C.gold} 0,${C.gold} 12px,${C.rust} 12px,${C.rust} 24px,${C.night} 24px,${C.night} 36px,${C.teal} 36px,${C.teal} 48px,${C.ivory} 48px,${C.ivory} 60px`);
const kenteStrip = mkStrip(`${C.rust} 0,${C.rust} 8px,${C.gold} 8px,${C.gold} 16px,${C.night} 16px,${C.night} 22px,${C.gold} 22px,${C.gold} 30px,${C.rust} 30px,${C.rust} 38px,${C.teal} 38px,${C.teal} 44px,${C.night} 44px,${C.night} 50px,${C.teal} 50px,${C.teal} 58px`);
const ndebeleBot = mkStrip(`${C.night} 0,${C.night} 14px,${C.gold} 14px,${C.gold} 22px,${C.night} 22px,${C.night} 30px,${C.teal} 30px,${C.teal} 38px,${C.night} 38px,${C.night} 46px,${C.rust} 46px,${C.rust} 54px`);

// ─── SVG textures ─────────────────────────────────────────────────────────────
const adinkraBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23F4B942' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='10' y1='30' x2='50' y2='30' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23F4B942' stroke-width='1'/%3E%3C/svg%3E")`;
const geoBg     = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='10' y='10' width='20' height='20' fill='none' stroke='%23C0451A' stroke-width='.5' opacity='.15'/%3E%3Crect x='15' y='15' width='10' height='10' fill='none' stroke='%23C0451A' stroke-width='.5' opacity='.1'/%3E%3C/svg%3E")`;

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const INJECTED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes inkPtcl {
    0%   { left:0%;   opacity:0; transform:scale(.5); }
    15%  { opacity:1; transform:scale(1); }
    85%  { opacity:1; transform:scale(1); }
    100% { left:100%; opacity:0; transform:scale(.5); }
  }
  @keyframes inkPtclV {
    0%   { top:0%;    opacity:0; transform:scale(.5); }
    15%  { opacity:1; transform:scale(1); }
    85%  { opacity:1; transform:scale(1); }
    100% { top:100%;  opacity:0; transform:scale(.5); }
  }
  @keyframes inkShine  { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
  @keyframes inkPulse  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.6)} }

  .ink-p    { position:absolute; width:7px; height:7px; border-radius:50%; top:-3px; opacity:0; animation:inkPtcl 1.8s ease-in-out infinite; }
  .ink-pv   { position:absolute; width:7px; height:7px; border-radius:50%; left:50%; transform:translateX(-50%); opacity:0; animation:inkPtclV 1.8s ease-in-out infinite; }
  .ink-gold { background:#F4B942; box-shadow:0 0 6px rgba(244,185,66,.8); animation-delay:0s;   }
  .ink-rust { background:#C0451A; box-shadow:0 0 6px rgba(192,69,26,.7);  animation-delay:.6s;  }
  .ink-teal { background:#1A6B5A; box-shadow:0 0 6px rgba(26,107,90,.7);  animation-delay:1.2s; }
  .ink-shine { height:100%; width:100%; background:linear-gradient(90deg,transparent,#F4B942,transparent); animation:inkShine 2.4s ease-in-out infinite; }
  .ink-live  { width:6px; height:6px; border-radius:50%; background:#2a9a7a; animation:inkPulse 1.6s ease-in-out infinite; flex-shrink:0; }

  /* ── Desktop: single horizontal row ── */
  .ink-row {
    display: flex;
    align-items: stretch;
  }
  .ink-panel {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 8px 20px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: none;
    transition: filter .2s;
  }
  .ink-panel:hover { filter: brightness(1.07); }
  .ink-conn-h {
    flex: 0 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 4;
  }
  .ink-conn-v { display: none; }
  .ink-detail-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .ink-cap-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }

  /* ── Mobile (≤ 640px): vertical stepper ── */
  @media (max-width: 640px) {
    .ink-row {
      flex-direction: column;
    }
    .ink-panel {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding: 16px 20px;
      gap: 16px;
      min-height: 72px;
    }
    .ink-panel-label {
      text-align: left !important;
    }
    .ink-conn-h { display: none; }
    .ink-conn-v {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      position: relative;
    }
    .ink-detail-grid { grid-template-columns: 1fr; }
    .ink-cap-grid    { grid-template-columns: 1fr 1fr; }
  }
`;

// ─── Horizontal connector ─────────────────────────────────────────────────────
function ConnH({ prevDark, currDark }) {
  return (
    <div className="ink-conn-h" style={{
      background: `linear-gradient(90deg, ${prevDark ? C.night : C.cream} 50%, ${currDark ? C.night : C.cream} 50%)`,
    }}>
      <div style={{ position:"relative", width:16, height:16, overflow:"visible" }}>
        <div style={{ position:"absolute", top:7, left:0, right:0, height:2, background:"rgba(212,169,106,.2)" }} />
        <div className="ink-p ink-gold" />
        <div className="ink-p ink-rust" />
        <div className="ink-p ink-teal" />
        <div style={{ position:"absolute", right:-2, top:3, width:0, height:0,
          borderTop:"5px solid transparent", borderBottom:"5px solid transparent",
          borderLeft:"7px solid rgba(212,169,106,.4)" }} />
      </div>
    </div>
  );
}

// ─── Vertical connector (mobile) ─────────────────────────────────────────────
function ConnV({ topDark, bottomDark }) {
  return (
    <div className="ink-conn-v" style={{
      background: `linear-gradient(180deg, ${topDark ? C.night : C.cream} 50%, ${bottomDark ? C.night : C.cream} 50%)`,
    }}>
      <div style={{ position:"relative", width:16, height:32, overflow:"visible" }}>
        <div style={{ position:"absolute", left:7, top:0, bottom:0, width:2, background:"rgba(212,169,106,.2)" }} />
        <div className="ink-pv ink-gold" />
        <div className="ink-pv ink-rust" />
        <div className="ink-pv ink-teal" />
        <div style={{ position:"absolute", bottom:-2, left:3, width:0, height:0,
          borderLeft:"5px solid transparent", borderRight:"5px solid transparent",
          borderTop:"7px solid rgba(212,169,106,.4)" }} />
      </div>
    </div>
  );
}

// ─── Stage panel ─────────────────────────────────────────────────────────────
function StagePanel({ stage, active, onClick }) {
  const isDark = stage.dark;
  const nodeBg   = isDark ? "linear-gradient(145deg,#1a2e50,#0f1e36)" : "linear-gradient(145deg,#ffffff,#f5efe0)";
  const nodeBdr  = isDark ? "1px solid rgba(244,185,66,.2)" : "1px solid rgba(192,69,26,.2)";
  const nodeShdw = active
    ? `0 6px 22px rgba(244,185,66,.35), 0 0 0 2px ${C.gold}`
    : isDark
    ? "0 3px 12px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)"
    : "0 3px 12px rgba(0,0,0,.1),  inset 0 1px 0 rgba(255,255,255,.9)";
  const lblColor = active ? C.gold : isDark ? "rgba(250,246,238,.5)" : "rgba(10,22,40,.45)";
  const numColor = active ? C.gold : isDark ? "rgba(212,169,106,.65)" : C.rust;

  return (
    <button
      onClick={onClick}
      className="ink-panel"
      style={{
        background: isDark ? C.night : C.cream,
        outline: active ? `2.5px solid ${C.gold}` : "none",
        outlineOffset: -2.5,
        zIndex: active ? 3 : 1,
      }}
    >
      {/* Corner gem */}
      <div style={{ position:"absolute", top:0, right:0, width:0, height:0,
        borderLeft:"16px solid transparent",
        borderTop: isDark ? "16px solid rgba(244,185,66,.45)" : "16px solid rgba(192,69,26,.3)" }} />
      {/* Geo bg */}
      <div style={{ position:"absolute", bottom:-6, left:-6, width:36, height:36,
        border:`3px solid ${isDark ? C.ivory : C.night}`, transform:"rotate(45deg)", opacity:.05 }} />

      {/* Icon card */}
      <div style={{
        width:56, height:56, borderRadius:12, flexShrink:0,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2,
        background: nodeBg, border: nodeBdr, boxShadow: nodeShdw,
        transform: active ? "translateY(-3px)" : "none",
        transition:"transform .25s, box-shadow .25s",
        marginBottom: 8,
      }}>
        <span style={{ fontSize:21, lineHeight:1 }}>{stage.icon}</span>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, fontWeight:700, letterSpacing:1, color:numColor }}>
          {stage.num}
        </span>
      </div>

      {/* Label */}
      <div className="ink-panel-label" style={{
        fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600, letterSpacing:.5,
        textAlign:"center", lineHeight:1.35, textTransform:"uppercase",
        maxWidth:80, color: lblColor,
      }}>
        {stage.label}
      </div>

      {/* Active bar */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:3, background:C.gold,
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transformOrigin:"left", transition:"transform .3s ease",
      }} />
    </button>
  );
}

// ─── Cap tag ──────────────────────────────────────────────────────────────────
function CapTag({ label, type }) {
  const s = {
    gold:{ borderColor:C.gold, color:"#7a4e06", background:"rgba(244,185,66,.09)" },
    rust:{ borderColor:C.rust, color:C.rust,    background:"rgba(192,69,26,.07)"  },
    teal:{ borderColor:C.teal, color:C.teal,    background:"rgba(26,107,90,.07)"  },
  }[type];
  return (
    <span style={{ fontSize:10, fontWeight:500, letterSpacing:.4,
      padding:"4px 10px", border:"1px solid", textTransform:"uppercase", ...s }}>
      {label}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DataPipeline() {
  const [active, setActive] = useState(0);
  const s = stages[active];

  useEffect(() => {
    if (document.getElementById("ink-dp-css")) return;
    const el = document.createElement("style");
    el.id = "ink-dp-css";
    el.textContent = INJECTED_CSS;
    document.head.appendChild(el);
  }, []);

  return (
    <section id="how-it-works" style={{ width:"100%", padding:"60px 0", fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
        <div style={{ borderRadius:16, overflow:"hidden" }}>

          {/* ── Top Ndebele strip ── */}
          <div style={{ height:9, background:ndebeleTop }} />

          {/* ── Header ── */}
          <div style={{ background:C.night, padding:"28px 28px 0", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:adinkraBg, pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:4, color:C.sand,
              textTransform:"uppercase", marginBottom:8, opacity:.8 }}>
              Inkanyezi Technologies — Signal Architecture
            </p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(18px,4vw,26px)",
              fontWeight:700, color:C.ivory, lineHeight:1.2, margin:0 }}>
              We are the{" "}
              <em style={{ fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif",
                color:C.gold, fontSize:"clamp(20px,4.5vw,30px)", fontWeight:300 }}>
                signal
              </em>{" "}
              in the noise
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
              fontSize:"clamp(12px,2vw,14px)", color:C.sand, marginTop:6, opacity:.7, paddingBottom:22 }}>
              End-to-end automation — raw data to intelligent output
            </p>
          </div>

          {/* ── Pipeline row (desktop horizontal / mobile vertical) ── */}
          <div className="ink-row">
            {stages.map((st, i) => (
              <span key={st.num} style={{ display:"contents" }}>
                {i > 0 && (
                  <>
                    {/* Horizontal connector — desktop */}
                    <ConnH prevDark={stages[i-1].dark} currDark={st.dark} />
                    {/* Vertical connector — mobile */}
                    <ConnV topDark={stages[i-1].dark} bottomDark={st.dark} />
                  </>
                )}
                <StagePanel stage={st} active={active === i} onClick={() => setActive(i)} />
              </span>
            ))}
          </div>

          {/* ── Kente divider ── */}
          <div style={{ height:7, background:kenteStrip }} />

          {/* ── Detail panel ── */}
          <div className="ink-detail-grid">

            {/* Dark side */}
            <div style={{ background:C.night, padding:"24px 24px 28px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, opacity:.03, backgroundImage:adinkraBg, pointerEvents:"none" }} />
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:9,
                letterSpacing:2, textTransform:"uppercase", color:"#2a9a7a", fontWeight:600, marginBottom:12 }}>
                <div className="ink-live" />
                Live pipeline
              </div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:3, color:C.sand,
                textTransform:"uppercase", marginBottom:6, opacity:.75 }}>{s.eye}</p>
              <div style={{ display:"inline-block", fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:700,
                letterSpacing:1.5, padding:"4px 12px", background:C.gold, color:C.night,
                marginBottom:12, textTransform:"uppercase" }}>{s.badge}</div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:600,
                color:C.ivory, lineHeight:1.45, marginBottom:10 }}>{s.title}</p>
              <p style={{ fontSize:"clamp(12px,1.6vw,13px)", color:"rgba(250,246,238,.65)", lineHeight:1.85 }}>
                {s.desc}
              </p>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, overflow:"hidden" }}>
                <div className="ink-shine" />
              </div>
            </div>

            {/* Light side */}
            <div style={{ background:C.ivory, padding:"24px 28px 28px 24px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:geoBg, pointerEvents:"none" }} />
              <div className="ink-cap-grid" style={{ position:"relative", zIndex:1 }}>
                {[["Capability",s.cv1],["Layer",s.cv2],["Mode",s.cv3],["Output",s.cv4]].map(([lbl,val]) => (
                  <div key={lbl} style={{ background:"white",
                    border:"1px solid rgba(192,69,26,.1)", borderLeft:`3px solid ${C.rust}`,
                    padding:"10px 12px" }}>
                    <div style={{ fontSize:9, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase",
                      color:C.rust, marginBottom:4 }}>{lbl}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:500,
                      color:C.night, lineHeight:1.2 }}>{val}</div>
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1", display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
                  {s.tags.map(([label,type]) => <CapTag key={label} label={label} type={type} />)}
                </div>
              </div>
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
            gap:8, padding:"14px 16px", background:C.night, flexWrap:"wrap" }}>
            {stages.map((_,i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: active===i ? 24 : 7, height:7,
                borderRadius: active===i ? 3 : "50%",
                background: active===i ? C.gold : "rgba(212,169,106,.2)",
                border:"none", cursor:"pointer", padding:0,
                transition:"all .25s ease",
              }} />
            ))}
          </div>

          {/* ── Bottom Ndebele strip ── */}
          <div style={{ height:9, background:ndebeleBot }} />

        </div>
      </div>
    </section>
  );
}
