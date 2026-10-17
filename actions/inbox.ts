'use server'

import { isAfter, subMinutes } from 'date-fns'

import { db } from '@/db'
import { inbox as inboxTable } from '@/db/schema'
import { logger } from '@/lib/logger'

export async function createInbox(): Promise<string> {
  try {
    const [createdInbox] = await db
      .insert(inboxTable)
      .values({})
      .returning({ id: inboxTable.id })

    if (!createdInbox) {
      throw new Error('Database insert returned no created inbox record')
    }

    logger.info('Created new temporary inbox', {
      component: 'actions/inbox',
      inboxId: createdInbox.id,
    })

    return createdInbox.id
  } catch (err) {
    logger.error('Failed to create inbox', err, {
      component: 'actions/inbox',
    })
    throw err
  }
}

export async function getInboxById(id: string) {
  if (!id || typeof id !== 'string') {
    return null
  }

  const result = await db.query.inbox.findFirst({
    where: { id },
    with: {
      mails: true,
    },
  })

  if (!result || !isAfter(result.createdAt, subMinutes(new Date(), 10))) {
    logger.debug('Inbox lookup returned null (not found or expired)', {
      component: 'actions/inbox',
      inboxId: id,
      found: Boolean(result),
    })
    return null
  }

  logger.debug('Retrieved active inbox', {
    component: 'actions/inbox',
    inboxId: id,
    mailCount: result.mails?.length ?? 0,
  })

  return result
}
