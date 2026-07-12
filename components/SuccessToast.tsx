"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function useSuccessToast() {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false })

  const show = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000)
  }

  const SuccessToastComponent = () => (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-28 right-6 z-50"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-graphite-900 dark:bg-white text-white dark:text-graphite-900 shadow-2xl border border-graphite-700 dark:border-slate-200">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-400 dark:text-emerald-500" />
            </motion.div>
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className="p-1 rounded-lg hover:bg-white/10 dark:hover:bg-graphite-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 opacity-60" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return { show, SuccessToastComponent }
}

export function SuccessMessage({ message, show }: { message: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -5 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <CheckCircle2 className="h-4 w-4" />
          </motion.div>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
