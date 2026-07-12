"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { brands } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { getAssetUrl } from "@/lib/utils"

export function BrandCard({ brand, index }: { brand: typeof brands[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
    >
      <Card className="group h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700">
        <Link
          href={`/brands/${brand.id}`}
          className="block h-full"
          aria-label={`View ${brand.name} products - ${brand.productCount} products available`}
        >
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className="relative w-full max-w-xs h-16 sm:h-20 flex items-center justify-center">
              <Image
                src={getAssetUrl(brand.logo)}
                alt={`${brand.name} logo`}
                fill
                className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                sizes="100px"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  )
}

export function BrandGrid() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="brands-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="brands-heading" className="section-title">Featured Brands</h2>
          <p className="section-subtitle">Authorized retailer for the world's leading electronics brands</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View All Brands
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}