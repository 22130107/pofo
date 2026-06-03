"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useSpring, useMotionValue, useTransform, useScroll } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

/* ───────── RNG ───────── */
function rng(s: number) {
  let seed = s;
  return () => { const x = Math.sin(seed++) * 10000; return x - Math.floor(x); };
}

/* ───────── Canvas: manga panel grid ───────── */
function drawPanelGrid(ctx: CanvasRenderingContext2D, w: number, h: number, isDark: boolean) {
  const R = rng(42);
  ctx.clearRect(0, 0, w, h);

  const pal = isDark
    ? { bg: "#0a0a0a", p: ["#161616", "#1c1c1c", "#242424"], b: "rgba(255,255,255,0.20)", s: "rgba(255,255,255,0.10)", a: "rgba(244,114,182,0.14)", e: "rgba(255,255,255,0.28)", ef: "rgba(255,255,255,0.10)", h: "rgba(255,255,255,0.04)" }
    : { bg: "#f5ede0", p: ["#ece0cc", "#e0d0b8", "#d4c0a4"], b: "rgba(0,0,0,0.30)", s: "rgba(0,0,0,0.12)", a: "rgba(244,114,182,0.15)", e: "rgba(0,0,0,0.35)", ef: "rgba(0,0,0,0.12)", h: "rgba(0,0,0,0.06)" };

  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, w, h);

  const cols = 8, rows = 9, cw = w / cols, rh = h / rows;
  const used: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
  const merge = (r: number, c: number, dc: number, dr: number) => {
    for (let drr = 0; drr < dr; drr++)
      for (let dcc = 0; dcc < dc; dcc++)
        if (r + drr < rows && c + dcc < cols) used[r + drr][c + dcc] = true;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (used[r][c]) continue;
      const dc = R() > 0.5 ? 2 : 1, dr = R() > 0.5 ? 2 : 1;
      merge(r, c, dc, dr);
      const px = c * cw, py = r * rh, pw = Math.min(dc * cw, w - px), ph = Math.min(dr * rh, h - py);
      if (pw <= 2 || ph <= 2) continue;

      ctx.fillStyle = pal.p[Math.floor(R() * 3)];
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = pal.b;
      ctx.lineWidth = 2;
      ctx.strokeRect(px, py, pw, ph);

      const roll = R();
      if (roll > 0.92) {
        ctx.strokeStyle = pal.e; ctx.lineWidth = 1.5;
        const cx = px + pw / 2, cy = py + pw * 0.35, r2 = pw * 0.1;
        ctx.beginPath(); ctx.ellipse(cx, cy, r2 * 2.2, r2 * 1.2, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = pal.ef; ctx.beginPath(); ctx.ellipse(cx, cy, r2 * 0.6, r2 * 0.9, 0, 0, Math.PI * 2); ctx.fill();
      } else if (roll > 0.84) {
        const bx = px + pw * 0.08, by = py + ph * 0.1, bw = pw * 0.84, bh = ph * 0.2;
        ctx.strokeStyle = pal.b; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, bh);
        ctx.beginPath(); ctx.moveTo(bx + bw * 0.25, by + bh); ctx.lineTo(bx + bw * 0.18, by + bh + 8); ctx.lineTo(bx + bw * 0.35, by + bh); ctx.fill(); ctx.stroke();
      } else if (roll > 0.78) {
        ctx.strokeStyle = pal.a; ctx.lineWidth = 2;
        for (let li = 0; li < 3; li++) {
          const lx = px + R() * pw, len = R() * ph * 0.5 + ph * 0.15, ang = R() * 0.4 - 0.2;
          ctx.beginPath(); ctx.moveTo(lx - ang * len / 2, py + ph / 2 - len / 2); ctx.lineTo(lx + ang * len / 2, py + ph / 2 + len / 2); ctx.stroke();
        }
      }
    }
  }

  ctx.strokeStyle = pal.s; ctx.lineWidth = 1.5;
  const R2 = rng(99);
  for (let i = 0; i < 50; i++) { const yp = R2() * h; ctx.beginPath(); ctx.moveTo(R2() * w * 0.2, yp); ctx.lineTo(w - R2() * w * 0.2, yp); ctx.stroke(); }
  for (let i = 0; i < 25; i++) { const xp = R2() * w; ctx.beginPath(); ctx.moveTo(xp, R2() * h * 0.2); ctx.lineTo(xp, h - R2() * h * 0.2); ctx.stroke(); }

  ctx.strokeStyle = pal.a; ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) { const cx = R2() * w, len = R2() * h * 0.3 + h * 0.1; ctx.beginPath(); ctx.moveTo(cx - 0.1 * len, h / 2 - len / 2); ctx.lineTo(cx + 0.1 * len, h / 2 + len / 2); ctx.stroke(); }

  const R3 = rng(77);
  for (let corner = 0; corner < 4; corner++) {
    const cx = corner % 2 === 0 ? 30 : w - 30, cy = corner < 2 ? 30 : h - 30;
    for (let di = 0; di < 7; di++) for (let dj = 0; dj < 7; dj++) {
      if (R3() > 0.55) continue;
      ctx.fillStyle = pal.h; ctx.beginPath(); ctx.arc(cx + di * 8, cy + dj * 8, R3() * 2 + 1, 0, Math.PI * 2); ctx.fill();
    }
  }
}

