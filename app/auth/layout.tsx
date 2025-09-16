import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | MG Beauty Palace",
  description: "Sign in or create an account to access your beauty services, appointments, and exclusive offers at MG Beauty Palace.",
  keywords: ["login", "sign up", "authentication", "account", "beauty account", "user registration"],
  openGraph: {
    title: "Authentication | MG Beauty Palace",
    description: "Sign in or create an account to access your beauty services, appointments, and exclusive offers at MG Beauty Palace.",
    type: "website",
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
