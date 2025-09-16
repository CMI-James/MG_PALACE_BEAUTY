import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | MG Beauty Palace",
  description:
    "Discover our complete collection of professional beauty tools and products for microblading, lash extensions, facial treatments, and more.",
  keywords: [
    "beauty products",
    "microblading tools",
    "lash extensions",
    "facial treatments",
    "beauty accessories",
    "professional beauty",
  ],
  openGraph: {
    title: "Products | MG Beauty Palace",
    description:
      "Discover our complete collection of professional beauty tools and products for microblading, lash extensions, facial treatments, and more.",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
