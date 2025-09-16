import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getProducts, getCategories } from "@/lib/supabase/queries"
import Link from "next/link"
import { Filter, Grid, List } from "lucide-react"

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
  }>
}

function ProductSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

async function ProductsGrid({ category, search }: { category?: string; search?: string }) {
  const products = await getProducts({ category, search })

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No products found</p>
        <Button asChild variant="outline">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const categories = await getCategories()
  const selectedCategory = categories.find((cat) => cat.slug === params.category)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {selectedCategory ? selectedCategory.name : "All Products"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {selectedCategory
              ? selectedCategory.description
              : "Discover our complete collection of professional beauty tools and products"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                <Link href="/products">
                  <Badge
                    variant={!params.category ? "default" : "outline"}
                    className="w-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    All Products
                  </Badge>
                </Link>
                {categories.map((category) => (
                  <Link key={category.id} href={`/products?category=${category.slug}`}>
                    <Badge
                      variant={params.category === category.slug ? "default" : "outline"}
                      className="w-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing products {selectedCategory ? `in ${selectedCategory.name}` : ""}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Suspense fallback={Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}>
                <ProductsGrid category={params.category} search={params.search} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
