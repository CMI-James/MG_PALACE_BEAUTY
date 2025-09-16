import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | MG Beauty Palace",
  description:
    "Manage your account, view orders, appointments, and profile information at MG Beauty Palace.",
  keywords: [
    "account",
    "profile",
    "orders",
    "appointments",
    "user dashboard",
    "beauty account",
  ],
  openGraph: {
    title: "My Account | MG Beauty Palace",
    description:
      "Manage your account, view orders, appointments, and profile information at MG Beauty Palace.",
    type: "website",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
