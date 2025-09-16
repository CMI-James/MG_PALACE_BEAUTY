import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using MG Beauty Palace services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">MG Beauty Palace provides:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Professional beauty tools and equipment sales</li>
                  <li>Beauty services including microblading, lash extensions, and more</li>
                  <li>Online appointment booking system</li>
                  <li>Customer support and consultation services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Appointment Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">For appointment-based services:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Appointments must be confirmed by our team before they are considered booked</li>
                  <li>24-hour notice is required for cancellations</li>
                  <li>Late arrivals may result in shortened service time or rescheduling</li>
                  <li>No-shows may be charged a cancellation fee</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">Payment terms and conditions:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>All prices are in Nigerian Naira (₦) unless otherwise stated</li>
                  <li>Payment is required at the time of service or upon product delivery</li>
                  <li>We accept various payment methods including cards and bank transfers</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">Users agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of account credentials</li>
                  <li>Use services in accordance with applicable laws</li>
                  <li>Respect our staff and other customers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  MG Beauty Palace shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
                  losses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, contact us at:
                  <br />
                  Email: legal@mgbeautypalace.com
                  <br />
                  Phone: +234 (0) 123 456 7890
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
