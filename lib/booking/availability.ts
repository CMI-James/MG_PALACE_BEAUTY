"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function checkTimeSlotAvailability(date: string, time: string): Promise<boolean> {
  const supabase = createServerClient()

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id")
    .eq("appointment_date", date)
    .eq("appointment_time", time)
    .in("status", ["confirmed", "pending"])

  return !appointments || appointments.length === 0
}

export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  const supabase = createServerClient()

  const allTimeSlots = [
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
  ]

  const { data: bookedAppointments } = await supabase
    .from("appointments")
    .select("appointment_time")
    .eq("appointment_date", date)
    .in("status", ["confirmed", "pending"])

  const bookedTimes = bookedAppointments?.map((apt) => apt.appointment_time) || []

  return allTimeSlots.filter((time) => !bookedTimes.includes(time))
}

export async function getBookedTimeSlots(date: string): Promise<string[]> {
  const supabase = createServerClient()

  const { data: appointments } = await supabase
    .from("appointments")
    .select("appointment_time")
    .eq("appointment_date", date)
    .in("status", ["confirmed", "pending"])

  return appointments?.map((apt) => apt.appointment_time) || []
}
