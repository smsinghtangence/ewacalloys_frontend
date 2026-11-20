const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The careers form sends a resume (up to 4 MB) to a Server Action; the default limit is 1 MB.
  experimental: {
    serverActions: { bodySizeLimit: "5mb" },
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      // Footer "Our Clients" (Strapi) points to /clients; the clients are a section on the home page.
      { source: "/clients", destination: "/#clients", permanent: false },
    ];
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
