# MD DESIGN — Cursor AI Full Project Prompt
# Reference site: https://xluxury.vn (analyzed & documented)
# All website content is in VIETNAMESE. Prompt is in ENGLISH.

***

## 🎯 PROJECT OVERVIEW

Build a premium luxury interior design website called **"MD DESIGN"**.
- Brand tagline: "Kiến Tạo Không Gian Sống Đẳng Cấp" (Creating Prestige Living Spaces)
- Target audience: High-end residential clients in Vietnam (villa owners, penthouse buyers)
- Services: Interior design, architecture, full construction, furniture sourcing
- Branches: Hà Nội | Hồ Chí Minh | Hải Phòng

Reference site https://xluxury.vn is used for content structure ONLY.
Do NOT copy its bugs, broken links, spam content, or ALL-CAPS typography.

***

## 🛠 TECH STACK

```
Framework:     Next.js 14 (App Router) + TypeScript
Styling:       Tailwind CSS v3 (custom config)
Animation:     Framer Motion v11
Icons:         Lucide React
Fonts:         Google Fonts — Cormorant Garamond (headings) + DM Sans (body)
Images:        next/image, WebP format, lazy loading
State:         Zustand (language toggle, mobile menu)
Forms:         React Hook Form + Zod validation
Deployment:    Vercel
```

***

## 🎨 DESIGN SYSTEM

### Color Palette
```css
/* tailwind.config.ts — extend colors */
colors: {
  ivory:       { DEFAULT: '#F7F4EF', dark: '#EDE8DF' },
  obsidian:    { DEFAULT: '#12120F', light: '#1E1E1A' },
  gold:        { DEFAULT: '#C5973A', light: '#E2B96A', dark: '#9A7428' },
  stone:       { DEFAULT: '#7A7367', light: '#A89F94' },
  surface:     '#FFFFFF',
  border:      '#E0D9CF',
}

/* Usage rules:
   - Main page bg:      ivory.DEFAULT  (#F7F4EF)
   - Hero / Footer bg:  obsidian       (#12120F)
   - Primary accent:    gold           (#C5973A)
   - Heading text:      obsidian       (#12120F)  on light bg
   - Heading text:      ivory          (#F7F4EF)  on dark bg
   - Body text:         #3D3A35
   - Muted text:        stone          (#7A7367)
   ⚠️ NEVER use pure #000000 as page background
*/
```

### Typography
```css
/* globals.css */
--font-heading: 'Cormorant Garamond', serif;   /* 300, 400, 500, 600 */
--font-body:    'DM Sans', sans-serif;          /* 300, 400, 500 */

/* Scale */
h1:  clamp(48px, 6vw, 80px) — Cormorant Garamond 400, line-height 1.1
h2:  clamp(36px, 4vw, 56px) — Cormorant Garamond 400, line-height 1.2
h3:  clamp(22px, 2.5vw, 32px) — Cormorant Garamond 500
h4:  18px — DM Sans 500
body: 16px — DM Sans 300, line-height 1.75
label/overline: 11px — DM Sans 500, letter-spacing 0.18em, UPPERCASE

/* ⚠️ RULES:
   - Headings: Title Case only — NEVER all-caps for h1/h2
   - Navigation items: uppercase 12px DM Sans (exception)
   - ALL CAPS allowed only for: labels, tags, nav items, buttons
*/
```

### Spacing & Layout
```
Max content width: 1280px (container mx-auto px-6 lg:px-12)
Section padding:   py-20 lg:py-32
Grid gap:          gap-6 lg:gap-8
Card border-radius: rounded-none (luxury = sharp) or rounded-sm max
Divider: 1px solid border color, or thin gold line (w-12 h-px bg-gold)
```

***

## 📁 FOLDER STRUCTURE

