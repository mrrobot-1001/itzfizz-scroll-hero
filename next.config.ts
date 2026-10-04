import type { NextConfig } from "next";

// GitHub Pages serves the site from https://<user>.github.io/<repo>/,
// so production builds need the repo name as a base path.
const repoName = "itzfizz-scroll-hero";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repoName}` : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
