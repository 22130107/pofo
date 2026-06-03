"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function DigitalLayers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const aboutEl = document.getElementById("about");
      const skillsEl = document.getElementById("skills");
      const experienceEl = document.getElementById("experience");
      const projectsEl = document.getElementById("projects");
      const galleryEl = document.getElementById("gallery");
      const contactEl = document.getElementById("contact");

      // 1. About Overlay Parallax (Concentric HUD Compass)
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutEl || "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      aboutTl
        .fromTo(
          ".about-overlay-left",
          { y: 150, opacity: 0, rotate: -20 },
          { y: -50, opacity: 0.35, rotate: 20, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".about-overlay-left",
          { y: -250, opacity: 0, rotate: 60, duration: 0.4, ease: "power1.in" },
          0.6
        )
        .fromTo(
          ".about-overlay-right",
          { y: 200, opacity: 0 },
          { y: 0, opacity: 0.25, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".about-overlay-right",
          { y: -200, opacity: 0, duration: 0.4, ease: "power1.in" },
          0.6
        );

      // 2. Skills Overlay Parallax (Drifting Dot Matrix)
      const skillsTl = gsap.timeline({
        scrollTrigger: {
          trigger: skillsEl || "#skills",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      skillsTl
        .fromTo(
          ".skills-overlay-grid",
          { y: -150, opacity: 0 },
          { y: 0, opacity: 0.30, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".skills-overlay-grid",
          { y: 150, opacity: 0, duration: 0.4, ease: "power1.in" },
          0.6
        );

      // 3. Experience Overlay Parallax (Glowing Data Tracks)
      const experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: experienceEl || "#experience",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      experienceTl
        .fromTo(
          ".experience-overlay-lines",
          { y: 200, opacity: 0 },
          { y: 0, opacity: 0.35, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".experience-overlay-lines",
          { y: -200, opacity: 0, duration: 0.4, ease: "power1.in" },
          0.6
        );

      // 4. Projects Overlay Parallax (Floating Glow Plates)
      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectsEl || "#projects",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      projectsTl
        .fromTo(
          ".projects-overlay-glows",
          { y: -100, opacity: 0 },
          { y: 0, opacity: 0.45, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".projects-overlay-glows",
          { y: 100, opacity: 0, duration: 0.4, ease: "power1.in" },
          0.6
        );

      // 5. Gallery Overlay Parallax (Tech Brackets & Crosshairs)
      const galleryTl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryEl || "#gallery",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      galleryTl
        .fromTo(
          ".gallery-overlay-bounds",
          { y: 120, opacity: 0 },
          { y: 0, opacity: 0.32, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".gallery-overlay-bounds",
          { y: -120, opacity: 0, duration: 0.4, ease: "power1.in" },
          0.6
        );

      // 6. Contact Overlay Parallax (Scanning Sonar)
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: contactEl || "#contact",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      contactTl
        .fromTo(
          ".contact-overlay-radar",
          { y: 100, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 0.30, scale: 1.0, duration: 0.4, ease: "power1.out" },
          0
        )
        .to(
          ".contact-overlay-radar",
          { y: -100, opacity: 0, scale: 1.2, duration: 0.4, ease: "power1.in" },
          0.6
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-5 w-full h-full overflow-hidden"
    >
      {/* ================= ABOUT OVERLAY ================= */}
      {/* Rotating technical blueprint wheel left */}
      <div className="about-overlay-left absolute left-[-150px] top-[20%] w-[500px] h-[500px] opacity-0 flex items-center justify-center">
        <svg className="w-full h-full text-accent" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="95" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="85" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="70" strokeWidth="0.5" strokeDasharray="10 5" />
          <circle cx="100" cy="100" r="55" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="40" strokeWidth="0.75" strokeDasharray="1 3" />
          <path d="M100 5 V195 M5 100 H195" strokeWidth="0.25" strokeDasharray="4 4" />
          {/* Inner compass ticks */}
          <path d="M100 15 L100 25 M100 175 L100 185 M15 100 L25 100 M175 100 L185 100" strokeWidth="0.5" />
          <polygon points="100,65 103,100 97,100" fill="currentColor" opacity="0.4" stroke="none" />
          <polygon points="100,135 103,100 97,100" fill="currentColor" opacity="0.2" stroke="none" />
        </svg>
      </div>
      {/* Geometric lines and coordinates right */}
      <div className="about-overlay-right absolute right-[5%] top-[15%] w-[300px] h-[400px] opacity-0 font-mono text-[8px] text-muted/30">
        <svg className="w-full h-full text-muted/40 mb-2" viewBox="0 0 100 150" fill="none" stroke="currentColor">
          <rect x="5" y="5" width="90" height="140" strokeWidth="0.25" strokeDasharray="2 2" />
          <path d="M5 40 H95 M5 110 H95" strokeWidth="0.25" />
          <path d="M30 5 V145" strokeWidth="0.25" />
          <circle cx="30" cy="40" r="3" strokeWidth="0.5" />
          <circle cx="30" cy="110" r="3" strokeWidth="0.5" />
          <line x1="30" y1="40" x2="80" y2="75" strokeWidth="0.5" strokeDasharray="3 1" />
          <line x1="30" y1="110" x2="80" y2="75" strokeWidth="0.5" strokeDasharray="3 1" />
        </svg>
        <div className="flex flex-col gap-1 tracking-widest pl-2">
          <span>SYS_VAL: 0x7FF8C20</span>
          <span>GRID_ALIGN: OK</span>
          <span>DEPTH_MULT: 0.30</span>
        </div>
      </div>

      {/* ================= SKILLS OVERLAY ================= */}
      {/* Dot matrix grid drifting vertically */}
      <div className="skills-overlay-grid absolute right-[10%] top-[25%] w-[350px] h-[300px] opacity-0">
        <svg className="w-full h-full text-accent" viewBox="0 0 160 100" fill="none" stroke="currentColor">
          <defs>
            <pattern id="dotGrid" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="currentColor" opacity="0.3" stroke="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
          {/* Tech boundaries */}
          <path d="M0 0 H30 M0 0 V30 M160 0 H130 M160 0 V30 M0 100 H30 M0 100 V70 M160 100 H130 M160 100 V70" strokeWidth="0.5" />
          <rect x="24" y="24" width="112" height="52" strokeWidth="0.25" strokeDasharray="4 4" />
          <text x="32" y="38" className="font-mono text-[6px] fill-current" stroke="none" opacity="0.4">
            [ SKILLS_MATRIX_INDEX_V2 ]
          </text>
        </svg>
      </div>

      {/* ================= EXPERIENCE OVERLAY ================= */}
      {/* Animated data tracks on the right side */}
      <div className="experience-overlay-lines absolute left-[8%] top-[15%] w-[200px] h-[600px] opacity-0 flex flex-col gap-4">
        <svg className="w-full h-full text-accent-alt" viewBox="0 0 100 400" fill="none" stroke="currentColor">
          {/* Vertical Bus Lines */}
          <line x1="20" y1="0" x2="20" y2="400" strokeWidth="0.25" opacity="0.2" />
          <line x1="50" y1="0" x2="50" y2="400" strokeWidth="0.25" opacity="0.2" />
          <line x1="80" y1="0" x2="80" y2="400" strokeWidth="0.25" opacity="0.2" />
          
          {/* Animated Flow Segments */}
          <line x1="20" y1="20" x2="20" y2="280" strokeWidth="0.75" className="tech-dash-anim" />
          <line x1="50" y1="100" x2="50" y2="350" strokeWidth="0.75" className="tech-dash-anim-fast" />
          <line x1="80" y1="10" x2="80" y2="180" strokeWidth="0.75" className="tech-dash-anim" />
          
          {/* Node intersections */}
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
          <circle cx="20" cy="280" r="1.5" fill="currentColor" />
          <circle cx="50" cy="100" r="1.5" fill="currentColor" />
          <circle cx="50" cy="350" r="1.5" fill="currentColor" />
          <circle cx="80" cy="180" r="1.5" fill="currentColor" />
          
          {/* Cross connectors */}
          <line x1="20" y1="150" x2="50" y2="180" strokeWidth="0.35" strokeDasharray="2 2" />
          <line x1="50" y1="250" x2="80" y2="280" strokeWidth="0.35" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* ================= PROJECTS OVERLAY ================= */}
      {/* Floating colored glowing plates */}
      <div className="projects-overlay-glows absolute left-[15%] top-[10%] right-[15%] bottom-[10%] opacity-0 flex justify-between z-0">
        {/* Soft violet glow on left */}
        <div className="w-[300px] h-[300px] rounded-full bg-accent/20 blur-[150px] translate-x-[-30%]" />
        {/* Soft cyan glow on right */}
        <div className="w-[300px] h-[300px] rounded-full bg-accent-alt/25 blur-[150px] translate-x-[30%] translate-y-[30%]" />
      </div>

      {/* ================= GALLERY OVERLAY ================= */}
      {/* Technical corner brackets outlining photo frame limits */}
      <div className="gallery-overlay-bounds absolute inset-[10%] opacity-0 flex flex-col justify-between">
        <div className="flex justify-between w-full font-mono text-[7px] text-muted/30">
          <span>[+ 0.00_LOC]</span>
          <span>[+ 0.50_MID]</span>
          <span>[+ 1.00_END]</span>
        </div>
        
        {/* Decorative thin ticks */}
        <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-muted/10" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-muted/10" />
        
        <div className="flex justify-between w-full font-mono text-[7px] text-muted/30">
          <span>[SYS_SEC_BOUND_Y1]</span>
          <span>[SYS_SEC_BOUND_Y2]</span>
        </div>
      </div>

      {/* ================= CONTACT OVERLAY ================= */}
      {/* technical sonar scan */}
      <div className="contact-overlay-radar absolute right-[5%] bottom-[5%] w-[450px] h-[450px] opacity-0 flex items-center justify-center">
        <svg className="w-full h-full text-accent-alt tech-pulse" viewBox="0 0 200 200" fill="none" stroke="currentColor">
          <circle cx="100" cy="100" r="90" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="70" strokeWidth="0.25" strokeDasharray="5 5" />
          <circle cx="100" cy="100" r="50" strokeWidth="0.25" />
          <circle cx="100" cy="100" r="30" strokeWidth="0.25" strokeDasharray="3 3" />
          <path d="M100 10 V190 M10 100 H190" strokeWidth="0.15" />
          {/* Angled lines */}
          <line x1="36" y1="36" x2="164" y2="164" strokeWidth="0.15" strokeDasharray="2 4" />
          <line x1="164" y1="36" x2="36" y2="164" strokeWidth="0.15" strokeDasharray="2 4" />
          <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.3" stroke="none" />
        </svg>
      </div>
    </div>
  );
}