```
md-design/
├── app/
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── page.tsx                # Homepage
│   ├── gioi-thieu/page.tsx     # About page
│   ├── du-an/
│   │   ├── page.tsx            # All projects listing
│   │   └── [slug]/page.tsx     # Single project detail
│   ├── thiet-ke-villa/page.tsx
│   ├── thiet-ke-chung-cu/page.tsx
│   ├── cong-trinh-thuc-te/page.tsx
│   ├── tin-tuc/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── lien-he/page.tsx
│   ├── chinh-sach-bao-mat/page.tsx   # REAL page, not broken link
│   ├── thong-bao-phap-ly/page.tsx    # REAL page, not broken link
│   └── not-found.tsx           # Custom 404 page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── sections/
│   │   ├── HeroSlider.tsx
│   │   ├── BrandStory.tsx
│   │   ├── StatsCounter.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── DesignPhilosophy.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── BlogPreview.tsx
│   │   └── ContactCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── SectionLabel.tsx    # Small overline label component
│   │   ├── GoldDivider.tsx     # Thin gold horizontal rule
│   │   ├── ImageGallery.tsx    # Lightbox gallery
│   │   └── FilterTabs.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       └── NewsletterForm.tsx
├── lib/
│   ├── data/
│   │   ├── projects.ts         # Static project data
│   │   ├── services.ts
│   │   └── testimonials.ts
│   └── utils.ts
├── public/
│   └── images/...
└── tailwind.config.ts
```

***

## 🧩 COMPONENT SPECIFICATIONS

***

### NAVBAR (components/layout/Navbar.tsx)

```
Behavior:
- Fixed top, full width, z-50
- Initial state: transparent background, white text (on hero)
- On scroll > 80px: backdrop-blur-md bg-obsidian/90 transition-all duration-300
- On light pages (non-hero): always solid obsidian bg

Desktop layout:
[Logo: MD DESIGN]  [Nav Links Center]  [Lang Toggle]  [CTA Button]

Logo:
- "MD" in Cormorant Garamond 600, "DESIGN" in DM Sans 300, letter-spacing wide
- Gold dot or thin gold underline as brand mark

Nav Links (center):
- GIỚI THIỆU → /gioi-thieu/
- DỰ ÁN ▾   → dropdown:
    Thiết Kế Villa        → /thiet-ke-villa/
    Thiết Kế Chung Cư     → /thiet-ke-chung-cu/
    Công Trình Thực Tế    → /cong-trinh-thuc-te/
- DỊCH VỤ   → /dich-vu/   (or anchor to homepage services section)
- TIN TỨC   → /tin-tuc/
- LIÊN HỆ   → /lien-he/
- ⚠️ EVERY link must have a real href — no "#" placeholders

Dropdown (DỰ ÁN):
- Appears on hover, animated slide-down with opacity
- Each item has small thumbnail preview image on hover (optional enhancement)
- Close on outside click or mouse leave

Language Toggle:
- VI | EN toggle with flag emoji or small flag icon
- Active language: gold underline
- EN routes: /en/gioi-thieu/, /en/du-an/, etc.

CTA Button:
- Text: "Nhận Tư Vấn Miễn Phí"
- Style: border border-gold text-gold hover:bg-gold hover:text-obsidian
- Transition: 300ms ease

Mobile (< 768px):
- Hamburger icon (Lucide: Menu) → opens fullscreen overlay
- Overlay: bg-obsidian, slide from right, links stack vertically
- Each nav item: large font, tap-friendly (min h-12)
- Close: X button top-right

⚠️ DO NOT put navbar below the hero — always position:fixed top:0
```

***

### HERO SLIDER (components/sections/HeroSlider.tsx)

