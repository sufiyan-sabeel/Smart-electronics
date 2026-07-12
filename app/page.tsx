"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, MessageSquare, CheckSquare, Square } from "lucide-react"
import { Hero } from "@/components/home/Hero"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { ProductCard } from "@/components/home/ProductCard"
import { BrandGrid } from "@/components/home/BrandGrid"
import { OffersSection } from "@/components/home/OffersSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { StoreGallery } from "@/components/home/StoreGallery"
import { ContactSection } from "@/components/home/ContactSection"
import { FAQSection } from "@/components/home/FAQSection"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useComparison, ComparisonPanel } from "@/components/ComparisonPanel"
import { businessInfo, getWhatsAppLink } from "@/lib/business-info"

export default function HomePage() {
  const comparison = useComparison()
  const featuredProducts = products.slice(0, 4)
  const whatsappUrl = getWhatsAppLink(
    businessInfo.whatsapp,
    "Hello! I'd like to know more about your products."
  )

  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <Hero />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="featured-heading">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-center sm:text-left"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider mb-4">
                Bestsellers
              </span>
              <h2 id="featured-heading" className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked selection of our best-selling and latest arrivals</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => comparison.setIsOpen(!comparison.isOpen)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
                  comparison.isOpen
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                }`}
              >
                {comparison.isOpen ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                {comparison.isOpen ? "Done" : "Compare"}
                {comparison.selected.length > 0 && (
                  <span className="ml-1 text-xs bg-primary-500 text-white px-1.5 py-0.5 rounded-full">
                    {comparison.selected.length}/2
                  </span>
                )}
              </button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative">
                {comparison.isOpen && (
                  <button
                    onClick={() => comparison.toggleProduct(product)}
                    className={`absolute top-3 left-3 z-20 p-1.5 rounded-lg transition-all ${
                      comparison.isSelected(product.id)
                        ? "bg-primary-500 text-white shadow-lg"
                        : "bg-white/90 text-slate-400 hover:text-primary-600 dark:bg-graphite-800/90"
                    }`}
                    aria-label={comparison.isSelected(product.id) ? "Remove from comparison" : "Add to comparison"}
                  >
                    <CheckSquare className="h-4 w-4" />
                  </button>
                )}
                <ProductCard product={product} priority />
              </div>
            ))}
          </div>

          <ComparisonPanel
            products={comparison.selected}
            isOpen={comparison.selected.length === 2}
            onClose={comparison.clearAll}
          />
        </div>
      </section>

      <OffersSection />
      <BrandGrid />
      <WhyChooseUs />
      <ServicesSection />
      <StoreGallery />
      <ContactSection />
      <FAQSection />

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 relative overflow-hidden" aria-labelledby="cta-heading">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          >
            <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Upgrade Your Tech?
            </h2>
            <p className="text-primary-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Visit our store in Chikkamagaluru, chat on WhatsApp, or browse our catalog online.
              We&apos;re here to help you find the perfect device.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 shadow-lg" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4 shadow-lg shadow-whatsapp-500/20" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 h-5 w-5" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
