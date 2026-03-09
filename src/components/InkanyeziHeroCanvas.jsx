import { useEffect, useRef } from "react";

export default function InkanyeziHeroCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const PLANETS = [
      ["Gemini AI",     50, 50, 0,  "#f97316", "rgba(249,115,22,0.4)",  null,      false, "SUN"],
      ["Make.com",      68, 28, 28, "#f97316", "rgba(249,115,22,0.3)",  null,      false, "JUPITER"],
      ["WhatsApp",      22, 22, 18, "#25d366", "rgba(37,211,102,0.25)", "#25d366", true,  "SATURN"],
      ["Google WS",     35, 68, 22, "#4285f4", "rgba(66,133,244,0.25)", null,      false, "EARTH"],
      ["Looker Studio", 72, 65, 16, "#ea4335", "rgba(234,67,53,0.25)",  null,      false, "MARS"],
      ["Neon Postgres",  15, 55, 14, "#00e5ff", "rgba(0,229,255,0.2)",  null,      false, "NEPTUNE"],
      ["Vercel",        45, 22, 10, "#e2e8f0", "rgba(226,232,240,0.2)", null,      false, "MOON"],
      ["Lovable.dev",   80, 45, 12, "#a855f7", "rgba(168,85,247,0.2)",  null,      false, "ROCKY"],
      ["UltraMsg",      28, 40,  9, "#f59e0b", "rgba(245,158,11,0.2)",  null,      false, "SMALL"],
    ];

    const orbits = PLANETS.map(() => ({
      cx: 0, cy: 0,
      rx: (2 + Math.random() * 3) / 100,
      ry: (1.5 + Math.random() * 2) / 100,
      speed: 0.0002 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2,
    }));

    PLANETS.forEach((p, i) => {
      orbits[i].cx = p[1] / 100;
      orbits[i].cy = p[2] / 100;
    });

    const STARS = Array.from({ length: 180 }, (_, i) => {
      const tier = i < 108 ? "tiny" : i < 153 ? "medium" : "large";
      return {
        x: Math.random(), y: Math.random(),
        r: tier === "tiny" ? 0.4 + Math.random() * 0.6
         : tier === "medium" ? 1.2 + Math.random() * 0.9
         : 2.2 + Math.random() * 1.2,
        tier,
        baseOp: tier === "tiny" ? 0.2 + Math.random() * 0.3
               : tier === "medium" ? 0.4 + Math.random() * 0.3
               : 0.6 + Math.random() * 0.3,
        speed: tier === "tiny" ? 1 + Math.random() * 1.5
             : tier === "medium" ? 2 + Math.random() * 2
             : 3.5 + Math.random() * 3,
        offset: Math.random() * Math.PI * 2,
        color: tier === "large"
          ? `rgba(249,${140 + Math.floor(Math.random() * 30)},22`
          : `rgba(255,${228 + Math.floor(Math.random() * 27)},${190 + Math.floor(Math.random() * 65)}`,
      };
    });

    const NEBULAE = [
      { cx:0.15, cy:0.2,  r:0.38, color:[249,115,22],  alpha:0.055, sp:0.00007, ph:0 },
      { cx:0.8,  cy:0.15, r:0.32, color:[99,102,241],  alpha:0.045, sp:0.00005, ph:1.3 },
      { cx:0.5,  cy:0.6,  r:0.42, color:[20,184,166],  alpha:0.035, sp:0.00004, ph:2.5 },
      { cx:0.85, cy:0.7,  r:0.3,  color:[245,158,11],  alpha:0.04,  sp:0.00006, ph:0.9 },
      { cx:0.1,  cy:0.75, r:0.35, color:[139,92,246],  alpha:0.035, sp:0.00008, ph:3.2 },
    ].map(n => ({ ...n, ox: n.cx, oy: n.cy, x: n.cx, y: n.cy }));

    const AFRICA_POINTS = [
      [0.50,0.08],[0.58,0.06],[0.65,0.10],[0.70,0.18],[0.72,0.28],
      [0.68,0.40],[0.72,0.52],[0.70,0.65],[0.65,0.75],[0.58,0.82],
      [0.50,0.86],[0.42,0.82],[0.35,0.72],[0.30,0.60],[0.28,0.48],
      [0.32,0.36],[0.28,0.24],[0.32,0.14],[0.40,0.09],[0.50,0.08],
    ];

    const AFRICA = { x:0.03, y:0.55, w:0.14, h:0.22, opacity:0, glowT:0 };

    const CONST_LINES = [
      [1,0],[2,0],[3,0],[4,0],[5,0],[6,3],[7,1],[8,2],[1,2],[3,4],
    ];

    const SHOOTERS = [0, 7000, 15000].map(delay => ({
      active:false, x:0, y:0, len:0, angle:0, speed:0,
      progress:0, opacity:0,
      nextFire: Date.now() + 5000 + delay + Math.random() * 9000,
    }));

    let t = 0;

    const draw = () => {
      t++;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#060e1a";
      ctx.fillRect(0, 0, w, h);

      const mw = ctx.createLinearGradient(0, h * 0.1, w, h * 0.5);
      mw.addColorStop(0, "rgba(255,220,120,0)");
      mw.addColorStop(0.3, "rgba(255,220,120,0.025)");
      mw.addColorStop(0.5, "rgba(255,220,120,0.04)");
      mw.addColorStop(0.7, "rgba(255,220,120,0.025)");
      mw.addColorStop(1, "rgba(255,220,120,0)");
      ctx.fillStyle = mw;
      ctx.fillRect(0, 0, w, h);

      NEBULAE.forEach(n => {
        n.x = n.ox + Math.sin(t * n.sp + n.ph) * 0.035;
        n.y = n.oy + Math.cos(t * n.sp * 0.7 + n.ph) * 0.025;
        const r = n.r * Math.min(w, h);
        const g = ctx.createRadialGradient(n.x*w, n.y*h, 0, n.x*w, n.y*h, r);
        g.addColorStop(0, `rgba(${n.color.join(",")},${n.alpha})`);
        g.addColorStop(0.45, `rgba(${n.color.join(",")},${n.alpha * 0.35})`);
        g.addColorStop(1, `rgba(${n.color.join(",")},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, r, 0, Math.PI * 2);
        ctx.fill();
      });

      STARS.forEach(s => {
        const pulse = Math.sin(t * 0.01 * s.speed + s.offset);
        const op = s.baseOp * (0.55 + 0.45 * pulse);
        const sx = s.x * w, sy = s.y * h;

        if (s.tier === "large") {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.r * 3.5);
          g.addColorStop(0, `${s.color},${op})`);
          g.addColorStop(0.4, `${s.color},${op * 0.35})`);
          g.addColorStop(1, `${s.color},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, s.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color},${s.tier === "large" ? Math.min(op * 1.3, 1) : op})`;
        ctx.fill();
      });

      const positions = PLANETS.map((p, i) => {
        if (p[8] === "SUN") return { x: p[1] / 100 * w, y: p[2] / 100 * h };
        const o = orbits[i];
        return {
          x: (o.cx + Math.sin(t * o.speed + o.phase) * o.rx) * w,
          y: (o.cy + Math.cos(t * o.speed * 0.7 + o.phase) * o.ry) * h,
        };
      });

      CONST_LINES.forEach(([a, b]) => {
        const pa = positions[a], pb = positions[b];
        const pulse = 0.04 + 0.02 * Math.sin(t * 0.015 + a);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(249,180,80,${pulse})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      PLANETS.forEach((p, i) => {
        const pos = positions[i];
        const px = pos.x, py = pos.y;
        const r = p[3] === 0
          ? Math.min(w, h) * 0.055
          : (p[3] / 100) * Math.min(w, h);

        if (p[8] === "SUN") {
          const sunPulse = 0.9 + 0.1 * Math.sin(t * 0.02);
          const colors = [
            "rgba(66,133,244", "rgba(234,67,53",
            "rgba(52,168,83",  "rgba(249,180,22"
          ];
          const ci = Math.floor((t * 0.005) % colors.length);
          const cn = (ci + 1) % colors.length;
          const cf = (t * 0.005) % 1;

          [[r*3.5,0.04],[r*2.5,0.08],[r*1.8,0.12]].forEach(([gr, alpha]) => {
            const sg = ctx.createRadialGradient(px, py, 0, px, py, gr * sunPulse);
            sg.addColorStop(0, `${colors[ci]},${alpha + cf * 0.02})`);
            sg.addColorStop(1, `${colors[cn]},0)`);
            ctx.fillStyle = sg;
            ctx.beginPath();
            ctx.arc(px, py, gr * sunPulse, 0, Math.PI * 2);
            ctx.fill();
          });

          const cg = ctx.createRadialGradient(px - r*0.3, py - r*0.3, 0, px, py, r);
          cg.addColorStop(0, "rgba(255,255,220,0.95)");
          cg.addColorStop(0.4, "rgba(249,200,80,0.8)");
          cg.addColorStop(1, "rgba(249,115,22,0.6)");
          ctx.fillStyle = cg;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const gg = ctx.createRadialGradient(px, py, 0, px, py, r * 2.8);
          gg.addColorStop(0, p[5]);
          gg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gg;
          ctx.beginPath();
          ctx.arc(px, py, r * 2.8, 0, Math.PI * 2);
          ctx.fill();

          if (p[6]) {
            ctx.save();
            ctx.translate(px, py);
            ctx.scale(1, 0.3);
            ctx.beginPath();
            ctx.arc(0, 0, r * 1.9, 0, Math.PI * 2);
            ctx.strokeStyle = p[6] + "55";
            ctx.lineWidth = r * 0.35;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
            ctx.strokeStyle = p[6] + "30";
            ctx.lineWidth = r * 0.2;
            ctx.stroke();
            ctx.restore();
          }

          const pg = ctx.createRadialGradient(px - r*0.35, py - r*0.35, 0, px, py, r);
          pg.addColorStop(0, p[4] + "ee");
          pg.addColorStop(0.55, p[4] + "99");
          pg.addColorStop(1, p[4] + "44");
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.strokeStyle = p[4] + "40";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = `${Math.max(9, r * 0.45)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(p[0], px, py + r + 12);
        }
      });

      if (t > 120) {
        AFRICA.opacity = Math.min(AFRICA.opacity + 0.003, 0.55);
        AFRICA.glowT = (AFRICA.glowT + 1) % 180;
        const ax = AFRICA.x * w, ay = AFRICA.y * h;
        const aw = AFRICA.w * w, ah = AFRICA.h * h;

        ctx.beginPath();
        AFRICA_POINTS.forEach(([apx, apy], idx) => {
          const x = ax + apx * aw, y = ay + apy * ah;
          idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = `rgba(139,90,43,${AFRICA.opacity * 0.35})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(245,158,11,${AFRICA.opacity * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const durbanX = ax + 0.52 * aw;
        const durbanY = ay + 0.78 * ah;
        const glowFrac = Math.sin(AFRICA.glowT * 0.035);
        const glowR = (8 + glowFrac * 6) * (w / 1440);

        const durbanGlow = ctx.createRadialGradient(
          durbanX, durbanY, 0, durbanX, durbanY, glowR * 3
        );
        durbanGlow.addColorStop(0, `rgba(249,115,22,${0.7 + glowFrac * 0.25})`);
        durbanGlow.addColorStop(0.4, `rgba(249,115,22,${0.3 + glowFrac * 0.1})`);
        durbanGlow.addColorStop(1, "rgba(249,115,22,0)");
        ctx.fillStyle = durbanGlow;
        ctx.beginPath();
        ctx.arc(durbanX, durbanY, glowR * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,200,80,${0.8 + glowFrac * 0.2})`;
        ctx.beginPath();
        ctx.arc(durbanX, durbanY, 2 * (w / 1440), 0, Math.PI * 2);
        ctx.fill();
      }

      const now = Date.now();
      SHOOTERS.forEach(s => {
        if (!s.active && now >= s.nextFire) {
          s.active = true; s.progress = 0;
          s.x = Math.random() * w * 0.7;
          s.y = Math.random() * h * 0.35;
          s.len = 100 + Math.random() * 110;
          s.speed = 7 + Math.random() * 5;
          s.angle = (14 + Math.random() * 22) * Math.PI / 180;
        }
        if (s.active) {
          s.progress += s.speed;
          const total = s.len + 45;
          const frac = s.progress / total;
          s.opacity = frac < 0.2 ? frac / 0.2 : frac > 0.72 ? (1 - frac) / 0.28 : 1;
          if (s.progress > total) {
            s.active = false;
            s.nextFire = now + 9000 + Math.random() * 14000;
            return;
          }
          const hx = s.x + Math.cos(s.angle) * s.progress;
          const hy = s.y + Math.sin(s.angle) * s.progress;
          const tail = Math.min(s.progress, s.len);
          const tx = hx - Math.cos(s.angle) * tail;
          const ty = hy - Math.sin(s.angle) * tail;

          const sg = ctx.createLinearGradient(tx, ty, hx, hy);
          sg.addColorStop(0, "rgba(249,180,80,0)");
          sg.addColorStop(0.55, `rgba(255,210,120,${s.opacity * 0.55})`);
          sg.addColorStop(1, `rgba(255,245,200,${s.opacity})`);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.strokeStyle = sg;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.stroke();

          const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 7);
          hg.addColorStop(0, `rgba(255,245,185,${s.opacity * 0.95})`);
          hg.addColorStop(1, "rgba(255,195,75,0)");
          ctx.beginPath();
          ctx.arc(hx, hy, 7, 0, Math.PI * 2);
          ctx.fillStyle = hg;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
      }}
    />
  );
}
