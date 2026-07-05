"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

export function Header() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 px-6 backdrop-blur-sm transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <a href="#" className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest">
        {site.name}
      </a>
      <a href={`mailto:${site.email}`} className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        Contact
      </a>
    </header>
  );
}