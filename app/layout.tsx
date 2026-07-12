import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { AnnouncementBar } from "@/components/home/AnnouncementBar"
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp"
import { StickyMobileContact, STICKY_BAR_HEIGHT } from "@/components/StickyMobileContact"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { businessInfo, siteConfig } from "@/lib/business-info"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://smartelectronics.demo"),
  title: {
    default: `${businessInfo.name} - ${businessInfo.tagline}`,
    template: `%s | ${businessInfo.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  robots: siteConfig.robots,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: businessInfo.name,
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: businessInfo.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${businessInfo.name} - ${businessInfo.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@smartelectronics",
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}if(t==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})()` }} />
      </head>
      <body className={`min-h-full flex flex-col bg-white text-graphite-900 dark:bg-graphite-900 dark:text-slate-100 ${STICKY_BAR_HEIGHT}`}>
        <ThemeProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navigation />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <FloatingWhatsApp />
        <Quiz />
        <StickyMobileContact />
        <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: businessInfo.name,
              description: businessInfo.description,
              url: siteConfig.url,
              telephone: businessInfo.phone,
              email: businessInfo.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Main Road",
                addressLocality: "Chikkamagaluru",
                addressRegion: "Karnataka",
                postalCode: "577101",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.316,
                longitude: 75.777,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "10:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "11:00",
                  closes: "18:00",
                },
              ],
              priceRange: "₹₹",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
              areaServed: {
                "@type": "City",
                name: "Chikkamagaluru",
              },
              sameAs: Object.values(businessInfo.social),
            }),
          }}
        />
      </body>
    </html>
  )
}