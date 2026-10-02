"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FRAME_COUNT,
  HERO_FALLBACK_VIDEO_SRC,
  HERO_STATIC_SRC,
  loadHeroFrames,
} from "@/lib/heroFrames";
import { HERO_PANELS, HERO_RAIL } from "@/lib/heroCopy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroMode = "scrub" | "video" | "static";

/**
 * Skeleton-rebuild first-section UX on top of local dissolve frames.
 *
 * IMPORTANT: CSS `position: sticky` breaks inside GSAP ScrollSmoother
 * (parent transform). Use ScrollTrigger `pin` instead, with a multi-viewport
 * pin distance so the dual-rail narrative has room to play.
 */
export default function Hero({
  onHandoff,
}: {
  onHandoff: (active: boolean) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyStackRef = useRef<HTMLDivElement>(null);
  const railStackRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLParagraphElement>(null);
  const handedRef = useRef(false);
  // Default scrub so canvas mounts before matchMedia / useGSAP bind.
  const [mode, setMode] = useState<HeroMode>("scrub");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        setMode("static");
        onHandoff(false);
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          setMode("video");
          onHandoff(false);
        },
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          setMode("scrub");

          const canvas = canvasRef.current;
          const section = sectionRef.current;
          if (!canvas || !section) return;
          const ctx2d = canvas.getContext("2d");
          if (!ctx2d) return;

          let frames: HTMLImageElement[] | null = null;
          const playhead = { frame: 0 };

          const render = () => {
            if (!frames) return;
            const index = Math.round(
              gsap.utils.clamp(0, FRAME_COUNT - 1, playhead.frame),
            );
            const img = frames[index];
            if (!img || !img.naturalWidth) return;
            const cw = canvas.width;
            const ch = canvas.height;
            const scale = Math.max(
              cw / img.naturalWidth,
              ch / img.naturalHeight,
            );
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            ctx2d.clearRect(0, 0, cw, ch);
            ctx2d.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
          };

          const size = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const nextW = Math.round(canvas.clientWidth * dpr);
            const nextH = Math.round(canvas.clientHeight * dpr);
            if (nextW < 2 || nextH < 2) return;
            canvas.width = nextW;
            canvas.height = nextH;
            render();
          };

          loadHeroFrames().then((loaded) => {
            frames = loaded;
            size();
            ScrollTrigger.refresh();
          });

          // ~5 viewports of scrub room (skeleton 480–520vh feel)
          const pinDistance = () => Math.round(window.innerHeight * 4.2);

          gsap.to(playhead, {
            frame: FRAME_COUNT - 1,
            ease: "none",
            snap: "frame",
            onUpdate: render,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${pinDistance()}`,
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;

                // Skeleton panel multipliers (hero-recreate/hero.js)
                if (copyStackRef.current) {
                  copyStackRef.current.style.transform = `translate3d(0, ${-1600 * p}px, 0)`;
                }
                if (railStackRef.current) {
                  railStackRef.current.style.transform = `translate3d(0, ${-900 * p}px, 0)`;
                }
                if (cueRef.current) {
                  cueRef.current.style.opacity = p > 0.02 ? "0" : "1";
                }

                canvas.style.opacity = String(
                  p < 0.88
                    ? 1
                    : gsap.utils.clamp(0, 1, 1 - (p - 0.88) / 0.12),
                );

                const handed = p > 0.88;
                if (handed !== handedRef.current) {
                  handedRef.current = handed;
                  onHandoff(handed);
                }
              },
            },
          });

          window.addEventListener("resize", size);
          size();
          requestAnimationFrame(size);

          return () => {
            window.removeEventListener("resize", size);
          };
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero-zone"
      aria-label="Introduction"
      className="relative h-svh overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full ${mode === "scrub" ? "" : "invisible"}`}
      />
      {mode === "video" && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_FALLBACK_VIDEO_SRC}
          poster={HERO_STATIC_SRC}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {mode === "static" && (
        <Image
          src={HERO_STATIC_SRC}
          alt="Portrait of Reda Alaarabi dissolved into a matrix of silver-grey voxels"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Edge scrims for rail legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.72)_0%,rgba(11,11,13,0.12)_42%,rgba(11,11,13,0.55)_100%),linear-gradient(180deg,rgba(11,11,13,0.4)_0%,transparent_28%,rgba(11,11,13,0.55)_100%)]"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1920px] items-center px-5 md:px-8 lg:px-10">
        {/* Left multi-panel copy (desktop scrub + static) */}
        {mode !== "video" && (
          <div className="copy-mask relative z-20 mt-16 w-full max-w-md overflow-hidden md:mt-0 md:w-[42%] md:max-w-none lg:w-[34%] xl:w-[30%]">
            <div
              ref={copyStackRef}
              className="absolute left-0 right-0 top-24 flex flex-col gap-[380px] will-change-transform md:top-40 md:gap-[440px]"
            >
              {HERO_PANELS.map((panel) => (
                <article key={panel.eyebrow} className="copy-panel">
                  <p className="mb-5 inline-block rounded-[3px] bg-void px-[11px] py-[5px] font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-paper">
                    {panel.eyebrow}
                  </p>
                  <h1 className="mb-5 font-display text-[clamp(2rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.04em] text-paper">
                    {panel.title.map((part, i) =>
                      i === panel.accentIndex ? (
                        <span key={part} className="italic text-paper">
                          {part}
                        </span>
                      ) : (
                        <span key={part}>{part}</span>
                      ),
                    )}
                  </h1>
                  <p className="mb-6 max-w-[42ch] text-sm leading-relaxed text-paper/75 md:text-[15px]">
                    {panel.lede}
                  </p>
                  {"cta" in panel && panel.cta && (
                    <a
                      href={panel.cta.href}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-void/10 bg-paper py-1.5 pl-[18px] pr-1.5 font-display text-[13px] font-medium text-void transition-colors hover:border-paper hover:bg-void hover:text-paper"
                    >
                      {panel.cta.label}
                      <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-void text-paper">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden
                        >
                          <path d="M7 7h10v10M7 17 17 7" />
                        </svg>
                      </span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {mode === "video" && (
          <div className="relative z-20 flex h-full flex-col items-start justify-end gap-4 pb-24">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-voxel">
              Reda Alaarabi
            </p>
            <h1 className="max-w-4xl font-display text-4xl leading-[1.08]">
              Systems that ship in days, not months.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-paper/80">
              AI-first eCommerce growth engineering — Shopify &amp; WooCommerce
              builds, performance media, and automation for DTC brands.
            </p>
          </div>
        )}

        {mode === "scrub" && (
          <div
            className="rail-mask pointer-events-none absolute right-5 top-1/2 z-20 hidden h-[70vh] w-[200px] -translate-y-1/2 overflow-hidden md:right-8 md:block lg:right-10"
            aria-hidden
          >
            <div
              ref={railStackRef}
              className="absolute left-0 right-0 top-8 flex flex-col gap-2 text-right will-change-transform"
            >
              {HERO_RAIL.map((row, i) => {
                if ("gap" in row && row.gap) {
                  return <div key={`gap-${i}`} className="h-5" />;
                }
                if ("muted" in row && row.muted) {
                  return (
                    <p
                      key={`m-${i}`}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45"
                    >
                      {row.muted}
                    </p>
                  );
                }
                if ("label" in row && row.label) {
                  return (
                    <p
                      key={`l-${i}`}
                      className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/55"
                    >
                      {row.label}
                    </p>
                  );
                }
                if ("hero" in row && row.hero) {
                  return (
                    <p
                      key={`h-${i}`}
                      className="font-display text-lg tracking-[-0.02em] text-paper"
                    >
                      {row.hero}
                    </p>
                  );
                }
                if ("body" in row && row.body) {
                  return (
                    <p key={`b-${i}`} className="text-[13px] text-paper/70">
                      {row.body}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      <p
        ref={cueRef}
        aria-hidden
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-opacity duration-500"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 5v14m7-7-7 7-7-7" />
        </svg>
        Scroll to explore
      </p>
    </section>
  );
}
