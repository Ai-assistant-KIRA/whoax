import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // These components read browser-only state after hydration: saved
  // preferences in localStorage, a WebGL mount flag, and the reduced-motion
  // media query. Setting state in that effect is the intended bridge from the
  // server render to the client value.
  {
    files: [
      "src/components/digital-meadow/CyberMeadow3D.tsx",
      "src/components/digital-meadow/DigitalMeadowPortfolio.tsx",
      "src/components/digital-meadow/SiteSidebar.tsx",
      "src/components/digital-meadow/TextWaveReveal.tsx",
    ],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "portfolio-intro/**",
    "scripts/**",
    "review-captures/**",
  ]),
]);

export default eslintConfig;
