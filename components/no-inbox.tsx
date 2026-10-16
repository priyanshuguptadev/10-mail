import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './ui/empty'
import { MailX } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Logo } from './logo'

export default function NoInbox() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Empty>
        <EmptyMedia
          variant="icon"
        >
          <Logo className="h-6 w-6" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className="text-base font-semibold tracking-tight">
            Email expired or does not exist
          </EmptyTitle>
          <EmptyDescription className="text-sm text-muted-foreground">
            This email is either expired or does not exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2 flex flex-col items-center gap-3">
          <Button asChild variant="outline">
            <Link href="/inbox">Create new inbox</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
