/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  transpilePackages: ['@boilerplate/shared', '@boilerplate/database'],
}

module.exports = nextConfig 