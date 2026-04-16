// src/pages/Meet.tsx
// Inkanyezi Technologies — Digital Business Card
// Route: /meet

import { useState, useEffect, useRef } from "react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Sanele Sishange
N:Sishange;Sanele;;;
ORG:Inkanyezi Technologies
TITLE:Founder & AI Automation Consultant
TEL;TYPE=CELL,WHATSAPP:+27658804122
EMAIL:inkanyeziaisolutions3@gmail.com
URL:https://inkanyezi-tech-murex.vercel.app/meet
ADR;TYPE=WORK:;;Durban;KwaZulu-Natal;;South Africa
NOTE:AI Automation for South African SMEs. We are the signal in the noise.
END:VCARD`;

function downloadVCard() {
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Sanele-Sishange-Inkanyezi.vcf";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── WHITE BACKGROUND WITH GOLD AI STARS ──────────────────────────────
// Stars are 4-pointed sparkles on a white/cream background
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 4-pointed sparkle star path
    function drawSparkle(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number,
      r: number, opacity: number, color: string
    ) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      // 4-pointed star using quadratic bezier
      const r2 = r * 0.2;
      ctx.moveTo(cx, cy - r);
      ctx.quadraticCurveTo(cx + r2, cy - r2, cx + r, cy);
      ctx.quadraticCurveTo(cx + r2, cy + r2, cx, cy + r);
      ctx.quadraticCurveTo(cx - r2, cy + r2, cx - r, cy);
      ctx.quadraticCurveTo(cx - r2, cy - r2, cx, cy - r);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 5 + 2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.005,
      gold: Math.random() > 0.35, // mix of gold and light orange
      drift: (Math.random() - 0.5) * 0.0002,
    }));

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        s.pulse += s.speed;
        s.x += s.drift;
        if (s.x < -0.05) s.x = 1.05;
        if (s.x > 1.05) s.x = -0.05;

        const op = 0.12 + 0.45 * Math.abs(Math.sin(s.pulse));
        const color = s.gold
          ? `rgba(212, 158, 40, ${op})`      // warm gold
          : `rgba(255, 140, 30, ${op * 0.7})`; // orange accent
        const size = s.r * (0.7 + 0.3 * Math.abs(Math.sin(s.pulse)));
        drawSparkle(ctx, s.x * W, s.y * H, size, 1, color);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ── 3D GAMING BUTTON ─────────────────────────────────────────────────
// Distinguishes scroll from tap using touchmove detection
function GameBtn({
  icon, label, sub, onClick, accent = "#F4B942", primary = false, fullWidth = false,
}: {
  icon: string; label: string; sub: string; onClick: () => void;
  accent?: string; primary?: boolean; fullWidth?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const touchMoved = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Parse accent colour for rgba usage
  const hex = accent.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const floorColor = `rgba(${r},${g},${b},0.55)`;
  const glowColor  = `rgba(${r},${g},${b},0.35)`;
  const bgColor    = primary
    ? `linear-gradient(145deg, rgba(${r},${g},${b},0.22), rgba(${r},${g},${b},0.10))`
    : `linear-gradient(145deg, rgba(10,22,40,0.92), rgba(8,18,34,0.96))`;

  const shadow = pressed
    ? `0 1px 0 ${floorColor}, 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
    : hovered
    ? `0 6px 0 ${floorColor}, 0 10px 24px rgba(0,0,0,0.45), 0 0 20px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.10)`
    : `0 4px 0 ${floorColor}, 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`;

  const transform = pressed
    ? "translateY(3px) scale(0.985)"
    : hovered
    ? "translateY(-2px) scale(1.01)"
    : "translateY(0) scale(1)";

  return (
    <button
      // Mouse events (desktop)
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); }}
      onClick={onClick}

      // Touch events — only fire onClick if finger didn't move (scroll detection)
      onTouchStart={(e) => {
        touchMoved.current = false;
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setPressed(true);
      }}
      onTouchMove={(e) => {
        if (touchStart.current) {
          const dx = Math.abs(e.touches[0].clientX - touchStart.current.x);
          const dy = Math.abs(e.touches[0].clientY - touchStart.current.y);
          if (dx > 8 || dy > 8) {
            touchMoved.current = true;
            setPressed(false);
          }
        }
      }}
      onTouchEnd={(e) => {
        setPressed(false);
        if (!touchMoved.current) {
          e.preventDefault(); // prevent ghost click
          onClick();
        }
        touchStart.current = null;
      }}

      style={{
        width: fullWidth ? "100%" : "auto",
        display: "flex", alignItems: "center", gap: 14,
        padding: "13px 16px",
        borderRadius: 14,
        border: `1.5px solid rgba(${r},${g},${b},${hovered ? 0.6 : pressed ? 0.3 : 0.2})`,
        background: bgColor,
        cursor: "pointer", textAlign: "left",
        transform, boxShadow: shadow,
        transition: "transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s ease, border-color 0.2s ease",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        position: "relative", overflow: "hidden",
        WebkitTapHighlightColor: "transparent",
        touchAction: "pan-y", // allow vertical scroll, not horizontal
      }}
    >
      {/* Scanline overlay — gaming aesthetic */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        borderRadius: 13,
      }} />

      {/* Hover shimmer */}
      {hovered && !pressed && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(105deg, transparent 30%, rgba(${r},${g},${b},0.12) 50%, transparent 70%)`,
          animation: "btnShimmer 0.5s ease forwards",
          pointerEvents: "none",
        }} />
      )}

      {/* Icon badge */}
      <div style={{
        width: 44, height: 44, borderRadius: 11, flexShrink: 0,
        background: `linear-gradient(145deg, rgba(${r},${g},${b},0.28), rgba(${r},${g},${b},0.12))`,
        border: `1.5px solid rgba(${r},${g},${b},0.45)`,
        boxShadow: `0 3px 8px rgba(${r},${g},${b},0.25), inset 0 1px 0 rgba(255,255,255,0.15)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 21,
        transform: pressed ? "scale(0.92)" : hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.15s ease",
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
          fontSize: "0.86rem",
          color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.92)",
          letterSpacing: "0.01em",
          transition: "color 0.2s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          textShadow: hovered ? `0 0 12px rgba(${r},${g},${b},0.5)` : "none",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif", fontSize: "0.5rem",
          color: hovered ? `rgba(${r},${g},${b},1)` : "rgba(255,255,255,0.35)",
          letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2,
          transition: "color 0.2s",
        }}>
          {sub}
        </div>
      </div>

      {/* Chevron arrow */}
      <div style={{
        width: 24, height: 24, borderRadius: 6, flexShrink: 0,
        background: `rgba(${r},${g},${b},${hovered ? 0.25 : 0.08})`,
        border: `1px solid rgba(${r},${g},${b},${hovered ? 0.5 : 0.15})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.2s ease",
      }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5h6M5 2l3 3-3 3" stroke={accent} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            opacity={hovered ? 1 : 0.5} />
        </svg>
      </div>
    </button>
  );
}

// ── SA HERITAGE STRIP ─────────────────────────────────────────────────
function HeritageStrip({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center", ...style }}>
      {[["#007A4D",10],["#FFB612",10],["#DE3831",18],["#002395",10],["#FFFFFF",10]].map(([c,w],i) => (
        <div key={i} style={{
          width: w as number, height: 3, background: c as string, borderRadius: 2,
          boxShadow: `0 0 6px ${c}80`, opacity: 0.9,
        }} />
      ))}
    </div>
  );
}

// ── NDEBELE BORDER ────────────────────────────────────────────────────
function NdebeleBorder() {
  const colours = ["#F4B942","#0A1628","#FF6B35","#0A1628","#007A4D","#0A1628","#DE3831","#0A1628","#002395","#0A1628","#FFB612","#0A1628"];
  return (
    <div style={{ display: "flex", height: 5, width: "100%", overflow: "hidden" }}>
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} style={{ flex: 1, background: colours[i % colours.length], minWidth: 0 }} />
      ))}
    </div>
  );
}

// ── STAT RING ─────────────────────────────────────────────────────────
function StatRing({ value, label, color, delay = 0 }: { value: number; label: string; color: string; delay?: number }) {
  const [current, setCurrent] = useState(0);
  const r = 26;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const t = setTimeout(() => {
      let v = 0;
      const step = setInterval(() => {
        v = Math.min(v + 2, value);
        setCurrent(v);
        if (v >= value) clearInterval(step);
      }, 18);
      return () => clearInterval(step);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  const hex = color.replace("#","");
  const cr = parseInt(hex.slice(0,2),16);
  const cg = parseInt(hex.slice(2,4),16);
  const cb = parseInt(hex.slice(4,6),16);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{
        position: "relative", width: 64, height: 64,
        filter: `drop-shadow(0 0 8px rgba(${cr},${cg},${cb},0.5))`,
      }}>
        <svg width="64" height="64" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - current / 100)}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", fontWeight: 600, color,
        }}>
          {current}
        </div>
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif", fontSize: "0.5rem",
        color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em",
        textTransform: "uppercase", textAlign: "center",
      }}>
        {label}
      </div>
    </div>
  );
}

// ── QR CODE ───────────────────────────────────────────────────────────
function QRCode({ url }: { url: string }) {
  return (
    <div style={{
      background: "white", borderRadius: 12, padding: 10, display: "inline-block",
      boxShadow: "0 0 0 1px rgba(244,185,66,0.4), 0 8px 24px rgba(0,0,0,0.35)",
    }}>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=0A1628&margin=2`}
        alt="QR Code" width={120} height={120}
        style={{ display: "block", borderRadius: 6 }}
      />
    </div>
  );
}

