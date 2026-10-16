import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    return NextResponse.json(
      { error: 'WEBHOOK_SIGNING_SECRET is not configured' },
      { status: 500 },
    )
  }

  const signatureHeader = request.headers.get('x-webhook-signature')
  const timestampHeader = request.headers.get('x-webhook-timestamp')

  if (!signatureHeader || !timestampHeader) {
    return NextResponse.json(
      { error: 'Missing required webhook headers' },
      { status: 400 },
    )
  }

  if (!signatureHeader.startsWith('sha256=')) {
    return NextResponse.json(
      { error: 'Invalid signature format. Expected sha256=<signature>' },
      { status: 400 },
    )
  }

  const timestamp = parseInt(timestampHeader, 10)
  if (Number.isNaN(timestamp)) {
    return NextResponse.json(
      { error: 'Invalid timestamp header' },
      { status: 400 },
    )
  }

  const currentTimestamp = Math.floor(Date.now() / 1000)
  if (Math.abs(currentTimestamp - timestamp) > TIMESTAMP_TOLERANCE_SECONDS) {
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
