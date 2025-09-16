import { createServerClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ShippingStatusUpdater } from "@/components/admin/shipping-status-updater";

export default async function AdminOrderDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin/orders");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Get order details
  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      user_profiles(full_name, email, phone),
      order_items(
        quantity,
        price,
        products(name, image_url)
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
    .single();

  if (error || !order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link
              href="/admin/orders"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="mt-2 text-gray-600">
              Order details and shipping management
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {order.user_profiles?.full_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.user_profiles?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {order.user_profiles?.phone || "Not provided"}
                  </p>
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
                  {order.order_items?.map((item: any, index: number) => (
                    <div
                      key={index}
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
                        <p className="font-medium">{item.products?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
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

            {/* Shipping Updates History */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping History</CardTitle>
              </CardHeader>
              <CardContent>
                {order.shipping_updates && order.shipping_updates.length > 0 ? (
                  <div className="space-y-4">
                    {order.shipping_updates.map((update: any) => (
                      <div
                        key={update.id}
                        className="border-l-2 border-primary pl-4"
                      >
                        <div className="flex items-center justify-between">
                          <Badge className="capitalize">{update.status}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(update.created_at).toLocaleString()}
                          </span>
                        </div>
                        {update.message && (
                          <p className="text-sm mt-1">{update.message}</p>
                        )}
                        {update.location && (
                          <p className="text-sm text-muted-foreground">
                            📍 {update.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No shipping updates yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Status:</span>
                  <Badge className="capitalize">
                    {order.shipping_status || "pending"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tracking Number:</span>
                  <span className="font-mono text-sm">
                    {order.tracking_number || "Not assigned"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>₦{order.total_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Management */}
            <ShippingStatusUpdater
              orderId={order.id}
              currentStatus={order.shipping_status || "pending"}
              trackingNumber={order.tracking_number}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
