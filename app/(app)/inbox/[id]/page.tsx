import { notFound } from "next/navigation"

import { InboxTable } from "@/components/inbox-table"
import { EmptyInbox } from "@/components/empty-inbox"
import { getInboxById } from "@/actions/inbox"
import { formatDistanceToNow } from "date-fns"

export const instant = false

export default async function InboxPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const inbox = await getInboxById(id)

  if (!inbox) {
    notFound()
  }

  const emails = (inbox.mails ?? []).map((mail) => ({
    id: String(mail.id),
    from: mail.from,
    subject: mail.subject,
    text: mail.text,
    date: formatDistanceToNow(new Date(mail.createdAt), { addSuffix: true }),
  }))

  return (
    <div className="flex flex-1 flex-col gap-4">
      {emails.length === 0 ? (
        <EmptyInbox />
      ) : (
        <InboxTable emails={emails} />
      )}
    </div>
  )
}
