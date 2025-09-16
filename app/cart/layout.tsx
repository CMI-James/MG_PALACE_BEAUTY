import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart | MG Beauty Palace",
  description:
    "Review your selected beauty products and proceed to checkout. Secure shopping with MG Beauty Palace.",
  keywords: [
    "shopping cart",
    "beauty products",
    "checkout",
    "beauty shopping",
    "cart",
  ],
  openGraph: {
    title: "Shopping Cart | MG Beauty Palace",
    description:
      "Review your selected beauty products and proceed to checkout. Secure shopping with MG Beauty Palace.",
    type: "website",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
