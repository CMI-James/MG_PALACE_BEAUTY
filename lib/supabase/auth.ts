import { createClient } from "@/lib/supabase/server"

export async function getCurrentUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return {
    ...user,
    profile,
  }
}

export async function getUserOrders(userId: string) {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        product:products (
          name,
          images,
          slug
        )
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return orders
}

export async function getUserAddresses(userId: string) {
  const supabase = await createClient()

  const { data: addresses, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })

  if (error) {
    console.error("Error fetching addresses:", error)
    return []
  }

  return addresses
}

export async function getUserAppointments(userId: string) {
  const supabase = await createClient()

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(`
      *,
      service:services (
        name,
        images,
        slug,
        duration
      )
    `)
    .eq("user_id", userId)
    .order("appointment_date", { ascending: false })

  if (error) {
    console.error("Error fetching appointments:", error)
    return []
  }

  return appointments
}
