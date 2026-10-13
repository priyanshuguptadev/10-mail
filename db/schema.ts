import { defineRelations } from "drizzle-orm";
import { index, pgTable } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const inbox = pgTable("inbox", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  createdAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: t.timestamp({ withTimezone: true }).notNull().defaultNow(),
}));

export const mail = pgTable("mail", (t) => ({
  id: t.serial().primaryKey(),
  inboxId: t
    .text()
    .notNull()
    .references(() => inbox.id),
  to: t.text().notNull(),
  from: t.text().notNull(),
  subject: t.text().notNull(),
  html: t.text().notNull(),
  text: t.text().notNull(),
}), (table) => [index("inbox_index").on(table.inboxId)]);

export const relations = defineRelations({ inbox, mail }, (r) => ({
  inbox: {
    mails: r.many.mail(),
  },
  mail: {
    inbox: r.one.inbox({
      from: r.mail.inboxId,
      to: r.inbox.id,
      optional: false,
    }),
  },
}));
