"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/button-styles";

const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDObDk9FnJ_zDMDuCf8585s03QVwuFCHe4TImsKGgPU32m6ovZhgEwBdnyXi870THDwWfvaIFZ0uw9XuzOFPKbuIs4H4-4JDSmYt4IDQEM4XuERd3uK9RzH3gXFHW8eWFS9HNXRZokYrrqXAs1yNpd7f6SA-BkcQjlBnRpiv01F9UFVu4dZkAMsuot1VpqDVimLLopsXK3PwkbzUyZsl2itlw9n5s7qR8tuhjVkz_sGrDKdTI0KcdGn";

const MAP =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAG6G-CbQ0Xu5Bzj8A2dtxeaHPUUn-5dpTgYwbVfV6ADssd1rL6_8fsMv0iuxOr7P8lnFTKLsrVEsW36p-C_4jVQxKzK-W8kRXDKMsu1_WbvBDSQbs9CFisMidnmKO4kQhn2X5Gl2CFss4Qr1hdu2rF5CiPMonRDg_wgLbsYQyrWqLgSx44OWtOkY4hOwbs8XV79LhQ0UqW_XA9SrxkfzMa-naQJdt9vbU_ZnxrfI6nX65zhtZDqdjO";

const CTA_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDcz2XTf1mDjxqrM9xlj8m2PGbqRDfMF3pzYAccjqMKSLYixzRsivvTw2PPfsjH2u9LeIiNpl98I3OAtJ2VgywoeGcaCu7M9X3mxj3yWmdEugxVlL4zPEs8fagf-PC2AmaRhQemeXkBNRT8etWS7Re3Kz6gR0mwqDt61h2MiNb12BjXRW8Zw_HEIjPfaQsDaT3Wo4gPjD_ks5UpBDbqQ0kZIK7Wn1HxF0blHe-SMbGHYM279QIur8qm";

const CITY_CARDS = [
  {
    slug: "islamabad",
    name: "Islamabad",
    text: "Navigating the wide avenues of the capital requires a vehicle that matches its elegance and order.",
    badge: "Available Now",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBEsOO-S2DyklYxXEvORM4Sex9eaWzntlyc_4N1GKWwfN7q5SiN-FaCt5WumWGAclKDV5-iuMETh4Pp5TT7UXVj97YG4unFzR-DOAu5xaPfIlaQbEglo28biLgc92WyP44w89bB9RhxBs9EqqFEx9C7lzkQDA8_uL5kjxOAGxO7eTS_yizjCa5he15Tdq0376IlnVEn3TaURbc9TA9eTHJtjUF6Xii8mVVM8kFJKpL98ms4X1P4lqM",
  },
  {
    slug: "karachi",
    name: "Karachi",
    text: "The city of lights demands resilience and luxury. Experience comfort amidst metropolitan energy.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
  },
  {
    slug: "lahore",
    name: "Lahore",
    text: "Heritage meets modernity. Traverse the cultural heart of the country in signature style.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
  },
  {
    slug: "hunza",
    name: "Hunza",
    text: "Conquer the peaks. Our specialized 4x4 fleet ensures safety and luxury in northern terrains.",
    badge: "4x4 Specialists",
    badgeAccent: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
  },
  {
    slug: "skardu",
    name: "Skardu",
    text: "Gateway to the giants. Robust luxury for those who seek the extraordinary in the high Karakoram.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwK0Ew-attpsBBbujzYACE2dT2UhYuS8Z456Jmxm9T5J4FYZIbTSHnFj6IKiQ50cVjv8lDKaGRtkVbKcxHdjcfMAejPWHYYz8_1dm0U6bnipUuWqWkC0o2gxHRhL64vXPlPHRNgGA7PpxYZsZsMN--sYZEHnrLvraldXI5_lGy-2qhBuD8BkwmZrUbsTQ8BjTIqHEKG-nqak_v-tB51DeZPgX5YxSl97Emrg0VCvWvDIN8PXe4_j-",
  },
  {
    slug: "murree",
    name: "Murree",
    text: "Elevated comfort. Premium SUV rentals for your perfect hillside retreat and mountain escapes.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcKDjND0qZPOzEu6BH6j38ppx1NhDSsowcK0WDSaHsKHu7uHk93RX5s7YaXVvt0QtcE8qzID1dq3cM-Sab7YzUvTvJhX1MQ9hdykrxtwlicMPIUZw4xSo3IMJyuaegBUWb3WXcTixky3BjzHS8j82x8Cj6U1FjYmd00kk0A9LaRTazW6zZcU2_oAH8r-g0PHA8-gQZN9dXOVROP-s3jMzDKjWhhTKdY3sqsev1-V7mNibVGOymCfG",
  },
  {
    slug: "naran",
    name: "Naran",
    text: "Explore the Kaghan valley with reliability. Premium crossovers for scenic mountain roads.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    text: "Seamless connectivity. Reliable luxury transport for the twin city's vibrant business hubs.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  },
  {
    slug: "faisalabad",
    name: "Faisalabad",
    text: "Pakistan's industrial powerhouse. Dependable sedans and SUVs for business trips across the city.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "multan",
    name: "Multan",
    text: "The city of saints, made easy to explore. Comfortable rentals for shrine visits and local commerce.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    text: "Gateway to the northwest. Rugged, reliable vehicles for the historic frontier city and beyond.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "abbottabad",
    name: "Abbottabad",
    text: "Cool hills, easy access. The ideal stop for travelers heading further into the northern valleys.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
];

const POPULAR_ROUTES: { from: string; to: string; icon: IconName; text: string }[] = [
  { from: "Islamabad", to: "Murree", icon: "map-pin", text: "A 1.5 hour scenic climb — our most requested weekend route." },
  { from: "Islamabad Airport", to: "City Center", icon: "plane", text: "Meet-and-greet transfers timed to your flight, day or night." },
  { from: "Islamabad", to: "Hunza / Skardu", icon: "map-pin", text: "Multi-day northern expeditions with 4x4-equipped vehicles." },
  { from: "Islamabad", to: "Lahore", icon: "car", text: "Motorway-ready sedans for the intercity business run." },
  { from: "Rawalpindi", to: "Naran / Kaghan", icon: "map-pin", text: "Rugged crossovers built for the Kaghan valley's mountain roads." },
  { from: "Karachi", to: "Hyderabad", icon: "map-pin", text: "Comfortable long-distance sedans for the coastal corridor." },
];

const WHY_CITY: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "user-check",
    title: "Local, Vetted Drivers",
    text: "Chauffeurs based in-city who know the shortcuts, checkpoints, and traffic patterns.",
  },
  {
    icon: "map-pin",
    title: "Doorstep Delivery",
    text: "Your car arrives at your home, office, or hotel — no counter queues, no delays.",
  },
  {
    icon: "map-pin",
    title: "4x4 for the North",
    text: "Purpose-built SUVs and off-roaders for Hunza, Skardu, and Naran terrain.",
  },
  {
    icon: "wallet",
    title: "Fixed City Rates",
    text: "Transparent, city-specific pricing agreed upfront — no surprise surcharges.",
  },
];

