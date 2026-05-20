/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: false,
  images: {
    // Legacy site references images via /assets/images/<uuid>.<ext> — served from /public
    unoptimized: true,
  },
};

export default nextConfig;
