import { bindings, defineConfig, defineWorker } from 'cf/config'

export default defineConfig({
  worker: defineWorker({
    name: '10-mail',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-16',
    compatibilityFlags: ['nodejs_compat'],
    observability: {
      enabled: true,
      headSamplingRate: 1,
      logs: {
        enabled: true,
        invocationLogs: true,
        persist: true,
      },
    },
    assets: {
      htmlHandling: 'none',
      notFoundHandling: 'none',
      runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*'],
    },
    env: {
      ASSETS: bindings.assets(),
      DATABASE_URL: bindings.secret(),
      WEBHOOK_SIGNING_SECRET: bindings.secret(),
      VINEXT_KV_CACHE: bindings.kv(),
    },
  }),
})
