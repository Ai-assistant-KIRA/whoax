"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_DRIFT } from "@/lib/ease";
import FlowDiagram from "./FlowDiagram";
import SectionLabel from "./SectionLabel";

type Project = {
  id: string;
  title: string;
  period: string;
  summary: string;
  result: string;
  diagram: "flow" | "bot";
  diagramTitle: string;
};

const PROJECTS: Project[] = [
  {
    id: "n8n-automations",
    title: "n8n eCommerce Automations",
    period: "2025–Present",
    summary:
      "Open-source cart recovery, order sync, and CRM workflows rolled out across 7 stores.",
    result: "Manual sync time cut 78%",
    diagram: "flow",
    diagramTitle:
      "Flow diagram: store events route through n8n into cart recovery, order sync, and CRM workflows",
  },
  {
    id: "ai-assistants",
    title: "AI Assistants & Chatbots",
    period: "2022–Present",
    summary: "12 assistants and WhatsApp bots launched in days, not weeks.",
    result: "First response: 40 min → under 2 min",
    diagram: "bot",
    diagramTitle:
      "Flow diagram: WhatsApp messages route through an AI agent to instant replies or human handoff",
  },
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <section
      aria-labelledby="projects-label"
      className="relative mx-auto max-w-6xl px-6 py-24 md:py-36"
    >
      <SectionLabel
        numeral="06"
        label="Selected Projects"
        id="projects-label"
        className="mb-12"
      />
      <div className="grid items-start gap-4 md:grid-cols-2">
        {PROJECTS.map((project) => {
          const expanded = expandedId === project.id;
          return (
            <motion.article
              key={project.id}
              layout={!reduced}
              layoutId={reduced ? undefined : project.id}
              transition={{ duration: reduced ? 0 : 0.5, ease: MOTION_DRIFT }}
              className={`overflow-hidden rounded-sm border bg-panel ${
                expanded ? "border-signal/50 md:col-span-2" : "border-voxel/15"
              }`}
            >
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpandedId(expanded ? null : project.id)}
                className="flex w-full cursor-pointer items-start justify-between gap-6 p-7 text-left md:p-9"
              >
                <span>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {project.period}
                  </span>
                  <span className="mt-2 block text-xl font-semibold text-paper md:text-2xl">
                    {project.title}
                  </span>
                  <span className="mt-3 block max-w-[52ch] text-sm leading-relaxed text-muted">
                    {project.summary}
                  </span>
                  <span className="mt-4 block font-mono text-xs uppercase tracking-wider text-signal">
                    {project.result}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="mt-1 font-mono text-lg text-voxel"
                >
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="diagram"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: MOTION_DRIFT }}
                  >
                    <div className="border-t border-voxel/15 px-7 py-8 md:px-9">
                      <div className="mx-auto max-w-2xl">
                        <FlowDiagram
                          variant={project.diagram}
                          title={project.diagramTitle}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
