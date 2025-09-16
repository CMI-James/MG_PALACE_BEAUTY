import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/supabase/auth";
import { createServerClient } from "@/lib/supabase/server";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const supabase = createServerClient();

  // Get order details with shipping updates
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items(
        *,
        products(name, image_url, slug)
      ),
      shipping_updates(
        id,
        status,
        message,
        location,
        created_at
      )
    `
    )
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error || !order) {
    notFound();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-orange-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/account/orders"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.shipping_status || "pending")}
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Badge
                      className={getStatusColor(
                        order.shipping_status || "pending"
                      )}
                    >
                      {(order.shipping_status || "pending")
                        .charAt(0)
                        .toUpperCase() +
                        (order.shipping_status || "pending").slice(1)}
                    </Badge>
                    {order.tracking_number && (
                      <p className="text-sm text-muted-foreground mt-1 font-mono">
                        Tracking: {order.tracking_number}
                      </p>
                    )}
                  </div>
                  {order.tracking_number && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/track?tracking=${order.tracking_number}`}>
                        Track Package
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Progress Steps */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        ["processing", "shipped", "delivered"].includes(
                          order.shipping_status || ""
                        )
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">
                        Your order has been received
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        ["shipped", "delivered"].includes(
                          order.shipping_status || ""
                        )
                          ? "bg-green-100 text-green-600"
                          : order.shipping_status === "processing"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-muted-foreground">
                        Your order is being prepared
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.shipping_status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : order.shipping_status === "shipped"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Shipped</p>
                      <p className="text-sm text-muted-foreground">
                        Your order is on the way
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        order.shipping_status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-muted-foreground">
                        Your order has been delivered
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_items?.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <img
                          src={item.products?.image_url || "/placeholder.svg"}
                          alt={item.products?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.products?.slug}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.products?.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ₦
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Updates */}
            {order.shipping_updates && order.shipping_updates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.shipping_updates.map((update, index) => (
                      <div key={update.id}>
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(update.status)}
                            <div className="flex-1">
                              <p className="font-medium capitalize">
                                {update.status}
                              </p>
                              {update.message && (
                                <p className="text-sm text-muted-foreground">
                                  {update.message}
                                </p>
                              )}
                              {update.location && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {update.location}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {new Date(update.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        {index < order.shipping_updates.length - 1 && (
                          <Separator className="my-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    ₦
                    {(
                      order.total_amount - (order.shipping_amount || 0)
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦{(order.shipping_amount || 0).toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{order.total_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.tracking_number && (
                  <Button asChild className="w-full">
                    <Link href={`/track?tracking=${order.tracking_number}`}>
                      <Truck className="h-4 w-4 mr-2" />
                      Track Package
                    </Link>
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent"
                  >
                    <Link href={`/account/orders/${order.id}/review`}>
                      Leave Review
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  asChild
                  className="w-full bg-transparent"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
