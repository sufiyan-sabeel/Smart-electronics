"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingBag, MessageSquare, Tag, Heart, Eye } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/data"
import { formatPrice, getWhatsAppLink, getWhatsAppMessage } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false

  const whatsappUrl = getWhatsAppLink(
    "91XXXXXXXXXX",
    getWhatsAppMessage(product.name)
  )

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <Card className="group h-full flex flex-col border-slate-200 dark:border-graphite-700 hover:border-primary-300 dark:hover:border-primary-700 overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-graphite-800">
          <Link href={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </Link>
          
          {discountPercent > 0 && (
            <Badge variant="accent" className="absolute top-3 left-3 z-10">
              -{discountPercent}%
            </Badge>
          )}
          
          {product.badge && (
            <Badge variant="primary" className="absolute top-3 right-3 z-10">
              {product.badge}
            </Badge>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 text-graphite-900 hover:bg-white h-10 w-10"
                asChild
              >
                <Link href={`/products/${product.id}`} aria-label={`View ${product.name} details`}>
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                variant="whatsapp"
                size="icon"
                className="h-10 w-10"
                asChild
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inquire about ${product.name} on WhatsApp`}
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 text-graphite-900 hover:bg-white h-10 w-10"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              {product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 flex-shrink-0">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-slate-500 dark:text-slate-400">({product.reviewCount})</span>
              </div>
            )}
          </div>

          <Link href={`/products/${product.id}`} className="group">
            <h3 className="font-semibold text-graphite-900 dark:text-white line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 flex-1">
            {product.shortDescription}
          </p>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-graphite-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 border-t border-slate-100 dark:border-graphite-700">
          <Button
            variant="whatsapp"
            className="w-full"
            asChild
            size="sm"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inquire about ${product.name} on WhatsApp`}
            >
              <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
              Inquire on WhatsApp
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function ProductSkeleton() {
  return (
    <Card className="h-full border-slate-200 dark:border-graphite-700">
      <div className="aspect-square bg-slate-200 dark:bg-graphite-700 animate-pulse" />
      <CardContent className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-3/4" />
        <div className="h-6 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-full" />
        <div className="h-4 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-2/3" />
        <div className="h-8 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-1/3" />
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-slate-100 dark:border-graphite-700">
        <div className="h-10 bg-slate-200 dark:bg-graphite-700 rounded animate-pulse w-full" />
      </CardFooter>
    </Card>
  )
}