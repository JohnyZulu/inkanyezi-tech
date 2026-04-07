import { useEffect, useRef, useState } from "react";

// ── BRAND TOKENS ─────────────────────────────────────────────────────
const C = {
  midnight: '#0A1628', deep: '#0D1E35', navy: '#0F2240',
  gold: '#F4B942', orange: '#FF6B35', cyan: '#00E5FF',
  white: '#FFFFFF',
  saGreen: '#007A4D', saGold: '#FFB612', saRed: '#DE3831', saBlue: '#002395',
};

const CARD_URL  = 'https://inkanyezi-tech.vercel.app/meet';
const WA_NUMBER = '27658804122';
const WA_MSG    = encodeURIComponent('Sawubona! I scanned your card and would like to know more about Inkanyezi Technologies.');
const EMAIL     = 'sishangesanele@gmail.com';
const LINKEDIN  = 'https://www.linkedin.com/in/sanele-sishange';
const CHATBOT   = 'https://inkanyezi-tech.vercel.app/#chat';
const QR_URL    = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='
  + encodeURIComponent(CARD_URL) + '&color=00E5FF&bgcolor=020A14&margin=2';

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD', 'VERSION:3.0', 'FN:Sanele Sishange',
    'ORG:Inkanyezi Technologies',
    'TITLE:Founder & AI Automation Consultant',
    'TEL;TYPE=CELL:+' + WA_NUMBER,
    'EMAIL:' + EMAIL, 'URL:' + CARD_URL,
    'ADR;TYPE=WORK:;;Durban;;KwaZulu-Natal;;ZA',
    'NOTE:We are the signal in the noise.',
    'END:VCARD',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([vcard], { type: 'text/vcard' }));
  a.download = 'Sanele_Inkanyezi.vcf'; a.click();
}

