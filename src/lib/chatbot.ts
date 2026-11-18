/**
 * Site chatbot engine. No AI, no network: it matches keywords (English and Roman Urdu) against the
 * data that already drives the website (cars, fleets, services, cities, FAQ, booking steps, brand details)
 * and answers only from that data. Anything it cannot match is sent to WhatsApp.
 */
import { carModels, cities, fleetSections, getCarsForCategory, serviceDetails, services } from "@/data";
import { bookingSteps } from "@/data/booking-steps";
import { faqs } from "@/data/faq";
import { brand, formatPhoneDisplay, formatPrice } from "@/lib/brand";
import type { CarModel } from "@/types";

export type ChatLink = { label: string; href: string };

export type BotReply = {
  text: string;
  /** Page links shown as buttons under the text. */
  links?: ChatLink[];
  /** Show the "Chat on WhatsApp" button (for example when the bot has no answer). */
  whatsapp?: boolean;
};

export const QUICK_REPLIES = ["Cars & Prices", "Services", "Cities", "How to Book", "Contact Us"] as const;

export const GREETING = "Assalam o Alaikum! Welcome to Aziz Afridi Rent A Car. How can I help you today?";

export const UNKNOWN_TEXT = "Please contact us on WhatsApp for this";

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${brand.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/* ---------- text helpers ---------- */

/** Roman Urdu and spelling variants mapped to one English keyword. */
const SYNONYMS: Record<string, string> = {
  // price
  rate: "price", rates: "price", prices: "price", pricing: "price", kiraya: "price", kirayah: "price",
  qeemat: "price", keemat: "price", kimat: "price", charges: "price", charge: "price", cost: "price",
  fare: "price", paisay: "price", paise: "price", rupay: "price", kitna: "price", kitne: "price", kitni: "price",
  // booking
  book: "booking", bookings: "booking", reserve: "booking", reservation: "booking", buk: "booking",
  // wedding
  shaadi: "wedding", shadi: "wedding", shadiyan: "wedding", barat: "wedding", nikah: "wedding", walima: "wedding",
  // airport
  hawai: "airport", flight: "airport",
  // driver
  chauffeur: "driver", dryver: "driver",
  // contact
  call: "contact", phone: "contact", number: "contact", whatsapp: "contact", rabta: "contact", raabta: "contact",
  email: "contact", address: "contact", pata: "contact", mobile: "contact",
  // places and things
  shehar: "city", sheher: "city", cities: "city",
  gaari: "car", gari: "car", gadi: "car", gaadi: "car", garri: "car", gaarian: "car", gadiyan: "car",
  cars: "car", vehicle: "car", vehicles: "car",
  khidmat: "service", sarvis: "service", services: "service",
  // durations
  mahana: "monthly", mahinay: "monthly", hafta: "weekly", haftawar: "weekly", rozana: "daily", roz: "daily",
  // FAQ topics
  petrol: "fuel", paying: "payment", pay: "payment", paid: "payment", payments: "payment",
  cancellation: "cancel", cancelled: "cancel", insured: "insurance", licence: "license",
  // aliases for car names
  brv: "br", wagonr: "wagon", vigo: "revo", landcruiser: "cruiser",
};

const GREETING_WORDS = new Set([
  "hi", "hello", "hey", "salam", "salaam", "assalam", "aoa", "assalamualaikum", "assalamoalaikum",
  "walaikum", "asalam", "slam", "hii", "helo", "o", "alaikum", "alaykum", "aleikum", "salamalaikum",
]);

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "do", "does", "you", "your", "i", "my", "me", "we", "can", "could",
  "in", "of", "to", "for", "and", "or", "what", "how", "which", "when", "where", "it", "on", "at", "with", "any",
  "have", "has", "get", "give", "tell", "about", "please", "pls", "plz", "want", "need", "like", "there", "this",
  "that", "be", "will", "would", "much", "many", "rent", "rental", "hire",
  // Roman Urdu filler
  "ka", "ki", "ke", "ko", "hai", "hain", "ho", "kya", "kaise", "kese", "mein", "me", "se", "aap", "ap", "kar",
  "karna", "karni", "karein", "chahiye", "chahie", "dein", "do", "batao", "bataye", "bata", "milti", "milta",
  "mil", "sakta", "sakti", "wala", "wali", "liye", "lye", "or", "aur", "main", "mujhe", "hamein",
]);

function stem(token: string) {
  return token.length > 3 && token.endsWith("s") && !token.endsWith("ss") ? token.slice(0, -1) : token;
}

