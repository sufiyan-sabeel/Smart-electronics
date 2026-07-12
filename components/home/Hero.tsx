"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Truck,
  Shield,
  MapPin,
  Clock,
  MessageSquare,
  Award,
  Package,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { businessInfo, getWhatsAppLink, formatPhoneNumber } from "@/lib/business-info"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const trustItems = [
  { icon: Truck, text: "Free Delivery over ₹1,999" },
  { icon: Shield, text: "Genuine Products Warranty" },
  { icon: Award, text: "Authorized Retailer" },
  { icon: Star, text: "98% Customer Satisfaction" },
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const whatsappUrl = getWhatsAppLink(
    businessInfo.whatsapp,
    "Hello! I'd like to know more about your products and services."
  )

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-graphite-900"
      aria-labelledby="hero-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-50)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--color-accent-50)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-900/20)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--color-accent-900/10)_0%,_transparent_50%)]" aria-hidden="true" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-accent-400/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-200 dark:border-primary-800 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
              Chikkamagaluru&apos;s Trusted Electronics Store
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-graphite-900 dark:text-white leading-[1.1]"
            >
              <span className="block">Latest Electronics.</span>
              <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                Trusted Local Service.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
            >
              Explore smartphones, laptops, accessories, smart devices, and reliable repair services —
              all with the personal touch of a local business that truly cares.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-start gap-3"
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto px-8 py-4 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
                asChild
              >
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto px-8 py-4 shadow-lg shadow-whatsapp-500/20 hover:shadow-xl hover:shadow-whatsapp-500/30"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                  WhatsApp Inquiry
                </a>
              </Button>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.7 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {trustItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/70 dark:bg-graphite-800/70 backdrop-blur border border-slate-200/60 dark:border-graphite-700/60"
                >
                  <item.icon className="h-4 w-4 text-primary-500 flex-shrink-0" aria-hidden="true" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Store Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 1.0 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary-500" aria-hidden="true" />
                <span>Chikkamagaluru, Karnataka</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary-500" aria-hidden="true" />
                <span>Open: {businessInfo.openingHours.weekdays}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Decorative background blob */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary-200/40 to-accent-200/40 dark:from-primary-700/20 dark:to-accent-700/20 rounded-full blur-3xl" aria-hidden="true" />

              {/* Product showcase grid */}
              <div className="relative grid grid-cols-2 gap-4">
                {/* Product 1 */}
                <Card className="border-slate-200 dark:border-graphite-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-5">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-700 flex items-center justify-center mb-3">
                      <Smartphone className="h-16 w-16 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white text-sm">Smartphones</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Latest flagships &amp; budget picks</p>
                  </CardContent>
                </Card>

                {/* Product 2 */}
                <Card className="border-slate-200 dark:border-graphite-700 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
                  <CardContent className="p-5">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-700 flex items-center justify-center mb-3">
                      <Laptop className="h-16 w-16 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white text-sm">Laptops</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Work, study &amp; gaming machines</p>
                  </CardContent>
                </Card>

                {/* Product 3 */}
                <Card className="border-slate-200 dark:border-graphite-700 shadow-lg hover:shadow-xl transition-shadow duration-300 -mt-4">
                  <CardContent className="p-5">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-700 flex items-center justify-center mb-3">
                      <Watch className="h-16 w-16 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white text-sm">Smart Watches</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Track your fitness &amp; stay connected</p>
                  </CardContent>
                </Card>

                {/* Product 4 */}
                <Card className="border-slate-200 dark:border-graphite-700 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4">
                  <CardContent className="p-5">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-700 flex items-center justify-center mb-3">
                      <Headphones className="h-16 w-16 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white text-sm">Audio &amp; Accessories</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Earbuds, speakers &amp; more</p>
                  </CardContent>
                </Card>
              </div>

              {/* Floating product count badge */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-graphite-800 rounded-2xl shadow-xl border border-slate-200 dark:border-graphite-700 px-5 py-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">From top brands</p>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">500+ Products</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: prefersReducedMotion ? 0 : [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
