import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skywardroofs.yourvirtualforce.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;