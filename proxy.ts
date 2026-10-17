import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logger } from '@/lib/logger'

const TIMESTAMP_TOLERANCE_SECONDS = 300
export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname !== '/api/webhook' ||
    request.method !== 'POST'
  ) {
    return NextResponse.next()
  }

  const secret = process.env.WEBHOOK_SIGNING_SECRET
  if (!secret) {
    logger.error(
      'Webhook proxy rejected request: WEBHOOK_SIGNING_SECRET is not configured',
      undefined,
      {
        component: 'proxy',
        path: request.nextUrl.pathname,
      },
    )
    return NextResponse.json(
      { error: 'WEBHOOK_SIGNING_SECRET is not configured' },
      { status: 500 },
    )
  }

  const signatureHeader = request.headers.get('x-webhook-signature')
  const timestampHeader = request.headers.get('x-webhook-timestamp')

  if (!signatureHeader || !timestampHeader) {
    logger.warn('Webhook proxy rejected request: missing required headers', {
      component: 'proxy',
      path: request.nextUrl.pathname,
      hasSignature: Boolean(signatureHeader),
      hasTimestamp: Boolean(timestampHeader),
    })
    return NextResponse.json(
      { error: 'Missing required webhook headers' },
      { status: 400 },
    )
  }

  if (!signatureHeader.startsWith('sha256=')) {
    logger.warn('Webhook proxy rejected request: invalid signature format', {
      component: 'proxy',
      path: request.nextUrl.pathname,
    })
    return NextResponse.json(
      { error: 'Invalid signature format. Expected sha256=<signature>' },
      { status: 400 },
    )
  }

  const timestamp = parseInt(timestampHeader, 10)
  if (Number.isNaN(timestamp)) {
    logger.warn('Webhook proxy rejected request: invalid timestamp header', {
      component: 'proxy',
      path: request.nextUrl.pathname,
      timestampHeader,
    })
    return NextResponse.json(
      { error: 'Invalid timestamp header' },
      { status: 400 },
    )
  }

  const currentTimestamp = Math.floor(Date.now() / 1000)
  const diffSeconds = Math.abs(currentTimestamp - timestamp)
  if (diffSeconds > TIMESTAMP_TOLERANCE_SECONDS) {
    logger.warn(
      'Webhook proxy rejected request: timestamp outside tolerance window',
      {
        component: 'proxy',
        path: request.nextUrl.pathname,
        diffSeconds,
        toleranceSeconds: TIMESTAMP_TOLERANCE_SECONDS,
      },
    )
    return NextResponse.json(
      { error: 'Timestamp is outside the acceptable tolerance window' },
      { status: 400 },
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/api/webhook',
}
