"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ROLES = [
  {
    period: "2020–Present",
    title: "Founder & Lead Growth Engineer, WHOAX",
    points: [
      "Revenue systems for 14 DTC brands",
      "Custom plugins and payment integrations",
      "Meta / Google PMax management",
      "n8n AI assistants and WhatsApp flows live in 48 hours",
    ],
  },
  {
    period: "2018–2020",
    title: "eCommerce & Full Stack Builder, Freelance",
    points: [
      "9 Shopify / WooCommerce stores with live payments",
      "Each launched in under 10 days",
      "Clients across 5 markets",
    ],
  },
];

export default function Experience() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reduced motion: the spine renders fully filled by default.
      if (reduced || !fillRef.current) return;
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section ref={sectionRef} aria-labelledby="experience-heading" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
            04
          </span>
          <span id="experience-heading">Experience</span>
        </p>

        <div className="relative mt-12 pl-8">
          {/* Circuit-trace progress spine — a restrained echo of the orange filament. */}
          <div className="absolute left-0 top-0 h-full w-px bg-voxel/20" aria-hidden="true">
            <div ref={fillRef} className="h-full w-px origin-top bg-signal/80" />
          </div>

          <ol className="space-y-16">
            {ROLES.map((role) => (
              <li key={role.period}>
                <p className="font-mono text-xs tracking-widest text-voxel">{role.period}</p>
                <h3 className="mt-2 text-lg font-medium text-paper">{role.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
