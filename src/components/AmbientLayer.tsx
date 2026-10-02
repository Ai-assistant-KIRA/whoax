"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// R3F is only imported at the hero handoff — never for reduced motion or mobile,
// which never activate this layer.
const VoxelField = dynamic(() => import("./VoxelField"), { ssr: false });

export default function AmbientLayer({ active }: { active: boolean }) {
  // Render-phase latch: once active has been true, stay mounted forever.
  const [mounted, setMounted] = useState(false);
  if (active && !mounted) setMounted(true);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      <VoxelField />
    </div>
  );
}
