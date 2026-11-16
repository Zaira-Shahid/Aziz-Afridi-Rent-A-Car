"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import type { CityPage } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/button-styles";
import { carModels } from "@/data";
import { brand } from "@/lib/brand";

/** Islamabad hero — local landmark image */
const ISLAMABAD_HERO = "/services/islambad.webp";

const FLEET_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA1A79IDJIW_aFnBsQj1JQWPCi85fII9bVRg7OP6lB_FM1HQdJCKMuU8ogEgCN8BaR7e98m8vMSjxppY1ZnkiXVlqgYQeoOtmXBwsSEKC6ly7j83OJLZ_6f9NhpEJ-j9LAl-aLND1WWTUIvkGca0VXOQRKgPACwengq_1yXUh927w_jT_ARf7iovL-okVs1HPNIcnET-cmAft3oJ3orvTPjKoSSB7pDaUy8WPoJAhlk61FaopWNyHxv";

const AIRPORT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDsZiYxccqSOLeaydChTp_SczAfABKJ7kdwrYvETuRCJN1yU7SbQDkfWsg-1KFFEgarBZL9xH8ONmyVa5720Lb8a3B8vg9jn0yjy8V4X9nEgxpQQbxudUKbRYHmdz-BeayNHu-AeboS513MhU_lu_vNX3gX1SfdWRZEYKok5hkxQWAP97eLxbM4jh7QjM4ebcjoKUzp1iWMiy-5ZHu6GBpnG0Fpxo7iRrgLW5FCkWtrQf1e0R3oukbv";

const CITY_HERO_IMAGES: Record<string, string> = {
  islamabad: ISLAMABAD_HERO,
  "islamabad-airport": ISLAMABAD_HERO,
  "dha-islamabad": ISLAMABAD_HERO,
  "blue-area": ISLAMABAD_HERO,
  "f-6-islamabad": ISLAMABAD_HERO,
  "f-7-islamabad": ISLAMABAD_HERO,
  "f-8-islamabad": ISLAMABAD_HERO,
  "g-11-islamabad": ISLAMABAD_HERO,
  "g-13-islamabad": ISLAMABAD_HERO,
  "pwd-islamabad": ISLAMABAD_HERO,
  "b-17-islamabad": ISLAMABAD_HERO,
  "bahria-town": ISLAMABAD_HERO,
  "gulberg-greens": ISLAMABAD_HERO,
  taxila: ISLAMABAD_HERO,
  rawalpindi:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  "saddar-rawalpindi":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCxtoridxoRYv-Wrfwj5dXtNfOEwI1q923go8nTqbUz1ZuoFPnKI41iarOXzOF4WDMOcZItfkFvKsJ4V_CmX2YurqXt43F1RVJS74hg4R8Hv_izfiiAd38KzNqKzei82dbe8YXyWdOs47CRxVZdQyXNoe6z51JPXiFfjPw2_pP2ZJZ62hjfVLRAnWh3uUtDzQ75cn6g4jZG29KSvgHpMPlGBcKgrmrRVVtHsZkA0z2zkE4SREzVQ3AJ",
  lahore:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBu2jgMj_QfGnhZQgVd4TRc8aW6ADIUadRDmc5We8ZS3jRR8uvAq3FKIaGHuQswZgqJHL9WDt-m5IypKs071yZUarzJvWYL7srDq3P4uxU1EOXD7e1wLw1hOaVnJA0cdkmHD0z1BX4kBoqvXI80IYusN1Mm5jOhZblLs5H7Qg0Y5xGxbeFnq07mq-yfYJnw5e8HnNfjGEbC2o_nN-O7Rzk-VQs582D4gmx__otJ2V4m595qN0yHYMEb",
  karachi:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9DfIcAOqVY-KFaY-8uHfe3G9Ur9bEXo8sZiGRVrhtJbIbKiMwoC4TJQxAnagc3IdX56PuL7A6rk9426l9td6pexSDv_jtc-a_JfvxnWDnQBdculn9r_-rbGU362ovaf6KeQ_eTRN1lIlUX6DcLVd1OxGnG2rEIRiHGui7o_24VajnirUOClZ_OfNb4M08DzmNUVV_a0IChsG8NMJz8rSVGDEwyQ-Y31gdlY6ov0kdGSaVchHJRMD",
  hunza:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBw0DCv15PoG1w9hfCNj2vf16txCJ15GHLj4HrhsBAunRkQVuBHQuR7sXb34I5mAtXZ-Vh9gehoAUT6HGjUVYJDagEztop-Cym8YErgaWQjtB8W0091zOFrq9jZjjWpwURtQKjtIlSwPKfznw9BvVd9hRj5Xe_ptc65Y4lIyjbDc-rVm20qhB7edCRrt5JoMK6fHQs2twGIaqKkMzg4gL1VoyE6O7lu8DDBef3HCAaPZDN62WXJPClH",
  skardu:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnwK0Ew-attpsBBbujzYACE2dT2UhYuS8Z456Jmxm9T5J4FYZIbTSHnFj6IKiQ50cVjv8lDKaGRtkVbKcxHdjcfMAejPWHYYz8_1dm0U6bnipUuWqWkC0o2gxHRhL64vXPlPHRNgGA7PpxYZsZsMN--sYZEHnrLvraldXI5_lGy-2qhBuD8BkwmZrUbsTQ8BjTIqHEKG-nqak_v-tB51DeZPgX5YxSl97Emrg0VCvWvDIN8PXe4_j-",
  murree:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcKDjND0qZPOzEu6BH6j38ppx1NhDSsowcK0WDSaHsKHu7uHk93RX5s7YaXVvt0QtcE8qzID1dq3cM-Sab7YzUvTvJhX1MQ9hdykrxtwlicMPIUZw4xSo3IMJyuaegBUWb3WXcTixky3BjzHS8j82x8Cj6U1FjYmd00kk0A9LaRTazW6zZcU2_oAH8r-g0PHA8-gQZN9dXOVROP-s3jMzDKjWhhTKdY3sqsev1-V7mNibVGOymCfG",
  naran:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  kaghan:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTqVkNdV-owxjJjCBPTFmklAzduRiBbdF6yk6lST455UjKRJs_LLlN6Cn0-0X3jrXJ5LerZOOM7zYpj1H3Yu6Ooy5cmxin4qB5HIs385dcwGipLKWOpCKCpeIoXr4698VqHJNoG68tTCSESHwTTUSR4R_IRTgYYxMF4p968vc_aS5zysFTzAe1cRqFixfm9LcSZP8HBVZ75727AWDrRv1GD48gM95LiDAFk0IoJtO3sgD99IVDb9T1",
  swat: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  "neelum-valley": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  "azad-kashmir": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  faisalabad: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
  multan: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
  peshawar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
  abbottabad: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
  haripur: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
};

