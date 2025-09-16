import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">Find answers to common questions about our products and services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">General Questions</h3>
                <p className="text-sm text-muted-foreground">About our services and policies</p>
              </CardContent>
            </Card>
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-10 w-10 text-secondary-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Product Support</h3>
                <p className="text-sm text-muted-foreground">Help with products and orders</p>
              </CardContent>
            </Card>
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <Phone className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Need More Help?</h3>
                <p className="text-sm text-muted-foreground">Contact our support team</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What services does MG Beauty Palace offer?</AccordionTrigger>
                    <AccordionContent>
                      We offer professional beauty services including microblading, lash extensions, brow shaping, and
                      various beauty treatments. We also sell professional beauty tools and equipment.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I book an appointment?</AccordionTrigger>
                    <AccordionContent>
                      You can book an appointment through our online booking system, by calling us at +234 (0) 123 456
                      7890, or by visiting our location. Online bookings are available 24/7 and require confirmation
                      from our team.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are your operating hours?</AccordionTrigger>
                    <AccordionContent>
                      We're open Monday through Saturday from 9:00 AM to 7:00 PM, and Sunday from 11:00 AM to 5:00 PM.
                      Holiday hours may vary.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do you offer training courses?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer professional training courses in microblading, lash extensions, and other beauty
                      techniques. Contact us for course schedules and enrollment information.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Appointments & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="service-1">
                    <AccordionTrigger>How far in advance should I book?</AccordionTrigger>
                    <AccordionContent>
                      We recommend booking at least 1-2 weeks in advance, especially for popular services like
                      microblading. However, we often have same-day availability for certain services.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="service-2">
                    <AccordionTrigger>What's your cancellation policy?</AccordionTrigger>
                    <AccordionContent>
                      We require 24-hour notice for cancellations. Cancellations with less than 24 hours notice or
                      no-shows may be subject to a cancellation fee.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="service-3">
                    <AccordionTrigger>How long do appointments typically take?</AccordionTrigger>
                    <AccordionContent>
                      Appointment duration varies by service: microblading (2-3 hours), lash extensions (1.5-2 hours),
                      brow shaping (30-45 minutes). We'll provide specific timing when you book.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="service-4">
                    <AccordionTrigger>Do I need to prepare for my appointment?</AccordionTrigger>
                    <AccordionContent>
                      Preparation varies by service. We'll provide specific pre-appointment instructions when you book.
                      Generally, avoid caffeine and alcohol before procedures, and come with clean skin.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Products & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="product-1">
                    <AccordionTrigger>Do you ship nationwide?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to all states in Nigeria. Delivery times vary by location: Lagos (1-2 days), major
                      cities (2-3 days), other locations (3-7 days).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="product-2">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept various payment methods including debit/credit cards, bank transfers, and mobile
                      payments through our secure payment partners.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="product-3">
                    <AccordionTrigger>Can I return or exchange products?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 30-day return policy for unused items in original packaging. Some items like
                      opened cosmetics cannot be returned for health and safety reasons.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="product-4">
                    <AccordionTrigger>Do you offer bulk discounts?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer discounts for bulk orders and professional customers. Contact us directly for
                      wholesale pricing and volume discounts.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Technical Support</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-1">
                    <AccordionTrigger>I'm having trouble with the website</AccordionTrigger>
                    <AccordionContent>
                      Try clearing your browser cache and cookies, or try a different browser. If problems persist,
                      contact our technical support team at support@mgbeautypalace.com.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-2">
                    <AccordionTrigger>How do I track my order?</AccordionTrigger>
                    <AccordionContent>
                      You'll receive a tracking number via email once your order ships. You can also check your order
                      status by logging into your account on our website.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="tech-3">
                    <AccordionTrigger>Can I modify my order after placing it?</AccordionTrigger>
                    <AccordionContent>
                      Orders can be modified within 2 hours of placement if they haven't been processed yet. Contact us
                      immediately at +234 (0) 123 456 7890 for order changes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Still Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Call Us</p>
                      <p className="text-sm text-muted-foreground">+234 (0) 123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                    <Mail className="h-5 w-5 text-secondary-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Email Us</p>
                      <p className="text-sm text-muted-foreground">support@mgbeautypalace.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
