/** Multi-stage hero copy — skeleton-rebuild rail pattern, Reda content. */

export const HERO_PANELS = [
  {
    eyebrow: "Reda Alaarabi · whoax",
    title: ["Systems that ship in ", "days, not months."],
    accentIndex: 1,
    lede: "AI-first eCommerce growth engineering — Shopify & WooCommerce builds, performance media, and automation for DTC brands.",
  },
  {
    eyebrow: "Focus",
    title: ["Ads, stores, and ", "AI ops."],
    accentIndex: 1,
    lede: "Meta & Google acquisition, CRO, speed/SEO, n8n automations — built for operators who ship measurable revenue.",
  },
  {
    eyebrow: "The build",
    title: ["Growth systems that ", "convert."],
    accentIndex: 1,
    lede: "Scroll-scrubbed cinematic dissolve, glass UI, and sticky narrative — engineered for portfolio-grade first impressions.",
    cta: { href: "#contact", label: "Start a project" },
  },
] as const;

export const HERO_RAIL = [
  { muted: "Ads · Stores · Automation · AI" },
  { muted: "Remote · EU / Global" },
  { gap: true },
  { label: "Currently" },
  { body: "Building growth systems for" },
  { hero: "Shopify brands" },
  { gap: true },
  { label: "This week" },
  { body: "Meta + Google ads ops" },
  { body: "n8n AI poster pipeline" },
  { body: "CRO & landing speed" },
  { gap: true },
  { label: "Follow" },
  { body: "LinkedIn" },
  { body: "GitHub" },
  { gap: true },
  { label: "Contact" },
  { body: "via LinkedIn" },
  { gap: true },
  { muted: "Est. 2023 — 2026" },
] as const;
