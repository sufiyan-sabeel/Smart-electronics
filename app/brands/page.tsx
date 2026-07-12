"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { brands } from "@/lib/data"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { getAssetUrl } from "@/lib/utils"

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-graphite-900">
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary-50 to-white dark:from-graphite-900 dark:to-graphite-900 border-b border-slate-200 dark:border-graphite-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-graphite-900 dark:text-white mb-4">
              Our Brands
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Authorized retailer for the world's leading electronics brands. 
              Genuine products with official manufacturer warranty.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.03 }}
              >
                <Link
                  href={`/brands/${brand.id}`}
                  className="group block"
                  aria-label={`View ${brand.name} products - ${brand.productCount} products available`}
                >
                  <Card className="h-full border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors">
                    <CardContent className="p-6 h-full flex items-center justify-center">
                      <div className="relative w-full max-w-xs aspect-square flex items-center justify-center bg-slate-50 dark:bg-graphite-800 rounded-xl group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                        <Image
                          src={getAssetUrl(brand.logo)}
                          alt={`${brand.name} logo`}
                          width={120}
                          height={60}
                          className="object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                          sizes="80px"
                          loading="lazy"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 dark:bg-graphite-800/50">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-graphite-900 dark:text-white text-center mb-10">
            Featured Brand Collections
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {brands.slice(0, 6).map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
              >
                <Card className="group h-full border-slate-200 dark:border-graphite-700 overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-whatsapp-50 dark:from-primary-900/20 dark:to-whatsapp-900/20">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Image
                        src={getAssetUrl(brand.logo)}
                        alt={`${brand.name} logo`}
                        width={200}
                        height={100}
                        className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-graphite-900 dark:text-white">{brand.name}</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{brand.productCount} products</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Explore our complete range of {brand.name} smartphones, laptops, wearables, and accessories.
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/products?brand=${brand.id}`}>
                        View Products <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">View All Brands <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
            </Button>
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
              Don't See Your Favorite Brand?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              We carry products from many more brands. Contact us to check availability or place a special order.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4" asChild>
                <Link href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
                  WhatsApp Inquiry
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}