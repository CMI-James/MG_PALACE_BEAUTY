import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { InventoryAdjustmentForm } from "@/components/admin/inventory-adjustment-form";

export default async function AdminInventory() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin/inventory");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  const [
    { data: products },
    { data: lowStockProducts },
    { data: outOfStockProducts },
    { data: recentLogs },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*, categories(name)")
      .order("quantity", { ascending: true })
      .limit(20),
    supabase
      .from("products")
      .select("*, categories(name)")
      .lt("quantity", 10)
      .gt("quantity", 0)
      .order("quantity", { ascending: true }),
    supabase.from("products").select("*, categories(name)").eq("quantity", 0),
    supabase
      .from("inventory_logs")
      .select(
        `
          *,
          products(name),
          profiles(full_name)
        `
      )
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const totalProducts = products?.length || 0;
  const lowStockCount = lowStockProducts?.length || 0;
  const outOfStockCount = outOfStockProducts?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="mt-2 text-gray-600">
              Monitor and manage your product inventory
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {lowStockCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Less than 10 items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Out of Stock
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {outOfStockCount}
              </div>
              <p className="text-xs text-muted-foreground">0 items remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Changes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentLogs?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Last 10 changes</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Inventory List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Low Stock Alert */}
            {lowStockCount > 0 && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Low Stock Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockProducts?.slice(0, 5).map(product => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {product.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-yellow-700 border-yellow-300"
                        >
                          {product.quantity} left
                        </Badge>
                      </div>
                    ))}
                    {lowStockCount > 5 && (
                      <p className="text-sm text-yellow-700">
                        And {lowStockCount - 5} more products...
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Products */}
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products?.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.categories?.name}
                        </p>
                        <p className="text-sm font-medium">
                          ₦{product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge
                          variant={
                            product.quantity === 0
                              ? "destructive"
                              : product.quantity < 10
                                ? "secondary"
                                : "default"
                          }
                        >
                          {product.quantity} in stock
                        </Badge>
                        <div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/products/${product.id}/edit`}>
                              Adjust
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Inventory Adjustment */}
            <InventoryAdjustmentForm products={products || []} />

            {/* Recent Inventory Changes */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLogs?.map(log => (
                    <div
                      key={log.id}
                      className="border-l-2 border-primary pl-4"
                    >
                      <div className="flex items-center justify-between">
                        <Badge className="capitalize">{log.change_type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(log.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">
                        {log.products?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {log.quantity_change > 0 ? "+" : ""}
                        {log.quantity_change} ({log.previous_quantity} →{" "}
                        {log.new_quantity})
                      </p>
                      {log.reason && (
                        <p className="text-xs text-muted-foreground">
                          {log.reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
