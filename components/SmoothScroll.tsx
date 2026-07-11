"use client";

import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "@/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: false,
      });
    },
    { dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
