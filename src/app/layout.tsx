import type { Metadata, Viewport } from "next";
import { Unbounded, IBM_Plex_Mono, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whoax.com"),
  title: "Reda Alaarabi — AI-First eCommerce Growth Engineer",
  description:
    "AI-first eCommerce growth engineering — Shopify & WooCommerce builds, performance media, and automation that turn five-week builds into ten-day sprints.",
  openGraph: {
    title: "Reda Alaarabi — AI-First eCommerce Growth Engineer",
    description:
      "AI-first eCommerce growth engineering — Shopify & WooCommerce builds, performance media, and automation for DTC brands.",
    url: "https://whoax.com",
    siteName: "Reda Alaarabi",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased font-sans", unbounded.variable, plexMono.variable, generalSans.variable, geist.variable)}
    >
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
