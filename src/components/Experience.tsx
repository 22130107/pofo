"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, ArrowUpRight } from "@phosphor-icons/react";
import { useReducedMotion, motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    period: "2023 — Present",
    description:
      "Leading the development of customer-facing web applications serving 100K+ users. Architected microservices migration and improved performance by 40%. Directed a team of 6 engineers to deliver modular UI design systems.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    color: "rgba(59, 130, 246, 0.05)",
    borderColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    period: "2021 — 2023",
    description:
      "Built the core product from the ground up. Implemented real-time messaging features, Stripe payment integration, and CI/CD pipelines. Grew user base to 10K+ monthly active users.",
    tags: ["Next.js", "TypeScript", "GraphQL", "Docker"],
    color: "rgba(16, 185, 129, 0.05)",
    borderColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    role: "Frontend Developer",
    company: "DesignStudio",
    period: "2020 — 2021",
    description:
      "Developed responsive web applications and highly interactive landing pages. Collaborated closely with design teams to implement pixel-perfect UI animations and smooth scroll interactions.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    color: "rgba(249, 115, 22, 0.05)",
    borderColor: "rgba(249, 115, 22, 0.15)",
  },
  {
    role: "Junior Developer",
    company: "WebAgency",
    period: "2019 — 2020",
    description:
      "Started my professional journey building commercial WordPress installations and simple React single-page applications. Learned git-based version control and web standard practices.",
    tags: ["JavaScript", "React", "Git", "WordPress"],
    color: "rgba(236, 72, 153, 0.05)",
    borderColor: "rgba(236, 72, 153, 0.15)",
  },
];

export default function Experience() {
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isDesktop || !containerRef.current) return;

    const container = containerRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".experience-card-wrapper");

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // We don't pin the last card because there is nothing coming after it
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Previous card scales down and fades out slightly as the next card arrives
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [isDesktop, reduceMotion]);

  // Mobile Layout: standard timeline list
  if (!isDesktop) {
    return (
      <section id="experience" className="section-padding bg-transparent border-t border-border">
        <div className="container-wide max-w-3xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Where I&apos;ve worked
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border p-6"
                style={{ backgroundColor: exp.color, borderColor: exp.borderColor }}
              >
                <div className="flex items-center gap-2 text-xs text-muted mb-3 font-mono">
                  <Calendar size={12} />
                  <span>{exp.period}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
                <div className="flex items-center gap-1.5 text-xs text-accent font-semibold mb-4 font-mono">
                  <Briefcase size={13} />
                  <span>{exp.company}</span>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-5">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-border/50 text-muted font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout: GSAP Sticky-Stack list
  return (
    <section ref={containerRef} id="experience" className="relative bg-transparent border-t border-border">
      {/* Intro Header (Stays static on top of the section or pins) */}
      <div className="container-wide max-w-4xl pt-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Where I&apos;ve worked
        </h2>
      </div>

      {/* Cards Stack */}
      <div className="relative max-w-4xl mx-auto px-6">
        {experiences.map((exp, i) => (
          <div
            key={exp.period}
            className="experience-card-wrapper sticky top-0 min-h-[100dvh] flex items-center justify-center z-10"
          >
            {/* The actual Card Element */}
            <div
              className="w-full rounded-3xl border p-10 md:p-12 shadow-lg backdrop-blur-xl relative overflow-hidden"
              style={{
                backgroundColor: exp.color.replace("0.05", "0.65"), // increase opacity slightly for glass stack contrast
                borderColor: exp.borderColor,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
              }}
            >
              {/* Subtle tech grid motif matching the theme */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/[0.02] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

              <div className="grid grid-cols-12 gap-8 items-start relative">
                {/* Details Column */}
                <div className="col-span-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs text-accent font-semibold">0{i + 1} / EXPERIENCE</span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">
                    {exp.role}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-sm text-accent mb-6 font-mono font-semibold">
                    <Briefcase size={14} />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-[50ch]">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-border/50 text-muted font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline Column */}
                <div className="col-span-4 flex flex-col items-end justify-between h-full min-h-[180px]">
                  <div className="flex items-center gap-2 text-xs text-muted font-mono border border-border/80 px-3.5 py-1.5 rounded-full bg-surface/50 shadow-sm">
                    <Calendar size={13} className="text-accent" />
                    <span>{exp.period}</span>
                  </div>
                  
                  <div className="text-right mt-16">
                    <span className="text-[10px] font-mono text-muted/60 block mb-1">CREDENTIALS</span>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                    >
                      Verify on LinkedIn
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
