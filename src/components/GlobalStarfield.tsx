import { useEffect, useRef } from "react";

const GlobalStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    interface Star {
      x: number; y: number; r: number; baseO: number; o: number;
      speed: number; layer: number; phase: number;
    }

    const isMobile = window.innerWidth < 768;

    const layerConfigs = [
      { minR: 0.3, maxR: 0.8, driftX: 0.06, driftY: 0.03, twinkleSpeed: 0.5 },
      { minR: 0.8, maxR: 1.4, driftX: 0.12, driftY: 0.06, twinkleSpeed: 0.35 },
      { minR: 1.4, maxR: 2.2, driftX: 0.2, driftY: 0.1, twinkleSpeed: 0.2 },
    ];

    let stars: Star[] = [];
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      const mobileFactor = isMobile ? 0.5 : 1;
      const density = Math.max(1, (w * h) / (1920 * 1080));
      const baseCounts = [50, 35, 18];
      stars = [];
      layerConfigs.forEach((layer, li) => {
        const count = Math.round(baseCounts[li] * density * mobileFactor);
        for (let i = 0; i < count; i++) {
          const baseO = Math.random() * 0.3 + 0.08;
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * (layer.maxR - layer.minR) + layer.minR,
            baseO,
            o: baseO,
            speed: layer.twinkleSpeed,
            layer: li,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const cfg = layerConfigs[s.layer];

        // Drift
        s.x += cfg.driftX;
        s.y += cfg.driftY;
        if (s.x > w + 5) s.x = -5;
        if (s.y > h + 5) s.y = -5;

        // Twinkle
        s.o = s.baseO + Math.sin(t * s.speed + s.phase) * 0.15;
        const opacity = Math.max(0.03, Math.min(0.6, s.o));

        // Glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity * 0.12})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity})`;
        ctx.fill();
      }

      // Constellation lines (skip on mobile for perf)
      if (!isMobile) {
        for (let li = 0; li < layerConfigs.length; li++) {
          const layerStars = stars.filter((s) => s.layer === li);
          const maxDist = 90 + li * 25;
          for (let i = 0; i < layerStars.length; i++) {
            for (let j = i + 1; j < layerStars.length; j++) {
              const dx = layerStars[i].x - layerStars[j].x;
              const dy = layerStars[i].y - layerStars[j].y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < maxDist) {
                const alpha = 0.04 * (1 - dist / maxDist) * (0.4 + li * 0.2);
                ctx.beginPath();
                ctx.moveTo(layerStars[i].x, layerStars[i].y);
                ctx.lineTo(layerStars[j].x, layerStars[j].y);
                ctx.strokeStyle = `hsla(40, 89%, 61%, ${alpha})`;
                ctx.lineWidth = 0.3 + li * 0.15;
                ctx.stroke();
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    // Re-init on resize (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 300);
    };
    window.addEventListener("resize", handleResize);

    // Watch for document height changes (content loading)
    const resizeObserver = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight;
      if (Math.abs(newH - h) > 100) {
        resize();
      }
    });
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default GlobalStarfield;
