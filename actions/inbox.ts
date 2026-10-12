'use server';

import { connectDB, Inbox, type IInbox, type InboxDocument } from '@db';

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

/**
 * Server action to retrieve an Inbox record by its unique ID.
 *
 * @param id - The ID of the inbox to retrieve.
 * @returns The Inbox document data or null if not found.
 */
export async function getInboxById(id: string): Promise<IInbox | null> {
  if (!id || typeof id !== 'string') {
    return null;
  }

  // Ensure database connection is established
  await connectDB();

  const inbox = await Inbox.findById(id);
  if (!inbox) {
    return null;
  }

  return inbox.toObject();
}

