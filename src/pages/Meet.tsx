// src/pages/Meet.tsx
// Inkanyezi Technologies — Digital Business Card
// Route: /meet
// Design: Afrofuturist luxury — SA heritage × deep space × 3D depth
// NO Lovable tagger, all URLs → inkanyezitech.co.za

import { useState, useEffect, useRef } from "react";

// ── VCARD ─────────────────────────────────────────────────────────────
const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Sanele Sishange
N:Sishange;Sanele;;;
ORG:Inkanyezi Technologies
TITLE:Founder & AI Automation Consultant
TEL;TYPE=CELL,WHATSAPP:+27658804122
EMAIL:inkanyeziaisolutions3@gmail.com
URL:https://inkanyezi-tech-murex.vercel.app/
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

// ── CONSTELLATION BACKGROUND ──────────────────────────────────────────
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

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      op: Math.random() * 0.6 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
      gold: Math.random() > 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.pulse += s.speed;
        const op = s.op * (0.5 + 0.5 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(244,185,66,${op})`
          : `rgba(200,220,255,${op})`;
        ctx.fill();
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ── ACTION BUTTON ─────────────────────────────────────────────────────
function ActionBtn({
  icon,
  label,
  sub,
  onClick,
  accent = "#F4B942",
  primary = false,
  fullWidth = false,
}: {
  icon: string;
  label: string;
  sub: string;
  onClick: () => void;
  accent?: string;
  primary?: boolean;
  fullWidth?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => { setPressed(false); onClick(); }}
      style={{
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 14,
        border: `1px solid ${hovered ? accent : "rgba(255,255,255,0.08)"}`,
        background: primary
          ? `linear-gradient(135deg, ${accent}22 0%, ${accent}11 100%)`
          : pressed
          ? "rgba(255,255,255,0.04)"
          : hovered
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.03)",
        cursor: "pointer",
        textAlign: "left",
        transform: pressed
          ? "translateY(2px) scale(0.98)"
          : hovered
          ? "translateY(-2px)"
          : "translateY(0)",
        boxShadow: pressed
          ? "none"
          : hovered
          ? `0 8px 32px ${accent}25, 0 0 0 1px ${accent}30`
          : "0 2px 8px rgba(0,0,0,0.3)",
        transition:
          "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(105deg, transparent 40%, ${accent}15 50%, transparent 60%)`,
            animation: "shimmer 0.6s ease forwards",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon badge */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 11,
          background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
          border: `1px solid ${accent}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
          boxShadow: `0 4px 12px ${accent}20`,
          transition: "all 0.2s ease",
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.88rem",
            color: hovered ? "#FFFFFF" : "rgba(255,255,255,0.90)",
            letterSpacing: "0.01em",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.58rem",
            color: hovered ? accent : "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 2,
            transition: "color 0.2s",
          }}
        >
          {sub}
        </div>
      </div>

      {/* Arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{
          flexShrink: 0,
          opacity: hovered ? 1 : 0.25,
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "all 0.2s ease",
        }}
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ── SA HERITAGE STRIP ─────────────────────────────────────────────────
function HeritageStrip({ style }: { style?: React.CSSProperties }) {
  const colours = ["#007A4D", "#FFB612", "#DE3831", "#002395", "#FFFFFF"];
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        ...style,
      }}
    >
      {colours.map((c, i) => (
        <div
          key={i}
          style={{
            width: i === 2 ? 18 : 10,
            height: 3,
            background: c,
            borderRadius: 2,
            boxShadow: `0 0 6px ${c}80`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

// ── NDEBELE BORDER PATTERN ────────────────────────────────────────────
function NdebeleBorder() {
  const colours = [
    "#F4B942", "#0A1628", "#FF6B35", "#0A1628",
    "#007A4D", "#0A1628", "#DE3831", "#0A1628",
    "#002395", "#0A1628", "#FFB612", "#0A1628",
  ];
  return (
    <div
      style={{
        display: "flex",
        height: 5,
        width: "100%",
        overflow: "hidden",
        borderRadius: "2px 2px 0 0",
      }}
    >
      {Array.from({ length: 48 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: colours[i % colours.length],
            minWidth: 0,
          }}
        />
      ))}
    </div>
  );
}

// ── STAT RING ─────────────────────────────────────────────────────────
function StatRing({
  value,
  label,
  color,
  delay = 0,
}: {
  value: number;
  label: string;
  color: string;
  delay?: number;
}) {
  const [current, setCurrent] = useState(0);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const stroke = circ * (1 - current / 100);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div style={{ position: "relative", width: 64, height: 64 }}>
        {/* Background track */}
        <svg
          width="64"
          height="64"
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          <circle
            cx="32" cy="32" r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <circle
            cx="32" cy="32" r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={stroke}
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />
        </svg>
        {/* Value */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: color,
          }}
        >
          {current}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.5rem",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── QR CODE ───────────────────────────────────────────────────────────
function QRCode({ url }: { url: string }) {
  const encoded = encodeURIComponent(url);
  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        padding: 10,
        display: "inline-block",
        boxShadow: "0 0 0 1px rgba(244,185,66,0.3), 0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encoded}&bgcolor=ffffff&color=0A1628&margin=2`}
        alt="QR Code"
        width={120}
        height={120}
        style={{ display: "block", borderRadius: 6 }}
      />
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────
export default function Meet() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText("https://inkanyezi-tech-murex.vercel.app/");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060C1A;
          min-height: 100vh;
          overflow-x: hidden;
        }

        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-section {
          animation: fadeIn 0.6s ease forwards;
          opacity: 0;
        }

        /* Perspective 3D card effect */
        .card-3d {
          transform-style: preserve-3d;
          perspective: 1200px;
        }
      `}</style>

      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(13,30,53,0.9) 0%, rgba(6,12,26,1) 60%)",
          zIndex: 0,
        }}
      />
      <StarField />

      {/* Page scroll container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          padding: "24px 0 60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "0 16px",
          }}
        >

          {/* ── HERO CARD ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.1s",
              borderRadius: 24,
              overflow: "hidden",
              background:
                "linear-gradient(160deg, rgba(18,36,68,0.95) 0%, rgba(10,22,40,0.98) 100%)",
              border: "1px solid rgba(244,185,66,0.15)",
              boxShadow:
                "0 0 0 1px rgba(244,185,66,0.08), 0 24px 80px rgba(0,0,0,0.7), 0 8px 32px rgba(244,185,66,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Ndebele top border */}
            <NdebeleBorder />

            {/* Gold shimmer top line */}
            <div
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, #F4B942, #FF6B35, #F4B942, transparent)",
                backgroundSize: "200% 100%",
                animation: "gradientShift 4s linear infinite",
              }}
            />

            {/* Card inner */}
            <div style={{ padding: "28px 24px 24px" }}>

              {/* Company badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.52rem",
                    letterSpacing: "0.22em",
                    color: "#F4B942",
                    textTransform: "uppercase",
                    opacity: 0.8,
                  }}
                >
                  Inkanyezi Technologies
                </div>
                <HeritageStrip />
              </div>

              {/* Avatar + name section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 18,
                  marginBottom: 22,
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {/* Pulse rings */}
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(244,185,66,0.4)",
                      animation: "pulse-ring 2.5s ease-out infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(244,185,66,0.25)",
                      animation: "pulse-ring 2.5s ease-out infinite",
                      animationDelay: "0.8s",
                    }}
                  />
                  {/* Avatar circle */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      color: "#0A1628",
                      boxShadow:
                        "0 0 0 3px rgba(244,185,66,0.25), 0 8px 24px rgba(244,185,66,0.3)",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    SS
                  </div>
                  {/* Online dot */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "#22C55E",
                      border: "2px solid #0A1628",
                      zIndex: 2,
                      boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                    }}
                  />
                </div>

                {/* Name & title */}
                <div style={{ flex: 1, paddingTop: 4 }}>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.55rem",
                      color: "#FFFFFF",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      textShadow: "0 0 30px rgba(244,185,66,0.15)",
                    }}
                  >
                    Sanele
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.55rem",
                      color: "#FFFFFF",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      marginBottom: 6,
                    }}
                  >
                    Sishange
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#F4B942",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      lineHeight: 1.5,
                    }}
                  >
                    Founder & AI Automation
                    <br />
                    Consultant
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.52rem",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.08em",
                      marginTop: 4,
                    }}
                  >
                    Durban, KZN · South Africa 🇿🇦
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.55)",
                  textAlign: "center",
                  padding: "14px 0",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  marginBottom: 20,
                  lineHeight: 1.5,
                }}
              >
                "We are the{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #F4B942, #FF6B35)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontStyle: "normal",
                    fontWeight: 700,
                  }}
                >
                  signal
                </span>{" "}
                in the noise."
              </div>

              {/* Stats rings */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: 8,
                }}
              >
                <StatRing value={92} label="AI Core"   color="#F4B942" delay={400} />
                <StatRing value={88} label="Automate"  color="#FF6B35" delay={600} />
                <StatRing value={96} label="Signal"    color="#22C55E" delay={800} />
              </div>
            </div>

            {/* Ndebele bottom border */}
            <NdebeleBorder />
          </div>

          {/* ── CONTACT ACTIONS ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.25s",
              marginTop: 16,
              borderRadius: 20,
              background:
                "rgba(10,22,40,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            {/* Section label */}
            <div
              style={{
                padding: "14px 18px 10px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              Connect
            </div>

            <div
              style={{
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {/* Save contact — primary CTA */}
              <ActionBtn
                icon="👤"
                label="Save My Contact"
                sub="vCard · Tap to add to phone"
                onClick={downloadVCard}
                accent="#F4B942"
                primary
                fullWidth
              />
              <ActionBtn
                icon="💬"
                label="WhatsApp"
                sub="+27 65 880 4122 · Open comms"
                onClick={() =>
                  window.open(
                    "https://wa.me/27658804122?text=Sawubona%21%20I%20scanned%20your%20card%20and%20would%20love%20to%20connect.",
                    "_blank"
                  )
                }
                accent="#22C55E"
                fullWidth
              />
              <ActionBtn
                icon="🤖"
                label="Chat with InkanyeziBot"
                sub="AI Automation Demo · Live now"
                onClick={() =>
                  window.open("https://inkanyezi-tech-murex.vercel.app/", "_blank")
                }
                accent="#FF6B35"
                fullWidth
              />
              <ActionBtn
                icon="🌐"
                label="Visit Website"
                sub="inkanyezitech.co.za"
                onClick={() =>
                  window.open("https://inkanyezi-tech-murex.vercel.app/", "_blank")
                }
                accent="#00E5FF"
                fullWidth
              />
            </div>
          </div>

          {/* ── SECONDARY ACTIONS ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.35s",
              marginTop: 10,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <ActionBtn
              icon="✉️"
              label="Email"
              sub="Transmit message"
              onClick={() =>
                window.open(
                  "mailto:inkanyeziaisolutions3@gmail.com?subject=Hello%20from%20your%20card",
                  "_blank"
                )
              }
              accent="#818CF8"
              fullWidth
            />
            <ActionBtn
              icon="💼"
              label="LinkedIn"
              sub="Professional node"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/sanele-sishange",
                  "_blank"
                )
              }
              accent="#0A66C2"
              fullWidth
            />
          </div>

          {/* ── WHAT WE DO ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.45s",
              marginTop: 16,
              borderRadius: 20,
              background: "rgba(10,22,40,0.75)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                padding: "14px 18px 10px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              Services
            </div>

            <div
              style={{
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                {
                  icon: "⚙️",
                  name: "Inkanyezi Automate",
                  desc: "AI chatbots, lead capture & workflow automation for SA SMEs",
                  color: "#F4B942",
                },
                {
                  icon: "🎓",
                  name: "Inkanyezi Learn",
                  desc: "AI literacy training — upskill your team for the future",
                  color: "#22C55E",
                },
                {
                  icon: "📈",
                  name: "Inkanyezi Grow",
                  desc: "AI strategy consulting — competitive intelligence & growth",
                  color: "#FF6B35",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        color: s.color,
                        marginBottom: 3,
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.4,
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── QR SIGNAL BEACON ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.55s",
              marginTop: 16,
              borderRadius: 20,
              background: "rgba(10,22,40,0.75)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "20px",
              boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ Signal Beacon
            </div>

            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "center",
              }}
            >
              <QRCode url="https://inkanyezi-tech-murex.vercel.app/" />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    color: "#FFFFFF",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  Scan to open this card
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  Save contact details and connect directly.
                </div>
                <button
                  onClick={copyLink}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.08em",
                    color: copied ? "#22C55E" : "#F4B942",
                    background: copied
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(244,185,66,0.1)",
                    border: `1px solid ${copied ? "rgba(34,197,94,0.3)" : "rgba(244,185,66,0.3)"}`,
                    borderRadius: 8,
                    padding: "7px 12px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    textTransform: "uppercase",
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy link"}
                </button>
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div
            className="card-section"
            style={{
              animationDelay: "0.65s",
              marginTop: 24,
              textAlign: "center",
              padding: "0 8px",
            }}
          >
            <HeritageStrip
              style={{ justifyContent: "center", marginBottom: 10 }}
            />
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.18)",
                textTransform: "uppercase",
              }}
            >
              Inkanyezi Technologies · Durban, KZN · POPIA Compliant
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.48rem",
                letterSpacing: "0.12em",
                color: "rgba(244,185,66,0.25)",
                marginTop: 4,
              }}
            >
              https://inkanyezi-tech-murex.vercel.app/
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
