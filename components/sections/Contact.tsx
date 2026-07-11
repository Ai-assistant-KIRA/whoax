"use client";

import MagneticLink from "@/components/ui/MagneticLink";

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="px-6 py-32 text-center md:py-44">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        <span className="mr-4 font-display text-lg text-voxel/50" aria-hidden="true">
          06
        </span>
        <span>Contact</span>
      </p>
      <h2
        id="contact-heading"
        className="mx-auto mt-8 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl"
      >
        Start the ten-day sprint.
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
        English and Arabic (fluent), French (professional) — clients across 5 markets.
      </p>

      <div className="mt-12 flex flex-col items-center gap-6">
        <MagneticLink
          href="mailto:redaalaarabi@gmail.com"
          className="inline-block rounded-full border border-signal px-10 py-4 font-mono text-sm text-signal transition-colors hover:bg-signal hover:text-void"
        >
          redaalaarabi@gmail.com
        </MagneticLink>
        <a href="tel:+212708966349" className="font-mono text-sm text-paper hover:text-signal">
          +212 708 966 349
        </a>
        <p className="font-mono text-xs text-muted">whoax.com</p>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <a
          href="https://linkedin.com/in/reda-alaarabi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted transition-colors hover:text-paper"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>
        <a
          href="https://github.com/Ai-assistant-KIRA"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted transition-colors hover:text-paper"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
