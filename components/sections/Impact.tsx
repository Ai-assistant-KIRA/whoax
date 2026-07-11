"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE_OUT } from "@/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STATS = [
  { value: 14, decimals: 0, prefix: "", suffix: "", label: "DTC brands under active management" },
  { value: 38, decimals: 0, prefix: "", suffix: "%", label: "average monthly revenue lift within 6 weeks" },
  { value: 47, decimals: 0, prefix: "", suffix: "%", label: "ROAS gain in 4 weeks (Meta + Google PMax)" },
  { value: 65, decimals: 0, prefix: "", suffix: "%", label: "of support triage automated through AI/WhatsApp flows" },
  { value: 2.3, decimals: 1, prefix: "", suffix: "s", label: "LCP through Core Web Vitals + technical SEO" },
  { value: 10, decimals: 0, prefix: "<", suffix: " days", label: "typical discovery-to-launch vs. a 5-week standard cycle" },
];

export default function Impact() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reduced motion: the markup already contains the final figures.
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count ?? "0");
        const decimals = Number(el.dataset.decimals ?? 0);
        const state = { value: 0 };
        el.textContent = (0).toFixed(decimals);
        gsap.to(state, {
          value: target,
          duration: 1.3,
          ease: EASE_OUT,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = state.value.toFixed(decimals);
          },
          onComplete: () => {
            el.textContent = target.toFixed(decimals);
            // Flash `signal` as each figure lands.
            gsap.fromTo(
              el,
              { color: "#FF5A1F" },
              { color: "#EDEDEF", duration: 0.7, ease: EASE_OUT }
            );
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  return (
    <section ref={sectionRef} aria-labelledby="impact-heading" className="px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
          02
        </span>
        <span id="impact-heading">Impact</span>
      </p>
      <ul className="mt-12 grid w-full grid-cols-1 gap-px overflow-hidden rounded-sm bg-voxel/15 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <li key={stat.label} className="bg-panel p-8 md:p-10">
            <p className="font-mono text-4xl font-medium text-paper md:text-5xl">
              {stat.prefix}
              <span data-count={stat.value} data-decimals={stat.decimals}>
                {stat.value.toFixed(stat.decimals)}
              </span>
              {stat.suffix}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
