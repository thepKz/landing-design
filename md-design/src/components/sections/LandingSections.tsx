"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Villa Vinhomes Gardenia",
    city: "Hà Nội",
    area: "450m²",
    image: "https://picsum.photos/id/1048/1200/1500.jpg",
  },
  {
    title: "Grand Marina Penthouse",
    city: "TP. Hồ Chí Minh",
    area: "320m²",
    image: "https://picsum.photos/id/1067/1200/1500.jpg",
  },
  {
    title: "Biệt Thự Tĩnh Viên",
    city: "Hưng Yên",
    area: "600m²",
    image: "https://picsum.photos/id/1025/1200/1500.jpg",
  },
];

const storyImages = [
  { src: "https://picsum.photos/id/1062/1200/900.jpg", alt: "Không gian nội thất" },
  { src: "https://picsum.photos/id/1003/1200/900.jpg", alt: "Chi tiết kiến trúc" },
  { src: "https://picsum.photos/id/1027/1200/900.jpg", alt: "Vật liệu & ánh sáng" },
];

const services = [
  {
    title: "Thiết kế kiến trúc và sân vườn",
    desc: "Quy hoạch theo tỷ lệ sống.",
    image: "https://picsum.photos/id/1011/1200/900.jpg",
    chip: "Kiến trúc",
  },
  {
    title: "Thiết kế nội thất cao cấp",
    desc: "Ngôn ngữ vật liệu tinh gọn.",
    image: "https://picsum.photos/id/1009/1200/900.jpg",
    chip: "Nội thất",
  },
  {
    title: "Thi công hoàn thiện trọn gói",
    desc: "Chất lượng theo từng mốc.",
    image: "https://picsum.photos/id/1026/1200/900.jpg",
    chip: "Thi công",
  },
  {
    title: "Bàn giao chìa khóa trao tay",
    desc: "Tinh chỉnh trước khi bàn giao.",
    image: "https://picsum.photos/id/1035/1200/900.jpg",
    chip: "Bàn giao",
  },
] as const;

