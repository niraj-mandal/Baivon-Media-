import { bookHref } from "@/lib/site";
import { BrandOrb } from "./brand";
import { Globe } from "./globe";
import { Reveal } from "./motion";
import { Button, Section } from "./ui";

/** Closing call to action, set inside a large globe. */
export function Book() {
  return (
    <Section id="book" className="flex min-h-[min(960px,175vw)] flex-col justify-center overflow-hidden">
      {/* Globe sized for the text, not the other way round. Mask dims its center
          (dots, arcs and pulses alike) so the text reads, keeping full detail at the rim. */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(880px,160vw)] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,rgb(0_0_0/0.15)_0%,rgb(0_0_0/0.3)_32%,#000_52%,#000_62%,transparent_71%)]"
        aria-hidden
      >
        <Globe />
      </div>
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <BrandOrb />
        <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
          Have a launch coming up?
          <span className="block text-muted">We&apos;ll plan how it gets seen.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-muted text-balance sm:text-lg">
          Book a 30-minute intro call or send us a message. We reply within one business day.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={bookHref}>Book a call</Button>
          <Button href="/contact" variant="ghost">
            Send a message
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
