import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ["example.com"],
  },
  webpack(config) {
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
    };
    return config;
  },
};

export default nextConfig;
