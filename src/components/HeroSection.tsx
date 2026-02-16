import { useEffect, useRef } from "react";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      stars.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < 80; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      stars.forEach((s) => {
        s.o += Math.sin(Date.now() * 0.001 * s.speed) * 0.005;
        const opacity = Math.max(0.1, Math.min(0.7, s.o));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity})`;
        ctx.fill();
      });

      // Draw some connecting lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `hsla(40, 89%, 61%, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
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
