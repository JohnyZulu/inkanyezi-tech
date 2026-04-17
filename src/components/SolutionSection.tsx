// src/components/SolutionSection.tsx
// Inkanyezi Technologies — Services Section
// Full dark/light mode compatibility via injected CSS variables
// Architecture: Automate (Workflow + AI Agents + Voice Agents) · Learn · Grow

import { useEffect, useRef, useState } from "react";

// ── Brand colours — constant across both modes ────────────────────────────────
const B = {
  gold:   "#F4B942",
  orange: "#FF6B35",
  teal:   "#3A9E7E",
  violet: "#7B61FF",
  night:  "#0A1628",
  ivory:  "#FAF6EE",
};

// ── Theme-aware CSS injected once ─────────────────────────────────────────────
// Dark mode  → .dark   class on <html>
// Light mode → no .dark class on <html>
const THEME_CSS = `
  /* ── SolutionSection theme tokens ── */
  :root {
    --sol-bg:          #EEF2F8;
    --sol-card:        #FFFFFF;
    --sol-inner:       #E4EAF4;
    --sol-border:      rgba(10,22,64,.10);
    --sol-border-hover:rgba(10,22,64,.22);
    --sol-text-head:   #0A1628;
    --sol-text-body:   #2C4A6E;
    --sol-text-dim:    #6B88A8;
    --sol-tag-bg:      rgba(10,22,64,.04);
    --sol-tag-border:  rgba(10,22,64,.14);
    --sol-grid:        rgba(10,22,64,.025);
    --sol-wash1:       rgba(244,185,66,.06);
    --sol-wash2:       rgba(255,107,53,.04);
    --sol-wash3:       rgba(58,158,126,.03);
    --sol-eyebrow:     #6B88A8;
    --sol-banner-bg:   #0A1628;
    --sol-banner-text: #FAF6EE;
    --sol-cta-bg:      #0A1628;
    --sol-cta-text:    #FAF6EE;
    --sol-outcome-pain:#6B88A8;
    --sol-outcome-shift:#0A1628;
    --sol-tier-border: rgba(10,22,64,.08);
    --sol-tier-bg:     rgba(10,22,64,.02);
    --sol-tier-text:   #0A1628;
    --sol-tier-sub:    #2C4A6E;
    --sol-metric-num:  inherit;
    --sol-h2:          #0A1628;
    --sol-shadow:      rgba(10,22,40,.08);
    --sol-shadow-h:    rgba(10,22,40,.18);
  }
  html.dark {
    --sol-bg:          #0A1628;
    --sol-card:        #0D1E35;
    --sol-inner:       #0A1628;
    --sol-border:      rgba(255,255,255,.08);
    --sol-border-hover:rgba(255,255,255,.18);
    --sol-text-head:   #FAF6EE;
    --sol-text-body:   rgba(250,246,238,.65);
    --sol-text-dim:    rgba(212,169,106,.6);
    --sol-tag-bg:      rgba(255,255,255,.04);
    --sol-tag-border:  rgba(255,255,255,.10);
    --sol-grid:        rgba(255,255,255,.018);
    --sol-wash1:       rgba(244,185,66,.04);
    --sol-wash2:       rgba(255,107,53,.03);
    --sol-wash3:       rgba(58,158,126,.02);
    --sol-eyebrow:     rgba(212,169,106,.6);
    --sol-banner-bg:   rgba(255,255,255,.04);
    --sol-banner-text: #FAF6EE;
    --sol-cta-bg:      rgba(255,255,255,.06);
    --sol-cta-text:    #FAF6EE;
    --sol-outcome-pain:rgba(250,246,238,.38);
    --sol-outcome-shift:#FAF6EE;
    --sol-tier-border: rgba(255,255,255,.07);
    --sol-tier-bg:     rgba(255,255,255,.02);
    --sol-tier-text:   #FAF6EE;
    --sol-tier-sub:    rgba(250,246,238,.6);
    --sol-metric-num:  inherit;
    --sol-h2:          #FAF6EE;
    --sol-shadow:      rgba(0,0,0,.35);
    --sol-shadow-h:    rgba(0,0,0,.55);
  }
  /* Card header band adapts per service colour in dark mode */
  html.dark .sol-card-header {
    opacity: 0.9;
  }
  /* CTA hover — gold fill in dark, brand colour in light — handled inline */
`;

