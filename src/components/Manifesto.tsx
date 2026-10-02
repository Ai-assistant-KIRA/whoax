"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeDrift } from "@/lib/ease";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const MANIFESTO =
  "Eight years building revenue systems for DTC brands. I pair hands-on eCommerce craft — Shopify, WooCommerce, paid media — with AI-first delivery: agents, automation, and orchestrated workflows that turn a five-week build into a ten-day sprint. I own delivery end-to-end, from feeds and technical SEO to WhatsApp bots and the systems troubleshooting that keeps a launch on schedule when client environments break.";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !copyRef.current) return;
      const split = SplitText.create(copyRef.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 0.9,
            stagger: 0.09,
            ease: easeDrift,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }),
      });
      return () => {
        split.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="manifesto-label"
      className="relative mx-auto max-w-[720px] px-6 py-24 md:py-36"
    >
      <SectionLabel numeral="02" label="Manifesto" id="manifesto-label" className="mb-12" />
      <p
        ref={copyRef}
        className="text-xl leading-relaxed text-paper md:text-2xl md:leading-[1.6]"
      >
        {MANIFESTO}
      </p>
    </section>
  );
}
