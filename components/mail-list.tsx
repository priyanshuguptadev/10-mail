"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { parseFrom, formatMailRelativeDate } from "@/lib/mail-utils"
import type { MailItemData } from "./mail-display"

interface MailListProps {
  mails: MailItemData[]
  selectedMailId?: string
  onSelect: (id: string) => void
}

export function MailList({ mails, selectedMailId, onSelect }: MailListProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0 bg-muted/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Messages
        </span>
        <span className="text-xs text-muted-foreground font-medium">
          {mails.length} {mails.length === 1 ? "email" : "emails"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {mails.map((mail) => {
          const sender = parseFrom(mail.from)
          const isSelected = selectedMailId === mail.id
          const snippet = mail.text?.replace(/\s+/g, " ").trim() || mail.subject

          return (
            <button
              key={mail.id}
              type="button"
              onClick={() => onSelect(mail.id)}
              className={cn(
                "flex flex-col w-full text-left p-3 rounded-lg border transition-colors cursor-pointer",
                isSelected
                  ? "bg-accent text-accent-foreground border-border shadow-xs"
                  : "border-transparent hover:bg-muted/50 text-foreground"
              )}
            >
              <div className="flex w-full items-center justify-between gap-2 mb-1">
                <span className="text-sm font-semibold truncate">
                  {sender.name}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatMailRelativeDate(mail.createdAt)}
                </span>
              </div>
              <span className="text-xs font-medium truncate mb-1 text-foreground/90">
                {mail.subject || "(No subject)"}
              </span>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {snippet}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
