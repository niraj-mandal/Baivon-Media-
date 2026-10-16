import { FeedWall } from "./feed-wall";
import { LogoMarquee } from "./logos";
import { bookHref, stats } from "@/lib/site";
import { RotatingWord } from "./rotating-word";
import { Button } from "./ui";

export function Hero() {
  return (
    <section id="top" className="tone-dark relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:pt-28">
      <FeedWall />
      {/* First screen: text grid, then the client logo strip */}
      <div className="relative mx-auto flex max-w-6xl flex-col justify-center lg:min-h-[calc(100svh-7rem)]">
        {/* lg: headline + buttons left, paragraph right. Mobile: one stacked column. */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-9">
          <div className="rise lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1 className="text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl">
              Make your <RotatingWord words={["launch", "podcast", "product demo", "founder story"]} />{" "}
              <span className="block text-balance text-muted">impossible to scroll past.</span>
            </h1>
          </div>

          <p
            className="rise max-w-sm text-base text-muted text-pretty sm:text-lg lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:justify-self-end"
            style={{ animationDelay: "0.18s" }}
          >
            Baivon Media puts tech brands in front of millions on TikTok, Reels, Shorts, X and LinkedIn, with creators, clippers and campaigns you can measure to the view.
          </p>

          <div className="rise lg:col-start-1 lg:row-start-2 lg:self-start" style={{ animationDelay: "0.24s" }}>
            <div className="flex flex-wrap gap-3">
              <Button href={bookHref}>Book a call</Button>
              <Button href="#work" variant="ghost">
                See our results
              </Button>
            </div>
            {/* Proof at the decision point; uses the same headline stat as the Distribution section */}
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span>
                <span className="font-mono text-fg">
                  {stats[0].value}
                  {stats[0].suffix}
                </span>{" "}
                {stats[0].label.toLowerCase()} for tech brands
              </span>
            </p>
          </div>
        </div>

        <div className="rise mt-16 lg:mt-24" style={{ animationDelay: "0.32s" }}>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
