import Image from "next/image";
import { logos } from "@/lib/site";

/** Hero strip: client logos in white, scrolling sideways, faded at both edges. */
export function LogoMarquee() {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {/* two identical sets so translateX(-50%) loops seamlessly */}
      <ul className="marquee flex w-max items-center group-hover:[animation-play-state:paused]" aria-label="Clients">
        {[...logos, ...logos].map((l, i) => (
          <li key={i} aria-hidden={i >= logos.length} className="flex shrink-0 items-center gap-2 pr-14 text-lg font-medium text-white/60">
            {l.logo ? (
              <>
                <Image src={l.logo} alt={l.withName || i >= logos.length ? "" : l.name} width={160} height={40} className={`${l.h ?? "h-7"} w-auto opacity-60 brightness-0 invert`} />
                {l.withName && <span>{l.name}</span>}
              </>
            ) : (
              l.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
