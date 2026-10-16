/** BM monogram glyph, cropped from public/logo.svg (the full app-icon version). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="430 588 310 247" className={className} fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M430 588H527L643 704L740 607V835H701V703L643 759L512 626H467V686H538L601 749L514 835H430ZM467 722H521L548 749L497 798H467Z"
      />
    </svg>
  );
}

/** The glowing BM app icon used as the hero object and distribution hub. */
export function BrandOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto grid size-20 place-items-center ${className}`} aria-hidden>
      <span className="orb-ring absolute inset-0 rounded-[24px] border border-accent/50" />
      <span className="orb-ring absolute inset-0 rounded-[24px] border border-accent/30 [animation-delay:1.3s]" />
      <span className="relative grid size-full place-items-center rounded-[24px] border border-accent/30 bg-[#050505] shadow-[0_0_80px_-12px_rgb(30_217_123/0.7)]">
        <LogoMark className="h-8 w-auto text-accent" />
      </span>
    </div>
  );
}
