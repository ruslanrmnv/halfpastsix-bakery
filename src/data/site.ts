// Single source of truth for locale and every invented fact on the site.
// Collision checks against reality: research/decisions.md 3.1–3.4.
// Nothing here points at a real business: the name is clean in Oregon,
// the street number does not exist as a parcel, the phone sits in the
// NANP fictional range 555-0100…0199, the domain does not resolve.

export const site = {
  name: "Half Past Six",
  // The first bake leaves the oven at 6:30 — the name is the schedule.
  tagline: "Bread, pastry and coffee from first light",
  since: 2018,

  locale: "en-US",
  timeZone: "America/Los_Angeles",

  address: {
    street: "3628 SE Belmont St",
    city: "Portland",
    state: "OR",
    stateFull: "Oregon",
    zip: "97214",
  },

  // (503) 555-0142 — reserved fictional range, safe to print (decision 3.4).
  phone: "(503) 555-0142",
  phoneHref: "tel:+15035550142",

  domain: "halfpastsixpdx.com",
  email: "hello@halfpastsixpdx.com",

  hours: {
    // Morning bakery: doors at 7:00, closed once the day's flour is spent.
    open: "7:00 AM",
    close: "2:00 PM",
    days: "Tuesday – Sunday",
    closedOn: "Monday",
    note: "or until the bread runs out",
  },

  bakes: {
    first: "6:30 AM",
    second: "11:00 AM",
    secondShort: "11:00",
  },

  order: {
    // Pickup happens in 15-minute windows; payment is at the counter.
    windowMinutes: 15,
    cutoff: "1:30 PM",
  },
} as const;

// Prices live in Portland's real range for single items, $1.50–$7.00,
// loaves ~$9 (measured on a live Portland storefront, research decision 1.5).
// Format: USD, symbol before the number, always two decimals ($4.50).
export function formatPrice(usd: number): string {
  return `$${usd.toFixed(2)}`;
}

export type BakeSlot = "first" | "second";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  bake: BakeSlot;
  category: "bread" | "pastry" | "savory" | "coffee";
  description?: string;
}

export const menu: MenuItem[] = [
  // Bread — the loaves that define the place
  { id: "country-sourdough", name: "Country sourdough", price: 9.0, bake: "first", category: "bread", description: "Our daily loaf — natural leaven, 30% whole grain, dark bake" },
  { id: "rye-caraway", name: "Rye & caraway", price: 9.5, bake: "second", category: "bread", description: "Dense Danish-style rye, out of the oven at 11:00" },
  { id: "seeded-wheat", name: "Seeded whole wheat", price: 8.5, bake: "first", category: "bread", description: "Sandwich loaf with toasted sunflower and flax" },

  // Pastry
  { id: "morning-bun", name: "Morning bun", price: 4.0, bake: "first", category: "pastry", description: "Croissant dough, cardamom sugar, orange zest" },
  { id: "buckwheat-croissant", name: "Buckwheat croissant", price: 4.5, bake: "first", category: "pastry", description: "Nutty, deeply laminated, a little wild" },
  { id: "plain-croissant", name: "Croissant", price: 3.75, bake: "first", category: "pastry", description: "All butter, nothing else" },
  { id: "oat-cookie", name: "Salted oat cookie", price: 2.5, bake: "second", category: "pastry", description: "Chewy middle, burnt-sugar edge" },

  // Savory
  { id: "handpie", name: "Ham & gruyère handpie", price: 6.75, bake: "second", category: "savory", description: "Flaky crust, mustard butter" },
  { id: "galette", name: "Seasonal galette", price: 6.5, bake: "second", category: "savory", description: "Whatever the market had this week" },

  // Coffee — a sidekick to the bread, not a program (intake assumption)
  { id: "drip", name: "Drip coffee", price: 3.0, bake: "first", category: "coffee" },
  { id: "espresso", name: "Espresso", price: 3.5, bake: "first", category: "coffee" },
  { id: "latte", name: "Latte", price: 5.0, bake: "first", category: "coffee" },
];

// ---- Today: the frozen demo moment ------------------------------------
// The whole site shows one honest morning — Friday, August 7, counted at
// 8:58 AM. Counts, the gone time and the shelf total all agree with each
// other; the shelf total is computed, not typed.

export interface TodayRow {
  id: string;
  /** Second line on the board, shown after the price. */
  note: string;
  status: "left" | "gone" | "soon";
  /** How many are on the shelf right now (status "left"). */
  left?: number;
  /** When it ran out (status "gone"). */
  goneAt?: string;
  /** How many can be reserved from the 11:00 bake (status "soon"). */
  reservable?: number;
  /** Appears on the homepage board (the five accepted mockup rows). */
  onBoard?: boolean;
}

export const today = {
  weekday: "Friday",
  date: "August 7",
  countedAt: "8:58 AM",
  baked: 96,
  rows: [
    { id: "country-sourdough", note: "1.1 kg · 36-hour levain", status: "left", left: 12, onBoard: true },
    { id: "morning-bun", note: "currants, multigrain", status: "gone", goneAt: "8:52 AM", onBoard: true },
    { id: "buckwheat-croissant", note: "first bake only", status: "left", left: 5, onBoard: true },
    { id: "rye-caraway", note: "900 g", status: "soon", reservable: 8, onBoard: true },
    { id: "handpie", note: "warm until noon", status: "left", left: 9, onBoard: true },
    { id: "seeded-wheat", note: "sandwich loaf", status: "left", left: 6 },
    { id: "plain-croissant", note: "all butter", status: "left", left: 9 },
    { id: "oat-cookie", note: "with the second bake", status: "soon", reservable: 12 },
    { id: "galette", note: "market vegetables", status: "soon", reservable: 6 },
  ] as TodayRow[],
};

/** 41 on the shelf — summed from the rows so the board can't lie. */
export const shelfLeft = today.rows.reduce((n, r) => n + (r.left ?? 0), 0);

export interface PickupWindow {
  label: string;
  /** Window start in minutes from midnight — the second-bake rule needs it. */
  startMin: number;
  taken?: boolean;
}

export const pickupWindows: PickupWindow[] = [
  { label: "9:15 – 9:30", startMin: 555, taken: true },
  { label: "9:30 – 9:45", startMin: 570 },
  { label: "9:45 – 10:00", startMin: 585 },
  { label: "10:00 – 10:15", startMin: 600 },
  { label: "10:15 – 10:30", startMin: 615 },
  { label: "11:15 – 11:30", startMin: 675 },
  { label: "11:30 – 11:45", startMin: 690 },
];
