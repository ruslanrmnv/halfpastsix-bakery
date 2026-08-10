import type { Metadata } from "next";
import { montserrat, sourceSans } from "./fonts";
import Motion from "@/components/Motion";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

// Runs before first paint so the motion layer's hidden states exist from the
// start (no flash-then-hide). Reduced-motion readers never get hidden states.
const motionGate =
  "document.documentElement.classList.add('js');" +
  "if(matchMedia('(prefers-reduced-motion: reduce)').matches)" +
  "document.documentElement.classList.add('motion-off');";

const SITE_URL = "https://bakery.servicestudiobyruslan.com";

const TITLE = `${site.name} — ${site.address.city} bakery`;
const DESCRIPTION = `${site.tagline}. Reserve today's bread for pickup — ${site.hours.days}, ${site.hours.open} ${site.hours.note}.`;

export const metadata: Metadata = {
  /* Without a base, a relative canonical and the share card resolve against
     nothing and Next leaves both out of the export. */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: site.name,
    url: "/",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the motion gate intentionally adds html
    // classes before hydration; Lenis adds its own at runtime.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${sourceSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="bg-cream font-ui text-[16px] leading-[1.55] text-cocoa">
        <Motion />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
