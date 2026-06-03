"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "PostgreSQL", level: 85 },
      { name: "GraphQL", level: 80 },
      { name: "Prisma ORM", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS / Vercel", level: 85 },
      { name: "CI / CD", level: 82 },
      { name: "Git", level: 92 },
    ],
  },
];

const techLogos = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind", "PostgreSQL",
  "GraphQL", "Docker", "AWS", "Prisma", "Motion", "Redis",
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind", "PostgreSQL",
  "GraphQL", "Docker", "AWS", "Prisma", "Motion", "Redis",
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind", "PostgreSQL",
  "GraphQL", "Docker", "AWS", "Prisma", "Motion", "Redis",
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          ref={ref}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${level}%` } : { width: "0%" }}
           transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>
    </div>
  );
}

function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border py-5 mt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <motion.div
        className="flex gap-12"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {techLogos.map((tech, i) => (
          <span key={`${tech}-${i}`} className="text-sm font-mono text-muted uppercase tracking-widest whitespace-nowrap">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-transparent relative overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          My tech stack
        </h2>
      </motion.div>

      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="group rounded-[1.75rem] bg-black/[0.03] dark:bg-white/[0.03] p-[1px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="rounded-[calc(1.75rem-1px)] bg-surface p-6 md:p-8 h-full relative overflow-hidden card-hover shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-lg font-semibold mb-7 relative">{cat.title}</h3>
                <div className="space-y-5 relative">
                  {cat.skills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.15} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
