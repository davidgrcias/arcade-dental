import type { NextConfig } from "next";

// On GitHub Pages the site is served under a subpath that matches the repo
// name. We detect the GitHub Actions environment so local dev (`npm run dev`)
// keeps running at "/" while the production export ships with the right prefix.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = "arcade-dental";
const basePath = isGithubActions ? `/${repo}` : "";

const nextConfig: NextConfig = {
  // Static export so the workflow can upload `./out` to GitHub Pages.
  output: "export",
  // Pages cannot run the Next image optimisation server, so render plain
  // <img> tags. Photos are already pre-sized.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  // Pages serves directories with trailing slashes; this avoids 404s when the
  // user types `/services` instead of `/services/`.
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  // Surface basePath to client code that builds absolute paths (e.g. WhatsApp
  // deep links) so internal navigation stays prefix-aware.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
