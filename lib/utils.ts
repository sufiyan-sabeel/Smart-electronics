import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`
  }
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

export function getWhatsAppMessage(productName: string): string {
  return `Hello! I'm interested in ${productName}. Can you share the price and availability?`
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "")
  const baseUrl = `https://wa.me/${cleaned.startsWith("91") ? cleaned : "91" + cleaned}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export function getCallLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  return `tel:${cleaned.startsWith("91") ? "+" + cleaned : "+91" + cleaned}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const BASE_PATH = typeof process !== "undefined" ? (process.env.NEXT_PUBLIC_BASE_PATH || "") : ""

/**
 * Prepend the base path (e.g. /Smart-electronics) to asset URLs
 * so images/brand logos/avatars load correctly on GitHub Pages subpath.
 */
export function getAssetUrl(path: string): string {
  if (!path || !BASE_PATH) return path
  if (path.startsWith("/")) {
    return `${BASE_PATH}${path}`
  }
  return path
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}