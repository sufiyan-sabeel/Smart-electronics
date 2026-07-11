"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Smartphone, Laptop, Watch, Headphones, Truck, Shield, HeadphonesIcon, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { businessInfo, getWhatsAppLink } from "@/lib/business-info"
import { cn } from "@/lib/utils"

const features = [
  { icon: Smartphone, title: "Latest Smartphones", description: "Top brands, genuine warranty" },
  { icon: Laptop, title: "Premium Laptops", description: "Work & gaming machines" },
  { icon: Watch, title: "Smart Wearables", description: "Watches, bands & trackers" },
  { icon: Headphones, title: "Audio & Accessories", description: "Earbuds, speakers, cables" },
  { icon: Truck, title: "Free Delivery", description: "Within city on orders ₹1999+" },
  { icon: Shield, title: "Authorized Service", description: "Genuine parts, warranty support" },
]

const benefits = [
  { icon: Award, title: "Authorized Retailer", description: "All products come with official brand warranty and valid GST invoice" },
  { icon: Shield, title: "Genuine Products", description: "100% authentic electronics sourced directly from brand distributors" },
  { icon: HeadphonesIcon, title: "Expert Guidance", description: "Knowledgeable staff to help you choose the right product for your needs" },
  { icon: Truck, title: "After-Sales Support", description: "Dedicated service center for repairs, installations, and warranty claims" },
]

export function Hero() {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp, "Hello! I'd like to inquire about your products and services.")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-whatsapp-50 dark:from-graphite-900 dark:via-graphite-900 dark:to-graphite-900" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" aria-hidden="true" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
        className="container-custom relative z-10 py-20 sm:py-32"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium dark:bg-primary-900/30 dark:text-primary-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            New Arrivals & Festival Offers Available
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-graphite-900 dark:text-white"
          >
            <span className="block">Premium Electronics.</span>
            <span className="block gradient-text">Trusted Service.</span>
            <span className="block">Best Deals.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Discover smartphones, laptops, accessories, and more with reliable service and competitive pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group w-full sm:w-auto px-8 py-4"
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
              className="w-full sm:w-auto px-8 py-4"
              asChild
            >
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact on WhatsApp
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400"
          >
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span>Free Delivery {'>'}₹1999</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span>Genuine Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span>Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <span>Authorized Retailer</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

export function Features() {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="features-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 id="features-heading" className="section-title">Why Choose Smart Electronics</h2>
          <p className="section-subtitle">We go beyond selling products — we build lasting relationships through trust, expertise, and exceptional service.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="group"
            >
              <Card className="h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white dark:group-hover:bg-primary-600 transition-all duration-300 mb-4">
                    <feature.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-graphite-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Benefits() {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  return (
    <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="benefits-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h2 id="benefits-heading" className="section-title">Customer Benefits</h2>
            <p className="section-subtitle">Every purchase comes with peace of mind and value-added services that make us different.</p>
            
            <div className="mt-8 space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-graphite-800 border border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center dark:bg-primary-900/30 dark:text-primary-400">
                      <benefit.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-whatsapp-500 rounded-3xl opacity-20 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-graphite-800 dark:to-graphite-700 p-8 shadow-2xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-graphite-900/50 backdrop-blur">
                    <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">5000+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Happy Customers</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-graphite-900/50 backdrop-blur">
                    <div className="text-3xl sm:text-4xl font-bold text-whatsapp-600 dark:text-whatsapp-400">12+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Top Brands</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-graphite-900/50 backdrop-blur">
                    <div className="text-3xl sm:text-4xl font-bold text-accent-600 dark:text-accent-400">7</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-graphite-900/50 backdrop-blur">
                    <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">98%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}