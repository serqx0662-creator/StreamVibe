import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**', // Разрешаем все изображения в этой папке
      },
    ],
  },
};

export default withNextVideo(nextConfig, { folder: 'v' });