/* ───────── Canvas: floating strips ───────── */
const stripColors = ["rgba(244,114,182,0.2)", "rgba(56,189,248,0.18)", "rgba(167,139,250,0.16)", "rgba(251,191,36,0.14)", "rgba(52,211,153,0.12)", "rgba(248,113,113,0.16)"];

interface Strip { id: number; y: number; h: number; speed: number; color: string; panels: number; }

function drawStrip(ctx: CanvasRenderingContext2D, s: Strip, W: number, scrollX: number, isDark: boolean) {
  const tW = W * 2.5, ox = (-scrollX * s.speed) % tW;
  ctx.globalAlpha = 0.6;
  for (let pass = -1; pass <= 2; pass++) {
    const baseX = ox + pass * tW, pw = tW / s.panels;
    for (let p = 0; p < s.panels; p++) {
      const px = baseX + p * pw;
      if (px + pw < -50 || px > W + 50) continue;
      ctx.fillStyle = s.color; ctx.fillRect(px + 2, s.y + 2, pw - 4, s.h - 4);
      ctx.strokeStyle = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)";
      ctx.lineWidth = 1; ctx.strokeRect(px + 2, s.y + 2, pw - 4, s.h - 4);
    }
  }
  ctx.globalAlpha = 1;
}

/* ───────── Colors ───────── */
const COLORS = ["#f472b6", "#38bdf8", "#a78bfa", "#fbbf24", "#34d399"];

/* ───────── Sub-components for depth layers (isolated hooks) ───────── */

/* Geometric shape */
function GeoEl({ g, prog }: { g: any; prog: any }) {
  const y = useTransform(prog, [0, 1], [0, -60 * (1 - g.dep)]);
  const el = (() => {
    switch (g.tp) {
      case "c": return <div className="absolute rounded-full" style={{ width: g.w, height: g.h, background: "currentColor", left: `${g.x}%`, top: `${g.y}%` }} />;
      case "a": return <div className="absolute rounded-t-full" style={{ width: g.w, height: g.h / 2, border: "1px solid", borderBottom: "none", left: `${g.x}%`, top: `${g.y}%` }} />;
      case "r": return <div className="absolute" style={{ width: g.w, height: g.h * 0.35, background: "currentColor", left: `${g.x}%`, top: `${g.y}%` }} />;
      case "l": return <div className="absolute h-px" style={{ width: g.w, background: "currentColor", left: `${g.x}%`, top: `${g.y}%` }} />;
      case "o": return <div className="absolute rounded-full" style={{ width: g.w, height: g.w, border: "1.5px solid", left: `${g.x}%`, top: `${g.y}%` }} />;
    }
  })();
  return <motion.div className="absolute inset-0" style={{ y, color: g.cl, opacity: g.op }}>{el}</motion.div>;
}

/* Accent rule */
function RuleEl({ d, prog }: { d: any; prog: any }) {
  const y = useTransform(prog, [0, 1], [0, -70 * (1 - d.dep)]);
  return <motion.div className="absolute h-px" style={{ width: d.w, background: "currentColor", left: `${d.x}%`, top: `${d.y}%`, y, color: d.cl, opacity: d.op }} />;
}

/* Particle */
function PartEl({ d, prog }: { d: any; prog: any }) {
  const y = useTransform(prog, [0, 1], [0, -90]);
  return <motion.div className="absolute rounded-full" style={{ width: d.s, height: d.s, backgroundColor: d.cl, left: `${d.x}%`, top: `${d.y}%`, y, opacity: 0.08 }} />;
}

