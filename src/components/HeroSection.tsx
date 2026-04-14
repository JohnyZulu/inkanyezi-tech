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
        }, opts.typeSpeed + Math.random() * 30); // slight organic jitter
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

// ── SIGNAL PARTICLE (floating data nodes) ────────────────────────────────────
interface Particle {
  id: number; x: number; y: number;
  vx: number; vy: number; size: number; opacity: number; gold: boolean;
}

function SignalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.55 + 0.15,
      gold: Math.random() > 0.55,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw connection lines first
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(244,185,66,${0.07 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      // draw nodes
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(244,185,66,${p.opacity})`
          : `rgba(200,220,255,${p.opacity * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
    />
  );
}

// ── GLITCH REVEAL SPAN ───────────────────────────────────────────────────────
function GlitchReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [revealed, setRevealed] = useState("");
  const [done, setDone]         = useState(false);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01";

  useEffect(() => {
    let frame = 0;
    let raf: number;
    const start = () => {
      const step = () => {
        frame++;
        // scramble then resolve each character
        const built = text.split("").map((char, i) => {
          if (char === " ") return " ";
          const threshold = Math.floor(i * 2.5) + 1;
          if (frame >= threshold + 6) return char; // locked
          if (frame >= threshold) return CHARS[Math.floor(Math.random() * CHARS.length)]; // scrambling
          return "\u00A0"; // not yet visible
        }).join("");
        setRevealed(built);
        if (frame < text.length * 2.5 + 12) raf = requestAnimationFrame(step);
        else { setRevealed(text); setDone(true); }
      };
      raf = requestAnimationFrame(step);
    };
    const t = setTimeout(start, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {done ? text : revealed || "\u00A0".repeat(text.length)}
    </span>
  );
}

// ── HERO SECTION ─────────────────────────────────────────────────────────────
const TYPEWRITER_WORDS = [
  "the signal in the noise",
  "the future you can trust",
  "the answer in the chaos",
  "the edge you've been missing",
  "the automation you need",
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const { displayed, phase } = useTypewriter(TYPEWRITER_WORDS);

  useEffect(() => { setMounted(true); }, []);

  // cursor blink only when not actively typing
  useEffect(() => {
    const interval = setInterval(() => setCursorBlink(b => !b), 530);
    return () => clearInterval(interval);
  }, []);

  const showCursor = phase === "pausing" ? cursorBlink : true;

  if (!mounted) return null;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Floating constellation particles */}
      <SignalParticles />

      {/* Horizontal scan line — AI aesthetic */}
      <div
        style={{
          position: "absolute", left: 0, right: 0, height: 1, zIndex: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(244,185,66,0.18) 30%, rgba(255,107,53,0.22) 50%, rgba(244,185,66,0.18) 70%, transparent 100%)",
          animation: "scanMove 7s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes scanMove {
          0%   { top: 15%; opacity: 0; }
          10%  { opacity: 1; }
          50%  { top: 82%; }
          90%  { opacity: 1; }
          100% { top: 15%; opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glowPulse {
          0%,100% { text-shadow: 0 0 20px rgba(244,185,66,0.0); }
          50%     { text-shadow: 0 0 40px rgba(244,185,66,0.45), 0 0 80px rgba(255,107,53,0.2); }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes inkReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes cursorPulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        .hero-eyebrow {
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }
        .hero-h1-line1 {
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        .hero-h1-signal {
          display: inline-block;
          background: linear-gradient(90deg, #F4B942, #FF6B35, #F4B942, #FF6B35);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerSlide 3s linear infinite;
          animation-delay: 1.8s;
        }
        .hero-typewriter-prefix {
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
        .hero-typewriter-gold {
          background: linear-gradient(90deg, #F4B942, #FF6B35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-body {
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 1.2s;
          opacity: 0;
        }
        .hero-ctas {
          animation: fadeSlideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          animation-delay: 1.6s;
          opacity: 0;
        }
        .hero-signal-badge {
          animation: fadeIn 1.2s ease forwards;
          animation-delay: 2.2s;
          opacity: 0;
        }
        .glow-cta {
          transition: box-shadow 0.25s ease, transform 0.2s ease;
        }
        .glow-cta:hover {
          box-shadow: 0 0 28px rgba(244,185,66,0.5), 0 0 56px rgba(255,107,53,0.18);
          transform: translateY(-2px);
        }
        .outline-cta {
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .outline-cta:hover {
          background: rgba(244,185,66,0.08);
          box-shadow: 0 0 18px rgba(244,185,66,0.15);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="relative max-w-4xl 2xl:max-w-6xl mx-auto text-center px-6 pt-12 md:pt-16 2xl:pt-20" style={{ zIndex: 10 }}>

        {/* Eyebrow — glitch reveal */}
        <p className="hero-eyebrow font-technical text-sm md:text-base 2xl:text-lg tracking-[0.3em] uppercase text-primary mb-4 2xl:mb-6">
          <GlitchReveal text="Inkanyezi Technologies" delay={120} />
        </p>

        {/* H1 — static part */}
        <h1 className="font-serif font-bold text-foreground leading-tight mb-4 2xl:mb-6" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}>
          <span className="hero-h1-line1 block">
            We are the{" "}
            <span className="hero-h1-signal">signal</span>
            {" "}in the noise
          </span>
        </h1>

        {/* Typewriter line — dynamic rotating phrase */}
        <div
          className="hero-typewriter-prefix font-serif font-bold text-foreground leading-tight mb-8 2xl:mb-10"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)", minHeight: "1.3em" }}
        >
          <span style={{ opacity: 0.45 }}>We are </span>
          <span className="hero-typewriter-gold">{displayed}</span>
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "linear-gradient(180deg, #F4B942, #FF6B35)",
              marginLeft: "3px",
              verticalAlign: "middle",
              opacity: showCursor ? 1 : 0,
              borderRadius: "1px",
              transition: "opacity 0.08s",
            }}
          />
        </div>

        {/* Body copy */}
        <p className="hero-body font-sans text-lg md:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl 2xl:max-w-3xl mx-auto mb-10 2xl:mb-14 leading-relaxed">
          In a digital universe defined by chaos and saturation, Inkanyezi Technologies stands as a fixed point of navigation —{" "}
          <span style={{ color: "rgba(244,185,66,0.75)", fontStyle: "italic" }}>
            illuminating the future
          </span>{" "}
          for South African businesses.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 2xl:gap-6 mb-12">
          <a
            href="#contact"
            className="glow-cta gradient-gold text-primary-foreground font-sans font-semibold text-base 2xl:text-lg px-8 py-4 2xl:px-12 2xl:py-5 rounded-lg"
            style={{ background: "linear-gradient(135deg, #F4B942, #FF6B35)", boxShadow: "0 4px 24px rgba(244,185,66,0.25), 0 2px 0 rgba(255,200,80,0.3) inset" }}
          >
            Book Discovery Call
          </a>
          <a
            href="#demo"
            className="outline-cta border text-foreground font-sans font-medium text-base 2xl:text-lg px-8 py-4 2xl:px-12 2xl:py-5 rounded-lg"
            style={{ borderColor: "rgba(244,185,66,0.45)" }}
          >
            Try Live Demo
          </a>
        </div>

        {/* Signal badge — small credibility strip */}
        <div
          className="hero-signal-badge inline-flex items-center gap-3 mx-auto"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            border: "1px solid rgba(244,185,66,0.18)",
            background: "rgba(10,22,40,0.55)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", flexShrink: 0 }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(244,185,66,0.75)", fontFamily: "'Space Mono', monospace" }}>
            Live · Durban, KZN · South Africa
          </span>
          <span style={{ width: 1, height: 14, background: "rgba(244,185,66,0.2)", flexShrink: 0 }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,180,140,0.5)", fontFamily: "'Space Mono', monospace" }}>
            AI Automation
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ zIndex: 2 }}
      />
    </section>
  );
};

export default HeroSection;
