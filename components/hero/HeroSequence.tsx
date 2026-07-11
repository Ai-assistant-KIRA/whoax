"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE_OUT } from "@/lib/gsapSetup";
import { loadHeroFrames } from "@/lib/heroFrames";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const PIN_DISTANCE = 3500;

function fitCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(canvas.clientWidth * dpr);
  canvas.height = Math.round(canvas.clientHeight * dpr);
  canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawCover(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

export default function HeroSequence({ onDissolved }: { onDissolved: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);
  const dissolvedRef = useRef(false);
  const fadedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          scrub: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          still: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { scrub, still } = context.conditions as {
            scrub: boolean;
            still: boolean;
          };
          const canvas = canvasRef.current;

          // Reduced motion: a static, fully dissolved frame. No scrub, no R3F.
          if (still) {
            if (canvas) {
              fitCanvas(canvas);
              loadHeroFrames().then(({ frames }) => {
                const last = frames[frames.length - 1];
                if (last) drawCover(canvas, last);
              });
            }
            return;
          }

          // Mobile renders a short autoplay loop <video> instead of the canvas scrub.
          if (!scrub || !canvas) return;

          let frames: HTMLImageElement[] = [];
          let frameIndex = 0;

          const render = () => {
            const img = frames[frameIndex];
            if (img) drawCover(canvas, img);
          };
          const onResize = () => {
            fitCanvas(canvas);
            render();
          };
          fitCanvas(canvas);
          window.addEventListener("resize", onResize);

          loadHeroFrames().then(({ frames: loaded, available }) => {
            if (!available) return;
            frames = loaded;
            render();

            const proxy = { frame: 0 };
            gsap.to(proxy, {
              frame: frames.length - 1,
              ease: "none",
              onUpdate: () => {
                const next = Math.round(proxy.frame);
                if (next !== frameIndex) {
                  frameIndex = next;
                  render();
                }
              },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${PIN_DISTANCE}`,
                pin: true,
                anticipatePin: 1,
                scrub: 0.6,
                snap: 1 / (frames.length - 1),
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  // Hide the scroll cue as soon as scrubbing begins.
                  if (cueRef.current) {
                    gsap.set(cueRef.current, {
                      autoAlpha: self.progress > 0.005 ? 0 : 1,
                    });
                  }
                  // Cross-fade the pre-rendered sequence into live WebGL
                  // once the face is fully dissolved.
                  if (self.progress > 0.985 && !fadedRef.current) {
                    fadedRef.current = true;
                    gsap.to(canvas, { autoAlpha: 0, duration: 0.7, ease: EASE_OUT });
                    if (!dissolvedRef.current) {
                      dissolvedRef.current = true;
                      onDissolved();
                    }
                  } else if (self.progress < 0.9 && fadedRef.current) {
                    // The scrub is fully reversible.
                    fadedRef.current = false;
                    gsap.to(canvas, { autoAlpha: 1, duration: 0.4, ease: EASE_OUT });
                  }
                },
              },
            });
          });

          return () => window.removeEventListener("resize", onResize);
        }
      );
    },
    { scope: sectionRef }
  );

  const showVideo = isMobile && !reduced;

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative h-screen overflow-hidden"
    >
      {/* Faint voxel texture behind the sequence; revealed by the cross-fade. */}
      <div className="halftone absolute inset-0 opacity-10" aria-hidden="true" />

      {showVideo ? (
        !videoFailed && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
          />
        )
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-16 md:p-12 md:pb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Reda Alaarabi
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Systems that ship in days, not months.
        </h1>
        <p className="mt-5 max-w-xl text-base text-voxel md:text-lg">
          AI-first eCommerce growth engineering — Shopify &amp; WooCommerce builds,
          performance media, and automation for DTC brands.
        </p>
      </div>

      <p
        ref={cueRef}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
        aria-hidden="true"
      >
        Scroll
      </p>
    </section>
  );
}
