# landing-design

Next.js landing site trong thư mục [`md-design`](./md-design).

## Deploy (GitHub Actions → GitHub Pages)

Site production: `https://thepKz.github.io/landing-design/` (đường dẫn gốc = tên repo).

1. Trên GitHub: **Settings → Pages → Build and deployment → Source** chọn **GitHub Actions** (không dùng “Deploy from a branch”).
2. Push lên `main`: workflow **Deploy GitHub Pages** build static (`next build` với `output: export`), upload thư mục `out/`.
3. Build trong CI đặt `BASE_PATH=/landing-design` để asset và `Link` đúng prefix.

Chạy local giống production (có basePath):

```bash
cd md-design
set BASE_PATH=/landing-design
npm run build
```

PowerShell: `$env:BASE_PATH="/landing-design"; npm run build`

Dev thường: không set `BASE_PATH` — `npm run dev` tại `http://localhost:3000/`.

**Windows:** Nếu thư mục dự án có đoạn `\x` trong path (ví dụ `...\x_luxury\...`), `next build` trên máy local có thể lỗi Terser; CI trên GitHub vẫn build bình thường. Đổi tên thư mục hoặc clone sang path không chứa `\x_` nếu cần build local.
