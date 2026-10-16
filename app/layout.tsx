import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
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
  "Baivon Media runs content marketing, tech campaigns, UGC and clipping for startups, SaaS and AI brands. Millions of views, measured and reported.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Baivon Media | Content, UGC & Clipping for Tech Brands",
  description,
  openGraph: { title: "Baivon Media", description, url: site.url, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image", title: "Baivon Media", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
