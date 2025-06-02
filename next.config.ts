import type { NextConfig } from "next"
const nextConfig:NextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'recipes-api.webapps24.eu',
            port: '',
            pathname: '/api/images/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8080',
            pathname: '/api/images/**',
          }
        ], 
      },
}

export default nextConfig
