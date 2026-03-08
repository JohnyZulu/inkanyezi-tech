import { useEffect, useRef } from "react";

const GlobalStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    let animId: number;
    let w = 0, h = 0;

    // --- LAYER 1: Nebula orbs ---
    interface Nebula {
      x: number; y: number; radius: number; blur: number;
      color: string; vx: number; vy: number; baseX: number; baseY: number;
      cycleX: number; cycleY: number; phaseX: number; phaseY: number;
    }

    const nebulaColors = [
      "rgba(249,115,22,0.06)",  // deep amber
      "rgba(99,102,241,0.05)",  // indigo
      "rgba(20,184,166,0.04)",  // teal
      "rgba(249,115,22,0.05)",
      "rgba(99,102,241,0.04)",
      "rgba(20,184,166,0.035)",
    ];

    let nebulae: Nebula[] = [];

    // --- LAYER 3: Stars ---
    interface Star {
      x: number; y: number; r: number; tier: number;
      baseO: number; o: number; twinkleSpeed: number; phase: number;
      driftX: number; driftY: number;
      glowR: number; glowO: number;
    }

    let stars: Star[] = [];

    // --- LAYER 2: Constellation lines (desktop only, static) ---
    interface ConstellationLine {
      x1: number; y1: number; x2: number; y2: number; opacity: number;
    }

    let constellationLines: ConstellationLine[] = [];

    // --- Shooting stars ---
    interface ShootingStar {
      x: number; y: number; angle: number; speed: number;
      length: number; life: number; maxLife: number; active: boolean;
      nextSpawn: number;
    }

    let shootingStars: ShootingStar[] = [];
    const SHOOTING_STAR_COUNT = 5;

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

      // Layer 1: Nebulae
      const nebulaCount = isMobile ? 4 : 6;
      nebulae = [];
      for (let i = 0; i < nebulaCount; i++) {
        const radius = 200 + Math.random() * 200;
        nebulae.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius,
          blur: 80 + Math.random() * 40,
          color: nebulaColors[i % nebulaColors.length],
          vx: 0, vy: 0,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          cycleX: 25 + Math.random() * 15,
          cycleY: 30 + Math.random() * 10,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
        });
      }

      // Layer 3: Stars
      const totalStars = isMobile ? 60 : 140;
      stars = [];
      // Tier distribution: 60% tiny, 28% medium, 12% large
      const tiers = [
        { min: 0.5, max: 1, glowR: 0, glowO: 0, twinkleMin: 2, twinkleMax: 3, fraction: 0.6 },
        { min: 1.5, max: 2, glowR: 2, glowO: 0.1, twinkleMin: 3, twinkleMax: 5, fraction: 0.28 },
        { min: 2.5, max: 3.5, glowR: 4, glowO: 0.35, twinkleMin: 5, twinkleMax: 8, fraction: 0.12 },
      ];

      for (let ti = 0; ti < tiers.length; ti++) {
        const t = tiers[ti];
        const count = Math.round(totalStars * t.fraction);
        for (let i = 0; i < count; i++) {
          const baseO = ti === 0 ? 0.15 + Math.random() * 0.25 :
                        ti === 1 ? 0.2 + Math.random() * 0.35 :
                                   0.3 + Math.random() * 0.4;
          const twinklePeriod = t.twinkleMin + Math.random() * (t.twinkleMax - t.twinkleMin);
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: t.min + Math.random() * (t.max - t.min),
            tier: ti,
            baseO,
            o: baseO,
            twinkleSpeed: (Math.PI * 2) / twinklePeriod,
            phase: Math.random() * Math.PI * 2,
            driftX: 0.02 + ti * 0.03,
            driftY: 0.01 + ti * 0.015,
            glowR: t.glowR,
            glowO: t.glowO,
          });
        }
      }

      // Layer 2: Constellation lines (desktop only)
      constellationLines = [];
      if (!isMobile) {
        // Pick the large stars for constellation anchors
        const largeStars = stars.filter(s => s.tier === 2 || s.tier === 1);
        const anchors = largeStars.slice(0, Math.min(20, largeStars.length));
        let lineCount = 0;
        const maxLines = 12;
        for (let i = 0; i < anchors.length && lineCount < maxLines; i++) {
          let nearest = -1;
          let nearestDist = Infinity;
          for (let j = i + 1; j < anchors.length; j++) {
            const dx = anchors[i].x - anchors[j].x;
            const dy = anchors[i].y - anchors[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250 && dist < nearestDist) {
              nearestDist = dist;
              nearest = j;
            }
          }
          if (nearest >= 0) {
            constellationLines.push({
              x1: anchors[i].x, y1: anchors[i].y,
              x2: anchors[nearest].x, y2: anchors[nearest].y,
              opacity: 0.06 + Math.random() * 0.02,
            });
            lineCount++;
          }
        }
      }

      // Shooting stars
      shootingStars = [];
      if (!isMobile) {
        for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
          shootingStars.push({
            x: 0, y: 0,
            angle: (20 + Math.random() * 10) * (Math.PI / 180),
            speed: 8 + Math.random() * 6,
            length: 60 + Math.random() * 40,
            life: 0,
            maxLife: 0,
            active: false,
            nextSpawn: (12 + Math.random() * 6) * (i + 1) * 0.4,
          });
        }
      }
    };

    const spawnShootingStar = (ss: ShootingStar) => {
      ss.x = Math.random() * w * 0.8;
      ss.y = Math.random() * h * 0.6;
      ss.angle = (20 + Math.random() * 10) * (Math.PI / 180) * (Math.random() > 0.5 ? 1 : -1);
      ss.speed = 10 + Math.random() * 8;
      ss.length = 60 + Math.random() * 40;
      ss.life = 0;
      ss.maxLife = 40 + Math.random() * 20;
      ss.active = true;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      // --- Layer 1: Nebula glows ---
      for (const neb of nebulae) {
        let nx: number, ny: number;
        if (prefersReducedMotion) {
          nx = neb.baseX;
          ny = neb.baseY;
        } else {
          nx = neb.baseX + Math.sin(t / neb.cycleX + neb.phaseX) * w * 0.15;
          ny = neb.baseY + Math.cos(t / neb.cycleY + neb.phaseY) * h * 0.08;
        }
        neb.x = nx;
        neb.y = ny;

        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.radius);
        gradient.addColorStop(0, neb.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(nx, ny, neb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // --- Layer 2: Constellation lines (static, desktop only) ---
      if (!isMobile) {
        for (const line of constellationLines) {
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.strokeStyle = `rgba(249,115,22,${line.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // --- Layer 3: Stars ---
      for (const s of stars) {
        if (!prefersReducedMotion) {
          s.x += s.driftX;
          s.y += s.driftY;
          if (s.x > w + 5) s.x = -5;
          if (s.y > h + 5) s.y = -5;

          s.o = s.baseO + Math.sin(t * s.twinkleSpeed + s.phase) * s.baseO * 0.4;
        }
        const opacity = Math.max(0.05, Math.min(0.8, s.o));

        // Glow for large stars
        if (s.glowR > 0) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r + s.glowR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249,115,22,${opacity * s.glowO})`;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${opacity})`;
        ctx.fill();
      }

      // --- Shooting stars (desktop, not reduced-motion) ---
      if (!isMobile && !prefersReducedMotion) {
        for (const ss of shootingStars) {
          if (!ss.active) {
            ss.nextSpawn -= 1 / 60;
            if (ss.nextSpawn <= 0) spawnShootingStar(ss);
            continue;
          }
          ss.life++;
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;

          const progress = ss.life / ss.maxLife;
          const headAlpha = progress < 0.5 ? 0.8 : 0.8 * (1 - (progress - 0.5) * 2);

          // Tail
          const tailX = ss.x - Math.cos(ss.angle) * ss.length;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length;
          const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
          grad.addColorStop(0, "rgba(249,115,22,0)");
          grad.addColorStop(1, `rgba(249,115,22,${headAlpha})`);
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(ss.x, ss.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Head
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${headAlpha})`;
          ctx.fill();

          if (ss.life >= ss.maxLife) {
            ss.active = false;
            ss.nextSpawn = 12 + Math.random() * 6;
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 300);
    };
    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      const newH = document.documentElement.scrollHeight;
      if (Math.abs(newH - h) > 100) resize();
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
