import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The full landing page used to live at /home. It is now the root page,
  // so old /home links land on / instead of a 404.
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
