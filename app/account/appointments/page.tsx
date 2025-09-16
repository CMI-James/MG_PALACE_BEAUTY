import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { AccountAppointmentActions } from "@/components/booking/appointment-actions-client"

export default async function UserAppointments() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/account/appointments")
  }

  const { data: appointments } = await supabase
    .from("appointments")
    .select(`
      *,
      services(name, duration, price)
    `)
    .eq("user_id", user.id)
    .order("appointment_date", { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="mt-2 text-gray-600">Manage your service appointments</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appointments && appointments.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Notes</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium">{appointment.services?.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.appointment_time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{appointment.services?.duration} mins</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-emerald-600">
                        ₦{appointment.services?.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          appointment.status === "confirmed"
                            ? "default"
                            : appointment.status === "pending"
                              ? "secondary"
                              : appointment.status === "completed"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {appointment.notes ? (
                        <span className="text-sm text-muted-foreground max-w-xs truncate block">
                          {appointment.notes}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <AccountAppointmentActions appointmentId={appointment.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-6">Book your first service appointment to get started.</p>
            <Button asChild>
              <a href="/services">Browse Services</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
