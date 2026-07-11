import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "AI-first eCommerce growth engineering — Shopify & WooCommerce builds, paid media, and automation that turn five-week builds into ten-day sprints.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whoax.com"),
  title: "Reda Alaarabi — AI-First eCommerce Growth Engineer",
  description,
  openGraph: {
    title: "Reda Alaarabi — AI-First eCommerce Growth Engineer",
    description,
    url: "https://whoax.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${plexMono.variable}`}>
      <body className="bg-void font-body text-paper antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
