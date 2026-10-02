"use client";

import React, { useEffect, useRef, useState } from "react";

interface TextWaveProps {
  children: string;
  className?: string;
  delay?: number;
  triggerKey?: string | number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div" | "blockquote";
  speedMultiplier?: number;
}

const SHIMMER_GLYPHS = ["=", "~", "-", "~", "="];
const GLYPH_INTERVAL_MS = 28; // Rapid terminal tick
const TOTAL_CYCLE_MS = SHIMMER_GLYPHS.length * GLYPH_INTERVAL_MS;

export default function TextWaveReveal({
  children,
  className = "",
  delay = 0,
  triggerKey,
  as: Component = "span",
  speedMultiplier = 1,
}: TextWaveProps) {
  const [displayText, setDisplayText] = useState<string>(children);
  const animFrameId = useRef<number>(0);

  useEffect(() => {
    // If reduced motion is requested, show text immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(children);
      return;
    }

    const targetText = children;
    const len = targetText.length;
    if (len === 0) {
      setDisplayText("");
      return;
    }

    const startTime = performance.now() + delay;
    const waveSweepDuration = Math.min(len * 6 * speedMultiplier, 320); // Dynamic sweep window

    const animate = (now: number) => {
      if (now < startTime) {
        // Keep initial state masked or blank
        setDisplayText(targetText.split("").map((c) => (c === " " || c === "\n" ? c : " ")).join(""));
        animFrameId.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - startTime;
      let allDone = true;
      const chars = targetText.split("");

      for (let i = 0; i < len; i++) {
        const char = targetText[i];
        if (char === " " || char === "\n") continue;

        // Wavefront delay relative to position in string
        const charSweepDelay = (i / len) * waveSweepDuration;
        const charElapsed = elapsed - charSweepDelay;

        if (charElapsed < 0) {
          chars[i] = " ";
          allDone = false;
        } else if (charElapsed < TOTAL_CYCLE_MS) {
          const glyphIdx = Math.floor(charElapsed / GLYPH_INTERVAL_MS) % SHIMMER_GLYPHS.length;
          chars[i] = SHIMMER_GLYPHS[glyphIdx];
          allDone = false;
        } else {
          chars[i] = char;
        }
      }

      setDisplayText(chars.join(""));

      if (!allDone) {
        animFrameId.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
      }
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId.current);
    };
  }, [children, delay, triggerKey, speedMultiplier]);

  return <Component className={className}>{displayText}</Component>;
}
