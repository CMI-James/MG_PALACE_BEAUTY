"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/cart-store"
import { Plus, Minus, X, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()

  const totalPrice = getTotalPrice()
  const shippingCost = totalPrice >= 50000 ? 0 : 2500
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 space-y-2">
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.sku && <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>}
                        <p className="font-medium">₦{item.price.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₦${shippingCost.toLocaleString()}`}</span>
                </div>
                {totalPrice < 50000 && (
                  <p className="text-sm text-muted-foreground">
                    Add ₦{(50000 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{finalTotal.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/products">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span>Free shipping over ₦50,000</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span>30-day return policy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
