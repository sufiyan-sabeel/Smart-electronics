"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Star, MessageSquare, Heart, Eye, Zap, Sparkles } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/data"
import { formatPrice, getWhatsAppLink, getWhatsAppMessage, getAssetUrl } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const whatsappUrl = getWhatsAppLink(
    "91XXXXXXXXXX",
    getWhatsAppMessage(product.name)
  )

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Mouse position for tilt effect (feature 2)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : { perspective: 1000, rotateX, rotateY }}
    >
      <Card className={cn(
        "group h-full flex flex-col border-slate-200 dark:border-graphite-700 overflow-hidden",
        "transition-all duration-300 relative",
        isHovered 
          ? "border-primary-300 dark:border-primary-700 shadow-xl -translate-y-1" 
          : "hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:-translate-y-1"
      )}>
        {/* Shine sweep overlay (feature 2) */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[inherit]"
          initial={false}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-y-[-12deg]"
            animate={isHovered ? { left: ["-100%", "200%"] } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-graphite-800 dark:to-graphite-900">
          <Link href={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={getAssetUrl(product.image)}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                loading={priority ? "eager" : "lazy"}
              />
            </motion.div>
          </Link>
          
          {/* Animated badge entries (feature 4) */}
          {discountPercent > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
              className="absolute top-3 left-3 z-10"
            >
              <Badge variant="accent" className="shadow-lg">
                <Zap className="h-3 w-3 mr-1" /> -{discountPercent}%
              </Badge>
            </motion.div>
          )}
          
          {product.badge && (
            <motion.div
              initial={{ scale: 0, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
              className="absolute top-3 right-3 z-10"
            >
              <Badge variant="primary" className="shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" /> {product.badge}
              </Badge>
            </motion.div>
          )}

          {/* Hover overlay with actions */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-hidden="true"
          >
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              <Button
                size="icon"
                className="bg-white/95 text-graphite-900 hover:bg-white shadow-lg hover:shadow-xl h-10 w-10 rounded-xl backdrop-blur active:scale-90 transition-transform"
                asChild
              >
                <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
                  <Eye className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="whatsapp"
                size="icon"
                className="h-10 w-10 rounded-xl shadow-lg active:scale-90 transition-transform"
                asChild
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inquire on WhatsApp about ${product.name}`}
                >
                  <MessageSquare className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                className="bg-white/95 text-graphite-900 hover:bg-white hover:text-red-500 shadow-lg hover:shadow-xl h-10 w-10 rounded-xl backdrop-blur active:scale-90 transition-transform"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              {product.brand}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="font-semibold text-graphite-700 dark:text-slate-300">{product.rating}</span>
                <span className="text-slate-400 dark:text-slate-500">({product.reviewCount})</span>
              </div>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-graphite-900 dark:text-white line-clamp-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-1.5 text-base">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-bold text-graphite-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                Save {discountPercent}%
              </span>
            )}
          </div>
        </CardContent>

        {/* WhatsApp inquiry button */}
        <CardFooter className="p-5 pt-0">
          <Button
            variant="whatsapp"
            className="w-full rounded-xl shadow-sm active:scale-[0.97] transition-transform"
            asChild
            size="sm"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Inquire on WhatsApp
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return prefersReducedMotion
}

export function ProductSkeleton() {
  return (
    <Card className="h-full border-slate-200 dark:border-graphite-700">
      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-graphite-700 dark:to-graphite-800 animate-pulse" />
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse" />
          <div className="h-3 w-12 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse" />
        </div>
        <div className="h-5 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-full" />
        <div className="h-4 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-2/3" />
        <div className="h-7 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-1/3" />
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <div className="h-9 bg-slate-200 dark:bg-graphite-700 rounded-xl animate-pulse w-full" />
      </CardFooter>
    </Card>
  )
}
