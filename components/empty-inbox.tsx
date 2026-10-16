import { Inbox } from 'lucide-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { cn } from '@/lib/utils'
import { CopyEmailPill } from './copy-email-pill'

interface EmptyInboxProps {
  className?: string
}

export function EmptyInbox({ className }: EmptyInboxProps) {
  return (
    <div
      className={cn('flex flex-1 items-center justify-center p-4', className)}
    >
      <Empty>
        <EmptyMedia
          variant="icon"
          className="size-12 rounded-xl bg-muted text-foreground"
        >
          <Inbox className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className="text-base font-semibold tracking-tight">
            Your inbox is empty
          </EmptyTitle>
          <EmptyDescription className="text-sm text-muted-foreground">
            Emails sent to this disposable inbox will appear here. Keep
            Refreshing!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <CopyEmailPill />
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default EmptyInbox
