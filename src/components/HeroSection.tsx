import { useEffect, useRef } from "react";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Star {
      x: number; y: number; r: number; baseO: number; o: number;
      speed: number; drift: number; layer: number; phase: number;
    }

    const layers = [
      { count: 40, minR: 0.3, maxR: 0.8, driftX: 0.08, driftY: 0.04, twinkleSpeed: 0.6 },
      { count: 30, minR: 0.8, maxR: 1.5, driftX: 0.15, driftY: 0.08, twinkleSpeed: 0.4 },
      { count: 15, minR: 1.5, maxR: 2.5, driftX: 0.25, driftY: 0.12, twinkleSpeed: 0.25 },
    ];

    let stars: Star[] = [];
    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      stars = [];
      layers.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          const baseO = Math.random() * 0.4 + 0.15;
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * (layer.maxR - layer.minR) + layer.minR,
            baseO,
            o: baseO,
            speed: layer.twinkleSpeed,
            drift: layer.driftX,
            layer: li,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      stars.forEach((s) => {
        // Drift diagonally and wrap
        const layerCfg = layers[s.layer];
        s.x += layerCfg.driftX;
        s.y += layerCfg.driftY;
        if (s.x > w + 5) s.x = -5;
        if (s.y > h + 5) s.y = -5;

        // Twinkle
        s.o = s.baseO + Math.sin(t * s.speed + s.phase) * 0.2;
        const opacity = Math.max(0.05, Math.min(0.85, s.o));

        // Glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity})`;
        ctx.fill();
        ctx.restore();
      });

      // Constellation lines within same layer
      for (let li = 0; li < layers.length; li++) {
        const layerStars = stars.filter((s) => s.layer === li);
        const maxDist = 100 + li * 30;
        for (let i = 0; i < layerStars.length; i++) {
          for (let j = i + 1; j < layerStars.length; j++) {
            const dx = layerStars[i].x - layerStars[j].x;
            const dy = layerStars[i].y - layerStars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              const alpha = 0.06 * (1 - dist / maxDist) * (0.5 + li * 0.25);
              ctx.beginPath();
              ctx.moveTo(layerStars[i].x, layerStars[i].y);
              ctx.lineTo(layerStars[j].x, layerStars[j].y);
              ctx.strokeStyle = `hsla(40, 89%, 61%, ${alpha})`;
              ctx.lineWidth = 0.4 + li * 0.2;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-20">
        <p className="font-technical text-sm md:text-base tracking-[0.3em] uppercase text-primary mb-6 animate-fade-in-slow">
          Inkanyezi Technologies
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-8 animate-slide-up">
          We are the{" "}
          <span className="gradient-gold-text">signal</span>{" "}
          in the noise
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-slow" style={{ animationDelay: "0.3s" }}>
          In a digital universe defined by chaos and saturation, Inkanyezi Technologies stands as a fixed point of navigation — illuminating the future for South African businesses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-slow" style={{ animationDelay: "0.6s" }}>
          <a
            href="#contact"
            className="gradient-gold text-primary-foreground font-sans font-semibold text-base px-8 py-4 rounded-lg hover:opacity-90 transition-opacity glow-gold"
          >
            Book Discovery Call
          </a>
          <a
            href="#demo"
            className="border border-gold text-foreground font-sans font-medium text-base px-8 py-4 rounded-lg hover:bg-secondary transition-colors"
          >
            Try Live Demo
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
