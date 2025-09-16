"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface ShippingStatusUpdaterProps {
  orderId: string
  currentStatus: string
  trackingNumber?: string
}

export function ShippingStatusUpdater({ orderId, currentStatus, trackingNumber }: ShippingStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [tracking, setTracking] = useState(trackingNumber || "")
  const [message, setMessage] = useState("")
  const [location, setLocation] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateShipping = async () => {
    setIsUpdating(true)

    try {
      const response = await fetch("/api/admin/update-shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status,
          trackingNumber: tracking,
          message,
          location,
        }),
      })

      if (response.ok) {
        toast.success("Shipping status updated successfully")
        setMessage("")
        setLocation("")
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update shipping status")
      }
    } catch (error) {
      toast.error("Failed to update shipping status")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Shipping Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tracking">Tracking Number</Label>
          <Input
            id="tracking"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
            placeholder="Enter tracking number"
          />
        </div>

        <div>
          <Label htmlFor="status">Shipping Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Location (Optional)</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Lagos Distribution Center"
          />
        </div>

        <div>
          <Label htmlFor="message">Update Message (Optional)</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Additional information about this update"
            rows={3}
          />
        </div>

        <Button onClick={handleUpdateShipping} disabled={isUpdating} className="w-full">
          {isUpdating ? "Updating..." : "Update Shipping Status"}
        </Button>
      </CardContent>
    </Card>
  )
}
