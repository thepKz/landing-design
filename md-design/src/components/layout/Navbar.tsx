"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import GlassConsultLink from "@/components/ui/GlassConsultLink";
import { useUiStore } from "@/lib/stores/uiStore";

function BrandMark() {
  return (
    <div className="flex items-end gap-3">
      <span className="font-semibold tracking-wide text-[22px] leading-none text-ivory">
        MD
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-light tracking-[0.28em] text-[12px] uppercase text-ivory">
          DESIGN
        </span>
        <span className="h-px w-[52px] bg-gold/85" />
      </div>
    </div>
  );
}

export default function Navbar() {
  const { lang, setMobileMenuOpen, mobileMenuOpen, setLang } = useUiStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroDark, setHeroDark] = useState(true);
  const [projectOpen, setProjectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navLinks = useMemo(
    () => [
      { key: "gioi-thieu", label: "GIỚI THIỆU", href: "/gioi-thieu/" },
      { key: "dich-vu", label: "DỊCH VỤ", href: "/#dich-vu" },
      { key: "tin-tuc", label: "TIN TỨC", href: "/tin-tuc/" },
      { key: "lien-he", label: "LIÊN HỆ", href: "/lien-he/" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const parseRgb = (value: string): [number, number, number] | null => {
      const m = value.match(/\d+(\.\d+)?/g);
      if (!m || m.length < 3) return null;
      return [Number(m[0]), Number(m[1]), Number(m[2])];
    };

    const luminance = (r: number, g: number, b: number): number =>
      0.2126 * r + 0.7152 * g + 0.0722 * b;

    const detectBackgroundDark = (): boolean => {
      const x = Math.floor(window.innerWidth * 0.5);
      const y = Math.min(Math.floor(window.innerHeight - 1), 110);
      let el = document.elementFromPoint(x, y) as HTMLElement | null;
      while (el) {
        const bg = window.getComputedStyle(el).backgroundColor;
        const rgb = parseRgb(bg);
        if (rgb) {
          const alphaMatch = bg.match(/rgba?\(([^)]+)\)/);
          const alphaParts = alphaMatch?.[1]?.split(",").map((s) => s.trim());
          const alpha = alphaParts && alphaParts.length === 4 ? Number(alphaParts[3]) : 1;
          if (!Number.isNaN(alpha) && alpha > 0.08) {
            return luminance(rgb[0], rgb[1], rgb[2]) < 110;
          }
        }
        el = el.parentElement;
      }
      return true;
    };

    const update = () => {
      raf = window.requestAnimationFrame(() => {
        setHeroDark(detectBackgroundDark());
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!projectOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      const el = dropdownRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setProjectOpen(false);
      }
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [projectOpen]);

  /* Chỉ khi đã scroll mới dùng nền đặc + đổi palette theo vùng sáng/tối.
     Ở đỉnh trang không kích hoạt theo heroDark — nền ivory của #md-hero
     khiến elementFromPoint báo "sáng" và làm thanh nav ivory chồng lên hero. */
  const useSolidBar = isScrolled;
  const barBg = useSolidBar
    ? heroDark
      ? "bg-obsidian/88 backdrop-blur-md"
      : "bg-ivory/92 backdrop-blur-md"
    : "bg-transparent";
  const barBorder = isScrolled
    ? heroDark
      ? "border border-ivory/10"
      : "border border-border/80"
    : "border border-transparent";
  const barText = useSolidBar ? (heroDark ? "text-ivory" : "text-obsidian") : "text-ivory";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-[1680px] px-6 lg:px-12 py-6">
          <div
            className={[
              "h-[66px] rounded-[12px] overflow-visible",
              "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
              barBg,
              barBorder,
              barText,
            ].join(" ")}
          >
            <div className="h-full px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <BrandMark />
              </Link>

              <nav className="hidden lg:flex items-center gap-10 text-gold">
                <div className="flex items-center gap-6">
                  <Link
                    href="/gioi-thieu/"
                    className="text-[12px] uppercase tracking-[0.2em] text-current hover:text-gold-light transition-colors font-medium"
                  >
                    GIỚI THIỆU
                  </Link>

                  <div
                    className="relative"
                    onMouseEnter={() => setProjectOpen(true)}
                    onMouseLeave={() => setProjectOpen(false)}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-[12px] uppercase tracking-[0.2em] leading-none text-current hover:text-gold-light transition-colors font-medium"
                      aria-expanded={projectOpen}
                    >
                      <span>DỰ ÁN</span>
                      <span className="text-gold/70 text-[10px] leading-none">▼</span>
                    </button>

                    <div
                      ref={dropdownRef}
                      className={[
                        "absolute left-1/2 top-full z-[70] w-[320px] -translate-x-1/2 pt-2.5",
                        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        projectOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden rounded-[16px] border border-gold/40 bg-[#0f0e0b] shadow-[0_22px_50px_-24px_rgba(0,0,0,0.85)]">
                      <div className="p-4">
                        <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/60 font-medium">
                          Nhóm hạng mục
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-2">
                          <Link
                            href="/thiet-ke-villa/"
                            className="rounded-[10px] border border-ivory/10 px-4 py-3 hover:border-gold/55 transition-colors duration-300"
                          >
                            <div className="text-ivory/95 font-medium tracking-[0.08em]">
                              Thiết Kế Villa
                            </div>
                          </Link>
                          <Link
                            href="/thiet-ke-chung-cu/"
                            className="rounded-[10px] border border-ivory/10 px-4 py-3 hover:border-gold/55 transition-colors duration-300"
                          >
                            <div className="text-ivory/95 font-medium tracking-[0.08em]">
                              Thiết Kế Chung Cư
                            </div>
                          </Link>
                          <Link
                            href="/cong-trinh-thuc-te/"
                            className="rounded-[10px] border border-ivory/10 px-4 py-3 hover:border-gold/55 transition-colors duration-300"
                          >
                            <div className="text-ivory/95 font-medium tracking-[0.08em]">
                              Công Trình Thực Tế
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="h-px w-full bg-ivory/10" />
                      <div className="p-4">
                        <Link
                          href="/du-an/"
                          className="text-gold font-medium hover:text-gold-light transition-colors duration-300"
                        >
                          Xem tất cả dự án →
                        </Link>
                      </div>
                      </div>
                    </div>
                  </div>

                  {navLinks
                    .filter((x) => x.key !== "gioi-thieu")
                    .map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="text-[12px] uppercase tracking-[0.2em] text-current hover:text-gold-light transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              </nav>

              <div className="hidden md:flex items-center gap-6">
                <GlassConsultLink
                  href="/lien-he/"
                  label="Nhận Tư Vấn Miễn Phí"
                  variant="nav"
                />
              </div>

              <div className="lg:hidden flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLang(lang === "vi" ? "en" : "vi")}
                  className="rounded-full border border-ivory/20 bg-black/10 px-3 py-2 text-[12px] uppercase tracking-[0.18em] font-medium text-ivory/90 hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {lang.toUpperCase()}
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="relative w-12 h-12 rounded-full border border-ivory/20 bg-black/10 hover:bg-black/20 transition-colors"
                  aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  <span
                    className={[
                      "absolute left-1/2 top-1/2 w-5 h-px bg-ivory/90 -translate-x-1/2 -translate-y-2 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      mobileMenuOpen ? "rotate-45" : "rotate-0",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-1/2 top-1/2 w-5 h-px bg-ivory/90 -translate-x-1/2 -translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      mobileMenuOpen ? "opacity-0" : "opacity-100",
                    ].join(" ")}
                  />
                  <span
                    className={[
                      "absolute left-1/2 top-1/2 w-5 h-px bg-ivory/90 -translate-x-1/2 translate-y-2 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      mobileMenuOpen ? "-rotate-45" : "rotate-0",
                    ].join(" ")}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}

