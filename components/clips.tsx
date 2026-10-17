"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clips } from "@/lib/site";
import { Arrow, Section, SectionHeading } from "./ui";

const n = clips.length;

/** 3D clip carousel: only the center clip plays; tap it to watch full screen with sound. */
export function Clips() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);
  const go = (d: number) => setActive((a) => (a + d + n) % n);

  // Play the center clip, pause the rest so the page stays light.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !reduce) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, reduce]);

  useEffect(() => {
    if (open !== null) dialog.current?.showModal();
  }, [open]);

  const current = open !== null ? clips[open] : null;

  return (
    <Section id="clips" className="overflow-x-clip">
      <SectionHeading align="split" title="Recent clips" body="Clips and UGC we've made for clients. Tap the one in the middle to watch it with sound." />
      {clips.some((c) => c.sample) && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted">Sample clips</p>
      )}

      <div
        className="relative mt-16 h-[460px] [perspective:1400px]"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {clips.map((c, i) => {
          // signed distance from the active card, wrapped around the ring
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const abs = Math.abs(o);
          const isActive = o === 0;
          return (
            <motion.button
              key={c.title}
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              aria-label={isActive ? (c.video ? `Watch ${c.title} by ${c.brand}` : `${c.title} by ${c.brand}`) : undefined}
              onClick={() => (isActive ? c.video && setOpen(i) : setActive(i))}
              className={`absolute top-0 left-1/2 -ml-[120px] aspect-[9/16] w-[240px] overflow-hidden rounded-[1.75rem] border border-line bg-neutral-900 text-left ${isActive && c.video ? "cursor-zoom-in" : "cursor-pointer"}`}
              animate={{
                x: `${o * 68}%`,
                rotateY: o * -24,
                scale: 1 - abs * 0.1,
                opacity: abs > 2 ? 0 : 1 - abs * 0.2,
              }}
              style={{ zIndex: 10 - abs }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.video ? (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={c.video}
                  poster={c.poster}
                  className="size-full object-cover"
                  muted
                  loop
                  playsInline
                  preload={abs <= 1 ? "auto" : "metadata"}
                />
              ) : (
                <div
                  className="size-full"
                  style={{
                    background: `linear-gradient(${150 + i * 6}deg, #262626, #0a0a0a)`,
                  }}
                />
              )}
              <span className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-black/40 via-transparent to-black/80 p-4 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                <span className="self-start rounded-full bg-black/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur">
                  {c.platform}
                </span>
                {(!c.video || (isActive && c.video)) && (
                  <span className="mx-auto grid size-14 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5 3.5v9l7.5-4.5z" />
                    </svg>
                  </span>
                )}
                <span>
                  <span className="block text-sm font-medium">{c.title}</span>
                  <span className="mt-1.5 flex items-center justify-between font-mono text-xs text-muted">
                    {c.logo ? (
                      <Image src={c.logo} alt={c.brand} width={80} height={16} className="h-3.5 w-auto brightness-0 invert" />
                    ) : (
                      <span>{c.brand}</span>
                    )}
                    <span className="text-accent">{c.views} views</span>
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button onClick={() => go(-1)} aria-label="Previous clip" className="grid size-10 place-items-center rounded-full border border-line hover:border-fg/30">
          <Arrow className="rotate-180" />
        </button>
        <p className="w-16 text-center font-mono text-xs text-muted" aria-live="polite">
          {active + 1} / {n}
        </p>
        <button onClick={() => go(1)} aria-label="Next clip" className="grid size-10 place-items-center rounded-full border border-line hover:border-fg/30">
          <Arrow />
        </button>
      </div>

      {/* Full-screen player with sound; Esc, the close button or a backdrop click closes it */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        aria-label={current ? `${current.title} by ${current.brand}` : undefined}
      >
        {current?.video && (
          <div className="relative">
            <video src={current.video} poster={current.poster} className="max-h-[88dvh] w-auto max-w-[92vw] rounded-2xl" controls autoPlay playsInline />
            <button
              onClick={() => dialog.current?.close()}
              aria-label="Close video"
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-white/20 text-xl text-white hover:bg-white/10"
            >
              ×
            </button>
          </div>
        )}
      </dialog>
    </Section>
  );
}
