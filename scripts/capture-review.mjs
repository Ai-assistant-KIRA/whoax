/**
 * Full visual capture for local Duo portfolio + skeleton-rebuild reference.
 * Usage:
 *   node scripts/capture-review.mjs              # both
 *   node scripts/capture-review.mjs --local
 *   node scripts/capture-review.mjs --skeleton
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "review-captures");
const LOCAL = "http://localhost:3000";
const SKELETON =
  "https://skeleton-rebuild.preview.static.emergentagent.com/";

const args = new Set(process.argv.slice(2));
const doLocal = args.has("--local") || (!args.has("--local") && !args.has("--skeleton"));
const doSkeleton =
  args.has("--skeleton") || (!args.has("--local") && !args.has("--skeleton"));

function ensure(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function waitPreloaderGone(page, timeout = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const locked = await page.evaluate(() => {
      const o = document.documentElement.style.overflow;
      // Preloader sets overflow hidden on html
      return o === "hidden";
    });
    if (!locked) {
      // also wait a beat for first canvas paint
      await page.waitForTimeout(400);
      return;
    }
    await page.waitForTimeout(200);
  }
  console.warn("preloader wait timed out — continuing");
}

/** Scroll document accounting for GSAP ScrollSmoother when present. */
async function scrollToY(page, y) {
  await page.evaluate((target) => {
    // Prefer GSAP ScrollSmoother instance when present
    try {
      const gsap = window.gsap;
      const Smoother = window.ScrollSmoother;
      const smoother =
        Smoother && typeof Smoother.get === "function" ? Smoother.get() : null;
      if (smoother && typeof smoother.scrollTo === "function") {
        smoother.scrollTo(target, false);
        return;
      }
      if (gsap?.globalTimeline) {
        /* continue to native */
      }
    } catch {
      /* native */
    }
    window.scrollTo(0, target);
    document.documentElement.scrollTop = target;
    document.body.scrollTop = target;
  }, y);
  // Let scrub settle
  await page.waitForTimeout(900);
}

async function maxScroll(page) {
  return page.evaluate(() => {
    const smoother =
      window.ScrollSmoother &&
      typeof window.ScrollSmoother.get === "function" &&
      window.ScrollSmoother.get();
    if (smoother) {
      try {
        return Math.max(0, smoother.scrollMax || smoother.scrollHeight?.() || 0);
      } catch {
        /* fall through */
      }
    }
    return Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.getElementById("smooth-content")?.scrollHeight || 0,
    ) - window.innerHeight;
  });
}

