"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { notFound } from "next/navigation"

interface EditBannerPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditBannerPage({ params }: EditBannerPageProps) {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [bannerId, setBannerId] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    discount_percentage: "",
    discount_code: "",
    background_color: "#3b82f6",
    text_color: "#ffffff",
    link_url: "",
    link_text: "",
    start_date: "",
    end_date: "",
    priority: "1",
    is_active: true,
  })

  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    async function loadBanner() {
      const resolvedParams = await params
      setBannerId(resolvedParams.id)

      const { data: banner, error } = await supabase
        .from("promotional_banners")
        .select("*")
        .eq("id", resolvedParams.id)
        .single()

      if (error || !banner) {
        notFound()
        return
      }

      setFormData({
        title: banner.title || "",
        message: banner.message || "",
        discount_percentage: banner.discount_percentage?.toString() || "",
        discount_code: banner.discount_code || "",
        background_color: banner.background_color || "#3b82f6",
        text_color: banner.text_color || "#ffffff",
        link_url: banner.link_url || "",
        link_text: banner.link_text || "",
        start_date: banner.start_date || "",
        end_date: banner.end_date || "",
        priority: banner.priority?.toString() || "1",
        is_active: banner.is_active || false,
      })

      setInitialLoading(false)
    }

    loadBanner()
  }, [params, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from("promotional_banners")
        .update({
          title: formData.title,
          message: formData.message,
          discount_percentage: formData.discount_percentage ? Number.parseInt(formData.discount_percentage) : null,
          discount_code: formData.discount_code || null,
          background_color: formData.background_color,
          text_color: formData.text_color,
          link_url: formData.link_url || null,
          link_text: formData.link_text || null,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          priority: Number.parseInt(formData.priority),
          is_active: formData.is_active,
        })
        .eq("id", bannerId)

      if (error) throw error

      toast.success("Banner updated successfully!")
      router.push("/admin/banners")
    } catch (error) {
      console.error("Error updating banner:", error)
      toast.error("Failed to update banner")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading banner...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/banners">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Banners
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Banner</h1>
              <p className="mt-2 text-gray-600">Update banner settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Banner Content</CardTitle>
                  <CardDescription>Configure the banner text and messaging</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Banner title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Banner message"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Discount Settings</CardTitle>
                  <CardDescription>Optional discount configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount_percentage">Discount Percentage</Label>
                    <Input
                      id="discount_percentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount_percentage}
                      onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                      placeholder="e.g., 20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount_code">Discount Code</Label>
                    <Input
                      id="discount_code"
                      value={formData.discount_code}
                      onChange={(e) => setFormData({ ...formData, discount_code: e.target.value })}
                      placeholder="e.g., SAVE20"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the banner colors and styling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="background_color">Background Color</Label>
                    <Input
                      id="background_color"
                      type="color"
                      value={formData.background_color}
                      onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text_color">Text Color</Label>
                    <Input
                      id="text_color"
                      type="color"
                      value={formData.text_color}
                      onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div
                      className="px-4 py-3 text-center text-sm font-medium rounded-lg"
                      style={{
                        backgroundColor: formData.background_color,
                        color: formData.text_color,
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold">{formData.title || "Banner Title"}</span>
                        <span>{formData.message || "Banner message"}</span>
                        {formData.discount_code && (
                          <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-xs font-mono">
                            Code: {formData.discount_code}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Link & Schedule</CardTitle>
                  <CardDescription>Optional link and scheduling settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="link_url">Link URL</Label>
                    <Input
                      id="link_url"
                      type="url"
                      value={formData.link_url}
                      onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link_text">Link Text</Label>
                    <Input
                      id="link_text"
                      value={formData.link_text}
                      onChange={(e) => setFormData({ ...formData, link_text: e.target.value })}
                      placeholder="Shop Now"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date</Label>
                      <Input
                        id="end_date"
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Banner"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/banners">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
