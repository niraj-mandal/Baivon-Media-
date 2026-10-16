import { bookHref, nav, site } from "@/lib/site";
import { Logo } from "./nav";
import { SpotlightWordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pt-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">Content marketing, tech campaigns, UGC and clipping for tech brands.</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-sm hover:text-accent">
            {site.email}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Site</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[...nav, { label: "Book a call", href: bookHref }].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Social</p>
          <ul className="mt-4 flex gap-2">
            <SocialLink href={site.socials.linkedin} label="Baivon Media on LinkedIn">
              <span className="text-[13px] font-bold">in</span>
            </SocialLink>
            <SocialLink href={site.socials.instagram} label="Baivon Media on Instagram">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
              </svg>
            </SocialLink>
          </ul>
        </div>
      </div>

      <SpotlightWordmark />

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-xs text-muted">
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          <span>© 2026 Baivon Media</span>
          <a href="/privacy" className="hover:text-fg">
            Privacy
          </a>
          <a href="/terms" className="hover:text-fg">
            Terms
          </a>
        </span>
        <a href="#" className="hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent"
      >
        {children}
      </a>
    </li>
  );
}
