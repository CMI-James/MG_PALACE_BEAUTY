import { createServerClient, createServiceClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Mail, DollarSign } from "lucide-react"
import { AppointmentActions } from "@/components/admin/appointment-actions"

export default async function AdminAppointments() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/appointments")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

  if (!profile?.is_admin) {
    redirect("/")
  }

  const service = createServiceClient()
  const { data: appointments } = await service
    .from("appointments")
    .select(`
      *,
      services(name, duration, price)
    `)
    .order("appointment_date", { ascending: true })

  console.log("[v0] Fetched appointments:", appointments?.length || 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="mt-2 text-gray-600">
              Manage and track all service appointments • {appointments?.length || 0} total appointments
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Service</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {(appointments || []).map((appointment: any) => (
                <tr key={appointment.id} className="hover:bg-muted/20">
                  <td className="py-3 px-4 font-medium">{appointment.services?.name}</td>
                  <td className="py-3 px-4">{appointment.customer_name}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.customer_email}</span>
                      </div>
                      {appointment.customer_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.customer_phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {appointment.appointment_time} ({appointment.duration || appointment.services?.duration} mins)
                  </td>
                  <td className="py-3 px-4">
                    ₦{(appointment.total_amount ?? appointment.services?.price)?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        appointment.status === "confirmed"
                          ? "default"
                          : appointment.status === "completed"
                          ? "outline"
                          : appointment.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <AppointmentActions appointment={appointment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!appointments || appointments.length === 0) && (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No appointments found</h3>
              <p className="text-sm text-muted-foreground">New appointments will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
