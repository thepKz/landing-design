/** @type {import('next').NextConfig} */
const basePath =
  process.env.BASE_PATH && process.env.BASE_PATH !== "/"
    ? process.env.BASE_PATH.replace(/\/$/, "")
    : "";

const nextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  trailingSlash: true,
  // Tắt đường đi qua Terser trong một số trường hợp parse chuỗi trên Windows.
  // SWC minify ổn định hơn với path chứa ký tự như `\x_`.
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
