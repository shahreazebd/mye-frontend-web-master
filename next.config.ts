import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "evidentbd.sgp1.cdn.digitaloceanspaces.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.dicebear.com" },
      { protocol: "https", hostname: "evidentbd.sgp1.digitaloceanspaces.com" },
      { protocol: "https", hostname: "sgp1.digitaloceanspaces.com" },
    ],
  },
};
export default nextConfig;
