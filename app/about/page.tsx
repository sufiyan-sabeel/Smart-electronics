"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { businessInfo } from "@/lib/business-info"
import { Shield, Award, Users, Heart, Truck, MessageSquare, MapPin, Clock, Star, CheckCircle, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { getWhatsAppLink } from "@/lib/business-info"

const values = [
  { icon: Shield, title: "Authenticity Guaranteed", desc: "Every product is 100% genuine with official manufacturer warranty and valid GST invoice." },
  { icon: Award, title: "Expert Knowledge", desc: "Our certified technicians and product experts help you make the right choice for your needs." },
  { icon: Heart, title: "Customer First", desc: "Your satisfaction drives everything we do. We're not happy until you're completely satisfied." },
  { icon: Users, title: "Community Focused", desc: "Locally owned and operated. We understand Chikkamagaluru's needs because we're part of it." },
  { icon: Truck, title: "Convenient Service", desc: "Free delivery, doorstep pickup, and WhatsApp support make shopping effortless." },
  { icon: MessageSquare, title: "Transparent Pricing", desc: "No hidden fees. Honest quotes for repairs. Competitive prices on all products." },
]

const milestones = [
  { number: "7+", label: "Years Experience", icon: Building2 },
  { number: "5000+", label: "Happy Customers", icon: Users },
  { number: "12+", label: "Top Brands", icon: Award },
  { number: "98%", label: "Satisfaction Rate", icon: Star },
]

const team = [
  { name: "Rajesh Kumar", role: "Founder & CEO", experience: "15+ years in electronics retail", bio: "Started Smart Electronics with a vision to bring genuine products and trusted service to Chikkamagaluru." },
  { name: "Priya Sharma", role: "Store Manager", experience: "10+ years in customer service", bio: "Ensures every customer gets personalized attention and the best possible shopping experience." },
  { name: "Amit Patel", role: "Head Technician", experience: "12+ years in device repair", bio: "Leads our authorized service center with expertise in smartphones, laptops, and all modern electronics." },
  { name: "Sneha Reddy", role: "Sales & Support Lead", experience: "8+ years in electronics sales", bio: "Helps customers find the perfect product and provides ongoing support after purchase." },
]

export default function AboutPage() {
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
              About Smart Electronics
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              {businessInfo.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white mb-4">
              Our Mission & Vision
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="border-slate-200 dark:border-graphite-700">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-graphite-900 dark:text-white mb-2">Mission</h3>
                  <p className="text-slate-600 dark:text-slate-400">{businessInfo.mission}</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 dark:border-graphite-700">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-whatsapp-100 dark:bg-whatsapp-900/30 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-whatsapp-600 dark:text-whatsapp-400" />
                  </div>
                  <h3 className="text-xl font-bold text-graphite-900 dark:text-white mb-2">Vision</h3>
                  <p className="text-slate-600 dark:text-slate-400">{businessInfo.vision}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-slate-50 dark:bg-graphite-800/50"
              >
                <milestone.icon className="h-10 w-10 text-primary-600 dark:text-primary-400 mx-auto mb-3" aria-hidden="true" />
                <div className="text-3xl sm:text-4xl font-bold text-graphite-900 dark:text-white">{milestone.number}</div>
                <div className="text-slate-600 dark:text-slate-400 mt-1">{milestone.label}</div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-graphite-900 dark:text-white text-center mb-10">
            Our Core Values
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <Card className="h-full border-slate-200 dark:border-graphite-700">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-semibold text-graphite-900 dark:text-white mb-2">{value.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{value.desc}</p>
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
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The passionate professionals dedicated to serving you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <Card className="h-full border-slate-200 dark:border-graphite-700 text-center">
                  <CardContent className="p-6">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-whatsapp-500 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-lg font-bold text-graphite-900 dark:text-white">{member.name}</h4>
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-1">{member.role}</p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mb-3">{member.experience}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white text-center mb-10">
              Why Choose Smart Electronics?
            </h2>
            
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "Authorized Retailer", desc: "Official partner for all major brands. Every product comes with valid manufacturer warranty." },
                { icon: CheckCircle, title: "Genuine Products Only", desc: "Zero tolerance for counterfeits. Direct sourcing from brand distributors ensures authenticity." },
                { icon: Award, title: "Expert Technical Support", desc: "Certified technicians for repairs, installations, and troubleshooting across all product categories." },
                { icon: Truck, title: "Free City Delivery", desc: "Complimentary delivery within Chikkamagaluru on orders above ₹1,999. Secure packaging guaranteed." },
                { icon: MessageSquare, title: "24/7 WhatsApp Support", desc: "Instant responses to queries, order updates, and service requests via WhatsApp." },
                { icon: MapPin, title: "Physical Store Presence", desc: "Visit our Chikkamagaluru showroom to experience products hands-on before buying." },
              ].map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-graphite-800 border border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-graphite-900 dark:text-white">{reason.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{reason.desc}</p>
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
              Experience the Smart Electronics Difference
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Visit our store, chat on WhatsApp, or give us a call. We're here to help you find the perfect electronics.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
                <Link href="/contact">Visit Our Store</Link>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4" asChild>
                <a href={getWhatsAppLink("91XXXXXXXXXX")} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}