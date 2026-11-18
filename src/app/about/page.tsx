import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, CtaBanner } from "@/components/shared";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Icon } from "@/components/ui/Icon";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description: "Meet Aziz Afridi Rent A Car and explore chauffeur-driven travel for airport transfers, business trips and family journeys across Pakistan.",
  path: "/about",
});

const STEPS = [
  ["Choose your vehicle", "Compare seating, luggage space and vehicle class. For northern routes, discuss road conditions and vehicle suitability with the team."],
  ["Share your itinerary", "Provide flight details, planned stops and return timings so your quote covers the full journey."],
  ["Confirm the details", "Agree fuel, tolls, parking, overtime and outstation driver expenses before paying a deposit. Keep your booking confirmation for reference."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Aziz Afridi Rent A Car"
        highlight="Rent A Car"
        description="Car rental with a driver for everyday plans, business commitments and journeys across Pakistan."
      />

      {/* Founder */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Image
              src="/images/aziz-afridi-ceo.webp"
              alt="Aziz Afridi, Founder & CEO of Aziz Afridi Rent a Car"
              width={640}
              height={640}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mx-auto aspect-square w-full max-w-md rounded-[2rem] object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-sm font-bold uppercase tracking-widest text-green-strong">Meet Our Founder</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold italic leading-tight text-navy-deep sm:text-5xl">Aziz Afridi</h2>
            <p className="mt-2 text-lg font-semibold text-green-strong">Founder &amp; CEO</p>
          </Reveal>
        </div>
      </Section>

      {/* Story: photo in an arched frame with a green offset block, text beside it */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <span aria-hidden="true" className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-panel bg-green/20" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-panel rounded-tr-[6rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/about-hero-v2.webp"
                  alt="Vehicles for journeys in Islamabad"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-heading text-[1.75rem] font-extrabold italic leading-tight text-navy-deep sm:text-3xl lg:text-4xl">
              Travel planned around your journey
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">Aziz Afridi Rent A Car helps you arrange transport for city travel, airport pickups, corporate visits, weddings and outstation trips. Choose a vehicle to suit your passenger count, luggage and itinerary, then discuss your requirements with our booking team.</p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Our fleet pages bring economy cars, sedans, executive vehicles, SUVs and group transport together in one place. Daily, weekly and monthly options help you plan a short visit or recurring travel.</p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Share your pickup point, dates and destination before confirming. Request a quote covering your vehicle, driver arrangements, rental duration and additional trip costs.</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" className="py-10 sm:py-12">
        <div className="flex justify-center">
          <a
            href={brand.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-green-strong px-6 font-semibold text-white transition hover:bg-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <Icon name="map-pin" size={18} />
            Find us on Google
          </a>
        </div>
      </Section>

      {/* Three steps on navy with big numerals */}
      <Section tone="navy">
        <Reveal>
          <SectionHeading title="Plan your rental with confidence" invert className="mb-10 sm:mb-14" />
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(([title, text], index) => (
            <li key={title}>
              <Reveal delay={index * 90} className="h-full">
                <article className="relative h-full overflow-hidden rounded-panel rounded-tr-[3.5rem] border border-white/10 bg-white/5 p-7 sm:p-9">
                  <span aria-hidden="true" className="absolute -right-1 -top-3 font-heading text-[7rem] font-extrabold italic leading-none text-white/10">
                    {index + 1}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-strong font-heading text-lg font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="relative mt-6 font-heading text-xl font-bold text-white">{title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <ServicesGrid />
      <CtaBanner />
    </>
  );
}
