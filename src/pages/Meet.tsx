import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

const C = {
  midnight: '#0A1628', deep: '#0D1E35', navy: '#0F2240',
  gold: '#F4B942', orange: '#FF6B35', white: '#FFFFFF',
  saGreen: '#007A4D', saGold: '#FFB612', saRed: '#DE3831', saBlue: '#002395',
};

const CARD_URL  = 'https://inkanyezi-tech.lovable.app/meet';
const WA_NUMBER = '27658804122';
const WA_MSG    = encodeURIComponent('Sawubona! I scanned your card and would like to know more about Inkanyezi Technologies.');
const EMAIL     = 'sishangesanele@gmail.com';
const LINKEDIN  = 'https://www.linkedin.com/in/sanele-sishange';
const CHATBOT   = 'https://inkanyezi-tech.lovable.app/#chat';

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD','VERSION:3.0','FN:Sanele Sishange',
    'ORG:Inkanyezi Technologies',
    'TITLE:Founder & AI Automation Consultant',
    `TEL;TYPE=CELL:+${WA_NUMBER}`,
    `EMAIL:${EMAIL}`,`URL:${CARD_URL}`,
    'ADR;TYPE=WORK:;;Durban;;KwaZulu-Natal;;ZA',
    'NOTE:We are the signal in the noise.',
    'END:VCARD',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([vcard],{type:'text/vcard'}));
  a.download = 'Sanele_Inkanyezi.vcf'; a.click();
}

