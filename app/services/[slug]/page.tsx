import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getServiceBySlug, getServices } from "@/lib/supabase/queries"
import { AppointmentForm } from "@/components/booking/appointment-form"
import { Clock, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import { ServiceCard } from "@/components/services/service-card"

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  // Get related services from the same category
  const relatedServices = await getServices({
    category: service.category.slug,
    limit: 3,
  }).then((services) => services.filter((s) => s.id !== service.id))

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0 && mins > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${mins} minute${mins > 1 ? "s" : ""}`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`
    } else {
      return `${mins} minute${mins > 1 ? "s" : ""}`
    }
  }

  const serviceFeatures = [
    "Professional certified technician",
    "High-quality products and tools",
    "Consultation included",
    "Aftercare instructions provided",
    "Follow-up support available",
  ]

  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/services">Services</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/services?category=${service.category.slug}`}>{service.category.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{service.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Service Images */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border">
              <img
                src={service.images?.[0] || "/placeholder.svg?height=480&width=640&query=beauty service"}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            {service.images && service.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {service.images.slice(1, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg border cursor-pointer hover:opacity-80"
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${service.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Service Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-serif text-2xl font-bold mb-4">Service Details</h2>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Info & Booking */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{service.category.name}</Badge>
                {service.is_bookable && <Badge className="bg-primary text-primary-foreground">Available</Badge>}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>

              <div className="flex items-center gap-6 mb-4">
                <span className="font-bold text-3xl text-primary">₦{service.price.toLocaleString()}</span>
                {service.duration && (
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{formatDuration(service.duration)}</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">{service.short_description}</p>
            </div>

            {/* Service Features */}
            <div>
              <h3 className="font-semibold mb-3">What's Included:</h3>
              <ul className="space-y-2">
                {serviceFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rating Display */}
            <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">(127 reviews)</span>
            </div>

            {/* Appointment Booking Form */}
            {service.is_bookable ? (
              <AppointmentForm
                service={{
                  id: service.id,
                  name: service.name,
                  duration: service.duration || 60,
                  price: service.price,
                }}
              />
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">This service is currently unavailable for booking.</p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact Us for Availability</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold">Related Services</h2>
              <Button asChild variant="outline">
                <Link href={`/services?category=${service.category.slug}`}>View All in {service.category.name}</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <ServiceCard key={relatedService.id} service={relatedService} />
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  )
}
