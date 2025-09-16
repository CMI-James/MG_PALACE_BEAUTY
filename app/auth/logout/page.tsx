"use client"

import { useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function signOut() {
      const supabase = createClient()

      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error("Error signing out")
        console.error("Error signing out:", error)
      } else {
        toast.success("Signed out successfully")
      }

      router.push("/")
    }

    signOut()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Signing you out...</p>
      </div>
    </div>
  )
}
