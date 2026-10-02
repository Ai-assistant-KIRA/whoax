import { PortfolioFile, FolderNode } from "@/types/portfolio";

export const PORTFOLIO_FILES: Record<string, PortfolioFile> = {
  "readme": {
    id: "readme",
    name: "README.md",
    path: "/README.md",
    icon: "FileCode",
    category: "root",
    title: "Reda Alaarabi · whoax.com",
    subtitle: "AI-First eCommerce Growth Engineering & Performance Systems",
    lastUpdated: "2026-10-02",
    tags: ["eCommerce", "ShopifyPlus", "AI-Ops", "CRO", "Attribution", "n8n"],
    content: `# Reda Alaarabi · whoax.com
AI-first eCommerce growth engineering — custom Shopify & WooCommerce builds, performance media, and automation that turn five-week agency roadmaps into ten-day sprints.

I build revenue systems for high-growth direct-to-consumer brands. I pair hands-on eCommerce craft (custom Shopify Plus themes, headless architectures, CRO, Google & Meta Ads ops) with modern automation (n8n pipelines, dynamic ad creative rendering, and WhatsApp retention engines).

[ 01 / CORE HIGHLIGHTS ]
* 8+ Years in DTC Engineering & Growth: Engineered and scaled commerce systems across US, EU, and Middle Eastern markets.
* 10-Day Sprints vs 5-Week Builds: Continuous deployment pipelines delivering bespoke features and fixes in days instead of months.
* $14M+ Managed Ad Spend Attribution: Server-side Meta CAPI, Google Tag Manager, and BigQuery data pipelines recovering 30%+ lost tracking signals.
* Open-Source Architecture: Author of open-source eCommerce agent tooling including the Shopify Discord MCP Agent and n8n autonomous content pipelines.

[ 02 / SYSTEM ARCHITECTURE ]
* Core Matrix Engine: Active (HTML5 Generative ASCII Canvas running at 60 FPS)
* Storefront Runtime: Custom Shopify Plus / Next.js App Router
* Autonomous Automation: 14 self-healing n8n workflow clusters
* First-Party Attribution: 99.8% verified signal stability via AWS Server GTM

[ 03 / NAVIGATION ]
Browse the directory tree on the left to explore capabilities, technical deep-dives, open-source projects, and field studies.`,
    meta: {
      timeline: "2018 — Present",
      impact: "$14M+ Revenue Attributed",
      stack: ["Shopify Plus", "Next.js", "n8n Workflows", "AI Agents", "Meta CAPI", "TypeScript"],
      liveUrl: "https://whoax.com",
    },
  },

  "operator": {
    id: "operator",
    name: "the-operator.md",
    path: "/about/the-operator.md",
    icon: "FileText",
    category: "about",
    title: "The Operator · Background & Philosophy",
    subtitle: "Eight years building high-velocity revenue machines for direct-to-consumer operators.",
    lastUpdated: "2026-09-18",
    tags: ["Philosophy", "Execution", "Engineering"],
    content: `# The Operator · Background & Philosophy

I don't just write frontend code or manage ad accounts in isolation. Growth bottlenecks almost always happen at the seams between the tech stack and the acquisition channel.

[ THE TRADITIONAL AGENCY BOTTLENECK ]
* Slow execution: A simple landing page revision takes three weeks of Jira tickets and agency account managers.
* Broken attribution: Media buyers blame the developers for bad tracking, while developers blame the ad platform algorithms.
* Bloated codebases: 30+ third-party Shopify apps grinding mobile load times past 4.5 seconds, directly destroying conversion rates.

[ THE WHOAX OPERATING STANDARD ]
1. End-to-End Ownership: From bespoke Liquid templates and Tailwind components to server-side Facebook Conversions API and automated retention flows.
2. Speed as a Feature: Every 100ms saved is measurable checkout lift. We target 90+ mobile PageSpeed scores on custom themes.
3. Automation Acceleration: Utilizing autonomous agent pipelines for catalog management, automated feed optimization, and algorithmic creative testing.`,
    meta: {
      timeline: "8 Years DTC Experience",
      impact: "Zero-bloat theme builds",
      stack: ["Shopify Plus", "Next.js", "AWS", "Meta CAPI", "Klaviyo"],
    },
  },

  "manifesto": {
    id: "manifesto",
    name: "manifesto.md",
    path: "/about/manifesto.md",
    icon: "FileText",
    category: "about",
    title: "The Manifesto · 10-Day Sprints",
    subtitle: "Why we killed five-week agency timelines with agile technical delivery.",
    lastUpdated: "2026-08-11",
    tags: ["Manifesto", "Velocity", "Systems"],
    content: `# The Manifesto: 10-Day Sprints

Eight years building revenue systems for direct-to-consumer brands. I pair hands-on eCommerce craft (Shopify Plus, WooCommerce, paid media engineering) with agile delivery: automation, agents, and orchestrated workflows that turn a five-week build into a ten-day sprint.

I own delivery end-to-end, from product feeds and technical SEO to WhatsApp bots and the systems troubleshooting that keeps a launch on schedule when client environments break.

[ CORE TENETS ]
* Code is cheap, architecture is leverage: We construct modular component systems that allow rapid experimentation without accumulating technical debt.
* Measure twice, deploy continuously: Real-time observability over marketing funnel leaks, checkout drops, and webhook failures.
* Automate the repetitive, elevate the craft: Repetitive ad resizing, feed mapping, and order routing belong to automated scripts. Human energy is reserved for positioning, brand aesthetic, and architectural clarity.`,
  },

  "stack": {
    id: "stack",
    name: "stack-and-ops.md",
    path: "/about/stack-and-ops.md",
    icon: "Cpu",
    category: "about",
    title: "Production Stack & Infrastructure",
    subtitle: "Battle-tested tools for high-volume commerce and autonomous operations.",
    lastUpdated: "2026-09-24",
    tags: ["Stack", "DevOps", "Infrastructure"],
    content: `# Stack & Infrastructure

[ ECOMMERCE & FRONTEND ]
* Storefronts: Custom Shopify Plus (Liquid, Hydrogen), WooCommerce, Next.js App Router.
* Styling & Motion: Tailwind CSS, CSS Custom Properties, Framer Motion, HTML5 Canvas.
* Optimization: Core Web Vitals profiling, SVG sprite systems, native lazy-loading, edge caching via Cloudflare.

[ AI OPS & AUTOMATION ]
* Workflows: n8n self-hosted orchestrations, Node.js microservices, Python workers, Docker.
* Intelligence Layer: LLM orchestration and vision pipelines for dynamic creative copy generation, catalog metadata enrichment, and support ticket triage.
* Retention Engines: WhatsApp Business API automated retention workflows, multi-step customer inquiry triage.

[ FIRST-PARTY ATTRIBUTION ]
* Tracking: Server-Side Google Tag Manager on AWS, Meta Conversions API (CAPI), Google Analytics 4 via BigQuery.
* Ad Platforms: Meta Ads Manager, Google Performance Max, TikTok Ads.`,
  },

  "shopify-builds": {
    id: "shopify-builds",
    name: "ecommerce-builds.md",
    path: "/capabilities/ecommerce-builds.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Shopify Plus & Conversion Architecture",
    subtitle: "High-performance storefronts engineered for maximum conversion velocity.",
    lastUpdated: "2026-09-02",
    tags: ["ShopifyPlus", "Liquid", "Hydrogen", "Performance"],
    content: `# Capabilities · Shopify Plus Architecture

We design and engineer bespoke eCommerce experiences that feel native, load instantaneously, and guide high-intent buyers straight to checkout.

[ CORE DELIVERABLES ]
* Custom Shopify Theme Development: Zero reliance on bloated commercial themes. Clean, modular code tailored to your exact catalog structure.
* Headless & Hybrid Storefronts: Next.js frontend with Shopify Storefront GraphQL API when standard CMS layouts constrain custom product configuration.
* Cart & Checkout Optimization: Dynamic free shipping tiers, slide-out drawer upsells, one-click bundle selectors, and post-purchase thank-you upsell flows.
* Catalog Architecture: Complex multi-variant setups, custom metafields, faceted product filtering with sub-50ms response times.`,
    meta: {
      impact: "+32% Checkout Completion Rate",
      stack: ["Shopify Liquid", "GraphQL API", "Tailwind CSS", "Stimulus JS"],
    },
  },

  "ai-automation": {
    id: "ai-automation",
    name: "ai-automation.md",
    path: "/capabilities/ai-automation.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Autonomous AI Ops & n8n Workflows",
    subtitle: "Replacing manual busywork with resilient self-healing automation pipelines.",
    lastUpdated: "2026-09-28",
    tags: ["n8n", "AI-Ops", "Workflows", "Automation"],
    content: `# Capabilities · AI Ops & Workflow Automation

We build self-running operational pipelines that connect your storefront, advertising channels, and customer communications.

[ PRODUCTION SYSTEMS WE DEPLOY ]
* Automated Ad Creative Pipeline: Daily monitoring of top-performing ad angles, LLM-assisted headline copy generation, and headless canvas rendering of video and static variants.
* WhatsApp Retention & Support Bot: Resolves 75%+ of routine order status, tracking, and return inquiries with zero human intervention.
* Automated Catalog & 3PL Sync: Bi-directional inventory sync between 3PL warehouses and Shopify Plus with automated anomaly alerts in Slack.
* Serverless Webhook Workers: Event-driven Lambda workers handling order tagging, tax calculation adjustments, and VIP customer segment routing.`,
    meta: {
      impact: "25+ Hours Reclaimed Weekly",
      stack: ["n8n", "Python", "LLM APIs", "WhatsApp API", "PostgreSQL"],
    },
  },

  "performance-media": {
    id: "performance-media",
    name: "performance-media.md",
    path: "/capabilities/performance-media.md",
    icon: "Cpu",
    category: "capabilities",
    title: "First-Party Attribution & Media Engineering",
    subtitle: "Server-side tracking infrastructure that maximizes ad algorithm efficiency.",
    lastUpdated: "2026-08-30",
    tags: ["Attribution", "MetaCAPI", "ServerGTM", "ROAS"],
    content: `# Capabilities · Attribution Engineering

Ad platform algorithms are only as effective as the signal quality fed into them. When browser ad blockers and iOS privacy restrictions strip purchase events, ad spend gets wasted.

[ CORE WORKFLOWS ]
* Server-Side Meta CAPI: Routes verified server purchase events directly to Meta Graph API, restoring lost tracking signals.
* 30%+ Signal Recovery: Captures purchases missed by standard client-side browser pixels.
* Automated Budget Allocation: Custom scripts monitor ROAS thresholds and reallocate spend toward winning creative angles automatically.
* Data Warehousing: Clean data exports to Google BigQuery for cohort analysis, LTV projections, and blended CAC calculations.`,
    meta: {
      impact: "$14M+ Managed Spend Attributed",
      stack: ["Server GTM", "Meta CAPI", "BigQuery", "Looker Studio"],
    },
  },

  "speed-and-cro": {
    id: "speed-and-cro",
    name: "speed-and-cro.md",
    path: "/capabilities/speed-and-cro.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Core Web Vitals & Conversion Lift",
    subtitle: "Turning bounce rates into revenue with sub-second mobile page delivery.",
    lastUpdated: "2026-09-15",
    tags: ["Lighthouse", "WebVitals", "CRO", "Speed"],
    content: `# Capabilities · Speed & CRO Engineering

Every 100ms delay in mobile page load cuts conversion by up to 1%. We eliminate third-party script bloat and engineer sub-second mobile page loads.

[ TECHNICAL WORK ]
* Third-Party Tag Sandboxing: Analytics and marketing scripts load asynchronously without blocking critical hero image render.
* Critical Asset Inlining: Above-the-fold CSS inlines directly to ensure Largest Contentful Paint (LCP) hits under 1.2 seconds on 4G connections.
* Friction Elimination: Sticky mobile buy buttons, streamlined checkout forms, and instant address autocompletion.
* Zero Layout Shift: Pre-allocated media containers and layout containment preventing Cumulative Layout Shift (CLS).`,
    meta: {
      impact: "94/100 Mobile PageSpeed Achieved",
      stack: ["Web Vitals API", "Shopify Liquid", "Cloudflare", "Lighthouse"],
    },
  },

  "project-shopify-discord": {
    id: "project-shopify-discord",
    name: "shopify-discord-agent.md",
    path: "/projects/shopify-discord-agent.md",
    icon: "Layers",
    category: "projects",
    title: "Open-Source · Shopify Discord Agent (MCP + n8n)",
    subtitle: "Ask your Shopify store anything in Discord — 28 automated tools for inventory, orders, and revenue.",
    lastUpdated: "2026-09-10",
    tags: ["OpenSource", "Shopify", "Discord", "MCP", "n8n"],
    content: `# Open-Source: Shopify Discord Agent

An open-source AI agent integrating Shopify store operations directly into Discord via Model Context Protocol (MCP) and n8n workflows.

[ ARCHITECTURE & FEATURES ]
* 28 Store Management Tools: Query real-time inventory counts, customer order histories, revenue metrics, fulfillment queues, and active discount codes directly from Discord channels.
* Autonomous Anomaly Alerts: Pushes webhook notifications for sudden order spikes, low-inventory warnings, and refund anomaly spikes.
* Production Dockerized Setup: Easy single-command container deployment with secure environment variable isolation.
* GraphQL Performance: Direct Shopify Admin GraphQL queries bypassing REST rate limits.

[ REPOSITORY & SOURCE ]
* GitHub: [github.com/Ai-assistant-KIRA/shopify-discord-agent](https://github.com/Ai-assistant-KIRA/shopify-discord-agent)
* License: Open Source (MIT)
* Stack: n8n, Gemini, MCP Protocol, GraphQL, Docker`,
    meta: {
      client: "Open-Source Contribution",
      timeline: "Active Production",
      impact: "28 Store Operations Tools",
      stack: ["n8n", "Gemini", "MCP", "Shopify GraphQL", "Docker"],
      liveUrl: "https://github.com/Ai-assistant-KIRA/shopify-discord-agent",
    },
  },

  "project-n8n-linkedin": {
    id: "project-n8n-linkedin",
    name: "n8n-ai-linkedin-poster.md",
    path: "/projects/n8n-ai-linkedin-poster.md",
    icon: "Layers",
    category: "projects",
    title: "Open-Source · n8n Autonomous Social Content Engine",
    subtitle: "Production-ready n8n workflow generating and publishing AI-driven LinkedIn posts.",
    lastUpdated: "2026-08-25",
    tags: ["OpenSource", "Automation", "n8n", "SocialMedia"],
    content: `# Open-Source: n8n AI LinkedIn Poster

A production-ready autonomous n8n workflow engineered to generate and auto-publish targeted LinkedIn content with AI-rendered visual assets and engaging hooks.

[ ARCHITECTURE & FEATURES ]
* Instant Trigger Architecture: Trigger posts via webhooks, cron schedules, or direct API dispatches from developer environments.
* Vision & Copy Generation: Pairs structured prompt engineering with image rendering pipelines to output complete visual carousels and standalone posts.
* Error-Resilient Delivery: Includes automatic token refresh, rate-limit backoff, and Slack notification on publication success.

[ REPOSITORY & SOURCE ]
* GitHub: [github.com/Ai-assistant-KIRA/n8n-ai-linkedin-poster](https://github.com/Ai-assistant-KIRA/n8n-ai-linkedin-poster)
* License: Open Source (MIT)
* Stack: n8n Workflows, REST API, Webhooks, AI Image Generation`,
    meta: {
      client: "Open-Source Contribution",
      timeline: "Active Production",
      impact: "Fully Automated Content Pipeline",
      stack: ["n8n Workflows", "LinkedIn REST API", "Node.js", "Webhooks"],
      liveUrl: "https://github.com/Ai-assistant-KIRA/n8n-ai-linkedin-poster",
    },
  },

  "project-mugwort-toner": {
    id: "project-mugwort-toner",
    name: "mugwort-calm-toner.md",
    path: "/projects/mugwort-calm-toner.md",
    icon: "Layers",
    category: "projects",
    title: "eCommerce Build · Mugwort Calm Toner DTC Storefront",
    subtitle: "Premium skincare product landing page engineered for mobile speed and high conversion.",
    lastUpdated: "2026-07-15",
    tags: ["eCommerce", "LandingPage", "CRO", "Skincare"],
    content: `# Case Study: Mugwort Calm Toner DTC Landing Page

A bespoke high-converting direct-to-consumer skincare product landing page built from the ground up to maximize mobile checkout velocity.

[ TECHNICAL HIGHLIGHTS ]
* Sub-Second Mobile Load: Engineered without third-party template bloat to ensure Largest Contentful Paint (LCP) under 1.1s on 4G connections.
* Sticky Thumb-Zone Buy Unit: Persistent mobile purchase drawer with instantaneous variant switching and free shipping indicator.
* Interactive Ingredient Breakdown: Custom accordion and visual benefit tabs highlighting botanical active ingredients.
* Micro-Animations: Subtle CSS keyframe entry reveals enhancing tactile feel without bogging down mobile GPU frames.

[ REPOSITORY & PREVIEW ]
* GitHub: [github.com/Ai-assistant-KIRA/mugwort-calm-toner-landing](https://github.com/Ai-assistant-KIRA/mugwort-calm-toner-landing)
* Stack: HTML5, Modern CSS, Responsive JavaScript, CRO UX Architecture`,
    meta: {
      client: "DTC Beauty & Skincare",
      timeline: "2 Weeks Delivery",
      impact: "Sub-second LCP, +28% CVR Lift",
      stack: ["HTML5", "CSS Custom Properties", "JavaScript", "CRO"],
      liveUrl: "https://github.com/Ai-assistant-KIRA/mugwort-calm-toner-landing",
    },
  },

  "project-dtc": {
    id: "project-dtc",
    name: "dtc-brand-scale.md",
    path: "/projects/dtc-brand-scale.md",
    icon: "Layers",
    category: "projects",
    title: "Case Study · Luxury DTC Scale ($350K to $2.4M ARR)",
    subtitle: "Shopify Plus rebuild, server-side attribution, and performance scaling.",
    lastUpdated: "2026-09-01",
    tags: ["CaseStudy", "ShopifyPlus", "Scaling", "CRO"],
    content: `# Case Study: Luxury DTC ($350K to $2.4M ARR)

[ THE CHALLENGE ]
A luxury apparel label was spending $40,000/month on Meta ads with a bloated theme scoring 22/100 on Mobile PageSpeed. Conversion remained stuck at 1.6% due to checkout drop-offs and poor mobile navigation.

[ THE EXECUTION ]
* Rebuilt the storefront on a bespoke Shopify Plus architecture, boosting Mobile PageSpeed to 94/100.
* Deployed AWS Server-Side CAPI to restore attribution signals and improve ad algorithm targeting.
* Engineered a custom slide-out cart drawer with dynamic free shipping thresholds and one-click bundle recommendations.
* Automated customer WhatsApp notifications for order confirmation and shipping updates.

[ THE RESULTS ]
* Conversion rate climbed from 1.6% to 3.8% across paid mobile traffic.
* Annual Run Rate expanded from $350,000 to $2,400,000 in 14 months.
* Average Order Value (AOV) increased by 23% via intelligent cart drawer upsells.`,
    meta: {
      client: "Luxury Apparel Label",
      timeline: "8 Weeks Delivery",
      impact: "+138% CVR Lift, $2.4M ARR",
      stack: ["Shopify Plus", "AWS Server GTM", "Klaviyo", "Meta CAPI"],
    },
  },

  "field-canvas-engine": {
    id: "field-canvas-engine",
    name: "canvas-matrix-engine.md",
    path: "/field-studies/canvas-matrix-engine.md",
    icon: "Terminal",
    category: "field-studies",
    title: "Field Study · Generative ASCII Matrix Canvas",
    subtitle: "Real-time canvas shader rendering matrix rain, cyber glyphs, and interactive cursor waves.",
    lastUpdated: "2026-10-02",
    tags: ["ASCII", "Canvas", "CreativeCoding", "WebGL"],
    content: `# Field Study: Generative ASCII Matrix Canvas

An exploration of high-performance creative coding in the browser, rendering dynamic typography and cursor physics directly via HTML5 Canvas.

[ ARCHITECTURE & HIGHLIGHTS ]
* Virtual Grid: Calculates dynamic character columns and rows based on screen viewport dimensions and device pixel ratio.
* Falling Character Streams: Falling character streams cycle through numeric and structural glyphs with randomized velocities.
* Cursor Physics: Mouse movement registers localized disturbance vectors, displacing adjacent particles radially with spring dampening.
* Zero Asset Overhead: Pure HTML5 Canvas execution running at a solid 60 FPS without external video files or GPU lag.

\`\`\`typescript
// Localized cursor vector disturbance
const dx = (col - cursor.x) * cellWidth;
const dy = (row - cursor.y) * cellHeight;
const distance = Math.hypot(dx, dy);
if (distance < RIPPLE_RADIUS) {
  const force = (1 - distance / RIPPLE_RADIUS) * VELOCITY;
  char.x += Math.cos(angle) * force;
}
\`\`\`

Move your pointer across the canvas to observe real-time particle disturbance and stream velocity reactions.`,
    meta: {
      timeline: "R&D Prototype",
      impact: "Zero GPU lag, 60 FPS across all displays",
      stack: ["HTML5 Canvas", "TypeScript", "Monospace Shaders"],
    },
  },

  "contact": {
    id: "contact",
    name: "contact.md",
    path: "/contact.md",
    icon: "Mail",
    category: "root",
    title: "Contact & Engineering Sprints",
    subtitle: "Let's engineer your brand's next growth milestone.",
    lastUpdated: "2026-10-02",
    tags: ["Contact", "GrowthSprint", "Inquiry"],
    content: `# Contact & Collaborations

Whether you're looking to launch a bespoke Shopify Plus architecture, deploy automated AI operations, or scale paid acquisition without wasting budget, let's talk.

[ DIRECT CHANNELS ]
* Domain: [whoax.com](https://whoax.com)
* Email: [reda@whoax.com](mailto:reda@whoax.com)
* LinkedIn: [linkedin.com/in/reda-alaarabi](https://www.linkedin.com/in/reda-alaarabi/)
* GitHub: [github.com/Ai-assistant-KIRA](https://github.com/Ai-assistant-KIRA)

[ SPRINT AVAILABILITY ]
* Current Status: Accepting 2 growth engineering sprints for Q4 / Q1.
* Format: Fixed-scope 10-day sprints or quarterly dedicated growth partnership.`,
    meta: {
      timeline: "Available Immediately",
      impact: "Direct access to lead engineer",
      liveUrl: "https://whoax.com",
    },
  },
};

export const NAVIGATION_TREE: FolderNode[] = [
  {
    name: "about",
    label: "about",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["operator"],
      PORTFOLIO_FILES["manifesto"],
      PORTFOLIO_FILES["stack"],
    ],
  },
  {
    name: "capabilities",
    label: "capabilities",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["shopify-builds"],
      PORTFOLIO_FILES["ai-automation"],
      PORTFOLIO_FILES["performance-media"],
      PORTFOLIO_FILES["speed-and-cro"],
    ],
  },
  {
    name: "projects",
    label: "projects",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["project-shopify-discord"],
      PORTFOLIO_FILES["project-n8n-linkedin"],
      PORTFOLIO_FILES["project-mugwort-toner"],
      PORTFOLIO_FILES["project-dtc"],
    ],
  },
  {
    name: "field-studies",
    label: "field-studies",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["field-canvas-engine"],
    ],
  },
];
