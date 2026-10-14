import { Inbox, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"


export default function InboxPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Empty>
        <EmptyMedia variant="icon" className="size-12 rounded-xl bg-muted text-foreground">
          <Inbox className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className="text-base font-semibold tracking-tight">
            Your inbox is empty
          </EmptyTitle>
          <EmptyDescription className="text-sm text-muted-foreground">
            Emails sent to this disposable inbox will appear here. Keep Refreshing!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="mt-2 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <RefreshCw className="size-3.5" />
              
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
