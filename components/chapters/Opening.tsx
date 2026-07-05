"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { opening, site } from "@/lib/content";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Opening() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (reduced) return;

      gsap.to(".opening-avatar", {
        scale: 1.08,
        autoAlpha: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section ref={scope} className="relative flex min-h-screen items-end overflow-hidden pb-16 pt-24">
      <div className="opening-avatar pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/01-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />
      </div>
      <div className="container relative z-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {site.role}
        </p>
        <SplitHeadline lines={[opening.line1, opening.line2]} />
        <p className="mt-8 max-w-xl text-lg text-[var(--color-muted)]">{opening.sub}</p>
        <a href="#narrative" className="btn btn-accent mt-10 inline-flex">
          Scroll
        </a>
      </div>
    </section>
  );
}