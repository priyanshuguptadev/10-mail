import { createInbox } from '@/actions/inbox'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'

export const instant = false

export default async function InboxIndexPage() {
  await connection()
  const id = await createInbox()
  redirect(`/inbox/${id}`)
}
