const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Add transpilation for workspace packages
  experimental: {
    transpilePackages: ['@pancakeswap/farms', '@pancakeswap/uikit'],
  },
};

module.exports = withVanillaExtract(nextConfig);