const STEPS: { icon: IconName; title: string; text: string }[] = [
  { icon: "search", title: "Select City", text: "Choose your destination and preferred pickup location." },
  { icon: "car", title: "Pick a Car", text: "Browse our elite collection from sedans to rugged SUVs." },
  { icon: "shield-check", title: "Enjoy Journey", text: "We deliver the car to your doorstep. Drive with confidence." },
];

const REVIEWS = [
  {
    quote:
      "The experience in Islamabad was flawless. The Mercedes was pristine, and the delivery was exactly on time. Truly a signature service.",
    name: "Haris Ahmed",
    role: "CEO, TechFlow",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB72AgTZkB__F0AS1OsoC_TbIgBnc2AwVP5gvWwUCl57aNYl774FrDN1d7XQEO-6cL28JViX4J0b5F9PZly0sdJzXHG6AgVBg9HjsieWtq7TPA0VibOxT2Js3nMLI4tbKLBo-u5U15MjoUs5NwRBwr96ljcZrvAJDInpR7yjGLQOBFBsU_QLoyBsM1YHZuYUAe_9lV39p4kuaEyQxgFXspVMkxIaezt1hww6V43Fr6vpyYQk56PgeEE",
  },
  {
    quote:
      "Rented a Land Cruiser for our Hunza trip. The vehicle's performance on the Karakoram Highway was exceptional. Highly recommended.",
    name: "Sara Khan",
    role: "Travel Vlogger",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3yi3-6EYniRfyW6rYApkWKB49Sfy_R3CMb8OOyrQMsHKMjBVaiIxMUJ_XID05A48V5wtvs53OcaUOc57yQvz5oetAO7Od1pFQNeybIrM2MdSBrvfh5mjpLKEgaFNIGyykXQ7x85zUxikcZcjEyFrnrG3-tNUjYdjqLcRMuArYHRpw6vhuDjOk9kg5EXEx8HJVnOtWjDGaTDxUnSECUd7BM7RL4ww3KBQL5677sMw00unpuP_3EJX4",
  },
  {
    quote:
      "Professionalism at its peak. The booking process in Karachi was incredibly fast, and the car was in showroom condition. Best in Pakistan.",
    name: "Omar Farooq",
    role: "Investment Banker",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkhJ8xVigWRxdITDWuF9wO4gF-nEWyT0_A1Ae0P3S_p5vySH_HUItr5yCnZFMDgEA63U49wbUzop4CqsestBI9sH9qL2CiXsLCJfl_fyAw6BhSjL9sawAdh5gTlwCIu57jN_jhRyqdlr7uytlAy83-yyhpdrK_SUvIna3vpY95T0SEBtmsWgLhcFMrPvI3hjavwyO3cg1Au58O0LKaWHhtf-zVrPp1WD_H4-_lhliO2HJs8v7rMwgk",
  },
];

