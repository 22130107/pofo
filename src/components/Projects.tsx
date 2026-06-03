"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight, GithubLogo, ArrowRight } from "@phosphor-icons/react";
import { useReducedMotion, motion } from "motion/react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    num: "01",
    title: "CloudDash",
    desc: "Real-time analytics dashboard with live data streaming, interactive charts, and team collaboration features.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket"],
    img: "https://picsum.photos/seed/clouddash/800/500",
    color: "from-blue-500/10 to-indigo-600/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "02",
    title: "MarketFlow",
    desc: "E-commerce platform with AI-powered recommendations, inventory management, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    img: "https://picsum.photos/seed/marketflow/800/500",
    color: "from-emerald-500/10 to-teal-600/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "03",
    title: "DevKit CLI",
    desc: "Command-line tool that automates project scaffolding, code generation, and deployment workflows.",
    tags: ["Node.js", "TypeScript", "CLI", "Docker"],
    img: "https://picsum.photos/seed/devkitcli/800/500",
    color: "from-orange-500/10 to-red-600/10",
    glowColor: "rgba(249, 115, 22, 0.15)",
    github: "https://github.com",
    demo: "https://google.com",
  },
  {
    num: "04",
    title: "SocialSync",
    desc: "Social media management platform with scheduling, analytics, and cross-platform publishing.",
    tags: ["Next.js", "GraphQL", "Redis", "AWS"],
    img: "https://picsum.photos/seed/socialsync/800/500",
    color: "from-pink-500/10 to-rose-600/10",
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

    const track = trackRef.current;
    const trackWidth = track.scrollWidth;
    const scrollDistance = trackWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: containerRef, dependencies: [isDesktop, reduceMotion], revertOnUpdate: true });

  if (!isDesktop) {
    // Mobile Layout: Vertical stack of items
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
                    src={project.img}
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

  // Desktop Layout: GSAP Horizontal Pan slider
  return (
    <section ref={containerRef} id="projects" className="relative overflow-hidden bg-transparent border-y border-border">
      <div ref={trackRef} className="flex h-[100dvh] items-center">
        {/* Intro Slide */}
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

        {/* Project Slides */}
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="flex-shrink-0 w-[85vw] lg:w-[75vw] h-full flex items-center justify-center px-16 lg:px-24 border-r border-border relative bg-surface/5"
          >
            {/* Subtle Gradient Glow matching each project's color scheme */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at 80% 50%, ${project.glowColor}, transparent 80%)`,
              }}
            />

            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center w-full">
              {/* Project Details */}
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

              {/* Project Image Frame */}
              <div className="col-span-7">
                <div className="relative group rounded-2xl border border-border bg-surface overflow-hidden aspect-[16/10] shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Subtle hover overlay grid/glass */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent z-10 pointer-events-none" />
                  
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    sizes="50vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Closing Slide */}
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
