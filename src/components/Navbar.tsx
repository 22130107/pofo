"use client";

import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0px, 0px)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className="inline-block text-sm text-muted hover:text-foreground transition-colors duration-300 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
      style={{ transition: "color 0.3s" }}
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <nav
        className={`mx-auto max-w-5xl flex items-center justify-between rounded-full transition-all duration-700 ${
          scrolled
            ? "h-14 px-6 glass shadow-sm"
            : "h-16 px-8 bg-transparent"
        }`}
      >
        <a
          href="#"
          className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
        >
          <span className="text-accent">JD</span>
          <span className="text-muted">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <MagneticLink href={link.href} label={link.label} />
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="group relative inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background overflow-hidden transition-all active:scale-[0.97]"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-full transition-all ${
            scrolled ? "hover:bg-surface-hover" : ""
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:hidden mx-auto mt-2 max-w-sm rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-surface-hover transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium bg-foreground text-background text-center mt-2"
                >
                  Get in Touch
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
