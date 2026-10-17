import type { Instrumentation } from 'next'
import { logger } from '@/lib/logger'

export function register() {
  logger.info('Worker server initialized', {
    component: 'instrumentation',
    runtime: process.env.NEXT_RUNTIME ?? 'cloudflare-worker',
  })
}

export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  logger.error('Unhandled request error captured by instrumentation', err, {
    component: 'instrumentation',
    request: {
      path: request.path,
      method: request.method,
      headers: {
        host: request.headers['host'],
        userAgent: request.headers['user-agent'],
      },
    },
    context: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
      revalidateReason: context.revalidateReason,
    },
  })
}
