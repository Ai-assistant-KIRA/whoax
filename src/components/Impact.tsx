"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeDrift, easePress } from "@/lib/ease";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 14, label: "DTC brands under active management" },
  { value: 38, suffix: "%", label: "average monthly revenue lift within 6 weeks" },
  { value: 47, suffix: "%", label: "ROAS gain in 4 weeks (Meta + Google PMax)" },
  {
    value: 65,
    suffix: "%",
    label: "of support triage automated through AI/WhatsApp flows",
  },
  {
    value: 2.3,
    decimals: 1,
    suffix: "s",
    label: "LCP through Core Web Vitals + technical SEO",
  },
  {
    value: 10,
    prefix: "<",
    suffix: " days",
    label: "typical discovery-to-launch vs. a 5-week standard cycle",
  },
];

const format = (stat: Stat, n: number) =>
  `${stat.prefix ?? ""}${n.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ""}`;

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(
        ".impact-value",
        sectionRef.current,
      );
      els.forEach((el, i) => {
        const stat = STATS[i];
        if (reduced) {
          el.textContent = format(stat, stat.value);
          return;
        }
        el.textContent = format(stat, 0);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: stat.value,
          duration: 1.4,
          delay: (i % 3) * 0.1,
          ease: easeDrift,
          snap: { n: stat.decimals ? 0.1 : 1 },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = format(stat, counter.n);
          },
          onComplete: () => {
            // Signal flash as each figure lands.
            gsap.fromTo(
              el,
              { color: "#ff5a1f" },
              { color: "#ededef", duration: 0.7, ease: easePress },
            );
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="impact-label"
      className="relative py-24 md:py-36"
    >
      <SectionLabel
        numeral="03"
        label="Impact"
        id="impact-label"
        className="mx-auto mb-12 max-w-6xl px-6"
      />
      <dl className="grid grid-cols-1 gap-px border-y border-voxel/15 bg-voxel/15 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-void px-8 py-12 md:px-12 md:py-16">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="impact-value block font-mono text-5xl font-medium tabular-nums text-paper md:text-6xl">
                {format(stat, stat.value)}
              </span>
              <span className="mt-4 block max-w-[28ch] text-sm leading-relaxed text-muted">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
