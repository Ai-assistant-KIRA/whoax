"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ROLES = [
  {
    period: "2020–Present",
    title: "Founder & Lead Growth Engineer",
    org: "WHOAX",
    points: [
      "Revenue systems for 14 DTC brands — builds, feeds, SEO, and automation.",
      "Custom plugins and payment integrations that cut checkout friction.",
      "Meta and Google PMax management aligned to feeds and landing pages.",
      "n8n AI assistants and WhatsApp flows live in 48 hours.",
    ],
  },
  {
    period: "2018–2020",
    title: "eCommerce & Full Stack Builder",
    org: "Freelance",
    points: [
      "9 Shopify/WooCommerce stores with live payments, each launched in under 10 days.",
      "Clients across 5 markets — beauty, wellness, and commerce.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!fillRef.current) return;
      if (reduced) {
        gsap.set(fillRef.current, { scaleY: 1 });
        return;
      }
      // Circuit-trace spine fills with scroll — a restrained echo of the
      // orange filament from the hero portrait.
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-label"
      className="relative mx-auto max-w-[720px] px-6 py-24 md:py-36"
    >
      <SectionLabel
        numeral="05"
        label="Experience"
        id="experience-label"
        className="mb-12"
      />
      <ol ref={listRef} className="relative">
        {/* Spine */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-[5px] w-px bg-voxel/20"
        />
        <span
          ref={fillRef}
          aria-hidden
          className="absolute inset-y-1 left-[5px] w-px origin-top bg-signal/70"
        />
        {ROLES.map((role) => (
          <li key={role.period} className="relative pb-16 pl-10 last:pb-0">
            {/* Circuit node */}
            <span
              aria-hidden
              className="absolute left-0 top-[7px] h-[11px] w-[11px] border border-voxel/60 bg-void"
            />
            <span
              aria-hidden
              className="absolute left-[11px] top-3 h-px w-5 bg-voxel/30"
            />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {role.period}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-paper md:text-2xl">
              {role.title}{" "}
              <span className="font-normal text-muted">— {role.org}</span>
            </h3>
            <ul className="mt-4 space-y-2">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="text-sm leading-relaxed text-muted md:text-base"
                >
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
