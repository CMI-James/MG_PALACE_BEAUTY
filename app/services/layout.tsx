import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | MG Beauty Palace",
  description:
    "Professional beauty treatments and training courses by certified experts. Book microblading, lash extensions, facial treatments, and more.",
  keywords: [
    "beauty services",
    "microblading",
    "lash extensions",
    "facial treatments",
    "beauty training",
    "appointment booking",
  ],
  openGraph: {
    title: "Services | MG Beauty Palace",
    description:
      "Professional beauty treatments and training courses by certified experts. Book microblading, lash extensions, facial treatments, and more.",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
