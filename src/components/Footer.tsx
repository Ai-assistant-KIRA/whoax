"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function Footer() {
  const reduced = usePrefersReducedMotion();

  return (
    <footer className="border-t border-voxel/15">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 font-mono text-xs text-muted sm:flex-row">
        <p>Reda Alaarabi · © {new Date().getFullYear()}</p>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://linkedin.com/in/reda-alaarabi"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors duration-300 hover:text-paper"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Ai-assistant-KIRA"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors duration-300 hover:text-paper"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          className="cursor-pointer transition-colors duration-300 hover:text-paper"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
