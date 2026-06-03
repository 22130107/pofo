"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import { useReducedMotion, motion } from "motion/react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "CloudDash",
    desc: "Real-time analytics dashboard with live data streaming, interactive charts, and team collaboration features.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    imgs: [
      "https://picsum.photos/seed/clouddash1/800/900",
      "https://picsum.photos/seed/clouddash2/800/900",
      "https://picsum.photos/seed/clouddash3/800/900",
    ],
    glowColor: "rgba(59, 130, 246, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "02",
    title: "MarketFlow",
    desc: "E-commerce platform with AI-powered recommendations, inventory management, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imgs: [
      "https://picsum.photos/seed/marketflow1/800/900",
      "https://picsum.photos/seed/marketflow2/800/900",
      "https://picsum.photos/seed/marketflow3/800/900",
    ],
    glowColor: "rgba(16, 185, 129, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "03",
    title: "DevKit CLI",
    desc: "Command-line tool that automates project scaffolding, code generation, and deployment workflows.",
    tags: ["Node.js", "TypeScript", "CLI", "Docker"],
    imgs: [
      "https://picsum.photos/seed/devkitcli1/800/900",
      "https://picsum.photos/seed/devkitcli2/800/900",
      "https://picsum.photos/seed/devkitcli3/800/900",
    ],
    glowColor: "rgba(249, 115, 22, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "04",
    title: "SocialSync",
    desc: "Social media management platform with scheduling, analytics, and cross-platform publishing.",
    tags: ["Next.js", "GraphQL", "Redis", "AWS"],
    imgs: [
      "https://picsum.photos/seed/socialsync1/800/900",
      "https://picsum.photos/seed/socialsync2/800/900",
      "https://picsum.photos/seed/socialsync3/800/900",
    ],
    glowColor: "rgba(236, 72, 153, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
];

export default function Projects() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (reduceMotion || !isDesktop || !containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;
    const hzDistance = track.scrollWidth - window.innerWidth;
    if (hzDistance <= 0) return;

    const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
    const stacks = gsap.utils.toArray<HTMLElement>(".project-image-stack");
    if (stacks.length !== panels.length) return;

    const panelCount = panels.length;
    const extraVh = 120;
    const ev = window.innerHeight * (extraVh / 100);
    const totalScroll = hzDistance + panelCount * ev;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${totalScroll}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const dist = self.progress * totalScroll;
        if (dist <= 0) return;

        const introWidth = panels[0].offsetLeft;

        // --- Intro: move track to reveal first panel ---
        if (dist < introWidth) {
          gsap.set(track, { x: -dist });
          return;
        }

        let s = introWidth;

        // --- Per panel: vertical then horizontal ---
        for (let i = 0; i < panelCount; i++) {
          const panel = panels[i];
          const stack = stacks[i];
          const pw = panel.offsetWidth;

          if (pw <= 0) continue;

          // Vertical: track stays, images pan
          if (dist < s + ev) {
            const vp = (dist - s) / ev;
            gsap.set(track, { x: -panel.offsetLeft });
            if (stack?.parentElement) {
              const maxY = stack.parentElement.clientHeight - stack.scrollHeight;
              if (maxY < 0) gsap.set(stack, { y: maxY * Math.max(0, vp) });
            }
            return;
          }
          s += ev;

          // Images done
          if (stack?.parentElement) {
            const maxY = stack.parentElement.clientHeight - stack.scrollHeight;
            if (maxY < 0) gsap.set(stack, { y: maxY });
          }

          // Horizontal: images stay, track moves
          const advance = Math.min(pw, hzDistance - panel.offsetLeft);
          if (advance <= 0) continue;

          if (dist < s + advance) {
            const hp = (dist - s) / advance;
            gsap.set(track, { x: -(panel.offsetLeft + advance * hp) });
            return;
          }
          s += advance;
        }

        gsap.set(track, { x: -hzDistance });
      },
    });
  }, { scope: containerRef, dependencies: [isDesktop, reduceMotion], revertOnUpdate: true });

  if (!isDesktop) {
    return (
      <section id="projects" className="section-padding bg-transparent border-t border-border">
        <div className="container-wide">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Selected Work
            </h2>
            <p className="text-muted mt-3 max-w-md">
              A selection of digital products built with modern stacks, focusing on user experience and robust architecture.
            </p>
          </div>

          <div className="space-y-12">
            {projects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-surface p-5 overflow-hidden flex flex-col gap-5"
              >
                <div
                  className="absolute inset-0 opacity-10 bg-gradient-to-br transition-opacity duration-500 group-hover:opacity-15"
                  style={{ backgroundImage: `radial-gradient(circle at 100% 100%, ${project.glowColor}, transparent 60%)` }}
                />
                <div className="relative h-48 sm:h-64 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={project.imgs[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-accent font-semibold">{project.num}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="font-mono text-xs text-muted">CASE STUDY</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-border/50 text-muted font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98]"
                    >
                      Visit Site
                      <ArrowUpRight size={12} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center w-9 rounded-full border border-border text-muted hover:text-foreground transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <GithubLogo size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="projects" className="relative overflow-hidden bg-transparent border-y border-border">
      <div ref={trackRef} className="flex h-[100dvh] items-center">
        <div className="flex-shrink-0 w-[55vw] h-full flex flex-col justify-center px-16 lg:px-24 border-r border-border bg-surface/10 relative">
          <div className="max-w-md">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">01 / Selected Work</span>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none mt-4 mb-6">
              Featured<br />projects
            </h2>
            <p className="text-muted leading-relaxed text-base">
              A curated showcase of applications built with standard-setting quality, pixel-perfect responsiveness, and robust motion designs.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted font-mono">
              <span>SCROLL TO EXPLORE</span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={14} className="text-accent" />
              </motion.div>
            </div>
          </div>
        </div>

        {projects.map((project, idx) => (
          <div
            key={project.title}
            className="project-panel flex-shrink-0 w-[85vw] lg:w-[75vw] h-full flex items-center justify-center px-16 lg:px-24 border-r border-border relative bg-surface/5"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at 80% 50%, ${project.glowColor}, transparent 80%)`,
              }}
            />

            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center w-full">
              <div className="col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-accent font-semibold">{project.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">CASE STUDY</span>
                </div>

                <h3 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4 leading-none">
                  {project.title}
                </h3>

                <p className="text-muted text-sm lg:text-base leading-relaxed mb-6">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-border/50 text-muted font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-xs font-semibold text-background hover:opacity-90 transition-all active:scale-[0.97]"
                  >
                    Visit Live Site
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center w-11 rounded-full border border-border text-muted hover:text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-300"
                    aria-label="GitHub Repository"
                  >
                    <GithubLogo size={17} />
                  </a>
                </div>
              </div>

              <div className="col-span-7 relative h-[60vh] overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/30 to-transparent z-10 pointer-events-none" />
                <div className="project-image-stack absolute inset-x-0 top-0 will-change-transform">
                  {project.imgs.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full"
                      style={{ height: "60vh" }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${imgIdx + 1}`}
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority={idx === 0 && imgIdx === 0}
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/50 text-[10px] font-mono text-muted">
                  <span>SCROLL TO EXPLORE</span>
                  <motion.span
                    className="block"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-[45vw] h-full flex flex-col justify-center px-16 lg:px-24 bg-surface/10 relative">
          <div className="max-w-xs">
            <h3 className="text-3xl font-bold tracking-tight mb-4">
              Let&apos;s build together.
            </h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Have a visionary project or need a full-stack engineer? Drop me a line.
            </p>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 text-xs font-semibold text-accent hover:underline group"
            >
              Get in touch
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
