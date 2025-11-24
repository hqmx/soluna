import type { NextConfig } from 'next';
import { withNextVideo } from 'next-video/process';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable image optimization to avoid conflicts with next-video
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withNextVideo(nextConfig);
