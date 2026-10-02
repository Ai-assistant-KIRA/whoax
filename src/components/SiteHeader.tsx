"use client";

const NAV = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#impact", label: "Impact" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto mx-auto flex h-[72px] max-w-[1920px] items-center justify-between gap-6 px-5 md:h-[84px] md:px-8 lg:px-10">
        <a href="#main" className="flex shrink-0 items-center gap-3 text-paper">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 bg-void/60 font-display text-sm tracking-tight backdrop-blur-md">
            RA
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[17px] tracking-[-0.03em]">
              Reda Alaarabi
            </span>
            <span className="mt-px font-display text-[10px] uppercase tracking-[0.18em] text-paper/70">
              whoax · growth
            </span>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden h-11 -translate-x-1/2 items-center rounded-full border border-paper/10 bg-[rgba(11,11,13,0.55)] px-2 backdrop-blur-md md:flex"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex h-8 items-center rounded-full px-4 font-display text-[13px] tracking-[-0.01em] text-paper/85 transition-[color,background] duration-300 hover:bg-paper/10 hover:text-paper"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden h-11 items-center gap-2.5 rounded-xl border border-void/10 bg-paper py-0 pl-[18px] pr-1.5 font-display text-[13px] font-medium tracking-[-0.01em] text-void transition-colors duration-300 hover:border-paper hover:bg-void hover:text-paper md:inline-flex"
        >
          Connect
          <span className="grid h-6 w-6 place-items-center rounded-full bg-void text-paper transition-colors duration-300 group-hover:bg-paper group-hover:text-void">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </a>

        <a
          href="#contact"
          className="grid h-10 w-10 place-items-center rounded-full border border-paper/30 text-paper md:hidden"
          aria-label="Contact"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M4 12h16M4 18h16M4 6h16" />
          </svg>
        </a>
      </div>
    </header>
  );
}
