"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, EASE_OUT } from "@/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const MANIFESTO =
  "Eight years building revenue systems for DTC brands. I pair hands-on eCommerce craft — Shopify, WooCommerce, paid media — with AI-first delivery: agents, automation, and orchestrated workflows that turn a five-week build into a ten-day sprint. I own delivery end-to-end, from feeds and technical SEO to WhatsApp bots and the systems troubleshooting that keeps a launch on schedule when client environments break.";

export default function Manifesto() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (reduced || !textRef.current) return;
      const split = new SplitText(textRef.current, { type: "lines" });
      gsap.from(split.lines, {
        yPercent: 60,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section ref={sectionRef} aria-labelledby="manifesto-heading" className="relative">
      {/* Halftone use 1 of 2: the Hero→Manifesto transition. */}
      <div
        className="halftone h-36 opacity-15 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[720px] px-6 py-28 md:py-40">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
            01
          </span>
          <span id="manifesto-heading">Manifesto</span>
        </p>
        <p ref={textRef} className="mt-10 text-xl leading-relaxed text-paper md:text-2xl">
          {MANIFESTO}
        </p>
      </div>
    </section>
  );
}
