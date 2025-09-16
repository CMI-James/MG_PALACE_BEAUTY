import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MG Beauty Palace",
  description:
    "Get in touch with MG Beauty Palace. Book appointments, ask questions, or visit our beauty salon. We're here to help with all your beauty needs.",
  keywords: [
    "contact us",
    "beauty salon",
    "appointment booking",
    "beauty consultation",
    "MG Beauty Palace contact",
    "beauty services",
  ],
  openGraph: {
    title: "Contact Us | MG Beauty Palace",
    description:
      "Get in touch with MG Beauty Palace. Book appointments, ask questions, or visit our beauty salon. We're here to help with all your beauty needs.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
