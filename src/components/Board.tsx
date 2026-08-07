import Link from "next/link";
import { formatPrice, menu, shelfLeft, site, today } from "@/data/site";

const menuById = new Map(menu.map((m) => [m.id, m]));

// The project's signature: a cream ticket over the dark photo — the only
// light mass of the hero. Big counts, and the sold-out row says *when* it
// ran out. Bold 2px cocoa rules: a ticket, not a newspaper.
export default function Board() {
  const rows = today.rows.filter((r) => r.onBoard);

  return (
    <section
      aria-label="What is left today"
      className="overflow-hidden rounded-[18px] bg-cream-2 text-cocoa shadow-[0_34px_70px_-30px_rgba(0,0,0,0.65)]"
    >
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-cocoa px-5 pt-4 pb-3 desk:px-[22px] desk:pt-[18px] desk:pb-[13px]">
        <h2 className="font-display text-[17px] font-extrabold">On the board</h2>
        <span className="text-[13px] text-mocha-2">counted at {today.countedAt}</span>
      </div>

      {rows.map((row) => {
        const item = menuById.get(row.id)!;
        const gone = row.status === "gone";
        return (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-0.5 border-b border-line px-5 py-[13px] desk:px-[22px] desk:py-4"
          >
            <span
              className={`text-[16.5px] leading-[1.25] font-semibold desk:text-[17px] ${
                gone
                  ? "text-mocha-2 line-through decoration-mocha-2 decoration-[1.5px]"
                  : "text-cocoa"
              }`}
            >
              {item.name}
            </span>
            <span className="col-start-1 text-[13.5px] text-mocha-2">
              {formatPrice(item.price)} · {row.note}
            </span>

            {row.status === "left" && (
              <span className="col-start-2 row-span-2 row-start-1 text-right font-display text-[34px] font-black leading-none tabular-nums desk:text-[44px]">
                {row.left}
                <small className="mt-[3px] block font-ui text-xs font-normal text-mocha-2">
                  left
                </small>
              </span>
            )}
            {/* No red for "gone" — hierarchy runs on saturation, the accent is taken */}
            {row.status === "gone" && (
              <span className="col-start-2 row-span-2 row-start-1 text-right text-[13.5px] leading-[1.4] whitespace-nowrap text-mocha-2">
                gone {row.goneAt}
              </span>
            )}
            {row.status === "soon" && (
              <span className="col-start-2 row-span-2 row-start-1 text-right text-[13.5px] leading-[1.4] whitespace-nowrap text-mocha">
                out at {site.bakes.secondShort}
              </span>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap justify-between gap-3 border-t-2 border-cocoa px-5 py-[13px] text-[13.5px] text-mocha-2 desk:px-[22px] desk:py-[15px]">
        <span>
          {shelfLeft} of {today.baked} items still on the shelf
        </span>
        {/* Link stays in text color — orange belongs to the button alone.
            44px tap height via negative margins so the row doesn't swell. */}
        <Link
          href="/menu/"
          className="-my-3.5 inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa desk:-my-4"
        >
          See the whole menu
        </Link>
      </div>
    </section>
  );
}
