"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { metrics } from "@/lib/content";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function Metrics() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const counters = scope.current?.querySelectorAll(".metric-value");
      if (!counters?.length) return;

      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-value") || "0");
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        const suffix = el.getAttribute("data-suffix") || "";

        if (reduced) {
          el.textContent = `${target}${suffix}`;
          return;
        }

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section ref={scope} className="border-y border-[var(--color-border)] py-24">
      <div className="container grid grid-cols-2 gap-12 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label}>
            <p
              className="metric-value font-[family-name:var(--font-display)] text-5xl font-extrabold text-[var(--color-accent)] md:text-7xl"
              data-value={m.value}
              data-suffix={m.suffix}
              data-decimals={m.decimals ?? 0}
            >
              0{m.suffix}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-[var(--color-muted)]">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}