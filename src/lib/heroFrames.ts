/**
 * Hero dissolve frame sequence.
 * Source: 10s Kling render → `scripts/extract-frames.ps1` → 181 WebP frames at 18fps.
 */
export const FRAME_COUNT = 181;

export const framePath = (index: number) =>
  `/hero-sequence/frame-${String(index + 1).padStart(3, "0")}.webp`;

/** Fully dissolved final frame — reduced-motion fallback. */
export const HERO_STATIC_SRC = "/hero-static.webp";

/** Short compressed loop — mobile / low-end fallback. */
export const HERO_FALLBACK_VIDEO_SRC = "/hero-fallback.mp4";

type ProgressListener = (loaded: number, total: number) => void;

let framesPromise: Promise<HTMLImageElement[]> | null = null;
let loadedCount = 0;
const listeners = new Set<ProgressListener>();

/** Subscribe to frame preload progress. Fires immediately with current state. */
export function onFrameProgress(listener: ProgressListener) {
  listeners.add(listener);
  listener(loadedCount, FRAME_COUNT);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Preload every frame exactly once; concurrent callers share the same promise.
 * Errors resolve too so a single missing frame can never hang the preloader.
 */
export function loadHeroFrames(): Promise<HTMLImageElement[]> {
  if (framesPromise) return framesPromise;
  framesPromise = Promise.all(
    Array.from(
      { length: FRAME_COUNT },
      (_, i) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          const done = () => {
            loadedCount += 1;
            listeners.forEach((l) => l(loadedCount, FRAME_COUNT));
            resolve(img);
          };
          img.onload = done;
          img.onerror = done;
          img.src = framePath(i);
        }),
    ),
  );
  return framesPromise;
}
