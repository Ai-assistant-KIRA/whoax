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
  referrer: "strict-origin-when-cross-origin",
  title: "Reda Alaarabi · Websites, Online Stores & AI Phone Assistants",
  description:
    "I build fast websites, web apps, Shopify and WooCommerce stores, and AI phone assistants for businesses. Seven years of work across ten industries, and you deal with me directly.",
  openGraph: {
    title: "Reda Alaarabi · whoax.com",
    description:
      "Fast websites, online stores and AI phone assistants for businesses, built and looked after by one engineer.",
    url: "https://whoax.com",
    siteName: "Reda Alaarabi · whoax.com",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1c2225",
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
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-[#cbe3b3] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[#1c2225]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
