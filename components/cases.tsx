"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { cases } from "@/lib/site";
import { Arrow, Section, SectionHeading } from "./ui";

const n = cases.length;

/** Result-first case study carousel: one campaign at a time, story left, clip in a phone frame right. */
export function Cases() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const touchX = useRef(0);
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const c = cases[i];

  return (
    <Section id="work" tone="light">
      <SectionHeading pill="Case studies" title="Results, not reach" sub="promises." body="A few of the campaigns we've run for tech brands." />

      <div
        className="card mt-16 overflow-hidden p-6 sm:p-10"
        role="region"
        aria-roledescription="carousel"
        aria-label="Case studies"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]"
          >
            <div>
              <div className="flex items-center gap-3">
                {c.logo ? (
                  <Image src={c.logo} alt={c.brand} width={140} height={32} className="h-7 w-auto" />
                ) : (
                  <span className="text-lg font-semibold tracking-tight">{c.brand}</span>
                )}
                {c.sample && (
                  <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    Sample
                  </span>
                )}
              </div>

              <p className="mt-10 font-mono text-6xl tracking-tight sm:text-8xl">{c.result.value}</p>
              <p className="mt-2 text-lg text-muted">{c.result.label}</p>

              <h3 className="mt-10 text-2xl font-medium tracking-tight sm:text-3xl">{c.title}</h3>
              <p className="mt-3 max-w-md text-muted">{c.body}</p>

              <dl className="mt-8 flex gap-10 border-t border-line pt-6">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs text-muted">{m.label}</dt>
                    <dd className="mt-1 font-mono text-2xl tracking-tight">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Phone frame: the campaign's best clip */}
            <div className="mx-auto w-full max-w-[16rem]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2.25rem] border-[6px] border-[#111] bg-[#0b0b0b] shadow-[0_30px_60px_-25px_rgb(0_0_0/0.45)]">
                {c.video ? (
                  <video src={c.video} className="size-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <div className="grid size-full place-items-center bg-[radial-gradient(80%_55%_at_50%_30%,rgb(30_217_123/0.25),transparent_70%),linear-gradient(160deg,#1c1c1c,#070707)]">
                    <span className="grid size-14 place-items-center rounded-full border border-white/20 bg-white/10 text-white" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.5v9l7.5-4.5z" />
                      </svg>
                    </span>
                  </div>
                )}
                <span className="absolute top-4 left-4 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">
                  {c.platform}
                </span>
                <span className="absolute inset-x-4 bottom-4 text-sm font-medium text-white">{c.brand}</span>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <div className="flex gap-2" role="tablist" aria-label="Choose case study">
            {cases.map((x, k) => (
              <button
                key={x.brand}
                role="tab"
                aria-selected={k === i}
                aria-label={x.brand}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-fg" : "w-3 bg-fg/20 hover:bg-fg/40"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button onClick={() => go(-1)} aria-label="Previous case study" className="grid size-10 place-items-center rounded-full border border-line hover:border-fg/30">
              <Arrow className="rotate-180" />
            </button>
            <button onClick={() => go(1)} aria-label="Next case study" className="grid size-10 place-items-center rounded-full border border-line hover:border-fg/30">
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
