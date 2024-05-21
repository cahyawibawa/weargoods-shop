/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.swell.store",
      },
      {
        protocol: "https",
        hostname: "cdn.schema.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
