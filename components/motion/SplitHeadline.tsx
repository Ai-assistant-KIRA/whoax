"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useReducedMotion } from "./useReducedMotion";

type Props = {
  lines: string[];
  className?: string;
};

export function SplitHeadline({ lines, className = "" }: Props) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const words = scope.current?.querySelectorAll(".split-word");
      if (!words?.length) return;

      gsap.from(words, {
        autoAlpha: 0,
        y: 48,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <div ref={scope} className={className}>
      {lines.map((line) => (
        <h1 key={line} className="display-xl">
          {line.split(" ").map((word, i) => (
            <span key={`${line}-${i}`} className="split-word inline-block mr-[0.2em]">
              {word}
            </span>
          ))}
        </h1>
      ))}
    </div>
  );
}