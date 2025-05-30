import React from 'react'
import { cn } from '../../utils/cn'

export function Avatar({ className, children }) {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>
      {children}
    </div>
  )
}

export function AvatarFallback({ className, children }) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-slate-700", className)}>
      {children}
    </div>
  )
}