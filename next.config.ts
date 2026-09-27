import type { NextConfig } from "next";

/**
 * Nothing business-specific lives here: language, contact details, products,
 * brands, festivals… are all managed from the admin panel at /admin.
 * `.env` only holds the admin login.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The old quote form was removed — send old links to the contact page.
  async redirects() {
    return [{ source: "/quote", destination: "/contact", permanent: true }];
  },
  images: {
    // WebP only: much cheaper to encode than AVIF on a small server, still well compressed.
    formats: ["image/webp"],
  },
};

export default nextConfig;
