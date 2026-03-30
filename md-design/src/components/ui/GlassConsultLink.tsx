"use client";

import Link from "next/link";

type Variant = "nav" | "hero" | "footer";

const shell =
  "w-max max-w-full overflow-hidden rounded-[999px] border border-gold/35 bg-[#0d0c09]/86 p-[2px] shadow-[0_18px_42px_-24px_rgba(0,0,0,0.75)]";

/** Blur on its own layer (no border on that layer) avoids Chrome/Edge fringe at rounded corners. */
const innerBase =
  "group relative isolate w-full items-center justify-between rounded-[999px] border border-gold/35 bg-transparent font-semibold text-ivory transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/60 hover:-translate-y-[1px] overflow-hidden shadow-[inset_0_0_0_1px_rgba(12,11,9,0.92)] [transform:translateZ(0)] backface-hidden active:translate-y-[1px] active:scale-[0.99]";

/** Inset 1px so backdrop sample does not halo past the rounded clip at the top edge. */
const innerBlurLayer =
  "pointer-events-none absolute inset-px z-0 rounded-[999px] bg-[#0d0c09]/65 backdrop-blur-md";

const innerTintLayer =
  "pointer-events-none absolute inset-px z-[1] rounded-[999px] bg-[linear-gradient(132deg,rgba(20,18,14,0.94)_0%,rgba(16,14,11,0.9)_52%,rgba(12,11,8,0.92)_100%)]";

const variantInner: Record<Variant, string> = {
  nav: "inline-flex w-max max-w-none items-center gap-3 px-5 py-2.5 whitespace-nowrap",
  hero: "inline-flex items-center gap-4 px-6 py-3",
  footer: "inline-flex items-center gap-5 px-7 py-4",
};

const labelClass: Record<Variant, string> = {
  nav: "relative shrink-0 text-left text-[11px] font-semibold uppercase leading-tight tracking-[0.08em] sm:text-[12px]",
  hero: "relative whitespace-nowrap text-[14px] font-semibold leading-none tracking-[0.02em]",
  footer: "relative text-[14px] font-semibold leading-none tracking-[0.02em]",
};

const iconWrap: Record<Variant, string> = {
  nav: "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/12 transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:scale-105",
  hero: "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/12 transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:scale-105",
  footer: "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-gold/12 transition-transform duration-500 group-hover:translate-x-[2px] group-hover:-translate-y-[1px] group-hover:scale-105",
};

const iconText: Record<Variant, string> = {
  nav: "text-[13px] font-medium leading-none text-gold-light",
  hero: "text-gold-light",
  footer: "text-gold-light",
};

type Props = {
  href: string;
  label: string;
  variant: Variant;
  /** Chỉ hero: GSAP chọn [data-hero="cta"] */
  withHeroCtaMarker?: boolean;
  className?: string;
};

export default function GlassConsultLink({
  href,
  label,
  variant,
  withHeroCtaMarker = false,
  className,
}: Props) {
  return (
    <div
      className={[shell, className].filter(Boolean).join(" ")}
      {...(withHeroCtaMarker ? { "data-hero": "cta" as const } : {})}
    >
      <Link
        href={href}
        className={[innerBase, variantInner[variant]].join(" ")}
      >
        <span aria-hidden="true" className={innerBlurLayer} />
        <span aria-hidden="true" className={innerTintLayer} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-[2] rounded-[999px] opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(720px 140px at 42% 62%, rgba(247,244,239,0.08), transparent 55%), radial-gradient(640px 160px at 100% 118%, rgba(208,177,108,0.18), transparent 65%)",
          }}
        >
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[36%] max-w-[120px] -translate-x-full rotate-[15deg] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0)_100%)] opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[320%] group-hover:opacity-100"
        >
        </span>
        <span className={`relative z-[3] ${labelClass[variant]}`}>{label}</span>
        <span className={`relative z-[3] ${iconWrap[variant]}`}>
          <span className={iconText[variant]}>→</span>
        </span>
      </Link>
    </div>
  );
}
