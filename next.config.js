const path = require('path')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'utils': path.resolve(__dirname, 'src/utils'),
      'components': path.resolve(__dirname, 'src/components'),
      'config': path.resolve(__dirname, 'src/config'),
      'contexts': path.resolve(__dirname, 'src/contexts'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'state': path.resolve(__dirname, 'src/state'),
      'views': path.resolve(__dirname, 'src/views'),
      'style': path.resolve(__dirname, 'src/style'),
      '@pancakeswap/ui': path.resolve(__dirname, 'packages/ui'),
    }
    
    return config
  },
  images: {
    domains: [
      'assets.coingecko.com',
      'tokens.1inch.io',
      'raw.githubusercontent.com',
      'github.com',
      'assets.pancakeswap.finance',
    ],
  },
}

module.exports = withVanillaExtract(nextConfig)
