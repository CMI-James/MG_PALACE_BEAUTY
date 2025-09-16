import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | MG Beauty Palace",
  description:
    "Complete your beauty product purchase with secure checkout. Fast shipping and excellent customer service.",
  keywords: [
    "checkout",
    "purchase",
    "payment",
    "beauty products",
    "secure checkout",
    "shipping",
  ],
  openGraph: {
    title: "Checkout | MG Beauty Palace",
    description:
      "Complete your beauty product purchase with secure checkout. Fast shipping and excellent customer service.",
    type: "website",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
