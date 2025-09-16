"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"
import Image from "next/image"

export function CartSheet() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-sm font-medium leading-none hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
