import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;
const DOT_SIZE = 8;
const HOVER_SIZE = 20;

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mx = -100, my = -100;
    let isHovering = false;
    let animId: number;
    const trail: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering = !!target.closest("a, button, [role='button'], input, textarea, select, label");
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add to trail
      trail.push({ x: mx, y: my, alpha: 0.5, size: isHovering ? HOVER_SIZE : DOT_SIZE });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      // Draw trail particles
      trail.forEach((p, i) => {
        const progress = i / trail.length;
        const alpha = p.alpha * progress * 0.4;
        const size = p.size * progress * 0.5;
        if (alpha < 0.01) return;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(40, 89%, 61%, ${alpha})`;
        ctx.fill();
      });

      // Draw main dot
      const currentSize = isHovering ? HOVER_SIZE : DOT_SIZE;

      // Outer glow
      ctx.beginPath();
      ctx.arc(mx, my, currentSize + 4, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(40, 89%, 61%, 0.08)";
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(mx, my, currentSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(40, 89%, 61%, 0.6)";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
