"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Hero"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { ProductCard } from "@/components/home/ProductCard"
import { BrandGrid } from "@/components/home/BrandGrid"
import { OffersSection } from "@/components/home/OffersSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { FAQSection } from "@/components/home/FAQSection"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)

  return (
    <>
      <Hero />
      <Features />
      <CategoryGrid />
      
      <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="featured-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center sm:text-left"
            >
              <h2 id="featured-heading" className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked selection of our best-selling and latest arrivals</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Button variant="outline" asChild>
                <Link href="/products">View All Products <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>

      <BrandGrid />

      <OffersSection />

      <ServicesSection />

      <TestimonialsSection />

      <FAQSection />

      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-blue-700 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`}} aria-hidden="true" />
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Visit our store, chat on WhatsApp, or browse online. We're here to help you find the perfect device.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4" asChild>
                <Link href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}