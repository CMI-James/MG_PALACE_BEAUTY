import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServices, getCategories } from "@/lib/supabase/queries";
import Link from "next/link";
import { Calendar, Clock, MapPin, Phone, Mail, Star } from "lucide-react";

export const metadata = {
  title: "Book Appointment | MG Beauty Palace",
  description:
    "Book your beauty appointment with MG Beauty Palace. Professional microblading, lash extensions, facial treatments, and more.",
  keywords: [
    "book appointment",
    "beauty services",
    "microblading",
    "lash extensions",
    "facial treatments",
    "beauty booking",
  ],
};

async function ServicesList() {
  const services = await getServices();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      {/* Service Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Choose Your Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/services?category=${category.slug}`}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Available Services */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <Card
              key={service.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{service.duration} minutes</span>
                  </div>
                  <Badge variant="secondary">{service.category?.name}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    ₦{service.price.toLocaleString()}
                  </span>
                  <Button asChild size="sm">
                    <Link href={`/services/${service.slug}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Book Your Appointment
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule your beauty treatment with our certified professionals.
            Choose from our range of services and book your preferred time slot.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">
                +234 (0) 123 456 7890
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">
                info@mgbeautypalace.com
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Suspense
          fallback={
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="p-0">
                      <div className="aspect-[4/3] w-full bg-muted rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                      <div className="flex justify-between">
                        <div className="h-4 bg-muted rounded w-16" />
                        <div className="h-8 bg-muted rounded w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          }
        >
          <ServicesList />
        </Suspense>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Choose MG Beauty Palace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Professionals</h3>
              <p className="text-sm text-muted-foreground">
                Certified and experienced beauty specialists
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book appointments that fit your schedule
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Service</h3>
              <p className="text-sm text-muted-foreground">
                Premium products and professional techniques
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Convenient Location</h3>
              <p className="text-sm text-muted-foreground">
                Easy to find and accessible location
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
