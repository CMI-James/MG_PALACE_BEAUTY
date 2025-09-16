"use server";

import { createServerClient } from "@/lib/supabase/server";

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  // In a real application, you would integrate with an email service like:
  // - Resend
  // - SendGrid
  // - AWS SES
  // - Mailgun

  // For now, we'll simulate sending an email and log it
  console.log("📧 Email would be sent:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("HTML length:", html.length);

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In production, you would return the actual email service response
  return { success: true, messageId: `sim_${Date.now()}` };
}

export async function sendAppointmentEmail(
  appointmentId: string,
  type: "confirmation" | "cancellation" | "reschedule",
  oldData?: { date: string; time: string }
) {
  const supabase = await createServerClient();

  // Get appointment details with user and service info
  const { data: appointment } = await supabase
    .from("appointments")
    .select(
      `
      *,
      user_profiles(full_name, email, address),
      services(name, duration, price)
    `
    )
    .eq("id", appointmentId)
    .single();

  if (!appointment || !appointment.user_profiles?.email) {
    throw new Error("Appointment or user email not found");
  }

  const emailData = {
    customerName: appointment.user_profiles.full_name || "Valued Customer",
    serviceName: appointment.services?.name || "Beauty Service",
    appointmentDate: appointment.appointment_date,
    appointmentTime: appointment.appointment_time,
    duration: appointment.services?.duration || 60,
    price: appointment.services?.price || 0,
    customerEmail: appointment.user_profiles.email,
    notes: appointment.notes,
    address: appointment.user_profiles.address,
  };

  let subject: string;
  let html: string;

  switch (type) {
    case "confirmation":
      subject = `Appointment Confirmed - ${emailData.serviceName} at MG Beauty Palace`;
      const { generateAppointmentConfirmationEmail } = await import(
        "./templates"
      );
      html = generateAppointmentConfirmationEmail(emailData);
      break;

    case "cancellation":
      subject = `Appointment Cancelled - ${emailData.serviceName} at MG Beauty Palace`;
      const { generateAppointmentCancellationEmail } = await import(
        "./templates"
      );
      html = generateAppointmentCancellationEmail(emailData);
      break;

    case "reschedule":
      subject = `Appointment Rescheduled - ${emailData.serviceName} at MG Beauty Palace`;
      const { generateAppointmentRescheduleEmail } = await import(
        "./templates"
      );
      html = generateAppointmentRescheduleEmail({
        ...emailData,
        oldDate: oldData?.date || "",
        oldTime: oldData?.time || "",
      });
      break;

    default:
      throw new Error("Invalid email type");
  }

  return await sendEmail({
    to: emailData.customerEmail,
    subject,
    html,
  });
}