// ── Animated counter ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// ── Agent tier data ───────────────────────────────────────────────────────────
const AGENT_TYPES = [
  {
    id: "workflow",
    icon: "⚡",
    label: "Workflow Automation",
    color: B.gold,
    desc: "Pipelines that handle lead capture, WhatsApp follow-ups, document requests and CRM updates — triggered instantly, running continuously.",
    roles: ["Lead Qualifier", "Follow-up Engine", "Document Requester", "CRM Updater"],
  },
  {
    id: "agent",
    icon: "🤖",
    label: "AI Agents",
    color: B.violet,
    desc: "Autonomous agents that don't just respond — they reason, decide and act. Given a goal, they complete multi-step tasks independently across your systems.",
    roles: ["Sales Agent", "Operations Monitor", "Customer Service Agent", "Document Processor"],
  },
  {
    id: "voice",
    icon: "🎙️",
    label: "AI Voice Agents",
    color: B.teal,
    desc: "Your business answers the phone 24/7. Voice agents handle inbound calls, qualify leads, book appointments and escalate urgent matters — in any SA language.",
    roles: ["Receptionist Agent", "Appointment Booker", "Collections Agent", "Outbound Qualifier"],
  },
];

// ── Service data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "automate",
    num: "01",
    name: "Inkanyezi Automate",
    tagline: "Your business runs — with or without you",
    color: B.gold,
    metric: { value: 23, suffix: "hrs", label: "freed per staff member per week" },
    what: "We design and build the full automation stack — workflows, AI agents and voice agents — that handles your operations end-to-end. Your team focuses only on work that earns revenue.",
    outcomes: [
      { sector: "Tax & Accounting",     pain: "Chasing clients for documents manually",       shift: "Automated request sequences and follow-up chains" },
      { sector: "Trades & Services",    pain: "Quotes going unanswered overnight",             shift: "Instant WhatsApp responses at any hour" },
      { sector: "Legal & Professional", pain: "Matter intake consuming 3 hours a day",         shift: "Structured intake, file creation and billing — automatic" },
    ],
    tools: ["Make.com", "Gemini AI", "WhatsApp API", "Vapi.ai", "Google Sheets"],
    hasAgents: true,
  },
  {
    id: "learn",
    num: "02",
    name: "Inkanyezi Learn",
    tagline: "Your team becomes the unfair advantage",
    color: B.teal,
    metric: { value: 4, suffix: "days", label: "from zero to AI-capable team" },
    what: "Most AI training teaches tools. We teach business transformation. Programmes built around your actual workflows — in plain language, across all 11 SA official languages.",
    outcomes: [
      { sector: "Financial Services",  pain: "Staff doing manually what AI completes in seconds", shift: "Team-wide AI literacy with live workflow deployment" },
      { sector: "Healthcare & Clinics",pain: "Admin decisions pulling practitioners away",         shift: "Admin AI handles triage, scheduling and follow-ups" },
      { sector: "Education & Training",pain: "Enrolment admin overwhelming a small office",        shift: "Intake, matching and onboarding run without manual input" },
    ],
    tools: ["Workshops", "Custom Playbooks", "Loom Walkthroughs", "30-day Support"],
    hasAgents: false,
  },
  {
    id: "grow",
    num: "03",
    name: "Inkanyezi Grow",
    tagline: "Strategy built for the SA competitive landscape",
    color: B.orange,
    metric: { value: 6, suffix: "wks", label: "from audit to live system" },
    what: "A structured consulting engagement: operations audit, highest-leverage opportunity identification, ROI modelling and full system build — with you, not for you.",
    outcomes: [
      { sector: "Retail & Wholesale",      pain: "No visibility over stock, leads or team performance", shift: "Live dashboard: sales, inventory and pipeline in one view" },
      { sector: "Property & Letting",      pain: "Portfolio outgrowing admin capacity",                  shift: "Automated intake, tenant comms and renewal triggers" },
      { sector: "Transport & Logistics",   pain: "Quoting, dispatch and invoicing done manually",        shift: "Full operations pipeline — quote to proof of delivery" },
    ],
    tools: ["Operations Audit", "ROI Modelling", "Full Build", "Ongoing Advisory"],
    hasAgents: false,
  },
];

