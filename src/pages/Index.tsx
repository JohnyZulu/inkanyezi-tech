import { useState, useRef, useEffect, useCallback, CSSProperties } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ROICalculator from "@/components/ROICalculator";
import ChatDemoFixed from "@/components/ChatDemoFixed";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GlobalStarfield from "@/components/GlobalStarfield";
import ShootingStars from "@/components/ShootingStars";

// ════════════════════════════════════════════════════════════════════
// DESIGN TOKENS — Afrofuturist Cosmos × SA Heritage × Dark Matter
// ════════════════════════════════════════════════════════════════════
const C = {
  void:     '#04080F',
  midnight: '#0A1628',
  deep:     '#0D1E35',
  gold:     '#F4B942',
  orange:   '#FF6B35',
  white:    '#FFFFFF',
  saGreen:  '#007A4D',
  saGold:   '#FFB612',
  saRed:    '#DE3831',
  saBlue:   '#002395',
};

// ── ANDROMEDA GALAXY CANVAS — spinning spiral with warm core ──────────
function CosmosCanvas({ width, height }: { width: number; height: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = width; canvas.height = height;
    const W = width, H = height;
    let raf: number;
    let angle = 0;

    // Background field stars — static scatter
    const fieldStars = Array.from({ length: 280 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.1 + 0.15,
      op: Math.random() * 0.65 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.012 + 0.004,
      gold: Math.random() > 0.75,
    }));

    // Spiral arm particles — two arms of Andromeda
    const armCount = 2;
    const armParticles = Array.from({ length: 320 }, (_, i) => {
      const arm = i % armCount;
      const t = (i / 320);
      const spread = (Math.random() - 0.5) * 0.38;
      const armAngle = arm * Math.PI + t * Math.PI * 3.2 + spread;
      const dist = t * 0.46 + 0.08 + Math.random() * 0.04;
      return {
        // Stored as polar relative to centre, converted each frame
        baseAngle: armAngle,
        dist: dist,
        spread: spread,
        r: Math.random() * 1.4 + 0.25,
        op: Math.random() * 0.7 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003,
        // Warmer colour near core, bluer further out
        warm: dist < 0.22,
      };
    });

    // Dust lane particles — dark brownish streaks across the disc
    const dustLanes = Array.from({ length: 60 }, (_, i) => {
      const arm = i % armCount;
      const t = 0.15 + (i / 60) * 0.65;
      const armAngle = arm * Math.PI + t * Math.PI * 3.0 + (Math.random() - 0.5) * 0.2;
      const dist = t * 0.38 + 0.1;
      return { baseAngle: armAngle, dist: dist, r: Math.random() * 2.8 + 1.2, op: Math.random() * 0.38 + 0.12 };
    });

    const CX = W * 0.5, CY = H * 0.52;
    const SCALE = Math.min(W, H) * 0.46;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      angle += 0.0006; // Very slow rotation — galaxy timescale

      // Deep space background
      const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H));
      bg.addColorStop(0, 'rgba(6,4,18,1)');
      bg.addColorStop(0.5, 'rgba(3,2,12,1)');
      bg.addColorStop(1, 'rgba(1,1,6,1)');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

      // Outer halo glow — faint blue-white
      const halo = ctx.createRadialGradient(CX, CY, SCALE * 0.3, CX, CY, SCALE * 1.1);
      halo.addColorStop(0, 'rgba(180,190,255,0.0)');
      halo.addColorStop(0.5, 'rgba(160,175,255,0.045)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);

      // Disc glow — elliptical warm haze
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(angle + 0.4);
      ctx.scale(1, 0.42);
      const disc = ctx.createRadialGradient(0, 0, 0, 0, 0, SCALE * 0.88);
      disc.addColorStop(0, 'rgba(255,200,140,0.0)');
      disc.addColorStop(0.18, 'rgba(240,185,120,0.06)');
      disc.addColorStop(0.45, 'rgba(200,165,100,0.035)');
      disc.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = disc; ctx.fillRect(-SCALE, -SCALE * 2.5, SCALE * 2, SCALE * 5);
      ctx.restore();

      // Draw dust lanes first (darkest, behind everything)
      dustLanes.forEach(p => {
        const a = p.baseAngle + angle * 0.8;
        const x = CX + Math.cos(a) * p.dist * SCALE;
        const y = CY + Math.sin(a) * p.dist * SCALE * 0.42;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 3.5);
        g.addColorStop(0, `rgba(8,4,2,${p.op})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(x, y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      // Draw spiral arm stars
      armParticles.forEach(p => {
        p.pulse += p.speed;
        const a = p.baseAngle + angle;
        const x = CX + Math.cos(a) * p.dist * SCALE;
        const y = CY + Math.sin(a) * p.dist * SCALE * 0.42;
        const brightness = 0.45 + 0.55 * Math.sin(p.pulse);
        const op = p.op * brightness;
        // Warm golden near core, blue-white in arms
        const col = p.warm
          ? `rgba(255,210,150,${op})`
          : `rgba(200,220,255,${op})`;
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 2.8);
        g.addColorStop(0, col);
        g.addColorStop(0.4, p.warm ? `rgba(255,185,100,${op * 0.4})` : `rgba(180,205,255,${op * 0.4})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(x, y, p.r * 2, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });

      // Bright core — multi-layer warm glow
      const core1 = ctx.createRadialGradient(CX, CY, 0, CX, CY, SCALE * 0.18);
      core1.addColorStop(0, 'rgba(255,245,220,0.95)');
      core1.addColorStop(0.12, 'rgba(255,220,160,0.7)');
      core1.addColorStop(0.35, 'rgba(240,180,100,0.3)');
      core1.addColorStop(0.7, 'rgba(200,140,70,0.08)');
      core1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core1; ctx.fillRect(0, 0, W, H);

      // Core inner point — very bright centre
      const core2 = ctx.createRadialGradient(CX, CY, 0, CX, CY, SCALE * 0.06);
      core2.addColorStop(0, 'rgba(255,252,240,1)');
      core2.addColorStop(0.3, 'rgba(255,240,200,0.8)');
      core2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = core2; ctx.fillRect(0, 0, W, H);

      // Companion galaxy (M32) — small bright smudge top-left
      const comp = ctx.createRadialGradient(CX - SCALE * 0.62, CY - SCALE * 0.38, 0, CX - SCALE * 0.62, CY - SCALE * 0.38, SCALE * 0.07);
      comp.addColorStop(0, 'rgba(255,240,200,0.7)');
      comp.addColorStop(0.4, 'rgba(240,220,170,0.25)');
      comp.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = comp; ctx.fillRect(0, 0, W, H);

      // Background field stars — twinkle, stationary
      fieldStars.forEach(s => {
        s.pulse += s.speed;
        const op = s.op * (0.45 + 0.55 * Math.sin(s.pulse));
        const col = s.gold ? `rgba(255,215,120,${op})` : `rgba(225,235,255,${op})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = col; ctx.fill();
        // Cross-flare on brightest
        if (op > 0.7 && s.r > 0.8) {
          ctx.strokeStyle = s.gold ? `rgba(255,200,80,${op * 0.22})` : `rgba(200,215,255,${op * 0.15})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath(); ctx.moveTo(s.x - s.r * 2.5, s.y); ctx.lineTo(s.x + s.r * 2.5, s.y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(s.x, s.y - s.r * 2.5); ctx.lineTo(s.x, s.y + s.r * 2.5); ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [width, height]);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', borderRadius:'inherit' }} />;
}

// ── SA HERITAGE STRIP ────────────────────────────────────────────────
function HeritageStrip({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ display:'flex', gap:3, alignItems:'center', ...style }}>
      {[C.saGreen,C.saGold,C.saRed,C.saBlue,C.white].map((c,i) => (
        <div key={i} style={{ width:i===2?18:11, height:2.5, background:c, borderRadius:2, opacity:0.7 }} />
      ))}
    </div>
  );
}

// ── SIGNAL DOT ───────────────────────────────────────────────────────
function SignalDot() {
  return (
    <span style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ position:'absolute', width:8, height:8, borderRadius:'50%', background:'#22C55E', animation:'ping 2s ease-out infinite' }} />
      <span style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', display:'block' }} />
    </span>
  );
}

// ── TRIGGER SCORING ──────────────────────────────────────────────────
const SIGNALS = {
  STAGES: { interested:30, ready:60, exploring:10, objecting:5, new:0 } as Record<string,number>,
  PAIN:20, INDUSTRY:15, STAFF:10,
  BUDGET: { high:25, medium:15, low:5 } as Record<string,number>,
  DEPTH:5, DEMO:100, EXPLICIT:80,
};
const THRESHOLD = 55; const MIN_MSGS = 4;
const TRIGGERS = ['get in touch','contact','speak to someone','call me','reach out','book a demo','schedule','sign up','get started','how much','pricing','cost','quote','proposal','sounds good',"let's do it",'ready to','can you help','interested'];

function scoreConversation(ctx: any, userCount: number, lastMsg: string) {
  let score = 0;
  if (!ctx) return { score:0, shouldShow:false };
  score += SIGNALS.STAGES[ctx.qualification_stage||'new']||0;
  if (ctx.pain_point)    score += SIGNALS.PAIN;
  if (ctx.industry)      score += SIGNALS.INDUSTRY;
  if (ctx.staff_count)   score += SIGNALS.STAFF;
  if (ctx.budget_signal) score += SIGNALS.BUDGET[ctx.budget_signal]||0;
  if (userCount > 4)     score += Math.floor((userCount-4)/3)*SIGNALS.DEPTH;
  if (ctx.demo_booked)   score += SIGNALS.DEMO;
  if (lastMsg && TRIGGERS.some(p => lastMsg.toLowerCase().includes(p))) score += SIGNALS.EXPLICIT;
  return { score, shouldShow: score >= THRESHOLD && userCount >= MIN_MSGS };
}


