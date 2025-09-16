"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

interface AppointmentFormProps {
  service: {
    id: string;
    name: string;
    duration: number;
    price: number;
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

export function AppointmentForm({ service }: AppointmentFormProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    state: "",
    postal_code: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const supabase = createBrowserClient();

  useEffect(() => {
    async function checkUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setUserProfile(profile);

        const { data: addresses } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", user.id)
          .eq("is_default", true)
          .single();

        if (!addresses) {
          setShowAddressForm(true);
        }
      }
    }

    checkUserProfile();
  }, [supabase]);

  useEffect(() => {
    async function checkAvailability() {
      if (!date) {
        setBookedSlots([]);
        return;
      }

      setCheckingAvailability(true);
      try {
        const { data: appointments } = await supabase
          .from("appointments")
          .select("appointment_time")
          .eq("appointment_date", format(date, "yyyy-MM-dd"))
          .in("status", ["confirmed", "pending"]); // Include both confirmed and pending appointments

        const bookedTimes =
          appointments?.map(apt => apt.appointment_time) || [];
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error("Error checking availability:", error);
      } finally {
        setCheckingAvailability(false);
      }
    }

    checkAvailability();
  }, [date, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    if (bookedSlots.includes(selectedTime)) {
      toast.error(
        "This time slot is no longer available. Please select another time."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in to book an appointment");
        return;
      }

      if (
        showAddressForm &&
        (!addressData.address || !addressData.city || !addressData.state)
      ) {
        toast.error("Please provide your complete address information");
        setLoading(false);
        return;
      }

      if (showAddressForm) {
        const { error: addressError } = await supabase
          .from("addresses")
          .upsert({
            user_id: user.id,
            type: "shipping",
            first_name: userProfile?.first_name || "",
            last_name: userProfile?.last_name || "",
            address_line_1: addressData.address,
            city: addressData.city,
            state: addressData.state,
            postal_code: addressData.postal_code || "",
            country: "Nigeria",
            is_default: true,
          });

        if (addressError) {
          console.error("Address creation error:", addressError);
          toast.error("Failed to save address information");
          setLoading(false);
          return;
        }
      }

      const { data: conflictCheck } = await supabase
        .from("appointments")
        .select("id")
        .eq("appointment_date", format(date, "yyyy-MM-dd"))
        .eq("appointment_time", selectedTime)
        .in("status", ["confirmed", "pending"]);

      if (conflictCheck && conflictCheck.length > 0) {
        toast.error(
          "This time slot was just booked by someone else. Please select another time."
        );
        setLoading(false);
        // Refresh availability
        const { data: appointments } = await supabase
          .from("appointments")
          .select("appointment_time")
          .eq("appointment_date", format(date, "yyyy-MM-dd"))
          .in("status", ["confirmed", "pending"]);

        const bookedTimes =
          appointments?.map(apt => apt.appointment_time) || [];
        setBookedSlots(bookedTimes);
        setSelectedTime("");
        return;
      }

      const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        service_id: service.id,
        appointment_date: format(date, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        duration: service.duration,
        notes: notes.trim() || null,
        status: "pending",
        customer_name:
          `${userProfile?.first_name || ""} ${userProfile?.last_name || ""}`.trim() ||
          "Customer",
        customer_email: user.email || "",
        customer_phone: userProfile?.phone || "",
        total_amount: service.price,
        payment_status: "pending",
      });

      if (error) throw error;

      toast.success("Appointment booked successfully!");

      // Reset form
      setDate(undefined);
      setSelectedTime("");
      setNotes("");
      setAddressData({ address: "", city: "", state: "", postal_code: "" });
      setBookedSlots([]);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isTimeSlotAvailable = (time: string) => {
    return !bookedSlots.includes(time);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>
          Schedule your {service.name} session ({service.duration} minutes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {showAddressForm && (
            <Alert className="border-secondary/50 bg-secondary/10">
              <AlertCircle className="h-4 w-4 text-secondary-foreground" />
              <AlertDescription>
                <strong>Address Required:</strong> Please provide your address
                information for service booking.{" "}
                <Link
                  href="/account/profile"
                  className="text-primary hover:underline"
                >
                  Update in profile
                </Link>{" "}
                or fill below.
              </AlertDescription>
            </Alert>
          )}

          {showAddressForm && (
            <Card className="border-muted">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Required for service location and contact purposes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="booking-address">Street Address *</Label>
                  <Textarea
                    id="booking-address"
                    value={addressData.address}
                    onChange={e =>
                      setAddressData({
                        ...addressData,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter your full street address"
                    rows={2}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-city">City *</Label>
                    <Input
                      id="booking-city"
                      value={addressData.city}
                      onChange={e =>
                        setAddressData({ ...addressData, city: e.target.value })
                      }
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="booking-state">State *</Label>
                    <Input
                      id="booking-state"
                      value={addressData.state}
                      onChange={e =>
                        setAddressData({
                          ...addressData,
                          state: e.target.value,
                        })
                      }
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-postal">Postal Code</Label>
                    <Input
                      id="booking-postal"
                      value={addressData.postal_code}
                      onChange={e =>
                        setAddressData({
                          ...addressData,
                          postal_code: e.target.value,
                        })
                      }
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={date => date < new Date() || date.getDay() === 0}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Time</Label>
              {checkingAvailability && (
                <Badge variant="secondary" className="text-xs">
                  Checking availability...
                </Badge>
              )}
              {date && bookedSlots.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {bookedSlots.length} slots unavailable
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => {
                const isAvailable = isTimeSlotAvailable(time);
                const isSelected = selectedTime === time;

                return (
                  <Button
                    key={time}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => isAvailable && setSelectedTime(time)}
                    disabled={!isAvailable || checkingAvailability}
                    className={cn(
                      "text-sm relative",
                      !isAvailable && "opacity-50 cursor-not-allowed",
                      isSelected &&
                        isAvailable &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                    {!isAvailable && (
                      <X className="h-3 w-3 ml-1 text-destructive" />
                    )}
                  </Button>
                );
              })}
            </div>
            {date && bookedSlots.length > 0 && (
              <p className="text-xs text-muted-foreground">
                <X className="h-3 w-3 inline mr-1" />
                Unavailable times are already booked or confirmed
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or information..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Price Display */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-medium">Service Price:</span>
              <span className="text-xl font-bold text-primary">
                ₦{service.price.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading || checkingAvailability || !selectedTime || !date}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
