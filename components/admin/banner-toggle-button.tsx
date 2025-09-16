"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface BannerToggleButtonProps {
  bannerId: string
  isActive: boolean
}

export function BannerToggleButton({ bannerId, isActive }: BannerToggleButtonProps) {
  const [isToggling, setIsToggling] = useState(false)

  const handleToggle = async () => {
    setIsToggling(true)

    try {
      const response = await fetch(`/api/admin/banners/${bannerId}/toggle`, {
        method: "PATCH",
      })

      if (response.ok) {
        toast.success(`Banner ${isActive ? "deactivated" : "activated"} successfully`)
        window.location.reload()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to toggle banner")
      }
    } catch (error) {
      toast.error("Failed to toggle banner")
    } finally {
      setIsToggling(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleToggle} disabled={isToggling}>
      {isActive ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
      {isToggling ? "..." : isActive ? "Deactivate" : "Activate"}
    </Button>
  )
}
