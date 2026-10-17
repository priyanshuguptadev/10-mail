import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-svh bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-md space-y-4">
        <div className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold">10-Mail</span>
        </div>
        <div className="text-6xl font-extrabold tracking-tight text-foreground/40">
          404
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page or Inbox Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The requested page or temporary inbox does not exist, or has expired
          after its 10-minute lifetime.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/inbox" prefetch={false}>Create New Inbox</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
