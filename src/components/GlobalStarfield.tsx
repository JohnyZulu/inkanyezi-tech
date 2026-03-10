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

    interface Nebula {
      baseX: number; baseY: number; radius: number;
      color: string; cycleX: number; cycleY: number;
      phaseX: number; phaseY: number; x: number; y: number;
    }

    interface Star {
      x: number; y: number; r: number; tier: number;
      baseO: number; o: number; twinkleSpeed: number; phase: number;
      driftX: number; driftY: number; glowR: number; glowO: number;
    }

    interface ConstellationLine {
      x1: number; y1: number; x2: number; y2: number; opacity: number;
    }

    interface ShootingStar {
      x: number; y: number; angle: number; speed: number;
      length: number; life: number; maxLife: number;
      active: boolean; nextSpawn: number;
    }

    const nebulaColors = [
      "rgba(249,115,22,0.07)",
      "rgba(99,102,241,0.06)",
      "rgba(20,184,166,0.05)",
      "rgba(249,115,22,0.06)",
      "rgba(99,102,241,0.05)",
      "rgba(20,184,166,0.045)",
    ];

    let nebulae: Nebula[] = [];
    let stars: Star[] = [];
    let constellationLines: ConstellationLine[] = [];
    let shootingStars: ShootingStar[] = [];

    const SHOOTING_STAR_COUNT = 8;

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

      // Nebulae
      nebulae = [];
      const nebulaCount = isMobile ? 4 : 6;
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push({
          x: 0, y: 0,
          baseX: Math.random() * w,
          baseY: Math.random() * h,
          radius: 220 + Math.random() * 200,
          color: nebulaColors[i % nebulaColors.length],
          cycleX: 25 + Math.random() * 15,
          cycleY: 30 + Math.random() * 10,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
        });
      }

      // Stars
      stars = [];
      const totalStars = isMobile ? 100 : 220;
      const tiers = [
        { min: 0.5, max: 1.0, glowR: 0,   glowO: 0,    twinkleMin: 2, twinkleMax: 3, fraction: 0.55 },
        { min: 1.2, max: 2.0, glowR: 2.5, glowO: 0.12, twinkleMin: 3, twinkleMax: 5, fraction: 0.30 },
        { min: 2.2, max: 3.5, glowR: 5,   glowO: 0.4,  twinkleMin: 5, twinkleMax: 8, fraction: 0.15 },
      ];
      for (let ti = 0; ti < tiers.length; ti++) {
        const t = tiers[ti];
        const count = Math.round(totalStars * t.fraction);
        for (let i = 0; i < count; i++) {
          const baseO = ti === 0 ? 0.2 + Math.random() * 0.3
                      : ti === 1 ? 0.3 + Math.random() * 0.4
                      :            0.45 + Math.random() * 0.45;
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: t.min + Math.random() * (t.max - t.min),
            tier: ti,
            baseO, o: baseO,
            twinkleSpeed: (Math.PI * 2) / (t.twinkleMin + Math.random() * (t.twinkleMax - t.twinkleMin)),
            phase: Math.random() * Math.PI * 2,
            driftX: 0.015 + ti * 0.02,
            driftY: 0.008 + ti * 0.012,
            glowR: t.glowR,
            glowO: t.glowO,
          });
        }
      }

      // Constellation lines — full page, both mobile and desktop
      constellationLines = [];
      const largeStars = stars.filter(s => s.tier >= 1);
      const anchors = largeStars.slice(0, Math.min(40, largeStars.length));
      let lineCount = 0;
      const maxLines = isMobile ? 16 : 30;
      for (let i = 0; i < anchors.length && lineCount < maxLines; i++) {
        let nearest = -1;
        let nearestDist = Infinity;
        for (let j = i + 1; j < anchors.length; j++) {
          const dx = anchors[i].x - anchors[j].x;
          const dy = anchors[i].y - anchors[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 450 && dist < nearestDist) {
            nearestDist = dist;
            nearest = j;
          }
        }
        if (nearest >= 0) {
          constellationLines.push({
            x1: anchors[i].x, y1: anchors[i].y,
            x2: anchors[nearest].x, y2: anchors[nearest].y,
            opacity: 0.15 + Math.random() * 0.12,
          });
          lineCount++;
        }
      }

      // Shooting stars — all devices
      shootingStars = [];
      for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
        shootingStars.push({
          x: 0, y: 0,
          angle: 0, speed: 0, length: 0,
          life: 0, maxLife: 0,
          active: false,
          nextSpawn: 3 + Math.random() * 8 + i * 2,
        });
      }
    };

    const spawnShootingStar = (ss: ShootingStar) => {
      ss.x = Math.random() * w * 0.85;
      ss.y = Math.random() * h * 0.65;
      ss.angle = (15 + Math.random() * 20) * (Math.PI / 180);
      ss.speed = 12 + Math.random() * 10;
      ss.length = 80 + Math.random() * 60;
      ss.life = 0;
      ss.maxLife = 45 + Math.random() * 25;
      ss.active = true;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      // Nebulae
      for (const neb of nebulae) {
        const nx = prefersReducedMotion ? neb.baseX
          : neb.baseX + Math.sin(t / neb.cycleX + neb.phaseX) * w * 0.12;
        const ny = prefersReducedMotion ? neb.baseY
          : neb.baseY + Math.cos(t / neb.cycleY + neb.phaseY) * h * 0.07;
        neb.x = nx; neb.y = ny;
        const g = ctx.createRadialGradient(
