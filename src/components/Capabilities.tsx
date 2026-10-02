"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_DRIFT } from "@/lib/ease";
import SectionLabel from "./SectionLabel";

type Capability = {
  title: string;
  blurb: string;
  tools: string[];
  credential?: string;
};

const CAPABILITIES: Capability[] = [
  {
    title: "Commerce & Growth",
    blurb: "Storefronts, feeds, paid acquisition, and retention for DTC revenue.",
    tools: [
      "Shopify",
      "WooCommerce",
      "Meta Ads",
      "Google Ads / PMax",
      "Merchant Center",
      "Klaviyo",
      "CRO",
    ],
    credential: "Google Ads & Merchant Center · 2018–Present",
  },
  {
    title: "AI & Automation",
    blurb: "Agents and orchestration that compress delivery from weeks to days.",
    tools: [
      "Agents",
      "MCP tooling",
      "n8n orchestration",
      "Self-hosted models",
      "WhatsApp automation",
    ],
    credential: "AI Systems & Automation · 2022–Present",
  },
  {
    title: "Data & Systems",
    blurb:
      "Reporting and hands-on production troubleshooting that keeps launches moving.",
    tools: ["Sheets & Excel reporting", "Data analysis", "Production debugging"],
  },
  {
    title: "Infrastructure & Delivery",
    blurb: "The technical floor under every launch.",
    tools: [
      "Technical SEO",
      "Core Web Vitals",
      "Custom plugins",
      "GCP",
      "Azure",
    ],
    credential: "Shopify & WooCommerce Engineering · 2018–Present",
  },
];

function CapabilityCard({ capability }: { capability: Capability }) {
  const [revealed, setRevealed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const duration = reduced ? 0 : 0.3;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-expanded={revealed}
      aria-label={`${capability.title} — reveal tools`}
      className="relative min-h-56 cursor-pointer overflow-hidden rounded-sm border border-voxel/15 bg-panel p-7 outline-none focus-visible:border-signal md:p-9"
      onHoverStart={() => setRevealed(true)}
      onHoverEnd={() => setRevealed(false)}
      onTap={() => setRevealed((v) => !v)}
      onFocus={() => setRevealed(true)}
      onBlur={() => setRevealed(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRevealed((v) => !v);
        }
      }}
    >
      <h3 className="text-xl font-semibold text-paper md:text-2xl">
        {capability.title}
      </h3>
      <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-muted">
        {capability.blurb}
      </p>
      {capability.credential && (
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-voxel/70">
          {capability.credential}
        </p>
      )}

      <AnimatePresence>
        {revealed && (
          <>
            {/*
              The halftone matrix's second and final post-hero appearance:
              a quick dissolve flash as the tool list resolves.
            */}
            <motion.div
              key="halftone"
              aria-hidden
              className="halftone-dots pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: reduced ? 0 : [0, 0.35, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.45, times: [0, 0.4, 1] }}
            />
            <motion.div
              key="tools"
              className="absolute inset-0 flex flex-col justify-between bg-panel p-7 md:p-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: MOTION_DRIFT }}
            >
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {capability.tools.map((tool) => (
                  <li
                    key={tool}
                    className="font-mono text-xs uppercase tracking-wider text-paper/85"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[11px] uppercase tracking-wider text-signal">
                {capability.title}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section
      aria-labelledby="capabilities-label"
      className="relative mx-auto max-w-6xl px-6 py-24 md:py-36"
    >
      <SectionLabel
        numeral="04"
        label="Capabilities"
        id="capabilities-label"
        className="mb-12"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {CAPABILITIES.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
    </section>
  );
}
