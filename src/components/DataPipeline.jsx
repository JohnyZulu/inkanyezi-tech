import { useEffect, useRef, useState, useCallback } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  night:  "#0A1628",
  deep:   "#0d1e38",
  gold:   "#F4B942",
  ivory:  "#FAF6EE",
  cream:  "#F0E8D5",
  rust:   "#C0451A",
  teal:   "#3A9E7E",   // softened — was #1A6B5A
  sand:   "#D4A96A",
  white:  "#FFFFFF",
};

// ─── Ndebele / Kente strip helpers ────────────────────────────────────────────
// Softened teal (#3A9E7E) used in strips instead of deep green
const STRIP_TOP = `repeating-linear-gradient(90deg,
  ${C.gold}   0,${C.gold}   10px,
  ${C.rust}   10px,${C.rust}  20px,
  ${C.night}  20px,${C.night} 30px,
  ${C.teal}   30px,${C.teal}  40px,
  ${C.ivory}  40px,${C.ivory} 50px)`;

const STRIP_KENTE = `repeating-linear-gradient(90deg,
  ${C.rust}   0,${C.rust}   7px,
  ${C.gold}   7px,${C.gold}  14px,
  ${C.night}  14px,${C.night}19px,
  ${C.gold}   19px,${C.gold} 26px,
  ${C.rust}   26px,${C.rust} 33px,
  ${C.teal}   33px,${C.teal} 38px,
  ${C.night}  38px,${C.night}43px,
  ${C.teal}   43px,${C.teal} 50px)`;

const STRIP_BOT = `repeating-linear-gradient(90deg,
  ${C.night}  0,${C.night} 12px,
  ${C.gold}   12px,${C.gold}  20px,
  ${C.night}  20px,${C.night} 28px,
  ${C.teal}   28px,${C.teal}  36px,
  ${C.night}  36px,${C.night} 44px,
  ${C.rust}   44px,${C.rust}  52px)`;

// ─── SVG textures ─────────────────────────────────────────────────────────────
const ADINKRA = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23F4B942' stroke-width='1.5'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='10' y1='30' x2='50' y2='30' stroke='%23F4B942' stroke-width='1'/%3E%3Cline x1='30' y1='10' x2='30' y2='50' stroke='%23F4B942' stroke-width='1'/%3E%3C/svg%3E")`;

// ─── Stage data ───────────────────────────────────────────────────────────────
const STAGES = [
  {
    id: 0, label: "Data\nSources",  icon: "📥", dark: true,
    badge: "Entry Layer",  title: "Multi-channel data intake",
    desc:  "Web forms, AI chatbot, WhatsApp and direct API submissions feed raw structured and unstructured data into the pipeline.",
    tags:  [["Lead Capture","rust"],["AI Chat","gold"],["WhatsApp","teal"]],
  },
  {
    id: 1, label: "Trigger\n& Events", icon: "⚡", dark: false,
    badge: "Routing Layer", title: "Automated triggers & routing",
    desc:  "Make.com workflows fire on real-time webhooks or time schedules. Every record is validated, normalised and routed to the correct branch.",
    tags:  [["Workflow Auto","gold"],["Event Triggers","rust"],["Real-time","teal"]],
  },
  {
    id: 2, label: "Data\nStorage",  icon: "🗄️", dark: true,
    badge: "Memory Layer", title: "CRM logging & persistence",
    desc:  "Validated records land in the CRM and structured database simultaneously. Each lead gets a unique business reference number.",
    tags:  [["CRM Logging","rust"],["Lead Tracking","teal"],["Reference IDs","gold"]],
  },
  {
    id: 3, label: "AI\nEngine",     icon: "🤖", dark: false,
    badge: "Brain Layer",  title: "Lead scoring & content gen",
    desc:  "Gemini AI scores qualification likelihood, classifies intent and generates personalised outreach copy. High scorers trigger priority flows.",
    tags:  [["Lead Scoring","gold"],["AI Classify","teal"],["Content Gen","rust"]],
  },
  {
    id: 4, label: "Automation\nNode", icon: "🔁", dark: true,
    badge: "Action Layer", title: "CRM writeback & booking",
    desc:  "Enriched data writes back to CRM with AI scores. Booking confirmations and branded email sequences fire automatically.",
    tags:  [["CRM Writeback","rust"],["Booking Flows","gold"],["Email Sequences","teal"]],
  },
  {
    id: 5, label: "Live\nDashboard", icon: "📊", dark: false,
    badge: "Output Layer", title: "Analytics & client delivery",
    desc:  "Real-time visibility over leads, pipeline health and conversion rates via live dashboard, Looker Studio and mobile app.",
    tags:  [["Live Dashboard","gold"],["Analytics","teal"],["Client Delivery","rust"]],
  },
];

