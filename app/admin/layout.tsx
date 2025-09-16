import type React from "react"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" />
              <span className="">MG Beauty Palace</span>
            </Link>
          </div>
          <div className="flex-1">
            <AdminNav />
          </div>
          <div className="mt-auto p-4">
            <form action="/auth/signout" method="post">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