export default function LandingSections() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wipeRef = useRef<HTMLDivElement | null>(null);
  const section1Ref = useRef<HTMLElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const gridDriftRef = useRef<HTMLDivElement | null>(null);
  const flowSectionRef = useRef<HTMLElement | null>(null);
  const flowProgressRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const servicesProgressRef = useRef<HTMLDivElement | null>(null);
  const marqueeSectionRef = useRef<HTMLElement | null>(null);
  const projectCardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-lr]").forEach((el) => {
        const dir = el.dataset.revealLr === "left" ? -1 : 1;
        gsap.fromTo(
          el,
          { x: 54 * dir, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-reveal-item]");
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 22, opacity: 0, filter: "blur(3px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 84%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      });

      const imageDetailGrid = rootRef.current?.querySelector<HTMLElement>("[data-reveal-grid]");
      if (imageDetailGrid) {
        const cells = imageDetailGrid.querySelectorAll<HTMLElement>("[data-reveal-cell]");
        if (cells.length) {
          gsap.fromTo(
            cells,
            { y: 26, opacity: 0, scale: 0.985, filter: "blur(2px)" },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.12,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageDetailGrid,
                start: "top 83%",
                once: true,
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      const marqueeEls = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>("[data-marquee]") ?? []
      );
      if (marqueeEls.length) {
        gsap.set(marqueeEls, { xPercent: 0 });
        gsap.to(marqueeEls, {
          xPercent: -50,
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      }

      const sectionEl = section1Ref.current;
      const blob1El = blob1Ref.current;
      const blob2El = blob2Ref.current;
      const gridEl = gridDriftRef.current;

      if (sectionEl && blob1El && blob2El && gridEl) {
        const blob1Tween = gsap.to(blob1El, {
          x: 54,
          y: -28,
          scale: 1.06,
          duration: 10.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        const blob2Tween = gsap.to(blob2El, {
          x: -46,
          y: 22,
          scale: 0.98,
          duration: 12.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        const gridTween = gsap.to(gridEl, {
          x: -18,
          y: 10,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true,
        });

        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top 80%",
          end: "bottom 30%",
          onEnter: () => {
            blob1Tween.resume();
            blob2Tween.resume();
            gridTween.resume();
          },
          onLeave: () => {
            blob1Tween.pause();
            blob2Tween.pause();
            gridTween.pause();
          },
          onEnterBack: () => {
            blob1Tween.resume();
            blob2Tween.resume();
            gridTween.resume();
          },
          onLeaveBack: () => {
            blob1Tween.pause();
            blob2Tween.pause();
            gridTween.pause();
          },
        });
      }

      const wipeEl = wipeRef.current;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-md-section]")
      );
      if (wipeEl && sections.length) {
        let wipeDidRun = false;
        sections.forEach((sec) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 70%",
            end: "top 40%",
            onEnter: () => {
              if (wipeDidRun) return;
              wipeDidRun = true;
              gsap.fromTo(
                wipeEl,
                { opacity: 0, yPercent: -35 },
                {
                  opacity: 1,
                  yPercent: 15,
                  duration: 0.9,
                  ease: "power3.out",
                  onComplete: () => {
                    gsap.to(wipeEl, {
                      opacity: 0,
                      yPercent: 35,
                      duration: 1.1,
                      ease: "power2.out",
                    });
                  },
                }
              );
            },
          });
        });
      }

      const servicesEl = servicesSectionRef.current;
      const servicesProgEl = servicesProgressRef.current;
      if (servicesEl && servicesProgEl) {
        gsap.fromTo(
          servicesProgEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: servicesEl,
              start: "top 70%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      }

      const flowEl = flowSectionRef.current;
      const flowProgEl = flowProgressRef.current;
      if (flowEl && flowProgEl) {
        gsap.fromTo(
          flowProgEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: flowEl,
              start: "top 70%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      }

      const marqueeEl = marqueeSectionRef.current;
      if (marqueeEl) {
        // "Chạm top" có header fixed: mép trên của band chạm mép dưới navbar (py-6 + h-[66px] + py-6 ≈ 114px).
        // Không dùng "top 90%" (viewport) — đó là gần đáy màn hình, sai.
        // Không dùng top-= — đẩy mốc trigger sai.
        const NAV_BOTTOM = 130;
        ScrollTrigger.create({
          trigger: marqueeEl,
          start: `top top+=${NAV_BOTTOM}`,
          end: `bottom top+=${NAV_BOTTOM}`,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            marqueeEl.classList.toggle("is-at-top", self.isActive);
          },
        });
      }

      projectCardRefs.current.forEach((card) => {
        if (!card) return;
        const image = card.querySelector("img");
        const overlay = card.querySelector<HTMLElement>("[data-project-overlay]");
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.12, yPercent: 6 },
            {
              scale: 1,
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "bottom top+=10%",
                scrub: true,
              },
            }
          );
        }
        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 0.9 },
            {
              opacity: 0.64,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "bottom top+=10%",
                scrub: true,
              },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="bg-ivory md-architect-stripes relative">
      <div ref={wipeRef} aria-hidden="true" className="md-section-wipe" />
      {/* Section 1: editorial collage (ít chữ, nhiều ảnh) */}
      <section data-md-section className="py-24 lg:py-28 border-t border-border/70">
        <div
          ref={(el: HTMLDivElement | null) => {
            section1Ref.current = el;
          }}
          className="max-w-[1680px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 relative"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div
              ref={gridDriftRef}
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(0,0,0,0.20) 0, rgba(0,0,0,0.20) 1px, transparent 1px, transparent 92px), repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 92px)",
              }}
            />
            <div
              ref={blob1Ref}
              className="absolute left-[10%] top-[20%] w-[420px] h-[420px] rounded-full blur-[34px] opacity-[0.55]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 30%, rgba(208,177,108,0.65), transparent 60%)",
              }}
            />
            <div
              ref={blob2Ref}
              className="absolute left-[64%] top-[0%] w-[360px] h-[360px] rounded-full blur-[30px] opacity-[0.38]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 40% 40%, rgba(247,244,239,0.75), transparent 58%)",
              }}
            />
          </div>
          <div className="pt-2" data-reveal-stagger>
            <p data-reveal-item className="text-[11px] uppercase tracking-[0.18em] text-stone font-medium">
              Atelier Notes
            </p>
            <h2 data-reveal-item className="mt-5 text-obsidian leading-[1.08] max-w-[26ch]">
              Tối giản có cấu trúc. Từng đường thở là một lựa chọn.
            </h2>
            <div data-reveal-item className="mt-7 w-14 h-px bg-gold" />
            <p data-reveal-item className="mt-6 text-[16px] leading-7 text-[#4e4a43] max-w-[54ch]">
              Chúng tôi giữ nhịp thị giác bằng khoảng trắng, giới hạn màu và ưu tiên vật liệu
              thật để không gian sống lên tiếng.
            </p>

            <div
              data-reveal-item
              className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-x-4 md:gap-y-6 md:items-start"
            >
              <div className="md:col-span-7 rounded-[14px] border border-border/90 bg-surface p-5 md:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/30">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
                  <div className="text-[clamp(2.1rem,4.5vw,2.75rem)] leading-[0.95] font-normal tabular-nums tracking-tight text-gold">
                    150+
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-stone md:pb-0.5 md:[writing-mode:vertical-rl] md:rotate-180">
                    Villa
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 md:translate-y-7 rounded-[14px] border border-border bg-surface/95 p-5 md:p-6 shadow-[0_18px_44px_-32px_rgba(0,0,0,0.12)] transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-gold/28 md:hover:-translate-y-[1px]">
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-4">
                  <div className="text-[clamp(2.1rem,4.5vw,2.75rem)] leading-[0.95] font-normal tabular-nums tracking-tight text-gold">
                    100+
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-stone md:pb-0.5 md:[writing-mode:vertical-rl] md:rotate-180">
                    Căn hộ
                  </div>
                </div>
              </div>
              <div className="md:col-span-12 flex flex-col gap-3 border-t border-border/75 pt-4 md:mt-2 md:flex-row md:items-center md:gap-8 md:border-t-0 md:border-l md:border-border/75 md:pt-0 md:pl-10">
                <div className="text-[clamp(2.1rem,4.5vw,2.75rem)] leading-[0.95] font-normal tabular-nums tracking-tight text-gold">
                  8+
                </div>
                <div
                  aria-hidden="true"
                  className="hidden h-px flex-1 bg-gradient-to-r from-gold/50 via-gold/25 to-transparent md:block md:max-w-[min(100%,11rem)]"
                />
                <div className="text-[10px] uppercase tracking-[0.22em] text-stone md:whitespace-nowrap">
                  Năm
                </div>
              </div>
            </div>
          </div>

          {/* Double-bezel image plate — offset shadow + plate caption strip */}
          <div className="relative md:[transform:rotate(0.35deg)]">
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[18px] bg-obsidian/6" />
            <div className="relative rounded-[16px] border border-border/80 bg-obsidian/5 p-2 shadow-[10px_10px_0_0_rgba(0,0,0,0.045)]">
              <div className="rounded-[14px] border border-border/80 bg-surface overflow-hidden p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                <div className="grid grid-cols-2 gap-2 md:gap-2.5" data-reveal-grid>
                  <div
                    data-reveal-cell
                    className="relative aspect-[4/5] overflow-hidden rounded-[12px] border border-border/80 md:rounded-[12px_12px_12px_4px]"
                  >
                    <Image
                      src={storyImages[0].src}
                      alt={storyImages[0].alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-2.5">
                    <div
                      data-reveal-cell
                      className="relative flex-1 min-h-0 overflow-hidden rounded-[12px] border border-border/80"
                    >
                      <Image
                        src={storyImages[1].src}
                        alt={storyImages[1].alt}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div
                      data-reveal-cell
                      className="relative flex-1 min-h-0 overflow-hidden rounded-[12px] border border-border/80 md:rounded-[4px_12px_12px_12px]"
                    >
                      <Image
                        src={storyImages[2].src}
                        alt={storyImages[2].alt}
                        fill
                        sizes="(min-width: 1024px) 24vw, 100vw"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                <div className="relative mt-3 border-t border-border/65 bg-[linear-gradient(180deg,rgba(247,244,239,0.55)_0%,rgba(247,244,239,0.92)_100%)] px-3 py-3 -mx-[2px]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-0 h-[2px] w-10 bg-gold/90"
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[9px] tabular-nums leading-none tracking-[0.12em] text-stone/85">
                        01
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.26em] text-obsidian/75 font-medium">
                        Light / Shadow
                      </span>
                    </div>
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-gold/55 via-gold/25 to-transparent sm:block sm:min-w-[2rem] sm:max-w-[6rem]" />
                    <div className="flex items-baseline justify-between gap-2.5 sm:justify-end">
                      <span className="text-[10px] uppercase tracking-[0.26em] text-obsidian/75 font-medium">
                        Material First
                      </span>
                      <span className="font-mono text-[9px] tabular-nums leading-none tracking-[0.12em] text-stone/85">
                        02
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-md-section className="py-24 border-t border-border/70 overflow-hidden bg-obsidian text-ivory relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(247,244,239,0.16) 0, rgba(247,244,239,0.16) 1px, transparent 1px, transparent 112px), repeating-linear-gradient(to bottom, rgba(247,244,239,0.10) 0, rgba(247,244,239,0.10) 1px, transparent 1px, transparent 112px)",
          }}
        />
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12">
          <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1 md:overflow-x-auto md:[scrollbar-width:none] md:[-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone font-medium">
                Công trình nổi bật
              </p>
              <h2 className="mt-5 text-ivory md:whitespace-nowrap md:pr-1">
                Những dự án định hình phong cách sống
              </h2>
            </div>
            <Link
              href="/du-an/"
              className="hidden md:inline-flex shrink-0 whitespace-nowrap border border-ivory/20 px-6 py-3 rounded-[10px] text-ivory/90 hover:bg-ivory/10 hover:text-ivory transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              Xem tất cả dự án
            </Link>
          </div>

          {/* Section 2: lookbook cards (ít chữ, overlay rõ) */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((item, idx) => (
              <article
                key={item.title}
                className="group"
                data-reveal
                ref={(el) => {
                  projectCardRefs.current[idx] = el;
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-border/80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    unoptimized
                  />
                  <div
                    data-project-overlay
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,9,0.82)] to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex min-h-[180px] flex-col justify-end p-5 text-ivory">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-gold/60">{item.city}</div>
                    <h3 className="mt-2 min-h-[2.6em] text-[30px] leading-[1.15] tracking-tight">{item.title}</h3>
                    <div className="mt-3 h-px bg-ivory/15" />
                    <p className="mt-3 text-ivory/80 text-sm tabular-nums">{item.area}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-md-section
        ref={flowSectionRef}
        className="py-24 border-t border-border/70 bg-ivory relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 148px)",
          }}
        />
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
          <div data-reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone font-medium">
                Continuity
              </p>
              <h2 className="mt-5 text-obsidian leading-[1.06] max-w-[18ch]">
                Nối mạch thị giác bằng các lớp “plate” chồng nhẹ.
              </h2>
              <div className="mt-7 w-14 h-px bg-gold" />

              <div className="mt-10 rounded-[16px] border border-border/80 bg-surface p-2">
                <div className="rounded-[14px] border border-border/70 bg-obsidian/5 p-5">
                  <div className="flex items-center justify-between gap-6">
                    <div className="text-[10px] uppercase tracking-[0.26em] text-stone font-medium">
                      Flow
                    </div>
                    <div className="w-full h-px bg-border/70" />
                    <div className="text-[10px] uppercase tracking-[0.26em] text-stone font-medium">
                      04
                    </div>
                  </div>
                  <div className="mt-6 flex items-start gap-6">
                    <div className="relative w-[10px] h-[220px]">
                      <div className="absolute inset-0 rounded-full bg-obsidian/10" />
                      <div
                        ref={flowProgressRef}
                        className="absolute inset-0 rounded-full bg-obsidian/55 will-change-transform"
                        style={{ transform: "scaleY(0)" }}
                      />
                    </div>
                    <div className="space-y-4 text-[11px] uppercase tracking-[0.18em] text-[#5b554c]">
                      {[
                        { k: "01", v: "Bố trí" },
                        { k: "02", v: "Vật liệu" },
                        { k: "03", v: "Thi công" },
                        { k: "04", v: "Bàn giao" },
                      ].map((it) => (
                        <div key={it.k} className="flex items-center gap-4">
                          <span className="w-8">{it.k}</span>
                          <span className="w-10 h-px bg-border/70" />
                          <span>{it.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-5 md:gap-y-10 gap-4">
              {[
                {
                  t: "Bố trí — tỷ lệ",
                  d: "Layout rõ mốc, ưu tiên khoảng thở để nội thất có chỗ đứng.",
                  img: "https://picsum.photos/id/1043/1200/900.jpg",
                },
                {
                  t: "Vật liệu — ánh sáng",
                  d: "Một bảng vật liệu tinh gọn, đọc được bằng mắt thường.",
                  img: "https://picsum.photos/id/1060/1200/900.jpg",
                },
                {
                  t: "Thi công — hoàn thiện",
                  d: "Checklist theo mốc. Sai khác được khóa ngay từ đầu.",
                  img: "https://picsum.photos/id/1050/1200/900.jpg",
                },
                {
                  t: "Bàn giao — tinh chỉnh",
                  d: "Cân sáng, cân texture, tinh chỉnh trước khi trao tay.",
                  img: "https://picsum.photos/id/1032/1200/900.jpg",
                },
              ].map((c, idx) => {
                const revealLr = (["left", "left", "right", "right"] as const)[idx] ?? "left";
                return (
                <article
                  key={c.t}
                  data-reveal
                  data-reveal-lr={revealLr}
                  className={[
                    "relative md:hover:z-10",
                    idx === 0 && "md:col-span-12 lg:col-span-8 lg:col-start-1",
                    idx === 1 && "md:col-span-5",
                    idx === 2 && "md:col-span-7",
                    idx === 3 && "md:col-span-12 lg:col-span-7 lg:col-start-4",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="rounded-[18px] border border-border/80 bg-ivory/40 p-[2px]">
                    <div className="rounded-[16px] border border-border/80 bg-surface overflow-hidden">
                      <div className={idx === 0 ? "grid md:grid-cols-[0.62fr_0.38fr]" : ""}>
                        <div
                          className={
                            idx === 0
                              ? "relative min-h-[260px]"
                              : idx === 1
                                ? "relative h-[236px]"
                                : idx === 2
                                  ? "relative h-[236px]"
                                  : "relative h-[256px]"
                          }
                        >
                          <Image
                            src={c.img}
                            alt={c.t}
                            fill
                            sizes="(min-width: 768px) 60vw, 100vw"
                            className="object-cover"
                            unoptimized
                          />
                          <div className="pointer-events-none absolute inset-0 bg-obsidian/20" />
                        </div>
                        <div className="p-7">
                          <div className="flex items-center justify-between gap-6">
                            <div className="text-[10px] uppercase tracking-[0.26em] text-stone font-medium">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="w-full h-px bg-border/70" />
                            <div className="text-[10px] uppercase tracking-[0.26em] text-stone font-medium">
                              Plate
                            </div>
                          </div>
                          <h3 className="mt-4 text-[22px] leading-[1.1] text-obsidian max-w-[22ch]">
                            {c.t}
                          </h3>
                          <p className="mt-3 text-[14px] leading-6 text-[#59544b] max-w-[48ch]">
                            {c.d}
                          </p>
                          <div className="mt-6 w-16 h-px bg-gold/90" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        data-md-section
        id="dich-vu"
        ref={servicesSectionRef}
        className="py-24 border-t border-border/70 bg-[#f4f1eb] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 132px)",
          }}
        />
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-end">
            <div data-reveal-stagger>
              <p
                data-reveal-item
                className="text-[11px] uppercase tracking-[0.18em] text-stone font-medium"
              >
                Dịch vụ
              </p>
              <h2
                data-reveal-item
                className="mt-5 text-obsidian leading-[1.06] max-w-[22ch]"
              >
                Giải pháp trọn gói, nhưng mỗi bước đều có kỷ luật.
              </h2>
              <div data-reveal-item className="mt-7 flex items-center gap-4">
                <div className="w-14 h-px bg-gold" />
                <div className="text-[12px] text-[#59544b] leading-6 max-w-[44ch]">
                  Thiết kế, vật liệu, thi công — một nhịp thống nhất. Bạn thấy rõ tiến độ theo từng mốc.
                </div>
              </div>
            </div>

            <div data-reveal-stagger className="relative hidden lg:block">
              <div
                data-reveal-item
                className="flex items-center justify-between gap-6 text-[10px] uppercase tracking-[0.26em] text-stone font-medium"
              >
                <span>Scope</span>
                <span className="w-full h-px bg-border/80" />
                <span>04</span>
              </div>
              <div className="mt-6 grid grid-cols-[10px_1fr] gap-6">
                <div data-reveal-item className="relative h-[196px]">
                  <div className="absolute inset-0 rounded-full bg-obsidian/10" />
                  <div
                    ref={servicesProgressRef}
                    className="absolute inset-0 rounded-full bg-obsidian/45 will-change-transform"
                    style={{ transform: "scaleY(0)" }}
                  />
                </div>
                <div className="space-y-3 text-[10px] uppercase tracking-[0.22em] text-[#59544b]">
                  <div data-reveal-item className="flex items-center gap-4">
                    <span className="w-7">01</span>
                    <span className="w-10 h-px bg-border/80" />
                    <span>Material</span>
                  </div>
                  <div data-reveal-item className="flex items-center gap-4">
                    <span className="w-7">02</span>
                    <span className="w-10 h-px bg-border/80" />
                    <span>Structure</span>
                  </div>
                  <div data-reveal-item className="flex items-center gap-4">
                    <span className="w-7">03</span>
                    <span className="w-10 h-px bg-border/80" />
                    <span>Light</span>
                  </div>
                  <div data-reveal-item className="flex items-center gap-4">
                    <span className="w-7">04</span>
                    <span className="w-10 h-px bg-border/80" />
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {services.map((item, idx) => {
              const layout =
                idx === 0
                  ? "lg:col-span-8 lg:row-span-2 lg:translate-y-0"
                  : idx === 1
                    ? "lg:col-span-4 lg:-translate-y-5"
                    : idx === 2
                      ? "lg:col-span-5 lg:translate-y-3"
                      : "lg:col-span-7 lg:-translate-y-3";
              const revealLr = (["left", "right", "left", "right"] as const)[idx] ?? "left";

              return (
                <article
                  key={item.title}
                  data-reveal
                  data-reveal-lr={revealLr}
                  className={["group relative", layout].join(" ")}
                >
                  <div className="rounded-[18px] border border-border/80 bg-ivory/40 p-[2px] h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <div className="relative rounded-[16px] border border-border/80 bg-surface overflow-hidden h-full">
                      <div
                        className={[
                          "relative min-h-[280px]",
                          idx === 0 ? "h-[340px] lg:h-full" : idx === 1 ? "h-[260px]" : idx === 2 ? "h-[290px]" : "h-[250px]",
                        ].join(" ")}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                          unoptimized
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(18,18,15,0.70)] via-[rgba(18,18,15,0.30)] to-transparent" />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 opacity-[0.28]"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(to right, rgba(247,244,239,0.22) 0, rgba(247,244,239,0.22) 1px, transparent 1px, transparent 144px)",
                          }}
                        />

                        <div className="absolute left-0 right-0 bottom-0 p-6 lg:p-7">
                          <div className="flex items-center justify-between gap-6">
                            <div className="text-[10px] uppercase tracking-[0.26em] text-ivory/70 font-medium">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="w-full h-px bg-ivory/15" />
                            <div className="text-[10px] uppercase tracking-[0.26em] text-gold/85 font-medium whitespace-nowrap">
                              {item.chip}
                            </div>
                          </div>
                          <h3 className="mt-3 text-[clamp(22px,2.1vw,34px)] leading-[1.08] text-ivory max-w-[26ch]">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-ivory text-[15px] font-medium leading-7 max-w-[46ch] tracking-[0.01em] [text-shadow:0_1px_14px_rgba(0,0,0,0.75),0_0_1px_rgba(0,0,0,0.9)]">
                            {item.desc}
                          </p>

                          <div className="mt-5 flex items-center justify-between gap-6">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/60 font-medium">
                              Bản vẽ / thi công
                            </div>
                            <div className="w-16 h-px bg-gold/80" />
                            <div className="text-[11px] uppercase tracking-[0.18em] text-ivory/60 font-medium">
                              Xem chi tiết →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={marqueeSectionRef}
        data-md-section
        className="marquee-band py-16 md:py-20 border-t border-border/70 bg-obsidian text-ivory overflow-hidden relative"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.22]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(247,244,239,0.35) 0, rgba(247,244,239,0.35) 1px, transparent 1px, transparent 88px)",
          }}
        />
        <div className="whitespace-nowrap text-[clamp(32px,4.6vw,68px)] leading-[1.08] tracking-tight overflow-hidden py-2">
          <div
            data-marquee
            className="inline-flex will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            <div className="inline-flex gap-16 px-6">
              <span>Sang trọng được đo bằng khoảng thở</span>
              <span className="text-gold">MD DESIGN</span>
              <span>Sang trọng được đo bằng ánh sáng</span>
              <span className="text-gold">MD DESIGN</span>
              <span>Sang trọng được đo bằng khoảng thở</span>
              <span className="text-gold">MD DESIGN</span>
              <span>Sang trọng được đo bằng ánh sáng</span>
              <span className="text-gold">MD DESIGN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: contact split (ảnh + form, ít chữ) */}
      <section
        data-md-section
        id="lien-he-brief"
        className="scroll-mt-[calc(5.5rem+env(safe-area-inset-top))] py-16 sm:py-20 lg:py-24 border-t border-border/70 bg-obsidian text-ivory relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(247,244,239,0.28) 0px, rgba(247,244,239,0.28) 1px, transparent 1px, transparent 120px), repeating-linear-gradient(0deg, rgba(247,244,239,0.16) 0px, rgba(247,244,239,0.16) 1px, transparent 1px, transparent 92px)",
          }}
        />
        <div className="max-w-[1680px] mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 sm:gap-12 lg:gap-14 items-start relative">
          <div data-reveal className="relative min-w-0 w-full">
            <div className="absolute -inset-6 -z-10 rounded-[28px] bg-obsidian/6" />
            <div className="grid min-w-0 grid-cols-1 gap-6 items-start lg:grid-cols-[0.18fr_0.82fr]">
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-ivory font-medium">
                    Contact / Brief
                  </div>
                  <div className="mt-6 space-y-4 text-[11px] uppercase tracking-[0.18em] text-ivory/88">
                    <div className="flex items-center justify-between gap-6">
                      <span className="whitespace-nowrap">Bước</span>
                      <span className="w-full h-px bg-border/70" />
                      <span className="whitespace-nowrap">01</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="whitespace-nowrap">Phân tích</span>
                      <span className="w-full h-px bg-border/70" />
                      <span className="whitespace-nowrap">02</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="whitespace-nowrap">Bố trí</span>
                      <span className="w-full h-px bg-border/70" />
                      <span className="whitespace-nowrap">03</span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span className="whitespace-nowrap">Thi công</span>
                      <span className="w-full h-px bg-border/70" />
                      <span className="whitespace-nowrap">04</span>
                    </div>
                  </div>
                  <div className="mt-8 w-10 h-px bg-gold" />
                  <div className="hidden">
                    <div className="mt-6 text-[11px] uppercase tracking-[0.18em] text-ivory font-medium">
                      Hà Nội / TP.HCM
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative min-w-0 w-full max-w-[560px]">
                <div className="rounded-[18px] border border-border/80 bg-surface p-2 min-w-0">
                  <div className="rounded-[16px] overflow-hidden border border-border/70 bg-obsidian/5 p-2 min-w-0">
                    {/* Không dùng minmax(220px, …) cho cột phải — trên lg hẹp nó cướp hết chỗ, ảnh còn ~90px. */}
                    <div className="grid grid-cols-1 gap-3 items-stretch min-w-0 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-3">
                      <div className="relative min-h-[220px] min-w-0 w-full overflow-hidden rounded-[14px] border border-border/80 aspect-[16/10] md:aspect-auto md:min-h-[280px] md:max-h-[min(52vh,440px)]">
                        <Image
                          src="https://picsum.photos/seed/md-contact-interior/1200/800.jpg"
                          alt="Không gian atelier"
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-[center_30%]"
                          unoptimized
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a08]/92 via-[#0b0a08]/35 to-transparent"
                        />
                        <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 w-[min(100%,18rem)] max-w-full">
                          <div className="flex flex-col gap-1.5">
                            <div className="sr-only">Liên hệ</div>
                            <div className="hidden">
                              <p className="text-[clamp(14px,2.4vw,18px)] font-medium text-ivory/95 leading-[1.35] tracking-[0] text-balance">
                                Bắt đầu hành trình cho căn nhà của bạn
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-1 md:gap-2 md:min-h-0 md:justify-stretch">
                        {[
                          { k: "Mail", v: "contact@mddesign.vn" },
                          { k: "Hotline", v: "0968 883 311" },
                          { k: "Studio", v: "HN | HCM" },
                        ].map((it) => (
                          <div
                            key={it.k}
                            className="rounded-[14px] border border-border/80 bg-surface p-3 sm:p-4 min-w-0"
                          >
                            <div className="text-[10px] uppercase tracking-[0.22em] text-stone font-medium">
                              {it.k}
                            </div>
                            <div className="mt-3 text-[13px] leading-5 text-obsidian break-words">
                              {it.v}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        "https://picsum.photos/id/1018/900/700.jpg",
                        "https://picsum.photos/id/1022/900/700.jpg",
                        "https://picsum.photos/id/1039/900/700.jpg",
                      ].map((src, idx) => (
                        <div
                          key={src}
                          className="group relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border/80 bg-obsidian/5 min-w-0"
                        >
                          <Image
                            src={src}
                            alt={`Vật liệu ${idx + 1}`}
                            fill
                            sizes="(min-width: 1024px) 16vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                            unoptimized
                          />
                          <div className="pointer-events-none absolute inset-0 bg-obsidian/22" />
                          <div className="pointer-events-none absolute left-3 top-3 text-[10px] uppercase tracking-[0.22em] text-ivory/75">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex min-w-0 flex-col items-stretch gap-3 px-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <div className="min-w-0 text-center text-[10px] uppercase tracking-[0.18em] text-ivory/88 font-medium sm:text-left">
                        Material strip
                      </div>
                      <div className="hidden h-px shrink-0 bg-gold/90 sm:block sm:w-16" />
                      <div className="min-w-0 text-center text-[10px] uppercase tracking-[0.18em] text-ivory/88 font-medium sm:text-right">
                        Notes in light
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            data-reveal
            className="relative w-full min-w-0 scroll-mt-[calc(5.5rem+env(safe-area-inset-top))] lg:max-w-none"
          >
            <div className="rounded-[18px] border border-border/80 bg-obsidian/5 p-1.5 sm:p-2">
              <div className="rounded-[16px] border border-border/70 bg-surface p-5 sm:p-6 lg:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                  <div className="min-w-0 pr-0 sm:pr-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-stone font-medium">
                      Project brief
                    </p>
                    <h3 className="mt-3 text-[clamp(1.25rem,4.5vw,1.75rem)] text-obsidian leading-[1.12] text-balance">
                      Nhận tư vấn theo đúng nhu cầu
                    </h3>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 self-start sm:self-end">
                    <span className="hidden sm:block w-10 h-px shrink-0 bg-border/70" aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-[0.26em] text-stone font-medium whitespace-nowrap">
                      24h
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-stone">
                      Họ và tên
                    </label>
                    <input
                      id="name"
                      className="w-full h-11 px-4 border border-border bg-ivory/30 rounded-[10px] text-obsidian placeholder:text-stone/60 outline-none focus:border-gold transition-colors"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-stone">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      className="w-full h-11 px-4 border border-border bg-ivory/30 rounded-[10px] text-obsidian placeholder:text-stone/60 outline-none focus:border-gold transition-colors"
                      placeholder="0901 234 567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-stone">
                      Nhu cầu
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-border bg-ivory/30 rounded-[10px] text-obsidian placeholder:text-stone/60 outline-none focus:border-gold transition-colors resize-none"
                      placeholder="Mô tả nhanh phong cách, diện tích và tiến độ mong muốn..."
                    />
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                  <div className="rounded-[12px] border border-border/80 bg-ivory/30 p-[2px] min-w-0">
                    <button
                      type="button"
                      className="w-full min-w-0 group active:translate-y-[1px] active:scale-[0.99] rounded-[10px] bg-obsidian text-ivory px-4 sm:px-6 py-3 font-medium inline-flex items-center justify-between gap-3 sm:gap-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#1f1d18]"
                    >
                      <span className="text-[13px] sm:text-[14px] leading-none truncate">Gửi yêu cầu</span>
                      <span className="w-9 h-9 rounded-full bg-ivory/10 border border-ivory/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]">
                        <span className="text-ivory/90">→</span>
                      </span>
                    </button>
                  </div>
                  <div className="rounded-[12px] border border-border/80 bg-ivory/30 p-[2px] min-w-0">
                    <Link
                      href="/du-an/"
                      className="w-full min-w-0 group active:translate-y-[1px] active:scale-[0.99] rounded-[10px] bg-transparent text-obsidian px-4 sm:px-6 py-3 font-medium inline-flex items-center justify-between gap-3 sm:gap-4 border border-border/80 hover:bg-obsidian/5 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                      <span className="text-[13px] sm:text-[14px] leading-none truncate">Xem dự án</span>
                      <span className="w-9 h-9 rounded-full bg-obsidian/5 border border-border/80 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]">
                        <span className="text-obsidian/80">→</span>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="mt-6 flex min-w-0 flex-col gap-2 text-[10px] uppercase leading-snug tracking-[0.14em] text-stone font-medium sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4 sm:gap-y-2 sm:text-[11px] sm:tracking-[0.16em] md:tracking-[0.18em]">
                  <span className="min-w-0 text-center sm:text-left sm:max-w-[min(100%,20rem)]">
                    Phản hồi trong 24 giờ
                  </span>
                  <span className="hidden h-px w-12 shrink-0 bg-border/70 sm:block" aria-hidden="true" />
                  <span className="min-w-0 text-center sm:text-right sm:max-w-[min(100%,20rem)]">
                    Giữ nhịp tối giản
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

