import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB, Inbox, type IMail } from '@db';

export async function POST(request: NextRequest) {

  const secret = process.env.WEBHOOK_SIGNING_SECRET!;
  const signatureHeader = request.headers.get('x-webhook-signature')!;
  const timestampHeader = request.headers.get('x-webhook-timestamp')!;

  const receivedSignature = signatureHeader.slice('sha256='.length);

  const rawBody = await request.text();

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${timestampHeader}.${rawBody}`)
    .digest('hex');

  const receivedBuffer = Buffer.from(receivedSignature, 'utf-8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 }
    );
  }

  let payload: Partial<IMail>;
  try {
    payload = JSON.parse(rawBody) as Partial<IMail>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (
    typeof payload.to !== 'string' ||
    typeof payload.from !== 'string' ||
    typeof payload.subject !== 'string' ||
    typeof payload.html !== 'string' ||
    typeof payload.text !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Payload must include string fields: to, from, subject, html, and text' },
      { status: 400 }
    );
  }

  const inboxId = payload.to.split('@', 1)[0].trim();
  if (!inboxId) {
    return NextResponse.json(
      { error: 'Unable to extract inbox ID from "to" field' },
      { status: 400 }
    );
  }

  await connectDB();
  const inbox = await Inbox.findById(inboxId);

  if (!inbox) {
    return NextResponse.json(
      { error: `Inbox with ID "${inboxId}" does not exist` },
      { status: 404 }
    );
  }

  const mail: IMail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  };
  inbox.mails.push(mail);
  await inbox.save();

  return NextResponse.json({
    success: true,
    message: 'Mail added to inbox',
    inboxId,
  });
}
