"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Footer() {
  const reduced = usePrefersReducedMotion();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-voxel/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          Reda Alaarabi · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/reda-alaarabi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-paper"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Ai-assistant-KIRA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-paper"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={backToTop}
            className="font-mono text-xs text-muted transition-colors hover:text-paper"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
