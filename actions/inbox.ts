'use server';

import { connectDB, Inbox, type InboxDocument } from '@db';

/**
 * Server action to create a new Inbox record in the database.
 * The created inbox is initialized with an automatic 10-minute lifetime.
 *
 * @returns The unique ID string of the created Inbox document.
 */
export async function createInbox(): Promise<string> {
  // Ensure database connection is established
  await connectDB();

  const createdInbox: InboxDocument = await Inbox.create({});

  return createdInbox._id;
}

export default createInbox;