function getCityHeroImage(city: CityPage) {
  if (CITY_HERO_IMAGES[city.slug]) return CITY_HERO_IMAGES[city.slug];
  if (city.type === "tourist") {
    return "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80";
  }
  return ISLAMABAD_HERO;
}

const CATEGORIES = ["Luxury SUV", "Premium Sedan", "Economy", "Wedding Fleet", "Group Travel"];

type CityDetailContentProps = {
  city: CityPage;
};

function cityBlurb(city: CityPage) {
  if (city.type === "tourist") {
    return `Affordable, reliable and premium car rental for ${city.name} trips — ideal for tourism, family getaways, and scenic mountain travel.`;
  }
  if (city.type === "local") {
    return `Affordable, reliable and premium car rental around ${city.name} for business meetings, airport transfers, and everyday city travel.`;
  }
  return `Affordable, reliable and premium car rental services in ${city.name} for business, tourism and family travel.`;
}

function airportCopy(city: CityPage) {
  if (city.slug === "islamabad-airport") {
    return "Meet-and-greet transfers right from Islamabad International Airport to your hotel, home, or meeting point.";
  }
  if (city.type === "tourist") {
    return `Comfortable pickups arranged for your ${city.name} journey — from major airports and city hubs to your mountain destination.`;
  }
  if (city.type === "local") {
    return `Seamless transfers covering ${city.name} and nearby Islamabad / Rawalpindi routes, including airport links on request.`;
  }
  return `Seamless transfers from the nearest airport and major hubs directly to your destination in ${city.name}.`;
}

const fieldClass =
  "block w-full min-w-0 rounded-xl border border-line bg-surface py-3.5 pl-11 pr-4 text-base text-navy-deep focus:border-green-strong focus:bg-white sm:text-sm";
const labelClass = "mb-1.5 block text-sm font-semibold text-navy-deep";

