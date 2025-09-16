import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCurrentUser, getUserOrders } from "@/lib/supabase/auth"
import { Package, ArrowLeft, Truck, Eye } from "lucide-react"
import Link from "next/link"

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const orders = await getUserOrders(user.id)

  const getShippingStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Order History</h1>
          <p className="text-muted-foreground">View and track all your orders</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button asChild>
                <Link href="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      {order.tracking_number && (
                        <div className="flex items-center gap-2 mt-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-mono">{order.tracking_number}</span>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/track?tracking=${order.tracking_number}`}>
                              <Eye className="h-3 w-3 mr-1" />
                              Track
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-lg">₦{order.total_amount.toLocaleString()}</p>
                      <div className="flex flex-col gap-1">
                        <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                        {order.shipping_status && (
                          <Badge className={getShippingStatusColor(order.shipping_status)}>
                            {order.shipping_status.charAt(0).toUpperCase() + order.shipping_status.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={item.product?.image_url || "/placeholder.svg"}
                            alt={item.products?.name || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.products?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₦{(order.total_amount - (order.shipping_amount || 0)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span>₦{(order.shipping_amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₦{order.total_amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    {order.tracking_number && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/track?tracking=${order.tracking_number}`}>
                          <Truck className="h-3 w-3 mr-1" />
                          Track Package
                        </Link>
                      </Button>
                    )}
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/account/orders/${order.id}/review`}>Leave Review</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}
