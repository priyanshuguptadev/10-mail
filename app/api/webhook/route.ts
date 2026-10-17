import crypto from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { mail } from '@/db/schema'
import { logger } from '@/lib/logger'

type MailPayload = {
  to: string
  from: string
  subject: string
  html: string
  text: string
}

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.WEBHOOK_SIGNING_SECRET!
    const signatureHeader = request.headers.get('x-webhook-signature')!
    const timestampHeader = request.headers.get('x-webhook-timestamp')!

    const receivedSignature = signatureHeader.slice('sha256='.length)

    const rawBody = await request.text()

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${timestampHeader}.${rawBody}`)
      .digest('hex')

    const receivedBuffer = Buffer.from(receivedSignature, 'utf-8')
    const expectedBuffer = Buffer.from(expectedSignature, 'utf-8')

    if (
      receivedBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
      logger.warn('Webhook HMAC signature mismatch', {
        component: 'webhook',
      })
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 },
      )
    }

    let payload: Partial<MailPayload>
    try {
      payload = JSON.parse(rawBody) as MailPayload
    } catch (parseError) {
      logger.warn('Webhook invalid JSON payload', {
        component: 'webhook',
        error:
          parseError instanceof Error ? parseError.message : String(parseError),
      })
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 },
      )
    }

    if (
      typeof payload.to !== 'string' ||
      typeof payload.from !== 'string' ||
      typeof payload.subject !== 'string' ||
      typeof payload.html !== 'string' ||
      typeof payload.text !== 'string'
    ) {
      logger.warn(
        'Webhook payload validation failed: missing required string fields',
        {
          component: 'webhook',
          hasTo: typeof payload.to === 'string',
          hasFrom: typeof payload.from === 'string',
          hasSubject: typeof payload.subject === 'string',
          hasHtml: typeof payload.html === 'string',
          hasText: typeof payload.text === 'string',
        },
      )
      return NextResponse.json(
        {
          error:
            'Payload must include string fields: to, from, subject, html, and text',
        },
        { status: 400 },
      )
    }

    const inboxId = payload.to.split('@', 1)[0].trim()
    if (!inboxId) {
      logger.warn('Webhook unable to extract inbox ID from to field', {
        component: 'webhook',
        to: payload.to,
      })
      return NextResponse.json(
        { error: 'Unable to extract inbox ID from "to" field' },
        { status: 400 },
      )
    }

    const existingInbox = await db.query.inbox.findFirst({
      where: { id: inboxId },
      columns: { id: true },
    })

    if (!existingInbox) {
      logger.warn('Webhook inbox not found', {
        component: 'webhook',
        inboxId,
      })
      return NextResponse.json(
        { error: `Inbox with ID "${inboxId}" does not exist` },
        { status: 404 },
      )
    }

    const fromDomain = payload.from.includes('@')
      ? payload.from.split('@')[1]
      : 'unknown'

    await db.insert(mail).values({
      inboxId: existingInbox.id,
      to: payload.to,
      from: payload.from,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    })

    logger.info('Mail successfully added to inbox', {
      component: 'webhook',
      inboxId: existingInbox.id,
      fromDomain,
      subjectLength: payload.subject.length,
      htmlLength: payload.html.length,
      textLength: payload.text.length,
    })

    return NextResponse.json({
      success: true,
      message: 'Mail added to inbox',
      inboxId,
    })
  } catch (error) {
    logger.error('Unexpected error processing incoming webhook', error, {
      component: 'webhook',
    })
    return NextResponse.json(
      { error: 'Internal server error processing webhook' },
      { status: 500 },
    )
  }
}
