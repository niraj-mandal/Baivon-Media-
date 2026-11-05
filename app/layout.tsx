import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ogDefaults, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Vantor Studio runs content marketing, tech campaigns, UGC and clipping for startups, SaaS and AI brands. Millions of views, measured and reported.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Vantor Studio | Content, UGC & Clipping for Tech Brands",
  description,
  // No og:url here: it would point every page at the homepage. Each page sets its own canonical.
  openGraph: { ...ogDefaults, title: "Vantor Studio", description },
  // Card type only: X reads title, description and image from each page's og tags
  twitter: { card: "summary_large_image" },
  robots: site.launched ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
