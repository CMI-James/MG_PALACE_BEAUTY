import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getCurrentUser, getUserOrders, getUserAppointments } from "@/lib/supabase/auth"
import { User, Package, Calendar, MapPin, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const orders = await getUserOrders(user.id)
  const appointments = await getUserAppointments(user.id)

  const recentOrders = orders.slice(0, 3)
  const upcomingAppointments = appointments.filter((apt) => new Date(apt.appointment_date) >= new Date()).slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.profile?.first_name || user.email}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/account" className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/account/profile"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Profile Settings
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Package className="h-4 w-4" />
                  Order History
                </Link>
                <Link
                  href="/account/appointments"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  Appointments
                </Link>
                <Link
                  href="/account/addresses"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  Addresses
                </Link>
                <Link
                  href="/auth/logout"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Account Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{appointments.length}</p>
                  <p className="text-sm text-muted-foreground">Appointments</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <User className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">Active</p>
                  <p className="text-sm text-muted-foreground">Account Status</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link href="/account/orders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                    <Button asChild className="mt-4">
                      <Link href="/products">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Order #{order.order_number}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{order.total_amount.toLocaleString()}</p>
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link href="/account/appointments">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming appointments</p>
                    <Button asChild className="mt-4">
                      <Link href="/services">Book a Service</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.service?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(appointment.appointment_date).toLocaleDateString()} at{" "}
                            {appointment.appointment_time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{appointment.total_amount.toLocaleString()}</p>
                          <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