const INDUSTRIES = [
  { value:'plumbing',      label:'🔧 Plumbing & Trade' },
  { value:'electrical',    label:'⚡ Electrical & HVAC' },
  { value:'construction',  label:'🏗️ Construction' },
  { value:'healthcare',    label:'🏥 Healthcare' },
  { value:'property',      label:'🏘️ Property & Real Estate' },
  { value:'retail',        label:'🛒 Retail & Wholesale' },
  { value:'transport',     label:'🚛 Transport & Logistics' },
  { value:'hospitality',   label:'🍽️ Hospitality & Food' },
  { value:'professional',  label:'💼 Professional Services' },
  { value:'education',     label:'📚 Education & Training' },
  { value:'technology',    label:'💻 Technology' },
  { value:'other',         label:'◎ Other' },
];
const SERVICES = [
  { value:'automate', label:'⚙️ Automate — Business Automation' },
  { value:'learn',    label:'🎓 Learn — AI Training' },
  { value:'grow',     label:'📈 Grow — AI Strategy' },
  { value:'unsure',   label:'✦ Just exploring' },
];

// ── LEAD FORM FIELD ──────────────────────────────────────────────────
function LeadField({ label, name, type='text', placeholder, value, onChange, required }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ flex:1, minWidth:0 }}>
      <label style={{ display:'block', fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:"'Space Mono',monospace", color:focused?C.gold:'#6B7280', marginBottom:'0.28rem', fontWeight:600, transition:'color 0.2s' }}>
        {label}{required&&<span style={{color:C.orange}}> *</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder={placeholder} required={required}
        style={{ width:'100%', boxSizing:'border-box', background:'#FFFFFF', border:`1.5px solid ${focused?C.gold:'#D1D5DB'}`, borderRadius:'6px', padding:'0.5rem 0.7rem', color:'#111827', fontSize:'0.82rem', fontFamily:"'DM Sans',sans-serif", outline:'none', transition:'all 0.2s', boxShadow:focused?`0 0 0 3px rgba(244,185,66,0.18)`:'none' }} />
    </div>
  );
}

function LeadSelect({ label, name, value, onChange, options, required }: any) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ flex:1, minWidth:0, position:'relative' }}>
      <label style={{ display:'block', fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:"'Space Mono',monospace", color:focused?C.gold:'#6B7280', marginBottom:'0.28rem', fontWeight:600, transition:'color 0.2s' }}>
        {label}{required&&<span style={{color:C.orange}}> *</span>}
      </label>
      <div style={{ position:'relative' }}>
        <select name={name} value={value} onChange={onChange} required={required} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{ width:'100%', appearance:'none', boxSizing:'border-box', background:'#FFFFFF', border:`1.5px solid ${focused?C.gold:'#D1D5DB'}`, borderRadius:'6px', padding:'0.5rem 1.8rem 0.5rem 0.7rem', color:value?'#111827':'#9CA3AF', fontSize:'0.82rem', fontFamily:"'DM Sans',sans-serif", outline:'none', cursor:'pointer', transition:'all 0.2s', boxShadow:focused?`0 0 0 3px rgba(244,185,66,0.18)`:'none' }}>
          <option value="" disabled style={{background:'#fff',color:'#9CA3AF'}}>Select...</option>
          {options.map((o: any) => <option key={o.value} value={o.value} style={{background:'#fff',color:'#111827'}}>{o.label}</option>)}
        </select>
        <span style={{ position:'absolute', right:'0.55rem', top:'50%', transform:'translateY(-50%)', fontSize:'0.5rem', color:'#9CA3AF', pointerEvents:'none' }}>▼</span>
      </div>
    </div>
  );
}

