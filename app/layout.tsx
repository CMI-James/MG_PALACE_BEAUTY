import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "sonner"
import { PromotionalBanner } from "@/components/layout/promotional-banner"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MG Beauty Palace - Professional Beauty Tools & Services",
  description:
    "Premium microblading tools, lash extensions, and professional beauty services in Nigeria. Elevate your beauty craft with MG Beauty Palace.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable} ${playfairDisplay.variable}`}>
        <PromotionalBanner />
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
