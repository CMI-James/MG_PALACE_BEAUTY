import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react";

export default async function AdminAnalytics() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin/analytics");
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

  // Fetch analytics data
  const [
    { data: totalRevenue },
    { data: monthlyRevenue },
    { data: topProducts },
    { data: recentOrders },
    { count: totalUsers },
    { count: totalOrders },
    { count: totalAppointments },
  ] = await Promise.all([
    supabase.from("orders").select("total_amount").eq("status", "completed"),
    supabase
      .from("orders")
      .select("total_amount, created_at")
      .eq("status", "completed")
      .gte(
        "created_at",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      ),
    supabase.from("order_items").select("quantity, products(name)").limit(5),
    supabase
      .from("orders")
      .select("total_amount, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("appointments").select("*", { count: "exact", head: true }),
  ]);

  const totalRevenueAmount =
    totalRevenue?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const monthlyRevenueAmount =
    monthlyRevenue?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          Business insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{totalRevenueAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{monthlyRevenueAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders || 0}</div>
            <p className="text-xs text-muted-foreground">All orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
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
              {recentOrders?.slice(0, 5).map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ₦{order.total_amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Summary</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Appointments</span>
                <Badge variant="outline">{totalAppointments || 0}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Order Value</span>
                <Badge variant="outline">
                  ₦
                  {totalOrders
                    ? Math.round(
                        totalRevenueAmount / totalOrders
                      ).toLocaleString()
                    : 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Revenue per User</span>
                <Badge variant="outline">
                  ₦
                  {totalUsers
                    ? Math.round(
                        totalRevenueAmount / totalUsers
                      ).toLocaleString()
                    : 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
