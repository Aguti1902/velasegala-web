import { MetadataRoute } from 'next';

const PROD_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.velasegalaviladecans.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${PROD_URL}/sitemap.xml`,
    host: PROD_URL,
  };
}
