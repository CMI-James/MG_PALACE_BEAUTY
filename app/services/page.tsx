import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ServiceCard } from "@/components/services/service-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getServices, getCategories } from "@/lib/supabase/queries"
import Link from "next/link"
import { Filter, Calendar } from "lucide-react"

interface ServicesPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

function ServiceSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

async function ServicesGrid({ category }: { category?: string }) {
  const services = await getServices({ category })

  if (services.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No services found</p>
        <Button asChild variant="outline">
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  )
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams
  const categories = await getCategories()
  const selectedCategory = categories.find((cat) => cat.slug === params.category)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {selectedCategory ? selectedCategory.name : "Beauty Services"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {selectedCategory
              ? selectedCategory.description
              : "Professional beauty treatments and training courses by certified experts"}
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/booking">
              <Calendar className="h-5 w-5 mr-2" />
              Book Consultation
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Service Categories
              </h3>
              <div className="space-y-2">
                <Link href="/services">
                  <Badge
                    variant={!params.category ? "default" : "outline"}
                    className="w-full justify-start cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  >
                    All Services
                  </Badge>
                </Link>
                {categories.map((category) => (
                  <Link key={category.id} href={`/services?category=${category.slug}`}>
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

          {/* Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)}>
                <ServicesGrid category={params.category} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
