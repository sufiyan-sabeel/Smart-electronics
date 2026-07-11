"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-graphite-900 text-white hover:bg-graphite-900/80 dark:bg-graphite-100 dark:text-graphite-900 dark:hover:bg-graphite-100/80",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-graphite-800 dark:text-slate-100 dark:hover:bg-graphite-700",
        destructive: "border-transparent bg-red-600 text-white hover:bg-red-600/80 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/80",
        outline: "text-graphite-900 border-slate-300 hover:bg-slate-100 dark:text-slate-100 dark:border-graphite-700 dark:hover:bg-graphite-800",
        primary: "border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-200 dark:hover:bg-primary-900/50",
        accent: "border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200 dark:bg-accent-900/30 dark:text-accent-200 dark:hover:bg-accent-900/50",
        whatsapp: "border-transparent bg-whatsapp-100 text-whatsapp-800 hover:bg-whatsapp-200 dark:bg-whatsapp-900/30 dark:text-whatsapp-200 dark:hover:bg-whatsapp-900/50",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50",
        warning: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }