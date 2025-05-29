import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/web/protected',
    },
    sitemap: 'https://recipes-app.webapps24.eu/sitemap.xml',
  };
}