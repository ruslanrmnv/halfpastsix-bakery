import type { Metadata } from "next";
import { montserrat, sourceSans } from "./fonts";
import SiteFooter from "@/components/SiteFooter";
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
    <html lang="en" className={`${montserrat.variable} ${sourceSans.variable}`}>
      <body className="bg-cream font-ui text-[16px] leading-[1.55] text-cocoa">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
