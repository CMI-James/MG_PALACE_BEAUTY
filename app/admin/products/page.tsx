import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DeleteProductButton } from "@/components/admin/delete-product-button"

export default async function AdminProducts() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/products")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="mt-2 text-gray-600">Manage your product catalog</p>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id}>
              <CardHeader className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                      {product.quantity > 0 ? `${product.quantity} in stock` : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">₦{product.price.toLocaleString()}</span>
                    <Badge variant="outline">{product.categories?.name}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
