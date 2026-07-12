"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Check, Loader2, AlertCircle } from "lucide-react"
import { businessInfo, formatPhoneNumber, getCallLink, getWhatsAppLink } from "@/lib/business-info"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

const contactMethods = [
  {
    icon: MessageSquare,
    title: "WhatsApp Chat",
    description: "Fastest response - usually within minutes",
    action: () => window.open(getWhatsAppLink(businessInfo.whatsapp, "Hello! I'd like to inquire about your products and services."), "_blank"),
    label: "Open WhatsApp",
    color: "bg-whatsapp-500 hover:bg-whatsapp-600",
    iconColor: "text-whatsapp-500",
    bgColor: "bg-whatsapp-100 dark:bg-whatsapp-900/30",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: `Available ${businessInfo.openingHours.weekdays}`,
    action: () => window.location.href = getCallLink(businessInfo.phone),
    label: "Call Now",
    color: "bg-primary-500 hover:bg-primary-600",
    iconColor: "text-primary-500",
    bgColor: "bg-primary-100 dark:bg-primary-900/30",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We respond within 24 hours",
    action: () => window.location.href = `mailto:${businessInfo.email}`,
    label: "Send Email",
    color: "bg-slate-500 hover:bg-slate-600",
    iconColor: "text-slate-500",
    bgColor: "bg-slate-100 dark:bg-slate-800",
  },
  {
    icon: MapPin,
    title: "Visit Our Store",
    description: `${businessInfo.openingHours.weekdays} | ${businessInfo.openingHours.sunday}`,
    action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(businessInfo.address)}`, "_blank"),
    label: "Get Directions",
    color: "bg-accent-500 hover:bg-accent-600",
    iconColor: "text-accent-500",
    bgColor: "bg-accent-100 dark:bg-accent-900/30",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp, 
        `Hello! My name is ${formData.name}. ${formData.message}\n\nContact: ${formData.phone}\nEmail: ${formData.email}`
      )
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours. You can also chat with us directly on WhatsApp.",
        action: {
          label: "Open WhatsApp",
          onClick: () => window.open(whatsappUrl, "_blank"),
        },
      })
      
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitStatus("success")
    } catch {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly via WhatsApp or phone.",
        variant: "destructive",
      })
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

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
              Get in Touch
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              We'd love to hear from you. Whether you have a question about products, 
              need a repair quote, or want to visit our store - we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-2xl font-bold text-graphite-900 dark:text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6 mb-10">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                      className="flex gap-4 p-5 rounded-2xl border border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                    >
                      <button
                        onClick={method.action}
                        className={cn("h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0", method.bgColor)}
                        aria-label={method.title}
                      >
                        <method.icon className={cn("h-6 w-6", method.iconColor)} aria-hidden="true" />
                      </button>
                      <div className="flex-1">
                        <h3 className="font-semibold text-graphite-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">{method.description}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={method.action}
                          className="text-xs"
                        >
                          {method.label}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-graphite-700 overflow-hidden">
                  <iframe
                    src={businessInfo.mapEmbedUrl}
                    width="100%"
                    height={300}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Smart Electronics Location on Google Maps"
                    aria-label="Smart Electronics store location on Google Maps"
                  />
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="border-slate-200 dark:border-graphite-700">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      Fill out the form and we'll get back to you within 24 hours
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your name"
                            required
                            aria-required="true"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            required
                            aria-required="true"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 XXXXX XXXXX"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="subject">Subject</Label>
                          <select
                            id="subject"
                            value={formData.subject}
                            onChange={e => setFormData({ ...formData, subject: e.target.value })}
                            className="input"
                            aria-label="Subject"
                            disabled={isSubmitting}
                          >
                            <option value="">Select a topic</option>
                            <option value="product-inquiry">Product Inquiry</option>
                            <option value="repair-service">Repair Service Booking</option>
                            <option value="warranty-support">Warranty Support</option>
                            <option value="bulk-order">Bulk/Corporate Order</option>
                            <option value="feedback">Feedback / Complaint</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          required
                          aria-required="true"
                          disabled={isSubmitting}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" aria-hidden="true" />
                            Send Message
                          </>
                        )}
                      </Button>

                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                        >
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" aria-hidden="true" />
                          <p className="text-green-800 dark:text-green-200 text-sm">
                            Thank you! Your message has been sent. We'll get back to you soon.
                          </p>
                        </motion.div>
                      )}

                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
                        >
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" aria-hidden="true" />
                          <p className="text-red-800 dark:text-red-200 text-sm">
                            Failed to send message. Please try again or contact us directly.
                          </p>
                        </motion.div>
                      )}

                      <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                        By submitting this form, you agree to our{' '}
                        <Link href="/privacy" className="underline hover:text-primary-600">Privacy Policy</Link>
                        {' '}and{' '}
                        <Link href="/terms" className="underline hover:text-primary-600">Terms of Service</Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-graphite-800/50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-graphite-900 dark:text-white text-center mb-10">
            Quick Links
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-slate-200 dark:border-graphite-700">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-graphite-900 dark:text-white mb-2">WhatsApp Support</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Instant replies for orders, repairs, and inquiries</p>
                <Button variant="whatsapp" asChild>
                  <a href={getWhatsAppLink(businessInfo.whatsapp)} target="_blank" rel="noopener noreferrer">
                    Chat Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-graphite-700">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-whatsapp-100 dark:bg-whatsapp-900/30 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-whatsapp-600 dark:text-whatsapp-400" />
                </div>
                <h3 className="font-semibold text-graphite-900 dark:text-white mb-2">Store Hours</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Mon - Sat: 10:00 AM - 8:00 PM<br />
                  Sun: 11:00 AM - 6:00 PM
                </p>
                <Button variant="outline" asChild>
                  <a href={businessInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-graphite-700">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="font-semibold text-graphite-900 dark:text-white mb-2">Visit Our Store</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {businessInfo.address}
                </p>
                <Button variant="outline" asChild>
                  <a href={businessInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    View on Maps
                  </a>
                </Button>
              </CardContent>
            </Card>
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
              Prefer to Talk Directly?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Call us or WhatsApp for immediate assistance. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4" asChild>
                <a href={getCallLink(businessInfo.phone)}>
                  <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                  Call Us: {formatPhoneNumber(businessInfo.phone)}
                </a>
              </Button>
              <Button size="lg" variant="whatsapp" className="px-8 py-4" asChild>
                <a href={getWhatsAppLink(businessInfo.whatsapp)} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-5 w-5 mr-2" aria-hidden="true" />
                  WhatsApp Chat
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}