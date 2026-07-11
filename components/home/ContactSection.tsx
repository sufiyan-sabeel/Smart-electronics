"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, MessageSquare, Map, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { businessInfo, getCallLink, getWhatsAppLink, formatPhoneNumber } from "@/lib/business-info"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { prefersReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp, 
      `Hello! My name is ${formData.name}. ${formData.message}\n\nContact: ${formData.phone}\nEmail: ${formData.email}`
    )
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you shortly. You can also chat with us directly on WhatsApp.",
      action: {
        label: "Open WhatsApp",
        onClick: () => window.open(whatsappUrl, "_blank"),
      },
    })
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: formatPhoneNumber(businessInfo.phone),
      description: businessInfo.openingHours.weekdays,
      action: () => window.location.href = getCallLink(businessInfo.phone),
      actionLabel: "Call Now",
      color: "text-primary-600 dark:text-primary-400",
      bgColor: "bg-primary-100 dark:bg-primary-900/30",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "Chat with us",
      description: "Instant replies within minutes",
      action: () => window.open(getWhatsAppLink(businessInfo.whatsapp), "_blank"),
      actionLabel: "Open Chat",
      color: "text-whatsapp-600 dark:text-whatsapp-400",
      bgColor: "bg-whatsapp-100 dark:bg-whatsapp-900/30",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: businessInfo.email,
      description: "Reply within 24 hours",
      action: () => window.location.href = `mailto:${businessInfo.email}`,
      actionLabel: "Send Email",
      color: "text-slate-600 dark:text-slate-400",
      bgColor: "bg-slate-100 dark:bg-slate-800",
    },
    {
      icon: MapPin,
      title: "Visit Store",
      value: businessInfo.address,
      description: businessInfo.openingHours.weekdays,
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(businessInfo.address)}`, "_blank"),
      actionLabel: "Get Directions",
      color: "text-accent-600 dark:text-accent-400",
      bgColor: "bg-accent-100 dark:bg-accent-900/30",
    },
  ]

  return (
    <section className="section-padding bg-white dark:bg-graphite-900" aria-labelledby="contact-heading">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="contact-heading" className="section-title">Get in Touch</h2>
          <p className="section-subtitle">We'd love to hear from you. Visit our store, call, WhatsApp, or send us a message.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-bold text-graphite-900 dark:text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl border border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0", method.bgColor)}>
                    <method.icon className="h-6 w-6" style={{ color: method.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-graphite-900 dark:text-white">{method.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{method.value}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{method.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={method.action}
                    className="mt-auto flex-shrink-0"
                  >
                    {method.actionLabel}
                  </Button>
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-slate-200 dark:border-graphite-700">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Fill out the form and we'll get back to you within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                        aria-required="true"
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
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject</Label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="input"
                        aria-label="Subject"
                      >
                        <option value="">Select a topic</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="repair-service">Repair Service</option>
                        <option value="warranty-support">Warranty Support</option>
                        <option value="bulk-order">Bulk/Corporate Order</option>
                        <option value="feedback">Feedback/Complaint</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      rows={4}
                      required
                      aria-required="true"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}