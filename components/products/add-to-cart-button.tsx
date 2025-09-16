"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "sonner"
import type { Product } from "@/lib/supabase/queries"

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: "sm" | "default" | "lg"
  disabled?: boolean
}

export function AddToCartButton({ product, className, size = "default", disabled }: AddToCartButtonProps) {
  const { addItem, updateQuantity, items } = useCartStore()

  const cartItem = items.find((item) => item.id === product.id)
  const cartQuantity = cartItem?.quantity || 0

  const handleAddToCart = () => {
    if (product.quantity === 0) {
      toast.error("This product is out of stock")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      slug: product.slug,
      sku: product.sku || undefined,
    })

    toast.success(`${product.name} added to cart`)
  }

  const handleIncrement = () => {
    if (cartQuantity >= product.quantity) {
      toast.error("Cannot add more items than available in stock")
      return
    }
    updateQuantity(product.id, cartQuantity + 1)
  }

  const handleDecrement = () => {
    if (cartQuantity > 1) {
      updateQuantity(product.id, cartQuantity - 1)
    } else {
      updateQuantity(product.id, 0) // This will remove the item
    }
  }

  if (cartQuantity > 0) {
    return (
      <div className={`grid grid-cols-3 gap-1 w-full ${className}`}>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDecrement} 
          className="h-8 w-full p-0 bg-primary hover:bg-primary/90 text-primary-foreground border-primary rounded"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="min-w-[2rem] text-center font-medium text-sm flex items-center justify-center">{cartQuantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          disabled={cartQuantity >= product.quantity}
          className="h-8 w-full p-0 bg-primary hover:bg-primary/90 text-primary-foreground border-primary rounded disabled:opacity-50"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <div className={className}>
      <Button onClick={handleAddToCart} size={size} disabled={disabled || product.quantity === 0} className="w-full">
        <ShoppingCart className="h-4 w-4 mr-2" />
        {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  )
}
