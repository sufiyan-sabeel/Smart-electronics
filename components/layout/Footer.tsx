"use client"

import Link from "next/link"
import { ShoppingBag, MapPin, Phone, Mail, MessageSquare, Clock, Facebook, Instagram, Twitter, Youtube, ArrowRight, ShieldCheck } from "lucide-react"
import { businessInfo, formatPhoneNumber } from "@/lib/business-info"
import { navLinks } from "@/components/Navigation"

export function Footer() {
  const footerLinks = {
    shop: [
      { label: "All Products", href: "/products" },
      { label: "Smartphones", href: "/products?category=smartphones" },
      { label: "Laptops", href: "/products?category=laptops" },
      { label: "Smart Watches", href: "/products?category=smart-watches" },
      { label: "Audio & Earbuds", href: "/products?category=earbuds" },
      { label: "Accessories", href: "/products?category=accessories" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Mobile Repair", href: "/services#mobile-repair" },
      { label: "Laptop Repair", href: "/services#laptop-repair" },
      { label: "Warranty Support", href: "/services#warranty-support" },
      { label: "Exchange Offers", href: "/offers#exchange-offers" },
      { label: "Track Repair", href: "/services" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Brands", href: "/brands" },
      { label: "Current Offers", href: "/offers" },
      { label: "Our Services", href: "/services" },
      { label: "Store Locator", href: "/contact#visit-store" },
      { label: "Careers", href: "/careers" },
    ],
    policies: [
      { label: "Privacy Policy", href: "/contact" },
      { label: "Terms of Service", href: "/contact" },
      { label: "Return Policy", href: "/services" },
      { label: "Warranty Policy", href: "/services#warranty-support" },
      { label: "Shipping Info", href: "/contact" },
      { label: "GST Details", href: "/about" },
    ],
  }

  return (
    <footer className="bg-graphite-900 text-slate-300" role="contentinfo" aria-labelledby="footer-heading">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-white mb-6" aria-label={`${businessInfo.name} - Home`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 text-white">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{businessInfo.name}</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-xs leading-relaxed">
              {businessInfo.description}
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic text-slate-400 text-sm">
                  {businessInfo.address}
                </address>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${businessInfo.phone.replace(/\D/g, '')}`} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {formatPhoneNumber(businessInfo.phone)}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${businessInfo.email}`} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {businessInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-whatsapp-500 text-white hover:bg-whatsapp-600 transition-colors" aria-label="Chat on WhatsApp">
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={businessInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <nav aria-label="Shop links">
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <nav aria-label="Support links">
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <nav aria-label="Company links">
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Policies</h3>
            <nav aria-label="Policy links">
              <ul className="space-y-3">
                {footerLinks.policies.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-graphite-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary-400" aria-hidden="true" />
                <span>Authorized Retailer</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-whatsapp-400" aria-hidden="true" />
                <span>Mon-Sat: 10AM-8PM | Sun: 11AM-6PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-400" aria-hidden="true" />
                <span>Chikkamagaluru, Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}