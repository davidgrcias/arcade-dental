import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel handles image optimisation server-side, so leave this enabled.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
