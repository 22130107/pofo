"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, At, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import AnimeBackground from "@/components/AnimeBackground";

const easeOutQuart = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutQuart },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, []);

  const headline = "Building digital experiences";
  const chars = headline.split("");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <AnimeBackground />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--accent), transparent 50%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${400 + i * 250}px`,
              height: `${400 + i * 250}px`,
              background: `radial-gradient(circle, color-mix(in srgb, var(--accent) ${6 - i * 2}%, transparent) 0%, transparent 70%)`,
              left: `${15 + i * 28}%`,
              top: `${5 + i * 22}%`,
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -40, 30, 0],
            }}
            transition={{
              duration: 14 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container-wide px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={childVariants}
            className="inline-block mb-8 text-xs uppercase tracking-[0.25em] text-muted font-mono"
          >
            Full-Stack Developer
          </motion.span>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] mb-8 px-4 overflow-hidden">
            <span className="block">
              {chars.map((char, ci) => (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + ci * 0.03,
                    ease: easeOutQuart,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg text-muted max-w-[480px] mx-auto leading-relaxed mb-10"
          >
            I craft high-performance web applications with modern
            technologies. Focused on creating clean, fast, and
            accessible digital products.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex h-13 items-center gap-3 rounded-full bg-foreground pl-8 pr-[3px] text-sm font-medium text-background transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
            >
              <span>View My Work</span>
              <span className="flex items-center justify-center w-[calc(3.25rem-4px)] h-[calc(3.25rem-4px)] rounded-full bg-background/15 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-accent">
                <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex h-13 items-center rounded-full border border-border px-8 text-sm font-medium hover:bg-surface-hover transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="flex items-center justify-center gap-6 mt-14"
          >
            {[
              { icon: GithubLogo, href: "https://github.com", label: "GitHub" },
              { icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: At, href: "mailto:hello@johndoe.dev", label: "Email" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-300"
                aria-label={item.label}
              >
                <item.icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-5 h-9 rounded-full border-2 border-border flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
