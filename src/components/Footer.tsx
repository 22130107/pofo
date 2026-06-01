"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowUp, GithubLogo, LinkedinLogo, At } from "@phosphor-icons/react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border relative">
      <div className="container-wide px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <a href="#" className="text-lg font-bold tracking-tight">
              <span className="text-accent">JD</span>
              <span className="text-muted">.</span>
            </a>
            <p className="text-sm text-muted mt-2 max-w-[220px]">
              Full-stack developer crafting high-performance web applications.
            </p>
          </div>

          <div className="flex justify-center gap-4">
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
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent transition-all duration-300"
                aria-label={item.label}
              >
                <item.icon size={16} />
              </a>
            ))}
          </div>

          <div className="text-right">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} John Doe
            </p>
            <p className="text-xs text-muted/60 mt-1 flex items-center justify-end gap-1">
              Built with <Heart size={11} className="text-red-500" weight="fill" /> using Next.js
            </p>
          </div>
        </div>
      </div>

      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-90 transition-all active:scale-[0.95]"
          aria-label="Scroll to top"
        >
          <ArrowUp size={17} />
        </button>
      )}
    </footer>
  );
}
