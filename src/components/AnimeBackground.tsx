"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

export default function AnimeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Use Springs for smooth mouse interpolation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [rawCoordinates, setRawCoordinates] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => {
      setMounted(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Normalized values between -0.5 and 0.5
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
      setRawCoordinates({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate 25 lightweight floating dust particles deterministically for React 19 compliance
  const particles = useMemo(() => {
    const arr = [];
    let seed = 42;
    // Pure, deterministic linear congruential / sine-wave pseudo-random generator
    const nextRand = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 25; i++) {
      arr.push({
        id: i,
        x: nextRand() * 100,
        y: nextRand() * 100,
        size: nextRand() * 4 + 2,
        duration: nextRand() * 15 + 15,
        delay: nextRand() * -20,
        opacity: nextRand() * 0.4 + 0.2,
      });
    }
    return arr;
  }, []);

  // Set up values for transforms based on spring animations using useTransform
  const aurora1X = useTransform(smoothX, (v) => v * -80);
  const aurora1Y = useTransform(smoothY, (v) => v * -80);

  const aurora2X = useTransform(smoothX, (v) => v * 80);
  const aurora2Y = useTransform(smoothY, (v) => v * 80);

  const aurora3X = useTransform(smoothX, (v) => v * 30);
  const aurora3Y = useTransform(smoothY, (v) => v * -30);

  const gridRotateY = useTransform(smoothX, (v) => v * 12);
  const gridRotateX = useTransform(smoothY, (v) => v * -6 + 75); // base X rotation is 75deg
  const gridX = useTransform(smoothX, (v) => v * -60);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none -z-10 bg-transparent transition-all duration-700 ease-out"
    >
      {/* 1. Dynamic Aurora Glow Orbs */}
      <div className="absolute inset-0 z-0">
        {/* Violet/Indigo Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full -top-20 -left-20"
          style={{
            x: aurora1X,
            y: aurora1Y,
            background: isDark
              ? "radial-gradient(circle, rgba(249, 168, 212, 0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(244, 114, 182, 0.06) 0%, transparent 70%)",
          }}
        />
        {/* Cyan/Blue Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full -bottom-40 -right-20"
          style={{
            x: aurora2X,
            y: aurora2Y,
            background: isDark
              ? "radial-gradient(circle, rgba(125, 211, 252, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)",
          }}
        />
        {/* Accent Center Orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full top-1/3 left-1/3"
          style={{
            x: aurora3X,
            y: aurora3Y,
            background: isDark
              ? "radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(196, 181, 253, 0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* 2. 3D Perspective Tech Grid Floor */}
      <div className="absolute inset-0 perspective-1000 z-1 flex items-end justify-center">
        <motion.div
          className="grid-3d-floor w-[200%] h-[120%] absolute -bottom-[45%] opacity-60"
          style={{
            rotateY: gridRotateY,
            rotateX: gridRotateX,
            x: gridX,
          }}
        />
      </div>

      {/* 3. Floating Micro-particles */}
      <div className="absolute inset-0 z-2">
        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}%`, y: "110%", opacity: 0 }}
            animate={{
              y: ["110%", "-10%"],
              opacity: [0, p.opacity, p.opacity, 0],
              x: [`${p.x}%`, `${p.x + (Math.sin(p.id) * 5)}%`, `${p.x + (Math.sin(p.id) * 10)}%`],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.25)" : "var(--accent)",
              boxShadow: isDark ? "0 0 4px rgba(255,255,255,0.4)" : "none",
            }}
          />
        ))}
      </div>

      {/* 4. Fine Technical UI Accents & Coordinates */}
      <div className="absolute inset-0 z-3 p-6 font-mono text-[9px] text-muted/40 tracking-[0.2em] uppercase select-none pointer-events-none">
        {/* Top Left */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>SYS_STATUS: ACTIVE</span>
          <span className="text-muted/20">|</span>
          <span>DPR_{mounted ? window.devicePixelRatio.toFixed(1) : "1.5"}</span>
        </div>

        {/* Top Right */}
        <div className="absolute top-8 right-8 flex gap-4">
          <span>[ RES_GRID: 45PX ]</span>
          <span>[ ZOOM_F: 1.0 ]</span>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-1 text-[8px] tracking-widest text-muted/30">
          <div>LOC_GRID: PORTFOLIO_V2</div>
          <div>
            CRD_X: <span className="text-accent/60 font-semibold">{(rawCoordinates.x + 0.5).toFixed(4)}</span> / 
            CRD_Y: <span className="text-accent-alt/60 font-semibold">{(rawCoordinates.y + 0.5).toFixed(4)}</span>
          </div>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-8 right-8 flex gap-3 items-center">
          <span className="text-[7px] border border-muted/20 px-1 py-0.5 rounded">GRID_SEC_01</span>
          <span>LAT_0.231 // LON_0.941</span>
        </div>

        {/* Dynamic technical crosshair overlays */}
        <div className="absolute right-12 top-1/3 w-32 h-32 opacity-[0.06] border border-dashed border-muted rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]" />
        <div className="absolute left-12 top-2/3 w-20 h-20 opacity-[0.04] border border-muted rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
          <div className="w-10 h-10 border border-dashed border-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}
