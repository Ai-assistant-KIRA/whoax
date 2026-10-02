"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { loadHeroFrames, onFrameProgress } from "@/lib/heroFrames";
import { MOTION_DRIFT } from "@/lib/ease";

const COLS = 12;
const ROWS = 6;
const CELLS = COLS * ROWS;
const MIN_VISIBLE_MS = 900;

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [solid, setSolid] = useState(false);
  const [visible, setVisible] = useState(true);
  const startRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();
    document.documentElement.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    let raf = 0;
    let unsubscribe: (() => void) | undefined;
    const timers: number[] = [];

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startRef.current));
      timers.push(
        window.setTimeout(() => {
          setProgress(100);
          setSolid(true);
          timers.push(
            window.setTimeout(() => setVisible(false), reduced ? 80 : 560),
          );
        }, wait),
      );
    };

    if (desktop && !reduced) {
      // Real asset loading: the hero frame sequence drives the percentage.
      unsubscribe = onFrameProgress((loaded, total) => {
        setProgress(Math.min(99, Math.round((loaded / total) * 100)));
      });
      loadHeroFrames().then(finish);
    } else {
      // Mobile / reduced motion: frames are never fetched; short deterministic fill.
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(99, ((now - t0) / 700) * 100);
        setProgress(Math.round(p));
        if (p < 99) raf = requestAnimationFrame(tick);
        else finish();
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      unsubscribe?.();
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  const filled = Math.round((progress / 100) * CELLS);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: MOTION_DRIFT }}
        >
          <motion.div
            aria-hidden
            className="grid"
            style={{ gridTemplateColumns: `repeat(${COLS}, 14px)` }}
            initial={{ gap: "5px" }}
            animate={{ gap: solid ? "0px" : "5px" }}
            transition={{ duration: 0.45, ease: MOTION_DRIFT }}
          >
            {Array.from({ length: CELLS }, (_, i) => (
              <div
                key={i}
                className="h-[14px] w-[14px]"
                style={{
                  backgroundColor: i < filled ? "#9a9ea6" : "#17171b",
                  transition: "background-color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            ))}
          </motion.div>
          <p className="mt-8 font-mono text-sm tabular-nums text-muted">
            {progress}%
          </p>
          <span className="sr-only">Loading portfolio</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
