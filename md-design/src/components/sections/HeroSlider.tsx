"use client";

import Image from "next/image";
import GlassConsultLink from "@/components/ui/GlassConsultLink";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type Slide = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  imageUrl: string;
};

const SLIDES: Slide[] = [
  {
    id: "s1",
    label: "THIẾT KẾ NỘI THẤT CAO CẤP",
    heading: "Kiến Tạo Không Gian Sống Đẳng Cấp",
    subheading: "Thiết kế nội thất biệt thự & penthouse cao cấp",
    imageUrl:
      "https://picsum.photos/seed/md-design-hero-1/1920/1080",
  },
  {
    id: "s2",
    label: "TỪNG CHI TIẾT LÀ MỘT TÁC PHẨM",
    heading: "Từng Chi Tiết Là Một Tác Phẩm",
    subheading: "Hơn 150 công trình villa cao cấp trên toàn quốc",
    imageUrl:
      "https://picsum.photos/seed/md-design-hero-2/1920/1080",
  },
  {
    id: "s3",
    label: "ĐỒNG HÀNH TỪ Ý TƯỞNG",
    heading: "Đồng Hành Từ Ý Tưởng Đến Hoàn Thiện",
    subheading: "Trọn gói thiết kế – thi công – bàn giao chìa khóa",
    imageUrl:
      "https://picsum.photos/seed/md-design-hero-3/1920/1080",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const mobileImageRef = useRef<HTMLDivElement | null>(null);
  const bgGridRef = useRef<HTMLDivElement | null>(null);
  const bgOrbsRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const isTransitioningRef = useRef(false);

  const active = useMemo(() => SLIDES[activeIndex] ?? SLIDES[0], [activeIndex]);

  const goToSlide = useCallback((nextIndex: number, forcedDir?: 1 | -1) => {
    if (nextIndex === activeIndex || isTransitioningRef.current) return;
    const root = rootRef.current;
    if (!root) {
      setActiveIndex(nextIndex);
      return;
    }

    const dir =
      forcedDir ??
      ((nextIndex - activeIndex + SLIDES.length) % SLIDES.length > SLIDES.length / 2 ? -1 : 1);
    setDirection(dir);
    isTransitioningRef.current = true;

    const title = root.querySelector<HTMLElement>('[data-hero="title"]');
    const spec = root.querySelector<HTMLElement>('[data-hero="spec"]');
    const ctas = Array.from(root.querySelectorAll<HTMLElement>('[data-hero="cta"]'));
    const imageWrap = root.querySelector<HTMLElement>('[data-hero="image-wrap"]');
    const mobileWrap = root.querySelector<HTMLElement>('[data-hero="mobile-wrap"]');

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setActiveIndex(nextIndex);
      },
    });

    if (imageWrap) {
      tl.to(
        imageWrap,
        {
          scale: 0.96,
          opacity: 0.72,
          filter: "blur(4px)",
          duration: 0.8,
        },
        0
      );
    }
    if (mobileWrap) {
      tl.to(
        mobileWrap,
        {
          scale: 0.97,
          opacity: 0.8,
          filter: "blur(3px)",
          duration: 0.72,
        },
        0
      );
    }
    if (title) tl.to(title, { x: -18 * dir, opacity: 0, duration: 0.5 }, 0);
    if (spec) tl.to(spec, { x: -12 * dir, opacity: 0, duration: 0.46 }, 0.04);
    if (ctas.length) tl.to(ctas, { x: -10 * dir, opacity: 0, duration: 0.44, stagger: 0.04 }, 0.06);
  }, [activeIndex]);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => {
      goToSlide((activeIndex + 1) % SLIDES.length, 1);
    }, 6400);
    return () => window.clearTimeout(t);
  }, [paused, activeIndex, goToSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const label = textRef.current?.querySelector<HTMLElement>('[data-hero="label"]');
      const title = textRef.current?.querySelector<HTMLElement>('[data-hero="title"]');
      const spec = textRef.current?.querySelector<HTMLElement>('[data-hero="spec"]');
      const ctas = Array.from(
        textRef.current?.querySelectorAll<HTMLElement>('[data-hero="cta"]') ?? []
      );
      const imagePlate = imageRef.current?.querySelector<HTMLElement>('[data-hero="image-plate"]');
      const imageWrap = imageRef.current?.querySelector<HTMLElement>('[data-hero="image-wrap"]');
      const imageMask = imageRef.current?.querySelector<HTMLElement>('[data-hero="image-mask"]');
      const frameNote = imageRef.current?.querySelector<HTMLElement>('[data-hero="frame-note"]');

      if (label) gsap.set(label, { opacity: 0, x: 14 * direction });
      if (title) gsap.set(title, { opacity: 0, x: 24 * direction, filter: "blur(4px)" });
      if (spec) {
        gsap.set(spec, {
          opacity: 0,
          x: 18 * direction,
          rotateX: 6,
          transformPerspective: 800,
          filter: "blur(3px)",
        });
      }
      if (ctas.length) gsap.set(ctas, { opacity: 0, x: 14 * direction, filter: "blur(2px)" });

      if (imageRef.current) gsap.set(imageRef.current, { opacity: 1 });
      if (imagePlate) gsap.set(imagePlate, { opacity: 0, y: 10, rotate: 0.15, transformOrigin: "50% 50%" });
      if (imageMask) gsap.set(imageMask, { scaleX: 1.06, opacity: 0.0, transformOrigin: "50% 50%" });
      if (frameNote) gsap.set(frameNote, { opacity: 0, y: 10 });
      if (imageWrap) gsap.set(imageWrap, { scale: 1.06, filter: "blur(4px)", opacity: 0.78 });
      if (mobileImageRef.current) gsap.set(mobileImageRef.current, { scale: 1.05, filter: "blur(4px)", opacity: 0.76 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (imagePlate) tl.to(imagePlate, { opacity: 1, y: 0, rotate: 0, duration: 1.15 }, 0);
      if (imageWrap) {
        tl.to(
          imageWrap,
          { scale: 1.01, filter: "blur(0px)", opacity: 1, duration: 1.28, ease: "power2.out" },
          0
        );
        tl.to(
          imageWrap,
          { scale: 0.99, duration: 3.9, ease: "none" },
          1.05
        );
      }
      if (imageMask) tl.to(imageMask, { opacity: 1, scaleX: 1, duration: 1.28, ease: "power2.out" }, 0);
      if (frameNote) tl.to(frameNote, { opacity: 1, y: 0, duration: 0.95 }, 0.45);

      if (label) tl.to(label, { opacity: 1, x: 0, duration: 0.75 }, 0.05);
      if (title) tl.to(title, { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.05 }, 0.12);
      if (spec) tl.to(spec, { opacity: 1, x: 0, rotateX: 0, filter: "blur(0px)", duration: 1.1 }, 0.2);
      if (ctas.length) {
        tl.to(
          ctas,
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.88, stagger: 0.065 },
          0.32
        );
      }

      if (spec) {
        gsap.to(spec, {
          y: "-=4",
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (frameNote) {
        gsap.to(frameNote, {
          y: "+=4",
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (mobileImageRef.current) {
        gsap.to(mobileImageRef.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power2.out",
        });
      }

      isTransitioningRef.current = false;
    }, rootRef);

    return () => ctx.revert();
  }, [activeIndex, direction]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgGridRef.current) {
        gsap.fromTo(
          bgGridRef.current,
          { x: -18, y: -12, rotate: -0.25, opacity: 0.24 },
          {
            x: 18,
            y: 14,
            rotate: 0.25,
            opacity: 0.34,
            duration: 12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }

      const orbs = bgOrbsRef.current?.querySelectorAll<HTMLElement>(
        '[data-bg-orb="1"]'
      );
      if (orbs?.length) {
        const [a, b] = Array.from(orbs);
        if (a) {
          gsap.fromTo(
            a,
            { x: -40, y: 28, scale: 0.98, opacity: 0.55 },
            {
              x: 42,
              y: -26,
              scale: 1.02,
              opacity: 0.7,
              duration: 9.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        }
        if (b) {
          gsap.fromTo(
            b,
            { x: 36, y: -22, scale: 1.03, opacity: 0.4 },
            {
              x: -44,
              y: 30,
              scale: 0.97,
              opacity: 0.6,
              duration: 11.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="md-hero"
      className="relative min-h-[100dvh] overflow-hidden bg-obsidian"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={bgOrbsRef} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          data-bg-orb="1"
          className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(208,177,108,0.22), transparent 60%)",
          }}
        />
        <div
          data-bg-orb="1"
          className="absolute -right-28 top-[18%] h-[560px] w-[560px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(247,244,239,0.16), transparent 62%)",
          }}
        />
      </div>

      <div
        ref={bgGridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 will-change-transform"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(247,244,239,0.10) 0, rgba(247,244,239,0.10) 1px, transparent 1px, transparent 92px), repeating-linear-gradient(to bottom, rgba(247,244,239,0.06) 0, rgba(247,244,239,0.06) 1px, transparent 1px, transparent 92px), radial-gradient(circle at 15% 20%, rgba(197,151,58,0.18), transparent 52%), radial-gradient(circle at 78% 35%, rgba(247,244,239,0.10), transparent 56%)",
          mixBlendMode: "screen",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 2px, transparent 4px)",
        }}
      />

      <div ref={mobileImageRef} data-hero="mobile-wrap" className="absolute inset-0 lg:hidden">
        <Image
          src={active.imageUrl}
          alt="Hình ảnh không gian nội thất"
          fill
          priority={activeIndex === 0}
          sizes="100vw"
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/70 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1680px] mx-auto px-6 lg:px-12 pt-28 md:pt-32 lg:pt-[9.25rem] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:gap-y-14 items-end">
          <div ref={textRef} className="lg:col-span-5 pb-2">
            <div className="flex items-center justify-between gap-6">
              <div
                data-hero="label"
                className="text-[11px] uppercase tracking-[0.26em] font-medium text-gold/90"
              >
                {active.label}
              </div>
              <div className="hidden sm:flex items-center gap-3 whitespace-nowrap leading-none">
                <span className="w-10 h-px bg-ivory/15" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-ivory/60 font-medium leading-[1]">
                  [MD DESIGN]
                </span>
                <span className="w-10 h-px bg-ivory/15" />
              </div>
            </div>

            <h1
              data-hero="title"
              className="mt-6 text-[clamp(46px,5.2vw,84px)] leading-[0.96] font-normal text-ivory tracking-[-0.03em] text-balance"
            >
              {active.heading}
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-6">
              <div data-hero="spec" className="rounded-[18px] border border-ivory/10 bg-ivory/[0.04] p-[2px]">
                <div className="rounded-[16px] border border-ivory/10 bg-[#0f0e0b]/70 px-6 py-5">
                  <div className="flex items-center justify-between gap-6">
                    <div className="text-[10px] uppercase tracking-[0.26em] text-ivory/55 font-medium">
                      Spec
                    </div>
                    <div className="w-full h-px bg-ivory/10" />
                    <div className="text-[10px] uppercase tracking-[0.26em] text-ivory/55 font-medium">
                      03
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] leading-7 text-white max-w-[52ch]">
                    {active.subheading}
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-end">
                <GlassConsultLink
                  href="/lien-he/"
                  label="Nhận Tư Vấn"
                  variant="hero"
                  withHeroCtaMarker
                />
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative lg:col-span-7 hidden lg:block lg:mt-3 lg:pt-1"
          >
            <div className="relative">
              <div className="absolute -right-7 -bottom-7 -z-10 h-[72%] w-[78%] rounded-[28px] bg-ivory/[0.04] border border-ivory/10" />
              <div data-hero="image-plate" className="relative rounded-[22px] border border-ivory/12 bg-obsidian/25 p-2">
                <div className="relative rounded-[20px] border border-ivory/12 overflow-hidden bg-obsidian/60">
                  <div data-hero="image-wrap" className="relative h-[560px] will-change-transform">
                    <Image
                      src={active.imageUrl}
                      alt="Hình ảnh không gian nội thất"
                      fill
                      priority={activeIndex === 0}
                      sizes="(min-width: 1024px) 58vw"
                      unoptimized
                      className="object-cover"
                    />
                    <div data-hero="image-mask" className="absolute inset-0 bg-obsidian/30 pointer-events-none" />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to right, rgba(247,244,239,0.18) 0, rgba(247,244,239,0.18) 1px, transparent 1px, transparent 144px), repeating-linear-gradient(to bottom, rgba(247,244,239,0.10) 0, rgba(247,244,239,0.10) 1px, transparent 1px, transparent 144px)",
                      }}
                    />
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 p-5">
                    <div data-hero="frame-note" className="rounded-[16px] border border-ivory/12 bg-[#0f0e0b]/70 p-[2px]">
                      <div className="rounded-[14px] border border-ivory/10 bg-[#0f0e0b]/72 px-5 py-4">
                        <div className="flex items-center justify-between gap-6">
                          <div className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 font-medium">
                            Frame
                          </div>
                          <div className="w-full h-px bg-ivory/10" />
                          <div className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 font-medium whitespace-nowrap">
                            {String(activeIndex + 1).padStart(2, "0")} / 03
                          </div>
                        </div>
                        <div className="mt-3 text-[13px] leading-6 text-ivory/75 max-w-[62ch]">
                          Một lát cắt ánh sáng — vật liệu — tỷ lệ. Chúng tôi giữ mọi thứ đúng nhịp để “đắt” mà không phô.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 lg:left-12 z-20 flex flex-col items-start gap-4 pointer-events-auto">
        <div className="flex flex-row items-end gap-3">
          {SLIDES.map((s, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Chuyển tới slide ${i + 1}`}
                className={[
                  "relative w-[64px] h-[44px] overflow-hidden border transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive ? "border-gold" : "border-ivory/14",
                ].join(" ")}
              >
                <Image
                  src={s.imageUrl}
                  alt={s.heading}
                  fill
                  sizes="64px"
                  unoptimized
                  className={[
                    "object-cover",
                    isActive ? "opacity-100" : "opacity-70 grayscale",
                  ].join(" ")}
                />
                <span className="pointer-events-none absolute inset-0 bg-obsidian/45" />
                <span className="pointer-events-none absolute left-2 top-2 text-[10px] uppercase tracking-[0.18em] text-ivory/75">
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

