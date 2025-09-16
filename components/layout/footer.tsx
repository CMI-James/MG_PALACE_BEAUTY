import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-sm">MG</span>
              </div>
              <span className="font-serif text-xl font-bold text-primary">
                Beauty Palace
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your premier destination for professional beauty tools, microblading equipment, lash extensions, and
              expert beauty services in Nigeria.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-secondary-foreground hover:text-secondary-foreground hover:bg-secondary transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  Beauty Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/account/appointments" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-100">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="text-sm text-slate-300 hover:text-primary transition-colors"
                >
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-slate-300 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-100">Stay Connected</h3>
            <p className="text-sm text-slate-300">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-primary/20 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Subscribe
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-sm text-slate-300 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-secondary-foreground" />
                <span>info@mgbeautypalace.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300 hover:text-primary transition-colors">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-slate-300">© {new Date().getFullYear()} MG Beauty Palace. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-slate-300 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-300 hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-slate-300 hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
