"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { markets } from "@/lib/site";

const GREEN: [number, number, number] = [30 / 255, 217 / 255, 123 / 255];

/** Dotted WebGL globe with pulsing green markets, linked by arcs. Decorative only. */
export function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
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
      markerColor: GREEN,
      glowColor: [0.06, 0.16, 0.1],
      markers: markersAt(0),
      arcs: markets.slice(1).map((m, i) => ({ from: markets[i].at, to: m.at })),
      arcColor: [0.06, 0.42, 0.24], // dimmer than the markers so arcs stay in the background
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
  }, []);

  return <canvas ref={ref} className="aspect-square size-full" aria-hidden />;
}
