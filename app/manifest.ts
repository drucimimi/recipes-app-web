import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Recipes App',
    short_name: 'Recipes App',
    description: 'Découvrir et/ou créer, supprimer des recettes de cuisine',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}