const STATS = [
  { value: "12+", label: "Major Cities" },
  { value: "150+", label: "Luxury Fleet" },
  { value: "45min", label: "Avg Delivery" },
  { value: "24/7", label: "Support" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function CityServicesContent() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const searchId = useId();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITY_CARDS;
    return CITY_CARDS.filter(
      (city) => city.name.toLowerCase().includes(q) || city.text.toLowerCase().includes(q),
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const visible = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <>
      {/* Hero: text and search on the left, framed skyline photo on the right */}
      <header className="relative isolate overflow-hidden bg-navy-deep text-white">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="animate-fade-up mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/80">
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-white">
                Home
              </Link>
              <Icon name="chevron-right" size={14} />
              <span aria-current="page" className="text-white">
                City Services
              </span>
            </nav>
            <h1 className="animate-fade-up font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.2rem]">
              Elite Mobility Across the Nation&apos;s <span className="text-green">Pulse</span>
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setPage(0);
              }}
              className="animate-fade-up-delay mt-8 flex flex-col gap-3 rounded-panel bg-white p-4 shadow-lift sm:flex-row sm:p-5"
            >
              <label htmlFor={searchId} className="sr-only">
                City
              </label>
              <div className="relative flex-1">
                <Icon name="map-pin" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-green-strong" />
                <input
                  id={searchId}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(0);
                  }}
                  placeholder="Select a city for your journey..."
                  className="block min-h-12 w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-4 text-base text-navy-deep placeholder:text-muted focus:border-green-strong focus:bg-white sm:text-sm"
                />
              </div>
              <button type="submit" className={buttonClasses({ variant: "green", size: "md" })}>
                <Icon name="search" size={18} />
                Search Cars
              </button>
            </form>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <Image
              src={HERO}
              alt="City skyline at golden hour"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Container>
      </header>

      {/* Cities: tall photo tiles with the text over the image, 4 per page */}
      <Section tone="surface">
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Our Presence"
                title="Discover Excellence in Every Destination"
                description="From the modern boulevards of Islamabad to the rugged beauty of Hunza, Aziz Afridi provides seamless luxury car rentals tailored to each city's unique terrain and lifestyle. Every location is served by a dedicated local team, so whether you're navigating Karachi's coastal traffic or climbing into the Karakoram, your vehicle and driver are matched to the journey ahead."
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous cities"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-navy/30 text-navy-deep transition hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <Icon name="chevron-left" size={22} />
              </button>
              <button
                type="button"
                aria-label="Next cities"
                disabled={safePage >= totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-navy/30 text-navy-deep transition hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                <Icon name="chevron-right" size={22} />
              </button>
            </div>
          </div>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((city, index) => (
            <li key={city.slug}>
              <Reveal delay={Math.min(index, 3) * 80} className="h-full">
                <Link
                  href={`/rent-a-car/${city.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-panel rounded-tr-[3.5rem] bg-navy shadow-soft"
                >
                  <Image
                    src={city.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent" />
                  {city.badge ? (
                    <span
                      className={`absolute top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                        city.badgeAccent
                          ? "left-4 bg-green-strong text-white"
                          : "left-4 bg-white/90 text-navy-deep backdrop-blur"
                      }`}
                    >
                      {city.badge}
                    </span>
                  ) : null}
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <span className="block font-heading text-2xl font-extrabold italic">{city.name}</span>
                    <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-white/85">{city.text}</span>
                    <span className="mt-4 flex items-center justify-between text-sm font-semibold">
                      <span className="group-hover:underline">View Cars</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-strong transition motion-safe:group-hover:translate-x-1">
                        <Icon name="arrow-right" size={18} />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? <p className="mt-10 text-center text-muted">No cities match your search.</p> : null}
      </Section>

      {/* Why rent by city: heading panel on the left, 2x2 list on the right */}
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
          <Reveal>
            <div className="h-full rounded-panel rounded-tr-[4rem] bg-navy-deep p-8 text-white sm:p-10">
              <SectionHeading eyebrow="Local Advantage" title="Why Rent by City" invert />
            </div>
          </Reveal>
          <ul className="grid gap-5 sm:grid-cols-2">
            {WHY_CITY.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 80} className="h-full">
                  <div className="flex h-full gap-4 rounded-card border border-line bg-surface p-6 sm:p-7">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                      <Icon name={item.icon} size={24} />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-navy-deep">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Network reach: centred text, wide map, stat cards overlapping its bottom edge */}
      <Section tone="navy" className="pb-0 sm:pb-0 lg:pb-0">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              eyebrow="Network Reach"
              title="Nationwide Excellence, Local Precision"
              description="Our strategic hubs are positioned to provide 24/7 assistance and delivery services. No matter where your journey begins or ends, the Aziz Afridi standard follows you."
              align="center"
              invert
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-panel rounded-b-none sm:mt-14 lg:aspect-[21/9]">
            <Image src={MAP} alt="Pakistan service coverage map" fill className="object-cover opacity-80" sizes="(min-width: 1200px) 1136px, 100vw" />
            <span className="absolute left-1/2 top-1/4 h-4 w-4 -translate-x-1/2 rounded-full bg-green" />
            <span className="absolute left-1/2 top-1/4 h-4 w-4 -translate-x-1/2 rounded-full bg-green motion-safe:animate-ping" />
          </div>
        </Reveal>
      </Section>
      <div className="bg-navy-deep pb-12 sm:pb-16">
        <Container>
          <ul className="relative z-10 -mt-14 grid grid-cols-2 gap-4 sm:-mt-16 lg:grid-cols-4">
            {STATS.map((item) => (
              <li key={item.label} className="rounded-card bg-white p-5 text-center shadow-lift sm:p-6">
                <p className="font-heading text-3xl font-extrabold italic text-green-strong sm:text-4xl">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted">{item.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Popular routes: two-column list of routes */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            eyebrow="Frequent Journeys"
            title="Popular Routes"
            description="The trips our clients book most often, matched with the right vehicle for the road."
            align="center"
            className="mx-auto mb-10 max-w-2xl sm:mb-14"
          />
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-2">
          {POPULAR_ROUTES.map((route, index) => (
            <li key={`${route.from}-${route.to}`}>
              <Reveal delay={Math.min(index, 5) * 60} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-full rounded-tr-3xl rounded-br-3xl border border-line bg-white py-5 pl-5 pr-7 shadow-soft">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-green">
                    <Icon name={route.icon} size={26} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-navy-deep sm:text-lg">
                      {route.from} <span className="text-green-strong">&harr;</span> {route.to}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{route.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Three steps: large numerals */}
      <Section tone="white">
        <Reveal>
          <SectionHeading
            title="Your Journey in Three Steps"
            description="Luxury should be effortless. We've refined our process to be as smooth as our vehicles."
            align="center"
            className="mx-auto mb-10 max-w-2xl sm:mb-14"
          />
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 90} className="h-full">
                <div className="relative h-full overflow-hidden rounded-panel rounded-tr-[3.5rem] bg-navy-deep p-7 text-white sm:p-9">
                  <span aria-hidden="true" className="absolute -right-1 -top-3 font-heading text-[7rem] font-extrabold italic leading-none text-white/10">
                    {index + 1}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-strong text-white">
                    <Icon name={step.icon} size={26} />
                  </span>
                  <h3 className="relative mt-6 font-heading text-xl font-bold">
                    <span className="mr-1 text-green">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/80 sm:text-base">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Reviews */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="Voices of Satisfaction" align="center" className="mb-10 sm:mb-14" />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((item, index) => (
            <Reveal key={item.name} delay={index * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-card rounded-tr-[3rem] border border-line bg-white p-7 shadow-soft sm:p-8">
                <Icon name="quote" size={34} className="text-green" />
                <div className="mt-4 flex gap-1 text-green-strong" role="img" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={18} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-navy-deep">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy font-heading text-sm font-bold text-white">
                    {initials(item.name)}
                    <Image src={item.image} alt="" fill className="object-cover" sizes="48px" />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-deep">{item.name}</span>
                    <span className="block text-xs uppercase tracking-wide text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Closing call-to-action */}
      <section className="bg-surface pb-12 sm:pb-16 lg:pb-24">
        <Container>
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-panel bg-navy-deep px-6 py-12 text-center text-white sm:px-12 sm:py-16 lg:px-20">
              <Image src={CTA_BG} alt="" fill className="-z-10 object-cover opacity-20 mix-blend-overlay" sizes="100vw" />
              <span aria-hidden="true" className="absolute -right-10 top-0 -z-10 h-full w-40 -skew-x-[20deg] bg-green/15" />
              <h2 className="font-heading text-3xl font-extrabold italic sm:text-4xl">Ready to Start Your Journey?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80 sm:text-lg">
                Experience the ultimate in mobility. Book your signature vehicle today in any major city across
                Pakistan.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <ButtonLink href="/cars" variant="green" pill size="lg">
                  Browse Fleet
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="outline"
                  pill
                  size="lg"
                  className="border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep"
                >
                  Contact Support
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
