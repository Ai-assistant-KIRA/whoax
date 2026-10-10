import { PortfolioFile, FolderNode } from "@/types/portfolio";

export const PORTFOLIO_FILES: Record<string, PortfolioFile> = {
  "readme": {
    id: "readme",
    name: "README.md",
    path: "/README.md",
    icon: "FileCode",
    category: "root",
    title: "Reda Alaarabi · whoax.com",
    subtitle: "Senior Web & Systems Engineer. 7 years. Built for business results.",
    lastUpdated: "2026-10-09",
    tags: ["WebDev", "Cloud", "eCommerce", "VoiceAgents", "SEO", "Ads", "APIs"],
    content: `# Reda Alaarabi · whoax.com
If you are running a business or hiring for a senior engineering role, you probably care about two things: does this person build things that actually work, and can they deliver without needing six meetings to change a button color?

I am Reda Alaarabi. I build and maintain $10K-grade agency websites, custom web applications, high-performance eCommerce platforms, and automated voice support systems. Over the last seven years, I have shipped production systems for restaurants, medical clinics, law firms, real estate agencies, flight booking companies, clothing brands, B2B SaaS startups, and high-volume online stores.

[ WHY HIRE ME INSTEAD OF A TRADITIONAL AGENCY ]
* Direct line to the builder: You talk directly to the engineer writing your code and managing your infrastructure. No account managers playing telephone, no junior handoffs, and no three-week ticket queues.
* Full-stack ownership: I build the user interface, write the backend logic, configure the cloud servers, set up the tracking pixels, and make sure your checkout converts. If something breaks on a Saturday, I fix it.
* Built for revenue, not portfolio awards: A pretty website that takes six seconds to load on a smartphone is useless. Every layout, cache rule, and button I build is engineered to load in under a second and get visitors to take action.

[ WHAT I DELIVER ]
* $10K-Grade Agency Websites: High-converting, mobile-first websites for clinics, law firms, restaurants, real estate, flights, and service brands.
* Custom Web Apps & Dashboards: Fast SaaS platforms, internal operations tools, and real-time dashboards with clean role-based permissions.
* Custom Shopify & WooCommerce Plugins: Lightweight plugins built from scratch when off-the-shelf marketplace add-ons slow down your site or conflict with your theme.
* AI Voice & Chat Support Agents: Inbound phone agents that pick up on the first ring, speak with sub-600ms latency, and handle bookings and routine questions so your team stays focused.
* Product Marketing & Creative Campaigns: High-converting creative assets, ad variations, and product launch marketing built with modern generative production workflows.
* Scaled Google & Meta Ads: Search, Shopping, and social campaigns paired with server-side tracking (Meta CAPI and AWS Server GTM) so your ad spend optimizes against verified revenue.
* Local, National & International SEO: Clean technical site architecture, schema markup, and speed optimization that rank on Google and bring in steady organic leads.
* Social Media Management: Strategic audience growth, scheduling, and brand positioning across major networks.
* Custom APIs & MCP Tool Servers: Direct data bridges between CRMs, payment gateways, internal databases, and AI tooling using modern protocols.

[ THE 5 SENIOR ENGINEERING PILLARS ]
1. Cloud Architecture & Infrastructure Engineering (DevOps / SRE): High availability on AWS, automated Docker CI/CD pipelines, zero-downtime deployments, and real-time monitoring.
2. Enterprise Security, Privacy & Compliance: Data protection, input sanitization, TLS encryption, GDPR compliance, and clean access control built in from day one.
3. Scalable Data Architecture & High-Throughput Backends: PostgreSQL schemas, Redis caching, and resilient REST/GraphQL APIs engineered to handle sudden traffic surges without choking.
4. Rigorous Software Testing & Technical Debt Control: Clean TypeScript, unit and integration test coverage, and modular code that your team can maintain five years from now.
5. Product Sense, Ownership & Cross-Functional Teamwork: I communicate in plain English, think in terms of customer retention and profit margins, and collaborate smoothly with design, marketing, and operations.

[ PROVEN NUMBERS ]
* 94/100 Mobile PageSpeed achieved on custom commerce rebuilds, cutting mobile load times to under 1.2 seconds.
* $2.4M ARR scaled on a high-volume apparel platform by rebuilding the custom theme and optimizing checkout flow.
* Sub-600ms roundtrip response time on automated voice telephony agents.
* Over $400K in client ad spend managed with server-side tracking recovering 30%+ of dropped browser signals.
* 7+ years of hands-on delivery across ten distinct business industries.

[ HOW TO EXPLORE ]
Browse the sidebar on the left. The /about folder explains how I operate, /capabilities breaks down each service area, /projects contains documented case studies, and contact.md gets you in touch directly.`,
    meta: {
      timeline: "2018 — Present",
      impact: "94/100 PageSpeed · $2.4M ARR · Sub-600ms Voice Latency",
      stack: ["Next.js", "TypeScript", "Shopify Plus", "WooCommerce", "AWS", "Twilio", "PostgreSQL"],
      liveUrl: "https://whoax.com",
      videoPreview: {
        src: "/portfolio-intro.mp4",
        title: "70-Second Executive Video Briefing",
        durationSec: 70,
      },
    },
  },

  "intro-video": {
    id: "intro-video",
    name: "INTRO_VIDEO.mp4",
    path: "/INTRO_VIDEO.mp4",
    icon: "Video",
    category: "root",
    title: "Executive Video Dispatch · whoax.com",
    subtitle: "70-second high-impact overview for business owners, founders, and hiring executives.",
    lastUpdated: "2026-10-10",
    tags: ["Video", "ExecutiveOverview", "Cyberpunk", "EpidemicSound", "GSAP"],
    content: `# Executive Video Dispatch · whoax.com
70-second high-impact briefing for business owners and recruitment teams. Built to show how bespoke engineering accelerates revenue.

[ 8 STRATEGIC VIDEO CHAPTERS ]
* Chapter 01 (00:00) — Audit Competitor Revenue Loss: Slow websites and missed calls cost businesses millions in lost conversion.
* Chapter 02 (00:08) — Identity & 7-Year Track Record: Engineering bespoke digital platforms that dominate markets and scale revenue.
* Chapter 03 (00:17) — Agency Bloat vs Custom Execution: Why $30K bloated templates scare buyers away, and how custom lightweight engines double conversion.
* Chapter 04 (00:27) — E-Commerce at Multi-Million Dollar Scale: High-volume storefronts, sub-second TTFB, and zero downtime under flash sales.
* Chapter 05 (00:37) — Inbound 24/7 AI Voice Telephony: First-ring pick-up, automated qualification, and live calendar locking.
* Chapter 06 (00:46) — The Proof Ledger: 42+ bespoke systems deployed with zero middle-management excuses.
* Chapter 07 (00:54) — The 2026 Competitive Moat: Outpacing competitors with authentic engineering over generic AI slop.
* Chapter 08 (01:02) — Direct Founder Dispatch: Ready to scale? Contact directly at reda@whoax.com.

[ PRODUCTION SPECIFICATIONS ]
* Video Engine: Remotion + GSAP 3.12 (Frame-accurate microsecond tickers & physics easing)
* Soundtrack: Epidemic Sound "Dark Console" (130 BPM Cyberpunk Darksynth with dynamic ducking)
* Voiceover: Paul (Epidemic Sound US Male)
* Resolution & Frame Rate: 1080p Full HD @ 30 FPS (2,100 frames total)
* Design Language: Everforest Terminal System (Matching whoax.com)`,
    meta: {
      timeline: "70.00 Seconds · 1080p @ 30 FPS",
      impact: "42+ Systems Deployed · Zero Agency Overhead · Direct Senior Execution",
      stack: ["Remotion", "GSAP", "Epidemic Sound", "H.264", "TypeScript"],
      videoPreview: {
        src: "/portfolio-intro.mp4",
        title: "70-Second Executive Video Briefing",
        durationSec: 70,
      },
      liveUrl: "https://whoax.com",
    },
  },

  "operator": {
    id: "operator",
    name: "the-operator.md",
    path: "/about/the-operator.md",
    icon: "FileText",
    category: "about",
    title: "The Operator",
    subtitle: "One engineer. Full accountability. Real customer empathy.",
    lastUpdated: "2026-10-09",
    tags: ["Background", "Experience", "CustomerSupport", "Delivery"],
    content: `# The Operator

Most hiring managers and business owners are used to the agency cycle: you meet an executive, sign a contract, and then find out your project was handed off to junior freelancers working through a checklist. When your store slows down or your tracking breaks, everyone points fingers at someone else.

I work as a single accountable senior engineer. When we work together, I handle the architecture, write the code, configure the servers, set up the tracking, and ensure your system performs in production.

[ REAL CUSTOMER SUPPORT EXPERIENCE ]
A lot of engineers write code in a vacuum without knowing how real customers behave. In addition to technical engineering, I have spent hundreds of hours handling frontline customer support through phone, email, and live chat for active businesses.

That direct customer experience shapes every line of code I write:
* I know how quickly a customer abandons a checkout if a form asks for unnecessary information.
* I know the exact questions callers ask when they ring your front desk fifty times a day.
* I know how frustrating a broken mobile layout feels to someone trying to book a clinic appointment from their car.
* When I build a voice agent, a chat interface, or a checkout flow, I design it for real humans under time pressure, not a theoretical user in a slide deck.

[ HOW WORKING TOGETHER WORKS ]
* No translation layers: You explain your business goals, and I translate them directly into production code and cloud architecture.
* Fast turnaround: Because I do not have six layers of middle management, a feature that takes an agency three weeks often takes me two days.
* Transparent communication: You get direct progress updates, clean staging previews, and honest assessments of what technical choices will generate the highest return on investment.

[ INDUSTRIES SERVED ]
Medical clinics, dental offices, law firms, fine dining restaurants, fast-casual hospitality, flight booking services, real estate brokerages, fashion and apparel brands, B2B SaaS platforms, and local service providers.

Seven years of shipping. Every layer of the system covered. One person accountable for the outcome.`,
    meta: {
      timeline: "2018 — Present",
      impact: "Direct engineering delivery across 10+ industries",
      stack: ["Next.js", "Shopify Plus", "WooCommerce", "Node.js", "AWS", "Twilio", "Docker"],
    },
  },

  "disciplines": {
    id: "disciplines",
    name: "engineering-disciplines.md",
    path: "/about/engineering-disciplines.md",
    icon: "Cpu",
    category: "about",
    title: "The 5 Engineering Disciplines",
    subtitle: "How senior technical practices protect your business and prevent downtime.",
    lastUpdated: "2026-10-09",
    tags: ["DevOps", "Security", "Architecture", "Testing", "Product"],
    content: `# The 5 Engineering Disciplines

Whether you are an engineering director reviewing my technical qualifications or a business owner evaluating why you should trust me with your core platform, these five disciplines guide everything I ship.

[ 01 / CLOUD ARCHITECTURE & INFRASTRUCTURE ENGINEERING (DevOps / SRE) ]
* What this means for your business: Your website does not crash when your ad campaign goes viral or traffic surges on Black Friday. Your code deploys smoothly in the background without taking down checkout.
* Technical implementation: AWS cloud services (EC2, S3, CloudFront, Lambda, SES), Docker containerization, automated GitHub Actions CI/CD pipelines, SSL/TLS automation, health checks, and rapid rollback procedures.

[ 02 / ENTERPRISE SECURITY, PRIVACY & COMPLIANCE ]
* What this means for your business: Your customer records stay safe, your payment flows remain airtight, and your company stays fully compliant with modern privacy laws (GDPR, CCPA).
* Technical implementation: Input sanitization across all forms and API boundaries, strict environment secret isolation, role-based access control (RBAC), database encryption at rest, secure webhook signature verification, and regular dependency vulnerability scanning.

[ 03 / SCALABLE DATA ARCHITECTURE & HIGH-THROUGHPUT BACKENDS ]
* What this means for your business: Your platform runs just as fast with 100,000 customers as it did with 100. Product searches, booking calendars, and customer dashboards load instantly instead of stalling.
* Technical implementation: Relational PostgreSQL schemas with optimized indexes, Redis in-memory caching for hot queries, efficient pagination, and resilient REST and GraphQL APIs that handle concurrent traffic gracefully.

[ 04 / RIGOROUS SOFTWARE TESTING & TECHNICAL DEBT CONTROL ]
* What this means for your business: Adding a new promotion, booking option, or feature today will not accidentally break your checkout tomorrow. Other developers can read, maintain, and extend the codebase with confidence.
* Technical implementation: Automated unit and integration test suites, strict TypeScript types to eliminate runtime crashes, modular component design, clean documentation, and disciplined refactoring that prevents technical debt from accumulating.

[ 05 / PRODUCT SENSE, OWNERSHIP & CROSS-FUNCTIONAL TEAMWORK ]
* What this means for your business: You get an engineer who cares about your profit margins, user retention, and business goals, rather than someone who just writes code blindly from a ticket.
* Technical implementation: Seamless collaboration with founders, designers, marketers, and operations staff. Plain-English communication, proactive bottleneck identification, and total ownership of the final user experience from first click to final conversion.`,
    meta: {
      impact: "High availability · Zero data leaks · Maintainable codebases",
      stack: ["AWS", "Docker", "PostgreSQL", "Redis", "TypeScript", "Jest", "CI/CD"],
    },
  },

  "philosophy": {
    id: "philosophy",
    name: "philosophy.md",
    path: "/about/philosophy.md",
    icon: "FileText",
    category: "about",
    title: "Why This Site Looks Like a Terminal",
    subtitle: "Real engineering beats template fluff every single time.",
    lastUpdated: "2026-10-09",
    tags: ["Philosophy", "Craft", "Performance"],
    content: `# Why This Site Looks Like a Terminal

Open ten agency or developer portfolios right now. You will see the exact same thing: a stock video of someone smiling at a laptop, a purple gradient background, and generic buzzwords promising "synergistic digital transformation." Most of those websites were built with a visual page builder that takes five seconds to load and breaks on mobile.

I built this portfolio as an interactive terminal running a custom 60 FPS canvas engine in TypeScript. The layout has zero bloated libraries and zero template filler. It works as an immediate proof of engineering skill: when everyone else presents generic templates, showing up with custom code and clean typography speaks for itself.

[ MY WORKING PRINCIPLES ]
* Speed is revenue: Every 100 milliseconds of mobile load time directly impacts conversion rates. If your customer has to stare at a loading screen, they leave and buy from your competitor. I build fast systems by default.
* Accurate measurement before ad spend: Pumping thousands of dollars into Google or Meta ads without server-side tracking is like driving with your headlights off. We fix tracking first so the ad algorithms optimize on real purchase data.
* One accountable owner: Projects involving four different agencies always fail the same way: nobody takes responsibility when metrics drop. I take ownership of the whole pipeline.
* Practical tools over trendy hype: A clean, custom WordPress or Next.js build beats an over-complicated microservice architecture that requires four engineers to keep running. I pick the right tool for your specific business size and budget.
* Security is structural: Protecting customer data and securing API endpoints is not something you bolt on after launch. It is built into the architecture from day one.

[ THE BOTTOM LINE ]
This site is a filter. If you value clean execution, fast performance, and direct communication, we will work together very well.`,
    meta: {
      impact: "60 FPS native canvas · Zero bloated libraries · Direct results",
      stack: ["HTML5 Canvas", "TypeScript", "Monospace", "Clean Execution"],
    },
  },

  "stack": {
    id: "stack",
    name: "stack-and-ops.md",
    path: "/about/stack-and-ops.md",
    icon: "Cpu",
    category: "about",
    title: "Stack & Tooling",
    subtitle: "The battle-tested technologies I ship with across all disciplines.",
    lastUpdated: "2026-10-09",
    tags: ["Stack", "Tools", "Infrastructure", "DevOps"],
    content: `# Stack & Tooling

I select technologies based on stability, speed, and long-term maintainability for clients, not personal vanity.

[ WEBSITES & FRONTEND ]
* Frameworks: Next.js App Router, React, TypeScript, WordPress, Shopify Liquid, vanilla HTML5/CSS3.
* Styling & Motion: Tailwind CSS, CSS Custom Properties, Framer Motion, performant canvas animations.
* Performance: Core Web Vitals optimization, critical CSS inlining, Cloudflare edge caching, responsive SVG graphics.

[ WEB APPS, SAAS & DASHBOARDS ]
* Backend: Node.js, Express, Python, PostgreSQL, Supabase, Redis.
* Frontend State: React Query, Zustand, TypeScript, modular components.
* Operational Dashboards: Custom metrics views, secure WebSockets, role-based access control, automated report generation.

[ CLOUD, DEVOPS & SECURITY ]
* Cloud Infrastructure: AWS (EC2, S3, CloudFront, Lambda, SES), Vercel, Railway, Render.
* DevOps & CI/CD: Docker containers, GitHub Actions automated workflows, environment secret segregation, uptime health checks.
* Security: Input validation, HTTPS/TLS encryption, RBAC permissions, GDPR/CCPA data handling, automated vulnerability scans.

[ CUSTOM PLUGINS & API WORK ]
* Shopify: Custom app extensions, theme extensions, Polaris admin UI, Storefront and Admin GraphQL APIs.
* WooCommerce: Custom PHP plugins, action hooks, payment gateway integrations, automated order flows.
* Integrations: REST APIs, GraphQL, webhook consumers, custom Model Context Protocol (MCP) tool servers.

[ MARKETING, ADS & SEO ]
* SEO: Technical site audits, structured schema markup, international hreflang, local Google Business optimization.
* Paid Media: Google Ads (Search, Shopping, Performance Max), Meta Ads (Facebook & Instagram campaigns, creative testing).
* Tracking: AWS Server-Side Google Tag Manager, Meta Conversions API (CAPI), Google Analytics 4, BigQuery, Looker Studio.

[ VOICE & CHAT SUPPORT SYSTEMS ]
* Voice Telephony: Twilio SIP trunking, Deepgram real-time speech recognition, ElevenLabs voice synthesis, LiveKit WebRTC (sub-600ms latency).
* Chat Automation: Multi-channel chat agents for website, WhatsApp, and email with direct CRM and database lookups.`,
    meta: {
      impact: "Full-stack coverage · Zero technical debt · Production hardened",
      stack: ["Next.js", "Node.js", "TypeScript", "Shopify", "WooCommerce", "AWS", "Twilio", "PostgreSQL"],
    },
  },

  "websites-and-apps": {
    id: "websites-and-apps",
    name: "websites-and-apps.md",
    path: "/capabilities/websites-and-apps.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Websites, Web Apps & Dashboards",
    subtitle: "$10K-grade digital platforms that turn visitors into paying customers.",
    lastUpdated: "2026-10-09",
    tags: ["WebDev", "WebApps", "SaaS", "Dashboards"],
    content: `# Websites, Web Apps & Dashboards

Your website is either actively generating revenue and bookings for your business, or it is an expensive digital paperweight. Most businesses struggle with websites that load slowly, look clunky on phones, and require a support ticket just to change an address or phone number.

I build $10K-grade agency websites, custom web applications, SaaS platforms, and internal operational dashboards that load in under 1.2 seconds and convert visitors into clients.

[ TAILORED FOR YOUR INDUSTRY ]
* Medical Clinics & Dental Offices: Patient appointment booking that connects directly to your calendar, online intake forms, and clean mobile layouts that build immediate trust.
* Law Firms & Legal Practices: Authoritative, high-speed websites with confidential intake forms, practice area showcases, and local search dominance.
* Fine Dining & Restaurants: Mobile menus that open instantly without forcing customers to download a 40MB PDF on cellular data, direct table reservations, and location directions.
* Real Estate Brokerages: High-speed property listings, instant search filtering, high-resolution photo galleries, and direct lead routing to agents.
* Flight Companies & Travel: Instant search interfaces, booking workflows, and clear flight schedule displays.
* Clothing & Lifestyle Brands: Clean visual storefronts with fast product galleries, sticky purchase drawers, and smooth checkout flows.

[ WEB APPS & OPERATIONAL DASHBOARDS ]
Beyond marketing sites, I build agency-grade web apps and internal SaaS dashboards:
* Custom SaaS platforms with user authentication, subscription billing, and database architecture.
* Operational dashboards where your team can view sales, inventory, bookings, and support metrics in real time.
* Role-based permissions so team members see only the data relevant to their job.

[ PRODUCTION STANDARDS ]
Every website and app is built on clean, modular code with sub-1.2 second load times on mobile, 90+ Lighthouse scores, and automated backups. You get full documentation and training so your team can make everyday updates without needing me on call.`,
    meta: {
      impact: "Sub-1.2s mobile load · 90+ Lighthouse score · All industries",
      stack: ["Next.js", "React", "TypeScript", "WordPress", "Tailwind CSS", "Node.js", "PostgreSQL"],
    },
  },

  "ecommerce-and-plugins": {
    id: "ecommerce-and-plugins",
    name: "ecommerce-and-plugins.md",
    path: "/capabilities/ecommerce-and-plugins.md",
    icon: "Cpu",
    category: "capabilities",
    title: "eCommerce & Custom Plugins",
    subtitle: "Custom Shopify Plus and WooCommerce stores engineered to maximize checkout conversion.",
    lastUpdated: "2026-10-09",
    tags: ["Shopify", "WooCommerce", "Plugins", "eCommerce"],
    content: `# eCommerce & Custom Plugins

Most struggling online stores have the same root problem: they have installed thirty different third-party apps from app stores. Every app injects slow tracking scripts, adds monthly subscription costs, and introduces bugs that break the checkout flow.

I solve this by building custom themes and custom plugins that handle your specific business logic natively, keeping your store fast, secure, and lean.

[ CUSTOM SHOPIFY PLUS DEVELOPMENT ]
* Custom theme builds from the ground up: zero commercial theme bloat, native speed, and complete design control.
* Conversion-focused cart drawers: slide-out carts with live free-shipping progress bars, variant selectors, bundle upsells, and one-click checkout.
* Custom Shopify app extensions and Polaris admin tools for internal operations and fulfillment teams.
* Storefront and Admin GraphQL integrations for fast data queries and headless storefronts.

[ CUSTOM WOOCOMMERCE & WORDPRESS PLUGINS ]
* Custom PHP plugins built specifically for your store when standard marketplace add-ons do not meet your requirements.
* Payment gateway integrations, custom shipping rules, dynamic tiered pricing, and specialized tax calculations.
* Database query optimization and Redis object caching so your WooCommerce store handles thousands of products without slowing down.

[ WHY CUSTOM PLUGINS MATTER FOR YOUR BOTTOM LINE ]
* Eliminates monthly recurring app fees from third-party app stores.
* Improves mobile page speed from the 20s to the 90s, which directly increases conversion rates.
* Prevents plugin conflicts that cause carts to fail or orders to drop during peak shopping periods.

[ THE NUMBERS ]
On a recent commerce rebuild, replacing bloated third-party apps with a custom theme and native cart logic lifted mobile PageSpeed from 22 to 94, improved checkout conversion from 1.6% to 3.8%, and helped scale annual revenue from $350K to $2.4M in 14 months.`,
    meta: {
      impact: "+138% CVR · 94/100 PageSpeed · $2.4M ARR Scaled",
      stack: ["Shopify Liquid", "Shopify GraphQL API", "PHP", "WooCommerce", "Tailwind CSS", "Stripe"],
    },
  },

  "voice-and-chat-agents": {
    id: "voice-and-chat-agents",
    name: "voice-and-chat-agents.md",
    path: "/capabilities/voice-and-chat-agents.md",
    icon: "PhoneCall",
    category: "capabilities",
    title: "Voice & Chat Support Agents",
    subtitle: "Your phones get answered on the first ring. Your support ticket volume drops 70%.",
    lastUpdated: "2026-10-09",
    tags: ["VoiceAgents", "ChatAgents", "CustomerSupport", "Telephony"],
    content: `# Voice & Chat Support Agents

Think about the twenty most common phone calls and chat messages your business receives every single day.
"What are your hours today?"
"Can I book an appointment for Thursday?"
"Where is my order?"
"Do you accept my insurance?"
"What are your prices?"

Your front desk or support staff spends four to six hours every day repeating the exact same answers. That wastes valuable staff time, creates long hold queues, and causes after-hours callers to hang up and call your competitor.

I build professional voice agents that answer your phone lines instantly and chat agents that resolve questions on your website or WhatsApp around the clock.

[ PROFESSIONAL VOICE AGENTS ]
* Instant phone pickup: Answers on the very first ring, 24/7/365. No busy signals, no hold music, and no missed opportunities after business hours.
* Natural human conversation: Operates with sub-600ms latency. The caller experiences natural conversation without the awkward three-second robotic delay common in amateur setups.
* Real actions: Checks availability, books appointments into your calendar, looks up order tracking numbers, and sends SMS confirmation links directly to the caller's phone.
* Smart escalation: If a caller has an urgent or highly sensitive issue, the agent immediately transfers the call to a human staff member with context.
* Telephony stack: Twilio SIP, Deepgram for real-time speech-to-text, ElevenLabs for voice synthesis, and LiveKit WebRTC.

[ AI CHAT SUPPORT AGENTS ]
* Multi-channel support: Deployed directly on your website, WhatsApp, or email inbox.
* Resolves 70%+ of routine customer inquiries without requiring human staff intervention.
* Trained on your exact business policies, pricing tiers, services, and brand tone.
* Grounded in real customer support experience: Because I have personally handled customer support across phone, chat, and email, I design conversational flows that de-escalate tension and solve problems quickly.

[ WHO BENEFITS MOST ]
Medical clinics, dental practices, law firms, fine dining restaurants, real estate agencies, flight booking services, service contractors, and high-volume online stores.`,
    meta: {
      impact: "Sub-600ms voice latency · 70% routine inquiry resolution · Zero hold queues",
      telephony: "Twilio SIP + Deepgram + ElevenLabs",
      latency: "Sub-600ms Roundtrip",
      stack: ["Twilio", "Deepgram", "ElevenLabs", "LiveKit WebRTC", "Node.js", "Python"],
      audioSample: {
        callerText: "Hi, I need to check if my booking for tomorrow at 2 PM is confirmed, and what documents I should bring.",
        agentText: "You are all set for 2:00 PM tomorrow. Please bring a valid government ID and your confirmation number. I just sent the check-in details to your phone via SMS.",
        durationSec: 12,
      },
    },
  },

  "marketing-seo-and-ads": {
    id: "marketing-seo-and-ads",
    name: "marketing-seo-and-ads.md",
    path: "/capabilities/marketing-seo-and-ads.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Product Marketing, Ads & SEO",
    subtitle: "High-impact creative campaigns, scaled ad accounts, and rankings that produce paying clients.",
    lastUpdated: "2026-10-09",
    tags: ["Marketing", "GoogleAds", "MetaAds", "SEO", "Attribution"],
    content: `# Product Marketing, Ads & SEO

Marketing and technical engineering are not separate disciplines. The best ad campaigns in the world will fail if the landing page takes four seconds to load or if your tracking pixels miss 30% of actual sales. I connect marketing strategy with technical execution to drive measurable business growth.

[ PRODUCT MARKETING & CREATIVE CAMPAIGNS ]
* Agency-grade creative direction for physical products, services, and software brands.
* Modern generative production workflows: producing high-resolution product photography, video concepts, and ad variants quickly without $25,000 agency studio fees.
* High-converting landing page design that matches ad messaging directly to on-page offers.

[ GOOGLE & META ADS MANAGEMENT ]
* Google Ads: High-intent Search campaigns, Google Shopping feed architecture, and Performance Max campaigns with disciplined negative keyword filtering.
* Meta Ads: Facebook and Instagram campaign structuring, audience segmentation, creative testing cycles, and retargeting flows.
* Budget scaling: Reallocating spend toward proven creative assets and managing frequency to prevent ad fatigue.

[ THE SERVER-SIDE TRACKING ADVANTAGE ]
Most business ad accounts are losing money because their tracking is broken. Browser pixels on modern smartphones miss up to 35% of purchases due to iOS privacy measures and ad blockers. When your ad platform only sees a fraction of your sales, its algorithm optimizes against incomplete data.

I solve this by deploying server-side Meta Conversions API (CAPI) and Google Tag Manager on AWS. Purchase data routes directly from your server to the ad platform with full encryption. The ad algorithms receive 100% of purchase signals, enabling them to find higher-value buyers at a lower cost per acquisition. Over $400K in client ad spend has been managed through this infrastructure.

[ PROFESSIONAL SEO (LOCAL, NATIONAL & INTERNATIONAL) ]
* Local SEO: Google Business Profile optimization, local citations, and geo-targeted pages that rank medical clinics, law firms, and restaurants in local map packs.
* Technical SEO: Clean schema markup, crawl budget optimization, multilingual hreflang architecture, and Core Web Vitals compliance.
* Content Architecture: Structuring service pages so Google understands your expertise and ranks your site above competitors.

[ SOCIAL MEDIA MANAGEMENT ]
* Strategic account growth, content planning, and scheduling across Instagram, TikTok, LinkedIn, and Facebook.
* Audience engagement and brand positioning that turns followers into qualified leads.`,
    meta: {
      impact: "$400K+ Ad Spend Managed · +30% Signal Recovery · Top Local & National Rankings",
      stack: ["Server GTM", "Meta CAPI", "Google Ads", "AWS", "BigQuery", "Looker Studio"],
    },
  },

  "api-and-mcp-integrations": {
    id: "api-and-mcp-integrations",
    name: "api-and-mcp-integrations.md",
    path: "/capabilities/api-and-mcp-integrations.md",
    icon: "Layers",
    category: "capabilities",
    title: "API Integrations & Custom MCP Servers",
    subtitle: "Connecting disconnected business tools into reliable, automated systems.",
    lastUpdated: "2026-10-09",
    tags: ["API", "Integration", "MCP", "Webhooks", "Backend"],
    content: `# API Integrations & Custom MCP Servers

Most businesses waste dozens of hours every week because their core tools do not talk to each other. Your website bookings do not sync with your internal calendar. Your online store does not update your warehouse stock. Your team is stuck manually exporting spreadsheets and copying data from one screen to another.

I build custom APIs, webhook listeners, and tool integrations that connect any platform to any platform reliably.

[ WHAT I BUILD ]
* Third-Party System Integrations: Connecting payment processors (Stripe, PayPal), CRMs (HubSpot, Salesforce), shipping providers, booking engines, and accounting platforms.
* Custom REST & GraphQL Endpoints: Building secure, documented APIs for your mobile applications, internal dashboards, and external partners.
* Real-Time Webhook Pipelines: Event-driven workflows that react immediately when an order is placed, an appointment is booked, or a form is submitted.
* Custom Model Context Protocol (MCP) Servers: Building specialized MCP servers that allow modern AI agents to interact safely with your internal databases and business tools.
* Process Automation: Replacing repetitive manual data entry with background workers that run reliably with automated retry logic and alerting.

[ RELIABILITY & PRODUCTION STANDARDS ]
* Full error handling with automatic retry queues so a temporary network hiccup never loses customer data.
* Webhook signature verification and encrypted API credentials for complete security.
* Clear documentation so any technical team member can inspect how data flows through the system.

[ REAL EXAMPLES ]
* Storefront to warehouse synchronization: Bi-directional inventory updates with automatic anomaly alerts.
* Custom store operations tool wired into team chat: 28 live commands to query inventory, revenue, and fulfillment without logging into admin portals.
* Server-side conversion routing: Secure event pipelines delivering verified transaction records directly to ad platform endpoints.`,
    meta: {
      impact: "Zero manual data re-entry · 100% data consistency · Automated failover",
      stack: ["Node.js", "TypeScript", "Python", "REST", "GraphQL", "Webhooks", "MCP Protocol"],
    },
  },

  "project-ecommerce": {
    id: "project-ecommerce",
    name: "high-volume-ecommerce.md",
    path: "/projects/high-volume-ecommerce.md",
    icon: "Layers",
    category: "projects",
    title: "Case Study · High-Volume Commerce Rebuild",
    subtitle: "Rebuilding a luxury apparel platform from 22 to 94 PageSpeed and scaling to $2.4M ARR.",
    lastUpdated: "2026-10-09",
    tags: ["CaseStudy", "ShopifyPlus", "eCommerce", "Performance"],
    content: `# Case Study: High-Volume Commerce Rebuild

[ THE SITUATION ]
A growing luxury apparel brand was spending heavily on customer acquisition, but their online store was struggling under technical bloat. The site relied on a commercial template loaded down with over twenty-five third-party apps. Mobile page load took over five seconds, the Google PageSpeed score was 22 out of 100, and checkout conversion hovered at 1.6%.

Every extra second of load time was costing them real buyers at the final payment step.

[ WHAT I DID ]
1. Built a Custom Theme from Scratch:
   Replaced the bloated commercial template with a custom Shopify Plus theme. Handled features like variant pickers, currency switching, and size recommendations natively in clean Liquid and JavaScript without third-party app scripts. Mobile PageSpeed jumped from 22 to 94.

2. Engineered a Custom Slide-Out Cart:
   Created a custom cart drawer featuring a dynamic free-shipping progress indicator, product bundle recommendations, and a streamlined one-click checkout transition.

3. Deployed AWS Server-Side Meta Conversions API:
   Configured server-side event routing on AWS to bypass browser tracking loss. Restored 32% of previously lost purchase signals, giving the ad algorithms the data needed to target high-intent buyers.

4. Automated Operational Notifications:
   Set up automated SMS and email notifications for order confirmations and tracking updates, reducing inbound "where is my order" support questions.

[ THE RESULTS ]
* Mobile PageSpeed: 22 → 94 / 100
* Mobile Checkout Conversion: 1.6% → 3.8%
* Average Order Value: +23% lift
* Annual Run Rate: Scaled from $350K to $2.4M in 14 months

Same product line. Consistent ad budget. Just a properly engineered store that made buying frictionless.`,
    meta: {
      client: "Luxury Apparel Brand",
      timeline: "14 months",
      impact: "+138% Conversion Lift · $2.4M ARR · 94/100 PageSpeed",
      stack: ["Shopify Plus", "Liquid", "AWS Server GTM", "Meta CAPI", "JavaScript"],
    },
  },

  "project-voice": {
    id: "project-voice",
    name: "voice-support-pipeline.md",
    path: "/projects/voice-support-pipeline.md",
    icon: "PhoneCall",
    category: "projects",
    title: "Case Study · Automated Voice & Telephony Pipeline",
    subtitle: "Answering phone inquiries with sub-600ms latency and reducing staff call volume by 68%.",
    lastUpdated: "2026-10-09",
    tags: ["CaseStudy", "VoiceAgent", "Telephony", "Support"],
    content: `# Case Study: Automated Voice & Telephony Pipeline

[ THE SITUATION ]
A multi-location service business was receiving over 120 phone calls every day. The front-desk team was spending more than four hours daily answering the exact same set of questions: confirming clinic hours, rescheduling appointments, and explaining service pricing.

During peak afternoon hours, callers were placed on long holds or sent to voicemail. Over 25% of after-hours callers hung up without leaving a message, costing the business dozens of potential client bookings each week.

[ WHAT I DID ]
1. Engineered an Inbound Voice Telephony Agent:
   Connected Twilio SIP trunking to Deepgram for real-time speech-to-text and ElevenLabs for natural human voice synthesis. Tuned the audio streaming pipeline using WebRTC to achieve a sub-600ms roundtrip response time. Callers heard an immediate, natural response without robotic hesitation.

2. Direct Calendar & Database Integration:
   Wired the voice agent directly into the company's scheduling software via secure REST APIs. When a caller asks to book or reschedule, the agent checks live availability, reserves the slot, and sends an immediate SMS confirmation to the caller's mobile device.

3. Seamless Human Escalation:
   Programmed intelligent fallback triggers. If a caller expresses distress or has a complex inquiry requiring professional consultation, the call transfers immediately to an on-duty staff member with caller background notes displayed on their screen.

[ THE RESULTS ]
* 68% of routine inbound calls resolved completely without front-desk staff intervention.
* Sub-600ms average conversational response latency.
* 100% of after-hours and weekend calls answered immediately on the first ring.
* Over 15 hours of staff time saved each week, allowing the front desk to focus on in-person clients.`,
    meta: {
      client: "Multi-Location Service Group",
      timeline: "3 weeks to deployment",
      impact: "68% Call Volume Deflected · Sub-600ms Latency · Zero Missed Calls",
      telephony: "Twilio SIP + Deepgram + ElevenLabs",
      latency: "Sub-600ms Roundtrip",
      stack: ["Twilio", "Deepgram", "ElevenLabs", "LiveKit WebRTC", "Node.js", "REST APIs"],
    },
  },

  "project-shopify-discord": {
    id: "project-shopify-discord",
    name: "shopify-discord-agent.md",
    path: "/projects/shopify-discord-agent.md",
    icon: "Layers",
    category: "projects",
    title: "Open Source · Shopify Store Operations Monitor",
    subtitle: "28 live operations tools piped directly into Discord via GraphQL and Docker.",
    lastUpdated: "2026-10-09",
    tags: ["OpenSource", "Shopify", "Discord", "GraphQL", "Docker"],
    content: `# Open Source: Shopify Store Operations Monitor

Most eCommerce operators check their store numbers by constantly opening browser tabs and refreshing dashboards. Switching between inventory spreadsheets, order queues, and team chat creates friction and delays urgent decisions.

I built and open-sourced a full operations monitor that brings store intelligence directly into team chat.

[ WHAT IT DOES ]
* 28 Live Operational Commands: Query current stock counts, order queues, gross revenue, refund spikes, and active discounts directly from chat commands.
* Automated Incident Alerts: Sends instant alerts if an item drops below reorder thresholds or if an unusually high refund rate is detected.
* Direct Shopify Admin GraphQL Integration: Bypasses REST API rate limits and queries live store data with minimal latency.
* Dockerized Deployment: Packaged in a lightweight Docker container for one-command deployment to any cloud server or VPS.

[ WHY OPERATORS USE IT ]
Instead of paying for multiple third-party SaaS dashboard subscriptions or giving full admin access to every team member, operators can check store status from the same chat app where they already collaborate.

[ REPOSITORY & CODE ]
* GitHub: [github.com/Ai-assistant-KIRA/shopify-discord-agent](https://github.com/Ai-assistant-KIRA/shopify-discord-agent)
* License: MIT
* Technology: Node.js, TypeScript, Shopify Admin GraphQL API, Docker`,
    meta: {
      client: "Open-Source Community",
      timeline: "Active & Maintained",
      impact: "28 automated store tools · Zero SaaS subscription cost",
      stack: ["Node.js", "TypeScript", "Shopify GraphQL", "Docker"],
      liveUrl: "https://github.com/Ai-assistant-KIRA/shopify-discord-agent",
    },
  },

  "project-api-integrations": {
    id: "project-api-integrations",
    name: "api-and-integrations.md",
    path: "/projects/api-and-integrations.md",
    icon: "Layers",
    category: "projects",
    title: "Systems Case · Enterprise API & MCP Tool Server",
    subtitle: "Connecting distributed business tools and enabling secure AI agent workflows.",
    lastUpdated: "2026-10-09",
    tags: ["API", "MCP", "Webhooks", "Architecture", "Backend"],
    content: `# Systems Case: Enterprise API & MCP Tool Server

[ THE CHALLENGE ]
A growing company used three separate platforms: a customer CRM, a custom billing portal, and an inventory management system. Because these systems were completely disconnected, staff spent hours manually copying customer orders into spreadsheets, which led to frequent shipping delays and billing discrepancies.

They also wanted to enable modern AI tools to answer questions about customer accounts and inventory without exposing raw database credentials.

[ THE SOLUTION ]
1. Unified API Gateway in Node.js & TypeScript:
   Engineered a central REST and GraphQL service that synchronized customer data and inventory levels in real time across all three platforms.

2. Webhook Event Bus with Automatic Retries:
   Built a webhook listener with cryptographic signature verification and exponential backoff retries. If an external service experienced brief downtime, transactions queued safely and processed automatically upon recovery.

3. Custom Model Context Protocol (MCP) Server:
   Built a secure MCP server exposing controlled business tools. Team members can now query inventory levels, check order histories, and generate summaries using natural language in their AI assistant without direct database access.

[ THE OUTCOME ]
* Eliminated manual data re-entry, saving the operations team over 20 hours each week.
* 100% data consistency across billing, CRM, and inventory databases.
* Secure, role-restricted AI tool access with audit logs on every request.`,
    meta: {
      client: "Enterprise Services Client",
      timeline: "4 weeks",
      impact: "Zero manual data sync · 100% data consistency · Secure MCP tools",
      stack: ["Node.js", "TypeScript", "REST", "GraphQL", "Webhooks", "MCP Protocol", "Redis"],
    },
  },

  "field-canvas-engine": {
    id: "field-canvas-engine",
    name: "canvas-matrix-engine.md",
    path: "/field-studies/canvas-matrix-engine.md",
    icon: "Terminal",
    category: "field-studies",
    title: "Field Study · 60 FPS TypeScript Canvas Matrix Engine",
    subtitle: "Generative ASCII background with cursor physics and zero external libraries.",
    lastUpdated: "2026-10-09",
    tags: ["Canvas", "TypeScript", "CreativeCoding", "Performance"],
    content: `# Field Study: 60 FPS TypeScript Canvas Matrix Engine

The visual background on this website is not a video file, not an animated GIF, and not a bloated third-party library. It is a custom TypeScript canvas renderer running at 60 FPS in your browser.

[ HOW IT WORKS ]
* Dynamic Grid Calculation: Grid columns and character rows calculate on the fly based on your viewport size and device pixel ratio.
* Independent Particle Velocities: Each character stream maintains an independent fall velocity and probabilistic reset to sustain balanced visual density.
* Interactive Cursor Physics: Moving your mouse creates a localized disturbance vector. Characters within the ripple radius deflect radially with spring dampening and return smoothly to their grid positions.
* Zero GPU Lag: Pure canvas mathematics with minimal CPU and memory overhead.

\`\`\`typescript
// Cursor disturbance calculation with spring dampening
const dx = (col - cursor.x) * cellWidth;
const dy = (row - cursor.y) * cellHeight;
const distance = Math.hypot(dx, dy);

if (distance < RIPPLE_RADIUS) {
  const force = (1 - distance / RIPPLE_RADIUS) * VELOCITY;
  char.x += Math.cos(angle) * force;
}
\`\`\`

Move your mouse over the background to see the physics in action. You can also toggle the 3D Meadow engine in the bottom-right corner, which is an interactive WebGL physics simulation also built from scratch.`,
    meta: {
      timeline: "Live on this site",
      impact: "60 FPS rendering · Zero external visual libraries · Under 30KB code",
      stack: ["HTML5 Canvas", "TypeScript", "WebGL", "Physics Math"],
    },
  },

  "contact": {
    id: "contact",
    name: "contact.md",
    path: "/contact.md",
    icon: "Mail",
    category: "root",
    title: "Contact & Availability",
    subtitle: "Tell me what you need built or fixed. I will give you an honest evaluation.",
    lastUpdated: "2026-10-09",
    tags: ["Contact", "Hire", "Availability"],
    content: `# Contact & Availability

I am available for fixed-scope engineering builds and ongoing monthly retainers across web development, custom applications, eCommerce plugins, voice support agents, and growth infrastructure.

[ DIRECT CONTACT ]
* Email: [reda@whoax.com](mailto:reda@whoax.com)
* LinkedIn: [linkedin.com/in/reda-alaarabi](https://www.linkedin.com/in/reda-alaarabi/)
* GitHub: [github.com/Ai-assistant-KIRA](https://github.com/Ai-assistant-KIRA)
* Website: [whoax.com](https://whoax.com)

[ ENGAGEMENT OPTIONS ]
* Fixed-Scope Projects: For new websites, web apps, custom plugins, voice telephony agents, or tracking setups. Defined deliverables, clear milestone timelines, and fixed pricing.
* Monthly Retainers: For growing businesses that need ongoing engineering, feature additions, ad scaling, SEO management, and continuous system monitoring.
* Technical Advisory & Audits: Code audits, speed optimization, and architecture reviews for teams needing expert guidance.

[ WHAT TO SEND ]
Send an email to reda@whoax.com with a short summary of:
1. What you want to build, what is currently broken, or what business metric you need to improve.
2. Your approximate timeline.

You will get a direct, honest evaluation within 24 hours. No 45-minute discovery sales pitches, no pushy sales decks, and no gatekeeping.`,
    meta: {
      timeline: "Available Now",
      impact: "Direct reply within 24 hours · Clear fixed quotes · Honest advice",
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
      PORTFOLIO_FILES["disciplines"],
      PORTFOLIO_FILES["philosophy"],
      PORTFOLIO_FILES["stack"],
    ],
  },
  {
    name: "capabilities",
    label: "capabilities",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["websites-and-apps"],
      PORTFOLIO_FILES["ecommerce-and-plugins"],
      PORTFOLIO_FILES["voice-and-chat-agents"],
      PORTFOLIO_FILES["marketing-seo-and-ads"],
      PORTFOLIO_FILES["api-and-mcp-integrations"],
    ],
  },
  {
    name: "projects",
    label: "projects",
    icon: "Folder",
    children: [
      PORTFOLIO_FILES["project-ecommerce"],
      PORTFOLIO_FILES["project-voice"],
      PORTFOLIO_FILES["project-shopify-discord"],
      PORTFOLIO_FILES["project-api-integrations"],
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

export const FILE_SEQUENCE: string[] = [
  "readme",
  "intro-video",
  "operator",
  "disciplines",
  "philosophy",
  "stack",
  "websites-and-apps",
  "ecommerce-and-plugins",
  "voice-and-chat-agents",
  "marketing-seo-and-ads",
  "api-and-mcp-integrations",
  "project-ecommerce",
  "project-voice",
  "project-shopify-discord",
  "project-api-integrations",
  "field-canvas-engine",
  "contact",
];
