"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, BarChart3, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function useComparison() {
  const [selected, setSelected] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleProduct = (product: Product) => {
    if (selected.find(p => p.id === product.id)) {
      setSelected(prev => prev.filter(p => p.id !== product.id))
    } else if (selected.length < 2) {
      setSelected(prev => [...prev, product])
    }
  }

  const isSelected = (productId: string) => selected.some(p => p.id === productId)

  const clearAll = () => {
    setSelected([])
    setIsOpen(false)
  }

  return { selected, isOpen, setIsOpen, toggleProduct, isSelected, clearAll }
}

interface ComparisonPanelProps {
  products: Product[]
  isOpen: boolean
  onClose: () => void
}

export function ComparisonPanel({ products, isOpen, onClose }: ComparisonPanelProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
  }, [])

  if (products.length !== 2) return null

  const [a, b] = products

  const specs: { label: string; aVal: string | number; bVal: string | number; better: "a" | "b" | "tie" }[] = [
    { label: "Price", aVal: formatPrice(a.price), bVal: formatPrice(b.price), better: a.price < b.price ? "a" : "b" },
    { label: "Rating", aVal: a.rating || "N/A", bVal: b.rating || "N/A", better: (a.rating || 0) > (b.rating || 0) ? "a" : (a.rating || 0) < (b.rating || 0) ? "b" : "tie" },
    { label: "Reviews", aVal: a.reviewCount || 0, bVal: b.reviewCount || 0, better: (a.reviewCount || 0) > (b.reviewCount || 0) ? "a" : "b" },
    { label: "Brand", aVal: a.brand, bVal: b.brand, better: "tie" },
    { label: "Category", aVal: a.category, bVal: b.category, better: "tie" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 30, duration: prefersReducedMotion ? 0 : 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-[55] bg-white dark:bg-graphite-800 border-t border-slate-200 dark:border-graphite-700 shadow-2xl rounded-t-3xl"
        >
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-500" />
                <h3 className="font-semibold text-graphite-900 dark:text-white">Product Comparison</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-graphite-700 transition-colors"
                aria-label="Close comparison"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-slate-500 dark:text-slate-400 font-medium">Specification</div>
              <div className="font-semibold text-graphite-900 dark:text-white text-center">{a.name}</div>
              <div className="font-semibold text-graphite-900 dark:text-white text-center">{b.name}</div>

              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : i * 0.05 }}
                  className={cn("contents", i % 2 === 0 && "bg-slate-50 dark:bg-graphite-900/50")}
                >
                  <div className="py-3 px-2 text-slate-500 dark:text-slate-400">{spec.label}</div>
                  <div className={cn(
                    "py-3 px-2 text-center flex items-center justify-center gap-1.5",
                    spec.better === "a" && "text-emerald-600 dark:text-emerald-400 font-medium"
                  )}>
                    {spec.aVal}
                    {spec.better === "a" && <Check className="h-3.5 w-3.5" />}
                    {spec.better === "b" && <Minus className="h-3.5 w-3.5 text-slate-300" />}
                  </div>
                  <div className={cn(
                    "py-3 px-2 text-center flex items-center justify-center gap-1.5",
                    spec.better === "b" && "text-emerald-600 dark:text-emerald-400 font-medium"
                  )}>
                    {spec.bVal}
                    {spec.better === "b" && <Check className="h-3.5 w-3.5" />}
                    {spec.better === "a" && <Minus className="h-3.5 w-3.5 text-slate-300" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
