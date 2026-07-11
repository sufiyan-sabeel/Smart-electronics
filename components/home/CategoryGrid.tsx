"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Smartphone, Laptop, Watch, Headphones, Speaker, Package, BatteryCharging, Battery, Cable, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  smartphone: Smartphone,
  laptop: Laptop,
  watch: Watch,
  headphones: Headphones,
  speaker: Speaker,
  accessibility: Package,
  "battery-charging": BatteryCharging,
  battery: Battery,
  cable: Cable,
}

interface CategoryCardProps {
  category: typeof categories[0]
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const Icon = categoryIcons[category.icon] || Package

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
    >
      <Card className="group h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 overflow-hidden">
        <Link 
          href={`/products?category=${category.id}`}
          className="block h-full"
          aria-label={`Browse ${category.name} - ${category.count} products available`}
        >
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-whatsapp-50 dark:from-primary-900/20 dark:to-whatsapp-900/20">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="h-16 w-16 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          </div>
          <CardContent className="p-5 text-center">
            <h3 className="font-semibold text-graphite-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {category.count} products
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
              Explore
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  )
}

export function CategoryGrid() {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="categories-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="categories-heading" className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Explore our wide range of premium electronics across all major categories</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View All Categories
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}