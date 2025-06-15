const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { esmExternals: false },
}

module.exports = nextConfig
