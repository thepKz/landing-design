"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type NavItem = { href: string; label: string; key: string };

const LINKS: NavItem[] = [
  { key: "gioi-thieu", href: "/gioi-thieu/", label: "GIỚI THIỆU" },
  { key: "thiet-ke-villa", href: "/thiet-ke-villa/", label: "THIẾT KẾ VILLA" },
  { key: "thiet-ke-chung-cu", href: "/thiet-ke-chung-cu/", label: "THIẾT KẾ CHUNG CƯ" },
  { key: "cong-trinh", href: "/cong-trinh-thuc-te/", label: "CÔNG TRÌNH THỰC TẾ" },
  { key: "dich-vu", href: "/#dich-vu", label: "DỊCH VỤ" },
  { key: "tin-tuc", href: "/tin-tuc/", label: "TIN TỨC" },
  { key: "lien-he", href: "/lien-he/", label: "LIÊN HỆ" },
];

function CloseXButton({ onClick }: { onClick: () => void }): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-10 h-10 rounded-full border border-ivory/20 bg-black/10 hover:bg-black/20 transition-[background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
      aria-label="Đóng menu"
    >
      <span className="absolute inset-0 m-auto h-px w-5 bg-ivory/90 rotate-45" />
      <span className="absolute inset-0 m-auto h-px w-5 bg-ivory/90 -rotate-45" />
    </button>
  );
}

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const asideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const root = asideRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLAnchorElement>('a[data-mobile-nav="1"]')
    );
    gsap.set(items, { opacity: 0, y: 18 });

    const tl = gsap.timeline({ defaults: { duration: 1.05, ease: "power3.out" } });
    tl.to(items, {
      opacity: 1,
      y: 0,
      stagger: 0.09,
    });

    const cta = root.querySelector<HTMLElement>('[data-cta="mobile"]');
    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.35"
      );
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <aside
      ref={asideRef}
      className={[
        "fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-3xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        open ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-full pointer-events-none",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(247,244,239,0.12) 0, rgba(247,244,239,0.12) 1px, transparent 1px, transparent 88px), repeating-linear-gradient(to bottom, rgba(247,244,239,0.08) 0, rgba(247,244,239,0.08) 1px, transparent 1px, transparent 88px), radial-gradient(circle at 25% 20%, rgba(197,151,58,0.22), transparent 55%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="absolute top-6 right-6 z-[70] pointer-events-auto">
        <CloseXButton onClick={onClose} />
      </div>

      <div className="relative z-0 h-full flex flex-col">
        <div className="px-6 pt-24 pb-10">
          <div className="rounded-[16px] border border-ivory/12 bg-obsidian/40 p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold/95 font-medium">
              MENU
            </div>
            <div className="mt-3 text-[34px] leading-[1.0] font-medium text-ivory">
              MD
              <span className="ml-3 font-light text-ivory/80 tracking-[0.18em] uppercase text-[12px] align-top">
                DESIGN
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 pb-10">
          <div className="grid gap-3">
            {LINKS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className="min-h-12 flex items-center text-ivory/95 font-medium tracking-widest text-[13px] uppercase hover:text-gold transition-colors"
                data-mobile-nav="1"
              >
                <span className="w-full border-b border-ivory/15 pb-4">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-10" data-cta="mobile">
            <Link
              href="/lien-he/"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-[10px] bg-gold text-obsidian px-8 py-3 font-medium hover:bg-gold-light transition-colors active:translate-y-[1px] active:scale-[0.99]"
            >
              Nhận Tư Vấn Miễn Phí
              <span className="ml-2">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}

