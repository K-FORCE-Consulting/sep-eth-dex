const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: { esmExternals: false },
  swcMinify: false,
}

module.exports = nextConfig
