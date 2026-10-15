"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import type { GalleryShot } from "@/types/portfolio";

interface ProjectGalleryProps {
  shots: GalleryShot[];
  /** Host shown in the panel header, e.g. "foody.whoax.com". */
  source?: string;
}

/**
 * Screenshot panel in the editor's own idiom: same 1px frame and header bar
 * as the code blocks, so captures read as files of the project, not a
 * marketing collage. The first shot leads full width; the rest pair up.
 *
 * Images are plain <img> on purpose: the site is a static export with
 * `images.unoptimized`, so next/image would not generate a srcSet. The
 * 960w / 1920w WebP pairs are pre-encoded in /public instead.
 */
export default function ProjectGallery({ shots, source }: ProjectGalleryProps) {
  if (shots.length === 0) return null;
  const [lead, ...rest] = shots;

  return (
    <section
      aria-label={source ? `Screenshots of ${source}` : "Project screenshots"}
      className="my-5 border border-[#374145] bg-[#14181a] font-mono"
    >
      <div className="px-3 py-1.5 border-b border-[#2b3337] bg-[#1a2024] text-[11px] text-[#839e9a] flex items-center justify-between gap-3 select-none">
        <span className="truncate">{`// screenshots${source ? ` · ${source}` : ""}`}</span>
        <span className="text-[#6f8788] shrink-0 tabular-nums">
          {shots.length} screenshots
        </span>
      </div>

      <div className="p-2.5 sm:p-3 space-y-3">
        <Shot shot={lead} sizes="(min-width: 1024px) 840px, 100vw" eager />

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
            {rest.map((shot) => (
              <Shot
                key={shot.src}
                shot={shot}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Shot({
  shot,
  sizes,
  eager = false,
}: {
  shot: GalleryShot;
  sizes: string;
  eager?: boolean;
}) {
  const srcSet = shot.srcSmall
    ? `${shot.srcSmall} 960w, ${shot.src} ${shot.width}w`
    : undefined;

  return (
    <figure className="group min-w-0">
      <a
        href={shot.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full-size screenshot: ${shot.alt}`}
        className="relative block overflow-hidden border border-[#2b3337] bg-[#0f1315] transition-colors duration-200 hover:border-[#cbe3b3]/70 focus-visible:outline-none focus-visible:border-[#cbe3b3] focus-visible:ring-1 focus-visible:ring-[#cbe3b3]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP variants */}
        <img
          src={shot.srcSmall ?? shot.src}
          srcSet={srcSet}
          sizes={sizes}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block w-full h-auto transition-[filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:brightness-[1.06] motion-safe:group-hover:scale-[1.012]"
        />
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-[#1c2225]/90 border border-[#374145] text-[#cbe3b3] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </a>

      <figcaption className="mt-2 text-[12px] leading-snug text-[#adc9bc] text-pretty">
        <span className="text-[#cbe3b3] font-bold">{shot.label}</span>
        <span className="text-[#4a585c] select-none"> · </span>
        {shot.caption}
      </figcaption>
    </figure>
  );
}
