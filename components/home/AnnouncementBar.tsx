"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react"
import { businessInfo, formatPhoneNumber } from "@/lib/business-info"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AnnouncementBar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
      className="relative z-50 bg-graphite-900 text-slate-300 text-xs sm:text-sm"
      role="banner"
      aria-label="Store announcement"
    >
      <div className="container-custom flex items-center justify-between py-1.5 sm:py-2">
        <div className="flex items-center gap-3 sm:gap-6 overflow-hidden">
          <span className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
            <span className="truncate max-w-[180px] lg:max-w-none">{businessInfo.address}</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Clock className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
            <span>Open: {businessInfo.openingHours.weekdays}</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 sm:hidden">
            <Clock className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
            <span>Open {businessInfo.openingHours.weekdays.split(":")[1]}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${businessInfo.phone.replace(/\D/g, "")}`}
            className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors font-medium"
          >
            <Phone className="h-3.5 w-3.5 text-primary-400" aria-hidden="true" />
            <span>{formatPhoneNumber(businessInfo.phone)}</span>
          </a>
          <a
            href={businessInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 transition-colors font-medium"
          >
            <span className="hidden xs:inline">Get Directions</span>
            <span className="xs:hidden">Directions</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
