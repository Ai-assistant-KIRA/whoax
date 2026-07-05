"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters } from "@/lib/content";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function PinnedNarrative() {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const panels = gsap.utils.toArray<HTMLElement>(".narrative-panel");
      if (!panels.length) return;

      if (reduced) {
        gsap.set(panels, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(panels.slice(1), { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -20, duration: 0.4 }, i);
        tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.4 }, i);
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section id="narrative" ref={scope} className="relative min-h-screen bg-[var(--color-bg)]">
      <div className="relative flex h-screen items-center">
        {chapters.map((ch) => (
          <article
            key={ch.num}
            className="narrative-panel absolute inset-0 flex items-center px-6 md:px-12"
          >
            <div className="container grid gap-6 md:grid-cols-[auto_1fr] md:items-end">
              <span className="chapter-num" aria-hidden>
                {ch.num}
              </span>
              <div>
                <h2 className="text-5xl font-extrabold uppercase md:text-7xl">{ch.title}</h2>
                <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{ch.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}