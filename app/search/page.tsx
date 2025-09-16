"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/products/product-card"
import { ServiceCard } from "@/components/services/service-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient()

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
    loadCategories()
  }, [query])

  const loadCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name")

    setCategories(data || [])
  }

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return

    setLoading(true)

    try {
      // Search products
      let productQuery = supabase
        .from("products")
        .select("*, categories(name)")
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq("is_active", true)

      if (selectedCategory) {
        productQuery = productQuery.eq("category_id", selectedCategory)
      }

      const { data: productResults } = await productQuery

      // Search services
      const { data: serviceResults } = await supabase
        .from("services")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq("is_active", true)

      setProducts(productResults || [])
      setServices(serviceResults || [])
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>

          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search products and services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === "" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory("")
                if (searchQuery) performSearch(searchQuery)
              }}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(category.id)
                  if (searchQuery) performSearch(searchQuery)
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your search.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="services">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No services found matching your search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
