import { Suspense } from "react";
import { ProductsView } from "@/components/products/products-view";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProducts, getCategories } from "@/lib/supabase/queries";
import Link from "next/link";
import { Filter } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

async function ProductsContent({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const products = await getProducts({ category, search });
  return <ProductsView products={products} />;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  const selectedCategory = categories.find(cat => cat.slug === params.category);

  return (
    <div className="min-h-screen">
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
              <div className="space-y-4">
                <Link href="/products" className="block ">
                  <Badge
                    variant={!params.category ? "default" : "outline"}
                    className="w-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm py-2 px-3"
                  >
                    All Products
                  </Badge>
                </Link>
                {categories.map(category => (
                  <Link
                    key={category.id}
                    href={`/products?category=${category.slug}`}
                    className="block mb-4"
                  >
                    <Badge
                      variant={
                        params.category === category.slug
                          ? "default"
                          : "outline"
                      }
                      className="w-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground text-sm py-2 px-3"
                    >
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Products View */}
          <div className="flex-1">
            <Suspense
              fallback={<ProductsView products={[]} isLoading={true} />}
            >
              <ProductsContent
                category={params.category}
                search={params.search}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
