"use client";

import { useState } from "react";
import Link from "next/link";
import Stamp from "@/components/Stamp";
import { ctaClass } from "@/components/cta";
import {
  formatPrice,
  menu,
  pickupWindows,
  site,
  today,
  type TodayRow,
} from "@/data/site";

// The whole order lives on the client — the site is a static export and
// loads nothing external (intake, decision 0.6). The README's "replace
// before production" section covers wiring this to a real backend.

const menuById = new Map(menu.map((m) => [m.id, m]));

// Everything counted today except coffee — that's made at the counter.
const orderable = today.rows.filter(
  (r) => menuById.get(r.id)!.category !== "coffee",
);

const SECOND_BAKE_MIN = 11 * 60;

function capOf(row: TodayRow): number {
  if (row.status === "left") return row.left ?? 0;
  if (row.status === "soon") return row.reservable ?? 0;
  return 0;
}

export default function OrderFlow() {
  const [qty, setQtyState] = useState<Record<string, number>>({});
  // "reserve from the second bake" flips a soon-row into a stepper
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const [windowIdx, setWindowIdx] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [placed, setPlaced] = useState<{ number: number } | null>(null);

  const picked = orderable
    .map((row) => ({ row, n: qty[row.id] ?? 0 }))
    .filter((x) => x.n > 0);
  const total = picked.reduce(
    (sum, x) => sum + x.n * menuById.get(x.row.id)!.price,
    0,
  );
  const count = picked.reduce((sum, x) => sum + x.n, 0);
  // A bag holding second-bake items can't be picked up before 11:00.
  const needsSecondBake = picked.some((x) => x.row.status === "soon");

  function setQty(row: TodayRow, next: number) {
    const clamped = Math.max(0, Math.min(capOf(row), next));
    const nextQty = { ...qty, [row.id]: clamped };
    setQtyState(nextQty);

    const stillNeeds = orderable.some(
      (r) => r.status === "soon" && (nextQty[r.id] ?? 0) > 0,
    );
    const current = pickupWindows[windowIdx];
    if (stillNeeds && current.startMin < SECOND_BAKE_MIN) {
      const idx = pickupWindows.findIndex(
        (w) => !w.taken && w.startMin >= SECOND_BAKE_MIN,
      );
      if (idx >= 0) setWindowIdx(idx);
    }
  }

  function hold() {
    const errs: string[] = [];
    if (count === 0)
      errs.push("The bag is empty — pick at least one item above.");
    if (!name.trim()) errs.push("We need a name to write on the bag.");
    setErrors(errs);
    if (errs.length > 0) return;
    setPlaced({ number: 20 + Math.floor(Math.random() * 60) });
  }

  const windowLabel = `${pickupWindows[windowIdx].label} AM`;

  if (placed) {
    return (
      <main className="max-w-[760px] pt-6 pb-14">
        <Stamp />
        <h1 className="mb-2.5 max-w-[20ch] font-display text-[clamp(31px,7.6vw,48px)] font-black leading-[1.05] tracking-[-0.01em]">
          No. {placed.number} is on the board.
        </h1>
        <p className="mb-7 max-w-[46ch] text-[16.5px] leading-[1.5] text-mocha">
          We&apos;re holding {count} {count === 1 ? "item" : "items"} under
          &ldquo;{name.trim()}&rdquo; — pick up {windowLabel} at the counter.
        </p>

        <div className="max-w-[520px] rounded-[14px] border border-line bg-cream-2 px-[18px] py-2">
          {picked.map(({ row, n }) => {
            const item = menuById.get(row.id)!;
            return (
              <div
                key={row.id}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
              >
                <span className="text-[16.5px] font-semibold">
                  {item.name}
                  <span className="font-normal text-mocha-2"> × {n}</span>
                </span>
                <span className="text-[16.5px] tabular-nums">
                  {formatPrice(item.price * n)}
                </span>
              </div>
            );
          })}
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-cocoa py-3">
            <span className="text-[16.5px] font-semibold">Total at pickup</span>
            <span className="font-display text-xl font-extrabold tabular-nums">
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <p className="mt-5 max-w-[46ch] text-sm leading-[1.55] text-mocha">
          {site.address.street} — pay at the counter, card or cash. If the
          morning gets away from you, nothing happens: the bag goes back on
          the shelf at close and you owe us nothing.
        </p>

        <p className="mt-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center border-b border-current pb-px font-semibold text-mocha hover:text-cocoa"
          >
            Back to today&apos;s board
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-[760px] pt-6 pb-14">
      <Stamp />
      <h1 className="mb-2.5 max-w-[20ch] font-display text-[clamp(31px,7.6vw,48px)] font-black leading-[1.05] tracking-[-0.01em]">
        Reserve for pickup
      </h1>
      <p className="mb-0 max-w-[46ch] text-[16.5px] leading-[1.5] text-mocha">
        Two fields, no account, nothing to pay now. We hold your bag with
        your name on it until we close.
      </p>

      {/* Step 1 — items with live caps */}
      <section className="mt-9">
        <h2 className="mb-3 flex flex-wrap items-baseline gap-2.5 font-display text-base font-extrabold">
          1 — What you&apos;re taking
          <span className="font-ui text-[13.5px] font-normal text-mocha-2">
            the counts are live
          </span>
        </h2>

        {orderable.map((row) => {
          const item = menuById.get(row.id)!;
          const n = qty[row.id] ?? 0;
          const cap = capOf(row);
          const remaining = cap - n;
          const asStepper =
            row.status === "left" || (row.status === "soon" && opened[row.id]);

          return (
            <div
              key={row.id}
              className={`grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border border-b-0 border-line px-[18px] py-[15px] first:rounded-t-[14px] last:rounded-b-[14px] last:border-b ${
                row.status === "gone" ? "bg-cream" : "bg-cream-2"
              }`}
            >
              <span
                className={`text-[16.5px] leading-[1.25] font-semibold ${
                  row.status === "gone"
                    ? "text-mocha-2 line-through decoration-mocha-2 decoration-[1.5px]"
                    : ""
                }`}
              >
                {item.name}
              </span>

              {/* Meta line: price plus the live remainder */}
              <span className="col-start-1 text-[13.5px] text-mocha-2">
                {formatPrice(item.price)} ·{" "}
                {row.status === "gone" && <>gone at {row.goneAt}</>}
                {row.status === "left" &&
                  (remaining > 0 ? (
                    <b className="font-bold text-mocha">{remaining} left</b>
                  ) : (
                    <b className="font-bold text-mocha">
                      that&apos;s all {cap} of them
                    </b>
                  ))}
                {row.status === "soon" &&
                  (opened[row.id] ? (
                    <>from the {site.bakes.secondShort} bake</>
                  ) : (
                    <>in the {site.bakes.secondShort} bake</>
                  ))}
              </span>

              {asStepper && (
                <span className="col-start-2 row-span-2 row-start-1 flex items-center gap-[3px]">
                  <button
                    type="button"
                    aria-label={`One fewer ${item.name}`}
                    disabled={n === 0}
                    onClick={() => setQty(row, n - 1)}
                    className="h-11 w-11 cursor-pointer rounded-xl border-[1.5px] border-cocoa bg-cream-2 font-ui text-lg leading-none font-bold text-cocoa hover:enabled:bg-cream disabled:cursor-not-allowed disabled:border-line disabled:text-mocha-2 disabled:opacity-60"
                  >
                    −
                  </button>
                  <span className="min-w-10 text-center font-display text-xl font-extrabold tabular-nums">
                    {n}
                  </span>
                  <button
                    type="button"
                    aria-label={`One more ${item.name}`}
                    disabled={remaining === 0}
                    onClick={() => setQty(row, n + 1)}
                    className="h-11 w-11 cursor-pointer rounded-xl border-[1.5px] border-cocoa bg-cream-2 font-ui text-lg leading-none font-bold text-cocoa hover:enabled:bg-cream disabled:cursor-not-allowed disabled:border-line disabled:text-mocha-2 disabled:opacity-60"
                  >
                    +
                  </button>
                </span>
              )}

              {row.status === "gone" && (
                <span className="col-start-2 row-span-2 row-start-1 max-w-[16ch] text-right text-[13.5px] leading-[1.45] text-mocha">
                  back tomorrow
                  <br />
                  at {site.bakes.first}
                </span>
              )}

              {row.status === "soon" && !opened[row.id] && (
                <span className="col-start-2 row-span-2 row-start-1 max-w-[16ch] text-right text-[13.5px] leading-[1.45] text-mocha">
                  <button
                    type="button"
                    onClick={() =>
                      setOpened((o) => ({ ...o, [row.id]: true }))
                    }
                    className="inline-flex min-h-11 cursor-pointer items-center border-b border-current text-right font-bold text-mocha hover:text-cocoa"
                  >
                    reserve from
                    <br />
                    the second bake
                  </button>
                </span>
              )}
            </div>
          );
        })}
      </section>

      {/* Step 2 — pickup window */}
      <section className="mt-9">
        <h2 className="mb-3 flex flex-wrap items-baseline gap-2.5 font-display text-base font-extrabold">
          2 — When you&apos;re coming
          <span className="font-ui text-[13.5px] font-normal text-mocha-2">
            {site.order.windowMinutes}-minute windows
          </span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {pickupWindows.map((w, i) => {
            const blocked =
              Boolean(w.taken) ||
              (needsSecondBake && w.startMin < SECOND_BAKE_MIN);
            return (
              <button
                key={w.label}
                type="button"
                disabled={blocked}
                aria-pressed={i === windowIdx}
                onClick={() => setWindowIdx(i)}
                className={`inline-flex min-h-11 cursor-pointer items-center rounded-xl border-[1.5px] px-4 text-[14.5px] font-semibold tabular-nums disabled:cursor-not-allowed disabled:border-line disabled:bg-cream disabled:text-mocha-2 disabled:line-through disabled:decoration-mocha-2 ${
                  i === windowIdx
                    ? "border-cocoa bg-cocoa text-cream-2"
                    : "border-cocoa bg-cream-2 text-cocoa"
                }`}
              >
                {w.label}
              </button>
            );
          })}
        </div>
        {needsSecondBake && (
          <p className="mt-2.5 max-w-[46ch] text-[13.5px] leading-[1.5] text-mocha">
            The second bake is out of the oven at 11:00 — earlier windows
            step aside while it&apos;s in your bag.
          </p>
        )}
      </section>

      {/* Step 3 — two fields, per the Baymard finding (decision 2.9) */}
      <section className="mt-9">
        <h2 className="mb-3 flex flex-wrap items-baseline gap-2.5 font-display text-base font-extrabold">
          3 — Who we&apos;re holding it for
        </h2>
        <div className="grid max-w-[420px] gap-3">
          <label className="block">
            <span className="mb-[5px] block text-[13.5px] font-semibold text-mocha">
              Name
            </span>
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-12 w-full rounded-xl border-[1.5px] border-cocoa bg-cream-2 px-3.5 text-[16.5px] text-cocoa"
            />
          </label>
          <label className="block">
            <span className="mb-[5px] block text-[13.5px] font-semibold text-mocha">
              Phone — only if we need to reach you
            </span>
            <input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="min-h-12 w-full rounded-xl border-[1.5px] border-cocoa bg-cream-2 px-3.5 text-[16.5px] text-cocoa"
            />
          </label>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t-2 border-cocoa pt-[22px]">
        <span className="font-display text-[26px] font-black tabular-nums">
          {formatPrice(total)}
          <small className="mt-1 block font-ui text-[13px] font-normal text-mocha-2">
            {count} {count === 1 ? "item" : "items"} · pickup {windowLabel}
          </small>
        </span>
        <button type="button" onClick={hold} className={ctaClass}>
          Hold my order
        </button>
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mt-3">
          {errors.map((e) => (
            <p key={e} className="text-[14.5px] font-semibold">
              {e}
            </p>
          ))}
        </div>
      )}

      <p className="mt-3.5 max-w-[46ch] text-sm leading-[1.55] text-mocha">
        Pay at the counter — card or cash. If you don&apos;t make it, nothing
        happens: the bag goes back on the shelf at close and you owe us
        nothing.
      </p>
    </main>
  );
}
