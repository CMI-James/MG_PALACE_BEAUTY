import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">What Are Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are stored on your computer or mobile device when you visit our
                  website. They help us provide you with a better experience by remembering your preferences and
                  improving site functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are necessary for the website to function properly. They enable basic functions like
                    page navigation, access to secure areas, and shopping cart functionality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Performance Cookies</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies collect information about how visitors use our website, such as which pages are
                    visited most often. This data helps us improve our website performance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Functionality Cookies</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies remember choices you make to improve your experience, such as your preferred language
                    or region.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                  <li>Delete existing cookies through your browser settings</li>
                  <li>Set your browser to notify you when cookies are being sent</li>
                  <li>Use private/incognito browsing mode</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Please note that disabling cookies may affect the functionality of our website.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services that set cookies on our website, such as analytics tools and payment
                  processors. These third parties have their own privacy policies and cookie practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at:
                  <br />
                  Email: privacy@mgbeautypalace.com
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
