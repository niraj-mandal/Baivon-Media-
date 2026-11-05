"use client";

import { useEffect, useRef } from "react";
import { markets } from "@/lib/site";

const PLATINUM: [number, number, number] = [201 / 255, 206 / 255, 214 / 255];

/** Dotted WebGL globe with pulsing platinum markets, linked by arcs. Decorative only. */
export function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    // cobe (WebGL) loads only when the globe nears the viewport: keeps it off the first page load
    let stop = () => {};
    let cancelled = false;
    const lazy = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        lazy.disconnect();
        const { default: createGlobe } = await import("cobe");
        if (!cancelled) stop = start(createGlobe, canvas);
      },
      { rootMargin: "600px 0px" },
    );
    lazy.observe(canvas);
    return () => {
      cancelled = true;
      lazy.disconnect();
      stop();
    };

    function start(createGlobe: typeof import("cobe").default, canvas: HTMLCanvasElement) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const size = canvas.offsetWidth * dpr;
      const markersAt = (t: number) =>
        markets.map((m, i) => ({ location: m.at, size: 0.022 + 0.01 * Math.sin(t * 2 + i) }));

      let phi = 4.6; // starts with the Americas facing the viewer
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size,
        height: size,
        phi,
        theta: 0.28,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 5,
        baseColor: [0.22, 0.22, 0.22],
        markerColor: PLATINUM,
        glowColor: [0.1, 0.11, 0.12],
        markers: markersAt(0),
        arcs: markets.slice(1).map((m, i) => ({ from: markets[i].at, to: m.at })),
        arcColor: [0.3, 0.32, 0.35], // dimmer than the markers so arcs stay in the background
        arcWidth: 0.4,
        arcHeight: 0.08,
      });
      if (reduce) return () => globe.destroy();

      // Only animate while on screen
      let visible = false;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(canvas);

      let raf = 0;
      const tick = (now: number) => {
        if (visible) {
          phi += 0.0025;
          globe.update({ phi, markers: markersAt(now / 1000) });
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        globe.destroy();
      };
    }
  }, []);

  return <canvas ref={ref} className="aspect-square size-full" aria-hidden />;
}
