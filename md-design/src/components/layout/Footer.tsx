"use client";

import Link from "next/link";
import GlassConsultLink from "@/components/ui/GlassConsultLink";

export default function Footer() {
  return (
    <footer className="bg-obsidian text-ivory relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center">
        <div className="text-[clamp(56px,8vw,140px)] leading-none tracking-[-0.04em] text-ivory/[0.045] uppercase">
         MD DESIGN
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] will-change-transform"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(247,244,239,0.16) 0, rgba(247,244,239,0.16) 1px, transparent 1px, transparent 112px), repeating-linear-gradient(to bottom, rgba(247,244,239,0.10) 0, rgba(247,244,239,0.10) 1px, transparent 1px, transparent 112px)",
          animation: "footerDrift 18s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -bottom-36 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(208,177,108,0.22), transparent 62%)",
          animation: "footerGlow 10.5s ease-in-out infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[-180px] h-[640px] w-[640px] rounded-full blur-3xl opacity-20 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(247,244,239,0.14), transparent 64%)",
          animation: "footerGlow 12.5s ease-in-out infinite alternate-reverse",
        }}
      />

      <div className="max-w-[1680px] mx-auto px-6 lg:px-12 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-14 items-start">
          <div style={{ animation: "footerRise 0.85s cubic-bezier(0.32,0.72,0,1) both" }}>
            <div className="flex items-center justify-between gap-6">
              <div className="text-[12px] uppercase tracking-[0.22em] text-ivory/70 font-medium">
                Studio
              </div>
              <div className="hidden sm:flex items-center gap-3 whitespace-nowrap">
                <span className="w-10 h-px bg-ivory/12" />
                <span className="text-[11px] uppercase tracking-[0.26em] text-ivory/55 font-medium">
                  [MD DESIGN]
                </span>
                <span className="w-10 h-px bg-ivory/12" />
              </div>
            </div>

            <div className="mt-7 text-[clamp(36px,4.2vw,58px)] leading-[1.02] tracking-[-0.02em] text-ivory max-w-[18ch]">
              A quiet, precise practice for high-end living spaces.
            </div>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { k: "Mail", v: "contact@mddesign.vn" },
                { k: "Hotline", v: "0968 883 311" },
                { k: "Studio", v: "Hà Nội | TP.HCM" },
              ].map((it) => (
                <div key={it.k} className="rounded-[14px] border border-ivory/12 bg-ivory/5 p-[2px]">
                  <div className="rounded-[12px] border border-ivory/10 bg-obsidian/55 px-5 py-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/55 font-medium">
                      {it.k}
                    </div>
                    <div className="mt-3 text-[13px] leading-5 text-ivory/85">
                      {it.v}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 w-full md:w-max">
              <GlassConsultLink
                href="/lien-he/"
                label="Nhận tư vấn theo dự án"
                variant="footer"
              />
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-10"
            style={{ animation: "footerRise 0.95s cubic-bezier(0.32,0.72,0,1) both" }}
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 font-medium">
                Liên kết
              </div>
              <div className="mt-6 flex flex-col gap-3 text-[13px]">
                {[
                  { href: "/gioi-thieu/", label: "Giới thiệu" },
                  { href: "/du-an/", label: "Dự án" },
                  { href: "/tin-tuc/", label: "Tin tức" },
                  { href: "/lien-he/", label: "Liên hệ" },
                ].map((it) => (
                  <Link
                    key={it.href}
                    className="inline-flex items-center text-ivory/85 hover:text-gold transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    href={it.href}
                  >
                    <span className="leading-none">{it.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/70 font-medium">
                Chi nhánh
              </div>
              <div className="mt-6 space-y-4 text-[13px] text-ivory/70 leading-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/45 font-medium">
                    Hà Nội
                  </div>
                  <div className="mt-1">123 Phố Kiến Trúc, Ba Đình</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/45 font-medium">
                    TP Hồ Chí Minh
                  </div>
                  <div className="mt-1">56 Đại Lộ Nội Thất, Quận 1</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-ivory/45 font-medium">
                    Hải Phòng
                  </div>
                  <div className="mt-1">7 Đường Bến Cảng, Ngô Quyền</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px bg-ivory/10" />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-ivory/60">
          <div>© {new Date().getFullYear()} MD DESIGN. All rights reserved.</div>
          <div className="flex gap-6">
            <Link
              className="hover:text-gold transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              href="/chinh-sach-bao-mat/"
            >
              Chính sách bảo mật
            </Link>
            <Link
              className="hover:text-gold transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              href="/thong-bao-phap-ly/"
            >
              Thông báo pháp lý
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

