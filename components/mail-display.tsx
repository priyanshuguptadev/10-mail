"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { ArrowLeft } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { parseFrom, getInitials, formatMailDate } from "@/lib/mail-utils"

export interface MailItemData {
  id: string
  inboxId?: string
  to?: string
  from: string
  subject: string
  html?: string
  text?: string
  createdAt: string | Date
}

interface MailDisplayProps {
  mail: MailItemData
  onBack?: () => void
}

export function MailDisplay({ mail, onBack }: MailDisplayProps) {
  const { resolvedTheme } = useTheme()
  const sender = React.useMemo(() => parseFrom(mail.from), [mail.from])
  const formattedDate = React.useMemo(
    () => formatMailDate(mail.createdAt),
    [mail.createdAt]
  )

  const isDark = resolvedTheme === "dark"

  const iframeContent = React.useMemo(() => {
    const rawContent = mail.html || `<div style="white-space: pre-wrap; font-family: inherit;">${mail.text || ""}</div>`
    
    // Default styling to ensure proper typography, dark/light contrast, and responsive layout
    const baseCss = `
      html, body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: ${isDark ? "#f4f4f5" : "#18181b"};
        background-color: transparent;
        word-break: break-word;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      a {
        color: #2563eb;
      }
      table {
        max-width: 100%;
      }
    `

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base target="_blank">
  <style>${baseCss}</style>
</head>
<body>
  ${rawContent}
</body>
</html>`
  }, [mail.html, mail.text, isDark])

  return (
    <div className="flex h-full flex-col p-6 min-h-0 bg-card">
      {onBack && (
        <div className="mb-4 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="-ml-2 h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1.5 size-3.5" />
            Back to inbox
          </Button>
        </div>
      )}

      {/* Header section matching screenshot */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src="" alt={sender.name} />
            <AvatarFallback className="text-xs font-semibold">
              {getInitials(sender.name, sender.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-foreground leading-tight">
              {sender.name}
            </span>
            <span className="text-sm text-foreground/80 mt-1 leading-tight">
              {mail.subject}
            </span>
            {sender.email && (
              <span className="text-xs text-muted-foreground mt-0.5 leading-tight">
                Reply-To: {sender.email}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formattedDate}
          </span>
        </div>
      </div>

      <Separator className="my-5" />

      {/* Email body rendered inside sandboxed iframe */}
      <div className="relative flex-1 min-h-75 w-full overflow-hidden">
        <iframe
          key={`${mail.id}-${isDark ? "dark" : "light"}`}
          srcDoc={iframeContent}
          sandbox="allow-popups allow-popups-to-escape-sandbox"
          className="absolute inset-0 size-full border-0"
          title={mail.subject || "Email Content"}
        />
      </div>
    </div>
  )
}
