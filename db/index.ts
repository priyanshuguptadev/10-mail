import mongoose from 'mongoose';
import { connectDB, disconnectDB, getConnectionState, type ConnectDBOptions } from './connection';
import {
  Inbox,
  InboxSchema,
  MailSchema,
  type IInbox,
  type IMail,
  type InboxDocument,
  type InboxModel,
} from './models/inbox.model';

export {
  // Connection helpers
  connectDB,
  disconnectDB,
  getConnectionState,

  // Models
  Inbox,
  InboxSchema,
  MailSchema,

  // Mongoose re-export for convenience
  mongoose,
};

export type {
  ConnectDBOptions,
  IInbox,
  IMail,
  InboxDocument,
  InboxModel,
};

// Default export can be connectDB or a db object
const db = {
  connect: connectDB,
  disconnect: disconnectDB,
  getState: getConnectionState,
  Inbox,
  mongoose,
};

export default db;
