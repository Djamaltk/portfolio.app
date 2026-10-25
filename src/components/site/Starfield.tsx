import { useEffect, useRef } from "react";

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    let stars: { x: number; y: number; z: number; t: number }[] = [];
    const color = getComputedStyle(document.documentElement).getPropertyValue("--primary-glow").trim() || "white";
    const resize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
      stars = Array.from({ length: Math.floor((w * h) / 6000) }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 1.4 + 0.2, t: Math.random() * 6,
      }));
    };
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(time / 1400 + s.t));
        ctx.globalAlpha = a * (s.z / 1.6);
        ctx.fillStyle = s.z > 1.3 ? color : "white";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) { s.y -= s.z * 0.08; if (s.y < 0) s.y = h; }
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
