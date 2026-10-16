import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '10-Mail — Free 10-Minute Temporary Disposable Email',
    short_name: '10-Mail',
    description:
      'Keep spam out of your real inbox with an instant, disposable 10-minute temporary email address.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
