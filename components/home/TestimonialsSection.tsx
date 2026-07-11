"use client"

import { motion } from "framer-motion"
import { Star, Quote, Shield, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/data"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

export function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
    >
      <Card className="h-full border-slate-200 dark:border-graphite-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </div>
          
          <Quote className="h-8 w-8 text-primary-200 dark:text-primary-800 mb-4" aria-hidden="true" />
          
          <p className="text-slate-600 dark:text-slate-300 mb-6 italic">"{testimonial.text}"</p>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-graphite-900 dark:text-white">{testimonial.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
            </div>
            {testimonial.verified && (
              <div className="ml-auto flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="testimonials-heading" className="section-title">Customer Stories</h2>
          <p className="section-subtitle">Real experiences from our valued customers across Karnataka</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400">
            <Shield className="inline h-5 w-5 mr-1" aria-hidden="true" />
            All reviews are from verified customers who purchased from our store
          </p>
        </motion.div>
      </div>
    </section>
  )
}