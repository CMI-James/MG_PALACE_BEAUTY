"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Check, X, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  confirmAppointment,
  cancelAppointment,
  completeAppointment,
  rescheduleAppointment,
} from "@/app/admin/appointments/actions";

interface AppointmentActionsProps {
  appointment: {
    id: string;
    status: string;
    appointment_date: string;
    appointment_time: string;
    customer_name?: string;
    customer_email?: string;
    services?: {
      name?: string;
    };
  };
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function AppointmentActions({ appointment }: AppointmentActionsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");

  const handleConfirm = async () => {
    setLoading("confirm");
    try {
      await confirmAppointment(appointment.id);
      toast.success("Appointment confirmed successfully!");
    } catch (error) {
      toast.error("Failed to confirm appointment");
    } finally {
      setLoading(null);
    }
  };

  const handleCancel = async () => {
    setLoading("cancel");
    try {
      await cancelAppointment(appointment.id);
      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel appointment");
    } finally {
      setLoading(null);
    }
  };

  const handleComplete = async () => {
    setLoading("complete");
    try {
      await completeAppointment(appointment.id);
      toast.success("Appointment marked as completed!");
    } catch (error) {
      toast.error("Failed to complete appointment");
    } finally {
      setLoading(null);
    }
  };

  const handleReschedule = async () => {
    if (!newDate || !newTime) {
      toast.error("Please select both date and time");
      return;
    }

    setLoading("reschedule");
    try {
      await rescheduleAppointment(
        appointment.id,
        format(newDate, "yyyy-MM-dd"),
        newTime
      );
      toast.success("Appointment rescheduled successfully!");
      setRescheduleOpen(false);
      setNewDate(undefined);
      setNewTime("");
    } catch (error) {
      toast.error("Failed to reschedule appointment");
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-primary text-primary-foreground";
      case "pending":
        return "bg-secondary text-secondary-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge
          className={cn(
            "px-3 py-1 text-sm font-medium",
            getStatusColor(appointment.status)
          )}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </Badge>
        <span className="text-xs text-muted-foreground">
          ID: {appointment.id.slice(0, 8)}
        </span>
      </div>

      <div className="flex gap-2">
        {appointment.status === "pending" && (
          <>
            <Button
              size="sm"
              onClick={handleConfirm}
              disabled={loading !== null}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading === "confirm" ? (
                "Confirming..."
              ) : (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Confirm
                </>
              )}
            </Button>

            <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reschedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reschedule Appointment</DialogTitle>
                  <DialogDescription>
                    Reschedule {appointment.services?.name} for{" "}
                    {appointment.customer_name}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newDate ? format(newDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newDate}
                          onSelect={setNewDate}
                          disabled={date =>
                            date < new Date() || date.getDay() === 0
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => (
                        <Button
                          key={time}
                          type="button"
                          variant={newTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setNewTime(time)}
                          className="text-sm"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setRescheduleOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReschedule}
                    disabled={loading === "reschedule"}
                  >
                    {loading === "reschedule"
                      ? "Rescheduling..."
                      : "Reschedule"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {appointment.status === "confirmed" && (
          <Button
            size="sm"
            onClick={handleComplete}
            disabled={loading !== null}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {loading === "complete" ? (
              "Completing..."
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Mark Complete
              </>
            )}
          </Button>
        )}

        {(appointment.status === "pending" ||
          appointment.status === "confirmed") && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={loading !== null}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive bg-transparent"
          >
            {loading === "cancel" ? (
              "Cancelling..."
            ) : (
              <>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
