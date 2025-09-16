import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Shield, Clock, CheckCircle } from "lucide-react"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Returns & Exchanges
            </h1>
            <p className="text-muted-foreground">Your satisfaction is our priority</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">Simple return process within 30 days</p>
              </CardContent>
            </Card>
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-secondary-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">We stand behind our products</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Return Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 30-day return policy for most items. Items must be in original condition, unused, and in
                  original packaging.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Eligible Items</h4>
                      <p className="text-sm text-muted-foreground">Beauty tools, unopened cosmetics, accessories</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Original Condition</h4>
                      <p className="text-sm text-muted-foreground">Items must be unused and in original packaging</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Proof of Purchase</h4>
                      <p className="text-sm text-muted-foreground">Original receipt or order confirmation required</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Non-Returnable Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  For health and safety reasons, the following items cannot be returned:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Opened cosmetics and skincare products</li>
                  <li>Personal care items that have been used</li>
                  <li>Custom or personalized items</li>
                  <li>Gift cards and digital products</li>
                  <li>Items damaged by misuse or normal wear</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">How to Return</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Contact Us</h4>
                      <p className="text-sm text-muted-foreground">
                        Email returns@mgbeautypalace.com or call +234 (0) 123 456 7890 to initiate your return
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Get Return Authorization</h4>
                      <p className="text-sm text-muted-foreground">
                        We'll provide you with a return authorization number and shipping instructions
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Package & Ship</h4>
                      <p className="text-sm text-muted-foreground">
                        Securely package the item with all original materials and ship using provided label
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Receive Refund</h4>
                      <p className="text-sm text-muted-foreground">
                        Refund processed within 5-7 business days after we receive your return
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Exchanges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We offer exchanges for defective items or wrong items sent. For size or color exchanges, please return
                  the original item and place a new order.
                </p>
                <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary-foreground mb-2">Defective Items</h4>
                  <p className="text-sm text-muted-foreground">
                    If you receive a defective item, contact us immediately. We'll arrange for a replacement or full
                    refund at no cost to you.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Refund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Refunds processed to original payment method</li>
                  <li>Processing time: 5-7 business days after return received</li>
                  <li>Shipping costs are non-refundable (unless item was defective)</li>
                  <li>Return shipping costs are customer's responsibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Contact Returns Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Need help with a return or exchange?
                  <br />
                  Email: returns@mgbeautypalace.com
                  <br />
                  Phone: +234 (0) 123 456 7890
                  <br />
                  Hours: Monday-Friday, 9 AM - 6 PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}