// ─── Tag colours ──────────────────────────────────────────────────────────────
const TAG_STYLE = {
  gold: { border: C.gold,  color: "#7a4e06", bg: "rgba(244,185,66,.1)"  },
  rust: { border: C.rust,  color: C.rust,    bg: "rgba(192,69,26,.08)"  },
  teal: { border: C.teal,  color: C.teal,    bg: "rgba(58,158,126,.08)" },
};

// ─── Canvas helpers ───────────────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function bezierPts(ax, ay, bx, by, n = 24) {
  const mx = (ax + bx) / 2, my = (ay + by) / 2 - Math.abs(bx - ax) * 0.12;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push({
      x: (1-t)*(1-t)*ax + 2*(1-t)*t*mx + t*t*bx,
      y: (1-t)*(1-t)*ay + 2*(1-t)*t*my + t*t*by,
    });
  }
  return pts;
}

// ─── Particle class ───────────────────────────────────────────────────────────
class Particle {
  constructor(path, delay) {
    this.path  = path;
    this.t     = -(delay ?? 0);
    this.speed = 0.0038 + Math.random() * 0.003;
    this.color = [C.gold, C.rust, C.teal][Math.floor(Math.random() * 3)];
    this.r     = 3.2 + Math.random() * 1.4;
  }
  update() {
    this.t += this.speed;
    if (this.t > 1) this.t = -0.25 - Math.random() * 0.25;
  }
  draw(ctx) {
    if (this.t < 0) return;
    const tt  = Math.min(this.t, 1);
    const seg = (this.path.length - 1) * tt;
    const i   = Math.min(Math.floor(seg), this.path.length - 2);
    const f   = seg - i;
    const px  = this.path[i].x + (this.path[i+1].x - this.path[i].x) * f;
    const py  = this.path[i].y + (this.path[i+1].y - this.path[i].y) * f;
    const op  = tt < 0.08 ? tt / 0.08 : tt > 0.92 ? (1 - tt) / 0.08 : 1;
    ctx.save();
    ctx.globalAlpha = op * 0.92;
    ctx.beginPath();
    ctx.arc(px, py, this.r, 0, Math.PI * 2);
    ctx.fillStyle    = this.color;
    ctx.shadowColor  = this.color;
    ctx.shadowBlur   = 9;
    ctx.fill();
    ctx.restore();
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DataPipeline() {
  const canvasRef  = useRef(null);
  const wrapRef    = useRef(null);
  const stateRef   = useRef({
    W: 800, H: 260, DPR: 1,
    nodePos: [], particles: [],
    activeNode: -1, hoverNode: -1,
    raf: null,
  });
  const [activeNode,  setActiveNode]  = useState(-1);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos,  setTooltipPos]  = useState({ x: 0, y: 0 });

  // ── Layout ──────────────────────────────────────────────────────────────────
  function computeLayout(W, H) {
    const positions = [];
    if (W < 500) {
      // 2 × 3 mobile grid
      const cols = 2, rows = 3, pX = 44, pY = 48;
      const cW = (W - pX * 2) / cols, rH = (H - pY * 2) / rows;
      STAGES.forEach((_, i) => {
        positions.push({
          x: pX + cW * (i % cols) + cW / 2,
          y: pY + rH * Math.floor(i / cols) + rH / 2,
        });
      });
    } else if (W < 800) {
      // 3 × 2 tablet grid
      const cols = 3, rows = 2, pX = 52, pY = 40;
      const cW = (W - pX * 2) / cols, rH = (H - pY * 2) / rows;
      STAGES.forEach((_, i) => {
        positions.push({
          x: pX + cW * (i % cols) + cW / 2,
          y: pY + rH * Math.floor(i / cols) + rH / 2,
        });
      });
    } else {
      // Single row desktop
      const pX = 64;
      const gap = (W - pX * 2) / (STAGES.length - 1);
      STAGES.forEach((_, i) => positions.push({ x: pX + gap * i, y: H / 2 }));
    }
    return positions;
  }

  function buildParticles(nodePos) {
    const ptcls = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      const path = bezierPts(nodePos[i].x, nodePos[i].y, nodePos[i+1].x, nodePos[i+1].y);
      for (let k = 0; k < 3; k++) ptcls.push(new Particle(path, k * 0.33));
    }
    return ptcls;
  }

