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

// Tone rhythm: dark hero → light (services) → dark (signal, clips)
// → light (process, cases) → dark (testimonials) → light (FAQ) → dark (book, footer)
export default function Home() {
  return (
    <>
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
