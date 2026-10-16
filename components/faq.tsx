import { bookHref, faqs } from "@/lib/site";
import { Button, Section, SectionHeading } from "./ui";

// FAQPage structured data so Google can show these questions under the search result
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export function Faq() {
  return (
    <Section id="faq" tone="light" className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          align="left"
          pill="FAQ"
          title="Questions?"
          sub="We've got answers."
          body="Still unsure about something? Book a call and ask us directly."
        />
        <Button href={bookHref} className="mt-8">
          Book a call
        </Button>
      </div>

      {/* name="faq" makes it a native one-open-at-a-time accordion */}
      <div className="border-t border-line">
        {faqs.map((f, i) => (
          <details key={f.q} name="faq" open={i === 0} className="faq-item group border-b border-line [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-tight transition-colors hover:text-fg/70">
              {f.q}
              <span
                className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="max-w-xl pb-6 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
