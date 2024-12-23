import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dashify - turn your data into live dashboard',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/dashify.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/dashify.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}