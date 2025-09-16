"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCartStore } from "@/lib/cart-store"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("paystack")

  // Redirect if cart is empty
  if (items.length === 0) {
    redirect("/cart")
  }

  const subtotal = getTotalPrice()
  const shippingCost = subtotal >= 50000 ? 0 : 2500
  const total = subtotal + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      // In a real app, redirect to success page
      alert("Order placed successfully! (This is a demo)")
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue="Nigeria" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="paystack" id="paystack" />
                      <Label htmlFor="paystack" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Paystack</p>
                            <p className="text-sm text-muted-foreground">Pay with card, bank transfer, or USSD</p>
                          </div>
                          <CreditCard className="h-5 w-5" />
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                      <RadioGroupItem value="bank" id="bank" disabled />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">Direct bank transfer (Coming soon)</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `₦${shippingCost.toLocaleString()}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Place Order Button */}
              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? "Processing..." : `Place Order - ₦${total.toLocaleString()}`}
              </Button>

              {/* Security Features */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Truck className="h-4 w-4 text-green-500" />
                    <span>Fast and secure delivery</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CreditCard className="h-4 w-4 text-green-500" />
                    <span>Secure payment processing</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
