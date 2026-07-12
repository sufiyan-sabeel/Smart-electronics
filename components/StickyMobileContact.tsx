"use client"

import { Phone, MessageSquare, MapPin } from "lucide-react"
import { businessInfo, getCallLink, getWhatsAppLink } from "@/lib/business-info"

export function StickyMobileContact() {
  const callUrl = getCallLink(businessInfo.phone)
  const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-graphite-900 border-t border-slate-200 dark:border-graphite-700 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
      <div className="flex items-stretch">
        <a
          href={callUrl}
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-graphite-800 active:bg-slate-100 dark:active:bg-graphite-700 transition-colors"
          aria-label="Call Smart Electronics"
        >
          <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
          <span>Call</span>
        </a>

        <div className="w-px bg-slate-200 dark:bg-graphite-700" aria-hidden="true" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium bg-whatsapp-500 text-white hover:bg-whatsapp-600 active:bg-whatsapp-700 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <div className="w-px bg-slate-200 dark:bg-graphite-700" aria-hidden="true" />

        <a
          href={businessInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-graphite-800 active:bg-slate-100 dark:active:bg-graphite-700 transition-colors"
          aria-label="Get directions to store"
        >
          <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
          <span>Store</span>
        </a>
      </div>
    </div>
  )
}

/**
 * Add padding to the bottom of the page to account for the sticky bar.
 * Import this class in layouts or pages as needed.
 */
export const STICKY_BAR_HEIGHT = "pb-16 md:pb-0"
