/** V monogram glyph: two arms meeting at a point, the same mark as public/logo.svg. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} fill="currentColor" aria-hidden>
      <path d="M0 0H30L60 60L90 0H120L72 96H48Z" />
    </svg>
  );
}

/** The glowing V app icon used as the hero object and distribution hub. */
export function BrandOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto grid size-20 place-items-center ${className}`} aria-hidden>
      <span className="orb-ring absolute inset-0 rounded-[24px] border border-accent/50" />
      <span className="orb-ring absolute inset-0 rounded-[24px] border border-accent/30 [animation-delay:1.3s]" />
      <span className="relative grid size-full place-items-center rounded-[24px] border border-accent/30 bg-[#050505] shadow-[0_0_80px_-12px_rgb(201_206_214/0.45)]">
        <LogoMark className="h-8 w-auto text-accent" />
      </span>
    </div>
  );
}