  // ── Draw ────────────────────────────────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const s   = stateRef.current;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const { W, H } = s;

    ctx.clearRect(0, 0, W, H);

    // ── Background — split dark left / light right on desktop ──
    if (W >= 800) {
      ctx.fillStyle = C.night;
      ctx.fillRect(0, 0, W / 2, H);
      ctx.fillStyle = C.cream;
      ctx.fillRect(W / 2, 0, W / 2, H);
      // Subtle centre fade
      const fade = ctx.createLinearGradient(W/2 - 40, 0, W/2 + 40, 0);
      fade.addColorStop(0, "rgba(10,22,40,0.6)");
      fade.addColorStop(1, "rgba(240,232,213,0.6)");
      ctx.fillStyle = fade;
      ctx.fillRect(W/2 - 40, 0, 80, H);
    } else {
      // Mobile/tablet: alternating row backgrounds
      ctx.fillStyle = C.night;
      ctx.fillRect(0, 0, W, H);
    }

    // Adinkra texture overlay (dark side)
    // subtle dot grid on light side
    ctx.save();
    ctx.globalAlpha = 0.03;
    for (let gx = 0; gx < W; gx += 32)
      for (let gy = 0; gy < H; gy += 32) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = gx < W/2 ? C.gold : C.rust;
        ctx.fill();
      }
    ctx.restore();

    // ── Pipes ──
    for (let i = 0; i < STAGES.length - 1; i++) {
      const a = s.nodePos[i], b = s.nodePos[i + 1];
      if (!a || !b) continue;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.12;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(mx, my, b.x, b.y);
      ctx.strokeStyle = "rgba(212,169,106,0.18)";
      ctx.lineWidth   = 2.5;
      ctx.setLineDash([7, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead
      const t2 = 0.91;
      const px2 = (1-t2)*(1-t2)*a.x + 2*(1-t2)*t2*mx + t2*t2*b.x;
      const py2 = (1-t2)*(1-t2)*a.y + 2*(1-t2)*t2*my + t2*t2*b.y;
      const ang = Math.atan2(b.y - py2, b.x - px2);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(-11, -5); ctx.lineTo(0, 0); ctx.lineTo(-11, 5);
      ctx.strokeStyle = "rgba(244,185,66,0.55)";
      ctx.lineWidth   = 2;
      ctx.lineJoin    = "round";
      ctx.stroke();
      ctx.restore();
    }

    // ── Particles ──
    s.particles.forEach(p => { p.update(); p.draw(ctx); });

    // ── Nodes ──
    const isMobile = W < 500;
    const NW = isMobile ? 60 : 68, NH = isMobile ? 60 : 68;

    // Draw inactive first
    STAGES.forEach((node, i) => {
      if (i === s.activeNode) return;
      drawNode(ctx, node, s.nodePos[i], NW, NH, false, i === s.hoverNode, W);
    });
    // Active on top
    if (s.activeNode >= 0)
      drawNode(ctx, STAGES[s.activeNode], s.nodePos[s.activeNode], NW, NH, true, false, W);

    s.raf = requestAnimationFrame(drawFrame);
  }, []);

  function drawNode(ctx, node, pos, NW, NH, isActive, isHover, W) {
    if (!pos) return;
    const { x, y } = pos;
    const isDark = node.dark;
    const R = 11;

    // Glow
    if (isActive || isHover) {
      ctx.save();
      ctx.shadowColor = C.gold;
      ctx.shadowBlur  = isActive ? 26 : 14;
      roundRect(ctx, x - NW/2, y - NH/2, NW, NH, R);
      ctx.fillStyle = "transparent";
      ctx.fill();
      ctx.restore();
    }

    // Body gradient — dark nodes on dark bg, light nodes on light bg
    const g = ctx.createLinearGradient(x - NW/2, y - NH/2, x + NW/2, y + NH/2);
    if (isActive) {
      // Active: rich gold-tinted dark
      g.addColorStop(0, "#2e3d18"); g.addColorStop(1, "#1a2a08");
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2;
    } else if (isDark) {
      g.addColorStop(0, "#1e3258"); g.addColorStop(1, "#0f1e38");
      ctx.strokeStyle = isHover ? "rgba(244,185,66,.55)" : "rgba(244,185,66,.2)";
      ctx.lineWidth = 1;
    } else {
      g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#f0e8d5");
      ctx.strokeStyle = isHover ? "rgba(192,69,26,.6)" : "rgba(192,69,26,.22)";
      ctx.lineWidth = 1;
    }
    ctx.fillStyle = g;
    roundRect(ctx, x - NW/2, y - NH/2, NW, NH, R);
    ctx.fill(); ctx.stroke();

    // Top shine
    const shine = ctx.createLinearGradient(x, y - NH/2, x, y);
    shine.addColorStop(0, "rgba(255,255,255,0.14)");
    shine.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shine;
    roundRect(ctx, x - NW/2, y - NH/2, NW, NH/2, R);
    ctx.fill();

    // Corner gem (Ndebele accent)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + NW/2 - 13, y - NH/2);
    ctx.lineTo(x + NW/2,     y - NH/2);
    ctx.lineTo(x + NW/2,     y - NH/2 + 13);
    ctx.closePath();
    ctx.fillStyle = isDark
      ? "rgba(244,185,66,.5)"
      : "rgba(192,69,26,.38)";
    ctx.fill();
    ctx.restore();

    // Icon
    ctx.font = "20px serif";
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.icon, x, y - 7);

    // Stage number
    ctx.font         = `700 8px sans-serif`;
    ctx.fillStyle    = isActive ? C.gold : isDark ? "rgba(212,169,106,.72)" : C.rust;
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(String(node.id + 1).padStart(2, "0"), x, y + 14);

    // Label below
    const lines  = node.label.split("\n");
    const lblY   = y + NH/2 + 13;
    ctx.font      = `600 8px sans-serif`;
    ctx.fillStyle = isActive ? C.gold : isDark ? "rgba(212,169,106,.5)" : "rgba(10,22,40,.45)";
    lines.forEach((l, li) => ctx.fillText(l.toUpperCase(), x, lblY + li * 10));

    // Active ring
    if (isActive) {
      ctx.beginPath();
      ctx.arc(x, y, NW/2 + 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(244,185,66,.28)";
      ctx.lineWidth   = 7;
      ctx.stroke();
    }
  }

  // ── Resize ──────────────────────────────────────────────────────────────────
  const handleResize = useCallback(() => {
    const s   = stateRef.current;
    const cvs = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cvs || !wrap) return;

    const DPR = window.devicePixelRatio || 1;
    const W   = wrap.getBoundingClientRect().width || 800;
    const H   = W < 500 ? 380 : W < 800 ? 300 : 260;

    s.W = W; s.H = H; s.DPR = DPR;
    cvs.width  = W * DPR; cvs.height = H * DPR;
    cvs.style.width  = W + "px";
    cvs.style.height = H + "px";
    cvs.getContext("2d").setTransform(DPR, 0, 0, DPR, 0, 0);

    s.nodePos  = computeLayout(W, H);
    s.particles = buildParticles(s.nodePos);
  }, []);

  // ── Hit test ────────────────────────────────────────────────────────────────
  function getNodeAt(clientX, clientY) {
    const s   = stateRef.current;
    const cvs = canvasRef.current;
    if (!cvs) return -1;
    const rect = cvs.getBoundingClientRect();
    const mx   = (clientX - rect.left) * (s.W / rect.width);
    const my   = (clientY - rect.top)  * (s.H / rect.height);
    const NW   = s.W < 500 ? 62 : 70, NH = s.W < 500 ? 62 : 70;
    return s.nodePos.findIndex(p =>
      p && mx >= p.x - NW/2 - 8 && mx <= p.x + NW/2 + 8 &&
           my >= p.y - NH/2 - 8 && my <= p.y + NH/2 + 8
    );
  }

  function openTooltip(idx) {
    const s = stateRef.current;
    s.activeNode = idx;
    setActiveNode(idx);
    if (idx < 0) { setTooltipData(null); return; }
    const pos  = s.nodePos[idx];
    const NW   = s.W < 500 ? 62 : 70, NH = s.W < 500 ? 62 : 70;
    let tx = pos.x - 110;
    let ty = pos.y + NH/2 + 16;
    tx = Math.max(8, Math.min(tx, s.W - 240));
    if (ty + 200 > s.H) ty = pos.y - NH/2 - 210;
    setTooltipPos({ x: tx, y: ty });
    setTooltipData(STAGES[idx]);
  }

  // ── Events ──────────────────────────────────────────────────────────────────
  function handleClick(e) {
    const idx = getNodeAt(e.clientX, e.clientY);
    const s   = stateRef.current;
    openTooltip(idx === s.activeNode ? -1 : idx);
  }

  function handleMouseMove(e) {
    const idx = getNodeAt(e.clientX, e.clientY);
    stateRef.current.hoverNode = idx;
    canvasRef.current.style.cursor = idx >= 0 ? "pointer" : "default";
  }

  function handleMouseLeave() { stateRef.current.hoverNode = -1; }

  function handleTouch(e) {
    e.preventDefault();
    const t   = e.changedTouches[0];
    const idx = getNodeAt(t.clientX, t.clientY);
    const s   = stateRef.current;
    openTooltip(idx === s.activeNode ? -1 : idx);
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────
  useEffect(() => {
    handleResize();
    const s = stateRef.current;
    s.raf = requestAnimationFrame(drawFrame);
    let timer;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(handleResize, 120); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("resize", onResize);
    };
  }, [drawFrame, handleResize]);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <section id="how-it-works" style={{ width:"100%", padding:"60px 0", fontFamily:"'DM Sans',sans-serif" }}>

      {/* Google Fonts — move to index.html if preferred */}
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
        <div style={{ borderRadius:16, overflow:"hidden" }}>

          {/* ── Top Ndebele strip ── */}
          <div style={{ height:9, background:STRIP_TOP }} />

          {/* ── Header (dark) ── */}
          <div style={{ background:C.night, padding:"22px 28px 18px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:ADINKRA, pointerEvents:"none" }} />
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:4, color:C.sand,
              textTransform:"uppercase", marginBottom:6, opacity:.8 }}>
              Inkanyezi Technologies — Signal Architecture
            </p>
            <h2 style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(17px,3.5vw,24px)",
              fontWeight:700, color:C.ivory, lineHeight:1.2, margin:"0 0 10px" }}>
              We are the{" "}
              <em style={{ fontStyle:"italic", fontFamily:"'Cormorant Garamond',serif",
                color:C.gold, fontSize:"clamp(19px,4vw,28px)", fontWeight:300 }}>
                signal
              </em>{" "}
              in the noise
            </h2>
            {/* Interactive hint */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(244,185,66,.1)", border:"1px solid rgba(244,185,66,.28)",
              borderRadius:20, padding:"5px 14px" }}>
              <style>{`@keyframes inkHint{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.55)}}`}</style>
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.gold,
                animation:"inkHint 1.4s ease-in-out infinite", flexShrink:0 }} />
              <span style={{ fontSize:11, color:C.sand, letterSpacing:.5, fontWeight:500 }}>
                Tap any node to explore each pipeline stage
              </span>
            </div>
          </div>

          {/* ── Kente divider ── */}
          <div style={{ height:6, background:STRIP_KENTE }} />

          {/* ── Canvas diagram ── */}
          <div ref={wrapRef} style={{ position:"relative", width:"100%", background:C.night }}>
            <canvas
              ref={canvasRef}
              style={{ display:"block", width:"100%", height:"auto", touchAction:"none" }}
              onClick={handleClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchEnd={handleTouch}
            />

            {/* Tooltip */}
            {tooltipData && (
              <div style={{
                position:"absolute", left:tooltipPos.x, top:tooltipPos.y,
                zIndex:100, maxWidth:230, minWidth:190,
                animation:"tooltipIn .2s ease forwards",
                pointerEvents:"none",
              }}>
                <style>{`@keyframes tooltipIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
                <div style={{
                  background:"linear-gradient(135deg,#0d1e38,#0A1628)",
                  border:"1px solid rgba(244,185,66,.38)", borderRadius:10,
                  padding:"14px 16px",
                  boxShadow:"0 10px 36px rgba(0,0,0,.65)",
                }}>
                  {/* Arrow pointer */}
                  <div style={{ position:"absolute", top:-6, left:Math.min(110,tooltipPos.x > 8 ? 40 : 20),
                    width:0, height:0,
                    borderLeft:"6px solid transparent", borderRight:"6px solid transparent",
                    borderBottom:"6px solid rgba(244,185,66,.38)" }} />

                  <div style={{ display:"inline-block", fontFamily:"'Cinzel',serif",
                    fontSize:8, fontWeight:700, letterSpacing:1.5,
                    padding:"2px 9px", background:C.gold, color:C.night,
                    textTransform:"uppercase", marginBottom:8 }}>
                    {tooltipData.badge}
                  </div>
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:600,
                    color:C.ivory, lineHeight:1.45, marginBottom:7 }}>
                    {tooltipData.title}
                  </p>
                  <p style={{ fontSize:11.5, color:"rgba(250,246,238,.65)", lineHeight:1.8, marginBottom:10 }}>
                    {tooltipData.desc}
                  </p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {tooltipData.tags.map(([label, type]) => (
                      <span key={label} style={{
                        fontSize:9.5, fontWeight:500, letterSpacing:.4,
                        padding:"3px 9px", border:"1px solid", textTransform:"uppercase",
                        borderColor: TAG_STYLE[type].border,
                        color:       TAG_STYLE[type].color,
                        background:  TAG_STYLE[type].bg,
                      }}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Kente divider ── */}
          <div style={{ height:6, background:STRIP_KENTE }} />

          {/* ── Progress dots ── */}
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
            gap:8, padding:"12px 16px", background:C.night, flexWrap:"wrap" }}>
            {STAGES.map((_, i) => (
              <button key={i} onClick={() => openTooltip(i === activeNode ? -1 : i)} style={{
                width: i === activeNode ? 24 : 7, height:7,
                borderRadius: i === activeNode ? 3 : "50%",
                background: i === activeNode ? C.gold : "rgba(212,169,106,.22)",
                border:"none", cursor:"pointer", padding:0, transition:"all .22s ease",
              }} />
            ))}
          </div>

          {/* ── Bottom Ndebele strip ── */}
          <div style={{ height:9, background:STRIP_BOT }} />

        </div>
      </div>
    </section>
  );
}
