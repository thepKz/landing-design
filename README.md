# landing-design

Next.js landing site trong thư mục [`md-design`](./md-design).

## Deploy (GitHub Actions → Vercel)

1. Tạo project trên [Vercel](https://vercel.com) và import repo `thepKz/landing-design` (hoặc link CLI).
2. Trong repo GitHub: **Settings → Secrets and variables → Actions**, thêm:
   - `VERCEL_TOKEN` — [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — trong `.vercel/project.json` sau `vercel link`, hoặc team/project settings
   - `VERCEL_PROJECT_ID` — cùng nguồn như trên
3. Push lên `main`: workflow **Deploy to Vercel** sẽ build và deploy.

Build chạy trong `md-design` (Node 20, `npm ci`, `npm run build`).
