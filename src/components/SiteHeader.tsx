import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Today" },
  { href: "/menu/", label: "Menu" },
  { href: "/order/", label: "Order" },
  { href: "/visit/", label: "Visit" },
];

// The header owns no positioning — the homepage drops it inside the
// photo hero (onPhoto), every other page renders it on cream with a rule.
// Nav links keep 44×44 minimum even at 375px; the phase-2 overflow check
// measures the nav's right edge, not scrollWidth (decision 2.26).
export default function SiteHeader({
  current,
  onPhoto = false,
}: {
  current: string;
  onPhoto?: boolean;
}) {
  return (
    <header
      className={`flex items-center justify-between gap-4 pt-4 pb-3 desk:pt-[22px] desk:pb-4 ${
        onPhoto ? "" : "border-b border-line"
      }`}
    >
      <Link
        href="/"
        className={`inline-flex min-h-11 flex-col justify-center font-display text-[17.5px] font-extrabold leading-[1.05] tracking-[-0.01em] whitespace-nowrap desk:text-[21px] ${
          onPhoto ? "text-cream-2" : "text-cocoa"
        }`}
      >
        {site.name}
        {/* The city line ate two rows at 375 — desktop only */}
        <span
          className={`mt-0.5 hidden font-ui text-[12.5px] font-normal desk:block ${
            onPhoto ? "text-latte" : "text-mocha-2"
          }`}
        >
          {site.address.city}, {site.address.stateFull}
        </span>
      </Link>

      <nav className="-mr-[7px] flex desk:-mr-[11px] desk:gap-1">
        {links.map((l) => {
          const isCurrent = l.href === current;
          const color = onPhoto
            ? isCurrent
              ? "text-cream-2 underline decoration-2 underline-offset-[7px]"
              : "text-latte hover:text-cream-2"
            : isCurrent
              ? "text-cocoa underline decoration-2 underline-offset-[7px]"
              : "text-mocha hover:text-cocoa";
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center px-[7px] text-sm font-semibold desk:px-[11px] desk:text-[14.5px] ${color}`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