export function CityDetailContent({ city }: CityDetailContentProps) {
  const [pickupDate, setPickupDate] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const heroImage = getCityHeroImage(city);
  const baseId = useId();

  const popularCars = useMemo(
    () =>
      [...carModels]
        .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
        .slice(0, 4),
    [],
  );

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      `Hello ${brand.name},`,
      "",
      `I want to rent a car in ${city.name}.`,
      `Pickup Location: ${city.name}, Pakistan`,
      `Pickup Date: ${pickupDate || "Flexible"}`,
      `Vehicle Category: ${category}`,
      "",
      "Please confirm availability. Thank you!",
    ].join("\n");

    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <>
      {/* Hero: navy panel, big title and a framed city photo */}
      <header className="relative isolate overflow-hidden bg-navy-deep pb-24 text-white sm:pb-28">
        <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
        <span aria-hidden="true" className="absolute -right-40 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
        <Container className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <h1 className="animate-fade-up font-heading text-4xl font-extrabold italic leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Rent A Car In <span className="text-green">{city.name}</span>
            </h1>
            <p className="animate-fade-up-delay mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              {cityBlurb(city)}
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel rounded-tr-[5rem] bg-navy shadow-lift">
            <Image
              src={heroImage}
              alt={`Rent a car in ${city.name}`}
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </Container>
      </header>

      {/* Search card overlapping the hero */}
      <div className="relative z-10 -mt-14 px-4 sm:-mt-16 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSearch}
          className="mx-auto grid max-w-5xl gap-4 rounded-panel bg-white p-5 shadow-lift sm:p-6 md:grid-cols-4 md:items-end"
        >
          <div>
            <label htmlFor={`${baseId}-loc`} className={labelClass}>
              Pickup Location
            </label>
            <div className="relative">
              <Icon name="map-pin" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-strong" />
              <input id={`${baseId}-loc`} readOnly value={`${city.name}, Pakistan`} className={fieldClass} />
            </div>
          </div>
          <div>
            <label htmlFor={`${baseId}-date`} className={labelClass}>
              Pickup Date
            </label>
            <div className="relative">
              <Icon name="calendar" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-strong" />
              <input
                id={`${baseId}-date`}
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor={`${baseId}-cat`} className={labelClass}>
              Vehicle Category
            </label>
            <div className="relative">
              <Icon name="car" size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-green-strong" />
              <select
                id={`${baseId}-cat`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={fieldClass}
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className={buttonClasses({ variant: "green", size: "lg", className: "w-full" })}>
            <Icon name="search" size={18} />
            Search Cars
          </button>
        </form>
      </div>

      {/* Why choose us: one big dark panel on the left, three rows on the right */}
      <Section tone="surface">
        <Reveal>
          <SectionHeading
            title={`Why Choose Aziz Afridi in ${city.name}?`}
            description={`Experience unmatched professionalism, pristine vehicles, and seamless service tailored for travel in ${city.name}.`}
            align="center"
            className="mx-auto mb-10 max-w-2xl sm:mb-14"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-panel bg-navy-deep text-white">
              <div className="p-7 sm:p-9">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green/20 text-green">
                  <Icon name="crown" size={26} />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-extrabold italic">Luxury Fleet</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  From executive sedans to premium SUVs, our immaculately maintained fleet ensures you
                  travel across {city.name} in supreme comfort and style.
                </p>
              </div>
              <div className="relative mt-auto aspect-[16/9] w-full">
                <Image
                  src={FLEET_IMAGE}
                  alt="Luxury fleet"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={80}>
              <div className="flex gap-5 rounded-card border border-line bg-white p-6 shadow-soft sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                  <Icon name="headset" size={24} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy-deep sm:text-xl">24/7 Support</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                    Round-the-clock assistance ensuring your journey in {city.name} is uninterrupted.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex gap-5 rounded-card border border-line bg-white p-6 shadow-soft sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                  <Icon name="wallet" size={24} />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy-deep sm:text-xl">Affordable Prices</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                    Transparent pricing with no hidden fees, offering premium service at competitive rates.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="overflow-hidden rounded-card border border-line bg-white shadow-soft sm:flex">
                <div className="flex-1 p-6 sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-strong/10 text-green-strong">
                    <Icon name="plane" size={24} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy-deep sm:text-xl">Airport Pickup</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{airportCopy(city)}</p>
                </div>
                <div className="relative aspect-[16/9] w-full sm:aspect-auto sm:w-2/5">
                  <Image
                    src={AIRPORT_IMAGE}
                    alt="Airport pickup"
                    fill
                    className="object-cover sm:rounded-bl-[3rem]"
                    sizes="(min-width: 1024px) 20vw, 100vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Popular cars: swipeable row on phones, 4 columns on desktop */}
      <Section tone="white">
        <Reveal>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
            <SectionHeading
              title={`Popular Cars in ${city.name}`}
              description={`Select from our most requested vehicles for ${city.name} travel.`}
            />
            <ButtonLink href="/cars" variant="outline" pill size="md" className="shrink-0">
              View All Cars
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </Reveal>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6">
          {popularCars.map((car) => (
            <li key={car.slug} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