```
Layout:
- Full viewport height (h-screen min-h-[600px])
- Auto-advancing slides, interval: 5000ms
- Transition: cross-fade opacity 1000ms

Each slide:
- Background: full-bleed image with next/image fill objectFit cover
- Overlay: linear-gradient(to bottom, rgba(12,12,9,0.5) 0%, rgba(12,12,9,0.7) 100%)
- Content centered both axes

Slide content structure:
  [overline label]     ← "THIẾT KẾ NỘI THẤT CAO CẤP" — DM Sans 11px uppercase gold
  [main heading]       ← Cormorant Garamond 600, white, 64–80px, Title Case
  [thin gold divider]  ← w-16 h-px bg-gold mx-auto my-6
  [subheading]         ← DM Sans 300, ivory/80, 18px italic
  [CTA buttons row]    ← two buttons side by side

CTA Buttons:
  Primary: "Xem Dự Án" — bg-gold text-obsidian px-8 py-3 hover:bg-gold-light
  Ghost:   "Nhận Tư Vấn" — border border-ivory text-ivory hover:bg-ivory/10

Slide indicators (bottom center):
- Small dots, active = gold pill, inactive = white/40
- Dot click navigates to slide

Scroll indicator (bottom center, above dots):
- Animated chevron-down or scroll text with bounce animation

Sample slide texts (Vietnamese):
  Slide 1: heading="Kiến Tạo Không Gian Sống Đẳng Cấp", sub="Thiết kế nội thất biệt thự & penthouse cao cấp"
  Slide 2: heading="Từng Chi Tiết Là Một Tác Phẩm", sub="Hơn 150 công trình villa cao cấp trên toàn quốc"
  Slide 3: heading="Đồng Hành Từ Ý Tưởng Đến Hoàn Thiện", sub="Trọn gói thiết kế – thi công – bàn giao chìa khóa"
```

***

### BRAND STORY (components/sections/BrandStory.tsx)

```
Layout: 2-column, lg:grid-cols-2, gap-16, items-center
Bg: ivory.DEFAULT

Left column (image):
- Large portrait image (aspect ratio 4/5)
- Thin gold border offset effect: before:absolute before:border before:border-gold 
  before:-bottom-4 before:-right-4 before:w-full before:h-full
- Image: interior design office or flagship project

Right column (text):
  [overline] "CÂU CHUYỆN THƯƠNG HIỆU"
  [h2] "Nơi Kiến Trúc Gặp Gỡ Nghệ Thuật Sống"
  [gold divider] w-12 h-px bg-gold my-6
  [body paragraph 1] ~60 words about brand philosophy
  [body paragraph 2] ~50 words about approach
  [link] "Tìm Hiểu Thêm Về Chúng Tôi →" → /gioi-thieu/
  [stats row] ← see StatsCounter below

Stats row (inside BrandStory, bottom of right col):
  3 stats in a row, separated by thin vertical gold lines:
  | 150+    | 100+       | 8+   |
  | Villa   | Căn Hộ     | Năm  |
  | Cao Cấp | Cao Cấp    | Kinh Nghiệm |
  Stats numbers: Cormorant Garamond italic 56px gold
  Label: DM Sans 11px uppercase stone

Animation: fade-up on scroll (Framer Motion whileInView)
```

***

### FEATURED PROJECTS (components/sections/FeaturedProjects.tsx)