// ── AFRICAN LIGHT BACKGROUND — Isishweshwe + Kente + Ndebele patterns ──
function AfricanBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', background: '#FDF6EC' }}>

      {/* Base warm cream — like parchment, earthy and grounded */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #FDF6EC 0%, #F8EED8 40%, #FAF0E2 70%, #F5E8CE 100%)' }} />

      {/* Ndebele geometric border strips — top and bottom */}
      {/* Top strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 52, overflow: 'hidden' }}>
        {/* SA flag colour blocks — horizontal bands */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: '#007A4D' }} />
        <div style={{ position: 'absolute', top: 10, left: 0, right: 0, height: 4, background: '#FFB612' }} />
        <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 10, background: '#DE3831' }} />
        <div style={{ position: 'absolute', top: 24, left: 0, right: 0, height: 4, background: '#002395' }} />
        {/* Ndebele diamond repeating pattern over the strip */}
        <svg width="100%" height="52" viewBox="0 0 400 52" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} transform={'translate(' + (i * 16) + ',0)'}>
              <polygon points="8,0 16,8 8,16 0,8" fill="rgba(255,255,255,0.35)" />
              <polygon points="8,4 12,8 8,12 4,8" fill="rgba(244,185,66,0.5)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 52, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: '#007A4D' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, height: 4, background: '#FFB612' }} />
        <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0, height: 10, background: '#DE3831' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, height: 4, background: '#002395' }} />
        <svg width="100%" height="52" viewBox="0 0 400 52" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} transform={'translate(' + (i * 16) + ',0)'}>
              <polygon points="8,0 16,8 8,16 0,8" fill="rgba(255,255,255,0.35)" />
              <polygon points="8,4 12,8 8,12 4,8" fill="rgba(244,185,66,0.5)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Left vertical Kente-style stripe column */}
      <div style={{ position: 'absolute', top: 52, bottom: 52, left: 0, width: 36, overflow: 'hidden' }}>
        <svg width="36" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Kente vertical stripes — red, gold, green repeating */}
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} x={i * 9} y={0} width={9} height="100%"
              fill={['#DE3831','#FFB612','#007A4D','#002395'][i]}
              opacity={0.75} />
          ))}
          {/* Isishweshwe cross-stitch diamonds */}
          {Array.from({ length: 20 }, (_, j) => (
            <g key={j} transform={'translate(18,' + (j * 22 - 4) + ')'}>
              <polygon points="0,-8 8,0 0,8 -8,0" fill="rgba(255,255,255,0.6)" />
              <polygon points="0,-4 4,0 0,4 -4,0" fill="rgba(244,185,66,0.8)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Right vertical Kente-style stripe column */}
      <div style={{ position: 'absolute', top: 52, bottom: 52, right: 0, width: 36, overflow: 'hidden' }}>
        <svg width="36" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} x={i * 9} y={0} width={9} height="100%"
              fill={['#002395','#007A4D','#FFB612','#DE3831'][i]}
              opacity={0.75} />
          ))}
          {Array.from({ length: 20 }, (_, j) => (
            <g key={j} transform={'translate(18,' + (j * 22 - 4) + ')'}>
              <polygon points="0,-8 8,0 0,8 -8,0" fill="rgba(255,255,255,0.6)" />
              <polygon points="0,-4 4,0 0,4 -4,0" fill="rgba(244,185,66,0.8)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Scattered Ndebele diamond motifs across the centre */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox="0 0 420 900" preserveAspectRatio="xMidYMid slice">
        {/* Large corner diamonds */}
        <polygon points="60,80 100,120 60,160 20,120" fill="rgba(222,56,49,0.08)" />
        <polygon points="60,88 100,120 60,152 28,120" fill="rgba(255,182,18,0.1)" />
        <polygon points="360,80 400,120 360,160 320,120" fill="rgba(0,122,77,0.08)" />
        <polygon points="360,88 400,120 360,152 328,120" fill="rgba(0,35,149,0.08)" />
        <polygon points="60,740 100,780 60,820 20,780" fill="rgba(0,122,77,0.07)" />
        <polygon points="360,740 400,780 360,820 320,780" fill="rgba(222,56,49,0.07)" />
        {/* Mid scattered small diamonds */}
        <polygon points="200,120 218,138 200,156 182,138" fill="rgba(244,185,66,0.12)" />
        <polygon points="200,126 218,138 200,150 188,138" fill="rgba(255,107,53,0.1)" />
        <polygon points="80,450 96,466 80,482 64,466" fill="rgba(0,35,149,0.07)" />
        <polygon points="340,450 356,466 340,482 324,466" fill="rgba(0,122,77,0.07)" />
        <polygon points="130,650 146,666 130,682 114,666" fill="rgba(255,182,18,0.09)" />
        <polygon points="290,650 306,666 290,682 274,666" fill="rgba(222,56,49,0.07)" />
        {/* Zulu beadwork cross motifs */}
        <line x1="42" y1="300" x2="42" y2="340" stroke="rgba(0,122,77,0.2)" strokeWidth="1.5" />
        <line x1="22" y1="320" x2="62" y2="320" stroke="rgba(0,122,77,0.2)" strokeWidth="1.5" />
        <circle cx="42" cy="320" r="5" fill="rgba(255,182,18,0.25)" />
        <line x1="378" y1="300" x2="378" y2="340" stroke="rgba(222,56,49,0.2)" strokeWidth="1.5" />
        <line x1="358" y1="320" x2="398" y2="320" stroke="rgba(222,56,49,0.2)" strokeWidth="1.5" />
        <circle cx="378" cy="320" r="5" fill="rgba(222,56,49,0.25)" />
        <line x1="42" y1="560" x2="42" y2="600" stroke="rgba(255,182,18,0.2)" strokeWidth="1.5" />
        <line x1="22" y1="580" x2="62" y2="580" stroke="rgba(255,182,18,0.2)" strokeWidth="1.5" />
        <circle cx="42" cy="580" r="5" fill="rgba(244,185,66,0.3)" />
        <line x1="378" y1="560" x2="378" y2="600" stroke="rgba(0,35,149,0.2)" strokeWidth="1.5" />
        <line x1="358" y1="580" x2="398" y2="580" stroke="rgba(0,35,149,0.2)" strokeWidth="1.5" />
        <circle cx="378" cy="580" r="5" fill="rgba(0,35,149,0.2)" />
        {/* Isishweshwe micro zigzag lines */}
        <polyline points="60,200 80,210 100,200 120,210 140,200 160,210 180,200 200,210 220,200 240,210 260,200 280,210 300,200 320,210 340,200 360,210" fill="none" stroke="rgba(0,122,77,0.12)" strokeWidth="1" />
        <polyline points="60,220 80,230 100,220 120,230 140,220 160,230 180,220 200,230 220,220 240,230 260,220 280,230 300,220 320,230 340,220 360,230" fill="none" stroke="rgba(222,56,49,0.1)" strokeWidth="1" />
        <polyline points="60,700 80,710 100,700 120,710 140,700 160,710 180,700 200,710 220,700 240,710 260,700 280,710 300,700 320,710 340,700 360,710" fill="none" stroke="rgba(255,182,18,0.12)" strokeWidth="1" />
        <polyline points="60,720 80,730 100,720 120,730 140,720 160,730 180,720 200,730 220,720 240,730 260,720 280,730 300,720 320,730 340,720 360,730" fill="none" stroke="rgba(0,35,149,0.1)" strokeWidth="1" />
      </svg>

      {/* Subtle warm vignette to focus on the card */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(210,175,110,0.18) 100%)', pointerEvents: 'none' }} />
    </div>
  );
}

// ── STAR FIELD — refined, less dense for executive feel ───────────────
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    // Fewer, larger stars — more deliberate and premium
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.0 + 0.3,
      op: Math.random() * 0.45 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.002,
      cyan: Math.random() > 0.88,
      gold: Math.random() > 0.92,
    }));
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
      bg.addColorStop(0, '#010308'); bg.addColorStop(1, '#020a16');
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      // Subtle vignette
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.2, W * 0.5, H * 0.5, H * 0.9);
      vig.addColorStop(0, 'rgba(0,0,0,0)'); vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
      stars.forEach(s => {
        s.pulse += s.speed;
        const op = s.op * (0.5 + 0.5 * Math.sin(s.pulse));
        ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        if (s.cyan) ctx.fillStyle = 'rgba(0,229,255,' + op + ')';
        else if (s.gold) ctx.fillStyle = 'rgba(244,185,66,' + op * 0.8 + ')';
        else ctx.fillStyle = 'rgba(200,220,255,' + op * 0.6 + ')';
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// ── RADAR — compact, refined ──────────────────────────────────────────
function RadarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const S = 110; canvas.width = S; canvas.height = S;
    const cx = S / 2, cy = S / 2;
    let angle = 0, raf: number;
    const blips = Array.from({ length: 4 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 14 + Math.random() * 34, op: 0,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      // Outer circle clip
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2); ctx.clip();
      // Background
      ctx.fillStyle = 'rgba(0,5,18,0.85)'; ctx.fillRect(0, 0, S, S);
      // Rings
      [48, 35, 22, 10].forEach((r, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,229,255,' + (0.07 + i * 0.03) + ')';
        ctx.lineWidth = 0.6; ctx.stroke();
      });
      // Cross-hairs
      ctx.strokeStyle = 'rgba(0,229,255,0.1)'; ctx.lineWidth = 0.4;
      ctx.beginPath(); ctx.moveTo(cx, cy - 50); ctx.lineTo(cx, cy + 50); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 50, cy); ctx.lineTo(cx + 50, cy); ctx.stroke();
      // Sweep sector
      const sweepGrad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * 48, cy + Math.sin(angle) * 48);
      sweepGrad.addColorStop(0, 'rgba(0,229,255,0.18)');
      sweepGrad.addColorStop(1, 'rgba(0,229,255,0)');
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 48, -0.45, 0.45, false); ctx.closePath();
      ctx.fillStyle = sweepGrad; ctx.fill(); ctx.restore();
      // Sweep line
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * 48, cy + Math.sin(angle) * 48);
      ctx.strokeStyle = 'rgba(0,229,255,0.6)'; ctx.lineWidth = 0.8; ctx.stroke();
      // Blips
      blips.forEach(b => {
        const diff = ((b.a - angle + Math.PI * 6) % (Math.PI * 2));
        if (diff < 0.3) b.op = 1;
        else b.op = Math.max(0, b.op - 0.018);
        if (b.op > 0.05) {
          const bx = cx + Math.cos(b.a) * b.r, by = cy + Math.sin(b.a) * b.r;
          ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,229,255,' + b.op + ')'; ctx.fill();
          // Blip glow ring
          ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0,229,255,' + b.op * 0.3 + ')'; ctx.lineWidth = 0.8; ctx.stroke();
        }
      });
      ctx.restore();
      // Outer ring
      ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,229,255,0.3)'; ctx.lineWidth = 1; ctx.stroke();
      angle = (angle + 0.022) % (Math.PI * 2);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ width: 110, height: 110 }} />;
}

