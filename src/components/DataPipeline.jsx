import { useState, useEffect } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  night: "#0A1628",
  deep:  "#0d1e38",
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
    icon:"📥", label:"Data\nCapture", num:"01", dark:true,
    eye:"Stage 01 — Data Capture", badge:"Entry Layer",
    title:"Multi-channel lead intake",
    desc:"Leads arrive from web forms, AI chatbot conversations, WhatsApp messages, and direct submissions. Structured and unstructured data are captured and queued for intelligent processing.",
    cv1:"Multi-channel", cv2:"Intake", cv3:"Real-time", cv4:"Raw + Structured",
    tags:[["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]],
  },
  {
    icon:"⚡", label:"Trigger &\nEvents", num:"02", dark:false,
    eye:"Stage 02 — Event Orchestration", badge:"Routing Layer",
    title:"Automated triggers & intelligent routing",
    desc:"Workflow automation fires on time-based schedules or real-time events. Records are validated, normalised, and routed to the correct processing branch without manual steps.",
    cv1:"Event-driven", cv2:"Orchestration", cv3:"Automated", cv4:"Validated Records",
    tags:[["Workflow Auto","gold"],["Event Triggers","rust"],["Data Routing","teal"]],
  },
  {
    icon:"🗄️", label:"Data\nStorage", num:"03", dark:true,
    eye:"Stage 03 — Storage & CRM", badge:"Memory Layer",
    title:"CRM logging & structured persistence",
    desc:"Validated records write to the CRM and a structured database simultaneously. Each lead receives a unique business reference number as the single source of truth.",
    cv1:"Dual-layer", cv2:"CRM + DB", cv3:"Persistent", cv4:"Indexed Records",
    tags:[["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]],
  },
  {
    icon:"🤖", label:"AI\nProcessing", num:"04", dark:false,
    eye:"Stage 04 — AI Intelligence", badge:"Brain Layer",
    title:"Lead scoring & content generation",
    desc:"AI models score qualification likelihood, classify industry and intent, and generate personalised outreach copy. High-scoring leads trigger priority workflows automatically.",
    cv1:"AI-Powered", cv2:"Intelligence", cv3:"Predictive", cv4:"Scored Leads",
    tags:[["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]],
  },
  {
    icon:"🔁", label:"Automation\nExecution", num:"05", dark:true,
    eye:"Stage 05 — Workflow Execution", badge:"Action Layer",
    title:"CRM writeback & booking automation",
    desc:"Enriched data writes back to CRM with AI scores and intent tags. Booking confirmations fire automatically for qualified leads. Branded email sequences dispatch without human involvement.",
    cv1:"Fully Auto", cv2:"Execution", cv3:"Zero Manual", cv4:"Dispatched",
    tags:[["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]],
  },
  {
    icon:"📊", label:"Insights &\nDelivery", num:"06", dark:false,
    eye:"Stage 06 — Delivery & Analytics", badge:"Output Layer",
    title:"Live dashboard, analytics & delivery",
    desc:"Results surface in a live web dashboard and analytics studio — giving real-time visibility over leads, pipeline health, and conversion rates. Clients receive automated confirmations.",
    cv1:"Real-time", cv2:"Delivery", cv3:"Visible", cv4:"Insights + Comms",
    tags:[["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]],
  },
];

// ─── Pattern strips ───────────────────────────────────────────────────────────
const ndebeleTop = [
  `${C.gold} 0`,`${C.gold} 12px`,`${C.rust} 12px`,`${C.rust} 24px`,
  `${C.night} 24px`,`${C.night} 36px`,`${C.teal} 36px`,`${C.teal} 48px`,
  `${C.ivory} 48px`,`${C.ivory} 60px`,
].join(",");

const kenteStrip = [
  `${C.rust} 0`,`${C.rust} 8px`,`${C.gold} 8px`,`${C.gold} 16px`,
  `${C.night} 16px`,`${C.night} 22px`,`${C.gold} 22px`,`${C.gold} 30px`,
  `${C.rust} 30px`,`${C.rust} 38px`,`${C.teal} 38px`,`${C.teal} 44px`,
  `${C.night} 44px`,`${C.night} 50px`,`${C.teal} 50px`,`${C.teal} 58px`,
].join(",");

const ndebeleBot = [
  `${C.night} 0`,`${C.night} 14px`,`${C.gold} 14px`,`${C.gold} 22px`,
  `${C.night} 22px`,`${C.night} 30px`,`${C.teal} 30px`,`${C.teal} 38px`,
  `${C.night} 38px`,`${C.night} 46px`,`${C.rust} 46px`,`${C.rust} 54px`,
].join(",");

// ─── SVG textures ─────────────────────────────────────────────────────────────
const adinkraBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23F4B942' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='10' y1='30' x2='50' y2='30' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23F4B942' stroke-width='1'/%3E%3C/svg%3E")`;
const geoBg     = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect x='10' y='10' width='20' height='20' fill='none' stroke='%23C0451A' stroke-width='.5' opacity='.15'/%3E%3Crect x='15' y='15' width='10' height='10' fill='none' stroke='%23C0451A' stroke-width='.5' opacity='.1'/%3E%3C/svg%3E")`;

// ─── Global CSS (injected once) ───────────────────────────────────────────────
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

  /* Horizontal particles (desktop) */
  .ink-p   { position:absolute; width:7px; height:7px; border-radius:50%; top:-2.5px; opacity:0; animation:inkPtcl 1.8s ease-in-out infinite; }
  /* Vertical particles (mobile) */
  .ink-pv  { position:absolute; width:7px; height:7px; border-radius:50%; left:calc(50% - 3.5px); opacity:0; animation:inkPtclV 1.8s ease-in-out infinite; }

  .ink-p-gold, .ink-pv-gold { background:#F4B942; box-shadow:0 0 5px rgba(244,185,66,.7); animation-delay:0s;   }
  .ink-p-rust, .ink-pv-rust { background:#C0451A; box-shadow:0 0 5px rgba(192,69,26,.6);  animation-delay:.6s;  }
  .ink-p-teal, .ink-pv-teal { background:#1A6B5A; box-shadow:0 0 5px rgba(26,107,90,.6);  animation-delay:1.2s; }

  .ink-shine { height:100%; width:100%; background:linear-gradient(90deg,transparent,#F4B942,transparent); animation:inkShine 2.4s ease-in-out infinite; }
  .ink-live  { width:6px; height:6px; border-radius:50%; background:#2a9a7a; animation:inkPulse 1.6s ease-in-out infinite; flex-shrink:0; }

  /* ── Responsive layout ── */
  .ink-pipeline-row {
    display: flex;
    align-items: stretch;
    position: relative;
    min-height: 150px;
  }
  .ink-connector-h {
    flex: 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 4;
  }
  .ink-connector-v { display: none; }

  .ink-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .ink-cap-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  /* Tablet: 2 rows of 3 */
  @media (max-width: 768px) {
    .ink-pipeline-row {
      display: grid;
      grid-template-columns: 1fr 20px 1fr 20px 1fr;
      grid-template-rows: auto 28px auto;
      min-height: unset;
    }
    .ink-connector-h { display: none; }
    .ink-connector-v {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .ink-connector-v-pipe {
      position: relative;
      width: 14px;
      height: 100%;
      overflow: visible;
    }
    .ink-detail-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Mobile: single column */
  @media (max-width: 480px) {
    .ink-pipeline-row {
      grid-template-columns: 1fr 14px 1fr;
      grid-template-rows: auto 24px auto 24px auto 24px;
    }
    .ink-cap-grid {
      grid-template-columns: 1fr 1fr;
    }
    .ink-stage-panel {
      padding: 16px 4px 14px !important;
    }
    .ink-node-card {
      width: 52px !important;
      height: 52px !important;
    }
  }
`;

// ─── Horizontal connector (desktop between panels in a row) ──────────────────
function ConnectorH({ prevDark, currDark }) {
  const leftBg  = prevDark ? C.night : C.cream;
  const rightBg = currDark ? C.night : C.cream;
  return (
    <div
      className="ink-connector-h"
      style={{ background: `linear-gradient(90deg, ${leftBg} 50%, ${rightBg} 50%)` }}
    >
      <div style={{ position:"relative", width:20, height:14, overflow:"visible" }}>
        <div style={{ position:"absolute", top:6, left:0, right:0, height:2, background:"rgba(212,169,106,.25)" }} />
        <div className="ink-p ink-p-gold" />
        <div className="ink-p ink-p-rust" />
        <div className="ink-p ink-p-teal" />
        <div style={{ position:"absolute", right:-1, top:2, width:0, height:0,
          borderTop:"5px solid transparent", borderBottom:"5px solid transparent",
          borderLeft:"7px solid rgba(212,169,106,.4)" }} />
      </div>
    </div>
  );
}

// ─── Vertical connector (tablet/mobile between rows) ─────────────────────────
function ConnectorV({ topDark, bottomDark }) {
  const topBg    = topDark    ? C.night : C.cream;
  const bottomBg = bottomDark ? C.night : C.cream;
  return (
    <div
      className="ink-connector-v"
      style={{
        background: `linear-gradient(180deg, ${topBg} 50%, ${bottomBg} 50%)`,
        gridColumn: "2 / 3",
      }}
    >
      <div style={{ position:"relative", width:14, height:"100%", overflow:"visible" }}>
        <div style={{ position:"absolute", left:6, top:0, bottom:0, width:2, background:"rgba(212,169,106,.25)" }} />
        <div className="ink-pv ink-pv-gold" style={{ position:"absolute" }} />
        <div className="ink-pv ink-pv-rust" style={{ position:"absolute" }} />
        <div className="ink-pv ink-pv-teal" style={{ position:"absolute" }} />
      </div>
    </div>
  );
}

// ─── Stage panel ─────────────────────────────────────────────────────────────
function StagePanel({ stage, active, onClick, gridStyle }) {
  const isDark = stage.dark;
  return (
    <button
      onClick={onClick}
      className="ink-stage-panel"
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"20px 6px 16px", cursor:"pointer",
        position:"relative", overflow:"hidden",
        background: isDark ? C.night : C.cream,
        border:"none",
        outline: active ? `2.5px solid ${C.gold}` : "none",
        outlineOffset: -2.5,
        zIndex: active ? 3 : 1,
        ...gridStyle,
      }}
    >
      {/* Corner accent */}
      <div style={{ position:"absolute", top:0, right:0, width:0, height:0,
        borderLeft:"18px solid transparent",
        borderTop: isDark ? "18px solid rgba(244,185,66,.5)" : "18px solid rgba(192,69,26,.35)" }} />
      {/* Geo bg */}
      <div style={{ position:"absolute", bottom:-8, left:-8, width:40, height:40,
        border:`4px solid ${isDark ? C.ivory : C.night}`, transform:"rotate(45deg)", opacity:.05 }} />

      {/* Icon card */}
      <div
        className="ink-node-card"
        style={{
          width:58, height:58, borderRadius:12, marginBottom:10,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3,
          background: isDark ? "linear-gradient(145deg,#1a2e50,#0f1e36)" : "linear-gradient(145deg,#ffffff,#f5efe0)",
          border: isDark ? "1px solid rgba(244,185,66,.2)" : "1px solid rgba(192,69,26,.18)",
          boxShadow: active
            ? `0 8px 24px rgba(244,185,66,.3), 0 0 0 2px ${C.gold}`
            : isDark
            ? "0 4px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06)"
            : "0 4px 14px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.9)",
          transform: active ? "translateY(-4px)" : "none",
          transition:"transform .25s, box-shadow .25s",
        }}
      >
        <span style={{ fontSize:22, lineHeight:1 }}>{stage.icon}</span>
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, fontWeight:700, letterSpacing:1,
          color: active ? C.gold : isDark ? "rgba(212,169,106,.7)" : C.rust }}>
          {stage.num}
        </span>
      </div>

      {/* Label */}
      <div style={{
        fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600, letterSpacing:.5,
        textAlign:"center", lineHeight:1.35, textTransform:"uppercase", maxWidth:76,
        color: active ? C.gold : isDark ? "rgba(250,246,238,.55)" : "rgba(10,22,40,.5)",
      }}>
        {stage.label.split("\n").map((l,i) => <span key={i} style={{ display:"block" }}>{l}</span>)}
      </div>

      {/* Active bar */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:3,
        background: C.gold,
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transformOrigin:"left", transition:"transform .3s ease",
      }} />
    </button>
  );
}

// ─── Cap tag ──────────────────────────────────────────────────────────────────
function CapTag({ label, type }) {
  const map = {
    gold:{ borderColor:C.gold, color:"#8a5a08", background:"rgba(244,185,66,.08)" },
    rust:{ borderColor:C.rust, color:C.rust,    background:"rgba(192,69,26,.06)"  },
    teal:{ borderColor:C.teal, color:C.teal,    background:"rgba(26,107,90,.06)"  },
  };
  return (
    <span style={{ fontSize:9.5, fontWeight:500, letterSpacing:.4,
      padding:"3px 9px", border:"1px solid", textTransform:"uppercase", ...map[type] }}>
      {label}
    </span>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
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

  // Desktop: flat row of 6 panels with horizontal connectors
  // Tablet/mobile: CSS grid handles reflow via media queries
  // We render all items in source order; the grid reflows them automatically.
  const pipelineItems = [];
  stages.forEach((st, i) => {
    if (i > 0) {
      // Horizontal connector (visible desktop only via CSS)
      pipelineItems.push(
        <ConnectorH key={`ch${i}`} prevDark={stages[i-1].dark} currDark={st.dark} />
      );
    }
    pipelineItems.push(
      <StagePanel
        key={st.num}
        stage={st}
        active={active === i}
        onClick={() => setActive(i)}
      />
    );
  });

  return (
    <section
      id="how-it-works"
      style={{ width:"100%", padding:"80px 0", fontFamily:"'DM Sans',sans-serif" }}
    >
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px" }}>
        <div style={{ borderRadius:16, overflow:"hidden" }}>

          {/* ── Top Ndebele strip ── */}
          <div style={{ height:9, background:`repeating-linear-gradient(90deg,${ndebeleTop})` }} />

          {/* ── Header ── */}
          <div style={{ background:C.night, padding:"28px 24px 0", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:adinkraBg, pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:4, color:C.sand,
              textTransform:"uppercase", marginBottom:8, opacity:.8 }}>
              Inkanyezi Technologies — Signal Architecture
            </p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(18px,4vw,24px)",
              fontWeight:700, color:C.ivory, lineHeight:1.2, margin:0 }}>
              We are the{" "}
              <em style={{ fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif",
                color:C.gold, fontSize:"clamp(20px,4.5vw,28px)", fontWeight:300 }}>
                signal
              </em>{" "}
              in the noise
            </h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
              fontSize:"clamp(12px,2vw,14px)", color:C.sand, marginTop:6, opacity:.7, paddingBottom:20 }}>
              End-to-end automation — raw data to intelligent output
            </p>
          </div>

          {/* ── Pipeline row ── */}
          <div className="ink-pipeline-row">
            {pipelineItems}
          </div>

          {/* ── Kente divider ── */}
          <div style={{ height:7, background:`repeating-linear-gradient(90deg,${kenteStrip})` }} />

          {/* ── Detail panel ── */}
          <div className="ink-detail-grid">

            {/* Dark side */}
            <div style={{ background:C.night, padding:"22px 20px 22px 24px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, opacity:.03, backgroundImage:adinkraBg, pointerEvents:"none" }} />
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:9,
                letterSpacing:2, textTransform:"uppercase", color:"#2a9a7a", fontWeight:500, marginBottom:10 }}>
                <div className="ink-live" />
                Live pipeline
              </div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:3, color:C.sand,
                textTransform:"uppercase", marginBottom:5, opacity:.75 }}>{s.eye}</p>
              <div style={{ display:"inline-block", fontFamily:"'Cinzel',serif", fontSize:9, fontWeight:600,
                letterSpacing:1.5, padding:"3px 10px", background:C.gold, color:C.night,
                marginBottom:10, textTransform:"uppercase" }}>{s.badge}</div>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(12px,2vw,14px)", fontWeight:600,
                color:C.ivory, lineHeight:1.4, marginBottom:9 }}>{s.title}</p>
              <p style={{ fontSize:"clamp(11px,1.8vw,12px)", color:"rgba(250,246,238,.65)", lineHeight:1.8 }}>
                {s.desc}
              </p>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, overflow:"hidden" }}>
                <div className="ink-shine" />
              </div>
            </div>

            {/* Light side */}
            <div style={{ background:C.ivory, padding:"22px 24px 22px 20px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:geoBg, pointerEvents:"none" }} />
              <div className="ink-cap-grid" style={{ position:"relative", zIndex:1 }}>
                {[["Capability",s.cv1],["Layer",s.cv2],["Mode",s.cv3],["Output",s.cv4]].map(([lbl,val]) => (
                  <div key={lbl} style={{ background:"white", border:"1px solid rgba(192,69,26,.1)",
                    borderLeft:`3px solid ${C.rust}`, padding:"9px 11px" }}>
                    <div style={{ fontSize:9, fontWeight:500, letterSpacing:1.5, textTransform:"uppercase",
                      color:C.rust, marginBottom:3 }}>{lbl}</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:500,
                      color:C.night, lineHeight:1.2 }}>{val}</div>
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1", display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
                  {s.tags.map(([label,type]) => <CapTag key={label} label={label} type={type} />)}
                </div>
              </div>
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
            gap:8, padding:"12px 0", background:C.night, flexWrap:"wrap" }}>
            {stages.map((_,i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                width: active===i ? 22 : 7, height:7,
                borderRadius: active===i ? 3 : "50%",
                background: active===i ? C.gold : "rgba(212,169,106,.2)",
                border:"none", cursor:"pointer", padding:0, transition:"all .2s",
              }} />
            ))}
          </div>

          {/* ── Bottom Ndebele strip ── */}
          <div style={{ height:9, background:`repeating-linear-gradient(90deg,${ndebeleBot})` }} />

        </div>
      </div>
    </section>
  );
}
