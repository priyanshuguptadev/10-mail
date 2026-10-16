import { defineConfig } from 'vite'
import vinext from 'vinext'
import { cloudflare } from '@cloudflare/vite-plugin'
import { kvDataAdapter } from '@vinext/cloudflare/cache/kv-data-adapter'

export default defineConfig({
  server: {
    allowedHosts: true,
    cors: true,
  },
  preview: {
    allowedHosts: true,
    cors: true,
  },
  plugins: [
    vinext({
      cache: {
        data: kvDataAdapter(),
      },
    }),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
    }),
  ],
})
