import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '</llms.txt>; rel="describedby"; type="text/markdown"',
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
};

export default nextConfig;
