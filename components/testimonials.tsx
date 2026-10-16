import Image from "next/image";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "./ui";

type Post = (typeof testimonials)[number];

const half = Math.ceil(testimonials.length / 2);
const rows = [testimonials.slice(0, half), testimonials.slice(half)];

/** Wall of love: testimonials as social posts in two rows drifting in opposite directions. */
export function Testimonials() {
  return (
    <section id="testimonials" className="tone-dark relative scroll-mt-16 overflow-x-clip py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading pill="Wall of love" title="Trusted by founders," sub="loved by growth teams." />
        {testimonials.some((t) => t.sample) && (
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-wider text-muted">Sample posts</p>
        )}
      </div>

      <div className="group mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            {/* four copies (two per half) so the -50% loop stays seamless on screens wider than one row; second row runs the other way */}
            <ul
              className="marquee flex w-max group-hover:[animation-play-state:paused]"
              style={{ animationDuration: "60s", animationDirection: r ? "reverse" : "normal" }}
            >
              {[...row, ...row, ...row, ...row].map((t, i) => (
                <li key={i} aria-hidden={i >= row.length} className="pr-4">
                  <PostCard t={t} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function PostCard({ t }: { t: Post }) {
  return (
    <figure className="card w-[19rem] p-6 sm:w-[23rem]">
      <figcaption className="flex items-center gap-3">
        {t.photo ? (
          <Image src={t.photo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
        ) : (
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-medium" aria-hidden>
            {t.name.split(" ").map((w) => w[0]).join("")}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{t.name}</span>
          <span className="block truncate text-xs text-muted">{t.handle}</span>
        </span>
        <PlatformIcon platform={t.platform} />
      </figcaption>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-white/85">{t.quote}</blockquote>
    </figure>
  );
}

function PlatformIcon({ platform }: { platform: Post["platform"] }) {
  return platform === "x" ? (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0 fill-white/60" role="img" aria-label="Posted on X">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ) : (
    <span className="grid size-5 shrink-0 place-items-center rounded-[4px] bg-white/60 text-[11px] font-bold text-black" role="img" aria-label="Posted on LinkedIn">
      in
    </span>
  );
}
