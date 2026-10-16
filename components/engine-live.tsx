import { PlatformIcon, type Platform } from "./platform-icon";

// Example campaign split by platform. PLACEHOLDER: use a real campaign's numbers.
const base: { p: Platform; name: string; views: number }[] = [
  { p: "tiktok", name: "TikTok", views: 7_240_000 },
  { p: "instagram", name: "Reels", views: 4_910_000 },
  { p: "youtube", name: "Shorts", views: 3_780_000 },
  { p: "x", name: "X", views: 1_690_000 },
  { p: "linkedin", name: "LinkedIn", views: 820_000 },
];
const max = base[0].views;
const total = base.reduce((a, b) => a + b.views, 0);

/** Platform nodes with each one's share of views, plus the campaign total. */
export function EngineLive() {
  return (
    <div className="w-full">
      <ul className="space-y-2">
        {base.map((b) => (
          <li key={b.p} className="card flex items-center gap-3 rounded-2xl px-4 py-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/[0.06]">
              <PlatformIcon p={b.p} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{b.name}</span>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <span className="block h-full rounded-full bg-accent/80" style={{ width: `${(b.views / max) * 100}%` }} />
              </span>
            </span>
            <span className="font-mono text-sm tabular-nums">{b.views.toLocaleString("en-US")}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex items-center justify-between gap-3 px-1 text-sm text-muted">
        <span>Example campaign</span>
        <span>
          <span className="font-mono text-fg tabular-nums">{total.toLocaleString("en-US")}</span> views
        </span>
      </p>
    </div>
  );
}
