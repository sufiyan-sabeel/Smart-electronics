import { MessageSquare, Phone, MapPin, Mail, X, Clock, Copy, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { businessInfo, formatPhoneNumber, getWhatsAppLink, getCallLink } from "@/lib/business-info"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function FloatingWhatsApp() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp)
  const callUrl = getCallLink(businessInfo.phone)

  const menuItems = [
    {
      icon: MessageSquare,
      label: "WhatsApp Chat",
      description: "Instant reply within minutes",
      href: whatsappUrl,
      target: "_blank",
      color: "bg-whatsapp-500 hover:bg-whatsapp-600",
      variant: "whatsapp" as const,
    },
    {
      icon: Phone,
      label: "Call Us",
      description: "Business hours: 10AM - 8PM",
      href: callUrl,
      color: "bg-primary-600 hover:bg-primary-700",
      variant: "default" as const,
    },
    {
      icon: MapPin,
      label: "Visit Store",
      description: businessInfo.address,
      href: businessInfo.googleMapsUrl,
      target: "_blank",
      color: "bg-accent-600 hover:bg-accent-700",
      variant: "default" as const,
    },
    {
      icon: Mail,
      label: "Email Us",
      description: "Reply within 24 hours",
      href: `mailto:${businessInfo.email}`,
      color: "bg-slate-600 hover:bg-slate-700",
      variant: "secondary" as const,
    },
  ]

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="absolute bottom-16 right-0 w-72"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 dark:bg-graphite-800 dark:border-graphite-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-graphite-900 dark:text-white">Contact Us</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-graphite-700 transition-colors"
                    aria-label="Close contact menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.2 }}
                      href={item.href}
                      target={item.target}
                      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                        item.color,
                        "text-white hover:shadow-lg hover:-translate-x-1"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.label}</p>
                        <p className="text-xs opacity-90 truncate">{item.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-graphite-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    We're available {businessInfo.openingHours.weekdays}
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-14 right-2 w-3 h-3 bg-white rounded-full border border-slate-200 dark:bg-graphite-800 dark:border-graphite-700 rotate-45"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-500 focus-visible:ring-offset-2",
                isExpanded ? "rotate-45 scale-110 bg-whatsapp-600" : "hover:scale-105 bg-whatsapp-500"
              )}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Close contact options" : "Open contact options"}
              whileHover={{ scale: isExpanded ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: prefersReducedMotion
                  ? "0 10px 25px -5px rgba(0,0,0,0.1)"
                  : ["0 10px 25px -5px rgba(0,0,0,0.1)", "0 20px 25px -5px rgba(0,0,0,0.15)", "0 10px 25px -5px rgba(0,0,0,0.1)"],
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 2, repeat: Infinity }}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: 45, scale: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  >
                    <X className="h-7 w-7 text-white" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="whatsapp"
                    initial={{ rotate: 45, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    exit={{ rotate: -45, scale: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  >
                    <MessageSquare className="h-7 w-7 text-white" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.5 : 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-graphite-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-slate-100 dark:text-graphite-900"
                aria-hidden="true"
              >
                Chat with us
              </motion.span>

              <motion.div
                animate={{
                  scale: prefersReducedMotion ? 1 : [1, 1.3, 1],
                  opacity: prefersReducedMotion ? 0.3 : [0.4, 0, 0.4],
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-whatsapp-500 opacity-30"
                aria-hidden="true"
              />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" align="end" className="max-w-xs">
            <p className="font-medium">Contact Smart Electronics</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Click to chat on WhatsApp, call, or visit our store</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="fixed bottom-24 right-6 z-50 flex items-center gap-2 rounded-lg bg-graphite-900 px-4 py-2 text-sm font-medium text-white shadow-xl dark:bg-slate-100 dark:text-graphite-900"
        >
          <Check className="h-4 w-4 text-green-400" />
          <span>{copied} copied to clipboard</span>
        </motion.div>
      )}
    </>
  )
}