// ── ENERGY RING — cleaner SVG ─────────────────────────────────────────
function EnergyRing({ label, value, color }: { label: string; value: number; color: string }) {
  const r = 20, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <svg width={50} height={50} viewBox="0 0 50 50">
        <circle cx={25} cy={25} r={r} fill="none" stroke={'rgba(255,255,255,0.05)'} strokeWidth={3.5} />
        <circle cx={25} cy={25} r={r} fill="none" stroke={color} strokeWidth={3.5}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - value / 100)}
          strokeLinecap="round" transform="rotate(-90 25 25)"
          style={{ filter: 'drop-shadow(0 0 3px ' + color + ')' }} />
        <text x={25} y={29} textAnchor="middle" fontSize={9} fill={color}
          fontFamily="'Space Mono',monospace" fontWeight={700}>{value}%</text>
      </svg>
      <span style={{ fontSize: '0.48rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Mono',monospace", letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>{label}</span>
    </div>
  );
}

// ── HUD CORNER ────────────────────────────────────────────────────────
function HUDCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const isT = pos[0] === 't', isL = pos[1] === 'l';
  return (
    <div style={{
      position: 'absolute',
      top: isT ? 8 : 'auto', bottom: isT ? 'auto' : 8,
      left: isL ? 8 : 'auto', right: isL ? 'auto' : 8,
      width: 14, height: 14, pointerEvents: 'none',
      borderTop: isT ? '1.5px solid rgba(0,229,255,0.45)' : 'none',
      borderBottom: isT ? 'none' : '1.5px solid rgba(0,229,255,0.45)',
      borderLeft: isL ? '1.5px solid rgba(0,229,255,0.45)' : 'none',
      borderRight: isL ? 'none' : '1.5px solid rgba(0,229,255,0.45)',
    }} />
  );
}