/** Lower-case words without punctuation. */
export function words(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Words with synonyms applied. Stop words are dropped when `dropStops` is set. */
function keywords(input: string, dropStops = true) {
  const out: string[] = [];
  for (const raw of words(input)) {
    const word = SYNONYMS[raw] ?? SYNONYMS[stem(raw)] ?? stem(raw);
    if (dropStops && (STOP_WORDS.has(raw) || STOP_WORDS.has(word))) continue;
    out.push(word);
  }
  return out;
}

function has(tokens: string[], ...candidates: string[]) {
  return candidates.some((c) => tokens.includes(c));
}

/* ---------- reply builders ---------- */

function priceLine(car: CarModel) {
  return `${car.name} — ${formatPrice(car.priceDay)} / day`;
}

function carReply(matches: CarModel[]): BotReply {
  if (matches.length === 1) {
    const car = matches[0];
    return {
      text: `${car.name}\n${formatPrice(car.priceDay)} per day (${formatPrice(car.priceMonth)} per month)\n${car.seats} seats · ${car.transmission} · ${car.fuel}`,
      links: [
        { label: `View ${car.name}`, href: `/cars/${car.slug}` },
        { label: "Book on WhatsApp", href: whatsappUrl(`Hi, I want to book ${car.name}.`) },
      ],
    };
  }
  const shown = matches.slice(0, 6);
  return {
    text: `${shown.map((car) => `• ${priceLine(car)}`).join("\n")}${matches.length > shown.length ? "\n…and more on the cars page." : ""}`,
    links: [...shown.map((car) => ({ label: car.name, href: `/cars/${car.slug}` })), { label: "All cars", href: "/cars" }],
  };
}

function fleetReply(slugs: string[]): BotReply {
  const lines: string[] = [];
  const links: ChatLink[] = [];
  for (const slug of slugs) {
    const section = fleetSections.find((item) => item.slug === slug);
    if (!section) continue;
    const cars = getCarsForCategory(slug);
    lines.push(`${section.name}: ${cars.map((car) => `${car.name} (${formatPrice(car.priceDay)}/day)`).join(", ")}`);
    links.push({ label: section.name, href: `/categories/${section.slug}` });
  }
  return { text: lines.join("\n\n"), links };
}

/** The full fleet list, in the same order as /cars (fleetSections). */
export function fleetListReply(): BotReply {
  const sections = fleetSections.filter((section) => getCarsForCategory(section.slug).length > 0);
  return {
    text: ["Our fleets:", ...sections.map((section) => "• " + section.name), "", "Tap a fleet to see its cars and prices."].join("\n"),
    links: [...sections.map((section) => ({ label: section.name, href: `/categories/${section.slug}` })), { label: "All cars", href: "/cars" }],
  };
}

const FLEET_LIST_WORDS = ["fleet", "fleets", "category", "categories", "gaariyan", "gariyan", "gaarian", "gadiyan", "gaadiyan"];
const FLEET_LIST_PHRASES = ["car types", "cars list", "car list", "kaun si gaariyan", "kon si gaariyan", "kaun si gariyan"];

function wantsFleetList(raw: string[]) {
  const phrase = ` ${raw.join(" ")} `;
  return raw.some((w) => FLEET_LIST_WORDS.includes(w)) || FLEET_LIST_PHRASES.some((p) => phrase.includes(` ${p} `));
}

export function pricesReply(): BotReply {
  const lines: string[] = [];
  const links: ChatLink[] = [];
  for (const section of fleetSections) {
    const cars = getCarsForCategory(section.slug);
    if (cars.length === 0) continue;
    const from = Math.min(...cars.map((car) => car.priceDay));
    lines.push(`• ${section.name} — from ${formatPrice(from)} / day`);
    links.push({ label: section.name, href: `/categories/${section.slug}` });
  }
  links.push({ label: "All cars", href: "/cars" });
  return { text: `Here are our fleets with starting daily prices. Ask me about a car by name, for example "Prado".\n\n${lines.join("\n")}`, links };
}

export function servicesReply(): BotReply {
  return {
    text: `Our services:\n${services.map((item) => `• ${item.name}`).join("\n")}`,
    links: [...services.map((item) => ({ label: item.name, href: `/services/${item.slug}` })), { label: "All services", href: "/services" }],
  };
}

export function citiesReply(): BotReply {
  const cityFaq = faqs.find((item) => item.question === "Which cities do you cover?");
  const main = cities.filter((city) => city.type === "primary" || city.type === "tourist");
  return {
    text: cityFaq?.answer ?? "We serve these cities:",
    links: [...main.map((city) => ({ label: city.name, href: `/rent-a-car/${city.slug}` })), { label: "All cities", href: "/city-services" }],
  };
}

export function bookingReply(): BotReply {
  return {
    text: `How to book:\n${bookingSteps.map((step, i) => `${i + 1}. ${step.title} — ${step.text}`).join("\n")}`,
    links: [
      { label: "Book now", href: "/contact" },
      { label: "Booking policy", href: "/booking-policy" },
    ],
    whatsapp: true,
  };
}

export function contactReply(): BotReply {
  const phone = formatPhoneDisplay();
  return {
    text: `Call us: ${phone}\nWhatsApp: ${phone}\nAddress: ${brand.location.address}`,
    links: [
      { label: `Call ${phone}`, href: `tel:${brand.phone}` },
      { label: "Contact page", href: "/contact" },
    ],
    whatsapp: true,
  };
}

export function greetingReply(): BotReply {
  return { text: GREETING };
}

export function unknownReply(): BotReply {
  return { text: UNKNOWN_TEXT, whatsapp: true };
}

/* ---------- matchers ---------- */

const BRANDS = [...new Set(carModels.map((car) => car.brand.toLowerCase()))];
/** Name words too common to identify a car on their own (Honda City, Grand Cabin). */
const GENERIC = new Set(["city", "grand", "cabin"]);

function matchCars(query: string[]): CarModel[] {
  const q = new Set(query);
  let best: CarModel[] = [];
  let bestScore = 0;

  for (const car of carModels) {
    const brandWords = words(car.brand);
    const nameWords = words(car.name).filter((w) => !brandWords.includes(w) && w.length > 1);
    const matched = nameWords.filter((w) => q.has(w) || q.has(stem(w)));
    const alphaMatched = matched.filter((w) => /[a-z]/.test(w));
    if (alphaMatched.length === 0) continue;
    const brandPresent = brandWords.some((w) => q.has(w));
    if (nameWords.every((w) => GENERIC.has(w)) && !brandPresent) continue;
    const score = matched.length / nameWords.length;
    if (score > bestScore) {
      best = [car];
      bestScore = score;
    } else if (score === bestScore) {
      best.push(car);
    }
  }
  if (best.length > 0) return best;

  const brandHit = BRANDS.find((b) => q.has(b));
  return brandHit ? carModels.filter((car) => car.brand.toLowerCase() === brandHit) : [];
}

type ServiceRule = { slug: string; any: string[]; fleet?: string };
const SERVICE_RULES: ServiceRule[] = [
  { slug: "airport-pick-drop", any: ["airport"] },
  { slug: "hotel-transfer", any: ["hotel"] },
  { slug: "wedding-car-rental", any: ["wedding"], fleet: "wedding-event" },
  { slug: "corporate-car-rental", any: ["corporate", "company", "business"], fleet: "corporate" },
  { slug: "executive-car-rental", any: ["executive", "vip"] },
  { slug: "monthly-car-rental", any: ["monthly"] },
  { slug: "weekly-car-rental", any: ["weekly"] },
  { slug: "daily-car-rental", any: ["daily"] },
];

function serviceReply(rule: ServiceRule): BotReply | null {
  const service = services.find((item) => item.slug === rule.slug);
  const detail = serviceDetails[rule.slug];
  if (!service) return null;
  const links: ChatLink[] = [{ label: service.name, href: `/services/${service.slug}` }];
  if (rule.fleet) {
    const section = fleetSections.find((item) => item.slug === rule.fleet);
    if (section) links.push({ label: section.name, href: `/categories/${section.slug}` });
  }
  links.push({ label: "Book on WhatsApp", href: whatsappUrl(`Hi, I want to know about ${service.name}.`) });
  return { text: `${service.name}\n${detail?.hero.description ?? ""}`.trim(), links };
}

const FLEET_WORDS: Record<string, string[]> = {
  economy: ["economy"],
  standard: ["standard"],
  premium: ["premium"],
  luxury: ["luxury"],
  suv: ["suv", "hybrid"],
  group: ["group", "coaster", "hiace", "van", "bus"],
  tourism: ["tourism", "tourist", "northern", "north", "tour"],
};

function matchFleets(query: string[]): string[] {
  const slugs = new Set<string>();
  for (const section of fleetSections) {
    const nameWords = words(section.name).filter((w) => !["fleet", "and", "event", "travel"].includes(w));
    if (nameWords.some((w) => query.includes(stem(w)) || query.includes(w))) slugs.add(section.slug);
  }
  for (const [group, list] of Object.entries(FLEET_WORDS)) {
    if (list.some((w) => query.includes(w))) {
      for (const section of fleetSections) {
        if (words(section.name).includes(group) || section.slug.startsWith(group)) slugs.add(section.slug);
      }
      if (group === "suv") {
        fleetSections.filter((s) => s.slug === "suv-hybrid" || s.slug === "executive-suv").forEach((s) => slugs.add(s.slug));
      }
    }
  }
  return [...slugs];
}

function matchCity(raw: string[], q: string[]) {
  const phrase = ` ${raw.join(" ")} `;
  const normName = (name: string) => ` ${words(name).join(" ")} `;
  const exactMulti = cities.find((city) => words(city.name).length > 1 && phrase.includes(normName(city.name)));
  const single = cities.find(
    (city) => words(city.name).length === 1 && (q.includes(words(city.name)[0]) || q.includes(stem(words(city.name)[0]))),
  );
  const firstWord = cities.find((city) => city.type !== "local" && words(city.name).length > 1 && q.includes(words(city.name)[0]));
  return { multi: exactMulti, single: single ?? firstWord };
}

function cityReply(city: { slug: string; name: string }): BotReply {
  return {
    text: `Yes, we offer car rental in ${city.name}. Open the ${city.name} page to see our cars and send a booking request.`,
    links: [
      { label: `Rent a car in ${city.name}`, href: `/rent-a-car/${city.slug}` },
      { label: "Book on WhatsApp", href: whatsappUrl(`Hi, I want to rent a car in ${city.name}.`) },
    ],
  };
}

function matchFaq(q: string[]) {
  if (q.length === 0) return null;
  let best: { question: string; answer: string } | null = null;
  let bestScore = 0;
  for (const item of faqs) {
    const questionTokens = new Set(keywords(item.question));
    const answerTokens = new Set(keywords(item.answer));
    let score = 0;
    let questionHits = 0;
    for (const token of new Set(q)) {
      if (questionTokens.has(token)) {
        score += 1;
        questionHits += 1;
      } else if (answerTokens.has(token)) {
        score += 0.4;
      }
    }
    if (questionHits === 0 && score < 1) continue;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  const needed = Math.max(1, q.length * 0.5);
  return best && bestScore >= needed ? best : null;
}

/* ---------- main entry ---------- */

export function reply(input: string): BotReply {
  const text = input.trim();
  const raw = words(text);
  const q = keywords(text);
  const all = keywords(text, false);

  if (raw.length === 0) return unknownReply();

  // The five quick-reply buttons.
  const phrase = raw.join(" ");
  if (phrase === "cars and prices" || phrase === "cars prices") return pricesReply();
  if (phrase === "services") return servicesReply();
  if (phrase === "cities") return citiesReply();
  if (phrase === "how to book") return bookingReply();
  if (phrase === "contact us") return contactReply();

  // Greeting only.
  if (raw.every((w) => GREETING_WORDS.has(w))) return greetingReply();

  const cars = matchCars(raw.concat(q));
  const cityMatch = matchCity(raw, q);

  if (cars.length > 0) return carReply(cars);
  if (cityMatch.multi) return cityReply(cityMatch.multi);

  for (const rule of SERVICE_RULES) {
    if (has(q, ...rule.any) || has(all, ...rule.any)) {
      const result = serviceReply(rule);
      if (result) return result;
    }
  }

  const fleets = matchFleets(q);
  if (fleets.length > 0) return fleetReply(fleets);
  if (wantsFleetList(raw)) return fleetListReply();

  if (cityMatch.single) return cityReply(cityMatch.single);

  if (has(q, "contact")) return contactReply();
  if (has(q, "booking") && !has(q, "cancel", "policy")) return bookingReply();
  if (has(q, "price")) return pricesReply();
  if (has(q, "service") && q.length <= 2) return servicesReply();
  if (has(q, "city") && q.length <= 2) return citiesReply();
  if (has(q, "car") && q.length <= 2) return pricesReply();

  const faq = matchFaq(q);
  if (faq) {
    return { text: faq.answer, links: [{ label: "More FAQs", href: "/faq" }] };
  }

  return unknownReply();
}
