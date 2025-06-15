const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  trailingSlash: true,
  images: { unoptimized: true },
  // Force SSR mode, disable all static generation
  experimental: {
    runtime: 'nodejs',
  },
  // Disable static optimization completely
  distDir: '.next',
  generateEtags: false,
  poweredByHeader: false,
  // Export as server, not static
  target: 'server',
};

module.exports = withVanillaExtract(nextConfig);
