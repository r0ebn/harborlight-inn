/**
 * Harborlight Inn — the single source of truth.
 *
 * Every output (email, page, voucher, share card) reads the same booking from
 * here. To make a kit for another stay, change only this file and rebuild.
 *
 * All money is integer cents; `usd()` is the only formatter. All dates are
 * fixed strings, so every build renders byte-identical output.
 */

export const inn = {
  name: "Harborlight Inn",
  shortName: "Harborlight",
  tagline: "A lantern on the point since 1912.",
  est: "EST. 1912",
  addressLines: ["14 Beacon Point Road", "Harborlight Cove, Maine 04544"],
  phone: "+1 (207) 555-0148",
  phoneHref: "tel:+12075550148",
  email: "stay@harborlight.example",
  emailHref: "mailto:stay@harborlight.example",
  site: "harborlight.example",
  siteHref: "https://harborlight.example",
  checkInTime: "3:00 PM",
  checkOutTime: "11:00 AM",
};

export interface PriceLine {
  label: string;
  detail: string;
  amountCents: number;
}

export const booking = {
  code: "HL-2027-0418",
  guest: {
    firstName: "Mara",
    lastName: "Ellison",
    fullName: "Mara Ellison",
    email: "mara.ellison@example.com",
    adults: 2,
  },
  room: {
    name: "Lantern Room",
    kind: "Ocean View King",
    beds: "One king bed",
    occupancy: "Sleeps 2",
    view: "Harbor & lighthouse view",
    floor: "Second floor, north wing",
  },
  checkIn: {
    label: "Friday, 12 March 2027",
    short: "Fri 12 Mar 2027",
    time: inn.checkInTime,
  },
  checkOut: {
    label: "Monday, 15 March 2027",
    short: "Mon 15 Mar 2027",
    time: inn.checkOutTime,
  },
  nights: 3,
  /** Price lines, in the order they appear on the bill. */
  lines: [
    { label: "Lantern Room — Ocean View King", detail: "$248.00 × 3 nights", amountCents: 74400 },
    { label: "Breakfast for two", detail: "$32.00 × 3 mornings", amountCents: 9600 },
    { label: "Harbor sunset cruise", detail: "Saturday, 2 guests", amountCents: 7000 },
  ] satisfies PriceLine[],
  taxesLabel: "State & local taxes (13%)",
  /** 13% of the $910.00 subtotal. */
  taxesCents: 11830,
  /** 20% deposit, taken at booking. */
  depositCents: 20566,
  manageHref: "https://harborlight.example/manage/HL-2027-0418",
  directionsHref: "https://harborlight.example/directions",
  localGuideHref: "https://harborlight.example/guide",
};

export const subtotalCents = booking.lines.reduce((sum, line) => sum + line.amountCents, 0);
export const totalCents = subtotalCents + booking.taxesCents;
export const balanceCents = totalCents - booking.depositCents;

/** Format integer cents as dollars, e.g. 102830 -> "$1,028.30". */
export function usd(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** What to expect on arrival, shared by the email and the page. */
export const arrivalNotes = [
  {
    title: "Check in from 3:00 PM",
    body: "The front desk is in the main house, through the blue door. Show your booking code — no printout needed.",
  },
  {
    title: "Parking is on us",
    body: "The gravel lot behind the carriage house is free for guests. Tell us your plate at check-in and we'll save you a spot.",
  },
  {
    title: "Breakfast, 7:30–10:00 AM",
    body: "Served in the dining room overlooking the harbor. Your booking includes breakfast for two, every morning.",
  },
  {
    title: "The lighthouse walk",
    body: "The point trail opens at dawn. It's a ten-minute walk from the back garden — bring a layer, the wind is honest.",
  },
];

/** Room highlights for the arrival page. */
export const roomHighlights = [
  {
    title: "The room",
    body: "A king bed dressed in washed linen, a window seat facing the water, and a clawfoot tub with a view of the point.",
  },
  {
    title: "The light",
    body: "The Lantern Room sits under the old signal lamp. On clear nights the beam sweeps the ceiling once a minute.",
  },
  {
    title: "The quiet",
    body: "No television, no minibar hum. A shelf of paperbacks, a record player, and the sound of the tide instead.",
  },
];

/** Nearby places for the local guide. */
export const localGuide = [
  { place: "The Point Lighthouse", detail: "Ten minutes on foot — open to the public on weekends, 10 AM to 4 PM." },
  { place: "Cove Market & Bakery", detail: "Five minutes down the hill. Sourdough from 7 AM; the lobster rolls sell out by noon." },
  { place: "Harbor Sunset Cruise", detail: "Departs from the town pier at 5:30 PM on Saturday. Your two seats are already booked." },
  { place: "Salt Air Books", detail: "A bookshop in a former net loft, three doors from the pier. Ask for Ruth's shelf." },
];

export const finePrint = [
  "Present this voucher or your booking code at check-in, with photo ID matching the guest name.",
  "Free cancellation until 7 days before arrival; after that the first night is charged.",
  "Balance due at check-in. Harborlight Inn is fictional; no real booking exists behind this voucher.",
];