function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2, op: Math.random() * 0.55 + 0.15,
      pulse: Math.random() * Math.PI * 2, speed: Math.random() * 0.01 + 0.003,
      gold: Math.random() > 0.8,
    }));
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      const bg = ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#02040e'); bg.addColorStop(1,'#04060f');
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);
      const neb = ctx.createRadialGradient(W*0.55,H*0.4,0,W*0.55,H*0.4,W*0.65);
      neb.addColorStop(0,'rgba(90,45,170,0.07)'); neb.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = neb; ctx.fillRect(0,0,W,H);
      stars.forEach(s => {
        s.pulse += s.speed;
        const op = s.op * (0.45 + 0.55 * Math.sin(s.pulse));
        ctx.beginPath(); ctx.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2);
        ctx.fillStyle = s.gold ? `rgba(244,185,66,${op})` : `rgba(220,232,255,${op})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />;
}

function QRPanel() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, CARD_URL, {
      width: 180, margin: 1,
      color: { dark: '#F4B942', light: '#0A1628' },
      errorCorrectionLevel: 'H',
    }, (err) => { if (!err) setReady(true); });
  }, []);
  const download = () => {
    if (!ref.current || !ready) return;
    const SIZE = 560;
    const dc = document.createElement('canvas');
    dc.width = SIZE; dc.height = SIZE + 120;
    const ctx = dc.getContext('2d')!;
    ctx.fillStyle = C.midnight; ctx.fillRect(0,0,dc.width,dc.height);
    ctx.fillStyle = C.gold; ctx.fillRect(0,0,dc.width,4);
    ctx.fillStyle = C.gold; ctx.font = 'bold 26px Arial';
    ctx.textAlign = 'center'; ctx.fillText('INKANYEZI TECHNOLOGIES', dc.width/2, 52);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '15px Arial';
    ctx.fillText('AI Automation for South African Businesses', dc.width/2, 78);
    const pad = (SIZE - 420) / 2;
    ctx.drawImage(ref.current, pad, 100, 420, 420);
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '13px monospace';
    ctx.fillText(CARD_URL, dc.width/2, SIZE + 54);
    ctx.fillStyle = C.gold; ctx.font = 'italic 14px Arial';
    ctx.fillText('"We are the signal in the noise"', dc.width/2, SIZE + 82);
    ctx.fillStyle = C.orange; ctx.fillRect(0, dc.height - 4, dc.width, 4);
    const a = document.createElement('a');
    a.href = dc.toDataURL('image/png'); a.download = 'Inkanyezi_QR_Card.png'; a.click();
  };
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div style={{ padding:12, background:C.midnight, borderRadius:12, border:`2px solid ${C.gold}`, boxShadow:`0 0 24px rgba(244,185,66,0.25)` }}>
        <canvas ref={ref} style={{ display:'block', borderRadius:6 }} />
      </div>
      <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.45)', fontFamily:'monospace', textAlign:'center', margin:0 }}>Scan to open this card</p>
      <button onClick={download} disabled={!ready}
        style={{ padding:'8px 22px', borderRadius:8, border:'none', cursor:ready?'pointer':'not-allowed', background:ready?`linear-gradient(90deg,${C.gold},${C.orange})`:'rgba(244,185,66,0.15)', color:ready?C.midnight:'rgba(255,255,255,0.3)', fontWeight:700, fontSize:'0.7rem', fontFamily:'monospace', letterSpacing:'0.1em', textTransform:'uppercase', transition:'all 0.2s', boxShadow:ready?`0 4px 14px rgba(244,185,66,0.35)`:'none' }}>
        {ready ? '⬇ Download QR' : 'Generating…'}
      </button>
    </div>
  );
}

function HeritageStrip() {
  return (
    <div style={{ display:'flex', gap:3, justifyContent:'center' }}>
      {[C.saGreen, C.saGold, C.saRed, C.saBlue, C.white].map((col,i) => (
        <div key={i} style={{ width:i===2?22:14, height:3, background:col, borderRadius:2, opacity:0.75 }} />
      ))}
    </div>
  );
}

function ActionBtn({ icon, label, sub, onClick, accent, dark = true }: any) {
  const [hov, setHov] = useState(false);
  const bg = dark
    ? (hov ? `${accent}18` : 'rgba(255,255,255,0.07)')
    : (hov ? `${accent}10` : '#FFFFFF');
  const border = dark
    ? `1.5px solid ${hov ? accent : `${accent}50`}`
    : `1.5px solid ${hov ? accent : '#D1D5DB'}`;
  const labelCol = dark ? '#FFFFFF' : '#0A1628';
  const subCol   = dark ? 'rgba(255,255,255,0.55)' : '#4B5563';
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width:'100%', display:'flex', alignItems:'center', gap:16,
        padding:'16px 18px 16px 14px',
        borderRadius:14, border, background: bg,
        cursor:'pointer', transition:'all 0.22s', textAlign:'left',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hov
          ? `0 6px 22px ${accent}40`
          : dark ? `inset 3px 0 0 ${accent}60` : '0 1px 4px rgba(0,0,0,0.08)',
      }}>
      {/* Solid filled icon circle — always fully visible */}
      <div style={{
        width:50, height:50, borderRadius:'50%', flexShrink:0,
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        border: `2px solid ${accent}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:22, transition:'all 0.22s',
        boxShadow: hov ? `0 0 18px ${accent}70` : `0 0 10px ${accent}35`,
      }}>{icon}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:'1rem', fontWeight:700, color:labelCol, lineHeight:1.25, fontFamily:"'DM Sans',sans-serif" }}>{label}</div>
        {sub && <div style={{ fontSize:'0.78rem', color:subCol, marginTop:4, fontFamily:"'DM Sans',sans-serif", lineHeight:1.3 }}>{sub}</div>}
      </div>
      {/* Arrow badge — always visible */}
      <div style={{
        width:30, height:30, borderRadius:'50%', flexShrink:0,
        background: hov ? accent : `${accent}20`,
        border: `1.5px solid ${accent}60`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:16, color: hov ? (dark ? C.midnight : '#fff') : accent,
        fontWeight:700, transition:'all 0.22s',
        transform: hov ? 'translateX(2px)' : 'translateX(0)',
      }}>›</div>
    </button>
  );
}

