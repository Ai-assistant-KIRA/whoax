import { PortfolioFile, FolderNode } from "@/types/portfolio";

export const PORTFOLIO_FILES: Record<string, PortfolioFile> = {
  "readme": {
    id: "readme",
    name: "README.md",
    path: "/README.md",
    icon: "FileCode",
    category: "root",
    title: "Reda Alaarabi · whoax.com",
    subtitle: "I build websites, online stores and AI phone assistants for businesses. Seven years in, and you deal with me directly.",
    lastUpdated: "2026-10-15",
    tags: ["WebDev", "Cloud", "eCommerce", "VoiceAgents", "SEO", "Ads", "APIs"],
    content: `# Reda Alaarabi · whoax.com
I'm Reda. I build websites, web apps, online stores and AI phone assistants for businesses that judge a website by the customers it brings in. In seven years I've shipped work for restaurants, medical and dental clinics, law firms, real estate agencies, a flight booking company, clothing brands, software startups and busy online shops.

[ WHY WORK WITH ME ]
* You talk to the person writing the code. There's no account manager relaying messages and no ticket queue to wait in.
* I own the whole job: design, code, hosting, tracking and checkout. If something breaks on a Saturday, I'm the one who fixes it.
* Speed comes first. A site that takes six seconds to load on a phone loses the visitor, so page speed is part of every build.

[ WHAT I BUILD ]
* Websites for clinics, law firms, restaurants, real estate, travel and service businesses, designed for phones and built to get people to call, book or buy.
* Web apps and dashboards: booking systems, internal tools and live reports, where each person on your team sees only what they need.
* Shopify and WooCommerce add-ons, written from scratch when the app-store version slows your store down or clashes with your theme.
* AI phone and chat assistants that answer on the first ring, book appointments and handle the routine questions.
* Ad creative and launch campaigns for products and services.
* Google and Meta ads, with sales reported from your server so the ad platforms see every purchase.
* SEO for local, national and international search.
* Social media management: planning, scheduling and audience growth.
* Connections between your tools (CRM, payments, bookings, stock and AI assistants) so data moves on its own instead of by copy and paste.

[ HOW I WORK ]
1. It stays online. Sites hold up when an ad goes viral, and updates go out without taking checkout down.
2. Security is planned from day one. Customer data stays private, payments stay locked down, and the setup meets privacy rules like GDPR.
3. It's built to grow. Pages and searches stay as fast at 100,000 customers as they were at 100.
4. The code is tested and tidy, so another developer can pick it up five years from now.
5. I talk in plain English about margins, bookings and repeat customers, and I work easily with your designers, marketers and staff.

[ NUMBERS ]
* Phone assistants that reply in under 0.6\u00a0seconds.
* Server tracking that recovers more than 30% of the sales browsers missed.
* 7+ years of hands-on work across ten industries.

[ WHERE TO START ]
Use the file list on the left. The about folder covers how I work, capabilities covers each service, projects has the case studies, and contact.md has my email.`,
    meta: {
      timeline: "2018 to today",
      impact: "7+ years · Ten industries · Phone replies in under 0.6\u00a0s",
      stack: ["Next.js", "TypeScript", "Shopify Plus", "WooCommerce", "AWS", "Twilio", "PostgreSQL"],
      liveUrl: "https://whoax.com",
      videoPreview: {
        src: "/portfolio-intro.mp4",
        title: "Meet Reda in 70 Seconds",
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
    title: "Intro Video · whoax.com",
    subtitle: "Seventy seconds on what I build and why businesses hire me.",
    lastUpdated: "2026-10-15",
    tags: ["Video", "Overview", "EpidemicSound", "GSAP"],
    content: `# Intro Video · whoax.com
A short overview for business owners and hiring teams. Use the chapter buttons under the player to jump to a section.

[ CHAPTERS ]
* 00:00 Where the money leaks: slow websites and missed calls cost sales.
* 00:08 Who I am: seven years of building websites and systems that grow revenue.
* 00:17 Agency or custom: why bloated $30K template sites put buyers off, and how a lean custom build can double conversions.
* 00:27 Big online stores: storefronts that load fast and stay up through flash sales.
* 00:37 AI phone assistants: answering on the first ring, qualifying callers and booking them into the calendar.
* 00:46 The proof: 42+ systems shipped, with no middle managers involved.
* 00:54 Staying ahead in 2026: real engineering instead of generic AI output.
* 01:02 Get in touch: reda@whoax.com.

[ HOW IT WAS MADE ]
* Animated in Remotion and GSAP.
* Music: "Dark Console" from Epidemic Sound, a 130 BPM darksynth track that dips whenever the narrator speaks.
* Voiceover from Epidemic Sound.
* 1080p at 30 frames per second, 2,100 frames in total.
* Colors and type match this site.`,
    meta: {
      timeline: "70 seconds · 1080p",
      impact: "42+ systems shipped · No agency overhead · You work with me directly",
      stack: ["Remotion", "GSAP", "Epidemic Sound", "TypeScript"],
      videoPreview: {
        src: "/portfolio-intro.mp4",
        title: "Meet Reda in 70 Seconds",
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
    title: "One Person, Start to Finish",
    subtitle: "You hire one engineer, and that engineer answers for the result.",
    lastUpdated: "2026-10-15",
    tags: ["Background", "Experience", "CustomerSupport", "Delivery"],
    content: `# One Person, Start to Finish

Most agencies run the same play. You meet someone senior, sign the contract, and the work goes to junior freelancers with a checklist. When the store slows down or the tracking breaks, everyone blames someone else.

I work alone and I answer for all of it. I plan the project, write the code, set up the servers and tracking, and make sure it holds up once real customers arrive.

[ I'VE WORKED THE FRONT DESK ]
Alongside the engineering, I've spent hundreds of hours on customer support for working businesses, by phone, email and live chat. It shapes how I build:
* I know how fast people abandon a checkout that asks for one field too many.
* I know the questions callers ask your front desk fifty times a day.
* I know what it's like to fight a broken mobile page while booking a clinic appointment from the car.
* So when I build a phone assistant, a chat window or a checkout, I build it for someone in a hurry.

[ WORKING TOGETHER ]
* You explain the goal and I turn it into working software, with nobody in between rewording it.
* Features move fast. Without layers of management, something an agency quotes at three weeks often takes me two days.
* You get regular updates, a preview link to click through, and my honest view of which option pays back best.

[ INDUSTRIES ]
Medical clinics, dental offices, law firms, fine dining and fast-casual restaurants, flight booking, real estate, fashion brands, software companies and local service businesses.`,
    meta: {
      timeline: "2018 to today",
      impact: "Hands-on delivery across 10+ industries",
      stack: ["Next.js", "Shopify Plus", "WooCommerce", "Node.js", "AWS", "Twilio", "Docker"],
    },
  },

  "disciplines": {
    id: "disciplines",
    name: "engineering-disciplines.md",
    path: "/about/engineering-disciplines.md",
    icon: "Cpu",
    category: "about",
    title: "Five Things I Never Skip",
    subtitle: "The engineering habits that keep your site online and your customers' data safe.",
    lastUpdated: "2026-10-15",
    tags: ["DevOps", "Security", "Architecture", "Testing", "Product"],
    content: `# Five Things I Never Skip

Hiring managers want to know how I work. Business owners want to know if they can trust me with the site their sales depend on. These five habits answer both. Each one starts with what it means for you, then how I do it.

[ 01 / IT STAYS ONLINE ]
* For you: the site doesn't crash when an ad takes off or Black Friday traffic arrives, and updates go out without taking checkout offline.
* How: AWS hosting, Docker, automatic deployments from GitHub, SSL certificates, health checks and fast rollbacks.

[ 02 / SECURITY AND PRIVACY ]
* For you: customer records stay private, payments stay secure, and you meet privacy laws like GDPR and CCPA.
* How: every form and input is checked, secrets are kept out of the code, staff get only the access they need, databases are encrypted, and dependencies are scanned for known problems.

[ 03 / FAST AT ANY SIZE ]
* For you: search, booking calendars and customer dashboards load as quickly with 100,000 customers as they did with 100.
* How: PostgreSQL with proper indexes, Redis caching, paged results, and APIs that hold up under heavy traffic.

[ 04 / TESTED, READABLE CODE ]
* For you: launching a promotion today won't break checkout tomorrow, and any good developer can take the code over.
* How: automated tests, strict TypeScript, small reusable components, written documentation and regular cleanup.

[ 05 / I CARE HOW THE BUSINESS DOES ]
* For you: an engineer who thinks about your margins, repeat customers and goals, and asks why before building what a ticket says.
* How: I work directly with founders, designers, marketers and operations staff, flag bottlenecks early, and own the experience from first click to purchase.`,
    meta: {
      impact: "Stays online · Keeps data safe · Easy to maintain",
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
    subtitle: "A site you can explore shows my work better than another template would.",
    lastUpdated: "2026-10-15",
    tags: ["Philosophy", "Craft", "Performance"],
    content: `# Why This Site Looks Like a Terminal

Open ten agency or developer portfolios and you'll find the same stock photo of someone smiling at a laptop, the same purple gradient and the same promise of "digital transformation". Plenty of them are made in page builders that take five seconds to load and fall apart on a phone.

I built this one as a terminal you can click through. The ASCII background is my own canvas code with no libraries behind it, and the 3D meadow is a WebGL scene I built with three.js. It's the first sample of my work you see.

[ WHAT I BELIEVE ]
* Speed is money. Every extra tenth of a second on a phone costs sales, because people won't wait and a competitor is one tap away.
* Measure before you spend. Ads without server-side tracking mean paying for clicks you can't trace to sales, so I fix tracking first and let Google and Meta learn from real purchases.
* One person should own the result. Projects split across four agencies fail the same way: when the numbers drop, nobody is responsible.
* Pick tools that fit. A clean WordPress or Next.js build beats a sprawling setup that needs four engineers to keep running, so I choose for your size and budget.
* Plan security first. I decide how customer data is protected before the first page is built.

[ THE SHORT VERSION ]
If you like clean work, fast pages and straight talk, we'll get along.`,
    meta: {
      impact: "Hand-built ASCII background · 60 FPS · Light on your phone's battery",
      stack: ["HTML5 Canvas", "TypeScript", "three.js", "WebGL"],
    },
  },

  "stack": {
    id: "stack",
    name: "stack-and-ops.md",
    path: "/about/stack-and-ops.md",
    icon: "Cpu",
    category: "about",
    title: "Tools I Use",
    subtitle: "Stable, fast and easy for the next developer to pick up.",
    lastUpdated: "2026-10-15",
    tags: ["Stack", "Tools", "Infrastructure", "DevOps"],
    content: `# Tools I Use

I choose tools that will still be easy to work with in five years. This page is mostly for developers and hiring managers; if you run a business, the short version is that I cover everything from the page your customers see to the server it runs on.

[ WEBSITES ]
* Frameworks: Next.js, React, TypeScript, WordPress, Shopify Liquid, plain HTML and CSS.
* Styling and motion: Tailwind CSS, Framer Motion, canvas animation.
* Speed: Core Web Vitals tuning, Cloudflare caching, lightweight SVG graphics.

[ WEB APPS AND DASHBOARDS ]
* Back end: Node.js, Express, Python, PostgreSQL, Supabase, Redis.
* Front end: React Query, Zustand, TypeScript.
* Dashboards: live numbers, user roles and permissions, scheduled reports.

[ HOSTING AND SECURITY ]
* Hosting: AWS, Vercel, Railway, Render.
* Deployment: Docker, GitHub Actions, separate secrets for each environment, uptime checks.
* Security: input validation, HTTPS everywhere, user permissions, GDPR and CCPA data handling, automatic vulnerability scans.

[ STORE ADD-ONS AND INTEGRATIONS ]
* Shopify: custom apps, theme extensions, admin screens, the Storefront and Admin APIs.
* WooCommerce: custom PHP plugins, payment gateways, automated order flows.
* Integrations: REST, GraphQL, webhooks, and MCP servers for AI assistants.

[ MARKETING, ADS AND SEO ]
* SEO: technical audits, schema markup, multi-language setup, Google Business Profile.
* Ads: Google Search, Shopping and Performance Max; Facebook and Instagram campaigns with creative testing.
* Tracking: server-side Google Tag Manager on AWS, Meta Conversions API, Google Analytics 4, BigQuery, Looker Studio.

[ PHONE AND CHAT ASSISTANTS ]
* Phone: Twilio for calls, Deepgram to understand speech, ElevenLabs for the voice, LiveKit for real-time audio. Replies come back in under 0.6\u00a0seconds.
* Chat: assistants for your website, WhatsApp and email that can look things up in your CRM and database.`,
    meta: {
      impact: "From the page your customers see to the server it runs on",
      stack: ["Next.js", "Node.js", "TypeScript", "Shopify", "WooCommerce", "AWS", "Twilio", "PostgreSQL"],
    },
  },

  "websites-and-apps": {
    id: "websites-and-apps",
    name: "websites-and-apps.md",
    path: "/capabilities/websites-and-apps.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Websites, Web Apps and Dashboards",
    subtitle: "Websites that turn visitors into customers, and tools your team will actually use.",
    lastUpdated: "2026-10-15",
    tags: ["WebDev", "WebApps", "SaaS", "Dashboards"],
    content: `# Websites, Web Apps and Dashboards

A business website should bring in bookings and sales. Too many load slowly, look clumsy on a phone and need a support ticket just to change the opening hours or phone number.

I build websites, web apps, software products and internal dashboards that get visitors to act.

[ BY INDUSTRY ]
* Clinics and dental offices: online booking tied to your calendar, intake forms, and a mobile layout patients trust.
* Law firms: fast, credible sites with confidential intake forms, practice-area pages and strong local search results.
* Restaurants: a menu page that reads well on a phone instead of a 40MB PDF, plus reservations and directions.
* Real estate: fast listings, instant filters, big photo galleries and leads sent straight to the right agent.
* Travel and flights: quick search, booking flows and clear schedules.
* Clothing and lifestyle brands: clean storefronts, fast galleries, a buy button that stays in reach and a smooth checkout.

[ WEB APPS AND DASHBOARDS ]
Beyond marketing sites, I build:
* Software products with logins, subscription billing and a solid database behind them.
* Dashboards where your team sees sales, stock, bookings and support numbers as they happen.
* Permissions, so each person sees only the data their job needs.

[ WHAT EVERY BUILD INCLUDES ]
Clean code, a layout built for phones and automatic backups. You also get documentation and a walkthrough, so your team can make everyday changes without calling me.`,
    meta: {
      impact: "Built for phones · Easy for your team to update · Any industry",
      stack: ["Next.js", "React", "TypeScript", "WordPress", "Tailwind CSS", "Node.js", "PostgreSQL"],
    },
  },

  "ecommerce-and-plugins": {
    id: "ecommerce-and-plugins",
    name: "ecommerce-and-plugins.md",
    path: "/capabilities/ecommerce-and-plugins.md",
    icon: "Cpu",
    category: "capabilities",
    title: "Online Stores and Custom Add-ons",
    subtitle: "Shopify Plus and WooCommerce stores built to turn more visitors into buyers.",
    lastUpdated: "2026-10-15",
    tags: ["Shopify", "WooCommerce", "Plugins", "eCommerce"],
    content: `# Online Stores and Custom Add-ons

Most struggling online stores share one problem: thirty apps from the app store. Each one adds slow scripts, a monthly fee and another way for checkout to break.

I replace them with a custom theme and add-ons that do exactly what your store needs, which keeps it fast, secure and lean.

[ SHOPIFY PLUS ]
* Themes built from scratch, so the store carries no code it doesn't use and looks exactly how you want.
* Slide-out carts that sell: a free-shipping progress bar, variant pickers, bundle offers and one-click checkout.
* Custom apps and admin screens for your operations and fulfillment team.
* Direct connections to Shopify's data for fast lookups and fully custom storefronts.

[ WOOCOMMERCE AND WORDPRESS ]
* Plugins written for your store when the marketplace ones don't fit.
* Payment gateways, custom shipping rules, tiered pricing and awkward tax rules.
* Faster database queries and caching, so a store with thousands of products stays quick.

[ WHY CUSTOM PAYS FOR ITSELF ]
* The monthly app-store fees go away.
* Fewer third-party scripts slowing every page down.
* Plugins stop fighting each other and breaking the cart in your busiest week.`,
    meta: {
      impact: "Custom themes · No app-store bloat · Shopify Plus and WooCommerce",
      stack: ["Shopify Liquid", "Shopify GraphQL API", "PHP", "WooCommerce", "Tailwind CSS", "Stripe"],
    },
  },

  "voice-and-chat-agents": {
    id: "voice-and-chat-agents",
    name: "voice-and-chat-agents.md",
    path: "/capabilities/voice-and-chat-agents.md",
    icon: "PhoneCall",
    category: "capabilities",
    title: "Phone and Chat Assistants",
    subtitle: "Every call answered on the first ring, and 70% fewer routine support tickets.",
    lastUpdated: "2026-10-15",
    tags: ["VoiceAgents", "ChatAgents", "CustomerSupport", "Telephony"],
    content: `# Phone and Chat Assistants

Think about the questions your business hears every day:
"What are your hours today?"
"Can I book for Thursday?"
"Where's my order?"
"Do you take my insurance?"
"How much is it?"

Your front desk spends four to six hours a day giving the same answers. Callers wait on hold, and the ones who ring after hours hang up and call a competitor.

I build phone assistants that pick up instantly and chat assistants that answer on your website or WhatsApp at any hour. You can call mine with the button above.

[ PHONE ASSISTANTS ]
* They answer on the first ring, 24 hours a day, so nobody hits a busy signal or hold music.
* They sound natural. Replies come back in under 0.6\u00a0seconds, without the three-second robot pause callers hate.
* They do real work: check availability, book appointments into your calendar, look up orders and text the caller a confirmation.
* They know when to hand off. Urgent or sensitive calls go straight to a staff member, with notes about the caller on screen.
* Built with Twilio, Deepgram, ElevenLabs and LiveKit.

[ CHAT ASSISTANTS ]
* They run on your website, WhatsApp or email inbox.
* They handle 70%+ of routine questions without a staff member stepping in.
* They learn your policies, prices, services and tone of voice.
* I've answered phones, chats and emails for real businesses myself, so the conversations are written to calm people down and solve the problem quickly.

[ WHO IT HELPS MOST ]
Clinics, dental practices, law firms, restaurants, real estate agencies, flight booking services, contractors and busy online stores.`,
    meta: {
      impact: "Replies in under 0.6\u00a0s · 70% of routine questions handled · No hold queue",
      telephony: "Twilio + Deepgram + ElevenLabs",
      latency: "Under 0.6 seconds",
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
    title: "Marketing, Ads and SEO",
    subtitle: "Campaigns, ad accounts and search rankings that bring in paying customers.",
    lastUpdated: "2026-10-15",
    tags: ["Marketing", "GoogleAds", "MetaAds", "SEO", "Attribution"],
    content: `# Marketing, Ads and SEO

A great ad still fails when the landing page takes four seconds to load or the tracking misses 30% of sales. I handle the marketing and the technical side together, so the numbers add up.

[ CAMPAIGNS AND CREATIVE ]
* Creative direction for products, services and software.
* Product photos, video concepts and ad variations made quickly with generative tools, without a $25,000 studio bill.
* Landing pages that deliver exactly what the ad promised.

[ GOOGLE AND META ADS ]
* Google: search campaigns aimed at people ready to buy, Shopping feeds, and Performance Max with careful keyword exclusions.
* Meta: Facebook and Instagram campaigns, audience targeting, creative testing and retargeting.
* Scaling: moving budget to the ads that sell and refreshing creative before people tire of it.

[ WHY SERVER TRACKING MATTERS ]
On phones, browser tracking misses up to 35% of purchases because of iPhone privacy settings and ad blockers. When Google and Meta see only part of your sales, they spend your budget on the wrong people.

I send purchase data from your server straight to the ad platforms, encrypted, so they see every sale and can find better buyers for less.

[ SEO ]
* Local: Google Business Profile, local listings and city pages that put clinics, law firms and restaurants in the map results.
* Technical: schema markup, crawl tuning, multi-language setup and fast pages.
* Structure: service pages organized so Google understands what you do and ranks you above competitors.

[ SOCIAL MEDIA ]
* Growth, content planning and scheduling on Instagram, TikTok, LinkedIn and Facebook.
* Replies, community and positioning that turn followers into leads.`,
    meta: {
      impact: "Google and Meta ads · 30%+ more sales tracked · Local and national rankings",
      stack: ["Server GTM", "Meta CAPI", "Google Ads", "AWS", "BigQuery", "Looker Studio"],
    },
  },

  "api-and-mcp-integrations": {
    id: "api-and-mcp-integrations",
    name: "api-and-mcp-integrations.md",
    path: "/capabilities/api-and-mcp-integrations.md",
    icon: "Layers",
    category: "capabilities",
    title: "Connecting Your Tools",
    subtitle: "Your bookings, payments, CRM and stock systems passing data to each other on their own.",
    lastUpdated: "2026-10-15",
    tags: ["API", "Integration", "MCP", "Webhooks", "Backend"],
    content: `# Connecting Your Tools

Many businesses lose hours every week because their tools don't share data. Website bookings never reach the calendar, store sales don't update the warehouse, and someone ends up copying rows between spreadsheets.

I build the connections that move that data automatically and reliably.

[ WHAT I BUILD ]
* Links to payment processors (Stripe, PayPal), CRMs (HubSpot, Salesforce), shipping, booking and accounting tools.
* Custom APIs for your mobile apps, dashboards and partners, secured and documented.
* Instant triggers: when an order comes in, a booking is made or a form is sent, the next step runs on its own.
* MCP servers that let AI assistants use your business tools and databases safely.
* Background jobs that replace manual data entry, with automatic retries and alerts.

[ RELIABILITY ]
* Failed requests retry on their own, so a network blip never loses customer data.
* Incoming messages are signature-checked and credentials are encrypted.
* Documentation shows any developer how the data flows.

[ EXAMPLES ]
* Store-to-warehouse sync: stock updates both ways, with alerts when the numbers look wrong.
* A store bot in team chat with 28 commands for stock, revenue and orders, so nobody has to open the admin.
* Sales sent from the server straight to ad platforms, verified and secure.`,
    meta: {
      impact: "No manual re-entry · Data matches everywhere · Recovers from outages on its own",
      stack: ["Node.js", "TypeScript", "Python", "REST", "GraphQL", "Webhooks", "MCP Protocol"],
    },
  },

  "project-foody": {
    id: "project-foody",
    name: "foody-restaurant-platform.md",
    path: "/projects/foody-restaurant-platform.md",
    icon: "Layers",
    category: "projects",
    title: "Product Build · Foody Restaurant Platform",
    subtitle: "A restaurant website and staff admin that keeps the menu, hours and photos current without a developer.",
    lastUpdated: "2026-10-15",
    tags: ["ProductBuild", "Restaurants", "React", "AdminDashboard", "Remotion"],
    content: `# Product Build: Foody Restaurant Platform

[ THE PROBLEM ]
Plenty of independent restaurants cook better food than the place down the street and still have empty tables on a Friday. A guest searches for them and finds a blurry PDF menu, opening hours from last season, or a delivery-app listing that keeps 15 to 30% of every order.

Foody is a restaurant website and staff admin built for that owner. The public site answers what guests want to know first: whether you're open, where you are and what's on the menu. The owner keeps those answers current from the admin, with no developer involved and no commission on the order.

[ WHAT GUESTS SEE ]
* Open-now status, street address and phone number in the first screen of the homepage.
* A real menu page instead of a PDF: search by dish or ingredient, or filter by category, Chef's picks, plant-based or what the kitchen has today.
* A photo, price and description on every dish, and a Sold out tag the moment the kitchen runs out.
* A gallery of the food and the room, and a contact page with the weekly service schedule and a message form.
* Every page in English and French.

[ WHAT STAFF CONTROL ]
* Menu: add dishes, change prices, swap photos, and switch availability or featured status. Changes are live immediately.
* Categories, food photos and the restaurant gallery, each on its own screen.
* Messages: inquiries from the contact form land in an inbox inside the admin.
* A dashboard with counts for dishes, availability, featured items, categories and gallery photos.

[ HOW IT IS BUILT ]
* A React app built with Vite and styled with Tailwind CSS.
* One brand system on every page: Big Shoulders for headlines, Barlow for body text, one red (#dc2626).
* Visitors with JavaScript turned off still get the contact details, so they can call or walk in.

[ THE SHOWCASE FILM ]
The 79-second film above is pitched at restaurant owners. It follows one owner from a half-empty Friday to a full room: the search, the PDF menu and the commission receipt, then the live site and the admin doing the work. I built it frame by frame in Remotion, with voiceover, music and about 50 sound effects from Epidemic Sound, mixed to the standard loudness for web video. The product footage comes from the live site; the delivery receipt is illustrative.

[ LINKS ]
* Live site: [foody.whoax.com](https://foody.whoax.com)`,
    meta: {
      client: "Product build for independent restaurants",
      timeline: "Live · 79-second showcase film",
      impact: "Direct menu, no delivery-app commission · Staff edits go live immediately · English and French",
      stack: ["React", "Vite", "Tailwind CSS", "Remotion", "Epidemic Sound"],
      liveUrl: "https://foody.whoax.com",
      videoPreview: {
        src: "/projects/foody/foody-showcase.mp4",
        title: "Fill More Tables · Foody in 79 Seconds",
        durationSec: 79,
        fileName: "FOODY_SHOWCASE.mp4",
        poster: "/projects/foody/poster.jpg",
        note: "A 79-second film for restaurant owners · Click to play with sound",
        scanlines: false,
        chapters: [
          { label: "01 // HOOK", sub: "The empty Friday", timeSec: 0 },
          { label: "02 // PROBLEM", sub: "PDF menu, app fees", timeSec: 6.4 },
          { label: "03 // TURN", sub: "Meet Foody", timeSec: 17.2 },
          { label: "04 // HOME", sub: "Hours, address, phone", timeSec: 21.6 },
          { label: "05 // MENU", sub: "Real photo, real price", timeSec: 31.4 },
          { label: "06 // ADMIN", sub: "Ten-second edits", timeSec: 46.2 },
          { label: "07 // MARGINS", sub: "No commission", timeSec: 62.2 },
          { label: "08 // CLOSE", sub: "Full house", timeSec: 67.4 },
        ],
      },
      gallery: [
        {
          src: "/projects/foody/home-1920.webp",
          srcSmall: "/projects/foody/home-960.webp",
          width: 1920,
          height: 1080,
          label: "home",
          alt: "Foody homepage hero with the FOODY wordmark, a smash burger photo, and open-now status, address and phone along the bottom",
          caption: "Open-now status, address and phone sit in the first screen, under the signature dish and its price.",
        },
        {
          src: "/projects/foody/menu-1920.webp",
          srcSmall: "/projects/foody/menu-960.webp",
          width: 1920,
          height: 1080,
          label: "menu",
          alt: "Foody menu page with a dish search field and category tabs for burgers, sandwiches, plates, starters, salads, desserts, drinks and chef's specials",
          caption: "Search by dish or ingredient, then filter by category, Chef's picks or plant-based.",
        },
        {
          src: "/projects/foody/sold-out-1920.webp",
          srcSmall: "/projects/foody/sold-out-960.webp",
          width: 1920,
          height: 1080,
          label: "availability",
          alt: "Burger cards on the Foody menu, with the Blue Cheese and Fig burger marked Sold out",
          caption: "Switch a dish off in the admin and the menu shows Sold out on the next load.",
        },
        {
          src: "/projects/foody/admin-menu-1920.webp",
          srcSmall: "/projects/foody/admin-menu-960.webp",
          width: 1920,
          height: 1080,
          label: "admin",
          alt: "Foody staff admin menu table listing dishes with image, category, price, and availability and featured toggles",
          caption: "Staff admin: every dish with its price, category, and availability and featured switches.",
        },
        {
          src: "/projects/foody/contact-1920.webp",
          srcSmall: "/projects/foody/contact-960.webp",
          width: 1920,
          height: 1080,
          label: "contact",
          alt: "Foody contact page with address, phone, weekly service schedule and a message form",
          caption: "Weekly service schedule beside a message form that feeds the admin inbox.",
        },
      ],
    },
  },

  "project-voice": {
    id: "project-voice",
    name: "voice-support-pipeline.md",
    path: "/projects/voice-support-pipeline.md",
    icon: "PhoneCall",
    category: "projects",
    title: "Case Study · AI Phone Assistant",
    subtitle: "Calls answered in under 0.6\u00a0seconds, and 68% of routine calls taken off the front desk.",
    lastUpdated: "2026-10-15",
    tags: ["CaseStudy", "VoiceAgent", "Telephony", "Support"],
    content: `# Case Study: AI Phone Assistant

[ THE SITUATION ]
A service business with several locations was getting more than 120 calls a day. The front desk spent over four hours a day on the same questions: opening hours, rescheduling and prices.

During the afternoon rush, callers sat on hold or went to voicemail. More than 25% of after-hours callers hung up without leaving a message, which cost the business dozens of bookings every week.

[ WHAT I DID ]
1. Built a phone assistant on Twilio, Deepgram and ElevenLabs, and tuned the audio so it replies in under 0.6\u00a0seconds. Callers get an answer straight away, without the robotic pause.
2. Connected it to the booking software. When someone asks to book or move an appointment, it checks real availability, holds the slot and texts a confirmation to the caller.
3. Added a handoff to staff. If a caller is upset or needs an expert, the call moves to someone on duty, with notes about the caller on their screen.

[ RESULTS ]
* 68% of routine calls handled start to finish without the front desk.
* Average reply time under 0.6\u00a0seconds.
* Every after-hours and weekend call answered on the first ring.
* More than 15 staff hours a week freed up for the people standing at the desk.

[ TRY IT ]
Press "call my AI assistant" above and ask about anything on this site. It's built the same way: it waits until you've finished talking, stops when you cut in, and ignores quieter voices in the room.`,
    meta: {
      client: "Multi-location service business",
      timeline: "Live in 3 weeks",
      impact: "68% of routine calls handled · Replies in under 0.6\u00a0s · No missed calls",
      telephony: "Twilio + Deepgram + ElevenLabs",
      latency: "Under 0.6 seconds",
      stack: ["Twilio", "Deepgram", "ElevenLabs", "LiveKit WebRTC", "Node.js", "REST APIs"],
      audioSample: {
        callerText: "Hi, can you tell me what Reda builds and how to get a quote?",
        agentText: "He builds websites, online stores and AI phone assistants. For a quote, email reda at whoax dot com.",
        durationSec: 10,
      },
    },
  },

  "project-shopify-discord": {
    id: "project-shopify-discord",
    name: "shopify-discord-agent.md",
    path: "/projects/shopify-discord-agent.md",
    icon: "Layers",
    category: "projects",
    title: "Open Source · Shopify Store Bot for Discord",
    subtitle: "28 store commands inside your team's Discord, free and open source.",
    lastUpdated: "2026-10-15",
    tags: ["OpenSource", "Shopify", "Discord", "GraphQL", "Docker"],
    content: `# Open Source: Shopify Store Bot for Discord

Most store owners check their numbers by opening tab after tab. Jumping between stock sheets, order queues and team chat slows down the decisions that can't wait.

So I built a free, open-source bot that brings the store's numbers into team chat.

[ WHAT IT DOES ]
* 28 commands for stock levels, order queues, revenue, refund spikes and active discounts.
* Alerts when an item drops below its reorder point or refunds suddenly jump.
* Reads live store data through Shopify's GraphQL API, which is faster and avoids the rate limits of the older REST API.
* Ships as one Docker container, so it starts with a single command on any server.

[ WHY OWNERS USE IT ]
It replaces paid dashboard subscriptions, and the team can check the store from the chat app they already use without everyone needing full admin access.

[ CODE ]
* GitHub: [github.com/Ai-assistant-KIRA/shopify-discord-agent](https://github.com/Ai-assistant-KIRA/shopify-discord-agent)
* License: MIT
* Built with Node.js, TypeScript, the Shopify Admin GraphQL API and Docker`,
    meta: {
      client: "Open source",
      timeline: "Active and maintained",
      impact: "28 store commands · No subscription fees",
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
    title: "Case Study · One Hub for Three Business Systems",
    subtitle: "A CRM, billing and inventory kept in sync, with safe access for AI assistants.",
    lastUpdated: "2026-10-15",
    tags: ["API", "MCP", "Webhooks", "Architecture", "Backend"],
    content: `# Case Study: One Hub for Three Business Systems

[ THE PROBLEM ]
A growing company ran three separate systems: a CRM, a custom billing portal and an inventory system. None of them shared data, so staff spent hours copying orders into spreadsheets, and shipping delays and billing mistakes kept happening.

They also wanted AI tools to answer questions about accounts and stock without handing out database passwords.

[ WHAT I BUILT ]
1. A central service in Node.js and TypeScript that keeps customer and stock data in sync across all three systems in real time.
2. A listener for incoming updates that checks each message's signature and retries with growing delays. When a partner service went down for a while, transactions waited in a queue and went through once it came back.
3. A secure MCP server with a fixed set of business tools. The team can ask their AI assistant about stock, order history or summaries in plain English, without touching the database directly.

[ RESULTS ]
* Manual re-entry is gone, saving the operations team more than 20 hours a week.
* Billing, CRM and inventory always show the same numbers.
* AI access is limited by role, and every request is logged.`,
    meta: {
      client: "Enterprise services client",
      timeline: "4 weeks",
      impact: "No manual syncing · Data always matches · Secure AI access",
      stack: ["Node.js", "TypeScript", "REST", "GraphQL", "Webhooks", "MCP Protocol", "Redis"],
    },
  },

  "field-canvas-engine": {
    id: "field-canvas-engine",
    name: "canvas-matrix-engine.md",
    path: "/field-studies/canvas-matrix-engine.md",
    icon: "Terminal",
    category: "field-studies",
    title: "Field Study · The ASCII Background",
    subtitle: "An animated background that runs at 60 FPS on plain TypeScript, with no libraries.",
    lastUpdated: "2026-10-15",
    tags: ["Canvas", "TypeScript", "CreativeCoding", "Performance"],
    content: `# Field Study: The ASCII Background

The ASCII background on this site is drawn live in your browser, up to 60 times a second, by my own TypeScript code with no animation library behind it.

[ HOW IT WORKS ]
* The grid sizes itself to your screen and its pixel density.
* Each column of characters falls at its own speed and resets at random, which keeps the screen evenly filled.
* Your cursor pushes nearby characters away, and they spring back into place when it moves on.
* It's plain canvas math, so it stays light on memory and on your processor.

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

To try it, switch the background to ASCII with the button in the bottom-right corner and move your mouse across the screen. The other background, the 3D meadow, is a WebGL scene I built with three.js.`,
    meta: {
      timeline: "Live on this site",
      impact: "60 FPS · No libraries · Under 30KB of code",
      stack: ["HTML5 Canvas", "TypeScript"],
    },
  },

  "contact": {
    id: "contact",
    name: "contact.md",
    path: "/contact.md",
    icon: "Mail",
    category: "root",
    title: "Contact",
    subtitle: "Tell me what you need built or fixed, and I'll tell you honestly how I'd handle it.",
    lastUpdated: "2026-10-15",
    tags: ["Contact", "Hire", "Availability"],
    content: `# Contact

I take fixed-price projects and monthly retainers: websites, web apps, store add-ons, phone assistants and marketing setups.

[ REACH ME ]
* Email: [reda@whoax.com](mailto:reda@whoax.com)
* LinkedIn: [linkedin.com/in/reda-alaarabi](https://www.linkedin.com/in/reda-alaarabi/)
* GitHub: [github.com/Ai-assistant-KIRA](https://github.com/Ai-assistant-KIRA)
* Website: [whoax.com](https://whoax.com)

[ WAYS TO WORK TOGETHER ]
* Fixed-price project: a new website, app, plugin, phone assistant or tracking setup, with clear deliverables, milestones and one agreed price.
* Monthly retainer: ongoing development, new features, ads, SEO and monitoring for a growing business.
* Review and advice: code reviews, speed fixes and architecture advice for teams that want a second opinion.

[ WHAT TO SEND ]
Email reda@whoax.com with:
1. What you want built, what's broken, or the number you want to move.
2. Your rough timeline.

You'll get a straight answer by email within 24 hours, without a discovery call or a sales deck.`,
    meta: {
      timeline: "Available now",
      impact: "Reply within 24 hours · Fixed quotes · Honest advice",
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
      PORTFOLIO_FILES["project-foody"],
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
  "project-foody",
  "project-voice",
  "project-shopify-discord",
  "project-api-integrations",
  "field-canvas-engine",
  "contact",
];
