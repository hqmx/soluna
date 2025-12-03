import { withNextVideo } from 'next-video/process';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/soluna',
  images: {
    unoptimized: true, // Disable image optimization to avoid conflicts with next-video
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withNextVideo(nextConfig);
