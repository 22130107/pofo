"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NODES = 24;
const STIFFNESS = 0.15;
const LEAD_STIFFNESS = 0.35;

export default function BackgroundTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < NODES; i++) {
      const el = document.createElement("div");
      el.className = "absolute rounded-full will-change-transform";
      el.style.transform = "translate(-50%, -50%)";
      container.appendChild(el);
      dots.push(el);
    }

    const targets: { x: number; y: number }[] = Array.from(
      { length: NODES },
      () => ({ x: -200, y: -200 })
    );

    const mouse = { x: -200, y: -200 };
    const velocity = { x: 0, y: 0 };
    let prevMouse = { x: -200, y: -200 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -200;
      mouse.y = -200;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    for (let i = 0; i < NODES; i++) {
      gsap.set(dots[i], { x: -200, y: -200, opacity: 0, scale: 0 });
    }

    let raf: number;

    const tick = () => {
      velocity.x = mouse.x - prevMouse.x;
      velocity.y = mouse.y - prevMouse.y;
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const leadEase = Math.min(LEAD_STIFFNESS + speed * 0.002, 0.8);

      targets[0].x += (mouse.x - targets[0].x) * leadEase;
      targets[0].y += (mouse.y - targets[0].y) * leadEase;

      for (let i = 1; i < NODES; i++) {
        const prev = targets[i - 1];
        const ease = STIFFNESS + (NODES - i) * 0.002;
        targets[i].x += (prev.x - targets[i].x) * ease;
        targets[i].y += (prev.y - targets[i].y) * ease;
      }

      for (let i = 0; i < NODES; i++) {
        const t = i / (NODES - 1);
        const dist = Math.sqrt(
          (targets[i].x - mouse.x) ** 2 + (targets[i].y - mouse.y) ** 2
        );

        const nearOpacity =
          dist < 50 ? 1 : Math.max(1 - (dist - 50) / 300, 0);
        const size = (1 - t * 0.85) * 12 + 1;
        const blur = t * 5;
        const alpha = (1 - t * 0.75) * nearOpacity;

        const el = dots[i];
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.filter = `blur(${blur}px)`;

        const mixPink = Math.round((1 - t) * 100);
        const mixBlue = Math.round(t * 100);
        el.style.background = `color-mix(in srgb, var(--accent) ${mixPink}%, var(--accent-alt) ${mixBlue}%)`;

        el.style.boxShadow =
          i === 0
            ? `0 0 ${12 + speed * 0.1}px color-mix(in srgb, var(--accent) ${Math.min(60 + speed, 100)}%, transparent)`
            : `0 0 ${blur * 2}px color-mix(in srgb, var(--accent) ${Math.max(30 - t * 20, 5)}%, transparent)`;

        gsap.set(el, {
          x: targets[i].x,
          y: targets[i].y,
          opacity: alpha,
          scale: 1 + speed * 0.005 * (1 - t) * 0.5,
        });
      }

      const pathEl = container.querySelector<SVGPathElement>(
        "path[data-trail]"
      );
      const glowEl = container.querySelector<SVGPathElement>(
        "path[data-glow]"
      );
      if (pathEl && glowEl) {
        let d = "";
        const count = Math.min(NODES, 18);
        for (let i = 0; i < count; i++) {
          if (targets[i].x < -50 || targets[i].y < -50) {
            d = "";
            break;
          }
          const x = targets[i].x;
          const y = targets[i].y;
          if (i === 0) {
            d = `M ${x} ${y}`;
          } else {
            const prev = targets[i - 1];
            const cpx = (prev.x + x) / 2;
            const cpy = (prev.y + y) / 2;
            d += ` Q ${prev.x} ${prev.y}, ${cpx} ${cpy}`;
          }
        }
        pathEl.setAttribute("d", d);
        glowEl.setAttribute("d", d);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf);
      for (const el of dots) {
        el.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ filter: "blur(1px)" }}
      >
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent-alt)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          data-glow
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeOpacity="0.1"
          style={{ filter: "blur(6px)" }}
        />
        <path
          data-trail
          fill="none"
          stroke="url(#trailGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