/* ───────── Main component ───────── */
export default function AnimeMangaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stripCanvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ w: 1920, h: 1080 });

  const { scrollYProgress } = useScroll();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 30, stiffness: 60, mass: 0.5 });
  const sy = useSpring(my, { damping: 30, stiffness: 60, mass: 0.5 });

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
    const onMouse = (e: MouseEvent) => { mx.set((e.clientX / window.innerWidth - 0.5) * 2); my.set((e.clientY / window.innerHeight - 0.5) * 2); };
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("mousemove", onMouse); window.removeEventListener("resize", onResize); };
  }, [mx, my]);

  /* Canvas manga grid */
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || !mounted) return;
    cvs.width = dims.w; cvs.height = dims.h;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    drawPanelGrid(ctx, dims.w, dims.h, isDark);
  }, [dims, isDark, mounted]);

  /* Floating strips */
  const strips = useMemo<Strip[]>(() => {
    const R = rng(123);
    return Array.from({ length: 6 }, (_, i) => ({ id: i, y: R() * 84 + 4, h: R() * 28 + 14, speed: R() * 0.3 + 0.15, color: stripColors[i % stripColors.length], panels: Math.floor(R() * 3) + 3 }));
  }, []);

  const scrollRef = useRef(0);
  useEffect(() => {
    const cvs = stripCanvasRef.current;
    if (!cvs || !mounted) return;
    cvs.width = dims.w; cvs.height = dims.h;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const tick = () => { scrollRef.current += 0.3; ctx.clearRect(0, 0, dims.w, dims.h); for (const s of strips) drawStrip(ctx, s, dims.w, scrollRef.current, isDark); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dims, mounted, strips, isDark]);

  /* Depth data (deterministic) */
  const shapes = useMemo(() => {
    const R = rng(2024);
    const types = ["c", "a", "r", "l", "o"];
    return Array.from({ length: 14 }, (_, i) => {
      const dep = R() * 0.7 + 0.1;
      const ci = Math.floor(R() * COLORS.length);
      return { id: i, tp: types[Math.floor(R() * types.length)], x: R() * 100, y: R() * 100, w: R() * 10 + 2, h: R() * 10 + 2, cl: COLORS[ci], dep, op: 0.04 + R() * 0.05 * (1 - dep) };
    });
  }, []);

  const rules = useMemo(() => {
    const R = rng(3030);
    return Array.from({ length: 8 }, (_, i) => {
      const dep = R() * 0.5 + 0.1;
      const ci = Math.floor(R() * COLORS.length);
      return { id: i, x: R() * 90 + 5, y: R() * 100, w: R() * 18 + 4, cl: COLORS[ci], dep, op: 0.06 + R() * 0.05 * (1 - dep) };
    });
  }, []);

  const dots = useMemo(() => {
    const R = rng(5050);
    return Array.from({ length: 10 }, (_, i) => {
      const ci = Math.floor(R() * COLORS.length);
      return { id: i, x: R() * 100, y: R() * 100, s: R() * 2.5 + 1, cl: COLORS[ci] };
    });
  }, []);

  const vx = useTransform(sx, (v: number) => v * 10);
  const vy = useTransform(sy, (v: number) => v * 10);

  if (!mounted) {
    return <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-20" aria-hidden="true" />;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-20" aria-hidden="true">
      {/* 1. Manga grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Dot grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* 3. Geometric shapes (depth parallax) */}
      {shapes.map((s) => <GeoEl key={s.id} g={s} prog={scrollYProgress} />)}

      {/* 4. Accent rules */}
      {rules.map((r) => <RuleEl key={`r-${r.id}`} d={r} prog={scrollYProgress} />)}

      {/* 5. Floating strips canvas */}
      <canvas ref={stripCanvasRef} className="absolute inset-0 w-full h-full" style={{ filter: "blur(1.5px)" }} />

      {/* 6. Particles */}
      {dots.map((d) => <PartEl key={`p-${d.id}`} d={d} prog={scrollYProgress} />)}

      {/* 7. Vignette + light rays (mouse follow) */}
      <motion.div className="absolute inset-0" style={{ x: vx, y: vy }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, rgba(0,0,0,0.18) 100%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: "linear-gradient(105deg, transparent 30%, rgba(244,114,182,0.5) 40%, transparent 50%, rgba(56,189,248,0.4) 60%, transparent 70%)", transform: "skewX(-6deg)" }} />
      </motion.div>
    </div>
  );
}
