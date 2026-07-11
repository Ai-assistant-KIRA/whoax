"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { loadHeroFrames, subscribeHeroProgress } from "@/lib/heroFrames";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const COLS = 12;
const ROWS = 6;
const CELLS = COLS * ROWS;

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    loadHeroFrames();
    return subscribeHeroProgress(setProgress);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      const t = setTimeout(() => setVisible(false), 450);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const filled = Math.round(progress * CELLS);
  const coalesced = progress >= 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-void"
          exit={{
            opacity: 0,
            transition: reduced
              ? { duration: 0.01 }
              : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-hidden="true"
        >
          <div>
            <div
              className="grid motion-safe:transition-[gap] motion-safe:duration-300"
              style={{
                gridTemplateColumns: `repeat(${COLS}, 12px)`,
                gap: coalesced ? 0 : 2,
              }}
            >
              {Array.from({ length: CELLS }, (_, i) => (
                <span
                  key={i}
                  className="block h-3 w-3"
                  style={{
                    backgroundColor:
                      i < filled ? "var(--color-voxel)" : "var(--color-panel)",
                  }}
                />
              ))}
            </div>
            <p className="mt-5 text-center font-mono text-xs tracking-widest text-muted">
              {Math.min(100, Math.round(progress * 100))}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
