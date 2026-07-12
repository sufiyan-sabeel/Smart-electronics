"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, Phone, MessageSquare, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { businessInfo, getWhatsAppLink, getCallLink } from "@/lib/business-info"
import { categories } from "@/lib/data"

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/brands", label: "Brands" },
  { href: "/offers", label: "Offers" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  const whatsappUrl = getWhatsAppLink(businessInfo.whatsapp)
  const callUrl = getCallLink(businessInfo.phone)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm dark:bg-graphite-900/95 dark:border-graphite-700"
            : "bg-transparent"
        )}
        role="banner"
      >
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading font-bold text-xl text-graphite-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label={`${businessInfo.name} - Home`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 text-white">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="hidden sm:block">{businessInfo.name}</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-graphite-900 dark:text-slate-300 dark:hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary-600 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <a
                href={callUrl}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden lg:inline">Call Us</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-sm hidden sm:flex"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <Button variant="ghost" size="icon" className="relative" aria-label="Search products">
                <Search className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-graphite-800 transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="md:hidden overflow-hidden border-t border-slate-200 bg-white dark:border-graphite-700 dark:bg-graphite-900"
            >
              <div className="container-custom py-4 space-y-4">
                <div className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-graphite-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-graphite-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      Categories
                      <span className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link
                          href={`/products?category=${category.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex justify-between w-full"
                        >
                          {category.name}
                          <span className="text-xs text-slate-400">{category.count} products</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex flex-col gap-2 pt-4 border-t border-slate-200 dark:border-graphite-700">
                  <a
                    href={callUrl}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-secondary w-full justify-start"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-whatsapp w-full justify-start"
                  >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp Chat
                  </a>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16 md:h-16" aria-hidden="true" />
    </>
  )
}