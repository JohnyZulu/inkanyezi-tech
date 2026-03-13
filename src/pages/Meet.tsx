// src/pages/Meet.tsx
// Drop this file into your Lovable project under src/pages/
// Then add the route in App.tsx: <Route path="/meet" element={<Meet />} />

import { useState, useEffect, useRef } from "react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Sanele Sishange
N:Sishange;Sanele;;;
ORG:Inkanyezi Technologies
TITLE:Founder & AI Automation Consultant
TEL:+27658804122
EMAIL:inkanyeziaisolutions3@gmail.com
URL:https://inkanyezi-tech.lovable.app
END:VCARD`;

const downloadVCard = () => {
  const blob = new Blob([VCARD], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "sanele-inkanyezi.vcf"; a.click();
  URL.revokeObjectURL(url);
};

const RadarRing = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0;
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, 120, 120);
      const cx = 60, cy = 60, r = 50;
      [50, 38, 26, 14].forEach((radius, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(244,185,66,${0.08 + i * 0.04})`;
        ctx.lineWidth = i === 0 ? 1.5 : 0.5;
        ctx.stroke();
      });
      ctx.strokeStyle = "rgba(244,185,66,0.12)";
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(cx - 55, cy); ctx.lineTo(cx + 55, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 55); ctx.lineTo(cx, cy + 55); ctx.stroke();
      const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      grad.addColorStop(0, "rgba(244,185,66,0.0)");
      grad.addColorStop(1, "rgba(244,185,66,0.35)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle - 1.2, angle, false);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.strokeStyle = "rgba(244,185,66,0.8)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#F4B942";
      ctx.fill();
      const blips = [[35, 25], [70, 45], [45, 70], [80, 30]];
      blips.forEach(([bx, by]) => {
        const blipAngle = Math.atan2(by - cy, bx - cx);
        const diff = ((angle - blipAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const alpha = diff < 1.2 ? 0.9 : Math.max(0, 0.4 - diff * 0.05);
        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${alpha})`;
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      angle = (angle + 0.025) % (Math.PI * 2);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} width={120} height={120} style={{ display: "block" }} />;
};

const PanelButton = ({ onClick, icon, label, sublabel, color, accent }: {
  onClick: () => void; icon: string; label: string; sublabel?: string; color: string; accent?: string;
}) => (
  <button onClick={onClick}
    className="relative flex flex-col items-center justify-center p-3 transition-all active:scale-95 group"
    style={{
      background: "linear-gradient(145deg, #0d1a2e, #080f1c)",
      border: `1px solid rgba(${color},0.25)`,
      borderRadius: "12px",
      boxShadow: `0 4px 15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(${color},0.1)`,
      minHeight: "72px"
    }}>
    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
      style={{ background: `rgb(${accent || color})`, boxShadow: `0 0 4px rgb(${accent || color})`, opacity: 0.8 }} />
    <div className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5"
      style={{ background: `radial-gradient(circle, rgba(${color},0.15) 0%, rgba(${color},0.02) 70%)`, border: `1px solid rgba(${color},0.3)`, boxShadow: `0 0 12px rgba(${color},0.2)` }}>
      <span style={{ fontSize: "16px" }}>{icon}</span>
    </div>
    <span className="font-mono text-center leading-tight" style={{ color: `rgb(${color})`, fontSize: "8px", letterSpacing: "0.1em" }}>{label}</span>
    {sublabel && <span className="font-mono text-center mt-0.5" style={{ color: "rgba(255,255,255,0.2)", fontSize: "7px" }}>{sublabel}</span>}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      style={{ background: `radial-gradient(circle at center, rgba(${color},0.08) 0%, transparent 70%)` }} />
  </button>
);

const EnergyRing = ({ size = 72, value, color, label }: { size?: number; value: number; color: string; label: string }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
          <circle cx={size/2} cy={size/2} r={r - 12} fill="none" stroke={`${color}22`} strokeWidth="1" strokeDasharray="3 4" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono font-bold" style={{ color, fontSize: "13px", lineHeight: 1 }}>{value}%</span>
        </div>
      </div>
      <span className="font-mono text-center" style={{ color: "rgba(255,255,255,0.35)", fontSize: "7px", letterSpacing: "0.1em" }}>{label}</span>
    </div>
  );
};

const HUDBar = ({ label, active = true }: { label: string; active?: boolean }) => (
  <div className="flex items-center gap-2 py-1">
    <div className="flex gap-0.5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-2.5 w-1 rounded-sm"
          style={{ background: i < 3 ? (active ? "#F4B942" : "rgba(244,185,66,0.2)") : "rgba(255,255,255,0.05)", boxShadow: i < 3 && active ? "0 0 4px #F4B942" : "none" }} />
      ))}
    </div>
    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(244,185,66,0.3), transparent)" }} />
    <span className="font-mono" style={{ color: active ? "rgba(244,185,66,0.6)" : "rgba(255,255,255,0.2)", fontSize: "8px", letterSpacing: "0.15em" }}>{label}</span>
    <div className="w-1.5 h-1.5 rounded-full"
      style={{ background: active ? "#00ff88" : "rgba(255,255,255,0.1)", boxShadow: active ? "0 0 4px #00ff88" : "none" }} />
  </div>
);

export default function Meet() {
  const [phase, setPhase] = useState(0);
  const [scanY, setScanY] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setTimeout(() => setPhase(1), 800);
    setTimeout(() => setPhase(2), 2200);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    let y = 0;
    const id = setInterval(() => { y += 3; setScanY(y); if (y > 100) clearInterval(id); }, 20);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 30% 20%, #0d1f0f 0%, #050d1a 40%, #0a0608 100%)" }}>

      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="fixed pointer-events-none" style={{ top: "10%", left: "5%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(244,185,66,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="fixed pointer-events-none" style={{ bottom: "15%", right: "5%", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 100}%`, width: i % 4 === 0 ? "2px" : "1px", height: i % 4 === 0 ? "2px" : "1px", background: i % 3 === 0 ? "#F4B942" : "#ffffff", opacity: 0.1 + (i % 6) * 0.04 }} />
        ))}
      </div>

      <div className="w-full max-w-sm relative z-10">
        {phase < 2 ? (
          <div className="relative rounded-2xl overflow-hidden"
            style={{ background: "#050d1a", border: "1px solid rgba(0,229,255,0.2)", minHeight: "200px" }}>
            {phase === 1 && (
              <div className="absolute left-0 right-0 h-0.5 pointer-events-none"
                style={{ top: `${scanY}%`, background: "linear-gradient(90deg, transparent, #00e5ff, transparent)", boxShadow: "0 0 20px #00e5ff", zIndex: 10 }} />
            )}
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 animate-spin"
                  style={{ borderColor: "rgba(244,185,66,0.2)", borderTopColor: "#F4B942", boxShadow: "0 0 20px rgba(244,185,66,0.3)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full" style={{ background: "radial-gradient(circle, #F4B942, #FF6B35)", boxShadow: "0 0 10px #F4B942" }} />
                </div>
              </div>
              <p className="font-mono text-xs animate-pulse" style={{ color: "#00e5ff", letterSpacing: "0.3em" }}>
                {phase === 0 ? "POWERING UP..." : "SCANNING IDENTITY..."}
              </p>
            </div>
          </div>
        ) : (
          <div className={`relative rounded-2xl overflow-hidden transition-all ${glitch ? "translate-x-0.5" : ""}`}
            style={{ background: "linear-gradient(160deg, #0a1628 0%, #070e1b 100%)", border: "1px solid rgba(244,185,66,0.15)", boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(244,185,66,0.04)" }}>

            <div className="relative px-4 pt-4 pb-3"
              style={{ background: "linear-gradient(180deg, rgba(0,229,255,0.04) 0%, transparent 100%)", borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
              <div className="absolute top-0 left-0 w-6 h-6" style={{ borderTop: "2px solid #00e5ff", borderLeft: "2px solid #00e5ff", opacity: 0.6 }} />
              <div className="absolute top-0 right-0 w-6 h-6" style={{ borderTop: "2px solid #F4B942", borderRight: "2px solid #F4B942", opacity: 0.6 }} />

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {["#00ff88", "#F4B942", "#00e5ff"].map((c, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c, boxShadow: `0 0 5px ${c}`, animationDelay: `${i * 0.3}s` }} />
                  ))}
                </div>
                <span className="font-mono" style={{ color: "rgba(0,229,255,0.5)", fontSize: "8px", letterSpacing: "0.2em" }}>INK-TECH · NODE-001</span>
                <div className="px-2 py-0.5 rounded" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
                  <span className="font-mono" style={{ color: "#00ff88", fontSize: "7px" }}>ONLINE</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 relative" style={{ width: "80px", height: "80px" }}>
                  <div style={{ transform: "scale(0.667)", transformOrigin: "top left" }}>
                    <RadarRing />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="28" height="28" viewBox="0 0 72 72" fill="none">
                      <line x1="36" y1="14" x2="54" y2="40" stroke="url(#gv2)" strokeWidth="1.5" opacity="0.7" />
                      <line x1="36" y1="14" x2="18" y2="40" stroke="url(#gv2)" strokeWidth="1.5" opacity="0.7" />
                      <line x1="18" y1="40" x2="54" y2="40" stroke="url(#gv2)" strokeWidth="1.5" opacity="0.7" />
                      <path d="M36 7 L37.8 12.2 L43.2 12.2 L38.9 15.4 L40.6 20.6 L36 17.4 L31.4 20.6 L33.1 15.4 L28.8 12.2 L34.2 12.2 Z" fill="url(#gv2)" />
                      <path d="M18 34.5 L19.4 38.6 L23.7 38.6 L20.3 41.1 L21.6 45.2 L18 42.7 L14.4 45.2 L15.7 41.1 L12.3 38.6 L16.6 38.6 Z" fill="url(#gv2)" opacity="0.8" />
                      <path d="M54 34.5 L55.4 38.6 L59.7 38.6 L56.3 41.1 L57.6 45.2 L54 42.7 L50.4 45.2 L51.7 41.1 L48.3 38.6 L52.6 38.6 Z" fill="url(#gv2)" opacity="0.8" />
                      <circle cx="36" cy="58" r="2.5" fill="url(#gv2)" opacity="0.7" />
                      <defs>
                        <linearGradient id="gv2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F4B942" /><stop offset="100%" stopColor="#FF6B35" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="font-mono mb-1" style={{ color: "rgba(0,229,255,0.4)", fontSize: "7px", letterSpacing: "0.25em" }}>// OPERATOR PROFILE</div>
                  <h1 className="font-bold text-white" style={{ fontFamily: "Georgia, serif", fontSize: "17px", textShadow: "0 0 20px rgba(244,185,66,0.3)" }}>
                    {glitch ? "S▓nele Sis▓ange" : "Sanele Sishange"}
                  </h1>
                  <p className="font-mono mt-0.5" style={{ color: "#F4B942", fontSize: "9px", letterSpacing: "0.05em" }}>
                    Founder · AI Automation Consultant
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(244,185,66,0.4), transparent)" }} />
                    <span className="font-mono" style={{ color: "rgba(255,255,255,0.25)", fontSize: "7px" }}>DBN · KZN · ZA</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 px-3 py-2"
                style={{ background: "rgba(244,185,66,0.04)", border: "1px solid rgba(244,185,66,0.12)", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                <div className="w-px h-4" style={{ background: "linear-gradient(180deg, #F4B942, #FF6B35)" }} />
                <span className="font-mono italic flex-1" style={{ color: "rgba(244,185,66,0.75)", fontSize: "9px" }}>
                  "We are the signal in the noise"
                </span>
                <span className="font-mono" style={{ color: "rgba(255,255,255,0.15)", fontSize: "7px" }}>INKANYEZI</span>
              </div>
            </div>

            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(244,185,66,0.08)", background: "rgba(0,0,0,0.15)" }}>
              <div className="font-mono mb-2" style={{ color: "rgba(0,229,255,0.3)", fontSize: "7px", letterSpacing: "0.2em" }}>// CAPABILITY MATRIX</div>
              <div className="flex justify-around">
                <EnergyRing size={72} value={96} color="#F4B942" label="AI CORE" />
                <EnergyRing size={72} value={88} color="#FF6B35" label="AUTOMATE" />
                <EnergyRing size={72} value={100} color="#00e5ff" label="SIGNAL" />
              </div>
            </div>

            <div className="px-4 py-2" style={{ borderBottom: "1px solid rgba(244,185,66,0.08)" }}>
              <HUDBar label="WHATSAPP AI · ACTIVE" active={true} />
              <HUDBar label="CHATBOT ENGINE · ONLINE" active={true} />
              <HUDBar label="AUTOMATION FLOWS · RUNNING" active={true} />
            </div>

            <div className="px-4 py-3">
              <div className="font-mono mb-2" style={{ color: "rgba(0,229,255,0.3)", fontSize: "7px", letterSpacing: "0.2em" }}>// INITIATE SEQUENCE</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <PanelButton onClick={downloadVCard} icon="👤" label="SAVE" sublabel="CONTACT" color="244,185,66" />
                <PanelButton onClick={() => window.open("https://wa.me/27658804122?text=Hi%20Sanele%2C%20I%27d%20like%20to%20learn%20more%20about%20Inkanyezi%20Technologies.", "_blank")} icon="💬" label="WHATSAPP" sublabel="CHANNEL" color="37,211,102" />
                <PanelButton onClick={() => window.open("https://inkanyezi-tech.lovable.app", "_blank")} icon="🌐" label="WEBSITE" sublabel="ACCESS" color="0,229,255" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <PanelButton onClick={() => window.open("https://inkanyezi-tech.lovable.app/#chat", "_blank")} icon="🤖" label="AI AGENT" sublabel="ENGAGE" color="244,185,66" />
                <PanelButton onClick={() => window.open("mailto:inkanyeziaisolutions3@gmail.com", "_blank")} icon="✉️" label="TRANSMIT" sublabel="MESSAGE" color="200,200,255" />
                <PanelButton onClick={() => window.open("https://www.linkedin.com/company/inkanyezi-technologies", "_blank")} icon="💼" label="NETWORK" sublabel="LINKEDIN" color="10,120,220" />
              </div>
            </div>

            <div className="px-4 py-2 flex justify-between items-center relative"
              style={{ borderTop: "1px solid rgba(0,229,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
              <div className="absolute bottom-0 left-0 w-5 h-5" style={{ borderBottom: "1px solid rgba(0,229,255,0.4)", borderLeft: "1px solid rgba(0,229,255,0.4)" }} />
              <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: "1px solid rgba(244,185,66,0.4)", borderRight: "1px solid rgba(244,185,66,0.4)" }} />
              <span className="font-mono" style={{ color: "rgba(255,255,255,0.12)", fontSize: "7px", letterSpacing: "0.2em" }}>SYS.VER 2.0.26</span>
              <span className="font-mono" style={{ color: "rgba(244,185,66,0.25)", fontSize: "7px", letterSpacing: "0.1em" }}>INKANYEZI · TECH</span>
              <span className="font-mono" style={{ color: "rgba(0,229,255,0.2)", fontSize: "7px" }}>ZA-DBN-001</span>
            </div>
          </div>
        )}

        <p className="text-center mt-3 font-mono" style={{ color: "rgba(255,255,255,0.1)", fontSize: "8px", letterSpacing: "0.25em" }}>
          ◈ INKANYEZI TECHNOLOGIES · SIGNAL IN THE NOISE ◈
        </p>
      </div>
    </div>
  );
}
