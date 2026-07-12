"use client"

import { motion } from "framer-motion"
import { Store, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const galleryImages = [
  {
    src: "/grid.svg",
    alt: "Smart Electronics store front in Chikkamagaluru",
    label: "Store Front",
  },
  {
    src: "/window.svg",
    alt: "Product display section at Smart Electronics showroom",
    label: "Product Display",
  },
  {
    src: "/file.svg",
    alt: "Customer service counter at Smart Electronics",
    label: "Service Counter",
  },
  {
    src: "/globe.svg",
    alt: "Smart Electronics branded product wall",
    label: "Brand Wall",
  },
  {
    src: "/next.svg",
    alt: "Repair and service center at Smart Electronics",
    label: "Service Center",
  },
  {
    src: "/vercel.svg",
    alt: "Smart Electronics accessories and gadgets section",
    label: "Accessories Section",
  },
]

export function StoreGallery() {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const nextImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Store
          </span>
          <h2 id="gallery-heading" className="section-title">Visit Our Showroom</h2>
          <p className="section-subtitle">
            Step into Smart Electronics — Chikkamagaluru&apos;s premier destination for premium electronics.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((image, index) => (
            <motion.button
              key={image.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.08,
              }}
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-graphite-800 border border-slate-200 dark:border-graphite-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label={`View ${image.label}`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="h-12 w-12 text-slate-300 dark:text-slate-600" aria-hidden="true" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 block truncate">
                  {image.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100 dark:border-primary-800/30 text-center"
        >
          <Store className="h-8 w-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-graphite-900 dark:text-white mb-2">
            Come Visit Us Today
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-sm">
            Experience our products hands-on at our Chikkamagaluru showroom. 
            Our team is ready to help you find the perfect device.
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${galleryImages[activeIndex].label}`}
        >
          <div
            className="relative max-w-3xl w-full aspect-video bg-slate-200 dark:bg-graphite-700 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-20 w-20 text-slate-400" aria-hidden="true" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-medium">{galleryImages[activeIndex].label}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>

            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-all"
              aria-label="Close gallery"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === activeIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
