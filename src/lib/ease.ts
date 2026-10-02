import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/**
 * The site's two easing curves. No elastic, back, or bounce anywhere.
 * "drift" — soft arrival for reveals and settles.
 * "press" — firm attack for flashes and presses.
 */
export const easeDrift =
  typeof window !== "undefined"
    ? CustomEase.create("drift", "0.22, 1, 0.36, 1")
    : "power3.out";

export const easePress =
  typeof window !== "undefined"
    ? CustomEase.create("press", "0.32, 0, 0.24, 1")
    : "power2.inOut";

/** Motion (motion/react) equivalents of the same curves. */
export const MOTION_DRIFT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const MOTION_PRESS: [number, number, number, number] = [0.32, 0, 0.24, 1];
