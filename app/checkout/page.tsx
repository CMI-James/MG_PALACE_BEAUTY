import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { getCurrentUser, getUserAddresses } from "@/lib/supabase/auth"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function CheckoutPage() {
  // Get current user
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/checkout")
  }

  // Get user's default address
  const addresses = await getUserAddresses(user.id)
  const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>

        <CheckoutForm 
          user={{
            email: user.email || "",
            first_name: user.profile?.first_name,
            last_name: user.profile?.last_name,
            phone: user.profile?.phone,
          }}
          defaultAddress={defaultAddress}
        />
      </main>

      <Footer />
    </div>
  )
}
