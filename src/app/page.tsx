import Link from "next/link";
import Board from "@/components/Board";
import SiteHeader from "@/components/SiteHeader";
import Stamp from "@/components/Stamp";
import { ctaClass } from "@/components/cta";
import { formatPrice, site } from "@/data/site";

// Homepage. Block map and the deliberately uneven rhythm:
// research/design-plan.md, "Карта блоков главной". The hero is the thesis —
// today's count on the first screen; blocks 3–7 close the two researched
// fears and route back to the one target action.
export default function Home() {
  return (
    <>
      {/* 1+2 · Photo hero with the board ticket */}
      <div className="relative overflow-hidden bg-cocoa-deep">
        {/* Self-hosted still of a scored crust (provenance: phase 7 log) */}
        <img
          src="/bread.jpg"
          alt=""
          fetchPriority="high"
          data-parallax="0.18"
          className="absolute inset-0 h-full w-full object-cover object-[74%_38%]"
        />
        <div className="hero-tint" aria-hidden />

        <div className="wrap relative flex flex-col desk:min-h-screen">
          <SiteHeader current="/" onPhoto />

          <main className="pt-4 pb-10 desk:grid desk:flex-1 desk:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] desk:items-center desk:gap-[72px] desk:pt-10 desk:pb-14">
            <div>
              <div data-rise style={{ "--rise": 0 } as React.CSSProperties}>
                <Stamp onPhoto />
              </div>
              <h1
                data-split
                className="mb-4 max-w-[18ch] font-display text-[clamp(31px,7.8vw,60px)] font-black leading-[1.05] tracking-[-0.01em] text-cream-2"
              >
                Today&apos;s bake, and what&apos;s left of it.
              </h1>
              <p
                data-rise
                style={{ "--rise": 2 } as React.CSSProperties}
                className="mb-[22px] max-w-[40ch] text-[17px] leading-[1.5] text-latte desk:mb-[30px] desk:text-[18.5px]"
              >
                We bake twice a morning and stop when the flour runs out.
                Reserve what you want, pay at the counter.
              </p>
              <div data-rise style={{ "--rise": 3 } as React.CSSProperties}>
                <Link href="/order/" className={ctaClass}>
                  Reserve for pickup
                </Link>
                <p className="mt-2.5 text-[13.5px] text-latte">
                  Free · 90 seconds · no account
                </p>
              </div>
            </div>

            <div data-rise style={{ "--rise": 4 } as React.CSSProperties}>
              <div data-float>
                <Board />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 3 · How pickup works — three facts, no ceremony */}
      <section className="wrap py-12 desk:py-16" aria-label="How pickup works">
        <h2 data-split className="font-display text-xl font-extrabold desk:text-[22px]">
          How pickup works
        </h2>
        <div className="mt-6 grid gap-6 desk:grid-cols-3 desk:gap-10">
          <div>
            <p className="text-[16.5px] font-semibold">
              Reserve until {site.order.cutoff}
            </p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-mocha">
              Same-day only. The board is the stock — when it says five,
              there are five.
            </p>
          </div>
          <div>
            <p className="text-[16.5px] font-semibold">
              Pick a {site.order.windowMinutes}-minute window
            </p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-mocha">
              Your bag waits behind the counter with your name on it until
              we close.
            </p>
          </div>
          <div>
            <p className="text-[16.5px] font-semibold">Pay when you collect</p>
            <p className="mt-1 text-[14.5px] leading-[1.55] text-mocha">
              Card or cash. If you don&apos;t make it, the bread goes back on
              the shelf and you owe us nothing.
            </p>
          </div>
        </div>
      </section>

      {/* 4 · Two bakes — dark band, no heading; the times carry it */}
      <section className="bg-cocoa text-cream-2" aria-label="Two bakes a morning">
        <div className="wrap grid gap-10 py-12 desk:grid-cols-2 desk:gap-16 desk:py-16">
          <div data-rise style={{ "--rise": 0 } as React.CSSProperties}>
            <p className="font-display text-[34px] font-black leading-none tabular-nums desk:text-[44px]">
              6:30 AM
            </p>
            <p className="mt-3 max-w-[44ch] text-[16.5px] leading-[1.55] text-latte">
              First bake. Country sourdough, croissants, morning buns —
              doors open at 7:00 while the racks are still warm.
            </p>
          </div>
          <div data-rise style={{ "--rise": 1 } as React.CSSProperties}>
            <p className="font-display text-[34px] font-black leading-none tabular-nums desk:text-[44px]">
              11:00 AM
            </p>
            <p className="mt-3 max-w-[44ch] text-[16.5px] leading-[1.55] text-latte">
              Second bake. Rye &amp; caraway, handpies, the galette.
              Reservable all morning, out of the oven at eleven.
            </p>
          </div>
        </div>
      </section>

      {/* 5 · Who's baking — quiet block, small ui heading (fear #2) */}
      <section className="wrap py-12 desk:py-16" aria-label="Who is baking">
        <div className="max-w-[62ch]">
          <h2 className="text-sm font-bold text-mocha">Who&apos;s baking</h2>
          <p className="mt-3 text-[16.5px] leading-[1.6]">
            The starter came first — mixed in the winter of {site.since}, fed
            every day since. Nine of us share one oven and two bakes a
            morning. The flour is stone-milled in the Willamette Valley; the
            butter is churned an hour down the road.
          </p>
          <p className="mt-3 text-[16.5px] leading-[1.6] text-mocha">
            Nothing on the board sits overnight. Whatever doesn&apos;t sell
            by close rides to a neighborhood pantry the same evening.
          </p>
        </div>
      </section>

      {/* 6 · Coffee — one line, no heading at all */}
      <div className="wrap">
        <p className="border-y border-line py-8 text-[16.5px] text-mocha">
          Coffee is simple here: drip {formatPrice(3)}, espresso, latte —
          pulled while you pay, poured to go.
        </p>
      </div>

      {/* 7 · Visit — address and hours as text, no borrowed maps */}
      <section className="wrap py-12 desk:py-16" aria-label="Visit">
        <div className="grid gap-8 desk:grid-cols-2">
          <div>
            <h2 data-split className="font-display text-xl font-extrabold desk:text-[22px]">
              Visit
            </h2>
            <p className="mt-3 text-[16.5px] leading-[1.6]">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p className="mt-2 text-[14.5px] text-mocha">
              On Belmont between 36th and 37th ·{" "}
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
              >
                {site.phone}
              </a>
            </p>
          </div>
          <div>
            <p className="text-[16.5px] font-semibold">{site.hours.days}</p>
            <p className="mt-1 text-[16.5px]">
              {site.hours.open} – {site.hours.close}{" "}
              <span className="text-mocha-2">{site.hours.note}</span>
            </p>
            <p className="mt-1 text-[14.5px] text-mocha">
              Closed {site.hours.closedOn}s.
            </p>
            <Link
              href="/visit/"
              className="mt-4 inline-flex min-h-11 items-center border-b border-current pb-px text-[14.5px] font-semibold text-mocha hover:text-cocoa"
            >
              Directions &amp; pickup details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
