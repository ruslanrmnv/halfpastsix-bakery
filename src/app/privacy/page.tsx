import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.name}`,
  description: `What ${site.name} does and doesn't collect. Short version: a name and a phone number when you reserve, nothing else.`,
};

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <SiteHeader current="/privacy/" />

      <main className="max-w-[62ch] pt-6 pb-14">
        <h1 className="mb-2.5 font-display text-[clamp(28px,6vw,40px)] font-black leading-[1.05] tracking-[-0.01em]">
          Privacy Policy
        </h1>
        <p className="text-[14.5px] text-mocha-2">Updated August 2026</p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          What we collect
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          When you reserve a pickup we ask for a name to write on the bag
          and, optionally, a phone number in case something goes wrong with
          your order that morning. That&apos;s the whole list.
        </p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          What we don&apos;t
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          This site sets no cookies, runs no analytics, loads nothing from
          third parties and shows no ads. We don&apos;t build profiles, buy
          lists or sell anything about you to anyone.
        </p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          How long we keep it
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          The day&apos;s order sheet is discarded when we close. If you gave
          us a phone number, it goes with it.
        </p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          Questions
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          Write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
          >
            {site.email}
          </a>{" "}
          or ask at the counter — the person at the register can answer most
          of this faster than email can.
        </p>
      </main>
    </div>
  );
}
