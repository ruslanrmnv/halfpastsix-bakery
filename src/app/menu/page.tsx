import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Stamp from "@/components/Stamp";
import { ctaClass } from "@/components/cta";
import { formatPrice, menu, site, today, type MenuItem } from "@/data/site";

export const metadata: Metadata = {
  title: `Menu — ${site.name}`,
  description: `Everything we bake in two morning rounds, with live counts. Single items ${formatPrice(1.5)}–${formatPrice(7)}, loaves around ${formatPrice(9)}.`,
};

const groups: { label: string; cat: MenuItem["category"] }[] = [
  { label: "Bread", cat: "bread" },
  { label: "Pastry", cat: "pastry" },
  { label: "Savory", cat: "savory" },
  { label: "Coffee", cat: "coffee" },
];

const todayById = new Map(today.rows.map((r) => [r.id, r]));

function StatusCell({ id }: { id: string }) {
  const row = todayById.get(id);
  // Coffee isn't counted — it's made when you pay.
  if (!row)
    return <span className="text-[13.5px] text-mocha-2">made to order</span>;
  if (row.status === "gone")
    return (
      <span className="text-[13.5px] whitespace-nowrap text-mocha-2">
        gone {row.goneAt}
      </span>
    );
  if (row.status === "soon")
    return (
      <span className="text-[13.5px] whitespace-nowrap text-mocha">
        out at {site.bakes.secondShort}
      </span>
    );
  return (
    <span className="text-[13.5px] font-bold whitespace-nowrap text-mocha">
      {row.left} left
    </span>
  );
}

export default function MenuPage() {
  return (
    <div className="wrap">
      <SiteHeader current="/menu/" />

      <main className="max-w-[760px] pt-6 pb-14">
        <Stamp />
        <h1 className="mb-2.5 max-w-[20ch] font-display text-[clamp(31px,7.6vw,48px)] font-black leading-[1.05] tracking-[-0.01em]">
          The whole menu
        </h1>
        <p className="mb-0 max-w-[46ch] text-[16.5px] leading-[1.5] text-mocha">
          Baked in two rounds, {site.bakes.first} and {site.bakes.second}.
          When a line says gone, it means today — tomorrow starts over.
        </p>

        {groups.map((g) => (
          <section key={g.cat} className="mt-9">
            <h2 className="mb-3 font-display text-base font-extrabold">
              {g.label}
            </h2>
            <div className="overflow-hidden rounded-[14px] border border-line bg-cream-2">
              {menu
                .filter((m) => m.category === g.cat)
                .map((item) => {
                  const row = todayById.get(item.id);
                  const gone = row?.status === "gone";
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-line px-[18px] py-[15px] last:border-b-0"
                    >
                      <span
                        className={`text-[16.5px] leading-[1.25] font-semibold ${
                          gone
                            ? "text-mocha-2 line-through decoration-mocha-2 decoration-[1.5px]"
                            : ""
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="col-start-1 text-[13.5px] text-mocha-2">
                        {item.description ?? row?.note}
                      </span>
                      <span className="col-start-2 row-span-2 row-start-1 text-right">
                        <span className="block text-[16.5px] font-semibold tabular-nums">
                          {formatPrice(item.price)}
                        </span>
                        <StatusCell id={item.id} />
                      </span>
                    </div>
                  );
                })}
            </div>
          </section>
        ))}

        <div className="mt-10">
          <Link href="/order/" className={ctaClass}>
            Reserve for pickup
          </Link>
          <p className="mt-2.5 text-[13.5px] text-mocha-2">
            Counts are live — they drop as people reserve.
          </p>
        </div>
      </main>
    </div>
  );
}
