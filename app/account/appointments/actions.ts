"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function cancelUserAppointment(appointmentId: string) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", appointmentId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to cancel appointment");
  }

  revalidatePath("/account/appointments");
  return { success: true };
}

export async function rescheduleUserAppointment(
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

  const { error } = await supabase
    .from("appointments")
    .update({
      appointment_date: newDate,
      appointment_time: newTime,
      status: "pending",
    })
    .eq("id", appointmentId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Failed to reschedule appointment");
  }

  revalidatePath("/account/appointments");
  return { success: true };
}
