"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code, Palette, Database, Gear } from "@phosphor-icons/react";

const highlights = [
  { icon: Code, title: "Clean Code", desc: "Writing maintainable, scalable, and well-architected solutions." },
  { icon: Palette, title: "Pixel Perfect", desc: "Crafting interfaces with meticulous attention to every detail." },
  { icon: Database, title: "Full Stack", desc: "End-to-end development from database to deployment." },
  { icon: Gear, title: "Performance", desc: "Optimizing for speed, accessibility, and seamless UX." },
];

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Open Source" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    let start = 0;
    const end = value;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        el.textContent = `${end}${suffix}`;
        clearInterval(timer);
      } else {
        el.textContent = `${start}${suffix}`;
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, suffix]);

  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-muted font-mono">
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5 mb-7 leading-[1.05]">
              Turning complex problems into{" "}
              <span className="gradient-text">simple solutions</span>
            </h2>
            <div className="space-y-5 text-muted leading-relaxed max-w-[520px]">
              <p className="text-base">
                I&apos;m a full-stack developer with 5+ years of experience
                building web applications. I specialize in React, Next.js,
                TypeScript, and Node.js — delivering products that users love.
              </p>
              <p>
                I believe great software is built at the intersection of
                engineering excellence and user empathy.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open source, or writing about
                web development.
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className="group rounded-2xl border border-border bg-surface p-5 md:p-6 card-hover relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mt-20 border border-border bg-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface p-8 md:p-10 text-center">
              <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
