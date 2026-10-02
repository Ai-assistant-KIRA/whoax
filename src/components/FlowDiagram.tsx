"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MOTION_DRIFT } from "@/lib/ease";

type NodeSpec = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: boolean;
};

type DiagramSpec = { nodes: NodeSpec[]; paths: string[] };

const DIAGRAMS: Record<"flow" | "bot", DiagramSpec> = {
  flow: {
    nodes: [
      { x: 20, y: 95, w: 130, h: 50, label: "Store" },
      { x: 240, y: 95, w: 140, h: 50, label: "n8n", accent: true },
      { x: 470, y: 20, w: 150, h: 50, label: "Cart recovery" },
      { x: 470, y: 95, w: 150, h: 50, label: "Order sync" },
      { x: 470, y: 170, w: 150, h: 50, label: "CRM hooks" },
    ],
    paths: [
      "M150,120 H240",
      "M380,120 C425,120 425,45 470,45",
      "M380,120 H470",
      "M380,120 C425,120 425,195 470,195",
    ],
  },
  bot: {
    nodes: [
      { x: 20, y: 95, w: 140, h: 50, label: "WhatsApp" },
      { x: 250, y: 95, w: 140, h: 50, label: "AI agent", accent: true },
      { x: 480, y: 30, w: 140, h: 50, label: "Reply < 2 min" },
      { x: 480, y: 160, w: 140, h: 50, label: "Human handoff" },
    ],
    paths: [
      "M160,120 H250",
      "M390,120 C435,120 435,55 480,55",
      "M390,120 C435,120 435,185 480,185",
    ],
  },
};

export default function FlowDiagram({
  variant,
  title,
}: {
  variant: "flow" | "bot";
  title: string;
}) {
  const reduced = usePrefersReducedMotion();
  const spec = DIAGRAMS[variant];

  return (
    <svg
      viewBox="0 0 640 240"
      role="img"
      aria-label={title}
      className="w-full"
    >
      {spec.paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="#6f7278"
          strokeWidth={1.25}
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.25 + i * 0.12,
            ease: MOTION_DRIFT,
          }}
        />
      ))}
      {spec.nodes.map((node, i) => (
        <motion.g
          key={node.label}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.4,
            delay: reduced ? 0 : i * 0.1,
            ease: MOTION_DRIFT,
          }}
        >
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx={4}
            fill="#17171b"
            stroke={node.accent ? "#ff5a1f" : "#9a9ea6"}
            strokeOpacity={node.accent ? 0.9 : 0.4}
            strokeWidth={1.25}
          />
          <text
            x={node.x + node.w / 2}
            y={node.y + node.h / 2 + 4}
            textAnchor="middle"
            fill={node.accent ? "#ededef" : "#9a9ea6"}
            style={{
              fontFamily: "var(--font-plex-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.05em",
            }}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
