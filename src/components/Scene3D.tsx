"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function getAccentColor(): string {
  if (typeof window === "undefined") return "#f472b6";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#f472b6"
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const dotsRef = useRef<THREE.Points>(null);
  const dotsMaterialRef = useRef<THREE.PointsMaterial>(null);

  const [accentColor, setAccentColor] = useState(getAccentColor);

  // Targets ref for smooth scroll-driven interpolations (Target Lerp System)
  const targets = useRef({
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotationY: 0,
    distort: 0.25,
    emissiveIntensity: 0.15,
    opacity: 0.35,
    color: new THREE.Color(accentColor),
  });

  // Fetch and update accent color from CSS custom properties when theme changes
  useEffect(() => {
    const updateAccentColor = () => {
      const color = getAccentColor();
      setAccentColor(color);
    };

    updateAccentColor();

    const observer = new MutationObserver(updateAccentColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, []);

  // Update target color when accentColor changes
  useEffect(() => {
    targets.current.color.set(accentColor);
  }, [accentColor]);

  // Pointer, passive micro-interactions, and scroll target interpolations
  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    // Delta-independent lerp factors matching 60fps speeds of 0.08, 0.05, 0.02
    const lerpFactor = 1 - Math.pow(1 - 0.08, clampedDelta * 60);
    const lerpFactorPointer = 1 - Math.pow(1 - 0.05, clampedDelta * 60);
    const lerpFactorDots = 1 - Math.pow(1 - 0.02, clampedDelta * 60);

    const group = groupRef.current;
    if (group) {
      group.position.x += (targets.current.x - group.position.x) * lerpFactor;
      group.position.y += (targets.current.y - group.position.y) * lerpFactor;
      group.position.z += (targets.current.z - group.position.z) * lerpFactor;

      group.scale.x += (targets.current.scale - group.scale.x) * lerpFactor;
      group.scale.y += (targets.current.scale - group.scale.y) * lerpFactor;
      group.scale.z += (targets.current.scale - group.scale.z) * lerpFactor;

      group.rotation.y += (targets.current.rotationY - group.rotation.y) * lerpFactor;
    }

    const material = materialRef.current;
    if (material && targets.current.color) {
      material.distort += (targets.current.distort - material.distort) * lerpFactor;
      material.emissiveIntensity += (targets.current.emissiveIntensity - material.emissiveIntensity) * lerpFactor;
      material.color.lerp(targets.current.color, lerpFactor);
      material.emissive.lerp(targets.current.color, lerpFactor);
    }

    const dotsMaterial = dotsMaterialRef.current;
    if (dotsMaterial) {
      dotsMaterial.opacity += (targets.current.opacity - dotsMaterial.opacity) * lerpFactor;
    }

    // Pointer and passive micro-interactions
    const pointer = state.pointer;
    if (meshRef.current) {
      meshRef.current.rotation.x += (pointer.y * 0.05 - meshRef.current.rotation.x) * lerpFactorPointer;
      meshRef.current.rotation.y += (pointer.x * 0.05 - meshRef.current.rotation.y) * lerpFactorPointer;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= 0.003;
      torusRef.current.rotation.y += 0.005;
    }
    if (dotsRef.current) {
      dotsRef.current.rotation.y += 0.0005;
      dotsRef.current.rotation.x += (pointer.y * 0.01 - dotsRef.current.rotation.x) * lerpFactorDots;
    }
  });

  // Generate particle coordinates once deterministically for React 19 compliance
  const count = 250;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let seed = 1;
    for (let i = 0; i < count; i++) {
      const r1 = Math.sin(seed++) * 10000;
      const x = r1 - Math.floor(r1);
      const r2 = Math.sin(seed++) * 10000;
      const y = r2 - Math.floor(r2);
      const r3 = Math.sin(seed++) * 10000;
      const z = r3 - Math.floor(r3);

      pos[i * 3] = (x - 0.5) * 12;
      pos[i * 3 + 1] = (y - 0.5) * 12;
      pos[i * 3 + 2] = (z - 0.5) * 12;
    }
    return pos;
  }, []);

  // GSAP ScrollTrigger Animations
  useGSAP(
    () => {
      if (
        !groupRef.current ||
        !meshRef.current ||
        !torusRef.current ||
        !materialRef.current ||
        !dotsRef.current ||
        !dotsMaterialRef.current
      )
        return;

      // Helper target object for color tweening
      const colorProxy = { val: accentColor };

      // Set initial values
      gsap.set(targets.current, {
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotationY: 0,
        distort: 0.25,
        emissiveIntensity: 0.15,
        opacity: 0.35,
      });
      targets.current.color.set(accentColor);

      const scrubVal = 0.8; // Optimize scrub delay for responsiveness and smoothness

      // --- Transitions Between Sections (Unified Timelines) ---

      // 1. Hero to About
      const heroToAbout = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      heroToAbout
        .to(targets.current, { x: 1.5, y: -0.1, z: 0, ease: "none" }, 0)
        .to(targets.current, { scale: 0.85, ease: "none" }, 0)
        .to(targets.current, { distort: 0.45, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.2, ease: "none" }, 0);

      // 2. About to Skills
      const aboutToSkills = gsap.timeline({
        scrollTrigger: {
          trigger: "#skills",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      aboutToSkills
        .to(targets.current, { x: -1.5, y: 0.1, z: 0, ease: "none" }, 0)
        .to(targets.current, { scale: 1.0, ease: "none" }, 0)
        .to(targets.current, { distort: 0.65, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.5, ease: "none" }, 0);

      // 3. Skills to Experience
      const skillsToExperience = gsap.timeline({
        scrollTrigger: {
          trigger: "#experience",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      skillsToExperience
        .to(targets.current, { x: 0, y: 0.9, z: -1, ease: "none" }, 0)
        .to(targets.current, { scale: 0.65, ease: "none" }, 0)
        .to(targets.current, { distort: 0.1, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.15, ease: "none" }, 0);

      // 4. Experience to Projects
      const experienceToProjects = gsap.timeline({
        scrollTrigger: {
          trigger: "#projects",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      experienceToProjects
        .to(targets.current, { x: 1.6, y: -0.4, z: 0, ease: "none" }, 0)
        .to(targets.current, { scale: 0.9, ease: "none" }, 0)
        .to(targets.current, { distort: 0.3, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.3, ease: "none" }, 0);

      // 5. Projects Section Internal Scroll (Full spin + Color shifting cycle)
      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: "bottom bottom",
          scrub: scrubVal,
        },
      });

      // Full spin
      projectsTl.to(targets.current, { rotationY: "+=" + Math.PI * 2, ease: "none" }, 0);

      // Color Cycle
      // Blue for CloudDash
      projectsTl.to(
        colorProxy,
        {
          val: "#3b82f6",
          ease: "power1.inOut",
          onUpdate: () => {
            targets.current.color.set(colorProxy.val);
          },
        },
        "0%"
      );
      // Green for MarketFlow
      projectsTl.to(
        colorProxy,
        {
          val: "#10b981",
          ease: "power1.inOut",
          onUpdate: () => {
            targets.current.color.set(colorProxy.val);
          },
        },
        "25%"
      );
      // Orange for DevKit CLI
      projectsTl.to(
        colorProxy,
        {
          val: "#f97316",
          ease: "power1.inOut",
          onUpdate: () => {
            targets.current.color.set(colorProxy.val);
          },
        },
        "50%"
      );
      // Pink for SocialSync
      projectsTl.to(
        colorProxy,
        {
          val: "#ec4899",
          ease: "power1.inOut",
          onUpdate: () => {
            targets.current.color.set(colorProxy.val);
          },
        },
        "75%"
      );
      // Return to theme accent
      projectsTl.to(
        colorProxy,
        {
          val: accentColor,
          ease: "power1.inOut",
          onUpdate: () => {
            targets.current.color.set(colorProxy.val);
          },
        },
        "100%"
      );

      // 6. Projects to Gallery
      const projectsToGallery = gsap.timeline({
        scrollTrigger: {
          trigger: "#gallery",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      projectsToGallery
        .to(targets.current, { x: 0, y: 0, z: 1.5, ease: "none" }, 0)
        .to(targets.current, { scale: 1.4, ease: "none" }, 0)
        .to(targets.current, { distort: 0.55, emissiveIntensity: 0.45, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.45, ease: "none" }, 0);

      // 7. Gallery to Contact
      const galleryToContact = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "top top",
          scrub: scrubVal,
        },
      });
      galleryToContact
        .to(targets.current, { x: 1.4, y: 0, z: 0, ease: "none" }, 0)
        .to(targets.current, { scale: 0.8, ease: "none" }, 0)
        .to(targets.current, { distort: 0.15, emissiveIntensity: 0.15, ease: "none" }, 0)
        .to(targets.current, { opacity: 0.25, ease: "none" }, 0);
    },
    { dependencies: [accentColor] }
  );

  return (
    <group ref={groupRef}>
      {/* Central deformed shape */}
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          ref={materialRef}
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={2}
          wireframe
        />
      </mesh>

      {/* Decorative rotating outer ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.5, 0.015, 16, 100]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>

      {/* Floating particles cloud */}
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={dotsMaterialRef}
          size={0.025}
          color={accentColor}
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} />
        <SceneContent />
      </Canvas>
    </div>
  );
}
