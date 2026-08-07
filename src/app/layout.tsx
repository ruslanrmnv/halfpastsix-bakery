import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.address.city} bakery`,
  description: `${site.tagline}. Reserve today's bread for pickup — ${site.hours.days}, ${site.hours.open} ${site.hours.note}.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream font-ui text-cocoa">{children}</body>
    </html>
  );
}
