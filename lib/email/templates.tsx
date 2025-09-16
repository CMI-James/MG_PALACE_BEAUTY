interface AppointmentEmailData {
  customerName: string
  serviceName: string
  appointmentDate: string
  appointmentTime: string
  duration: number
  price: number
  customerEmail: string
  notes?: string
  address?: string
}

export function generateAppointmentConfirmationEmail(data: AppointmentEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmed - MG Beauty Palace</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #FFD700 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .appointment-card { background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .appointment-details { display: grid; gap: 15px; }
        .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #e9ecef; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: 600; color: #495057; }
        .detail-value { color: #212529; }
        .price-highlight { font-size: 18px; font-weight: bold; color: #4CAF50; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .contact-info { margin: 15px 0; }
        .contact-info p { margin: 5px 0; color: #6c757d; }
        .button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 15px 0; }
        .success-badge { background-color: #d4edda; color: #155724; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MG Beauty Palace</h1>
            <p>Professional Beauty Services</p>
        </div>
        
        <div class="content">
            <div class="success-badge">✓ Appointment Confirmed</div>
            
            <h2>Hello ${data.customerName}!</h2>
            <p>Great news! Your appointment has been confirmed. We're excited to provide you with exceptional beauty services.</p>
            
            <div class="appointment-card">
                <h3 style="margin-top: 0; color: #4CAF50;">Appointment Details</h3>
                <div class="appointment-details">
                    <div class="detail-row">
                        <span class="detail-label">Service:</span>
                        <span class="detail-value">${data.serviceName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${new Date(data.appointmentDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Time:</span>
                        <span class="detail-value">${data.appointmentTime}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Duration:</span>
                        <span class="detail-value">${data.duration} minutes</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Price:</span>
                        <span class="detail-value price-highlight">₦${data.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            ${
              data.notes
                ? `
            <div style="background-color: #fff3cd; border-left: 4px solid #FFD700; padding: 15px; margin: 20px 0; border-radius: 8px;">
                <h4 style="margin-top: 0; color: #856404;">Special Notes:</h4>
                <p style="margin-bottom: 0; color: #856404;">${data.notes}</p>
            </div>
            `
                : ""
            }
            
            <h3>What to Expect:</h3>
            <ul style="color: #495057;">
                <li>Please arrive 10 minutes early for your appointment</li>
                <li>Bring a valid ID for verification</li>
                <li>Our expert technicians will provide personalized service</li>
                <li>All equipment is sanitized and safety protocols are followed</li>
            </ul>
            
            <p>If you need to reschedule or have any questions, please contact us as soon as possible.</p>
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <p><strong>MG Beauty Palace</strong></p>
                <p>📍 123 Beauty Street, Victoria Island, Lagos, Nigeria</p>
                <p>📞 +234 (0) 123 456 7890</p>
                <p>✉️ info@mgbeautypalace.com</p>
            </div>
            <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                © 2024 MG Beauty Palace. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `.trim()
}

export function generateAppointmentCancellationEmail(data: AppointmentEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Cancelled - MG Beauty Palace</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #dc3545 0%, #6c757d 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .appointment-card { background-color: #f8f9fa; border-left: 4px solid #dc3545; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .contact-info { margin: 15px 0; }
        .contact-info p { margin: 5px 0; color: #6c757d; }
        .button { display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 15px 0; }
        .cancel-badge { background-color: #f8d7da; color: #721c24; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MG Beauty Palace</h1>
            <p>Professional Beauty Services</p>
        </div>
        
        <div class="content">
            <div class="cancel-badge">✗ Appointment Cancelled</div>
            
            <h2>Hello ${data.customerName},</h2>
            <p>We regret to inform you that your appointment has been cancelled. We apologize for any inconvenience this may cause.</p>
            
            <div class="appointment-card">
                <h3 style="margin-top: 0; color: #dc3545;">Cancelled Appointment Details</h3>
                <p><strong>Service:</strong> ${data.serviceName}</p>
                <p><strong>Date:</strong> ${new Date(data.appointmentDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                <p><strong>Time:</strong> ${data.appointmentTime}</p>
            </div>
            
            <p>We would love to reschedule your appointment at your convenience. Please contact us to book a new appointment.</p>
            
            <a href="mailto:info@mgbeautypalace.com" class="button">Contact Us to Reschedule</a>
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <p><strong>MG Beauty Palace</strong></p>
                <p>📍 123 Beauty Street, Victoria Island, Lagos, Nigeria</p>
                <p>📞 +234 (0) 123 456 7890</p>
                <p>✉️ info@mgbeautypalace.com</p>
            </div>
            <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                © 2024 MG Beauty Palace. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `.trim()
}

export function generateAppointmentRescheduleEmail(
  data: AppointmentEmailData & { oldDate: string; oldTime: string },
): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Rescheduled - MG Beauty Palace</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #FFD700 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .appointment-card { background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .old-appointment { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 8px; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef; }
        .contact-info { margin: 15px 0; }
        .contact-info p { margin: 5px 0; color: #6c757d; }
        .reschedule-badge { background-color: #cce5ff; color: #004085; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MG Beauty Palace</h1>
            <p>Professional Beauty Services</p>
        </div>
        
        <div class="content">
            <div class="reschedule-badge">📅 Appointment Rescheduled</div>
            
            <h2>Hello ${data.customerName}!</h2>
            <p>Your appointment has been successfully rescheduled. Here are your updated appointment details:</p>
            
            <div class="old-appointment">
                <h4 style="margin-top: 0; color: #856404;">Previous Appointment:</h4>
                <p style="margin-bottom: 0;"><strong>Date:</strong> ${new Date(data.oldDate).toLocaleDateString()} at ${data.oldTime}</p>
            </div>
            
            <div class="appointment-card">
                <h3 style="margin-top: 0; color: #4CAF50;">New Appointment Details</h3>
                <p><strong>Service:</strong> ${data.serviceName}</p>
                <p><strong>Date:</strong> ${new Date(data.appointmentDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
                <p><strong>Time:</strong> ${data.appointmentTime}</p>
                <p><strong>Duration:</strong> ${data.duration} minutes</p>
                <p><strong>Price:</strong> ₦${data.price.toLocaleString()}</p>
            </div>
            
            <p>Please make note of your new appointment time. We look forward to seeing you!</p>
        </div>
        
        <div class="footer">
            <div class="contact-info">
                <p><strong>MG Beauty Palace</strong></p>
                <p>📍 123 Beauty Street, Victoria Island, Lagos, Nigeria</p>
                <p>📞 +234 (0) 123 456 7890</p>
                <p>✉️ info@mgbeautypalace.com</p>
            </div>
            <p style="color: #6c757d; font-size: 12px; margin-top: 20px;">
                © 2024 MG Beauty Palace. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
  `.trim()
}
