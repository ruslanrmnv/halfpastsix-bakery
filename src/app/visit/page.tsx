import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Stamp from "@/components/Stamp";
import { ctaClass } from "@/components/cta";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Visit — ${site.name}`,
  description: `${site.address.street}, ${site.address.city} — ${site.hours.days}, ${site.hours.open} to ${site.hours.close} ${site.hours.note}.`,
};

export default function VisitPage() {
  return (
    <div className="wrap">
      <SiteHeader current="/visit/" />

      <main className="max-w-[760px] pt-6 pb-14">
        <Stamp />
        <h1
          data-split
          className="mb-2.5 max-w-[20ch] font-display text-[clamp(31px,7.6vw,48px)] font-black leading-[1.05] tracking-[-0.01em]"
        >
          Find us on Belmont
        </h1>
        <p className="mb-0 max-w-[46ch] text-[16.5px] leading-[1.5] text-mocha">
          One room, one oven, a bench out front. Look for the flour dust on
          the windows.
        </p>

        <section className="mt-9 grid gap-8 desk:grid-cols-2">
          <div>
            <h2 className="mb-3 font-display text-base font-extrabold">
              Address
            </h2>
            <p className="text-[16.5px] leading-[1.6]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p className="mt-2 max-w-[40ch] text-[14.5px] leading-[1.55] text-mocha">
              North side of SE Belmont between 36th and 37th. The 15 bus
              stops a block away; bike staples are right outside. Street
              parking is easiest before 9:00.
            </p>
            <p className="mt-3 text-[14.5px] text-mocha">
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
              >
                {site.phone}
              </a>
              <span className="px-2 text-mocha-2">·</span>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 font-display text-base font-extrabold">
              Hours
            </h2>
            <p className="text-[16.5px] font-semibold">{site.hours.days}</p>
            <p className="mt-1 text-[16.5px]">
              {site.hours.open} – {site.hours.close}{" "}
              <span className="text-mocha-2">{site.hours.note}</span>
            </p>
            <p className="mt-1 text-[14.5px] text-mocha">
              Closed {site.hours.closedOn}s. The first bake lands at{" "}
              {site.bakes.first}, the second at {site.bakes.second}.
            </p>
          </div>
        </section>

        <section className="mt-9 max-w-[62ch]">
          <h2 className="mb-3 font-display text-base font-extrabold">
            Picking up an order
          </h2>
          <p className="text-[16.5px] leading-[1.6] text-mocha">
            Reserved bags wait behind the counter — give the name on the
            order and pay there, card or cash. If your window slips by,
            we hold the bag until close; after that it goes back on the
            shelf and you owe us nothing.
          </p>
        </section>

        <div className="mt-10">
          <Link href="/order/" className={ctaClass}>
            Reserve for pickup
          </Link>
          <p className="mt-2.5 text-[13.5px] text-mocha-2">
            Same-day only · reserve until {site.order.cutoff}
          </p>
        </div>
      </main>
    </div>
  );
}
