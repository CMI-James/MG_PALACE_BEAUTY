import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track Order | MG Beauty Palace",
  description: "Track your beauty product orders and shipments. Get real-time updates on your delivery status with MG Beauty Palace.",
  keywords: ["track order", "order tracking", "shipping status", "delivery tracking", "beauty products", "order status"],
  openGraph: {
    title: "Track Order | MG Beauty Palace",
    description: "Track your beauty product orders and shipments. Get real-time updates on your delivery status with MG Beauty Palace.",
    type: "website",
  },
}

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
