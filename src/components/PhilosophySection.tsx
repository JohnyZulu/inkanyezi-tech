// src/components/PhilosophySection.tsx
// Inkanyezi Technologies — About / Philosophy Section
// Full dark/light mode compatibility via injected CSS variables

import { useEffect, useRef, useState } from "react";

const B = {
  gold:   "#F4B942",
  orange: "#FF6B35",
  teal:   "#3A9E7E",
  night:  "#0A1628",
  ivory:  "#FAF6EE",
  sand:   "#D4A96A",
};

// ── Theme CSS ─────────────────────────────────────────────────────────────────
const PHIL_CSS = `
  :root {
    --phil-bg:          #0A1628;
    --phil-card:        rgba(255,255,255,.025);
    --phil-card-border: rgba(255,255,255,.07);
    --phil-stat-card:   rgba(255,255,255,.025);
    --phil-stat-border: rgba(244,185,66,.15);
    --phil-text-head:   #FAF6EE;
    --phil-text-body:   rgba(250,246,238,.55);
    --phil-text-dim:    rgba(212,169,106,.5);
    --phil-founder-bg:  rgba(255,255,255,.03);
    --phil-founder-bd:  rgba(244,185,66,.18);
    --phil-lang-border: rgba(244,185,66,.18);
    --phil-lang-text:   rgba(212,169,106,.55);
    --phil-lang-bg:     transparent;
    --phil-lang-note:   rgba(250,246,238,.3);
    --phil-divider:     rgba(244,185,66,.15);
    --phil-pillar-card: rgba(255,255,255,.025);
    --phil-cta-bg:      rgba(255,255,255,.025);
    --phil-cta-border:  rgba(244,185,66,.15);
    --phil-cta-text:    #FAF6EE;
    --phil-cta-sub:     rgba(250,246,238,.4);
    --phil-coords:      rgba(212,169,106,.12);
  }
  html.dark {
    --phil-bg:          #0A1628;
    --phil-card:        rgba(255,255,255,.025);
    --phil-card-border: rgba(255,255,255,.07);
    --phil-stat-card:   rgba(255,255,255,.025);
    --phil-stat-border: rgba(244,185,66,.15);
    --phil-text-head:   #FAF6EE;
    --phil-text-body:   rgba(250,246,238,.55);
    --phil-text-dim:    rgba(212,169,106,.5);
    --phil-founder-bg:  rgba(255,255,255,.03);
    --phil-founder-bd:  rgba(244,185,66,.18);
    --phil-lang-border: rgba(244,185,66,.18);
    --phil-lang-text:   rgba(212,169,106,.55);
    --phil-lang-bg:     transparent;
    --phil-lang-note:   rgba(250,246,238,.3);
    --phil-divider:     rgba(244,185,66,.15);
    --phil-pillar-card: rgba(255,255,255,.025);
    --phil-cta-bg:      rgba(255,255,255,.025);
    --phil-cta-border:  rgba(244,185,66,.15);
    --phil-cta-text:    #FAF6EE;
    --phil-cta-sub:     rgba(250,246,238,.4);
    --phil-coords:      rgba(212,169,106,.12);
  }
  html:not(.dark) {
    --phil-bg:          #EEF2F8;
    --phil-card:        rgba(255,255,255,.7);
    --phil-card-border: rgba(10,22,64,.09);
    --phil-stat-card:   rgba(255,255,255,.8);
    --phil-stat-border: rgba(244,185,66,.3);
    --phil-text-head:   #0A1628;
    --phil-text-body:   #2C4A6E;
    --phil-text-dim:    #6B88A8;
    --phil-founder-bg:  rgba(10,22,64,.04);
    --phil-founder-bd:  rgba(244,185,66,.35);
    --phil-lang-border: rgba(244,185,66,.35);
    --phil-lang-text:   #2C4A6E;
    --phil-lang-bg:     rgba(10,22,64,.03);
    --phil-lang-note:   #6B88A8;
    --phil-divider:     rgba(10,22,64,.12);
    --phil-pillar-card: rgba(255,255,255,.75);
    --phil-cta-bg:      #0A1628;
    --phil-cta-border:  #0A1628;
    --phil-cta-text:    #FAF6EE;
    --phil-cta-sub:     rgba(250,246,238,.65);
    --phil-coords:      rgba(10,22,64,.08);
  }
`;

