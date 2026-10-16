import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Arrow } from "@/components/ui";
import { calUrl, logos, nextSteps, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Baivon Media",
  description: "Tell us about your launch or campaign. We reply within one business day.",
};

export default function Contact() {
  // No Cal.com link yet: fall back to an email asking for a time
  const callHref = site.calLink ? calUrl : `mailto:${site.email}?subject=Intro call`;

  return (
    <>
      <Nav />
      <main className="tone-light min-h-dvh">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-36 pb-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pt-44">
          <div>
            <h1 className="text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl">Tell us what you&apos;re launching.</h1>
            <p className="mt-6 max-w-md text-lg text-muted text-pretty">
              We&apos;re the content and distribution team for tech brands: content marketing, tech campaigns, UGC and clipping.
            </p>

            <div className="mt-12 border-t border-line pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">What happens next</p>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((st, i) => (
                  <li key={st.title} className="flex gap-5">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-mono text-xs">{i + 1}</span>
                    <span>
                      <span className="block font-medium">{st.title}</span>
                      <span className="mt-1 block text-sm text-muted">{st.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm text-muted">
                Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="text-fg underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </p>
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Trusted by</p>
              <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5" aria-label="Clients">
                {logos.map((l) =>
                  l.logo ? (
                    <li key={l.name} className="flex items-center gap-1.5 opacity-70 grayscale">
                      <Image src={l.logo} alt={l.withName ? "" : l.name} width={120} height={28} className="h-5 w-auto" />
                      {l.withName && <span className="text-sm font-semibold">{l.name}</span>}
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium tracking-tight">Send us a message</h2>
            <p className="mt-2 text-muted">Tell us about your goals and we&apos;ll get back to you with a plan.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
            <a
              href={callHref}
              {...(site.calLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group mt-8 flex items-center justify-center gap-2 text-sm font-medium"
            >
              Schedule a call instead?
              <Arrow className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
