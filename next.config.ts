import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole order flow lives on the client (intake, decision 0.6),
  // and the same build deploys to GitHub and Cloudflare Pages unchanged (decision 0.8).
  output: "export",
  // Folder-style URLs so Cloudflare Pages serves /menu/ without redirects.
  trailingSlash: true,
  // No image CDN on a static export; the hero photo is self-hosted at build time.
  images: { unoptimized: true },
};

export default nextConfig;
