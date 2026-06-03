"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Camera } from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const row1Photos = [
  {
    title: "Workspace flow",
    caption: "Late nights & clean code",
    url: "https://picsum.photos/seed/deskworkspace/600/700",
    rotate: -3,
  },
  {
    title: "Mountain air",
    caption: "Chasing horizons",
    url: "https://picsum.photos/seed/mountainhorizons/600/700",
    rotate: 2,
  },
  {
    title: "Pour over",
    caption: "Fueling the design process",
    url: "https://picsum.photos/seed/pourovercafe/600/700",
    rotate: -1.5,
  },
  {
    title: "Analog capture",
    caption: "Framing moments in silver",
    url: "https://picsum.photos/seed/analogcamera/600/700",
    rotate: 4,
  },
  {
    title: "Urban walk",
    caption: "Concrete and geometry",
    url: "https://picsum.photos/seed/urbangeometry/600/700",
    rotate: -2.5,
  },
];

const row2Photos = [
  {
    title: "Weekend trails",
    caption: "Off-grid exploration",
    url: "https://picsum.photos/seed/weekendtrails/600/700",
    rotate: 2.5,
  },
  {
    title: "Vinyl sessions",
    caption: "Warm tones and slow beats",
    url: "https://picsum.photos/seed/vinylrecords/600/700",
    rotate: -3.5,
  },
  {
    title: "Library finds",
    caption: "Always a student",
    url: "https://picsum.photos/seed/libraryfinds/600/700",
    rotate: 1.5,
  },
  {
    title: "Neon nights",
    caption: "City lights & rain reflection",
    url: "https://picsum.photos/seed/neonnightlights/600/700",
    rotate: -4,
  },
  {
    title: "Nordic shores",
    caption: "Cold seas & quiet sands",
    url: "https://picsum.photos/seed/nordicshores/600/700",
    rotate: 3,
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    // Header elements entrance reveal
    gsap.fromTo(
      ".gallery-header-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Cards entrance animation (staggered fade & slide up)
    gsap.fromTo(
      ".gallery-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          once: true,
        },
      }
    );

    // Row 1 scrolls left as page scrolls down
    gsap.fromTo(
      row1Ref.current,
      { x: "5%" },
      {
        x: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Row 2 scrolls right as page scrolls down
    gsap.fromTo(
      row2Ref.current,
      { x: "-20%" },
      {
        x: "5%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Force ScrollTrigger to recalculate positions on mount
    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-24 md:py-36 bg-surface/20 border-b border-border overflow-hidden relative"
    >
      <motion.div
        className="container-wide px-6 mb-16 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div className="max-w-md">
          <div className="gallery-header-item inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent mb-4">
            <Camera size={14} />
            <span className="font-mono text-[10px] uppercase tracking-wider">Visual Journal</span>
          </div>
          <h2 className="gallery-header-item text-3xl md:text-5xl font-bold tracking-tight">
            Behind the screen
          </h2>
          <p className="gallery-header-item text-muted mt-3 text-sm md:text-base leading-relaxed">
            A small glimpse into my life, interests, and inspirations captured along the way.
          </p>
        </div>
      </motion.div>

      {/* Rows Container */}
      <div className="flex flex-col gap-10 md:gap-16 relative">
        {/* Row 1 (scrolls Left) */}
        <div className="relative overflow-visible select-none">
          <div
            ref={row1Ref}
            className="flex gap-6 md:gap-10 px-8 w-max will-change-transform"
          >
            {row1Photos.map((photo) => (
              <div key={photo.title} className="gallery-card flex-shrink-0">
                <div
                  style={{ transform: `rotate(${photo.rotate}deg)` }}
                  className="group w-64 md:w-80 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] p-[1px] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className="rounded-[calc(0.75rem-1px)] bg-surface p-4 hover:-translate-y-1 transition-transform duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo.url}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 250px, 320px"
                      />
                    </div>
                    <div className="pt-4 pb-2 px-1">
                      <h3 className="font-semibold text-sm md:text-base mb-1 text-foreground">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-muted font-mono leading-none">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (scrolls Right) */}
        <div className="relative overflow-visible select-none">
          <div
            ref={row2Ref}
            className="flex gap-6 md:gap-10 px-8 w-max will-change-transform"
          >
            {row2Photos.map((photo) => (
              <div key={photo.title} className="gallery-card flex-shrink-0">
                <div
                  style={{ transform: `rotate(${photo.rotate}deg)` }}
                  className="group w-64 md:w-80 rounded-xl bg-black/[0.04] dark:bg-white/[0.04] p-[1px] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className="rounded-[calc(0.75rem-1px)] bg-surface p-4 hover:-translate-y-1 transition-transform duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={photo.url}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 250px, 320px"
                      />
                    </div>
                    <div className="pt-4 pb-2 px-1">
                      <h3 className="font-semibold text-sm md:text-base mb-1 text-foreground">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-muted font-mono leading-none">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
