"use server";

import { createServerClient, createServiceClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendAppointmentEmail } from "@/lib/email/send-email";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string
) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("Unauthorized");
  }

  // Use service client for admin operations (bypass RLS)
  const service = createServiceClient();
  const { error } = await service
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId);

  if (error) {
    throw new Error("Failed to update appointment status");
  }

  revalidatePath("/admin/appointments");
  return { success: true };
}

export async function confirmAppointment(appointmentId: string) {
  const result = await updateAppointmentStatus(appointmentId, "confirmed");

  try {
    await sendAppointmentEmail(appointmentId, "confirmation");
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    // Don't throw error - appointment was still confirmed
  }

  return result;
}

export async function cancelAppointment(appointmentId: string) {
  const result = await updateAppointmentStatus(appointmentId, "cancelled");

  try {
    await sendAppointmentEmail(appointmentId, "cancellation");
  } catch (error) {
    console.error("Failed to send cancellation email:", error);
    // Don't throw error - appointment was still cancelled
  }

  return result;
}

export async function completeAppointment(appointmentId: string) {
  return updateAppointmentStatus(appointmentId, "completed");
}

export async function rescheduleAppointment(
  appointmentId: string,
  newDate: string,
  newTime: string
) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    throw new Error("Unauthorized");
  }

  // Use service client for admin operations (bypass RLS)
  const service = createServiceClient();
  const { data: oldAppointment } = await service
    .from("appointments")
    .select("appointment_date, appointment_time")
    .eq("id", appointmentId)
    .single();

  const { error } = await service
    .from("appointments")
    .update({
      appointment_date: newDate,
      appointment_time: newTime,
      status: "confirmed",
    })
    .eq("id", appointmentId);

  if (error) {
    throw new Error("Failed to reschedule appointment");
  }

  try {
    await sendAppointmentEmail(appointmentId, "reschedule", {
      date: oldAppointment?.appointment_date || "",
      time: oldAppointment?.appointment_time || "",
    });
  } catch (error) {
    console.error("Failed to send reschedule email:", error);
    // Don't throw error - appointment was still rescheduled
  }

  revalidatePath("/admin/appointments");
  return { success: true };
}
