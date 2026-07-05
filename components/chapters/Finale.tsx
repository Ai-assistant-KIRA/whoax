"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { finale, site } from "@/lib/content";

export function Finale() {
  const reduced = useReducedMotion();

  return (
    <section id="contact" className="min-h-screen py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden border-2 border-[var(--color-border)]">
          <Image
            src="/images/02-about.jpg"
            alt="Reda Alaarabi"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 420px"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">About</p>
          <h2 className="mt-4 text-5xl font-extrabold uppercase md:text-6xl">{finale.headline}</h2>
          <p className="mt-6 text-lg text-[var(--color-muted)]">{finale.bio}</p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{finale.detail}</p>
          <p className="mt-4 text-sm text-[var(--color-muted)]">{site.location}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              href={`mailto:${site.email}`}
              className="btn btn-accent inline-flex cursor-pointer"
              whileHover={reduced ? undefined : { scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <Mail size={18} />
              {site.email}
            </motion.a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn inline-flex cursor-pointer">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn inline-flex cursor-pointer">
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
      </div>
      <footer className="container mt-24 border-t border-[var(--color-border)] pt-8 text-xs uppercase tracking-widest text-[var(--color-muted)]">
        © {new Date().getFullYear()} {site.name} — {site.role}
      </footer>
    </section>
  );
}