import { stats } from "@/lib/site";
import { EngineLive } from "./engine-live";
import { Counter, Reveal } from "./motion";
import { Section, SectionHeading } from "./ui";

const fan = [-14, -7, 0, 7, 14]; // tile rotations in the clip fan

/** Distribution engine: one source → hundreds of clips → every platform, then the headline stats. */
export function Signal() {
  return (
    <Section id="reach">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-72 max-w-3xl rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <SectionHeading pill="Distribution" title="One piece of content." sub="Every feed that matters." />

      <Reveal className="relative mt-16 grid items-center justify-items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1.25fr] lg:gap-6">
        {/* 1. Source */}
        <div className="card w-full max-w-[17rem] p-4">
          <div className="grid aspect-video place-items-center rounded-xl bg-[linear-gradient(160deg,#1f1f1f,#080808)]">
            <span className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3.5v9l7.5-4.5z" />
              </svg>
            </span>
          </div>
          <p className="mt-3 text-sm font-medium">1 podcast episode</p>
          <p className="font-mono text-xs text-muted">62 min · long-form</p>
        </div>

        <span className="flow" aria-hidden />

        {/* 2. Clips multiplying */}
        <div className="flex flex-col items-center">
          <div className="relative h-44 w-56" aria-hidden>
            {fan.map((deg, i) => (
              <span
                key={deg}
                className={`absolute bottom-0 left-1/2 aspect-[9/16] w-20 -ml-10 origin-bottom rounded-xl border ${deg === 0 ? "border-accent/50 bg-[radial-gradient(80%_55%_at_50%_30%,rgb(30_217_123/0.35),transparent_70%),linear-gradient(160deg,#1b1b1b,#070707)]" : "border-white/10 bg-[linear-gradient(160deg,#1d1d1d,#080808)]"}`}
                style={{ transform: `rotate(${deg}deg) translateX(${deg * 2.4}px)`, zIndex: 5 - Math.abs(i - 2) }}
              />
            ))}
          </div>
          <p className="mt-4 font-mono text-2xl tracking-tight">
            <Counter to={240} prefix="× " />
          </p>
          <p className="text-sm text-muted">short clips cut and posted</p>
        </div>

        <span className="flow" aria-hidden />

        {/* 3. Platforms with live counters */}
        <div className="w-full max-w-sm">
          <EngineLive />
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-2 gap-y-10 border-y border-line py-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className={`px-4 sm:px-6 ${i > 0 ? "md:border-l md:border-line" : ""}`}>
            <p className="font-mono text-4xl tracking-tight tabular-nums sm:text-5xl">
              <Counter to={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
