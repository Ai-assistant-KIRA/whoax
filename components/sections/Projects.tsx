"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Project = {
  id: string;
  title: string;
  period: string;
  summary: string;
  result: string;
  nodes: [string, string, string];
};

const PROJECTS: Project[] = [
  {
    id: "n8n-automations",
    title: "n8n eCommerce Automations",
    period: "2025–Present",
    summary: "Open-source cart recovery, order sync, and CRM workflows running across 7 stores.",
    result: "Manual sync time cut 78%.",
    nodes: ["Store events", "n8n workflows", "CRM + recovery"],
  },
  {
    id: "ai-assistants",
    title: "AI Assistants & Chatbots",
    period: "2022–Present",
    summary: "12 assistants and WhatsApp bots launched in days.",
    result: "First response cut from 40 minutes to under 2.",
    nodes: ["Customer message", "AI assistant", "Resolution / handoff"],
  },
];

// Simple animated SVG node/flow diagram — no fabricated screenshots.
function FlowDiagram({
  nodes,
  animated,
}: {
  nodes: [string, string, string];
  animated: boolean;
}) {
  return (
    <svg
      viewBox="0 0 520 120"
      className="mt-8 w-full"
      role="img"
      aria-label={`Flow: ${nodes.join(" to ")}`}
    >
      {nodes.map((label, i) => {
        const x = 10 + i * 180;
        return (
          <g key={label}>
            <rect
              x={x}
              y={40}
              width={150}
              height={40}
              rx={3}
              fill="none"
              stroke="#9A9EA6"
              strokeOpacity={0.4}
            />
            <text
              x={x + 75}
              y={64}
              textAnchor="middle"
              fill="#EDEDEF"
              fontSize="11"
              fontFamily="var(--font-plex-mono), monospace"
            >
              {label}
            </text>
            {i < 2 &&
              (animated ? (
                <motion.line
                  x1={x + 152}
                  y1={60}
                  x2={x + 178}
                  y2={60}
                  stroke="#FF5A1F"
                  strokeWidth={1.5}
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    transition: { duration: 0.8, delay: 0.2 + i * 0.3, ease: EASE },
                  }}
                />
              ) : (
                <line
                  x1={x + 152}
                  y1={60}
                  x2={x + 178}
                  y2={60}
                  stroke="#FF5A1F"
                  strokeWidth={1.5}
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function Projects() {
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openProject = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <section
      aria-labelledby="projects-heading"
      className="border-t border-voxel/10 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
            05
          </span>
          <span id="projects-heading">Selected Projects</span>
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <motion.button
              key={project.id}
              type="button"
              layoutId={reduced ? undefined : `project-${project.id}`}
              onClick={() => setOpenId(project.id)}
              className="rounded-sm bg-panel p-8 text-left"
              aria-haspopup="dialog"
            >
              <p className="font-mono text-xs tracking-widest text-muted">{project.period}</p>
              <h3 className="mt-3 text-xl font-medium text-paper">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {openProject && (
              <motion.div
                className="fixed inset-0 z-40 grid place-items-center bg-void/80 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenId(null)}
              >
                <motion.div
                  layoutId={reduced ? undefined : `project-${openProject.id}`}
                  role="dialog"
                  aria-modal="true"
                  aria-label={openProject.title}
                  className="w-full max-w-2xl rounded-sm bg-panel p-8 md:p-12"
                  onClick={(e) => e.stopPropagation()}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="font-mono text-xs tracking-widest text-muted">
                    {openProject.period}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium text-paper">{openProject.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {openProject.summary}
                  </p>
                  <p className="mt-2 font-mono text-sm text-paper">{openProject.result}</p>
                  <FlowDiagram nodes={openProject.nodes} animated={!reduced} />
                  <button
                    type="button"
                    onClick={() => setOpenId(null)}
                    className="mt-8 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
