'use client'

import * as React from 'react'
import { Check, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const emptySubscribe = () => () => {}

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const { state, isMobile } = useSidebar()
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const isCollapsed = state === 'collapsed' && !isMobile

  const button = (
    <SidebarMenuButton
      className={
        className ??
        'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
      }
    >
      <div className="relative flex size-4 shrink-0 items-center justify-center">
        <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </div>
      <span className="group-data-[collapsible=icon]:hidden">Theme</span>
    </SidebarMenuButton>
  )

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Toggle theme
            </TooltipContent>
          </Tooltip>
        ) : (
          <DropdownMenuTrigger asChild>{button}</DropdownMenuTrigger>
        )}
        <DropdownMenuContent
          side={isMobile ? 'bottom' : isCollapsed ? 'right' : 'top'}
          align={isCollapsed ? 'start' : 'start'}
          className="min-w-36"
        >
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sun className="size-4" />
              <span>Light</span>
            </span>
            {mounted && theme === 'light' && (
              <Check className="size-4 text-muted-foreground" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Moon className="size-4" />
              <span>Dark</span>
            </span>
            {mounted && theme === 'dark' && (
              <Check className="size-4 text-muted-foreground" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Monitor className="size-4" />
              <span>System</span>
            </span>
            {mounted && theme === 'system' && (
              <Check className="size-4 text-muted-foreground" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
