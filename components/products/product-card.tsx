import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import type { Product } from "@/lib/supabase/queries"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compare_price && product.compare_price > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=beauty product"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {hasDiscount && (
              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                -{discountPercentage}%
              </Badge>
            )}
            {product.is_featured && (
              <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">Featured</Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.short_description}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-lg">₦{product.price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ₦{product.compare_price?.toLocaleString()}
            </span>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} className="w-full" size="sm" />
      </CardFooter>
    </Card>
  )
}