// ── Animated stat ─────────────────────────────────────────────────────────────
function AnimStat({ val, suffix, label, color, active }: {
  val: number; suffix: string; label: string; color: string; active: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1400, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * val));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, val]);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Cinzel', serif", fontSize: 30, fontWeight: 700,
        color, lineHeight: 1,
        textShadow: `0 0 20px ${color}44`,
      }}>
        {n}{suffix}
      </div>
      <div style={{
        fontSize: 10, color: "var(--phil-text-dim)",
        letterSpacing: 1.5, textTransform: "uppercase",
        marginTop: 4, fontFamily: "'DM Sans', sans-serif",
      }}>
        {label}
      </div>
    </div>
  );
}

// ── Philosophy pillars ────────────────────────────────────────────────────────
const PILLARS = [
  {
    num: "I", name: "Signal", subtitle: "Cut through the noise", color: B.gold,
    body: "Most SA businesses are drowning in admin, missed leads and manual processes. We identify the exact signal — the highest-leverage automation opportunity — and build a system around it. Not a product. A solution shaped for your specific business.",
    icon: `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="#F4B942" stroke-width="1" opacity="0.3"/><circle cx="16" cy="16" r="7" stroke="#F4B942" stroke-width="1" opacity="0.5"/><circle cx="16" cy="16" r="3" fill="#F4B942"/><line x1="16" y1="4" x2="16" y2="8" stroke="#F4B942" stroke-width="1.5" stroke-linecap="round"/><line x1="16" y1="24" x2="16" y2="28" stroke="#F4B942" stroke-width="1.5" stroke-linecap="round"/><line x1="4" y1="16" x2="8" y2="16" stroke="#F4B942" stroke-width="1.5" stroke-linecap="round"/><line x1="24" y1="16" x2="28" y2="16" stroke="#F4B942" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    num: "II", name: "System", subtitle: "Build once, run forever", color: B.teal,
    body: "We don't consult and leave. We architect pipelines, agents and voice systems that run automatically — capturing leads, qualifying prospects, sending responses and booking meetings — while you focus on the work only you can do.",
    icon: `<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="8" height="8" rx="2" fill="#3A9E7E" opacity="0.3" stroke="#3A9E7E" stroke-width="1"/><rect x="20" y="10" width="8" height="8" rx="2" fill="#3A9E7E" opacity="0.3" stroke="#3A9E7E" stroke-width="1"/><rect x="12" y="20" width="8" height="8" rx="2" fill="#3A9E7E" opacity="0.5" stroke="#3A9E7E" stroke-width="1"/><line x1="12" y1="14" x2="20" y2="14" stroke="#3A9E7E" stroke-width="1.5"/><line x1="8" y1="18" x2="14" y2="22" stroke="#3A9E7E" stroke-width="1.5"/><line x1="24" y1="18" x2="18" y2="22" stroke="#3A9E7E" stroke-width="1.5"/></svg>`,
  },
  {
    num: "III", name: "Scale", subtitle: "Compound your advantage", color: B.orange,
    body: "The first automation creates capacity. That capacity funds the second. The second creates data. The data sharpens the third. Every Inkanyezi engagement is designed to compound — each system making the next one more powerful.",
    icon: `<svg viewBox="0 0 32 32" fill="none"><polyline points="4,24 10,16 16,19 22,10 28,6" stroke="#FF6B35" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="6" r="2.5" fill="#FF6B35"/><line x1="4" y1="26" x2="28" y2="26" stroke="#FF6B35" stroke-width="0.8" opacity="0.3"/></svg>`,
  },
];

// ── Main section ──────────────────────────────────────────────────────────────
export default function PhilosophySection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Inject theme CSS once
  useEffect(() => {
    if (!document.getElementById("phil-theme-css")) {
      const el = document.createElement("style");
      el.id = "phil-theme-css";
      el.textContent = PHIL_CSS;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      width: "100%",
      background: "var(--phil-bg)",
      padding: "90px 0 100px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      transition: "background .3s ease",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Ambient glow — same values, just more visible in light */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse at 10% 50%, rgba(244,185,66,.05) 0%, transparent 45%),
          radial-gradient(ellipse at 90% 20%, rgba(58,158,126,.04) 0%, transparent 45%),
          radial-gradient(ellipse at 60% 80%, rgba(255,107,53,.03) 0%, transparent 40%)
        `,
      }} />

      {/* Coordinates watermark */}
      <div style={{
        position: "absolute", bottom: 24, right: 24,
        fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 3,
        color: "var(--phil-coords)", textTransform: "uppercase",
        pointerEvents: "none",
      }}>
        29°51′S 31°01′E · Durban, KwaZulu-Natal
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Top split: story left, stats right ── */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap", gap: 32, marginBottom: 64,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "opacity .7s ease, transform .7s ease",
        }}>

          {/* Left: story */}
          <div style={{ flex: "1 1 400px", maxWidth: 560 }}>
            {/* Classification badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid var(--phil-stat-border)`,
              borderRadius: 6, padding: "5px 12px", marginBottom: 24,
              background: "var(--phil-stat-card)",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#27C93F", boxShadow: "0 0 8px #27C93F" }} />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 3, color: "var(--phil-text-dim)", textTransform: "uppercase" }}>
                Signal Intelligence · Inkanyezi Technologies
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(24px,4.5vw,40px)",
              fontWeight: 700, color: "var(--phil-text-head)",
              lineHeight: 1.1, margin: "0 0 10px",
            }}>
              Built from the inside{" "}
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(28px,5vw,46px)",
                background: `linear-gradient(90deg, ${B.gold}, ${B.orange})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                display: "block",
              }}>
                of SA business.
              </span>
            </h2>

            <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "var(--phil-text-body)", lineHeight: 1.8, margin: "0 0 18px" }}>
              Inkanyezi Technologies is a Durban-based AI automation consultancy led by
              Sanele Sishange — a Business Trainer, AI literacy facilitator and automation
              engineer with direct experience inside SA corporate and SME operations.
              The practice was built from years of watching businesses lose leads, revenue
              and competitive advantage to admin that should never have been manual.
            </p>
            <p style={{ fontSize: "clamp(13px,1.8vw,15px)", color: "var(--phil-text-body)", lineHeight: 1.8, margin: "0 0 24px" }}>
              The name{" "}
              <em style={{ color: B.gold, fontStyle: "normal", fontWeight: 600 }}>Inkanyezi</em>
              {" "}— isiZulu for{" "}
              <em style={{ color: B.gold, fontStyle: "italic" }}>star</em>
              {" "}— reflects the consulting philosophy: every SA business already has a signal
              worth amplifying. Our work is building the infrastructure that ensures the
              market receives it — clearly, consistently, and without the business owner
              having to be online 24 hours a day.
            </p>

            {/* Founder chip */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "var(--phil-founder-bg)",
              border: `1px solid var(--phil-founder-bd)`,
              borderRadius: 12, padding: "10px 14px",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                background: `linear-gradient(135deg, ${B.gold}, ${B.orange})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 13,
                color: B.night, flexShrink: 0,
                boxShadow: `0 0 16px ${B.gold}44`,
              }}>SS</div>
              <div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 600, color: "var(--phil-text-head)" }}>
                  Sanele Sishange
                </div>
                <div style={{ fontSize: 10, color: "var(--phil-text-dim)", marginTop: 2 }}>
                  Founder & AI Automation Consultant · Durban, KZN
                </div>
              </div>
            </div>
          </div>

          {/* Right: stats + languages */}
          <div style={{ flex: "1 1 280px", maxWidth: 340, display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Stats panel */}
            <div style={{
              background: "var(--phil-stat-card)",
              border: `1px solid var(--phil-stat-border)`,
              borderRadius: 16, padding: "24px 20px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${B.gold}, ${B.orange})`,
              }} />
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 3,
                color: "var(--phil-text-dim)", textTransform: "uppercase",
                marginBottom: 20, opacity: 0.85,
              }}>
                Engagement profile
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 12px" }}>
                <AnimStat val={15} suffix="+" label="Industries served" color={B.gold}   active={vis} />
                <AnimStat val={48} suffix="hr" label="First system live"  color={B.teal}  active={vis} />
                <AnimStat val={24} suffix="hr" label="Response guarantee" color={B.orange} active={vis} />
                <AnimStat val={100} suffix="%" label="SA-based delivery"  color={B.sand}  active={vis} />
              </div>
            </div>

            {/* SA languages panel */}
            <div style={{
              background: "var(--phil-stat-card)",
              border: `1px solid var(--phil-card-border)`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 2.5,
                color: "var(--phil-text-dim)", textTransform: "uppercase", marginBottom: 10,
              }}>
                Rooted in South Africa
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["isiZulu", "Afrikaans", "isiXhosa", "Sesotho", "Setswana", "+6 more"].map(l => (
                  <span key={l} style={{
                    fontSize: 9.5, padding: "3px 8px",
                    border: `1px solid var(--phil-lang-border)`,
                    borderRadius: 20, color: "var(--phil-lang-text)",
                    background: "var(--phil-lang-bg)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{l}</span>
                ))}
              </div>
              <p style={{
                fontSize: 11, color: "var(--phil-lang-note)",
                lineHeight: 1.6, margin: "10px 0 0",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Every pipeline explanation available in all 11 SA official languages.
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 44,
          opacity: vis ? 1 : 0, transition: "opacity .7s ease .3s",
        }}>
          <div style={{ flex: 1, height: 1, background: "var(--phil-divider)" }} />
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 4,
            color: "var(--phil-text-dim)", textTransform: "uppercase",
            opacity: 0.7, whiteSpace: "nowrap",
          }}>
            The signal framework
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--phil-divider)" }} />
        </div>

        {/* ── Three pillars ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
          {PILLARS.map((p, i) => (
            <div key={p.num} style={{
              flex: "1 1 260px",
              background: "var(--phil-pillar-card)",
              border: `1px solid ${p.color}22`,
              borderRadius: 16, padding: "28px 24px",
              position: "relative", overflow: "hidden",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(30px)",
              transition: `opacity .6s ease ${0.35 + i * 0.12}s, transform .6s ease ${0.35 + i * 0.12}s`,
            }}>
              {/* Glow corner */}
              <div style={{
                position: "absolute", top: -30, right: -30,
                width: 80, height: 80, borderRadius: "50%",
                background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: `${p.color}66` }}>
                  {p.num}
                </span>
                <div style={{ width: 32, height: 32 }} dangerouslySetInnerHTML={{ __html: p.icon }} />
              </div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, color: "var(--phil-text-head)", margin: "0 0 4px" }}>
                {p.name}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 13, color: p.color, margin: "0 0 16px", opacity: 0.85 }}>
                {p.subtitle}
              </p>
              <p style={{ fontSize: 13, color: "var(--phil-text-body)", lineHeight: 1.78, margin: 0 }}>
                {p.body}
              </p>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${p.color}44, transparent)`,
              }} />
            </div>
          ))}
        </div>

        {/* ── Final CTA strip ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20, padding: "28px 32px",
          background: "var(--phil-cta-bg)",
          border: `1px solid var(--phil-cta-border)`,
          borderRadius: 16,
          opacity: vis ? 1 : 0,
          transition: "opacity .7s ease .6s",
        }}>
          <div>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(15px,2.5vw,20px)",
              fontWeight: 700, color: "var(--phil-cta-text)",
              margin: "0 0 5px",
            }}>
              Ready to become the signal?
            </p>
            <p style={{ fontSize: 13, color: "var(--phil-cta-sub)", margin: 0 }}>
              Free 30-minute discovery call · No commitment · Durban-based, SA-focused
            </p>
          </div>
          <a href="https://cal.com/sanele-inkanyezi" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "13px 26px",
            background: `linear-gradient(135deg, ${B.gold}, ${B.orange})`,
            borderRadius: 10, textDecoration: "none",
            fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700,
            letterSpacing: 1.5, color: B.night, textTransform: "uppercase",
            boxShadow: `0 8px 28px ${B.gold}44`,
            whiteSpace: "nowrap",
          }}>
            Book a Free Call →
          </a>
        </div>

      </div>
    </section>
  );
}
