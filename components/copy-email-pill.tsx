'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function CopyEmailPill({ className }: { className?: string }) {
  const params = useParams<{ id?: string }>()
  const id = params?.id
  const [copied, setCopied] = React.useState(false)

  const domain = process.env.NEXT_PUBLIC_MAIL_DOMAIN || 'pryns.me'
  const email = id ? `${id}@${domain}` : ''

  const handleCopy = React.useCallback(
    async (isAuto = false) => {
      if (!email) return

      try {
        await navigator.clipboard.writeText(email)
        setCopied(true)
        toast.success('Email copied to clipboard!', {
          description: email,
        })
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } catch {
        if (!isAuto) {
          toast.error('Failed to copy email address')
        }
      }
    },
    [email],
  )

  React.useEffect(() => {
    if (!id || !email) return
    const storageKey = `copied_email_${id}`
    try {
      if (!sessionStorage.getItem(storageKey)) {
        sessionStorage.setItem(storageKey, 'true')
        navigator.clipboard
          .writeText(email)
          .then(() => {
            setCopied(true)
            toast.success('Email copied to clipboard!', {
              description: email,
            })
            setTimeout(() => {
              setCopied(false)
            }, 2000)
          })
          .catch(() => {
            // Ignore auto-copy failure (e.g. browser policy blocking background clipboard write)
          })
      }
    } catch {
      // Ignore sessionStorage errors (e.g., in strict privacy modes)
    }
  }, [id, email])

  if (!id) {
    return null
  }

  return (
    <button
      type="button"
      onClick={() => handleCopy(false)}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/60 px-2.5 py-1 text-xs font-mono font-medium text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        className,
      )}
      title="Click to copy email address"
      aria-label={`Copy email address ${email}`}
    >
      <span className="truncate max-w-37.5 sm:max-w-60 md:max-w-none text-muted-foreground group-hover:text-foreground transition-colors">
        {email}
      </span>
      {copied ? (
        <Check className="size-3.5 text-emerald-500 shrink-0 transition-transform duration-200 scale-110" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
      )}
    </button>
  )
}
