// src/pages/Meet.tsx
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

const CosmicRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let angle = 0, raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, 120, 120);
      const cx = 60, cy = 60;
      ([[50,"rgba(244,185,66,0.15)",1.5],[38,"rgba(255,107,53,0.12)",0.8],[26,"rgba(244,185,66,0.18)",0.6],[14,"rgba(0,229,255,0.15)",0.5]] as [number,string,number][]).forEach(([r,c,w]) => {
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.strokeStyle=c; ctx.lineWidth=w; ctx.stroke();
      });
      ctx.strokeStyle="rgba(244,185,66,0.08)"; ctx.lineWidth=0.5;
      ctx.beginPath(); ctx.moveTo(cx-55,cy); ctx.lineTo(cx+55,cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,cy-55); ctx.lineTo(cx,cy+55); ctx.stroke();
      const sw = ctx.createLinearGradient(cx,cy,cx+Math.cos(angle)*50,cy+Math.sin(angle)*50);
      sw.addColorStop(0,"rgba(244,185,66,0.0)"); sw.addColorStop(1,"rgba(244,185,66,0.45)");
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,50,angle-1.0,angle,false); ctx.closePath(); ctx.fillStyle=sw; ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(angle)*50,cy+Math.sin(angle)*50);
      ctx.strokeStyle="rgba(244,185,66,0.9)"; ctx.lineWidth=1.5; ctx.stroke();
      const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,6);
      cg.addColorStop(0,"#F4B942"); cg.addColorStop(1,"#FF6B35");
      ctx.beginPath(); ctx.arc(cx,cy,4,0,Math.PI*2); ctx.fillStyle=cg; ctx.shadowColor="#F4B942"; ctx.shadowBlur=10; ctx.fill(); ctx.shadowBlur=0;
      ([[35,25],[70,45],[45,70],[80,30],[25,60]] as [number,number][]).forEach(([bx,by]) => {
        const ba = Math.atan2(by-cy,bx-cx);
        const diff = ((angle-ba)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
        const alpha = diff<1.0?0.95:Math.max(0,0.3-diff*0.05);
        ctx.beginPath(); ctx.arc(bx,by,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(0,229,255,${alpha})`; ctx.shadowColor="#00e5ff"; ctx.shadowBlur=6; ctx.fill(); ctx.shadowBlur=0;
      });
      angle=(angle+0.022)%(Math.PI*2); raf=requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={canvasRef} width={120} height={120} style={{display:"block"}}/>;
};

const EnergyRing = ({ size=72, value, color, label }: { size?: number; value: number; color: string; label: string }) => {
  const r=(size-12)/2, circ=2*Math.PI*r, dash=(value/100)*circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{width:size,height:size}}>
        <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"/>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{filter:`drop-shadow(0 0 6px ${color})`}}/>
          <circle cx={size/2} cy={size/2} r={r-11} fill="none" stroke={`${color}30`} strokeWidth="1" strokeDasharray="2 3"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold" style={{color,fontSize:"12px",lineHeight:1,textShadow:`0 0 8px ${color}`}}>{value}%</span>
        </div>
      </div>
      <span className="font-mono" style={{color:"rgba(255,255,255,0.3)",fontSize:"7px",letterSpacing:"0.1em"}}>{label}</span>
    </div>
  );
};

const GameButton = ({ onClick, icon, label, sublabel, accent }: { onClick: () => void; icon: string; label: string; sublabel?: string; accent: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      className="relative flex flex-col items-center justify-center p-3 transition-all active:scale-95 overflow-hidden"
      style={{
        background: hovered ? `linear-gradient(145deg,rgba(${accent},0.18) 0%,rgba(10,22,40,0.95) 100%)` : "linear-gradient(145deg,rgba(10,22,40,0.98) 0%,rgba(5,10,20,1) 100%)",
        border:`1px solid rgba(${accent},${hovered?0.7:0.3})`,
        borderRadius:"6px",
        clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
        boxShadow:hovered?`0 0 16px rgba(${accent},0.35),inset 0 0 20px rgba(${accent},0.06)`:`0 0 6px rgba(${accent},0.1)`,
        minHeight:"72px", transition:"all 0.2s ease"
      }}>
      {hovered && <div className="absolute inset-0 pointer-events-none" style={{background:`repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(${accent},0.03) 2px,rgba(${accent},0.03) 4px)`}}/>}
      <div className="absolute top-0 right-0 w-2.5 h-2.5" style={{borderTop:`2px solid rgba(${accent},${hovered?1:0.5})`,borderRight:`2px solid rgba(${accent},${hovered?1:0.5})`,transition:"all 0.2s"}}/>
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5" style={{borderBottom:`2px solid rgba(${accent},${hovered?0.8:0.3})`,borderLeft:`2px solid rgba(${accent},${hovered?0.8:0.3})`,transition:"all 0.2s"}}/>
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5"
        style={{background:`radial-gradient(circle,rgba(${accent},0.2) 0%,rgba(${accent},0.02) 70%)`,border:`1px solid rgba(${accent},${hovered?0.6:0.25})`,boxShadow:`0 0 ${hovered?18:8}px rgba(${accent},${hovered?0.4:0.15})`,transition:"all 0.2s"}}>
        <span style={{fontSize:"16px"}}>{icon}</span>
      </div>
      <span className="font-mono font-bold" style={{color:`rgba(${accent},${hovered?1:0.8})`,fontSize:"8px",letterSpacing:"0.12em",textShadow:hovered?`0 0 8px rgba(${accent},0.8)`:"none",transition:"all 0.2s"}}>{label}</span>
      {sublabel && <span className="font-mono mt-0.5" style={{color:"rgba(255,255,255,0.25)",fontSize:"7px"}}>{sublabel}</span>}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{background:`linear-gradient(90deg,transparent,rgba(${accent},${hovered?0.9:0.3}),transparent)`,transition:"all 0.2s"}}/>
    </button>
  );
};

const HUDBar = ({ label, color, active=true }: { label: string; color: string; active?: boolean }) => (
  <div className="flex items-center gap-2 py-1">
    <div className="flex gap-0.5">
      {[...Array(4)].map((_,i)=>(
        <div key={i} className="h-2.5 w-1 rounded-sm" style={{background:i<3?(active?color:"rgba(255,255,255,0.08)"):"rgba(255,255,255,0.03)",boxShadow:i<3&&active?`0 0 4px ${color}`:"none"}}/>
      ))}
    </div>
    <div className="flex-1 h-px" style={{background:`linear-gradient(90deg,${color}50,transparent)`}}/>
    <span className="font-mono" style={{color:active?color:"rgba(255,255,255,0.2)",fontSize:"8px",letterSpacing:"0.12em"}}>{label}</span>
    <div className="w-1.5 h-1.5 rounded-full" style={{background:active?"#00ff88":"rgba(255,255,255,0.1)",boxShadow:active?"0 0 5px #00ff88":"none"}}/>
  </div>
);

export default function Meet() {
  const [phase, setPhase] = useState(0);
  const [scanY, setScanY] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(()=>{
    setTimeout(()=>setPhase(1),700);
    setTimeout(()=>setPhase(2),2100);
  },[]);

  useEffect(()=>{
    if(phase!==1)return;
    let y=0;
    const id=setInterval(()=>{y+=3;setScanY(y);if(y>100)clearInterval(id);},18);
    return()=>clearInterval(id);
  },[phase]);

  useEffect(()=>{
    const g=setInterval(()=>{setGlitch(true);setTimeout(()=>setGlitch(false),110);},7000);
    const p=setInterval(()=>{setPulse(true);setTimeout(()=>setPulse(false),400);},3000);
    return()=>{clearInterval(g);clearInterval(p);};
  },[]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{background:"#f0ece3"}}>

      {/* Zulu pattern background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" style={{position:"absolute",inset:0}}>
          <defs>
            <pattern id="zuluBg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,2 78,40 40,78 2,40" fill="none" stroke="#E63946" strokeWidth="1.2" opacity="0.18"/>
              <polygon points="40,14 66,40 40,66 14,40" fill="none" stroke="#F4B942" strokeWidth="0.8" opacity="0.2"/>
              <polygon points="40,26 54,40 40,54 26,40" fill="#2DC653" opacity="0.07"/>
              <polygon points="40,26 54,40 40,54 26,40" fill="none" stroke="#2DC653" strokeWidth="0.6" opacity="0.2"/>
              <polygon points="0,0 18,0 0,18" fill="#E63946" opacity="0.1"/>
              <polygon points="80,0 62,0 80,18" fill="#F4B942" opacity="0.12"/>
              <polygon points="0,80 18,80 0,62" fill="#F4B942" opacity="0.1"/>
              <polygon points="80,80 62,80 80,62" fill="#E63946" opacity="0.12"/>
              <circle cx="40" cy="40" r="2" fill="#8B3AC4" opacity="0.15"/>
              <circle cx="40" cy="2" r="1.2" fill="#F4B942" opacity="0.2"/>
              <circle cx="40" cy="78" r="1.2" fill="#F4B942" opacity="0.2"/>
              <circle cx="2" cy="40" r="1.2" fill="#E63946" opacity="0.2"/>
              <circle cx="78" cy="40" r="1.2" fill="#E63946" opacity="0.2"/>
            </pattern>
            <pattern id="zuluChev" x="0" y="0" width="24" height="14" patternUnits="userSpaceOnUse">
              <polygon points="0,14 12,0 24,14" fill="none" stroke="#E63946" strokeWidth="1.2" opacity="0.25"/>
              <polygon points="0,14 12,0 24,14" fill="#F4B942" opacity="0.06"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zuluBg)"/>
          <rect x="0" y="0" width="100%" height="28" fill="url(#zuluChev)" opacity="0.7"/>
          <rect x="0" y="calc(100% - 28px)" width="100%" height="28" fill="url(#zuluChev)" opacity="0.7"/>
        </svg>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 20%,rgba(244,185,66,0.08) 0%,transparent 50%),radial-gradient(ellipse at 70% 80%,rgba(230,57,70,0.06) 0%,transparent 50%)"}}/>
        {[...Array(35)].map((_,i)=>(
          <div key={i} className="absolute rounded-full animate-pulse"
            style={{left:`${(i*41+13)%100}%`,top:`${(i*57+9)%100}%`,width:i%6===0?"2px":"1px",height:i%6===0?"2px":"1px",background:i%5===0?"#E63946":i%4===0?"#F4B942":i%3===0?"#8B3AC4":"#2DC653",opacity:0.15+(i%4)*0.05,animationDuration:`${2+(i%4)}s`,animationDelay:`${i*0.1}s`}}/>
        ))}
      </div>

      <div className="w-full max-w-sm relative z-10">
        {phase < 2 ? (
          <div className="relative rounded-xl overflow-hidden shadow-2xl"
            style={{background:"rgba(10,22,40,0.97)",border:"1px solid rgba(244,185,66,0.25)",minHeight:"220px"}}>
            <div className="h-0.5 w-full" style={{background:"linear-gradient(90deg,transparent,#F4B942,#FF6B35,transparent)"}}/>
            {phase===1&&<div className="absolute left-0 right-0 h-0.5 pointer-events-none" style={{top:`${scanY}%`,background:"linear-gradient(90deg,transparent,#F4B942,#FF6B35,#00e5ff,transparent)",boxShadow:"0 0 25px rgba(244,185,66,0.7)",zIndex:10}}/>}
            <div className="flex flex-col items-center justify-center py-14 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 animate-spin" style={{borderColor:"rgba(244,185,66,0.15)",borderTopColor:"#F4B942",boxShadow:"0 0 25px rgba(244,185,66,0.35)"}}/>
                <div className="w-16 h-16 rounded-full border animate-spin absolute inset-0" style={{borderColor:"transparent",borderRightColor:"#FF6B35",animationDirection:"reverse",animationDuration:"1.5s",opacity:0.6}}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full" style={{background:"radial-gradient(circle,#F4B942,#FF6B35)",boxShadow:"0 0 14px #F4B942"}}/>
                </div>
              </div>
              <div className="text-center">
                <p className="font-mono text-xs animate-pulse mb-1" style={{color:"#F4B942",letterSpacing:"0.3em"}}>{phase===0?"SYSTEM BOOT...":"IDENTITY LOCK..."}</p>
                <p className="font-mono" style={{color:"rgba(255,255,255,0.2)",fontSize:"8px",letterSpacing:"0.2em"}}>INKANYEZI TECHNOLOGIES v2.0</p>
              </div>
            </div>
            <div className="h-0.5 w-full" style={{background:"linear-gradient(90deg,transparent,#FF6B35,#F4B942,transparent)"}}/>
          </div>
        ) : (
          <div className={`relative rounded-xl overflow-hidden shadow-2xl ${glitch?"translate-x-0.5 opacity-95":""}`}
            style={{background:"linear-gradient(160deg,#0d1f3c 0%,#0A1628 50%,#070f1e 100%)",border:"1px solid rgba(244,185,66,0.2)",boxShadow:`0 0 60px rgba(0,0,0,0.8),0 0 ${pulse?40:20}px rgba(244,185,66,${pulse?0.12:0.05})`,transition:"box-shadow 0.4s ease"}}>

            <div className="h-0.5" style={{background:"linear-gradient(90deg,transparent,#F4B942,#FF6B35,#00e5ff,transparent)"}}/>

            <div className="absolute top-2 left-2 w-7 h-7 pointer-events-none" style={{borderTop:"2px solid #F4B942",borderLeft:"2px solid #F4B942",opacity:0.7}}/>
            <div className="absolute top-2 right-2 w-7 h-7 pointer-events-none" style={{borderTop:"2px solid #FF6B35",borderRight:"2px solid #FF6B35",opacity:0.7}}/>
            <div className="absolute bottom-2 left-2 w-7 h-7 pointer-events-none" style={{borderBottom:"2px solid #FF6B35",borderLeft:"2px solid #FF6B35",opacity:0.5}}/>
            <div className="absolute bottom-2 right-2 w-7 h-7 pointer-events-none" style={{borderBottom:"2px solid #F4B942",borderRight:"2px solid #F4B942",opacity:0.5}}/>

            {/* HEADER */}
            <div className="relative px-5 pt-5 pb-4" style={{borderBottom:"1px solid rgba(244,185,66,0.08)",background:"linear-gradient(180deg,rgba(244,185,66,0.04) 0%,transparent 100%)"}}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  {["#F4B942","#FF6B35","#00ff88","#00e5ff"].map((c,i)=>(
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:c,boxShadow:`0 0 5px ${c}`,animationDelay:`${i*0.2}s`}}/>
                  ))}
                </div>
                <span className="font-mono" style={{color:"rgba(244,185,66,0.45)",fontSize:"8px",letterSpacing:"0.18em"}}>INK-TECH · NODE-ZA-001</span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded" style={{background:"rgba(0,255,136,0.08)",border:"1px solid rgba(0,255,136,0.2)"}}>
                  <div className="w-1 h-1 rounded-full" style={{background:"#00ff88",boxShadow:"0 0 4px #00ff88"}}/>
                  <span className="font-mono" style={{color:"#00ff88",fontSize:"7px",fontWeight:"700"}}>ONLINE</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 relative" style={{width:"80px",height:"80px"}}>
                  <div style={{transform:"scale(0.667)",transformOrigin:"top left"}}><CosmicRadar/></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="28" height="28" viewBox="0 0 72 72" fill="none">
                      <line x1="36" y1="14" x2="54" y2="40" stroke="url(#gn)" strokeWidth="1.5" opacity="0.9"/>
                      <line x1="36" y1="14" x2="18" y2="40" stroke="url(#gn)" strokeWidth="1.5" opacity="0.9"/>
                      <line x1="18" y1="40" x2="54" y2="40" stroke="url(#gn)" strokeWidth="1.5" opacity="0.9"/>
                      <path d="M36 7 L37.8 12.2 L43.2 12.2 L38.9 15.4 L40.6 20.6 L36 17.4 L31.4 20.6 L33.1 15.4 L28.8 12.2 L34.2 12.2 Z" fill="url(#gn)"/>
                      <path d="M18 34.5 L19.4 38.6 L23.7 38.6 L20.3 41.1 L21.6 45.2 L18 42.7 L14.4 45.2 L15.7 41.1 L12.3 38.6 L16.6 38.6 Z" fill="url(#gn)" opacity="0.85"/>
                      <path d="M54 34.5 L55.4 38.6 L59.7 38.6 L56.3 41.1 L57.6 45.2 L54 42.7 L50.4 45.2 L51.7 41.1 L48.3 38.6 L52.6 38.6 Z" fill="url(#gn)" opacity="0.85"/>
                      <circle cx="36" cy="58" r="2.5" fill="url(#gn)" opacity="0.7"/>
                      <defs>
                        <linearGradient id="gn" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F4B942"/><stop offset="100%" stopColor="#FF6B35"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-mono mb-1" style={{color:"rgba(244,185,66,0.4)",fontSize:"7px",letterSpacing:"0.25em"}}>// UMNIKAZI · OPERATOR</div>
                  <h1 className="font-bold" style={{fontFamily:"Georgia,serif",fontSize:"18px",color:"#ffffff",textShadow:"0 0 20px rgba(244,185,66,0.4)"}}>
                    {glitch?"S▓nele Sis▓ange":"Sanele Sishange"}
                  </h1>
                  <p className="font-mono mt-0.5" style={{color:"#F4B942",fontSize:"9px"}}>Founder · AI Automation Consultant</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-px flex-1" style={{background:"linear-gradient(90deg,rgba(244,185,66,0.5),rgba(255,107,53,0.3),transparent)"}}/>
                    <span className="font-mono" style={{color:"rgba(255,255,255,0.2)",fontSize:"7px"}}>eThekwini · KZN · ZA</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 px-3 py-2"
                style={{background:"rgba(244,185,66,0.05)",border:"1px solid rgba(244,185,66,0.15)",clipPath:"polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))"}}>
                <div className="w-px h-4" style={{background:"linear-gradient(180deg,#F4B942,#FF6B35)"}}/>
                <span className="font-mono italic flex-1" style={{color:"rgba(244,185,66,0.85)",fontSize:"9px"}}>"We are the signal in the noise"</span>
                <span className="font-mono" style={{color:"rgba(255,255,255,0.1)",fontSize:"7px"}}>INKANYEZI</span>
              </div>
            </div>

            {/* CAPABILITY MATRIX */}
            <div className="px-5 py-3" style={{borderBottom:"1px solid rgba(244,185,66,0.07)",background:"rgba(0,0,0,0.15)"}}>
              <div className="font-mono mb-2" style={{color:"rgba(244,185,66,0.3)",fontSize:"7px",letterSpacing:"0.2em"}}>// AMANDLA · CAPABILITY MATRIX</div>
              <div className="flex justify-around">
                <EnergyRing size={72} value={96} color="#F4B942" label="AI CORE"/>
                <EnergyRing size={72} value={88} color="#FF6B35" label="AUTOMATE"/>
                <EnergyRing size={72} value={100} color="#00e5ff" label="SIGNAL"/>
              </div>
            </div>

            {/* ACTIVE SYSTEMS */}
            <div className="px-5 py-2" style={{borderBottom:"1px solid rgba(244,185,66,0.07)"}}>
              <div className="font-mono mb-1" style={{color:"rgba(244,185,66,0.3)",fontSize:"7px",letterSpacing:"0.2em"}}>// IZINHLELO · ACTIVE SYSTEMS</div>
              <HUDBar label="WHATSAPP AI · ACTIVE" color="#F4B942"/>
              <HUDBar label="CHATBOT ENGINE · ONLINE" color="#00e5ff"/>
              <HUDBar label="AUTOMATION FLOWS · RUNNING" color="#FF6B35"/>
            </div>

            {/* GAMING BUTTONS */}
            <div className="px-5 py-4">
              <div className="font-mono mb-3" style={{color:"rgba(244,185,66,0.3)",fontSize:"7px",letterSpacing:"0.2em"}}>// QALISA · INITIATE SEQUENCE</div>
              <button onClick={downloadVCard}
                className="w-full mb-3 py-3 flex items-center justify-center gap-3 relative overflow-hidden active:scale-95 transition-all"
                style={{background:"linear-gradient(135deg,rgba(244,185,66,0.15) 0%,rgba(255,107,53,0.1) 100%)",border:"1px solid rgba(244,185,66,0.5)",borderRadius:"6px",clipPath:"polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))",boxShadow:"0 0 20px rgba(244,185,66,0.15),inset 0 0 30px rgba(244,185,66,0.04)"}}>
                <div className="absolute inset-0 pointer-events-none" style={{background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(244,185,66,0.02) 2px,rgba(244,185,66,0.02) 4px)"}}/>
                <div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,#F4B942,transparent)"}}/>
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,#FF6B35,transparent)"}}/>
                <span style={{fontSize:"16px"}}>👤</span>
                <span className="font-mono font-bold tracking-widest" style={{color:"#F4B942",fontSize:"11px",letterSpacing:"0.2em",textShadow:"0 0 10px rgba(244,185,66,0.8)"}}>SAVE CONTACT</span>
                <div className="flex gap-0.5 ml-auto">
                  {[...Array(3)].map((_,i)=>(
                    <div key={i} className="w-0.5 rounded-full" style={{height:`${8+i*4}px`,background:"rgba(244,185,66,0.5)"}}/>
                  ))}
                </div>
              </button>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <GameButton onClick={()=>window.open("https://wa.me/27658804122?text=Hi%20Sanele%2C%20I%27d%20like%20to%20learn%20more%20about%20Inkanyezi%20Technologies.","_blank")} icon="💬" label="WHATSAPP" sublabel="CHANNEL" accent="37,211,102"/>
                <GameButton onClick={()=>window.open("https://inkanyezi-tech.lovable.app","_blank")} icon="🌐" label="WEBSITE" sublabel="ACCESS" accent="0,229,255"/>
                <GameButton onClick={()=>window.open("https://inkanyezi-tech.lovable.app/#chat","_blank")} icon="🤖" label="AI AGENT" sublabel="ENGAGE" accent="244,185,66"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <GameButton onClick={()=>window.open("mailto:inkanyeziaisolutions3@gmail.com","_blank")} icon="✉️" label="TRANSMIT" sublabel="MESSAGE" accent="200,200,255"/>
                <GameButton onClick={()=>window.open("https://www.linkedin.com/company/inkanyezi-technologies","_blank")} icon="💼" label="NETWORK" sublabel="LINKEDIN" accent="10,120,220"/>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-5 py-2 flex justify-between items-center" style={{borderTop:"1px solid rgba(244,185,66,0.07)",background:"rgba(0,0,0,0.2)"}}>
              <span className="font-mono" style={{color:"rgba(255,255,255,0.1)",fontSize:"7px",letterSpacing:"0.2em"}}>SYS.VER 2.0.26</span>
              <span className="font-mono" style={{color:"rgba(244,185,66,0.2)",fontSize:"7px"}}>INKANYEZI · TECH</span>
              <span className="font-mono" style={{color:"rgba(0,229,255,0.2)",fontSize:"7px"}}>eThekwini-001</span>
            </div>
            <div className="h-0.5" style={{background:"linear-gradient(90deg,transparent,#FF6B35,#F4B942,transparent)"}}/>
          </div>
        )}
        <p className="text-center mt-3 font-mono" style={{color:"rgba(0,0,0,0.2)",fontSize:"8px",letterSpacing:"0.25em"}}>
          ◈ INKANYEZI TECHNOLOGIES · SIGNAL IN THE NOISE ◈
        </p>
      </div>
    </div>
  );
}
