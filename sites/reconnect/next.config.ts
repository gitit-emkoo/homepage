import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 정적 HTML로 내보내 Cloudflare Pages, Netlify, Vercel 등 어디에나 배포할 수 있게 한다.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
