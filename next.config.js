/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Configuration pour JavaScript
  typescript: {
    // Ignorer les erreurs TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorer les erreurs ESLint
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 