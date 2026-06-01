/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    FOOTBALL_DATA_API_KEY: process.env.FOOTBALL_DATA_API_KEY,
  },
}

export default nextConfig
