const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/about", destination: "/about-us", permanent: true }];
  },
  // Strapi media is served through this app's own origin so HTTPS pages don't
  // request http:// images (blocked by browsers as mixed content).
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${strapiUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
