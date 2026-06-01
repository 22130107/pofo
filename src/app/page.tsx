"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Experience = dynamic(() => import("@/components/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
