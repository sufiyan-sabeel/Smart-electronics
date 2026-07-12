"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useCallback } from "react"
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
  Star,
  Zap,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { businessInfo, getWhatsAppLink } from "@/lib/business-info"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const trustItems = [
  { icon: Truck, text: "Free Delivery over ₹1,999" },
  { icon: Shield, text: "Genuine Products Warranty" },
  { icon: Award, text: "Authorized Retailer" },
  { icon: Star, text: "98% Customer Satisfaction" },
]

// Feature 7: Subtle floating background icons (reduced to 4 for performance)
const floatingIcons = [
  { Icon: Smartphone, x: "12%", y: "18%", size: 24, duration: 10 },
  { Icon: Monitor, x: "78%", y: "72%", size: 28, duration: 12 },
  { Icon: Zap, x: "8%", y: "78%", size: 18, duration: 9 },
  { Icon: Watch, x: "88%", y: "48%", size: 20, duration: 11 },
]

// Feature 1: Product entrance silhouettes — 4 icons, tighter springs, no infinite floating
const entranceDevices = [
  { Icon: Smartphone, label: "Smartphone", x: 0.10, y: 0.28, delay: 0.3, rotate: -6 },
  { Icon: Laptop, label: "Laptop", x: 0.87, y: 0.38, delay: 0.45, rotate: 4 },
  { Icon: Watch, label: "Watch", x: 0.92, y: 0.12, delay: 0.6, rotate: 8 },
  { Icon: Headphones, label: "Headphones", x: 0.05, y: 0.60, delay: 0.35, rotate: -4 },
]

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const whatsappUrl = getWhatsAppLink(
    businessInfo.whatsapp,
    "Hello! I'd like to know more about your products and services."
  )

  // Feature 6: Power On showcase
  const [powerState, setPowerState] = useState<"off" | "booting" | "on">("off")

  const handlePowerOn = useCallback(() => {
    if (powerState === "off") {
      setPowerState("booting")
      setTimeout(() => setPowerState("on"), 1500)
    } else {
      setPowerState("off")
    }
  }, [powerState])

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-graphite-900"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients (pure CSS, no JS animation) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-50)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--color-accent-50)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-900/20)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_var(--color-accent-900/10)_0%,_transparent_50%)]" aria-hidden="true" />

      {/* Subtle grid overlay (CSS only) */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Feature 7: Floating background icons — only 4, very subtle, CSS-based, no GPU thrash */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block" aria-hidden="true">
          {floatingIcons.map((item, i) => (
            <div
              key={i}
              className={`absolute text-primary-400/10 dark:text-primary-500/15 hero-float-${i}`}
              style={{
                left: item.x,
                top: item.y,
                animation: `hero-float-${i} ${item.duration}s ease-in-out infinite`,
                willChange: "transform",
              }}
            >
              <item.Icon size={item.size} />
            </div>
          ))}
        </div>
      )}

      {/* Feature 1: Entrance silhouettes — spring entry only, no infinite float */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block" aria-hidden="true">
          {entranceDevices.map((device, i) => (
            <motion.div
              key={i}
              className="absolute will-change-transform"
              style={{ left: `${device.x * 100}%`, top: `${device.y * 100}%` }}
              initial={{ opacity: 0, x: device.x < 0.5 ? -60 : 60, y: 30, rotate: device.rotate, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: device.rotate, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
                delay: device.delay,
                mass: 0.8,
              }}
            >
              <div className="relative">
                <div className="p-2.5 rounded-xl bg-white/85 dark:bg-graphite-800/85 backdrop-blur-sm shadow-md border border-slate-200/50 dark:border-graphite-700/50">
                  <device.Icon className="h-7 w-7 text-primary-500 dark:text-primary-400" />
                </div>
                {/* Subtle glow dot — no animation */}
                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary-400/40" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Decorative gradient orbs (pure CSS, no animation) */}
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-accent-400/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-200 dark:border-primary-800 mb-6"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-graphite-900 dark:text-white leading-[1.1]"
            >
              <span className="block">Latest Electronics.</span>
              <span className="block bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 bg-clip-text text-transparent">
                Trusted Local Service.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
              className="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
            >
              Explore smartphones, laptops, accessories, smart devices, and reliable repair services —
              all with the personal touch of a local business that truly cares.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.4 }}
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

            {/* Feature 6: Power On Showcase — cleaner, faster boot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
              className="mt-6"
            >
              <button
                onClick={handlePowerOn}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-graphite-800 border border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all hover:shadow-md active:scale-[0.98]"
                aria-label={powerState === "off" ? "Power on device showcase" : "Power off device showcase"}
              >
                {/* Animated power icon */}
                <motion.div
                  animate={
                    powerState === "booting"
                      ? { rotate: [0, 360] }
                      : powerState === "on"
                      ? { scale: [1, 1.15, 1] }
                      : {}
                  }
                  transition={
                    powerState === "booting"
                      ? { duration: 0.8, repeat: 2, ease: "linear" }
                      : { duration: 0.3 }
                  }
                  className={`p-1.5 rounded-lg transition-colors ${
                    powerState === "on"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : powerState === "booting"
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                      : "bg-slate-200 dark:bg-graphite-700 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                </motion.div>

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {powerState === "off" && "Launch Device Preview"}
                  {powerState === "booting" && "Starting up..."}
                  {powerState === "on" && "Device ready — tap to close"}
                </span>

                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    powerState === "on" ? "bg-emerald-400 animate-pulse" : powerState === "booting" ? "bg-amber-400 animate-pulse" : "bg-slate-300 dark:bg-graphite-600"
                  }`}
                />
              </button>

              {/* Phone boot animation — only animates when visible */}
              {powerState !== "off" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 overflow-hidden"
                >
                  <Card className="border-slate-200 dark:border-graphite-700 shadow-md overflow-hidden max-w-sm">
                    <div className="relative bg-gradient-to-b from-graphite-900 to-graphite-800 p-5">
                      <div className="mx-auto w-44 h-[290px] rounded-[24px] bg-black border-2 border-graphite-600 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-[3px] rounded-[21px] bg-gradient-to-b from-primary-900/80 to-graphite-900 overflow-hidden">
                          {/* Notch */}
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />

                          {powerState === "booting" ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                              <motion.div
                                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.2, repeat: Infinity }}
                              >
                                <Smartphone className="h-8 w-8 text-primary-400" />
                              </motion.div>
                              <div className="w-3/4 space-y-1.5">
                                <div className="h-1 rounded-full bg-primary-500/30 overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-primary-500 to-blue-400 rounded-full"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                </div>
                                <p className="text-[9px] text-center text-primary-300/60 font-mono">Loading...</p>
                              </div>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                              >
                                <Smartphone className="h-7 w-7 text-emerald-400" />
                              </motion.div>
                              <motion.p
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                className="text-[11px] font-medium text-emerald-400"
                              >
                                Ready to connect.
                              </motion.p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <p className="text-center text-[10px] text-slate-500 mt-3 font-mono">
                        {powerState === "booting" ? "Booting..." : "Smart Electronics OS v3.1"}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: powerState === "off" ? 0.7 : 1.0 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {trustItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : (powerState === "off" ? 0.7 : 1.0) + index * 0.07,
                  }}
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
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: powerState === "off" ? 0.9 : 1.2 }}
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Glow behind showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.3 }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-primary-400/15 via-primary-300/8 to-blue-400/15 rounded-full blur-3xl"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { icon: Smartphone, title: "Smartphones", desc: "Latest flagships & budget picks", delay: 0.35 },
                  { icon: Laptop, title: "Laptops", desc: "Work, study & gaming machines", delay: 0.45, cls: "mt-8" },
                  { icon: Watch, title: "Smart Watches", desc: "Fitness & connectivity", delay: 0.55, cls: "-mt-4" },
                  { icon: Headphones, title: "Audio & Accessories", desc: "Earbuds, speakers & more", delay: 0.65, cls: "mt-4" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, delay: prefersReducedMotion ? 0 : item.delay }}
                    className={item.cls || ""}
                  >
                    <Card className="border-slate-200 dark:border-graphite-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-700 flex items-center justify-center mb-3">
                          <item.icon className="h-14 w-14 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                        </div>
                        <h4 className="font-semibold text-graphite-900 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: prefersReducedMotion ? 0 : 0.9 }}
                className="absolute -bottom-3 -left-4 bg-white dark:bg-graphite-800 rounded-xl shadow-lg border border-slate-200 dark:border-graphite-700 px-4 py-2.5"
              >
                <p className="text-[11px] text-slate-500 dark:text-slate-400">From top brands</p>
                <p className="text-base font-bold text-primary-600 dark:text-primary-400">500+ Products</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (one-shot fade, no infinite loop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <span className="text-xs font-medium">Scroll to explore</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
