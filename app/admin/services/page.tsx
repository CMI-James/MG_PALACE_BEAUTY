import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { DeleteServiceButton } from "@/components/admin/delete-service-button"

export default async function AdminServices() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/services")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const { data: services } = await supabase
    .from("services")
    .select("*, categories(name)")
    .order("created_at", { ascending: false })

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${mins}m`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="mt-2 text-gray-600">Manage your service offerings</p>
            </div>
            <Button asChild>
              <Link href="/admin/services/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id}>
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={service.images?.[0] || "/placeholder.svg?height=240&width=320&query=beauty service"}
                    alt={service.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={service.is_bookable ? "default" : "secondary"}>
                      {service.is_bookable ? "Bookable" : "Not Bookable"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg line-clamp-2">{service.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{service.short_description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">₦{service.price.toLocaleString()}</span>
                    <Badge variant="outline">{service.categories?.name}</Badge>
                  </div>
                  {service.duration && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDuration(service.duration)}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <Link href={`/admin/services/${service.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!services || services.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No services found</p>
            <Button asChild>
              <Link href="/admin/services/new">Create your first service</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