// ── SECTION CARD ─────────────────────────────────────────────────────
function Card({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      background: "linear-gradient(160deg, rgba(12,28,58,0.97) 0%, rgba(8,18,40,0.99) 100%)",
      border: "1px solid rgba(244,185,66,0.12)",
      boxShadow: "0 4px 0 rgba(244,185,66,0.15), 0 8px 40px rgba(0,0,0,0.25), 0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      animation: "fadeUp 0.5s ease forwards", opacity: 0,
      animationDelay: `${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── SECTION LABEL ────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{
      padding: "13px 18px 9px",
      fontFamily: "'Outfit', sans-serif", fontSize: "0.4rem",
      letterSpacing: "0.24em", color: "rgba(255,255,255,0.22)",
      textTransform: "uppercase",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      {text}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────
export default function Meet() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText("https://inkanyezi-tech-murex.vercel.app/meet");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          /* White / warm cream background */
          background: linear-gradient(160deg, #FFFDF7 0%, #F8F4EC 50%, #FFF8EE 100%);
          min-height: 100vh;
          overflow-x: hidden;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes btnShimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }
        @keyframes floatStar {
          0%,100% { transform: translateY(0) scale(1);    opacity: 0.6; }
          50%     { transform: translateY(-6px) scale(1.1); opacity: 1; }
        }
      `}</style>

      {/* White background with gold sparkle stars */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(160deg, #FFFDF7 0%, #F5F0E8 100%)", zIndex: 0 }} />
      <StarField />

      {/* Page */}
      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh", padding: "20px 0 60px",
        display: "flex", justifyContent: "center", alignItems: "flex-start",
      }}>
        <div style={{ width: "100%", maxWidth: 420, padding: "0 14px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* ── HERO CARD ── */}
          <Card delay={0.05}>
            <NdebeleBorder />
            <div style={{
              height: 2,
              background: "linear-gradient(90deg, transparent, #F4B942, #FF6B35, #F4B942, transparent)",
              backgroundSize: "200% 100%", animation: "gradientShift 4s linear infinite",
            }} />

            <div style={{ padding: "24px 20px 20px" }}>
              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: "0.55rem",
                  letterSpacing: "0.14em", color: "#F4B942", opacity: 0.85,
                }}>
                  Inkanyezi Technologies
                </div>
                <HeritageStrip />
              </div>

              {/* Avatar + name */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    position: "absolute", inset: -7, borderRadius: "50%",
                    border: "1.5px solid rgba(244,185,66,0.5)",
                    animation: "pulseRing 2.5s ease-out infinite",
                  }} />
                  <div style={{
                    position: "absolute", inset: -7, borderRadius: "50%",
                    border: "1.5px solid rgba(244,185,66,0.3)",
                    animation: "pulseRing 2.5s ease-out infinite", animationDelay: "0.9s",
                  }} />
                  <div style={{
                    width: 70, height: 70, borderRadius: "50%", position: "relative", zIndex: 1,
                    background: "linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.2rem", color: "#0A1628",
                    boxShadow: "0 0 0 3px rgba(244,185,66,0.3), 0 8px 24px rgba(244,185,66,0.35)",
                  }}>
                    SS
                  </div>
                  <div style={{
                    position: "absolute", bottom: 2, right: 2, width: 14, height: 14,
                    borderRadius: "50%", background: "#22C55E",
                    border: "2px solid #0A1628", zIndex: 2,
                    boxShadow: "0 0 8px rgba(34,197,94,0.7)",
                  }} />
                </div>

                {/* Name */}
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 700,
                    fontSize: "1.55rem", color: "#FFFFFF", lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  }}>
                    Sanele<br />Sishange
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem",
                    color: "#F4B942", letterSpacing: "0.08em",
                    textTransform: "uppercase", lineHeight: 1.5, marginTop: 5,
                  }}>
                    Founder & AI Automation<br />Consultant
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.32)", letterSpacing: "0.08em", marginTop: 3,
                  }}>
                    Durban, KZN · South Africa 🇿🇦
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontSize: "0.88rem", color: "rgba(255,255,255,0.52)", textAlign: "center",
                padding: "13px 0",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                marginBottom: 18, lineHeight: 1.5,
              }}>
                "We are the{" "}
                <span style={{
                  background: "linear-gradient(90deg, #F4B942, #FF6B35)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text", fontStyle: "normal", fontWeight: 700,
                }}>
                  signal
                </span>
                {" "}in the noise."
              </div>

              {/* Stat rings */}
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <StatRing value={92} label="AI Core"  color="#F4B942" delay={400} />
                <StatRing value={88} label="Automate" color="#FF6B35" delay={600} />
                <StatRing value={96} label="Signal"   color="#22C55E" delay={800} />
              </div>
            </div>

            <NdebeleBorder />
          </Card>

          {/* ── CONNECT ── */}
          <Card delay={0.18}>
            <SectionLabel text="Connect" />
            <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7 }}>
              <GameBtn icon="👤" label="Save My Contact" sub="vCard · Tap to add to phone"
                onClick={downloadVCard} accent="#F4B942" primary fullWidth />
              <GameBtn icon="💬" label="WhatsApp"
                sub="+27 65 880 4122 · Open comms"
                onClick={() => window.open("https://wa.me/27658804122?text=Sawubona%21%20I%20scanned%20your%20card%20and%20would%20love%20to%20connect.","_blank")}
                accent="#22C55E" fullWidth />
              <GameBtn icon="🤖" label="Chat with InkanyeziBot"
                sub="AI Automation Demo · Live now"
                onClick={() => window.open("https://inkanyezi-tech-murex.vercel.app/#chat","_blank")}
                accent="#FF6B35" fullWidth />
              <GameBtn icon="🌐" label="Visit Website"
                sub="inkanyezi-tech-murex.vercel.app"
                onClick={() => window.open("https://inkanyezi-tech-murex.vercel.app","_blank")}
                accent="#00C8FF" fullWidth />
            </div>
          </Card>

          {/* ── EMAIL + LINKEDIN ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Card delay={0.28} style={{ borderRadius: 16 }}>
              <div style={{ padding: "8px" }}>
                <GameBtn icon="✉️" label="Email" sub="Transmit message"
                  onClick={() => window.open("mailto:inkanyeziaisolutions3@gmail.com?subject=Hello%20from%20your%20card","_blank")}
                  accent="#818CF8" fullWidth />
              </div>
            </Card>
            <Card delay={0.32} style={{ borderRadius: 16 }}>
              <div style={{ padding: "8px" }}>
                <GameBtn icon="💼" label="LinkedIn" sub="Professional node"
                  onClick={() => window.open("https://www.linkedin.com/in/sanele-sishange","_blank")}
                  accent="#0A66C2" fullWidth />
              </div>
            </Card>
          </div>

          {/* ── SERVICES ── */}
          <Card delay={0.38}>
            <SectionLabel text="Services" />
            <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon:"⚙️", name:"Inkanyezi Automate", desc:"AI chatbots, lead capture & workflow automation for SA SMEs", color:"#F4B942" },
                { icon:"🎓", name:"Inkanyezi Learn",    desc:"AI literacy training — upskill your team for the future",   color:"#22C55E" },
                { icon:"📈", name:"Inkanyezi Grow",     desc:"AI strategy consulting — competitive intelligence & growth", color:"#FF6B35" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  padding: "11px 12px", borderRadius: 11,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: `0 3px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                    background: `${s.color}18`, border: `1px solid ${s.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    boxShadow: `0 2px 0 ${s.color}20`,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:'0.75rem', color:s.color, marginBottom:2 }}>{s.name}</div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:"0.75rem", color:"rgba(255,255,255,0.42)", lineHeight:1.4 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ── QR BEACON ── */}
          <Card delay={0.48}>
            <SectionLabel text="✦ Signal Beacon" />
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
                <QRCode url="https://inkanyezi-tech-murex.vercel.app/meet" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:'0.82rem', color:"#FFFFFF", marginBottom:5, lineHeight:1.3 }}>
                    Scan to open this card
                  </div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:300, fontSize:"0.72rem", color:"rgba(255,255,255,0.4)", lineHeight:1.5, marginBottom:11 }}>
                    Save contact details and connect directly.
                  </div>
                  <button
                    onClick={copyLink}
                    style={{
                      fontFamily:"'Outfit',sans-serif", fontSize:"0.58rem", letterSpacing:"0.08em",
                      color: copied ? "#22C55E" : "#F4B942",
                      background: copied ? "rgba(34,197,94,0.1)" : "rgba(244,185,66,0.1)",
                      border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(244,185,66,0.3)"}`,
                      boxShadow: `0 3px 0 ${copied ? "rgba(34,197,94,0.2)" : "rgba(244,185,66,0.2)"}`,
                      borderRadius: 8, padding: "7px 12px", cursor: "pointer",
                      transition: "all 0.2s ease", textTransform: "uppercase",
                    }}
                  >
                    {copied ? "✓ Copied!" : "Copy link"}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* ── FOOTER ── */}
          <div style={{ textAlign: "center", padding: "4px 8px", animation: "fadeUp 0.5s ease forwards", opacity: 0, animationDelay: "0.6s" }}>
            <HeritageStrip style={{ justifyContent: "center", marginBottom: 8 }} />
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.52rem", letterSpacing:"0.12em", color:"rgba(10,22,40,0.3)", textTransform:"uppercase" }}>
              Inkanyezi Technologies · Durban, KZN · POPIA Compliant
            </div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.58rem", letterSpacing:"0.1em", color:"rgba(212,158,40,0.5)", marginTop:3 }}>
              inkanyezi-tech-murex.vercel.app
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
