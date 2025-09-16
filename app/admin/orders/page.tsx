import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export default async function AdminOrders() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/orders")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      profiles(full_name, email),
      order_items(
        quantity,
        price,
        products(name)
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-600">Manage customer orders</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {orders?.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <CardDescription>
                      {order.profiles?.full_name} • {order.profiles?.email}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "shipped"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {order.status}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Order Date</h4>
                    <p>{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Total Amount</h4>
                    <p className="text-lg font-semibold text-emerald-600">₦{order.total_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Items</h4>
                    <p>{order.order_items?.length || 0} items</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-sm text-gray-500 mb-2">Products</h4>
                  <div className="space-y-1">
                    {order.order_items?.map((item, index) => (
                      <p key={index} className="text-sm">
                        {item.quantity}x {item.products?.name} - ₦{item.price.toLocaleString()}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
