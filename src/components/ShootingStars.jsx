import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const createShooter = (delay = 0) => ({
      active: false, x: 0, y: 0,
      length: 0, angle: 0, speed: 0,
      progress: 0, opacity: 0,
      nextFire: Date.now() + 6000 + delay + Math.random() * 10000,
    });

    const shooters = [
      createShooter(0),
      createShooter(7000),
      createShooter(14000),
    ];

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const now = Date.now();
      shooters.forEach(s => {
        if (!s.active && now >= s.nextFire) {
          s.active = true;
          s.progress = 0;
          s.x = Math.random() * w * 0.75;
          s.y = Math.random() * h * 0.35;
          s.length = 100 + Math.random() * 120;
          s.speed = 7 + Math.random() * 5;
          s.angle = (15 + Math.random() * 25) * Math.PI / 180;
        }

        if (s.active) {
          s.progress += s.speed;
          const total = s.length + 40;
          const frac = s.progress / total;
          s.opacity = frac < 0.2 ? frac / 0.2
                    : frac > 0.7 ? (1 - frac) / 0.3
                    : 1;

          if (s.progress > total) {
            s.active = false;
            s.nextFire = now + 10000 + Math.random() * 15000;
            return;
          }

          const hx = s.x + Math.cos(s.angle) * s.progress;
          const hy = s.y + Math.sin(s.angle) * s.progress;
          const tail = Math.min(s.progress, s.length);
          const tx = hx - Math.cos(s.angle) * tail;
          const ty = hy - Math.sin(s.angle) * tail;

          // Tail gradient
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0, `rgba(249,180,80,0)`);
          g.addColorStop(0.6, `rgba(255,210,120,${s.opacity * 0.5})`);
          g.addColorStop(1, `rgba(255,240,200,${s.opacity})`);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Head glow
          const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 6);
          hg.addColorStop(0, `rgba(255,240,180,${s.opacity * 0.9})`);
          hg.addColorStop(1, `rgba(255,200,80,0)`);
          ctx.beginPath();
          ctx.arc(hx, hy, 6, 0, Math.PI * 2);
          ctx.fillStyle = hg;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}