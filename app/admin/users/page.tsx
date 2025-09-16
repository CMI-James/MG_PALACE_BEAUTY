import { createServerClient, createServiceClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Calendar } from "lucide-react"

export default async function AdminUsers() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/users")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  // Use service-role client for admin data access (bypass RLS)
  const service = createServiceClient()
  const { data: profiles } = await service.from("profiles").select("*").order("created_at", { ascending: false })

  const { data: authUsers } = await service.auth.admin.listUsers()

  console.log("[v0] Admin Users Debug:")
  console.log("[v0] Total profiles found:", profiles?.length || 0)
  console.log("[v0] Profiles data:", profiles)
  console.log("[v0] Auth users count:", authUsers.users?.length || 0)
  console.log(
    "[v0] Auth users:",
    authUsers.users?.map((u) => ({ id: u.id, email: u.email, created_at: u.created_at })),
  )

  const users =
    profiles?.map((profile) => {
      const authUser = authUsers.users?.find((au) => au.id === profile.id)
      return {
        ...profile,
        email: authUser?.email || "No email",
        full_name:
          profile.first_name && profile.last_name
            ? `${profile.first_name} ${profile.last_name}`
            : profile.first_name || profile.last_name || "No Name",
      }
    }) || []

  console.log("[v0] Combined users data:", users)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 text-gray-600">Manage user accounts and profiles • {users.length} total users</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((userProfile) => (
                <tr key={userProfile.id} className="hover:bg-muted/20">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={userProfile.avatar_url || ""} />
                        <AvatarFallback>
                          {userProfile.full_name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{userProfile.full_name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={userProfile.is_admin ? "default" : "secondary"}>
                      {userProfile.is_admin ? "admin" : "user"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {userProfile.phone ? (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{userProfile.phone}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(userProfile.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No users found</h3>
              <p className="text-sm text-muted-foreground">Users will appear here once they register accounts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
