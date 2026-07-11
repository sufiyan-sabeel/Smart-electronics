"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { services } from "@/lib/data"
import { Smartphone, Laptop, Monitor, MonitorSmartphone, Package, Truck, ShieldCheck, Check, ArrowRight, Clock, Shield, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { getWhatsAppLink } from "@/lib/business-info"

const serviceIcons = {
  smartphone: Smartphone,
  laptop: Laptop,
  monitor: Monitor,
  "monitor-smartphone": MonitorSmartphone,
  package: Package,
  truck: Truck,
  "shield-check": ShieldCheck,
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-graphite-900">
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white dark:from-graphite-900 dark:to-graphite-900 border-b border-slate-200 dark:border-graphite-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite-900 dark:text-white mb-4">
              Our Services
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Expert repair, installation, and support services for all your electronics. 
              Authorized service partner for major brands.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || Smartphone
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.05 }}
                >
                  <Card className="h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-50 to-whatsapp-50 dark:from-primary-900/20 dark:to-whatsapp-900/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-graphite-900 dark:text-white mb-2">{service.name}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1">{service.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Check className="h-4 w-4 text-primary-600 dark:text-primary-400 flex-shrink-0" aria-hidden="true" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 pt-4 border-t border-slate-200 dark:border-graphite-700">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          <span>{service.duration}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-4 w-4" aria-hidden="true" />
                          <span>{service.warranty}</span>
                        </span>
                        <span className="flex items-center gap-1 font-medium text-primary-600 dark:text-primary-400">
                          {service.price}
                        </span>
                      </div>

                      <Button variant="whatsapp" className="w-full" asChild>
                        <a href={getWhatsAppLink("91XXXXXXXXXX", `Hello! I'd like to book ${service.name} service.`)} target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                          Book Service
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-graphite-800/50">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white text-center mb-10">
            Service Process & FAQ
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Accordion type="single" className="space-y-4">
              {[
                {
                  title: "How do I book a repair service?",
                  content: "You can book a repair by calling us, WhatsApp messaging, or visiting our store. We'll schedule a convenient time for device drop-off or pickup."
                },
                {
                  title: "Do you provide free diagnostics?",
                  content: "Yes! We offer free diagnostic assessment for all devices. You'll receive a detailed quote before any repair work begins."
                },
                {
                  title: "What brands do you service?",
                  content: "We service all major brands including Apple, Samsung, Xiaomi, OnePlus, Vivo, Oppo, Realme, Dell, HP, Lenovo, ASUS, and more."
                },
                {
                  title: "Do you use genuine parts?",
                  content: "Absolutely. We use only genuine manufacturer parts or high-quality OEM equivalents. All parts come with warranty."
                },
                {
                  title: "How long do repairs take?",
                  content: "Most mobile repairs are completed within 1-2 hours. Laptop repairs typically take 1-3 days depending on parts availability."
                },
                {
                  title: "Do you offer pickup and delivery?",
                  content: "Yes! Free doorstep pickup and delivery within Chikkamagaluru city limits for service orders above ₹1,999."
                },
                {
                  title: "What warranty do you provide on repairs?",
                  content: "All repairs come with 90-day warranty on parts and labor. Screen replacements have 180-day warranty."
                },
                {
                  title: "Can I track my repair status?",
                  content: "Yes, you'll receive real-time WhatsApp/SMS updates at every stage: Received → Diagnostics → Quote → Repair → Quality Check → Ready."
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                >
                  <AccordionItem value={`faq-${index}`}>
                    <AccordionTrigger className="text-left py-4 text-base font-medium focus-visible:ring-0">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.content}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
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
              Need a Repair or Service?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Get a free quote and book your service appointment today. Our experts are ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4" asChild>
                <a href={getWhatsAppLink("91XXXXXXXXXX", "Hello! I'd like to book a repair service.")} target="_blank" rel="noopener noreferrer">
                  WhatsApp Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}