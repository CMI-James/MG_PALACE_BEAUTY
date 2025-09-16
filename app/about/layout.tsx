import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MG Beauty Palace",
  description:
    "Learn about MG Beauty Palace - your trusted partner for professional beauty services, training, and products. Discover our story and expertise.",
  keywords: [
    "about us",
    "beauty salon",
    "professional beauty",
    "beauty training",
    "MG Beauty Palace",
    "beauty experts",
  ],
  openGraph: {
    title: "About Us | MG Beauty Palace",
    description:
      "Learn about MG Beauty Palace - your trusted partner for professional beauty services, training, and products. Discover our story and expertise.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
