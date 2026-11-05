import { Book } from "@/components/book";
import { Cases } from "@/components/cases";
import { Clips } from "@/components/clips";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { Signal } from "@/components/signal";
import { Testimonials } from "@/components/testimonials";
import type { Metadata } from "next";
import { ogDefaults, services, site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...ogDefaults,
    title: "Vantor Studio",
    description: "Content marketing, tech campaigns, UGC and clipping for startups, SaaS and AI brands.",
    url: "/",
  },
};

// Tells Google who the business is (brand panel, logo, social profiles)
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.svg`,
  email: site.email,
  description: "Content marketing, tech campaigns, UGC and clipping agency for tech brands.",
  areaServed: "US",
  knowsAbout: services.map((s) => s.title),
  sameAs: Object.values(site.socials),
};

// Tone rhythm: dark hero → light (services) → dark (signal, clips)
// → light (process, cases) → dark (testimonials) → light (FAQ) → dark (book, footer)
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd).replace(/</g, "\\u003c") }} />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Signal />
        <Clips />
        <Process />
        <Cases />
        <Testimonials />
        <Faq />
        <Book />
      </main>
      <Footer />
    </>
  );
}
