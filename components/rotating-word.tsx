"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cycles through words in place. Only the current word is real text (so search engines and screen
 * readers see one clean headline); invisible CSS-only sizers hold the widest word's width so the
 * headline never reflows.
 */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [reduce, words.length, interval]);

  return (
    <span className="inline-grid text-accent">
      {/* sizers for every word (rendered width varies by letter, not count); text lives in CSS content, not the DOM */}
      {words.map((w) => (
        <span key={w} data-w={w} className="invisible whitespace-nowrap [grid-area:1/1] after:content-[attr(data-w)]" aria-hidden />
      ))}
      <span key={i} className="word-in whitespace-nowrap [grid-area:1/1]">
        {words[i]}
      </span>
    </span>
  );
}