// ── HERITAGE STRIP ────────────────────────────────────────────────────
function HeritageStrip() {
  return (
    <div style={{ display: 'flex', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
      {[C.saGreen, C.saGold, C.saRed, C.saBlue, C.white].map((col, i) => (
        <div key={i} style={{
          width: i === 2 ? 20 : 12, height: 2.5, background: col, borderRadius: 2,
          opacity: 0.8, boxShadow: '0 0 4px ' + col + '50',
        }} />
      ))}
    </div>
  );
}

// ── EXECUTIVE HUD BUTTON ─────────────────────────────────────────────
// Cleaner than original — straight edges on top, angled only bottom-right.
// Typography is larger and more readable. Sub text is more informative.
function HUDButton({ icon, label, sub, onClick, color, featured = false }: any) {
  const [hov, setHov] = useState(false);
  const [press, setPress] = useState(false);
  const rgb = color;

  const bg = featured
    ? (hov ? 'linear-gradient(135deg,rgba(' + rgb + ',0.22),rgba(' + rgb + ',0.1))' : 'linear-gradient(135deg,rgba(' + rgb + ',0.14),rgba(' + rgb + ',0.06))')
    : (hov ? 'rgba(' + rgb + ',0.1)' : 'rgba(2,8,20,0.6)');

  const shadow = press
    ? 'none'
    : hov
      ? '0 0 20px rgba(' + rgb + ',0.25), 0 5px 0 rgba(' + rgb + ',0.12), inset 0 1px 0 rgba(255,255,255,0.06)'
      : '0 3px 0 rgba(' + rgb + ',0.08), inset 0 1px 0 rgba(255,255,255,0.03)';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onTouchStart={() => setPress(true)}
      onTouchEnd={() => { setPress(false); onClick?.(); }}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 13,
        padding: '12px 15px',
        background: bg,
        border: '1px solid rgba(' + rgb + ',' + (hov ? '0.5' : '0.18') + ')',
        // Executive clip — subtle, not aggressive
        clipPath: 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)',
        borderRadius: 8,
        cursor: 'pointer', textAlign: 'left',
        transition: 'all 0.16s ease',
        transform: press ? 'translateY(3px)' : hov ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: shadow,
        position: 'relative',
      }}>
      {/* Subtle accent bar on left */}
      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 2, background: 'rgba(' + rgb + ',' + (hov ? '0.8' : '0.35') + ')', borderRadius: '0 2px 2px 0', transition: 'opacity 0.16s' }} />
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: 'radial-gradient(circle at 35% 35%, rgba(' + rgb + ',0.3), rgba(' + rgb + ',0.06))',
        border: '1px solid rgba(' + rgb + ',0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18,
        boxShadow: '0 0 8px rgba(' + rgb + ',0.2), 0 2px 0 rgba(' + rgb + ',0.1)',
        transition: 'all 0.16s',
      }}>{icon}</div>
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.2, letterSpacing: '-0.01em' }}>{label}</div>
        {sub && <div style={{ fontSize: '0.62rem', color: 'rgba(' + rgb + ',0.65)', marginTop: 2, fontFamily: "'Space Mono',monospace", letterSpacing: '0.04em', lineHeight: 1.3 }}>{sub}</div>}
      </div>
      {/* Arrow with corner cut */}
      <div style={{
        width: 26, height: 26, flexShrink: 0,
        clipPath: 'polygon(0 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%)',
        background: hov ? 'rgba(' + rgb + ',0.25)' : 'rgba(' + rgb + ',0.08)',
        border: '1px solid rgba(' + rgb + ',0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, color: 'rgba(' + rgb + ',' + (hov ? '1' : '0.5') + ')',
        transition: 'all 0.16s',
        transform: hov && !press ? 'translateX(1px)' : 'none',
        fontFamily: 'monospace', fontWeight: 700,
      }}>›</div>
    </button>
  );
}

