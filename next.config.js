const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  transpilePackages: ['@pancakeswap/uikit'],
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = withVanillaExtract(nextConfig);
