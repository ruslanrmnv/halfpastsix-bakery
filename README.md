# Half Past Six — Portland bakery (portfolio demo)

A demo site for a fictional morning bakery in Portland, Oregon. The whole
site shows one frozen moment — Friday, August 7, 8:58 AM — and its thesis
is the board: what was baked today and what is actually left of it, with
live counts wired through every page.

**Every business fact on this site is invented.** The bakery, the address,
the phone number, the domain and the people do not exist. See
"Before using this in production" below.

## What it does

- **Today** — photo hero with the morning's board: counts, sold-out lines
  with the exact time they went, second-bake items reservable ahead.
- **Menu** — the full price list, each item carrying its live status from
  the same data file.
- **Order** — a reserve-for-pickup flow that runs entirely on the client:
  steppers capped by the live counts, 15-minute pickup windows, and a
  second-bake rule (an 11:00 item in the bag disables earlier windows and
  moves the selection past eleven). Errors give direction instead of a
  disabled button.
- **Visit** — address, hours and pickup details as text. No embedded maps.

## Stack

- Next.js 15 (App Router, `output: "export"` — fully static, no server)
- Tailwind CSS 4 (design tokens in `@theme`, one custom breakpoint at 900px)
- TypeScript

Zero external requests in production: fonts are self-hosted variable
woff2 subsets, the hero photo ships from `public/`. Verified on the
static export — every page loads no third-party resources.

```bash
npm install
npm run dev     # development
npm run build   # static export to out/
```

## Method

Built with a nine-phase gated process (intake → research → mockup with an
acceptance gate → stack → build → measurements → AI-pattern cleanup →
provenance → publish). No production code was written before the mockup
was accepted. Design claims are backed by browser measurements, not
eyeballing — the log of every decision with its reason lives in
[research/decisions.md](research/decisions.md) (in Russian).

Measured on the built export:

- contrast ≥ 4.5:1 on every text node (3:1 for large), all pages, 375 and 1440
- text over the hero photo measured per pixel against the composited
  photo-plus-tint background — worst pixel 4.92:1
- every tap target ≥ 44px
- at most one filled CTA visible at any scroll position
- no horizontal overflow at 375px
- 0 italic nodes, 0 nodes with positive letter-spacing, nothing lighter than 400
- the order scenario walked end to end in a real browser

## Data

All invented facts live in one file: [src/data/site.ts](src/data/site.ts).
The shelf total is summed from the day's rows, never typed by hand, so the
board cannot contradict the menu. Collision checks: the name has no
business match in the US, the street number does not exist on the real
block, the phone uses the reserved 555-01XX fiction range, the domain does
not resolve.

## Licenses

- Hero photo: [Pexels 27418970](https://www.pexels.com/photo/27418970/) —
  Pexels license (free commercial use, no attribution required).
- Fonts: Montserrat and Source Sans 3 — SIL Open Font License 1.1,
  self-hosted as unmodified variable latin subsets.
- Code: no third-party themes, templates or UI kits; the only icon is an
  own primitive SVG.

## Before using this in production

This is a portfolio demo. To run it as a real bakery site you would need to:

- **Replace every invented fact** in `src/data/site.ts`: name, address,
  phone, email, domain, hours, prices, menu.
- **Give the order flow a backend.** Orders currently live in client
  state only — nothing is sent anywhere, the order number is generated
  locally. A real flow needs an endpoint, storage and a counter workflow.
- **Unfreeze the clock.** The date, the counts and the "gone at" times
  are a fixed demo moment. A real board needs a data source that staff
  update during the morning.
- **Rewrite the legal pages.** Privacy and Accessibility are honest
  static-site stubs, not lawyer-reviewed documents.
- **Shoot real photography.** The hero is a stock photo; a real bakery
  should show its own room, bread and hands.
- Replace the placeholder favicon with a real mark.
