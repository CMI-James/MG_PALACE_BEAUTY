"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, User, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
  })

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        redirect("/auth/login")
        return
      }

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      setUser({ ...user, profile })

      if (profile) {
        setFormData({
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          phone: profile.phone || "",
          date_of_birth: profile.date_of_birth || "",
          address: profile.address || "",
          city: profile.city || "",
          state: profile.state || "",
          postal_code: profile.postal_code || "",
        })
      }

      setLoading(false)
    }

    getUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
      })

      if (error) throw error

      if (formData.address && formData.city && formData.state) {
        const { error: addressError } = await supabase.from("addresses").upsert({
          user_id: user.id,
          type: "shipping",
          first_name: formData.first_name,
          last_name: formData.last_name,
          address_line_1: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code || "",
          country: "Nigeria",
          is_default: true,
        })

        if (addressError) {
          console.error("Address update error:", addressError)
          toast.error("Profile updated but address failed to save")
        } else {
          toast.success("Profile and address updated successfully!")
        }
      } else {
        toast.success("Profile updated successfully!")
      }
    } catch (error) {
      toast.error("Failed to update profile")
      console.error("Error updating profile:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Account
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and address details</p>
          </div>

          <div className="space-y-6">
            {/* Personal Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed. Contact support if you need to update it.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Address Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Required for service bookings and delivery purposes
                    </p>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Enter your full street address"
                          rows={2}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            placeholder="Enter your state"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input
                            id="postal_code"
                            value={formData.postal_code}
                            onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary/90">
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
