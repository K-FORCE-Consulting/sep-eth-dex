const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@pancakeswap/uikit'],
  // Remove static export for now - causes prerendering issues
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = withVanillaExtract(nextConfig);
