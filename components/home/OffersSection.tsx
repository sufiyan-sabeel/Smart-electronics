"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Tag, Sparkles, RotateCcw, GraduationCap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { offers, products } from "@/lib/data"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn, getAssetUrl } from "@/lib/utils"

const offerIcons = {
  "weekly-deals": Tag,
  "festival-offers": Sparkles,
  "exchange-offers": RotateCcw,
  "student-discounts": GraduationCap,
}

export function OfferCard({ offer, index }: { offer: typeof offers[0]; index: number }) {
  const offerProducts = offer.products.map(id => products.find(p => p.id === id)).filter(Boolean)
  const OfferIcon = offerIcons[offer.id as keyof typeof offerIcons]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
    >
      <Card className={cn("group overflow-hidden", offer.background, offer.border)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge variant="outline" className="mb-2">{offer.badge}</Badge>
              <h3 className="text-xl font-bold text-graphite-900 dark:text-white">{offer.title}</h3>
            </div>
            <div className="p-3 rounded-xl bg-white/50 dark:bg-graphite-900/50 backdrop-blur">
              <OfferIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6">{offer.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {offerProducts.slice(0, 4).map((product) => (
              <Link
                key={product!.id}
                href={`/products/${product!.id}`}
                className="group flex items-center gap-3 p-2 rounded-xl bg-white/50 dark:bg-graphite-900/50 hover:bg-white/80 dark:hover:bg-graphite-900/80 transition-colors"
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-graphite-800 flex-shrink-0">
                  <img
                    src={getAssetUrl(product!.image)}
                    alt={product!.name}
                    className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-graphite-900 dark:text-white truncate">{product!.name}</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{product!.price.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 })}</p>
                </div>
              </Link>
            ))}
          </div>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/offers">View Offer Details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function OffersSection() {
  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="offers-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="offers-heading" className="section-title">Current Offers</h2>
          <p className="section-subtitle">Special deals and discounts you won't want to miss</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/offers">View All Offers <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}