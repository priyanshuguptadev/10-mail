"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { MailList } from "@/components/mail-list"
import { MailDisplay, type MailItemData } from "@/components/mail-display"
import { MailEmpty } from "@/components/mail-empty"

interface MailInboxViewProps {
  mails: MailItemData[]
  initialMailId?: string
}

export function MailInboxView({ mails, initialMailId }: MailInboxViewProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedMailId = searchParams.get("mailId") || initialMailId || undefined
  const selectedMail = React.useMemo(
    () => mails.find((m) => m.id === selectedMailId),
    [mails, selectedMailId]
  )

  const handleSelectMail = React.useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set("mailId", id)
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  const handleBack = React.useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("mailId")
    router.push(`${pathname}?${params.toString()}`)
  }, [pathname, router, searchParams])

  return (
    <div className="flex flex-1 rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden h-[calc(100vh-8.5rem)] min-h-125">
      {/* Mail List (master) */}
      <div
        className={cn(
          "w-full md:w-80 lg:w-96 flex flex-col shrink-0 border-r bg-card",
          selectedMail ? "hidden md:flex" : "flex"
        )}
      >
        <MailList
          mails={mails}
          selectedMailId={selectedMailId}
          onSelect={handleSelectMail}
        />
      </div>

      {/* Mail Display or Empty State (detail) */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 bg-card",
          selectedMail ? "flex" : "hidden md:flex"
        )}
      >
        {selectedMail ? (
          <MailDisplay mail={selectedMail} onBack={handleBack} />
        ) : (
          <MailEmpty />
        )}
      </div>
    </div>
  )
}
