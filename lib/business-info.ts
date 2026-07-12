export const businessInfo = {
  name: "Smart Electronics",
  tagline: "Premium Electronics. Trusted Service. Best Deals.",
  phone: "+91 XXXXX XXXXX",
  whatsapp: "+91XXXXXXXXXX",
  email: "contact@example.com",
  address: "Smart Electronics, Main Road, Chikkamagaluru, Karnataka 577101",
  googleMapsUrl: "https://maps.google.com/?q=Smart+Electronics+Chikkamagaluru+Karnataka",
  openingHours: {
    weekdays: "Mon-Sat: 10:00 AM - 8:00 PM",
    saturday: "Sat: 10:00 AM - 8:00 PM",
    sunday: "Sun: 11:00 AM - 6:00 PM",
  },
  social: {
    facebook: "https://facebook.com/smartelectronics",
    instagram: "https://instagram.com/smartelectronics",
    twitter: "https://twitter.com/smartelectronics",
    youtube: "https://youtube.com/@smartelectronics",
  },
  gstNumber: "29XXXXXXXXXX1ZX",
  established: "2020",
  description: "Smart Electronics is Chikkamagaluru's premier destination for premium electronics. Established in 2020, we've been serving our community with the latest smartphones, laptops, accessories, and professional repair services. Our commitment to quality products, transparent pricing, and exceptional customer service has made us the trusted choice for thousands of satisfied customers.",
  mission: "To provide genuine electronics at competitive prices with unmatched after-sales support.",
  vision: "To become Karnataka's most trusted electronics retailer through innovation, integrity, and customer delight.",
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

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "")
  const baseUrl = `https://wa.me/${cleaned.startsWith("91") ? cleaned : "91" + cleaned}`
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
}

export function getCallLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  return `tel:${cleaned.startsWith("91") ? "+" + cleaned : "+91" + cleaned}`
}

export const siteConfig = {
  name: businessInfo.name,
  description: "Smart Electronics - Chikkamagaluru's trusted electronics store for smartphones, laptops, accessories, and repair services. Authorized retailer with genuine products and warranty.",
  url: "https://smartelectronics.demo",
  ogImage: "/og-image.svg",
  keywords: [
    "electronics store",
    "smartphones",
    "laptops",
    "accessories",
    "mobile repair",
    "laptop repair",
    "Chikkamagaluru",
    "Karnataka",
    "authorized retailer",
    "genuine products",
  ],
  authors: [{ name: "Smart Electronics" }],
  creator: "Smart Electronics",
  publisher: "Smart Electronics",
  robots: "index, follow",
}