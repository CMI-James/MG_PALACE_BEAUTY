import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import type { Product } from "@/lib/supabase/queries";

interface ProductListItemProps {
  product: Product;
}

export function ProductListItem({ product }: ProductListItemProps) {
  const hasDiscount =
    product.compare_price && product.compare_price > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compare_price! - product.price) / product.compare_price!) *
          100
      )
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Link href={`/products/${product.slug}`}>
              <img
                src={
                  product.images?.[0] ||
                  "/placeholder.svg?height=300&width=300&query=beauty product"
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            {hasDiscount && (
              <Badge className="absolute top-1 left-1 bg-destructive text-destructive-foreground text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {product.is_featured && (
              <Badge className="absolute top-1 right-1 bg-secondary text-secondary-foreground text-xs">
                Featured
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.short_description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">
                  ₦{product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₦{product.compare_price?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <AddToCartButton product={product} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
