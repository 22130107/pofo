"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Camera } from "@phosphor-icons/react";

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

  useEffect(() => {
    if (!containerRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="py-24 md:py-36 bg-surface/20 border-b border-border overflow-hidden relative"
    >
      <div className="container-wide px-6 mb-16 relative z-10">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent mb-4">
            <Camera size={14} />
            <span className="font-mono text-[10px] uppercase tracking-wider">Visual Journal</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Behind the screen
          </h2>
          <p className="text-muted mt-3 text-sm md:text-base leading-relaxed">
            A small glimpse into my life, interests, and inspirations captured along the way.
          </p>
        </div>
      </div>

      {/* Rows Container */}
      <div className="flex flex-col gap-10 md:gap-16 relative">
        {/* Row 1 (scrolls Left) */}
        <div className="relative overflow-visible select-none">
          <div
            ref={row1Ref}
            className="flex gap-6 md:gap-10 px-8 w-max will-change-transform"
          >
            {row1Photos.map((photo, i) => (
              <div
                key={photo.title}
                style={{ transform: `rotate(${photo.rotate}deg)` }}
                className="group w-64 md:w-80 rounded-xl bg-surface border border-border p-4 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex-shrink-0 cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border bg-muted">
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
            ))}
          </div>
        </div>

        {/* Row 2 (scrolls Right) */}
        <div className="relative overflow-visible select-none">
          <div
            ref={row2Ref}
            className="flex gap-6 md:gap-10 px-8 w-max will-change-transform"
          >
            {row2Photos.map((photo, i) => (
              <div
                key={photo.title}
                style={{ transform: `rotate(${photo.rotate}deg)` }}
                className="group w-64 md:w-80 rounded-xl bg-surface border border-border p-4 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex-shrink-0 cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-border bg-muted">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
