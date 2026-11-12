const { BLOG_REDIRECTS } = require('./blog-redirects');

const API_FALLBACK = 'https://velasegala-web-production.up.railway.app/api';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    // Hacer que la variable esté disponible en el cliente
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async redirects() {
    // 301 de artículos duplicados -> url canónica (ver blog-redirects.js)
    return BLOG_REDIRECTS.flatMap(([from, to]) => {
      const encoded = encodeURI(from);
      const sources = encoded === from ? [from] : [from, encoded];
      return sources.map((src) => ({
        source: `/blog/${src}`,
        destination: to,
        permanent: true,
      }));
    });
  },
  async rewrites() {
    // Solo añadir rewrites si la API URL está definida
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || API_FALLBACK;

    return [
      // Imágenes del blog servidas desde la BD, pero bajo nuestro dominio (SEO de imágenes)
      {
        source: '/media/:path*',
        destination: `${apiUrl}/media/:path*`,
      },
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
}

module.exports = nextConfig


