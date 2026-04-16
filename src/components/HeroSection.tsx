import { useState, useEffect, useRef } from "react";

// ── TYPEWRITER HOOK ──────────────────────────────────────────────────────────
function useTypewriter(words: string[], opts = { typeSpeed: 80, deleteSpeed: 40, pauseMs: 2800 }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx]     = useState(0);
  const [phase, setPhase]         = useState<"typing" | "pausing" | "deleting">("typing");
  const charIdx = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const word = words[wordIdx];
    if (phase === "typing") {
      if (charIdx.current < word.length) {
        timer = setTimeout(() => {
          setDisplayed(word.slice(0, charIdx.current + 1));
          charIdx.current++;
        }, opts.typeSpeed + Math.random() * 30);
      } else {
        timer = setTimeout(() => setPhase("pausing"), opts.pauseMs);
      }
    } else if (phase === "pausing") {
      setPhase("deleting");
    } else {
      if (charIdx.current > 0) {
        timer = setTimeout(() => {
          charIdx.current--;
          setDisplayed(word.slice(0, charIdx.current));
        }, opts.deleteSpeed);
      } else {
        setWordIdx(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, phase, wordIdx, words, opts.typeSpeed, opts.deleteSpeed, opts.pauseMs]);

  return { displayed, phase };
}

// ── SIGNAL PARTICLES — reduced count on mobile, skipped on reduced-motion ────
interface Particle {
  id: number; x: number; y: number;
  vx: number; vy: number; size: number; opacity: number; gold: boolean;
}

function SignalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const isMobile = () => window.innerWidth < 768;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = isMobile() ? 12 : 28;
    const connDist = isMobile() ? 90 : 140;

    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2.2 + 0.6, opacity: Math.random() * 0.55 + 0.15,
      gold: Math.random() > 0.55,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244,185,66,${0.07 * (1 - dist / connDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(244,185,66,${p.opacity})` : `rgba(200,220,255,${p.opacity * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />
  );
}

// ── GLITCH REVEAL — instant on reduced-motion ────────────────────────────────
function GlitchReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone]         = useState(false);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setRevealed(text); setDone(true); return; }
    let frame = 0; let raf: number;
    const t = setTimeout(() => {
      const step = () => {
        frame++;
        const built = text.split("").map((char, i) => {
          if (char === " ") return " ";
          const threshold = Math.floor(i * 2.5) + 1;
          if (frame >= threshold + 6) return char;
          if (frame >= threshold) return CHARS[Math.floor(Math.random() * CHARS.length)];
          return "\u00A0";
        }).join("");
        setRevealed(built);
        if (frame < text.length * 2.5 + 12) raf = requestAnimationFrame(step);
        else { setRevealed(text); setDone(true); }
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
    {done ? text : revealed || "\u00A0".repeat(text.length)}
  </span>;
}

// ── HERO ─────────────────────────────────────────────────────────────────────
const TYPEWRITER_WORDS = [
  "signal in the noise", "future you can trust",
  "answer in the chaos", "edge you've been missing", "automation you need",
];

const HeroSection = () => {
  const [mounted, setMounted]         = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const { displayed, phase }          = useTypewriter(TYPEWRITER_WORDS);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { const id = setInterval(() => setCursorBlink(b => !b), 530); return () => clearInterval(id); }, []);

  const showCursor = phase === "pausing" ? cursorBlink : true;
  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "transparent" }}>
      <SignalParticles />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1, zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, rgba(244,185,66,0.18) 30%, rgba(255,107,53,0.22) 50%, rgba(244,185,66,0.18) 70%, transparent 100%)",
        animation: "scanMove 7s ease-in-out infinite",
      }} />

      <style>{`
        @keyframes scanMove { 0%{top:15%;opacity:0} 10%{opacity:1} 50%{top:82%} 90%{opacity:1} 100%{top:15%;opacity:0} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes shimmerSlide { 0%{background-position:-200% center} 100%{background-position:200% center} }

        @media (prefers-reduced-motion: reduce) {
          .hero-eyebrow,.hero-h1-line1,.hero-typewriter-prefix,.hero-body,.hero-ctas,.hero-signal-badge {
            animation:none !important; opacity:1 !important; transform:none !important;
          }
          .hero-h1-signal { animation:none !important; }
        }

        .hero-eyebrow { animation:fadeIn 0.8s ease forwards; animation-delay:0.1s; opacity:0; }
        .hero-h1-line1 { animation:fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay:0.5s; opacity:0; }
        .hero-h1-signal {
          display:inline-block;
          background:linear-gradient(90deg,#F4B942,#FF6B35,#F4B942,#FF6B35); background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerSlide 3s linear infinite; animation-delay:1.8s;
        }
        .hero-typewriter-prefix { animation:fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay:0.8s; opacity:0; }
        .hero-typewriter-gold {
          background:linear-gradient(90deg,#F4B942,#FF6B35);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .hero-body  { animation:fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay:1.2s; opacity:0; }
        .hero-ctas  { animation:fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; animation-delay:1.6s; opacity:0; }
        .hero-signal-badge { animation:fadeIn 1.2s ease forwards; animation-delay:2.2s; opacity:0; }

        /* ── CTA buttons — full-width on mobile, auto from 480px ── */
        .ink-btn {
          display:flex; align-items:center; justify-content:center;
          width:100%; min-height:52px; padding:14px 28px; border-radius:10px;
          font-weight:600; font-size:1rem; text-decoration:none; cursor:pointer;
          -webkit-tap-highlight-color:transparent; touch-action:manipulation;
          transition:box-shadow 0.25s, transform 0.2s, background 0.25s;
          letter-spacing:0.01em;
        }
        @media (min-width:480px) { .ink-btn { width:auto; min-width:210px; } }
        .ink-btn-primary {
          background:linear-gradient(135deg,#F4B942,#FF6B35); color:#0A1628;
          box-shadow:0 4px 24px rgba(244,185,66,0.28), 0 2px 0 rgba(255,200,80,0.3) inset;
        }
        .ink-btn-primary:hover,.ink-btn-primary:focus-visible {
          box-shadow:0 0 28px rgba(244,185,66,0.55), 0 0 56px rgba(255,107,53,0.2); transform:translateY(-2px);
        }
        .ink-btn-primary:active { transform:translateY(1px); }
        .ink-btn-outline {
          background:transparent; border:1.5px solid rgba(244,185,66,0.45); color:var(--foreground,#fff);
        }
        .ink-btn-outline:hover,.ink-btn-outline:focus-visible {
          background:rgba(244,185,66,0.08); box-shadow:0 0 18px rgba(244,185,66,0.18);
          transform:translateY(-2px); border-color:rgba(244,185,66,0.75);
        }
        .ink-btn-outline:active { transform:translateY(1px); }

        /* ── Signal badge — wraps on tiny screens ── */
        .ink-badge-wrap { display:flex; justify-content:center; }
        .ink-badge {
          display:inline-flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center;
          padding:8px 16px; border-radius:100px; border:1px solid rgba(244,185,66,0.18);
          background:rgba(10,22,40,0.55); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
        }
        .ink-badge-divider { display:none; }
        @media (min-width:400px) {
          .ink-badge { flex-wrap:nowrap; }
          .ink-badge-divider { display:inline-block; }
        }
        .ink-badge-text {
          font-size:clamp(0.55rem,1.8vw,0.65rem); letter-spacing:0.14em;
          text-transform:uppercase; font-family:'Space Mono',monospace; white-space:nowrap;
        }
      `}</style>

      <div className="relative w-full max-w-4xl 2xl:max-w-6xl mx-auto text-center"
        style={{ zIndex: 10, padding: "clamp(5.5rem,14vw,7.5rem) clamp(1rem,5vw,1.5rem) clamp(2rem,5vw,3rem)" }}>

        {/* Eyebrow */}
        <p className="hero-eyebrow font-technical uppercase text-primary mb-4"
           style={{ fontSize: "clamp(0.62rem,2.2vw,0.875rem)", letterSpacing: "0.25em" }}>
          <GlitchReveal text="Inkanyezi Technologies" delay={120} />
        </p>

        {/* H1 */}
        <h1 className="hero-h1-line1 font-serif font-bold text-foreground mb-3"
            style={{ fontSize: "clamp(2rem,8vw,5rem)", lineHeight: 1.1 }}>
          We are the{" "}<span className="hero-h1-signal">signal</span>{" "}in the noise
        </h1>

        {/* Typewriter */}
        <div className="hero-typewriter-prefix font-serif font-bold text-foreground mb-6"
             style={{ fontSize: "clamp(1.05rem,4.5vw,2.6rem)", lineHeight: 1.3, minHeight: "1.5em" }}>
          <span style={{ opacity: 0.45 }}>We are </span>
          <span className="hero-typewriter-gold">{displayed}</span>
          <span style={{
            display: "inline-block", width: "2px", height: "0.85em",
            background: "linear-gradient(180deg,#F4B942,#FF6B35)", marginLeft: "3px",
            verticalAlign: "middle", opacity: showCursor ? 1 : 0,
            borderRadius: "1px", transition: "opacity 0.08s",
          }} />
        </div>

        {/* Body */}
        <p className="hero-body font-sans text-muted-foreground mx-auto mb-8 leading-relaxed"
           style={{ fontSize: "clamp(0.9rem,2.8vw,1.2rem)", maxWidth: "min(600px,90vw)" }}>
          In a digital universe defined by chaos and saturation, Inkanyezi Technologies
          stands as a fixed point of navigation —{" "}
          <span style={{ color: "rgba(244,185,66,0.75)", fontStyle: "italic" }}>illuminating the future</span>{" "}
          for South African businesses.
        </p>

        {/* CTAs — stacked on mobile, row from 480px */}
        <div className="hero-ctas mb-10"
             style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <a href="#contact" className="ink-btn ink-btn-primary">Book Discovery Call</a>
          <a href="#demo"    className="ink-btn ink-btn-outline">Try Live Demo</a>
        </div>

        {/* Badge */}
        <div className="hero-signal-badge ink-badge-wrap">
          <div className="ink-badge">
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", flexShrink: 0, display: "inline-block" }} />
            <span className="ink-badge-text" style={{ color: "rgba(244,185,66,0.75)" }}>Live · Durban, KZN · South Africa</span>
            <span className="ink-badge-divider" style={{ width: 1, height: 14, background: "rgba(244,185,66,0.2)" }} />
            <span className="ink-badge-text" style={{ color: "rgba(200,180,140,0.5)", letterSpacing: "0.1em" }}>AI Automation</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 2 }} />
    </section>
  );
};

export default HeroSection;
