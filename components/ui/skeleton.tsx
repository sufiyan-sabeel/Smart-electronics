"use client"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-slate-200 dark:bg-graphite-700", className)}
      {...props}
    />
  )
}

export { Skeleton }