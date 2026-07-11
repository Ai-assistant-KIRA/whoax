"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSequence from "@/components/hero/HeroSequence";
import Manifesto from "@/components/sections/Manifesto";
import Impact from "@/components/sections/Impact";
import Capabilities from "@/components/sections/Capabilities";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// R3F is imported only at the hero handoff — never for reduced motion or the mobile fallback,
// because onDissolved only ever fires from the desktop scrub branch.
const AmbientVoxels = dynamic(() => import("@/components/ambient/AmbientVoxels"), {
  ssr: false,
});

export default function SiteExperience() {
  const [dissolved, setDissolved] = useState(false);
  const handleDissolved = useCallback(() => setDissolved(true), []);

  return (
    <>
      <Preloader />
      {dissolved && <AmbientVoxels />}
      <SmoothScroll>
        <main id="main" className="relative z-10">
          <HeroSequence onDissolved={handleDissolved} />
          <Manifesto />
          <Impact />
          <Capabilities />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
