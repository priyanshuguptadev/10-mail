import mongoose, { Schema, type Model, type HydratedDocument } from 'mongoose';
import { nanoid } from 'nanoid';

/**
 * Interface for individual email items stored inside an Inbox.
 */
export interface IMail {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Interface representing the Inbox document in MongoDB.
 */
export interface IInbox {
  _id: string;
  mails: IMail[];
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InboxDocument = HydratedDocument<IInbox>;
export type InboxModel = Model<IInbox>;

/**
 * Subdocument schema for emails.
 * _id is disabled for mail subdocuments to avoid redundant ObjectId generation.
 */
export const MailSchema = new Schema<IMail>(
  {
    to: {
      type: String,
      required: [true, 'Mail recipient ("to") is required'],
      trim: true,
    },
    from: {
      type: String,
      required: [true, 'Mail sender ("from") is required'],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Mail subject is required'],
      trim: true,
    },
    html: {
      type: String,
      required: [true, 'Mail HTML body is required'],
    },
    text: {
      type: String,
      required: [true, 'Mail text body is required'],
    },
  },
  {
    _id: false,
  }
);

/**
 * Schema for the Inbox collection.
 */
export const InboxSchema = new Schema<IInbox>(
  {
    _id: {
      type: String,
      default: () => nanoid(10),
    },
    mails: {
      type: [MailSchema],
      default: () => [],
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      aliases: true,
    },
    toObject: {
      virtuals: true,
      aliases: true,
    },
  }
);

/**
 * TTL index to automatically remove inboxes from MongoDB once expiresAt timestamp is reached.
 */
InboxSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


/**
 * Export the Inbox model, reusing existing compiled model if already registered
 * (essential for Next.js hot reload and serverless environments).
 */
export const Inbox: InboxModel =
  (mongoose.models.Inbox as InboxModel) ||
  mongoose.model<IInbox>('Inbox', InboxSchema);

export default Inbox;
