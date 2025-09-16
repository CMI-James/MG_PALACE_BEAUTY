import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Shipping Information
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about our delivery services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Quick and reliable shipping across Nigeria
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Secure Packaging</h3>
                <p className="text-muted-foreground">
                  Your items are carefully packaged for safe delivery
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Lagos State
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Same-day delivery available for orders placed before 2 PM.
                    Standard delivery: 1-2 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Major Cities (Abuja, Port Harcourt, Kano, Ibadan)
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Express delivery: 2-3 business days. Standard delivery: 3-5
                    business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Other Locations
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Standard delivery: 5-7 business days. Remote areas may
                    require additional time.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Delivery Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Same-Day Delivery
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Lagos only, orders before 2 PM
                      </p>
                    </div>
                    <span className="font-bold text-primary">₦2,500</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary/5 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Express Delivery
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        2-3 business days
                      </p>
                    </div>
                    <span className="font-bold text-secondary-foreground">
                      ₦1,500
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Standard Delivery
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        3-7 business days
                      </p>
                    </div>
                    <span className="font-bold text-foreground">₦1,000</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div>
                      <h4 className="font-semibold text-primary">
                        Free Delivery
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Orders above ₦50,000
                      </p>
                    </div>
                    <span className="font-bold text-primary">FREE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Order Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Orders are processed Monday through Friday, 9 AM to 6 PM.
                  Orders placed on weekends or holidays will be processed on the
                  next business day.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>
                    Order confirmation email sent immediately after purchase
                  </li>
                  <li>Processing time: 1-2 business days for most items</li>
                  <li>Tracking information provided once order ships</li>
                  <li>SMS and email notifications for delivery updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Special Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Professional Equipment
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Large or specialized beauty equipment may require additional
                    processing time and special handling. We&apos;ll contact you
                    with specific delivery arrangements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Custom Orders
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Custom or made-to-order items have extended processing
                    times. Delivery timeframes will be communicated at the time
                    of order.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about your delivery? Contact our shipping team:
                  <br />
                  Email: shipping@mgbeautypalace.com
                  <br />
                  Phone: +234 (0) 123 456 7890
                  <br />
                  WhatsApp: +234 (0) 123 456 7890
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
