import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit } from "lucide-react"
import Link from "next/link"
import { BannerToggleButton } from "@/components/admin/banner-toggle-button"
import { DeleteBannerButton } from "@/components/admin/delete-banner-button"

export default async function AdminBanners() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/banners")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const { data: banners } = await supabase
    .from("promotional_banners")
    .select("*")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Promotional Banners</h1>
              <p className="mt-2 text-gray-600">Manage promotional banners and announcements</p>
            </div>
            <Button asChild>
              <Link href="/admin/banners/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Banner
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {banners?.map((banner) => (
            <Card key={banner.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{banner.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{banner.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={banner.is_active ? "default" : "secondary"}>
                      {banner.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">Priority: {banner.priority}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Discount</h4>
                    <p>{banner.discount_percentage ? `${banner.discount_percentage}%` : "No discount"}</p>
                    {banner.discount_code && (
                      <p className="text-sm text-muted-foreground font-mono">Code: {banner.discount_code}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Duration</h4>
                    <p className="text-sm">
                      {banner.start_date ? new Date(banner.start_date).toLocaleDateString() : "No start date"}
                      {" - "}
                      {banner.end_date ? new Date(banner.end_date).toLocaleDateString() : "No end date"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Link</h4>
                    <p className="text-sm">
                      {banner.link_url ? (
                        <Link href={banner.link_url} className="text-primary hover:underline">
                          {banner.link_text || "View"}
                        </Link>
                      ) : (
                        "No link"
                      )}
                    </p>
                  </div>
                </div>

                {/* Banner Preview */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Preview</h4>
                  <div
                    className="px-4 py-3 text-center text-sm font-medium rounded-lg"
                    style={{
                      backgroundColor: banner.background_color,
                      color: banner.text_color,
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold">{banner.title}</span>
                      <span>{banner.message}</span>
                      {banner.discount_code && (
                        <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs font-mono">
                          Code: {banner.discount_code}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/banners/${banner.id}/edit`}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <BannerToggleButton bannerId={banner.id} isActive={banner.is_active} />
                  <DeleteBannerButton bannerId={banner.id} bannerTitle={banner.title} />
                </div>
              </CardContent>
            </Card>
          ))}

          {(!banners || banners.length === 0) && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">No promotional banners found</p>
                <Button asChild>
                  <Link href="/admin/banners/new">Create your first banner</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
