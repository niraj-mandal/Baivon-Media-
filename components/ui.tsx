import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Two-tone heading: first line white, second line grey. */
export function SectionHeading({
  pill,
  title,
  sub,
  body,
  align = "center",
}: {
  pill: string;
  title: string;
  sub: string;
  body?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <Pill>{pill}</Pill>
      <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {title}
        <br />
        <span className="text-muted">{sub}</span>
      </h2>
      {body && <p className="mt-5 text-base text-muted text-pretty">{body}</p>}
    </Reveal>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-accent"
      : "border border-line bg-surface text-fg hover:border-fg/25";
  return (
    <a
      href={href}
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles} ${className}`}
    >
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-0.5 shrink-0 text-accent">
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "dark",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <section id={id} className={`relative scroll-mt-16 overflow-x-clip ${tone === "light" ? "tone-light" : "tone-dark"}`}>
      <div className={`relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 ${className}`}>{children}</div>
    </section>
  );
}
