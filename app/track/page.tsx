"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Package, Truck, MapPin, CheckCircle } from "lucide-react"

interface ShippingUpdate {
  id: string
  status: string
  message: string
  location: string
  created_at: string
}

interface TrackingData {
  order_id: string
  tracking_number: string
  shipping_status: string
  shipped_at: string
  delivered_at: string
  shipping_updates: ShippingUpdate[]
}

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("tracking") || "")
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Auto-track if tracking number is in URL
  useEffect(() => {
    const urlTracking = searchParams.get("tracking")
    if (urlTracking && urlTracking !== trackingNumber) {
      setTrackingNumber(urlTracking)
      handleTrackWithNumber(urlTracking)
    }
  }, [searchParams])

  const handleTrackWithNumber = async (number: string) => {
    if (!number.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/track-order?tracking=${number}`)
      const data = await response.json()

      if (response.ok) {
        setTrackingData(data)
      } else {
        setError(data.error || "Order not found")
        setTrackingData(null)
      }
    } catch (err) {
      setError("Failed to track order. Please try again.")
      setTrackingData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleTrackWithNumber(trackingNumber)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-500" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Track Your Order
            </h1>
            <p className="text-muted-foreground">Enter your tracking number to see the current status of your order</p>
          </div>

          {/* Tracking Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Tracking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrack} className="space-y-4">
                <div>
                  <Label htmlFor="tracking">Tracking Number</Label>
                  <Input
                    id="tracking"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter your tracking number"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <Search className="h-4 w-4 mr-2" />
                  {isLoading ? "Tracking..." : "Track Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200">
              <CardContent className="p-4">
                <p className="text-red-600 text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(trackingData.shipping_status)}
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Order #{trackingData.order_id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">Tracking: {trackingData.tracking_number}</p>
                    </div>
                    <Badge className={getStatusColor(trackingData.shipping_status)}>
                      {trackingData.shipping_status.charAt(0).toUpperCase() + trackingData.shipping_status.slice(1)}
                    </Badge>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ["processing", "shipped", "delivered"].includes(trackingData.shipping_status)
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Order Confirmed</p>
                          <p className="text-sm text-muted-foreground">Your order has been received</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ["shipped", "delivered"].includes(trackingData.shipping_status)
                              ? "bg-green-100 text-green-600"
                              : trackingData.shipping_status === "processing"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Processing</p>
                          <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            trackingData.shipping_status === "delivered"
                              ? "bg-green-100 text-green-600"
                              : trackingData.shipping_status === "shipped"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <Truck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Shipped</p>
                          <p className="text-sm text-muted-foreground">Your order is on the way</p>
                        </div>
                      </div>
                      {trackingData.shipped_at && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(trackingData.shipped_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            trackingData.shipping_status === "delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Delivered</p>
                          <p className="text-sm text-muted-foreground">Your order has been delivered</p>
                        </div>
                      </div>
                      {trackingData.delivered_at && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(trackingData.delivered_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Updates */}
              {trackingData.shipping_updates && trackingData.shipping_updates.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.shipping_updates.map((update, index) => (
                        <div key={update.id}>
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(update.status)}
                              <div className="flex-1">
                                <p className="font-medium capitalize">{update.status}</p>
                                {update.message && <p className="text-sm text-muted-foreground">{update.message}</p>}
                                {update.location && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {update.location}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  {new Date(update.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          {index < trackingData.shipping_updates.length - 1 && <Separator className="my-4" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
