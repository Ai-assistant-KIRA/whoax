import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase);
  try {
    CustomEase.create("siteOut", "0.22,1,0.36,1");
  } catch {
    /* already registered */
  }
}

/** Site-wide custom cubic-bezier ease — never elastic, back, or bounce. */
export const EASE_OUT = "siteOut";

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };
