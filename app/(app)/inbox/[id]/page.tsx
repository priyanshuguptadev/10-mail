import { Suspense } from 'react'

import { EmptyInbox } from '@/components/empty-inbox'
import { MailInboxView } from '@/components/mail-inbox-view'
import { getInboxById } from '@/actions/inbox'
import NoInbox from '@/components/no-inbox'

export const instant = false

export default async function InboxPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ mailId?: string }>
}) {
  const { id } = await params
  const { mailId } = await searchParams
  const inbox = await getInboxById(id)

  if (!inbox) {
    return <NoInbox />
  }

  const mails = (inbox.mails ?? []).map((mail) => ({
    id: String(mail.id),
    inboxId: mail.inboxId,
    to: mail.to,
    from: mail.from,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    createdAt:
      mail.createdAt instanceof Date
        ? mail.createdAt.toISOString()
        : String(mail.createdAt),
  }))

  return (
    <div className="flex flex-1 flex-col">
      {mails.length === 0 ? (
        <EmptyInbox />
      ) : (
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center p-8">
              Loading...
            </div>
          }
        >
          <MailInboxView mails={mails} initialMailId={mailId} />
        </Suspense>
      )}
    </div>
  )
}
