import { Counter } from "./motion";

export type ServiceVisualKind = "post" | "launch" | "ugc" | "clips";

/** Small illustration of what each service produces, shown on the right of its panel. */
export function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  switch (kind) {
    case "post":
      return <PostVisual />;
    case "launch":
      return <LaunchVisual />;
    case "ugc":
      return <UgcVisual />;
    case "clips":
      return <ClipsVisual />;
  }
}

const frame = "rounded-2xl border border-white/10 bg-white/[0.03]";

function PostVisual() {
  return (
    <div className={`${frame} w-full max-w-sm p-5`}>
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent/20 text-xs font-semibold text-accent">JL</span>
        <span>
          <span className="block text-sm font-medium">Founder</span>
          <span className="block text-xs text-muted">@yourfounder · 2h</span>
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/80">
        We just shipped the feature our users asked for most. Here&apos;s the 30-second demo 👇
      </p>
      <div className="mt-4 aspect-video rounded-xl bg-[radial-gradient(70%_70%_at_50%_40%,rgb(30_217_123/0.18),transparent_70%),linear-gradient(160deg,#1c1c1c,#080808)]" />
      <div className="mt-4 flex gap-6 font-mono text-xs text-muted">
        <span>
          ♥ <Counter to={12400} />
        </span>
        <span>
          ↻ <Counter to={1930} />
        </span>
        <span className="text-accent">
          <Counter to={482} suffix="K" /> views
        </span>
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <div className={`${frame} w-full max-w-sm p-5`}>
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>Views per hour</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="live-dot size-1.5 rounded-full bg-accent" aria-hidden />
          Live
        </span>
      </div>
      <svg viewBox="0 0 300 140" className="mt-4 w-full" aria-hidden>
        <defs>
          <linearGradient id="launch-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgb(30 217 123)" stopOpacity="0.35" />
            <stop offset="1" stopColor="rgb(30 217 123)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="120" y1="8" x2="120" y2="130" stroke="rgb(255 255 255 / 0.25)" strokeDasharray="3 4" />
        <path d="M0 122 L40 120 L80 121 L120 116 L140 70 L160 22 L185 34 L215 52 L250 64 L300 72 L300 130 L0 130 Z" fill="url(#launch-fill)" />
        <path d="M0 122 L40 120 L80 121 L120 116 L140 70 L160 22 L185 34 L215 52 L250 64 L300 72" fill="none" stroke="rgb(30 217 123)" strokeWidth="2" />
        <circle cx="160" cy="22" r="4" fill="rgb(30 217 123)" />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
        <span>-72h</span>
        <span className="text-white/80">Launch</span>
        <span>+72h</span>
      </div>
    </div>
  );
}

function UgcVisual() {
  return (
    <div className="relative">
      <div className="relative aspect-[9/16] w-40 overflow-hidden rounded-[1.75rem] border-[5px] border-[#1a1a1a] bg-[radial-gradient(80%_55%_at_50%_30%,rgb(30_217_123/0.25),transparent_70%),linear-gradient(160deg,#1c1c1c,#070707)] sm:w-44">
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase text-white/70">Creator</span>
        <span className="absolute inset-0 m-auto grid size-11 place-items-center rounded-full border border-white/20 bg-white/10" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3.5v9l7.5-4.5z" />
          </svg>
        </span>
        <span className="absolute inset-x-3 bottom-3 space-y-1">
          <span className="block h-1.5 w-4/5 rounded-full bg-white/25" />
          <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
        </span>
      </div>
      <span className="absolute top-8 -left-14 rounded-full border border-accent/40 bg-black/80 px-3 py-1 text-xs text-accent">Hook-tested</span>
      <span className="absolute bottom-12 -right-12 rounded-full border border-white/15 bg-black/80 px-3 py-1 text-xs text-white/80">Ads-ready</span>
    </div>
  );
}

function ClipsVisual() {
  return (
    <div className="w-full max-w-sm">
      <div className={`${frame} flex items-center gap-3 px-4 py-3`}>
        <span className="grid size-7 place-items-center rounded-md bg-white/10 text-[10px]" aria-hidden>
          ▶
        </span>
        <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-accent/70 via-white/20 to-white/10" />
        <span className="font-mono text-xs text-muted">62:14</span>
      </div>
      {/* fan-out lines from the long video to the clips */}
      <svg viewBox="0 0 300 40" className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
        {[30, 90, 150, 210, 270].map((x) => (
          <path key={x} d={`M150 0 C150 22, ${x} 18, ${x} 40`} fill="none" stroke="rgb(255 255 255 / 0.18)" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="grid grid-cols-5 gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`aspect-[9/16] rounded-lg border ${i === 2 ? "border-accent/50 bg-[radial-gradient(80%_55%_at_50%_30%,rgb(30_217_123/0.3),transparent_70%),#0d0d0d]" : "border-white/10 bg-[linear-gradient(160deg,#1d1d1d,#080808)]"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-sm">
        <Counter to={240} prefix="× " suffix=" clips" />
      </p>
    </div>
  );
}
