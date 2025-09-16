import { createServerClient, createServiceClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, Calendar, ShoppingCart } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  // Use service client for admin data access (bypass RLS)
  const service = createServiceClient();

  // Fetch dashboard stats
  const [
    { count: totalProducts },
    { count: totalUsers },
    { count: totalOrders },
    { count: totalAppointments },
    { data: recentOrders },
    { data: recentAppointments },
  ] = await Promise.all([
    service.from("products").select("*", { count: "exact", head: true }),
    service.from("profiles").select("*", { count: "exact", head: true }),
    service.from("orders").select("*", { count: "exact", head: true }),
    service.from("appointments").select("*", { count: "exact", head: true }),
    service
      .from("orders")
      .select("*, profiles(first_name, last_name)")
      .order("created_at", { ascending: false })
      .limit(5),
    service
      .from("appointments")
      .select("*, services(name), profiles(first_name, last_name)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your MG Beauty Palace store
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAppointments || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders?.map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {order.profiles?.first_name && order.profiles?.last_name
                          ? `${order.profiles.first_name} ${order.profiles.last_name}`
                          : order.email || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Order #{order.id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₦{order.total_amount.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          order.status === "completed" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>Latest service bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments?.map(appointment => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {appointment.profiles?.first_name &&
                        appointment.profiles?.last_name
                          ? `${appointment.profiles.first_name} ${appointment.profiles.last_name}`
                          : appointment.customer_name || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.services?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        {new Date(
                          appointment.appointment_date
                        ).toLocaleDateString()}
                      </p>
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
