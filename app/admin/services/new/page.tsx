"use client"

import type React from "react"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect } from "react"

export default function NewServicePage() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    short_description: "",
    description: "",
    price: "",
    duration: "",
    category_id: "",
    is_bookable: true,
    is_active: true,
    images: [""],
  })

  const router = useRouter()
  const supabase = createBrowserClient()

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase.from("categories").select("*").order("name")
      setCategories(data || [])
    }
    loadCategories()
  }, [supabase])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("services").insert({
        name: formData.name,
        slug: formData.slug,
        short_description: formData.short_description,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        duration: formData.duration ? Number.parseInt(formData.duration) : null,
        category_id: formData.category_id,
        is_bookable: formData.is_bookable,
        is_active: formData.is_active,
        images: formData.images.filter((img) => img.trim() !== ""),
      })

      if (error) throw error

      toast.success("Service created successfully!")
      router.push("/admin/services")
    } catch (error) {
      console.error("Error creating service:", error)
      toast.error("Failed to create service")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
              <p className="mt-2 text-gray-600">Add a new service to your offerings</p>
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
                  <CardTitle>Service Information</CardTitle>
                  <CardDescription>Basic service details and description</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Service Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g., Professional Microblading"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="professional-microblading"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="short_description">Short Description *</Label>
                    <Textarea
                      id="short_description"
                      value={formData.short_description}
                      onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                      placeholder="Brief description for service cards"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed service description"
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>Service images (URLs)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image1">Primary Image URL</Label>
                    <Input
                      id="image1"
                      type="url"
                      value={formData.images[0]}
                      onChange={(e) => {
                        const newImages = [...formData.images]
                        newImages[0] = e.target.value
                        setFormData({ ...formData, images: newImages })
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Duration</CardTitle>
                  <CardDescription>Service pricing and time requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₦) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="0"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="120"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Settings</CardTitle>
                  <CardDescription>Availability and booking settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_bookable"
                      checked={formData.is_bookable}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_bookable: checked })}
                    />
                    <Label htmlFor="is_bookable">Allow Online Booking</Label>
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
              {loading ? "Creating..." : "Create Service"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/services">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