// ── DIVIDER ────────────────────────────────────────────────────────────
function HUDDivider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,229,255,0.25),transparent)' }} />
      <span style={{ fontSize: '0.48rem', fontFamily: "'Space Mono',monospace", color: 'rgba(0,229,255,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,229,255,0.25))' }} />
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────
export default function Meet() {
  const [booted, setBooted] = useState(false);
  const [scanPct, setScanPct] = useState(0);
  const [name, setName] = useState('SANELE SISHANGE');

  // Boot sequence
  useEffect(() => {
    let v = 0;
    const iv = setInterval(() => {
      v += 4; setScanPct(Math.min(v, 100));
      if (v >= 100) { clearInterval(iv); setTimeout(() => setBooted(true), 250); }
    }, 22);
    return () => clearInterval(iv);
  }, []);

  // Glitch — subtle, executive — happens less frequently
  useEffect(() => {
    if (!booted) return;
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const ORIG = 'SANELE SISHANGE';
    const glitch = () => {
      let count = 0;
      const iv = setInterval(() => {
        setName(ORIG.split('').map((c, i) =>
          c === ' ' ? ' ' : count < 5 && Math.random() > 0.65
            ? CHARS[Math.floor(Math.random() * CHARS.length)] : c
        ).join(''));
        count++;
        if (count > 7) { clearInterval(iv); setName(ORIG); }
      }, 55);
    };
    const t = setInterval(glitch, 7000); // less frequent for exec feel
    return () => clearInterval(t);
  }, [booted]);

  return (
    <div style={{ minHeight: '100vh', background: '#FDF6EC', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '68px 16px 72px', fontFamily: "'DM Sans',sans-serif", position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes shimBar { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes bootPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>

      <AfricanBackground />

      {/* ── BOOT SCREEN ── */}
      {!booted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#FDF6EC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          {/* Logo mark */}
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,' + C.gold + ',' + C.orange + ')', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 0 30px rgba(244,185,66,0.4)', marginBottom: 8 }}>✦</div>
          <div style={{ fontFamily: "'Space Mono',monospace", color: '#0A1628', fontSize: '0.65rem', letterSpacing: '0.22em', animation: 'bootPulse 0.9s ease infinite' }}>
            INKANYEZI OS · INITIALISING
          </div>
          {/* Progress bar */}
          <div style={{ width: 200, height: 1.5, background: 'rgba(0,229,255,0.1)', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: scanPct + '%', background: 'linear-gradient(90deg,' + C.cyan + ',' + C.gold + ')', transition: 'width 0.022s linear', boxShadow: '0 0 10px ' + C.cyan }} />
          </div>
          <div style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(10,22,40,0.4)', fontSize: '0.52rem', letterSpacing: '0.16em' }}>
            {scanPct < 35 ? 'LOADING IDENTITY MATRIX' : scanPct < 70 ? 'CALIBRATING SIGNAL' : scanPct < 92 ? 'ALIGNING NEURAL NODES' : 'SIGNAL LOCKED ✦'}
          </div>
        </div>
      )}

      {/* ── CARD ── */}
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 415,
        opacity: booted ? 1 : 0,
        animation: booted ? 'fadeUp 0.45s ease forwards' : 'none',
      }}>

        {/* ══ HEADER ══ */}
        <div style={{
          background: 'linear-gradient(160deg,#0a1828 0%,#060e1e 55%,#030810 100%)',
          border: '1px solid rgba(0,229,255,0.18)',
          borderRadius: '18px 18px 0 0',
          padding: '22px 20px 20px',
          position: 'relative', overflow: 'hidden',
        }}>
          <HUDCorner pos="tl" /><HUDCorner pos="tr" />

          {/* Shimmer top bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,' + C.gold + ',' + C.cyan + ',' + C.gold + ',transparent)', backgroundSize: '200% 100%', animation: 'shimBar 4s linear infinite' }} />
          {/* Subtle scan lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,229,255,0.012) 0px,rgba(0,229,255,0.012) 1px,transparent 1px,transparent 4px)', pointerEvents: 'none' }} />

          {/* Identity row — radar left, text right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14, position: 'relative', zIndex: 1 }}>
            {/* Radar + logo */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <RadarCanvas />
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg,' + C.gold + ',' + C.orange + ')',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: C.midnight,
                boxShadow: '0 0 18px rgba(244,185,66,0.55), 0 0 0 2px rgba(244,185,66,0.15)',
                fontFamily: "'Syne',sans-serif",
              }}>✦</div>
            </div>
            {/* Name + title block */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* System ID */}
              <div style={{ fontSize: '0.46rem', fontFamily: "'Space Mono',monospace", color: 'rgba(0,229,255,0.38)', letterSpacing: '0.18em', marginBottom: 4 }}>
                SYS:INK-TECH · NODE:DUR-01 · ◉ ONLINE
              </div>
              {/* Name */}
              <h1 style={{ fontSize: '1.38rem', fontWeight: 800, color: C.white, letterSpacing: '0.02em', fontFamily: "'Syne',sans-serif", lineHeight: 1.05, margin: '0 0 4px', textShadow: '0 0 24px rgba(0,229,255,0.2)' }}>
                {name}
              </h1>
              {/* Title */}
              <p style={{ fontSize: '0.62rem', color: C.gold, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Space Mono',monospace", margin: '0 0 3px', lineHeight: 1.3 }}>
                Founder &amp; AI Automation Consultant
              </p>
              <p style={{ fontSize: '0.58rem', color: 'rgba(0,229,255,0.45)', margin: 0, fontFamily: "'Space Mono',monospace", letterSpacing: '0.06em' }}>
                INKANYEZI TECHNOLOGIES · DURBAN, KZN
              </p>
            </div>
          </div>

          {/* Heritage strip */}
          <div style={{ marginBottom: 14, position: 'relative', zIndex: 1 }}>
            <HeritageStrip />
          </div>

          {/* Energy rings — spread evenly */}
          <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative', zIndex: 1 }}>
            <EnergyRing label={'AI Core'} value={92} color={C.cyan} />
            <EnergyRing label={'Automate'} value={88} color={C.gold} />
            <EnergyRing label={'Signal'} value={96} color={C.orange} />
          </div>

          {/* Tagline */}
          <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.16)', fontStyle: 'italic', fontFamily: "'Space Mono',monospace", letterSpacing: '0.06em', position: 'relative', zIndex: 1 }}>
            &quot;We are the signal in the noise&quot;
          </p>
          <HUDCorner pos="bl" /><HUDCorner pos="br" />
        </div>

        {/* ══ BODY ══ */}
        <div style={{
          background: 'linear-gradient(180deg,#040c1c 0%,#020810 100%)',
          border: '1px solid rgba(0,229,255,0.12)',
          borderTop: 'none', borderRadius: '0 0 18px 18px',
          padding: '16px 15px 22px',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.85)',
        }}>
          <HUDCorner pos="bl" /><HUDCorner pos="br" />

          <HUDDivider label="Access Modules" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0 14px' }}>
            <HUDButton featured icon="💾" label="Save My Contact" sub="VCARD · TAP TO ADD TO PHONE" onClick={downloadVCard} color="244,185,66" />
            <HUDButton icon="💬" label="WhatsApp" sub="+27 65 880 4122 · OPEN COMMS" onClick={() => window.open('https://wa.me/' + WA_NUMBER + '?text=' + WA_MSG, '_blank')} color="37,211,102" />
            <HUDButton icon="🤖" label="Chat with InkanyeziBot" sub="AI AUTOMATION DEMO · LIVE NOW" onClick={() => window.open(CHATBOT, '_blank')} color="255,107,53" />
            <HUDButton icon="🌐" label="Visit Website" sub="INKANYEZITECH.CO.ZA" onClick={() => window.open('https://inkanyezi-tech.vercel.app', '_blank')} color="0,229,255" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <HUDButton icon="✉️" label="Email" sub="TRANSMIT MESSAGE" onClick={() => window.open('mailto:' + EMAIL)} color="160,140,255" />
              <HUDButton icon="💼" label="LinkedIn" sub="PROFESSIONAL NODE" onClick={() => window.open(LINKEDIN, '_blank')} color="10,102,194" />
            </div>
          </div>

          <HUDDivider label="Signal Beacon" />

          {/* QR section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
            {/* QR code */}
            <div style={{ flexShrink: 0, padding: 8, background: 'rgba(0,5,15,0.85)', borderRadius: 10, border: '1px solid rgba(0,229,255,0.28)', boxShadow: '0 0 18px rgba(0,229,255,0.1)' }}>
              <img src={QR_URL} alt="QR Code" width={100} height={100} style={{ display: 'block', borderRadius: 6 }} />
            </div>
            {/* Info beside QR */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.58rem', color: 'rgba(0,229,255,0.5)', fontFamily: "'Space Mono',monospace", letterSpacing: '0.12em', marginBottom: 8, textTransform: 'uppercase' }}>
                ◈ Scan to open card
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.5, marginBottom: 10 }}>
                Scan this QR with your phone camera to access this card, save contact details, and connect directly.
              </p>
              {/* Service tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {['⚙️ Automate', '🎓 Learn', '📈 Grow'].map(s => (
                  <span key={s} style={{ fontSize: '0.52rem', padding: '3px 7px', borderRadius: 4, background: 'rgba(244,185,66,0.08)', border: '1px solid rgba(244,185,66,0.2)', color: 'rgba(244,185,66,0.7)', fontFamily: "'Space Mono',monospace", letterSpacing: '0.06em' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer status bar */}
          <div style={{ marginTop: 16, paddingTop: 10, borderTop: '1px solid rgba(0,229,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(255,255,255,0.1)', fontSize: '0.48rem', letterSpacing: '0.14em' }}>INKANYEZI.TECH · 2026</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88', animation: 'pulse 2.2s ease infinite' }} />
              <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(255,255,255,0.1)', fontSize: '0.48rem', letterSpacing: '0.1em' }}>SECURE · POPIA COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
