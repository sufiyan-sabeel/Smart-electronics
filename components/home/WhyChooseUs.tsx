"use client"

import { motion } from "framer-motion"
import { Shield, Award, HeadphonesIcon, Truck, BadgeCheck, Store } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const reasons = [
  {
    icon: BadgeCheck,
    title: "Authorized Retailer",
    description: "Official partner for Apple, Samsung, OnePlus, Dell, HP, and more. Every product comes with manufacturer warranty and valid GST invoice.",
  },
  {
    icon: Shield,
    title: "100% Genuine Products",
    description: "Directly sourced from brand distributors. No counterfeit, no refurbished. If it's not genuine, you get your money back.",
  },
  {
    icon: Award,
    title: "Years of Experience",
    description: "Serving Chikkamagaluru since 2020 with honest advice, fair pricing, and reliable after-sales support you can count on.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Guidance",
    description: "Our knowledgeable team helps you choose the right product for your needs and budget — no upsells, just honest recommendations.",
  },
  {
    icon: Truck,
    title: "Free Delivery & Setup",
    description: "Complimentary delivery within Chikkamagaluru on orders above ₹1,999. We also help with initial setup and data transfer.",
  },
  {
    icon: Store,
    title: "Walk-In Showroom",
    description: "Visit our store to see, touch, and try products before you buy. Hands-on experience with real devices on display.",
  },
]

export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="whychooseus-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Why Choose Smart Electronics
          </span>
          <h2 id="whychooseus-heading" className="section-title">
            Chikkamagaluru&apos;s Trusted Electronics Store
          </h2>
          <p className="section-subtitle">
            We&apos;re not just a store — we&apos;re your technology partners. Here&apos;s why thousands of customers trust us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
            >
              <Card className="h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <reason.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-graphite-900 dark:text-white mb-2">{reason.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
