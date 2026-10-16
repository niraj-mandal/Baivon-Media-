"use client";

import { useRef } from "react";

const word = "Baivon";
const type = "text-center text-[23vw] leading-[0.8] font-semibold tracking-tighter select-none lg:text-[17rem]";

/** Giant footer wordmark with a green spotlight that follows the pointer. Touch screens get a soft static glow. */
export function SpotlightWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      aria-hidden
      className="group relative mx-auto mt-16 max-w-6xl"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
    >
      <p className={`${type} bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-transparent`}>{word}</p>
      {/* same text on top, filled only where the green spotlight is */}
      <p
        className={`${type} pointer-events-none absolute inset-0 bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-60`}
        style={{
          backgroundImage: "radial-gradient(260px circle at var(--x, 50%) var(--y, 60%), rgb(30 217 123 / 0.9), transparent 70%)",
        }}
      >
        {word}
      </p>
    </div>
  );
}
