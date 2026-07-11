"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { faqs } from "@/lib/data"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"

export function FAQSection() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-graphite-800/50" aria-labelledby="faq-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Quick answers to common questions. Can't find what you're looking for? Contact us directly.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.05 }}
              >
                <AccordionItem value={faq.id.toString()}>
                  <AccordionTrigger className="text-left py-4 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0">
                    {faq.question}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200 data-[state=open]:rotate-180" aria-hidden="true" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400">
            Still have questions? 
            <a href="/contact" className="text-primary-600 dark:text-primary-400 font-medium hover:underline ml-1">
              Contact us directly
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}