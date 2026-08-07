import Link from "next/link";
import { site } from "@/data/site";

const nav = [
  { href: "/", label: "Today" },
  { href: "/menu/", label: "Menu" },
  { href: "/order/", label: "Order" },
  { href: "/visit/", label: "Visit" },
];

const legal = [
  { href: "/privacy/", label: "Privacy Policy" },
  { href: "/accessibility/", label: "Accessibility Statement" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pt-4 pb-2">
        <nav className="-ml-2 flex flex-wrap">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm font-semibold text-mocha hover:text-cocoa"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <nav className="-mr-2 flex flex-wrap">
          {legal.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-11 items-center px-2 text-[13.5px] text-mocha-2 hover:text-cocoa"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="wrap pb-7 text-[13.5px] text-mocha-2">
        <p>
          {site.address.street}, {site.address.city}, {site.address.state}{" "}
          {site.address.zip} · {site.phone} · {site.email}
        </p>
        <p className="mt-1">
          © 2026 {site.name}. Baking since {site.since}.
        </p>
      </div>
    </footer>
  );
}
