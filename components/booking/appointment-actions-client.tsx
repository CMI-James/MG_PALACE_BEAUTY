"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarCmp } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  cancelUserAppointment,
  rescheduleUserAppointment,
} from "@/app/account/appointments/actions";
import { cn } from "@/lib/utils";

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

export function AccountAppointmentActions({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [loading, setLoading] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date>();
  const [newTime, setNewTime] = useState("");

  const onCancel = async () => {
    setLoading("cancel");
    try {
      await cancelUserAppointment(appointmentId);
      toast.success("Appointment cancelled");
    } catch (e) {
      toast.error("Failed to cancel appointment");
    } finally {
      setLoading(null);
    }
  };

  const onReschedule = async () => {
    if (!newDate || !newTime) {
      toast.error("Select date and time");
      return;
    }
    setLoading("reschedule");
    try {
      await rescheduleUserAppointment(
        appointmentId,
        format(newDate, "yyyy-MM-dd"),
        newTime
      );
      toast.success("Appointment rescheduled");
      setOpen(false);
      setNewDate(undefined);
      setNewTime("");
    } catch (e) {
      toast.error("Failed to reschedule appointment");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-2 pt-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            Reschedule
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule appointment</DialogTitle>
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
                  <CalendarCmp
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    disabled={date => date < new Date() || date.getDay() === 0}
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={onReschedule} disabled={loading === "reschedule"}>
              {loading === "reschedule" ? "Rescheduling..." : "Reschedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        size="sm"
        variant="outline"
        onClick={onCancel}
        disabled={loading === "cancel"}
        className="text-red-600 hover:text-red-700 bg-transparent"
      >
        {loading === "cancel" ? "Cancelling..." : "Cancel"}
      </Button>
    </div>
  );
}