async function captureLocal(browser) {
  const sectionsDir = path.join(OUT, "local", "sections");
  const heroDir = path.join(OUT, "local", "hero-scroll");
  ensure(sectionsDir);
  ensure(heroDir);

  // Desktop
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    console.log("local desktop →", LOCAL);
    await page.goto(LOCAL, { waitUntil: "domcontentloaded", timeout: 120000 });
    // early preloader shot if still visible
    try {
      await page.screenshot({
        path: path.join(sectionsDir, "00-preloader-or-hero.png"),
      });
    } catch {
      /* ignore */
    }
    await waitPreloaderGone(page);
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(sectionsDir, "01-hero-p0.png"),
      fullPage: false,
    });

    // Wait for canvas frames to paint
    await page.waitForTimeout(2500);
    // Hero pin distance ≈ 4.2 * viewport (matches Hero.tsx)
    const heroSteps = [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 0.92, 1.0];
    const vh = 900;
    const pinRange = Math.round(vh * 4.2);
    for (const p of heroSteps) {
      const y = Math.round(p * pinRange);
      await scrollToY(page, y);
      await page.waitForTimeout(500);
      const label = String(Math.round(p * 100)).padStart(3, "0");
      await page.screenshot({
        path: path.join(heroDir, `desktop-p${label}.png`),
      });
      console.log("  hero p=", p, "y=", y);
    }

    // Section walk: scroll deeper in chunks and shoot
    const maxY = await maxScroll(page);
    const sectionFracs = [
      ["02-after-hero", 0.2],
      ["03-mid-1", 0.35],
      ["04-mid-2", 0.5],
      ["05-mid-3", 0.65],
      ["06-mid-4", 0.8],
      ["07-footer", 0.98],
    ];
    for (const [name, frac] of sectionFracs) {
      await scrollToY(page, Math.round(maxY * frac));
      await page.screenshot({ path: path.join(sectionsDir, `${name}.png`) });
      console.log("  section", name);
    }

    // full page composite (may be tall)
    await scrollToY(page, 0);
    await page.waitForTimeout(500);
    try {
      await page.screenshot({
        path: path.join(sectionsDir, "fullpage.png"),
        fullPage: true,
      });
    } catch (e) {
      console.warn("fullpage failed", e.message);
    }
    await page.close();
  }

  // Mobile
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    console.log("local mobile");
    await page.goto(LOCAL, { waitUntil: "domcontentloaded", timeout: 120000 });
    await waitPreloaderGone(page);
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(sectionsDir, "mobile-hero.png"),
    });
    await scrollToY(page, 1200);
    await page.screenshot({
      path: path.join(sectionsDir, "mobile-mid.png"),
    });
    await scrollToY(page, 4000);
    await page.screenshot({
      path: path.join(sectionsDir, "mobile-lower.png"),
    });
    await page.close();
  }

  console.log("local capture done");
}

async function captureSkeleton(browser) {
  const sectionsDir = path.join(OUT, "skeleton", "sections");
  const heroDir = path.join(OUT, "skeleton", "hero-scroll");
  ensure(sectionsDir);
  ensure(heroDir);

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  console.log("skeleton static host →", SKELETON);
  await page.goto(SKELETON, { waitUntil: "networkidle", timeout: 120000 }).catch(
    async () => {
      await page.goto(SKELETON, {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
    },
  );
  // wait for hero zone or video
  await page.waitForTimeout(4000);
  try {
    await page.waitForSelector("#hero-zone, video, main", { timeout: 20000 });
  } catch {
    console.warn("skeleton selectors slow — shooting anyway");
  }
  await page.screenshot({ path: path.join(sectionsDir, "00-top.png") });

  // hero progress via zone height
  const zoneH = await page.evaluate(() => {
    const z = document.getElementById("hero-zone");
    return z ? z.offsetHeight : document.documentElement.scrollHeight * 0.4;
  });
  const range = Math.max(1, zoneH - 900);
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const y = Math.round(p * range);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(450);
    const label = String(Math.round(p * 100)).padStart(3, "0");
    await page.screenshot({
      path: path.join(heroDir, `desktop-p${label}.png`),
    });
    console.log("  skeleton hero p=", p.toFixed(2));
  }

  // deeper sections
  const docH = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  for (const [name, frac] of [
    ["work", 0.35],
    ["topics", 0.55],
    ["about", 0.75],
    ["contact", 0.95],
  ]) {
    await page.evaluate(
      (yy) => window.scrollTo(0, yy),
      Math.round(docH * frac),
    );
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(sectionsDir, `${name}.png`) });
  }

  // mobile
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(SKELETON, { waitUntil: "domcontentloaded", timeout: 120000 });
  await mobile.waitForTimeout(3500);
  await mobile.screenshot({ path: path.join(sectionsDir, "mobile-top.png") });
  await mobile.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
  await mobile.waitForTimeout(600);
  await mobile.screenshot({ path: path.join(sectionsDir, "mobile-mid.png") });
  await mobile.close();
  await page.close();
  console.log("skeleton capture done");
}

const browser = await chromium.launch({ headless: true });
try {
  if (doLocal) await captureLocal(browser);
  if (doSkeleton) await captureSkeleton(browser);
} finally {
  await browser.close();
}
console.log("ALL CAPTURES COMPLETE →", OUT);
