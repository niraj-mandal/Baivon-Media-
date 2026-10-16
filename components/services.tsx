import { bookHref, services } from "@/lib/site";
import { ServiceVisual } from "./service-visuals";
import { Arrow, Section, SectionHeading } from "./ui";

/** Stacking panels: each service pins under the nav and the next one slides over it. */
export function Services() {
  return (
    <Section id="services" tone="light">
      <SectionHeading
        pill="Services"
        title="Four ways we grow"
        sub="your brand's reach."
        body="Pick one or run them together. Every service is built for technical products and measured in real views."
      />
      <div className="svc-stack mt-16 space-y-8">
        {services.map((s, i) => (
          <article
            key={s.title}
            // offset each panel a little lower so the earlier ones peek out above it
            style={{ top: `calc(6rem + ${i * 1.75}rem)` }}
            className="svc-card tone-dark sticky grid min-h-[26rem] gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(90%_80%_at_100%_0%,rgb(30_217_123/0.10),transparent_60%),#0c0c0c] p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] sm:min-h-[30rem] sm:p-12 md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="flex flex-col justify-between">
              <div className="flex items-start justify-between gap-6">
                <h3 className="min-w-0 text-[2.5rem] font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                  {s.heading[0]}
                  <span className="block text-muted">{s.heading[1]}</span>
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {s.tag} / {String(services.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-12">
                <ul className="flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col items-start gap-6">
                  <p className="flex max-w-md gap-3 text-sm text-muted sm:text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {s.body}
                  </p>
                  <a href={bookHref} className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium hover:text-accent">
                    Discuss {s.title}
                    <Arrow className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* What this service produces; hidden on phones so panels stay shorter than the screen */}
            <div className="hidden items-center justify-center md:flex" aria-hidden>
              <ServiceVisual kind={s.visual} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
