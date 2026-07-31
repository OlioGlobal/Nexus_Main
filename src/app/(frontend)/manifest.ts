import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Olio Nexus — IT & Technology Solutions',
    short_name: 'Olio Nexus',
    description:
      'Olio Nexus is a technology solutions provider offering software development, AI automation, and digital transformation services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#212121',
    icons: [
      {
        src: '/fav.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
