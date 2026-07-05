"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type ReactNode } from "react";
import { refreshScrollTriggers } from "@/lib/animations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GsapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onLoad = () => refreshScrollTriggers();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return <>{children}</>;
}