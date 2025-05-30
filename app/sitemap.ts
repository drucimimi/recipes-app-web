import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://recipes-app.webapps24.eu/',
      lastModified: new Date(),
    },
    {
      url: 'https://recipes-app.webapps24.eu/web',
      lastModified: new Date(),
    },
    {
      url: 'https://recipes-app.webapps24.eu/web/login',
      lastModified: new Date(),
    },
    {
      url: 'https://recipes-app.webapps24.eu/web/register',
      lastModified: new Date(),
    },
  ];
}