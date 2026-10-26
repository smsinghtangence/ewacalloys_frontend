/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/about", destination: "/about-us", permanent: true }];
  },
};

export default nextConfig;
