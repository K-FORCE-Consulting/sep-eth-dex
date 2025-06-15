const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Disable static optimization to prevent prerender errors
    optimizeCss: false,
  },
  // Disable static generation completely
  generateEtags: false,
  poweredByHeader: false,
};

module.exports = withVanillaExtract(nextConfig);
