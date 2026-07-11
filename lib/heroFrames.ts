"use client";

/**
 * Loads the hero dissolve sequence from /public/hero-sequence/frame-XXX.webp.
 *
 * Frames are exported manually from the finalized dissolve video:
 *   ffmpeg -i hero-dissolve.mp4 -vf "fps=30,scale=1920:-1" -q:v 3 public/hero-sequence/frame-%03d.webp
 *
 * Missing frames are handled gracefully: the sequence is marked unavailable
 * and the hero falls back to a static treatment.
 */

export type HeroFrames = { frames: HTMLImageElement[]; available: boolean };

const MAX_FRAMES = 220;
const EXPECTED_FRAMES = 180;
const CHUNK = 24;

let cache: Promise<HeroFrames> | null = null;
let progress = 0;
const subscribers = new Set<(p: number) => void>();

function report(p: number) {
  progress = p;
  subscribers.forEach((cb) => cb(p));
}

export function subscribeHeroProgress(cb: (p: number) => void): () => void {
  cb(progress);
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function loadImage(index: number): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = `/hero-sequence/frame-${String(index).padStart(3, "0")}.webp`;
  });
}

export function loadHeroFrames(): Promise<HeroFrames> {
  if (cache) return cache;
  cache = (async () => {
    const frames: HTMLImageElement[] = [];
    for (let start = 1; start <= MAX_FRAMES; start += CHUNK) {
      const size = Math.min(CHUNK, MAX_FRAMES - start + 1);
      const batch = await Promise.all(
        Array.from({ length: size }, (_, i) => loadImage(start + i))
      );
      let missing = false;
      for (const img of batch) {
        if (img) frames.push(img);
        else {
          missing = true;
          break;
        }
      }
      report(Math.min(frames.length / EXPECTED_FRAMES, 0.99));
      if (missing) break;
    }
    report(1);
    return { frames, available: frames.length > 1 };
  })();
  return cache;
}
