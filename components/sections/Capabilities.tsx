"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    title: "Commerce & Growth",
    blurb: "Storefronts, paid media, and conversion built as one growth system.",
    tools: ["Shopify", "WooCommerce", "Meta Ads", "Google Ads / PMax", "Merchant Center", "Klaviyo", "CRO"],
    credential: "Google Ads & Merchant Center · 2018–Present",
  },
  {
    title: "AI & Automation",
    blurb: "Agents and orchestrated workflows that compress delivery timelines.",
    tools: ["Agents", "MCP tooling", "n8n orchestration", "Self-hosted models", "WhatsApp automation"],
    credential: "AI Systems & Automation · 2022–Present",
  },
  {
    title: "Data & Systems",
    blurb: "Reporting and hands-on production troubleshooting.",
    tools: ["Reporting", "Production troubleshooting"],
    credential: null,
  },
  {
    title: "Infrastructure & Delivery",
    blurb: "The technical foundation that keeps launches fast and stable.",
    tools: ["Technical SEO", "Core Web Vitals", "Custom plugins", "GCP / Azure"],
    credential: "Shopify & WooCommerce Engineering · 2018–Present",
  },
];

export default function Capabilities() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="capabilities-heading" className="px-6 py-24 md:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
          03
        </span>
        <span id="capabilities-heading">Capabilities + Focus</span>
      </p>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card, i) => {
          const open = active === i;
          return (
            <button
              key={card.title}
              type="button"
              aria-expanded={open}
              onClick={() => setActive(open ? null : i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((v) => (v === i ? null : v))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((v) => (v === i ? null : v))}
              className="relative min-h-72 overflow-hidden rounded-sm bg-panel p-7 pb-24 text-left"
            >
              <h3 className="text-lg font-medium text-paper">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.blurb}</p>
              {card.credential && (
                <p className="mt-6 font-mono text-[11px] tracking-wide text-muted">
                  {card.credential}
                </p>
              )}

              <AnimatePresence>
                {open && (
                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-7 pt-4"
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.25, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: reduced ? 0.01 : 0.15 } }}
                  >
                    {/* Halftone use 2 of 2: the tool-reveal dissolve. */}
                    {!reduced && (
                      <motion.span
                        className="halftone pointer-events-none absolute inset-0"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0, transition: { duration: 0.4, ease: EASE } }}
                        aria-hidden="true"
                      />
                    )}
                    <ul className="flex flex-wrap gap-2">
                      {card.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-sm border border-voxel/25 px-2.5 py-1 font-mono text-[11px] text-voxel"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </section>
  );
}
