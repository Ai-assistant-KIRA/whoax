import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { GsapProvider } from "@/components/providers/GsapProvider";

export const metadata: Metadata = {
  title: "whoax — Reda Alaarabi | eCommerce Growth Engineer",
  description:
    "Revenue systems for DTC brands — paid media, Shopify & WooCommerce, automation. Shipped in days.",
  openGraph: {
    title: "whoax — Reda Alaarabi",
    description: "Acquire. Convert. Automate.",
    url: "https://whoax.com",
    images: [{ url: "https://whoax.com/images/01-hero.jpg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GsapProvider>
          <Header />
          <main>{children}</main>
        </GsapProvider>
      </body>
    </html>
  );
}