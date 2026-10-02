"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        smoothTouch: 0,
        normalizeScroll: false,
      });
      // Expose for capture/debug tooling (Playwright scroll helpers).
      if (typeof window !== "undefined") {
        (window as unknown as { ScrollSmoother: typeof ScrollSmoother }).ScrollSmoother =
          ScrollSmoother;
        (window as unknown as { __scrollSmoother: typeof smoother }).__scrollSmoother =
          smoother;
      }
    },
    { scope: wrapperRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef} className="relative z-10">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