// ── Agent tier accordion ──────────────────────────────────────────────────────
function AgentTiers() {
  const [active, setActive] = useState<string | null>("workflow");
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{
        fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase",
        color: "var(--sol-text-dim)", marginBottom: 10,
        fontFamily: "'Cinzel', serif", fontWeight: 600,
      }}>
        Delivery tiers
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {AGENT_TYPES.map(ag => {
          const open = active === ag.id;
          return (
            <div
              key={ag.id}
              onClick={() => setActive(open ? null : ag.id)}
              style={{
                borderRadius: 10,
                border: `1.5px solid ${open ? ag.color + "55" : "var(--sol-tier-border)"}`,
                background: open ? `${ag.color}0f` : "var(--sol-tier-bg)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color .2s, background .2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{ag.icon}</span>
                <span style={{
                  flex: 1, fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 600,
                  color: open ? ag.color : "var(--sol-tier-text)",
                  letterSpacing: 0.3, transition: "color .2s",
                }}>
                  {ag.label}
                </span>
                <span style={{
                  fontSize: 12, color: open ? ag.color : "var(--sol-text-dim)",
                  transform: open ? "rotate(180deg)" : "none",
                  transition: "transform .2s, color .2s", display: "inline-block",
                }}>▾</span>
              </div>
              {open && (
                <div style={{ padding: "0 14px 14px" }}>
                  <p style={{
                    fontSize: 12.5, color: "var(--sol-tier-sub)",
                    lineHeight: 1.72, margin: "0 0 12px",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {ag.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {ag.roles.map(r => (
                      <span key={r} style={{
                        fontSize: 10, padding: "3px 10px",
                        background: `${ag.color}14`,
                        border: `1px solid ${ag.color}40`,
                        borderRadius: 20, color: ag.color,
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                      }}>
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Service card ──────────────────────────────────────────────────────────────
function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [visible, setVisible]       = useState(false);
  const [hovered, setHovered]       = useState(false);
  const [outcomeIdx, setOutcomeIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const metricVal = useCountUp(svc.metric.value, 1600, visible);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setOutcomeIdx(i => (i + 1) % svc.outcomes.length), 3200);
    return () => clearInterval(t);
  }, [svc.outcomes.length]);

  const cur = svc.outcomes[outcomeIdx];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 320px", minWidth: 300, maxWidth: 420,
        background: "var(--sol-card)",
        border: `1.5px solid ${hovered ? svc.color + "55" : "var(--sol-border)"}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(36px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        boxShadow: hovered
          ? `0 20px 56px var(--sol-shadow-h), 0 0 0 1px ${svc.color}22`
          : `0 4px 24px var(--sol-shadow)`,
      }}
    >
      {/* Top colour bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${svc.color}, ${svc.color}66)` }} />

      {/* Card header band */}
      <div
        className="sol-card-header"
        style={{
          background: `linear-gradient(135deg, ${svc.color}14, ${svc.color}06)`,
          padding: "20px 22px 16px",
          borderBottom: `1px solid ${svc.color}18`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
            letterSpacing: 3, color: `${svc.color}99`,
          }}>
            {svc.num} / 03
          </span>
          {/* Live metric */}
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 700,
              color: svc.color, lineHeight: 1,
            }}>
              {metricVal}{svc.metric.suffix}
            </div>
            <div style={{
              fontSize: 9, color: "var(--sol-text-dim)",
              letterSpacing: 0.5, fontFamily: "'DM Sans', sans-serif", marginTop: 2,
            }}>
              {svc.metric.label}
            </div>
          </div>
        </div>
        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(17px,2.5vw,21px)",
          fontWeight: 700, color: "var(--sol-text-head)",
          margin: "12px 0 4px", lineHeight: 1.2,
        }}>
          {svc.name}
        </h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: 13.5,
          color: svc.color, margin: 0, opacity: 0.9,
        }}>
          {svc.tagline}
        </p>
      </div>

      {/* Card body */}
      <div style={{ padding: "18px 22px 20px" }}>
        <p style={{
          fontSize: 13, color: "var(--sol-text-body)",
          lineHeight: 1.75, margin: "0 0 16px",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {svc.what}
        </p>

        {/* Agent tiers accordion — Automate only */}
        {svc.hasAgents && <AgentTiers />}

        {/* Rotating industry outcome */}
        <div style={{
          background: "var(--sol-inner)",
          borderRadius: 10, padding: "12px 14px", marginBottom: 16,
          borderLeft: `3px solid ${svc.color}`,
        }}>
          <p style={{
            fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase",
            color: svc.color, marginBottom: 5,
            fontFamily: "'Cinzel', serif", fontWeight: 600,
          }}>
            {cur.sector}
          </p>
          <p style={{
            fontSize: 11.5, color: "var(--sol-outcome-pain)",
            margin: "0 0 4px", fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
          }}>
            "{cur.pain}"
          </p>
          <p style={{
            fontSize: 12.5, color: "var(--sol-outcome-shift)",
            fontWeight: 600, margin: 0, fontFamily: "'DM Sans', sans-serif",
          }}>
            → {cur.shift}
          </p>
          {/* Progress dots */}
          <div style={{ display: "flex", gap: 4, marginTop: 10 }}>
            {svc.outcomes.map((_, i) => (
              <div
                key={i}
                onClick={() => setOutcomeIdx(i)}
                style={{
                  width: i === outcomeIdx ? 16 : 5, height: 5, borderRadius: 3,
                  background: i === outcomeIdx ? svc.color : `${svc.color}30`,
                  transition: "all .25s", cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* Tool tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
          {svc.tools.map(t => (
            <span key={t} style={{
              fontSize: 9.5, letterSpacing: 0.4, padding: "3px 10px",
              border: `1px solid ${svc.color}35`,
              borderRadius: 20, color: "var(--sol-text-body)",
              background: `${svc.color}0a`,
              fontFamily: "'DM Sans', sans-serif",
              textTransform: "uppercase",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <a href="#contact" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: hovered ? svc.color : "var(--sol-cta-bg)",
          borderRadius: 10, padding: "12px 16px",
          textDecoration: "none",
          transition: "background .25s ease",
          border: `1px solid ${hovered ? svc.color : "var(--sol-border)"}`,
        }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
            letterSpacing: 1.5,
            color: hovered ? B.night : "var(--sol-cta-text)",
            textTransform: "uppercase",
            transition: "color .25s",
          }}>
            Start {svc.name.split(" ")[1]}
          </span>
          <span style={{
            fontSize: 16,
            color: hovered ? B.night : svc.color,
            transition: "color .25s",
          }}>→</span>
        </a>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SolutionSection() {
  const [headerVis, setHeaderVis] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Inject theme CSS once
  useEffect(() => {
    if (!document.getElementById("sol-theme-css")) {
      const el = document.createElement("style");
      el.id = "sol-theme-css";
      el.textContent = THEME_CSS;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const el = headerRef.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVis(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{
      width: "100%",
      background: "var(--sol-bg)",
      padding: "80px 0 90px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      transition: "background .3s ease",
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(var(--sol-grid) 1px, transparent 1px),
          linear-gradient(90deg, var(--sol-grid) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* Brand colour washes */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse at 15% 25%, var(--sol-wash1) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 75%, var(--sol-wash2) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, var(--sol-wash3) 0%, transparent 55%)
        `,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative" }}>

        {/* ── Header ── */}
        <div ref={headerRef} style={{
          marginBottom: 52,
          opacity: headerVis ? 1 : 0,
          transform: headerVis ? "none" : "translateY(20px)",
          transition: "opacity .65s ease, transform .65s ease",
        }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 36, height: 1.5, background: B.gold, borderRadius: 1 }} />
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 4,
              color: "var(--sol-eyebrow)", textTransform: "uppercase",
            }}>
              Consulting-led · AI-delivered · SA-focused
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(26px,5vw,46px)",
            fontWeight: 700, color: "var(--sol-h2)",
            lineHeight: 1.1, margin: "0 0 14px", maxWidth: 680,
          }}>
            Three engagements.{" "}
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(30px,5.5vw,52px)",
              background: `linear-gradient(90deg, ${B.gold}, ${B.orange})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              One compounding system.
            </span>
          </h2>

          <p style={{
            fontSize: "clamp(13px,1.8vw,15px)",
            color: "var(--sol-text-body)", lineHeight: 1.78,
            maxWidth: 620, margin: "0 0 20px",
          }}>
            We are not a software company selling subscriptions. We are a consulting firm
            that uses AI as a precision instrument — diagnosing the real operational problem
            first, then building exactly what solves it.
          </p>

          {/* Agents callout banner */}
          <div style={{
            display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: 10,
            background: "var(--sol-banner-bg)",
            borderRadius: 12, padding: "12px 18px",
            border: `1px solid ${B.violet}33`,
          }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
              color: "var(--sol-banner-text)", letterSpacing: 0.5,
            }}>
              Now including AI Agents + AI Voice Agents
            </span>
            <span style={{
              fontSize: 11, color: "var(--sol-text-dim)",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              — autonomous systems that reason, decide and act on your behalf
            </span>
            <span style={{
              fontSize: 9, padding: "2px 8px",
              background: `${B.violet}22`,
              border: `1px solid ${B.violet}44`,
              borderRadius: 20, color: B.violet,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, letterSpacing: 0.5,
            }}>
              NEW
            </span>
          </div>
        </div>

        {/* ── Cards ── */}
        <div style={{
          display: "flex", gap: 20, flexWrap: "wrap",
          justifyContent: "center", alignItems: "flex-start",
        }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>

        {/* ── Industry footer ── */}
        <div style={{
          textAlign: "center", marginTop: 52,
          opacity: headerVis ? 1 : 0,
          transition: "opacity .7s ease .5s",
        }}>
          <p style={{
            fontSize: 11, color: "var(--sol-text-dim)",
            letterSpacing: 1, fontFamily: "'Cinzel', serif",
            textTransform: "uppercase", marginBottom: 12,
          }}>
            All three engagements available independently — or as a full operational transformation
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            {["Tax & Accounting","Trades","Retail","Legal","Healthcare","Finance","Education","Property","Transport","Events","Agriculture","NPO"].map(ind => (
              <span key={ind} style={{
                fontSize: 9.5, padding: "3px 10px",
                border: "1px solid var(--sol-tag-border)",
                borderRadius: 20, color: "var(--sol-text-dim)",
                background: "var(--sol-tag-bg)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