```
Bg: surface (#FFFFFF)
Section header:
  [overline] "CÔNG TRÌNH NỔI BẬT"
  [h2] "Những Dự Án Định Hình Phong Cách Sống"

Filter tabs (horizontal scroll on mobile):
  [ Tất Cả ] [ Biệt Thự / Villa ] [ Penthouse ] [ Căn Hộ ] [ Nhà Phố ]
  Active tab: text-gold border-b-2 border-gold
  Inactive: text-stone hover:text-obsidian transition

Grid: 3 columns desktop (lg:grid-cols-3), 2 tablet, 1 mobile
Gap: gap-1 (tight grid like luxury magazine)

ProjectCard component:
  - aspect-ratio: 4/5 (portrait)
  - Image: next/image fill, objectFit cover
  - Overlay: opacity-0 → opacity-100 on hover (transition 400ms)
    Overlay content (centered):
      - Project name: Cormorant Garamond 24px white
      - Location: DM Sans 12px gold uppercase
      - Thin gold divider
      - "Xem Chi Tiết →" link
  - Scale image: 1 → 1.05 on hover (transition 600ms)
  - Border: none (let image speak)

Display: show 6 cards initially
  "Xem Tất Cả Dự Án" CTA below grid:
  - Style: border border-obsidian text-obsidian px-10 py-3
  - Hover: bg-obsidian text-ivory
  - Centered, mt-12
  - Link → /du-an/

Project data shape (lib/data/projects.ts):
  interface Project {
    id:         string
    slug:       string
    title:      string        // Vietnamese: "Villa Vinhomes Gardenia"
    location:   string        // "Hà Nội"
    category:   'villa' | 'penthouse' | 'can-ho' | 'nha-pho'
    area:       string        // "450m²"
    year:       number        // 2024
    style:      string        // "Tân Cổ Điển"
    coverImage: string        // path or URL
    images:     string[]      // gallery images array
    description:string        // project summary Vietnamese
    featured:   boolean
  }

  Sample data (use as placeholder):
  [
    { slug: 'villa-vinhomes-gardenia', title: 'Villa Vinhomes Gardenia',
      location: 'Hà Nội', category: 'villa', area: '450m²', year: 2024,
      style: 'Tân Cổ Điển', featured: true },
    { slug: 'lumiere-riverside', title: 'Lumière Riverside Apartment',
      location: 'TP Hồ Chí Minh', category: 'can-ho', area: '180m²', year: 2024,
      style: 'Hiện Đại', featured: true },
    { slug: 'biet-thu-tinh-vien', title: 'Biệt Thự Tĩnh Viên',
      location: 'Hưng Yên', category: 'villa', area: '600m²', year: 2023,
      style: 'Đông Dương', featured: true },
    { slug: 'grand-marina-saigon', title: 'Grand Marina Saigon',
      location: 'TP Hồ Chí Minh', category: 'penthouse', area: '320m²', year: 2024,
      style: 'Art Deco', featured: true },
    { slug: 'rue-de-charm-villa', title: 'Rue De Charm Villa',
      location: 'Hà Nội', category: 'villa', area: '520m²', year: 2023,
      style: 'Pháp Cổ Điển', featured: true },
    { slug: 'vinhomes-royal-city', title: 'Vinhomes Royal City',
      location: 'Hà Nội', category: 'can-ho', area: '220m²', year: 2023,
      style: 'Luxury Modern', featured: false },
  ]

---

### SERVICES GRID (components/sections/ServicesGrid.tsx)
Bg: obsidian (#12120F) — dark section for contrast break
Text: ivory

Section header (centered):
[overline] "DỊCH VỤ CỦA CHÚNG TÔI" ← gold, 11px uppercase
[h2] "Giải Pháp Toàn Diện Từ Ý Tưởng Đến Hoàn Thiện" ← ivory

Grid: 4 columns desktop (lg:grid-cols-4), 2 tablet, 1 mobile
Gap: gap-px (hairline gap, luxury grid look)

Each ServiceCard:
- Bg: obsidian.light (#1E1E1A) hover → slightly lighter
- Padding: p-8 lg:p-10
- Border-top: 2px solid gold (visible top accent)
- Icon: Lucide icon, 32px, gold color
- Title: Cormorant Garamond 24px ivory, mt-6
- Divider: w-8 h-px bg-gold my-4
- Description: DM Sans 14px stone, line-height 1.7
- Bottom link: "Tìm hiểu thêm →" gold text, hover underline
- Hover: border-top thicker (4px), lift translateY(-4px) transition 300ms

4 Services content (Vietnamese):
1. Icon: Pencil
Title: "Thiết Kế Kiến Trúc & Sân Vườn"
Desc: "Tư vấn và thiết kế kiến trúc tổng thể, cảnh quan sân vườn hài hòa với không gian sống."

2. Icon: Layers
Title: "Thiết Kế Nội Thất Cao Cấp"
Desc: "Thiết kế nội thất chuyên nghiệp với vật liệu cao cấp từ các thương hiệu danh tiếng trong và ngoài nước."

3. Icon: Hammer
Title: "Thi Công Hoàn Thiện Trọn Gói"
Desc: "Thi công hoàn thiện toàn bộ công trình với đội ngũ thợ lành nghề, giám sát chặt chẽ từng hạng mục."

4. Icon: Key
Title: "Bàn Giao Chìa Khóa Trao Tay"
Desc: "Dịch vụ từ thiết kế đến thi công và bàn giao công trình hoàn chỉnh, đầy đủ tiện nghi sẵn sàng vào ở."

text

---

### DESIGN PHILOSOPHY (components/sections/DesignPhilosophy.tsx)
Layout: full-width, parallax background image
Height: 70vh min-h-[500px]
Bg: parallax interior photo + dark overlay rgba(12,12,9,0.72)

Parallax effect (Framer Motion useScroll + useTransform):
backgroundY: scrollYProgress mapped to "-20% → 20%"

Content (centered, max-w-3xl mx-auto):
[gold icon or ornament] ← decorative, thin
[thin gold line] w-24 h-px bg-gold mx-auto mb-8
[pull quote] Cormorant Garamond 400 italic, 48–56px, ivory
Text: "Sự Sang Trọng Ẩn Chứa Trong Từng Chi Tiết Nhỏ Nhất"
[thin gold line] w-24 h-px bg-gold mx-auto mt-8 mb-6
[attribution] DM Sans 13px uppercase letter-spacing gold
Text: "MD DESIGN — TRIẾT LÝ THIẾT KẾ"

No CTA here — this is a visual breath moment.

text

---

### STATS COUNTER (components/sections/StatsCounter.tsx)
Bg: ivory.dark (#EDE8DF)

Layout: 4-column row (lg:grid-cols-4), dividers between

Each stat (animate on scroll into view):
[number] Cormorant Garamond italic 72px gold — animated count up
Use: useInView hook + animate 0 → target over 2000ms easing
[suffix] "+" or "%" inline, same font 48px
[label line 1] DM Sans 500 14px obsidian uppercase
[label line 2] DM Sans 300 13px stone

4 Stats:
| 150+ | 100+ | 8+ | 100% |
| VILLA | CĂN HỘ | NĂM | KHÁCH HÀNG |
| CAO CẤP | & PENTHOUSE | KINH | HÀI LÒNG |
| | CAO CẤP | NGHIỆM | |

Vertical dividers between stats:
<div class="hidden lg:block w-px h-16 bg-border self-center" />

text

---

### TESTIMONIALS CAROUSEL (components/sections/TestimonialsCarousel.tsx)
Bg: surface (#FFFFFF)
⚠️ CRITICAL: NOT a looping list — must be a proper single-item carousel
Fix the xluxury bug where same list appeared 3 times

Section header:
[overline] "KHÁCH HÀNG NÓI GÌ"
[h2] "Niềm Tin Từ Những Không Gian Sống"

Carousel layout:
Max-width: max-w-4xl mx-auto
Single testimonial visible at a time
Transition: slide + fade, 500ms

Each testimonial card:
Bg: ivory padding p-10 lg:p-14
[quote icon] Lucide Quote, 32px gold, mb-6
[quote text] Cormorant Garamond 400 italic, 22px obsidian, line-height 1.8
[gold divider] w-12 h-px bg-gold my-6
[client row]:
[avatar circle] w-14 h-14 rounded-full bg-gold/20
— initials if no photo: Cormorant Garamond 20px gold
[client info]:
Name: DM Sans 500 16px obsidian
Role: DM Sans 300 13px stone (e.g. "Chủ Biệt Thự – Vinhomes Gardenia")
[star rating]: 5 gold stars (★★★★★) DM Sans

Navigation:
Prev/Next arrows: absolute left/right, circle border border-gold
Icon: ChevronLeft / ChevronRight, gold
Hover: bg-gold text-obsidian
Dot indicators: bottom center
Active: w-6 h-2 bg-gold rounded-full
Inactive: w-2 h-2 bg-border rounded-full
Auto-advance: 6000ms, pause on hover

Sample testimonials (Vietnamese):
[ { name: "Chị Hương", role: "Chủ Biệt Thự – Hưng Yên",
initials: "H",
quote: "MD DESIGN đã biến ngôi nhà của tôi thành một tác phẩm nghệ thuật. Từng góc nhỏ đều được chăm chút tỉ mỉ, vượt xa mong đợi của gia đình tôi." },
{ name: "Anh Minh", role: "Chủ Penthouse – Grand Marina Saigon",
initials: "M",
quote: "Đội ngũ thiết kế chuyên nghiệp, tiến độ đúng hẹn, chất lượng hoàn thiện xuất sắc. Tôi hoàn toàn hài lòng và sẽ tiếp tục hợp tác cho dự án tiếp theo." },
{ name: "Chị Mai", role: "Chủ Căn Hộ – Vinhomes Royal City",
initials: "M",
quote: "Không gian sống mới của gia đình tôi sang trọng mà vẫn ấm cúng. MD DESIGN thực sự hiểu được phong cách và nhu cầu của từng khách hàng." },
{ name: "Anh Tuấn", role: "Chủ Biệt Thự – Ecopark",
initials: "T",
quote: "Từ bản vẽ concept đến ngày bàn giao, tôi được đồng hành và tư vấn rất tận tình. Công trình hoàn thiện đẹp hơn cả những gì tôi tưởng tượng." },
]

text

---

### BLOG PREVIEW (components/sections/BlogPreview.tsx)
Bg: ivory.DEFAULT
Section header:
[overline] "TIN TỨC & XU HƯỚNG"
[h2] "Cảm Hứng Thiết Kế Dành Cho Bạn"
[lead] DM Sans 16px stone, max-w-xl — "Khám phá các xu hướng thiết kế nội thất mới nhất và câu chuyện từ những công trình của chúng tôi."

Grid: 3 columns desktop (lg:grid-cols-3), 1 mobile

BlogCard component:
- Image: aspect-[16/10], next/image, objectFit cover
Hover: scale 1.03 transition 500ms (clip overflow)
- [category tag] above title: DM Sans 11px uppercase gold bg-gold/10 px-3 py-1 inline-block
- [date] DM Sans 12px stone, mt-3
- [title] Cormorant Garamond 500 22px obsidian, mt-2, line-height 1.35
Max 2 lines (line-clamp-2)
- [excerpt] DM Sans 14px stone, mt-3, line-height 1.65
Max 3 lines (line-clamp-3)
- [read more row] mt-4: "Đọc Thêm" gold text 13px + arrow icon
Hover: arrow translate-x-1 transition

Categories (Vietnamese):
"Xu Hướng Thiết Kế" | "Tin Tức Dự Án" | "Mẹo Nội Thất" | "Vật Liệu Cao Cấp"

Blog data shape (lib/data/posts.ts):
interface Post {
slug: string
title: string // Vietnamese
excerpt: string // Vietnamese, ~100 chars
category: string // Vietnamese
date: string // "2025-03-15"
readTime: number // minutes
coverImage:string
}

Footer of section:
CTA centered: "Xem Tất Cả Bài Viết" → /tin-tuc/
Style: same outlined button as FeaturedProjects section

text

---

### CONTACT CTA SECTION (components/sections/ContactCTA.tsx)
Bg: obsidian (#12120F) — full width
Layout: 2-column lg:grid-cols-2 gap-16

Left column — Contact Info:
[overline] "LIÊN HỆ VỚI CHÚNG TÔI" ← gold
[h2] "Bắt Đầu Hành Trình Kiến Tạo Không Gian Mơ Ước" ← ivory
[gold divider] w-12 h-px bg-gold my-6

Contact items (each: icon + text, gap-4, mb-5):
Icon: Lucide (Phone | Mail | MapPin), 20px gold
