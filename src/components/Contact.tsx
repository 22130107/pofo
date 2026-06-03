"use client";

import { motion } from "motion/react";
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  At,
  MapPin,
  Phone,
} from "@phosphor-icons/react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-wide">
        <div className="rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.03] p-[1px]">
        <div className="rounded-[calc(2rem-1px)] bg-surface p-8 md:p-16 relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/[0.02] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.05]">
                Let&apos;s build something{" "}
                <span className="gradient-text">amazing</span> together
              </h2>
              <p className="text-muted leading-relaxed mb-10 max-w-[420px]">
                Whether you have a project in mind, a job opportunity, or just
                want to say hi — I&apos;d love to hear from you.
              </p>

              <div className="space-y-5">
                {[
                  { icon: At, label: "hello@johndoe.dev", href: "mailto:hello@johndoe.dev" },
                  { icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
                  { icon: MapPin, label: "San Francisco, CA" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 text-sm">
                    <span className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                      <item.icon size={17} className="text-accent" />
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-muted hover:text-foreground transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-muted">{item.label}</span>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-3 pt-4">
                  {[
                    { icon: GithubLogo, href: "https://github.com", label: "GitHub" },
                    { icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
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
                </div>
              </div>
            </motion.div>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingInput id="name" label="Name" type="text" />
                <FloatingInput id="email" label="Email" type="email" />
              </div>
              <FloatingInput id="subject" label="Subject" type="text" />
              <FloatingTextarea id="message" label="Message" />
              <button
                type="submit"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-8 text-sm font-medium text-background hover:opacity-90 transition-all active:scale-[0.97] w-full sm:w-auto justify-center"
              >
                Send Message
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/20">
                  <PaperPlaneTilt
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            </motion.form>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  id,
  label,
  type,
}: {
  id: string;
  label: string;
  type: string;
}) {
  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        placeholder=" "
        className="peer w-full h-13 rounded-xl border border-border bg-background px-4 pt-5 pb-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  return (
    <div className="relative group">
      <textarea
        id={id}
        rows={4}
        placeholder=" "
        className="peer w-full rounded-xl border border-border bg-background px-4 pt-6 pb-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-4 text-sm text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs cursor-text"
      >
        {label}
      </label>
    </div>
  );
}
