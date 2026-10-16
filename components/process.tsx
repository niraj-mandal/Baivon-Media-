import { bookHref, steps } from "@/lib/site";
import { Reveal } from "./motion";
import { Arrow, Section, SectionHeading } from "./ui";

/** Split timeline: heading pinned on the left, steps scroll past on the right along a filling line. */
export function Process() {
  return (
    <Section id="process" tone="light" className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          align="left"
          pill="How it works"
          title="From brief to millions"
          sub="of views in three steps."
          body="From first call to a live campaign in about a week."
        />
        <a href={bookHref} className="group mt-8 inline-flex items-center gap-2 text-sm font-medium hover:text-accent">
          Book a call
          <Arrow className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <ol className="relative">
        {/* Track and its green fill, running through the step markers */}
        <span className="absolute top-3 bottom-3 left-[0.6875rem] w-px bg-line" aria-hidden />
        <span className="process-fill absolute top-3 bottom-3 left-[0.6875rem] w-px bg-accent" aria-hidden />
        {steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[1.375rem_1fr] gap-6 pb-14 last:pb-0 sm:gap-10">
            <span className="relative z-10 mt-2 size-[1.375rem] rounded-full border-2 border-accent bg-bg" aria-hidden />
            <Reveal delay={i * 0.08}>
              <span className="block font-mono text-5xl tracking-tight text-fg/15 sm:text-6xl">0{i + 1}</span>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{s.title}</h3>
                <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">{s.when}</span>
              </div>
              <p className="mt-3 max-w-md text-muted">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
