"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  quantity: number
}

interface InventoryAdjustmentFormProps {
  products: Product[]
}

export function InventoryAdjustmentForm({ products }: InventoryAdjustmentFormProps) {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [newQuantity, setNewQuantity] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProductData = products.find((p) => p.id === selectedProduct)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct || !newQuantity) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/admin/adjust-inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct,
          newQuantity: Number.parseInt(newQuantity),
          reason: reason || "Manual adjustment",
        }),
      })

      if (response.ok) {
        toast.success("Inventory adjusted successfully")
        setSelectedProduct("")
        setNewQuantity("")
        setReason("")
        // Refresh the page to show updated data
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to adjust inventory")
      }
    } catch (error) {
      toast.error("Failed to adjust inventory")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Inventory Adjustment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} (Current: {product.quantity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProductData && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Current Stock:</strong> {selectedProductData.quantity}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="quantity">New Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Enter new quantity"
              required
            />
          </div>

          <div>
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for adjustment"
              rows={2}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !selectedProduct || !newQuantity} className="w-full">
            {isSubmitting ? "Adjusting..." : "Adjust Inventory"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
