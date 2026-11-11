import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /art-week is a standalone, hand-animated page (GSAP, ScrollTrigger and
  // Lenis) served as static HTML from public/art-week/. Next serves public
  // files only at their exact path, so this maps the clean URL onto it.
  async rewrites() {
    return [{ source: "/art-week", destination: "/art-week/index.html" }];
  },
};

export default nextConfig;
