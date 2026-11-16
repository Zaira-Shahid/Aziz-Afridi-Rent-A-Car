export const PICKUP_OPTIONS = [
  "Islamabad International Airport",
  "Blue Area Office",
  "Hotel Delivery",
  "Custom Address",
] as const;

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  message: string;
};

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  pickup: PICKUP_OPTIONS[0],
  message: "",
};

/** Query parameters that map straight onto a form field. */
const DIRECT_KEYS = ["name", "email", "phone", "pickup", "message"];

/** Friendly labels for the extra parameters other pages may send. */
const EXTRA_LABELS: Record<string, string> = {
  service: "Service",
  date: "Date",
  time: "Time",
  passengers: "Passengers",
  destination: "Destination",
  duration: "Duration",
  car: "Car",
  company: "Company",
  from: "Pickup",
  to: "Drop-off",
  airport: "Airport",
  hotel: "Hotel",
  vehicle: "Vehicle",
  venue: "Venue",
  decoration: "Decoration",
  contact: "Contact person",
  requirement: "Vehicle requirement",
};

const MAX_VALUE_LENGTH = 300;
const MAX_EXTRAS = 12;

/** Drops control characters, collapses blanks and limits the length of a value taken from the URL. */
function clean(value: string, multiline = false) {
  const kept = Array.from(value).filter((ch) => ch >= " " || (multiline && ch === "\n"));
  return kept.join("").trim().slice(0, MAX_VALUE_LENGTH);
}

function labelFor(key: string) {
  return EXTRA_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Builds the starting values of the contact form from the URL (for example `/contact?service=Wedding&name=Test`).
 * Parameters that match a field fill that field. Every other parameter (service, date, ...) is written as a
 * "Label: value" line at the top of the message, so nothing a visitor typed on another page is lost.
 */
export function prefillFromParams(params: URLSearchParams): ContactValues {
  const values: ContactValues = { ...emptyContactValues };
  const messageLines: string[] = [];

  const name = clean(params.get("name") ?? "");
  const email = clean(params.get("email") ?? "");
  const phone = clean(params.get("phone") ?? "");
  const pickup = clean(params.get("pickup") ?? "");
  const message = clean(params.get("message") ?? "", true);

  if (name) values.name = name;
  if (email) values.email = email;
  if (phone) values.phone = phone;

  if (pickup) {
    const match = PICKUP_OPTIONS.find((option) => option.toLowerCase() === pickup.toLowerCase());
    if (match) values.pickup = match;
    else messageLines.push(`Pickup: ${pickup}`);
  }

  let extras = 0;
  params.forEach((raw, key) => {
    if (DIRECT_KEYS.includes(key) || !/^[A-Za-z0-9_-]{1,30}$/.test(key) || extras >= MAX_EXTRAS) return;
    const value = clean(raw);
    if (!value) return;
    messageLines.push(`${labelFor(key)}: ${value}`);
    extras += 1;
  });

  values.message = [messageLines.join("\n"), message].filter(Boolean).join("\n\n");
  return values;
}
