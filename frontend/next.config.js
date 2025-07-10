/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  trailingSlash: false,
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during production builds
    ignoreBuildErrors: true,
  },
  // Enable fallback pages for dynamic routes
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Configure output for proper dynamic routing
  trailingSlash: false,
};

module.exports = nextConfig; 