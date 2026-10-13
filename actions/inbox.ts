'use server';

import { isAfter, subMinutes } from 'date-fns';

import { db } from '@/db';
import { inbox as inboxTable } from '@/db/schema';


export async function createInbox(): Promise<string> {
  const [createdInbox] = await db
    .insert(inboxTable)
    .values({})
    .returning({ id: inboxTable.id });

  if (!createdInbox) {
    throw new Error('Failed to create inbox');
  }

  return createdInbox.id;
}

export async function getInboxById(id: string) {
  if (!id || typeof id !== 'string') {
    return null;
  }

  const result = await db.query.inbox.findFirst({
    where: { id },
    with: {
      mails: true,
    },
  });

  if (!result || !isAfter(result.createdAt, subMinutes(new Date(), 10))) {
    return null;
  }

  return result;
}
