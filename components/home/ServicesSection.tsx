"use client"

import { motion } from "framer-motion"
import { Smartphone, Laptop, Monitor, MonitorSmartphone, Package, Truck, ShieldCheck, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/lib/data"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const serviceIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  monitor: Monitor,
  "monitor-smartphone": MonitorSmartphone,
  package: Package,
  truck: Truck,
  "shield-check": ShieldCheck,
}

export function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Smartphone

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
    >
      <Card className="group h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 mb-4">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>
          
          <h3 className="text-lg font-semibold text-graphite-900 dark:text-white mb-2">{service.name}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">{service.description}</p>

          <div className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 flex-shrink-0" aria-hidden="true" />
                {feature}
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                +{service.features.length - 3} more services
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1"><span className="font-medium text-graphite-900 dark:text-white">{service.price}</span> onwards</span>
            <span className="flex items-center gap-1"><span className="font-medium text-graphite-900 dark:text-white">{service.duration}</span></span>
            <span className="flex items-center gap-1"><span className="font-medium text-graphite-900 dark:text-white">{service.warranty}</span> warranty</span>
          </div>

          <Button variant="outline" className="w-full mt-auto" asChild>
            <Link href="/services">Learn More <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="services-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="services-heading" className="section-title">Our Services</h2>
          <p className="section-subtitle">Expert repair, installation, and support services for all your electronics</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <Button size="lg" asChild>
            <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}