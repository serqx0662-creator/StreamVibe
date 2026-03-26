/** @type {import('next').NextConfig} */
const nextConfig = {
  // Если используешь изображения из TMDB, добавь это:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
};

export default nextConfig;