/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Avoid Vercel INVALID_IMAGE_OPTIMIZE_REQUEST
  },
};

module.exports = nextConfig;
