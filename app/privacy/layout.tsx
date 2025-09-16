import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | MG Beauty Palace",
  description: "Read MG Beauty Palace's privacy policy to understand how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "data protection", "personal information", "privacy rights", "MG Beauty Palace privacy"],
  openGraph: {
    title: "Privacy Policy | MG Beauty Palace",
    description: "Read MG Beauty Palace's privacy policy to understand how we collect, use, and protect your personal information.",
    type: "website",
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
