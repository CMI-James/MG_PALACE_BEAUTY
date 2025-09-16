import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | MG Beauty Palace",
  description: "Read MG Beauty Palace's terms of service to understand the rules and guidelines for using our beauty services and products.",
  keywords: ["terms of service", "terms and conditions", "user agreement", "beauty services terms", "MG Beauty Palace terms"],
  openGraph: {
    title: "Terms of Service | MG Beauty Palace",
    description: "Read MG Beauty Palace's terms of service to understand the rules and guidelines for using our beauty services and products.",
    type: "website",
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
