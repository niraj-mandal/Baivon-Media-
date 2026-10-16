import { clips } from "@/lib/site";

const COLS = 11;
const ROWS = 6;

type Clip = (typeof clips)[number];

/** Tilted wall of vertical "posts" drifting upward. Pure CSS animation, no JS. */
export function FeedWall() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="feed-wall">
        {Array.from({ length: COLS }, (_, c) => {
          const tiles = Array.from({ length: ROWS }, (_, r) => clips[(c * 3 + r) % clips.length]);
          return (
            <div key={c} className="feed-col" style={{ animationDuration: `${40 + (c % 4) * 8}s`, marginTop: `${(c % 3) * -110}px` }}>
              {/* rendered twice so translateY(-50%) loops seamlessly */}
              {[...tiles, ...tiles].map((t, i) => (
                <Tile key={i} clip={t} hot={(c * 7 + i) % 6 === 0} />
              ))}
            </div>
          );
        })}
      </div>
      {/* darken the center for legibility and fade every edge into the page */}
      <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_45%,rgb(5_5_5/0.9),rgb(5_5_5/0.6)_65%,rgb(5_5_5/0.3))]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}

function Tile({ clip, hot }: { clip: Clip; hot: boolean }) {
  return (
    <div
      className={`relative aspect-[9/16] w-36 shrink-0 overflow-hidden rounded-2xl border ${hot ? "border-accent/50" : "border-white/10"}`}
      style={{
        background: hot
          ? "linear-gradient(160deg, #1b1b1b, #070707)"
          : "linear-gradient(160deg, #1d1d1d, #080808)",
      }}
    >
      <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase text-white/70">{clip.platform}</span>
      <div className="absolute inset-x-2.5 bottom-2.5 space-y-1.5">
        <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        <p className={`pt-1 font-mono text-[10px] ${hot ? "text-accent" : "text-white/55"}`}>▶ {clip.views}</p>
      </div>
    </div>
  );
}
