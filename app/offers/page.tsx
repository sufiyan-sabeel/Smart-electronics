"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { offers, products } from "@/lib/data"
import { Tag, Sparkles, RotateCcw, GraduationCap, ArrowRight, Clock, Star, ShoppingBag, MessageSquare, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, getWhatsAppLink } from "@/lib/utils"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const offerIcons = {
  "weekly-deals": Tag,
  "festival-offers": Sparkles,
  "exchange-offers": RotateCcw,
  "student-discounts": GraduationCap,
}

const offerColors = {
  "weekly-deals": "from-primary-500 to-primary-600",
  "festival-offers": "from-accent-500 to-accent-600",
  "exchange-offers": "from-whatsapp-500 to-whatsapp-600",
  "student-discounts": "from-green-500 to-green-600",
}

const offerBackgrounds = {
  "weekly-deals": "bg-primary-50 dark:bg-primary-900/20",
  "festival-offers": "bg-accent-50 dark:bg-accent-900/20",
  "exchange-offers": "bg-whatsapp-50 dark:bg-whatsapp-900/20",
  "student-discounts": "bg-green-50 dark:bg-green-900/20",
}

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-graphite-900">
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white dark:from-graphite-900 dark:to-graphite-900 border-b border-slate-200 dark:border-graphite-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center mx-auto"
          >
            <Badge variant="primary" className="mb-4">Limited Time Offers</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite-900 dark:text-white mb-4">
              Current Promotions & Deals
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Save big on your favorite electronics. Offers updated weekly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <Card className={cn("h-full group overflow-hidden", offerBackgrounds[offer.id as keyof typeof offerBackgrounds], offer.border)}>
                  <div className="relative h-48 overflow-hidden">
                    <div className={cn("absolute inset-0 bg-gradient-to-br", offerColors[offer.id as keyof typeof offerColors])} />
                    <div className="absolute inset-0 flex items-center justify-center p-8 text-white">
                      <offerIcons[offer.id as keyof typeof offerIcons] className="h-16 w-16 opacity-90" aria-hidden="true" />
                    </div>
                    <Badge variant="accent" className="absolute top-4 left-4 z-10">{offer.badge}</Badge>
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-graphite-900 dark:text-white mb-2">{offer.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">{offer.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {offer.products.slice(0, 4).map(productId => {
                        const product = products.find(p => p.id === productId)
                        if (!product) return null
                        const discount = product.originalPrice 
                          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                          : 0
                        return (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group flex gap-3 p-2 rounded-xl bg-white/50 dark:bg-graphite-900/50 hover:bg-white/80 dark:hover:bg-graphite-900/80 transition-colors"
                          >
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-graphite-800 flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-graphite-900 dark:text-white truncate">{product.name}</p>
                              <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                                  {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                  <span className="text-xs text-slate-500 dark:text-slate-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                )}
                                {discount > 0 && (
                                  <Badge variant="accent" className="text-xs ml-auto">-{discount}%</Badge>
                                )}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/offers/${offer.id}`}>
                        View Offer Details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-graphite-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white mb-4">
              Why Shop Offers at Smart Electronics?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Our offers come with the same trusted service and genuine products you expect from us.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { icon: ShieldCheck, title: "Genuine Products", desc: "All products carry official brand warranty" },
                { icon: MessageSquare, title: "Easy Inquiry", desc: "One-click WhatsApp for instant quotes" },
                { icon: ShieldCheck, title: "Free Delivery", desc: "On orders above ₹1,999 within city" },
                { icon: Clock, title: "Hassle-Free Returns", desc: "7-day return policy on all products" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-600 to-whatsapp-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Stay Updated on Latest Deals
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our WhatsApp broadcast for exclusive offers, flash sales, and new arrivals.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
              <Link href="https://wa.me/91XXXXXXXXXX?text=Subscribe%20me%20to%20offers" target="_blank" rel="noopener noreferrer">
                Subscribe on WhatsApp
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}