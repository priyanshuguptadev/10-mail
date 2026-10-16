import { Mail } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty'

export function MailEmpty() {
  return (
    <div className="flex h-full flex-1 items-center justify-center p-8 bg-card">
      <Empty>
        <EmptyMedia variant="icon">
          <Mail className="size-4" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No message selected</EmptyTitle>
          <EmptyDescription>
            Choose an email from the list to read its content.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
