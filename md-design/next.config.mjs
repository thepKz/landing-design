/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tắt đường đi qua Terser trong một số trường hợp parse chuỗi trên Windows.
  // SWC minify ổn định hơn với path chứa ký tự như `\x_`.
  swcMinify: true,
  images: {
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
