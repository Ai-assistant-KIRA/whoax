"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/content";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

export function WorkGallery() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const track = trackRef.current;
      if (!track || reduced) return;

      const getScroll = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section ref={scope} id="work" className="relative overflow-hidden bg-[var(--color-surface)]">
      <div className="container py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Selected work</p>
      </div>
      {reduced ? (
        <div className="container flex flex-col gap-8 pb-16">
          {projects.map((p) => (
            <ProjectPanel key={p.title} project={p} />
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="flex h-[70vh] min-h-[420px] w-max gap-0">
          {projects.map((p) => (
            <div key={p.title} className="relative h-full w-[85vw] shrink-0 md:w-[70vw] lg:w-[55vw]">
              <ProjectPanel project={p} fullBleed />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectPanel({
  project,
  fullBleed = false,
}: {
  project: (typeof projects)[number];
  fullBleed?: boolean;
}) {
  const inner = (
    <>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
        sizes={fullBleed ? "70vw" : "100vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 md:p-12">
        <h3 className="text-4xl font-extrabold uppercase md:text-6xl">{project.title}</h3>
        <p className="mt-2 text-sm uppercase tracking-widest text-[var(--color-accent)]">{project.subtitle}</p>
        {"href" in project && project.href && (
          <span className="mt-4 inline-block text-xs uppercase tracking-widest underline">View live →</span>
        )}
      </div>
    </>
  );

  const className = `relative block overflow-hidden border-r border-[var(--color-border)] ${
    fullBleed ? "h-full w-full" : "aspect-[16/10] w-full"
  }`;

  if ("href" in project && project.href) {
    return (
      <Link href={project.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}