// ── CHAT LEAD FORM ───────────────────────────────────────────────────
function ChatLeadForm({ onSubmit, onDismiss, sessionContext={}, submitting, onVoiceField }: any) {
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', industry:'', service_interest:'', message:'' });
  const setField = (field: string) => (val: string) => setForm(f => ({ ...f, [field]: val }));
  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);
  useEffect(() => {
    setForm(f => ({ ...f,
      name:    f.name    || sessionContext?.name     || '',
      email:   f.email   || sessionContext?.email    || '',
      phone:   f.phone   || sessionContext?.whatsapp || '',
      company: f.company || sessionContext?.business || '',
      industry:f.industry|| sessionContext?.industry || '',
      message: f.message || sessionContext?.pain_point || '',
    }));
  }, [sessionContext]);
  const handle = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e: any) => {
    e.preventDefault(); if (!consent) return;
    const r = await onSubmit?.(form);
    if (r?.success !== false) setSubmitted(true);
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(12px)', transition:'opacity 0.45s ease, transform 0.45s ease' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'5px' }}>
        <div style={{ width:20, height:20, borderRadius:'50%', background:`linear-gradient(135deg, ${C.gold}, ${C.orange})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.6rem', color:C.midnight }}>✦</div>
        <span style={{ fontSize:'0.58rem', color:'rgba(255,255,255,0.28)', fontFamily:"'Space Mono',monospace", letterSpacing:'0.08em' }}>InkanyeziBot</span>
      </div>
      {/* Form card: dark brand header + clean light body */}
      <div style={{ width:'100%', borderRadius:'14px', borderTopLeftRadius:'3px', overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.55)', border:'1px solid rgba(244,185,66,0.25)' }}>

        {/* ── Dark header band ── */}
        <div style={{ background:`linear-gradient(135deg, ${C.midnight} 0%, ${C.deep} 100%)`, padding:'0.8rem 1rem 0.75rem', position:'relative' }}>
          {/* Gold shimmer top edge */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(90deg, transparent, ${C.gold}, ${C.orange}, ${C.gold}, transparent)`, backgroundSize:'200% 100%', animation:'shimmerBar 3s linear infinite' }} />
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:'0.48rem', letterSpacing:'0.26em', textTransform:'uppercase', color:C.gold, fontFamily:"'Space Mono',monospace", marginBottom:'0.2rem', opacity:0.9 }}>Inkanyezi Technologies</div>
              <h3 style={{ margin:0, fontFamily:"'Syne',sans-serif", fontSize:'0.9rem', fontWeight:800, color:'#FFFFFF', lineHeight:1.2 }}>
                {"Let's make this"}{' '}
                <span style={{ background:`linear-gradient(90deg, ${C.gold}, ${C.orange})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>official</span>
              </h3>
              <p style={{ margin:'0.2rem 0 0', fontSize:'0.65rem', color:'rgba(255,255,255,0.45)', lineHeight:1.4, fontFamily:"'DM Sans',sans-serif" }}>Sanele follows up personally within 24 hours.</p>
            </div>
            {onDismiss && !submitted && (
              <button onClick={onDismiss} style={{ background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'4px', padding:'3px 8px', color:'rgba(255,255,255,0.45)', fontSize:'0.6rem', cursor:'pointer', fontFamily:"'Space Mono',monospace", flexShrink:0, marginLeft:8 }}>✕</button>
            )}
          </div>
          <HeritageStrip style={{ marginTop:'0.55rem' }} />
        </div>

        {/* ── Light body ── */}
        <div style={{ background:'#F8F9FA', padding:'0.85rem 1rem 1rem' }}>
          {submitted ? (
            <div style={{ textAlign:'center', padding:'0.6rem 0 0.2rem' }}>
              <div style={{ width:46, height:46, borderRadius:'50%', margin:'0 auto 0.6rem', background:`linear-gradient(135deg, ${C.gold}, ${C.orange})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', color:C.midnight, boxShadow:`0 0 20px rgba(244,185,66,0.35)` }}>✓</div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:'0.95rem', fontWeight:800, color:'#111827', margin:'0 0 0.3rem', lineHeight:1.2 }}>
                Details received,{' '}
                <span style={{ background:`linear-gradient(90deg, ${C.gold}, ${C.orange})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{form.name?.split(' ')[0]||'friend'}</span>!
              </p>
              <p style={{ fontSize:'0.72rem', color:'#6B7280', margin:'0 0 0.6rem', lineHeight:1.5, fontFamily:"'DM Sans',sans-serif" }}>
                {form.company ? `Sanele will reach out to ${form.company} within 24 hours.` : 'Sanele will be in touch within 24 hours.'}
              </p>
              <p style={{ fontSize:'0.56rem', color:'#9CA3AF', margin:0, fontFamily:"'Space Mono',monospace" }}>Durban, KZN 🇿🇦 · We are the signal in the noise.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.45rem', marginBottom:'0.45rem' }}>
                <div style={{position:'relative'}}>
                  <LeadField label="Your Name" name="name" placeholder="e.g. Sipho" value={form.name} onChange={handle} required />
                  {onVoiceField && <button type="button" onPointerUp={()=>onVoiceField(setField('name'))} style={{position:'absolute',right:6,bottom:7,width:20,height:20,borderRadius:'50%',background:'rgba(244,185,66,0.12)',border:'1px solid rgba(244,185,66,0.4)',color:C.gold,fontSize:10,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} title="Speak your name">🎙</button>}
                </div>
                <div style={{position:'relative'}}>
                  <LeadField label="Business" name="company" placeholder="Company name" value={form.company} onChange={handle} />
                  {onVoiceField && <button type="button" onPointerUp={()=>onVoiceField(setField('company'))} style={{position:'absolute',right:6,bottom:7,width:20,height:20,borderRadius:'50%',background:'rgba(244,185,66,0.12)',border:'1px solid rgba(244,185,66,0.4)',color:C.gold,fontSize:10,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}} title="Speak company name">🎙</button>}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.45rem', marginBottom:'0.45rem' }}>
                <LeadField label="Email" name="email" type="email" placeholder="you@business.co.za" value={form.email} onChange={handle} required />
                <LeadField label="WhatsApp" name="phone" type="tel" placeholder="+27 82..." value={form.phone} onChange={handle} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.45rem', marginBottom:'0.6rem' }}>
                <LeadSelect label="Industry" name="industry" value={form.industry} onChange={handle} options={INDUSTRIES} required />
                <LeadSelect label="How we help" name="service_interest" value={form.service_interest} onChange={handle} options={SERVICES} required />
              </div>
              {/* POPIA consent — dark text on light bg */}
              <label style={{ display:'flex', gap:'0.45rem', cursor:'pointer', alignItems:'flex-start', marginBottom:'0.6rem' }}>
                <div onClick={()=>setConsent(cv=>!cv)} style={{ width:15, height:15, flexShrink:0, marginTop:1, border:`1.5px solid ${consent?C.gold:'#D1D5DB'}`, borderRadius:'3px', background:consent?`linear-gradient(135deg,${C.gold},${C.orange})`:'#FFFFFF', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', cursor:'pointer', boxShadow:consent?`0 0 0 2px rgba(244,185,66,0.2)`:'none' }}>
                  {consent && <span style={{ color:'#fff', fontSize:'9px', lineHeight:1, fontWeight:700 }}>✓</span>}
                </div>
                <span style={{ fontSize:'0.62rem', color:'#6B7280', lineHeight:1.5, fontFamily:"'DM Sans',sans-serif" }}>
                  I consent to Inkanyezi Technologies contacting me per <span style={{color:C.gold,fontWeight:600}}>POPIA</span>. <span style={{color:C.orange}}>*</span>
                </span>
              </label>
              <button type="submit" disabled={submitting||!consent}
                style={{ width:'100%', padding:'0.62rem', background:submitting||!consent?'#E5E7EB':`linear-gradient(90deg, ${C.gold}, ${C.orange})`, border:'none', borderRadius:'6px', color:submitting||!consent?'#9CA3AF':C.midnight, fontFamily:"'Space Mono',monospace", fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor:submitting||!consent?'not-allowed':'pointer', transition:'all 0.25s', boxShadow:!submitting&&consent?`0 4px 14px rgba(244,185,66,0.35)`:'none' }}>
                {submitting ? 'Sending...' : 'Send My Details →'}
              </button>
              <p style={{ textAlign:'center', fontSize:'0.54rem', color:'#9CA3AF', margin:'0.5rem 0 0', fontFamily:"'Space Mono',monospace" }}>Durban, KZN 🇿🇦 · We are the signal in the noise.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── FORMAT MESSAGE ───────────────────────────────────────────────────
function formatMessage(text: string) {
  if (!text) return '';
  const clean = text
    .replace(/<context>[\s\S]*?<\/context>/gi, '')
    .replace(/<response>|<\/response>/gi, '')
    .trim();
  return clean
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}


// ════════════════════════════════════════════════════════════════════
// INKANYEZI DOOR — Pure tech, holographic, plasma energy
// ════════════════════════════════════════════════════════════════════
function DoorAnimationInline({ onComplete }: { onComplete: () => void }) {
  const leftRef  = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);
  const brainRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase]     = useState<'brain'|'opening'>('brain');
  const [doorPct, setDoorPct] = useState(0);
  const animRef  = useRef<number>(0);
  const tkRef    = useRef(0);

  const paintPanel = (canvas: HTMLCanvasElement, side: 'left'|'right', tk: number, op: number) => {
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    const isL = side === 'left';
    ctx.clearRect(0, 0, W, H);

    // Base — warm void, NOT cold navy
    ctx.fillStyle = '#0E0A04'; ctx.fillRect(0,0,W,H);
    // Amber radial warmth — fire from the centre seam
    const radial=ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.9);
    radial.addColorStop(0,'rgba(80,50,10,0.65)');
    radial.addColorStop(0.5,'rgba(40,25,5,0.35)');
    radial.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=radial; ctx.fillRect(0,0,W,H);

    // Fine grid — warm gold constellation weave
    ctx.strokeStyle = 'rgba(244,185,66,0.10)'; ctx.lineWidth = 0.5;
    for(let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

    // Coarser accent grid — orange counter feel
    ctx.strokeStyle = 'rgba(255,107,53,0.07)'; ctx.lineWidth = 1;
    for(let x=0;x<W;x+=100){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=100){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

    const hr = 15, hw = hr*Math.sqrt(3);
    ctx.strokeStyle = 'rgba(244,185,66,0.14)'; ctx.lineWidth = 0.7;
    for(let row=-1;row<H/(hr*1.5)+1;row++){
      for(let col=-1;col<W/hw+1;col++){
        const cx=col*hw+(row%2===0?0:hw/2), cy=row*hr*1.5;
        ctx.beginPath();
        for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6;ctx.lineTo(cx+hr*Math.cos(a),cy+hr*Math.sin(a));}
        ctx.closePath(); ctx.stroke();
      }
    }

    const cols = isL ? [W*0.18,W*0.38,W*0.62,W*0.82] : [W*0.18,W*0.38,W*0.62,W*0.82];
    cols.forEach((sx,ci) => {
      const chars=['01','10','AI','∑','λ','π','∞','⟨⟩','11','00','NN','ML'];
      for(let i=0;i<7;i++){
        const yPos=((tk*55*(0.7+ci*0.2)+i*(H/7))%H);
        const alpha=(0.08+0.1*Math.sin(tk+i+ci*2))*Math.max(0,1-op*2);
        ctx.fillStyle=`rgba(255,185,80,${alpha})`;
        ctx.font=`${7+i%2}px monospace`; ctx.textAlign='center';
        ctx.fillText(chars[(Math.floor(tk*2+i+ci*5))%chars.length],sx,yPos);
      }
    });

    [H*0.15,H*0.3,H*0.5,H*0.7,H*0.85].forEach((y,i)=>{
      const p=0.4+0.5*Math.sin(tk*2+i*1.3);
      ctx.strokeStyle=`rgba(244,185,66,${0.18+p*0.22})`; ctx.lineWidth=1;
      ctx.beginPath();
      const mid=W/2;
      ctx.moveTo(0,y);
      ctx.lineTo(mid-30,y); ctx.lineTo(mid-18,y-9); ctx.lineTo(mid+18,y-9); ctx.lineTo(mid+30,y);
      ctx.lineTo(W,y); ctx.stroke();
      [W*0.1, mid, W*0.9].forEach(nx=>{
        ctx.beginPath(); ctx.arc(nx,y,2,0,Math.PI*2);
        ctx.fillStyle=`rgba(244,185,66,${0.35+p*0.55})`; ctx.fill();
      });
    });

    // Amber scan sweep — warm system initialising
    const scanY=((tk*40)%(H+80))-40;
    const sg=ctx.createLinearGradient(0,scanY-25,0,scanY+25);
    sg.addColorStop(0,'rgba(244,185,66,0)');
    sg.addColorStop(0.4,`rgba(255,160,40,${0.06+op*0.03})`);
    sg.addColorStop(0.5,`rgba(255,200,80,${0.22+op*0.1})`);
    sg.addColorStop(0.6,`rgba(255,160,40,${0.06+op*0.03})`);
    sg.addColorStop(1,'rgba(244,185,66,0)');
    ctx.fillStyle=sg; ctx.fillRect(0,scanY-25,W,50);

    const conduitAlpha = Math.max(0, 1 - op * 3);
    if (conduitAlpha > 0) {
      const cg=ctx.createLinearGradient(0,0,0,H);
      cg.addColorStop(0,'rgba(244,185,66,0)');
      cg.addColorStop(0.25,`rgba(244,185,66,${0.6*conduitAlpha})`);
      cg.addColorStop(0.5,`rgba(255,140,60,${0.8*conduitAlpha})`);
      cg.addColorStop(0.75,`rgba(244,185,66,${0.5*conduitAlpha})`);
      cg.addColorStop(1,'rgba(244,185,66,0)');
      ctx.fillStyle=cg; ctx.fillRect(isL?W-4:0,0,4,H);
    }

    const bloomAlpha = Math.max(0, 1 - op * 2.5);
    const eg=ctx.createLinearGradient(isL?W:0,0,isL?W-80:80,0);
    eg.addColorStop(0,`rgba(255,107,53,${(0.12+op*0.3)*bloomAlpha})`);
    eg.addColorStop(0.5,`rgba(244,185,66,${(0.05+op*0.1)*bloomAlpha})`);
    eg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=eg; ctx.fillRect(isL?W-80:0,0,80,H);

    ctx.strokeStyle='rgba(244,185,66,0.35)'; ctx.lineWidth=1;
    ctx.strokeRect(5,5,W-10,H-10);
    // Inner precision line — warm amber ghost
    ctx.strokeStyle='rgba(255,140,40,0.10)'; ctx.lineWidth=0.5;
    ctx.strokeRect(11,11,W-22,H-22);

    const b=18;
    [[5,5],[5,H-5],[W-5,5],[W-5,H-5]].forEach(([bx,by])=>{
      ctx.strokeStyle='rgba(244,185,66,0.75)'; ctx.lineWidth=2;
      const mx=bx>W/2?-b:b, my=by>H/2?-b:b;
      ctx.beginPath(); ctx.moveTo(bx+mx,by); ctx.lineTo(bx,by); ctx.lineTo(bx,by+my); ctx.stroke();
    });

    ctx.font='7px monospace'; ctx.textAlign='center';
    ctx.fillStyle=`rgba(255,185,80,${0.5+0.15*Math.sin(tk*4)})`;
    ctx.fillText(isL?'◈ INK-L':'◈ INK-R',W/2,H-16);
    ctx.fillStyle='rgba(244,185,66,0.45)';
    ctx.fillText(isL?'UNIT·ALPHA':'UNIT·SIGMA',W/2,H-8);

    if(op > 0) {
      const letter = isL ? 'A' : 'I';
      const lx = isL ? W * 0.78 : W * 0.22;
      const ly = H * 0.5;
      const letterAlpha = Math.min(op * 3, 1) * Math.max(0, 1 - op * 1.2);
      if(letterAlpha > 0) {
        const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 55);
        lg.addColorStop(0, `rgba(244,185,66,${letterAlpha * 0.25})`);
        lg.addColorStop(0.5, `rgba(255,107,53,${letterAlpha * 0.1})`);
        lg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(lx, ly, 55, 0, Math.PI*2);
        ctx.fillStyle = lg; ctx.fill();
        ctx.save();
        ctx.font = 'bold 72px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = '#F4B942';
        ctx.shadowBlur = 20 * letterAlpha;
        ctx.fillStyle = `rgba(255,255,255,${letterAlpha})`;
        ctx.fillText(letter, lx, ly);
        ctx.restore();
        const uw = letter === 'I' ? 28 : 44;
        const ug = ctx.createLinearGradient(lx-uw/2, ly+44, lx+uw/2, ly+44);
        ug.addColorStop(0, 'rgba(244,185,66,0)');
        ug.addColorStop(0.5, `rgba(244,185,66,${letterAlpha * 0.8})`);
        ug.addColorStop(1, 'rgba(244,185,66,0)');
        ctx.fillStyle = ug; ctx.fillRect(lx-uw/2, ly+38, uw, 2);
      }
    }
  };

  useEffect(()=>{
    let raf:number;
    const loop=()=>{
      tkRef.current+=0.022;
      const op=phase==='opening'?doorPct:0;
      if(leftRef.current) paintPanel(leftRef.current,'left',tkRef.current,op);
      if(rightRef.current) paintPanel(rightRef.current,'right',tkRef.current,op);
      raf=requestAnimationFrame(loop);
    };
    loop(); return ()=>cancelAnimationFrame(raf);
  },[phase,doorPct]);

  // Brain / AI loading canvas
  useEffect(()=>{
    const canvas=brainRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d')!;
    const W=280,H=220; canvas.width=W; canvas.height=H;
    const CX=W/2,CY=H/2-10;
    const Ln=[{x:CX-52,y:CY-62},{x:CX-82,y:CY-32},{x:CX-88,y:CY+5},{x:CX-74,y:CY+40},{x:CX-48,y:CY+58},{x:CX-28,y:CY-28},{x:CX-38,y:CY+14},{x:CX-18,y:CY-55}];
    const Rn=[{x:CX+52,y:CY-62},{x:CX+82,y:CY-32},{x:CX+88,y:CY+5},{x:CX+74,y:CY+40},{x:CX+48,y:CY+58},{x:CX+28,y:CY-28},{x:CX+38,y:CY+14},{x:CX+18,y:CY-55}];
    const all=[...Ln,...Rn];
    const cs=[[0,5],[5,7],[7,0],[1,2],[2,3],[3,4],[4,6],[5,6],[8,13],[13,15],[15,8],[9,10],[10,11],[11,12],[12,14],[13,14],[5,13],[6,14]];
    const ps:{a:number;b:number;t:number;s:number}[]=[];
    const seed=()=>{const c=cs[Math.floor(Math.random()*cs.length)];ps.push({a:c[0],b:c[1],t:0,s:0.022+Math.random()*0.025});};
    for(let i=0;i<9;i++) seed();
    let tk=0; let raf2:number;
    const draw=()=>{
      ctx.clearRect(0,0,W,H); tk+=0.025;
      const ag=ctx.createRadialGradient(CX,CY,0,CX,CY,100);
      ag.addColorStop(0,'rgba(244,185,66,0.07)'); ag.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=ag; ctx.fillRect(0,0,W,H);
      cs.forEach(([a,b])=>{
        ctx.beginPath(); ctx.moveTo(all[a].x,all[a].y); ctx.lineTo(all[b].x,all[b].y);
        ctx.strokeStyle='rgba(244,185,66,0.18)'; ctx.lineWidth=0.8; ctx.stroke();
      });
      ctx.beginPath(); ctx.moveTo(CX,CY-78); ctx.lineTo(CX,CY+68);
      ctx.strokeStyle='rgba(244,185,66,0.1)'; ctx.lineWidth=1.5; ctx.stroke();
      for(let i=ps.length-1;i>=0;i--){
        const p=ps[i]; p.t+=p.s;
        if(p.t>=1){ps.splice(i,1);seed();continue;}
        const n1=all[p.a],n2=all[p.b]; if(!n1||!n2) continue;
        const px=n1.x+(n2.x-n1.x)*p.t,py=n1.y+(n2.y-n1.y)*p.t;
        const pg=ctx.createRadialGradient(px,py,0,px,py,9);
        pg.addColorStop(0,'#F4B942'); pg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(px,py,9,0,Math.PI*2); ctx.fillStyle=pg; ctx.fill();
        ctx.beginPath(); ctx.arc(px,py,2.5,0,Math.PI*2); ctx.fillStyle='#F4B942'; ctx.fill();
      }
      all.forEach((n,i)=>{
        const pls=0.4+0.5*Math.sin(tk*2.5+i*0.85);
        const ng=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,7);
        ng.addColorStop(0,`rgba(244,185,66,${pls*0.85})`); ng.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(n.x,n.y,7,0,Math.PI*2); ctx.fillStyle=ng; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x,n.y,2.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,220,120,${0.7+pls*0.3})`; ctx.fill();
      });
      ctx.save();
      ctx.shadowColor='#F4B942'; ctx.shadowBlur=20+7*Math.sin(tk);
      ctx.font='bold 60px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle=`rgba(255,255,255,${0.82+0.18*Math.sin(tk*1.5)})`;
      ctx.fillText('AI',CX,CY+4); ctx.restore();
      ctx.font='9px monospace'; ctx.textAlign='center';
      ctx.fillStyle='rgba(244,185,66,0.5)';
      const bar='▮'.repeat((Math.floor(tk*4)%4)+1);
      ctx.fillText(`INKANYEZI OS  ${bar}`,CX,CY+82);
      raf2=requestAnimationFrame(draw);
    };
    draw();
    const t=setTimeout(()=>{cancelAnimationFrame(raf2);setPhase('opening');},2500);
    return ()=>{cancelAnimationFrame(raf2);clearTimeout(t);};
  },[]);

  useEffect(()=>{
    if(phase!=='opening') return;
    const dur=900,start=performance.now();
    const run=(now:number)=>{
      const p=Math.min((now-start)/dur,1);
      setDoorPct(1-Math.pow(1-p,3));
      if(p<1) animRef.current=requestAnimationFrame(run);
      else setTimeout(onComplete,60);
    };
    animRef.current=requestAnimationFrame(run); return ()=>cancelAnimationFrame(animRef.current);
  },[phase,onComplete]);

  const slide=doorPct*52;
  const brainFade=phase==='brain'?1:Math.max(0,1-doorPct*2.2);

  return (
    <div style={{position:'absolute',inset:0,display:'flex',overflow:'hidden',borderRadius:20}}>
      {/* LEFT DOOR */}
      <div style={{position:'absolute',top:0,left:0,bottom:0,width:'50%',zIndex:6,transform:`translateX(-${slide}%)`,overflow:'hidden'}}>
        <canvas ref={leftRef} width={185} height={580} style={{display:'block',width:'100%',height:'100%'}}/>

      </div>
      {/* RIGHT DOOR */}
      <div style={{position:'absolute',top:0,right:0,bottom:0,width:'50%',zIndex:6,transform:`translateX(${slide}%)`,overflow:'hidden'}}>
        <canvas ref={rightRef} width={185} height={580} style={{display:'block',width:'100%',height:'100%'}}/>

      </div>
      {/* BRAIN */}
      <div style={{position:'absolute',inset:0,zIndex:7,opacity:brainFade,pointerEvents:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <canvas ref={brainRef} style={{width:280,height:220}}/>
      </div>
      {/* No center seam — panel plasma conduits provide the visual separation */}
    </div>
  );
}
// ════════════════════════════════════════════════════════════════════
function InkanyeziBotWidget() {
  const [isOpen, setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([{
    role:'assistant',
    content:"Sawubona! 👋 I'm InkanyeziBot — your AI guide to automation for South African businesses.\n\nBy chatting, you agree to our POPIA-compliant data policy.\n\nWhat does your business do, and what's the biggest challenge slowing you down right now?",
  }]);
  const [input, setInput]             = useState('');
  const [isLoading, setIsLoading]     = useState(false);
  const [sessionContext, setSessionContext] = useState<any>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2,9)}`);
  const [showLeadForm, setShowLeadForm]           = useState(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting]       = useState(false);
  const [showGreeting, setShowGreeting]       = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [showDoor, setShowDoor]               = useState(false);
  const [openKey, setOpenKey]                 = useState(0);
  const [isFullscreen, setIsFullscreen]       = useState(false);

  const [isListening, setIsListening]   = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [showMicHint, setShowMicHint]   = useState(false);
  const recognitionRef = useRef<any>(null);

  // Voice fill helper — fills a form field by name using speech
  const startVoiceForField = (fieldSetter: (v: string) => void) => {
    if (!recognitionRef.current) return;
    const r = recognitionRef.current;
    r.onresult = (e: any) => {
      const t = Array.from(e.results).map((r: any) => r[0].transcript).join('');
      fieldSetter(t);
      if (e.results[e.results.length - 1].isFinal) setIsListening(false);
    };
    r.onerror = () => setIsListening(false);
    r.onend   = () => setIsListening(false);
    setInput('');
    setIsListening(true);
    r.start();
  };

  const hasTriggered = useRef(false);
  const messagesEnd  = useRef<HTMLDivElement>(null);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior:'smooth' }); }, [messages, showLeadForm, isLoading]);

  /* ── Speech Recognition setup ── */
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setMicSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = 'en-ZA';
      recognition.onresult = (e: any) => {
        const transcript = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join('');
        setInput(transcript);
        if (e.results[e.results.length - 1].isFinal) {
          setIsListening(false);
        }
      };
      recognition.onerror = (e: any) => {
        // 'no-speech' means silence — just restart automatically
        if (e.error === 'no-speech') {
          try { recognition.stop(); } catch (_e) { /* suppress */ }
          setTimeout(() => {
            try { recognition.start(); } catch (_e) { /* suppress */ }
          }, 200);
        } else {
          setIsListening(false);
        }
      };
      recognition.onend = () => {
        // If still listening (didn't get final result), restart
        setIsListening(prev => {
          if (prev) {
            setTimeout(() => { try { recognition.start(); } catch (_e) { /* suppress */ } }, 100);
            return true;
          }
          return false;
        });
      };
      recognitionRef.current = recognition;
      if (!localStorage.getItem('ink_mic_seen')) {
        setTimeout(() => setShowMicHint(true), 3000);
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    localStorage.setItem('ink_mic_seen', '1');
    setShowMicHint(false);
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ════════════════════════════════════════════════════════════════════
  // MODERN SESSION MANAGEMENT
  // Best practices: sessionStorage, Visibility API, scroll depth,
  // returning visitor detection, active-time-only inactivity timer
  // ════════════════════════════════════════════════════════════════════

  useEffect(() => {
    const STORAGE_KEY = 'inkanyezi_chat_session';
    const VISITOR_KEY = 'inkanyezi_visitor';
    const INACTIVITY_MS = 20 * 60 * 1000;  // 20min of ACTIVE time
    const GREETING_SCROLL = 0.35;           // trigger greeting at 35% scroll depth

    // ── 1. RETURNING VISITOR DETECTION ─────────────────────────────
    // localStorage persists across sessions — detects returning visitors
    const visitCount = parseInt(localStorage.getItem(VISITOR_KEY) || '0') + 1;
    localStorage.setItem(VISITOR_KEY, String(visitCount));

    // Returning visitor gets a more personalised proactive greeting
    if (visitCount > 1) {
      const savedName = localStorage.getItem('inkanyezi_name');
      // Will be used by the greeting popup to personalise the message
      (window as any).__inkanyezi_returning = { count: visitCount, name: savedName };
    }

    // ── 2. SESSION STATE PERSISTENCE (sessionStorage) ──────────────
    // sessionStorage clears when the tab is closed — ideal for chat
    // Restore any in-progress conversation if user refreshed the page
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.messages?.length > 1) {
          setMessages(parsed.messages);
          if (parsed.sessionContext) setSessionContext(parsed.sessionContext);
          // Don't auto-reopen — user can click the bubble to continue
        }
      }
    } catch (_e) { /* suppress */ }

    // ── 3. ACTIVE-TIME-ONLY INACTIVITY TIMER ───────────────────────
    // Only count time when the page is VISIBLE and FOCUSED
    // Prevents resetting just because user left the tab open overnight
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;
    let isPageVisible = !document.hidden;
    let isPageFocused = document.hasFocus();

    const doReset = () => {
      setIsOpen(false);
      setShowDoor(false);
      setShowGreeting(false);
      setGreetingVisible(false);
      setMessages([{
        role: 'assistant',
        content: "Sawubona! 👋 I'm InkanyeziBot — your AI guide to automation for South African businesses.\n\nBy chatting, you agree to our POPIA-compliant data policy.\n\nWhat does your business do, and what's the biggest challenge slowing you down right now?",
      }]);
      setInput('');
      setShowLeadForm(false);
      setLeadFormSubmitted(false);
      setSessionContext(null);
      hasTriggered.current = false;
      sessionStorage.removeItem(STORAGE_KEY);
    };

    const startTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (isPageVisible && isPageFocused) {
        inactivityTimer = setTimeout(doReset, INACTIVITY_MS);
      }
    };

    const stopTimer = () => {
      if (inactivityTimer) { clearTimeout(inactivityTimer); inactivityTimer = null; }
    };

    // Activity events — restart the timer on any interaction
    const onActivity = () => { if (isPageVisible && isPageFocused) startTimer(); };
    const activityEvents = ['mousedown','keydown','touchstart','scroll','click'];
    activityEvents.forEach(e => window.addEventListener(e, onActivity, { passive: true }));

    // ── 4. VISIBILITY API — pause timer when tab is hidden ─────────
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isPageFocused) startTimer();
      else stopTimer();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ── 5. WINDOW FOCUS/BLUR — pause when window loses focus ───────
    const onFocus = () => { isPageFocused = true; startTimer(); };
    const onBlur  = () => { isPageFocused = false; stopTimer(); };
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    // ── 6. SCROLL DEPTH TRIGGER — smarter than time-only ───────────
    // Trigger proactive greeting when user scrolls 35% of page
    // Shows genuine interest — more relevant than just time on page
    let greetingFired = false;
    const onScroll = () => {
      if (greetingFired) return;
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= GREETING_SCROLL) {
        greetingFired = true;
        // Only show if chat isn't already open
        // (The existing 8s timer will handle this via setShowGreeting)
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 7. SAVE SESSION ON MESSAGE CHANGE ──────────────────────────
    // Will be called from a separate effect below

    startTimer(); // Begin tracking

    return () => {
      stopTimer();
      activityEvents.forEach(e => window.removeEventListener(e, onActivity));
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // ── SAVE CONVERSATION TO sessionStorage on every message ─────────
  // Allows page refresh to restore the conversation seamlessly
  useEffect(() => {
    if (messages.length <= 1) return; // Don't save just the greeting
    try {
      sessionStorage.setItem('inkanyezi_chat_session', JSON.stringify({
        messages: messages.slice(-20), // Keep last 20 messages only
        sessionContext,
        savedAt: Date.now(),
      }));
      // Save customer name to localStorage for returning visitor greeting
      if (sessionContext?.name) {
        localStorage.setItem('inkanyezi_name', sessionContext.name);
      }
    } catch (_e) { /* suppress */ }
  }, [messages, sessionContext]);

  // Proactive greeting after 8s
  useEffect(() => {
    const show = setTimeout(() => { if (!isOpen) { setShowGreeting(true); setTimeout(() => setGreetingVisible(true), 50); } }, 8000);
    const hide = setTimeout(() => { setGreetingVisible(false); setTimeout(() => setShowGreeting(false), 400); }, 20000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { setGreetingVisible(false); setTimeout(() => setShowGreeting(false), 400); }
  }, [isOpen]);

  // Lead form trigger — fires on intent keywords OR after 4 exchanges
  // Bot sends a warm transition message first, then form slides in 1.5s later
  useEffect(() => {
    if (hasTriggered.current || leadFormSubmitted || isLoading) return;
    const userMsgs = messages.filter(m => m.role === 'user');
    const lastBotMsg = [...messages].reverse().find(m => m.role === 'assistant')?.content || '';
    const allText = messages.map(m => m.content).join(' ').toLowerCase();

    // Intent keywords — client signals they want to connect or share details
    const intentKeywords = [
      'contact','details','reach out','get in touch','sign up','sign me up',
      'interested','ready','book','schedule','call me','whatsapp me',
      'my number','my email','send me','how do i start','how much','pricing','quote',
      'get started','i want','sounds good','yes please',
    ];
    const hasIntent = intentKeywords.some(kw => allText.includes(kw));

    // Trigger on: intent detected after 1+ exchanges, OR naturally after 4 exchanges
    const shouldTrigger = (hasIntent && userMsgs.length >= 1) || userMsgs.length >= 4;

    if (shouldTrigger) {
      hasTriggered.current = true;
      // Bot sends a warm, short bridge message, then form appears
      const bridgeMsg = sessionContext?.name
        ? `Perfect${sessionContext.name ? `, ${sessionContext.name.split(' ')[0]}` : ''}. Let me get your details so Sanele can follow up personally — takes 30 seconds. 👇`
        : `Great — let me grab a few details so Sanele can follow up with you directly. Takes about 30 seconds. 👇`;
      // Only add the bridge if the last bot message didn't already invite details
      const alreadyInvited = lastBotMsg.toLowerCase().includes('detail') || lastBotMsg.toLowerCase().includes('follow up') || lastBotMsg.toLowerCase().includes('reach');
      if (!alreadyInvited) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role:'assistant', content: bridgeMsg }]);
        }, 400);
      }
      setTimeout(() => setShowLeadForm(true), alreadyInvited ? 800 : 2000);
    }
  }, [messages, leadFormSubmitted, isLoading, sessionContext]);

  const sendMessage = async (text?: string) => {
    const content = (text||input).trim();
    if (!content||isLoading) return;
    const userMessage  = { role:'user', content };
    const newMessages  = [...messages, userMessage];
    setMessages(newMessages); setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsLoading(true);
    try {
      const res  = await fetch('https://inkanyezibot-v2.vercel.app/api/chat', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ messages:newMessages, sessionId }),
      });
      const data = await res.json();
      const cleanMessage = (data.message || '')
        .replace(/<context>[\s\S]*?<\/context>/gi, '')
        .replace(/<response>|<\/response>/gi, '')
        .trim();
      setMessages([...newMessages, { role:'assistant', content: cleanMessage }]);
      if (data.context) {
        setSessionContext(data.context);
        if (data.context.conversation_complete && !sessionContext?.conversation_complete) {
          setTimeout(() => {
            setMessages(prev => [...prev, { role:'assistant', content:`Your reference is ${data.context.referenceNumber}. Sanele will be in touch within 24 hours — feel free to reach out on WhatsApp (+27 65 880 4122) anytime. Sharp! 🇿🇦` }]);
          }, 1500);
        }
      }
    } catch {
      setMessages([...newMessages, { role:'assistant', content:'Something went wrong — please try again.' }]);
    } finally { setIsLoading(false); }
  };

  const handleLeadSubmit = useCallback(async (formData: any) => {
    setLeadSubmitting(true);
    try {
      const userMsgs = messages.filter(m => m.role==='user');
      const lastMsg  = userMsgs[userMsgs.length-1]?.content||'';
      const { score } = scoreConversation(sessionContext, userMsgs.length, lastMsg);
      const payload = {
        name:             formData.name    || sessionContext?.name     || '',
        email:            formData.email   || sessionContext?.email    || '',
        phone:            formData.phone   || sessionContext?.whatsapp || '',
        company:          formData.company || sessionContext?.business || '',
        industry:         formData.industry|| sessionContext?.industry || '',
        service_interest: formData.service_interest || '',
        message:          formData.message || sessionContext?.pain_point || '',
        has_email:        (formData.email||sessionContext?.email)    ? 'true':'false',
        has_whatsapp:     (formData.phone||sessionContext?.whatsapp) ? 'true':'false',
        source:           'lovable-site-lead-form',
        session_id:       sessionId,
        message_count:    userMsgs.length,
        conversation_summary: messages.slice(-6).map(m=>`${m.role==='user'?'Customer':'Bot'}: ${m.content}`).join('\n'),
        qualification_stage: sessionContext?.qualification_stage||'new',
        pain_point:          sessionContext?.pain_point||'',
        budget_signal:       sessionContext?.budget_signal||'',
        demo_booked:         sessionContext?.demo_booked||false,
        reference_number:    sessionContext?.referenceNumber||'',
        trigger_score:       score,
        timestamp:           new Date().toISOString(),
        sast_time:           new Date().toLocaleString('en-ZA',{timeZone:'Africa/Johannesburg'}),
      };
      const url = 'https://hook.eu1.make.com/f4g89bwx1cor5euqad24pknn2iqbrmum';
      await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
      setLeadFormSubmitted(true); setShowLeadForm(false);
      setTimeout(() => {
        const firstName = formData.name?.split(' ')[0] || sessionContext?.name?.split(' ')[0] || '';
        const biz = formData.company || sessionContext?.business || 'your business';
        const industry = formData.industry || sessionContext?.industry || '';
        const industryLine = industry ? ` in the ${industry} space` : '';
        setMessages(prev => [...prev, { role:'assistant', content:`✦ All locked in${firstName ? `, ${firstName}` : ''}! Sanele will personally reach out to you about ${biz}${industryLine} within 24 hours.\n\nIn the meantime — is there anything specific about how we automate ${biz} that you'd like me to explain?` }]);
      }, 700);
      return { success:true };
    } catch { return { success:false }; }
    finally { setLeadSubmitting(false); }
  }, [messages, sessionContext, sessionId]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        @keyframes ping { 0%{transform:scale(1);opacity:0.8;} 70%{transform:scale(2.2);opacity:0;} 100%{transform:scale(2.2);opacity:0;} }
        @keyframes floatBubble { 0%,100%{transform:translateY(0) scale(1);box-shadow:0 0 30px rgba(249,115,22,0.55),0 0 60px rgba(249,115,22,0.2);} 50%{transform:translateY(-6px) scale(1.03);box-shadow:0 0 40px rgba(249,115,22,0.7),0 0 80px rgba(249,115,22,0.3);} }
        @keyframes orbitRing { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes windowSlide { 
          0%  { opacity:0; transform:translateY(30px) scaleY(0.05) scaleX(0.8); transform-origin: bottom center; }
          40% { opacity:1; transform:translateY(0) scaleY(0.6) scaleX(1); transform-origin: bottom center; }
          70% { transform:translateY(0) scaleY(1.02) scaleX(1); transform-origin: bottom center; }
          100%{ transform:translateY(0) scaleY(1) scaleX(1); transform-origin: bottom center; }
        }
        @keyframes headerShimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes shimmerBar { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes msgFadeUp { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        @keyframes thinkPulse { 0%,80%,100%{opacity:0.15;transform:scale(0.8);} 40%{opacity:1;transform:scale(1);} }
        @keyframes chipAppear { from{opacity:0;transform:translateX(-6px);} to{opacity:1;transform:translateX(0);} }
        @keyframes rocketGlow { 0%,100%{box-shadow:0 0 14px rgba(249,115,22,0.5);} 50%{box-shadow:0 0 22px rgba(249,115,22,0.8),0 0 40px rgba(249,115,22,0.3);} }
        @keyframes micPulse { 0%,100%{box-shadow:0 0 0 0 rgba(244,185,66,0.6);} 50%{box-shadow:0 0 0 10px rgba(244,185,66,0);} }
        @keyframes micHintPop { from{opacity:0;transform:translateX(-50%) translateY(4px);} to{opacity:1;transform:translateX(-50%) translateY(0);} }
        @keyframes starTwinkle { 0%,100%{opacity:0.6;} 50%{opacity:1;} }
        .ink-msgs canvas { position:absolute; inset:0; pointer-events:none; z-index:0; border-radius:0; }
        .ink-msgs > *:not(canvas) { position:relative; z-index:1; }
        @supports (height: 100dvh) {
          .ink-widget-container { height: min(580px, calc(100dvh - 100px)) !important; }
          .ink-widget-container.ink-fullscreen { height: 100dvh !important; width: 100vw !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
        }
        @supports (height: 100svh) {
          .ink-widget-container { height: min(580px, calc(100svh - 100px)) !important; }
        }
        .ink-widget-inner { display:flex; flex-direction:column; height:100%; overflow:hidden; }
        .ink-msgs { flex:1 1 0 !important; min-height:0 !important; }
        .ink-input-bar { flex-shrink:0; }
        .ink-bubble-hidden { opacity:0 !important; pointer-events:none !important; }
        @keyframes greetingPop { from{opacity:0;transform:translateY(10px) scale(0.95);} to{opacity:1;transform:translateY(0) scale(1);} }
        .ink-msg { animation: msgFadeUp 0.3s ease forwards; }
        .ink-chip { animation: chipAppear 0.3s ease forwards; transition: all 0.2s !important; }
        .ink-chip:hover { background: rgba(244,185,66,0.12) !important; border-color: #F4B942 !important; color: #1a1a2e !important; transform: translateX(2px); }
        .ink-rocket { animation: rocketGlow 2s ease infinite; }
        .ink-rocket:hover:not(:disabled) { transform: scale(1.08) rotate(-5deg) !important; box-shadow: 0 0 30px rgba(249,115,22,0.9) !important; }
        .ink-msgs::-webkit-scrollbar { width: 3px; }
        .ink-msgs::-webkit-scrollbar-track { background: transparent; }
        .ink-msgs::-webkit-scrollbar-thumb { background: rgba(244,185,66,0.4); border-radius: 2px; }
        .ink-textarea::placeholder { color: rgba(100,110,130,0.5) !important; }
        @keyframes closePulse {
          0%   { box-shadow: 0 0 0 0 rgba(229,62,62,0.6), 0 4px 20px rgba(229,62,62,0.4); transform: scale(1); }
          50%  { box-shadow: 0 0 0 10px rgba(229,62,62,0), 0 4px 20px rgba(229,62,62,0.4); transform: scale(1.06); }
          100% { box-shadow: 0 0 0 0 rgba(229,62,62,0), 0 4px 20px rgba(229,62,62,0.4); transform: scale(1); }
        }
      `}</style>

      {/* ── PROACTIVE GREETING ── */}
      {showGreeting && !isOpen && (
        <div onClick={()=>{ setShowDoor(true); setOpenKey(k=>k+1); }} style={{ position:'fixed', bottom:100, right:24, zIndex:10001, maxWidth:260, cursor:'pointer', opacity:greetingVisible?1:0, transform:greetingVisible?'translateY(0) scale(1)':'translateY(10px) scale(0.95)', transition:'opacity 0.35s ease, transform 0.35s ease' }}>
          <div style={{ background:'linear-gradient(145deg, rgba(15,27,53,0.98), rgba(10,22,40,0.98))', border:'1px solid rgba(249,115,22,0.25)', borderRadius:16, borderBottomRightRadius:4, padding:'12px 14px', boxShadow:'0 8px 32px rgba(0,0,0,0.5)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:1.5, background:'linear-gradient(90deg, transparent, rgba(244,185,66,0.6), transparent)' }} />
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg, #FF6B35, #c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, boxShadow:'0 0 10px rgba(249,115,22,0.5)' }}>⭐</div>
              <div>
                <div style={{ fontSize:'0.7rem', fontWeight:700, color:'#fff', fontFamily:"'Syne',sans-serif" }}>InkanyeziBot</div>
                <div style={{ fontSize:'0.55rem', color:'#f97316', fontFamily:"'Space Mono',monospace", display:'flex', alignItems:'center', gap:4 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e', display:'inline-block' }} /> Online now
                </div>
              </div>
            </div>
            <p style={{ margin:0, fontSize:'0.78rem', color:'rgba(255,255,255,0.85)', lineHeight:1.55, fontFamily:"'DM Sans',sans-serif" }}>
              {(() => {
                const r = (window as any).__inkanyezi_returning;
                if (r?.count > 1 && r?.name) {
                  return <>Welcome back, <span style={{color:'#F4B942',fontWeight:600}}>{r.name}</span>! 👋 Ready to continue where we left off?</>;
                } else if (r?.count > 1) {
                  return <>Welcome back! 👋 <span style={{color:'#F4B942',fontWeight:600}}>Shall we continue exploring AI for your business?</span></>;
                } else {
                  return <>Sawubona! 👋 Automating a South African business?{' '}<span style={{color:'#F4B942',fontWeight:600}}>I can show you how in 3 minutes.</span></>;
                }
              })()}
            </p>
            <div style={{ marginTop:8, display:'flex', alignItems:'center', gap:4, fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', fontFamily:"'Space Mono',monospace" }}>
              <span>Tap to chat</span><span style={{color:'#F4B942'}}>→</span>
            </div>
          </div>
          <div style={{ position:'absolute', bottom:-7, right:18, width:0, height:0, borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:'8px solid rgba(15,27,53,0.98)' }} />
        </div>
      )}

      {/* ── FLOATING BUBBLE — only when chat is closed, never overlaps input bar ── */}
      {!isOpen && !showDoor && (
        <button
          onClick={()=>{ setShowDoor(true); setOpenKey(k=>k+1); }}
          aria-label="Open InkanyeziBot"
          style={{
            position:'fixed', bottom:24, right:24, zIndex:99999,
            width:52, height:52, borderRadius:'50%',
            background:'linear-gradient(135deg, #FF6B35, #c2410c)',
            border:'2px solid rgba(249,115,22,0.45)',
            cursor:'pointer', fontSize:26,
            animation:'floatBubble 3s ease-in-out infinite',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background 0.3s',
            boxShadow:'0 0 30px rgba(249,115,22,0.55)',
          }}>
          <div style={{ position:'absolute', width:52, height:52, animation:'orbitRing 4s linear infinite', pointerEvents:'none' }}>
            <div style={{ position:'absolute', top:-3, left:'50%', width:7, height:7, borderRadius:'50%', background:C.gold, transform:'translateX(-50%)', boxShadow:`0 0 10px ${C.gold}` }} />
          </div>
          <span style={{ position:'relative', zIndex:1 }}>⭐</span>
        </button>
      )}

      {/* ── UNIFIED CONTAINER — door + chat always together, no gap ── */}
      {(showDoor || isOpen) && (
        <div className={`ink-widget-container${isFullscreen?' ink-fullscreen':''}`} style={{
          position:'fixed',
          bottom: isFullscreen ? 0 : 82,
          right:  isFullscreen ? 0 : 24,
          left:   isFullscreen ? 0 : 'auto',
          top:    isFullscreen ? 0 : 'auto',
          width:  isFullscreen ? '100vw' : 'min(370px, calc(100vw - 32px))',
          height: isFullscreen ? '100vh' : 'min(580px, calc(100vh - 110px))',
          zIndex:99998,
          borderRadius: isFullscreen ? 0 : 20,
          overflow:'hidden',
          boxShadow: isFullscreen ? 'none' : '0 0 0 1px rgba(244,185,66,0.15), 0 8px 40px rgba(0,0,0,0.25)',
          transition:'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}>

          <div className="ink-widget-inner" style={{
            position:'absolute', inset:0,
            display:'flex', flexDirection:'column',
            borderRadius:20, overflow:'hidden',
            background:'#FAFBFC',
          }}>

          {/* Header */}
          <div style={{
            position:'relative', zIndex:2, flexShrink:0,
            background:'linear-gradient(135deg, #ffffff 0%, #f8f6f0 100%)',
            borderBottom:'1px solid rgba(244,185,66,0.3)',
            boxShadow:'0 1px 8px rgba(0,0,0,0.06)',
            padding:'12px 16px', display:'flex', alignItems:'center', gap:12,
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${C.gold}, ${C.orange}, ${C.gold}, transparent)`, backgroundSize:'200% 100%', animation:'headerShimmer 3s linear infinite' }} />
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(135deg, #FF6B35, #c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, boxShadow:'0 0 16px rgba(249,115,22,0.6)' }}>⭐</div>
              <div style={{ position:'absolute', inset:-4, animation:'orbitRing 5s linear infinite', pointerEvents:'none' }}>
                <div style={{ position:'absolute', top:0, left:'50%', width:5, height:5, borderRadius:'50%', background:C.gold, transform:'translateX(-50%)', boxShadow:`0 0 6px ${C.gold}` }} />
              </div>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, color:'#1a1a2e', letterSpacing:'-0.01em' }}>InkanyeziBot <span style={{ fontSize:11, color:C.gold, fontFamily:"'Space Mono',monospace", fontWeight:400 }}>✦</span></div>
              <div style={{ fontSize:11, color:'#F4B942', display:'flex', alignItems:'center', gap:5, fontFamily:"'DM Sans',sans-serif" }}>
                <SignalDot /><span>Online · AI Automation · Durban, ZA</span>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
              <button
                onClick={() => setIsFullscreen(f => !f)}
                title={isFullscreen ? 'Minimise' : 'Expand'}
                style={{ width:28, height:28, borderRadius:6, background:'rgba(244,185,66,0.08)', border:'1px solid rgba(244,185,66,0.25)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:13, color:'#6B4F10', transition:'all 0.2s', flexShrink:0 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(244,185,66,0.2)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(244,185,66,0.08)';}}
              >{isFullscreen ? '⊡' : '⤢'}</button>
              {/* Close button — lives in header, never covers input bar */}
              <button
                onClick={() => { setIsOpen(false); setIsFullscreen(false); }}
                title="Close chat"
                style={{ width:28, height:28, borderRadius:6, background:'rgba(229,62,62,0.08)', border:'1px solid rgba(229,62,62,0.25)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:13, color:'#c53030', transition:'all 0.2s', flexShrink:0 }}
                onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(229,62,62,0.2)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(229,62,62,0.08)';}}
              >✕</button>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:10, color:'rgba(100,80,20,0.5)', fontFamily:"'Space Mono',monospace" }}>🇿🇦 SA AI</div>
                <HeritageStrip style={{ justifyContent:'flex-end', marginTop:3 }} />
              </div>
            </div>
          </div>

          {/* Messages — with twinkling star background */}
          <div className="ink-msgs" style={{ flex:'1 1 0', minHeight:0, overflowY:'auto', padding:'14px 14px 6px', display:'flex', flexDirection:'column', gap:10, background:'#0A1628', position:'relative' }}>
            <CosmosCanvas width={370} height={580} />
            {messages.map((msg,i) => (
              <div key={i} className="ink-msg" style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', alignItems:'flex-end', gap:6, animationDelay:`${i*0.03}s` }}>
                {msg.role==='assistant' && (
                  <div style={{ width:24, height:24, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg, #FF6B35, #c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, boxShadow:'0 0 8px rgba(249,115,22,0.4)' }}>⭐</div>
                )}
                <div style={{ maxWidth:'78%', padding:'10px 13px', borderRadius:14, fontSize:13, lineHeight:1.6, wordBreak:'break-word', background:msg.role==='user'?'linear-gradient(135deg, #F4B942, #FF6B35)':'linear-gradient(145deg, rgba(18,32,60,0.96) 0%, rgba(10,22,40,0.98) 100%)', color:msg.role==='user'?'#1a1a2e':'rgba(240,245,255,0.95)', border:msg.role==='user'?'1px solid rgba(255,200,80,0.4)':'1px solid rgba(120,160,255,0.18)', boxShadow:msg.role==='user'?'0 2px 14px rgba(244,185,66,0.35), 0 1px 0 rgba(255,230,120,0.4) inset, 0 -1px 0 rgba(180,100,20,0.3) inset':'0 4px 20px rgba(0,0,20,0.6), 0 1px 0 rgba(130,170,255,0.15) inset, 0 -1px 0 rgba(0,0,30,0.5) inset, 1px 0 0 rgba(100,140,255,0.08) inset', borderBottomLeftRadius:msg.role==='assistant'?3:14, borderBottomRightRadius:msg.role==='user'?3:14, fontFamily:"'DM Sans',sans-serif" }}
                  dangerouslySetInnerHTML={{ __html:formatMessage(msg.content) }} />
              </div>
            ))}



            {/* Lead form */}
            {showLeadForm && !leadFormSubmitted && (
              <ChatLeadForm onSubmit={handleLeadSubmit} onDismiss={()=>setShowLeadForm(false)} sessionContext={sessionContext} submitting={leadSubmitting} onVoiceField={micSupported ? startVoiceForField : undefined} />
            )}

            {/* Thinking */}
            {isLoading && (
              <div style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
                <div style={{ width:24, height:24, borderRadius:'50%', background:'linear-gradient(135deg, #FF6B35, #c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, flexShrink:0 }}>⭐</div>
                <div style={{ background:'rgba(255,255,255,0.95)', padding:'12px 16px', borderRadius:14, borderBottomLeftRadius:3, border:'1px solid rgba(244,185,66,0.2)', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:5 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#F4B942', opacity:0.4, animation:'thinkPulse 1.2s ease-in-out infinite', animationDelay:`${i*0.2}s` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="ink-input-bar" style={{ flexShrink:0, padding:'10px 12px 12px', borderTop:'1px solid rgba(244,185,66,0.2)', background:'#FFFFFF' }}>
            <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
              <textarea ref={textareaRef} value={input} className="ink-textarea"
                onChange={e => { setInput(e.target.value); e.target.style.height='auto'; e.target.style.height=Math.min(e.target.scrollHeight,96)+'px'; }}
                onKeyDown={e => { if (e.key==='Enter'&&!e.shiftKey&&!('ontouchstart' in window)) { e.preventDefault(); sendMessage(); } }}
                placeholder={isListening ? '🎙 Listening… speak now' : 'Type or tap 🎙 to speak...'} rows={1}
                autoComplete="on" autoCorrect="on" autoCapitalize="sentences" spellCheck={true}
                style={{ flex:1, padding:'9px 13px', borderRadius:14, background:'#F5F7FA', border:`1px solid ${isListening ? '#F4B942' : 'rgba(244,185,66,0.3)'}`, color:'#1a1a2e', outline:'none', fontSize:16, resize:'none', lineHeight:1.5, wordBreak:'break-word', overflowWrap:'break-word', whiteSpace:'pre-wrap', overflowX:'hidden', overflowY:'auto', maxHeight:120, width:'100%', boxSizing:'border-box', fontFamily:"'DM Sans',sans-serif", transition:'border-color 0.2s', WebkitAppearance:'none' }}
                onFocus={e=>e.target.style.borderColor='#F4B942'}
                onBlur={e=>e.target.style.borderColor=isListening?'#F4B942':'rgba(244,185,66,0.3)'}
              />
              {/* Mic button — speech to text */}
              {micSupported && (
                <div style={{ position:'relative', flexShrink:0 }}>
                  {showMicHint && !isListening && (
                    <div style={{
                      position:'absolute', bottom:50, left:'50%', transform:'translateX(-50%)',
                      background:'#0A1628', color:'#F4B942', fontSize:11, whiteSpace:'nowrap',
                      padding:'6px 12px', borderRadius:8, border:'1px solid rgba(244,185,66,0.4)',
                      fontFamily:"'Space Mono',monospace", pointerEvents:'none', zIndex:10,
                      animation:'micHintPop 0.3s ease',
                    }}>
                      🎙 Tap to speak
                      <div style={{ position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:'5px solid #0A1628' }} />
                    </div>
                  )}
                  <button
                    onPointerUp={toggleListening}
                    aria-label={isListening ? 'Stop recording' : 'Speak your message'}
                    style={{
                      width:42, height:42, borderRadius:'50%', flexShrink:0,
                      background: isListening ? 'linear-gradient(135deg,#F4B942,#FF6B35)' : 'rgba(244,185,66,0.15)',
                      border: isListening ? '2px solid #F4B942' : '1.5px solid rgba(244,185,66,0.5)',
                      color: isListening ? '#0A1628' : '#F4B942',
                      fontSize:18, cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all 0.2s',
                      animation: isListening ? 'micPulse 1.2s ease-in-out infinite' : 'none',
                      WebkitTapHighlightColor:'transparent',
                      touchAction:'manipulation',
                    }}>
                    {isListening ? '⏹' : '🎙'}
                  </button>
                </div>
              )}
              <button className="ink-rocket" onPointerUp={()=>sendMessage()} disabled={isLoading||!input.trim()}
                style={{ width:42, height:42, borderRadius:'50%', flexShrink:0, background:isLoading||!input.trim()?'rgba(249,115,22,0.3)':'linear-gradient(135deg, #FF6B35, #c2410c)', border:'none', cursor:isLoading||!input.trim()?'not-allowed':'pointer', color:C.white, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', opacity:isLoading||!input.trim()?0.5:1, touchAction:'manipulation', WebkitTapHighlightColor:'transparent' }}>
                🚀
              </button>
            </div>
            <div style={{ marginTop:6, textAlign:'center', fontSize:10, color:'rgba(150,120,60,0.6)', fontFamily:"'Space Mono',monospace", letterSpacing:'0.05em' }}>
              ✦ INKANYEZI TECHNOLOGIES · WE ARE THE SIGNAL IN THE NOISE ✦
            </div>
          </div>
          </div>

          {/* DOOR — sits on top of chat as absolute overlay */}
          {showDoor && (
            <div key={openKey} style={{
              position:'absolute', inset:0, zIndex:10,
              borderRadius:20, overflow:'hidden',
            }}>
              <DoorAnimationInline onComplete={() => {
                setShowDoor(false);
                setIsOpen(true);
              }} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// WHATSAPP WIDGET
// ════════════════════════════════════════════════════════════════════
function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 1500); return () => clearTimeout(t); }, []);
  return (
    <>
      <style>{`
        @keyframes waPulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,0.6);} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0);} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0);} }
        @keyframes waFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
        @keyframes waFade { from{opacity:0;transform:translateX(8px);} to{opacity:1;transform:translateX(0);} }
        .wa-btn { animation: waPulse 2.5s ease-out infinite, waFloat 3s ease-in-out infinite; transition: all 0.25s ease !important; }
        .wa-btn:hover { transform: scale(1.1) !important; box-shadow: 0 8px 30px rgba(37,211,102,0.6) !important; animation: none !important; }
        .wa-tip { animation: waFade 0.2s ease forwards; }
      `}</style>
      <div style={{ position:'fixed', bottom:88, right:24, zIndex:10002, display:'flex', alignItems:'center', gap:10, opacity:visible?1:0, transform:visible?'scale(1)':'scale(0.8)', transition:'opacity 0.4s ease, transform 0.4s ease' }}>
        {hovered && (
          <div className="wa-tip" style={{ background:'linear-gradient(135deg, rgba(10,22,40,0.98), rgba(4,8,15,0.98))', border:'1px solid rgba(37,211,102,0.3)', borderRadius:10, padding:'8px 14px', whiteSpace:'nowrap', boxShadow:'0 4px 20px rgba(0,0,0,0.5)', position:'relative' }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:"'Syne',sans-serif", marginBottom:2 }}>Chat with Sanele</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.5)', fontFamily:"'Space Mono',monospace" }}>+27 65 880 4122</div>
            <div style={{ position:'absolute', right:-6, top:'50%', transform:'translateY(-50%)', width:0, height:0, borderTop:'6px solid transparent', borderBottom:'6px solid transparent', borderLeft:'6px solid rgba(37,211,102,0.3)' }} />
          </div>
        )}
        <a href="https://wa.me/27658804122?text=Sawubona%21%20I%20visited%20Inkanyezi%20Technologies%20and%20would%20like%20to%20know%20more%20about%20AI%20automation%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="wa-btn" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
          style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg, #25D366, #128C7E)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', flexShrink:0 }} aria-label="Chat with us on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// SITE THEME TOGGLE — bottom-right floating button, above WhatsApp
// ════════════════════════════════════════════════════════════════════
function SiteThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg]         = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem('ink_theme_hint_seen')) return;
    const t = setTimeout(() => {
      setToastMsg('Tip: Switch dark / light mode');
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
        localStorage.setItem('ink_theme_hint_seen', '1');
      }, 3500);
    }, 4000);
    return () => clearTimeout(t);
  }, []);
 const handleToggle = () => {
    onToggle();
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(dark ? 'Light mode activated' : 'Dark mode activated');
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <>
      <div style={{
        position: 'fixed', bottom: 163, right: 84, zIndex: 99996,
        background: dark ? 'rgba(10,22,40,0.97)' : 'rgba(255,255,255,0.97)',
        border: '1px solid ' + (dark ? 'rgba(244,185,66,0.35)' : 'rgba(10,22,40,0.15)'),
        borderRadius: 10, padding: '7px 12px',
        fontFamily: "'Space Mono',monospace", fontSize: '0.6rem',
        color: dark ? '#F4B942' : '#374151', whiteSpace: 'nowrap',
        opacity: toastVisible ? 1 : 0,
        transform: toastVisible ? 'translateX(0)' : 'translateX(8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      }}>{toastMsg}</div>
      <button
        onClick={handleToggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position: 'fixed', bottom: 155, right: 24, zIndex: 99997,
          width: 52, height: 52, borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          background: dark ? 'linear-gradient(135deg, #0A1628, #0D1E35)' : '#FFFFFF',
          boxShadow: dark
            ? '0 0 0 1.5px rgba(244,185,66,0.4), 0 4px 20px rgba(0,0,0,0.5)'
            : '0 0 0 1.5px rgba(10,22,40,0.15), 0 4px 20px rgba(0,0,0,0.15)',
          transition: 'all 0.3s ease', backdropFilter: 'blur(10px)',
        }}>
        {dark ? '☀️' : '🌙'}
      </button>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════════════════════════
const Index = () => {
  const [siteDark, setSiteDark] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('ink_site_theme') === 'light') setSiteDark(false);
  }, []);

  const toggleTheme = () => {
    setSiteDark(d => { localStorage.setItem('ink_site_theme', d ? 'light' : 'dark'); return !d; });
  };

  useEffect(() => {
    const r = document.documentElement;
    if (siteDark) {
      r.classList.add('dark'); r.setAttribute('data-theme','dark'); r.style.colorScheme='dark';
      r.style.setProperty('--background','222 47% 6%'); r.style.setProperty('--foreground','210 40% 98%');
      r.style.setProperty('--card','222 47% 8%'); r.style.setProperty('--card-foreground','210 40% 98%');
      r.style.setProperty('--muted','217 33% 12%'); r.style.setProperty('--muted-foreground','215 20% 65%');
      r.style.setProperty('--border','217 33% 16%'); r.style.setProperty('--primary','38 89% 61%');
      r.style.setProperty('--popover','222 47% 8%'); r.style.setProperty('--popover-foreground','210 40% 98%');
    } else {
      r.classList.remove('dark'); r.setAttribute('data-theme','light'); r.style.colorScheme='light';
      r.style.setProperty('--background','210 40% 98%'); r.style.setProperty('--foreground','222 47% 11%');
      r.style.setProperty('--card','0 0% 100%'); r.style.setProperty('--card-foreground','222 47% 11%');
      r.style.setProperty('--muted','210 40% 93%'); r.style.setProperty('--muted-foreground','215 16% 47%');
      r.style.setProperty('--border','214 32% 85%'); r.style.setProperty('--primary','38 89% 55%');
      r.style.setProperty('--popover','0 0% 100%'); r.style.setProperty('--popover-foreground','222 47% 11%');
    }
  }, [siteDark]);

  return (
    <div
      className="min-h-screen bg-background text-foreground relative"
      data-theme={siteDark ? 'dark' : 'light'}
      style={{ transition: 'background-color 0.4s ease, color 0.4s ease' }}
    >
      <SiteThemeToggle dark={siteDark} onToggle={toggleTheme} />
      <CustomCursor />
      <GlobalStarfield />
      <ShootingStars />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorks />
          <ROICalculator />
          <ChatDemoFixed />
          <PhilosophySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      {/* Native React widgets — no iframe, fully interactive */}
      <InkanyeziBotWidget />
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