export default function Meet() {
  const [dark, setDark] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg]         = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem('ink_card_theme');
    if (saved === 'light') setDark(false);
  }, []);

  // Awareness hint: show once after 4 seconds
  useEffect(() => {
    const seen = localStorage.getItem('ink_card_hint_seen');
    if (seen) return;
    const t = setTimeout(() => {
      setToastMsg('Tip: Toggle dark / light mode with the button above');
      setToastVisible(true);
      const hide = setTimeout(() => {
        setToastVisible(false);
        localStorage.setItem('ink_card_hint_seen', '1');
      }, 3500);
      return () => clearTimeout(hide);
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('ink_card_theme', next ? 'dark' : 'light');
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastMsg(next ? '🌙 Dark mode activated' : '☀️ Light mode activated');
      setToastVisible(true);
      toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
      return next;
    });
  };

  // Theme-derived values
  const pageBg   = dark ? C.midnight  : '#F0F2F5';
  const bodyBg   = dark ? `linear-gradient(180deg, ${C.deep} 0%, ${C.midnight} 100%)` : '#FFFFFF';
  const bodyBord = dark ? 'rgba(244,185,66,0.12)' : '#E5E7EB';
  const divCol   = dark ? 'rgba(244,185,66,0.12)' : '#E5E7EB';
  const footnote = dark ? 'rgba(255,255,255,0.18)' : '#9CA3AF';
  const toggleBg = dark ? 'rgba(10,22,40,0.9)' : 'rgba(255,255,255,0.9)';
  const toggleBd = dark ? 'rgba(244,185,66,0.3)' : 'rgba(10,22,40,0.15)';
  const toggleTx = dark ? C.gold : '#374151';
  const toastBg  = dark ? 'rgba(10,22,40,0.96)' : 'rgba(255,255,255,0.96)';
  const toastBd  = dark ? 'rgba(244,185,66,0.3)' : 'rgba(10,22,40,0.15)';
  const toastTx  = dark ? C.gold : '#374151';

  return (
    <div style={{ minHeight:'100vh', background:pageBg, display:'flex', justifyContent:'center', alignItems:'flex-start', padding:'24px 16px 48px', fontFamily:"'DM Sans', sans-serif", position:'relative', overflow:'hidden', transition:'background 0.4s ease' }}>
      {dark && <div style={{ position:'fixed', inset:0, zIndex:0 }}><StarCanvas /></div>}

      {/* ── Theme toggle button ── */}
      <button onClick={toggleTheme}
        style={{
          position:'fixed', top:18, right:18, zIndex:1000,
          display:'flex', alignItems:'center', gap:6,
          padding:'6px 12px', borderRadius:20, border:`1px solid ${toggleBd}`,
          background:toggleBg, cursor:'pointer', backdropFilter:'blur(8px)',
          boxShadow: dark ? '0 4px 16px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.1)',
          transition:'all 0.3s ease',
        }}>
        {/* Toggle track */}
        <div style={{ width:34, height:19, borderRadius:10, position:'relative', background: dark ? 'rgba(244,185,66,0.2)' : '#E5E7EB', border:`1px solid ${dark ? 'rgba(244,185,66,0.3)' : '#D1D5DB'}`, transition:'all 0.3s' }}>
          <div style={{ position:'absolute', top:1.5, left: dark ? 15 : 1.5, width:14, height:14, borderRadius:'50%', background: dark ? `linear-gradient(135deg, ${C.gold}, ${C.orange})` : '#FFFFFF', boxShadow: dark ? `0 0 6px rgba(244,185,66,0.5)` : '0 1px 3px rgba(0,0,0,0.2)', transition:'left 0.3s ease', display:'flex', alignItems:'center', justifyContent:'center', fontSize:8 }}>{dark ? '🌙' : '☀️'}</div>
        </div>
        <span style={{ fontSize:'0.6rem', fontFamily:"'Space Mono',monospace", color:toggleTx, letterSpacing:'0.06em', fontWeight:600 }}>{dark ? 'DARK' : 'LIGHT'}</span>
      </button>

      {/* ── Awareness toast ── */}
      <div style={{
        position:'fixed', top:62, right:18, zIndex:999,
        background:toastBg, border:`1px solid ${toastBd}`,
        borderRadius:10, padding:'8px 14px',
        fontFamily:"'Space Mono',monospace", fontSize:'0.62rem',
        color:toastTx, whiteSpace:'nowrap',
        opacity: toastVisible ? 1 : 0,
        transform: toastVisible ? 'translateY(0)' : 'translateY(-6px)',
        transition:'opacity 0.35s ease, transform 0.35s ease',
        pointerEvents:'none',
        boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.12)',
      }}>{toastMsg}</div>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:440 }}>

        {/* Header */}
        <div style={{ background:`linear-gradient(135deg, ${C.midnight} 0%, ${C.navy} 100%)`, border:`1px solid rgba(244,185,66,0.2)`, borderRadius:'20px 20px 0 0', padding:'32px 24px 26px', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${C.gold}, ${C.orange}, ${C.gold}, transparent)` }} />
          {/* Avatar */}
          <div style={{ width:96, height:96, borderRadius:'50%', margin:'0 auto 18px', background:`linear-gradient(135deg, ${C.gold}, ${C.orange})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40, boxShadow:`0 0 32px rgba(244,185,66,0.4), 0 0 0 4px rgba(244,185,66,0.18)` }}>⭐</div>
          {/* Name — largest, most prominent */}
          <h1 style={{ margin:'0 0 6px', fontSize:'1.9rem', fontWeight:800, color:C.white, letterSpacing:'-0.02em', fontFamily:"'Syne', sans-serif", lineHeight:1.1 }}>Sanele Sishange</h1>
          {/* Title */}
          <p style={{ margin:'0 0 5px', fontSize:'1rem', color:C.gold, fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', lineHeight:1.3 }}>Founder &amp; AI Automation Consultant</p>
          {/* Company + location */}
          <p style={{ margin:'0 0 18px', fontSize:'0.9rem', color:'rgba(255,255,255,0.6)', letterSpacing:'0.02em' }}>Inkanyezi Technologies · Durban, KZN 🇿🇦</p>
          <HeritageStrip />
          {/* Tagline */}
          <p style={{ margin:'16px 0 0', fontSize:'0.88rem', color:'rgba(255,255,255,0.5)', fontStyle:'italic', letterSpacing:'0.02em' }}>"We are the signal in the noise"</p>
        </div>

        {/* Body */}
        <div style={{ background:bodyBg, border:`1px solid ${bodyBord}`, borderTop:'none', borderRadius:'0 0 20px 20px', padding:'22px 20px 26px', transition:'background 0.4s ease' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
            <ActionBtn dark={dark} icon="💾" label="Save Contact" sub="Download vCard to your phone" onClick={downloadVCard} accent={C.gold} />
            <ActionBtn dark={dark} icon="💬" label="WhatsApp Me" sub="+27 65 880 4122" onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`,'_blank')} accent="#25D366" />
            <ActionBtn dark={dark} icon="🤖" label="Chat with InkanyeziBot" sub="AI automation demo — live now" onClick={() => window.open(CHATBOT,'_blank')} accent={C.orange} />
            <ActionBtn dark={dark} icon="🌐" label="Visit Website" sub="inkanyezi-tech.lovable.app" onClick={() => window.open('https://inkanyezi-tech.lovable.app','_blank')} accent={C.gold} />
            <ActionBtn dark={dark} icon="✉️" label="Send Email" sub={EMAIL} onClick={() => window.open(`mailto:${EMAIL}`)} accent="#60a5fa" />
            <ActionBtn dark={dark} icon="💼" label="LinkedIn" sub="Connect professionally" onClick={() => window.open(LINKEDIN,'_blank')} accent="#0A66C2" />
          </div>
          <div style={{ height:1, background:divCol, marginBottom:20 }} />
          <div style={{ textAlign:'center' }}>
            <p style={{ margin:'0 0 14px', fontSize:'0.8rem', letterSpacing:'0.12em', textTransform:'uppercase', color: dark ? 'rgba(255,255,255,0.45)' : '#6B7280', fontFamily:'monospace', fontWeight:600 }}>Share This Card</p>
            <QRPanel />
          </div>
        </div>

        <p style={{ textAlign:'center', marginTop:18, fontSize:'0.68rem', color:footnote, letterSpacing:'0.08em', fontFamily:'monospace' }}>
          INKANYEZI TECHNOLOGIES · 🇿🇦 · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
