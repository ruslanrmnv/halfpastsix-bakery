import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Accessibility Statement — ${site.name}`,
  description: `How ${site.name} keeps the site and the shop usable for everyone, and where to write when something is in the way.`,
};

export default function AccessibilityPage() {
  return (
    <div className="wrap">
      <SiteHeader current="/accessibility/" />

      <main className="max-w-[62ch] pt-6 pb-14">
        <h1 className="mb-2.5 font-display text-[clamp(28px,6vw,40px)] font-black leading-[1.05] tracking-[-0.01em]">
          Accessibility Statement
        </h1>
        <p className="text-[14.5px] text-mocha-2">Updated August 2026</p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          This website
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          We aim for WCAG 2.1 AA. In practice that means text contrast of at
          least 4.5:1, buttons and links at least 44px tall, a layout that
          works with a keyboard alone, real text instead of text baked into
          images, and no motion or autoplaying anything. The order flow is
          plain HTML controls — steppers, buttons and two fields — labelled
          for screen readers.
        </p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          The shop
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          The entrance on Belmont is step-free and the counter has a lowered
          section. If reaching the shelf or the door is awkward, say the
          word and we&apos;ll bring your bag out to you.
        </p>

        <h2 className="mt-8 mb-2 font-display text-base font-extrabold">
          When something is in the way
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-mocha">
          If any part of this site doesn&apos;t work for you, tell us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
          >
            {site.email}
          </a>{" "}
          or {site.phone}. Describe what you were trying to do and what got
          in the way — we fix these first.
        </p>
      </main>
    </div>
  );
}
