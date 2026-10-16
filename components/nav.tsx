"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { bookHref, nav, site } from "@/lib/site";
import { LogoMark } from "./brand";
import { Button } from "./ui";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight" aria-label="Baivon Media home">
      <LogoMark className="h-5 w-auto text-accent" />
      Baivon Media
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Hide while scrolling down, reveal on any scroll up. Never hide with the menu open.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 120 || y < lastY - 4) setHidden(false);
        else if (y > lastY + 4) setHidden(true);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in the middle of the screen (homepage sections only).
  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Phone menu: focus the first link on open; Esc or a tap outside closes it.
  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => !header.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const isActive = (href: string) => (href.includes("#") ? pathname === "/" && active === href.split("#")[1] : pathname === href);

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-3 z-50 px-4 transition-transform duration-300 ${hidden && !open ? "-translate-y-[150%]" : "translate-y-0"}`}
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/85 pr-2 pl-5 backdrop-blur-xl">
        <Logo />
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                aria-current={isActive(n.href) ? "location" : undefined}
                className={`flex items-center gap-1.5 transition-colors hover:text-fg ${isActive(n.href) ? "text-fg" : "text-muted"}`}
              >
                <span className={`size-1 rounded-full bg-accent transition-opacity ${isActive(n.href) ? "opacity-100" : "opacity-0"}`} aria-hidden />
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <Button href={bookHref} className="h-10">
            Book a call
          </Button>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-white/10 text-fg md:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Phone menu panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-4xl rounded-3xl border border-white/10 bg-black/95 p-6 backdrop-blur-xl md:hidden"
      >
        <ul className="space-y-1">
          {nav.map((n, i) => (
            <li key={n.href}>
              <a
                ref={i === 0 ? firstLink : undefined}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(n.href) ? "location" : undefined}
                className={`flex items-center justify-between py-3 text-2xl font-medium tracking-tight ${isActive(n.href) ? "text-fg" : "text-white/70"}`}
              >
                {n.label}
                {isActive(n.href) && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-white/10 pt-6">
          <Button href={bookHref} className="w-full">
            Book a call
          </Button>
          <a href={`mailto:${site.email}`} className="mt-4 block text-center text-sm text-muted hover:text-fg">
            {site.email}
          </a>
        </div>
      </div>
    </header>
  );
}
